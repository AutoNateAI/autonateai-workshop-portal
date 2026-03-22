import {tracks} from '../data/tracks.js';
import {renderLectureDeck} from '../components/LectureDeck.js';
import {initLectureDeck} from '../features/lectureDeck.js';

export function renderTrackPage(trackId) {
  const track = tracks[trackId];
  if (!track) {
    return `<section class="dashboard-page"><div class="container-xl"><div class="module-card">Track not found.</div></div></section>`;
  }

  queueMicrotask(() => {
    initLectureDeck();
  });

  return `
    <section class="dashboard-page">
      <div class="container-xl">
        <div class="section-heading-row mb-3">
          <div>
            <div class="kicker">${track.label}</div>
            <h1 class="dashboard-title">${track.hero}</h1>
            <p class="dashboard-subtitle">${track.audience}</p>
          </div>
        </div>

        ${renderLectureDeck(track)}

        <section class="module-card sheet-menu-panel">
          <div class="card-topline">
            <span class="status-pill">Prompt packs</span>
            <span class="count-pill">${track.workflows.length} templates</span>
          </div>
          <h2 class="section-title">Open a sheet-specific workflow</h2>
          <div class="sheet-button-grid">
            ${track.workflows
              .map(
                (workflow, index) => `
                  <a class="sheet-nav-button" href="#/workflows/${workflow.slug}" data-nav="/workflows/${workflow.slug}">
                    <span class="sheet-nav-number">0${index + 1}</span>
                    <span class="sheet-nav-copy">
                      <strong>${workflow.sheet.title}</strong>
                      <span>${workflow.name}</span>
                    </span>
                  </a>`,
              )
              .join('')}
          </div>
        </section>
      </div>
    </section>
  `;
}

export function renderLockedTrackPage() {
  return `
    <section class="dashboard-page">
      <div class="container-xl">
        <section class="module-card">
          <div class="card-topline">
            <span class="status-pill">Locked</span>
          </div>
          <h1 class="section-title">This track is not in your purchase.</h1>
          <p class="dashboard-subtitle">Use the dashboard to open the course you bought. If this looks wrong, sign out and sign back in with the paid email.</p>
          <a class="btn btn-primary mt-3" href="#/" data-nav="/">Back to dashboard</a>
        </section>
      </div>
    </section>
  `;
}
