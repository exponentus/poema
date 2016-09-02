webpackJsonp([0],{

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return EnvironmentActions; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EnvironmentActions = (function () {
    function EnvironmentActions() {
    }
    EnvironmentActions.prototype.search = function (keyWord) {
        return {
            type: EnvironmentActions.SEARCH,
            payload: { keyWord: keyWord }
        };
    };
    EnvironmentActions.prototype.resetSearch = function () {
        return {
            type: EnvironmentActions.RESET_SEARCH
        };
    };
    EnvironmentActions.prototype.toggleNav = function () {
        return {
            type: EnvironmentActions.TOGGLE_NAV
        };
    };
    EnvironmentActions.prototype.toggleSearch = function () {
        return {
            type: EnvironmentActions.TOGGLE_SEARCH
        };
    };
    EnvironmentActions.prototype.hideNav = function () {
        return {
            type: EnvironmentActions.HIDE_NAV
        };
    };
    EnvironmentActions.prototype.setRedirectUrl = function (redirectUrl) {
        return {
            type: EnvironmentActions.SET_REDIRECT_URL,
            payload: { redirectUrl: redirectUrl }
        };
    };
    EnvironmentActions.SEARCH = 'SEARCH';
    EnvironmentActions.RESET_SEARCH = 'RESET_SEARCH';
    EnvironmentActions.TOGGLE_NAV = 'TOGGLE_NAV';
    EnvironmentActions.TOGGLE_SEARCH = 'TOGGLE_SEARCH';
    EnvironmentActions.HIDE_NAV = 'HIDE_NAV';
    EnvironmentActions.SET_REDIRECT_URL = 'SET_REDIRECT_URL';
    EnvironmentActions = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], EnvironmentActions);
    return EnvironmentActions;
}());


/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notification_service__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_component__ = __webpack_require__(915);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification__ = __webpack_require__(532);
/* harmony namespace reexport */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__notification_service__["a"]; });
/* harmony namespace reexport */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__notification_component__["b"]; });
/* unused harmony namespace reexport */





/***/ },

/***/ 153:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_mergeAll__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_mergeAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_mergeAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_reduce__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_reduce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_operator_reduce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__apply_redirects__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__create_router_state__ = __webpack_require__(644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__create_url_tree__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__recognize__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__router_config_loader__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__router_outlet_map__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__router_state__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__url_tree__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__utils_collection__ = __webpack_require__(55);
/* unused harmony export NavigationStart */
/* harmony export */ __webpack_require__.d(exports, "b", function() { return NavigationEnd; });/* unused harmony export NavigationCancel *//* unused harmony export NavigationError *//* unused harmony export RoutesRecognized */
/* harmony export */ __webpack_require__.d(exports, "a", function() { return Router; });/* unused harmony export PreActivation *//**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




















/**
 * An event triggered when a navigation starts
 *
 * @stable
 */
var NavigationStart = (function () {
    function NavigationStart(id, url) {
        this.id = id;
        this.url = url;
    }
    NavigationStart.prototype.toString = function () { return "NavigationStart(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationStart;
}());
/**
 * An event triggered when a navigation ends successfully
 *
 * @stable
 */
var NavigationEnd = (function () {
    function NavigationEnd(id, url, urlAfterRedirects) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
    }
    NavigationEnd.prototype.toString = function () {
        return "NavigationEnd(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "')";
    };
    return NavigationEnd;
}());
/**
 * An event triggered when a navigation is canceled
 *
 * @stable
 */
var NavigationCancel = (function () {
    function NavigationCancel(id, url, reason) {
        this.id = id;
        this.url = url;
        this.reason = reason;
    }
    NavigationCancel.prototype.toString = function () { return "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationCancel;
}());
/**
 * An event triggered when a navigation fails due to unexpected error
 *
 * @stable
 */
var NavigationError = (function () {
    function NavigationError(id, url, error) {
        this.id = id;
        this.url = url;
        this.error = error;
    }
    NavigationError.prototype.toString = function () {
        return "NavigationError(id: " + this.id + ", url: '" + this.url + "', error: " + this.error + ")";
    };
    return NavigationError;
}());
/**
 * An event triggered when routes are recognized
 *
 * @stable
 */
var RoutesRecognized = (function () {
    function RoutesRecognized(id, url, urlAfterRedirects, state) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    RoutesRecognized.prototype.toString = function () {
        return "RoutesRecognized(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
    };
    return RoutesRecognized;
}());
function defaultErrorHandler(error) {
    throw error;
}
/**
 * The `Router` is responsible for mapping URLs to components.
 *
 * See {@link Routes} for more details and examples.
 *
 * @stable
 */
var Router = (function () {
    /**
     * Creates the router service.
     */
    function Router(rootComponentType, urlSerializer, outletMap, location, injector, loader, compiler, config) {
        this.rootComponentType = rootComponentType;
        this.urlSerializer = urlSerializer;
        this.outletMap = outletMap;
        this.location = location;
        this.injector = injector;
        this.config = config;
        this.navigationId = 0;
        this.errorHandler = defaultErrorHandler;
        /**
         * Indicates if at least one navigation happened.
         *
         * @stable
         */
        this.navigated = false;
        this.resetConfig(config);
        this.routerEvents = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.currentUrlTree = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__url_tree__["e" /* createEmptyUrlTree */])();
        this.configLoader = new __WEBPACK_IMPORTED_MODULE_14__router_config_loader__["b" /* RouterConfigLoader */](loader, compiler);
        this.currentRouterState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__router_state__["f" /* createEmptyState */])(this.currentUrlTree, this.rootComponentType);
    }
    /**
     * Sets up the location change listener and performs the inital navigation
     */
    Router.prototype.initialNavigation = function () {
        this.setUpLocationChangeListener();
        this.navigateByUrl(this.location.path(true), { replaceUrl: true });
    };
    /**
     * Sets up the location change listener
     */
    Router.prototype.setUpLocationChangeListener = function () {
        var _this = this;
        // Zone.current.wrap is needed because of the issue with RxJS scheduler,
        // which does not work properly with zone.js in IE and Safari
        this.locationSubscription = this.location.subscribe(Zone.current.wrap(function (change) {
            var tree = _this.urlSerializer.parse(change['url']);
            // we fire multiple events for a single URL change
            // we should navigate only once
            return _this.currentUrlTree.toString() !== tree.toString() ?
                _this.scheduleNavigation(tree, { skipLocationChange: change['pop'], replaceUrl: true }) :
                null;
        }));
    };
    Object.defineProperty(Router.prototype, "routerState", {
        /**
         * Returns the current route state.
         */
        get: function () { return this.currentRouterState; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "url", {
        /**
         * Returns the current url.
         */
        get: function () { return this.serializeUrl(this.currentUrlTree); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "events", {
        /**
         * Returns an observable of route events
         */
        get: function () { return this.routerEvents; },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the configuration used for navigation and generating links.
     *
     * ### Usage
     *
     * ```
     * router.resetConfig([
     *  { path: 'team/:id', component: TeamCmp, children: [
     *    { path: 'simple', component: SimpleCmp },
     *    { path: 'user/:name', component: UserCmp }
     *  ] }
     * ]);
     * ```
     */
    Router.prototype.resetConfig = function (config) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__config__["a" /* validateConfig */])(config);
        this.config = config;
    };
    Router.prototype.ngOnDestroy = function () { this.dispose(); };
    /**
     * Disposes of the router.
     */
    Router.prototype.dispose = function () { this.locationSubscription.unsubscribe(); };
    /**
     * Applies an array of commands to the current url tree and creates
     * a new url tree.
     *
     * When given an activate route, applies the given commands starting from the route.
     * When not given a route, applies the given command starting from the root.
     *
     * ### Usage
     *
     * ```
     * // create /team/33/user/11
     * router.createUrlTree(['/team', 33, 'user', 11]);
     *
     * // create /team/33;expand=true/user/11
     * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
     *
     * // you can collapse static segments like this (this works only with the first passed-in value):
     * router.createUrlTree(['/team/33/user', userId]);
     *
     * // If the first segment can contain slashes, and you do not want the router to split it, you
     * // can do the following:
     *
     * router.createUrlTree([{segmentPath: '/one/two'}]);
     *
     * // create /team/33/(user/11//right:chat)
     * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
     *
     * // remove the right secondary node
     * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
     *
     * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
     *
     * // navigate to /team/33/user/11/details
     * router.createUrlTree(['details'], {relativeTo: route});
     *
     * // navigate to /team/33/user/22
     * router.createUrlTree(['../22'], {relativeTo: route});
     *
     * // navigate to /team/44/user/22
     * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
     * ```
     */
    Router.prototype.createUrlTree = function (commands, _a) {
        var _b = _a === void 0 ? {} : _a, relativeTo = _b.relativeTo, queryParams = _b.queryParams, fragment = _b.fragment, preserveQueryParams = _b.preserveQueryParams, preserveFragment = _b.preserveFragment;
        var a = relativeTo ? relativeTo : this.routerState.root;
        var q = preserveQueryParams ? this.currentUrlTree.queryParams : queryParams;
        var f = preserveFragment ? this.currentUrlTree.fragment : fragment;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__create_url_tree__["a" /* createUrlTree */])(a, this.currentUrlTree, commands, q, f);
    };
    /**
     * Navigate based on the provided url. This navigation is always absolute.
     *
     * Returns a promise that:
     * - is resolved with 'true' when navigation succeeds
     * - is resolved with 'false' when navigation fails
     * - is rejected when an error happens
     *
     * ### Usage
     *
     * ```
     * router.navigateByUrl("/team/33/user/11");
     *
     * // Navigate without updating the URL
     * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
     * ```
     *
     * In opposite to `navigate`, `navigateByUrl` takes a whole URL
     * and does not apply any delta to the current one.
     */
    Router.prototype.navigateByUrl = function (url, extras) {
        if (extras === void 0) { extras = { skipLocationChange: false }; }
        if (url instanceof __WEBPACK_IMPORTED_MODULE_18__url_tree__["b" /* UrlTree */]) {
            return this.scheduleNavigation(url, extras);
        }
        else {
            var urlTree = this.urlSerializer.parse(url);
            return this.scheduleNavigation(urlTree, extras);
        }
    };
    /**
     * Navigate based on the provided array of commands and a starting point.
     * If no starting route is provided, the navigation is absolute.
     *
     * Returns a promise that:
     * - is resolved with 'true' when navigation succeeds
     * - is resolved with 'false' when navigation fails
     * - is rejected when an error happens
     *
     * ### Usage
     *
     * ```
     * router.navigate(['team', 33, 'team', '11], {relativeTo: route});
     *
     * // Navigate without updating the URL
     * router.navigate(['team', 33, 'team', '11], {relativeTo: route, skipLocationChange: true });
     * ```
     *
     * In opposite to `navigateByUrl`, `navigate` always takes a delta
     * that is applied to the current URL.
     */
    Router.prototype.navigate = function (commands, extras) {
        if (extras === void 0) { extras = { skipLocationChange: false }; }
        return this.scheduleNavigation(this.createUrlTree(commands, extras), extras);
    };
    /**
     * Serializes a {@link UrlTree} into a string.
     */
    Router.prototype.serializeUrl = function (url) { return this.urlSerializer.serialize(url); };
    /**
     * Parse a string into a {@link UrlTree}.
     */
    Router.prototype.parseUrl = function (url) { return this.urlSerializer.parse(url); };
    /**
     * Returns if the url is activated or not.
     */
    Router.prototype.isActive = function (url, exact) {
        if (url instanceof __WEBPACK_IMPORTED_MODULE_18__url_tree__["b" /* UrlTree */]) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__url_tree__["f" /* containsTree */])(this.currentUrlTree, url, exact);
        }
        else {
            var urlTree = this.urlSerializer.parse(url);
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__url_tree__["f" /* containsTree */])(this.currentUrlTree, urlTree, exact);
        }
    };
    Router.prototype.scheduleNavigation = function (url, extras) {
        var _this = this;
        var id = ++this.navigationId;
        this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
        return Promise.resolve().then(function (_) { return _this.runNavigate(url, extras.skipLocationChange, extras.replaceUrl, id); });
    };
    Router.prototype.runNavigate = function (url, shouldPreventPushState, shouldReplaceUrl, id) {
        var _this = this;
        if (id !== this.navigationId) {
            this.location.go(this.urlSerializer.serialize(this.currentUrlTree));
            this.routerEvents.next(new NavigationCancel(id, this.serializeUrl(url), "Navigation ID " + id + " is not equal to the current navigation id " + this.navigationId));
            return Promise.resolve(false);
        }
        return new Promise(function (resolvePromise, rejectPromise) {
            var state;
            var navigationIsSuccessful;
            var preActivation;
            var appliedUrl;
            var storedState = _this.currentRouterState;
            var storedUrl = _this.currentUrlTree;
            var redirectsApplied$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__apply_redirects__["a" /* applyRedirects */])(_this.injector, _this.configLoader, url, _this.config);
            var snapshot$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__["mergeMap"].call(redirectsApplied$, function (u) {
                appliedUrl = u;
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_13__recognize__["a" /* recognize */])(_this.rootComponentType, _this.config, appliedUrl, _this.serializeUrl(appliedUrl));
            });
            var emitRecognzied$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(snapshot$, function (newRouterStateSnapshot) {
                _this.routerEvents.next(new RoutesRecognized(id, _this.serializeUrl(url), _this.serializeUrl(appliedUrl), newRouterStateSnapshot));
                return newRouterStateSnapshot;
            });
            var routerState$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(emitRecognzied$, function (routerStateSnapshot) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_11__create_router_state__["a" /* createRouterState */])(routerStateSnapshot, _this.currentRouterState);
            });
            var preactivation$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(routerState$, function (newState) {
                state = newState;
                preActivation =
                    new PreActivation(state.snapshot, _this.currentRouterState.snapshot, _this.injector);
                preActivation.traverse(_this.outletMap);
            });
            var preactivation2$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__["mergeMap"].call(preactivation$, function () { return preActivation.checkGuards(); });
            var resolveData$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__["mergeMap"].call(preactivation2$, function (shouldActivate) {
                if (shouldActivate) {
                    return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(preActivation.resolveData(), function () { return shouldActivate; });
                }
                else {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(shouldActivate);
                }
            });
            resolveData$
                .forEach(function (shouldActivate) {
                if (!shouldActivate || id !== _this.navigationId) {
                    navigationIsSuccessful = false;
                    return;
                }
                _this.currentUrlTree = appliedUrl;
                _this.currentRouterState = state;
                if (!shouldPreventPushState) {
                    var path = _this.urlSerializer.serialize(appliedUrl);
                    if (_this.location.isCurrentPathEqualTo(path) || shouldReplaceUrl) {
                        _this.location.replaceState(path);
                    }
                    else {
                        _this.location.go(path);
                    }
                }
                new ActivateRoutes(state, storedState).activate(_this.outletMap);
                navigationIsSuccessful = true;
            })
                .then(function () {
                _this.navigated = true;
                if (navigationIsSuccessful) {
                    _this.routerEvents.next(new NavigationEnd(id, _this.serializeUrl(url), _this.serializeUrl(appliedUrl)));
                    resolvePromise(true);
                }
                else {
                    _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url), ''));
                    resolvePromise(false);
                }
            }, function (e) {
                if (e instanceof __WEBPACK_IMPORTED_MODULE_17__shared__["b" /* NavigationCancelingError */]) {
                    _this.navigated = true;
                    _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url), e.message));
                    resolvePromise(false);
                }
                else {
                    _this.routerEvents.next(new NavigationError(id, _this.serializeUrl(url), e));
                    try {
                        resolvePromise(_this.errorHandler(e));
                    }
                    catch (ee) {
                        rejectPromise(ee);
                    }
                }
                if (id === _this.navigationId) {
                    _this.currentRouterState = storedState;
                    _this.currentUrlTree = storedUrl;
                    _this.location.replaceState(_this.serializeUrl(storedUrl));
                }
            });
        });
    };
    return Router;
}());
var CanActivate = (function () {
    function CanActivate(path) {
        this.path = path;
    }
    Object.defineProperty(CanActivate.prototype, "route", {
        get: function () { return this.path[this.path.length - 1]; },
        enumerable: true,
        configurable: true
    });
    return CanActivate;
}());
var CanDeactivate = (function () {
    function CanDeactivate(component, route) {
        this.component = component;
        this.route = route;
    }
    return CanDeactivate;
}());
var PreActivation = (function () {
    function PreActivation(future, curr, injector) {
        this.future = future;
        this.curr = curr;
        this.injector = injector;
        this.checks = [];
    }
    PreActivation.prototype.traverse = function (parentOutletMap) {
        var futureRoot = this.future._root;
        var currRoot = this.curr ? this.curr._root : null;
        this.traverseChildRoutes(futureRoot, currRoot, parentOutletMap, [futureRoot.value]);
    };
    PreActivation.prototype.checkGuards = function () {
        var _this = this;
        if (this.checks.length === 0)
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(true);
        var checks$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__["from"])(this.checks);
        var runningChecks$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(checks$, function (s) {
            if (s instanceof CanActivate) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["f" /* andObservables */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__["from"])([_this.runCanActivateChild(s.path), _this.runCanActivate(s.route)]));
            }
            else if (s instanceof CanDeactivate) {
                // workaround https://github.com/Microsoft/TypeScript/issues/7271
                var s2 = s;
                return _this.runCanDeactivate(s2.component, s2.route);
            }
            else {
                throw new Error('Cannot be reached');
            }
        });
        var mergedChecks$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_mergeAll__["mergeAll"].call(runningChecks$);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__["every"].call(mergedChecks$, function (result) { return result === true; });
    };
    PreActivation.prototype.resolveData = function () {
        var _this = this;
        if (this.checks.length === 0)
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(null);
        var checks$ = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__["from"])(this.checks);
        var runningChecks$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__["mergeMap"].call(checks$, function (s) {
            if (s instanceof CanActivate) {
                return _this.runResolve(s.route);
            }
            else {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(null);
            }
        });
        return __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_reduce__["reduce"].call(runningChecks$, function (_, __) { return _; });
    };
    PreActivation.prototype.traverseChildRoutes = function (futureNode, currNode, outletMap, futurePath) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function (c) {
            _this.traverseRoutes(c, prevChildren[c.value.outlet], outletMap, futurePath.concat([c.value]));
            delete prevChildren[c.value.outlet];
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["c" /* forEach */])(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(v, outletMap._outlets[k]); });
    };
    PreActivation.prototype.traverseRoutes = function (futureNode, currNode, parentOutletMap, futurePath) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        var outlet = parentOutletMap ? parentOutletMap._outlets[futureNode.value.outlet] : null;
        // reusing the node
        if (curr && future._routeConfig === curr._routeConfig) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["d" /* shallowEqual */])(future.params, curr.params)) {
                this.checks.push(new CanDeactivate(outlet.component, curr), new CanActivate(futurePath));
            }
            else {
                // we need to set the data
                future.data = curr.data;
            }
            // If we have a component, we need to go through an outlet.
            if (future.component) {
                this.traverseChildRoutes(futureNode, currNode, outlet ? outlet.outletMap : null, futurePath);
            }
            else {
                this.traverseChildRoutes(futureNode, currNode, parentOutletMap, futurePath);
            }
        }
        else {
            if (curr) {
                // if we had a normal route, we need to deactivate only that outlet.
                if (curr.component) {
                    this.deactivateOutletAndItChildren(curr, outlet);
                }
                else {
                    this.deactivateOutletMap(parentOutletMap);
                }
            }
            this.checks.push(new CanActivate(futurePath));
            // If we have a component, we need to go through an outlet.
            if (future.component) {
                this.traverseChildRoutes(futureNode, null, outlet ? outlet.outletMap : null, futurePath);
            }
            else {
                this.traverseChildRoutes(futureNode, null, parentOutletMap, futurePath);
            }
        }
    };
    PreActivation.prototype.deactivateOutletAndItChildren = function (route, outlet) {
        if (outlet && outlet.isActivated) {
            this.deactivateOutletMap(outlet.outletMap);
            this.checks.push(new CanDeactivate(outlet.component, route));
        }
    };
    PreActivation.prototype.deactivateOutletMap = function (outletMap) {
        var _this = this;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["c" /* forEach */])(outletMap._outlets, function (v) {
            if (v.isActivated) {
                _this.deactivateOutletAndItChildren(v.activatedRoute.snapshot, v);
            }
        });
    };
    PreActivation.prototype.runCanActivate = function (future) {
        var _this = this;
        var canActivate = future._routeConfig ? future._routeConfig.canActivate : null;
        if (!canActivate || canActivate.length === 0)
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(true);
        var obs = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__["from"])(canActivate), function (c) {
            var guard = _this.getToken(c, future);
            if (guard.canActivate) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["b" /* wrapIntoObservable */])(guard.canActivate(future, _this.future));
            }
            else {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["b" /* wrapIntoObservable */])(guard(future, _this.future));
            }
        });
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["f" /* andObservables */])(obs);
    };
    PreActivation.prototype.runCanActivateChild = function (path) {
        var _this = this;
        var future = path[path.length - 1];
        var canActivateChildGuards = path.slice(0, path.length - 1)
            .reverse()
            .map(function (p) { return _this.extractCanActivateChild(p); })
            .filter(function (_) { return _ !== null; });
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["f" /* andObservables */])(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__["from"])(canActivateChildGuards), function (d) {
            var obs = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__["from"])(d.guards), function (c) {
                var guard = _this.getToken(c, c.node);
                if (guard.canActivateChild) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["b" /* wrapIntoObservable */])(guard.canActivateChild(future, _this.future));
                }
                else {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["b" /* wrapIntoObservable */])(guard(future, _this.future));
                }
            });
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["f" /* andObservables */])(obs);
        }));
    };
    PreActivation.prototype.extractCanActivateChild = function (p) {
        var canActivateChild = p._routeConfig ? p._routeConfig.canActivateChild : null;
        if (!canActivateChild || canActivateChild.length === 0)
            return null;
        return { node: p, guards: canActivateChild };
    };
    PreActivation.prototype.runCanDeactivate = function (component, curr) {
        var _this = this;
        var canDeactivate = curr && curr._routeConfig ? curr._routeConfig.canDeactivate : null;
        if (!canDeactivate || canDeactivate.length === 0)
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__["of"])(true);
        var canDeactivate$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__["from"])(canDeactivate), function (c) {
            var guard = _this.getToken(c, curr);
            if (guard.canDeactivate) {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["b" /* wrapIntoObservable */])(guard.canDeactivate(component, curr, _this.curr));
            }
            else {
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["b" /* wrapIntoObservable */])(guard(component, curr, _this.curr));
            }
        });
        var merged$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_mergeAll__["mergeAll"].call(canDeactivate$);
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__["every"].call(merged$, function (result) { return result === true; });
    };
    PreActivation.prototype.runResolve = function (future) {
        var resolve = future._resolve;
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(this.resolveNode(resolve.current, future), function (resolvedData) {
            resolve.resolvedData = resolvedData;
            future.data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["g" /* merge */])(future.data, resolve.flattenedResolvedData);
            return null;
        });
    };
    PreActivation.prototype.resolveNode = function (resolve, future) {
        var _this = this;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["e" /* waitForMap */])(resolve, function (k, v) {
            var resolver = _this.getToken(v, future);
            return resolver.resolve ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["b" /* wrapIntoObservable */])(resolver.resolve(future, _this.future)) :
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["b" /* wrapIntoObservable */])(resolver(future, _this.future));
        });
    };
    PreActivation.prototype.getToken = function (token, snapshot) {
        var config = closestLoadedConfig(snapshot);
        var injector = config ? config.injector : this.injector;
        return injector.get(token);
    };
    return PreActivation;
}());
var ActivateRoutes = (function () {
    function ActivateRoutes(futureState, currState) {
        this.futureState = futureState;
        this.currState = currState;
    }
    ActivateRoutes.prototype.activate = function (parentOutletMap) {
        var futureRoot = this.futureState._root;
        var currRoot = this.currState ? this.currState._root : null;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__router_state__["g" /* advanceActivatedRoute */])(this.futureState.root);
        this.activateChildRoutes(futureRoot, currRoot, parentOutletMap);
    };
    ActivateRoutes.prototype.activateChildRoutes = function (futureNode, currNode, outletMap) {
        var _this = this;
        var prevChildren = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function (c) {
            _this.activateRoutes(c, prevChildren[c.value.outlet], outletMap);
            delete prevChildren[c.value.outlet];
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["c" /* forEach */])(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(outletMap._outlets[k]); });
    };
    ActivateRoutes.prototype.activateRoutes = function (futureNode, currNode, parentOutletMap) {
        var future = futureNode.value;
        var curr = currNode ? currNode.value : null;
        // reusing the node
        if (future === curr) {
            // advance the route to push the parameters
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__router_state__["g" /* advanceActivatedRoute */])(future);
            // If we have a normal route, we need to go through an outlet.
            if (future.component) {
                var outlet = getOutlet(parentOutletMap, futureNode.value);
                this.activateChildRoutes(futureNode, currNode, outlet.outletMap);
            }
            else {
                this.activateChildRoutes(futureNode, currNode, parentOutletMap);
            }
        }
        else {
            if (curr) {
                // if we had a normal route, we need to deactivate only that outlet.
                if (curr.component) {
                    var outlet = getOutlet(parentOutletMap, futureNode.value);
                    this.deactivateOutletAndItChildren(outlet);
                }
                else {
                    this.deactivateOutletMap(parentOutletMap);
                }
            }
            // if we have a normal route, we need to advance the route
            // and place the component into the outlet. After that recurse.
            if (future.component) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__router_state__["g" /* advanceActivatedRoute */])(future);
                var outlet = getOutlet(parentOutletMap, futureNode.value);
                var outletMap = new __WEBPACK_IMPORTED_MODULE_15__router_outlet_map__["a" /* RouterOutletMap */]();
                this.placeComponentIntoOutlet(outletMap, future, outlet);
                this.activateChildRoutes(futureNode, null, outletMap);
            }
            else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__router_state__["g" /* advanceActivatedRoute */])(future);
                this.activateChildRoutes(futureNode, null, parentOutletMap);
            }
        }
    };
    ActivateRoutes.prototype.placeComponentIntoOutlet = function (outletMap, future, outlet) {
        var resolved = [{ provide: __WEBPACK_IMPORTED_MODULE_16__router_state__["b" /* ActivatedRoute */], useValue: future }, {
                provide: __WEBPACK_IMPORTED_MODULE_15__router_outlet_map__["a" /* RouterOutletMap */],
                useValue: outletMap
            }];
        var config = parentLoadedConfig(future.snapshot);
        var loadedFactoryResolver = null;
        var loadedInjector = null;
        if (config) {
            loadedFactoryResolver = config.factoryResolver;
            loadedInjector = config.injector;
            resolved.push({ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], useValue: loadedFactoryResolver });
        }
        outlet.activate(future, loadedFactoryResolver, loadedInjector, __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].resolve(resolved), outletMap);
    };
    ActivateRoutes.prototype.deactivateOutletAndItChildren = function (outlet) {
        if (outlet && outlet.isActivated) {
            this.deactivateOutletMap(outlet.outletMap);
            outlet.deactivate();
        }
    };
    ActivateRoutes.prototype.deactivateOutletMap = function (outletMap) {
        var _this = this;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_19__utils_collection__["c" /* forEach */])(outletMap._outlets, function (v) { return _this.deactivateOutletAndItChildren(v); });
    };
    return ActivateRoutes;
}());
function parentLoadedConfig(snapshot) {
    var s = snapshot.parent;
    while (s) {
        var c = s._routeConfig;
        if (c && c._loadedConfig)
            return c._loadedConfig;
        if (c && c.component)
            return null;
        s = s.parent;
    }
    return null;
}
function closestLoadedConfig(snapshot) {
    if (!snapshot)
        return null;
    var s = snapshot.parent;
    while (s) {
        var c = s._routeConfig;
        if (c && c._loadedConfig)
            return c._loadedConfig;
        s = s.parent;
    }
    return null;
}
function nodeChildrenAsMap(node) {
    return node ? node.children.reduce(function (m, c) {
        m[c.value.outlet] = c;
        return m;
    }, {}) : {};
}
function getOutlet(outletMap, route) {
    var outlet = outletMap._outlets[route.outlet];
    if (!outlet) {
        var componentName = route.component.name;
        if (route.outlet === __WEBPACK_IMPORTED_MODULE_17__shared__["a" /* PRIMARY_OUTLET */]) {
            throw new Error("Cannot find primary outlet to load '" + componentName + "'");
        }
        else {
            throw new Error("Cannot find the outlet " + route.outlet + " to load '" + componentName + "'");
        }
    }
    return outlet;
}
//# sourceMappingURL=router.js.map

/***/ },

/***/ 154:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_mergeMap__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_collection__ = __webpack_require__(55);

/* harmony export */ __webpack_require__.d(exports, "c", function() { return ROUTES; });
/* harmony export */ __webpack_require__.d(exports, "a", function() { return LoadedRouterConfig; });
/* harmony export */ __webpack_require__.d(exports, "b", function() { return RouterConfigLoader; });/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */






/**
 * @experimental
 */
var ROUTES = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('ROUTES');
var LoadedRouterConfig = (function () {
    function LoadedRouterConfig(routes, injector, factoryResolver) {
        this.routes = routes;
        this.injector = injector;
        this.factoryResolver = factoryResolver;
    }
    return LoadedRouterConfig;
}());
var RouterConfigLoader = (function () {
    function RouterConfigLoader(loader, compiler) {
        this.loader = loader;
        this.compiler = compiler;
    }
    RouterConfigLoader.prototype.load = function (parentInjector, loadChildren) {
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__["map"].call(this.loadModuleFactory(loadChildren), function (r) {
            var ref = r.create(parentInjector);
            return new LoadedRouterConfig(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["a" /* flatten */])(ref.injector.get(ROUTES)), ref.injector, ref.componentFactoryResolver);
        });
    };
    RouterConfigLoader.prototype.loadModuleFactory = function (loadChildren) {
        var _this = this;
        if (typeof loadChildren === 'string') {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__["fromPromise"])(this.loader.load(loadChildren));
        }
        else {
            var offlineMode_1 = this.compiler instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Compiler"];
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_mergeMap__["mergeMap"].call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["b" /* wrapIntoObservable */])(loadChildren()), function (t) { return offlineMode_1 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(t) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__["fromPromise"])(_this.compiler.compileModuleAsync(t)); });
        }
    };
    return RouterConfigLoader;
}());
//# sourceMappingURL=router_config_loader.js.map

/***/ },

/***/ 155:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return RouterOutletMap; });/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @stable
 */
var RouterOutletMap = (function () {
    function RouterOutletMap() {
        /** @internal */
        this._outlets = {};
    }
    RouterOutletMap.prototype.registerOutlet = function (name, outlet) { this._outlets[name] = outlet; };
    RouterOutletMap.prototype.removeOutlet = function (name) { this._outlets[name] = undefined; };
    return RouterOutletMap;
}());
//# sourceMappingURL=router_outlet_map.js.map

/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ProjectActions; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectActions = (function () {
    function ProjectActions() {
    }
    ProjectActions.prototype.createProject = function (project) {
        return {
            type: ProjectActions.CREATE_PROJECT,
            payload: {
                project: project
            }
        };
    };
    ProjectActions.prototype.createProjectFailed = function (error) {
        return {
            type: ProjectActions.CREATE_PROJECT_FAILED,
            payload: error
        };
    };
    ProjectActions.prototype.createProjectFulfilled = function (project) {
        return {
            type: ProjectActions.CREATE_PROJECT_FULFILLED,
            payload: {
                project: project
            }
        };
    };
    ProjectActions.prototype.fetchProjects = function () {
        return {
            type: ProjectActions.FETCH_PROJECTS
        };
    };
    ProjectActions.prototype.fetchProjectsFailed = function (error) {
        return {
            type: ProjectActions.FETCH_PROJECTS_FAILED,
            payload: error
        };
    };
    ProjectActions.prototype.fetchProjectsFulfilled = function (projects, meta) {
        return {
            type: ProjectActions.FETCH_PROJECTS_FULFILLED,
            payload: {
                projects: projects,
                meta: meta
            }
        };
    };
    ProjectActions.prototype.updateProject = function (projectId, changes) {
        return {
            type: ProjectActions.UPDATE_PROJECT,
            payload: {
                changes: changes,
                projectId: projectId
            }
        };
    };
    ProjectActions.prototype.updateProjectFailed = function (error) {
        return {
            type: ProjectActions.UPDATE_PROJECT_FAILED,
            payload: error
        };
    };
    ProjectActions.prototype.updateProjectFulfilled = function (project) {
        return {
            type: ProjectActions.UPDATE_PROJECT_FULFILLED,
            payload: {
                project: project
            }
        };
    };
    ProjectActions.prototype.deleteProject = function (projectId) {
        return {
            type: ProjectActions.DELETE_PROJECT,
            payload: {
                projectId: projectId
            }
        };
    };
    ProjectActions.prototype.deleteProjectFailed = function (error) {
        return {
            type: ProjectActions.DELETE_PROJECT_FAILED,
            payload: error
        };
    };
    ProjectActions.prototype.deleteProjectFulfilled = function (project) {
        return {
            type: ProjectActions.DELETE_PROJECT_FULFILLED,
            payload: {
                project: project
            }
        };
    };
    ProjectActions.CREATE_PROJECT = 'CREATE_PROJECT';
    ProjectActions.CREATE_PROJECT_FAILED = 'CREATE_PROJECT_FAILED';
    ProjectActions.CREATE_PROJECT_FULFILLED = 'CREATE_PROJECT_FULFILLED';
    ProjectActions.FETCH_PROJECTS = 'FETCH_PROJECTS';
    ProjectActions.FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED';
    ProjectActions.FETCH_PROJECTS_FULFILLED = 'FETCH_PROJECTS_FULFILLED';
    ProjectActions.UPDATE_PROJECT = 'UPDATE_PROJECT';
    ProjectActions.UPDATE_PROJECT_FAILED = 'UPDATE_PROJECT_FAILED';
    ProjectActions.UPDATE_PROJECT_FULFILLED = 'UPDATE_PROJECT_FULFILLED';
    ProjectActions.DELETE_PROJECT = 'DELETE_PROJECT';
    ProjectActions.DELETE_PROJECT_FAILED = 'DELETE_PROJECT_FAILED';
    ProjectActions.DELETE_PROJECT_FULFILLED = 'DELETE_PROJECT_FULFILLED';
    ProjectActions = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ProjectActions);
    return ProjectActions;
}());


/***/ },

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_state__ = __webpack_require__(90);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return RouterLink; });
/* harmony export */ __webpack_require__.d(exports, "b", function() { return RouterLinkWithHref; });/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




/**
 * The RouterLink directive lets you link to specific parts of your app.
 *
 * Consider the following route configuration:

 * ```
 * [{ path: 'user/:name', component: UserCmp }]
 * ```
 *
 * When linking to this `User` route, you can write:
 *
 * ```
 * <a [routerLink]="/user/bob">link to user component</a>
 * ```
 *
 * If you use dynamic values to generate the link, you can pass an array of path
 * segments, followed by the params for each segment.
 *
 * For instance `['/team', teamId, 'user', userName, {details: true}]`
 * means that we want to generate a link to `/team/11/user/bob;details=true`.
 * Multiple static segments can be merged into one (e.g., `['/team/11/user', userName, {details:
 true}]`).
 *
 * The first segment name can be prepended with `/`, `./`, or `../`:
 * * If the first segment begins with `/`, the router will look up the route from the root of the
 app.
 * * If the first segment begins with `./`, or doesn't begin with a slash, the router will
 * instead look in the children of the current activated route.
 * * And if the first segment begins with `../`, the router will go up one level.
 *
 * You can set query params and fragment as follows:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">link to user
 component</a>
 * ```
 * RouterLink will use these to generate this link: `/user/bob#education?debug=true`.
 *
 * You can also tell the directive to preserve the current query params and fragment:
 *
 * ```
 * <a [routerLink]="['/user/bob']" preserveQueryParams preserveFragment>link to user
 component</a>
 * ```
 *
 * The router link directive always treats the provided input as a delta to the current url.
 *
 * For instance, if the current url is `/user/(box//aux:team)`.
 *
 * Then the following link `<a [routerLink]="['/user/jim']">Jim</a>` will generate the link
 * `/user/(jim//aux:team)`. See {@link Router.createUrlTree} for more information.
 *
 * @stable
 */
var RouterLink = (function () {
    function RouterLink(router, route, locationStrategy) {
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.commands = [];
    }
    Object.defineProperty(RouterLink.prototype, "routerLink", {
        set: function (data) {
            if (Array.isArray(data)) {
                this.commands = data;
            }
            else {
                this.commands = [data];
            }
        },
        enumerable: true,
        configurable: true
    });
    RouterLink.prototype.onClick = function (button, ctrlKey, metaKey) {
        if (button !== 0 || ctrlKey || metaKey) {
            return true;
        }
        this.router.navigateByUrl(this.urlTree);
        return false;
    };
    Object.defineProperty(RouterLink.prototype, "urlTree", {
        get: function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: toBool(this.preserveQueryParams),
                preserveFragment: toBool(this.preserveFragment)
            });
        },
        enumerable: true,
        configurable: true
    });
    RouterLink.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: ':not(a)[routerLink]' },] },
    ];
    /** @nocollapse */
    RouterLink.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* Router */], },
        { type: __WEBPACK_IMPORTED_MODULE_3__router_state__["b" /* ActivatedRoute */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* LocationStrategy */], },
    ];
    RouterLink.propDecorators = {
        'queryParams': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'fragment': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'preserveQueryParams': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'preserveFragment': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'routerLink': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'onClick': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"], args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey'],] },],
    };
    return RouterLink;
}());
/**
 * See {@link RouterLink} for more information.
 * @stable
 */
var RouterLinkWithHref = (function () {
    function RouterLinkWithHref(router, route, locationStrategy) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.commands = [];
        this.subscription = router.events.subscribe(function (s) {
            if (s instanceof __WEBPACK_IMPORTED_MODULE_2__router__["b" /* NavigationEnd */]) {
                _this.updateTargetUrlAndHref();
            }
        });
    }
    Object.defineProperty(RouterLinkWithHref.prototype, "routerLink", {
        set: function (data) {
            if (Array.isArray(data)) {
                this.commands = data;
            }
            else {
                this.commands = [data];
            }
        },
        enumerable: true,
        configurable: true
    });
    RouterLinkWithHref.prototype.ngOnChanges = function (changes) { this.updateTargetUrlAndHref(); };
    RouterLinkWithHref.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    RouterLinkWithHref.prototype.onClick = function (button, ctrlKey, metaKey) {
        if (button !== 0 || ctrlKey || metaKey) {
            return true;
        }
        if (typeof this.target === 'string' && this.target != '_self') {
            return true;
        }
        this.router.navigateByUrl(this.urlTree);
        return false;
    };
    RouterLinkWithHref.prototype.updateTargetUrlAndHref = function () {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    };
    Object.defineProperty(RouterLinkWithHref.prototype, "urlTree", {
        get: function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: toBool(this.preserveQueryParams),
                preserveFragment: toBool(this.preserveFragment)
            });
        },
        enumerable: true,
        configurable: true
    });
    RouterLinkWithHref.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Directive"], args: [{ selector: 'a[routerLink]' },] },
    ];
    /** @nocollapse */
    RouterLinkWithHref.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* Router */], },
        { type: __WEBPACK_IMPORTED_MODULE_3__router_state__["b" /* ActivatedRoute */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* LocationStrategy */], },
    ];
    RouterLinkWithHref.propDecorators = {
        'target': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'queryParams': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'fragment': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'routerLinkOptions': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'preserveQueryParams': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'preserveFragment': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'href': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["HostBinding"] },],
        'routerLink': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Input"] },],
        'onClick': [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["HostListener"], args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey'],] },],
    };
    return RouterLinkWithHref;
}());
function toBool(s) {
    if (s === '')
        return true;
    return !!s;
}
//# sourceMappingURL=router_link.js.map

/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Tree; });
/* harmony export */ __webpack_require__.d(exports, "b", function() { return TreeNode; });/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Tree = (function () {
    function Tree(root) {
        this._root = root;
    }
    Object.defineProperty(Tree.prototype, "root", {
        get: function () { return this._root.value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @internal
     */
    Tree.prototype.parent = function (t) {
        var p = this.pathFromRoot(t);
        return p.length > 1 ? p[p.length - 2] : null;
    };
    /**
     * @internal
     */
    Tree.prototype.children = function (t) {
        var n = findNode(t, this._root);
        return n ? n.children.map(function (t) { return t.value; }) : [];
    };
    /**
     * @internal
     */
    Tree.prototype.firstChild = function (t) {
        var n = findNode(t, this._root);
        return n && n.children.length > 0 ? n.children[0].value : null;
    };
    /**
     * @internal
     */
    Tree.prototype.siblings = function (t) {
        var p = findPath(t, this._root, []);
        if (p.length < 2)
            return [];
        var c = p[p.length - 2].children.map(function (c) { return c.value; });
        return c.filter(function (cc) { return cc !== t; });
    };
    /**
     * @internal
     */
    Tree.prototype.pathFromRoot = function (t) { return findPath(t, this._root, []).map(function (s) { return s.value; }); };
    return Tree;
}());
function findNode(expected, c) {
    if (expected === c.value)
        return c;
    for (var _i = 0, _a = c.children; _i < _a.length; _i++) {
        var cc = _a[_i];
        var r = findNode(expected, cc);
        if (r)
            return r;
    }
    return null;
}
function findPath(expected, c, collected) {
    collected.push(c);
    if (expected === c.value)
        return collected;
    for (var _i = 0, _a = c.children; _i < _a.length; _i++) {
        var cc = _a[_i];
        var cloned = collected.slice(0);
        var r = findPath(expected, cc, cloned);
        if (r.length > 0)
            return r;
    }
    return [];
}
var TreeNode = (function () {
    function TreeNode(value, children) {
        this.value = value;
        this.children = children;
    }
    TreeNode.prototype.toString = function () { return "TreeNode(" + this.value + ")"; };
    return TreeNode;
}());
//# sourceMappingURL=tree.js.map

/***/ },

/***/ 352:
/***/ function(module, exports) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an Observable or a sequence was queried but has no
 * elements.
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link single}
 *
 * @class EmptyError
 */
var EmptyError = (function (_super) {
    __extends(EmptyError, _super);
    function EmptyError() {
        var err = _super.call(this, 'no elements in sequence');
        this.name = err.name = 'EmptyError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return EmptyError;
}(Error));
exports.EmptyError = EmptyError;
//# sourceMappingURL=EmptyError.js.map

/***/ },

/***/ 355:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__(74);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ProjectService; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HEADERS = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});
var ProjectService = (function () {
    function ProjectService(http, translate) {
        this.http = http;
        this.translate = translate;
    }
    ProjectService.prototype.getProjectStatusTypes = function () {
        return this.translate.get(['draft', 'active', 'completed']).map(function (t) { return [
            { value: 'DRAFT', text: t.draft, default: true },
            { value: 'ACTIVE', text: t.active },
            { value: 'COMPLETED', text: t.completed }
        ]; });
    };
    ProjectService.prototype.fetchProjects = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.http.get('p?id=project-view', {
            headers: HEADERS,
            search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* createURLSearchParams */])(queryParams)
        })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                projects: data.list,
                meta: data.meta
            };
        });
    };
    ProjectService.prototype.fetchProjectById = function (projectId) {
        var url = 'p?id=project-form&projectId=' + (projectId !== 'new' ? projectId : '');
        return this.http.get(url, { headers: HEADERS })
            .map(function (response) {
            var data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* parseResponseObjects */])(response.json().objects);
            var project = data.project;
            if (!project.id) {
                project.id = '';
            }
            if (data.fsid) {
                project.fsid = data.fsid;
            }
            if (data.ACL) {
                project.acl = data.ACL;
            }
            if (data.attachment) {
                project.attachments = data.attachment.list;
            }
            return project;
        });
    };
    ProjectService.prototype.saveProject = function (project) {
        var url = 'p?id=project-form&projectId=' + (project.id ? project.id : '');
        return this.http.post(url, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["b" /* serializeObj */])(project), { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["c" /* transformPostResponse */])(response); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    ProjectService.prototype.deleteProject = function (projects) {
        return this.http.delete('p?id=project-view&projectIds=' + projects.map(function (it) { return it.id; }).join(','), { headers: HEADERS })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    ProjectService.prototype.deleteProjectAttachment = function (project, attachment) {
        return this.http.delete('p?id=project-form&projectId=' + project.id + '&attachmentId=' + attachment.id + '&fsid=' + project.fsid, { headers: HEADERS })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    ProjectService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"]])
    ], ProjectService);
    return ProjectService;
}());


/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__(74);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return StaffService; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HEADERS = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});
var StaffService = (function () {
    function StaffService(http) {
        this.http = http;
    }
    StaffService.prototype.fetchOrganizations = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.http.get('/Staff/p?id=get-organizations', {
            headers: HEADERS,
            search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["d" /* createURLSearchParams */])(queryParams)
        })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                organizations: data.list,
                meta: data.meta
            };
        });
    };
    StaffService.prototype.fetchEmployees = function () {
        return this.http.get('/Staff/p?id=employees', { headers: HEADERS })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                employees: data.list
            };
        });
    };
    StaffService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], StaffService);
    return StaffService;
}());


/***/ },

/***/ 357:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TranslateService; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TranslateService = (function () {
    function TranslateService(http) {
        this.http = http;
    }
    TranslateService.prototype.fetchTranslations = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Accept': 'application/json'
        });
        return this.http.get('p?id=common-captions', { headers: headers }).map(function (response) {
            return response.json().captions;
        });
    };
    TranslateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], TranslateService);
    return TranslateService;
}());


/***/ },

/***/ 358:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ImgViewService; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ImgViewService = (function () {
    function ImgViewService() {
        this.emitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ImgViewService.prototype.getEmitter = function () {
        return this.emitter;
    };
    ImgViewService.prototype.show = function (url) {
        this.emitter.emit({ url: url });
    };
    ImgViewService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ImgViewService);
    return ImgViewService;
}());


/***/ },

/***/ 359:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return MarkdownConverter; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var marked = __webpack_require__(360);
var toMarkdown = __webpack_require__(364);
var MarkdownConverter = (function () {
    function MarkdownConverter() {
    }
    MarkdownConverter.prototype.toMarkdown = function (html) {
        return toMarkdown(html, { gfm: true });
    };
    MarkdownConverter.prototype.toHtml = function (markdown) {
        return marked(markdown);
    };
    MarkdownConverter = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], MarkdownConverter);
    return MarkdownConverter;
}());


/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organization__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__employee__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__attachment__ = __webpack_require__(880);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project__ = __webpack_require__(884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__task__ = __webpack_require__(889);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tag__ = __webpack_require__(887);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__task_type__ = __webpack_require__(888);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__comment__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__request__ = __webpack_require__(886);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__request_type__ = __webpack_require__(885);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user__ = __webpack_require__(527);
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__organization__, "a")) __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__organization__["a"]; });
/* unused harmony reexport Employee */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__attachment__, "a")) __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__attachment__["a"]; });
/* unused harmony reexport Project */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__task__, "a")) __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__task__["a"]; });
/* unused harmony reexport Tag */
/* unused harmony reexport TaskType */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__comment__, "a")) __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_7__comment__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_8__request__, "a")) __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_8__request__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_9__request_type__, "a")) __webpack_require__.d(exports, "g", function() { return __WEBPACK_IMPORTED_MODULE_9__request_type__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_10__user__, "a")) __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_10__user__["a"]; });













/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_service__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translate_service__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_service__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reference_service__ = __webpack_require__(904);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__staff_service__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__upload_service__ = __webpack_require__(905);

/* harmony export */ __webpack_require__.d(exports, "g", function() { return APP_SERVICES; });






/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__app_service__, "a")) __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_service__["a"]; });

/* unused harmony reexport TranslateService */

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__project_service__, "a")) __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__project_service__["a"]; });

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__task_service__, "a")) __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__task_service__["a"]; });

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__reference_service__, "a")) __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__reference_service__["a"]; });

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__staff_service__, "a")) __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__staff_service__["a"]; });

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_6__upload_service__, "a")) __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__upload_service__["a"]; });

var APP_SERVICES = [
    __WEBPACK_IMPORTED_MODULE_0__app_service__["a" /* AppService */],
    __WEBPACK_IMPORTED_MODULE_1__translate_service__["a" /* TranslateService */],
    __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
    __WEBPACK_IMPORTED_MODULE_3__task_service__["a" /* TaskService */],
    __WEBPACK_IMPORTED_MODULE_4__reference_service__["a" /* ReferenceService */],
    __WEBPACK_IMPORTED_MODULE_5__staff_service__["a" /* StaffService */]
];


/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_link__ = __webpack_require__(222);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return RouterLinkActive; });/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * The RouterLinkActive directive lets you add a CSS class to an element when the link's route
 * becomes active.
 *
 * Consider the following example:
 *
 * ```
 * <a [routerLink]="/user/bob" routerLinkActive="active-link">Bob</a>
 * ```
 *
 * When the url is either '/user' or '/user/bob', the active-link class will
 * be added to the `a` tag. If the url changes, the class will be removed.
 *
 * You can set more than one class, as follows:
 *
 * ```
 * <a [routerLink]="/user/bob" routerLinkActive="class1 class2">Bob</a>
 * <a [routerLink]="/user/bob" routerLinkActive="['class1', 'class2']">Bob</a>
 * ```
 *
 * You can configure RouterLinkActive by passing `exact: true`. This will add the classes
 * only when the url matches the link exactly.
 *
 * ```
 * <a [routerLink]="/user/bob" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:
 * true}">Bob</a>
 * ```
 *
 * Finally, you can apply the RouterLinkActive directive to an ancestor of a RouterLink.
 *
 * ```
 * <div routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
 *   <a [routerLink]="/user/jim">Jim</a>
 *   <a [routerLink]="/user/bob">Bob</a>
 * </div>
 * ```
 *
 * This will set the active-link class on the div tag if the url is either '/user/jim' or
 * '/user/bob'.
 *
 * @stable
 */
var RouterLinkActive = (function () {
    function RouterLinkActive(router, element, renderer) {
        var _this = this;
        this.router = router;
        this.element = element;
        this.renderer = renderer;
        this.classes = [];
        this.routerLinkActiveOptions = { exact: false };
        this.subscription = router.events.subscribe(function (s) {
            if (s instanceof __WEBPACK_IMPORTED_MODULE_1__router__["b" /* NavigationEnd */]) {
                _this.update();
            }
        });
    }
    RouterLinkActive.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.links.changes.subscribe(function (s) { return _this.update(); });
        this.linksWithHrefs.changes.subscribe(function (s) { return _this.update(); });
        this.update();
    };
    Object.defineProperty(RouterLinkActive.prototype, "routerLinkActive", {
        set: function (data) {
            if (Array.isArray(data)) {
                this.classes = data;
            }
            else {
                this.classes = data.split(' ');
            }
        },
        enumerable: true,
        configurable: true
    });
    RouterLinkActive.prototype.ngOnChanges = function (changes) { this.update(); };
    RouterLinkActive.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    RouterLinkActive.prototype.update = function () {
        var _this = this;
        if (!this.links || !this.linksWithHrefs || !this.router.navigated)
            return;
        var isActiveLinks = this.reduceList(this.links);
        var isActiveLinksWithHrefs = this.reduceList(this.linksWithHrefs);
        this.classes.forEach(function (c) { return _this.renderer.setElementClass(_this.element.nativeElement, c, isActiveLinks || isActiveLinksWithHrefs); });
    };
    RouterLinkActive.prototype.reduceList = function (q) {
        var _this = this;
        return q.reduce(function (res, link) {
            return res || _this.router.isActive(link.urlTree, _this.routerLinkActiveOptions.exact);
        }, false);
    };
    RouterLinkActive.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: '[routerLinkActive]' },] },
    ];
    /** @nocollapse */
    RouterLinkActive.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_1__router__["a" /* Router */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
    ];
    RouterLinkActive.propDecorators = {
        'links': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"], args: [__WEBPACK_IMPORTED_MODULE_2__router_link__["a" /* RouterLink */], { descendants: true },] },],
        'linksWithHrefs': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"], args: [__WEBPACK_IMPORTED_MODULE_2__router_link__["b" /* RouterLinkWithHref */], { descendants: true },] },],
        'routerLinkActiveOptions': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        'routerLinkActive': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    };
    return RouterLinkActive;
}());
//# sourceMappingURL=router_link_active.js.map

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_outlet_map__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__(54);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return RouterOutlet; });/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
 *
 * ## Example
 *
 * ```
 * <router-outlet></router-outlet>
 * <router-outlet name="left"></router-outlet>
 * <router-outlet name="right"></router-outlet>
 * ```
 *
 * A router outlet will emit an activate event any time a new component is being instantiated,
 * and a deactivate event when it is being destroyed.
 *
 * ## Example
 *
 * ```
 * <router-outlet (activate)="onActivate($event)"
 * (deactivate)="onDeactivate($event)"></router-outlet>
 * ```
 *
 * @stable
 */
var RouterOutlet = (function () {
    function RouterOutlet(parentOutletMap, location, resolver, name) {
        this.parentOutletMap = parentOutletMap;
        this.location = location;
        this.resolver = resolver;
        this.name = name;
        this.activateEvents = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.deactivateEvents = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        parentOutletMap.registerOutlet(name ? name : __WEBPACK_IMPORTED_MODULE_2__shared__["a" /* PRIMARY_OUTLET */], this);
    }
    RouterOutlet.prototype.ngOnDestroy = function () { this.parentOutletMap.removeOutlet(this.name ? this.name : __WEBPACK_IMPORTED_MODULE_2__shared__["a" /* PRIMARY_OUTLET */]); };
    Object.defineProperty(RouterOutlet.prototype, "isActivated", {
        get: function () { return !!this.activated; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "component", {
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return this.activated.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "activatedRoute", {
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return this._activatedRoute;
        },
        enumerable: true,
        configurable: true
    });
    RouterOutlet.prototype.deactivate = function () {
        if (this.activated) {
            var c = this.component;
            this.activated.destroy();
            this.activated = null;
            this.deactivateEvents.emit(c);
        }
    };
    RouterOutlet.prototype.activate = function (activatedRoute, loadedResolver, loadedInjector, providers, outletMap) {
        this.outletMap = outletMap;
        this._activatedRoute = activatedRoute;
        var snapshot = activatedRoute._futureSnapshot;
        var component = snapshot._routeConfig.component;
        var factory;
        if (loadedResolver) {
            factory = loadedResolver.resolveComponentFactory(component);
        }
        else {
            factory = this.resolver.resolveComponentFactory(component);
        }
        var injector = loadedInjector ? loadedInjector : this.location.parentInjector;
        var inj = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].fromResolvedProviders(providers, injector);
        this.activated = this.location.createComponent(factory, this.location.length, inj, []);
        this.activated.changeDetectorRef.detectChanges();
        this.activateEvents.emit(this.activated.instance);
    };
    RouterOutlet.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{ selector: 'router-outlet' },] },
    ];
    /** @nocollapse */
    RouterOutlet.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_1__router_outlet_map__["a" /* RouterOutletMap */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], },
        { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Attribute"], args: ['name',] },] },
    ];
    RouterOutlet.propDecorators = {
        'activateEvents': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"], args: ['activate',] },],
        'deactivateEvents': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"], args: ['deactivate',] },],
    };
    return RouterOutlet;
}());
//# sourceMappingURL=router_outlet.js.map

/***/ },

/***/ 461:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_router_link__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_router_link_active__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_router_outlet__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__router_config_loader__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__router_outlet_map__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__router_state__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__url_tree__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_collection__ = __webpack_require__(55);
/* unused harmony export ROUTER_CONFIGURATION *//* unused harmony export ROUTER_FORROOT_GUARD */
/* harmony export */ __webpack_require__.d(exports, "a", function() { return ROUTER_PROVIDERS; });
/* harmony export */ __webpack_require__.d(exports, "b", function() { return RouterModule; });/* unused harmony export provideLocationStrategy *//* unused harmony export provideForRootGuard *//* unused harmony export provideRoutes *//* unused harmony export setupRouter *//* unused harmony export rootRoute *//* unused harmony export initialRouterNavigation *//* unused harmony export provideRouterInitializer *//**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */











/**
 * @stable
 */
var ROUTER_DIRECTIVES = [__WEBPACK_IMPORTED_MODULE_4__directives_router_outlet__["a" /* RouterOutlet */], __WEBPACK_IMPORTED_MODULE_2__directives_router_link__["a" /* RouterLink */], __WEBPACK_IMPORTED_MODULE_2__directives_router_link__["b" /* RouterLinkWithHref */], __WEBPACK_IMPORTED_MODULE_3__directives_router_link_active__["a" /* RouterLinkActive */]];
/**
 * @stable
 */
var ROUTER_CONFIGURATION = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["OpaqueToken"]('ROUTER_CONFIGURATION');
var ROUTER_FORROOT_GUARD = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["OpaqueToken"]('ROUTER_FORROOT_GUARD');
var pathLocationStrategy = {
    provide: __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* LocationStrategy */],
    useClass: __WEBPACK_IMPORTED_MODULE_0__angular_common__["d" /* PathLocationStrategy */]
};
var hashLocationStrategy = {
    provide: __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* LocationStrategy */],
    useClass: __WEBPACK_IMPORTED_MODULE_0__angular_common__["e" /* HashLocationStrategy */]
};
var ROUTER_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_0__angular_common__["f" /* Location */], { provide: __WEBPACK_IMPORTED_MODULE_9__url_tree__["g" /* UrlSerializer */], useClass: __WEBPACK_IMPORTED_MODULE_9__url_tree__["h" /* DefaultUrlSerializer */] }, {
        provide: __WEBPACK_IMPORTED_MODULE_5__router__["a" /* Router */],
        useFactory: setupRouter,
        deps: [
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["ApplicationRef"], __WEBPACK_IMPORTED_MODULE_9__url_tree__["g" /* UrlSerializer */], __WEBPACK_IMPORTED_MODULE_7__router_outlet_map__["a" /* RouterOutletMap */], __WEBPACK_IMPORTED_MODULE_0__angular_common__["f" /* Location */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injector"], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModuleFactoryLoader"],
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["Compiler"], __WEBPACK_IMPORTED_MODULE_6__router_config_loader__["c" /* ROUTES */], ROUTER_CONFIGURATION
        ]
    },
    __WEBPACK_IMPORTED_MODULE_7__router_outlet_map__["a" /* RouterOutletMap */], { provide: __WEBPACK_IMPORTED_MODULE_8__router_state__["b" /* ActivatedRoute */], useFactory: rootRoute, deps: [__WEBPACK_IMPORTED_MODULE_5__router__["a" /* Router */]] },
    { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModuleFactoryLoader"], useClass: __WEBPACK_IMPORTED_MODULE_1__angular_core__["SystemJsNgModuleLoader"] },
    { provide: ROUTER_CONFIGURATION, useValue: { enableTracing: false } }
];
/**
 * Router module.
 *
 * When registered at the root, it should be used as follows:
 *
 * ### Example
 *
 * ```
 * bootstrap(AppCmp, {imports: [RouterModule.forRoot(ROUTES)]});
 * ```
 *
 * For submodules and lazy loaded submodules it should be used as follows:
 *
 * ### Example
 *
 * ```
 * @NgModule({
 *   imports: [RouterModule.forChild(CHILD_ROUTES)]
 * })
 * class Lazy {}
 * ```
 *
 * @stable
 */
var RouterModule = (function () {
    function RouterModule(guard) {
    }
    RouterModule.forRoot = function (routes, config) {
        return {
            ngModule: RouterModule,
            providers: [
                ROUTER_PROVIDERS, provideRoutes(routes), {
                    provide: ROUTER_FORROOT_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [[__WEBPACK_IMPORTED_MODULE_5__router__["a" /* Router */], new __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"](), new __WEBPACK_IMPORTED_MODULE_1__angular_core__["SkipSelf"]()]]
                },
                { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} }, {
                    provide: __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* LocationStrategy */],
                    useFactory: provideLocationStrategy,
                    deps: [
                        __WEBPACK_IMPORTED_MODULE_0__angular_common__["a" /* PlatformLocation */], [new __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"](__WEBPACK_IMPORTED_MODULE_0__angular_common__["g" /* APP_BASE_HREF */]), new __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"]()], ROUTER_CONFIGURATION
                    ]
                },
                provideRouterInitializer()
            ]
        };
    };
    RouterModule.forChild = function (routes) {
        return { ngModule: RouterModule, providers: [provideRoutes(routes)] };
    };
    RouterModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"], args: [{ declarations: ROUTER_DIRECTIVES, exports: ROUTER_DIRECTIVES },] },
    ];
    /** @nocollapse */
    RouterModule.ctorParameters = [
        { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Optional"] }, { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Inject"], args: [ROUTER_FORROOT_GUARD,] },] },
    ];
    return RouterModule;
}());
function provideLocationStrategy(platformLocationStrategy, baseHref, options) {
    if (options === void 0) { options = {}; }
    return options.useHash ? new __WEBPACK_IMPORTED_MODULE_0__angular_common__["e" /* HashLocationStrategy */](platformLocationStrategy, baseHref) :
        new __WEBPACK_IMPORTED_MODULE_0__angular_common__["d" /* PathLocationStrategy */](platformLocationStrategy, baseHref);
}
function provideForRootGuard(router) {
    if (router) {
        throw new Error("RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
    }
    return 'guarded';
}
/**
 * @stable
 */
function provideRoutes(routes) {
    return [
        { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ANALYZE_FOR_ENTRY_COMPONENTS"], multi: true, useValue: routes },
        { provide: __WEBPACK_IMPORTED_MODULE_6__router_config_loader__["c" /* ROUTES */], multi: true, useValue: routes }
    ];
}
function setupRouter(ref, urlSerializer, outletMap, location, injector, loader, compiler, config, opts) {
    if (opts === void 0) { opts = {}; }
    if (ref.componentTypes.length == 0) {
        throw new Error('Bootstrap at least one component before injecting Router.');
    }
    var componentType = ref.componentTypes[0];
    var r = new __WEBPACK_IMPORTED_MODULE_5__router__["a" /* Router */](componentType, urlSerializer, outletMap, location, injector, loader, compiler, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__utils_collection__["a" /* flatten */])(config));
    if (opts.errorHandler) {
        r.errorHandler = opts.errorHandler;
    }
    if (opts.enableTracing) {
        r.events.subscribe(function (e) {
            console.group("Router Event: " + e.constructor.name);
            console.log(e.toString());
            console.log(e);
            console.groupEnd();
        });
    }
    return r;
}
function rootRoute(router) {
    return router.routerState.root;
}
function initialRouterNavigation(router, opts) {
    return function () {
        if (opts.initialNavigation === false) {
            router.setUpLocationChangeListener();
        }
        else {
            router.initialNavigation();
        }
    };
}
function provideRouterInitializer() {
    return {
        provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["APP_BOOTSTRAP_LISTENER"],
        multi: true,
        useFactory: initialRouterNavigation,
        deps: [__WEBPACK_IMPORTED_MODULE_5__router__["a" /* Router */], ROUTER_CONFIGURATION]
    };
}
//# sourceMappingURL=router_module.js.map

/***/ },

/***/ 500:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var FromObservable_1 = __webpack_require__(822);
exports.from = FromObservable_1.FromObservable.create;
//# sourceMappingURL=from.js.map

/***/ },

/***/ 503:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var mergeAll_1 = __webpack_require__(166);
/**
 * Converts a higher-order Observable into a first-order Observable by
 * concatenating the inner Observables in order.
 *
 * <span class="informal">Flattens an Observable-of-Observables by putting one
 * inner Observable after the other.</span>
 *
 * <img src="./img/concatAll.png" width="100%">
 *
 * Joins every Observable emitted by the source (a higher-order Observable), in
 * a serial fashion. It subscribes to each inner Observable only after the
 * previous inner Observable has completed, and merges all of their values into
 * the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and
 * endlessly, and the inner Observables it emits generally complete slower than
 * the source emits, you can run into memory issues as the incoming Observables
 * collect in an unbounded buffer.
 *
 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
 * var firstOrder = higherOrder.concatAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * @see {@link combineAll}
 * @see {@link concat}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable emitting values from all the inner
 * Observables concatenated.
 * @method concatAll
 * @owner Observable
 */
function concatAll() {
    return this.lift(new mergeAll_1.MergeAllOperator(1));
}
exports.concatAll = concatAll;
//# sourceMappingURL=concatAll.js.map

/***/ },

/***/ 505:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(17);
/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 * @param {function} predicate a function for determining if an item meets a specified condition.
 * @param {any} [thisArg] optional object to use for `this` in the callback
 * @return {Observable} an Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
function every(predicate, thisArg) {
    return this.lift(new EveryOperator(predicate, thisArg, this));
}
exports.every = every;
var EveryOperator = (function () {
    function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    EveryOperator.prototype.call = function (observer, source) {
        return source._subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var EverySubscriber = (function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
        this.index = 0;
        this.thisArg = thisArg || this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=every.js.map

/***/ },

/***/ 516:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return AppActions; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppActions = (function () {
    function AppActions() {
    }
    AppActions.prototype.fetchUserProfile = function () {
        return {
            type: AppActions.FETCH_USER_PROFILE
        };
    };
    AppActions.prototype.fetchUserProfileFailed = function (error) {
        return {
            type: AppActions.FETCH_USER_PROFILE_FAILED,
            payload: error
        };
    };
    AppActions.prototype.fetchUserProfileFulfilled = function (payload) {
        return {
            type: AppActions.FETCH_USER_PROFILE_FULFILLED,
            payload: payload
        };
    };
    AppActions.prototype.updateUserProfile = function (userProfile) {
        return {
            type: AppActions.UPDATE_USER_PROFILE,
            payload: {
                userProfile: userProfile
            }
        };
    };
    AppActions.prototype.updateUserProfileFailed = function (error) {
        return {
            type: AppActions.UPDATE_USER_PROFILE_FAILED,
            payload: error
        };
    };
    AppActions.prototype.updateUserProfileFulfilled = function (userProfile) {
        return {
            type: AppActions.UPDATE_USER_PROFILE_FULFILLED,
            payload: {
                userProfile: userProfile
            }
        };
    };
    AppActions.FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
    AppActions.FETCH_USER_PROFILE_FAILED = 'FETCH_USER_PROFILE_FAILED';
    AppActions.FETCH_USER_PROFILE_FULFILLED = 'FETCH_USER_PROFILE_FULFILLED';
    AppActions.UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
    AppActions.UPDATE_USER_PROFILE_FAILED = 'UPDATE_USER_PROFILE_FAILED';
    AppActions.UPDATE_USER_PROFILE_FULFILLED = 'UPDATE_USER_PROFILE_FULFILLED';
    AppActions = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], AppActions);
    return AppActions;
}());


/***/ },

/***/ 517:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ReferenceActions; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReferenceActions = (function () {
    function ReferenceActions() {
    }
    ReferenceActions.prototype.fetchTaskTypes = function (taskTypes) {
        return {
            type: ReferenceActions.FETCH_TASK_TYPES,
            payload: { taskTypes: taskTypes }
        };
    };
    ReferenceActions.prototype.fetchRequestTypes = function (requestTypes) {
        return {
            type: ReferenceActions.FETCH_REQUEST_TYPES,
            payload: { requestTypes: requestTypes }
        };
    };
    ReferenceActions.prototype.fetchTags = function (tags) {
        return {
            type: ReferenceActions.FETCH_TAGS,
            payload: { tags: tags }
        };
    };
    ReferenceActions.prototype.fetchReferenceFailed = function (error) {
        return {
            type: ReferenceActions.FETCH_REFERENCE_FAILED,
            payload: error
        };
    };
    ReferenceActions.FETCH_TASK_TYPES = 'FETCH_TASK_TYPES';
    ReferenceActions.FETCH_REQUEST_TYPES = 'FETCH_REQUEST_TYPES';
    ReferenceActions.FETCH_TAGS = 'FETCH_TAGS';
    ReferenceActions.FETCH_REFERENCE_FAILED = 'FETCH_REFERENCE_FAILED';
    ReferenceActions = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ReferenceActions);
    return ReferenceActions;
}());


/***/ },

/***/ 518:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(45);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return AuthGuard; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(appService, router) {
        this.appService = appService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this.appService.isLogged) {
            return true;
        }
        return true;
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__services__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]])
    ], AuthGuard);
    return AuthGuard;
}());


/***/ },

/***/ 519:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__(74);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return DashboardComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HEADERS = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});
var DashboardComponent = (function () {
    function DashboardComponent(http) {
        this.http = http;
        this.fetchDashboardProjects();
    }
    DashboardComponent.prototype.fetchDashboardProjects = function () {
        var _this = this;
        this.http.get('p?id=dashboard', { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["a" /* parseResponseObjects */])(response.json().objects).project; })
            .subscribe(function (data) {
            _this.projects = data ? data.list : [];
        });
    };
    DashboardComponent.prototype.addProjectToDashboard = function () {
        var _this = this;
        this.http.post('p?id=dashboard', "projectId=" + this.projectId, { headers: HEADERS })
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.fetchDashboardProjects();
        });
    };
    DashboardComponent.prototype.deleteProjectFromDashboard = function (projectId) {
        var _this = this;
        this.http.delete("p?id=dashboard&projectId=" + projectId, { headers: HEADERS })
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.fetchDashboardProjects();
        });
    };
    DashboardComponent.prototype.selectProject = function (project) {
        this.projectId = project.id;
        document.body.click();
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[dashboard]',
            template: "\n        <div class=\"content-header\">\n            <h1 class=\"header-title\">\n                {{'dashboard' | translate}}\n            </h1>\n        </div>\n        <div class=\"content-body\">\n            \u0417\u0434\u0435\u0441\u044C \u0447\u0442\u043E-\u0442\u043E \u0431\u0443\u0434\u0435\u0442\n            <!-- <div class=\"dashboard\" *ngFor=\"let project of projects\">\n                <header>\n                    <span>{{project.name}}</span>\n                    <button (click)=\"deleteProjectFromDashboard(project.id)\">delete</button>\n                </header>\n                <section>\n                    project data\n                </section>\n            </div>\n            <div class=\"span3\">\n                <project-input editable=\"true\" (select)=\"selectProject($event)\"></project-input>\n                <button class=\"btn\" type=\"button\" (click)=\"addProjectToDashboard()\">{{'dashboard_add_project' | translate}}</button>\n            </div> -->\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], DashboardComponent);
    return DashboardComponent;
}());


/***/ },

/***/ 520:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return LoginComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginComponent = (function () {
    function LoginComponent() {
        window.location.href = 'Logout';
    }
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[login]',
            template: ''
        }), 
        __metadata('design:paramtypes', [])
    ], LoginComponent);
    return LoginComponent;
}());


/***/ },

/***/ 521:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_notification__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_utils__ = __webpack_require__(74);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ProjectComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ProjectComponent = (function () {
    function ProjectComponent(store, router, route, translate, projectService, notifyService) {
        this.store = store;
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.projectService = projectService;
        this.notifyService = notifyService;
        this.subs = [];
        this.isReady = false;
        this.isNew = true;
        this.isEditable = false;
        this.isValid = true;
        this.errors = {};
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.store.select('environment').subscribe(function (state) {
            _this.redirectUrl = state.redirectUrl;
        }));
        this.subs.push(this.route.params.subscribe(function (params) {
            _this.projectService.fetchProjectById(params['projectId']).subscribe(function (project) {
                _this.project = project;
                _this.isNew = _this.project.id == '';
                _this.isEditable = _this.isNew || _this.project.editable;
                _this.isReady = true;
                _this.isValid = true;
                _this.loadData();
            }, function (error) { return _this.handleXhrError(error); });
        }));
    };
    ProjectComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    Object.defineProperty(ProjectComponent.prototype, "title", {
        get: function () {
            if (this.isNew) {
                return 'new_project';
            }
            else {
                return 'project';
            }
        },
        enumerable: true,
        configurable: true
    });
    ProjectComponent.prototype.loadData = function () {
        var _this = this;
        this.projectService.getProjectStatusTypes().subscribe(function (pst) { return _this.projectStatusTypes = pst; });
    };
    ProjectComponent.prototype.saveProject = function () {
        var _this = this;
        var noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
        this.projectService.saveProject(this.project).subscribe(function (response) {
            noty.set({ type: 'success', message: response.message });
            _this.close();
            return response;
        }, function (error) {
            noty.remove();
            _this.handleXhrError(error);
            _this.handleValidationError(error);
            return error;
        }, function () { return noty.remove(1500); });
    };
    ProjectComponent.prototype.deleteProject = function () {
        var _this = this;
        this.projectService.deleteProject([this.project]).subscribe(function (data) { return _this.close(); }, function (error) { return _this.handleXhrError(error); });
    };
    ProjectComponent.prototype.close = function () {
        this.router.navigateByUrl(this.redirectUrl);
    };
    ProjectComponent.prototype.handleValidationError = function (error) {
        var errors = {};
        if (error.validation) {
            this.isValid = false;
            for (var _i = 0, _a = error.validation.errors; _i < _a.length; _i++) {
                var err = _a[_i];
                errors[err.field] = {
                    message: err.message,
                    error: err.error
                };
            }
        }
        this.errors = errors;
    };
    ProjectComponent.prototype.handleXhrError = function (errorResponse) {
        console.log(errorResponse);
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
        else {
            this.notifyService.error(errorResponse.message).show().remove(2000);
        }
    };
    ProjectComponent.prototype.setStatus = function (value) {
        this.project.status = value;
        this.validateForm('status');
    };
    ProjectComponent.prototype.setCustomer = function (customer) {
        this.project.customerId = customer.id;
        this.validateForm('customerId');
    };
    ProjectComponent.prototype.setManager = function (employee) {
        this.project.managerUserId = employee[0].userID;
        this.validateForm('managerUserId');
    };
    ProjectComponent.prototype.setProgrammer = function (employee) {
        this.project.programmerUserId = employee[0].userID;
        this.validateForm('programmerUserId');
    };
    ProjectComponent.prototype.setTester = function (employee) {
        this.project.testerUserId = employee[0].userID;
        this.validateForm('testerUserId');
    };
    ProjectComponent.prototype.setObserver = function (observers) {
        this.project.observerUserIds = observers.map(function (it) { return it.userID; });
        this.validateForm('observerUserIds');
    };
    ProjectComponent.prototype.removeObserver = function (observer, $event) {
        var _this = this;
        this.project.observerUserIds.forEach(function (id, index) {
            if (id === observer.userID) {
                _this.project.observerUserIds.splice(index, 1);
            }
        });
        $event.stopPropagation();
    };
    ProjectComponent.prototype.setFinishDate = function (date) {
        this.project.finishDate = date;
        this.validateForm('finishDate');
    };
    ProjectComponent.prototype.setProjectComment = function (text) {
        this.project.comment = text;
        this.validateForm('comment');
    };
    ProjectComponent.prototype.addAttachment = function (data) {
        var _this = this;
        var att = new __WEBPACK_IMPORTED_MODULE_6__models__["c" /* Attachment */]();
        att.realFileName = data.response.files[0];
        if (!this.project.attachments) {
            this.project.attachments = [];
        }
        if (!this.project.fsid) {
            this.project.fsid = '' + Date.now();
        }
        if (!data.files[0].type.match('image.*')) {
            this.project.attachments.push(att);
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_utils__["e" /* imgToBase64 */])(data.files[0], function (e2) {
                att.base64 = e2.target.result;
                _this.project.attachments.push(att);
            });
        }
    };
    ProjectComponent.prototype.deleteAttachment = function (attachment) {
        var _this = this;
        this.projectService.deleteProjectAttachment(this.project, attachment).subscribe(function (r) {
            _this.project.attachments = _this.project.attachments.filter(function (it) { return it.id != attachment.id; });
        });
    };
    ProjectComponent.prototype.validateForm = function (field) {
        for (var errField in this.errors) {
            if (this.project[errField]) {
                this.errors[errField] = false;
            }
        }
        var isValid = true;
        for (var errField in this.errors) {
            if (this.errors[errField] !== false) {
                isValid = false;
                break;
            }
        }
        this.isValid = isValid;
    };
    ProjectComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'project',
            template: __webpack_require__(804)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"], __WEBPACK_IMPORTED_MODULE_5__services__["d" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_4__shared_notification__["a" /* NotificationService */]])
    ], ProjectComponent);
    return ProjectComponent;
}());


/***/ },

/***/ 522:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_environment_actions__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_staff_service__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_project_service__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_project_actions__ = __webpack_require__(169);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ProjectsComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProjectsComponent = (function () {
    function ProjectsComponent(store, router, envActions, projectActions, projectService, staffService) {
        this.store = store;
        this.router = router;
        this.envActions = envActions;
        this.projectActions = projectActions;
        this.projectService = projectService;
        this.staffService = staffService;
        this.subs = [];
        this.title = 'projects';
        this.meta = {};
        this.keyWord = '';
        this.loading = true;
        this.params = {};
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.store.select('environment').subscribe(function (state) {
            if (_this.keyWord != state.keyWord) {
                _this.loadData({
                    keyWord: state.keyWord
                });
            }
            _this.keyWord = state.keyWord;
        }));
        this.subs.push(this.store.select('projects').subscribe(function (state) {
            if (state) {
                _this.projects = state.projects;
                _this.meta = state.meta;
                _this.loading = state.loading;
            }
        }));
        this.loadData();
    };
    ProjectsComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    ProjectsComponent.prototype.loadData = function (params) {
        var _this = this;
        this.store.dispatch(this.envActions.setRedirectUrl('/projects'));
        this.params = params;
        this.store.dispatch(this.projectActions.fetchProjects());
        this.projectService.fetchProjects(params).subscribe(function (data) {
            var customerIds = data.projects.map(function (it) { return it.customerId; });
            _this.staffService.fetchOrganizations({ ids: customerIds }).subscribe(function (payload) {
                var orgs = payload.organizations;
                data.projects.map(function (p) {
                    if (p.customerId) {
                        p.customer = orgs.filter(function (org) { return org.id == p.customerId; })[0];
                    }
                });
                _this.store.dispatch(_this.projectActions.fetchProjectsFulfilled(data.projects, data.meta));
            }, function (error) { return _this.store.dispatch(_this.projectActions.fetchProjectsFailed(error)); });
        });
    };
    ProjectsComponent.prototype.refresh = function () {
        this.loadData(this.params);
    };
    ProjectsComponent.prototype.goToPage = function (params) {
        this.loadData({
            page: params.page,
            keyWord: this.keyWord
        });
    };
    ProjectsComponent.prototype.newProject = function () {
        this.router.navigate(['/projects', 'new']);
    };
    ProjectsComponent.prototype.deleteProject = function () {
    };
    ProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'projects',
            template: __webpack_require__(805)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_3__actions_environment_actions__["a" /* EnvironmentActions */], __WEBPACK_IMPORTED_MODULE_6__actions_project_actions__["a" /* ProjectActions */], __WEBPACK_IMPORTED_MODULE_5__services_project_service__["a" /* ProjectService */], __WEBPACK_IMPORTED_MODULE_4__services_staff_service__["a" /* StaffService */]])
    ], ProjectsComponent);
    return ProjectsComponent;
}());


/***/ },

/***/ 523:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_notification__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models__ = __webpack_require__(44);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return RequestComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RequestComponent = (function () {
    function RequestComponent(store, router, route, translate, notifyService, taskService) {
        this.store = store;
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.notifyService = notifyService;
        this.taskService = taskService;
        this.send = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.subs = [];
        this.isReady = false;
        this.isNew = true;
        this.dueDate = '';
        this.editable = true;
        this.isResolveAction = false;
        this.showDeclineDialog = false;
    }
    RequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.store.select('environment').subscribe(function (state) {
            _this.redirectUrl = state.redirectUrl;
        }));
        this.subs.push(this.route.params.subscribe(function (params) {
            _this.isReady = false;
            _this.isNew = params['requestId'] === 'new';
            _this.editable = _this.isNew;
            _this.isResolveAction = false;
            _this.taskService.fetchRequestById(params['requestId']).subscribe(function (request) {
                _this.request = request;
                if (_this.isNew) {
                    _this.request.taskId = _this.route.snapshot.queryParams['task'];
                }
                else {
                    _this.isResolveAction = _this.request.resolution == 'UNKNOWN' && _this.request.requestType.name === 'prolong';
                }
                _this.taskService.fetchTaskById(_this.request.taskId).subscribe(function (task) {
                    _this.task = task;
                    _this.isReady = true;
                });
            }, function (errorResponse) { return _this.handleXhrError(errorResponse); });
        }));
    };
    RequestComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    RequestComponent.prototype.handleXhrError = function (errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
        else {
            this.notifyService.error(errorResponse.message).show().remove(3000);
        }
    };
    RequestComponent.prototype.close = function () {
        this.router.navigateByUrl(this.redirectUrl);
    };
    RequestComponent.prototype.onConfirmDeclineDialog = function (comment) {
        this.doDecline(this.request, comment);
    };
    RequestComponent.prototype.onCancelDeclineDialog = function () {
        this.showDeclineDialog = false;
    };
    RequestComponent.prototype.decline = function () {
        this.showDeclineDialog = true;
    };
    RequestComponent.prototype.cancel = function () {
        this.store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_5__actions__["e" /* TaskActions */].TASK_REQUEST_CANCEL });
    };
    RequestComponent.prototype.sendRequest = function () {
        var _this = this;
        this.taskService.sendTaskRequest(this.request).subscribe(function (response) {
            _this.notifyService.info(_this.translate.instant('request_send_success')).show().remove(3000);
            _this.close();
            _this.send.emit({
                requestSendSuccess: true
            });
        });
    };
    RequestComponent.prototype.doAccept = function (request) {
        var _this = this;
        this.taskService.doAcceptRequest(request, { dueDate: this.dueDate }).subscribe(function (action) {
            _this.store.dispatch(action);
            _this.close();
        });
    };
    RequestComponent.prototype.doDecline = function (request, comment) {
        var _this = this;
        this.taskService.doDeclineRequest(request, comment).subscribe(function (action) {
            _this.close();
        });
    };
    RequestComponent.prototype.setRequestType = function (requestType) {
        this.request.requestTypeId = requestType.id;
    };
    RequestComponent.prototype.setComment = function (comment) {
        this.request.comment = comment;
    };
    RequestComponent.prototype.setDueDate = function (date) {
        this.dueDate = date;
    };
    RequestComponent.prototype.addAttachment = function (file) {
        var att = new __WEBPACK_IMPORTED_MODULE_7__models__["c" /* Attachment */]();
        att.realFileName = file.files[0];
        if (!this.request.attachments) {
            this.request.attachments = [];
        }
        this.request.attachments.push(att);
    };
    RequestComponent.prototype.deleteAttachment = function (attachment) {
        this.request.attachments = this.request.attachments.filter(function (it) { return it.id != attachment.id; });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], RequestComponent.prototype, "send", void 0);
    RequestComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'request',
            template: __webpack_require__(806)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"], __WEBPACK_IMPORTED_MODULE_4__shared_notification__["a" /* NotificationService */], __WEBPACK_IMPORTED_MODULE_6__services__["e" /* TaskService */]])
    ], RequestComponent);
    return RequestComponent;
}());


/***/ },

/***/ 524:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_notification__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_utils__ = __webpack_require__(74);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TaskComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TaskComponent = (function () {
    function TaskComponent(store, router, route, translate, taskActions, taskService, notifyService, appService) {
        var _this = this;
        this.store = store;
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.taskActions = taskActions;
        this.taskService = taskService;
        this.notifyService = notifyService;
        this.appService = appService;
        this.subs = [];
        this.isReady = false;
        this.isNew = true;
        this.isEditable = false;
        this.isValid = true;
        this.isSubtask = false;
        this.subTasks = [];
        this.acl = {};
        this.rights = {
            addSubtask: false,
            doRequest: false,
            doResolution: false,
            addComment: false,
            removeTask: false
        };
        this.FEATURE_FLAGS = {
            subTask: true,
            comments: false
        };
        this.showPropertyTabTitle = true;
        this.showProperty = true;
        this.showSubtasks = false;
        this.showRequests = false;
        this.showACLTabTitle = false;
        this.showACL = false;
        this.showTaskCancelDialog = false;
        this.hasUnResolvedRequest = true;
        this.hasAcceptedRequestResolution = false;
        this.errors = {};
        this.subs.push(this.store.select('task').subscribe(function (state) {
            _this.comments = state.comments;
            _this.requests = state.requests;
            if (!_this.requests) {
                _this.hasUnResolvedRequest = false;
            }
            else {
                _this.hasUnResolvedRequest = false;
                _this.hasAcceptedRequestResolution = false;
                _this.requests.forEach(function (it) {
                    if (it.resolution == 'UNKNOWN') {
                        _this.hasUnResolvedRequest = true;
                    }
                    if (it.resolution == 'ACCEPT') {
                        _this.hasAcceptedRequestResolution = true;
                    }
                });
            }
        }));
        this.subs.push(this.store.select('environment').subscribe(function (state) {
            _this.redirectUrl = state.redirectUrl;
        }));
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.route.params.subscribe(function (params) {
            _this.isReady = false;
            _this.task = null;
            _this.showProperty = true;
            _this.showSubtasks = false;
            _this.showRequests = false;
            _this.hasUnResolvedRequest = true;
            _this.hasAcceptedRequestResolution = false;
            _this.isNew = (params['taskId'] === 'new') || (params['taskId'] && params['new'] === 'new');
            _this.isSubtask = params['taskId'] && params['new'] === 'new';
            _this.showPropertyTabTitle = !_this.isNew;
            _this.showACLTabTitle = _this.showPropertyTabTitle;
            _this.showTaskCancelDialog = false;
            _this.taskService.fetchTaskById(params['taskId']).subscribe(function (task) {
                if (_this.isSubtask) {
                    _this.parentTask = task;
                    _this.task = new __WEBPACK_IMPORTED_MODULE_7__models__["d" /* Task */]();
                    _this.task.parentTaskId = _this.parentTask.id;
                }
                else {
                    _this.task = task;
                    _this.isSubtask = !!_this.task.parentTaskId;
                }
                if (!_this.isNew) {
                    _this.loadComments(1);
                    _this.loadRequests(1);
                    _this.loadSubtasks();
                }
                _this.parentTask = null;
                if (_this.task.parentTaskId && !_this.task.parentTask) {
                    _this.taskService.fetchTaskById(_this.task.parentTaskId).subscribe(function (parentTask) {
                        _this.parentTask = parentTask;
                        if (_this.isNew && _this.isSubtask) {
                            _this.copyValueFromTask(_this.parentTask);
                        }
                        _this.isReady = true;
                    });
                }
                else {
                    _this.isReady = true;
                }
                _this.isEditable = _this.isNew || _this.task.editable;
                _this.isValid = true;
            }, function (errorResponse) { return _this.handleXhrError(errorResponse); });
        }));
        this.taskService.getTaskPriorityTypes().subscribe(function (tpt) { return _this.taskPriorityTypes = tpt; });
    };
    TaskComponent.prototype.ngOnDestroy = function () {
        this.store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_6__actions__["e" /* TaskActions */].TASK_UNLOAD });
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    Object.defineProperty(TaskComponent.prototype, "title", {
        get: function () {
            if (this.isNew && this.isSubtask) {
                return 'new_subtask';
            }
            else if (this.isNew) {
                return 'new_task';
            }
            else if (this.isSubtask) {
                return 'subtask';
            }
            else {
                return 'task';
            }
        },
        enumerable: true,
        configurable: true
    });
    TaskComponent.prototype.copyValueFromTask = function (task) {
        this.task.title = task.title;
        this.task.priority = task.priority;
        this.task.startDate = task.startDate;
        this.task.dueDate = task.dueDate;
        this.task.tagIds = task.tagIds;
    };
    TaskComponent.prototype.toggleShowProperty = function () {
        this.showProperty = true;
        this.showRequests = false;
        this.showSubtasks = false;
        this.showACL = false;
    };
    TaskComponent.prototype.toggleShowSubtasks = function () {
        this.showSubtasks = true;
        this.showRequests = false;
        this.showProperty = false;
        this.showACL = false;
    };
    TaskComponent.prototype.toggleShowACL = function () {
        this.showACL = true;
        this.showSubtasks = false;
        this.showProperty = false;
        this.showRequests = false;
    };
    TaskComponent.prototype.saveTask = function () {
        var _this = this;
        var noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
        this.taskService.saveTask(this.task).subscribe(function (response) {
            noty.set({ type: 'success', message: response.message }).remove(1500);
            _this.close();
        }, function (error) {
            noty.remove();
            _this.handleXhrError(error);
            _this.handleValidationError(error);
        });
    };
    TaskComponent.prototype.completeTask = function () {
        var _this = this;
        var noty = this.notifyService.process(this.translate.instant('wait_while_process')).show();
        this.taskService.completeTask(this.task).subscribe(function (response) {
            noty.set({ type: 'success', message: response.message }).remove(1500);
            _this.close();
        }, function (error) {
            noty.remove();
            _this.handleXhrError(error);
        });
    };
    TaskComponent.prototype.cancelTask = function () {
        this.showTaskCancelDialog = true;
    };
    TaskComponent.prototype.doCancelTaskRequest = function (cancelComment) {
        var _this = this;
        var noty = this.notifyService.process(this.translate.instant('wait_while_process')).show();
        this.taskService.cancelTask(this.task, cancelComment).subscribe(function (response) {
            noty.set({ type: 'success', message: response.message }).remove(1500);
            _this.close();
        }, function (error) {
            noty.remove();
            _this.handleXhrError(error);
        });
    };
    TaskComponent.prototype.acknowledgedTask = function () {
        var _this = this;
        var noty = this.notifyService.process(this.translate.instant('wait_while_process')).show();
        this.taskService.acknowledgedTask(this.task).subscribe(function (response) {
            noty.set({ type: 'success', message: response.message }).remove(1500);
            _this.close();
        }, function (error) {
            noty.remove();
            _this.handleXhrError(error);
        });
    };
    TaskComponent.prototype.deleteTask = function () {
        var _this = this;
        this.taskService.deleteTask([this.task]).subscribe(function (data) {
            _this.close();
        }, function (error) {
            _this.handleXhrError(error);
        });
    };
    TaskComponent.prototype.canAddSubTask = function () {
        return this.FEATURE_FLAGS.subTask && !this.isNew && this.task.status != 'FINISHED' && this.task.status != 'COMPLETED' && this.task.status != 'CANCELLED';
    };
    TaskComponent.prototype.addSubtask = function () {
        this.router.navigate(['/task', this.task.id, 'new']);
    };
    TaskComponent.prototype.showComments = function () {
        return this.hasFutureComments() && !this.isNew;
    };
    TaskComponent.prototype.hasFutureComments = function () {
        return this.FEATURE_FLAGS.comments;
    };
    TaskComponent.prototype.loadComments = function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        this.taskService.fetchComments(this.task, page).subscribe(function (payload) {
            _this.store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_6__actions__["e" /* TaskActions */].FETCH_TASK_COMMENTS_FULFILLED, payload: payload });
        });
    };
    TaskComponent.prototype.saveComment = function (comment) {
        var _this = this;
        this.taskService.saveComment(this.task, comment).subscribe(function (r) {
            _this.loadComments(1);
        });
    };
    TaskComponent.prototype.deleteComment = function (comment) {
        var _this = this;
        this.taskService.deleteComment(comment).subscribe(function (response) {
            _this.loadComments(1);
        });
    };
    TaskComponent.prototype.loadRequests = function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        this.taskService.fetchTaskRequests(this.task, page).subscribe(function (payload) {
            _this.store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_6__actions__["e" /* TaskActions */].FETCH_TASK_REQUESTS_FULFILLED, payload: payload });
        });
    };
    TaskComponent.prototype.acceptRequest = function (request) {
        var _this = this;
        if (request.requestType.name == 'prolong') {
            this.store.dispatch({
                type: __WEBPACK_IMPORTED_MODULE_6__actions__["e" /* TaskActions */].TASK_REQUEST_ACCEPTANCE,
                payload: {
                    task: this.task,
                    request: request
                }
            });
        }
        else {
            this.taskService.doAcceptRequest(request).subscribe(function (action) {
                _this.store.dispatch(action);
                _this.loadRequests(1);
            });
        }
    };
    TaskComponent.prototype.declineRequest = function (request) {
        var _this = this;
        this.taskService.doDeclineRequest(request, '').subscribe(function (action) {
            _this.store.dispatch(action);
            _this.loadRequests(1);
        });
    };
    TaskComponent.prototype.hasRequests = function () {
        return this.task.hasRequests;
    };
    TaskComponent.prototype.loadSubtasks = function () {
        var _this = this;
        this.taskService.fetchTasks({ parentTaskId: this.task.id }).subscribe(function (payload) {
            _this.subTasks = payload.tasks;
        });
    };
    TaskComponent.prototype.hasSubTasks = function () {
        return this.subTasks && this.subTasks.length;
    };
    TaskComponent.prototype.onConfirmTaskCancelDialog = function (cancelComment) {
        this.doCancelTaskRequest(cancelComment);
    };
    TaskComponent.prototype.onCancelTaskCancelDialog = function () {
        this.showTaskCancelDialog = false;
    };
    TaskComponent.prototype.close = function () {
        this.router.navigateByUrl(this.redirectUrl);
    };
    TaskComponent.prototype.handleValidationError = function (error) {
        var errors = {};
        if (error.validation) {
            this.isValid = false;
            for (var _i = 0, _a = error.validation.errors; _i < _a.length; _i++) {
                var err = _a[_i];
                errors[err.field] = {
                    message: err.message,
                    error: err.error
                };
            }
        }
        this.errors = errors;
    };
    TaskComponent.prototype.handleXhrError = function (errorResponse) {
        if (errorResponse.status === 401) {
            this.router.navigate(['/login']);
        }
        else {
            this.notifyService.error(errorResponse.message).show().remove(3000);
        }
    };
    TaskComponent.prototype.canSaveTask = function () {
        return this.isEditable;
    };
    TaskComponent.prototype.canDoStatusWaiting = function () {
        return true;
    };
    TaskComponent.prototype.canDoStatusProcessed = function () {
        return true;
    };
    TaskComponent.prototype.canCancelTask = function () {
        return !this.isNew && this.isEditable && this.task.status != 'FINISHED' && this.task.status != 'COMPLETED' && this.task.status != 'CANCELLED';
    };
    TaskComponent.prototype.canCompleteTask = function () {
        return !this.isNew && this.isEditable && this.task.status != 'FINISHED' && this.task.status != 'COMPLETED' && this.task.status != 'CANCELLED';
    };
    TaskComponent.prototype.canAcknowledgedTask = function () {
        return !this.isNew && this.task.assigneeUserId == this.appService.employee.userID && this.task.status == 'OPEN';
    };
    TaskComponent.prototype.canRequestAction = function () {
        return (this.task && this.task.id && this.task.status != 'FINISHED' && this.task.status != 'COMPLETED' && this.task.status != 'CANCELLED') && !this.hasUnResolvedRequest;
    };
    TaskComponent.prototype.newRequest = function () {
        var navigationExtras = {
            queryParams: { 'task': this.task.id }
        };
        this.router.navigate(['/requests', 'new'], navigationExtras);
    };
    TaskComponent.prototype.onSendRequest = function (_a) {
        var requestSendSuccess = _a.requestSendSuccess;
        if (requestSendSuccess) {
            this.close();
        }
    };
    TaskComponent.prototype.setStatus = function (value) {
        this.task.status = value;
        this.validateForm();
    };
    TaskComponent.prototype.setPriority = function (value) {
        this.task.priority = value;
        this.validateForm();
    };
    TaskComponent.prototype.setProject = function (project) {
        this.task.projectId = project.id;
        this.validateForm();
    };
    TaskComponent.prototype.setTaskType = function (taskType) {
        this.task.taskTypeId = taskType.id;
        this.validateForm();
    };
    TaskComponent.prototype.setAssigneeUser = function (assigneeUser) {
        this.task.assigneeUserId = assigneeUser[0].userID;
        this.validateForm();
    };
    TaskComponent.prototype.setStartDate = function (date) {
        this.task.startDate = date;
        this.validateForm();
    };
    TaskComponent.prototype.setDueDate = function (date) {
        this.task.dueDate = date;
        this.validateForm();
    };
    TaskComponent.prototype.updateTaskBody = function (text) {
        this.task.body = text;
        this.validateForm();
    };
    TaskComponent.prototype.setTags = function (tags) {
        this.task.tagIds = tags.map(function (it) { return it.id; });
        this.validateForm();
    };
    TaskComponent.prototype.addAttachment = function (data) {
        var _this = this;
        var att = new __WEBPACK_IMPORTED_MODULE_7__models__["c" /* Attachment */]();
        att.realFileName = data.response.files[0];
        if (!this.task.attachments) {
            this.task.attachments = [];
        }
        if (!this.task.fsid) {
            this.task.fsid = '' + Date.now();
        }
        if (!data.files[0].type.match('image.*')) {
            this.task.attachments.push(att);
        }
        else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["e" /* imgToBase64 */])(data.files[0], function (e2) {
                att.base64 = e2.target.result;
                _this.task.attachments.push(att);
            });
        }
    };
    TaskComponent.prototype.deleteAttachment = function (attachment) {
        var _this = this;
        this.taskService.deleteTaskAttachment(this.task, attachment).subscribe(function (r) {
            _this.task.attachments = _this.task.attachments.filter(function (it) { return it.id != attachment.id; });
        });
    };
    TaskComponent.prototype.validateForm = function (field) {
        for (var errField in this.errors) {
            if (this.task[errField]) {
                this.errors[errField] = false;
            }
        }
        var isValid = true;
        for (var errField in this.errors) {
            if (this.errors[errField] !== false) {
                isValid = false;
                break;
            }
        }
        this.isValid = isValid;
    };
    TaskComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task',
            template: __webpack_require__(809)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"], __WEBPACK_IMPORTED_MODULE_6__actions__["e" /* TaskActions */], __WEBPACK_IMPORTED_MODULE_5__services__["e" /* TaskService */], __WEBPACK_IMPORTED_MODULE_4__shared_notification__["a" /* NotificationService */], __WEBPACK_IMPORTED_MODULE_5__services__["a" /* AppService */]])
    ], TaskComponent);
    return TaskComponent;
}());


/***/ },

/***/ 525:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_task_service__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_environment_actions__ = __webpack_require__(118);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TasksComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TasksComponent = (function () {
    function TasksComponent(store, router, route, envActions, taskActions, taskService) {
        this.store = store;
        this.router = router;
        this.route = route;
        this.envActions = envActions;
        this.taskActions = taskActions;
        this.taskService = taskService;
        this.subs = [];
        this.meta = {};
        this.keyWord = '';
        this.filter = {};
        this.loading = true;
        this.params = {};
        this.init = false;
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.store.select('environment').subscribe(function (state) {
            if (_this.init) {
                if (_this.keyWord != state.keyWord) {
                    _this.loadData({
                        keyWord: state.keyWord
                    });
                }
                _this.keyWord = state.keyWord;
            }
            else {
                _this.store.dispatch(_this.envActions.resetSearch());
                _this.init = true;
            }
        }));
        this.subs.push(this.store.select('tasks').subscribe(function (state) {
            if (state) {
                _this.tasks = state.tasks;
                _this.meta = state.meta;
                _this.filter = state.filter;
                _this.loading = state.loading;
            }
        }));
        this.subs.push(this.route.params.subscribe(function (params) {
            var taskFor = params['for'];
            var projectId = params['projectId'];
            switch (taskFor) {
                case 'inbox':
                    _this.title = 'tasks_assigned_to_me';
                    break;
                case 'my':
                    _this.title = 'my_tasks';
                    break;
                default:
                    _this.title = 'tasks';
                    break;
            }
            var r_url = '';
            if (projectId) {
                r_url = "/projects/" + projectId + "/tasks";
            }
            else if (taskFor) {
                r_url = "/tasks/" + taskFor;
            }
            else {
                r_url = '/tasks';
            }
            _this.store.dispatch(_this.envActions.setRedirectUrl(r_url));
            _this.loadData(Object.assign({}, params, _this.filter));
        }));
    };
    TasksComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    TasksComponent.prototype.loadData = function (params) {
        var _this = this;
        this.params = params;
        this.store.dispatch(this.taskActions.fetchTasks());
        this.taskService.fetchTasks(params).subscribe(function (payload) {
            _this.store.dispatch(_this.taskActions.fetchTasksFulfilled(payload.tasks, payload.meta));
        }, function (error) { return _this.store.dispatch(_this.taskActions.fetchTasksFailed(error)); });
    };
    TasksComponent.prototype.refresh = function () {
        this.loadData(this.params);
    };
    TasksComponent.prototype.goToPage = function (params) {
        this.loadData(Object.assign({}, params, this.filter));
    };
    TasksComponent.prototype.changeFilter = function (filter) {
        this.filter = filter;
        this.store.dispatch(this.taskActions.setFilter(filter));
        this.loadData(filter);
    };
    TasksComponent.prototype.newTask = function () {
        this.router.navigate(['/task', 'new']);
    };
    TasksComponent.prototype.deleteTask = function (task) {
        this.taskService.deleteTask([task]).subscribe();
    };
    TasksComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tasks',
            template: __webpack_require__(810)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_5__actions_environment_actions__["a" /* EnvironmentActions */], __WEBPACK_IMPORTED_MODULE_4__actions__["e" /* TaskActions */], __WEBPACK_IMPORTED_MODULE_3__services_task_service__["a" /* TaskService */]])
    ], TasksComponent);
    return TasksComponent;
}());


/***/ },

/***/ 526:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_notification__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_app_service__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_translate_service__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_utils__ = __webpack_require__(74);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return UserProfileComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HEADERS = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});
var UserProfileComponent = (function () {
    function UserProfileComponent(store, http, router, formBuilder, ng2Translate, appService, translateService, notifyService) {
        var _this = this;
        this.store = store;
        this.http = http;
        this.router = router;
        this.formBuilder = formBuilder;
        this.ng2Translate = ng2Translate;
        this.appService = appService;
        this.translateService = translateService;
        this.notifyService = notifyService;
        this.user = null;
        this.changePassword = false;
        this.language = 'RUS';
        this.pageSizes = [10, 20, 30, 40, 50];
        this.errors = {};
        this.sub = this.store.select('authed').subscribe(function (state) {
            _this.user = state.userProfile;
            _this.pageSize = state.pageSize;
            _this.language = state.language;
            _this.languages = state.languages;
            if (_this.user) {
                _this.form = formBuilder.group({
                    login: [_this.user.login],
                    pwd: [],
                    pwd_new: [],
                    pwd_confirm: [],
                    email: [_this.user.email]
                });
            }
        });
    }
    UserProfileComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UserProfileComponent.prototype.toggleChangePassword = function () {
        this.changePassword = !this.changePassword;
    };
    UserProfileComponent.prototype.updateUserProfile = function () {
        var _this = this;
        var noty = this.notifyService.process(this.ng2Translate.instant('wait_while_document_save')).show();
        this.appService.updateUserProfile(this.form.value).subscribe(function (data) {
            _this.errors = {};
            noty.remove();
            _this.router.navigate(['/tasks']);
        }, function (error) {
            _this.errors = {};
            noty.remove();
            if (error.validation) {
                for (var _i = 0, _a = error.validation.errors; _i < _a.length; _i++) {
                    var err = _a[_i];
                    _this.errors[err.field] = err.message;
                }
            }
        });
    };
    UserProfileComponent.prototype.changeLang = function ($event) {
        var _this = this;
        var langCode = $event.target.value;
        var url = '/Staff/p?id=change-session-val-action&lang=' + langCode;
        return this.http.post(url, {}, { headers: HEADERS })
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.ng2Translate.reloadLang(langCode).subscribe(function (r) {
                _this.ng2Translate.use(langCode);
            });
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_utils__["f" /* createCookie */])('lang', langCode, 365);
        });
    };
    UserProfileComponent.prototype.close = function () {
        window.history.back();
    };
    UserProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[user-profile]',
            template: __webpack_require__(811),
            providers: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]]
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_4__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__["TranslateService"], __WEBPACK_IMPORTED_MODULE_7__services_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_8__services_translate_service__["a" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__shared_notification__["a" /* NotificationService */]])
    ], UserProfileComponent);
    return UserProfileComponent;
}());


/***/ },

/***/ 527:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return User; });var User = (function () {
    function User() {
        this.id = '';
        this.name = '@anonymous';
    }
    return User;
}());


/***/ },

/***/ 528:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(74);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return AppService; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HEADERS = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});
var AppService = (function () {
    function AppService(http) {
        this.http = http;
        this.thumbnailSupportedFormat = ['jpeg', 'jpg', 'png', 'gif'];
        this.isLogged = false;
        this.language = 'RUS';
        var ck = document.cookie.match('(lang)=(.*?)($|;|,(?! ))');
        if (ck) {
            this.language = ck[2];
        }
    }
    AppService.prototype.fetchUserProfile = function () {
        var _this = this;
        return this.http.get('/Staff/p?id=userprofile', { headers: HEADERS }).map(function (response) {
            var res = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* parseResponseObjects */])(response.json().objects);
            console.log(res);
            var pageSize = 20;
            if (res.pagesize) {
                pageSize = res.pagesize;
            }
            _this.isLogged = true;
            _this.language = res.currentLang;
            _this.employee = res.employee;
            return {
                userProfile: res.employee,
                languages: res.language.list[0].localizedName,
                pageSize: pageSize,
                language: res.currentLang || _this.language
            };
        }, function (error) {
            _this.isLogged = false;
        });
    };
    AppService.prototype.updateUserProfile = function (userForm) {
        return this.http.post('/Staff/p?id=userprofile', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["b" /* serializeObj */])(userForm), { headers: HEADERS })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    AppService.prototype.logout = function () {
        return this.http.delete('/');
    };
    AppService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], AppService);
    return AppService;
}());


/***/ },

/***/ 529:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_utils__ = __webpack_require__(74);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TaskService; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HEADERS = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});
var TaskService = (function () {
    function TaskService(http, translate) {
        this.http = http;
        this.translate = translate;
    }
    TaskService.prototype.getTaskPriorityTypes = function () {
        return this.translate.get(['urgent', 'high', 'medium', 'normal']).map(function (t) { return [
            { value: 'NORMAL', text: t.normal, default: true },
            { value: 'MEDIUM', text: t.medium },
            { value: 'HIGH', text: t.high },
            { value: 'URGENT', text: t.urgent }
        ]; });
    };
    TaskService.prototype.fetchTasks = function (queryParams) {
        if (queryParams === void 0) { queryParams = {}; }
        return this.http.get('p?id=task-view', {
            headers: HEADERS,
            search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["d" /* createURLSearchParams */])(queryParams)
        })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                tasks: data.list,
                meta: data.meta
            };
        });
    };
    TaskService.prototype.fetchTaskStream = function (task) {
        return this.http.get('p?id=task-view', {
            headers: HEADERS,
            search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["d" /* createURLSearchParams */])({ taskId: task.id, stream: 1 })
        })
            .map(function (response) { return response.json().objects; })
            .map(function (data) {
            var list = [];
            data.map(function (it) { return list = list.concat(it.list); });
            list = list.sort(function (a, b) {
                var r1 = __WEBPACK_IMPORTED_MODULE_4_moment__(a.regDate, 'DD.MM.YYYY HH:mm').valueOf();
                var r2 = __WEBPACK_IMPORTED_MODULE_4_moment__(b.regDate, 'DD.MM.YYYY HH:mm').valueOf();
                return r1 - r2;
            });
            return list;
        });
    };
    TaskService.prototype.fetchTaskById = function (taskId) {
        var url = 'p?id=task-form&taskId=' + (taskId !== 'new' ? taskId : '');
        return this.http.get(url, { headers: HEADERS })
            .map(function (response) {
            var data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["a" /* parseResponseObjects */])(response.json().objects);
            var task = data.task;
            if (!task.id) {
                task.id = '';
            }
            if (data.fsid) {
                task.fsid = data.fsid;
            }
            if (data.ACL) {
                task.acl = data.ACL;
            }
            if (data.attachment) {
                task.attachments = data.attachment.list;
            }
            return task;
        });
    };
    TaskService.prototype.saveTask = function (task) {
        var url = 'p?id=task-form&taskId=' + (task.id ? task.id : '');
        return this.http.post(url, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["b" /* serializeObj */])(task), { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(response); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.completeTask = function (task) {
        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=complete&fsid=' + task.fsid, '', { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(response); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.cancelTask = function (task, comment) {
        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=cancel&fsid=' + task.fsid + '&comment=' + comment, '', { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(response); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.acknowledgedTask = function (task) {
        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=acknowledged&fsid=' + task.fsid, '', { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(response); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.deleteTask = function (tasks) {
        return this.http.delete('p?id=task-view&taskIds=' + tasks.map(function (it) { return it.id; }).join(','), { headers: HEADERS })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.deleteTaskAttachment = function (task, attachment) {
        return this.http.delete('p?id=task-form&taskId=' + task.id + '&attachmentId=' + attachment.id + '&fsid=' + task.fsid, { headers: HEADERS })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.fetchTaskRequests = function (task, page) {
        if (page === void 0) { page = 0; }
        return this.http.get('p?id=task-requests&taskId=' + task.id, { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["a" /* parseResponseObjects */])(response.json().objects).request || {}; })
            .map(function (data) {
            return {
                requests: data.list,
                meta: data.meta
            };
        });
    };
    TaskService.prototype.fetchRequestById = function (requestId) {
        if (requestId === 'new') {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(new __WEBPACK_IMPORTED_MODULE_5__models__["a" /* Request */]());
        }
        return this.http.get('p?id=task-requests&requestId=' + requestId, { headers: HEADERS })
            .map(function (response) {
            var data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["a" /* parseResponseObjects */])(response.json().objects);
            var request = data.request;
            if (data.fsid) {
                request.fsid = data.fsid;
            }
            if (data.attachment) {
                request.attachments = data.attachment.list;
            }
            return request;
        });
    };
    TaskService.prototype.sendTaskRequest = function (request) {
        var url = 'p?id=task-requests&taskId=' + request.taskId;
        return this.http.post(url, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["b" /* serializeObj */])(request), { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(response); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.doAcceptRequest = function (request, data) {
        var url = 'p?id=task-requests&requestId=' + request.id + '&_action=accept&fsid=' + request.fsid + '&' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["b" /* serializeObj */])(data);
        return this.http.put(url, '', { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(response); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.doDeclineRequest = function (request, comment) {
        var url = 'p?id=task-requests&requestId=' + request.id + '&comment=' + comment + '&_action=decline&fsid=' + request.fsid;
        return this.http.put(url, '', { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(response); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.deleteRequest = function (request) {
        return this.http.delete('p?id=task-requests&requestId=' + request.id, { headers: HEADERS })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.deleteRequestAttachment = function (request, attachment) {
        return this.http.delete('p?id=task-requests&requestId=' + request.id + '&attachmentId=' + attachment.id + '&fsid=' + request.fsid, { headers: HEADERS })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.fetchComments = function (task, page) {
        if (page === void 0) { page = 0; }
        return this.http.get('p?id=comments&taskId=' + task.id, { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["a" /* parseResponseObjects */])(response.json().objects).comment || {}; })
            .map(function (data) {
            return {
                comments: data.list,
                meta: data.meta
            };
        });
    };
    TaskService.prototype.saveComment = function (task, comment) {
        var url = 'p?id=comments&taskId=' + task.id + (comment.id ? '&commentId=' + comment.id : '');
        return this.http.post(url, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["b" /* serializeObj */])(comment), { headers: HEADERS })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(response); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.deleteComment = function (comment) {
        return this.http.delete('p?id=comments&commentId=' + comment.id, { headers: HEADERS })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService.prototype.deleteCommentAttachment = function (comment, attachment) {
        return this.http.delete('p?id=comments&commentId=' + comment.id + '&attachmentId=' + attachment.id + '&fsid=' + comment.fsid, { headers: HEADERS })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_utils__["c" /* transformPostResponse */])(error)); });
    };
    TaskService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"]])
    ], TaskService);
    return TaskService;
}());


/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__(646);
/* harmony namespace reexport */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["a"]; }); __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["b"]; }); __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["c"]; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the router package.
 */

//# sourceMappingURL=index.js.map

/***/ },

/***/ 530:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return DropdownToggleComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DropdownToggleComponent = (function () {
    function DropdownToggleComponent() {
        this.toggle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    DropdownToggleComponent.prototype.onClick = function ($event) {
        $event.preventDefault();
        this.toggle.emit($event);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.dropdown-toggle'), 
        __metadata('design:type', Object)
    ], DropdownToggleComponent.prototype, "true", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DropdownToggleComponent.prototype, "onClick", null);
    DropdownToggleComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[dropdown-toggle]',
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [])
    ], DropdownToggleComponent);
    return DropdownToggleComponent;
}());


/***/ },

/***/ 531:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification__ = __webpack_require__(532);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return NotificationService; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationService = (function () {
    function NotificationService() {
        this.emitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    NotificationService.prototype.getEmitter = function () {
        return this.emitter;
    };
    NotificationService.prototype.info = function (message) {
        return this.add({ type: 'info', message: message });
    };
    NotificationService.prototype.success = function (message) {
        return this.add({ type: 'success', message: message });
    };
    NotificationService.prototype.error = function (message) {
        return this.add({ type: 'error', message: message });
    };
    NotificationService.prototype.process = function (message) {
        return this.add({ type: 'process', message: message });
    };
    NotificationService.prototype.add = function (options) {
        var noty = new __WEBPACK_IMPORTED_MODULE_1__notification__["a" /* Notification */](options.type, options.message);
        this.emitter.emit({ command: 'add', notify: noty });
        return noty;
    };
    NotificationService.prototype.removeAll = function () {
        this.emitter.emit({ command: 'cleanAll' });
    };
    NotificationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], NotificationService);
    return NotificationService;
}());


/***/ },

/***/ 532:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Notification; });
var Notification = (function () {
    function Notification(type, message) {
        this.emitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.display = false;
        this.type = type;
        this.message = message;
    }
    Notification.prototype.getEmitter = function () {
        return this.emitter;
    };
    Notification.prototype.show = function () {
        this.display = true;
        return this;
    };
    Notification.prototype.hide = function () {
        this.display = false;
        return this;
    };
    Notification.prototype.set = function (options) {
        for (var key in options) {
            if (key === 'message') {
                this.message = options[key];
            }
            else if (key === 'type') {
                this.type = options[key];
            }
        }
        return this;
    };
    Notification.prototype.dismiss = function () {
        if (this.delay === 'click') {
            this.emitter.emit({ dismiss: true, notify: this, promise: this.promise });
        }
    };
    Notification.prototype.remove = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        this.delay = delay;
        if (delay === 'click') {
        }
        else if (delay > 0) {
            setTimeout(function () {
                _this.emitter.emit({ dismiss: true, notify: _this, promise: _this.promise });
            }, delay);
        }
        else {
            this.emitter.emit({ dismiss: true, notify: this, promise: this.promise });
        }
        return this.promise;
    };
    return Notification;
}());


/***/ },

/***/ 533:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Tab; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Tab = (function () {
    function Tab() {
        this.active = false;
        this.pinned = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('tabTitle'), 
        __metadata('design:type', String)
    ], Tab.prototype, "title", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], Tab.prototype, "icon", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "active", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "pinned", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], Tab.prototype, "select", void 0);
    Tab = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tab',
            template: "\n      <div [hidden]=\"!active && !pinned\">\n        <ng-content></ng-content>\n      </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Tab);
    return Tab;
}());


/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return PRIMARY_OUTLET; });
/* harmony export */ __webpack_require__.d(exports, "b", function() { return NavigationCancelingError; });/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Name of the primary outlet.
 * @type {string}
 *
 * @stable
 */
var PRIMARY_OUTLET = 'primary';
var NavigationCancelingError = (function (_super) {
    __extends(NavigationCancelingError, _super);
    function NavigationCancelingError(message) {
        _super.call(this, message);
        this.message = message;
        this.stack = (new Error(message)).stack;
    }
    NavigationCancelingError.prototype.toString = function () { return this.message; };
    return NavigationCancelingError;
}(Error));
//# sourceMappingURL=shared.js.map

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatAll__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_last__ = __webpack_require__(834);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_last___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_last__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeAll__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared__ = __webpack_require__(54);
/* harmony export */ exports["h"] = shallowEqualArrays;/* harmony export */ exports["d"] = shallowEqual;/* harmony export */ exports["a"] = flatten;/* unused harmony export first *//* harmony export */ exports["i"] = last;/* unused harmony export and *//* harmony export */ exports["g"] = merge;/* harmony export */ exports["c"] = forEach;/* harmony export */ exports["e"] = waitForMap;/* harmony export */ exports["f"] = andObservables;/* harmony export */ exports["b"] = wrapIntoObservable;/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */









function shallowEqualArrays(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (!shallowEqual(a[i], b[i]))
            return false;
    }
    return true;
}
function shallowEqual(a, b) {
    var k1 = Object.keys(a);
    var k2 = Object.keys(b);
    if (k1.length != k2.length) {
        return false;
    }
    var key;
    for (var i = 0; i < k1.length; i++) {
        key = k1[i];
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
function flatten(a) {
    var target = [];
    for (var i = 0; i < a.length; ++i) {
        for (var j = 0; j < a[i].length; ++j) {
            target.push(a[i][j]);
        }
    }
    return target;
}
function first(a) {
    return a.length > 0 ? a[0] : null;
}
function last(a) {
    return a.length > 0 ? a[a.length - 1] : null;
}
function and(bools) {
    return bools.reduce(function (a, b) { return a && b; }, true);
}
function merge(m1, m2) {
    var m = {};
    for (var attr in m1) {
        if (m1.hasOwnProperty(attr)) {
            m[attr] = m1[attr];
        }
    }
    for (var attr in m2) {
        if (m2.hasOwnProperty(attr)) {
            m[attr] = m2[attr];
        }
    }
    return m;
}
function forEach(map, callback) {
    for (var prop in map) {
        if (map.hasOwnProperty(prop)) {
            callback(map[prop], prop);
        }
    }
}
function waitForMap(obj, fn) {
    var waitFor = [];
    var res = {};
    forEach(obj, function (a, k) {
        if (k === __WEBPACK_IMPORTED_MODULE_8__shared__["a" /* PRIMARY_OUTLET */]) {
            waitFor.push(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(fn(k, a), function (_) {
                res[k] = _;
                return _;
            }));
        }
    });
    forEach(obj, function (a, k) {
        if (k !== __WEBPACK_IMPORTED_MODULE_8__shared__["a" /* PRIMARY_OUTLET */]) {
            waitFor.push(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(fn(k, a), function (_) {
                res[k] = _;
                return _;
            }));
        }
    });
    if (waitFor.length > 0) {
        var concatted$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatAll__["concatAll"].call(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"].apply(void 0, waitFor));
        var last$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_last__["last"].call(concatted$);
        return __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(last$, function () { return res; });
    }
    else {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(res);
    }
}
function andObservables(observables) {
    var merged$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeAll__["mergeAll"].call(observables);
    return __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__["every"].call(merged$, function (result) { return result === true; });
}
function wrapIntoObservable(value) {
    if (value instanceof __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"]) {
        return value;
    }
    else if (value instanceof Promise) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__["fromPromise"])(value);
    }
    else {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(value);
    }
}
//# sourceMappingURL=collection.js.map

/***/ },

/***/ 554:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_translate_ng2_translate__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_img_view_img_view_directive__ = __webpack_require__(911);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_img_view_img_view_component__ = __webpack_require__(910);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_img_view_img_view_service__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_pagination__ = __webpack_require__(916);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_directives_autofocus_directive__ = __webpack_require__(907);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_datepicker_datepicker__ = __webpack_require__(906);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_dropdown__ = __webpack_require__(909);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__shared_tabs__ = __webpack_require__(920);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_switch_button__ = __webpack_require__(918);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_notification__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_markdown__ = __webpack_require__(912);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_application_app__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_navbar_navbar__ = __webpack_require__(865);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_nav_nav__ = __webpack_require__(864);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_dashboard_dashboard__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_project_projects__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_project_project__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_project_project_list__ = __webpack_require__(866);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_task_tasks__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_task_task__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_task_task_list__ = __webpack_require__(878);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_task_task_stream__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_task_task_filter__ = __webpack_require__(877);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_task_task_cancel_dialog__ = __webpack_require__(876);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_request_request__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_request_request_decline_dialog__ = __webpack_require__(867);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_comment_comments__ = __webpack_require__(862);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_comment_comment__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_user_profile_user_profile__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_login__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__components_shared__ = __webpack_require__(869);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__components_attachment_attachments__ = __webpack_require__(860);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__components_error_message__ = __webpack_require__(863);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pipes__ = __webpack_require__(892);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__app_routing__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__services__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__store__ = __webpack_require__(922);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__actions__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__services_translate_service__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__auth_guard__ = __webpack_require__(518);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return AppModule; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_16__components_application_app__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_navbar_navbar__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_nav_nav__["a" /* NavComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_dashboard_dashboard__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_project_projects__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_project_project__["a" /* ProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_project_project_list__["a" /* ProjectListComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_task_tasks__["a" /* TasksComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_task_task__["a" /* TaskComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_task_task_list__["a" /* TaskListComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_task_task_stream__["a" /* TaskStreamComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_task_task_filter__["a" /* TaskFilterComponent */],
                __WEBPACK_IMPORTED_MODULE_28__components_task_task_cancel_dialog__["a" /* TaskCancelDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_29__components_request_request__["a" /* RequestComponent */],
                __WEBPACK_IMPORTED_MODULE_30__components_request_request_decline_dialog__["a" /* RequestDeclineDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_31__components_comment_comments__["a" /* CommentsComponent */],
                __WEBPACK_IMPORTED_MODULE_32__components_comment_comment__["a" /* CommentComponent */],
                __WEBPACK_IMPORTED_MODULE_33__components_user_profile_user_profile__["a" /* UserProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_34__components_login__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_37__components_error_message__["a" /* ErrorMessageComponent */],
                __WEBPACK_IMPORTED_MODULE_36__components_attachment_attachments__["a" /* AttachmentsComponent */],
                __WEBPACK_IMPORTED_MODULE_35__components_shared__["a" /* OrganizationInputComponent */],
                __WEBPACK_IMPORTED_MODULE_35__components_shared__["b" /* EmployeeInputComponent */],
                __WEBPACK_IMPORTED_MODULE_35__components_shared__["c" /* ProjectInputComponent */],
                __WEBPACK_IMPORTED_MODULE_35__components_shared__["d" /* TaskTypeInputComponent */],
                __WEBPACK_IMPORTED_MODULE_35__components_shared__["e" /* TagsInputComponent */],
                __WEBPACK_IMPORTED_MODULE_35__components_shared__["f" /* RequestTypeInputComponent */],
                __WEBPACK_IMPORTED_MODULE_35__components_shared__["g" /* TaskStatusInputComponent */],
                __WEBPACK_IMPORTED_MODULE_8__shared_pagination__["a" /* PaginationComponent */],
                __WEBPACK_IMPORTED_MODULE_14__shared_notification__["b" /* NotificationComponent */],
                __WEBPACK_IMPORTED_MODULE_9__shared_directives_autofocus_directive__["a" /* AutofocusDirective */],
                __WEBPACK_IMPORTED_MODULE_10__shared_datepicker_datepicker__["a" /* DatepickerDirective */],
                __WEBPACK_IMPORTED_MODULE_12__shared_tabs__["a" /* TAB_DIRECTIVES */],
                __WEBPACK_IMPORTED_MODULE_11__shared_dropdown__["a" /* DROPDOWN_DIRECTIVES */],
                __WEBPACK_IMPORTED_MODULE_15__shared_markdown__["a" /* MarkdownEditorComponent */], __WEBPACK_IMPORTED_MODULE_15__shared_markdown__["b" /* MarkedPipe */],
                __WEBPACK_IMPORTED_MODULE_13__shared_switch_button__["a" /* SwitchButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_5__shared_img_view_img_view_directive__["a" /* ImgViewDirective */], __WEBPACK_IMPORTED_MODULE_6__shared_img_view_img_view_component__["a" /* ImgViewComponent */],
                __WEBPACK_IMPORTED_MODULE_38__pipes__["a" /* DateFormatPipe */], __WEBPACK_IMPORTED_MODULE_38__pipes__["b" /* DateDurationPipe */], __WEBPACK_IMPORTED_MODULE_38__pipes__["c" /* TextTransformPipe */], __WEBPACK_IMPORTED_MODULE_38__pipes__["d" /* LocalizedNamePipe */], __WEBPACK_IMPORTED_MODULE_38__pipes__["e" /* KeysPipe */], __WEBPACK_IMPORTED_MODULE_38__pipes__["f" /* ValuesPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_39__app_routing__["a" /* APP_ROUTING */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4_ng2_translate_ng2_translate__["TranslateModule"].forRoot({
                    provide: __WEBPACK_IMPORTED_MODULE_4_ng2_translate_ng2_translate__["TranslateLoader"],
                    useFactory: function (trs) { return new CustomTranslateLoader(trs); },
                    deps: [__WEBPACK_IMPORTED_MODULE_43__services_translate_service__["a" /* TranslateService */]]
                })
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_14__shared_notification__["a" /* NotificationService */],
                __WEBPACK_IMPORTED_MODULE_7__shared_img_view_img_view_service__["a" /* ImgViewService */],
                __WEBPACK_IMPORTED_MODULE_15__shared_markdown__["c" /* MarkdownConverter */],
                __WEBPACK_IMPORTED_MODULE_40__services__["g" /* APP_SERVICES */],
                __WEBPACK_IMPORTED_MODULE_41__store__["a" /* APP_STORE */],
                __WEBPACK_IMPORTED_MODULE_42__actions__["f" /* APP_STORE_ACTIONS */],
                __WEBPACK_IMPORTED_MODULE_44__auth_guard__["a" /* AuthGuard */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_16__components_application_app__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
var CustomTranslateLoader = (function () {
    function CustomTranslateLoader(translateService) {
        this.translateService = translateService;
    }
    CustomTranslateLoader.prototype.getTranslation = function (lang) {
        return this.translateService.fetchTranslations();
    };
    return CustomTranslateLoader;
}());
if (false) {
    enableProdMode();
}


/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment_actions__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_actions__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_actions__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_actions__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reference_actions__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__staff_actions__ = __webpack_require__(856);

/* harmony export */ __webpack_require__.d(exports, "f", function() { return APP_STORE_ACTIONS; });





/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__environment_actions__, "a")) __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__environment_actions__["a"]; });

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__app_actions__, "a")) __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__app_actions__["a"]; });

/* unused harmony reexport ProjectActions */

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__task_actions__, "a")) __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__task_actions__["a"]; });

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__reference_actions__, "a")) __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__reference_actions__["a"]; });

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__staff_actions__, "a")) __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__staff_actions__["a"]; });

var APP_STORE_ACTIONS = [
    __WEBPACK_IMPORTED_MODULE_0__environment_actions__["a" /* EnvironmentActions */],
    __WEBPACK_IMPORTED_MODULE_1__app_actions__["a" /* AppActions */],
    __WEBPACK_IMPORTED_MODULE_2__project_actions__["a" /* ProjectActions */],
    __WEBPACK_IMPORTED_MODULE_3__task_actions__["a" /* TaskActions */],
    __WEBPACK_IMPORTED_MODULE_4__reference_actions__["a" /* ReferenceActions */],
    __WEBPACK_IMPORTED_MODULE_5__staff_actions__["a" /* StaffActions */]
];


/***/ },

/***/ 642:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_from__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_concatAll__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_concatAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_concatAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_first__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_first__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_util_EmptyError__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_util_EmptyError___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_util_EmptyError__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__router_config_loader__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__url_tree__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_collection__ = __webpack_require__(55);
/* harmony export */ exports["a"] = applyRedirects;/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */













var NoMatch = (function () {
    function NoMatch(segmentGroup) {
        if (segmentGroup === void 0) { segmentGroup = null; }
        this.segmentGroup = segmentGroup;
    }
    return NoMatch;
}());
var AbsoluteRedirect = (function () {
    function AbsoluteRedirect(segments) {
        this.segments = segments;
    }
    return AbsoluteRedirect;
}());
function noMatch(segmentGroup) {
    return new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"](function (obs) { return obs.error(new NoMatch(segmentGroup)); });
}
function absoluteRedirect(segments) {
    return new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"](function (obs) { return obs.error(new AbsoluteRedirect(segments)); });
}
function canLoadFails(route) {
    return new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"](function (obs) { return obs.error(new __WEBPACK_IMPORTED_MODULE_10__shared__["b" /* NavigationCancelingError */]("Cannot load children because the guard of the route \"path: '" + route.path + "'\" returned false")); });
}
function applyRedirects(injector, configLoader, urlTree, config) {
    return new ApplyRedirects(injector, configLoader, urlTree, config).apply();
}
var ApplyRedirects = (function () {
    function ApplyRedirects(injector, configLoader, urlTree, config) {
        this.injector = injector;
        this.configLoader = configLoader;
        this.urlTree = urlTree;
        this.config = config;
        this.allowRedirects = true;
    }
    ApplyRedirects.prototype.apply = function () {
        var _this = this;
        var expanded$ = this.expandSegmentGroup(this.injector, this.config, this.urlTree.root, __WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */]);
        var urlTrees$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(expanded$, function (rootSegmentGroup) { return _this.createUrlTree(rootSegmentGroup); });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch__["_catch"].call(urlTrees$, function (e) {
            if (e instanceof AbsoluteRedirect) {
                // after an absolute redirect we do not apply any more redirects!
                _this.allowRedirects = false;
                var group = new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */]([], (_a = {}, _a[__WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */]] = new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](e.segments, {}), _a));
                // we need to run matching, so we can fetch all lazy-loaded modules
                return _this.match(group);
            }
            else if (e instanceof NoMatch) {
                throw _this.noMatchError(e);
            }
            else {
                throw e;
            }
            var _a;
        });
    };
    ApplyRedirects.prototype.match = function (segmentGroup) {
        var _this = this;
        var expanded$ = this.expandSegmentGroup(this.injector, this.config, segmentGroup, __WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */]);
        var mapped$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(expanded$, function (rootSegmentGroup) { return _this.createUrlTree(rootSegmentGroup); });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch__["_catch"].call(mapped$, function (e) {
            if (e instanceof NoMatch) {
                throw _this.noMatchError(e);
            }
            else {
                throw e;
            }
        });
    };
    ApplyRedirects.prototype.noMatchError = function (e) {
        return new Error("Cannot match any routes: '" + e.segmentGroup + "'");
    };
    ApplyRedirects.prototype.createUrlTree = function (rootCandidate) {
        var root = rootCandidate.segments.length > 0 ?
            new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */]([], (_a = {}, _a[__WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */]] = rootCandidate, _a)) :
            rootCandidate;
        return new __WEBPACK_IMPORTED_MODULE_11__url_tree__["b" /* UrlTree */](root, this.urlTree.queryParams, this.urlTree.fragment);
        var _a;
    };
    ApplyRedirects.prototype.expandSegmentGroup = function (injector, routes, segmentGroup, outlet) {
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(this.expandChildren(injector, routes, segmentGroup), function (children) { return new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */]([], children); });
        }
        else {
            return this.expandSegment(injector, segmentGroup, routes, segmentGroup.segments, outlet, true);
        }
    };
    ApplyRedirects.prototype.expandChildren = function (injector, routes, segmentGroup) {
        var _this = this;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__utils_collection__["e" /* waitForMap */])(segmentGroup.children, function (childOutlet, child) { return _this.expandSegmentGroup(injector, routes, child, childOutlet); });
    };
    ApplyRedirects.prototype.expandSegment = function (injector, segmentGroup, routes, segments, outlet, allowRedirects) {
        var _this = this;
        var routes$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"].apply(void 0, routes);
        var processedRoutes$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(routes$, function (r) {
            var expanded$ = _this.expandSegmentAgainstRoute(injector, segmentGroup, routes, r, segments, outlet, allowRedirects);
            return __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch__["_catch"].call(expanded$, function (e) {
                if (e instanceof NoMatch)
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(null);
                else
                    throw e;
            });
        });
        var concattedProcessedRoutes$ = __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_concatAll__["concatAll"].call(processedRoutes$);
        var first$ = __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_first__["first"].call(concattedProcessedRoutes$, function (s) { return !!s; });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch__["_catch"].call(first$, function (e, _) {
            if (e instanceof __WEBPACK_IMPORTED_MODULE_8_rxjs_util_EmptyError__["EmptyError"]) {
                throw new NoMatch(segmentGroup);
            }
            else {
                throw e;
            }
        });
    };
    ApplyRedirects.prototype.expandSegmentAgainstRoute = function (injector, segmentGroup, routes, route, paths, outlet, allowRedirects) {
        if (getOutlet(route) !== outlet)
            return noMatch(segmentGroup);
        if (route.redirectTo !== undefined && !(allowRedirects && this.allowRedirects))
            return noMatch(segmentGroup);
        if (route.redirectTo === undefined) {
            return this.matchSegmentAgainstRoute(injector, segmentGroup, route, paths);
        }
        else {
            return this.expandSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, paths, outlet);
        }
    };
    ApplyRedirects.prototype.expandSegmentAgainstRouteUsingRedirect = function (injector, segmentGroup, routes, route, segments, outlet) {
        if (route.path === '**') {
            return this.expandWildCardWithParamsAgainstRouteUsingRedirect(route);
        }
        else {
            return this.expandRegularSegmentAgainstRouteUsingRedirect(injector, segmentGroup, routes, route, segments, outlet);
        }
    };
    ApplyRedirects.prototype.expandWildCardWithParamsAgainstRouteUsingRedirect = function (route) {
        var newSegments = applyRedirectCommands([], route.redirectTo, {});
        if (route.redirectTo.startsWith('/')) {
            return absoluteRedirect(newSegments);
        }
        else {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](newSegments, {}));
        }
    };
    ApplyRedirects.prototype.expandRegularSegmentAgainstRouteUsingRedirect = function (injector, segmentGroup, routes, route, segments, outlet) {
        var _a = match(segmentGroup, route, segments), matched = _a.matched, consumedSegments = _a.consumedSegments, lastChild = _a.lastChild, positionalParamSegments = _a.positionalParamSegments;
        if (!matched)
            return noMatch(segmentGroup);
        var newSegments = applyRedirectCommands(consumedSegments, route.redirectTo, positionalParamSegments);
        if (route.redirectTo.startsWith('/')) {
            return absoluteRedirect(newSegments);
        }
        else {
            return this.expandSegment(injector, segmentGroup, routes, newSegments.concat(segments.slice(lastChild)), outlet, false);
        }
    };
    ApplyRedirects.prototype.matchSegmentAgainstRoute = function (injector, rawSegmentGroup, route, segments) {
        var _this = this;
        if (route.path === '**') {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](segments, {}));
        }
        else {
            var _a = match(rawSegmentGroup, route, segments), matched = _a.matched, consumedSegments_1 = _a.consumedSegments, lastChild = _a.lastChild;
            if (!matched)
                return noMatch(rawSegmentGroup);
            var rawSlicedSegments_1 = segments.slice(lastChild);
            var childConfig$ = this.getChildConfig(injector, route);
            return __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__["mergeMap"].call(childConfig$, function (routerConfig) {
                var childInjector = routerConfig.injector;
                var childConfig = routerConfig.routes;
                var _a = split(rawSegmentGroup, consumedSegments_1, rawSlicedSegments_1, childConfig), segmentGroup = _a.segmentGroup, slicedSegments = _a.slicedSegments;
                if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
                    var expanded$ = _this.expandChildren(childInjector, childConfig, segmentGroup);
                    return __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(expanded$, function (children) { return new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](consumedSegments_1, children); });
                }
                else if (childConfig.length === 0 && slicedSegments.length === 0) {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](consumedSegments_1, {}));
                }
                else {
                    var expanded$ = _this.expandSegment(childInjector, segmentGroup, childConfig, slicedSegments, __WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */], true);
                    return __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(expanded$, function (cs) { return new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](consumedSegments_1.concat(cs.segments), cs.children); });
                }
            });
        }
    };
    ApplyRedirects.prototype.getChildConfig = function (injector, route) {
        var _this = this;
        if (route.children) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(new __WEBPACK_IMPORTED_MODULE_9__router_config_loader__["a" /* LoadedRouterConfig */](route.children, injector, null));
        }
        else if (route.loadChildren) {
            return __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__["mergeMap"].call(runGuards(injector, route), function (shouldLoad) {
                if (shouldLoad) {
                    if (route._loadedConfig) {
                        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(route._loadedConfig);
                    }
                    else {
                        return __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(_this.configLoader.load(injector, route.loadChildren), function (r) {
                            route._loadedConfig = r;
                            return r;
                        });
                    }
                }
                else {
                    return canLoadFails(route);
                }
            });
        }
        else {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(new __WEBPACK_IMPORTED_MODULE_9__router_config_loader__["a" /* LoadedRouterConfig */]([], injector, null));
        }
    };
    return ApplyRedirects;
}());
function runGuards(injector, route) {
    var canLoad = route.canLoad;
    if (!canLoad || canLoad.length === 0)
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(true);
    var obs = __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__["map"].call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_from__["from"])(canLoad), function (c) {
        var guard = injector.get(c);
        if (guard.canLoad) {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__utils_collection__["b" /* wrapIntoObservable */])(guard.canLoad(route));
        }
        else {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__utils_collection__["b" /* wrapIntoObservable */])(guard(route));
        }
    });
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__utils_collection__["f" /* andObservables */])(obs);
}
function match(segmentGroup, route, segments) {
    var noMatch = { matched: false, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
    if (route.path === '') {
        if ((route.pathMatch === 'full') && (segmentGroup.hasChildren() || segments.length > 0)) {
            return { matched: false, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
        }
        else {
            return { matched: true, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
        }
    }
    var path = route.path;
    var parts = path.split('/');
    var positionalParamSegments = {};
    var consumedSegments = [];
    var currentIndex = 0;
    for (var i = 0; i < parts.length; ++i) {
        if (currentIndex >= segments.length)
            return noMatch;
        var current = segments[currentIndex];
        var p = parts[i];
        var isPosParam = p.startsWith(':');
        if (!isPosParam && p !== current.path)
            return noMatch;
        if (isPosParam) {
            positionalParamSegments[p.substring(1)] = current;
        }
        consumedSegments.push(current);
        currentIndex++;
    }
    if (route.pathMatch === 'full' &&
        (segmentGroup.hasChildren() || currentIndex < segments.length)) {
        return { matched: false, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
    }
    return { matched: true, consumedSegments: consumedSegments, lastChild: currentIndex, positionalParamSegments: positionalParamSegments };
}
function applyRedirectCommands(segments, redirectTo, posParams) {
    var r = redirectTo.startsWith('/') ? redirectTo.substring(1) : redirectTo;
    if (r === '') {
        return [];
    }
    else {
        return createSegments(redirectTo, r.split('/'), segments, posParams);
    }
}
function createSegments(redirectTo, parts, segments, posParams) {
    return parts.map(function (p) { return p.startsWith(':') ? findPosParam(p, posParams, redirectTo) :
        findOrCreateSegment(p, segments); });
}
function findPosParam(part, posParams, redirectTo) {
    var paramName = part.substring(1);
    var pos = posParams[paramName];
    if (!pos)
        throw new Error("Cannot redirect to '" + redirectTo + "'. Cannot find '" + part + "'.");
    return pos;
}
function findOrCreateSegment(part, segments) {
    var idx = 0;
    for (var _i = 0, segments_1 = segments; _i < segments_1.length; _i++) {
        var s = segments_1[_i];
        if (s.path === part) {
            segments.splice(idx);
            return s;
        }
        idx++;
    }
    return new __WEBPACK_IMPORTED_MODULE_11__url_tree__["c" /* UrlSegment */](part, {});
}
function split(segmentGroup, consumedSegments, slicedSegments, config) {
    if (slicedSegments.length > 0 &&
        containsEmptyPathRedirectsWithNamedOutlets(segmentGroup, slicedSegments, config)) {
        var s = new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](consumedSegments, createChildrenForEmptySegments(config, new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](slicedSegments, segmentGroup.children)));
        return { segmentGroup: mergeTrivialChildren(s), slicedSegments: [] };
    }
    else if (slicedSegments.length === 0 &&
        containsEmptyPathRedirects(segmentGroup, slicedSegments, config)) {
        var s = new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](segmentGroup.segments, addEmptySegmentsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
        return { segmentGroup: mergeTrivialChildren(s), slicedSegments: slicedSegments };
    }
    else {
        return { segmentGroup: segmentGroup, slicedSegments: slicedSegments };
    }
}
function mergeTrivialChildren(s) {
    if (s.numberOfChildren === 1 && s.children[__WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */]]) {
        var c = s.children[__WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */]];
        return new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */](s.segments.concat(c.segments), c.children);
    }
    else {
        return s;
    }
}
function addEmptySegmentsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
    var res = {};
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var r = routes_1[_i];
        if (emptyPathRedirect(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
            res[getOutlet(r)] = new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */]([], {});
        }
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__utils_collection__["g" /* merge */])(children, res);
}
function createChildrenForEmptySegments(routes, primarySegmentGroup) {
    var res = {};
    res[__WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */]] = primarySegmentGroup;
    for (var _i = 0, routes_2 = routes; _i < routes_2.length; _i++) {
        var r = routes_2[_i];
        if (r.path === '' && getOutlet(r) !== __WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */]) {
            res[getOutlet(r)] = new __WEBPACK_IMPORTED_MODULE_11__url_tree__["a" /* UrlSegmentGroup */]([], {});
        }
    }
    return res;
}
function containsEmptyPathRedirectsWithNamedOutlets(segmentGroup, slicedSegments, routes) {
    return routes
        .filter(function (r) { return emptyPathRedirect(segmentGroup, slicedSegments, r) &&
        getOutlet(r) !== __WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */]; })
        .length > 0;
}
function containsEmptyPathRedirects(segmentGroup, slicedSegments, routes) {
    return routes.filter(function (r) { return emptyPathRedirect(segmentGroup, slicedSegments, r); }).length > 0;
}
function emptyPathRedirect(segmentGroup, slicedSegments, r) {
    if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full')
        return false;
    return r.path === '' && r.redirectTo !== undefined;
}
function getOutlet(route) {
    return route.outlet ? route.outlet : __WEBPACK_IMPORTED_MODULE_10__shared__["a" /* PRIMARY_OUTLET */];
}
//# sourceMappingURL=apply_redirects.js.map

/***/ },

/***/ 643:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["a"] = validateConfig;/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
function validateConfig(config) {
    config.forEach(validateNode);
}
function validateNode(route) {
    if (Array.isArray(route)) {
        throw new Error("Invalid route configuration: Array cannot be specified");
    }
    if (!!route.redirectTo && !!route.children) {
        throw new Error("Invalid configuration of route '" + route.path + "': redirectTo and children cannot be used together");
    }
    if (!!route.redirectTo && !!route.loadChildren) {
        throw new Error("Invalid configuration of route '" + route.path + "': redirectTo and loadChildren cannot be used together");
    }
    if (!!route.children && !!route.loadChildren) {
        throw new Error("Invalid configuration of route '" + route.path + "': children and loadChildren cannot be used together");
    }
    if (!!route.redirectTo && !!route.component) {
        throw new Error("Invalid configuration of route '" + route.path + "': redirectTo and component cannot be used together");
    }
    if (route.redirectTo === undefined && !route.component && !route.children &&
        !route.loadChildren) {
        throw new Error("Invalid configuration of route '" + route.path + "': one of the following must be provided (component or redirectTo or children or loadChildren)");
    }
    if (route.path === undefined) {
        throw new Error("Invalid route configuration: routes must have path specified");
    }
    if (route.path.startsWith('/')) {
        throw new Error("Invalid route configuration of route '" + route.path + "': path cannot start with a slash");
    }
    if (route.path === '' && route.redirectTo !== undefined && route.pathMatch === undefined) {
        var exp = "The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.";
        throw new Error("Invalid route configuration of route '{path: \"" + route.path + "\", redirectTo: \"" + route.redirectTo + "\"}': please provide 'pathMatch'. " + exp);
    }
    if (route.pathMatch !== undefined && route.pathMatch !== 'full' && route.pathMatch !== 'prefix') {
        throw new Error("Invalid configuration of route '" + route.path + "': pathMatch can only be set to 'prefix' or 'full'");
    }
}
//# sourceMappingURL=config.js.map

/***/ },

/***/ 644:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_state__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_tree__ = __webpack_require__(223);
/* harmony export */ exports["a"] = createRouterState;/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



function createRouterState(curr, prevState) {
    var root = createNode(curr._root, prevState ? prevState._root : undefined);
    return new __WEBPACK_IMPORTED_MODULE_1__router_state__["a" /* RouterState */](root, curr);
}
function createNode(curr, prevState) {
    if (prevState && equalRouteSnapshots(prevState.value.snapshot, curr.value)) {
        var value = prevState.value;
        value._futureSnapshot = curr.value;
        var children = createOrReuseChildren(curr, prevState);
        return new __WEBPACK_IMPORTED_MODULE_2__utils_tree__["b" /* TreeNode */](value, children);
    }
    else {
        var value = createActivatedRoute(curr.value);
        var children = curr.children.map(function (c) { return createNode(c); });
        return new __WEBPACK_IMPORTED_MODULE_2__utils_tree__["b" /* TreeNode */](value, children);
    }
}
function createOrReuseChildren(curr, prevState) {
    return curr.children.map(function (child) {
        for (var _i = 0, _a = prevState.children; _i < _a.length; _i++) {
            var p = _a[_i];
            if (equalRouteSnapshots(p.value.snapshot, child.value)) {
                return createNode(child, p);
            }
        }
        return createNode(child);
    });
}
function createActivatedRoute(c) {
    return new __WEBPACK_IMPORTED_MODULE_1__router_state__["b" /* ActivatedRoute */](new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"](c.url), new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"](c.params), new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"](c.queryParams), new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"](c.fragment), new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"](c.data), c.outlet, c.component, c);
}
function equalRouteSnapshots(a, b) {
    return a._routeConfig === b._routeConfig;
}
//# sourceMappingURL=create_router_state.js.map

/***/ },

/***/ 645:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__url_tree__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_collection__ = __webpack_require__(55);
/* harmony export */ exports["a"] = createUrlTree;/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



function createUrlTree(route, urlTree, commands, queryParams, fragment) {
    if (commands.length === 0) {
        return tree(urlTree.root, urlTree.root, urlTree, queryParams, fragment);
    }
    var normalizedCommands = normalizeCommands(commands);
    validateCommands(normalizedCommands);
    if (navigateToRoot(normalizedCommands)) {
        return tree(urlTree.root, new __WEBPACK_IMPORTED_MODULE_1__url_tree__["a" /* UrlSegmentGroup */]([], {}), urlTree, queryParams, fragment);
    }
    var startingPosition = findStartingPosition(normalizedCommands, urlTree, route);
    var segmentGroup = startingPosition.processChildren ?
        updateSegmentGroupChildren(startingPosition.segmentGroup, startingPosition.index, normalizedCommands.commands) :
        updateSegmentGroup(startingPosition.segmentGroup, startingPosition.index, normalizedCommands.commands);
    return tree(startingPosition.segmentGroup, segmentGroup, urlTree, queryParams, fragment);
}
function validateCommands(n) {
    if (n.isAbsolute && n.commands.length > 0 && isMatrixParams(n.commands[0])) {
        throw new Error('Root segment cannot have matrix parameters');
    }
    var c = n.commands.filter(function (c) { return typeof c === 'object' && c.outlets !== undefined; });
    if (c.length > 0 && c[0] !== n.commands[n.commands.length - 1]) {
        throw new Error('{outlets:{}} has to be the last command');
    }
}
function isMatrixParams(command) {
    return typeof command === 'object' && command.outlets === undefined &&
        command.segmentPath === undefined;
}
function tree(oldSegmentGroup, newSegmentGroup, urlTree, queryParams, fragment) {
    if (urlTree.root === oldSegmentGroup) {
        return new __WEBPACK_IMPORTED_MODULE_1__url_tree__["b" /* UrlTree */](newSegmentGroup, stringify(queryParams), fragment);
    }
    else {
        return new __WEBPACK_IMPORTED_MODULE_1__url_tree__["b" /* UrlTree */](replaceSegment(urlTree.root, oldSegmentGroup, newSegmentGroup), stringify(queryParams), fragment);
    }
}
function replaceSegment(current, oldSegment, newSegment) {
    var children = {};
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_collection__["c" /* forEach */])(current.children, function (c, outletName) {
        if (c === oldSegment) {
            children[outletName] = newSegment;
        }
        else {
            children[outletName] = replaceSegment(c, oldSegment, newSegment);
        }
    });
    return new __WEBPACK_IMPORTED_MODULE_1__url_tree__["a" /* UrlSegmentGroup */](current.segments, children);
}
function navigateToRoot(normalizedChange) {
    return normalizedChange.isAbsolute && normalizedChange.commands.length === 1 &&
        normalizedChange.commands[0] == '/';
}
var NormalizedNavigationCommands = (function () {
    function NormalizedNavigationCommands(isAbsolute, numberOfDoubleDots, commands) {
        this.isAbsolute = isAbsolute;
        this.numberOfDoubleDots = numberOfDoubleDots;
        this.commands = commands;
    }
    return NormalizedNavigationCommands;
}());
function normalizeCommands(commands) {
    if ((typeof commands[0] === 'string') && commands.length === 1 && commands[0] == '/') {
        return new NormalizedNavigationCommands(true, 0, commands);
    }
    var numberOfDoubleDots = 0;
    var isAbsolute = false;
    var res = [];
    var _loop_1 = function(i) {
        var c = commands[i];
        if (typeof c === 'object' && c.outlets !== undefined) {
            var r_1 = {};
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_collection__["c" /* forEach */])(c.outlets, function (commands, name) {
                if (typeof commands === 'string') {
                    r_1[name] = commands.split('/');
                }
                else {
                    r_1[name] = commands;
                }
            });
            res.push({ outlets: r_1 });
            return "continue";
        }
        if (typeof c === 'object' && c.segmentPath !== undefined) {
            res.push(c.segmentPath);
            return "continue";
        }
        if (!(typeof c === 'string')) {
            res.push(c);
            return "continue";
        }
        if (i === 0) {
            var parts = c.split('/');
            for (var j = 0; j < parts.length; ++j) {
                var cc = parts[j];
                if (j == 0 && cc == '.') {
                }
                else if (j == 0 && cc == '') {
                    isAbsolute = true;
                }
                else if (cc == '..') {
                    numberOfDoubleDots++;
                }
                else if (cc != '') {
                    res.push(cc);
                }
            }
        }
        else {
            res.push(c);
        }
    };
    for (var i = 0; i < commands.length; ++i) {
        _loop_1(i);
    }
    return new NormalizedNavigationCommands(isAbsolute, numberOfDoubleDots, res);
}
var Position = (function () {
    function Position(segmentGroup, processChildren, index) {
        this.segmentGroup = segmentGroup;
        this.processChildren = processChildren;
        this.index = index;
    }
    return Position;
}());
function findStartingPosition(normalizedChange, urlTree, route) {
    if (normalizedChange.isAbsolute) {
        return new Position(urlTree.root, true, 0);
    }
    else if (route.snapshot._lastPathIndex === -1) {
        return new Position(route.snapshot._urlSegment, true, 0);
    }
    else {
        var modifier = isMatrixParams(normalizedChange.commands[0]) ? 0 : 1;
        var index = route.snapshot._lastPathIndex + modifier;
        return createPositionApplyingDoubleDots(route.snapshot._urlSegment, index, normalizedChange.numberOfDoubleDots);
    }
}
function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
    var g = group;
    var ci = index;
    var dd = numberOfDoubleDots;
    while (dd > ci) {
        dd -= ci;
        g = g.parent;
        if (!g) {
            throw new Error('Invalid number of \'../\'');
        }
        ci = g.segments.length;
    }
    return new Position(g, false, ci - dd);
}
function getPath(command) {
    return "" + command;
}
function getOutlets(commands) {
    if (!(typeof commands[0] === 'object'))
        return (_a = {}, _a[__WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]] = commands, _a);
    if (commands[0].outlets === undefined)
        return (_b = {}, _b[__WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]] = commands, _b);
    return commands[0].outlets;
    var _a, _b;
}
function updateSegmentGroup(segmentGroup, startIndex, commands) {
    if (!segmentGroup) {
        segmentGroup = new __WEBPACK_IMPORTED_MODULE_1__url_tree__["a" /* UrlSegmentGroup */]([], {});
    }
    if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
        return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
    }
    var m = prefixedWith(segmentGroup, startIndex, commands);
    var slicedCommands = commands.slice(m.lastIndex);
    if (m.match && slicedCommands.length === 0) {
        return new __WEBPACK_IMPORTED_MODULE_1__url_tree__["a" /* UrlSegmentGroup */](segmentGroup.segments, {});
    }
    else if (m.match && !segmentGroup.hasChildren()) {
        return createNewSegmentGroup(segmentGroup, startIndex, commands);
    }
    else if (m.match) {
        return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
    }
    else {
        return createNewSegmentGroup(segmentGroup, startIndex, commands);
    }
}
function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
    if (commands.length === 0) {
        return new __WEBPACK_IMPORTED_MODULE_1__url_tree__["a" /* UrlSegmentGroup */](segmentGroup.segments, {});
    }
    else {
        var outlets_1 = getOutlets(commands);
        var children_1 = {};
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_collection__["c" /* forEach */])(outlets_1, function (commands, outlet) {
            if (commands !== null) {
                children_1[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands);
            }
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_collection__["c" /* forEach */])(segmentGroup.children, function (child, childOutlet) {
            if (outlets_1[childOutlet] === undefined) {
                children_1[childOutlet] = child;
            }
        });
        return new __WEBPACK_IMPORTED_MODULE_1__url_tree__["a" /* UrlSegmentGroup */](segmentGroup.segments, children_1);
    }
}
function prefixedWith(segmentGroup, startIndex, commands) {
    var currentCommandIndex = 0;
    var currentPathIndex = startIndex;
    var noMatch = { match: false, lastIndex: 0 };
    while (currentPathIndex < segmentGroup.segments.length) {
        if (currentCommandIndex >= commands.length)
            return noMatch;
        var path = segmentGroup.segments[currentPathIndex];
        var curr = getPath(commands[currentCommandIndex]);
        var next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
        if (curr && next && (typeof next === 'object') && next.outlets === undefined) {
            if (!compare(curr, next, path))
                return noMatch;
            currentCommandIndex += 2;
        }
        else {
            if (!compare(curr, {}, path))
                return noMatch;
            currentCommandIndex++;
        }
        currentPathIndex++;
    }
    return { match: true, lastIndex: currentCommandIndex };
}
function createNewSegmentGroup(segmentGroup, startIndex, commands) {
    var paths = segmentGroup.segments.slice(0, startIndex);
    var i = 0;
    while (i < commands.length) {
        if (typeof commands[i] === 'object' && commands[i].outlets !== undefined) {
            var children = createNewSegmentChldren(commands[i].outlets);
            return new __WEBPACK_IMPORTED_MODULE_1__url_tree__["a" /* UrlSegmentGroup */](paths, children);
        }
        // if we start with an object literal, we need to reuse the path part from the segment
        if (i === 0 && isMatrixParams(commands[0])) {
            var p = segmentGroup.segments[startIndex];
            paths.push(new __WEBPACK_IMPORTED_MODULE_1__url_tree__["c" /* UrlSegment */](p.path, commands[0]));
            i++;
            continue;
        }
        var curr = getPath(commands[i]);
        var next = (i < commands.length - 1) ? commands[i + 1] : null;
        if (curr && next && isMatrixParams(next)) {
            paths.push(new __WEBPACK_IMPORTED_MODULE_1__url_tree__["c" /* UrlSegment */](curr, stringify(next)));
            i += 2;
        }
        else {
            paths.push(new __WEBPACK_IMPORTED_MODULE_1__url_tree__["c" /* UrlSegment */](curr, {}));
            i++;
        }
    }
    return new __WEBPACK_IMPORTED_MODULE_1__url_tree__["a" /* UrlSegmentGroup */](paths, {});
}
function createNewSegmentChldren(outlets) {
    var children = {};
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_collection__["c" /* forEach */])(outlets, function (commands, outlet) {
        if (commands !== null) {
            children[outlet] = createNewSegmentGroup(new __WEBPACK_IMPORTED_MODULE_1__url_tree__["a" /* UrlSegmentGroup */]([], {}), 0, commands);
        }
    });
    return children;
}
function stringify(params) {
    var res = {};
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_collection__["c" /* forEach */])(params, function (v, k) { return res[k] = "" + v; });
    return res;
}
function compare(path, params, segment) {
    return path == segment.path && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_collection__["d" /* shallowEqual */])(params, segment.parameters);
}
//# sourceMappingURL=create_url_tree.js.map

/***/ },

/***/ 646:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_router_link__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_router_link_active__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_router_outlet__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router_module__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router_outlet_map__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__router_state__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__url_tree__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__private_export__ = __webpack_require__(647);
/* unused harmony reexport RouterLink */
/* unused harmony reexport RouterLinkWithHref */
/* unused harmony reexport RouterLinkActive */
/* unused harmony reexport RouterOutlet */
/* unused harmony reexport NavigationCancel */
/* unused harmony reexport NavigationError */
/* unused harmony reexport NavigationStart */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__router__, "a")) __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__router__["a"]; });
/* unused harmony reexport RoutesRecognized */
/* unused harmony reexport NavigationEnd */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__router_module__, "b")) __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__router_module__["b"]; });
/* unused harmony reexport provideRoutes */
/* unused harmony reexport RouterOutletMap */
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_6__router_state__, "b")) __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__router_state__["b"]; });
/* unused harmony reexport ActivatedRouteSnapshot */
/* unused harmony reexport RouterState */
/* unused harmony reexport RouterStateSnapshot */
/* unused harmony reexport PRIMARY_OUTLET */
/* unused harmony reexport DefaultUrlSerializer */
/* unused harmony reexport UrlSegment */
/* unused harmony reexport UrlSerializer */
/* unused harmony reexport UrlTree */
/* unused harmony namespace reexport */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */










//# sourceMappingURL=index.js.map

/***/ },

/***/ 647:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router_config_loader__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_module__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_collection__ = __webpack_require__(55);
/* unused harmony export __router_private__ *//**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



var __router_private__ = {
    ROUTER_PROVIDERS: __WEBPACK_IMPORTED_MODULE_1__router_module__["a" /* ROUTER_PROVIDERS */],
    ROUTES: __WEBPACK_IMPORTED_MODULE_0__router_config_loader__["c" /* ROUTES */],
    flatten: __WEBPACK_IMPORTED_MODULE_2__utils_collection__["a" /* flatten */]
};
//# sourceMappingURL=private_export.js.map

/***/ },

/***/ 648:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_state__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__url_tree__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_collection__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_tree__ = __webpack_require__(223);
/* harmony export */ exports["a"] = recognize;/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */







var NoMatch = (function () {
    function NoMatch() {
    }
    return NoMatch;
}());
var InheritedFromParent = (function () {
    function InheritedFromParent(parent, snapshot, params, data, resolve) {
        this.parent = parent;
        this.snapshot = snapshot;
        this.params = params;
        this.data = data;
        this.resolve = resolve;
    }
    Object.defineProperty(InheritedFromParent.prototype, "allParams", {
        get: function () {
            return this.parent ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["g" /* merge */])(this.parent.allParams, this.params) : this.params;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InheritedFromParent.prototype, "allData", {
        get: function () { return this.parent ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["g" /* merge */])(this.parent.allData, this.data) : this.data; },
        enumerable: true,
        configurable: true
    });
    InheritedFromParent.empty = function (snapshot) {
        return new InheritedFromParent(null, snapshot, {}, {}, new __WEBPACK_IMPORTED_MODULE_2__router_state__["c" /* InheritedResolve */](null, {}));
    };
    return InheritedFromParent;
}());
function recognize(rootComponentType, config, urlTree, url) {
    return new Recognizer(rootComponentType, config, urlTree, url).recognize();
}
var Recognizer = (function () {
    function Recognizer(rootComponentType, config, urlTree, url) {
        this.rootComponentType = rootComponentType;
        this.config = config;
        this.urlTree = urlTree;
        this.url = url;
    }
    Recognizer.prototype.recognize = function () {
        try {
            var rootSegmentGroup = split(this.urlTree.root, [], [], this.config).segmentGroup;
            var children = this.processSegmentGroup(this.config, rootSegmentGroup, InheritedFromParent.empty(null), __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */]);
            var root = new __WEBPACK_IMPORTED_MODULE_2__router_state__["d" /* ActivatedRouteSnapshot */]([], Object.freeze({}), Object.freeze(this.urlTree.queryParams), this.urlTree.fragment, {}, __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */], this.rootComponentType, null, this.urlTree.root, -1, __WEBPACK_IMPORTED_MODULE_2__router_state__["c" /* InheritedResolve */].empty);
            var rootNode = new __WEBPACK_IMPORTED_MODULE_6__utils_tree__["b" /* TreeNode */](root, children);
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__["of"])(new __WEBPACK_IMPORTED_MODULE_2__router_state__["e" /* RouterStateSnapshot */](this.url, rootNode));
        }
        catch (e) {
            return new __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"](function (obs) { return obs.error(e); });
        }
    };
    Recognizer.prototype.processSegmentGroup = function (config, segmentGroup, inherited, outlet) {
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
            return this.processChildren(config, segmentGroup, inherited);
        }
        else {
            return this.processSegment(config, segmentGroup, 0, segmentGroup.segments, inherited, outlet);
        }
    };
    Recognizer.prototype.processChildren = function (config, segmentGroup, inherited) {
        var _this = this;
        var children = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__url_tree__["d" /* mapChildrenIntoArray */])(segmentGroup, function (child, childOutlet) { return _this.processSegmentGroup(config, child, inherited, childOutlet); });
        checkOutletNameUniqueness(children);
        sortActivatedRouteSnapshots(children);
        return children;
    };
    Recognizer.prototype.processSegment = function (config, segmentGroup, pathIndex, segments, inherited, outlet) {
        for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
            var r = config_1[_i];
            try {
                return this.processSegmentAgainstRoute(r, segmentGroup, pathIndex, segments, inherited, outlet);
            }
            catch (e) {
                if (!(e instanceof NoMatch))
                    throw e;
            }
        }
        throw new NoMatch();
    };
    Recognizer.prototype.processSegmentAgainstRoute = function (route, rawSegment, pathIndex, segments, inherited, outlet) {
        if (route.redirectTo)
            throw new NoMatch();
        if ((route.outlet ? route.outlet : __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */]) !== outlet)
            throw new NoMatch();
        var newInheritedResolve = new __WEBPACK_IMPORTED_MODULE_2__router_state__["c" /* InheritedResolve */](inherited.resolve, getResolve(route));
        if (route.path === '**') {
            var params = segments.length > 0 ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["i" /* last */])(segments).parameters : {};
            var snapshot_1 = new __WEBPACK_IMPORTED_MODULE_2__router_state__["d" /* ActivatedRouteSnapshot */](segments, Object.freeze(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["g" /* merge */])(inherited.allParams, params)), Object.freeze(this.urlTree.queryParams), this.urlTree.fragment, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["g" /* merge */])(inherited.allData, getData(route)), outlet, route.component, route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + segments.length, newInheritedResolve);
            return [new __WEBPACK_IMPORTED_MODULE_6__utils_tree__["b" /* TreeNode */](snapshot_1, [])];
        }
        var _a = match(rawSegment, route, segments, inherited.snapshot), consumedSegments = _a.consumedSegments, parameters = _a.parameters, lastChild = _a.lastChild;
        var rawSlicedSegments = segments.slice(lastChild);
        var childConfig = getChildConfig(route);
        var _b = split(rawSegment, consumedSegments, rawSlicedSegments, childConfig), segmentGroup = _b.segmentGroup, slicedSegments = _b.slicedSegments;
        var snapshot = new __WEBPACK_IMPORTED_MODULE_2__router_state__["d" /* ActivatedRouteSnapshot */](consumedSegments, Object.freeze(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["g" /* merge */])(inherited.allParams, parameters)), Object.freeze(this.urlTree.queryParams), this.urlTree.fragment, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["g" /* merge */])(inherited.allData, getData(route)), outlet, route.component, route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + consumedSegments.length, newInheritedResolve);
        var newInherited = route.component ?
            InheritedFromParent.empty(snapshot) :
            new InheritedFromParent(inherited, snapshot, parameters, getData(route), newInheritedResolve);
        if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
            var children = this.processChildren(childConfig, segmentGroup, newInherited);
            return [new __WEBPACK_IMPORTED_MODULE_6__utils_tree__["b" /* TreeNode */](snapshot, children)];
        }
        else if (childConfig.length === 0 && slicedSegments.length === 0) {
            return [new __WEBPACK_IMPORTED_MODULE_6__utils_tree__["b" /* TreeNode */](snapshot, [])];
        }
        else {
            var children = this.processSegment(childConfig, segmentGroup, pathIndex + lastChild, slicedSegments, newInherited, __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */]);
            return [new __WEBPACK_IMPORTED_MODULE_6__utils_tree__["b" /* TreeNode */](snapshot, children)];
        }
    };
    return Recognizer;
}());
function sortActivatedRouteSnapshots(nodes) {
    nodes.sort(function (a, b) {
        if (a.value.outlet === __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */])
            return -1;
        if (b.value.outlet === __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */])
            return 1;
        return a.value.outlet.localeCompare(b.value.outlet);
    });
}
function getChildConfig(route) {
    if (route.children) {
        return route.children;
    }
    else if (route.loadChildren) {
        return route._loadedConfig.routes;
    }
    else {
        return [];
    }
}
function match(segmentGroup, route, segments, parent) {
    if (route.path === '') {
        if (route.pathMatch === 'full' && (segmentGroup.hasChildren() || segments.length > 0)) {
            throw new NoMatch();
        }
        else {
            var params = parent ? parent.params : {};
            return { consumedSegments: [], lastChild: 0, parameters: params };
        }
    }
    var path = route.path;
    var parts = path.split('/');
    var posParameters = {};
    var consumedSegments = [];
    var currentIndex = 0;
    for (var i = 0; i < parts.length; ++i) {
        if (currentIndex >= segments.length)
            throw new NoMatch();
        var current = segments[currentIndex];
        var p = parts[i];
        var isPosParam = p.startsWith(':');
        if (!isPosParam && p !== current.path)
            throw new NoMatch();
        if (isPosParam) {
            posParameters[p.substring(1)] = current.path;
        }
        consumedSegments.push(current);
        currentIndex++;
    }
    if (route.pathMatch === 'full' &&
        (segmentGroup.hasChildren() || currentIndex < segments.length)) {
        throw new NoMatch();
    }
    var parameters = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["g" /* merge */])(posParameters, consumedSegments[consumedSegments.length - 1].parameters);
    return { consumedSegments: consumedSegments, lastChild: currentIndex, parameters: parameters };
}
function checkOutletNameUniqueness(nodes) {
    var names = {};
    nodes.forEach(function (n) {
        var routeWithSameOutletName = names[n.value.outlet];
        if (routeWithSameOutletName) {
            var p = routeWithSameOutletName.url.map(function (s) { return s.toString(); }).join('/');
            var c = n.value.url.map(function (s) { return s.toString(); }).join('/');
            throw new Error("Two segments cannot have the same outlet name: '" + p + "' and '" + c + "'.");
        }
        names[n.value.outlet] = n.value;
    });
}
function getSourceSegmentGroup(segmentGroup) {
    var s = segmentGroup;
    while (s._sourceSegment) {
        s = s._sourceSegment;
    }
    return s;
}
function getPathIndexShift(segmentGroup) {
    var s = segmentGroup;
    var res = (s._segmentIndexShift ? s._segmentIndexShift : 0);
    while (s._sourceSegment) {
        s = s._sourceSegment;
        res += (s._segmentIndexShift ? s._segmentIndexShift : 0);
    }
    return res - 1;
}
function split(segmentGroup, consumedSegments, slicedSegments, config) {
    if (slicedSegments.length > 0 &&
        containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
        var s = new __WEBPACK_IMPORTED_MODULE_4__url_tree__["a" /* UrlSegmentGroup */](consumedSegments, createChildrenForEmptyPaths(segmentGroup, consumedSegments, config, new __WEBPACK_IMPORTED_MODULE_4__url_tree__["a" /* UrlSegmentGroup */](slicedSegments, segmentGroup.children)));
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s, slicedSegments: [] };
    }
    else if (slicedSegments.length === 0 &&
        containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
        var s = new __WEBPACK_IMPORTED_MODULE_4__url_tree__["a" /* UrlSegmentGroup */](segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s, slicedSegments: slicedSegments };
    }
    else {
        var s = new __WEBPACK_IMPORTED_MODULE_4__url_tree__["a" /* UrlSegmentGroup */](segmentGroup.segments, segmentGroup.children);
        s._sourceSegment = segmentGroup;
        s._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s, slicedSegments: slicedSegments };
    }
}
function addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
    var res = {};
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var r = routes_1[_i];
        if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
            var s = new __WEBPACK_IMPORTED_MODULE_4__url_tree__["a" /* UrlSegmentGroup */]([], {});
            s._sourceSegment = segmentGroup;
            s._segmentIndexShift = segmentGroup.segments.length;
            res[getOutlet(r)] = s;
        }
    }
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_collection__["g" /* merge */])(children, res);
}
function createChildrenForEmptyPaths(segmentGroup, consumedSegments, routes, primarySegment) {
    var res = {};
    res[__WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */]] = primarySegment;
    primarySegment._sourceSegment = segmentGroup;
    primarySegment._segmentIndexShift = consumedSegments.length;
    for (var _i = 0, routes_2 = routes; _i < routes_2.length; _i++) {
        var r = routes_2[_i];
        if (r.path === '' && getOutlet(r) !== __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */]) {
            var s = new __WEBPACK_IMPORTED_MODULE_4__url_tree__["a" /* UrlSegmentGroup */]([], {});
            s._sourceSegment = segmentGroup;
            s._segmentIndexShift = consumedSegments.length;
            res[getOutlet(r)] = s;
        }
    }
    return res;
}
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
    return routes
        .filter(function (r) { return emptyPathMatch(segmentGroup, slicedSegments, r) &&
        getOutlet(r) !== __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */]; })
        .length > 0;
}
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
    return routes.filter(function (r) { return emptyPathMatch(segmentGroup, slicedSegments, r); }).length > 0;
}
function emptyPathMatch(segmentGroup, slicedSegments, r) {
    if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full')
        return false;
    return r.path === '' && r.redirectTo === undefined;
}
function getOutlet(route) {
    return route.outlet ? route.outlet : __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* PRIMARY_OUTLET */];
}
function getData(route) {
    return route.data ? route.data : {};
}
function getResolve(route) {
    return route.resolve ? route.resolve : {};
}
//# sourceMappingURL=recognize.js.map

/***/ },

/***/ 649:
/***/ function(module, exports) {

"use strict";
"use strict";
exports.compose = function () {
    var functions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        functions[_i - 0] = arguments[_i];
    }
    return function (arg) {
        if (functions.length === 0) {
            return arg;
        }
        var last = functions[functions.length - 1];
        var rest = functions.slice(0, -1);
        return rest.reduceRight(function (composed, fn) { return fn(composed); }, last(arg));
    };
};


/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(28);
/* harmony export */ exports["d"] = createURLSearchParams;/* harmony export */ exports["b"] = serializeObj;/* harmony export */ exports["a"] = parseResponseObjects;/* unused harmony export parseListObjectsToKeyValue *//* harmony export */ exports["c"] = transformPostResponse;/* harmony export */ exports["f"] = createCookie;/* harmony export */ exports["e"] = imgToBase64;
function createURLSearchParams(_params) {
    var params = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["URLSearchParams"]();
    for (var p in _params) {
        if (_params[p] instanceof Array) {
            for (var t in _params[p]) {
                params.append(encodeURIComponent(p), encodeURIComponent(_params[p][t]));
            }
        }
        else {
            if (typeof (_params[p]) != 'undefined') {
                params.set(encodeURIComponent(p), encodeURIComponent(_params[p]));
            }
        }
    }
    return params;
}
function serializeObj(obj) {
    var result = [];
    for (var property in obj) {
        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
    }
    return result.join('&');
}
function parseResponseObjects(objects) {
    var result = [];
    for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
        var obj = objects_1[_i];
        if (obj.kind || obj.entityKind) {
            result[obj.kind || obj.entityKind] = obj;
        }
        else if (obj.list && obj.meta && obj.type) {
            result[obj.type] = obj;
        }
        else if (obj.name && obj.value) {
            result[obj.name] = obj.value;
        }
        else {
            for (var k in obj) {
                result[k] = obj[k];
            }
        }
    }
    return result;
}
function parseListObjectsToKeyValue(list) {
    var result = [];
    if (list) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var it = list_1[_i];
            result[it.id] = it;
        }
    }
    return result;
}
function transformPostResponse(response) {
    var json = response.json();
    return Object.assign(json, {
        ok: json.type === 'DOCUMENT_SAVED',
        message: json.captions ? json.captions.type : json.message
    });
}
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    else {
        expires = '';
    }
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/';
}
function imgToBase64(file, callback) {
    var fr = new FileReader();
    fr.onload = callback;
    fr.readAsDataURL(file);
}


/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_collection__ = __webpack_require__(55);
/* harmony export */ exports["e"] = createEmptyUrlTree;/* harmony export */ exports["f"] = containsTree;
/* harmony export */ __webpack_require__.d(exports, "b", function() { return UrlTree; });
/* harmony export */ __webpack_require__.d(exports, "a", function() { return UrlSegmentGroup; });
/* harmony export */ __webpack_require__.d(exports, "c", function() { return UrlSegment; });/* unused harmony export equalSegments *//* unused harmony export equalPath *//* harmony export */ exports["d"] = mapChildrenIntoArray;
/* harmony export */ __webpack_require__.d(exports, "g", function() { return UrlSerializer; });
/* harmony export */ __webpack_require__.d(exports, "h", function() { return DefaultUrlSerializer; });/* unused harmony export serializePaths *//* unused harmony export encode *//* unused harmony export decode *//* unused harmony export serializePath *//**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


function createEmptyUrlTree() {
    return new UrlTree(new UrlSegmentGroup([], {}), {}, null);
}
function containsTree(container, containee, exact) {
    if (exact) {
        return equalSegmentGroups(container.root, containee.root);
    }
    else {
        return containsSegmentGroup(container.root, containee.root);
    }
}
function equalSegmentGroups(container, containee) {
    if (!equalPath(container.segments, containee.segments))
        return false;
    if (container.numberOfChildren !== containee.numberOfChildren)
        return false;
    for (var c in containee.children) {
        if (!container.children[c])
            return false;
        if (!equalSegmentGroups(container.children[c], containee.children[c]))
            return false;
    }
    return true;
}
function containsSegmentGroup(container, containee) {
    return containsSegmentGroupHelper(container, containee, containee.segments);
}
function containsSegmentGroupHelper(container, containee, containeePaths) {
    if (container.segments.length > containeePaths.length) {
        var current = container.segments.slice(0, containeePaths.length);
        if (!equalPath(current, containeePaths))
            return false;
        if (containee.hasChildren())
            return false;
        return true;
    }
    else if (container.segments.length === containeePaths.length) {
        if (!equalPath(container.segments, containeePaths))
            return false;
        for (var c in containee.children) {
            if (!container.children[c])
                return false;
            if (!containsSegmentGroup(container.children[c], containee.children[c]))
                return false;
        }
        return true;
    }
    else {
        var current = containeePaths.slice(0, container.segments.length);
        var next = containeePaths.slice(container.segments.length);
        if (!equalPath(container.segments, current))
            return false;
        if (!container.children[__WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]])
            return false;
        return containsSegmentGroupHelper(container.children[__WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]], containee, next);
    }
}
/**
 * A URL in the tree form.
 *
 * @stable
 */
var UrlTree = (function () {
    /**
     * @internal
     */
    function UrlTree(root, queryParams, fragment) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    UrlTree.prototype.toString = function () { return new DefaultUrlSerializer().serialize(this); };
    return UrlTree;
}());
/**
 * @stable
 */
var UrlSegmentGroup = (function () {
    function UrlSegmentGroup(segments, children) {
        var _this = this;
        this.segments = segments;
        this.children = children;
        this.parent = null;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_collection__["c" /* forEach */])(children, function (v, k) { return v.parent = _this; });
    }
    /**
     * Return true if the segment has child segments
     */
    UrlSegmentGroup.prototype.hasChildren = function () { return this.numberOfChildren > 0; };
    Object.defineProperty(UrlSegmentGroup.prototype, "numberOfChildren", {
        /**
         * Returns the number of child sements.
         */
        get: function () { return Object.keys(this.children).length; },
        enumerable: true,
        configurable: true
    });
    UrlSegmentGroup.prototype.toString = function () { return serializePaths(this); };
    return UrlSegmentGroup;
}());
/**
 * @stable
 */
var UrlSegment = (function () {
    function UrlSegment(path, parameters) {
        this.path = path;
        this.parameters = parameters;
    }
    UrlSegment.prototype.toString = function () { return serializePath(this); };
    return UrlSegment;
}());
function equalSegments(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i].path !== b[i].path)
            return false;
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_collection__["d" /* shallowEqual */])(a[i].parameters, b[i].parameters))
            return false;
    }
    return true;
}
function equalPath(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i].path !== b[i].path)
            return false;
    }
    return true;
}
function mapChildrenIntoArray(segment, fn) {
    var res = [];
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_collection__["c" /* forEach */])(segment.children, function (child, childOutlet) {
        if (childOutlet === __WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_collection__["c" /* forEach */])(segment.children, function (child, childOutlet) {
        if (childOutlet !== __WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    return res;
}
/**
 * Defines a way to serialize/deserialize a url tree.
 *
 * @stable
 */
var UrlSerializer = (function () {
    function UrlSerializer() {
    }
    return UrlSerializer;
}());
/**
 * A default implementation of the serialization.
 *
 * @stable
 */
var DefaultUrlSerializer = (function () {
    function DefaultUrlSerializer() {
    }
    DefaultUrlSerializer.prototype.parse = function (url) {
        var p = new UrlParser(url);
        return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
    };
    DefaultUrlSerializer.prototype.serialize = function (tree) {
        var segment = "/" + serializeSegment(tree.root, true);
        var query = serializeQueryParams(tree.queryParams);
        var fragment = tree.fragment !== null && tree.fragment !== undefined ? "#" + encodeURI(tree.fragment) : '';
        return "" + segment + query + fragment;
    };
    return DefaultUrlSerializer;
}());
function serializePaths(segment) {
    return segment.segments.map(function (p) { return serializePath(p); }).join('/');
}
function serializeSegment(segment, root) {
    if (segment.hasChildren() && root) {
        var primary = segment.children[__WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]] ?
            serializeSegment(segment.children[__WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]], false) :
            '';
        var children_1 = [];
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_collection__["c" /* forEach */])(segment.children, function (v, k) {
            if (k !== __WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]) {
                children_1.push(k + ":" + serializeSegment(v, false));
            }
        });
        if (children_1.length > 0) {
            return primary + "(" + children_1.join('//') + ")";
        }
        else {
            return "" + primary;
        }
    }
    else if (segment.hasChildren() && !root) {
        var children = mapChildrenIntoArray(segment, function (v, k) {
            if (k === __WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]) {
                return [serializeSegment(segment.children[__WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]], false)];
            }
            else {
                return [(k + ":" + serializeSegment(v, false))];
            }
        });
        return serializePaths(segment) + "/(" + children.join('//') + ")";
    }
    else {
        return serializePaths(segment);
    }
}
function encode(s) {
    return encodeURIComponent(s);
}
function decode(s) {
    return decodeURIComponent(s);
}
function serializePath(path) {
    return "" + encode(path.path) + serializeParams(path.parameters);
}
function serializeParams(params) {
    return pairs(params).map(function (p) { return (";" + encode(p.first) + "=" + encode(p.second)); }).join('');
}
function serializeQueryParams(params) {
    var strs = pairs(params).map(function (p) { return (encode(p.first) + "=" + encode(p.second)); });
    return strs.length > 0 ? "?" + strs.join("&") : '';
}
var Pair = (function () {
    function Pair(first, second) {
        this.first = first;
        this.second = second;
    }
    return Pair;
}());
function pairs(obj) {
    var res = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            res.push(new Pair(prop, obj[prop]));
        }
    }
    return res;
}
var SEGMENT_RE = /^[^\/\(\)\?;=&#]+/;
function matchSegments(str) {
    SEGMENT_RE.lastIndex = 0;
    var match = str.match(SEGMENT_RE);
    return match ? match[0] : '';
}
var QUERY_PARAM_RE = /^[^=\?&#]+/;
function matchQueryParams(str) {
    QUERY_PARAM_RE.lastIndex = 0;
    var match = str.match(SEGMENT_RE);
    return match ? match[0] : '';
}
var QUERY_PARAM_VALUE_RE = /^[^\?&#]+/;
function matchUrlQueryParamValue(str) {
    QUERY_PARAM_VALUE_RE.lastIndex = 0;
    var match = str.match(QUERY_PARAM_VALUE_RE);
    return match ? match[0] : '';
}
var UrlParser = (function () {
    function UrlParser(url) {
        this.url = url;
        this.remaining = url;
    }
    UrlParser.prototype.peekStartsWith = function (str) { return this.remaining.startsWith(str); };
    UrlParser.prototype.capture = function (str) {
        if (!this.remaining.startsWith(str)) {
            throw new Error("Expected \"" + str + "\".");
        }
        this.remaining = this.remaining.substring(str.length);
    };
    UrlParser.prototype.parseRootSegment = function () {
        if (this.remaining.startsWith('/')) {
            this.capture('/');
        }
        if (this.remaining === '' || this.remaining.startsWith('?') || this.remaining.startsWith('#')) {
            return new UrlSegmentGroup([], {});
        }
        else {
            return new UrlSegmentGroup([], this.parseChildren());
        }
    };
    UrlParser.prototype.parseChildren = function () {
        if (this.remaining.length == 0) {
            return {};
        }
        if (this.peekStartsWith('/')) {
            this.capture('/');
        }
        var paths = [];
        if (!this.peekStartsWith('(')) {
            paths.push(this.parseSegments());
        }
        while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
            this.capture('/');
            paths.push(this.parseSegments());
        }
        var children = {};
        if (this.peekStartsWith('/(')) {
            this.capture('/');
            children = this.parseParens(true);
        }
        var res = {};
        if (this.peekStartsWith('(')) {
            res = this.parseParens(false);
        }
        if (paths.length > 0 || Object.keys(children).length > 0) {
            res[__WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]] = new UrlSegmentGroup(paths, children);
        }
        return res;
    };
    UrlParser.prototype.parseSegments = function () {
        var path = matchSegments(this.remaining);
        if (path === '' && this.peekStartsWith(';')) {
            throw new Error("Empty path url segment cannot have parameters: '" + this.remaining + "'.");
        }
        this.capture(path);
        var matrixParams = {};
        if (this.peekStartsWith(';')) {
            matrixParams = this.parseMatrixParams();
        }
        return new UrlSegment(decode(path), matrixParams);
    };
    UrlParser.prototype.parseQueryParams = function () {
        var params = {};
        if (this.peekStartsWith('?')) {
            this.capture('?');
            this.parseQueryParam(params);
            while (this.remaining.length > 0 && this.peekStartsWith('&')) {
                this.capture('&');
                this.parseQueryParam(params);
            }
        }
        return params;
    };
    UrlParser.prototype.parseFragment = function () {
        if (this.peekStartsWith('#')) {
            return decodeURI(this.remaining.substring(1));
        }
        else {
            return null;
        }
    };
    UrlParser.prototype.parseMatrixParams = function () {
        var params = {};
        while (this.remaining.length > 0 && this.peekStartsWith(';')) {
            this.capture(';');
            this.parseParam(params);
        }
        return params;
    };
    UrlParser.prototype.parseParam = function (params) {
        var key = matchSegments(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var value = '';
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var valueMatch = matchSegments(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[decode(key)] = decode(value);
    };
    UrlParser.prototype.parseQueryParam = function (params) {
        var key = matchQueryParams(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var value = '';
        if (this.peekStartsWith('=')) {
            this.capture('=');
            var valueMatch = matchUrlQueryParamValue(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[decode(key)] = decode(value);
    };
    UrlParser.prototype.parseParens = function (allowPrimary) {
        var segments = {};
        this.capture('(');
        while (!this.peekStartsWith(')') && this.remaining.length > 0) {
            var path = matchSegments(this.remaining);
            var next = this.remaining[path.length];
            // if is is not one of these characters, then the segment was unescaped
            // or the group was not closed
            if (next !== '/' && next !== ')' && next !== ';') {
                throw new Error("Cannot parse url '" + this.url + "'");
            }
            var outletName = void 0;
            if (path.indexOf(':') > -1) {
                outletName = path.substr(0, path.indexOf(':'));
                this.capture(outletName);
                this.capture(':');
            }
            else if (allowPrimary) {
                outletName = __WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */];
            }
            var children = this.parseChildren();
            segments[outletName] = Object.keys(children).length === 1 ? children[__WEBPACK_IMPORTED_MODULE_0__shared__["a" /* PRIMARY_OUTLET */]] :
                new UrlSegmentGroup([], children);
            if (this.peekStartsWith('//')) {
                this.capture('//');
            }
        }
        this.capture(')');
        return segments;
    };
    return UrlParser;
}());
//# sourceMappingURL=url_tree.js.map

/***/ },

/***/ 798:
/***/ function(module, exports) {

"use strict";
"use strict";
var logger = console;
var INIT_ACTION = "@ngrx/store/init";
var repeat = function (str, times) { return (new Array(times + 1)).join(str); };
var pad = function (num, maxLength) { return repeat("0", maxLength - num.toString().length) + num; };
var formatTime = function (time) { return ("@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3)); };
var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;
var getLogLevel = function (level, action, payload, type) {
    switch (typeof level) {
        case "object":
            return typeof level[type] === "function" ? level[type].apply(level, payload) : level[type];
        case "function":
            return level(action);
        default:
            return level;
    }
};
var printBuffer = function (options) { return function (logBuffer) {
    var actionTransformer = options.actionTransformer, collapsed = options.collapsed, colors = options.colors, timestamp = options.timestamp, duration = options.duration, level = options.level;
    logBuffer.forEach(function (logEntry, key) {
        var started = logEntry.started, startedTime = logEntry.startedTime, action = logEntry.action, error = logEntry.error;
        var prevState = logEntry.prevState.nextState ? logEntry.prevState.nextState : '(Empty)';
        var took = logEntry.took, nextState = logEntry.nextState;
        var nextEntry = logBuffer[key + 1];
        if (nextEntry) {
            nextState = nextEntry.prevState;
            took = nextEntry.started - started;
        }
        var formattedAction = actionTransformer(action);
        var isCollapsed = (typeof collapsed === "function") ? collapsed(function () { return nextState; }, action) : collapsed;
        var formattedTime = formatTime(startedTime);
        var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
        var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");
        try {
            if (isCollapsed) {
                if (colors.title)
                    logger.groupCollapsed("%c " + title, titleCSS);
                else
                    logger.groupCollapsed(title);
            }
            else {
                if (colors.title)
                    logger.group("%c " + title, titleCSS);
                else
                    logger.group(title);
            }
        }
        catch (e) {
            logger.log(title);
        }
        var prevStateLevel = getLogLevel(level, formattedAction, [prevState], "prevState");
        var actionLevel = getLogLevel(level, formattedAction, [formattedAction], "action");
        var errorLevel = getLogLevel(level, formattedAction, [error, prevState], "error");
        var nextStateLevel = getLogLevel(level, formattedAction, [nextState], "nextState");
        if (prevStateLevel) {
            if (colors.prevState)
                logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);
            else
                logger[prevStateLevel]("prev state", prevState);
        }
        if (actionLevel) {
            if (colors.action)
                logger[actionLevel]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);
            else
                logger[actionLevel]("action", formattedAction);
        }
        if (error && errorLevel) {
            if (colors.error)
                logger[errorLevel]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);
            else
                logger[errorLevel]("error", error);
        }
        if (nextStateLevel) {
            if (colors.nextState)
                logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);
            else
                logger[nextStateLevel]("next state", nextState);
        }
        try {
            logger.groupEnd();
        }
        catch (e) {
            logger.log("\u2014\u2014 log end \u2014\u2014");
        }
    });
    logBuffer.length = 0;
}; };
exports.storeLogger = function (opts) {
    if (opts === void 0) { opts = {}; }
    return function (reducer) {
        var log = {};
        var ua = typeof window !== 'undefined' && window.navigator.userAgent ? window.navigator.userAgent : '';
        var ms_ie = false;
        //fix for action display in IE
        var old_ie = ua.indexOf('MSIE ');
        var new_ie = ua.indexOf('Trident/');
        if ((old_ie > -1) || (new_ie > -1)) {
            ms_ie = true;
        }
        var defaults = {
            level: "log",
            collapsed: false,
            duration: true,
            timestamp: true,
            stateTransformer: function (state) { return state; },
            actionTransformer: function (actn) { return actn; },
            colors: ms_ie ? {} : {
                title: function () { return "#000000"; },
                prevState: function () { return "#9E9E9E"; },
                action: function () { return "#03A9F4"; },
                nextState: function () { return "#4CAF50"; },
                error: function () { return "#F20404"; },
            }
        };
        var options = Object.assign({}, defaults, opts);
        var stateTransformer = options.stateTransformer;
        var buffer = printBuffer(options);
        return function (state, action) {
            var preLog = {
                started: timer.now(),
                startedTime: new Date(),
                prevState: stateTransformer(log),
                action: action
            };
            var nextState = reducer(state, action);
            var postLog = {
                took: timer.now() - preLog.started,
                nextState: stateTransformer(nextState)
            };
            log = Object.assign({}, preLog, postLog);
            //ignore init action fired by store and devtools
            if (action.type !== INIT_ACTION) {
                buffer([log]);
            }
            return nextState;
        };
    };
};


/***/ },

/***/ 800:
/***/ function(module, exports) {

module.exports = "<notification></notification>\n<div class=\"layout\" [class.hidden]=\"!isReady\">\n    <div class=\"content-overlay\" (mousedown)=\"hideNav($event)\" (touchstart)=\"hideNav($event)\"></div>\n    <navbar [user]=\"loggedUser\"></navbar>\n    <section class=\"container\">\n        <nav data-c=\"nav\" class=\"aside side-nav\"></nav>\n        <main class=\"content\">\n            <router-outlet></router-outlet>\n        </main>\n    </section>\n</div>\n<div class=\"app-loading\" *ngIf=\"!isReady\">\n    <img class=\"brand-logo\" alt=\"logo\" src=\"{{'img/logo.png'}}\" />Loading...\n</div>\n<img-view></img-view>\n"

/***/ },

/***/ 801:
/***/ function(module, exports) {

module.exports = "<ul>\n    <li>\n        <a [routerLink]=\"['/tasks']\" class=\"nav-link\" [class.active]=\"isActive(['/']) || isActive(['/tasks'])\">\n            <i class=\"fa fa-list\"></i>\n            <span>{{'tasks_all' | translate}}</span>\n        </a>\n    </li>\n    <li>\n        <a [routerLink]=\"['/tasks', 'my']\" class=\"nav-link\" [class.active]=\"isActive(['/tasks/my'])\">\n            <i class=\"fa fa-pencil\"></i>\n            <span>{{'my_tasks' | translate}}</span>\n        </a>\n    </li>\n    <li>\n        <a [routerLink]=\"['/tasks', 'inbox']\" class=\"nav-link\" [class.active]=\"isActive(['/tasks/inbox'])\">\n            <i class=\"fa fa-inbox\"></i>\n            <span>{{'tasks_assigned_to_me' | translate}}</span>\n        </a>\n    </li>\n    <!-- <li>\n        <a [routerLink]=\"['/']\" class=\"nav-link\">\n            <i class=\"fa fa-dashboard\"></i>\n            <span>{{'dashboard' | translate}}</span>\n        </a>\n    </li> -->\n    <li class=\"divider\"></li>\n    <li>\n        <a [routerLink]=\"['/projects']\" class=\"nav-link\" [class.active]=\"isActive(['/projects'])\">\n            <i class=\"fa fa-puzzle-piece\"></i>\n            <span>{{'projects' | translate}}</span>\n        </a>\n        <ul>\n            <li *ngFor=\"let project of projects\">\n                <a [routerLink]=\"['/projects', project.id, 'tasks']\" class=\"nav-link\" [class.active]=\"isActive(['/projects/' + project.id + '/tasks'])\">\n                    <i class=\"fa fa-file-text-o\"></i>\n                    <span>{{project.name}}</span>\n                </a>\n            </li>\n        </ul>\n    </li>\n</ul>\n"

/***/ },

/***/ 802:
/***/ function(module, exports) {

module.exports = "<header class=\"header navbar\">\n    <div class=\"container\">\n        <div class=\"navbar-header\">\n            <button class=\"btn-side-nav-toggle\" type=\"button\" (click)=\"toggleNav()\"></button>\n            <img class=\"brand-logo\" alt=\"logo\" src=\"{{logoUrl}}\" />\n            <span class=\"brand-title\">{{headerTitle}}</span>\n        </div>\n        <nav class=\"navbar-nav navbar-right\">\n            <ul class=\"nav nav-inline navbar-right\">\n                <li dropdown [tabIndex]=\"-1\" class=\"dropdown\">\n                    <a dropdown-toggle href=\"#\" class=\"dropdown-toggle\">\n                        <i class=\"fa fa-user\"></i>\n                    </a>\n                    <ul class=\"dropdown-menu right\">\n                        <li *ngIf=\"user\">\n                            <a class=\"user-profile\" [routerLink]=\"['/user-profile']\">\n                                <i class=\"fa fa-user\"></i>\n                                <span>{{user.name}}</span>\n                            </a>\n                        </li>\n                        <li class=\"divider\"></li>\n                        <li>\n                            <a class=\"ws\" href=\"{{workspaceUrl}}\">\n                                <i class=\"fa fa-th\"></i>\n                                <span>{{'workspace' | translate}}</span>\n                            </a>\n                        </li>\n                    </ul>\n                </li>\n            </ul>\n            <form class=\"navbar-form navbar-search\">\n                <input type=\"search\" class=\"q\" name=\"keyword\" value=\"{{keyWord}}\" placeholder=\"{{'search' | translate}}\" required autocomplete=\"off\" (keyup)=\"keyup$.next($event)\" (focus)=\"searchFocus()\" (blur)=\"searchBlur($event.target)\" />\n                <button type=\"reset\" (click)=\"search('')\"><i class=\"fa fa-times\"></i></button>\n                <input type=\"submit\" value=\"search\" />\n            </form>\n        </nav>\n    </div>\n</header>\n"

/***/ },

/***/ 803:
/***/ function(module, exports) {

module.exports = "<div class=\"view project-list\">\n    <header class=\"entries-head\" *ngIf=\"showHeader\">\n        <div class=\"head-wrap\">\n            <label class=\"entry-select\">\n                <input type=\"checkbox\" class=\"all\" [checked]=\"isSelectedAll\" (change)=\"toggleSelectAll()\" />\n            </label>\n            <div class=\"entry-captions\">\n                <div class=\"project-list__name\">{{'name' | translate}}</div>\n                <div class=\"vw-icon\"><i class=\"fa fa-paperclip\"></i></div>\n                <div class=\"project-list__status\">{{'status' | translate}}</div>\n                <div class=\"project-list__customer\">{{'customer' | translate}}</div>\n                <div class=\"project-list__manager\">{{'manager' | translate}}</div>\n                <div class=\"project-list__programmer\">{{'programmer' | translate}}</div>\n                <div class=\"project-list__tester\">{{'tester' | translate}}</div>\n                <div class=\"project-list__finish_date\">{{'finish_date' | translate}}</div>\n            </div>\n        </div>\n    </header>\n    <div class=\"entries\">\n        <div class=\"entry-wrap\" *ngFor=\"let project of projects\" [class.active]=\"isSelected(project.id)\">\n            <div class=\"entry\">\n                <label class=\"entry-select\">\n                    <input type=\"checkbox\" name=\"project-id\" value=\"{{project.id}}\" [checked]=\"isSelected(project.id)\" (change)=\"toggleSelected(project.id)\" />\n                </label>\n                <a class=\"entry-link\" [routerLink]=\"['./', project.id]\">\n                    <div class=\"entry-fields\">\n                        <div class=\"project-list__name\">{{project.name}}</div>\n                        <div class=\"vw-icon\">\n                            <i class=\"fa fa-paperclip\" *ngIf=\"project.hasAttachments\"></i>\n                        </div>\n                        <div class=\"project-list__status\">\n                            <span class=\"status-{{project.status | text:'L'}}\">{{project.status | text:'L' | translate}}</span>\n                        </div>\n                        <div class=\"project-list__customer\">\n                            <organization-input [org]=\"project.customer\"></organization-input>\n                        </div>\n                        <div class=\"project-list__manager\">\n                            <employee-input [ids]=\"[project.managerUserId]\"></employee-input>\n                        </div>\n                        <div class=\"project-list__programmer\">\n                            <employee-input [ids]=\"[project.programmerUserId]\"></employee-input>\n                        </div>\n                        <div class=\"project-list__tester\">\n                            <employee-input [ids]=\"[project.testerUserId]\"></employee-input>\n                        </div>\n                        <div class=\"project-list__finish_date\">\n                            {{project.finishDate | dateFmt:'DD.MM.YYYY'}}\n                            <span>{{'now' | dateDuration:project.finishDate}}</span>\n                        </div>\n                    </div>\n                </a>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },

/***/ 804:
/***/ function(module, exports) {

module.exports = "<form class=\"form\" *ngIf=\"isReady\">\n    <header class=\"content-header\">\n        <div class=\"content-actions\">\n            <button class=\"btn-back\" type=\"button\" title=\"{{'close' | translate}}\" (click)=\"close($event)\">\n                <i class=\"fa fa-chevron-left\"></i>\n                <span>{{'close' | translate}}</span>\n            </button>\n            <button class=\"btn btn-primary\" type=\"button\" *ngIf=\"isEditable\" [disabled]=\"!isValid\" (click)=\"saveProject()\">\n                {{'save_close' | translate}}\n            </button>\n            <div *ngIf=\"!isNew && isEditable\" dropdown class=\"buttons\" [tabIndex]=\"-1\">\n                <div dropdown-toggle>\n                    <span class=\"btn\">...</span>\n                </div>\n                <div class=\"dropdown-menu\">\n                    <ul class=\"menu\">\n                        <li>\n                            <a class=\"menu-item\" (click)=\"deleteProject()\">{{'delete' | translate}}</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        <h1 class=\"header-title header-title-flex\">\n            <label>{{title | translate}}</label>\n            <input [class.invalid]=\"errors.name\" autofocus required name=\"name\" maxlength=\"140\" placeholder=\"{{'name' | translate}}\" [readonly]=\"!isEditable\" (keyup)=\"validateForm()\" [(ngModel)]=\"project.name\" />\n        </h1>\n    </header>\n    <section class=\"content-body\">\n        <tabs>\n            <tab class=\"tab-pane\" tabTitle=\"{{'properties' | translate}}\">\n                <div class=\"fieldset\">\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'customer' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.customerId\">\n                            <organization-input class=\"span8\" [editable]=\"isEditable\" [id]=\"project.customerId\" (select)=\"setCustomer($event)\"></organization-input>\n                            <error-message [error]=\"errors.customerId\"></error-message>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'manager' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.managerUserId\">\n                            <employee-input class=\"span8\" [editable]=\"isEditable\" [ids]=\"[project.managerUserId]\" (select)=\"setManager($event)\"></employee-input>\n                            <error-message [error]=\"errors.managerUserId\"></error-message>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'programmer' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.programmerUserId\">\n                            <employee-input class=\"span8\" [editable]=\"isEditable\" [ids]=\"[project.programmerUserId]\" (select)=\"setProgrammer($event)\"></employee-input>\n                            <error-message [error]=\"errors.programmerUserId\"></error-message>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'tester' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.testerUserId\">\n                            <employee-input class=\"span8\" [editable]=\"isEditable\" [ids]=\"[project.testerUserId]\" (select)=\"setTester($event)\"></employee-input>\n                            <error-message [error]=\"errors.testerUserId\"></error-message>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'observers' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.observerUserIds\">\n                            <employee-input class=\"span8\" [editable]=\"isEditable\" [multiple]=\"true\" [ids]=\"project.observerUserIds\" (select)=\"setObserver($event)\"></employee-input>\n                            <error-message [error]=\"errors.observerUserIds\"></error-message>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'status' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.status\">\n                            <switch-button [disabled]=\"!isEditable\" [model]=\"project\" value=\"status\" [items]=\"projectStatusTypes\"></switch-button>\n                            <error-message [error]=\"errors.status\"></error-message>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'finish_date' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.finishDate\">\n                            <div class=\"span2\" *ngIf=\"!isEditable\">\n                                <span class=\"input\">{{project.finishDate}}</span>\n                            </div>\n                            <input class=\"span2\" datepicker *ngIf=\"isEditable\" name=\"finishDate\" (select)=\"setFinishDate($event)\" [(ngModel)]=\"project.finishDate\" />\n                            <span>{{'now' | dateDuration:project.finishDate}}</span>\n                            <error-message [error]=\"errors.finishDate\"></error-message>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'comment' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.comment\">\n                            <markdown-editor class=\"span8\" [markdown]=\"project.comment || ''\" [editable]=\"isEditable\" [updateTimeout]=\"300\" (update)=\"setProjectComment($event)\"></markdown-editor>\n                            <error-message [error]=\"errors.comment\"></error-message>\n                        </div>\n                    </div>\n                </div>\n                <attachments [editable]=\"isEditable\" [model]=\"project\" (upload)=\"addAttachment($event)\" (delete)=\"deleteAttachment($event)\"></attachments>\n            </tab>\n            <tab class=\"tab-pane\" tabTitle=\"{{'acl_tab_title' | translate}}\" icon=\"fa fa-share-alt\" *ngIf=\"!isNew\">\n                <div class=\"fieldset\">\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'editors' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <ul>\n                                <li *ngFor=\"let editor of project.acl.editors | values\">{{editor}}</li>\n                            </ul>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'readers' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <ul>\n                                <li *ngFor=\"let reader of project.acl.readers | values\">{{reader}}</li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </tab>\n        </tabs>\n    </section>\n    <footer class=\"content-footer\">\n        <div class=\"record-author\" *ngIf=\"project.authorId\">\n            <span>{{'author' | translate}}</span>\n            <employee-input [ids]=\"[project.authorId]\"></employee-input>\n            <span>{{project.regDate}}</span>\n        </div>\n    </footer>\n</form>\n"

/***/ },

/***/ 805:
/***/ function(module, exports) {

module.exports = "<div class=\"content-header\">\n    <h1 class=\"header-title\">\n        {{title | translate}}\n        <sup *ngIf=\"!loading && meta.count\">({{meta.count}})</sup>\n    </h1>\n    <div class=\"content-actions\">\n        <button class=\"btn\" type=\"button\" (click)=\"newProject()\">\n            {{'new_project' | translate}}\n        </button>\n        <button class=\"btn btn-refresh\" type=\"button\" (click)=\"refresh()\">\n            <i class=\"fa fa-refresh\"></i>\n        </button>\n        <pagination [totalPages]=\"meta.totalPages\" [page]=\"meta.page\" (change)=\"goToPage($event)\"></pagination>\n    </div>\n</div>\n<div class=\"content-body\">\n    <project-list [projects]=\"projects\"></project-list>\n</div>\n<router-outlet></router-outlet>\n"

/***/ },

/***/ 806:
/***/ function(module, exports) {

module.exports = "<form class=\"form\" *ngIf=\"isReady\">\n    <header class=\"content-header\">\n        <div class=\"content-actions\">\n            <button class=\"btn-back\" type=\"button\" title=\"{{'close' | translate}}\" (click)=\"close($event)\">\n                <i class=\"fa fa-chevron-left\"></i>\n                <span>{{'close' | translate}}</span>\n            </button>\n            <button type=\"button\" class=\"btn btn-primary\" *ngIf=\"isNew\" [disabled]=\"!request.requestTypeId || (isResolveAction && !dueDate)\" (click)=\"sendRequest()\">\n                {{'send_request' | translate}}\n            </button>\n        </div>\n        <h1 class=\"header-title\">\n            <span>{{'task_request' | translate}}</span>\n            <span class=\"request-resolution {{request.resolution | text:'L'}}\" *ngIf=\"request.resolution == 'ACCEPTED'\">\n                <i class=\"fa fa-check\"></i>\n                {{'accepted' | translate}}\n                <span class=\"request__resolution_time\">{{request.resolutionTime | dateFmt:'DD.MM.YYYY'}}</span>\n            </span>\n            <span class=\"request-resolution {{request.resolution | text:'L'}}\" *ngIf=\"request.resolution == 'DECLINED'\">\n                <i class=\"fa fa-times\"></i>\n                {{'declined' | translate}}\n                <span class=\"request__resolution_time\">{{request.resolutionTime | dateFmt:'DD.MM.YYYY'}}</span>\n            </span>\n        </h1>\n    </header>\n    <section class=\"content-body\">\n        <section *ngIf=\"request.resolution == 'DECLINED' && request.decisionComment\" class=\"task-cancel-info\">\n            <span>{{'decline_reason' | translate}}:&nbsp;</span><span>{{request.decisionComment}}</span>\n        </section>\n        <fieldset class=\"fieldset\">\n            <div class=\"form-group\">\n                <div class=\"control-label\">\n                    {{'task' | translate}}\n                </div>\n                <div class=\"controls\">\n                    <a class=\"input-placeholder\" [routerLink]=\"['/task', task.id]\">{{task.title}}</a>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"control-label\">\n                    {{'request_type' | translate}}\n                </div>\n                <div class=\"controls\">\n                    <div class=\"span8\">\n                        <request-type-input [editable]=\"editable\" placeHolder=\"{{'request_type' | translate}}\" [requestType]=\"request.requestType\" (select)=\"setRequestType($event)\"></request-type-input>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"control-label\">\n                    {{'comment' | translate}}\n                </div>\n                <div class=\"controls\">\n                    <div class=\"span8\">\n                        <textarea name=\"comment\" [disabled]=\"!editable\" [(ngModel)]=\"comment\"></textarea>\n                        <!-- <markdown-editor\n                            [markdown]=\"''\"\n                            editable=\"true\"\n                            placeHolder=\"{{'comment' | translate}}\"\n                            updateTimeout=\"100\"\n                            (update)=\"setComment($event)\">\n                        </markdown-editor> -->\n                    </div>\n                </div>\n            </div>\n        </fieldset>\n        <div *ngIf=\"!editable && !request.attachments\">\n            <attachments [model]=\"request\" [editable]=\"editable\" (upload)=\"addAttachment($event)\" (delete)=\"deleteAttachment($event)\"></attachments>\n        </div>\n    </section>\n    <section class=\"request__resol\" *ngIf=\"task.editable && request.resolution == 'UNKNOWN'\">\n        <fieldset class=\"fieldset\" *ngIf=\"isResolveAction\">\n            <div class=\"form-group\">\n                <div class=\"control-label\">\n                    {{'due_date' | translate}}\n                </div>\n                <div class=\"controls\">\n                    <div class=\"span8\">\n                        <input datepicker class=\"span2\" name=\"dueDate\" (select)=\"setDueDate($event)\" />\n                        <div class=\"help\">\n                            {{'new_due_date_help' | translate}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </fieldset>\n        <div class=\"request__buttons\">\n            <button type=\"button\" class=\"btn\" (click)=\"decline(request)\">\n                {{'decline' | translate}}\n            </button>\n            <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"request.requestType.name == 'prolong' && !dueDate\" (click)=\"doAccept(request)\">\n                {{'accept' | translate}}\n            </button>\n        </div>\n    </section>\n    <footer class=\"content-footer\">\n        <div class=\"record-author\" *ngIf=\"request.authorId\">\n            <span>{{'author' | translate}}</span>\n            <employee-input [ids]=\"[request.authorId]\"></employee-input>\n            <span>{{request.regDate}}</span>\n        </div>\n    </footer>\n</form>\n<request-decline-dialog *ngIf=\"showDeclineDialog\" (confirm)=\"onConfirmDeclineDialog($event)\" (cancel)=\"onCancelDeclineDialog()\"></request-decline-dialog>\n"

/***/ },

/***/ 807:
/***/ function(module, exports) {

module.exports = "<div class=\"view task-list\">\n    <header class=\"entries-head\" *ngIf=\"showHeader\">\n        <div class=\"head-wrap\">\n            <label class=\"entry-select\" *ngIf=\"showSelect\">\n                <input type=\"checkbox\" class=\"all\" [checked]=\"isSelectedAll\" (change)=\"toggleSelectAll()\" />\n            </label>\n            <div class=\"entry-captions\">\n                <div class=\"task-list__reg-number\">№</div>\n                <div class=\"task-list__title\">{{'task_title' | translate}}</div>\n                <div class=\"vw-icon\"><i class=\"fa fa-paperclip\"></i></div>\n                <div class=\"task-list__status\">{{'status' | translate}}</div>\n                <div class=\"task-list__priority\">{{'priority' | translate}}</div>\n                <div class=\"task-list__assignee\">{{'assignee_user' | translate}}</div>\n                <div class=\"task-list__start_date\">{{'start_date' | translate}}</div>\n                <div class=\"task-list__due_date\">{{'due_date' | translate}}</div>\n                <div class=\"task-list__tags\">{{'tags' | translate}}</div>\n            </div>\n        </div>\n    </header>\n    <div class=\"entries\" [class.hidden]=\"loading\">\n        <div *ngFor=\"let task of tasks\">\n            <div class=\"entry-wrap\" *ngIf=\"!streamMode\">\n                <div class=\"entry\" [class.active]=\"isSelected(task.id)\">\n                    <label class=\"entry-select\" *ngIf=\"showSelect\">\n                        <input type=\"checkbox\" name=\"task-id\" value=\"{{task.id}}\" [checked]=\"isSelected(task.id)\" (change)=\"toggleSelected(task.id)\" />\n                    </label>\n                    <a class=\"entry-link\" [routerLink]=\"['/task', task.id]\">\n                        <div class=\"entry-fields\">\n                            <div class=\"task-list__reg-number expandable-level\" [class.has-expandable]=\"task.hasSubtasks || task.hasRequests\">\n                                <div class=\"entry-expander\" [class.is-expanded]=\"expandedIds.indexOf(task.id) != -1\" (click)=\"toggleExpandable(task.id, $event)\">\n                                    <i class=\"entry-expander_icon fa\"></i>\n                                </div>\n                                <span>{{task.regNumber}}</span>\n                            </div>\n                            <div class=\"task-list__title\">\n                                <span>{{task.title}}</span>\n                            </div>\n                            <div class=\"vw-icon\">\n                                <i class=\"fa fa-paperclip\" *ngIf=\"task.hasAttachments\"></i>\n                            </div>\n                            <div class=\"task-list__status\">\n                                <span class=\"status-{{task.status | text:'L'}}\">{{task.status | text:'L' | translate}}</span>\n                            </div>\n                            <div class=\"task-list__priority\">\n                                <span class=\"priority-{{task.priority | text:'L'}}\">{{task.priority | text:'L' | translate}}</span>\n                            </div>\n                            <div class=\"task-list__assignee\">\n                                <employee-input [ids]=\"[task.assigneeUserId]\"></employee-input>\n                            </div>\n                            <div class=\"task-list__start_date\">{{task.startDate | dateFmt:'DD.MM.YYYY'}}</div>\n                            <div class=\"task-list__due_date\">\n                                <span>{{task.dueDate | dateFmt:'DD.MM.YYYY'}}</span>\n                                <span>{{task.startDate | dateDuration:task.dueDate}}</span>\n                            </div>\n                            <div class=\"task-list__tags\">\n                                <tags-input [ids]=\"task.tagIds\"></tags-input>\n                            </div>\n                        </div>\n                    </a>\n                </div>\n            </div>\n            <task-stream [expandRoot]=\"streamMode\" [showSelect]=\"showSelect\" [task]=\"task\" (toggleStream)=\"onToggleStream($event)\" (loadStreamLevel)=\"onLoadStreamLevel($event)\"></task-stream>\n        </div>\n    </div>\n</div>\n"

/***/ },

/***/ 808:
/***/ function(module, exports) {

module.exports = "<div *ngFor=\"let m of stream\">\n    <div class=\"entry-wrap level-{{level}}\" *ngIf=\"m\">\n        <div class=\"entry\" *ngIf=\"m.kind == 'task'\">\n            <label class=\"entry-select\" *ngIf=\"showSelect\">\n                <input type=\"checkbox\" name=\"task-id\" value=\"{{m.id}}\" (change)=\"toggleSelected(m.id)\" />\n            </label>\n            <a class=\"entry-link\" [routerLink]=\"['/task', m.id]\">\n                <div class=\"entry-fields\">\n                    <div class=\"task-list__reg-number expandable-level\" [class.has-expandable]=\"m.hasSubtasks || m.hasRequests\">\n                        <div class=\"entry-expander\" [class.is-expanded]=\"expandedIds.indexOf(m.id) != -1\" (click)=\"toggleExpandable(m.id, $event)\">\n                            <i class=\"entry-expander_icon fa\"></i>\n                        </div>\n                        <span>{{m.regNumber}}</span>\n                    </div>\n                    <div class=\"task-list__title\">\n                        <span>{{m.title}}</span>\n                    </div>\n                    <div class=\"vw-icon\">\n                        <i class=\"fa fa-paperclip\" *ngIf=\"m.hasAttachments\"></i>\n                    </div>\n                    <div class=\"task-list__status\">\n                        <span class=\"status-{{m.status | text:'L'}}\">{{m.status | text:'L' | translate}}</span>\n                    </div>\n                    <div class=\"task-list__priority\">\n                        <span class=\"priority-{{m.priority | text:'L'}}\">{{m.priority | text:'L' | translate}}</span>\n                    </div>\n                    <div class=\"task-list__assignee\">\n                        <employee-input [ids]=\"[m.assigneeUserId]\"></employee-input>\n                    </div>\n                    <div class=\"task-list__start_date\">{{m.startDate | dateFmt:'DD.MM.YYYY'}}</div>\n                    <div class=\"task-list__due_date\">\n                        <span>{{m.dueDate | dateFmt:'DD.MM.YYYY'}}</span>\n                        <span>{{m.startDate | dateDuration:m.dueDate}}</span>\n                    </div>\n                    <div class=\"task-list__tags\">\n                        <tags-input [ids]=\"m.tagIds\"></tags-input>\n                    </div>\n                </div>\n            </a>\n        </div>\n        <div class=\"entry\" *ngIf=\"m.kind == 'request'\">\n            <label class=\"entry-select\" *ngIf=\"showSelect\">\n                <input type=\"checkbox\" value=\"{{m.id}}\" (change)=\"toggleSelected(m.id)\" />\n            </label>\n            <a class=\"entry-link\" [routerLink]=\"['/requests', m.id]\">\n                <div class=\"entry-fields\">\n                    <div class=\"task-list__request_type expandable-level\">\n                        <div class=\"entry-expander\">\n                            <i class=\"entry-expander_icon fa\"></i>\n                        </div>\n                        {{m.requestType | localizedName}}\n                    </div>\n                    <div class=\"request__time\">{{m.regDate}}</div>\n                    <div class=\"request__comment\">{{m.comment}}</div>\n                    <div class=\"request__attachments\" *ngIf=\"m.attachments && m.attachments.length\">\n                        <i class=\"fa fa-paperclip\"></i>\n                    </div>\n                    <span class=\"accepted\" *ngIf=\"m.resolution == 'ACCEPTED'\">\n                        <i class=\"fa fa-check\"></i>\n                        {{'accepted' | translate}}\n                    </span>\n                    <span class=\"declined\" *ngIf=\"m.resolution == 'DECLINED'\">\n                        <i class=\"fa fa-times\"></i>\n                        {{'declined' | translate}}\n                    </span>\n                    <div class=\"request__resolution_time\">{{m.resolutionTime | dateFmt:'DD.MM.YYYY'}}</div>\n                </div>\n            </a>\n        </div>\n        <div class=\"entry\" *ngIf=\"m.kind == 'comment'\">\n            <label class=\"entry-select\">\n                <input type=\"checkbox\" value=\"{{m.id}}\" (change)=\"toggleSelected(m.id)\" />\n            </label>\n            <div class=\"entry-link\">\n                <div class=\"entry-fields\">\n                    <div class=\"task-list__comment_comment\">{{m.comment}}</div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <task-stream *ngIf=\"m && m.kind == 'task'\" [level]=\"level\" [showSelect]=\"showSelect\" [task]=\"m\" (toggleStream)=\"onToggleStream($event)\" (loadStreamLevel)=\"onLoadStreamLevel($event)\"></task-stream>\n</div>\n"

/***/ },

/***/ 809:
/***/ function(module, exports) {

module.exports = "<form class=\"form\" *ngIf=\"isReady\">\n    <header class=\"content-header\">\n        <div class=\"content-actions\">\n            <button class=\"btn-back\" type=\"button\" title=\"{{'close' | translate}}\" (click)=\"close($event)\">\n                <i class=\"fa fa-chevron-left\"></i>\n                <span>{{'close' | translate}}</span>\n            </button>\n            <button class=\"btn btn-primary\" type=\"button\" *ngIf=\"canSaveTask()\" [disabled]=\"!isValid\" (click)=\"saveTask()\">\n                {{'save_close' | translate}}\n            </button>\n            <button class=\"btn\" type=\"button\" *ngIf=\"canRequestAction()\" (click)=\"newRequest($event)\">\n                {{'new_request' | translate}}\n            </button>\n            <button class=\"btn\" type=\"button\" *ngIf=\"canAddSubTask()\" (click)=\"addSubtask($event)\">\n                {{'add_subtask' | translate}}\n            </button>\n            <button class=\"btn\" type=\"button\" *ngIf=\"canCancelTask()\" (click)=\"cancelTask()\">\n                <i class=\"fa fa-ban\"></i>\n                <span>{{'cancel_task' | translate}}</span>\n            </button>\n            <button class=\"btn\" type=\"button\" *ngIf=\"canCompleteTask()\" (click)=\"completeTask()\">\n                <i class=\"fa fa-check-square-o\"></i>\n                <span>{{'complete_task' | translate}}</span>\n            </button>\n            <!-- <button class=\"btn\" type=\"button\" *ngIf=\"canAcknowledgedTask()\" (click)=\"acknowledgedTask()\">\n                <span>{{'acknowledged_task' | translate}}</span>\n            </button> -->\n            <div *ngIf=\"!isNew && isEditable\" dropdown class=\"buttons\" [tabIndex]=\"-1\">\n                <div dropdown-toggle>\n                    <span class=\"btn\">...</span>\n                </div>\n                <div class=\"dropdown-menu\">\n                    <ul class=\"menu\">\n                        <li>\n                            <a class=\"menu-item\" (click)=\"deleteTask()\">{{'delete' | translate}}</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n        <h1 class=\"header-title task-header-title\">\n            <a *ngIf=\"parentTask\" [routerLink]=\"['/task', parentTask.id]\" class=\"parent-task-link\">{{parentTask.title}}</a>\n            <div class=\"header-title-flex\">\n                <label>{{title | translate}}</label>\n                <input [class.invalid]=\"errors.title\" autofocus required name=\"title\" maxlength=\"140\" placeholder=\"{{'task_title' | translate}}\" [readonly]=\"!isEditable\" (keyup)=\"validateForm()\" [(ngModel)]=\"task.title\" />\n                <span class=\"task-status status-{{task.status | text:'L'}}\">{{task.status | text:'L' | translate}}</span>\n            </div>\n        </h1>\n    </header>\n    <section class=\"content-body\">\n        <section *ngIf=\"task.status == 'CANCELLED' && task.cancellationComment\" class=\"task-cancel-info\">\n            <span>{{'cancel_reason' | translate}}:&nbsp;</span><span>{{task.cancellationComment}}</span>\n        </section>\n        <div class=\"task-tabs noselect\" *ngIf=\"hasSubTasks() || hasRequests() || showACLTabTitle\">\n            <div class=\"task-tab__title\" [class.active]=\"showProperty\" [class.hidden]=\"!showPropertyTabTitle\" (click)=\"toggleShowProperty()\">{{'properties' | translate}}</div>\n            <div class=\"task-tab__title\" [class.active]=\"showSubtasks\" [class.hidden]=\"!hasSubTasks() && !hasRequests()\" (click)=\"toggleShowSubtasks()\">\n                <i class=\"fa fa-align-left\"></i>\n                <span>{{'execution' | translate}}</span>\n            </div>\n            <div class=\"task-tab__title\" [class.active]=\"showACL\" [class.hidden]=\"!showACLTabTitle\" (click)=\"toggleShowACL()\">\n                <i class='fa fa-share-alt'></i> {{'acl_tab_title' | translate}}\n            </div>\n        </div>\n        <div class=\"task-tab\" [class.active]=\"showSubtasks\" *ngIf=\"!isNew\">\n            <task-list [streamMode]=\"true\" [showSelect]=\"false\" [tasks]=\"[task]\"></task-list>\n        </div>\n        <div class=\"task-tab\" [class.active]=\"showACL\" *ngIf=\"!isNew\">\n            <div class=\"fieldset\">\n                <div class=\"form-group\">\n                    <div class=\"control-label\">\n                        {{'editors' | translate}}\n                    </div>\n                    <div class=\"controls\">\n                        <ul>\n                            <li *ngFor=\"let editor of task.acl.editors | values\">{{editor}}</li>\n                        </ul>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"control-label\">\n                        {{'readers' | translate}}\n                    </div>\n                    <div class=\"controls\">\n                        <ul>\n                            <li *ngFor=\"let reader of task.acl.readers | values\">{{reader}}</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"task-tab\" [class.active]=\"showProperty\">\n            <div class=\"fieldset\">\n                <div class=\"form-group\" *ngIf=\"task.regNumber\">\n                    <div class=\"control-label\">№</div>\n                    <div class=\"controls\">\n                        <div class=\"span2\">\n                            <div class=\"task-reg-number input\">{{task.regNumber}}</div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\" *ngIf=\"!isSubtask\">\n                    <div class=\"control-label\">\n                        {{'project' | translate}}\n                    </div>\n                    <div class=\"controls\" [class.has-error]=\"errors.projectId\">\n                        <project-input class=\"span8\" [editable]=\"isEditable\" [id]=\"task.projectId\" (select)=\"setProject($event)\"></project-input>\n                        <error-message [error]=\"errors.projectId\"></error-message>\n                    </div>\n                </div>\n                <div class=\"form-group\" *ngIf=\"!isSubtask\">\n                    <div class=\"control-label\">\n                        {{'task_type' | translate}}\n                    </div>\n                    <div class=\"controls\" [class.has-error]=\"errors.taskTypeId\">\n                        <task-type-input class=\"span8\" [editable]=\"isEditable\" [id]=\"task.taskTypeId\" (select)=\"setTaskType($event)\"></task-type-input>\n                        <error-message [error]=\"errors.taskTypeId\"></error-message>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"control-label\">\n                        {{'priority' | translate}}\n                    </div>\n                    <div class=\"controls\" [class.has-error]=\"errors.priority\">\n                        <switch-button [disabled]=\"!isEditable\" [model]=\"task\" value=\"priority\" [items]=\"taskPriorityTypes\"></switch-button>\n                        <error-message [error]=\"errors.priority\"></error-message>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"control-label\">\n                        {{'assignee_user' | translate}}\n                    </div>\n                    <div class=\"controls\" [class.has-error]=\"errors.assigneeUserId\">\n                        <employee-input class=\"span8\" [editable]=\"isEditable\" [ids]=\"[task.assigneeUserId]\" (select)=\"setAssigneeUser($event)\"></employee-input>\n                        <error-message [error]=\"errors.assigneeUserId\"></error-message>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"control-label\">\n                        {{'start_date' | translate}}\n                    </div>\n                    <div class=\"controls\" [class.has-error]=\"errors.startDate\">\n                        <div class=\"span2\" *ngIf=\"!isEditable\">\n                            <span class=\"input\">{{task.startDate}}</span>\n                        </div>\n                        <input datepicker class=\"span2\" *ngIf=\"isEditable\" name=\"startDate\" (select)=\"setStartDate($event)\" [(ngModel)]=\"task.startDate\" />\n                        <error-message [error]=\"errors.startDate\"></error-message>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"control-label\">\n                        {{'due_date' | translate}}\n                    </div>\n                    <div class=\"controls\" [class.has-error]=\"errors.dueDate\">\n                        <div class=\"span2\" *ngIf=\"!isEditable\">\n                            <span class=\"input\">{{task.dueDate}}</span>\n                        </div>\n                        <input datepicker class=\"span2\" *ngIf=\"isEditable\" name=\"dueDate\" (select)=\"setDueDate($event)\" [(ngModel)]=\"task.dueDate\" />\n                        <span>{{task.startDate | dateDuration:task.dueDate}}</span>\n                        <error-message [error]=\"errors.dueDate\"></error-message>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"control-label\">\n                        {{'tags' | translate}}\n                    </div>\n                    <div class=\"controls\" [class.has-error]=\"errors.tagIds\">\n                        <tags-input class=\"span8\" [editable]=\"isEditable\" [ids]=\"task.tagIds\" (select)=\"setTags($event)\"></tags-input>\n                        <error-message [error]=\"errors.tagIds\"></error-message>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"control-label\"></div>\n                    <div class=\"controls\">\n                        <label class=\"input\" [class.disabled]=\"!isEditable\">\n                            <input type=\"checkbox\" name=\"customerObservation\" value=\"1\" [disabled]=\"!isEditable\" [(ngModel)]=\"task.customerObservation\" />\n                            <span>{{'publish_to_customer' | translate}}</span>\n                        </label>\n                    </div>\n                </div>\n                <div class=\"form-group\" [class.has-error]=\"errors.body\">\n                    <markdown-editor placeHolder=\"{{'body' | translate}}\" [markdown]=\"task.body || ''\" [editable]=\"isEditable\" [updateTimeout]=\"300\" (update)=\"updateTaskBody($event)\"></markdown-editor>\n                    <error-message [error]=\"errors.body\"></error-message>\n                </div>\n            </div>\n            <attachments [editable]=\"isEditable\" [model]=\"task\" (upload)=\"addAttachment($event)\" (delete)=\"deleteAttachment($event)\"></attachments>\n        </div>\n        <comments *ngIf=\"showComments()\" [comments]=\"comments\" (add)=\"saveComment($event)\" (update)=\"saveComment($event)\" (delete)=\"deleteComment($event)\"></comments>\n    </section>\n    <footer class=\"content-footer\">\n        <div class=\"record-author\" *ngIf=\"task.authorId\">\n            <span>{{'author' | translate}}</span>\n            <employee-input [editable]=\"false\" [ids]=\"[task.authorId]\"></employee-input>\n            <span>{{task.regDate}}</span>\n        </div>\n    </footer>\n</form>\n<task-cancel-dialog *ngIf=\"showTaskCancelDialog\" (confirm)=\"onConfirmTaskCancelDialog($event)\" (cancel)=\"onCancelTaskCancelDialog()\"></task-cancel-dialog>\n"

/***/ },

/***/ 810:
/***/ function(module, exports) {

module.exports = "<div class=\"content-header\">\n    <h1 class=\"header-title\">\n        {{title | translate}}\n        <sup *ngIf=\"!loading && meta.count\">({{meta.count}})</sup>\n    </h1>\n    <div class=\"content-actions\">\n        <button class=\"btn\" type=\"button\" (click)=\"newTask()\">\n            {{'new_task' | translate}}\n        </button>\n        <button class=\"btn btn-refresh\" type=\"button\" (click)=\"refresh()\">\n            <i class=\"fa fa-refresh\"></i>\n        </button>\n        <task-filter (change)=\"changeFilter($event)\"></task-filter>\n        <pagination [totalPages]=\"meta.totalPages\" [page]=\"meta.page\" (change)=\"goToPage($event)\"></pagination>\n    </div>\n</div>\n<div class=\"content-body\" [class.load]=\"loading\">\n    <task-list [tasks]=\"tasks\" (toggleStream)=\"onToggleStream($event)\"></task-list>\n</div>\n<router-outlet></router-outlet>\n"

/***/ },

/***/ 811:
/***/ function(module, exports) {

module.exports = "<form class=\"form form-userprofile\" autocomplete=\"off\" *ngIf=\"user\">\n    <header class=\"content-header\">\n        <div class=\"content-actions\">\n            <button class=\"btn-back\" type=\"button\" (click)=\"close($event)\">\n                <i class=\"fa fa-chevron-left\"></i>\n                <span>{{'close' | translate}}</span>\n            </button>\n            <button class=\"btn btn-primary\" type=\"button\" (click)=\"updateUserProfile()\">\n                {{'save_close' | translate}}\n            </button>\n        </div>\n        <h1 class=\"header-title\">\n            {{'employee' | translate}} / {{user.name}}\n        </h1>\n    </header>\n    <section class=\"content-body\">\n        <tabs>\n            <tab class=\"tab-pane\" tabTitle=\"{{'properties' | translate}}\">\n                <!--<fieldset class=\"fieldset fieldset-user-avatar\">\n                            <img class=\"user-avatar\" src=\"img/avatar.png\"/>\n                </fieldset>-->\n                <fieldset class=\"fieldset fieldset-user-fields\">\n                    <!-- <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'user_name' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <span class=\"input-placeholder\">\n                                {{user.name}}\n                            </span>\n                        </div>\n                    </div> -->\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'login_name' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <input type=\"text\" class=\"span4\" ngControl=\"login\" />\n                        </div>\n                    </div>\n                    <div class=\"form-group\" *ngIf=\"!changePassword\">\n                        <div class=\"control-label\"></div>\n                        <div class=\"controls\">\n                            <span class=\"btn btn-xs\" (click)=\"toggleChangePassword()\">{{'change_password' | translate}}</span>\n                        </div>\n                    </div>\n                    <div class=\"form-group\" *ngIf=\"changePassword\">\n                        <div class=\"control-label\">\n                            {{'password' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.pwd\">\n                            <input type=\"password\" name=\"pwd\" class=\"span4\" [class.invalid]=\"errors.pwd\" ngControl=\"pwd\" />\n                        </div>\n                    </div>\n                    <div class=\"form-group\" *ngIf=\"changePassword\">\n                        <div class=\"control-label\">\n                            {{'password_new' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.pwd_new\">\n                            <input type=\"password\" name=\"pwd_new\" class=\"span4\" [class.invalid]=\"errors.pwd_new\" ngControl=\"pwd_new\" />\n                        </div>\n                    </div>\n                    <div class=\"form-group\" *ngIf=\"changePassword\">\n                        <div class=\"control-label\">\n                            {{'password_confirm' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.pwd_confirm\">\n                            <input type=\"password\" name=\"pwd_confirm\" class=\"span4\" [class.invalid]=\"errors.pwd_confirm\" ngControl=\"pwd_confirm\" />\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'email' | translate}}\n                        </div>\n                        <div class=\"controls\" [class.has-error]=\"errors.email\">\n                            <input type=\"email\" name=\"email\" class=\"span4\" [class.invalid]=\"errors.email\" ngControl=\"email\" />\n                            <div class=\"error-message\">{{errors.email | translate}}</div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\" *ngIf=\"user.organization\">\n                        <div class=\"control-label\">\n                            {{'org_name' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <span class=\"input-placeholder\">\n                                {{user.organization}}\n                            </span>\n                        </div>\n                    </div>\n                    <div class=\"form-group\" *ngIf=\"user.department\">\n                        <div class=\"control-label\">\n                            {{'department' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <span class=\"input-placeholder\">\n                                {{user.department}}\n                            </span>\n                        </div>\n                    </div>\n                    <div class=\"form-group\" *ngIf=\"user.position\">\n                        <div class=\"control-label\">\n                            {{'position' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <span class=\"input-placeholder\">\n                                {{user.position}}\n                            </span>\n                        </div>\n                    </div>\n                    <div class=\"form-group\" *ngIf=\"user.roles\">\n                        <div class=\"control-label\">\n                            {{'roles' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <ul class=\"input-placeholder list-style-none\">\n                                <li *ngFor=\"let role of user.roles\">{{role.localizedName[language]}}</li>\n                            </ul>\n                        </div>\n                    </div>\n                </fieldset>\n            </tab>\n            <tab class=\"tab-pane\" tabTitle=\"{{'interface' | translate}}\">\n                <fieldset class=\"fieldset\">\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'limit_view' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <select name=\"pagesize\" class=\"span2\" (change)=\"changePageSize($event)\">\n                                <option value=\"{{ps}}\" [selected]=\"ps == pageSize\" *ngFor=\"let ps of pageSizes\">{{ps}}</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <div class=\"control-label\">\n                            {{'interface_lang' | translate}}\n                        </div>\n                        <div class=\"controls\">\n                            <select name=\"lang\" class=\"span2\" (change)=\"changeLang($event)\">\n                                <option value=\"{{langCode}}\" [selected]=\"langCode == language\" *ngFor=\"let langCode of languages | keys\">\n                                    {{languages[langCode]}}\n                                </option>\n                            </select>\n                        </div>\n                    </div>\n                    <!-- <div class=\"form-group\">\n                        <div class=\"control-label\"></div>\n                        <div class=\"controls\">\n                            <a href=\"javascript:void(0)\" data-toggle-theme=\"theme1\" class=\"input-placeholder\">\n                                {{'change_skin' | translate}}\n                            </a>\n                        </div>\n                    </div> -->\n                </fieldset>\n            </tab>\n        </tabs>\n    </section>\n</form>\n"

/***/ },

/***/ 819:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(3);
var ScalarObservable_1 = __webpack_require__(499);
var EmptyObservable_1 = __webpack_require__(165);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayLikeObservable = (function (_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
        _super.call(this);
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
    }
    ArrayLikeObservable.create = function (arrayLike, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (length === 1) {
            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, scheduler);
        }
    };
    ArrayLikeObservable.dispatch = function (state) {
        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
        if (subscriber.closed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < length && !subscriber.closed; i++) {
                subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayLikeObservable;
}(Observable_1.Observable));
exports.ArrayLikeObservable = ArrayLikeObservable;
//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ },

/***/ 822:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1 = __webpack_require__(98);
var isPromise_1 = __webpack_require__(515);
var PromiseObservable_1 = __webpack_require__(498);
var IteratorObservable_1 = __webpack_require__(823);
var ArrayObservable_1 = __webpack_require__(117);
var ArrayLikeObservable_1 = __webpack_require__(819);
var iterator_1 = __webpack_require__(349);
var Observable_1 = __webpack_require__(3);
var observeOn_1 = __webpack_require__(507);
var observable_1 = __webpack_require__(350);
var isArrayLike = (function (x) { return x && typeof x.length === 'number'; });
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromObservable = (function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * @example <caption>Converts an array to an Observable</caption>
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link fromEvent}
     * @see {@link fromEventPattern}
     * @see {@link fromPromise}
     *
     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * emissions of values.
     * @return {Observable<T>} The Observable whose values are originally from the
     * input object that was converted.
     * @static true
     * @name from
     * @owner Observable
     */
    FromObservable.create = function (ish, scheduler) {
        if (ish != null) {
            if (typeof ish[observable_1.$$observable] === 'function') {
                if (ish instanceof Observable_1.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray_1.isArray(ish)) {
                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
            }
            else if (isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable_1.$$observable]().subscribe(subscriber);
        }
        else {
            return ish[observable_1.$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(Observable_1.Observable));
exports.FromObservable = FromObservable;
//# sourceMappingURL=FromObservable.js.map

/***/ },

/***/ 823:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(61);
var Observable_1 = __webpack_require__(3);
var iterator_1 = __webpack_require__(349);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IteratorObservable = (function (_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function (iterator, scheduler) {
        return new IteratorObservable(iterator, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
        var index = state.index, hasError = state.hasError, iterator = state.iterator, subscriber = state.subscriber;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        var result = iterator.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        subscriber.next(result.value);
        state.index = index + 1;
        if (subscriber.closed) {
            return;
        }
        this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, iterator = _a.iterator, scheduler = _a.scheduler;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, iterator: iterator, subscriber: subscriber
            });
        }
        else {
            do {
                var result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.closed) {
                    break;
                }
            } while (true);
        }
    };
    return IteratorObservable;
}(Observable_1.Observable));
exports.IteratorObservable = IteratorObservable;
var StringIterator = (function () {
    function StringIterator(str, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = str.length; }
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    StringIterator.prototype[iterator_1.$$iterator] = function () { return (this); };
    StringIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    };
    return StringIterator;
}());
var ArrayIterator = (function () {
    function ArrayIterator(arr, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = toLength(arr); }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    ArrayIterator.prototype[iterator_1.$$iterator] = function () { return this; };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    };
    return ArrayIterator;
}());
function getIterator(obj) {
    var i = obj[iterator_1.$$iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('object is not iterable');
    }
    return obj[iterator_1.$$iterator]();
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
}
function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}
//# sourceMappingURL=IteratorObservable.js.map

/***/ },

/***/ 833:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(17);
var EmptyError_1 = __webpack_require__(352);
/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * @example <caption>Emit only the first click that happens on the DOM</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Emits the first click that happens on a DIV</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
 * An optional function called with each item to test for condition matching.
 * @param {function(value: T, index: number): R} [resultSelector] A function to
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * @param {R} [defaultValue] The default value emitted in case no valid value
 * was found on the source.
 * @return {Observable<T|R>} an Observable of the first item that matches the
 * condition.
 * @method first
 * @owner Observable
 */
function first(predicate, resultSelector, defaultValue) {
    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
}
exports.first = first;
var FirstOperator = (function () {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    FirstOperator.prototype.call = function (observer, source) {
        return source._subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return FirstOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FirstSubscriber = (function (_super) {
    __extends(FirstSubscriber, _super);
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
    }
    FirstSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._emit = function (value, index) {
        if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
        }
        this._emitFinal(value);
    };
    FirstSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this._emitFinal(result);
    };
    FirstSubscriber.prototype._emitFinal = function (value) {
        var destination = this.destination;
        destination.next(value);
        destination.complete();
        this.hasCompleted = true;
    };
    FirstSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
            destination.complete();
        }
        else if (!this.hasCompleted) {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return FirstSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=first.js.map

/***/ },

/***/ 834:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(17);
var EmptyError_1 = __webpack_require__(352);
/**
 * Returns an Observable that emits only the last item emitted by the source Observable.
 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
 * the last item from the source Observable, the resulting Observable will emit the last item
 * from the source Observable that satisfies the predicate.
 *
 * <img src="./img/last.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * @param {function} predicate - the condition any source emitted item has to satisfy.
 * @return {Observable} an Observable that emits only the last item satisfying the given condition
 * from the source, or an NoSuchElementException if no such items are emitted.
 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
 * @method last
 * @owner Observable
 */
function last(predicate, resultSelector, defaultValue) {
    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
}
exports.last = last;
var LastOperator = (function () {
    function LastOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    LastOperator.prototype.call = function (observer, source) {
        return source._subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return LastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var LastSubscriber = (function (_super) {
    __extends(LastSubscriber, _super);
    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.hasValue = false;
        this.index = 0;
        if (typeof defaultValue !== 'undefined') {
            this.lastValue = defaultValue;
            this.hasValue = true;
        }
    }
    LastSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
        }
    };
    LastSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
        }
    };
    LastSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.lastValue = result;
        this.hasValue = true;
    };
    LastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.hasValue) {
            destination.next(this.lastValue);
            destination.complete();
        }
        else {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return LastSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=last.js.map

/***/ },

/***/ 836:
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(17);
/**
 * Applies an accumulator function over the source Observable, and returns the
 * accumulated result when the source completes, given an optional seed value.
 *
 * <span class="informal">Combines together all values emitted on the source,
 * using an accumulator function that knows how to join a new source value into
 * the accumulation from the past.</span>
 *
 * <img src="./img/reduce.png" width="100%">
 *
 * Like
 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
 * `reduce` applies an `accumulator` function against an accumulation and each
 * value of the source Observable (from the past) to reduce it to a single
 * value, emitted on the output Observable. Note that `reduce` will only emit
 * one value, only when the source Observable completes. It is equivalent to
 * applying operator {@link scan} followed by operator {@link last}.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events that happened in 5 seconds</caption>
 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
 *   .takeUntil(Rx.Observable.interval(5000));
 * var ones = clicksInFiveSeconds.mapTo(1);
 * var seed = 0;
 * var count = ones.reduce((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link count}
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link scan}
 *
 * @param {function(acc: R, value: T): R} accumulator The accumulator function
 * called on each source value.
 * @param {R} [seed] The initial accumulation value.
 * @return {Observable<R>} An observable of the accumulated values.
 * @return {Observable<R>} An Observable that emits a single value that is the
 * result of accumulating the values emitted by the source Observable.
 * @method reduce
 * @owner Observable
 */
function reduce(accumulator, seed) {
    return this.lift(new ReduceOperator(accumulator, seed));
}
exports.reduce = reduce;
var ReduceOperator = (function () {
    function ReduceOperator(accumulator, seed) {
        this.accumulator = accumulator;
        this.seed = seed;
    }
    ReduceOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed));
    };
    return ReduceOperator;
}());
exports.ReduceOperator = ReduceOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ReduceSubscriber = (function (_super) {
    __extends(ReduceSubscriber, _super);
    function ReduceSubscriber(destination, accumulator, seed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this.hasValue = false;
        this.acc = seed;
        this.accumulator = accumulator;
        this.hasSeed = typeof seed !== 'undefined';
    }
    ReduceSubscriber.prototype._next = function (value) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
            this._tryReduce(value);
        }
        else {
            this.acc = value;
            this.hasValue = true;
        }
    };
    ReduceSubscriber.prototype._tryReduce = function (value) {
        var result;
        try {
            result = this.accumulator(this.acc, value);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.acc = result;
    };
    ReduceSubscriber.prototype._complete = function () {
        if (this.hasValue || this.hasSeed) {
            this.destination.next(this.acc);
        }
        this.destination.complete();
    };
    return ReduceSubscriber;
}(Subscriber_1.Subscriber));
exports.ReduceSubscriber = ReduceSubscriber;
//# sourceMappingURL=reduce.js.map

/***/ },

/***/ 856:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return StaffActions; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StaffActions = (function () {
    function StaffActions() {
    }
    StaffActions.prototype.fetchOrganizations = function (organizations) {
        return {
            type: StaffActions.FETCH_ORGANIZATIONS,
            payload: { organizations: organizations }
        };
    };
    StaffActions.prototype.fetchEmployees = function (employees) {
        return {
            type: StaffActions.FETCH_EMPLOYEES,
            payload: { employees: employees }
        };
    };
    StaffActions.FETCH_ORGANIZATIONS = 'FETCH_ORGANIZATIONS';
    StaffActions.FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
    StaffActions = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], StaffActions);
    return StaffActions;
}());


/***/ },

/***/ 857:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TaskActions; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TaskActions = (function () {
    function TaskActions() {
    }
    TaskActions.prototype.createTask = function (task) {
        return {
            type: TaskActions.CREATE_TASK,
            payload: {
                task: task
            }
        };
    };
    TaskActions.prototype.createTaskFailed = function (error) {
        return {
            type: TaskActions.CREATE_TASK_FAILED,
            payload: error
        };
    };
    TaskActions.prototype.createTaskFulfilled = function (task) {
        return {
            type: TaskActions.CREATE_TASK_FULFILLED,
            payload: {
                task: task
            }
        };
    };
    TaskActions.prototype.fetchTasks = function () {
        return {
            type: TaskActions.FETCH_TASKS
        };
    };
    TaskActions.prototype.fetchTasksFailed = function (error) {
        return {
            type: TaskActions.FETCH_TASKS_FAILED,
            payload: error
        };
    };
    TaskActions.prototype.fetchTasksFulfilled = function (tasks, meta) {
        return {
            type: TaskActions.FETCH_TASKS_FULFILLED,
            payload: {
                tasks: tasks,
                meta: meta
            }
        };
    };
    TaskActions.prototype.fetchTask = function (taskId) {
        return {
            type: TaskActions.FETCH_TASK
        };
    };
    TaskActions.prototype.fetchTaskFailed = function (error) {
        return {
            type: TaskActions.FETCH_TASK_FAILED,
            payload: error
        };
    };
    TaskActions.prototype.fetchTaskFulfilled = function (task) {
        return {
            type: TaskActions.FETCH_TASK_FULFILLED,
            payload: {
                task: task
            }
        };
    };
    TaskActions.prototype.updateTask = function (taskId, changes) {
        return {
            type: TaskActions.UPDATE_TASK,
            payload: {
                changes: changes,
                taskId: taskId
            }
        };
    };
    TaskActions.prototype.updateTaskFailed = function (error) {
        return {
            type: TaskActions.UPDATE_TASK_FAILED,
            payload: error
        };
    };
    TaskActions.prototype.updateTaskFulfilled = function (task) {
        return {
            type: TaskActions.UPDATE_TASK_FULFILLED,
            payload: {
                task: task
            }
        };
    };
    TaskActions.prototype.deleteTask = function (taskId) {
        return {
            type: TaskActions.DELETE_TASK,
            payload: {
                taskId: taskId
            }
        };
    };
    TaskActions.prototype.deleteTaskFailed = function (error) {
        return {
            type: TaskActions.DELETE_TASK_FAILED,
            payload: error
        };
    };
    TaskActions.prototype.deleteTaskFulfilled = function (task) {
        return {
            type: TaskActions.DELETE_TASK_FULFILLED,
            payload: {
                task: task
            }
        };
    };
    TaskActions.prototype.toggleStreamExpand = function (id) {
        return {
            type: TaskActions.TOGGLE_STREAM_EXPAND,
            payload: id
        };
    };
    TaskActions.prototype.setFilter = function (filter) {
        return {
            type: TaskActions.SET_FILTER,
            payload: filter
        };
    };
    TaskActions.CREATE_TASK = 'CREATE_TASK';
    TaskActions.CREATE_TASK_FAILED = 'CREATE_TASK_FAILED';
    TaskActions.CREATE_TASK_FULFILLED = 'CREATE_TASK_FULFILLED';
    TaskActions.TASK_UNLOAD = 'TASK_UNLOAD';
    TaskActions.FETCH_TASKS = 'FETCH_TASKS';
    TaskActions.FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';
    TaskActions.FETCH_TASKS_FULFILLED = 'FETCH_TASKS_FULFILLED';
    TaskActions.FETCH_TASK = 'FETCH_TASK';
    TaskActions.FETCH_TASK_FAILED = 'FETCH_TASK_FAILED';
    TaskActions.FETCH_TASK_FULFILLED = 'FETCH_TASK_FULFILLED';
    TaskActions.UPDATE_TASK = 'UPDATE_TASK';
    TaskActions.UPDATE_TASK_FAILED = 'UPDATE_TASK_FAILED';
    TaskActions.UPDATE_TASK_FULFILLED = 'UPDATE_TASK_FULFILLED';
    TaskActions.DELETE_TASK = 'DELETE_TASK';
    TaskActions.DELETE_TASK_FAILED = 'DELETE_TASK_FAILED';
    TaskActions.DELETE_TASK_FULFILLED = 'DELETE_TASK_FULFILLED';
    TaskActions.TOGGLE_STREAM_EXPAND = 'TOGGLE_STREAM_EXPAND';
    TaskActions.SET_FILTER = 'SET_FILTER';
    TaskActions.CREATE_TASK_COMMENT = 'CREATE_COMMENT_TASK';
    TaskActions.CREATE_TASK_COMMENT_FAILED = 'CREATE_TASK_COMMENT_FAILED';
    TaskActions.CREATE_TASK_COMMENT_FULFILLED = 'CREATE_TASK_COMMENT_FULFILLED';
    TaskActions.FETCH_TASK_COMMENTS = 'FETCH_TASK_COMMENTS';
    TaskActions.FETCH_TASK_COMMENTS_FAILED = 'FETCH_TASK_COMMENTS_FAILED';
    TaskActions.FETCH_TASK_COMMENTS_FULFILLED = 'FETCH_TASK_COMMENTS_FULFILLED';
    TaskActions.UPDATE_TASK_COMMENT = 'UPDATE_TASK_COMMENT';
    TaskActions.UPDATE_TASK_COMMENT_FAILED = 'UPDATE_TASK_COMMENT_FAILED';
    TaskActions.UPDATE_TASK_COMMENT_FULFILLED = 'UPDATE_TASK_COMMENT_FULFILLED';
    TaskActions.DELETE_TASK_COMMENT = 'DELETE_TASK_COMMENT';
    TaskActions.DELETE_TASK_COMMENT_FAILED = 'DELETE_TASK_COMMENT_FAILED';
    TaskActions.DELETE_TASK_COMMENT_FULFILLED = 'DELETE_TASK_COMMENT_FULFILLED';
    TaskActions.TASK_REQUEST_ACCEPTANCE = 'TASK_REQUEST_ACCEPTANCE';
    TaskActions.TASK_REQUEST_NEW = 'TASK_REQUEST_NEW';
    TaskActions.TASK_REQUEST_CANCEL = 'TASK_REQUEST_CANCEL';
    TaskActions.CREATE_TASK_REQUEST = 'CREATE_REQUEST_TASK';
    TaskActions.CREATE_TASK_REQUEST_FAILED = 'CREATE_TASK_REQUEST_FAILED';
    TaskActions.CREATE_TASK_REQUEST_FULFILLED = 'CREATE_TASK_REQUEST_FULFILLED';
    TaskActions.FETCH_TASK_REQUESTS = 'FETCH_TASK_REQUESTS';
    TaskActions.FETCH_TASK_REQUESTS_FAILED = 'FETCH_TASK_REQUESTS_FAILED';
    TaskActions.FETCH_TASK_REQUESTS_FULFILLED = 'FETCH_TASK_REQUESTS_FULFILLED';
    TaskActions = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], TaskActions);
    return TaskActions;
}());


/***/ },

/***/ 858:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_guard__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_dashboard_dashboard__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_project_projects__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_project_project__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_task_tasks__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_task_task__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_request_request__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_user_profile_user_profile__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_login__ = __webpack_require__(520);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return APP_ROUTING; });









var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_5__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__components_dashboard_dashboard__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'projects/:projectId/tasks', component: __WEBPACK_IMPORTED_MODULE_5__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'projects/:projectId', component: __WEBPACK_IMPORTED_MODULE_4__components_project_project__["a" /* ProjectComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'projects', component: __WEBPACK_IMPORTED_MODULE_3__components_project_projects__["a" /* ProjectsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'tasks/:for', component: __WEBPACK_IMPORTED_MODULE_5__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'tasks', component: __WEBPACK_IMPORTED_MODULE_5__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'task/:taskId/:new', component: __WEBPACK_IMPORTED_MODULE_6__components_task_task__["a" /* TaskComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'task/:taskId', component: __WEBPACK_IMPORTED_MODULE_6__components_task_task__["a" /* TaskComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'requests/:requestId', component: __WEBPACK_IMPORTED_MODULE_7__components_request_request__["a" /* RequestComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'user-profile', component: __WEBPACK_IMPORTED_MODULE_8__components_user_profile_user_profile__["a" /* UserProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_9__components_login__["a" /* LoginComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_5__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__auth_guard__["a" /* AuthGuard */]] }
];
var APP_ROUTING = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(routes, { useHash: true });


/***/ },

/***/ 859:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models__ = __webpack_require__(44);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return AppComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = (function () {
    function AppComponent(store, appActions, referenceActions, staffActions, appService, referenceService, staffService, translate) {
        var _this = this;
        this.store = store;
        this.appActions = appActions;
        this.referenceActions = referenceActions;
        this.staffActions = staffActions;
        this.appService = appService;
        this.referenceService = referenceService;
        this.staffService = staffService;
        this.translate = translate;
        this.subs = [];
        this.isReady = false;
        this.loggedUser = new __WEBPACK_IMPORTED_MODULE_5__models__["b" /* User */]();
        this.HEADER_TITLE = 'Projects';
        this.isNavCollapsed = false;
        this.isSearchOpen = false;
        this.isMobileDevice = false;
        this.subs.push(this.store.select('authed').subscribe(function (data) {
            _this.loggedUser = data.userProfile;
        }));
        this.subs.push(this.store.select('reference'));
        this.subs.push(this.store.select('environment').subscribe(function (state) {
            _this.isSearchOpen = state.isSearchOpen;
            _this.isNavCollapsed = !state.isNavOpen;
        }));
    }
    AppComponent.prototype.resize = function (window) { this.onResize(window); };
    ;
    Object.defineProperty(AppComponent.prototype, "device", {
        get: function () { return this.isMobileDevice; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "toggleNavVisible", {
        get: function () { return this.isNavCollapsed; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AppComponent.prototype, "toggleSearch", {
        get: function () { return this.isSearchOpen; },
        enumerable: true,
        configurable: true
    });
    ;
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.appService.fetchUserProfile().subscribe(function (data) {
            _this.store.dispatch(_this.appActions.fetchUserProfileFulfilled(data));
            _this.isReady = true;
        });
        this.referenceService.fetchTags().subscribe(function (payload) {
            _this.store.dispatch(_this.referenceActions.fetchTags(payload.tags));
        });
        this.referenceService.fetchTaskTypes().subscribe(function (payload) {
            _this.store.dispatch(_this.referenceActions.fetchTaskTypes(payload.taskTypes));
        });
        this.referenceService.fetchRequestTypes().subscribe(function (payload) {
            _this.store.dispatch(_this.referenceActions.fetchRequestTypes(payload.requestTypes));
        });
        this.staffService.fetchOrganizations().subscribe(function (payload) {
            _this.store.dispatch(_this.staffActions.fetchOrganizations(payload.organizations));
        });
        this.staffService.fetchEmployees().subscribe(function (payload) {
            _this.store.dispatch(_this.staffActions.fetchEmployees(payload.employees));
        });
        this.isMobileDevice = this.isMobile();
        var userLang = navigator.language.split('-')[0];
        userLang = /(ru|en)/gi.test(userLang) ? userLang : 'en';
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        this.translate.get('brand').subscribe(function (value) { return _this.HEADER_TITLE = value; });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    AppComponent.prototype.hideNav = function (event) {
        this.store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_3__actions__["a" /* EnvironmentActions */].HIDE_NAV });
        event.preventDefault();
    };
    AppComponent.prototype.isMobile = function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    AppComponent.prototype.onResize = function (window) {
        this.isMobileDevice = window.innerWidth <= 1024 || this.isMobile();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('window:resize', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], AppComponent.prototype, "resize", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.phone'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "device", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.side-nav-toggle'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "toggleNavVisible", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.search-open'), 
        __metadata('design:type', Object)
    ], AppComponent.prototype, "toggleSearch", null);
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app',
            template: __webpack_require__(800)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_3__actions__["b" /* AppActions */], __WEBPACK_IMPORTED_MODULE_3__actions__["c" /* ReferenceActions */], __WEBPACK_IMPORTED_MODULE_3__actions__["d" /* StaffActions */], __WEBPACK_IMPORTED_MODULE_4__services__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_4__services__["b" /* ReferenceService */], __WEBPACK_IMPORTED_MODULE_4__services__["c" /* StaffService */], __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["TranslateService"]])
    ], AppComponent);
    return AppComponent;
}());


/***/ },

/***/ 860:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(45);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return AttachmentsComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AttachmentsComponent = (function () {
    function AttachmentsComponent(http, uploadService) {
        this.http = http;
        this.uploadService = uploadService;
        this.editable = false;
        this.upload = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.delete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.progress = 0;
    }
    AttachmentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.uploadService.progress$.subscribe(function (progress) {
            if (progress && progress < 100) {
                _this.progress = progress;
            }
            else {
                _this.progress = 0;
            }
        });
    };
    AttachmentsComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    AttachmentsComponent.prototype.isThumbnailSupported = function (att) {
        if (att.extension) {
            return ['jpeg', 'jpg', 'png', 'gif'].indexOf(att.extension) != -1;
        }
        else {
            return ['jpeg', 'jpg', 'png', 'gif'].indexOf(att.realFileName.toLowerCase().split('.').pop()) != -1;
        }
    };
    Object.defineProperty(AttachmentsComponent.prototype, "isHidden", {
        get: function () {
            return !this.editable && !this.model.attachments;
        },
        enumerable: true,
        configurable: true
    });
    AttachmentsComponent.prototype.uploadFile = function (files) {
        var _this = this;
        this.uploadService.makeFileRequest('UploadFile?time=' + Date.now(), { fsid: this.model.fsid }, files).subscribe(function (response) {
            _this.upload.emit({ response: response, files: files });
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AttachmentsComponent.prototype, "model", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], AttachmentsComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], AttachmentsComponent.prototype, "upload", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], AttachmentsComponent.prototype, "delete", void 0);
    AttachmentsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'attachments',
            template: "\n        <div class=\"attachments\">\n            <i class=\"fa fa-paperclip\" *ngIf=\"!editable\"></i>\n            <label class=\"btn btn-upload\" title=\"{{'attach_file' | translate}}\" *ngIf=\"editable\">\n                <i class=\"fa fa-paperclip\"></i>\n                <span>{{'attach_file' | translate}}</span>\n                <input type=\"file\" (change)=\"uploadFile($event.target.files)\" style=\"display:none;\"/>\n            </label>\n            <div class=\"attachment-list\" *ngIf=\"!isHidden\">\n                <div class=\"attachment-list__item\" *ngFor=\"let att of model.attachments\">\n                    <div class=\"attachment\">\n                        <a class=\"attachment__link\" title=\"{{att.realFileName}}\" href=\"{{model.url}}&attachment={{att.id}}\">{{att.realFileName}}</a>\n                        <img img-view *ngIf=\"isThumbnailSupported(att)\"\n                            [url]=\"att.base64 || model.url + '&attachment=' + att.id\"\n                            [src]=\"att.base64 || model.url + '&attachment=' + att.id + '&_thumbnail'\" />\n                        <span class=\"attachment__size\">{{model.size}}</span>\n                        <button type=\"button\" class=\"btn btn-sm btn-link btn-remove\" *ngIf=\"editable\" (click)=\"delete.emit(att)\">\n                            <i class=\"fa fa-times\"></i>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [__WEBPACK_IMPORTED_MODULE_2__services__["f" /* UploadService */]],
            host: {
                '[class.hidden]': 'isHidden'
            }
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2__services__["f" /* UploadService */]])
    ], AttachmentsComponent);
    return AttachmentsComponent;
}());


/***/ },

/***/ 861:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(44);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return CommentComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommentComponent = (function () {
    function CommentComponent() {
        this.editable = false;
        this.save = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.delete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.saving = false;
        this.edit = false;
    }
    CommentComponent.prototype.toggleEdit = function () {
        this.edit = this.editable && !this.edit;
        if (this.edit) {
            this.commentText = this.comment.comment;
        }
        else {
            this.commentText = '';
        }
    };
    CommentComponent.prototype.setCommentText = function (text) {
        this.commentText = text;
    };
    CommentComponent.prototype.saveComment = function () {
        this.comment.comment = this.commentText;
        this.saving = true;
        this.save.emit(this.comment);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1__models__["e" /* Comment */])
    ], CommentComponent.prototype, "comment", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], CommentComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], CommentComponent.prototype, "save", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], CommentComponent.prototype, "delete", void 0);
    CommentComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'comment',
            template: "\n        <div class=\"comment\" [class.edit]=\"edit\" [class.saving]=\"saving\">\n            <div class=\"comment__avatar\"></div>\n            <div class=\"comment__details\">\n                <span class=\"comment__author\">\n                    <employee-input [editable]=\"false\" [ids]=\"[comment.authorId]\"></employee-input>\n                </span>\n                <span class=\"comment__time\">{{comment.regDate}}</span>\n                <p class=\"comment__text\" *ngIf=\"!edit\" innerHTML=\"{{comment.comment | marked}}\"></p>\n                <div class=\"comment__editor\" *ngIf=\"edit\">\n                    <markdown-editor\n                        markdown=\"{{comment.comment}}\"\n                        editable=\"true\"\n                        placeHolder=\"{{'add_comment' | translate}}\"\n                        (update)=\"setCommentText($event)\">\n                    </markdown-editor>\n                    <button type=\"button\" class=\"btn btn-cancel\" [disabled]=\"saving\" (click)=\"toggleEdit()\">{{'cancel' | translate}}</button>\n                    <button type=\"button\" class=\"btn btn-primary btn-save\" [disabled]=\"saving\" (click)=\"saveComment()\">{{'save' | translate}}</button>\n                </div>\n                <!-- <attachments\n                    [model]=\"comment\"\n                    (upload)=\"addAttachment($event)\"\n                    (delete)=\"deleteAttachment($event)\">\n                </attachments> -->\n            </div>\n            <div class=\"comment__buttons\" *ngIf=\"editable\">\n                <button type=\"button\" class=\"btn btn-sm\" *ngIf=\"!edit\" (click)=\"toggleEdit()\">\n                    <i class=\"fa fa-pencil\"></i>{{'edit' | translate}}\n                </button>\n                <button type=\"button\" class=\"btn btn-sm\" title=\"{{'delete' | translate}}\" (click)=\"delete.emit(comment)\">\n                    <i class=\"fa fa-remove\"></i>\n                </button>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CommentComponent);
    return CommentComponent;
}());


/***/ },

/***/ 862:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(44);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return CommentsComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommentsComponent = (function () {
    function CommentsComponent() {
        this.add = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.update = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.delete = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.commentText = '';
    }
    CommentsComponent.prototype.onEditorFocus = function () {
        this.isEdit = true;
    };
    CommentsComponent.prototype.onEditorBlur = function () {
        this.isEdit = this.commentText.length > 0;
    };
    CommentsComponent.prototype.setCommentText = function (text) {
        this.commentText = text;
    };
    CommentsComponent.prototype.addComment = function () {
        var comment = new __WEBPACK_IMPORTED_MODULE_1__models__["e" /* Comment */]();
        comment.comment = this.commentText;
        this.add.emit(comment);
        this.commentText = '';
    };
    CommentsComponent.prototype.updateComment = function (comment) {
        this.update.emit(comment);
    };
    CommentsComponent.prototype.deleteComment = function (comment) {
        this.delete.emit(comment);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], CommentsComponent.prototype, "comments", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], CommentsComponent.prototype, "add", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], CommentsComponent.prototype, "update", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], CommentsComponent.prototype, "delete", void 0);
    CommentsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'comments',
            template: "\n        <div class=\"comments-wrap\">\n            <section class=\"comments\">\n                <comment *ngFor=\"let comment of comments\"\n                    [comment]=\"comment\"\n                    [editable]=\"true\"\n                    (save)=\"updateComment($event)\"\n                    (delete)=\"deleteComment($event)\">\n                </comment>\n            </section>\n            <section class=\"comment-composer\" [class.edit]=\"isEdit\">\n                <div class=\"comment-composer__editor\">\n                    <markdown-editor\n                        editable=\"true\"\n                        placeHolder=\"{{'comment' | translate}}\"\n                        (update)=\"setCommentText($event)\"\n                        (focus)=\"onEditorFocus($event)\"\n                        (blur)=\"onEditorBlur($event)\">\n                    </markdown-editor>\n                </div>\n                <button class=\"btn btn-add-comment\"\n                    (click)=\"addComment()\"\n                    [disabled]=\"!commentText\">\n                    {{'add_comment' | translate}}\n                </button>\n            </section>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], CommentsComponent);
    return CommentsComponent;
}());


/***/ },

/***/ 863:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ErrorMessageComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ErrorMessageComponent = (function () {
    function ErrorMessageComponent() {
        this.error = {};
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], ErrorMessageComponent.prototype, "error", void 0);
    ErrorMessageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'error-message',
            template: "\n        <div class=\"error-message__message\" *ngIf=\"error\">\n            {{error.message | translate}}\n        </div>\n    ",
            host: {
                '[class.error-message]': 'true',
                '[class.show]': 'error'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], ErrorMessageComponent);
    return ErrorMessageComponent;
}());


/***/ },

/***/ 864:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_project_actions__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_project_service__ = __webpack_require__(355);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return NavComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NavComponent = (function () {
    function NavComponent(router, store, projectActions, projectService) {
        this.router = router;
        this.store = store;
        this.projectActions = projectActions;
        this.projectService = projectService;
        this.subs = [];
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.store.select('projects').subscribe(function (state) {
            _this.projects = state.projects;
        }));
        this.loadNavProjects();
    };
    NavComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    NavComponent.prototype.isActive = function (instruction) {
        return this.router.isActive(this.router.createUrlTree(instruction), true);
    };
    NavComponent.prototype.loadNavProjects = function () {
        var _this = this;
        this.projectService.fetchProjects().subscribe(function (data) {
            _this.store.dispatch(_this.projectActions.fetchProjectsFulfilled(data.projects, data.meta));
        });
    };
    NavComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[data-c=nav]',
            template: __webpack_require__(801)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */], __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_3__actions_project_actions__["a" /* ProjectActions */], __WEBPACK_IMPORTED_MODULE_4__services_project_service__["a" /* ProjectService */]])
    ], NavComponent);
    return NavComponent;
}());


/***/ },

/***/ 865:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_environment_actions__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_user__ = __webpack_require__(527);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return NavbarComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NavbarComponent = (function () {
    function NavbarComponent(store, environmentActions) {
        var _this = this;
        this.store = store;
        this.environmentActions = environmentActions;
        this.keyup$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.headerTitle = 'Projects';
        this.workspaceUrl = 'Logout';
        this.logoUrl = 'img/logo.png';
        this.keyWord = '';
        this.subs = [];
        this.subs.push(this.store.select('environment').subscribe(function (state) {
            _this.keyWord = state.keyWord;
        }));
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.keyup$
            .debounceTime(250)
            .map(function (event) { return event.target.value; })
            .distinctUntilChanged()
            .subscribe(function (value) { return _this.search(value); });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    NavbarComponent.prototype.searchFocus = function () {
        this.store.dispatch(this.environmentActions.toggleSearch());
    };
    NavbarComponent.prototype.searchBlur = function () {
        this.store.dispatch(this.environmentActions.hideNav());
    };
    NavbarComponent.prototype.search = function (value) {
        this.store.dispatch(this.environmentActions.search(value));
    };
    NavbarComponent.prototype.toggleNav = function () {
        this.store.dispatch(this.environmentActions.toggleNav());
    };
    NavbarComponent.prototype.logout = function (event) {
        event.preventDefault();
        window.location.href = 'Logout';
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_4__models_user__["a" /* User */])
    ], NavbarComponent.prototype, "user", void 0);
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'navbar',
            template: __webpack_require__(802)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_3__actions_environment_actions__["a" /* EnvironmentActions */]])
    ], NavbarComponent);
    return NavbarComponent;
}());


/***/ },

/***/ 866:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ProjectListComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProjectListComponent = (function () {
    function ProjectListComponent() {
        this.showHeader = true;
        this.selectedIds = [];
        this.isSelectedAll = false;
    }
    Object.defineProperty(ProjectListComponent.prototype, "_projects", {
        set: function (projects) {
            this.projects = projects;
            this.selectedIds = [];
            this.isSelectedAll = false;
        },
        enumerable: true,
        configurable: true
    });
    ProjectListComponent.prototype.isSelected = function (id) {
        return this.selectedIds.indexOf(id) != -1;
    };
    ProjectListComponent.prototype.toggleSelectAll = function () {
        if (this.selectedIds.length) {
            this.selectedIds = [];
            this.isSelectedAll = false;
        }
        else {
            this.selectedIds = this.projects.map(function (it) { return it.id; });
            this.isSelectedAll = true;
        }
    };
    ProjectListComponent.prototype.toggleSelected = function (id) {
        var index = this.selectedIds.indexOf(id);
        if (index != -1) {
            this.selectedIds.push(id);
        }
        else {
            this.selectedIds.splice(index);
            if (!this.selectedIds.length) {
                this.isSelectedAll = false;
            }
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('projects'), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], ProjectListComponent.prototype, "_projects", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectListComponent.prototype, "showHeader", void 0);
    ProjectListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'project-list',
            template: __webpack_require__(803)
        }), 
        __metadata('design:paramtypes', [])
    ], ProjectListComponent);
    return ProjectListComponent;
}());


/***/ },

/***/ 867:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return RequestDeclineDialogComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RequestDeclineDialogComponent = (function () {
    function RequestDeclineDialogComponent() {
        this.confirm = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], RequestDeclineDialogComponent.prototype, "confirm", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], RequestDeclineDialogComponent.prototype, "cancel", void 0);
    RequestDeclineDialogComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'request-decline-dialog',
            template: "\n        <div class=\"dialog__container\">\n            <header class=\"dialog__head\">{{'decline' | translate}}?</header>\n            <section class=\"dialog__body\">\n                <textarea name=\"comment\" placeholder=\"{{'decline_reason' | translate}}\" [(ngModel)]=\"comment\"></textarea>\n            </section>\n            <footer class=\"dialog__footer\">\n                <button type=\"button\" class=\"btn\" (click)=\"cancel.emit(true)\">\n                    {{'cancel' | translate}}\n                </button>\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirm.emit(comment)\">\n                    {{'decline' | translate}}\n                </button>\n            </footer>\n        </div>\n    ",
            host: {
                '[class.task-cancel-dialog]': 'true',
                '[class.nb-dialog]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], RequestDeclineDialogComponent);
    return RequestDeclineDialogComponent;
}());


/***/ },

/***/ 868:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);

/* harmony export */ __webpack_require__.d(exports, "b", function() { return EmployeeInputComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployeeInputComponent = (function () {
    function EmployeeInputComponent(store) {
        this.store = store;
        this.placeHolder = '';
        this.multiple = false;
        this.editable = false;
        this.searchable = false;
        this.allowClear = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.employees = [];
        this.selectedEmps = [];
    }
    EmployeeInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('staff').subscribe(function (state) {
            _this.employees = state.employees;
            if (_this.ids) {
                _this.selectedEmps = state.employees.filter(function (it) { return _this.ids.indexOf(it.userID) != -1; });
            }
            _this.searchable = _this.employees.length > 13;
        });
    };
    EmployeeInputComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    EmployeeInputComponent.prototype.getEmps = function () {
        var _this = this;
        if (this.multiple && this.ids) {
            return this.employees.filter(function (it) { return _this.ids.indexOf(it.userID) == -1; });
        }
        else {
            return this.employees;
        }
    };
    EmployeeInputComponent.prototype.search = function (keyWord) {
        console.log(keyWord);
    };
    EmployeeInputComponent.prototype.clear = function ($event) {
        $event.stopPropagation();
        this.selectedEmps = [];
        this.ids = [];
        this.select.emit(this.selectedEmps);
    };
    EmployeeInputComponent.prototype.add = function (employee) {
        if (this.multiple) {
            this.selectedEmps.push(employee);
            this.ids = this.selectedEmps.map(function (it) { return it.userID; });
        }
        else {
            this.selectedEmps = [employee];
            this.ids = [employee.userID];
            document.body.click();
        }
        this.select.emit(this.selectedEmps);
    };
    EmployeeInputComponent.prototype.remove = function (employee, $event) {
        if (this.multiple) {
            $event.stopPropagation();
            this.selectedEmps = this.selectedEmps.filter(function (it) { return it.userID != employee.userID; });
            this.ids = this.selectedEmps.map(function (it) { return it.userID; });
            this.select.emit(this.selectedEmps);
        }
    };
    EmployeeInputComponent.prototype.onScroll = function ($event) {
        var _a = $event.target, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], EmployeeInputComponent.prototype, "ids", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], EmployeeInputComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], EmployeeInputComponent.prototype, "multiple", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], EmployeeInputComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], EmployeeInputComponent.prototype, "searchable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], EmployeeInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], EmployeeInputComponent.prototype, "select", void 0);
    EmployeeInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'employee-input',
            template: "\n        <span class=\"input employee-input\" *ngIf=\"!editable\">\n            <span [class.tag]=\"multiple\" *ngFor=\"let m of selectedEmps\">\n                {{m?.name}}\n            </span>\n        </span>\n        <div dropdown class=\"select employee-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"selectedEmps.length\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span [class.tag]=\"multiple\" *ngFor=\"let m of selectedEmps\" (click)=\"remove(m, $event)\">\n                    {{m?.name}}\n                </span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && selectedEmps.length\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button>\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"ids && ids.indexOf(m.userID) !=- 1\" *ngFor=\"let m of getEmps()\" (click)=\"add(m)\">\n                        {{m.name}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"]])
    ], EmployeeInputComponent);
    return EmployeeInputComponent;
}());


/***/ },

/***/ 869:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organization_input__ = __webpack_require__(870);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__project_input__ = __webpack_require__(871);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__request_type_input__ = __webpack_require__(872);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tags_input__ = __webpack_require__(873);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__task_type_input__ = __webpack_require__(875);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__employee_input__ = __webpack_require__(868);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__task_status_input__ = __webpack_require__(874);
/* harmony namespace reexport */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__organization_input__["a"]; });
/* harmony namespace reexport */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__project_input__["c"]; });
/* harmony namespace reexport */ __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__request_type_input__["f"]; });
/* harmony namespace reexport */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__tags_input__["e"]; });
/* harmony namespace reexport */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__task_type_input__["d"]; });
/* harmony namespace reexport */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_5__employee_input__["b"]; });
/* harmony namespace reexport */ __webpack_require__.d(exports, "g", function() { return __WEBPACK_IMPORTED_MODULE_6__task_status_input__["g"]; });









/***/ },

/***/ 870:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_staff_service__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(44);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return OrganizationInputComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrganizationInputComponent = (function () {
    function OrganizationInputComponent(staffService) {
        this.staffService = staffService;
        this.placeHolder = '';
        this.editable = false;
        this.searchable = false;
        this.allowClear = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.organizations = [];
        this.keyWord = '';
        this.allLoaded = false;
        this.firstLoad = true;
    }
    OrganizationInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.org && this.id) {
            this.staffService.fetchOrganizations({ ids: this.id }).subscribe(function (payload) {
                _this.org = payload.organizations[0];
            });
        }
    };
    OrganizationInputComponent.prototype.startLoad = function () {
        if (this.firstLoad) {
            this.loadOrganizations();
            this.firstLoad = false;
        }
    };
    OrganizationInputComponent.prototype.loadOrganizations = function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        this.staffService.fetchOrganizations({ page: page, keyWord: this.keyWord }).subscribe(function (payload) {
            _this.organizations = _this.organizations.concat(payload.organizations);
            _this.meta = payload.meta;
            if (!_this.searchable) {
                _this.searchable = _this.organizations.length > 13;
            }
        });
    };
    OrganizationInputComponent.prototype.getOrganizations = function () {
        var _this = this;
        if (this.keyWord) {
            return this.organizations.filter(function (it) { return it.name.toLowerCase().indexOf(_this.keyWord) != -1; });
        }
        return this.organizations;
    };
    OrganizationInputComponent.prototype.search = function (keyWord) {
        this.keyWord = keyWord.toLowerCase();
    };
    OrganizationInputComponent.prototype.clear = function ($event) {
        $event.stopPropagation();
        this.onSelect(null);
    };
    OrganizationInputComponent.prototype.onSelect = function (m) {
        this.org = m;
        this.select.emit(this.org);
        document.body.click();
    };
    OrganizationInputComponent.prototype.onScroll = function ($event) {
        if (this.allLoaded) {
            return;
        }
        var _a = $event.target, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop;
        if ((scrollHeight - clientHeight) == scrollTop) {
            if (this.meta && this.meta.page < this.meta.totalPages) {
                this.loadOrganizations(this.meta.page + 1);
            }
            else {
                this.allLoaded = true;
            }
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], OrganizationInputComponent.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_2__models__["f" /* Organization */])
    ], OrganizationInputComponent.prototype, "org", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], OrganizationInputComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], OrganizationInputComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], OrganizationInputComponent.prototype, "searchable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], OrganizationInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], OrganizationInputComponent.prototype, "select", void 0);
    OrganizationInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'organization-input',
            template: "\n        <span class=\"input organization-input\" *ngIf=\"!editable\">\n            {{org?.name}}\n        </span>\n        <div dropdown class=\"select organization-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"org\" *ngIf=\"editable\" (dropdownToggle)=\"startLoad()\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span>{{org?.name}}</span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && org\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <!-- <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button> -->\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"org?.id == m.id\" *ngFor=\"let m of getOrganizations()\" (click)=\"onSelect(m)\">\n                        {{m.name}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__services_staff_service__["a" /* StaffService */]])
    ], OrganizationInputComponent);
    return OrganizationInputComponent;
}());


/***/ },

/***/ 871:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);

/* harmony export */ __webpack_require__.d(exports, "c", function() { return ProjectInputComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProjectInputComponent = (function () {
    function ProjectInputComponent(store) {
        this.store = store;
        this.placeHolder = '';
        this.editable = false;
        this.searchable = false;
        this.allowClear = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.projects = [];
        this.keyWord = '';
    }
    ProjectInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('projects').subscribe(function (state) {
            _this.projects = state.projects;
            _this.project = state.projects.filter(function (it) { return it.id == _this.id; })[0];
            _this.searchable = _this.projects.length > 13;
        });
    };
    ProjectInputComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProjectInputComponent.prototype.getProjects = function () {
        var _this = this;
        if (this.keyWord) {
            return this.projects.filter(function (it) { return it.name.toLowerCase().indexOf(_this.keyWord) != -1; });
        }
        return this.projects;
    };
    ProjectInputComponent.prototype.search = function (keyWord) {
        this.keyWord = keyWord.toLowerCase();
    };
    ProjectInputComponent.prototype.clear = function ($event) {
        $event.stopPropagation();
        this.onSelect(null);
    };
    ProjectInputComponent.prototype.onSelect = function (m) {
        this.project = m;
        this.select.emit(this.project);
        document.body.click();
    };
    ProjectInputComponent.prototype.onScroll = function ($event) {
        var _a = $event.target, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], ProjectInputComponent.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], ProjectInputComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectInputComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectInputComponent.prototype, "searchable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], ProjectInputComponent.prototype, "select", void 0);
    ProjectInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'project-input',
            template: "\n        <span class=\"input project-input\" *ngIf=\"!editable\">\n            {{project?.name}}\n        </span>\n        <div dropdown class=\"select project-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"project\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span>{{project?.name}}</span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && project\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <!-- <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button> -->\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"project?.id == m.id\" *ngFor=\"let m of getProjects()\" (click)=\"onSelect(m)\">\n                        {{m.name}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"]])
    ], ProjectInputComponent);
    return ProjectInputComponent;
}());


/***/ },

/***/ 872:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(44);

/* harmony export */ __webpack_require__.d(exports, "f", function() { return RequestTypeInputComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RequestTypeInputComponent = (function () {
    function RequestTypeInputComponent(store) {
        var _this = this;
        this.store = store;
        this.placeHolder = '';
        this.editable = false;
        this.searchable = false;
        this.allowClear = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.sub = this.store.select('reference').subscribe(function (state) {
            _this.requestTypes = state.requestTypes;
            _this.searchable = _this.requestTypes.length > 13;
        });
    }
    RequestTypeInputComponent.prototype.ngOnInit = function () {
        if (!this.requestType) {
            this.onSelect(this.requestTypes.filter(function (it) { return it.name == 'implement'; })[0]);
        }
    };
    RequestTypeInputComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    RequestTypeInputComponent.prototype.search = function (keyWord) {
        console.log(keyWord);
    };
    RequestTypeInputComponent.prototype.clear = function ($event) {
        $event.stopPropagation();
        this.onSelect(null);
    };
    RequestTypeInputComponent.prototype.onSelect = function (m) {
        this.requestType = m;
        this.select.emit(this.requestType);
        document.body.click();
    };
    RequestTypeInputComponent.prototype.onScroll = function ($event) {
        var _a = $event.target, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_2__models__["g" /* RequestType */])
    ], RequestTypeInputComponent.prototype, "requestType", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], RequestTypeInputComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], RequestTypeInputComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], RequestTypeInputComponent.prototype, "searchable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], RequestTypeInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], RequestTypeInputComponent.prototype, "select", void 0);
    RequestTypeInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'request-type-input',
            template: "\n        <span class=\"input request-type-input\" *ngIf=\"!editable\">\n            {{requestType | localizedName}}\n        </span>\n        <div dropdown class=\"select request-type-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"requestType\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span *ngIf=\"requestType\">\n                    {{requestType | localizedName}}\n                </span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && requestType\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button>\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"requestType?.id == m.id\" *ngFor=\"let m of requestTypes\" (click)=\"onSelect(m)\">\n                        {{m | localizedName}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"]])
    ], RequestTypeInputComponent);
    return RequestTypeInputComponent;
}());


/***/ },

/***/ 873:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);

/* harmony export */ __webpack_require__.d(exports, "e", function() { return TagsInputComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TagsInputComponent = (function () {
    function TagsInputComponent(store) {
        this.store = store;
        this.ids = [];
        this.placeHolder = '';
        this.editable = false;
        this.searchable = false;
        this.allowClear = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.tags = [];
        this.selectedTags = [];
    }
    TagsInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('reference').subscribe(function (state) {
            _this.tags = state.tags;
            if (_this.ids) {
                _this.selectedTags = state.tags.filter(function (it) { return _this.ids.indexOf(it.id) != -1; });
            }
            _this.searchable = _this.tags.length > 13;
        });
    };
    TagsInputComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TagsInputComponent.prototype.getTags = function () {
        var _this = this;
        if (this.ids) {
            return this.tags.filter(function (it) { return _this.ids.indexOf(it.id) == -1; });
        }
        else {
            return this.tags;
        }
    };
    TagsInputComponent.prototype.search = function (keyWord) {
        console.log(keyWord);
    };
    TagsInputComponent.prototype.clear = function ($event) {
        $event.stopPropagation();
        this.selectedTags = [];
        this.ids = [];
        this.select.emit(this.selectedTags);
    };
    TagsInputComponent.prototype.add = function (tag) {
        this.selectedTags.push(tag);
        this.ids = this.selectedTags.map(function (it) { return it.id; });
        this.select.emit(this.selectedTags);
    };
    TagsInputComponent.prototype.remove = function (tag, $event) {
        $event.stopPropagation();
        this.selectedTags = this.selectedTags.filter(function (it) { return it.id != tag.id; });
        this.ids = this.selectedTags.map(function (it) { return it.id; });
        this.select.emit(this.selectedTags);
    };
    TagsInputComponent.prototype.onScroll = function ($event) {
        var _a = $event.target, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], TagsInputComponent.prototype, "ids", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], TagsInputComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TagsInputComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TagsInputComponent.prototype, "searchable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TagsInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], TagsInputComponent.prototype, "select", void 0);
    TagsInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tags-input',
            template: "\n        <span class=\"input tags-input\" *ngIf=\"!editable\">\n            <span\n                class=\"tag\"\n                *ngFor=\"let m of selectedTags\"\n                [style.color]=\"m.color\">\n                {{m | localizedName}}\n            </span>\n        </span>\n        <div dropdown class=\"select tags-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"selectedTags.length\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span\n                    class=\"tag\"\n                    *ngFor=\"let m of selectedTags\"\n                    [style.color]=\"m.color\"\n                    (click)=\"remove(m, $event)\">\n                    {{m | localizedName}}\n                </span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && selectedTags.length\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button>\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" *ngFor=\"let m of getTags()\" (click)=\"add(m)\">\n                        <span [style.color]=\"m.color\">\n                            {{m | localizedName}}\n                        </span>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"]])
    ], TagsInputComponent);
    return TagsInputComponent;
}());


/***/ },

/***/ 874:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "g", function() { return TaskStatusInputComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TaskStatusInputComponent = (function () {
    function TaskStatusInputComponent() {
        this.status = '';
        this.placeHolder = '';
        this.editable = false;
        this.allowClear = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.statusList = ['PROCESSING', 'COMPLETED', 'WAITING', 'CANCELLED', 'PENDING', 'OPEN'];
    }
    TaskStatusInputComponent.prototype.clear = function ($event) {
        $event.stopPropagation();
        this.onSelect('');
    };
    TaskStatusInputComponent.prototype.onSelect = function (m) {
        this.status = m;
        this.select.emit(this.status);
        document.body.click();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], TaskStatusInputComponent.prototype, "status", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], TaskStatusInputComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskStatusInputComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskStatusInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], TaskStatusInputComponent.prototype, "select", void 0);
    TaskStatusInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-status-input',
            template: "\n        <span class=\"input task-status-input\" *ngIf=\"!editable\">\n            {{status | text:'L' | translate}}\n        </span>\n        <div dropdown class=\"select task-status-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"status\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span class=\"status-{{status | text:'L'}}\">{{status | text:'L' | translate}}</span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && status\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <ul class=\"select-list\">\n                    <li class=\"select-option\" [class.selected]=\"status == m\" *ngFor=\"let m of statusList\" (click)=\"onSelect(m)\">\n                        <div class=\"task-status status-{{m | text:'L'}}\">{{m | text:'L' | translate}}</div>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TaskStatusInputComponent);
    return TaskStatusInputComponent;
}());


/***/ },

/***/ 875:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);

/* harmony export */ __webpack_require__.d(exports, "d", function() { return TaskTypeInputComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskTypeInputComponent = (function () {
    function TaskTypeInputComponent(store) {
        this.store = store;
        this.placeHolder = '';
        this.editable = false;
        this.searchable = false;
        this.allowClear = false;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    TaskTypeInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('reference').subscribe(function (state) {
            _this.taskTypes = state.taskTypes;
            _this.taskType = state.taskTypes.filter(function (it) { return it.id == _this.id; })[0];
            _this.searchable = _this.taskTypes.length > 13;
        });
    };
    TaskTypeInputComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TaskTypeInputComponent.prototype.search = function (keyWord) {
        console.log(keyWord);
    };
    TaskTypeInputComponent.prototype.clear = function ($event) {
        $event.stopPropagation();
        this.onSelect(null);
    };
    TaskTypeInputComponent.prototype.onSelect = function (m) {
        this.taskType = m;
        this.select.emit(this.taskType);
        document.body.click();
    };
    TaskTypeInputComponent.prototype.onScroll = function ($event) {
        var _a = $event.target, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop;
        if ((scrollHeight - clientHeight) == scrollTop) {
            console.log('scroll end');
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], TaskTypeInputComponent.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], TaskTypeInputComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskTypeInputComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskTypeInputComponent.prototype, "searchable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskTypeInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], TaskTypeInputComponent.prototype, "select", void 0);
    TaskTypeInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-type-input',
            template: "\n        <span class=\"input task-type-input\" *ngIf=\"!editable\">\n            {{taskType | localizedName}}\n        </span>\n        <div dropdown class=\"select task-type-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"taskType\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span>{{taskType | localizedName}}</span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && taskType\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button>\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"id == m.id\" *ngFor=\"let m of taskTypes\" (click)=\"onSelect(m)\">\n                        {{m | localizedName}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"]])
    ], TaskTypeInputComponent);
    return TaskTypeInputComponent;
}());


/***/ },

/***/ 876:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TaskCancelDialogComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TaskCancelDialogComponent = (function () {
    function TaskCancelDialogComponent() {
        this.confirm = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cancel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TaskCancelDialogComponent.prototype, "confirm", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TaskCancelDialogComponent.prototype, "cancel", void 0);
    TaskCancelDialogComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-cancel-dialog',
            template: "\n        <div class=\"dialog__container\">\n            <header class=\"dialog__head\">{{'cancel_task' | translate}}?</header>\n            <section class=\"dialog__body\">\n                <textarea name=\"comment\" placeholder=\"{{'comment' | translate}}\" [(ngModel)]=\"comment\"></textarea>\n            </section>\n            <footer class=\"dialog__footer\">\n                <button type=\"button\" class=\"btn\" (click)=\"cancel.emit(true)\">\n                    {{'close' | translate}}\n                </button>\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirm.emit(comment)\">\n                    {{'cancel_task' | translate}}\n                </button>\n            </footer>\n        </div>\n    ",
            host: {
                '[class.task-cancel-dialog]': 'true',
                '[class.nb-dialog]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], TaskCancelDialogComponent);
    return TaskCancelDialogComponent;
}());


/***/ },

/***/ 877:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TaskFilterComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskFilterComponent = (function () {
    function TaskFilterComponent(store) {
        var _this = this;
        this.store = store;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.taskStatus = '';
        this.taskTypeId = '';
        this.assigneeUserId = '';
        this.tagIds = [];
        this.subs = [];
        this.subs.push(this.store.select('tasks').subscribe(function (state) {
            if (state) {
                _this.taskStatus = state.filter.taskStatus;
                _this.taskTypeId = state.filter.taskTypeId;
                _this.assigneeUserId = state.filter.assigneeUserId;
                _this.tagIds = state.filter.tagIds;
            }
        }));
    }
    TaskFilterComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    TaskFilterComponent.prototype.setTaskStatus = function (taskStatus) {
        this.taskStatus = taskStatus;
        this.updateFilter();
    };
    TaskFilterComponent.prototype.setTaskType = function (taskType) {
        if (taskType) {
            this.taskTypeId = taskType.id;
        }
        else {
            this.taskTypeId = '';
        }
        this.updateFilter();
    };
    TaskFilterComponent.prototype.setAssigneeUser = function (assigneeUsers) {
        if (assigneeUsers.length) {
            this.assigneeUserId = assigneeUsers[0].userID;
        }
        else {
            this.assigneeUserId = '';
        }
        this.updateFilter();
    };
    TaskFilterComponent.prototype.setTags = function (tags) {
        this.tagIds = tags.map(function (it) { return it.id; });
        this.updateFilter();
    };
    TaskFilterComponent.prototype.updateFilter = function () {
        this.change.emit({
            taskStatus: this.taskStatus,
            taskTypeId: this.taskTypeId,
            assigneeUserId: this.assigneeUserId,
            tagIds: this.tagIds
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.task-filter'), 
        __metadata('design:type', Object)
    ], TaskFilterComponent.prototype, "true", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TaskFilterComponent.prototype, "change", void 0);
    TaskFilterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-filter',
            template: "\n        <div class=\"task-filter__icon\"><i class=\"fa fa-filter\"></i></div>\n        <task-status-input [status]=\"taskStatus\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'status' | translate}}\" (select)=\"setTaskStatus($event)\"></task-status-input>\n        <task-type-input [id]=\"taskTypeId\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'task_type' | translate}}\" (select)=\"setTaskType($event)\"></task-type-input>\n        <employee-input [ids]=\"[assigneeUserId]\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'assignee_user' | translate}}\" (select)=\"setAssigneeUser($event)\"></employee-input>\n        <tags-input [ids]=\"tagIds\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'tags' | translate}}\" (select)=\"setTags($event)\"></tags-input>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"]])
    ], TaskFilterComponent);
    return TaskFilterComponent;
}());


/***/ },

/***/ 878:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(62);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TaskListComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TaskListComponent = (function () {
    function TaskListComponent(store, taskActions) {
        var _this = this;
        this.store = store;
        this.taskActions = taskActions;
        this.showHeader = true;
        this.showSelect = true;
        this.streamMode = false;
        this.selectedIds = [];
        this.isSelectedAll = false;
        this.loading = true;
        this.expandedIds = [];
        this.loadedExpandedCount = 0;
        this.timeout = 0;
        this.sub = this.store.select('tasks').subscribe(function (state) {
            _this.expandedIds = state.expandedIds;
        });
    }
    Object.defineProperty(TaskListComponent.prototype, "_tasks", {
        set: function (tasks) {
            var _this = this;
            this.tasks = tasks;
            this.selectedIds = [];
            this.isSelectedAll = false;
            this.loadedExpandedCount = 0;
            this.loading = true;
            if (this.loading && this.tasks.length > 0) {
                this.timeout = setTimeout(function () {
                    _this.loading = false;
                }, 300);
            }
        },
        enumerable: true,
        configurable: true
    });
    TaskListComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TaskListComponent.prototype.isSelected = function (id) {
        return this.selectedIds.indexOf(id) != -1;
    };
    TaskListComponent.prototype.toggleSelectAll = function () {
        if (this.selectedIds.length) {
            this.selectedIds = [];
            this.isSelectedAll = false;
        }
        else {
            this.selectedIds = this.tasks.map(function (it) { return it.id; });
            this.isSelectedAll = true;
        }
    };
    TaskListComponent.prototype.toggleSelected = function (id) {
        var index = this.selectedIds.indexOf(id);
        if (index != -1) {
            this.selectedIds.push(id);
        }
        else {
            this.selectedIds.splice(index);
            if (!this.selectedIds.length) {
                this.isSelectedAll = false;
            }
        }
    };
    TaskListComponent.prototype.onLoadStreamLevel = function (id) {
        this.loadedExpandedCount++;
        if (this.loadedExpandedCount >= this.expandedIds.length) {
            this.loading = false;
            this.loadedExpandedCount--;
            clearTimeout(this.timeout);
        }
    };
    TaskListComponent.prototype.onToggleStream = function (id) {
        this.store.dispatch(this.taskActions.toggleStreamExpand(id));
    };
    TaskListComponent.prototype.toggleExpandable = function (id, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.onToggleStream(id);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('tasks'), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], TaskListComponent.prototype, "_tasks", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskListComponent.prototype, "showHeader", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskListComponent.prototype, "showSelect", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskListComponent.prototype, "streamMode", void 0);
    TaskListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-list',
            template: __webpack_require__(807)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_2__actions__["e" /* TaskActions */]])
    ], TaskListComponent);
    return TaskListComponent;
}());


/***/ },

/***/ 879:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models__ = __webpack_require__(44);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TaskStreamComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TaskStreamComponent = (function () {
    function TaskStreamComponent(store, taskService) {
        this.store = store;
        this.taskService = taskService;
        this.showSelect = true;
        this.expandRoot = false;
        this.toggleStream = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.loadStreamLevel = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.expandedIds = [];
        this.loading = true;
        this.expanded = false;
        this.stream = [];
        this.level = 1;
    }
    Object.defineProperty(TaskStreamComponent.prototype, "isHidden", {
        get: function () { return !this.expanded; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TaskStreamComponent.prototype, "_level", {
        set: function (level) {
            this.level = 1 + level;
        },
        enumerable: true,
        configurable: true
    });
    ;
    TaskStreamComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('tasks').subscribe(function (state) {
            _this.expandedIds = state.expandedIds;
            if (_this.expandRoot || _this.expandedIds.indexOf(_this.task.id) != -1) {
                if (!_this.stream.length) {
                    _this.loadStream(_this.task);
                }
                else {
                    _this.expanded = true;
                    _this.onLoadStreamLevel(_this.task.id);
                }
            }
            else {
                _this.expanded = false;
            }
        });
    };
    TaskStreamComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TaskStreamComponent.prototype.loadStream = function (task) {
        var _this = this;
        if (task.hasSubtasks || task.hasRequests) {
            this.loading = true;
            this.taskService.fetchTaskStream(this.task).subscribe(function (payload) {
                _this.stream = payload;
                _this.expanded = _this.stream.length > 0;
                _this.onLoadStreamLevel(_this.task.id);
            }, function (err) { console.log('error'); }, function () { _this.loading = false; });
        }
    };
    TaskStreamComponent.prototype.onLoadStreamLevel = function (id) {
        this.loadStreamLevel.emit(id);
    };
    TaskStreamComponent.prototype.onToggleStream = function (id) {
        this.toggleStream.emit(id);
    };
    TaskStreamComponent.prototype.toggleExpandable = function (id, $event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.onToggleStream(id);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.hidden'), 
        __metadata('design:type', Object)
    ], TaskStreamComponent.prototype, "isHidden", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.stream-level'), 
        __metadata('design:type', Object)
    ], TaskStreamComponent.prototype, "true", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('level'), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], TaskStreamComponent.prototype, "_level", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_3__models__["d" /* Task */])
    ], TaskStreamComponent.prototype, "task", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskStreamComponent.prototype, "showSelect", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskStreamComponent.prototype, "expandRoot", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TaskStreamComponent.prototype, "toggleStream", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TaskStreamComponent.prototype, "loadStreamLevel", void 0);
    TaskStreamComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-stream',
            template: __webpack_require__(808)
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["Store"], __WEBPACK_IMPORTED_MODULE_2__services__["e" /* TaskService */]])
    ], TaskStreamComponent);
    return TaskStreamComponent;
}());


/***/ },

/***/ 880:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Attachment; });var Attachment = (function () {
    function Attachment() {
        this.id = '';
    }
    return Attachment;
}());


/***/ },

/***/ 881:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Comment; });var Comment = (function () {
    function Comment() {
        this.id = '';
        this.fsid = '' + Date.now();
    }
    return Comment;
}());


/***/ },

/***/ 882:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export Employee */var Employee = (function () {
    function Employee() {
        this.id = '';
        this.name = '@anonymous';
    }
    return Employee;
}());


/***/ },

/***/ 883:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Organization; });var Organization = (function () {
    function Organization() {
        this.id = '';
    }
    return Organization;
}());


/***/ },

/***/ 884:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export Project */var Project = (function () {
    function Project() {
        this.id = '';
        this.editable = false;
        this.fsid = '' + Date.now();
        this.acl = {};
        this.status = 'DRAFT';
    }
    return Project;
}());


/***/ },

/***/ 885:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return RequestType; });var RequestType = (function () {
    function RequestType() {
        this.id = '';
    }
    return RequestType;
}());


/***/ },

/***/ 886:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Request; });var Request = (function () {
    function Request() {
        this.id = '';
        this.fsid = '' + Date.now();
        this.comment = '';
    }
    return Request;
}());


/***/ },

/***/ 887:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export Tag */var Tag = (function () {
    function Tag() {
        this.id = '';
    }
    return Tag;
}());


/***/ },

/***/ 888:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export TaskType */var TaskType = (function () {
    function TaskType() {
        this.id = '';
    }
    return TaskType;
}());


/***/ },

/***/ 889:
/***/ function(module, exports, __webpack_require__) {

"use strict";

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Task; });var Task = (function () {
    function Task() {
        this.id = '';
        this.editable = false;
        this.fsid = '' + Date.now();
        this.acl = {};
        this.status = 'DRAFT';
        this.priority = 'NORMAL';
        this.customerObservation = false;
    }
    return Task;
}());


/***/ },

/***/ 890:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return DateDurationPipe; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DateDurationPipe = (function () {
    function DateDurationPipe() {
    }
    DateDurationPipe.prototype.transform = function (dateStart, dateEnd) {
        if (!dateStart && !dateEnd) {
            return '';
        }
        var sd, ed, dd;
        if (dateStart === 'now') {
            sd = __WEBPACK_IMPORTED_MODULE_1_moment__();
        }
        else {
            sd = __WEBPACK_IMPORTED_MODULE_1_moment__(dateStart, 'DD.MM.YYYY');
        }
        ed = __WEBPACK_IMPORTED_MODULE_1_moment__(dateEnd, 'DD.MM.YYYY');
        dd = ed.diff(sd, 'days');
        return dd ? "(" + dd.toString() + ")" : '';
    };
    DateDurationPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'dateDuration' }), 
        __metadata('design:paramtypes', [])
    ], DateDurationPipe);
    return DateDurationPipe;
}());


/***/ },

/***/ 891:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return DateFormatPipe; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DateFormatPipe = (function () {
    function DateFormatPipe() {
    }
    DateFormatPipe.prototype.transform = function (date, format) {
        if (!date) {
            return '';
        }
        if (!format) {
            format = 'DD.MM.YYYY HH:mm';
        }
        var md = __WEBPACK_IMPORTED_MODULE_1_moment__(date, format);
        if (md.isValid()) {
            return md.format(format);
        }
        return '';
    };
    DateFormatPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'dateFmt' }), 
        __metadata('design:paramtypes', [])
    ], DateFormatPipe);
    return DateFormatPipe;
}());


/***/ },

/***/ 892:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date_format_pipe__ = __webpack_require__(891);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_duration_pipe__ = __webpack_require__(890);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__text_transform_pipe__ = __webpack_require__(895);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__values_pipe__ = __webpack_require__(896);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__keys_pipe__ = __webpack_require__(893);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__localized_name_pipe__ = __webpack_require__(894);
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__date_format_pipe__, "a")) __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__date_format_pipe__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__date_duration_pipe__, "a")) __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__date_duration_pipe__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__text_transform_pipe__, "a")) __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__text_transform_pipe__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__values_pipe__, "a")) __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__values_pipe__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__keys_pipe__, "a")) __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__keys_pipe__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__localized_name_pipe__, "a")) __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__localized_name_pipe__["a"]; });








/***/ },

/***/ 893:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return KeysPipe; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push(key);
        }
        return keys;
    };
    KeysPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'keys' }), 
        __metadata('design:paramtypes', [])
    ], KeysPipe);
    return KeysPipe;
}());


/***/ },

/***/ 894:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__(45);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return LocalizedNamePipe; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LocalizedNamePipe = (function () {
    function LocalizedNamePipe(appService) {
        this.appService = appService;
    }
    LocalizedNamePipe.prototype.transform = function (model, field, locale) {
        var _field = field || 'name';
        var _locale = locale || this.appService.language;
        return model ? (model.localizedName[_locale] || model[_field]) : '';
    };
    LocalizedNamePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'localizedName' }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__services__["a" /* AppService */]])
    ], LocalizedNamePipe);
    return LocalizedNamePipe;
}());


/***/ },

/***/ 895:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TextTransformPipe; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TextTransformPipe = (function () {
    function TextTransformPipe() {
    }
    TextTransformPipe.prototype.transform = function (text, transform) {
        switch (transform) {
            case 'L':
                return text.toLowerCase();
            case 'U':
                return text.toUpperCase();
            default:
                return text;
        }
    };
    TextTransformPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'text' }), 
        __metadata('design:paramtypes', [])
    ], TextTransformPipe);
    return TextTransformPipe;
}());


/***/ },

/***/ 896:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ValuesPipe; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValuesPipe = (function () {
    function ValuesPipe() {
    }
    ValuesPipe.prototype.transform = function (values, args) {
        return Object.keys(values).map(function (key) { return values[key]; });
    };
    ValuesPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'values' }), 
        __metadata('design:paramtypes', [])
    ], ValuesPipe);
    return ValuesPipe;
}());


/***/ },

/***/ 897:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_app_actions__ = __webpack_require__(516);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return authedReducer; });
;
var initialState = {
    userProfile: null,
    languages: {},
    pageSize: 20,
    language: 'RUS'
};
var authedReducer = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions_app_actions__["a" /* AppActions */].FETCH_USER_PROFILE_FULFILLED:
            return Object.assign({}, state, {
                userProfile: payload.userProfile,
                languages: payload.languages,
                pageSize: payload.pageSize,
                language: payload.language
            });
        default:
            return state;
    }
};


/***/ },

/***/ 898:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_environment_actions__ = __webpack_require__(118);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return environmentReducer; });
;
var initialState = {
    isMobile: false,
    isNavOpen: true,
    isSearchOpen: false,
    redirectUrl: '/tasks',
    keyWord: ''
};
var environmentReducer = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions_environment_actions__["a" /* EnvironmentActions */].SEARCH:
            return Object.assign({}, state, {
                keyWord: payload.keyWord
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_environment_actions__["a" /* EnvironmentActions */].RESET_SEARCH:
            return Object.assign({}, state, {
                keyWord: ''
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_environment_actions__["a" /* EnvironmentActions */].TOGGLE_NAV:
            return Object.assign({}, state, {
                isNavOpen: !state.isNavOpen
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_environment_actions__["a" /* EnvironmentActions */].TOGGLE_SEARCH:
            return Object.assign({}, state, {
                isSearchOpen: !state.isSearchOpen
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_environment_actions__["a" /* EnvironmentActions */].HIDE_NAV:
            return Object.assign({}, state, {
                isNavOpen: true,
                isSearchOpen: false
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_environment_actions__["a" /* EnvironmentActions */].SET_REDIRECT_URL:
            return Object.assign({}, state, {
                redirectUrl: payload.redirectUrl
            });
        default:
            return state;
    }
};


/***/ },

/***/ 899:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_project_actions__ = __webpack_require__(169);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return projectsReducer; });
;
var initialState = {
    meta: {},
    projects: [],
    project: undefined,
    loading: false
};
var projectsReducer = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions_project_actions__["a" /* ProjectActions */].FETCH_PROJECTS:
            return Object.assign({}, state, {
                loading: true
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_project_actions__["a" /* ProjectActions */].FETCH_PROJECTS_FAILED:
            return Object.assign({}, state, {
                loading: false
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_project_actions__["a" /* ProjectActions */].FETCH_PROJECTS_FULFILLED:
            return Object.assign({}, state, {
                projects: payload.projects,
                meta: payload.meta,
                loading: false
            });
        default:
            return state;
    }
};


/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__url_tree__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_collection__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_tree__ = __webpack_require__(223);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return RouterState; });/* harmony export */ exports["f"] = createEmptyState;/* unused harmony export createEmptyStateSnapshot */
/* harmony export */ __webpack_require__.d(exports, "b", function() { return ActivatedRoute; });
/* harmony export */ __webpack_require__.d(exports, "c", function() { return InheritedResolve; });
/* harmony export */ __webpack_require__.d(exports, "d", function() { return ActivatedRouteSnapshot; });
/* harmony export */ __webpack_require__.d(exports, "e", function() { return RouterStateSnapshot; });/* harmony export */ exports["g"] = advanceActivatedRoute;/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * The state of the router.
 *
 * ### Usage
 *
 * ```
 * @Component({template:''})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state = router.routerState;
 *     const id: Observable<string> = state.root.firstChild.params.map(p => p.id);
 *     const isDebug: Observable<string> = state.root.queryParams.map(q => q.debug);
 *   }
 * }
 * ```
 *
 * @stable
 */
var RouterState = (function (_super) {
    __extends(RouterState, _super);
    /**
     * @internal
     */
    function RouterState(root, snapshot) {
        _super.call(this, root);
        this.snapshot = snapshot;
        setRouterStateSnapshot(this, root);
    }
    RouterState.prototype.toString = function () { return this.snapshot.toString(); };
    return RouterState;
}(__WEBPACK_IMPORTED_MODULE_4__utils_tree__["a" /* Tree */]));
function createEmptyState(urlTree, rootComponent) {
    var snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
    var emptyUrl = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]([new __WEBPACK_IMPORTED_MODULE_2__url_tree__["c" /* UrlSegment */]('', {})]);
    var emptyParams = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]({});
    var emptyData = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]({});
    var emptyQueryParams = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]({});
    var fragment = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["BehaviorSubject"]('');
    var activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, __WEBPACK_IMPORTED_MODULE_1__shared__["a" /* PRIMARY_OUTLET */], rootComponent, snapshot.root);
    activated.snapshot = snapshot.root;
    return new RouterState(new __WEBPACK_IMPORTED_MODULE_4__utils_tree__["b" /* TreeNode */](activated, []), snapshot);
}
function createEmptyStateSnapshot(urlTree, rootComponent) {
    var emptyParams = {};
    var emptyData = {};
    var emptyQueryParams = {};
    var fragment = '';
    var activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, __WEBPACK_IMPORTED_MODULE_1__shared__["a" /* PRIMARY_OUTLET */], rootComponent, null, urlTree.root, -1, InheritedResolve.empty);
    return new RouterStateSnapshot('', new __WEBPACK_IMPORTED_MODULE_4__utils_tree__["b" /* TreeNode */](activated, []));
}
/**
 * Contains the information about a component loaded in an outlet. The information is provided
 * through the params, urlSegments, and data observables.
 *
 * ### Usage
 *
 * ```
 * @Component({template:''})
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: Observable<string> = route.params.map(p => p.id);
 *     const data = route.data.map(d => d.user); //includes `data` and `resolve`
 *   }
 * }
 * ```
 *
 * @stable
 */
var ActivatedRoute = (function () {
    /**
     * @internal
     */
    function ActivatedRoute(url, params, queryParams, fragment, data, outlet, component, futureSnapshot) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
    }
    Object.defineProperty(ActivatedRoute.prototype, "routeConfig", {
        get: function () { return this._futureSnapshot.routeConfig; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "root", {
        get: function () { return this._routerState.root; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "parent", {
        get: function () { return this._routerState.parent(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "firstChild", {
        get: function () { return this._routerState.firstChild(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "children", {
        get: function () { return this._routerState.children(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "pathFromRoot", {
        get: function () { return this._routerState.pathFromRoot(this); },
        enumerable: true,
        configurable: true
    });
    ActivatedRoute.prototype.toString = function () {
        return this.snapshot ? this.snapshot.toString() : "Future(" + this._futureSnapshot + ")";
    };
    return ActivatedRoute;
}());
/**
 * @internal
 */
var InheritedResolve = (function () {
    function InheritedResolve(parent, current) {
        this.parent = parent;
        this.current = current;
        /**
         * @internal
         */
        this.resolvedData = {};
    }
    Object.defineProperty(InheritedResolve.prototype, "flattenedResolvedData", {
        /**
         * @internal
         */
        get: function () {
            return this.parent ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_collection__["g" /* merge */])(this.parent.flattenedResolvedData, this.resolvedData) :
                this.resolvedData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InheritedResolve, "empty", {
        get: function () { return new InheritedResolve(null, {}); },
        enumerable: true,
        configurable: true
    });
    return InheritedResolve;
}());
/**
 * Contains the information about a component loaded in an outlet at a particular moment in time.
 *
 * ### Usage
 *
 * ```
 * @Component({template:''})
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: string = route.snapshot.params.id;
 *     const data = route.snapshot.data;
 *   }
 * }
 * ```
 *
 * @stable
 */
var ActivatedRouteSnapshot = (function () {
    /**
     * @internal
     */
    function ActivatedRouteSnapshot(url, params, queryParams, fragment, data, outlet, component, routeConfig, urlSegment, lastPathIndex, resolve) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this._routeConfig = routeConfig;
        this._urlSegment = urlSegment;
        this._lastPathIndex = lastPathIndex;
        this._resolve = resolve;
    }
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "routeConfig", {
        get: function () { return this._routeConfig; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "root", {
        get: function () { return this._routerState.root; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "parent", {
        get: function () { return this._routerState.parent(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "firstChild", {
        get: function () { return this._routerState.firstChild(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "children", {
        get: function () { return this._routerState.children(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "pathFromRoot", {
        get: function () { return this._routerState.pathFromRoot(this); },
        enumerable: true,
        configurable: true
    });
    ActivatedRouteSnapshot.prototype.toString = function () {
        var url = this.url.map(function (s) { return s.toString(); }).join('/');
        var matched = this._routeConfig ? this._routeConfig.path : '';
        return "Route(url:'" + url + "', path:'" + matched + "')";
    };
    return ActivatedRouteSnapshot;
}());
/**
 * The state of the router at a particular moment in time.
 *
 * ### Usage
 *
 * ```
 * @Component({template:''})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const snapshot = router.routerState.snapshot;
 *   }
 * }
 * ```
 *
 * @stable
 */
var RouterStateSnapshot = (function (_super) {
    __extends(RouterStateSnapshot, _super);
    /**
     * @internal
     */
    function RouterStateSnapshot(url, root) {
        _super.call(this, root);
        this.url = url;
        setRouterStateSnapshot(this, root);
    }
    RouterStateSnapshot.prototype.toString = function () { return serializeNode(this._root); };
    return RouterStateSnapshot;
}(__WEBPACK_IMPORTED_MODULE_4__utils_tree__["a" /* Tree */]));
function setRouterStateSnapshot(state, node) {
    node.value._routerState = state;
    node.children.forEach(function (c) { return setRouterStateSnapshot(state, c); });
}
function serializeNode(node) {
    var c = node.children.length > 0 ? " { " + node.children.map(serializeNode).join(", ") + " } " : '';
    return "" + node.value + c;
}
/**
 * The expectation is that the activate route is created with the right set of parameters.
 * So we push new values into the observables only when they are not the initial values.
 * And we detect that by checking if the snapshot field is set.
 */
function advanceActivatedRoute(route) {
    if (route.snapshot) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_collection__["d" /* shallowEqual */])(route.snapshot.queryParams, route._futureSnapshot.queryParams)) {
            route.queryParams.next(route._futureSnapshot.queryParams);
        }
        if (route.snapshot.fragment !== route._futureSnapshot.fragment) {
            route.fragment.next(route._futureSnapshot.fragment);
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_collection__["d" /* shallowEqual */])(route.snapshot.params, route._futureSnapshot.params)) {
            route.params.next(route._futureSnapshot.params);
            route.data.next(route._futureSnapshot.data);
        }
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_collection__["h" /* shallowEqualArrays */])(route.snapshot.url, route._futureSnapshot.url)) {
            route.url.next(route._futureSnapshot.url);
        }
        route.snapshot = route._futureSnapshot;
    }
    else {
        route.snapshot = route._futureSnapshot;
        // this is for resolved data
        route.data.next(route._futureSnapshot.data);
    }
}
//# sourceMappingURL=router_state.js.map

/***/ },

/***/ 900:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_reference_actions__ = __webpack_require__(517);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return referenceReducer; });
;
var initialState = {
    tags: [],
    taskTypes: [],
    requestTypes: [],
    fetchFail: false
};
var referenceReducer = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions_reference_actions__["a" /* ReferenceActions */].FETCH_TAGS:
            return Object.assign({}, state, {
                tags: payload.tags
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_reference_actions__["a" /* ReferenceActions */].FETCH_TASK_TYPES:
            return Object.assign({}, state, {
                taskTypes: payload.taskTypes
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_reference_actions__["a" /* ReferenceActions */].FETCH_REQUEST_TYPES:
            return Object.assign({}, state, {
                requestTypes: payload.requestTypes
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions_reference_actions__["a" /* ReferenceActions */].FETCH_REFERENCE_FAILED:
            return Object.assign({}, state, {
                fetchFail: true
            });
        default:
            return state;
    }
};


/***/ },

/***/ 901:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(62);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return staffReducer; });
;
var initialState = {
    organizations: [],
    employees: []
};
var staffReducer = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions__["d" /* StaffActions */].FETCH_ORGANIZATIONS:
            return Object.assign({}, state, {
                organizations: payload.organizations
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["d" /* StaffActions */].FETCH_EMPLOYEES:
            return Object.assign({}, state, {
                employees: payload.employees
            });
        default:
            return state;
    }
};


/***/ },

/***/ 902:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(62);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return taskReducer; });
;
var initialState = {
    task: null,
    request: null,
    requests: [],
    showRequest: false,
    isResolveAction: false,
    comments: []
};
var taskReducer = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].FETCH_TASK_REQUESTS_FULFILLED:
            return Object.assign({}, state, {
                requests: payload.requests
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].TASK_REQUEST_ACCEPTANCE:
            return Object.assign({}, state, {
                task: payload.task,
                request: payload.request,
                showRequest: true,
                isResolveAction: true
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].TASK_REQUEST_NEW:
            return Object.assign({}, state, {
                task: payload,
                request: null,
                showRequest: true,
                isResolveAction: false
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].TASK_REQUEST_CANCEL:
            return Object.assign({}, state, {
                showRequest: false
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].FETCH_TASK_COMMENTS_FULFILLED:
            return Object.assign({}, state, {
                comments: payload.comments
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].TASK_UNLOAD:
            return initialState;
        default:
            return state;
    }
};


/***/ },

/***/ 903:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(62);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return tasksReducer; });
;
var initialState = {
    meta: {},
    tasks: [],
    expandedIds: [],
    loading: false,
    filter: {
        taskStatus: '',
        taskTypeId: '',
        assigneeUserId: '',
        tagIds: []
    }
};
var tasksReducer = function (state, _a) {
    if (state === void 0) { state = initialState; }
    var type = _a.type, payload = _a.payload;
    switch (type) {
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].FETCH_TASKS_FULFILLED:
            return Object.assign({}, state, {
                tasks: payload.tasks,
                meta: payload.meta
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].FETCH_TASK_FULFILLED:
            return Object.assign({}, state, {
                task: payload.task
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].TOGGLE_STREAM_EXPAND:
            var ind = state.expandedIds.indexOf(payload);
            if (ind == -1) {
                var ps = [].concat(state.expandedIds);
                ps.push(payload);
                return Object.assign({}, state, {
                    expandedIds: ps
                });
            }
            else {
                return Object.assign({}, state, {
                    expandedIds: state.expandedIds.filter(function (it) { return it != payload; })
                });
            }
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].SET_FILTER:
            return Object.assign({}, state, {
                filter: payload
            });
        default:
            return state;
    }
};


/***/ },

/***/ 904:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(28);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ReferenceService; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HEADERS = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json'
});
var ReferenceService = (function () {
    function ReferenceService(http) {
        this.http = http;
    }
    ReferenceService.prototype.fetchTags = function () {
        return this.http.get('/Reference/p?id=tags', { headers: HEADERS })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                tags: data.list,
                meta: data.meta
            };
        });
    };
    ReferenceService.prototype.fetchTaskTypes = function () {
        return this.http.get('/Reference/p?id=tasktypes', { headers: HEADERS })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                taskTypes: data.list,
                meta: data.meta
            };
        });
    };
    ReferenceService.prototype.fetchRequestTypes = function () {
        return this.http.get('/Reference/p?id=request-types', { headers: HEADERS })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                requestTypes: data.list,
                meta: data.meta
            };
        });
    };
    ReferenceService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])
    ], ReferenceService);
    return ReferenceService;
}());


/***/ },

/***/ 905:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return UploadService; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UploadService = (function () {
    function UploadService() {
        var _this = this;
        this.progress$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.progressObserver = observer;
        }).share();
    }
    UploadService.prototype.makeFileRequest = function (url, params, files) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
            }
            if (params) {
                for (var k in params) {
                    formData.append(k, params[k]);
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    }
                    else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = function (event) {
                var progress = Math.round(event.loaded / event.total * 100);
                _this.progressObserver.next(progress);
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    };
    UploadService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], UploadService);
    return UploadService;
}());


/***/ },

/***/ 906:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return DatepickerDirective; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Pikaday = __webpack_require__(361);
var DatepickerDirective = (function () {
    function DatepickerDirective(elementRef) {
        this.elementRef = elementRef;
        this.format = 'DD.MM.YYYY';
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    DatepickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.picker = new Pikaday({
            field: this.elementRef.nativeElement,
            format: this.format,
            onSelect: function () {
                _this.elementRef.nativeElement.value = _this.picker.toString();
                _this.select.emit(_this.picker.toString(_this.format));
            }
        });
    };
    DatepickerDirective.prototype.ngOnDestroy = function () {
        this.picker.destroy();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], DatepickerDirective.prototype, "format", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], DatepickerDirective.prototype, "select", void 0);
    DatepickerDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[datepicker]'
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], DatepickerDirective);
    return DatepickerDirective;
}());


/***/ },

/***/ 907:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return AutofocusDirective; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AutofocusDirective = (function () {
    function AutofocusDirective(element) {
        this.element = element;
    }
    AutofocusDirective.prototype.ngOnInit = function () {
        this.element.nativeElement.focus();
    };
    AutofocusDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[autofocus]'
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], AutofocusDirective);
    return AutofocusDirective;
}());


/***/ },

/***/ 908:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown_toggle_component__ = __webpack_require__(530);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return DropdownComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DropdownComponent = (function () {
    function DropdownComponent(renderer) {
        var _this = this;
        this.renderer = renderer;
        this.open = false;
        this.mouseEvent = false;
        this.tabIndex = 0;
        this.dropdownToggle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.selfClick = false;
        this.focused = false;
        this.delay = 500;
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            if (!_this.selfClick) {
                _this.open = false;
            }
            else {
                _this.selfClick = false;
            }
        });
        this.documentKeyupListener = this.renderer.listenGlobal('body', 'keyup', function (event) {
            if (event.code === 'Escape') {
                _this.open = false;
            }
        });
    }
    Object.defineProperty(DropdownComponent.prototype, "isOpen", {
        get: function () { return this.open; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DropdownComponent.prototype, "isFocused", {
        get: function () { return this.focused; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DropdownComponent.prototype, "_tabIndex", {
        get: function () { return this.tabIndex; },
        enumerable: true,
        configurable: true
    });
    ;
    DropdownComponent.prototype.onMouseEnter = function ($event) {
        var _this = this;
        if (this.mouseEvent) {
            clearTimeout(this.time);
            this.time = setTimeout(function () { return _this.open = true; }, this.delay);
        }
    };
    DropdownComponent.prototype.onMouseLeave = function ($event) {
        var _this = this;
        if (this.mouseEvent) {
            clearTimeout(this.time);
            this.time = setTimeout(function () { return _this.open = false; }, this.delay);
        }
    };
    DropdownComponent.prototype.onClick = function ($event) {
        this.selfClick = true;
    };
    DropdownComponent.prototype.onFocus = function ($event) {
        $event.preventDefault();
        this.focused = true;
    };
    DropdownComponent.prototype.onBlur = function ($event) {
        $event.preventDefault();
        this.focused = false;
        this.open = false;
    };
    DropdownComponent.prototype.onKeyDown = function ($event) {
        if ($event.key === 'Enter') {
            this.open = true;
        }
        else if ($event.key === 'ArrowUp') {
            console.log('ArrowUp');
        }
        else if ($event.key === 'ArrowDown') {
            console.log('ArrowDown');
        }
    };
    DropdownComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.toggleComponent.forEach(function (it) { return it.toggle.subscribe(function (event) {
            _this.toggleDropdown(event);
        }); });
    };
    DropdownComponent.prototype.ngOnDestroy = function () {
        this.documentClickListener();
    };
    DropdownComponent.prototype.toggleDropdown = function (event) {
        event.preventDefault();
        this.open = !this.open;
        this.dropdownToggle.emit(this.open);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.dropdown'), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "true", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.open'), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "isOpen", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.focus'), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "isFocused", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('tabIndex'), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "_tabIndex", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseenter', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onMouseEnter", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onMouseLeave", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onClick", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onFocus", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onBlur", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onKeyDown", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__dropdown_toggle_component__["a" /* DropdownToggleComponent */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], DropdownComponent.prototype, "toggleComponent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "open", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "mouseEvent", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "tabIndex", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], DropdownComponent.prototype, "dropdownToggle", void 0);
    DropdownComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[dropdown]',
            template: "<ng-content></ng-content>"
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], DropdownComponent);
    return DropdownComponent;
}());


/***/ },

/***/ 909:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropdown_component__ = __webpack_require__(908);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown_toggle_component__ = __webpack_require__(530);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return DROPDOWN_DIRECTIVES; });

var DROPDOWN_DIRECTIVES = [__WEBPACK_IMPORTED_MODULE_0__dropdown_component__["a" /* DropdownComponent */], __WEBPACK_IMPORTED_MODULE_1__dropdown_toggle_component__["a" /* DropdownToggleComponent */]];


/***/ },

/***/ 910:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img_view_service__ = __webpack_require__(358);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ImgViewComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ImgViewComponent = (function () {
    function ImgViewComponent(imgViewService) {
        var _this = this;
        this.imgViewService = imgViewService;
        this.show = false;
        this.sub = this.imgViewService.getEmitter().subscribe(function (item) {
            _this.url = item.url;
            _this.show = true;
        });
    }
    ImgViewComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ImgViewComponent.prototype.hide = function ($event) {
        this.show = false;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], ImgViewComponent.prototype, "url", void 0);
    ImgViewComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'img-view',
            template: "\n        <div class=\"img-view-overlay\" (click)=\"hide($event)\">\n            <div class=\"img-view-close\">&times;</div>\n        </div>\n        <div class=\"img-view-content\">\n            <img class=\"img-view-content-img\" [src]=\"url\" />\n        </div>\n    ",
            host: {
                '[class.img-view]': 'true',
                '[class.show]': 'show'
            }
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__img_view_service__["a" /* ImgViewService */]])
    ], ImgViewComponent);
    return ImgViewComponent;
}());


/***/ },

/***/ 911:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img_view_service__ = __webpack_require__(358);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ImgViewDirective; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ImgViewDirective = (function () {
    function ImgViewDirective(imgViewService) {
        this.imgViewService = imgViewService;
    }
    ImgViewDirective.prototype.show = function ($event) {
        this.imgViewService.show(this.url);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], ImgViewDirective.prototype, "url", void 0);
    ImgViewDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[img-view]',
            host: {
                '(click)': 'show($event)'
            }
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__img_view_service__["a" /* ImgViewService */]])
    ], ImgViewDirective);
    return ImgViewDirective;
}());


/***/ },

/***/ 912:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__markdown_converter__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__markdown_editor__ = __webpack_require__(913);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__marked_pipe__ = __webpack_require__(914);
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__markdown_converter__, "a")) __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__markdown_converter__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__markdown_editor__, "a")) __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__markdown_editor__["a"]; });
/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__marked_pipe__, "a")) __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__marked_pipe__["a"]; });





/***/ },

/***/ 913:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__markdown_converter__ = __webpack_require__(359);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return MarkdownEditorComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MarkdownEditorComponent = (function () {
    function MarkdownEditorComponent(mdc) {
        this.mdc = mdc;
        this.editable = true;
        this.markdown = '';
        this.klass = '';
        this.updateTimeout = 150;
        this.update = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.focus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.blur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.hasValue = false;
    }
    MarkdownEditorComponent.prototype.ngOnInit = function () {
        this.html = this.mdc.toHtml(this.markdown);
        this.hasValue = this.markdown.length > 0;
    };
    MarkdownEditorComponent.prototype.updateValue = function ($el) {
        var _this = this;
        clearTimeout(this.to);
        this.hasValue = $el.innerText.trim().length > 0;
        this.to = setTimeout(function () {
            _this.update.emit(_this.mdc.toMarkdown($el.innerHTML));
        }, this.updateTimeout);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], MarkdownEditorComponent.prototype, "editable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MarkdownEditorComponent.prototype, "markdown", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MarkdownEditorComponent.prototype, "klass", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MarkdownEditorComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MarkdownEditorComponent.prototype, "updateTimeout", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "update", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "focus", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "blur", void 0);
    MarkdownEditorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'markdown-editor',
            template: "\n        <div class=\"rt-editor {{klass}}\" [class.edit]=\"editable\">\n            <div class=\"rt-editor__placeholder\" *ngIf=\"placeHolder && !hasValue\">{{placeHolder}}</div>\n            <div class=\"rt-editor__area\"\n                [contentEditable]=\"editable\"\n                (keyup)=\"updateValue($event.target)\"\n                (focus)=\"focus.emit($event)\"\n                (blur)=\"blur.emit($event)\"\n                innerHTML=\"{{html}}\">\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__markdown_converter__["a" /* MarkdownConverter */]])
    ], MarkdownEditorComponent);
    return MarkdownEditorComponent;
}());


/***/ },

/***/ 914:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__markdown_converter__ = __webpack_require__(359);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return MarkedPipe; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MarkedPipe = (function () {
    function MarkedPipe(mdc) {
        this.mdc = mdc;
    }
    MarkedPipe.prototype.transform = function (text) {
        return this.mdc.toHtml(text);
    };
    MarkedPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'marked' }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__markdown_converter__["a" /* MarkdownConverter */]])
    ], MarkedPipe);
    return MarkedPipe;
}());


/***/ },

/***/ 915:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_service__ = __webpack_require__(531);

/* harmony export */ __webpack_require__.d(exports, "b", function() { return NotificationComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotificationComponent = (function () {
    function NotificationComponent(notifyService) {
        this.notifyService = notifyService;
        this.notifications = [];
    }
    Object.defineProperty(NotificationComponent.prototype, "isHidden", {
        get: function () { return this.notifications.length == 0; },
        enumerable: true,
        configurable: true
    });
    ;
    NotificationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listener = this.notifyService.getEmitter().subscribe(function (item) {
            switch (item.command) {
                case 'cleanAll':
                    _this.notifications = [];
                    break;
                case 'add':
                    _this.addNotify(item.notify);
                    break;
                default:
                    break;
            }
        });
    };
    NotificationComponent.prototype.ngOnDestroy = function () {
        if (this.listener) {
            this.notifications.map(function (it) { return it.getEmitter().unsubscribe(); });
            this.listener.unsubscribe();
        }
    };
    NotificationComponent.prototype.addNotify = function (notify) {
        var _this = this;
        this.notifications.push(notify);
        notify.getEmitter().subscribe(function (item) { return _this.notifyEmitter(item); });
    };
    NotificationComponent.prototype.notifyEmitter = function (data) {
        if (data.dismiss) {
            var index = this.notifications.indexOf(data.notify);
            this.notifications.splice(index, 1);
            data.notify.getEmitter().unsubscribe();
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.nb-notify'), 
        __metadata('design:type', Object)
    ], NotificationComponent.prototype, "true", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.hidden'), 
        __metadata('design:type', Object)
    ], NotificationComponent.prototype, "isHidden", null);
    NotificationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'notification',
            template: "\n        <div class=\"nb-notify-entry-{{notify.type}}\"\n            [class.dismiss-click]=\"notify.delay == 'click'\"\n            [style.display]=\"notify.display ? 'block': 'none'\"\n            (click)=\"notify.dismiss()\"\n            *ngFor=\"let notify of notifications\">\n            {{notify.message}}\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__notification_service__["a" /* NotificationService */]])
    ], NotificationComponent);
    return NotificationComponent;
}());


/***/ },

/***/ 916:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination__ = __webpack_require__(917);
/* harmony namespace reexport */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__pagination__["a"]; });



/***/ },

/***/ 917:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return PaginationComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PaginationComponent = (function () {
    function PaginationComponent() {
        this.maxPageControl = 5;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.totalPages = 0;
        this.currentPage = 0;
        this.startPage = 0;
        this.stopPage = 0;
        this.pages = [];
    }
    Object.defineProperty(PaginationComponent.prototype, "isHidden", {
        get: function () { return this.totalPages < 2; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PaginationComponent.prototype, "_totalPages", {
        set: function (totalPages) {
            this.totalPages = totalPages;
            this.currentPage = totalPages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "_page", {
        set: function (page) {
            this.currentPage = page;
            this.pagination();
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.setPage = function (page, $event) {
        $event.preventDefault();
        this.change.emit({ page: page });
    };
    PaginationComponent.prototype.pagination = function () {
        this.pages = [];
        if (this.totalPages <= 1) {
            return;
        }
        var perPage = Math.floor(this.maxPageControl / 2);
        this.startPage = (this.currentPage - perPage);
        this.stopPage = (this.currentPage + perPage);
        if (this.startPage <= perPage) {
            this.startPage = 1;
        }
        else if (this.currentPage == this.totalPages) {
            this.startPage = this.totalPages - this.maxPageControl;
        }
        if (this.stopPage > (this.totalPages - perPage)) {
            this.stopPage = this.totalPages;
        }
        else if (this.currentPage == 1) {
            this.stopPage = this.maxPageControl + 1;
        }
        if ((this.maxPageControl + perPage) >= this.totalPages) {
            this.startPage = 1;
            this.stopPage = this.totalPages;
        }
        for (var p = this.startPage; p <= this.stopPage; p++) {
            this.pages.push(p);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('hidden'), 
        __metadata('design:type', Object)
    ], PaginationComponent.prototype, "isHidden", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "maxPageControl", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('totalPages'), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], PaginationComponent.prototype, "_totalPages", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('page'), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], PaginationComponent.prototype, "_page", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], PaginationComponent.prototype, "change", void 0);
    PaginationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'pagination',
            template: "\n        <div class=\"pagination\" *ngIf=\"totalPages > 1\">\n            <a href=\"#\" *ngIf=\"startPage > 1\" (click)=\"setPage(1, $event)\">1</a>\n            <span *ngIf=\"startPage > 1\">...</span>\n            <a [class.page-active]=\"p == currentPage\" href=\"#\" *ngFor=\"let p of pages\" (click)=\"setPage(p, $event)\">{{p}}</a>\n            <span *ngIf=\"stopPage < totalPages\">...</span>\n            <a *ngIf=\"stopPage < totalPages\" href=\"#\" (click)=\"setPage(totalPages, $event)\">{{totalPages}}</a>\n        </div>\n    ",
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], PaginationComponent);
    return PaginationComponent;
}());


/***/ },

/***/ 918:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__switch_button__ = __webpack_require__(919);
/* harmony namespace reexport */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__switch_button__["a"]; });



/***/ },

/***/ 919:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return SwitchButtonComponent; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SwitchButtonComponent = (function () {
    function SwitchButtonComponent() {
        this.class = 'input';
        this.name = 'swb' + Math.random();
        this.multi = false;
        this.disabled = false;
        this.checkDefault = true;
    }
    SwitchButtonComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        [].concat(this.items).forEach(function (it) {
            if (_this.checkDefault && it && it.value == _this.model[_this.value]) {
                _this.checkDefault = false;
            }
        });
    };
    SwitchButtonComponent.prototype.select = function (value) {
        this.model[this.value] = value;
    };
    SwitchButtonComponent.prototype.isSelected = function (item) {
        return item.value == this.model[this.value] || (this.checkDefault && item.default);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.switch-button'), 
        __metadata('design:type', Object)
    ], SwitchButtonComponent.prototype, "true", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SwitchButtonComponent.prototype, "model", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SwitchButtonComponent.prototype, "value", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SwitchButtonComponent.prototype, "items", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SwitchButtonComponent.prototype, "class", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SwitchButtonComponent.prototype, "name", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SwitchButtonComponent.prototype, "multi", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SwitchButtonComponent.prototype, "disabled", void 0);
    SwitchButtonComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'switch-button',
            template: "\n        <label\n             [ngClass]=\"class\"\n             [class.active]=\"isSelected(item)\"\n             [class.disabled]=\"disabled || item.disabled\"\n             *ngFor=\"let item of items\">\n            <input\n                type=\"{{multi ? 'checkbox' : 'radio'}}\"\n                name=\"{{name}}\"\n                value=\"{{item.value}}\"\n                [checked]=\"isSelected(item)\"\n                [disabled]=\"disabled || item.disabled\"\n                (change)=\"select(item.value)\" />\n            <i class=\"fa fa-{{item.icon}}\" *ngIf=\"item.icon\"></i>\n            <span>{{item.text}}</span>\n        </label>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], SwitchButtonComponent);
    return SwitchButtonComponent;
}());


/***/ },

/***/ 920:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs__ = __webpack_require__(921);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tab__ = __webpack_require__(533);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TAB_DIRECTIVES; });

var TAB_DIRECTIVES = [__WEBPACK_IMPORTED_MODULE_0__tabs__["a" /* Tabs */], __WEBPACK_IMPORTED_MODULE_1__tab__["a" /* Tab */]];


/***/ },

/***/ 921:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tab__ = __webpack_require__(533);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Tabs; });var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Tabs = (function () {
    function Tabs() {
    }
    Tabs.prototype.ngAfterContentInit = function () {
        var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    Tabs.prototype.selectTab = function (tab) {
        this.tabs.forEach(function (tab) { return tab.active = false; });
        tab.active = true;
        tab.select.emit(true);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__tab__["a" /* Tab */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], Tabs.prototype, "tabs", void 0);
    Tabs = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tabs',
            template: "\n        <ul class=\"nav nav-tabs\">\n            <li *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\" [class.pinned]=\"tab.pinned\" [class.active]=\"tab.active\">\n                <a href=\"#\" (click)=\"$event.preventDefault()\">\n                    <i class=\"{{tab.icon}}\" *ngIf=\"tab.icon\"></i>\n                    {{tab.title}}\n                </a>\n            </li>\n        </ul>\n        <ng-content></ng-content>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Tabs);
    return Tabs;
}());


/***/ },

/***/ 922:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(923);
/* harmony namespace reexport */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__store__["a"]; });



/***/ },

/***/ 923:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngrx_store_logger__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngrx_store_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ngrx_store_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers_environment_reducer__ = __webpack_require__(898);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers_authed_reducer__ = __webpack_require__(897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reducers_projects_reducer__ = __webpack_require__(899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reducers_tasks_reducer__ = __webpack_require__(903);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reducers_task_reducer__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reducers_staff_reducer__ = __webpack_require__(901);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reducers_reference_reducer__ = __webpack_require__(900);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return APP_STORE; });









var logger = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ngrx_store_logger__["storeLogger"])({
    level: 'log',
    collapsed: false,
    duration: true,
    timestamp: true
});
var APP_STORE = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["provideStore"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__["compose"])(logger, __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["combineReducers"])({
    environment: __WEBPACK_IMPORTED_MODULE_3__reducers_environment_reducer__["a" /* environmentReducer */],
    authed: __WEBPACK_IMPORTED_MODULE_4__reducers_authed_reducer__["a" /* authedReducer */],
    projects: __WEBPACK_IMPORTED_MODULE_5__reducers_projects_reducer__["a" /* projectsReducer */],
    tasks: __WEBPACK_IMPORTED_MODULE_6__reducers_tasks_reducer__["a" /* tasksReducer */],
    task: __WEBPACK_IMPORTED_MODULE_7__reducers_task_reducer__["a" /* taskReducer */],
    staff: __WEBPACK_IMPORTED_MODULE_8__reducers_staff_reducer__["a" /* staffReducer */],
    reference: __WEBPACK_IMPORTED_MODULE_9__reducers_reference_reducer__["a" /* referenceReducer */]
}));


/***/ },

/***/ 926:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(554);


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);


/***/ }

},[926]);
//# sourceMappingURL=app.js.map