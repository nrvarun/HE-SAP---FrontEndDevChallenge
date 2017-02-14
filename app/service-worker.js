console.log('Service worker has started');

let CACHE_NAME = 'Topgit-v1';
let urlsToCache = [
  '/',
  'favicon.ico',
  '/css/style.css',
  '/js/bundle.js',
  '/images/bgimg.png',
  '/images/git404.png',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://code.getmdl.io/1.2.0/material.min.js',
  'https://code.getmdl.io/1.2.0/material.brown-red.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-route.min.js',
  'https://gitsearch-ebecb.firebaseapp.com/js/app.js',
  'https://gitsearch-ebecb.firebaseapp.com/js/home.controller.js',
  'https://gitsearch-ebecb.firebaseapp.com/js/appConfig.js',
  'https://gitsearch-ebecb.firebaseapp.com/js/main.controller.js'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  console.log('install event commenced');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll( urlsToCache.map(function(urlToPrefetch) {
          return new Request(urlToPrefetch, { mode: 'no-cors' });
        }));
      })
      .then(()=>{
        console.log('Installation successful');
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        let fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            let responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});


