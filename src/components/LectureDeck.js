export function renderLectureDeck(track) {
  const slides = [
    {
      title: track.lectureTitle,
      body: track.lectureSummary,
    },
    {
      title: 'Graphs Explain The Load',
      body: 'Tasks, deadlines, sources, priorities, and responsibilities are connected. When you see relationships, you make stronger decisions.',
    },
    {
      title: 'Systems Create Repeatability',
      body: 'Inputs become structure, structure becomes action, action produces feedback, and feedback upgrades tomorrow.',
    },
    {
      title: 'AI Workflows Make It Practical',
      body: 'The portal teaches a repeatable workflow, not random prompting. That is what turns AI use into capability.',
    },
  ];

  return `
    <section class="content-card h-100">
      <div class="d-flex justify-content-between align-items-center gap-3 mb-4">
        <div>
          <div class="section-label">Mini lecture</div>
          <h2 class="h3 mb-0">20-30 minute concept stack</h2>
        </div>
        <span class="pill">${slides.length} slides</span>
      </div>
      <div id="lecture-deck" class="lecture-deck" data-track="${track.id}">
        ${slides
          .map(
            (slide, index) => `
              <article class="lecture-slide ${index === 0 ? 'is-active' : ''}" data-slide-index="${index}">
                <div class="eyebrow text-uppercase small fw-semibold mb-3">Slide ${index + 1}</div>
                <h3 class="h2 mb-3">${slide.title}</h3>
                <p class="mb-0 text-secondary">${slide.body}</p>
              </article>`,
          )
          .join('')}
      </div>
      <div class="d-flex gap-2 mt-4">
        <button class="btn btn-outline-light" type="button" data-slide-action="prev">Previous</button>
        <button class="btn btn-primary" type="button" data-slide-action="next">Next</button>
      </div>
    </section>
  `;
}
