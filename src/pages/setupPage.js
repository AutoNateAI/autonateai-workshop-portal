import {connectorStack} from '../data/tracks.js';

export function renderSetupPage() {
  return `
    <section class="dashboard-page">
      <div class="container-xl">
        <section class="module-card setup-hero-card">
          <div class="kicker">Setup</div>
          <h1 class="dashboard-title">Get your stack ready</h1>
          <p class="dashboard-subtitle">Connect the core tools on the device you will actually use in the workshop. Phone and iPad first. Desktop later.</p>
        </section>

        <div class="setup-stack">
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
    </section>
  `;
}
