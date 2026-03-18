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

        <div class="stat-row">
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
            <section class="module-card">
              <div class="card-topline">
                <span class="status-pill">Graph view</span>
              </div>
              <h2 class="section-title">Track map</h2>
              <div id="workflow-graph" class="workflow-graph"></div>
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
