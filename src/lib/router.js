export function navigateTo(path) {
  window.location.hash = path;
}

export function initRouter(onRouteChange) {
  window.addEventListener('hashchange', onRouteChange);
}
