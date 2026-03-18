export function renderPromptCard(workflow) {
  return `
    <section class="content-card sticky-card">
      <div class="d-flex justify-content-between align-items-center gap-3 mb-3">
        <div>
          <div class="section-label">Prompt</div>
          <h2 class="h4 mb-0">Copy into ChatGPT</h2>
        </div>
        <button class="btn btn-primary" type="button" data-copy-prompt="${workflow.slug}">Copy Prompt</button>
      </div>
      <textarea class="prompt-textarea form-control" rows="16" readonly>${workflow.prompt}</textarea>
      <p class="small text-secondary mt-3 mb-0">Use this as the default scaffold, then fill in the blanks with your real context before sending it to ChatGPT.</p>
    </section>
  `;
}
