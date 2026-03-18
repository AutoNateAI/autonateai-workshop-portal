import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

import {renderAppShell} from './components/AppShell.js';
import {renderHomePage} from './pages/homePage.js';
import {renderTrackPage} from './pages/trackPage.js';
import {renderWorkflowPage} from './pages/workflowPage.js';
import {renderSetupPage} from './pages/setupPage.js';
import {renderBlueprintPage} from './pages/blueprintPage.js';
import {initRouter, navigateTo} from './lib/router.js';
import {initFirebaseClient} from './lib/firebase.js';

const app = document.querySelector('#app');

const routes = {
  '/': renderHomePage,
  '/setup': renderSetupPage,
  '/blueprint': renderBlueprintPage,
  '/tracks/student': () => renderTrackPage('student'),
  '/tracks/researcher': () => renderTrackPage('researcher'),
};

function render() {
  const path = window.location.hash.replace('#', '') || '/';
  const workflowMatch = path.match(/^\/workflows\/([^/]+)$/);

  const pageContent = workflowMatch
    ? renderWorkflowPage(workflowMatch[1])
    : (routes[path] || renderHomePage)();

  app.innerHTML = renderAppShell(pageContent, path);
  document.title = 'AutoNateAI Workshop Portal';
  initFirebaseClient();
  bindGlobalActions();
  window.scrollTo({top: 0, behavior: 'instant'});
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
}

initRouter(render);
render();
