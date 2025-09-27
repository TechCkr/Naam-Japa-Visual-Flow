// ✅ Naam Japa / Hari Japa PWA Service Worker
// Version History:
// v1.0.0 - Initial Release

const CACHE_NAME = 'hari-japa-v1.0.2'; // 📝 Bump this when you update the app

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  // You can add './smallBell.mp3' if you want offline sound support
];

// ✅ Install service worker & cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // 👈 ensures new SW activates immediately
});

// ✅ Activate new service worker & remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ✅ Serve assets from cache first, then fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});


