export function renderHero({eyebrow, title, body, primary, secondary}) {
  return `
    <section class="hero-section">
      <div class="container py-5 py-lg-6">
        <div class="row align-items-center g-4">
          <div class="col-12 col-lg-7">
            <div class="eyebrow text-uppercase small fw-semibold mb-3">${eyebrow}</div>
            <h1 class="display-4 fw-bold mb-3">${title}</h1>
            <p class="hero-copy lead mb-4">${body}</p>
            <div class="d-flex flex-wrap gap-3">
              <a class="btn btn-primary btn-lg" href="#${primary.href}" data-nav="${primary.href}">${primary.label}</a>
              <a class="btn btn-outline-light btn-lg" href="#${secondary.href}" data-nav="${secondary.href}">${secondary.label}</a>
            </div>
          </div>
          <div class="col-12 col-lg-5">
            <div class="hero-panel glass-panel">
              <div class="hero-stack">
                <div class="stat-chip">Story deck</div>
                <div class="stat-chip">Quest</div>
                <div class="stat-chip">Thinking Systems</div>
                <div class="stat-chip">Reflection loop</div>
              </div>
              <div id="hero-slides" class="slide-stack mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
