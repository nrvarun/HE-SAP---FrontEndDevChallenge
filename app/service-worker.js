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
        return cache.addAll( urlsToCache, {mode: 'no-cors'});
      })
      .then(()=>{
        console.log('Installation successful');
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Calling event.respondWith means we're in charge
  // of providing the response. We pass in a promise
  // that resolves with a response object
  event.respondWith(
    // First we look for something in the caches that
    // matches the request
    caches.match(event.request).then(function(response) {
      // If we get something, we return it, otherwise
      // it's null, and we'll pass the request to
      // fetch, which will use the network.
      return response || fetch(event.request);
    })
  );
});


