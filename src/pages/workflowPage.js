import {workflowIndex} from '../data/workflows.js';
import {renderPromptCard} from '../components/PromptCard.js';
import {initCopyPrompt} from '../features/copyPrompt.js';

export function renderWorkflowPage(slug) {
  const workflow = workflowIndex[slug];
  if (!workflow) {
    return `<section class="dashboard-page"><div class="container-xl"><div class="module-card">Workflow not found.</div></div></section>`;
  }

  queueMicrotask(() => {
    initCopyPrompt();
  });

  return `
    <section class="dashboard-page">
      <div class="container-xl">
        <a class="back-link" href="#/tracks/${workflow.trackId}" data-nav="/tracks/${workflow.trackId}">Back to ${workflow.trackId} dashboard</a>
        <div class="workflow-layout">
          <div class="main-column">
            <section class="module-card">
              <div class="card-topline">
                <span class="status-pill">Sheet kit</span>
                <span class="count-pill">${workflow.trackId}</span>
              </div>
              <h1 class="dashboard-title">${workflow.name}</h1>
              <p class="dashboard-subtitle">${workflow.summary}</p>
              <div class="sheet-meta-grid">
                <div class="sheet-panel">
                  <div class="sheet-label">Sheet</div>
                  <div class="sheet-value">${workflow.sheet.title}</div>
                </div>
                <div class="sheet-panel">
                  <div class="sheet-label">Best use</div>
                  <div class="sheet-value">${workflow.useCase}</div>
                </div>
              </div>
            </section>

            <section class="module-card">
              <div class="card-topline">
                <span class="status-pill">Sheet design</span>
              </div>
              <h2 class="section-title">${workflow.sheet.title}</h2>
              <p class="section-copy">${workflow.sheet.purpose}</p>
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
          <div class="side-column">
            ${renderPromptCard(workflow)}
          </div>
        </div>
      </div>
    </section>
  `;
}
