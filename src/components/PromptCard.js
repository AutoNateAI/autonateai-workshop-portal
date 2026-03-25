function isWideField(placeholder) {
  return placeholder.length > 24;
}

function renderPromptTemplate(body) {
  const parts = body.split(/(\[[^\]]+\])/g).filter(Boolean);

  return `
    <div class="prompt-template" data-copy-template="${encodeURIComponent(body)}">
      ${parts
        .map((part) => {
          const match = part.match(/^\[([^\]]+)\]$/);
          if (!match) {
            return `<span class="prompt-text">${part}</span>`;
          }

          const placeholder = match[1];
          const wide = isWideField(placeholder) ? ' is-wide' : '';
          return `
            <textarea
              class="inline-fill${wide}"
              rows="1"
              data-copy-field
              data-placeholder="${placeholder}"
              aria-label="${placeholder}"
            ></textarea>
          `;
        })
        .join('')}
    </div>
  `;
}

export function renderPromptCard(workflow) {
  return `
    <section class="module-card prompt-pack-card">
      <div class="prompt-pack-topline">
        <div>
          <div class="card-topline">
            <span class="status-pill">Thinking System</span>
            <span class="count-pill">${workflow.prompts.length} cards</span>
          </div>
          <h2 class="section-title prompt-pack-heading">Fill it in, then run the system in ChatGPT</h2>
        </div>
        <div class="prompt-carousel-controls">
          <button class="btn btn-sm btn-outline-light" type="button" data-prompt-nav="prev">Prev</button>
          <div class="prompt-carousel-status" data-prompt-status>1 / ${workflow.prompts.length}</div>
          <button class="btn btn-sm btn-outline-light" type="button" data-prompt-nav="next">Next</button>
        </div>
      </div>

      <div class="prompt-pack" data-prompt-carousel>
        ${workflow.prompts
          .map(
            (prompt, index) => `
              <article class="prompt-block" data-prompt-slide="${index}">
                <div class="prompt-block-head">
                  <div>
                    <div class="prompt-kicker">Prompt ${index + 1}</div>
                    <h3>${prompt.title}</h3>
                  </div>
                  <button class="btn btn-primary" type="button" data-copy-prompt>Copy prompt</button>
                </div>
                ${renderPromptTemplate(prompt.body)}
              </article>`,
          )
          .join('')}
      </div>

      <div class="prompt-dots" role="tablist" aria-label="Prompt cards">
        ${workflow.prompts
          .map(
            (_, index) => `
              <button
                class="prompt-dot${index === 0 ? ' is-active' : ''}"
                type="button"
                data-prompt-dot="${index}"
                aria-label="Go to prompt ${index + 1}"
              ></button>`,
          )
          .join('')}
      </div>
    </section>
  `;
}
