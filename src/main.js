import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

import {renderAppShell} from './components/AppShell.js';
import {renderHomePage} from './pages/homePage.js';
import {renderTrackPage} from './pages/trackPage.js';
import {renderWorkflowPage} from './pages/workflowPage.js';
import {renderSetupPage} from './pages/setupPage.js';
import {renderLoginPage} from './pages/loginPage.js';
import {renderPasswordSetupPage} from './pages/passwordSetupPage.js';
import {initRouter, navigateTo} from './lib/router.js';
import {initFirebaseClient} from './lib/firebase.js';
import {observeAuthState, resolvePortalSession, signOutCurrentUser} from './lib/auth.js';
import {initAuthUi} from './features/authUi.js';
import {teardownLectureDeck} from './features/lectureDeck.js';

const app = document.querySelector('#app');

const authState = {
  ready: false,
  user: null,
  hasAccess: false,
  mustChangePassword: false,
  message: '',
};

const previewUser = {
  displayName: 'Portal Preview',
  email: 'preview@autonateai.com',
  preview: true,
};

const routes = {
  '/': () => renderHomePage(authState.user),
  '/login': renderLoginPage,
  '/password-setup': () => renderPasswordSetupPage(authState.user),
  '/setup': renderSetupPage,
  '/tracks/student': () => renderTrackPage('student'),
  '/tracks/researcher': () => renderTrackPage('researcher'),
};

function render() {
  teardownLectureDeck();

  const path = window.location.hash.replace('#', '') || '/';
  const workflowMatch = path.match(/^\/workflows\/([^/]+)$/);
  const previewTrackMatch = path.match(/^\/preview\/(student|researcher)$/);
  const previewWorkflowMatch = path.match(/^\/preview\/workflows\/([^/]+)$/);

  if (previewTrackMatch || previewWorkflowMatch) {
    const previewPath = previewTrackMatch ? `/tracks/${previewTrackMatch[1]}` : path;
    const pageContent = previewTrackMatch
      ? renderTrackPage(previewTrackMatch[1])
      : renderWorkflowPage(previewWorkflowMatch[1]);

    app.innerHTML = renderAppShell(pageContent, previewPath, previewUser);
    document.title = 'AutoNateAI Workshop Preview';
    bindGlobalActions();
    initAuthUi();
    window.scrollTo(0, 0);
    return;
  }

  if (!authState.ready) {
    app.innerHTML = `<div class="auth-shell"><div class="auth-card"><div class="brand-mark mb-2">AutoNateAI Workshop</div><div class="auth-title">Loading dashboard...</div></div></div>`;
    return;
  }

  if (!authState.user && path !== '/login') {
    navigateTo('/login');
    return;
  }

  if (authState.user && !authState.hasAccess && path !== '/login') {
    navigateTo('/login');
    return;
  }

  if (authState.user && authState.mustChangePassword && path !== '/password-setup') {
    navigateTo('/password-setup');
    return;
  }

  if (authState.user && !authState.mustChangePassword && path === '/password-setup') {
    navigateTo('/');
    return;
  }

  if (authState.user && path === '/login') {
    navigateTo('/');
    return;
  }

  const pageContent = workflowMatch
    ? renderWorkflowPage(workflowMatch[1])
    : path === '/login'
      ? renderLoginPage(authState.message)
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
observeAuthState(async (user) => {
  authState.ready = false;
  render();

  if (!user) {
    authState.user = null;
    authState.hasAccess = false;
    authState.mustChangePassword = false;
    authState.message = '';
    authState.ready = true;
    render();
    return;
  }

  try {
    const session = await resolvePortalSession(user);
    if (!session.hasAccess) {
      await signOutCurrentUser();
      authState.user = null;
      authState.hasAccess = false;
      authState.mustChangePassword = false;
      authState.message = session.message || 'No paid portal access found for this email.';
      authState.ready = true;
      render();
      return;
    }

    authState.user = user;
    authState.hasAccess = true;
    authState.mustChangePassword = session.mustChangePassword;
    authState.message = '';
    authState.ready = true;
    render();
  } catch (error) {
    await signOutCurrentUser();
    authState.user = null;
    authState.hasAccess = false;
    authState.mustChangePassword = false;
    authState.message = error instanceof Error ? error.message : 'Unable to load your portal session.';
    authState.ready = true;
    render();
  }
});

initRouter(render);
render();
