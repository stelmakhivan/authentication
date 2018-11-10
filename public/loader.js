if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.warn('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.warn('ServiceWorker registration failed: ', err);
    });
  });
}
