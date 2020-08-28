const config = require('../config/config.js').module;
/*
  NOTE: In config.js(above), config.server.ENABLE_SERVICE_WORKER_CACHE
        needs to be set true if caching is to be enabled. In developer mode,
        you have to be cautious because the files will be cached, so your changes
        won't be reflected. Accordingly set the variable.
*/

// CACHE_NAME for cache versioning
const CACHE_NAME = 'CACHE_NAME';

const { assets } = global.serviceWorkerOption;

var filesToCache;

if (config.server.ENABLE_SERVICE_WORKER_CACHE) {
  // File list to cache
  filesToCache = [...assets, './'];
  filesToCache = filesToCache.map(path => {
    return new URL(path, global.location).toString()
  });

  // Adding bootstrap JS files also to cached files so that application displays when offline too
  filesToCache = [...filesToCache,
    "https://code.jquery.com/jquery-3.5.1.slim.min.js",
    "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
  ];

} else {
  filesToCache = [];
  caches.keys().then(function(names) {
      for (let name of names)
          caches.delete(name);
  });
}

// Caching static assets during installation phase
self.addEventListener('install', function(event) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
                      return cache.addAll(filesToCache).then(function() {
                                self.skipWaiting();
                             });
                    }));
});


// When browser fetches a URL
self.addEventListener('fetch', function(event) {
    // If cached object present, then return it
    // Otherwise go ahead and fetch the actual URL
    // Cached objects are saved with the names of their respective urls
    event.respondWith(caches.match(event.request.url).then(function(response) {
        // Cached object present
        if (response) {
          return response;
        }
        // Cached object not present, fetch actual URL
        return fetch(event.request).catch(() => {
          return caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request.url);
          });
        });
    }));
});

self.addEventListener("push", event => {
  const data = event.data.json()
  const { title } = data

  const body = {
    body: data.body,
    icon: data.icon
  }

  event.waitUntil(self.registration.showNotification(title, body))
})
