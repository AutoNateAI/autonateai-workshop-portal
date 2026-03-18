export function renderBlueprintPage() {
  const pageList = [
    ['Landing', 'Explains the workshop model and routes people into the right track'],
    ['Student Track', 'Mini lecture, juggling quest, six AI workflows, reflection framing'],
    ['Researcher Track', 'Mini lecture, insight quest, six AI workflows, reflection framing'],
    ['Workflow Detail', 'Copy prompt UX, connector requirements, mobile-first execution'],
    ['Setup', 'Connector onboarding for ChatGPT, Sheets, Figma, and Web Search'],
    ['Member Dashboard', 'Future Firebase-backed area for saved progress, unlocks, and purchased access'],
  ];

  const architecture = [
    'Data-first content model so workshops and workflows are easy to extend',
    'Reusable render functions instead of page-specific one-off markup',
    'Feature modules for animation, graph interaction, prompt copy, and future auth state',
    'Firebase client bootstrap isolated in one module so auth and persistence can scale cleanly',
    'Hash routing to keep GitHub Pages deployment simple',
  ];

  return `
    <section class="section-shell pt-5">
      <div class="container">
        <div class="content-card mb-4">
          <div class="section-label">Blueprint</div>
          <h1 class="display-6 fw-bold mb-3">Portal architecture and workshop shape</h1>
          <p class="lead text-secondary mb-0">The site is structured as a workshop system, not a loose library. Lecture gives the concepts, the quest gives the scenario, the AI workflows give the repeatable actions, and the debrief creates the feedback loop.</p>
        </div>

        <div class="row g-4">
          <div class="col-12 col-lg-6">
            <div class="content-card h-100">
              <div class="section-label">Page map</div>
              <div class="d-flex flex-column gap-3">
                ${pageList
                  .map(
                    ([title, body]) => `
                      <div class="mini-card">
                        <strong>${title}</strong>
                        <p class="mb-0 mt-2 text-secondary">${body}</p>
                      </div>`,
                  )
                  .join('')}
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="content-card h-100">
              <div class="section-label">Frontend architecture</div>
              <ul class="outcome-list">
                ${architecture.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
