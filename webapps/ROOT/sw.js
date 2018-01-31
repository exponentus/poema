importScripts('/SharedResources/vendor/workbox-sw/workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW();
const host = self.origin;

// strategies
const cacheFirst = workboxSW.strategies.cacheFirst({
    cacheName: 'static'
});

const networkFirst = workboxSW.strategies.networkFirst({
    cacheName: 'network'
});

// cacheFirst
workboxSW.router.registerRoute(new RegExp('^' + host + '/(.*?).js'), cacheFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/(\\w+)/img/*'), cacheFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/SharedResources/*'), cacheFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/Staff/api/employees/(.*?)/avatar\\?_thumbnail'), cacheFirst);

// external source
workboxSW.router.registerRoute(new RegExp('^https://fonts.googleapis.com/*'), cacheFirst);

// networkFirst
workboxSW.router.registerRoute('/Workspace/', networkFirst);
workboxSW.router.registerRoute('/Workspace/manifest.json', networkFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/(\\w+)/api/session'), networkFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/(\\w+)/i18n/(\\w+).json'), networkFirst);

// module api url regexp
const moduleApiUrlRegexp = new RegExp('^' + host + '/(\\w+)/api/*');
// const OFFLINE_API_JSON = {
//     id: 'OFFLINE',
//     title: 'internet_offline',
//     message: 'internet_offline',
//     payload: {}
// };

// handle fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open('module-api').then(cache => {
            return cache.match(event.request).then(cacheResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    if (event.request.method === 'GET' && moduleApiUrlRegexp.test(event.request.url)) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });

                if (self.navigator.onLine) {
                    return fetchPromise;
                }
                return cacheResponse || fetchPromise;
                //
                // if (cacheResponse) {
                //     return cacheResponse;
                // } else if (self.navigator.onLine) {
                //     return fetchPromise;
                // }
                // return Promise.resolve(OFFLINE_API_JSON);
            });
        })
    );
});
