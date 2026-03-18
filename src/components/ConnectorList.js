export function renderConnectorList(connectors) {
  return `
    <section class="content-card">
      <div class="section-label">Connector stack</div>
      <h2 class="h4 mb-3">Have these ready before the workshop</h2>
      <div class="d-flex flex-column gap-3">
        ${connectors
          .map(
            (connector) => `
            <div class="connector-row">
              <div class="connector-dot"></div>
              <div>${connector}</div>
            </div>`,
          )
          .join('')}
      </div>
    </section>
  `;
}
