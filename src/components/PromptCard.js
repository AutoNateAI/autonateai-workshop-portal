export function renderPromptCard(workflow) {
  return `
    <section class="module-card prompt-pack-card">
      <div class="card-topline">
        <span class="status-pill">Prompt pack</span>
        <span class="count-pill">${workflow.prompts.length} prompts</span>
      </div>
      <h2 class="section-title">Run this sheet with these prompts</h2>
      <div class="prompt-pack">
        ${workflow.prompts
          .map(
            (prompt, index) => `
              <article class="prompt-block">
                <div class="prompt-block-head">
                  <div>
                    <div class="prompt-kicker">Prompt ${index + 1}</div>
                    <h3>${prompt.title}</h3>
                  </div>
                  <button class="btn btn-sm btn-primary" type="button" data-copy-target="prompt-${workflow.slug}-${index}">
                    Copy
                  </button>
                </div>
                <pre id="prompt-${workflow.slug}-${index}" class="prompt-pre">${escapeHtml(prompt.body)}</pre>
              </article>`,
          )
          .join('')}
      </div>
    </section>
  `;
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
