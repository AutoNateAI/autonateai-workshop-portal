function renderGraphVisual(visual) {
  return `
    <section class="slide-visual-card">
      <div class="slide-visual-title">${visual.title}</div>
      <div class="graph-node-grid">
        ${visual.nodes
          .map(
            (node) => `
              <div class="graph-node graph-node--${node.tone || 'muted'}">${node.label}</div>`,
          )
          .join('')}
      </div>
      <div class="graph-edge-list">
        ${visual.edges.map((edge) => `<div class="graph-edge">${edge}</div>`).join('')}
      </div>
    </section>
  `;
}

function renderTableVisual(visual) {
  return `
    <section class="slide-visual-card">
      <div class="slide-visual-title">${visual.title}</div>
      <div class="slide-table-wrap">
        <table class="slide-table">
          <thead>
            <tr>${visual.columns.map((column) => `<th>${column}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${visual.rows
              .map(
                (row) => `
                  <tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`,
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderChartVisual(visual) {
  return `
    <section class="slide-visual-card">
      <div class="slide-visual-title">${visual.title}</div>
      <div class="chart-stack">
        ${visual.items
          .map(
            (item) => `
              <div class="chart-row">
                <div class="chart-row-head">
                  <span>${item.label}</span>
                  <strong>${item.value}</strong>
                </div>
                <div class="chart-bar-shell">
                  <div class="chart-bar chart-bar--${item.tone || 'muted'}" style="width: ${item.value}%"></div>
                </div>
              </div>`,
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderVisual(visual) {
  if (visual.type === 'graph') {
    return renderGraphVisual(visual);
  }

  if (visual.type === 'table') {
    return renderTableVisual(visual);
  }

  return renderChartVisual(visual);
}

export function renderLectureDeck(track) {
  return `
    <section class="module-card lecture-card">
      <div class="card-topline">
        <span class="status-pill">Lecture deck</span>
        <span class="count-pill">${track.lectureSlides.length} slides</span>
      </div>
      <h2 class="section-title">Mini lecture</h2>
      <div id="lecture-deck" class="lecture-deck" data-track="${track.id}">
        ${track.lectureSlides
          .map(
            (slide, index) => `
              <article class="lecture-slide ${index === 0 ? 'is-active' : ''}" data-slide-index="${index}">
                <div class="lecture-copy">
                  <div class="slide-index">0${index + 1}</div>
                  <div class="slide-eyebrow">${slide.eyebrow || 'Lecture'}</div>
                  <h3>${slide.title}</h3>
                  <p class="slide-lead">${slide.lead || ''}</p>
                  <p>${slide.body}</p>
                  ${
                    slide.points?.length
                      ? `<ul class="slide-point-list">
                          ${slide.points.map((point) => `<li>${point}</li>`).join('')}
                        </ul>`
                      : ''
                  }
                </div>
                <div class="slide-visual-grid">
                  ${(slide.visuals || []).map((visual) => renderVisual(visual)).join('')}
                </div>
              </article>`,
          )
          .join('')}
      </div>
      <div class="deck-controls">
        <button class="btn btn-outline-light" type="button" data-slide-action="prev">Back</button>
        <button class="btn btn-primary" type="button" data-slide-action="next">Next</button>
      </div>
    </section>
  `;
}
