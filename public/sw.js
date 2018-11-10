self.addEventListener('install', event => {
  console.warn('Event: Install');

  event.waitUntil(
    caches.open('static-cache')
      .then(cache => {
        return cache.addAll([
          './',
          './users/register',
          './users/login',
          './users/logout',
          './users/remind',
          './users/reset',
          './users/facebook',
          './users/google',
          './users/github',
        ])
          .then(() => {
            console.warn('All files are cached');
            return self.skipWaiting();
          })
          .catch(error =>  {
            console.error('Failed to cache', error);
          });
      })
  );
});


self.addEventListener('fetch', event => {
  console.warn('Event: Fetch');

  const request = event.request;

  event.respondWith(
    caches.match(request).then(response => {
      if (response) {
        return response;
      }

      return fetch(request).then(response => {
        const responseToCache = response.clone();
        caches.open('static-cache').then(cache => {
          cache.put(request, responseToCache).catch(err => {
            console.warn(request.url + ': ' + err.message);
          });
        });

        return response;
      });
    })
  );
});

self.addEventListener('activate', event => {
  console.warn('Event: Activate');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== 'static-cache') {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
// const CACHE_NAME = 'sample-auth-cache-v1';
// const urlsToCache = [
//   '/',
//   '/css/main.css',
//   '/css/main.css.map',
//   '/img/avatar.png',
//   '/img/favicon.png',
//   '/img/icons-sprite.svg',
//   '/js/index.js'
// ];
//
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => {
//         console.warn('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });
//
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => {
//         if (response) {
//           return response;
//         }
//
//         const fetchRequest = event.request.clone();
//
//         return fetch(fetchRequest).then(
//           response => {
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }
//             const responseToCache = response.clone();
//
//             caches.open(CACHE_NAME)
//               .then(cache => {
//                 cache.put(event.request, responseToCache);
//               });
//
//             return response;
//           }
//         );
//       })
//   );
// });
//
// self.addEventListener('activate', function(event) {
//
//   const cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1', 'sample-auth-cache-v1'];
//
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
