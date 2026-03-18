import {renderHero} from '../components/Hero.js';
import {renderTrackCard} from '../components/TrackCard.js';
import {renderConnectorList} from '../components/ConnectorList.js';
import {tracks, connectorStack} from '../data/tracks.js';
import {initHeroSlides} from '../features/heroSlides.js';

export function renderHomePage() {
  queueMicrotask(() => {
    initHeroSlides();
  });

  return `
    ${renderHero({
      eyebrow: 'Workshop portal blueprint',
      title: 'Mini lecture. Quest. AI workflows. Reflection.',
      body: 'This portal is built around two workshop tracks: the overloaded student and the insight-hunting researcher. Each track teaches graph thinking, systems thinking, and a repeatable AI workflow stack that works on mobile first and still feels strong on desktop.',
      primary: {href: '/tracks/student', label: 'Open Student Track'},
      secondary: {href: '/blueprint', label: 'View Blueprint'},
    })}

    <section class="section-shell">
      <div class="container">
        <div class="row g-4">
          ${Object.values(tracks)
            .map((track) => renderTrackCard(track))
            .join('')}
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="row g-4 align-items-stretch">
          <div class="col-12 col-lg-7">
            <div class="content-card h-100">
              <div class="section-label">Portal framing</div>
              <h2 class="h3 mb-3">What lives on the workshop site</h2>
              <div class="row g-3">
                ${[
                  'Animated lecture slides powered by Anime.js',
                  'Quest-first workshop tracks for students and researchers',
                  'AI workflow pages with copy-to-clipboard prompts',
                  'Cytoscape workflow graph for drag-and-explore interactions',
                  'Firebase-ready foundation for members, saved state, and progress',
                  'Mobile-first layout for ChatGPT on phone and iPad',
                ]
                  .map(
                    (item) => `
                      <div class="col-12 col-md-6">
                        <div class="mini-card">${item}</div>
                      </div>`,
                  )
                  .join('')}
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-5">
            ${renderConnectorList(connectorStack)}
          </div>
        </div>
      </div>
    </section>
  `;
}
