const cacheName = "DefaultCompany-Zenrock-1.0";
const contentToCache = [
    "Build/5336a4b2c43054286fd70b1faa467eee.loader.js",
    "Build/c6ba860137c060abd135c1ec611ca73b.framework.js.unityweb",
    "Build/c392b716af5eda9f2e0aef84a0369029.data.unityweb",
    "Build/78975d6e95a16ed1f0e1d438b2fd872f.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
