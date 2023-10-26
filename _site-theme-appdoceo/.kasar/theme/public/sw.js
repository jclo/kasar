/* *****************************************************************************
 * Service Worker
 * ************************************************************************** */
/* global */
/* eslint-disable one-var, semi-style, no-restricted-globals, arrow-body-style */


// -- Local constants
const MAXCACHESIZE = 15
    , staticCacheName = 'site-static-v1'
    , filesToCache = [
      '/',
      '/index.html',
      '/offline.html',
      '/css/wapp.min.css',
      '/js/wapp.js',
    ]
    , dynamicCacheName = 'site-dynamic-v1'
    ;


// -- Local variables


// -- Private Functions --------------------------------------------------------

// Cache size limit function.
// The downloaded files are stored in the dynamic cache. This cache has a size
// limited to 'MAXCACHESIZE'. When the limit is reached, the oldest file
// (dynamicCacheName[0]) is deleted.
const limitCacheSize = function(name, size) {
  caches.open(name)
    .then((cache) => {
      cache.keys()
        .then((keys) => {
          if (keys.length > size) {
            cache.delete(keys[0])
              .then(limitCacheSize(name, size));
          }
        });
    });
};


// -- Main ---------------------------------------------------------------------

// Start the service worker and cache all of the app's content:
// Nota:
// This event is fired when the service worker starts. We use
// this event to create a cache and store the files listed above.
// self.addEventListener('install', (e) => {
//   e.waitUntil(
//     caches.open(staticCacheName)
//       .then((cache) => {
//         return cache.addAll(filesToCache);
//       }),
//   );
// });


// Activate the Service Worker and update the cache:
// Nota:
// This event is fired each time the page is loaded or the PWA is
// started. We use this event to refresh the cache if required. By default,
// the SW always serves the files stored in the cache even if they have been
// modified on the server. So, we need to inform the SW that the files in
// the caches are obsolete. We do this by changing the name of the cache
// (site-static-v1 by site-static-v2). So, the code below delete the old
// cache v1.
// self.addEventListener('activate', (e) => {
//   e.waitUntil(
//     caches.keys()
//       .then((keys) => {
//         return Promise.all(
//           keys
//             .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
//             .map((key) => caches.delete(key)),
//         );
//       }),
//   );
// });

// Serve cached content when offline:
// Nota:
// This event is fired when the app requires a new file. The code below
// returns the file in the cache if it exists otherwise it downloads it
// from the server.
// The downloaded files are stored in the dynamic cache. This cache has a size
// limited to 'MAXCACHESIZE'. When the limit is reached, the oldest file
// is deleted.
// self.addEventListener('fetch', (e) => {
//   e.respondWith(
//     caches.match(e.request)
//       .then((cacheRes) => {
//         return cacheRes || fetch(e.request).then((fetchRes) => {
//           return caches.open(dynamicCacheName)
//             .then((cache) => {
//               cache.put(e.request.url, fetchRes.clone());
//               limitCacheSize(dynamicCacheName, MAXCACHESIZE);
//               return fetchRes;
//             });
//         }).catch(() => {
//           if (e.request.url.indexOf('.html') > -1) {
//             return caches.match('offline.html');
//           }
//           return null;
//         });
//       }),
//   );
// });


// Notification ...
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(data.title, { body: data.message }));
});


// -- oOo --
