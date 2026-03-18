import {animate, stagger} from 'animejs';

const heroSlideContent = [
  'Graph thinking for overloaded humans',
  'Systems thinking that becomes visible in Sheets',
  'AI workflows built for mobile-first execution',
];

export function initHeroSlides() {
  const root = document.querySelector('#hero-slides');
  if (!root) {
    return;
  }

  root.innerHTML = heroSlideContent
    .map(
      (item, index) => `
        <div class="slide-chip" data-hero-slide="${index}">
          <span>${item}</span>
        </div>`,
    )
    .join('');

  animate('.slide-chip', {
    opacity: [0, 1],
    translateY: [30, 0],
    delay: stagger(120),
    duration: 700,
    ease: 'outExpo',
  });
}
