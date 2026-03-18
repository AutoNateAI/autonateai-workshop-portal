import {animate} from 'animejs';
import {voiceovers} from '../data/voiceovers.js';

const VOICE_ENABLED_KEY = 'autonateai-workshop-voice-enabled';

export function initLectureDeck() {
  const deck = document.querySelector('#lecture-deck');
  if (!deck) {
    return;
  }

  const trackId = deck.dataset.track;
  const slides = Array.from(deck.querySelectorAll('.lecture-slide'));
  const toggle = document.querySelector('[data-voice-toggle]');
  const stopButton = document.querySelector('[data-voice-stop]');
  const audio = new Audio();
  let voiceEnabled = window.localStorage.getItem(VOICE_ENABLED_KEY) === 'true';
  let currentIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (currentIndex < 0) {
    currentIndex = 0;
    slides[0]?.classList.add('is-active');
  }

  function updateToggle() {
    if (!toggle) {
      return;
    }
    toggle.textContent = voiceEnabled ? 'Narration On' : 'Narration Off';
    toggle.classList.toggle('is-on', voiceEnabled);
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
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

    audio.src = src;
    audio.play().catch(() => {});
  }

  function show(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });

    animate(slides[index], {
      opacity: [0, 1],
      translateX: [18, 0],
      duration: 450,
      ease: 'outQuad',
    });

    playCurrent(index);
  }

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
}
