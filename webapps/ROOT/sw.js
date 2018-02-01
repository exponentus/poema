importScripts('/SharedResources/vendor/workbox-sw/workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW();
const host = self.origin;

const VERSION = '0.0.2';
const STATIC_CACHE = `STATIC-${VERSION}`;
const NETWORK_CACHE = `NETWORK-${VERSION}`;
const MODULE_API_CACHE = `MODULE_API-${VERSION}`;
const CACHE_KEYS = [STATIC_CACHE, NETWORK_CACHE, MODULE_API_CACHE];
const MODULE_API_REGEXP = new RegExp('^' + host + '/(\\w+)/api/*');
const OFFLINE_API_FALLBACK = JSON.stringify({
    id: 'OFFLINE',
    offline: true,
    title: 'internet_offline',
    message: 'internet_offline',
    payload: {
        contentTitle: 'internet_offline',
        viewpage: {
            count: 0,
            maxPage: 0,
            pageNum: 0,
            result: []
        },
        model: null
    }
});

// strategies
const cacheFirst = workboxSW.strategies.cacheFirst({
    cacheName: STATIC_CACHE
});

const networkFirst = workboxSW.strategies.networkFirst({
    cacheName: NETWORK_CACHE
});

/**
 * cacheFirst
 */
const cacheFirstRoutes = [
    '/Workspace/',
    '/Workspace/manifest.json',
    '/sw.js',
    new RegExp('^' + host + '/(\\w+)/img/*'),
    new RegExp('^' + host + '/SharedResources/*'),
    new RegExp('^' + host + '/Staff/api/employees/(.*?)/avatar\\?_thumbnail'),
    // external source
    new RegExp('^https://fonts.googleapis.com/*')
];

cacheFirstRoutes.forEach(route => workboxSW.router.registerRoute(route, cacheFirst));

/**
 *  networkFirst
 */
const networkFirstRoutes = [
    new RegExp('^' + host + '/(\\w+)/api/session'),
    new RegExp('^' + host + '/(\\w+)/i18n/(\\w+).json')
];

networkFirstRoutes.forEach(route => workboxSW.router.registerRoute(route, networkFirst));

/**
 * MODULE API networkFirst with fallback
 */
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(MODULE_API_CACHE).then(cache => {
            return cache.match(event.request).then(cacheResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    if (event.request.method === 'GET' && MODULE_API_REGEXP.test(event.request.url)) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                });

                if (self.navigator.onLine) {
                    return fetchPromise;
                }
                return cacheResponse || fetchPromise;
            }).catch(error => apiFallback(OFFLINE_API_FALLBACK));
        })
    );
});

self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            keys.forEach(key => {
                if (CACHE_KEYS.indexOf(key) === -1) {
                    caches.delete(key);
                }
            })
        })
    );
    event.waitUntil(self.clients.claim());
});

//
function apiFallback(fallback) {
    return Promise.resolve(new Response(fallback, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }));
}
