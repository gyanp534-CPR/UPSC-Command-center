// ══════════════════════════════════════════
//  UPSC COMMAND CENTER — SERVICE WORKER
//  Offline-first PWA with smart caching
// ══════════════════════════════════════════

const CACHE_NAME = 'upsc-cc-v2';
const STATIC_CACHE = 'upsc-static-v2';
const DATA_CACHE = 'upsc-data-v2';

// All files to cache on install — entire app works offline
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/js/pwa.js',
  '/data/questions.js',
  '/data/news.js',
  '/data/content.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Google Fonts — cached on first use
];

// ── INSTALL: Pre-cache all app shell files ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Pre-caching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
      .catch(err => {
        console.warn('[SW] Pre-cache partial failure (normal for fonts):', err);
        return self.skipWaiting();
      })
  );
});

// ── ACTIVATE: Clean old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DATA_CACHE)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Cache-first for app shell, network-first for external ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET, chrome-extension, browser internals
  if (event.request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // Google Fonts — stale-while-revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(event.request, STATIC_CACHE));
    return;
  }

  // App shell files (same origin) — cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    return;
  }

  // Everything else — network with cache fallback
  event.respondWith(networkFirst(event.request, DATA_CACHE));
});

// ── STRATEGIES ──

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return offline fallback page if navigating
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || fetchPromise;
}

// ── PUSH NOTIFICATIONS (study reminders) ──
self.addEventListener('push', event => {
  const data = event.data?.json() || {
    title: 'UPSC Command Center',
    body: 'Time for your daily revision session! 📚',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/icons/icon-192.png',
      badge: data.badge || '/icons/icon-96.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/?panel=revision' },
      actions: [
        { action: 'open', title: 'Start Revising' },
        { action: 'dismiss', title: 'Later' }
      ]
    })
  );
});

// ── NOTIFICATION CLICK ──
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});

// ── BACKGROUND SYNC (save answers offline) ──
self.addEventListener('sync', event => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  // When back online, could sync to backend
  console.log('[SW] Background sync: progress data synced');
}
