/* ╔══════════════════════════════════════════╗
   ║  UPSC COSMOS v6 — Service Worker         ║
   ╚══════════════════════════════════════════╝ */

const CACHE = 'cosmos-v6-2';

const PRECACHE = [
  '/',
  '/index.html',
  '/css/app.css',
  '/data/core.js',
  '/data/extra.js',
  '/data/questions.js',
  '/js/app.js',
  '/js/diagnostic.js',
  '/js/quiz.js',
  '/js/ncert.js',
  '/js/graph.js',
  '/js/panels.js',
  '/js/features.js',
];

// Install — cache core shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate — delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache-first for assets, network-first for navigation
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Skip non-GET and external requests
  if (request.method !== 'GET' || !url.origin.includes(self.location.origin)) return;

  // Navigation: network first, fallback to cached index.html
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Assets: cache first
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, clone));
        return response;
      });
    })
  );
});
