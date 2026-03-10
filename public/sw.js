const CACHE = 'lo-v1';
const SHELL = ['/', '/index.html', '/css/app.css', '/js/app.js', '/js/diagnostic.js', '/js/quiz.js', '/data/core.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
