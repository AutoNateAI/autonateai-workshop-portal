import {renderConnectorList} from '../components/ConnectorList.js';
import {connectorStack} from '../data/tracks.js';

export function renderSetupPage() {
  return `
    <section class="section-shell pt-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-12 col-lg-7">
            <div class="content-card h-100">
              <div class="section-label">Workshop setup</div>
              <h1 class="display-6 fw-bold mb-3">Get the connector stack ready before class</h1>
              <p class="lead text-secondary">The workshop experience assumes students and researchers can move between ChatGPT, Google Sheets, and Figma without friction. The mobile experience matters, but the system should still look sharp on desktop.</p>
              <div class="row g-3 mt-2">
                ${[
                  'Enable Web Search in ChatGPT so fresh context can be pulled when needed.',
                  'Connect Google Sheets so structured outputs can become tables, dashboards, and daily operating surfaces.',
                  'Connect Figma so visual maps, study boards, and research canvases can be generated or refined.',
                  'Test the workflow on your phone or iPad first, then on desktop.',
                ]
                  .map(
                    (item) => `
                      <div class="col-12">
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
