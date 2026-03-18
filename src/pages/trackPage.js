import {tracks, connectorStack} from '../data/tracks.js';
import {renderLectureDeck} from '../components/LectureDeck.js';
import {renderWorkflowCard} from '../components/WorkflowCard.js';
import {initLectureDeck} from '../features/lectureDeck.js';
import {initWorkflowGraph} from '../features/workflowGraph.js';

export function renderTrackPage(trackId) {
  const track = tracks[trackId];
  if (!track) {
    return `<section class="dashboard-page"><div class="container-xl"><div class="module-card">Track not found.</div></div></section>`;
  }

  queueMicrotask(() => {
    initLectureDeck();
    initWorkflowGraph(track);
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

        <div class="track-utility-row">
          <div class="stat-row stat-row--compact">
            <div class="stat-panel">
              <div class="stat-heading">${track.lectureSlides.length}</div>
              <div class="stat-caption">Lecture slides</div>
            </div>
            <div class="stat-panel">
              <div class="stat-heading">${track.workflows.length}</div>
              <div class="stat-caption">Sheet kits</div>
            </div>
            <div class="stat-panel">
              <div class="stat-heading">3</div>
              <div class="stat-caption">Core connectors</div>
            </div>
          </div>
          <section class="module-card sheet-menu-card">
            <details class="sheet-menu">
              <summary>
                <span class="sheet-menu-icon">☰</span>
                <span>Open sheet menu</span>
              </summary>
              <div class="sheet-menu-list">
                ${track.workflows
                  .map(
                    (workflow, index) => `
                      <a class="sheet-menu-link" href="#/workflows/${workflow.slug}" data-nav="/workflows/${workflow.slug}">
                        <span class="sheet-menu-number">0${index + 1}</span>
                        <span>${workflow.sheet.title}</span>
                      </a>`,
                  )
                  .join('')}
              </div>
            </details>
          </section>
        </div>

        <div class="dashboard-grid">
          <div class="main-column">
            ${renderLectureDeck(track)}
            <section class="module-card">
              <div class="card-topline">
                <span class="status-pill">Quest</span>
                <span class="count-pill">${track.quest.steps.length} steps</span>
              </div>
              <h2 class="section-title">${track.quest.title}</h2>
              <p class="section-copy">${track.quest.summary}</p>
              <div class="step-stack">
                ${track.quest.steps
                  .map(
                    (step, index) => `
                      <div class="step-row">
                        <div class="step-index">0${index + 1}</div>
                        <div>${step}</div>
                      </div>`,
                  )
                  .join('')}
              </div>
            </section>
          </div>
          <div class="side-column">
            <section class="module-card">
              <div class="card-topline">
                <span class="status-pill">Connectors</span>
              </div>
              <h2 class="section-title">What should already be connected</h2>
              <div class="connector-stack">
                ${connectorStack
                  .map(
                    (item) => `
                      <div class="connector-row">
                        <div class="connector-dot"></div>
                        <div>${item}</div>
                      </div>`,
                  )
                  .join('')}
              </div>
            </section>
            <section class="module-card map-shell">
              <details class="map-details">
                <summary>
                  <span>Track map</span>
                  <span class="count-pill">Tap to expand</span>
                </summary>
                <div class="map-console">
                  <div class="map-toolbar">
                    <button class="btn btn-sm btn-outline-light" type="button" data-graph-focus="reset">Fit</button>
                    <button class="btn btn-sm btn-outline-light" type="button" data-graph-focus="lecture">Lecture</button>
                    <button class="btn btn-sm btn-outline-light" type="button" data-graph-focus="quest">Quest</button>
                    <button class="btn btn-sm btn-outline-light" type="button" data-graph-focus="reflection">Reflection</button>
                  </div>
                  <div class="map-info-panel">
                    <div class="kicker" data-graph-info-kicker>Track map</div>
                    <h3 class="map-info-title" data-graph-info-title>Lecture -> quest -> sheet kit -> reflection</h3>
                    <p class="map-info-copy" data-graph-info-copy>Tap a node to see what it does. Use the controls to focus on a stage of the system instead of staring at the whole graph at once.</p>
                  </div>
                  <div id="workflow-graph" class="workflow-graph"></div>
                </div>
              </details>
            </section>
          </div>
        </div>

        <section class="dashboard-section">
          <div class="section-heading-row">
            <div>
              <div class="kicker">Sheet kits</div>
              <h2 class="section-title">Open a sheet-specific workflow</h2>
            </div>
          </div>
          <div class="workflow-grid">
            ${track.workflows
              .map(
                (workflow) => `
                  <div>
                    ${renderWorkflowCard(workflow)}
                  </div>`,
              )
              .join('')}
          </div>
        </section>
      </div>
    </section>
  `;
}
