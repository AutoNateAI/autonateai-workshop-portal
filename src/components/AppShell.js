export function renderAppShell(content, currentPath, user) {
  const navItems = [
    {href: '/', label: 'Dashboard'},
    {href: '/tracks/student', label: 'Student'},
    {href: '/tracks/researcher', label: 'Research'},
    {href: '/setup', label: 'Setup'},
  ];

  return `
    <div class="dashboard-shell">
      <header class="topbar">
        <div class="container-xl d-flex align-items-center justify-content-between gap-3">
          <div>
            <div class="brand-mark">AutoNateAI Workshop</div>
            <div class="brand-subtle">${user?.preview ? 'Portal preview' : 'Member dashboard'}</div>
          </div>
          ${
            user
              ? `
            <div class="topbar-user">
              <div class="user-badge">${getUserInitials(user)}</div>
              <div class="topbar-meta">
                <div class="topbar-email">${user.preview ? 'Live product preview' : user.email || 'Signed in'}</div>
                ${user.preview ? '' : '<button class="topbar-link" type="button" data-sign-out>Sign out</button>'}
              </div>
            </div>`
              : ''
          }
        </div>
      </header>
      <div class="app-body">
        <aside class="side-rail">
          <div class="side-rail-inner">
            ${navItems.map((item) => sideRailLink(item, currentPath)).join('')}
          </div>
        </aside>
        <main class="main-stage">${content}</main>
      </div>
      ${
        user
          ? `
        <nav class="mobile-dock">
          ${navItems.map((item) => mobileDockLink(item, currentPath)).join('')}
        </nav>`
          : ''
      }
    </div>
  `;
}

function sideRailLink(item, currentPath) {
  const active = currentPath === item.href ? 'is-active' : '';
  return `<a class="rail-link ${active}" href="#${item.href}" data-nav="${item.href}">${item.label}</a>`;
}

function mobileDockLink(item, currentPath) {
  const active = currentPath === item.href ? 'is-active' : '';
  return `<a class="dock-link ${active}" href="#${item.href}" data-nav="${item.href}">${item.label}</a>`;
}

function getUserInitials(user) {
  const seed = user.displayName || user.email || 'A';
  return seed
    .split(/[ .@_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase())
    .join('');
}
