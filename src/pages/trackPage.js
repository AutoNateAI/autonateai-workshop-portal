import {tracks} from '../data/tracks.js';
import {renderLectureDeck} from '../components/LectureDeck.js';
import {renderWorkflowCard} from '../components/WorkflowCard.js';
import {renderConnectorList} from '../components/ConnectorList.js';
import {initLectureDeck} from '../features/lectureDeck.js';
import {initWorkflowGraph} from '../features/workflowGraph.js';

export function renderTrackPage(trackId) {
  const track = tracks[trackId];
  if (!track) {
    return `<section class="section-shell"><div class="container"><div class="content-card">Track not found.</div></div></section>`;
  }

  queueMicrotask(() => {
    initLectureDeck();
    initWorkflowGraph(track);
  });

  return `
    <section class="section-shell pt-5">
      <div class="container">
        <div class="d-flex flex-column gap-3 mb-4">
          <div class="eyebrow text-uppercase small fw-semibold">${track.label}</div>
          <h1 class="display-5 fw-bold mb-0">${track.hero}</h1>
          <p class="lead text-secondary mb-0">${track.audience}</p>
        </div>
        <div class="row g-4">
          <div class="col-12 col-xl-7">
            ${renderLectureDeck(track)}
          </div>
          <div class="col-12 col-xl-5">
            ${renderConnectorList(track.workflows[0]?.connectors || [])}
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="row g-4">
          <div class="col-12 col-lg-6">
            <div class="content-card h-100">
              <div class="section-label">Quest</div>
              <h2 class="h3 mb-3">${track.questTitle}</h2>
              <p class="text-secondary mb-4">${track.questSummary}</p>
              <ul class="outcome-list">
                ${track.outcomes.map((outcome) => `<li>${outcome}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="content-card h-100">
              <div class="section-label">Graph map</div>
              <h2 class="h3 mb-3">Lecture to workflow to reflection</h2>
              <p class="text-secondary">This graph is draggable on desktop and touch-draggable on supported mobile browsers. It is the interaction model for how the workshop components connect.</p>
              <div id="workflow-graph" class="workflow-graph"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="d-flex justify-content-between align-items-end gap-3 flex-wrap mb-4">
          <div>
            <div class="section-label">AI workflows</div>
            <h2 class="h3 mb-0">Six workflows in the ${track.label} stack</h2>
          </div>
        </div>
        <div class="row g-4">
          ${track.workflows
            .map(
              (workflow) => `
                <div class="col-12 col-md-6 col-xl-4">
                  ${renderWorkflowCard(workflow)}
                </div>`,
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
