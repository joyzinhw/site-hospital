const CACHE_NAME = 'meu-app-cache-v1';
const urlsToCache = [
  '/',
  '/assets/js/sw.js',
  '/assets/css/main.css',
  '/assets/images/LOGO1.png',   
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});