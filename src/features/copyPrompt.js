import {copyText} from '../lib/copy.js';

function autosizeTextarea(field) {
  field.style.height = 'auto';
  field.style.height = `${field.scrollHeight}px`;
}

function compilePrompt(block) {
  const root = block.querySelector('[data-copy-template]');
  const template = decodeURIComponent(root?.dataset.copyTemplate || '');
  const fields = [...block.querySelectorAll('[data-copy-field]')];

  let index = 0;
  return template.replace(/\[([^\]]+)\]/g, (_, placeholder) => {
    const replacement = fields[index]?.value?.trim();
    index += 1;
    return replacement || `[${placeholder}]`;
  });
}

async function handleCopy(button) {
  const block = button.closest('.prompt-block');
  if (!block) {
    return;
  }

  const previousLabel = button.textContent;
  try {
    await copyText(compilePrompt(block));
    button.textContent = 'Copied';
  } catch {
    button.textContent = 'Copy failed';
  }

  window.setTimeout(() => {
    button.textContent = previousLabel;
  }, 1200);
}

function currentSlideIndex(carousel) {
  const slides = [...carousel.querySelectorAll('[data-prompt-slide]')];
  if (!slides.length) {
    return 0;
  }

  const width = carousel.clientWidth || 1;
  const index = Math.round(carousel.scrollLeft / width);
  return Math.max(0, Math.min(slides.length - 1, index));
}

function updateCarousel(card, index) {
  const slides = [...card.querySelectorAll('[data-prompt-slide]')];
  const dots = [...card.querySelectorAll('[data-prompt-dot]')];
  const status = card.querySelector('[data-prompt-status]');

  dots.forEach((dot) => {
    dot.classList.toggle('is-active', Number(dot.dataset.promptDot) === index);
  });

  if (status) {
    status.textContent = `${index + 1} / ${slides.length}`;
  }
}

function scrollToSlide(carousel, index) {
  const slides = [...carousel.querySelectorAll('[data-prompt-slide]')];
  const safeIndex = Math.max(0, Math.min(slides.length - 1, index));
  const target = slides[safeIndex];
  if (!target) {
    return;
  }

  carousel.scrollTo({
    left: target.offsetLeft,
    behavior: 'smooth',
  });
  updateCarousel(carousel.closest('.prompt-pack-card'), safeIndex);
}

function initPromptCarousel(card) {
  const carousel = card.querySelector('[data-prompt-carousel]');
  if (!carousel) {
    return;
  }

  card.querySelector('[data-prompt-nav="prev"]')?.addEventListener('click', () => {
    scrollToSlide(carousel, currentSlideIndex(carousel) - 1);
  });

  card.querySelector('[data-prompt-nav="next"]')?.addEventListener('click', () => {
    scrollToSlide(carousel, currentSlideIndex(carousel) + 1);
  });

  card.querySelectorAll('[data-prompt-dot]').forEach((dot) => {
    dot.addEventListener('click', () => {
      scrollToSlide(carousel, Number(dot.dataset.promptDot));
    });
  });

  let timer = 0;
  carousel.addEventListener('scroll', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      updateCarousel(card, currentSlideIndex(carousel));
    }, 60);
  });

  updateCarousel(card, 0);
}

export function initCopyPrompt() {
  document.querySelectorAll('[data-copy-field]').forEach((field) => {
    autosizeTextarea(field);
    field.addEventListener('input', () => autosizeTextarea(field));
  });

  document.querySelectorAll('[data-copy-prompt]').forEach((button) => {
    button.addEventListener('click', () => handleCopy(button));
  });

  document.querySelectorAll('.prompt-pack-card').forEach((card) => {
    initPromptCarousel(card);
  });
}
