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
                  <button class="btn btn-sm btn-primary" type="button" data-copy-template="prompt-${workflow.slug}-${index}">
                    Copy
                  </button>
                </div>
                <div class="prompt-template" data-prompt-root="prompt-${workflow.slug}-${index}">
                  ${renderPromptTemplate(prompt.body, `prompt-${workflow.slug}-${index}`)}
                </div>
                <textarea id="prompt-${workflow.slug}-${index}" class="visually-hidden">${escapeHtml(prompt.body)}</textarea>
              </article>`,
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderPromptTemplate(body, promptId) {
  const tokens = body.split(/(\[[^\]]+\])/g).filter(Boolean);
  let fieldIndex = 0;

  return tokens
    .map((token) => {
      const placeholderMatch = token.match(/^\[(.*)\]$/);
      if (!placeholderMatch) {
        return `<span class="prompt-text">${escapeHtml(token).replaceAll('\n', '<br />')}</span>`;
      }

      const placeholder = placeholderMatch[1];
      const wideClass = placeholder.length > 16 || /paste|insert|describe|summarize/i.test(placeholder) ? 'is-wide' : '';
      const fieldId = `${promptId}-field-${fieldIndex++}`;
      return `<textarea id="${fieldId}" class="inline-fill ${wideClass}" rows="1" data-template-field placeholder="${escapeAttribute(placeholder)}"></textarea>`;
    })
    .join('');
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function escapeAttribute(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}
