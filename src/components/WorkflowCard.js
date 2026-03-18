export function renderWorkflowCard(workflow) {
  return `
    <article class="content-card workflow-card h-100">
      <div class="d-flex justify-content-between gap-3 align-items-start mb-3">
        <div>
          <div class="section-label">${workflow.trackId}</div>
          <h3 class="h4 mb-2">${workflow.name}</h3>
        </div>
        <span class="pill">AI Workflow</span>
      </div>
      <p class="text-secondary mb-3">${workflow.summary}</p>
      <p class="small text-secondary mb-4"><strong>Best for:</strong> ${workflow.useCase}</p>
      <div class="d-flex flex-wrap gap-2 mb-4">
        ${workflow.connectors.map((connector) => `<span class="pill">${connector}</span>`).join('')}
      </div>
      <a class="btn btn-outline-light mt-auto" href="#/workflows/${workflow.slug}" data-nav="/workflows/${workflow.slug}">
        Open Workflow
      </a>
    </article>
  `;
}
