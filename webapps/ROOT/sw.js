importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([{
    url: '/Workspace/',
    revision: 'bb12123423c',
}, {
       url: '/Workspace/api/session',
       revision: 'sesbb12123423c'
}, {
    url: '/Workspace/manifest.json',
    revision: 'manifestswjs54acd123'
}, {
     url: '/Workspace/img/favicon.png',
     revision: 'jssdfdsa32caa'
}, {
     url: '/Workspace/img/logo.png',
     revision: 'jssdfdsa32sdfscaa'
}, {
     url: '/Workspace/img/loading.gif',
     revision: 'jssdfdsa3sdf2caa'
}, {
     url: '/sw.js',
     revision: 'swjs54acd123'
}, {
      url: '/sw-loader.js',
      revision: 'swjsdfsdfs54acd123'
}, {
    url: '/SharedResources/ng-app/vendor.js.gz',
    revision: 'js54acd123'
}, {
    url: '/SharedResources/ng-app/app.js.gz',
    revision: 'jssdfdsa32caa'
}, {
    url: '/SharedResources/nb/css/nb.min.css',
    revision: 'jssdfdsa3sdfsd2caa'
}, {
    url: '/SharedResources/vendor/bootstrap-4/css/bootstrap.min.css',
    revision: 'jssdfdssdasdf32csdaa'
}, {
    url: '/SharedResources/vendor/font-awesome/css/font-awesome.min.css',
    revision: 'jssdfdsa3sdf2caa'
}, {
    url: '/SharedResources/vendor/font-awesome/fonts/fontawesome-webfont.woff2',
    revision: 'jssdfdsa3ssdfd2caa'
}, {
     url: '/Workspace/i18n/eng.json',
     revision: 'i18n-jssdfdsa3ssdfd2caa'
}, {
      url: '/Workspace/i18n/rus.json',
      revision: 'i18n-jssdfdsa3ssdfd2caa'
 }]);
