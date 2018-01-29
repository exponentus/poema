importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([{
    url: '/Workspace',
    revision: 'bb12123423c',
}, {
    url: '/SharedResources/ng-app/vendor.js.gz',
    revision: 'js54acd123',
}, {
    url: '/SharedResources/ng-app/app.js.gz',
    revision: 'jssdfdsa32caa',
}, {
    url: '/Workspace/img/favicon.png',
    revision: 'jssdfdsa32caa',
}, {
    url: '/Workspace/img/logo.png',
    revision: 'jssdfdsa32sdfscaa',
}, {
    url: '/Workspace/img/loading.gif',
    revision: 'jssdfdsa3sdf2caa',
}, {
    url: '/SharedResources/nb/css/nb.min.css',
    revision: 'jssdfdsa3sdfsd2caa',
}, {
    url: '/SharedResources/vendor/bootstrap/css/bootstrap.min.css',
    revision: 'jssdfdsasdf32caa',
}, {
    url: '/SharedResources/vendor/font-awesome/css/font-awesome.min.css',
    revision: 'jssdfdsa3sdf2caa',
}, {
    url: '/SharedResources/vendor/font-awesome/fonts/fontawesome-webfont.woff2',
    revision: 'jssdfdsa3ssdfd2caa'
}]);
