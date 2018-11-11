const CACHE_NAME = 'sample-auth-cache-v1';
const urlsToCache = [
  './',
  './users/register',
  './users/login',
  './users/remind',
  './users/reset',
  './css/main.css',
  './css/main.css.map',
  './img/avatar.png',
  './img/favicon.png',
  './img/icons-sprite.svg',
  './js/index.js',
  './loader.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.warn('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.open(CACHE_NAME).then(cache => {
        return cache.match(e.request);
      });
    })
  );
});
