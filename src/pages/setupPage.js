import {connectorStack} from '../data/tracks.js';

export function renderSetupPage() {
  return `
    <section class="dashboard-page">
      <div class="container-xl">
        <div class="section-heading-row">
          <div>
            <div class="kicker">Setup</div>
            <h1 class="dashboard-title">Get your stack ready</h1>
            <p class="dashboard-subtitle">This dashboard assumes your AI stack is already connected before you start opening sheet kits.</p>
          </div>
        </div>

        <div class="dashboard-grid">
          <div class="main-column">
            <section class="module-card">
              <div class="card-topline">
                <span class="status-pill">Checklist</span>
              </div>
              <h2 class="section-title">Core connectors</h2>
              <div class="connector-stack">
                ${connectorStack
                  .map(
                    (item) => `
                      <div class="connector-row">
                        <div class="connector-dot"></div>
                        <div>${item}</div>
                      </div>`,
                  )
                  .join('')}
              </div>
            </section>
          </div>
          <div class="side-column">
            <section class="module-card">
              <div class="card-topline">
                <span class="status-pill">Mobile first</span>
              </div>
              <h2 class="section-title">Before class</h2>
              <div class="step-stack">
                <div class="step-row"><div class="step-index">01</div><div>Test ChatGPT on your phone or iPad.</div></div>
                <div class="step-row"><div class="step-index">02</div><div>Make sure Sheets is connected and usable from that device.</div></div>
                <div class="step-row"><div class="step-index">03</div><div>Open one workflow here and try the copy buttons.</div></div>
                <div class="step-row"><div class="step-index">04</div><div>Use desktop later for deeper editing, not for first access.</div></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  `;
}
