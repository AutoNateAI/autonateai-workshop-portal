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
                <div class="slide-index">0${index + 1}</div>
                <h3>${slide.title}</h3>
                <p>${slide.body}</p>
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
