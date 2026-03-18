import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

import {renderAppShell} from './components/AppShell.js';
import {renderHomePage} from './pages/homePage.js';
import {renderTrackPage} from './pages/trackPage.js';
import {renderWorkflowPage} from './pages/workflowPage.js';
import {renderSetupPage} from './pages/setupPage.js';
import {renderLoginPage} from './pages/loginPage.js';
import {initRouter, navigateTo} from './lib/router.js';
import {initFirebaseClient} from './lib/firebase.js';
import {observeAuthState, signOutCurrentUser} from './lib/auth.js';
import {initAuthUi} from './features/authUi.js';
import {teardownLectureDeck} from './features/lectureDeck.js';

const app = document.querySelector('#app');

const authState = {
  ready: false,
  user: null,
};

const routes = {
  '/': () => renderHomePage(authState.user),
  '/login': renderLoginPage,
  '/setup': renderSetupPage,
  '/tracks/student': () => renderTrackPage('student'),
  '/tracks/researcher': () => renderTrackPage('researcher'),
};

function render() {
  teardownLectureDeck();

  const path = window.location.hash.replace('#', '') || '/';
  const workflowMatch = path.match(/^\/workflows\/([^/]+)$/);

  if (!authState.ready) {
    app.innerHTML = `<div class="auth-shell"><div class="auth-card"><div class="brand-mark mb-2">AutoNateAI Workshop</div><div class="auth-title">Loading dashboard...</div></div></div>`;
    return;
  }

  if (!authState.user && path !== '/login') {
    navigateTo('/login');
    return;
  }

  if (authState.user && path === '/login') {
    navigateTo('/');
    return;
  }

  const pageContent = workflowMatch
    ? renderWorkflowPage(workflowMatch[1])
    : (routes[path] || (() => renderHomePage(authState.user)))();

  app.innerHTML = renderAppShell(pageContent, path, authState.user);
  document.title = 'AutoNateAI Workshop Dashboard';
  bindGlobalActions();
  initAuthUi();
  window.scrollTo(0, 0);
}

function bindGlobalActions() {
  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = event.currentTarget.getAttribute('data-nav');
      if (!href) {
        return;
      }
      event.preventDefault();
      navigateTo(href);
    });
  });

  document.querySelectorAll('[data-sign-out]').forEach((button) => {
    button.addEventListener('click', async () => {
      await signOutCurrentUser();
      navigateTo('/login');
    });
  });
}

initFirebaseClient();
observeAuthState((user) => {
  authState.user = user;
  authState.ready = true;
  render();
});

initRouter(render);
render();
