export function renderAppShell(content, currentPath) {
  return `
    <div class="site-shell">
      <header class="site-header sticky-top border-bottom border-dark-subtle">
        <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container py-2">
            <a class="navbar-brand fw-semibold" href="#/" data-nav="/">AutoNateAI Workshop</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#portal-nav"
              aria-controls="portal-nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="portal-nav">
              <div class="navbar-nav ms-auto gap-lg-2">
                ${navLink('/tracks/student', 'Students', currentPath)}
                ${navLink('/tracks/researcher', 'Researchers', currentPath)}
                ${navLink('/setup', 'Setup', currentPath)}
                ${navLink('/blueprint', 'Blueprint', currentPath)}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>${content}</main>
    </div>
  `;
}

function navLink(href, label, currentPath) {
  const activeClass = currentPath === href ? 'active' : '';
  return `<a class="nav-link ${activeClass}" href="#${href}" data-nav="${href}">${label}</a>`;
}
