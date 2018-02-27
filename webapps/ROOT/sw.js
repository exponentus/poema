'use strict';

const VERSION = '20180227';
const CACHE_KEY = `NB-v${VERSION}`;
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
const STATIC_ROUTES = [
    '/Workspace/?skip-auth-error',
    '/Workspace/manifest.json',
    '/sw.js'
];

/**
 * CACHE_ROUTE Options
 *
 * { path:string, regExp: RegExp, cacheOnly: boolean, ignoreSearch: boolean, fallback: 'API'|'IMAGE' }
 */
const CACHE_ROUTES = [{
    regExp: new RegExp('^' + self.origin + '/(\\w+)/api/employees/(.*?)/avatar\\?_thumbnail')
}, {
    regExp: new RegExp('^' + self.origin + '/(\\w+)/api/*'),
    fallback: 'API',
    contentType: 'application/json'
}, {
    regExp: new RegExp('^' + self.origin + '/(\\w+)/i18n/(\\w+).json'),
    cacheOnly: true,
    ignoreSearch: true
}, {
    regExp: new RegExp('^' + self.origin + '/(\\w+)/img/*'),
    cacheOnly: true
}, {
    // html /Module(/|?|?pwa|?lang=)$
    regExp: new RegExp('^' + self.origin + '/(\\w+)(/\\?\\?|/|/?\\?lang=[A-Z]{3}|/\\?pwa|$)$'),
    ignoreSearch: true,
    contentType: 'text/html'
}, {
    regExp: new RegExp('^' + self.origin + '/(\\w+)/manifest.json'),
    cacheOnly: true,
    ignoreSearch: true
}, {
    path: self.origin + '/sw.js',
    ignoreSearch: true
}, {
    regExp: new RegExp('^' + self.origin + '/.*?\\.(js|json|gz|css)\\?cache$'),
    cacheOnly: true
}, {
    regExp: new RegExp('^' + self.origin + '/SharedResources/*'),
    cacheOnly: true
}, {
    regExp: new RegExp('^https://fonts.googleapis.com/*')
}];

function apiFallback() {
    return Promise.resolve(new Response(OFFLINE_API_FALLBACK, {
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }));
}

function getFallback(fallbackType) {
    if (fallbackType === 'API') {
        return apiFallback();
    }

    return Promise.resolve(new Response('', {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    }));
}

/**
 * getRouteOption
 *
 * @param {string} url
 */
function getRouteOption(url) {
    for (let route of CACHE_ROUTES) {
        if (route.path) {
            if (route.ignoreSearch) {
                if (route.path === url.split('?')[0]) {
                    return route;
                }
            } else {
                if (route.path === url) {
                    return route;
                }
            }
        } else if (route.regExp.test(url)) {
            return route;
        }
    }
    return null;
}

/**
 * fetch
 */
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_KEY).then(cache => {
            if (event.request.method !== 'GET') {
                return fetch(event.request);
            }

            let route = getRouteOption(event.request.url.split('#')[0]);
            if (!route) {
                return fetch(event.request);
            }

            return cache.match(event.request, { ignoreSearch: (route.ignoreSearch || false) }).then(cacheResponse => {
                if (route.cacheOnly && cacheResponse) {
                    return cacheResponse;
                }

                const fetchPromise = fetch(event.request).then(networkResponse => {
                    let _cache = true;
                    // check content type
                    if (route.contentType) {
                        _cache = networkResponse.headers.get('content-type') === route.contentType;
                    }

                    // response status ok
                    if (_cache && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(error => {
                    let errorWhileFetch = error.stack === 'TypeError: Failed to fetch';
                    if (errorWhileFetch && cacheResponse) {
                        return cacheResponse;
                    } else if (route.fallback) {
                        return getFallback(route.fallback);
                    }
                    return error;
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
    event.waitUntil(
        caches.open(CACHE_KEY)
        .then(cache => cache.addAll(STATIC_ROUTES))
        .then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => {
            keys.forEach(key => {
                if (CACHE_KEY !== key) {
                    caches.delete(key);
                }
            })
        })
    );
    event.waitUntil(self.clients.claim());
});


/**
 * Push
 */
self.addEventListener('push', (event) => {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data;
    }
    const title = data.title || 'demo';
    const message = data.message || 'message';
    const iconUrl = 'img/logo.png';

    const options = {
        body: message,
        tag: 'NB',
        icon: iconUrl,
        badge: iconUrl
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(host)
    );
});
