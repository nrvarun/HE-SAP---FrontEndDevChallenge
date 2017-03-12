console.log('Service worker has started');

let CACHE_NAME = 'Topgit-v1';
let urlsToCache = [
  '/',
  'favicon.ico',
  '/css/style.css',
  '/css/material.brown-red.min.css',
  '/images/bgimg.png',
  '/images/git404.jpg',
  'manifest.json',
  'views/home.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-route.min.js',
  '/js/app.js',
  '/js/home.controller.js',
  '/js/appConfig.js',
  '/js/main.controller.js',
  '/js/material.min.js'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  console.log('install event commenced');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll( urlsToCache);
      })
      .then(()=>{
        console.log('Installation successful');
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('fetch', function(event) {
  if (/\.jpg$/.test(event.request.url)) {
    event.respondWith(
      fetch('https://www.google.co.uk/logos/doodles/2014/60th-anniversary-of-the-unveiling-of-the-first-routemaster-bus-4922931108904960.3-hp.gif', {
        mode: 'no-cors'
      })
    );
  }
});
