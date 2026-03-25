import {animate} from 'animejs';
import {voiceovers} from '../data/voiceovers.js';

const VOICE_ENABLED_KEY = 'autonateai-workshop-voice-enabled';
const AUTO_ADVANCE_DELAY_MS = 3000;
const ASSET_BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
let activeCleanup = null;

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
  const stopButton = document.querySelector('[data-voice-stop]');
  const audio = new Audio();
  let autoAdvanceTimer = 0;
  let voiceEnabled = window.localStorage.getItem(VOICE_ENABLED_KEY) === 'true';
  let currentIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (currentIndex < 0) {
    currentIndex = 0;
    slides[0]?.classList.add('is-active');
  }

  function setStoryboardFrame(slide, index) {
    slide?.querySelectorAll('[data-storyboard-frame]').forEach((frame) => {
      frame.classList.toggle('is-active', Number(frame.dataset.storyboardFrame) === index);
    });

    slide?.querySelectorAll('[data-storyboard-dot]').forEach((dot) => {
      dot.classList.toggle('is-active', Number(dot.dataset.storyboardDot) === index);
    });
  }

  function getStoryboardFrameIndex(sequence, progress) {
    const cuePoints = String(sequence?.dataset.cuePoints || '0')
      .split(',')
      .map((value) => Number(value))
      .filter((value) => !Number.isNaN(value));

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
      slide.querySelectorAll('[data-storyboard-dot]').forEach((dot) => {
        dot.addEventListener('click', () => {
          setStoryboardFrame(slide, Number(dot.dataset.storyboardDot));
        });
      });
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

  function updateToggle() {
    if (!toggle) {
      return;
    }
    toggle.textContent = voiceEnabled ? 'Narration On' : 'Narration Off';
    toggle.classList.toggle('is-on', voiceEnabled);
  }

  function stopAudio() {
    window.clearTimeout(autoAdvanceTimer);
    audio.pause();
    audio.currentTime = 0;
    resetStoryboard(slides[currentIndex]);
  }

  function playCurrent(index) {
    stopAudio();
    if (!voiceEnabled) {
      return;
    }

    const src = voiceovers[trackId]?.[index];
    if (!src) {
      return;
    }

    const resolvedSrc = src.startsWith('/') ? `${ASSET_BASE}${src}` : src;
    audio.src = '';
    audio.src = resolvedSrc;
    audio.load();
    resetStoryboard(slides[index]);
    audio.play().catch(() => {});
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
    deck.closest('.lecture-card')?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });

    playCurrent(index);
  }

  audio.addEventListener('ended', () => {
    window.clearTimeout(autoAdvanceTimer);
    if (!voiceEnabled) {
      return;
    }

    autoAdvanceTimer = window.setTimeout(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      show(currentIndex);
    }, AUTO_ADVANCE_DELAY_MS);
  });

  audio.addEventListener('loadedmetadata', () => {
    updateStoryboardProgress(slides[currentIndex]);
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

  toggle?.addEventListener('click', () => {
    voiceEnabled = !voiceEnabled;
    window.localStorage.setItem(VOICE_ENABLED_KEY, String(voiceEnabled));
    updateToggle();
    playCurrent(currentIndex);
  });

  stopButton?.addEventListener('click', () => {
    stopAudio();
  });

  updateToggle();

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
  };
}
