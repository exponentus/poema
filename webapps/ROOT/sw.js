importScripts('workbox-sw.prod.v2.1.2.js');
importScripts('workbox-routing.prod.v2.1.0.js');

const workboxSW = new WorkboxSW();
const host = self.origin;

// strategies
const cacheFirst = workboxSW.strategies.cacheFirst();
const networkFirst = workboxSW.strategies.networkFirst();

// cacheFirst
workboxSW.router.registerRoute('/Workspace/manifest.json', cacheFirst);
workboxSW.router.registerRoute('/Workspace/', cacheFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/(.*?).js'), cacheFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/(\\w+)/img/*'), cacheFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/(\\w+)/i18n/(\\w+).json'), cacheFirst);
workboxSW.router.registerRoute(new RegExp('^https://fonts.googleapis.com/*'), cacheFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/SharedResources/*'), cacheFirst);
workboxSW.router.registerRoute(new RegExp('^' + host + '/Staff/api/employees/(.*?)/avatar\\?_thumbnail'), cacheFirst);

// networkFirst
workboxSW.router.registerRoute(new RegExp('^' + host + '/(\\w+)/api/session'), networkFirst);
// workboxSW.router.registerRoute(new RegExp('^' + host + '/(\\w+)/api/*'), networkFirst);
