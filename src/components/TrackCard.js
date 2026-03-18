export function renderTrackCard(track) {
  return `
    <article class="col-12 col-lg-6">
      <div class="content-card h-100 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <div class="eyebrow text-uppercase small fw-semibold mb-2">${track.label}</div>
            <h2 class="h3 mb-2">${track.hero}</h2>
          </div>
          <span class="pill">${track.workflows.length} workflows</span>
        </div>
        <p class="text-secondary mb-4">${track.audience}</p>
        <div class="mb-4">
          <div class="section-label">Workshop flow</div>
          <div class="d-flex flex-wrap gap-2">
            <span class="pill">Lecture</span>
            <span class="pill">Quest</span>
            <span class="pill">Workflows</span>
            <span class="pill">Debrief</span>
          </div>
        </div>
        <div class="mt-auto d-flex flex-wrap gap-2">
          <a class="btn btn-primary" href="#/tracks/${track.id}" data-nav="/tracks/${track.id}">Open Track</a>
        </div>
      </div>
    </article>
  `;
}
