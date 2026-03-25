import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

import {renderAppShell} from './components/AppShell.js';
import {renderLandingPage} from './pages/landingPage.js';
import {renderHomePage} from './pages/homePage.js';
import {renderLockedTrackPage, renderTrackPage} from './pages/trackPage.js';
import {renderLockedWorkflowPage, renderWorkflowPage} from './pages/workflowPage.js';
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
  allowedTrackIds: [],
};

const previewUser = {
  displayName: 'Portal Preview',
  email: 'preview@autonateai.com',
  preview: true,
};

const previewSession = {
  allowedTrackIds: ['student', 'researcher'],
};

const routes = {
  '/': () => renderLandingPage(authState.user),
  '/portal': () => renderPortalPage(),
  '/login': renderLoginPage,
  '/password-setup': () => renderPasswordSetupPage(authState.user),
  '/setup': renderSetupPage,
  '/tracks/student': () => renderTrackForUser('student'),
  '/tracks/researcher': () => renderTrackForUser('researcher'),
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

    app.innerHTML = renderAppShell(pageContent, previewPath, previewUser, previewSession);
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

  if (!authState.user && isProtectedPath(path)) {
    navigateTo('/login');
    return;
  }

  if (authState.user && !authState.hasAccess && path !== '/login' && path !== '/') {
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
    navigateTo('/portal');
    return;
  }

  const pageContent = workflowMatch
    ? renderWorkflowForPath(workflowMatch[1])
    : path === '/login'
      ? renderLoginPage(authState.message)
      : (routes[path] || (() => renderHomePage(authState.user)))();

  if (path === '/' || path === '/login' || path === '/password-setup') {
    app.innerHTML = pageContent;
    document.title =
      path === '/'
        ? 'AutoNateAI | Student Transformation'
        : 'AutoNateAI Workshop Portal';
  } else {
    app.innerHTML = renderAppShell(pageContent, path, authState.user, authState);
    document.title = 'AutoNateAI Workshop Dashboard';
  }
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
      navigateTo('/');
    });
  });

  document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-scroll-target');
      if (!targetId) {
        return;
      }
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
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
    authState.allowedTrackIds = [];
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
      authState.allowedTrackIds = [];
      authState.ready = true;
      render();
      return;
    }

    authState.user = user;
    authState.hasAccess = true;
    authState.mustChangePassword = session.mustChangePassword;
    authState.message = '';
    authState.allowedTrackIds = deriveAllowedTrackIds(session.library);
    authState.ready = true;
    render();
  } catch (error) {
    await signOutCurrentUser();
    authState.user = null;
    authState.hasAccess = false;
    authState.mustChangePassword = false;
    authState.message = error instanceof Error ? error.message : 'Unable to load your portal session.';
    authState.allowedTrackIds = [];
    authState.ready = true;
    render();
  }
});

initRouter(render);
render();

function deriveAllowedTrackIds(library = []) {
  const trackIds = new Set();
  for (const entry of library) {
    if (entry.productId === 'ai-first-student') {
      trackIds.add('student');
    }
    if (entry.productId === 'ai-first-researcher') {
      trackIds.add('researcher');
    }
  }
  return [...trackIds];
}

function renderWorkflowForPath(slug) {
  const workflowHtml = renderWorkflowPage(slug);
  const workflowTrackId = slug.includes('source') || slug.includes('claim') || slug.includes('theme') || slug.includes('gap') || slug.includes('lit-review') || slug.includes('research-narrative')
    ? 'researcher'
    : null;
  const inferredTrackId = workflowTrackId ?? inferTrackIdFromSlug(slug);
  if (inferredTrackId && !authState.allowedTrackIds.includes(inferredTrackId)) {
    return renderLockedWorkflowPage(inferredTrackId);
  }
  return workflowHtml;
}

function renderTrackForUser(trackId) {
  if (!authState.allowedTrackIds.includes(trackId)) {
    return renderLockedTrackPage();
  }
  return renderTrackPage(trackId);
}

function renderPortalPage() {
  if (authState.allowedTrackIds.includes('student')) {
    return renderTrackPage('student');
  }
  if (authState.allowedTrackIds[0]) {
    return renderTrackPage(authState.allowedTrackIds[0]);
  }
  return renderHomePage(authState.user, authState);
}

function isProtectedPath(path) {
  return !['/', '/login'].includes(path);
}

function inferTrackIdFromSlug(slug) {
  const studentSlugs = new Set([
    'daily-time-grid',
    'assignment-sprint-planner',
    'reading-capture-matrix',
    'study-heatmap-board',
    'paper-source-matrix',
    'day-debrief-lab',
  ]);
  const researcherSlugs = new Set([
    'source-intake-sheet',
    'claim-graph-matrix',
    'theme-cluster-board',
    'gap-radar-sheet',
    'lit-review-builder',
    'research-narrative-board',
  ]);
  if (studentSlugs.has(slug)) {
    return 'student';
  }
  if (researcherSlugs.has(slug)) {
    return 'researcher';
  }
  return null;
}
