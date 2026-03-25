import {getSlideNarration} from '../lib/voiceoverText.js';
import {slideStoryboards} from '../data/slideStoryboards.js';

const ASSET_BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

function cleanStoryboardCaption(text, slideTitle = '') {
  let caption = String(text || '')
    .replace(/\s*\([A-Z] frame\)\s*$/i, '')
    .replace(/\.\./g, '.')
    .replace(/\s+/g, ' ')
    .trim();

  if (slideTitle && caption.toLowerCase().startsWith(`${slideTitle.toLowerCase()}.`)) {
    caption = caption.slice(slideTitle.length + 1).trim();
  }

  return caption;
}

function renderGraphVisual(visual) {
  return `
    <section class="slide-visual-card">
      <div class="slide-visual-title">${visual.title}</div>
      <div class="graph-node-grid">
        ${visual.nodes
          .map(
            (node) => `
              <div class="graph-node graph-node--${node.tone || 'muted'}">${node.label}</div>`,
          )
          .join('')}
      </div>
      <div class="graph-edge-list">
        ${visual.edges.map((edge) => `<div class="graph-edge">${edge}</div>`).join('')}
      </div>
    </section>
  `;
}

function renderTableVisual(visual) {
  return `
    <section class="slide-visual-card">
      <div class="slide-visual-title">${visual.title}</div>
      <div class="slide-table-wrap">
        <table class="slide-table">
          <thead>
            <tr>${visual.columns.map((column) => `<th>${column}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${visual.rows
              .map(
                (row) => `
                  <tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderChartVisual(visual) {
  return `
    <section class="slide-visual-card">
      <div class="slide-visual-title">${visual.title}</div>
      <div class="chart-stack">
        ${visual.items
          .map(
            (item) => `
              <div class="chart-row">
                <div class="chart-row-head">
                  <span>${item.label}</span>
                  <strong>${item.value}</strong>
                </div>
                <div class="chart-bar-shell">
                  <div class="chart-bar chart-bar--${item.tone || 'muted'}" style="width: ${item.value}%"></div>
                </div>
              </div>`,
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderVisual(visual) {
  if (visual.type === 'graph') {
    return renderGraphVisual(visual);
  }

  if (visual.type === 'table') {
    return renderTableVisual(visual);
  }

  return renderChartVisual(visual);
}

function renderActivity(activity) {
  if (!activity) {
    return '';
  }

  return `
    <section class="slide-activity-card">
      <div class="slide-activity-topline">
        <span class="status-pill">Activity</span>
      </div>
      <h4>${activity.title}</h4>
      <p class="slide-activity-prompt">${activity.prompt}</p>
      <ul class="slide-activity-list">
        ${activity.steps.map((step) => `<li>${step}</li>`).join('')}
      </ul>
    </section>
  `;
}

function renderStoryboardRegion(storyboard) {
  if (!storyboard?.frames?.length) {
    return '';
  }

  return `
    <div class="slide-visual-region slide-visual-region--storyboard">
      <div class="slide-visual-topline">
        <span class="slide-visual-hint">Narration frames</span>
        <div class="slide-visual-dots" role="tablist" aria-label="Narration frames">
          ${storyboard.frames
            .map(
              (_, index) => `
                <button
                  class="slide-visual-dot${index === 0 ? ' is-active' : ''}"
                  type="button"
                  data-storyboard-dot="${index}"
                  aria-label="Go to frame ${index + 1}"
                ></button>`,
            )
            .join('')}
        </div>
      </div>
      <section class="slide-storyboard-card" data-storyboard-sequence data-cue-points="${storyboard.cuePoints.join(',')}">
        ${storyboard.frames
          .map(
            (frame, index) => `
              <img
                class="slide-storyboard-frame${index === 0 ? ' is-active' : ''}"
                src="${frame.src.startsWith('/') ? `${ASSET_BASE}${frame.src}` : frame.src}"
                alt="${frame.alt}"
                loading="lazy"
                decoding="async"
                data-storyboard-frame="${index}"
              />`,
          )
          .join('')}
      </section>
    </div>
  `;
}

function renderStoryboardCaptions(slide, storyboard) {
  if (!storyboard?.frames?.length) {
    return '';
  }

  return `
    <div class="story-caption-list" data-story-caption-list>
      ${storyboard.frames
        .map((frame, index) => {
          const caption = cleanStoryboardCaption(frame.alt, slide.title);
          return `
            <button
              class="story-caption${index === 0 ? ' is-active' : ''}"
              type="button"
              data-story-caption="${index}"
            >
              <span class="story-caption-index">${String(index + 1).padStart(2, '0')}</span>
              <span>${caption}</span>
            </button>
          `;
        })
        .join('')}
    </div>
  `;
}

function renderVisualRegion(visuals = []) {
  if (!visuals.length) {
    return '';
  }

  return `
    <div class="slide-visual-region">
      <div class="slide-visual-topline">
        <span class="slide-visual-hint">${visuals.length > 1 ? 'Swipe visuals' : 'Slide visual'}</span>
        ${
          visuals.length > 1
            ? `<div class="slide-visual-dots" role="tablist" aria-label="Slide visuals">
                ${visuals
                  .map(
                    (_, index) => `
                      <button
                        class="slide-visual-dot${index === 0 ? ' is-active' : ''}"
                        type="button"
                        data-visual-dot="${index}"
                        aria-label="Go to visual ${index + 1}"
                      ></button>`,
                  )
                  .join('')}
              </div>`
            : ''
        }
      </div>
      <div class="slide-visual-grid${visuals.length > 1 ? ' is-carousel' : ''}" ${
        visuals.length > 1 ? 'data-visual-carousel' : ''
      }>
        ${visuals.map((visual) => renderVisual(visual)).join('')}
      </div>
    </div>
  `;
}

export function renderLectureDeck(track) {
  return `
    <section class="module-card lecture-card">
      <div class="card-topline">
        <span class="status-pill">Story deck</span>
        <div class="lecture-top-actions">
          <button class="btn btn-sm btn-outline-light lecture-voice-toggle" type="button" data-voice-toggle>
            Narration Off
          </button>
          <button class="btn btn-sm btn-outline-light lecture-voice-stop" type="button" data-voice-playback>
            Play
          </button>
          <span class="count-pill">${track.lectureSlides.length} slides</span>
        </div>
      </div>
      <h2 class="section-title">Narrated cognitive upgrade</h2>
      <div id="lecture-deck" class="lecture-deck" data-track="${track.id}">
        ${track.lectureSlides
          .map(
            (slide, index) => {
              const storyboard = slideStoryboards[track.id]?.[index] || null;
              return `
              <article class="lecture-slide ${slide.sectionBreak ? 'lecture-slide--section' : ''} ${index === 0 ? 'is-active' : ''}" data-slide-index="${index}">
                ${slide.sectionBreak ? '' : storyboard ? renderStoryboardRegion(storyboard) : renderVisualRegion(slide.visuals)}
                <div class="lecture-copy">
                  ${slide.sectionBreak ? '' : `<div class="slide-index">0${index + 1}</div>`}
                  ${slide.eyebrow ? `<div class="slide-eyebrow">${slide.eyebrow}</div>` : ''}
                  <h3>${slide.title}</h3>
                  ${
                    storyboard
                      ? renderStoryboardCaptions(slide, storyboard)
                      : `
                        ${slide.lead ? `<p class="slide-lead">${slide.lead}</p>` : ''}
                        ${slide.body ? `<p>${slide.body}</p>` : ''}
                        ${
                          slide.points?.length
                            ? `<ul class="slide-point-list">
                                ${slide.points.map((point) => `<li>${point}</li>`).join('')}
                              </ul>`
                            : ''
                        }
                      `
                  }
                  ${renderActivity(slide.activity)}
                  <details class="slide-transcript">
                    <summary>Transcript</summary>
                    <div class="slide-transcript-copy">${getSlideNarration(track, slide, index)}</div>
                  </details>
                </div>
              </article>`;
            },
          )
          .join('')}
      </div>
      <div class="deck-controls">
        <button class="btn btn-outline-light" type="button" data-slide-action="prev">Back</button>
        <button class="btn btn-primary" type="button" data-slide-action="next">Next</button>
      </div>
    </section>
  `;
}
