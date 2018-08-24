var staticCacheName = 'worker5';

self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/js/',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/js/register.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  let cacheRequest = event.request;
  let cacheUrlObj = new URL(event.request.url);
  if (event.request.url.indexOf("restaurant.html") > -1) {
    const cacheURL = "restaurant.html";
    cacheRequest = new Request(cacheURL);
  }

  event.respondWith(
    caches.match(cacheRequest).then(function(response) {
      return (
        response || fetch(event.request)
            .then(function (res) {
                return caches.open(staticCacheName).then(function (cache) {
                    cache.put(event.request, res.clone())
                    return res;
                })
            })
        );
    })
  );
});