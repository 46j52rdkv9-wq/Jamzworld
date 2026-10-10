// offline play: keep the game and its icons on the phone, update in the background
const C = 'jamzworld-1.4';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => { const net = fetch(e.request).then(r => { if (r.ok) caches.open(C).then(c => c.put(e.request, r.clone())); return r; }).catch(() => hit); return hit || net; }));
});
