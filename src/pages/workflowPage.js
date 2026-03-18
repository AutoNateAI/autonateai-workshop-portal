import {workflowIndex} from '../data/workflows.js';
import {tracks} from '../data/tracks.js';
import {renderLectureDeck} from '../components/LectureDeck.js';
import {renderPromptCard} from '../components/PromptCard.js';
import {initLectureDeck} from '../features/lectureDeck.js';
import {initCopyPrompt} from '../features/copyPrompt.js';

export function renderWorkflowPage(slug) {
  const workflow = workflowIndex[slug];
  if (!workflow) {
    return `<section class="dashboard-page"><div class="container-xl"><div class="module-card">Workflow not found.</div></div></section>`;
  }

  queueMicrotask(() => {
    initLectureDeck();
    initCopyPrompt();
  });

  const track = tracks[workflow.trackId];

  return `
    <section class="dashboard-page">
      <div class="container-xl">
        <a class="back-link" href="#/tracks/${workflow.trackId}" data-nav="/tracks/${workflow.trackId}">Back to ${workflow.trackId} dashboard</a>
        <div class="workflow-layout">
          <div class="main-column">
            ${renderLectureDeck(track)}
            ${renderPromptCard(workflow)}
          </div>
          <div class="side-column workflow-side-column">
            <section class="module-card">
              <div class="card-topline">
                <span class="status-pill">Sheet design</span>
                <span class="count-pill">${workflow.trackId}</span>
              </div>
              <h1 class="section-title">${workflow.name}</h1>
              <p class="dashboard-subtitle">${workflow.summary}</p>
              ${
                workflow.sheet.copyUrl
                  ? `<div class="workflow-primary-actions mt-3">
                      <a class="btn btn-primary" href="${workflow.sheet.copyUrl}" target="_blank" rel="noopener noreferrer">Copy this sheet</a>
                      <a class="btn btn-outline-light" href="${workflow.sheet.templateUrl}" target="_blank" rel="noopener noreferrer">Preview template</a>
                    </div>`
                  : ''
              }
              <div class="sheet-meta-grid mt-3">
                <div class="sheet-panel">
                  <div class="sheet-label">Sheet</div>
                  <div class="sheet-value">${workflow.sheet.title}</div>
                </div>
                <div class="sheet-panel">
                  <div class="sheet-label">Best use</div>
                  <div class="sheet-value">${workflow.useCase}</div>
                </div>
              </div>
              <p class="section-copy mt-3">${workflow.sheet.purpose}</p>
              <div class="sheet-outcome-card">
                <div class="kicker">Outcome</div>
                <strong>${workflow.sheet.outcome}</strong>
              </div>
              <div class="column-grid mt-3">
                ${workflow.sheet.columns
                  .map(
                    (column) => `
                      <div class="column-pill">${column}</div>`,
                  )
                  .join('')}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  `;
}
