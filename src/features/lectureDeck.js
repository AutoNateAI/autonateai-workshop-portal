import {animate} from 'animejs';
import {voiceovers} from '../data/voiceovers.js';

const VOICE_ENABLED_KEY = 'autonateai-workshop-voice-enabled';
const AUTO_ADVANCE_DELAY_MS = 3000;
const ASSET_BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const SWIPE_THRESHOLD_PX = 54;
let activeCleanup = null;

function wrapAnimatedWords(element) {
  if (!element || element.dataset.wordsReady === 'true') {
    return;
  }

  const originalText = element.textContent?.trim();
  if (!originalText) {
    return;
  }

  const tokens = originalText.split(/(\s+)/).filter(Boolean);
  element.dataset.wordsReady = 'true';
  element.dataset.originalText = originalText;
  element.setAttribute('aria-label', originalText);
  element.textContent = '';

  tokens.forEach((token) => {
    if (/^\s+$/.test(token)) {
      element.append(document.createTextNode(token));
      return;
    }

    const word = document.createElement('span');
    word.className = 'narration-word';
    word.textContent = token;
    element.append(word);
  });
}

function primeSlideWords(slide) {
  if (!slide) {
    return;
  }

  slide
    .querySelectorAll('.lecture-copy h3')
    .forEach((element) => wrapAnimatedWords(element));
}

function setSlideWordState(slide, voiceEnabled, audioDuration = 0) {
  if (!slide) {
    return;
  }

  primeSlideWords(slide);
  slide.classList.toggle('is-narrating', voiceEnabled);

  const words = [...slide.querySelectorAll('.narration-word')];
  const totalWords = Math.max(words.length, 1);
  const totalDurationMs = Math.max(audioDuration * 1000 * 0.92, 900);
  const stepMs = Math.max(26, Math.min(150, totalDurationMs / totalWords));

  words.forEach((word, index) => {
    word.style.setProperty('--word-delay', voiceEnabled ? `${Math.round(index * stepMs)}ms` : '0ms');
  });
}

function applyPanMotion(slide, audioDuration = 0) {
  if (!slide) {
    return;
  }

  slide.querySelectorAll('.slide-storyboard-frame').forEach((frame, index) => {
    frame.style.setProperty('--narration-pan-duration', `${Math.max(audioDuration, 4.5)}s`);
    frame.style.setProperty('--pan-x-from', index % 2 === 0 ? '-2.2%' : '2.1%');
    frame.style.setProperty('--pan-y-from', index % 3 === 0 ? '-1.4%' : '1.2%');
    frame.style.setProperty('--pan-x-to', index % 2 === 0 ? '2.4%' : '-2.1%');
    frame.style.setProperty('--pan-y-to', index % 3 === 0 ? '1.5%' : '-1.2%');
  });
}

function addSwipeNavigation(element, onPrev, onNext) {
  if (!element) {
    return () => {};
  }

  let touchStartX = 0;
  let touchStartY = 0;

  const onTouchStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) {
      return;
    }
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  };

  const onTouchEnd = (event) => {
    const touch = event.changedTouches?.[0];
    if (!touch) {
      return;
    }

    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      onNext();
      return;
    }

    onPrev();
  };

  element.addEventListener('touchstart', onTouchStart, {passive: true});
  element.addEventListener('touchend', onTouchEnd, {passive: true});

  return () => {
    element.removeEventListener('touchstart', onTouchStart);
    element.removeEventListener('touchend', onTouchEnd);
  };
}

export function teardownLectureDeck() {
  activeCleanup?.();
  activeCleanup = null;
}

export function initLectureDeck() {
  teardownLectureDeck();

  const deck = document.querySelector('#lecture-deck');
  if (!deck) {
    return;
  }

  const trackId = deck.dataset.track;
  const slides = Array.from(deck.querySelectorAll('.lecture-slide'));
  const toggle = document.querySelector('[data-voice-toggle]');
  const playbackButton = document.querySelector('[data-voice-playback]');
  const audio = new Audio();
  const cleanups = [];
  let autoAdvanceTimer = 0;
  let voiceEnabled = window.localStorage.getItem(VOICE_ENABLED_KEY) === 'true';
  let playbackReady = false;
  let currentIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (currentIndex < 0) {
    currentIndex = 0;
    slides[0]?.classList.add('is-active');
  }

  function parseCuePoints(sequence) {
    return String(sequence?.dataset.cuePoints || '0')
      .split(',')
      .map((value) => Number(value))
      .filter((value) => !Number.isNaN(value));
  }

  function getStoryboardFrameCount(slide) {
    return slide?.querySelectorAll('[data-storyboard-frame]').length || 0;
  }

  function scrollActiveCaptionIntoView(slide, index) {
    const activeCaption = slide?.querySelector(`[data-story-caption="${index}"]`);
    activeCaption?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    });
  }

  function updateStoryCaptions(slide, index) {
    const previousIndex = Number(slide?.dataset.activeStoryCaption ?? -1);
    slide?.querySelectorAll('[data-story-caption]').forEach((caption) => {
      caption.classList.toggle('is-active', Number(caption.dataset.storyCaption) === index);
    });

    if (slide) {
      slide.dataset.activeStoryCaption = String(index);
    }

    if (index !== previousIndex) {
      scrollActiveCaptionIntoView(slide, index);
    }
  }

  function setStoryboardFrame(slide, index) {
    slide?.querySelectorAll('[data-storyboard-frame]').forEach((frame) => {
      frame.classList.toggle('is-active', Number(frame.dataset.storyboardFrame) === index);
    });

    slide?.querySelectorAll('[data-storyboard-dot]').forEach((dot) => {
      dot.classList.toggle('is-active', Number(dot.dataset.storyboardDot) === index);
    });

    updateStoryCaptions(slide, index);
  }

  function getStoryboardFrameIndex(sequence, progress) {
    const cuePoints = parseCuePoints(sequence);

    let activeIndex = 0;
    cuePoints.forEach((cuePoint, index) => {
      if (progress >= cuePoint) {
        activeIndex = index;
      }
    });

    return activeIndex;
  }

  function updateStoryboardProgress(slide) {
    const sequence = slide?.querySelector('[data-storyboard-sequence]');
    if (!sequence) {
      return;
    }

    const duration = audio.duration || 0;
    const progress = duration > 0 ? audio.currentTime / duration : 0;
    setStoryboardFrame(slide, getStoryboardFrameIndex(sequence, progress));
  }

  function resetStoryboard(slide) {
    if (!slide?.querySelector('[data-storyboard-sequence]')) {
      return;
    }

    setStoryboardFrame(slide, 0);
  }

  function getActiveStoryboardFrameIndex(slide) {
    const activeFrame = slide?.querySelector('.slide-storyboard-frame.is-active');
    if (!activeFrame) {
      return 0;
    }

    return Number(activeFrame.dataset.storyboardFrame) || 0;
  }

  function scrubStoryboardFrame(slide, index) {
    const sequence = slide?.querySelector('[data-storyboard-sequence]');
    if (!sequence) {
      return;
    }

    const frameCount = getStoryboardFrameCount(slide);
    const safeIndex = Math.max(0, Math.min(frameCount - 1, index));
    setStoryboardFrame(slide, safeIndex);

    const cuePoints = parseCuePoints(sequence);
    if (!voiceEnabled || !playbackReady || !cuePoints.length || !audio.duration) {
      return;
    }

    audio.currentTime = Math.min(audio.duration - 0.05, Math.max(0, cuePoints[safeIndex] * audio.duration));
  }

  function getClosestVisualIndex(carousel) {
    const cards = [...carousel.children];
    if (!cards.length) {
      return 0;
    }
    const width = carousel.clientWidth || 1;
    return Math.max(0, Math.min(cards.length - 1, Math.round(carousel.scrollLeft / width)));
  }

  function updateVisualDots(slide, index) {
    slide.querySelectorAll('[data-visual-dot]').forEach((dot) => {
      dot.classList.toggle('is-active', Number(dot.dataset.visualDot) === index);
    });
  }

  function initVisualCarousel(slide) {
    const carousel = slide.querySelector('[data-visual-carousel]');
    if (!carousel) {
      const storyboard = slide.querySelector('[data-storyboard-sequence]');

      slide.querySelectorAll('[data-storyboard-dot]').forEach((dot) => {
        dot.addEventListener('click', () => {
          scrubStoryboardFrame(slide, Number(dot.dataset.storyboardDot));
        });
      });

      slide.querySelectorAll('[data-story-caption]').forEach((caption) => {
        caption.addEventListener('click', () => {
          scrubStoryboardFrame(slide, Number(caption.dataset.storyCaption));
        });
      });

      if (storyboard) {
        cleanups.push(
          addSwipeNavigation(storyboard, () => {
            scrubStoryboardFrame(slide, getActiveStoryboardFrameIndex(slide) - 1);
          }, () => {
            scrubStoryboardFrame(slide, getActiveStoryboardFrameIndex(slide) + 1);
          }),
        );

        const onWheel = (event) => {
          if (Math.abs(event.deltaX) < Math.abs(event.deltaY) || Math.abs(event.deltaX) < 16) {
            return;
          }

          event.preventDefault();
          scrubStoryboardFrame(slide, getActiveStoryboardFrameIndex(slide) + (event.deltaX > 0 ? 1 : -1));
        };

        storyboard.addEventListener('wheel', onWheel, {passive: false});
        cleanups.push(() => storyboard.removeEventListener('wheel', onWheel));
      }
      return;
    }

    slide.querySelectorAll('[data-visual-dot]').forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.visualDot);
        carousel.scrollTo({
          left: index * carousel.clientWidth,
          behavior: 'smooth',
        });
        updateVisualDots(slide, index);
      });
    });

    let timer = 0;
    carousel.addEventListener('scroll', () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        updateVisualDots(slide, getClosestVisualIndex(carousel));
      }, 60);
    });
  }

  slides.forEach((slide) => initVisualCarousel(slide));
  slides.forEach((slide) => primeSlideWords(slide));

  function updateToggle() {
    if (!toggle) {
      return;
    }
    toggle.textContent = voiceEnabled ? 'Narration On' : 'Narration Off';
    toggle.classList.toggle('is-on', voiceEnabled);
  }

  function updatePlaybackButton() {
    if (!playbackButton) {
      return;
    }

    const hasVoice = Boolean(voiceovers[trackId]?.[currentIndex]) && voiceEnabled;
    const paused = audio.paused || !playbackReady;
    playbackButton.textContent = paused ? 'Play' : 'Pause';
    playbackButton.disabled = !hasVoice;
  }

  function stopAudio(reset = true) {
    window.clearTimeout(autoAdvanceTimer);
    audio.pause();
    if (reset) {
      audio.currentTime = 0;
      playbackReady = false;
      resetStoryboard(slides[currentIndex]);
    }
    updatePlaybackButton();
  }

  function playCurrent(index) {
    stopAudio();
    applyPanMotion(slides[index], audio.duration || 0);
    if (!voiceEnabled) {
      setSlideWordState(slides[index], false, 0);
      updatePlaybackButton();
      return;
    }

    const src = voiceovers[trackId]?.[index];
    if (!src) {
      setSlideWordState(slides[index], false, 0);
      updatePlaybackButton();
      return;
    }

    const resolvedSrc = src.startsWith('/') ? `${ASSET_BASE}${src}` : src;
    audio.src = '';
    audio.src = resolvedSrc;
    audio.load();
    resetStoryboard(slides[index]);
    setSlideWordState(slides[index], true, 0);
    updatePlaybackButton();
    audio.play().catch(() => {});
  }

  function togglePlayback() {
    if (!voiceEnabled || !voiceovers[trackId]?.[currentIndex]) {
      updatePlaybackButton();
      return;
    }

    if (!playbackReady || audio.src !== (voiceovers[trackId]?.[currentIndex].startsWith('/') ? `${ASSET_BASE}${voiceovers[trackId]?.[currentIndex]}` : voiceovers[trackId]?.[currentIndex])) {
      playCurrent(currentIndex);
      return;
    }

    if (audio.paused) {
      window.clearTimeout(autoAdvanceTimer);
      audio.play().catch(() => {});
      updatePlaybackButton();
      return;
    }

    stopAudio(false);
  }

  function show(index) {
    window.clearTimeout(autoAdvanceTimer);
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });

    animate(slides[index], {
      opacity: [0, 1],
      translateX: [18, 0],
      duration: 450,
      ease: 'outQuad',
    });

    deck.scrollTop = 0;
    slides[index].scrollTop = 0;
    resetStoryboard(slides[index]);
    setSlideWordState(slides[index], voiceEnabled, audio.duration || 0);
    deck.closest('.lecture-card')?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });

    playCurrent(index);
  }

  audio.addEventListener('play', () => {
    updatePlaybackButton();
  });

  audio.addEventListener('pause', () => {
    updatePlaybackButton();
  });

  audio.addEventListener('ended', () => {
    window.clearTimeout(autoAdvanceTimer);
    playbackReady = false;
    updatePlaybackButton();
    if (!voiceEnabled) {
      return;
    }

    autoAdvanceTimer = window.setTimeout(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      show(currentIndex);
    }, AUTO_ADVANCE_DELAY_MS);
  });

  audio.addEventListener('loadedmetadata', () => {
    playbackReady = true;
    setSlideWordState(slides[currentIndex], voiceEnabled, audio.duration || 0);
    applyPanMotion(slides[currentIndex], audio.duration || 0);
    updateStoryboardProgress(slides[currentIndex]);
    updatePlaybackButton();
  });

  audio.addEventListener('timeupdate', () => {
    updateStoryboardProgress(slides[currentIndex]);
  });

  document.querySelectorAll('[data-slide-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const direction = button.getAttribute('data-slide-action');
      currentIndex =
        direction === 'next'
          ? (currentIndex + 1) % slides.length
          : (currentIndex - 1 + slides.length) % slides.length;
      show(currentIndex);
    });
  });

  cleanups.push(
    addSwipeNavigation(deck, () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      show(currentIndex);
    }, () => {
      currentIndex = (currentIndex + 1) % slides.length;
      show(currentIndex);
    }),
  );

  toggle?.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    window.localStorage.setItem(VOICE_ENABLED_KEY, String(voiceEnabled));
    updateToggle();
    if (!voiceEnabled) {
      stopAudio(false);
      setSlideWordState(slides[currentIndex], false, 0);
      updatePlaybackButton();
      return;
    }

    playCurrent(currentIndex);
  });

  playbackButton?.addEventListener('click', () => {
    togglePlayback();
  });

  updateToggle();
  setSlideWordState(slides[currentIndex], voiceEnabled, 0);
  applyPanMotion(slides[currentIndex], 0);
  updatePlaybackButton();

  if (voiceEnabled) {
    window.setTimeout(() => {
      playCurrent(currentIndex);
    }, 120);
  }

  activeCleanup = () => {
    window.clearTimeout(autoAdvanceTimer);
    audio.pause();
    audio.currentTime = 0;
    audio.src = '';
    cleanups.forEach((cleanup) => cleanup());
  };
}
