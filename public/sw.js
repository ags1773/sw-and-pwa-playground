/**
 * "caches", "cache.addAll" etc. are all parts of the cache storage API https://web.dev/cache-api-quick-guide/
 */

const cacheName = "cache-v1";
const resourcesToPreCache = [
  "/",
  "index.html",
  "favicon.ico",
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
];

// build cache on install
self.addEventListener("install", (event) => {
  console.log("install event occured");
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(resourcesToPreCache))
  );
});

self.addEventListener("activate", (event) => {
  console.log("activate event occured");
});

// fired when network call is made. Used to serve data from cache or if not in cache make network call
self.addEventListener("fetch", (event) => {
  console.log(`fetch intercepted for: ${event.request.url}`);
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});
