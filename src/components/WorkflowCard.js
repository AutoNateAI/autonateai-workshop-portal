export function renderWorkflowCard(workflow) {
  return `
    <article class="module-card workflow-tile">
      <div class="card-topline">
        <span class="status-pill">Sheet kit</span>
        <span class="count-pill">${workflow.prompts.length} prompts</span>
      </div>
      <h3 class="workflow-title">${workflow.name}</h3>
      <p class="workflow-summary">${workflow.summary}</p>
      <div class="sheet-chip">${workflow.sheet.title}</div>
      <div class="connector-chip-row">
        ${workflow.connectors.map((connector) => `<span class="connector-chip">${connector}</span>`).join('')}
      </div>
      <a class="btn btn-outline-light w-100 mt-3" href="#/workflows/${workflow.slug}" data-nav="/workflows/${workflow.slug}">
        Open sheet kit
      </a>
    </article>
  `;
}
