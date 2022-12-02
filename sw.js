self.addEventListener('install', async event => {
  console.log('install event')
});

self.addEventListener('fetch', async event => 
{
  const req = event.request;
  console.log('fetch event')
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName); 
  const cachedResponse = await cache.match(req); 
  return cachedResponse || fetch(req); 
}

const cacheName = 'VoiceMusic';
const staticAssets = [
  './',
  './index.html',
  './assets/img/favicon.ico',
  './assets/img/default.png'
];

self.addEventListener('install', async event => {
  const cache = await caches.open(cacheName); 
  await cache.addAll(staticAssets); 
});