import {workflowIndex} from '../data/workflows.js';
import {renderPromptCard} from '../components/PromptCard.js';
import {initCopyPrompt} from '../features/copyPrompt.js';

export function renderWorkflowPage(slug) {
  const workflow = workflowIndex[slug];
  if (!workflow) {
    return `<section class="section-shell"><div class="container"><div class="content-card">Workflow not found.</div></div></section>`;
  }

  queueMicrotask(() => {
    initCopyPrompt();
  });

  return `
    <section class="section-shell pt-5">
      <div class="container">
        <a class="eyebrow text-uppercase small fw-semibold text-decoration-none" href="#/tracks/${workflow.trackId}" data-nav="/tracks/${workflow.trackId}">
          Back to ${workflow.trackId} track
        </a>
        <div class="row g-4 mt-1">
          <div class="col-12 col-xl-7">
            <div class="content-card">
              <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
                <div>
                  <div class="section-label">AI Workflow</div>
                  <h1 class="display-6 fw-bold mb-2">${workflow.name}</h1>
                </div>
                <span class="pill">${workflow.trackId}</span>
              </div>
              <p class="lead text-secondary mb-4">${workflow.summary}</p>
              <div class="mb-4">
                <div class="section-label">Best for</div>
                <p class="mb-0">${workflow.useCase}</p>
              </div>
              <div class="mb-4">
                <div class="section-label">Connectors</div>
                <div class="d-flex flex-wrap gap-2">
                  ${workflow.connectors.map((connector) => `<span class="pill">${connector}</span>`).join('')}
                </div>
              </div>
              <div class="mini-card">
                <strong>Workflow UX direction</strong>
                <p class="mb-0 mt-2 text-secondary">This page is mobile-first: short context, visible connectors, one large copy button, and prompt text that can be lifted directly into ChatGPT on phone or iPad.</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-xl-5">
            ${renderPromptCard(workflow)}
          </div>
        </div>
      </div>
    </section>
  `;
}
