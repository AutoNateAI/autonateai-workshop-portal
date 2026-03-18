export function renderTrackCard(track) {
  return `
    <article class="module-card track-card">
      <div class="card-topline">
        <span class="status-pill">${track.status}</span>
        <span class="count-pill">${track.workflows.length} kits</span>
      </div>
      <h2 class="track-title">${track.label}</h2>
      <p class="track-hero">${track.hero}</p>
      <p class="track-audience">${track.audience}</p>
      <div class="metric-strip">
        <div>
          <div class="metric-label">Slides</div>
          <div class="metric-value">${track.lectureSlides.length}</div>
        </div>
        <div>
          <div class="metric-label">Workflows</div>
          <div class="metric-value">${track.workflows.length}</div>
        </div>
        <div>
          <div class="metric-label">Mode</div>
          <div class="metric-value">Sheets + AI</div>
        </div>
      </div>
      <a class="btn btn-primary w-100 mt-3" href="#/tracks/${track.id}" data-nav="/tracks/${track.id}">Open dashboard</a>
    </article>
  `;
}
