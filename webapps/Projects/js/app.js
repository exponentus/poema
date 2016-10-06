webpackJsonp([0],Array(32).concat([
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__(539);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index__["c"]; });
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PRIMARY_OUTLET; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return NavigationCancelingError; });
/**
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
 * @whatItDoes Name of the primary outlet.
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatAll__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_last__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_last___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_last__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeAll__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared__ = __webpack_require__(33);
/* harmony export (immutable) */ exports["h"] = shallowEqualArrays;
/* harmony export (immutable) */ exports["d"] = shallowEqual;
/* harmony export (immutable) */ exports["a"] = flatten;
/* unused harmony export first */
/* harmony export (immutable) */ exports["i"] = last;
/* unused harmony export and */
/* harmony export (immutable) */ exports["g"] = merge;
/* harmony export (immutable) */ exports["c"] = forEach;
/* harmony export (immutable) */ exports["e"] = waitForMap;
/* harmony export (immutable) */ exports["f"] = andObservables;
/* harmony export (immutable) */ exports["b"] = wrapIntoObservable;
/**
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__environment_actions__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_actions__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_actions__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_actions__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reference_actions__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__staff_actions__ = __webpack_require__(549);
/* harmony export (binding) */ __webpack_require__.d(exports, "f", function() { return APP_STORE_ACTIONS; });






/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__environment_actions__["a"]; });

/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__app_actions__["a"]; });

/* unused harmony reexport ProjectActions */

/* harmony reexport (binding) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__task_actions__["a"]; });

/* harmony reexport (binding) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__reference_actions__["a"]; });

/* harmony reexport (binding) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__staff_actions__["a"]; });

var APP_STORE_ACTIONS = [
    __WEBPACK_IMPORTED_MODULE_0__environment_actions__["a" /* EnvironmentActions */],
    __WEBPACK_IMPORTED_MODULE_1__app_actions__["a" /* AppActions */],
    __WEBPACK_IMPORTED_MODULE_2__project_actions__["a" /* ProjectActions */],
    __WEBPACK_IMPORTED_MODULE_3__task_actions__["a" /* TaskActions */],
    __WEBPACK_IMPORTED_MODULE_4__reference_actions__["a" /* ReferenceActions */],
    __WEBPACK_IMPORTED_MODULE_5__staff_actions__["a" /* StaffActions */]
];


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(18);
/* harmony export (immutable) */ exports["a"] = xhrHeaders;
/* harmony export (immutable) */ exports["e"] = createURLSearchParams;
/* harmony export (immutable) */ exports["c"] = serializeObj;
/* harmony export (immutable) */ exports["b"] = parseResponseObjects;
/* harmony export (immutable) */ exports["d"] = transformPostResponse;
/* harmony export (immutable) */ exports["g"] = createCookie;
/* harmony export (immutable) */ exports["f"] = imgToBase64;

function xhrHeaders() {
    return new __WEBPACK_IMPORTED_MODULE_0__angular_http__["Headers"]({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json'
    });
}
function createURLSearchParams(params) {
    var searchParams = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["URLSearchParams"]();
    for (var i in params) {
        if (params[i] instanceof Array) {
            for (var j in params[i]) {
                searchParams.append(i, params[i][j]);
            }
        }
        else {
            if (typeof (params[i]) != 'undefined') {
                searchParams.set(i, params[i]);
            }
        }
    }
    return searchParams;
}
function serializeObj(obj) {
    var result = [];
    for (var property in obj) {
        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
    }
    return result.join('&');
}
function parseResponseObjects(objects) {
    var result = {};
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
        else if (obj.actions) {
            result['actions'] = {};
            for (var _a = 0, _b = obj.actions; _a < _b.length; _a++) {
                var action = _b[_a];
                result['actions'][action.customID] = action.url ? { url: action.url } : true;
            }
        }
        else {
            for (var k in obj) {
                result[k] = obj[k];
            }
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
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__organization__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__employee__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__attachment__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__task__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tag__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__task_type__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__comment__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__request__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__request_type__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__user__ = __webpack_require__(292);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__organization__["a"]; });
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__attachment__["a"]; });
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_7__comment__["a"]; });
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_9__request_type__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_10__user__["a"]; });













/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__translate_service__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_service__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__task_service__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reference_service__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__staff_service__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__upload_service__ = __webpack_require__(599);
/* harmony export (binding) */ __webpack_require__.d(exports, "g", function() { return APP_SERVICES; });







/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__app_service__["a"]; });

/* unused harmony reexport TranslateService */

/* harmony reexport (binding) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__project_service__["a"]; });

/* harmony reexport (binding) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__task_service__["a"]; });

/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__reference_service__["a"]; });

/* harmony reexport (binding) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__staff_service__["a"]; });

/* harmony reexport (binding) */ __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__upload_service__["a"]; });

var APP_SERVICES = [
    __WEBPACK_IMPORTED_MODULE_0__app_service__["a" /* AppService */],
    __WEBPACK_IMPORTED_MODULE_1__translate_service__["a" /* TranslateService */],
    __WEBPACK_IMPORTED_MODULE_2__project_service__["a" /* ProjectService */],
    __WEBPACK_IMPORTED_MODULE_3__task_service__["a" /* TaskService */],
    __WEBPACK_IMPORTED_MODULE_4__reference_service__["a" /* ReferenceService */],
    __WEBPACK_IMPORTED_MODULE_5__staff_service__["a" /* StaffService */]
];


/***/ },
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_collection__ = __webpack_require__(34);
/* harmony export (immutable) */ exports["e"] = createEmptyUrlTree;
/* harmony export (immutable) */ exports["f"] = containsTree;
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return UrlTree; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UrlSegmentGroup; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return UrlSegment; });
/* unused harmony export equalSegments */
/* unused harmony export equalPath */
/* harmony export (immutable) */ exports["d"] = mapChildrenIntoArray;
/* harmony export (binding) */ __webpack_require__.d(exports, "g", function() { return UrlSerializer; });
/* harmony export (binding) */ __webpack_require__.d(exports, "h", function() { return DefaultUrlSerializer; });
/* unused harmony export serializePaths */
/* unused harmony export encode */
/* unused harmony export decode */
/* unused harmony export serializePath */
/**
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
 * @whatItDoes Represents the parsed URL.
 *
 * @howToUse
 *
 * ```
 * @Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const tree: UrlTree =
 * router.parseUrl('/team/33/(user/victor//support:help)?debug=true#fragment');
 *     const f = tree.fragment; // return 'fragment'
 *     const q = tree.queryParams; // returns {debug: 'true'}
 *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
 *     const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
 *     g.children[PRIMARY_OUTLET].segments; // returns 2 segments 'user' and 'victor'
 *     g.children['support'].segments; // return 1 segment 'help'
 *   }
 * }
 * ```
 *
 * @description
 *
 * Since a router state is a tree, and the URL is nothing but a serialized state, the URL is a
 * serialized tree.
 * UrlTree is a data structure that provides a lot of affordances in dealing with URLs
 *
 * @stable
 */
var UrlTree = (function () {
    /**
     * @internal
     */
    function UrlTree(
        /**
        * The root segment group of the URL tree.
         */
        root, 
        /**
         * The query params of the URL.
         */
        queryParams, 
        /**
         * The fragment of the URL.
         */
        fragment) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    /**
     * @docsNotRequired
     */
    UrlTree.prototype.toString = function () { return new DefaultUrlSerializer().serialize(this); };
    return UrlTree;
}());
/**
 * @whatItDoes Represents the parsed URL segment.
 *
 * See {@link UrlTree} for more information.
 *
 * @stable
 */
var UrlSegmentGroup = (function () {
    function UrlSegmentGroup(
        /**
         * The URL segments of this group. See {@link UrlSegment} for more information.
         */
        segments, 
        /**
         * The list of children of this group.
         */
        children) {
        var _this = this;
        this.segments = segments;
        this.children = children;
        /**
         * The parent node in the url tree.
         */
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
    /**
     * @docsNotRequired
     */
    UrlSegmentGroup.prototype.toString = function () { return serializePaths(this); };
    return UrlSegmentGroup;
}());
/**
 * @whatItDoes Represents a single URL segment.
 *
 * @howToUse
 *
 * ```
 * @Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const tree: UrlTree = router.parseUrl('/team;id=33');
 *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
 *     const s: UrlSegment[] = g.segments;
 *     s[0].path; // returns 'team'
 *     s[0].parameters; // returns {id: 33}
 *   }
 * }
 * ```
 *
 * @description
 *
 * A UrlSegment is a part of a URL between the two slashes. It contains a path and
 * the matrix parameters associated with the segment.
 *
 * @stable
 */
var UrlSegment = (function () {
    function UrlSegment(
        /**
         * The part part of a URL segment.
         */
        path, 
        /**
         * The matrix parameters associated with a segment.
         */
        parameters) {
        this.path = path;
        this.parameters = parameters;
    }
    /**
     * @docsNotRequired
     */
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
 * @whatItDoes Serializes and deserializes a URL string into a URL tree.
 *
 * @description The url serialization strategy is customizable. You can
 * make all URLs case insensitive by providing a custom UrlSerializer.
 *
 * See {@link DefaultUrlSerializer} for an example of a URL serializer.
 *
 * @stable
 */
var UrlSerializer = (function () {
    function UrlSerializer() {
    }
    return UrlSerializer;
}());
/**
 * @whatItDoes A default implementation of the {@link UrlSerializer}.
 *
 * @description
 *
 * Example URLs:
 *
 * ```
 * /inbox/33(popup:compose)
 * /inbox/33;open=true/messages/44
 * ```
 *
 * DefaultUrlSerializer uses parentheses to serialize secondary segments (e.g., popup:compose), the
 * colon syntax to specify the outlet, and the ';parameter=value' syntax (e.g., open=true) to
 * specify route specific parameters.
 *
 * @stable
 */
var DefaultUrlSerializer = (function () {
    function DefaultUrlSerializer() {
    }
    /**
     * Parse a url into a {@link UrlTree}.
     */
    DefaultUrlSerializer.prototype.parse = function (url) {
        var p = new UrlParser(url);
        return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
    };
    /**
     * Converts a {@link UrlTree} into a url.
     */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




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
        return this.http.get('p?id=userprofile', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* xhrHeaders */])() })
            .retry(3)
            .map(function (response) {
            var res = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["b" /* parseResponseObjects */])(response.json().objects);
            var pageSize = 20;
            if (res.pagesize) {
                pageSize = res.pagesize;
            }
            _this.isLogged = true;
            _this.language = res.currentLang;
            _this.employee = res.employee;
            _this.workspaceUrl = res.workspaceUrl;
            return {
                userProfile: res.employee,
                languages: res.language.list[0].localizedName,
                pageSize: pageSize,
                language: res.currentLang || _this.language,
                workspaceUrl: res.workspaceUrl
            };
        })
            .catch(function (error) { return _this.handleError(error); });
    };
    AppService.prototype.updateUserProfile = function (userForm) {
        return this.http.post('p?id=userprofile', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["c" /* serializeObj */])(userForm), { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["d" /* transformPostResponse */])(error)); });
    };
    AppService.prototype.logout = function () {
        window.location.href = this.workspaceUrl;
    };
    AppService.prototype.handleError = function (error) {
        if (error.status === 401) {
            this.logout();
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["d" /* transformPostResponse */])(error));
    };
    AppService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], AppService);
    return AppService;
    var _a;
}());


/***/ },
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__url_tree__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_collection__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_tree__ = __webpack_require__(171);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RouterState; });
/* harmony export (immutable) */ exports["f"] = createEmptyState;
/* unused harmony export createEmptyStateSnapshot */
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return ActivatedRoute; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return InheritedResolve; });
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return ActivatedRouteSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return RouterStateSnapshot; });
/* harmony export (immutable) */ exports["g"] = advanceActivatedRoute;
/**
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
 * @whatItDoes Represents the state of the router.
 *
 * @howToUse
 *
 * ```
 * @Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state: RouterState = router.routerState;
 *     const root: ActivatedRoute = state.root;
 *     const child = root.firstChild;
 *     const id: Observable<string> = child.params.map(p => p.id);
 *     //...
 *   }
 * }
 * ```
 *
 * @description
 * RouterState is a tree of activated routes. Every node in this tree knows about the "consumed" URL
 * segments,
 * the extracted parameters, and the resolved data.
 *
 * See {@link ActivatedRoute} for more information.
 *
 * @stable
 */
var RouterState = (function (_super) {
    __extends(RouterState, _super);
    /**
     * @internal
     */
    function RouterState(root, 
        /**
         * The current snapshot of the router state.
         */
        snapshot) {
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
 * @whatItDoes Contains the information about a route associated with a component loaded in an
 * outlet.
 * ActivatedRoute can also be used to traverse the router state tree.
 *
 * @howToUse
 *
 * ```
 * @Component({templateUrl:'./my-component.html'})
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: Observable<string> = route.params.map(p => p.id);
 *     const url: Observable<string> = route.url.map(s => s.join(''));
 *     const user = route.data.map(d => d.user); //includes `data` and `resolve`
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
    function ActivatedRoute(
        /**
         *  The URL segments matched by this route. The observable will emit a new value when
         *  the array of segments changes.
         */
        url, 
        /**
         * The matrix parameters scoped to this route. The observable will emit a new value when
         * the set of the parameters changes.
         */
        params, 
        /**
         * The query parameters shared by all the routes. The observable will emit a new value when
         * the set of the parameters changes.
         */
        queryParams, 
        /**
         * The URL fragment shared by all the routes. The observable will emit a new value when
         * the URL fragment changes.
         */
        fragment, 
        /**
         * The static and resolved data of this route. The observable will emit a new value when
         * any of the resolvers returns a new object.
         */
        data, 
        /**
         * The outlet name of the route. It's a constant.
         */
        outlet, 
        /**
         * The component of the route. It's a constant.
         */
        component, // TODO: vsavkin: remove |string
        futureSnapshot) {
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
        /**
         * The configuration used to match this route.
         */
        get: function () { return this._futureSnapshot.routeConfig; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "root", {
        /**
         * The root of the router state.
         */
        get: function () { return this._routerState.root; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "parent", {
        /**
         * The parent of this route in the router state tree.
         */
        get: function () { return this._routerState.parent(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "firstChild", {
        /**
         * The first child of this route in the router state tree.
         */
        get: function () { return this._routerState.firstChild(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "children", {
        /**
         * The children of this route in the router state tree.
         */
        get: function () { return this._routerState.children(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "pathFromRoot", {
        /**
         * The path from the root of the router state tree to this route.
         */
        get: function () { return this._routerState.pathFromRoot(this); },
        enumerable: true,
        configurable: true
    });
    /**
     * @docsNotRequired
     */
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
 * @whatItDoes Contains the information about a route associated with a component loaded in an
 * outlet
 * at a particular moment in time. ActivatedRouteSnapshot can also be used to traverse the router
 * state tree.
 *
 * @howToUse
 *
 * ```
 * @Component({templateUrl:'./my-component.html'})
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: string = route.snapshot.params.id;
 *     const url: string = route.snapshot.url.join('');
 *     const user = route.snapshot.data.user;
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
    function ActivatedRouteSnapshot(
        /**
         *  The URL segments matched by this route.
         */
        url, 
        /**
         * The matrix parameters scoped to this route.
         */
        params, 
        /**
         * The query parameters shared by all the routes.
         */
        queryParams, 
        /**
         * The URL fragment shared by all the routes.
         */
        fragment, 
        /**
         * The static and resolved data of this route.
         */
        data, 
        /**
         * The outlet name of the route.
         */
        outlet, 
        /**
         * The component of the route.
         */
        component, routeConfig, urlSegment, lastPathIndex, resolve) {
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
        /**
         * The configuration used to match this route.
         */
        get: function () { return this._routeConfig; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "root", {
        /**
         * The root of the router state.
         */
        get: function () { return this._routerState.root; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "parent", {
        /**
         * The parent of this route in the router state tree.
         */
        get: function () { return this._routerState.parent(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "firstChild", {
        /**
         * The first child of this route in the router state tree.
         */
        get: function () { return this._routerState.firstChild(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "children", {
        /**
         * The children of this route in the router state tree.
         */
        get: function () { return this._routerState.children(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "pathFromRoot", {
        /**
         * The path from the root of the router state tree to this route.
         */
        get: function () { return this._routerState.pathFromRoot(this); },
        enumerable: true,
        configurable: true
    });
    /**
     * @docsNotRequired
     */
    ActivatedRouteSnapshot.prototype.toString = function () {
        var url = this.url.map(function (s) { return s.toString(); }).join('/');
        var matched = this._routeConfig ? this._routeConfig.path : '';
        return "Route(url:'" + url + "', path:'" + matched + "')";
    };
    return ActivatedRouteSnapshot;
}());
/**
 * @whatItDoes Represents the state of the router at a moment in time.
 *
 * @howToUse
 *
 * ```
 * @Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state: RouterState = router.routerState;
 *     const snapshot: RouterStateSnapshot = state.snapshot;
 *     const root: ActivatedRouteSnapshot = snapshot.root;
 *     const child = root.firstChild;
 *     const id: Observable<string> = child.params.map(p => p.id);
 *     //...
 *   }
 * }
 * ```
 *
 * @description
 * RouterStateSnapshot is a tree of activated route snapshots. Every node in this tree knows about
 * the "consumed" URL segments, the extracted parameters, and the resolved data.
 *
 * @stable
 */
var RouterStateSnapshot = (function (_super) {
    __extends(RouterStateSnapshot, _super);
    /**
     * @internal
     */
    function RouterStateSnapshot(
        /** The url from which this snapshot was created */
        url, root) {
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
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return EnvironmentActions; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notification_service__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_component__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notification__ = __webpack_require__(296);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__notification_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__notification_component__["a"]; });
/* unused harmony namespace reexport */





/***/ },
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_every__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_mergeAll__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_mergeAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_mergeAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_reduce__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_reduce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_operator_reduce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__apply_redirects__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__create_router_state__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__create_url_tree__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__recognize__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__router_config_loader__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__router_outlet_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__router_state__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__url_tree__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__utils_collection__ = __webpack_require__(34);
/* unused harmony export NavigationStart */
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return NavigationEnd; });
/* unused harmony export NavigationCancel */
/* unused harmony export NavigationError */
/* unused harmony export RoutesRecognized */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Router; });
/* unused harmony export PreActivation */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




















/**
 * @whatItDoes Represents an event triggered when a navigation starts.
 *
 * @stable
 */
var NavigationStart = (function () {
    // TODO: vsavkin: make internal
    function NavigationStart(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url) {
        this.id = id;
        this.url = url;
    }
    /** @docsNotRequired */
    NavigationStart.prototype.toString = function () { return "NavigationStart(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationStart;
}());
/**
 * @whatItDoes Represents an event triggered when a navigation ends successfully.
 *
 * @stable
 */
var NavigationEnd = (function () {
    // TODO: vsavkin: make internal
    function NavigationEnd(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        urlAfterRedirects) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
    }
    /** @docsNotRequired */
    NavigationEnd.prototype.toString = function () {
        return "NavigationEnd(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "')";
    };
    return NavigationEnd;
}());
/**
 * @whatItDoes Represents an event triggered when a navigation is canceled.
 *
 * @stable
 */
var NavigationCancel = (function () {
    // TODO: vsavkin: make internal
    function NavigationCancel(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        reason) {
        this.id = id;
        this.url = url;
        this.reason = reason;
    }
    /** @docsNotRequired */
    NavigationCancel.prototype.toString = function () { return "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationCancel;
}());
/**
 * @whatItDoes Represents an event triggered when a navigation fails due to an unexpected error.
 *
 * @stable
 */
var NavigationError = (function () {
    // TODO: vsavkin: make internal
    function NavigationError(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        error) {
        this.id = id;
        this.url = url;
        this.error = error;
    }
    /** @docsNotRequired */
    NavigationError.prototype.toString = function () {
        return "NavigationError(id: " + this.id + ", url: '" + this.url + "', error: " + this.error + ")";
    };
    return NavigationError;
}());
/**
 * @whatItDoes Represents an event triggered when routes are recognized.
 *
 * @stable
 */
var RoutesRecognized = (function () {
    // TODO: vsavkin: make internal
    function RoutesRecognized(
        /** @docsNotRequired */
        id, 
        /** @docsNotRequired */
        url, 
        /** @docsNotRequired */
        urlAfterRedirects, 
        /** @docsNotRequired */
        state) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    /** @docsNotRequired */
    RoutesRecognized.prototype.toString = function () {
        return "RoutesRecognized(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
    };
    return RoutesRecognized;
}());
function defaultErrorHandler(error) {
    throw error;
}
/**
 * @whatItDoes Provides the navigation and url manipulation capabilities.
 *
 * See {@link Routes} for more details and examples.
 *
 * @ngModule RouterModule
 *
 * @stable
 */
var Router = (function () {
    /**
     * Creates the router service.
     */
    // TODO: vsavkin make internal after the final is out.
    function Router(rootComponentType, urlSerializer, outletMap, location, injector, loader, compiler, config) {
        this.rootComponentType = rootComponentType;
        this.urlSerializer = urlSerializer;
        this.outletMap = outletMap;
        this.location = location;
        this.injector = injector;
        this.config = config;
        this.navigationId = 0;
        /**
         * Error handler that is invoked when a navigation errors.
         *
         * See {@link ErrorHandler} for more information.
         */
        this.errorHandler = defaultErrorHandler;
        /**
         * Indicates if at least one navigation happened.
         */
        this.navigated = false;
        this.resetConfig(config);
        this.routerEvents = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.currentUrlTree = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_18__url_tree__["e" /* createEmptyUrlTree */])();
        this.configLoader = new __WEBPACK_IMPORTED_MODULE_14__router_config_loader__["b" /* RouterConfigLoader */](loader, compiler);
        this.currentRouterState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_16__router_state__["f" /* createEmptyState */])(this.currentUrlTree, this.rootComponentType);
    }
    /**
     * Sets up the location change listener and performs the initial navigation.
     */
    Router.prototype.initialNavigation = function () {
        this.setUpLocationChangeListener();
        this.navigateByUrl(this.location.path(true), { replaceUrl: true });
    };
    /**
     * Sets up the location change listener.
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
    /**
     * @docsNotRequired
     */
    Router.prototype.ngOnDestroy = function () { this.dispose(); };
    /**
     * Disposes of the router.
     */
    Router.prototype.dispose = function () { this.locationSubscription.unsubscribe(); };
    /**
     * Applies an array of commands to the current url tree and creates a new url tree.
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
     * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
     *
     * // Navigate without updating the URL
     * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true });
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
     * Parses a string into a {@link UrlTree}.
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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_mergeMap__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_collection__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoadedRouterConfig; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return RouterConfigLoader; });
/**
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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RouterOutletMap; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @whatItDoes Contains all the router outlets created in a component.
 *
 * @stable
 */
var RouterOutletMap = (function () {
    function RouterOutletMap() {
        /** @internal */
        this._outlets = {};
    }
    /**
     * Adds an outlet to this map.
     */
    RouterOutletMap.prototype.registerOutlet = function (name, outlet) { this._outlets[name] = outlet; };
    /**
     * Removes an outlet from this map.
     */
    RouterOutletMap.prototype.removeOutlet = function (name) { this._outlets[name] = undefined; };
    return RouterOutletMap;
}());
//# sourceMappingURL=router_outlet_map.js.map

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProjectActions; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_state__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RouterLink; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return RouterLinkWithHref; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




/**
 * @whatItDoes Lets you link to specific parts of your app.
 *
 * @howToUse
 *
 * Consider the following route configuration:

 * ```
 * [{ path: 'user/:name', component: UserCmp }]
 * ```
 *
 * When linking to this `user/:name` route, you can write:
 *
 * ```
 * <a routerLink='/user/bob'>link to user component</a>
 * ```
 *
 * @description
 *
 * The RouterLink directives let you link to specific parts of your app.
 *
 * Whe the link is static, you can use the directive as follows:
 *
 * ```
 * <a routerLink="/user/bob">link to user component</a>
 * ```
 *
 * If you use dynamic values to generate the link, you can pass an array of path
 * segments, followed by the params for each segment.
 *
 * For instance `['/team', teamId, 'user', userName, {details: true}]`
 * means that we want to generate a link to `/team/11/user/bob;details=true`.
 *
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
 * `/user/(jim//aux:team)`.
 *
 * @selector ':not(a)[routerLink]'
 * @ngModule RouterModule
 *
 * See {@link Router.createUrlTree} for more information.
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
 * @whatItDoes Lets you link to specific parts of your app.
 *
 * See {@link RouterLink} for more information.
 *
 * @selector 'a[routerLink]'
 * @ngModule RouterModule
 *
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
/* 171 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Tree; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return TreeNode; });
/**
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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProjectService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProjectService = (function () {
    function ProjectService(http, translate, appService) {
        this.http = http;
        this.translate = translate;
        this.appService = appService;
    }
    ProjectService.prototype.getProjectStatusTypes = function () {
        return this.translate.get(['draft', 'active', 'completed']).map(function (t) { return [
            { value: 'DRAFT', text: t.draft, default: true },
            { value: 'ACTIVE', text: t.active },
            { value: 'COMPLETED', text: t.completed }
        ]; });
    };
    ProjectService.prototype.fetchProjects = function (queryParams) {
        var _this = this;
        if (queryParams === void 0) { queryParams = {}; }
        return this.http.get('p?id=project-view', {
            headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])(),
            search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["e" /* createURLSearchParams */])(queryParams)
        })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                projects: data.list,
                meta: data.meta
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    ProjectService.prototype.fetchProjectById = function (projectId) {
        var _this = this;
        var url = 'p?id=project-form&projectId=' + (projectId !== 'new' ? projectId : '');
        return this.http.get(url, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) {
            var data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["b" /* parseResponseObjects */])(response.json().objects);
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
            return {
                project: project,
                actions: data.actions
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    ProjectService.prototype.saveProject = function (project) {
        var _this = this;
        var url = 'p?id=project-form&projectId=' + (project.id ? project.id : '');
        return this.http.post(url, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["c" /* serializeObj */])(project), { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* transformPostResponse */])(response); })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    ProjectService.prototype.deleteProject = function (projects) {
        var _this = this;
        var url = 'p?id=project-view&projectIds=' + projects.map(function (it) { return it.id; }).join(',');
        return this.http.delete(url, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    ProjectService.prototype.deleteProjectAttachment = function (project, attachment) {
        var _this = this;
        var url = 'p?id=project-form&projectId=' + project.id + '&attachmentId=' + attachment.id + '&fsid=' + project.fsid;
        return this.http.delete(url, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    ProjectService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["TranslateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["TranslateService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === 'function' && _c) || Object])
    ], ProjectService);
    return ProjectService;
    var _a, _b, _c;
}());


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StaffService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var StaffService = (function () {
    function StaffService(http, appService) {
        this.http = http;
        this.appService = appService;
    }
    StaffService.prototype.fetchOrganizations = function (queryParams) {
        var _this = this;
        if (queryParams === void 0) { queryParams = {}; }
        return this.http.get('/Staff/p?id=get-organizations', {
            headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* xhrHeaders */])(),
            search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["e" /* createURLSearchParams */])(queryParams)
        })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                organizations: data.list,
                meta: data.meta
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    StaffService.prototype.fetchEmployees = function () {
        var _this = this;
        return this.http.get('/Staff/p?id=employees', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* xhrHeaders */])() })
            .retry(3)
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                employees: data.list
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    StaffService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppService */]) === 'function' && _b) || Object])
    ], StaffService);
    return StaffService;
    var _a, _b;
}());


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TranslateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        return this.http.get('p?id=common-captions', { headers: headers })
            .retry(3)
            .map(function (response) {
            return response.json().captions;
        });
    };
    TranslateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], TranslateService);
    return TranslateService;
    var _a;
}());


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ImgViewService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 176 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MarkdownConverter; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var marked = __webpack_require__(185);
var toMarkdown = __webpack_require__(189);
var MarkdownConverter = (function () {
    function MarkdownConverter() {
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: true
        });
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
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */
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
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_link__ = __webpack_require__(170);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RouterLinkActive; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * @whatItDoes Lets you add a CSS class to an element when the link's route becomes active.
 *
 * @howToUse
 *
 * ```
 * <a [routerLink]='/user/bob' routerLinkActive='active-link'>Bob</a>
 * ```
 *
 * @description
 *
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
 * <a [routerLink]="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a>
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
 * @selector ':not(a)[routerLink]'
 * @ngModule RouterModule
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
/* 274 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_outlet_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__(33);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RouterOutlet; });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * @whatItDoes Acts as a placeholder that Angular dynamically fills based on the current router
 * state.
 *
 * @howToUse
 *
 * ```
 * <router-outlet></router-outlet>
 * <router-outlet name='left'></router-outlet>
 * <router-outlet name='right'></router-outlet>
 * ```
 *
 * A router outlet will emit an activate event any time a new component is being instantiated,
 * and a deactivate event when it is being destroyed.
 *
 * ```
 * <router-outlet
 *   (activate)='onActivate($event)'
 *   (deactivate)='onDeactivate($event)'></router-outlet>
 * ```
 * @selector 'a[routerLink]'
 * @ngModule RouterModule
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
/* 275 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_router_link__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_router_link_active__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_router_outlet__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__router_config_loader__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__router_outlet_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__router_state__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__url_tree__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_collection__ = __webpack_require__(34);
/* unused harmony export ROUTER_CONFIGURATION */
/* unused harmony export ROUTER_FORROOT_GUARD */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ROUTER_PROVIDERS; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return RouterModule; });
/* unused harmony export provideLocationStrategy */
/* unused harmony export provideForRootGuard */
/* unused harmony export provideRoutes */
/* unused harmony export setupRouter */
/* unused harmony export rootRoute */
/* unused harmony export initialRouterNavigation */
/* unused harmony export provideRouterInitializer */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */











/**
 * @whatItDoes Contains a list of directives
 * @stable
 */
var ROUTER_DIRECTIVES = [__WEBPACK_IMPORTED_MODULE_4__directives_router_outlet__["a" /* RouterOutlet */], __WEBPACK_IMPORTED_MODULE_2__directives_router_link__["a" /* RouterLink */], __WEBPACK_IMPORTED_MODULE_2__directives_router_link__["b" /* RouterLinkWithHref */], __WEBPACK_IMPORTED_MODULE_3__directives_router_link_active__["a" /* RouterLinkActive */]];
/**
 * @whatItDoes Is used in DI to configure the router.
 * @stable
 */
var ROUTER_CONFIGURATION = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["OpaqueToken"]('ROUTER_CONFIGURATION');
/**
 * @docsNotRequired
 */
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
 * @whatItDoes Adds router directives and providers.
 *
 * @howToUse
 *
 * RouterModule can be imported multiple times: once per lazily-loaded bundle.
 * Since the router deals with a global shared resource--location, we cannot have
 * more than one router service active.
 *
 * That is why there are two ways to create the module: `RouterModule.forRoot` and
 * `RouterModule.forChild`.
 *
 * * `forRoot` creates a module that contains all the directives, the given routes, and the router
 * service itself.
 * * `forChild` creates a module that contains all the directives and the given routes, but does not
 * include
 * the router service.
 *
 * When registered at the root, the module should be used as follows
 *
 * ```
 * @NgModule({
 *   imports: [RouterModule.forRoot(ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * For submodules and lazy loaded submodules the module should be used as follows:
 *
 * ```
 * @NgModule({
 *   imports: [RouterModule.forChild(ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * @description
 *
 * Managing state transitions is one of the hardest parts of building applications. This is
 * especially true on the web, where you also need to ensure that the state is reflected in the URL.
 * In addition, we often want to split applications into multiple bundles and load them on demand.
 * Doing this transparently is not trivial.
 *
 * The Angular 2 router solves these problems. Using the router, you can declaratively specify
 * application states, manage state transitions while taking care of the URL, and load bundles on
 * demand.
 *
 * [Read this developer guide](https://angular.io/docs/ts/latest/guide/router.html) to get an
 * overview of how the router should be used.
 *
 * @stable
 */
var RouterModule = (function () {
    function RouterModule(guard) {
    }
    /**
     * Creates a module with all the router providers and directives. It also optionally sets up an
     * application listener to perform an initial navigation.
     *
     * Options:
     * * `enableTracing` makes the router log all its internal events to the console.
     * * `useHash` enables the location strategy that uses the URL fragment instead of the history
     * API.
     * * `initialNavigation` disables the initial navigation.
     * * `errorHandler` provides a custom error handler.
     */
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
    /**
     * Creates a module with all the router directives and a provider registering routes.
     */
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
 * @whatItDoes Registers routes.
 *
 * @howToUse
 *
 * ```
 * @NgModule({
 *   imports: [RouterModule.forChild(ROUTES)],
 *   providers: [provideRoutes(EXTRA_ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
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
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppActions; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 282 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ReferenceActions; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 283 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(true);
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(true);
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services__["a" /* AppService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());


/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = (function () {
    function DashboardComponent(http) {
        this.http = http;
        this.fetchDashboardProjects();
    }
    DashboardComponent.prototype.fetchDashboardProjects = function () {
        var _this = this;
        this.http.get('p?id=dashboard', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["b" /* parseResponseObjects */])(response.json().objects).project; })
            .subscribe(function (data) {
            _this.projects = data ? data.list : [];
        });
    };
    DashboardComponent.prototype.addProjectToDashboard = function () {
        var _this = this;
        this.http.post('p?id=dashboard', "projectId=" + this.projectId, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.fetchDashboardProjects();
        });
    };
    DashboardComponent.prototype.deleteProjectFromDashboard = function (projectId) {
        var _this = this;
        this.http.delete("p?id=dashboard&projectId=" + projectId, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_utils__["a" /* xhrHeaders */])() })
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
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a;
}());


/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 286 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_notification__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_utils__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProjectComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.actions = {};
        this.errors = {};
    }
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subs.push(this.store.select('environment').subscribe(function (state) {
            _this.redirectUrl = state.redirectUrl;
        }));
        this.subs.push(this.route.params.subscribe(function (params) {
            _this.loadProject(params['projectId']);
        }));
        this.loadData();
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
    Object.defineProperty(ProjectComponent.prototype, "canSave", {
        get: function () {
            return this.actions['save_and_close'] === true;
            ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectComponent.prototype, "canDelete", {
        get: function () {
            return this.actions['delete_document'] === true;
            ;
        },
        enumerable: true,
        configurable: true
    });
    ProjectComponent.prototype.loadProject = function (projectId) {
        var _this = this;
        this.projectService.fetchProjectById(projectId).subscribe(function (_a) {
            var project = _a.project, actions = _a.actions;
            _this.project = project;
            _this.actions = actions || {};
            _this.isNew = _this.project.id == '';
            _this.isEditable = _this.isNew || _this.project.editable;
            _this.isReady = true;
            _this.isValid = true;
        }, function (error) { return _this.handleXhrError(error); });
    };
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
        this.notifyService.error(errorResponse.message).show().remove(2000);
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
        this.project.managerUserId = employee.userID;
        this.validateForm('managerUserId');
    };
    ProjectComponent.prototype.setProgrammer = function (employee) {
        this.project.programmerUserId = employee.userID;
        this.validateForm('programmerUserId');
    };
    ProjectComponent.prototype.setTester = function (employee) {
        this.project.testerUserId = employee.userID;
        this.validateForm('testerUserId');
    };
    ProjectComponent.prototype.setObserver = function (observers) {
        this.project.observerUserIds = observers.map(function (it) { return it.userID; });
        this.validateForm('observerUserIds');
    };
    ProjectComponent.prototype.removeObserver = function (observer, $event) {
        var _this = this;
        $event.stopPropagation();
        this.project.observerUserIds.forEach(function (id, index) {
            if (id === observer.userID) {
                _this.project.observerUserIds.splice(index, 1);
            }
        });
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
        var att = new __WEBPACK_IMPORTED_MODULE_6__models__["b" /* Attachment */]();
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__utils_utils__["f" /* imgToBase64 */])(data.files[0], function (e2) {
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
            template: __webpack_require__(628)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services__["d" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__services__["d" /* ProjectService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__shared_notification__["b" /* NotificationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__shared_notification__["b" /* NotificationService */]) === 'function' && _f) || Object])
    ], ProjectComponent);
    return ProjectComponent;
    var _a, _b, _c, _d, _e, _f;
}());


/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_environment_actions__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_staff_service__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_project_service__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_project_actions__ = __webpack_require__(112);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProjectsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.embedded = false;
        this.selectable = true;
        this.headerVisible = true;
        this.titleVisible = true;
        this.actionsVisible = true;
        this.captionsVisible = true;
        this.subs = [];
        this.title = 'projects';
        this.meta = {};
        this.keyWord = '';
        this.loading = true;
        this.activeSort = 'name:asc';
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
        this.params = Object.assign({}, params, {
            'sort': this.activeSort || 'name:asc'
        });
        this.store.dispatch(this.projectActions.fetchProjects());
        this.projectService.fetchProjects(this.params).subscribe(function (data) {
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
    ProjectsComponent.prototype.onSort = function ($event) {
        this.activeSort = $event;
        this.refresh();
    };
    ProjectsComponent.prototype.newProject = function () {
        this.router.navigate(['/projects', 'new']);
    };
    ProjectsComponent.prototype.deleteProject = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectsComponent.prototype, "embedded", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectsComponent.prototype, "selectable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectsComponent.prototype, "headerVisible", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectsComponent.prototype, "titleVisible", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectsComponent.prototype, "actionsVisible", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], ProjectsComponent.prototype, "captionsVisible", void 0);
    ProjectsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'projects',
            template: __webpack_require__(629),
            host: {
                '[class.view]': 'true',
                '[class.load]': 'loading'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__actions_environment_actions__["a" /* EnvironmentActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__actions_environment_actions__["a" /* EnvironmentActions */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__actions_project_actions__["a" /* ProjectActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__actions_project_actions__["a" /* ProjectActions */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__services_project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__services_project_service__["a" /* ProjectService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__services_staff_service__["a" /* StaffService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_staff_service__["a" /* StaffService */]) === 'function' && _f) || Object])
    ], ProjectsComponent);
    return ProjectsComponent;
    var _a, _b, _c, _d, _e, _f;
}());


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_notification__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RequestComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var RequestComponent = (function () {
    function RequestComponent(store, router, route, translate, appService, notifyService, taskService) {
        this.store = store;
        this.router = router;
        this.route = route;
        this.translate = translate;
        this.appService = appService;
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
        this.actions = {};
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
            _this.taskService.fetchRequestById(params['requestId']).subscribe(function (_a) {
                var request = _a.request, actions = _a.actions;
                _this.request = request;
                _this.actions = actions || {};
                if (_this.isNew) {
                    _this.request.taskId = _this.route.snapshot.queryParams['task'];
                }
                else {
                    _this.isResolveAction = _this.request.resolution == 'UNKNOWN' && _this.request.requestType.name === 'prolong';
                }
                _this.taskService.fetchTaskById(_this.request.taskId).subscribe(function (_a) {
                    var task = _a.task, actions = _a.actions;
                    _this.task = task;
                    _this.isReady = true;
                });
            }, function (error) { return _this.handleXhrError(error); });
        }));
    };
    RequestComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    Object.defineProperty(RequestComponent.prototype, "canSave", {
        get: function () {
            return this.actions['save_and_close'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestComponent.prototype, "canResolution", {
        get: function () {
            return this.actions['resolution'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RequestComponent.prototype, "canDelete", {
        get: function () {
            return this.actions['delete_document'] === true;
        },
        enumerable: true,
        configurable: true
    });
    RequestComponent.prototype.handleXhrError = function (errorResponse) {
        this.notifyService.error(errorResponse.message).show().remove(3000);
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
        var att = new __WEBPACK_IMPORTED_MODULE_7__models__["b" /* Attachment */]();
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
            template: __webpack_require__(630)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__services__["a" /* AppService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__shared_notification__["b" /* NotificationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__shared_notification__["b" /* NotificationService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_6__services__["e" /* TaskService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__services__["e" /* TaskService */]) === 'function' && _g) || Object])
    ], RequestComponent);
    return RequestComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());


/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_notification__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils_utils__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TaskComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TaskComponent = (function () {
    function TaskComponent(store, router, activatedRoute, translate, taskActions, taskService, notifyService) {
        var _this = this;
        this.store = store;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.translate = translate;
        this.taskActions = taskActions;
        this.taskService = taskService;
        this.notifyService = notifyService;
        this.subs = [];
        this.isReady = false;
        this.isNew = true;
        this.isEditable = false;
        this.isValid = true;
        this.isSubtask = false;
        this.acl = {};
        this.actions = {};
        this.FEATURE_FLAGS = {
            subTask: true,
            comments: false
        };
        this.showPropertyTab = true;
        this.showStreamTab = false;
        this.showObserversTab = false;
        this.showACLTab = false;
        this.showTaskCancelDialog = false;
        this.taskObsManualyChanged = false;
        this.errors = {};
        this.subs.push(this.store.select('task').subscribe(function (state) {
            _this.comments = state.comments;
        }));
        this.subs.push(this.store.select('environment').subscribe(function (state) {
            _this.redirectUrl = state.redirectUrl;
        }));
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.taskService.getTaskPriorityTypes().subscribe(function (tpt) { return _this.taskPriorityTypes = tpt; });
        this.subs.push(this.activatedRoute.params.subscribe(function (params) {
            var parentTaskId = _this.router.routerState.snapshot.root.queryParams['parentTaskId'] || undefined;
            var projectId = _this.router.routerState.snapshot.root.queryParams['projectId'] || undefined;
            _this.loadTask(params['taskId'], { projectId: projectId, parentTaskId: parentTaskId });
        }));
    };
    TaskComponent.prototype.ngOnDestroy = function () {
        this.store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_5__actions__["e" /* TaskActions */].TASK_UNLOAD });
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    TaskComponent.prototype.loadTask = function (taskId, params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        this.isReady = false;
        this.task = null;
        this.parentTask = null;
        this.togglePropertyTab();
        this.isSubtask = false;
        this.showTaskCancelDialog = false;
        this.acl = {};
        this.actions = {};
        this.taskService.fetchTaskById(taskId, params).subscribe(function (_a) {
            var task = _a.task, parentTask = _a.parentTask, actions = _a.actions;
            _this.actions = actions || {};
            _this.task = task;
            if (_this.task.parentTaskId) {
                _this.isSubtask = true;
                _this.parentTask = parentTask;
            }
            _this.isReady = true;
            _this.isNew = _this.task['isNew'];
            _this.isEditable = _this.isNew || _this.task.editable;
            _this.isValid = true;
            if (!_this.isNew && _this.FEATURE_FLAGS.comments) {
                _this.loadComments(1);
            }
        }, function (error) { return _this.handleXhrError(error); });
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
    Object.defineProperty(TaskComponent.prototype, "canSave", {
        get: function () {
            return this.actions['save_and_close'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "canCancelTask", {
        get: function () {
            return this.actions['task_cancel'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "canCompleteTask", {
        get: function () {
            return this.actions['task_complete'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "canAcknowledgedTask", {
        get: function () {
            return this.actions['task_acknowledged'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "canRequestAction", {
        get: function () {
            return this.actions['add_request'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "canAddSubTask", {
        get: function () {
            return this.actions['add_subtask'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "canDelete", {
        get: function () {
            return this.actions['delete_document'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "hasRequests", {
        get: function () {
            return this.task.hasRequests;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "hasSubTasks", {
        get: function () {
            return this.task.hasSubtasks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "hasACL", {
        get: function () {
            return this.task.id && this.task.acl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "showComments", {
        get: function () {
            return this.hasFutureComments && !this.isNew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TaskComponent.prototype, "hasFutureComments", {
        get: function () {
            return this.FEATURE_FLAGS.comments;
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
    TaskComponent.prototype.togglePropertyTab = function () {
        this.showPropertyTab = true;
        this.showStreamTab = false;
        this.showObserversTab = false;
        this.showACLTab = false;
    };
    TaskComponent.prototype.toggleStreamTab = function () {
        this.showStreamTab = true;
        this.showPropertyTab = false;
        this.showObserversTab = false;
        this.showACLTab = false;
    };
    TaskComponent.prototype.toggleObserversTab = function () {
        this.showObserversTab = true;
        this.showPropertyTab = false;
        this.showStreamTab = false;
        this.showACLTab = false;
    };
    TaskComponent.prototype.toggleACLTab = function () {
        this.showACLTab = true;
        this.showStreamTab = false;
        this.showPropertyTab = false;
        this.showObserversTab = false;
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
    TaskComponent.prototype.addSubtask = function () {
        this.router.navigate(['/task', 'new'], {
            queryParams: { 'parentTaskId': this.task.id }
        });
    };
    TaskComponent.prototype.loadComments = function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        this.taskService.fetchComments(this.task, page).subscribe(function (payload) {
            _this.store.dispatch({ type: __WEBPACK_IMPORTED_MODULE_5__actions__["e" /* TaskActions */].FETCH_TASK_COMMENTS_FULFILLED, payload: payload });
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
        this.notifyService.error(errorResponse.message).show().remove(3000);
    };
    TaskComponent.prototype.newRequest = function () {
        this.router.navigate(['/requests', 'new'], {
            queryParams: { 'task': this.task.id }
        });
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
        if (!this.task.id && !this.taskObsManualyChanged) {
            this.task.observerUserIds = project.observerUserIds;
        }
        this.validateForm();
    };
    TaskComponent.prototype.setTaskType = function (taskType) {
        this.task.taskTypeId = taskType.id;
        this.validateForm();
    };
    TaskComponent.prototype.setAssigneeUser = function (assigneeUser) {
        this.task.assigneeUserId = assigneeUser.userID;
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
    TaskComponent.prototype.setObserver = function (observers) {
        this.taskObsManualyChanged = true;
        this.task.observerUserIds = observers.map(function (it) { return it.userID; });
    };
    TaskComponent.prototype.addAttachment = function (data) {
        var _this = this;
        var att = new __WEBPACK_IMPORTED_MODULE_7__models__["b" /* Attachment */]();
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__utils_utils__["f" /* imgToBase64 */])(data.files[0], function (e2) {
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
            template: __webpack_require__(632)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_translate_ng2_translate__["TranslateService"]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__actions__["e" /* TaskActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__actions__["e" /* TaskActions */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__services__["e" /* TaskService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__services__["e" /* TaskService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__shared_notification__["b" /* NotificationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__shared_notification__["b" /* NotificationService */]) === 'function' && _g) || Object])
    ], TaskComponent);
    return TaskComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());


/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_task_service__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_environment_actions__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TasksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.tasks = [];
        this.embedded = false;
        this.selectable = true;
        this.headerVisible = true;
        this.titleVisible = true;
        this.actionsVisible = true;
        this.captionsVisible = true;
        this.subs = [];
        this.meta = {};
        this.keyWord = '';
        this.expandedIds = [];
        this.filter = {};
        this.loading = true;
        this.activeSort = 'regDate:desc';
        this.params = {};
        this.taskFor = '';
        this.projectId = '';
        this.init = false;
    }
    TasksComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.embedded) {
            this.loading = false;
            this.subs.push(this.store.select('tasks').subscribe(function (state) {
                if (state) {
                    _this.expandedIds = state.expandedIds;
                }
            }));
            return;
        }
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
                _this.expandedIds = state.expandedIds;
                _this.loading = state.loading;
            }
        }));
        this.subs.push(this.route.params.subscribe(function (params) {
            _this.taskFor = params['for'];
            _this.projectId = params['projectId'];
            switch (_this.taskFor) {
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
            if (_this.projectId) {
                r_url = "/projects/" + _this.projectId + "/tasks";
            }
            else if (_this.taskFor) {
                r_url = "/tasks/" + _this.taskFor;
            }
            else {
                r_url = '/tasks';
            }
            _this.store.dispatch(_this.envActions.setRedirectUrl(r_url));
            _this.loadData(Object.assign({}, params, _this.filter, { page: _this.meta.page }));
        }));
    };
    TasksComponent.prototype.ngOnDestroy = function () {
        this.subs.map(function (s) { return s.unsubscribe(); });
    };
    TasksComponent.prototype.loadData = function (params) {
        var _this = this;
        this.loading = true;
        this.params = Object.assign({}, params, {
            'for': this.taskFor,
            'projectId': this.projectId,
            'sort': this.activeSort || 'regDate:desc'
        });
        this.store.dispatch(this.taskActions.fetchTasks());
        this.taskService.fetchTasks(this.params).subscribe(function (payload) {
            _this.store.dispatch(_this.taskActions.fetchTasksFulfilled(payload.tasks, payload.meta));
        }, function (error) { return _this.store.dispatch(_this.taskActions.fetchTasksFailed(error)); });
    };
    TasksComponent.prototype.refresh = function () {
        this.loadData(this.params);
    };
    TasksComponent.prototype.goToPage = function (params) {
        this.loadData(Object.assign({}, params, this.filter));
    };
    TasksComponent.prototype.onSort = function ($event) {
        this.activeSort = $event;
        this.refresh();
    };
    TasksComponent.prototype.changeFilter = function (filter) {
        this.filter = filter;
        this.store.dispatch(this.taskActions.setFilter(filter));
        this.loadData(filter);
    };
    TasksComponent.prototype.toggleExpanded = function (id) {
        this.store.dispatch(this.taskActions.toggleExpanded(id));
    };
    TasksComponent.prototype.newTask = function () {
        var queryParams = {};
        if (this.projectId) {
            queryParams.projectId = this.projectId;
        }
        this.router.navigate(['/task', 'new'], { queryParams: queryParams });
    };
    TasksComponent.prototype.deleteTask = function (task) {
        this.taskService.deleteTask([task]).subscribe();
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Array)
    ], TasksComponent.prototype, "tasks", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TasksComponent.prototype, "embedded", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TasksComponent.prototype, "selectable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TasksComponent.prototype, "headerVisible", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TasksComponent.prototype, "titleVisible", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TasksComponent.prototype, "actionsVisible", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TasksComponent.prototype, "captionsVisible", void 0);
    TasksComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tasks',
            template: __webpack_require__(633),
            host: {
                '[class.view]': 'true',
                '[class.load]': 'loading'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__actions_environment_actions__["a" /* EnvironmentActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__actions_environment_actions__["a" /* EnvironmentActions */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__actions__["e" /* TaskActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__actions__["e" /* TaskActions */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_task_service__["a" /* TaskService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_task_service__["a" /* TaskService */]) === 'function' && _f) || Object])
    ], TasksComponent);
    return TasksComponent;
    var _a, _b, _c, _d, _e, _f;
}());


/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_notification__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_app_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_translate_service__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_utils__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










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
        return this.http.post(url, {}, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            _this.ng2Translate.reloadLang(langCode).subscribe(function (r) {
                _this.ng2Translate.use(langCode);
            });
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils_utils__["g" /* createCookie */])('lang', langCode, 365);
        });
    };
    UserProfileComponent.prototype.close = function () {
        window.history.back();
    };
    UserProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: '[user-profile]',
            template: __webpack_require__(634),
            providers: [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__["TranslateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__["TranslateService"]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__services_app_service__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__services_app_service__["a" /* AppService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__services_translate_service__["a" /* TranslateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_8__services_translate_service__["a" /* TranslateService */]) === 'function' && _g) || Object, (typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__shared_notification__["b" /* NotificationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__shared_notification__["b" /* NotificationService */]) === 'function' && _h) || Object])
    ], UserProfileComponent);
    return UserProfileComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());


/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return User; });
var User = (function () {
    function User() {
        this.id = '';
        this.name = '@anonymous';
    }
    return User;
}());


/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TaskService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TaskService = (function () {
    function TaskService(http, translate, appService) {
        this.http = http;
        this.translate = translate;
        this.appService = appService;
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
        var _this = this;
        if (queryParams === void 0) { queryParams = {}; }
        return this.http.get('p?id=task-view', {
            headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])(),
            search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["e" /* createURLSearchParams */])(queryParams)
        })
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                tasks: data.list,
                meta: data.meta
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.fetchTaskById = function (taskId, params) {
        var _this = this;
        if (params === void 0) { params = {}; }
        var url = 'p?id=task-form&taskId=' + (taskId !== 'new' ? taskId : '');
        return this.http.get(url, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])(), search: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["e" /* createURLSearchParams */])(params) })
            .map(function (response) {
            var json = response.json();
            var data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["b" /* parseResponseObjects */])(json.objects);
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
            var parentTask;
            if (json.data) {
                parentTask = json.data.parentTask;
            }
            return {
                task: task,
                parentTask: parentTask,
                actions: data.actions
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.saveTask = function (task) {
        var _this = this;
        var url = 'p?id=task-form&taskId=' + (task.id ? task.id : '');
        return this.http.post(url, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["c" /* serializeObj */])(task), { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* transformPostResponse */])(response); })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.completeTask = function (task) {
        var _this = this;
        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=complete&fsid=' + task.fsid, '', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* transformPostResponse */])(response); })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.cancelTask = function (task, comment) {
        var _this = this;
        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=cancel&fsid=' + task.fsid + '&comment=' + comment, '', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* transformPostResponse */])(response); })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.acknowledgedTask = function (task) {
        var _this = this;
        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=acknowledged&fsid=' + task.fsid, '', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* transformPostResponse */])(response); })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.deleteTask = function (tasks) {
        var _this = this;
        return this.http.delete('p?id=task-view&taskIds=' + tasks.map(function (it) { return it.id; }).join(','), { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.deleteTaskAttachment = function (task, attachment) {
        var _this = this;
        return this.http.delete('p?id=task-form&taskId=' + task.id + '&attachmentId=' + attachment.id + '&fsid=' + task.fsid, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.fetchTaskRequests = function (task, page) {
        var _this = this;
        if (page === void 0) { page = 0; }
        return this.http.get('p?id=task-requests&taskId=' + task.id, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["b" /* parseResponseObjects */])(response.json().objects).request || {}; })
            .map(function (data) {
            return {
                requests: data.list,
                meta: data.meta
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.fetchRequestById = function (requestId) {
        var _this = this;
        var url = 'p?id=task-requests&requestId=' + (requestId !== 'new' ? requestId : '');
        return this.http.get(url, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) {
            var data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["b" /* parseResponseObjects */])(response.json().objects);
            var request = data.request;
            if (data.fsid) {
                request.fsid = data.fsid;
            }
            if (data.ACL) {
                request.acl = data.ACL;
            }
            if (data.attachment) {
                request.attachments = data.attachment.list;
            }
            return {
                request: request,
                actions: data.actions
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.sendTaskRequest = function (request) {
        var _this = this;
        var url = 'p?id=task-requests&taskId=' + request.taskId;
        return this.http.post(url, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["c" /* serializeObj */])(request), { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* transformPostResponse */])(response); })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.doAcceptRequest = function (request, data) {
        var _this = this;
        var url = 'p?id=task-requests&requestId=' + request.id + '&_action=accept&fsid=' + request.fsid + '&' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["c" /* serializeObj */])(data);
        return this.http.put(url, '', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* transformPostResponse */])(response); })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.doDeclineRequest = function (request, comment) {
        var _this = this;
        var url = 'p?id=task-requests&requestId=' + request.id + '&comment=' + comment + '&_action=decline&fsid=' + request.fsid;
        return this.http.put(url, '', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* transformPostResponse */])(response); })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.deleteRequest = function (request) {
        var _this = this;
        return this.http.delete('p?id=task-requests&requestId=' + request.id, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.deleteRequestAttachment = function (request, attachment) {
        var _this = this;
        return this.http.delete('p?id=task-requests&requestId=' + request.id + '&attachmentId=' + attachment.id + '&fsid=' + request.fsid, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.fetchComments = function (task, page) {
        var _this = this;
        if (page === void 0) { page = 0; }
        return this.http.get('p?id=comments&taskId=' + task.id, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["b" /* parseResponseObjects */])(response.json().objects).comment || {}; })
            .map(function (data) {
            return {
                comments: data.list,
                meta: data.meta
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.saveComment = function (task, comment) {
        var _this = this;
        var url = 'p?id=comments&taskId=' + task.id + (comment.id ? '&commentId=' + comment.id : '');
        return this.http.post(url, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["c" /* serializeObj */])(comment), { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .map(function (response) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["d" /* transformPostResponse */])(response); })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.deleteComment = function (comment) {
        var _this = this;
        return this.http.delete('p?id=comments&commentId=' + comment.id, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService.prototype.deleteCommentAttachment = function (comment, attachment) {
        var _this = this;
        return this.http.delete('p?id=comments&commentId=' + comment.id + '&attachmentId=' + attachment.id + '&fsid=' + comment.fsid, { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* xhrHeaders */])() })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    TaskService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["TranslateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["TranslateService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__app_service__["a" /* AppService */]) === 'function' && _c) || Object])
    ], TaskService);
    return TaskService;
    var _a, _b, _c;
}());


/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DropdownToggleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        __metadata('design:paramtypes', [Object]), 
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
/* 295 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification__ = __webpack_require__(296);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NotificationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 296 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Notification; });

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
/* 297 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Tab; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var FromObservable_1 = __webpack_require__(646);
exports.from = FromObservable_1.FromObservable.create;
//# sourceMappingURL=from.js.map

/***/ },
/* 405 */,
/* 406 */,
/* 407 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var mergeAll_1 = __webpack_require__(114);
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
/* 408 */,
/* 409 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(7);
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
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_module__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_application_app__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_navbar_navbar__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_nav_nav__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_project_projects__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_project_project__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_task_tasks__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_task_task__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_task_task_tree__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_task_task_filter__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_task_task_cancel_dialog__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_request_request__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_request_request_decline_dialog__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_comment_comments__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_comment_comment__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_acl_acl__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_user_profile_user_profile__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_login__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_shared__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_attachment_attachments__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__app_routes__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__services__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__store__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__actions__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_translate_service__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__auth_guard__ = __webpack_require__(283);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__components_application_app__["a" /* AppComponent */]],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__components_application_app__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_navbar_navbar__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_nav_nav__["a" /* NavComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_dashboard_dashboard__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_project_projects__["a" /* ProjectsComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_project_project__["a" /* ProjectComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_task_tasks__["a" /* TasksComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_task_task__["a" /* TaskComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_task_task_tree__["a" /* TaskTreeComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_task_task_filter__["a" /* TaskFilterComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_task_task_cancel_dialog__["a" /* TaskCancelDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_request_request__["a" /* RequestComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_request_request_decline_dialog__["a" /* RequestDeclineDialogComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_comment_comments__["a" /* CommentsComponent */],
                __WEBPACK_IMPORTED_MODULE_22__components_comment_comment__["a" /* CommentComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_acl_acl__["a" /* AclComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_user_profile_user_profile__["a" /* UserProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_login__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["a" /* ErrorMessageComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_attachment_attachments__["a" /* AttachmentsComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["b" /* SelectionComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["c" /* OrganizationInputComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["d" /* EmployeeInputComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["e" /* ProjectInputComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["f" /* TaskTypeInputComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["g" /* TagsInputComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["h" /* RequestTypeInputComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["i" /* TaskStatusInputComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_shared__["a" /* ErrorMessageComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_28__app_routes__["a" /* APP_ROUTES */], { useHash: true }),
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__["TranslateModule"].forRoot({
                    provide: __WEBPACK_IMPORTED_MODULE_5_ng2_translate_ng2_translate__["TranslateLoader"],
                    useFactory: function (trs) { return new CustomTranslateLoader(trs); },
                    deps: [__WEBPACK_IMPORTED_MODULE_32__services_translate_service__["a" /* TranslateService */]]
                }),
                __WEBPACK_IMPORTED_MODULE_6__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_module__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_29__services__["g" /* APP_SERVICES */],
                __WEBPACK_IMPORTED_MODULE_30__store__["a" /* APP_STORE */],
                __WEBPACK_IMPORTED_MODULE_31__actions__["f" /* APP_STORE_ACTIONS */],
                __WEBPACK_IMPORTED_MODULE_33__auth_guard__["a" /* AuthGuard */]
            ]
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
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_from__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_concatAll__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_concatAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_concatAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_first__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_first__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_util_EmptyError__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_util_EmptyError___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_util_EmptyError__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__router_config_loader__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__url_tree__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_collection__ = __webpack_require__(34);
/* harmony export (immutable) */ exports["a"] = applyRedirects;
/**
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
/* 536 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = validateConfig;
/**
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
/* 537 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_state__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_tree__ = __webpack_require__(171);
/* harmony export (immutable) */ exports["a"] = createRouterState;
/**
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
/* 538 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__url_tree__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_collection__ = __webpack_require__(34);
/* harmony export (immutable) */ exports["a"] = createUrlTree;
/**
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
/* 539 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_router_link__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_router_link_active__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_router_outlet__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router_module__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router_outlet_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__router_state__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__url_tree__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__private_export__ = __webpack_require__(540);
/* unused harmony reexport RouterLink */
/* unused harmony reexport RouterLinkWithHref */
/* unused harmony reexport RouterLinkActive */
/* unused harmony reexport RouterOutlet */
/* unused harmony reexport NavigationCancel */
/* unused harmony reexport NavigationError */
/* unused harmony reexport NavigationStart */
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__router__["a"]; });
/* unused harmony reexport RoutesRecognized */
/* unused harmony reexport NavigationEnd */
/* harmony reexport (binding) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__router_module__["b"]; });
/* unused harmony reexport provideRoutes */
/* unused harmony reexport RouterOutletMap */
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__router_state__["b"]; });
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
/* 540 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router_config_loader__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router_module__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_collection__ = __webpack_require__(34);
/* unused harmony export __router_private__ */
/**
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
/* 541 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router_state__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__url_tree__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_collection__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_tree__ = __webpack_require__(171);
/* harmony export (immutable) */ exports["a"] = recognize;
/**
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
/* 542 */
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
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return StaffActions; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 550 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TaskActions; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
    TaskActions.prototype.toggleExpanded = function (id) {
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
/* 551 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_guard__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_dashboard_dashboard__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_project_projects__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_project_project__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_task_tasks__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_task_task__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_request_request__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_user_profile_user_profile__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_login__ = __webpack_require__(285);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return APP_ROUTES; });









var APP_ROUTES = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_4__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_1__components_dashboard_dashboard__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'projects/:projectId/tasks', component: __WEBPACK_IMPORTED_MODULE_4__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'projects/:projectId', component: __WEBPACK_IMPORTED_MODULE_3__components_project_project__["a" /* ProjectComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'projects', component: __WEBPACK_IMPORTED_MODULE_2__components_project_projects__["a" /* ProjectsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'tasks/:for', component: __WEBPACK_IMPORTED_MODULE_4__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'tasks', component: __WEBPACK_IMPORTED_MODULE_4__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'task/:taskId/:new', component: __WEBPACK_IMPORTED_MODULE_5__components_task_task__["a" /* TaskComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'task/:taskId', component: __WEBPACK_IMPORTED_MODULE_5__components_task_task__["a" /* TaskComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'requests/:requestId', component: __WEBPACK_IMPORTED_MODULE_6__components_request_request__["a" /* RequestComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'user-profile', component: __WEBPACK_IMPORTED_MODULE_7__components_user_profile_user_profile__["a" /* UserProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_8__components_login__["a" /* LoginComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_4__components_task_tasks__["a" /* TasksComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_0__auth_guard__["a" /* AuthGuard */]] }
];


/***/ },
/* 552 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AclComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AclComponent = (function () {
    function AclComponent() {
        this.acl = {};
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], AclComponent.prototype, "acl", void 0);
    AclComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'acl',
            template: "\n        <div class=\"fieldset\">\n            <div class=\"form-group\">\n                <div class=\"control-label\">\n                    {{'editors' | translate}}\n                </div>\n                <div class=\"controls\">\n                    <div class=\"input-placeholder\">\n                        <ul class=\"acl-list list-style-none\">\n                            <li class=\"acl-list-item\" *ngFor=\"let editor of acl.editors | values\">{{editor}}</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <div class=\"control-label\">\n                    {{'readers' | translate}}\n                </div>\n                <div class=\"controls\">\n                    <div class=\"input-placeholder\">\n                        <ul class=\"acl-list list-style-none\">\n                            <li class=\"acl-list-item\" *ngFor=\"let reader of acl.readers | values\">{{reader}}</li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AclComponent);
    return AclComponent;
}());


/***/ },
/* 553 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.loggedUser = new __WEBPACK_IMPORTED_MODULE_5__models__["a" /* User */]();
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
        this.translate.get('brand').subscribe(function (value) {
            _this.HEADER_TITLE = value;
            _this.isReady = true;
        });
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
            template: __webpack_require__(625)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__actions__["b" /* AppActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__actions__["b" /* AppActions */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__actions__["c" /* ReferenceActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__actions__["c" /* ReferenceActions */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__actions__["d" /* StaffActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__actions__["d" /* StaffActions */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services__["a" /* AppService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__services__["b" /* ReferenceService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services__["b" /* ReferenceService */]) === 'function' && _f) || Object, (typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__services__["c" /* StaffService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services__["c" /* StaffService */]) === 'function' && _g) || Object, (typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["TranslateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_translate_ng2_translate__["TranslateService"]) === 'function' && _h) || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());


/***/ },
/* 554 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AttachmentsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
            template: "\n        <div class=\"attachments\">\n            <i class=\"fa fa-paperclip\" *ngIf=\"!editable\"></i>\n            <label class=\"btn btn-upload\" title=\"{{'attach_file' | translate}}\" tabindex=\"0\" *ngIf=\"editable\">\n                <i class=\"fa fa-paperclip\"></i>\n                <span>{{'attach_file' | translate}}</span>\n                <input type=\"file\" (change)=\"uploadFile($event.target.files)\" style=\"display:none;\"/>\n            </label>\n            <div class=\"attachment-list\" *ngIf=\"!isHidden\">\n                <div class=\"attachment-list__item\" *ngFor=\"let att of model.attachments\">\n                    <div class=\"attachment\">\n                        <a class=\"attachment__link\" title=\"{{att.realFileName}}\" href=\"{{model.url}}&attachment={{att.id}}\">{{att.realFileName}}</a>\n                        <img img-view *ngIf=\"isThumbnailSupported(att)\"\n                            [url]=\"att.base64 || model.url + '&attachment=' + att.id\"\n                            [src]=\"att.base64 || model.url + '&attachment=' + att.id + '&_thumbnail'\" />\n                        <span class=\"attachment__size\">{{model.size}}</span>\n                        <button type=\"button\" class=\"btn btn-sm btn-link btn-remove\" *ngIf=\"editable\" (click)=\"delete.emit(att)\">\n                            <i class=\"fa fa-times\"></i>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
            providers: [__WEBPACK_IMPORTED_MODULE_2__services__["f" /* UploadService */]],
            host: {
                '[class.hidden]': 'isHidden'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services__["f" /* UploadService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services__["f" /* UploadService */]) === 'function' && _b) || Object])
    ], AttachmentsComponent);
    return AttachmentsComponent;
    var _a, _b;
}());


/***/ },
/* 555 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CommentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models__["c" /* Comment */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models__["c" /* Comment */]) === 'function' && _a) || Object)
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
    var _a;
}());


/***/ },
/* 556 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CommentsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        var comment = new __WEBPACK_IMPORTED_MODULE_1__models__["c" /* Comment */]();
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
/* 557 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_project_actions__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_project_service__ = __webpack_require__(172);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NavComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
            template: __webpack_require__(626)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__actions_project_actions__["a" /* ProjectActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__actions_project_actions__["a" /* ProjectActions */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__services_project_service__["a" /* ProjectService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_project_service__["a" /* ProjectService */]) === 'function' && _d) || Object])
    ], NavComponent);
    return NavComponent;
    var _a, _b, _c, _d;
}());


/***/ },
/* 558 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_app_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_environment_actions__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_user__ = __webpack_require__(292);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NavbarComponent = (function () {
    function NavbarComponent(store, environmentActions, appService) {
        var _this = this;
        this.store = store;
        this.environmentActions = environmentActions;
        this.appService = appService;
        this.keyup$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.headerTitle = 'Projects';
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
    Object.defineProperty(NavbarComponent.prototype, "workspaceUrl", {
        get: function () {
            return this.appService.workspaceUrl;
        },
        enumerable: true,
        configurable: true
    });
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
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__models_user__["a" /* User */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__models_user__["a" /* User */]) === 'function' && _a) || Object)
    ], NavbarComponent.prototype, "user", void 0);
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'navbar',
            template: __webpack_require__(627)
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__ngrx_store__["a" /* Store */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__actions_environment_actions__["a" /* EnvironmentActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__actions_environment_actions__["a" /* EnvironmentActions */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_app_service__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_app_service__["a" /* AppService */]) === 'function' && _d) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c, _d;
}());


/***/ },
/* 559 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RequestDeclineDialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 560 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return EmployeeInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.allowClear = false;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.ids = [];
        this.employees = [];
        this.selectedEmps = [];
    }
    Object.defineProperty(EmployeeInputComponent.prototype, "_ids", {
        set: function (ids) {
            this.ids = ids;
            this.checkSelected();
        },
        enumerable: true,
        configurable: true
    });
    ;
    EmployeeInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('staff').subscribe(function (state) {
            _this.employees = state.employees;
            _this.checkSelected();
        });
    };
    EmployeeInputComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    EmployeeInputComponent.prototype.checkSelected = function () {
        var _this = this;
        if (this.ids && this.employees) {
            this.selectedEmps = this.employees.filter(function (it) { return _this.ids.indexOf(it.userID) != -1; });
        }
    };
    EmployeeInputComponent.prototype.onSelect = function (selectedEmps) {
        this.change.emit(selectedEmps);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('ids'), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], EmployeeInputComponent.prototype, "_ids", null);
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
    ], EmployeeInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], EmployeeInputComponent.prototype, "change", void 0);
    EmployeeInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'employee-input',
            template: "\n        <selection\n            class=\"employee-input\"\n            [items]=\"employees\"\n            [selectedItems]=\"selectedEmps\"\n            [disabled]=\"!editable\"\n            [searchable]=\"true\"\n            [allowClear]=\"allowClear\"\n            [multiple]=\"multiple\"\n            [placeHolder]=\"placeHolder\"\n            (change)=\"onSelect($event)\">\n        </selection>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object])
    ], EmployeeInputComponent);
    return EmployeeInputComponent;
    var _a;
}());


/***/ },
/* 561 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ErrorMessageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 562 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__error_message__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organization_input__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_input__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__request_type_input__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tags_input__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__task_type_input__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__employee_input__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__task_status_input__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__selection_component__ = __webpack_require__(566);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__error_message__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__organization_input__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__project_input__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "h", function() { return __WEBPACK_IMPORTED_MODULE_3__request_type_input__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__tags_input__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__task_type_input__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__employee_input__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "i", function() { return __WEBPACK_IMPORTED_MODULE_7__task_status_input__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_8__selection_component__["a"]; });











/***/ },
/* 563 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_staff_service__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return OrganizationInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.allowClear = false;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.organizations = [];
        this.meta = { page: 0, totalPages: 1 };
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
    OrganizationInputComponent.prototype.load = function ($load) {
        if ($load.first && this.firstLoad) {
            this.loadOrganizations();
            this.firstLoad = false;
        }
        else if ($load.next && !this.allLoaded) {
            if (this.meta && this.meta.page < this.meta.totalPages) {
                this.loadOrganizations(this.meta.page + 1);
            }
            else {
                this.allLoaded = true;
            }
        }
        else if (typeof $load.search === 'string') {
            this.loadOrganizations(1, $load.search, true);
        }
    };
    OrganizationInputComponent.prototype.loadOrganizations = function (page, keyWord, isSearch) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (keyWord === void 0) { keyWord = ''; }
        if (isSearch === void 0) { isSearch = false; }
        this.staffService.fetchOrganizations({ page: page, keyword: keyWord }).subscribe(function (payload) {
            if (isSearch) {
                _this.organizations = payload.organizations;
            }
            else {
                _this.organizations = _this.organizations.concat(payload.organizations);
            }
            _this.meta = payload.meta;
        });
    };
    OrganizationInputComponent.prototype.onSelect = function (m) {
        this.org = m;
        this.change.emit(this.org);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], OrganizationInputComponent.prototype, "id", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models__["d" /* Organization */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__models__["d" /* Organization */]) === 'function' && _a) || Object)
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
    ], OrganizationInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], OrganizationInputComponent.prototype, "change", void 0);
    OrganizationInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'organization-input',
            template: "\n        <selection\n            class=\"organization-input\"\n            [items]=\"organizations\"\n            [selectedItems]=\"org? [org] : []\"\n            [disabled]=\"!editable\"\n            [searchable]=\"true\"\n            [allowClear]=\"allowClear\"\n            [placeHolder]=\"placeHolder\"\n            (load)=\"load($event)\"\n            (change)=\"onSelect($event)\">\n        </selection>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_staff_service__["a" /* StaffService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_staff_service__["a" /* StaffService */]) === 'function' && _b) || Object])
    ], OrganizationInputComponent);
    return OrganizationInputComponent;
    var _a, _b;
}());


/***/ },
/* 564 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProjectInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.allowClear = false;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.projects = [];
    }
    ProjectInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('projects').subscribe(function (state) {
            _this.projects = state.projects;
            _this.project = state.projects.filter(function (it) { return it.id == _this.id; })[0];
        });
    };
    ProjectInputComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProjectInputComponent.prototype.onSelect = function (m) {
        this.project = m;
        this.change.emit(this.project);
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
    ], ProjectInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], ProjectInputComponent.prototype, "change", void 0);
    ProjectInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'project-input',
            template: "\n        <selection\n            class=\"project-input\"\n            [items]=\"projects\"\n            [selectedItems]=\"project ? [project] : []\"\n            [disabled]=\"!editable\"\n            [searchable]=\"true\"\n            [allowClear]=\"allowClear\"\n            [placeHolder]=\"placeHolder\"\n            (change)=\"onSelect($event)\">\n        </selection>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object])
    ], ProjectInputComponent);
    return ProjectInputComponent;
    var _a;
}());


/***/ },
/* 565 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(43);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RequestTypeInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.allowClear = false;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.sub = this.store.select('reference').subscribe(function (state) {
            _this.requestTypes = state.requestTypes;
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
    RequestTypeInputComponent.prototype.onSelect = function (m) {
        this.requestType = m;
        this.change.emit(this.requestType);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__models__["e" /* RequestType */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__models__["e" /* RequestType */]) === 'function' && _a) || Object)
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
    ], RequestTypeInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], RequestTypeInputComponent.prototype, "change", void 0);
    RequestTypeInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'request-type-input',
            template: "\n        <selection\n            class=\"request-type-input\"\n            [items]=\"requestTypes\"\n            [selectedItems]=\"requestType ? [requestType] : []\"\n            [disabled]=\"!editable\"\n            [searchable]=\"true\"\n            [allowClear]=\"allowClear\"\n            [multiple]=\"false\"\n            [placeHolder]=\"placeHolder\"\n            (change)=\"onSelect($event)\">\n        </selection>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === 'function' && _b) || Object])
    ], RequestTypeInputComponent);
    return RequestTypeInputComponent;
    var _a, _b;
}());


/***/ },
/* 566 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SelectionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SelectionComponent = (function () {
    function SelectionComponent(renderer) {
        this.renderer = renderer;
        this.selectedItems = [];
        this.idKey = 'id';
        this.textKey = 'name';
        this.multiple = false;
        this.disabled = false;
        this.allowClear = false;
        this.searchable = false;
        this.contentLoadable = false;
        this.tabIndex = 0;
        this.checkmarkIconClass = 'fa fa-check';
        this.placeHolder = '';
        this.notFoundText = 'Not found';
        this.load = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.items = [];
        this._items = [];
        this.selectedItemIds = [];
        this.isOpen = false;
        this.isFocused = false;
        this.selfClick = false;
        this.firstOpen = true;
        this.keyWord = '';
        this.showNotFound = false;
        this.SEARCH_MODE = 0;
        this.MOVE_MODE = 1;
        this.cursorMode = 1;
        this.cursorPosition = -1;
    }
    Object.defineProperty(SelectionComponent.prototype, "_tabIndex", {
        get: function () { return -1; },
        enumerable: true,
        configurable: true
    });
    SelectionComponent.prototype.onFocus = function ($event) {
        if (this.disabled) {
            return;
        }
        this.isFocused = true;
    };
    SelectionComponent.prototype.onBlur = function ($event) {
        if (this.disabled || this.selfClick) {
            return;
        }
        this.close();
        this.clearSearchInput();
    };
    SelectionComponent.prototype.onClick = function ($event) {
        this.selfClick = true;
    };
    SelectionComponent.prototype.onMouseDown = function ($event) {
        this.selfClick = true;
    };
    SelectionComponent.prototype.onKeyDown = function ($event) {
        if (this.disabled) {
            return;
        }
        this.handleEvent($event);
    };
    Object.defineProperty(SelectionComponent.prototype, "__items", {
        set: function (items) {
            this.items = items;
            this._items = items;
        },
        enumerable: true,
        configurable: true
    });
    ;
    SelectionComponent.prototype.ngOnInit = function () {
        if (this.disabled) {
            return;
        }
        if (this.multiple) {
            this.filterItems();
        }
        this.resetCursor();
        this.checkSelected();
    };
    SelectionComponent.prototype.ngOnDestroy = function () {
        this.removeListenGlobal();
    };
    Object.defineProperty(SelectionComponent.prototype, "isAllowClear", {
        get: function () {
            return this.allowClear && this.selectedItems.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectionComponent.prototype, "hasSelected", {
        get: function () {
            return this.selectedItems.length;
        },
        enumerable: true,
        configurable: true
    });
    SelectionComponent.prototype.initListenGlobal = function () {
        var _this = this;
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', function () {
            if (!_this.selfClick) {
                _this.close();
                _this.clearSearchInput();
            }
            else {
                _this.selfClick = false;
            }
        });
        this.documentKeyUpListener = this.renderer.listenGlobal('body', 'keyup', function (event) {
            if (event.code === 'Escape') {
                _this.close();
                _this.clearSearchInput();
            }
        });
    };
    SelectionComponent.prototype.removeListenGlobal = function () {
        if (!this.disabled) {
            this.documentClickListener && this.documentClickListener();
            this.documentKeyUpListener && this.documentKeyUpListener();
        }
    };
    SelectionComponent.prototype.emitChange = function () {
        if (this.multiple) {
            this.change.emit(this.selectedItems);
        }
        else {
            this.change.emit(this.selectedItems[0]);
        }
    };
    SelectionComponent.prototype.checkSelected = function () {
        var _this = this;
        this.selectedItemIds = this.selectedItems.map(function (it) { return it[_this.idKey]; });
    };
    SelectionComponent.prototype.add = function (item) {
        var _this = this;
        if (this.multiple) {
            if (this.selectedItems.filter(function (it) { return it[_this.idKey] == item[_this.idKey]; }).length === 0) {
                this.selectedItems.push(item);
                this.selectedItemIds = this.selectedItems.map(function (it) { return it[_this.idKey]; });
            }
        }
        else {
            this.selectedItems = [item];
            this.selectedItemIds = [item[this.idKey]];
            this.close();
        }
        this.emitChange();
        this.clearSearchInput();
        this.filterItems();
    };
    SelectionComponent.prototype.remove = function (item, $event) {
        var _this = this;
        if (!this.multiple) {
            return;
        }
        $event.stopPropagation();
        $event.preventDefault();
        if (this.multiple) {
            this.selectedItems = this.selectedItems.filter(function (it) { return it[_this.idKey] != item[_this.idKey]; });
            this.selectedItemIds = this.selectedItems.map(function (it) { return it[_this.idKey]; });
        }
        else {
            this.selectedItems = [];
            this.selectedItemIds = [];
        }
        this.emitChange();
        this.clearSearchInput();
        this.filterItems();
    };
    SelectionComponent.prototype.clear = function ($event) {
        if (this.selectedItemIds.length || this.selectedItems.length) {
            $event.stopPropagation();
            this.selectedItems = [];
            this.selectedItemIds = [];
            this.emitChange();
            this.clearSearchInput();
            this.filterItems();
        }
    };
    SelectionComponent.prototype.clearSearchInput = function () {
        if (this.searchable && this.searchInput) {
            this.searchInput.nativeElement.value = '';
        }
    };
    SelectionComponent.prototype.filterItems = function (keyWord) {
        var _this = this;
        if (!this.contentLoadable && keyWord) {
            this._items = this.items.filter(function (it) {
                return it[_this.textKey].toLowerCase().indexOf(keyWord) != -1;
            });
        }
        else if (this.multiple) {
            this._items = this.items.filter(function (it) {
                return _this.selectedItemIds.indexOf(it[_this.idKey]) == -1;
            });
        }
        else {
            this._items = this.items;
        }
        if (this._items.length === 0 || this._items.length !== this.items.length) {
            this.resetCursor();
        }
        this.selectFirst();
    };
    SelectionComponent.prototype.search = function (keyWord) {
        if (this.keyWord !== keyWord) {
            if (this.contentLoadable) {
                this.load.emit({ search: keyWord });
            }
            else {
                this.filterItems(keyWord);
            }
            this.keyWord = keyWord;
            this.open();
        }
    };
    SelectionComponent.prototype.handleEvent = function ($event) {
        if ($event.type === 'keydown') {
            var keyCode = $event.key;
            if (keyCode === 'Enter') {
                if (this.cursorId && this.canMove()) {
                    this.addOnCursor();
                }
                else {
                    this.toggleOpen($event);
                }
                return;
            }
            else if (keyCode === 'Escape' || keyCode === 'Tab') {
                if (this.isOpen) {
                    this.close();
                }
                this.clearSearchInput();
                return;
            }
            else if (keyCode === 'Delete') {
                this.clear($event);
                return;
            }
            if (this.cursorMode === this.SEARCH_MODE) {
                if ('ArrowUp' === keyCode || 'ArrowDown' === keyCode) {
                    this.cursorMode = this.MOVE_MODE;
                }
                else if ($event.target.value === '' && ('ArrowLeft' === keyCode || 'ArrowRight' === keyCode)) {
                    this.cursorMode = this.MOVE_MODE;
                }
            }
            if (this.cursorMode === this.MOVE_MODE && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(keyCode) != -1) {
                $event.preventDefault();
                this.move(keyCode);
            }
        }
        else if ($event.type === 'keyup' && $event.target.name === 'search') {
            $event.stopPropagation();
            this.cursorMode = this.SEARCH_MODE;
            this.search($event.target.value.toLowerCase());
        }
        else {
            console.log('SelectionComponent::handleEvent > unknown', $event);
        }
    };
    SelectionComponent.prototype.move = function (direction) {
        if (!this.canMove()) {
            return;
        }
        switch (direction) {
            case 'ArrowUp':
                if (this.cursorPosition === -1) {
                    this.cursorPosition = this._items.length - 1;
                }
                else {
                    this.cursorPosition--;
                    if (this.cursorPosition < 0) {
                        this.cursorPosition = this._items.length - 1;
                    }
                }
                break;
            case 'ArrowDown':
                if (this.cursorPosition === -1) {
                    this.cursorPosition = 0;
                }
                else {
                    this.cursorPosition++;
                    if (this.cursorPosition >= this._items.length) {
                        this.cursorPosition = 0;
                    }
                }
                break;
            case 'ArrowLeft':
                this.cursorPosition = 0;
                break;
            case 'ArrowRight':
                this.cursorPosition = this._items.length - 1;
                break;
            default:
                return;
        }
        this.cursorId = this._items[this.cursorPosition][this.idKey];
    };
    SelectionComponent.prototype.canMove = function () {
        return this.isOpen && this._items.length > 0;
    };
    SelectionComponent.prototype.addOnCursor = function () {
        this.add(this._items[this.cursorPosition]);
    };
    SelectionComponent.prototype.resetCursor = function () {
        this.cursorId = null;
        this.cursorPosition = -1;
        this.cursorMode = this.MOVE_MODE;
    };
    SelectionComponent.prototype.selectFirst = function () {
        if (this.cursorMode === this.SEARCH_MODE && this._items.length > 0) {
            this.cursorId = this._items[0].id;
            this.cursorPosition = 0;
            this.cursorMode = this.MOVE_MODE;
        }
    };
    SelectionComponent.prototype.open = function () {
        if (!this.isOpen) {
            this.initListenGlobal();
        }
        this.isOpen = true;
        this.isFocused = true;
        if (this.firstOpen) {
            this.load.emit({ first: true });
            this.firstOpen = false;
        }
    };
    SelectionComponent.prototype.close = function () {
        this.isOpen = false;
        this.isFocused = false;
        this.resetCursor();
        this.removeListenGlobal();
    };
    SelectionComponent.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    SelectionComponent.prototype.onScroll = function ($event) {
        var _a = $event.target, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop;
        if ((scrollHeight - clientHeight) == scrollTop) {
            this.load.emit({ next: true });
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('tabIndex'), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "_tabIndex", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SelectionComponent.prototype, "onFocus", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SelectionComponent.prototype, "onBlur", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SelectionComponent.prototype, "onClick", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SelectionComponent.prototype, "onMouseDown", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], SelectionComponent.prototype, "onKeyDown", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('items'), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], SelectionComponent.prototype, "__items", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "selectedItems", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], SelectionComponent.prototype, "idKey", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], SelectionComponent.prototype, "textKey", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], SelectionComponent.prototype, "descriptionKey", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "multiple", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "disabled", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "searchable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "contentLoadable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "tabIndex", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "checkmarkIconClass", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], SelectionComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], SelectionComponent.prototype, "notFoundText", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "load", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], SelectionComponent.prototype, "change", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('searchInput'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], SelectionComponent.prototype, "searchInput", void 0);
    SelectionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'selection',
            template: "\n        <div class=\"select selection input\" [class.is-multiple]=\"multiple\" *ngIf=\"disabled\">\n            <div class=\"selection-item\"\n                  [ngClass]=\"m._itemClass\"\n                  [ngStyle]=\"m._itemStyle\"\n                  *ngFor=\"let m of selectedItems\">\n                <div class=\"selection-item-text\">{{m | localizedName:textKey}}</div>\n                <div class=\"selection-item-description\" *ngIf=\"descriptionKey\">{{m[descriptionKey]}}</div>\n            </div>\n        </div>\n        <div class=\"select selection\"\n              [class.open]=\"isOpen\"\n              [class.is-focused]=\"isFocused\"\n              [class.is-multiple]=\"multiple\"\n              [class.allow-clear]=\"isAllowClear\"\n              [class.has-selected]=\"hasSelected\"\n              *ngIf=\"!disabled\">\n            <div class=\"select-selection input\" (click)=\"toggleOpen($event)\">\n                <span class=\"selection-item\"\n                      [ngClass]=\"m._itemClass\"\n                      [ngStyle]=\"m._itemStyle\"\n                      (click)=\"remove(m, $event)\"\n                      *ngFor=\"let m of selectedItems\">\n                    <span class=\"selection-item-text\">{{m | localizedName:textKey}}</span>\n                    <span class=\"selection-item-description\" *ngIf=\"descriptionKey\">{{m[descriptionKey]}}</span>\n                </span>\n                <input *ngIf=\"searchable\"\n                    #searchInput\n                    class=\"select-search-input\"\n                    name=\"search\"\n                    value=\"\"\n                    autocomplete=\"off\"\n                    [tabindex]=\"tabIndex\"\n                    (focus)=\"onFocus($event)\"\n                    (blur)=\"onBlur($event)\"\n                    (keyup)=\"handleEvent($event)\" />\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <span class=\"select-clear\" (click)=\"clear($event)\">&times;</span>\n                <div class=\"select-search-not-found\" *ngIf=\"showNotFound && notFoundText\">{{notFoundText}}</div>\n            </div>\n            <div class=\"select-dropdown\">\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\"\n                          [class.selected]=\"selectedItemIds.indexOf(m[idKey]) !== -1\"\n                          [class.focus]=\"cursorId === m[idKey]\"\n                          (click)=\"add(m)\"\n                          *ngFor=\"let m of _items\">\n                        <i class=\"select-checkmark-icon\"></i>\n                        <div [ngClass]=\"m._itemClass\" [ngStyle]=\"m._itemStyle\">\n                            <div class=\"selection-item-text\">{{m | localizedName:textKey}}</div>\n                            <div class=\"selection-item-description\" *ngIf=\"descriptionKey\">{{m[descriptionKey]}}</div>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _b) || Object])
    ], SelectionComponent);
    return SelectionComponent;
    var _a, _b;
}());


/***/ },
/* 567 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TagsInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.allowClear = false;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.items = [];
        this.selectedTags = [];
    }
    TagsInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('reference').subscribe(function (state) {
            _this.items = state.tags;
            _this.items = state.tags.filter(function (it) { return it.hidden != true; });
            _this.items.map(function (it) {
                it._itemStyle = { color: it.color };
                it._itemClass = 'tag';
            });
            if (_this.ids) {
                _this.selectedTags = state.tags.filter(function (it) { return _this.ids.indexOf(it.id) != -1; });
            }
        });
    };
    TagsInputComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TagsInputComponent.prototype.onSelect = function (selectedTags) {
        this.change.emit(selectedTags);
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
    ], TagsInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TagsInputComponent.prototype, "change", void 0);
    TagsInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tags-input',
            template: "\n        <selection\n            class=\"tags-input\"\n            [items]=\"items\"\n            [selectedItems]=\"selectedTags\"\n            [disabled]=\"!editable\"\n            [searchable]=\"true\"\n            [allowClear]=\"allowClear\"\n            [multiple]=\"true\"\n            [placeHolder]=\"placeHolder\"\n            (change)=\"onSelect($event)\">\n        </selection>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object])
    ], TagsInputComponent);
    return TagsInputComponent;
    var _a;
}());


/***/ },
/* 568 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_translate_ng2_translate__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_translate_ng2_translate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_translate_ng2_translate__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TaskStatusInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TaskStatusInputComponent = (function () {
    function TaskStatusInputComponent(translate) {
        var _this = this;
        this.translate = translate;
        this.placeHolder = '';
        this.editable = false;
        this.allowClear = false;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.status = {};
        this.statusName = '';
        this.statusList = [];
        translate.get(['processing', 'completed', 'waiting', 'cancelled', 'pending', 'open']).subscribe(function (t) {
            _this.statusList = [
                { id: 'PROCESSING', name: t.processing, _itemClass: 'status-processing' },
                { id: 'COMPLETED', name: t.completed, _itemClass: 'status-completed' },
                { id: 'WAITING', name: t.waiting, _itemClass: 'status-waiting' },
                { id: 'CANCELLED', name: t.cancelled, _itemClass: 'status-cancelled' },
                { id: 'PENDING', name: t.pending, _itemClass: 'status-pending' },
                { id: 'OPEN', name: t.open, _itemClass: 'status-open' }
            ];
            _this.status = _this.statusList.filter(function (it) { return it.id === _this.statusName; });
        });
    }
    Object.defineProperty(TaskStatusInputComponent.prototype, "_status", {
        set: function (status) {
            this.statusName = status;
            this.status = this.statusList.filter(function (it) { return it.id === status; });
        },
        enumerable: true,
        configurable: true
    });
    ;
    TaskStatusInputComponent.prototype.onSelect = function (m) {
        this.status = m;
        this.change.emit(this.status ? this.status.id : '');
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('status'), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], TaskStatusInputComponent.prototype, "_status", null);
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
        __metadata('design:type', Object)
    ], TaskStatusInputComponent.prototype, "change", void 0);
    TaskStatusInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-status-input',
            template: "\n        <selection\n            class=\"task-status-input\"\n            [items]=\"statusList\"\n            [selectedItems]=\"status ? status : []\"\n            [disabled]=\"!editable\"\n            [searchable]=\"true\"\n            [allowClear]=\"allowClear\"\n            [placeHolder]=\"placeHolder\"\n            (change)=\"onSelect($event)\">\n        </selection>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_translate_ng2_translate__["TranslateService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_translate_ng2_translate__["TranslateService"]) === 'function' && _a) || Object])
    ], TaskStatusInputComponent);
    return TaskStatusInputComponent;
    var _a;
}());


/***/ },
/* 569 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TaskTypeInputComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.allowClear = false;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.taskTypes = [];
    }
    TaskTypeInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('reference').subscribe(function (state) {
            _this.taskTypes = state.taskTypes;
            _this.taskType = state.taskTypes.filter(function (it) { return it.id == _this.id; })[0];
        });
    };
    TaskTypeInputComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TaskTypeInputComponent.prototype.onSelect = function (m) {
        this.taskType = m;
        this.change.emit(this.taskType);
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
    ], TaskTypeInputComponent.prototype, "allowClear", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TaskTypeInputComponent.prototype, "change", void 0);
    TaskTypeInputComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-type-input',
            template: "\n        <selection\n            class=\"task-type-input\"\n            [items]=\"taskTypes\"\n            [selectedItems]=\"taskType ? [taskType] : []\"\n            [disabled]=\"!editable\"\n            [searchable]=\"true\"\n            [allowClear]=\"allowClear\"\n            [placeHolder]=\"placeHolder\"\n            (change)=\"onSelect($event)\">\n        </selection>\n    "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object])
    ], TaskTypeInputComponent);
    return TaskTypeInputComponent;
    var _a;
}());


/***/ },
/* 570 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TaskCancelDialogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
            template: "\n        <div class=\"dialog__container\">\n            <header class=\"dialog__head\">{{'cancel_task' | translate}}?</header>\n            <section class=\"dialog__body\">\n                <textarea name=\"comment\" placeholder=\"{{'cancel_reason' | translate}}\" [(ngModel)]=\"comment\"></textarea>\n            </section>\n            <footer class=\"dialog__footer\">\n                <button type=\"button\" class=\"btn\" (click)=\"cancel.emit(true)\">\n                    {{'close' | translate}}\n                </button>\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"confirm.emit(comment)\">\n                    {{'cancel_task' | translate}}\n                </button>\n            </footer>\n        </div>\n    ",
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
/* 571 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TaskFilterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.sub = this.store.select('tasks').subscribe(function (state) {
            if (state) {
                _this.taskStatus = state.filter.taskStatus;
                _this.taskTypeId = state.filter.taskTypeId;
                _this.assigneeUserId = state.filter.assigneeUserId;
                _this.tagIds = state.filter.tagIds;
            }
        });
    }
    TaskFilterComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
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
        if (assigneeUsers) {
            this.assigneeUserId = assigneeUsers.userID;
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TaskFilterComponent.prototype, "change", void 0);
    TaskFilterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-filter',
            template: "\n        <div class=\"task-filter__icon\"><i class=\"fa fa-filter\"></i></div>\n        <task-status-input [status]=\"taskStatus\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'status' | translate}}\" (change)=\"setTaskStatus($event)\"></task-status-input>\n        <task-type-input [id]=\"taskTypeId\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'task_type' | translate}}\" (change)=\"setTaskType($event)\"></task-type-input>\n        <employee-input [ids]=\"[assigneeUserId]\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'assignee_user' | translate}}\" (change)=\"setAssigneeUser($event)\"></employee-input>\n        <tags-input [ids]=\"tagIds\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'tags' | translate}}\" (change)=\"setTags($event)\"></tags-input>\n    ",
            host: {
                '[class.task-filter]': 'true'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object])
    ], TaskFilterComponent);
    return TaskFilterComponent;
    var _a;
}());


/***/ },
/* 572 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TaskTreeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TaskTreeComponent = (function () {
    function TaskTreeComponent(store, taskActions) {
        this.store = store;
        this.taskActions = taskActions;
        this.level = '';
        this.children = [];
        this.expand = false;
        this.selectable = true;
        this.expandedIds = [];
        this.expanded = false;
    }
    Object.defineProperty(TaskTreeComponent.prototype, "isHidden", {
        get: function () { return !this.expanded; },
        enumerable: true,
        configurable: true
    });
    ;
    TaskTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.store.select('tasks').subscribe(function (state) {
            _this.expandedIds = state.expandedIds;
            if (_this.expand || _this.expandedIds.indexOf(_this.rootId) != -1) {
                _this.expanded = true;
            }
            else {
                _this.expanded = false;
            }
        });
    };
    TaskTreeComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TaskTreeComponent.prototype.toggleExpanded = function (id) {
        this.store.dispatch(this.taskActions.toggleExpanded(id));
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.hidden'), 
        __metadata('design:type', Object)
    ], TaskTreeComponent.prototype, "isHidden", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], TaskTreeComponent.prototype, "level", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], TaskTreeComponent.prototype, "rootId", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], TaskTreeComponent.prototype, "children", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskTreeComponent.prototype, "expand", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TaskTreeComponent.prototype, "selectable", void 0);
    TaskTreeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'task-tree',
            template: __webpack_require__(631)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__ngrx_store__["a" /* Store */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__actions__["e" /* TaskActions */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__actions__["e" /* TaskActions */]) === 'function' && _b) || Object])
    ], TaskTreeComponent);
    return TaskTreeComponent;
    var _a, _b;
}());


/***/ },
/* 573 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Attachment; });
var Attachment = (function () {
    function Attachment() {
        this.id = '';
    }
    return Attachment;
}());


/***/ },
/* 574 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Comment; });
var Comment = (function () {
    function Comment() {
        this.id = '';
        this.fsid = '' + Date.now();
    }
    return Comment;
}());


/***/ },
/* 575 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export Employee */
var Employee = (function () {
    function Employee() {
        this.id = '';
        this.name = '@anonymous';
    }
    return Employee;
}());


/***/ },
/* 576 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Organization; });
var Organization = (function () {
    function Organization() {
        this.id = '';
    }
    return Organization;
}());


/***/ },
/* 577 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export Project */
var Project = (function () {
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
/* 578 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RequestType; });
var RequestType = (function () {
    function RequestType() {
        this.id = '';
    }
    return RequestType;
}());


/***/ },
/* 579 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export Request */
var Request = (function () {
    function Request() {
        this.id = '';
        this.fsid = '' + Date.now();
        this.acl = {};
        this.comment = '';
    }
    return Request;
}());


/***/ },
/* 580 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export Tag */
var Tag = (function () {
    function Tag() {
        this.id = '';
    }
    return Tag;
}());


/***/ },
/* 581 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export TaskType */
var TaskType = (function () {
    function TaskType() {
        this.id = '';
    }
    return TaskType;
}());


/***/ },
/* 582 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export Task */
var Task = (function () {
    function Task() {
        this.id = '';
        this.editable = false;
        this.fsid = '' + Date.now();
        this.acl = {};
        this.children = {};
        this.status = 'DRAFT';
        this.priority = 'NORMAL';
        this.customerObservation = false;
    }
    return Task;
}());


/***/ },
/* 583 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DateDurationPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 584 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DateFormatPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 585 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date_format_pipe__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_duration_pipe__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__text_transform_pipe__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__values_pipe__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__keys_pipe__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__localized_name_pipe__ = __webpack_require__(587);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__date_format_pipe__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__date_duration_pipe__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__text_transform_pipe__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__values_pipe__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__keys_pipe__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__localized_name_pipe__["a"]; });








/***/ },
/* 586 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return KeysPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 587 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services__ = __webpack_require__(44);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LocalizedNamePipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        if (model) {
            var _field = field || 'name', _locale = locale || this.appService.language;
            if (model.localizedName) {
                return model.localizedName[_locale] || model[_field];
            }
            else {
                return model[_field] || '';
            }
        }
        return '';
    };
    LocalizedNamePipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'localizedName' }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services__["a" /* AppService */]) === 'function' && _a) || Object])
    ], LocalizedNamePipe);
    return LocalizedNamePipe;
    var _a;
}());


/***/ },
/* 588 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(585);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PipesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__index__["a" /* DateFormatPipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["b" /* DateDurationPipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["c" /* TextTransformPipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["d" /* LocalizedNamePipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["e" /* KeysPipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["f" /* ValuesPipe */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__index__["a" /* DateFormatPipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["b" /* DateDurationPipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["c" /* TextTransformPipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["d" /* LocalizedNamePipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["e" /* KeysPipe */],
                __WEBPACK_IMPORTED_MODULE_1__index__["f" /* ValuesPipe */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PipesModule);
    return PipesModule;
}());


/***/ },
/* 589 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TextTransformPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 590 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ValuesPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 591 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_app_actions__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return authedReducer; });

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
/* 592 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_environment_actions__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environmentReducer; });

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
/* 593 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_project_actions__ = __webpack_require__(112);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return projectsReducer; });

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
/* 594 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_reference_actions__ = __webpack_require__(282);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return referenceReducer; });

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
/* 595 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return staffReducer; });

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
/* 596 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return taskReducer; });

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
/* 597 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(35);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return tasksReducer; });

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
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].FETCH_TASKS:
            return Object.assign({}, state, {
                loading: true
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].FETCH_TASKS_FULFILLED:
            return Object.assign({}, state, {
                tasks: payload.tasks,
                meta: payload.meta,
                loading: false
            });
        case __WEBPACK_IMPORTED_MODULE_0__actions__["e" /* TaskActions */].FETCH_TASKS_FAILED:
            return Object.assign({}, state, {
                tasks: payload.tasks,
                meta: payload.meta,
                loading: false
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
/* 598 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ReferenceService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReferenceService = (function () {
    function ReferenceService(http, appService) {
        this.http = http;
        this.appService = appService;
    }
    ReferenceService.prototype.fetchTags = function () {
        var _this = this;
        return this.http.get('/Reference/p?id=tags', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* xhrHeaders */])() })
            .retry(3)
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                tags: data.list,
                meta: data.meta
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    ReferenceService.prototype.fetchTaskTypes = function () {
        var _this = this;
        return this.http.get('/Reference/p?id=tasktypes', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* xhrHeaders */])() })
            .retry(3)
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                taskTypes: data.list,
                meta: data.meta
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    ReferenceService.prototype.fetchRequestTypes = function () {
        var _this = this;
        return this.http.get('/Reference/p?id=request-types', { headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* xhrHeaders */])() })
            .retry(3)
            .map(function (response) { return response.json().objects[0]; })
            .map(function (data) {
            return {
                requestTypes: data.list,
                meta: data.meta
            };
        })
            .catch(function (error) { return _this.appService.handleError(error); });
    };
    ReferenceService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__app_service__["a" /* AppService */]) === 'function' && _b) || Object])
    ], ReferenceService);
    return ReferenceService;
    var _a, _b;
}());


/***/ },
/* 599 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UploadService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 600 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DatepickerDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Pikaday = __webpack_require__(186);
var DatepickerDirective = (function () {
    function DatepickerDirective(elementRef) {
        this.elementRef = elementRef;
        this.format = 'DD.MM.YYYY';
        this.yearRange = 30;
        this.firstDay = 1;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    DatepickerDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.picker = new Pikaday({
            field: this.elementRef.nativeElement,
            minDate: this.minDate,
            maxDate: this.maxDate,
            firstDay: this.firstDay,
            yearRange: this.yearRange,
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], DatepickerDirective.prototype, "minDate", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], DatepickerDirective.prototype, "maxDate", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], DatepickerDirective.prototype, "yearRange", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], DatepickerDirective.prototype, "firstDay", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], DatepickerDirective.prototype, "select", void 0);
    DatepickerDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[datepicker]'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object])
    ], DatepickerDirective);
    return DatepickerDirective;
    var _a;
}());


/***/ },
/* 601 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AutofocusDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object])
    ], AutofocusDirective);
    return AutofocusDirective;
    var _a;
}());


/***/ },
/* 602 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TextareaAutoSizeDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TextareaAutoSizeDirective = (function () {
    function TextareaAutoSizeDirective(element) {
        this.element = element;
        this.minRows = 3;
        this.el = this.element.nativeElement;
    }
    TextareaAutoSizeDirective.prototype.onInput = function (textArea) {
        this.resize();
    };
    Object.defineProperty(TextareaAutoSizeDirective.prototype, "_minRows", {
        set: function (rows) {
            if (+rows > 0)
                this.minRows = +rows;
        },
        enumerable: true,
        configurable: true
    });
    TextareaAutoSizeDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () { _this.resize(); }, 0);
    };
    TextareaAutoSizeDirective.prototype.resize = function () {
        var lineHeight = parseFloat(window.getComputedStyle(this.el, null).getPropertyValue('line-height'));
        this.el.rows = this.minRows;
        var rows = Math.ceil((this.el.scrollHeight - this.el.offsetHeight) / lineHeight);
        this.el.rows = this.minRows + rows;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('input', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TextareaAutoSizeDirective.prototype, "onInput", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('rows'), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], TextareaAutoSizeDirective.prototype, "_minRows", null);
    TextareaAutoSizeDirective = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: 'textarea[autosize]'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object])
    ], TextareaAutoSizeDirective);
    return TextareaAutoSizeDirective;
    var _a;
}());


/***/ },
/* 603 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown_toggle_component__ = __webpack_require__(294);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return DropdownComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.documentKeyupListener();
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
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onMouseEnter", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mouseleave', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onMouseLeave", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onClick", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onFocus", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onBlur", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DropdownComponent.prototype, "onKeyDown", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__dropdown_toggle_component__["a" /* DropdownToggleComponent */]), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]) === 'function' && _a) || Object)
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
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _b) || Object])
    ], DropdownComponent);
    return DropdownComponent;
    var _a, _b;
}());


/***/ },
/* 604 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dropdown_component__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dropdown_toggle_component__ = __webpack_require__(294);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__dropdown_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__dropdown_toggle_component__["a"]; });




/***/ },
/* 605 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img_view_service__ = __webpack_require__(175);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ImgViewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
    ImgViewComponent.prototype.onEsc = function ($event) {
        $event.preventDefault();
        this.hide($event);
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
                '[class.show]': 'show',
                '[tabIndex]': '0',
                '(keyup.esc)': 'onEsc($event)'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__img_view_service__["a" /* ImgViewService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__img_view_service__["a" /* ImgViewService */]) === 'function' && _a) || Object])
    ], ImgViewComponent);
    return ImgViewComponent;
    var _a;
}());


/***/ },
/* 606 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img_view_service__ = __webpack_require__(175);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ImgViewDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__img_view_service__["a" /* ImgViewService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__img_view_service__["a" /* ImgViewService */]) === 'function' && _a) || Object])
    ], ImgViewDirective);
    return ImgViewDirective;
    var _a;
}());


/***/ },
/* 607 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__img_view_component__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img_view_directive__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__img_view_service__ = __webpack_require__(175);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__img_view_component__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__img_view_directive__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__img_view_service__["a"]; });





/***/ },
/* 608 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__markdown_converter__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__markdown_editor__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__marked_pipe__ = __webpack_require__(610);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__markdown_converter__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__markdown_editor__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__marked_pipe__["a"]; });





/***/ },
/* 609 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__markdown_converter__ = __webpack_require__(176);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MarkdownEditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MarkdownEditorComponent = (function () {
    function MarkdownEditorComponent(renderer, mdc) {
        this.renderer = renderer;
        this.mdc = mdc;
        this.editable = true;
        this.markdown = '';
        this.updateTimeout = 150;
        this.writeLabel = 'Write';
        this.previewLabel = 'Preview';
        this.update = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.focus = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.blur = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onFullscreen = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.fullscreen = false;
        this.splitMode = false;
        this.hasValue = false;
        this.isMdMode = true;
        this.isPreviewMode = false;
        this.helpVisible = false;
    }
    Object.defineProperty(MarkdownEditorComponent.prototype, "_edit", {
        get: function () { return this.editable; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MarkdownEditorComponent.prototype, "_fullscreen", {
        get: function () { return this.fullscreen; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MarkdownEditorComponent.prototype, "_splitMode", {
        get: function () { return this.splitMode; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MarkdownEditorComponent.prototype, "_helpVisible", {
        get: function () { return this.helpVisible; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MarkdownEditorComponent.prototype, "_hasValue", {
        get: function () { return this.hasValue; },
        enumerable: true,
        configurable: true
    });
    ;
    MarkdownEditorComponent.prototype.ngOnInit = function () {
        this.html = this.mdc.toHtml(this.markdown);
        this.hasValue = this.markdown.length > 0;
        this._markdown = this.markdown;
        if (this.editable) {
            this.setActiveMdMode();
        }
        else {
            this.setActivePreviewMode();
        }
    };
    MarkdownEditorComponent.prototype.onEsc = function ($event) {
        $event.preventDefault();
        if (this.fullscreen) {
            this.toggleFullscreen();
        }
    };
    MarkdownEditorComponent.prototype.focusMdTextArea = function () {
        var _this = this;
        if (this.mdTextArea) {
            setTimeout(function () {
                _this.renderer.invokeElementMethod(_this.mdTextArea.nativeElement, 'focus');
            }, 0);
        }
    };
    MarkdownEditorComponent.prototype.setActiveMdMode = function () {
        this.isMdMode = true;
        this.isPreviewMode = false;
        this.splitMode = false;
        this.focusMdTextArea();
    };
    MarkdownEditorComponent.prototype.setActivePreviewMode = function () {
        this.isPreviewMode = true;
        this.isMdMode = false;
        this.splitMode = false;
    };
    MarkdownEditorComponent.prototype.toggleFullscreen = function () {
        this.fullscreen = !this.fullscreen;
        this.onFullscreen.emit(this.fullscreen);
        this.focusMdTextArea();
    };
    MarkdownEditorComponent.prototype.toggleSplitMode = function () {
        this.splitMode = !this.splitMode;
        this.isMdMode = this.splitMode !== true;
        this.isPreviewMode = false;
        this.focusMdTextArea();
    };
    MarkdownEditorComponent.prototype.toggleHelp = function () {
        this.helpVisible = !this.helpVisible;
    };
    MarkdownEditorComponent.prototype.updateValue = function (value) {
        var _this = this;
        clearTimeout(this.timeout);
        this.hasValue = value.trim().length > 0;
        this.timeout = setTimeout(function () {
            _this.update.emit(value.trim());
            _this.html = _this.mdc.toHtml(value.trim());
        }, this.updateTimeout);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.md-editor'), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "true", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.edit'), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "_edit", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.fullscreen'), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "_fullscreen", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.split-mode'), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "_splitMode", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.help-is-visible'), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "_helpVisible", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.has-value'), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "_hasValue", null);
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
    ], MarkdownEditorComponent.prototype, "placeHolder", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], MarkdownEditorComponent.prototype, "updateTimeout", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MarkdownEditorComponent.prototype, "writeLabel", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', String)
    ], MarkdownEditorComponent.prototype, "previewLabel", void 0);
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
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], MarkdownEditorComponent.prototype, "onFullscreen", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mdTextArea'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], MarkdownEditorComponent.prototype, "mdTextArea", void 0);
    MarkdownEditorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'markdown-editor',
            template: "\n        <div class=\"md-editor-container\">\n            <div class=\"md-editor__tabs\" [class.md-active]=\"isMdMode\" [class.preview-active]=\"isPreviewMode\">\n                <div class=\"md-editor__placeholder\" *ngIf=\"placeHolder\">{{placeHolder}}</div>\n                <div class=\"md-editor__tab-title-md\" *ngIf=\"editable\" (click)=\"setActiveMdMode()\">\n                    {{writeLabel}}\n                    <a class=\"md-editor-site\" href=\"https://daringfireball.net/projects/markdown/syntax\" tabindex=\"-1\" (click)=\"false\" title=\"Markdown\" target=\"blank\" rel=\"noreferrer\">\n                        <img height=\"14px\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAUCAYAAAGblg/ZAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFXpUWHRBdXRob3IAAAiZy01NycwDAAYmAg7P7sJVAAABUklEQVRIx2NgYGAwAuL/SBhCwAAjmsB6RmwqYOA/Ni0MyIYuQGKj0MicB1D2YZgYyMh/aHYhg6sMuIyFeYwJh4vhAFmBMJocK05voQcEPkcSBf5jseUrEGvhUYMRe8iSyTgsQQcxuAz4j0fMHMr/i6zmCpomUjFFBhgSjCZCAD2lIEfnQixijNiiHD3AtKDRyEBMNCJ7gZFAWkFW8x+bF9BBClqcM+LKGOjOewDNGOhOZkbin8CXEnElpN9QtiOupEwMno8uRmk6uESNpEwJvkKpD5ANY6aGIdgcwwUtfWHyV6FipJqDNRSwhQCuDJGAVMEwEFHmMRJRJjKQ4gBiQpJkBzARYfB3IDZG4psA8Q8caj8CsSIOT4DElIH4M7lxtwOIdxIZx7VY5NtwVQhkJR4kXzFBcwC6/B0g5gFiISB+QkoipCtggjbSrg6A3aBS0AAACVPtjHPTRNQAAAAASUVORK5CYII=\" alt=\"md\" />\n                    </a>\n                </div>\n                <div class=\"md-editor__tab-title-preview\" *ngIf=\"editable\" (click)=\"setActivePreviewMode()\">{{previewLabel}}</div>\n                <div class=\"md-editor__btn-split-mode\" *ngIf=\"editable\" (click)=\"toggleSplitMode()\">\n                    <i class=\"fa fa-columns\"></i>\n                </div>\n                <div class=\"md-editor__btn-fullscreen\" *ngIf=\"editable\" (click)=\"toggleFullscreen()\">\n                    <i class=\"fa fa-expand\"></i>\n                </div>\n                <div class=\"md-editor__btn-help\" *ngIf=\"editable\" (click)=\"toggleHelp()\">\n                    <i class=\"fa fa-question\"></i>\n                </div>\n                <div class=\"md-editor__tab-content\">\n                    <div class=\"md-editor__markdown\" *ngIf=\"editable\">\n                        <textarea class=\"md-editor__area\"\n                            #mdTextArea\n                            name=\"md\"\n                            rows=\"3\"\n                            autosize\n                            (keyup)=\"updateValue($event.target.value)\"\n                            (focus)=\"focus.emit($event)\"\n                            (blur)=\"updateValue($event.target.value)\">{{_markdown}}</textarea>\n                        <!-- <div class=\"md-editor__area\" tabindex=\"0\" draggable=\"false\"\n                            #mdTextArea\n                            [contentEditable]=\"editable\"\n                            (drop)=\"false\"\n                            (keyup)=\"updateValue($event.target)\"\n                            (focus)=\"focus.emit($event)\"\n                            (blur)=\"updateValue($event.target)\"\n                            innerHTML=\"{{_markdown}}\">\n                        </div> -->\n                    </div>\n                    <div class=\"md-editor__preview\" innerHTML=\"{{html}}\"></div>\n                </div>\n            </div>\n            <div class=\"md-editor__help\" [class.show]=\"helpVisible\">\n                <div class=\"md-editor__help-list\">\n                    <div class=\"md-editor__help-item\">\n                        <h1 class=\"md-editor__help-item-h\"># H1</h1>\n                        <h2 class=\"md-editor__help-item-h\">## H2</h2>\n                        <h3 class=\"md-editor__help-item-h\">### H3</h3>\n                    </div>\n                    <div class=\"md-editor__help-item\">\n                        <em>_italic_</em><br/>\n                        <em>*italic*</em><br/>\n                        <strong>__bold__</strong><br/>\n                        <strong>**bold**</strong><br/>\n                        <code>`monospace`</code>\n                    </div>\n                    <div class=\"md-editor__help-item\">\n                        ---\n                        <hr/>\n                    </div>\n                    <div class=\"md-editor__help-item\">\n                        <div class=\"md-editor__help-item-md\">\n                            - 1<br/>- 2<br/>- 3\n                        </div>\n                        <div class=\"md-editor__help-item-html\">\n                            <ul>\n                                <li>1</li>\n                                <li>2</li>\n                                <li>3</li>\n                            </ul>\n                        </div>\n                    </div>\n                    <!-- <div class=\"md-editor__help-item\">\n                        <div class=\"md-editor__help-item-md\">\n                            &gt; blockquote<br/>&gt; Abc<br/>&gt; 123<br/>\n                        </div>\n                        <div class=\"md-editor__help-item-html\">\n                            <blockquote>\n                                <p>blockquote<br>Abc<br>123</p>\n                            </blockquote>\n                        </div>\n                    </div>\n                    <div class=\"md-editor__help-item\">\n                        <div class=\"md-editor__help-item-md\">\n                            1. n1<br/>2. n2<br/>3. n3\n                        </div>\n                        <div class=\"md-editor__help-item-html\">\n                            <ol>\n                                <li>n1</li>\n                                <li>n2</li>\n                                <li>n3</li>\n                            </ol>\n                        </div>\n                    </div> -->\n                    <div class=\"md-editor__help-item\">\n                        [link](http://google.com)<br/>\n                        <a href=\"http://google.com\">link</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
            host: {
                'tabindex': '-1',
                '(keyup.esc)': 'onEsc($event)'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__markdown_converter__["a" /* MarkdownConverter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__markdown_converter__["a" /* MarkdownConverter */]) === 'function' && _c) || Object])
    ], MarkdownEditorComponent);
    return MarkdownEditorComponent;
    var _a, _b, _c;
}());


/***/ },
/* 610 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__markdown_converter__ = __webpack_require__(176);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MarkedPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__markdown_converter__["a" /* MarkdownConverter */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__markdown_converter__["a" /* MarkdownConverter */]) === 'function' && _a) || Object])
    ], MarkedPipe);
    return MarkedPipe;
    var _a;
}());


/***/ },
/* 611 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_service__ = __webpack_require__(295);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NotificationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__notification_service__["a" /* NotificationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__notification_service__["a" /* NotificationService */]) === 'function' && _a) || Object])
    ], NotificationComponent);
    return NotificationComponent;
    var _a;
}());


/***/ },
/* 612 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pagination__ = __webpack_require__(613);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__pagination__["a"]; });



/***/ },
/* 613 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PaginationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        this.currentPage = 0;
        this.totalPages = 0;
        this.maxPageControl = 5;
        this.change = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
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
    PaginationComponent.prototype.ngOnChanges = function () {
        this.pagination();
    };
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
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('page'), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "currentPage", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "totalPages", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Number)
    ], PaginationComponent.prototype, "maxPageControl", void 0);
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
/* 614 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__img_view__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pagination__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_autofocus_directive__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_textarea_autosize_directive__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__datepicker_datepicker__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dropdown__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tabs__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__switch_button__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__notification__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__markdown__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__tree_indentation_tree_indentation_component__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__sort_control_sort_control_component__ = __webpack_require__(615);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__pagination__["a" /* PaginationComponent */],
                __WEBPACK_IMPORTED_MODULE_10__notification__["a" /* NotificationComponent */],
                __WEBPACK_IMPORTED_MODULE_4__directives_autofocus_directive__["a" /* AutofocusDirective */],
                __WEBPACK_IMPORTED_MODULE_5__directives_textarea_autosize_directive__["a" /* TextareaAutoSizeDirective */],
                __WEBPACK_IMPORTED_MODULE_6__datepicker_datepicker__["a" /* DatepickerDirective */],
                __WEBPACK_IMPORTED_MODULE_8__tabs__["a" /* Tabs */], __WEBPACK_IMPORTED_MODULE_8__tabs__["b" /* Tab */],
                __WEBPACK_IMPORTED_MODULE_7__dropdown__["a" /* DropdownComponent */], __WEBPACK_IMPORTED_MODULE_7__dropdown__["b" /* DropdownToggleComponent */],
                __WEBPACK_IMPORTED_MODULE_11__markdown__["a" /* MarkdownEditorComponent */], __WEBPACK_IMPORTED_MODULE_11__markdown__["b" /* MarkedPipe */],
                __WEBPACK_IMPORTED_MODULE_9__switch_button__["a" /* SwitchButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_2__img_view__["a" /* ImgViewDirective */], __WEBPACK_IMPORTED_MODULE_2__img_view__["b" /* ImgViewComponent */],
                __WEBPACK_IMPORTED_MODULE_12__tree_indentation_tree_indentation_component__["a" /* TreeIndentationComponent */],
                __WEBPACK_IMPORTED_MODULE_13__sort_control_sort_control_component__["a" /* SortControlComponent */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__pagination__["a" /* PaginationComponent */],
                __WEBPACK_IMPORTED_MODULE_10__notification__["a" /* NotificationComponent */],
                __WEBPACK_IMPORTED_MODULE_4__directives_autofocus_directive__["a" /* AutofocusDirective */],
                __WEBPACK_IMPORTED_MODULE_5__directives_textarea_autosize_directive__["a" /* TextareaAutoSizeDirective */],
                __WEBPACK_IMPORTED_MODULE_6__datepicker_datepicker__["a" /* DatepickerDirective */],
                __WEBPACK_IMPORTED_MODULE_8__tabs__["a" /* Tabs */], __WEBPACK_IMPORTED_MODULE_8__tabs__["b" /* Tab */],
                __WEBPACK_IMPORTED_MODULE_7__dropdown__["a" /* DropdownComponent */], __WEBPACK_IMPORTED_MODULE_7__dropdown__["b" /* DropdownToggleComponent */],
                __WEBPACK_IMPORTED_MODULE_11__markdown__["a" /* MarkdownEditorComponent */], __WEBPACK_IMPORTED_MODULE_11__markdown__["b" /* MarkedPipe */],
                __WEBPACK_IMPORTED_MODULE_9__switch_button__["a" /* SwitchButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_2__img_view__["a" /* ImgViewDirective */], __WEBPACK_IMPORTED_MODULE_2__img_view__["b" /* ImgViewComponent */],
                __WEBPACK_IMPORTED_MODULE_12__tree_indentation_tree_indentation_component__["a" /* TreeIndentationComponent */],
                __WEBPACK_IMPORTED_MODULE_13__sort_control_sort_control_component__["a" /* SortControlComponent */]
            ],
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__notification__["b" /* NotificationService */],
                __WEBPACK_IMPORTED_MODULE_2__img_view__["c" /* ImgViewService */],
                __WEBPACK_IMPORTED_MODULE_11__markdown__["c" /* MarkdownConverter */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SharedModule);
    return SharedModule;
}());


/***/ },
/* 615 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SortControlComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SortControlComponent = (function () {
    function SortControlComponent() {
        this.direction = 'both';
        this.active = '';
        this.name = '';
        this.sort = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._dir = 0;
        this.NONE = 0;
        this.ASC = -1;
        this.DESC = 1;
    }
    SortControlComponent.prototype.ngOnInit = function () {
        this.onChanges();
    };
    SortControlComponent.prototype.ngOnChanges = function () {
        this.onChanges();
    };
    SortControlComponent.prototype.onChanges = function () {
        var sp = this.active.split(':');
        if (sp[0] === this.name) {
            if (sp[1] === 'asc') {
                this._dir = this.ASC;
            }
            else if (sp[1] === 'desc') {
                this._dir = this.DESC;
            }
            else {
                this._dir = this.NONE;
            }
        }
        else {
            this.active = '';
            this._dir = this.NONE;
        }
    };
    SortControlComponent.prototype.onClick = function ($event) {
        var sort = '';
        if (this.direction === 'both') {
            if (this._dir === this.NONE) {
                sort = this.name + ':asc';
            }
            else if (this._dir === this.ASC) {
                sort = this.name + ':desc';
            }
            else if (this._dir === this.DESC) {
                sort = '';
            }
        }
        else if (this.direction === 'asc') {
            if (this._dir !== this.ASC) {
                sort = this.name + ':asc';
            }
        }
        else if (this.direction === 'desc') {
            if (this._dir !== this.DESC) {
                sort = this.name + ':desc';
            }
        }
        this.sort.emit(sort);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SortControlComponent.prototype, "direction", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SortControlComponent.prototype, "active", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SortControlComponent.prototype, "name", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], SortControlComponent.prototype, "sort", void 0);
    SortControlComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'sort-control',
            template: "<ng-content></ng-content>",
            host: {
                '[class.sort-control]': 'true',
                '[class.both]': 'direction === "both"',
                '[class.asc]': 'direction === "asc"',
                '[class.desc]': 'direction === "desc"',
                '[class.is-asc]': '_dir === ASC',
                '[class.is-desc]': '_dir === DESC',
                '(click)': 'onClick($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], SortControlComponent);
    return SortControlComponent;
}());


/***/ },
/* 616 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__switch_button__ = __webpack_require__(617);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__switch_button__["a"]; });



/***/ },
/* 617 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SwitchButtonComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
/* 618 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tabs__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tab__ = __webpack_require__(297);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__tabs__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__tab__["a"]; });




/***/ },
/* 619 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tab__ = __webpack_require__(297);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Tabs; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]) === 'function' && _a) || Object)
    ], Tabs.prototype, "tabs", void 0);
    Tabs = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tabs',
            template: "\n        <ul class=\"nav nav-tabs\">\n            <li *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\" [class.pinned]=\"tab.pinned\" [class.active]=\"tab.active\">\n                <a href=\"#\" (click)=\"$event.preventDefault()\">\n                    <i class=\"{{tab.icon}}\" *ngIf=\"tab.icon\"></i>\n                    {{tab.title}}\n                </a>\n            </li>\n        </ul>\n        <ng-content></ng-content>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Tabs);
    return Tabs;
    var _a;
}());


/***/ },
/* 620 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TreeIndentationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TreeIndentationComponent = (function () {
    function TreeIndentationComponent() {
        this.expandable = false;
        this.expanded = false;
        this.toggle = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.levels = [];
    }
    Object.defineProperty(TreeIndentationComponent.prototype, "_levels", {
        set: function (levels) {
            this.levels = levels ? levels.split('') : [];
        },
        enumerable: true,
        configurable: true
    });
    ;
    TreeIndentationComponent.prototype.onClick = function ($event) {
        if (this.expandable) {
            $event.preventDefault();
            $event.stopPropagation();
            this.toggle.emit($event);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TreeIndentationComponent.prototype, "expandable", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Boolean)
    ], TreeIndentationComponent.prototype, "expanded", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('level'), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], TreeIndentationComponent.prototype, "_levels", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(), 
        __metadata('design:type', Object)
    ], TreeIndentationComponent.prototype, "toggle", void 0);
    TreeIndentationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'tree-indentation',
            template: "\n        <i class=\"tree-indentation_indent\"\n            [class.has-sibling]=\"_level == '1'\"\n            [class.is-last]=\"isLast\"\n            *ngFor=\"let _level of levels; let isLast = last;\">\n        </i><i class=\"tree-indentation_icon fa\"></i>\n        <span class=\"tree-indentation_content\"><ng-content></ng-content></span>\n    ",
            host: {
                '[class.tree-indentation]': 'true',
                '[class.is-expandable]': 'expandable',
                '[class.is-expanded]': 'expanded',
                '(click)': 'onClick($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], TreeIndentationComponent);
    return TreeIndentationComponent;
}());


/***/ },
/* 621 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(622);
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__store__["a"]; });



/***/ },
/* 622 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngrx_store__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngrx_store_logger__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngrx_store_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ngrx_store_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers_environment_reducer__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers_authed_reducer__ = __webpack_require__(591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reducers_projects_reducer__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reducers_tasks_reducer__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reducers_task_reducer__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__reducers_staff_reducer__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reducers_reference_reducer__ = __webpack_require__(594);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return APP_STORE; });










var logger = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ngrx_store_logger__["storeLogger"])({
    level: 'log',
    collapsed: false,
    duration: true,
    timestamp: true
});
var APP_STORE = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["b" /* provideStore */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ngrx_core_compose__["compose"])(__WEBPACK_IMPORTED_MODULE_1__ngrx_store__["c" /* combineReducers */])({
    environment: __WEBPACK_IMPORTED_MODULE_3__reducers_environment_reducer__["a" /* environmentReducer */],
    authed: __WEBPACK_IMPORTED_MODULE_4__reducers_authed_reducer__["a" /* authedReducer */],
    projects: __WEBPACK_IMPORTED_MODULE_5__reducers_projects_reducer__["a" /* projectsReducer */],
    tasks: __WEBPACK_IMPORTED_MODULE_6__reducers_tasks_reducer__["a" /* tasksReducer */],
    task: __WEBPACK_IMPORTED_MODULE_7__reducers_task_reducer__["a" /* taskReducer */],
    staff: __WEBPACK_IMPORTED_MODULE_8__reducers_staff_reducer__["a" /* staffReducer */],
    reference: __WEBPACK_IMPORTED_MODULE_9__reducers_reference_reducer__["a" /* referenceReducer */]
}));


/***/ },
/* 623 */,
/* 624 */
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
/* 625 */
/***/ function(module, exports) {

module.exports = "<div class=\"layout\" [class.hidden]=\"!isReady\">\r\n    <div class=\"content-overlay\" (mousedown)=\"hideNav($event)\" (touchstart)=\"hideNav($event)\"></div>\r\n    <navbar [user]=\"loggedUser\"></navbar>\r\n    <section class=\"container\">\r\n        <nav data-c=\"nav\" class=\"aside side-nav\"></nav>\r\n        <main class=\"content\">\r\n            <router-outlet></router-outlet>\r\n        </main>\r\n    </section>\r\n</div>\r\n<div class=\"app-loading\" *ngIf=\"!isReady\">\r\n    <img class=\"brand-logo\" alt=\"logo\" src=\"{{'img/logo.png'}}\" />Loading...\r\n</div>\r\n<img-view></img-view>\r\n<notification></notification>\r\n"

/***/ },
/* 626 */
/***/ function(module, exports) {

module.exports = "<ul>\r\n    <li>\r\n        <a [routerLink]=\"['/tasks']\" class=\"nav-link\" [class.active]=\"isActive(['/']) || isActive(['/tasks'])\">\r\n            <i class=\"fa fa-list\"></i>\r\n            <span>{{'tasks_all' | translate}}</span>\r\n        </a>\r\n    </li>\r\n    <li>\r\n        <a [routerLink]=\"['/tasks', 'my']\" class=\"nav-link\" [class.active]=\"isActive(['/tasks/my'])\">\r\n            <i class=\"fa fa-pencil\"></i>\r\n            <span>{{'my_tasks' | translate}}</span>\r\n        </a>\r\n    </li>\r\n    <li>\r\n        <a [routerLink]=\"['/tasks', 'inbox']\" class=\"nav-link\" [class.active]=\"isActive(['/tasks/inbox'])\">\r\n            <i class=\"fa fa-inbox\"></i>\r\n            <span>{{'tasks_assigned_to_me' | translate}}</span>\r\n        </a>\r\n    </li>\r\n    <!-- <li>\r\n        <a [routerLink]=\"['/']\" class=\"nav-link\">\r\n            <i class=\"fa fa-dashboard\"></i>\r\n            <span>{{'dashboard' | translate}}</span>\r\n        </a>\r\n    </li> -->\r\n    <li class=\"divider\"></li>\r\n    <li>\r\n        <a [routerLink]=\"['/projects']\" class=\"nav-link\" [class.active]=\"isActive(['/projects'])\">\r\n            <i class=\"fa fa-puzzle-piece\"></i>\r\n            <span>{{'projects' | translate}}</span>\r\n        </a>\r\n        <ul>\r\n            <li *ngFor=\"let project of projects\">\r\n                <a [routerLink]=\"['/projects', project.id, 'tasks']\" class=\"nav-link\" [class.active]=\"isActive(['/projects/' + project.id + '/tasks'])\">\r\n                    <i class=\"fa fa-file-text-o\"></i>\r\n                    <span>{{project.name}}</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </li>\r\n</ul>\r\n"

/***/ },
/* 627 */
/***/ function(module, exports) {

module.exports = "<header class=\"header navbar\">\r\n    <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n            <button class=\"btn-side-nav-toggle\" type=\"button\" (click)=\"toggleNav()\"></button>\r\n            <img class=\"brand-logo\" alt=\"logo\" src=\"{{logoUrl}}\" />\r\n            <span class=\"brand-title\">{{headerTitle}}</span>\r\n        </div>\r\n        <nav class=\"navbar-nav navbar-right\">\r\n            <ul class=\"nav nav-inline navbar-right\">\r\n                <li dropdown [tabIndex]=\"-1\" class=\"dropdown\">\r\n                    <a dropdown-toggle href=\"#\" class=\"dropdown-toggle\">\r\n                        <i class=\"fa fa-user\"></i>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu right\">\r\n                        <li *ngIf=\"user\">\r\n                            <a class=\"user-profile\" [routerLink]=\"['/user-profile']\">\r\n                                <i class=\"fa fa-user\"></i>\r\n                                <span>{{user.name}}</span>\r\n                            </a>\r\n                        </li>\r\n                        <li class=\"divider\"></li>\r\n                        <li>\r\n                            <a class=\"ws\" href=\"{{workspaceUrl}}\">\r\n                                <i class=\"fa fa-th\"></i>\r\n                                <span>{{'workspace' | translate}}</span>\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n            <form class=\"navbar-form navbar-search\">\r\n                <input type=\"search\" class=\"q\" name=\"keyword\" value=\"{{keyWord}}\" placeholder=\"{{'search' | translate}}\" required autocomplete=\"off\" (keyup)=\"keyup$.next($event)\" (focus)=\"searchFocus()\" (blur)=\"searchBlur($event.target)\" />\r\n                <button type=\"reset\" (click)=\"search('')\"><i class=\"fa fa-times\"></i></button>\r\n                <input type=\"submit\" value=\"search\" />\r\n            </form>\r\n        </nav>\r\n    </div>\r\n</header>\r\n"

/***/ },
/* 628 */
/***/ function(module, exports) {

module.exports = "<form class=\"form\" *ngIf=\"isReady\">\r\n    <header class=\"content-header\">\r\n        <div class=\"content-actions\">\r\n            <button class=\"btn-back\" type=\"button\" title=\"{{'close' | translate}}\" (click)=\"close($event)\">\r\n                <i class=\"fa fa-chevron-left\"></i>\r\n                <span>{{'close' | translate}}</span>\r\n            </button>\r\n            <button class=\"btn btn-primary\" type=\"button\" *ngIf=\"canSave\" [disabled]=\"!isValid\" (click)=\"saveProject()\">\r\n                {{'save_close' | translate}}\r\n            </button>\r\n            <div *ngIf=\"canDelete\" dropdown class=\"buttons\" [tabIndex]=\"-1\">\r\n                <div dropdown-toggle>\r\n                    <span class=\"btn\">...</span>\r\n                </div>\r\n                <div class=\"dropdown-menu\">\r\n                    <ul class=\"menu\">\r\n                        <li>\r\n                            <a class=\"menu-item\" (click)=\"deleteProject()\">{{'delete' | translate}}</a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <h1 class=\"header-title header-title-flex\">\r\n            <label>{{title | translate}}</label>\r\n            <input [class.invalid]=\"errors.name\" autofocus required name=\"name\" maxlength=\"140\" placeholder=\"{{'name' | translate}}\" [readonly]=\"!isEditable\" (keyup)=\"validateForm()\" [(ngModel)]=\"project.name\" />\r\n        </h1>\r\n    </header>\r\n    <section class=\"content-body\">\r\n        <tabs>\r\n            <tab class=\"tab-pane\" tabTitle=\"{{'properties' | translate}}\">\r\n                <div class=\"fieldset\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'customer' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.customerId\">\r\n                            <organization-input class=\"span8\" [editable]=\"isEditable\" [id]=\"project.customerId\" (change)=\"setCustomer($event)\"></organization-input>\r\n                            <error-message [error]=\"errors.customerId\"></error-message>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'manager' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.managerUserId\">\r\n                            <employee-input class=\"span8\" [editable]=\"isEditable\" [ids]=\"[project.managerUserId]\" (change)=\"setManager($event)\"></employee-input>\r\n                            <error-message [error]=\"errors.managerUserId\"></error-message>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'programmer' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.programmerUserId\">\r\n                            <employee-input class=\"span8\" [editable]=\"isEditable\" [ids]=\"[project.programmerUserId]\" (change)=\"setProgrammer($event)\"></employee-input>\r\n                            <error-message [error]=\"errors.programmerUserId\"></error-message>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'tester' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.testerUserId\">\r\n                            <employee-input class=\"span8\" [editable]=\"isEditable\" [ids]=\"[project.testerUserId]\" (change)=\"setTester($event)\"></employee-input>\r\n                            <error-message [error]=\"errors.testerUserId\"></error-message>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'observers' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.observerUserIds\">\r\n                            <employee-input class=\"span8\" [editable]=\"isEditable\" [multiple]=\"true\" [allowClear]=\"true\" [ids]=\"project.observerUserIds\" (change)=\"setObserver($event)\"></employee-input>\r\n                            <error-message [error]=\"errors.observerUserIds\"></error-message>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'status' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.status\">\r\n                            <switch-button [disabled]=\"!isEditable\" [model]=\"project\" value=\"status\" [items]=\"projectStatusTypes\"></switch-button>\r\n                            <error-message [error]=\"errors.status\"></error-message>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'finish_date' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.finishDate\">\r\n                            <div class=\"span2\" *ngIf=\"!isEditable\">\r\n                                <span class=\"input\">{{project.finishDate}}</span>\r\n                            </div>\r\n                            <input class=\"span2\" datepicker *ngIf=\"isEditable\" name=\"finishDate\" (select)=\"setFinishDate($event)\" [(ngModel)]=\"project.finishDate\" />\r\n                            <span>{{'now' | dateDuration:project.finishDate}}</span>\r\n                            <error-message [error]=\"errors.finishDate\"></error-message>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'comment' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.comment\">\r\n                            <markdown-editor writeLabel=\"{{'markdown_write' | translate}}\" previewLabel=\"{{'markdown_preview' | translate}}\" [markdown]=\"project.comment || ''\" [editable]=\"isEditable\" [updateTimeout]=\"300\" (update)=\"setProjectComment($event)\"></markdown-editor>\r\n                            <error-message [error]=\"errors.comment\"></error-message>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <attachments [editable]=\"isEditable\" [model]=\"project\" (upload)=\"addAttachment($event)\" (delete)=\"deleteAttachment($event)\"></attachments>\r\n            </tab>\r\n            <tab class=\"tab-pane\" tabTitle=\"{{'acl_tab_title' | translate}}\" icon=\"fa fa-share-alt\" *ngIf=\"!isNew\">\r\n                <acl [acl]=\"project.acl\"></acl>\r\n            </tab>\r\n        </tabs>\r\n    </section>\r\n    <footer class=\"content-footer\">\r\n        <div class=\"record-author\" *ngIf=\"project.authorId\">\r\n            <span>{{'author' | translate}}</span>\r\n            <employee-input [ids]=\"[project.authorId]\"></employee-input>\r\n            <span>{{project.regDate}}</span>\r\n        </div>\r\n    </footer>\r\n</form>\r\n"

/***/ },
/* 629 */
/***/ function(module, exports) {

module.exports = "<div class=\"content-header\" *ngIf=\"headerVisible\">\r\n    <h1 class=\"header-title\" *ngIf=\"titleVisible\">\r\n        {{title | translate}}\r\n        <sup *ngIf=\"!loading && meta.count\">({{meta.count}})</sup>\r\n    </h1>\r\n    <div class=\"content-actions\" *ngIf=\"actionsVisible\">\r\n        <button class=\"btn\" type=\"button\" (click)=\"newProject()\">\r\n            {{'new_project' | translate}}\r\n        </button>\r\n        <button class=\"btn btn-refresh\" type=\"button\" (click)=\"refresh()\">\r\n            <i class=\"fa fa-refresh\"></i>\r\n        </button>\r\n        <pagination [totalPages]=\"meta.totalPages\" [page]=\"meta.page\" (change)=\"goToPage($event)\"></pagination>\r\n    </div>\r\n</div>\r\n<div class=\"content-body\">\r\n    <div class=\"view project-list\">\r\n        <header class=\"entries-head\" *ngIf=\"captionsVisible\">\r\n            <div class=\"head-wrap\">\r\n                <label class=\"entry-select\" *ngIf=\"selectable\">\r\n                    <input type=\"checkbox\" class=\"all\" />\r\n                </label>\r\n                <div class=\"entry-captions\">\r\n                    <div class=\"project-list__name\">\r\n                        <sort-control direction=\"desc\" name=\"name\" [active]=\"activeSort\" (sort)=\"onSort($event)\">\r\n                            {{'name' | translate}}\r\n                        </sort-control>\r\n                    </div>\r\n                    <div class=\"vw-icon\"><i class=\"fa fa-paperclip\"></i></div>\r\n                    <div class=\"project-list__status\">{{'status' | translate}}</div>\r\n                    <div class=\"project-list__customer\">{{'customer' | translate}}</div>\r\n                    <div class=\"project-list__manager\">{{'manager' | translate}}</div>\r\n                    <div class=\"project-list__programmer\">{{'programmer' | translate}}</div>\r\n                    <div class=\"project-list__tester\">{{'tester' | translate}}</div>\r\n                    <div class=\"project-list__finish_date\">\r\n                        <sort-control name=\"finishDate\" [active]=\"activeSort\" (sort)=\"onSort($event)\">\r\n                            {{'finish_date' | translate}}\r\n                        </sort-control>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </header>\r\n        <div class=\"entries\">\r\n            <div class=\"entry-wrap\" *ngFor=\"let project of projects\">\r\n                <div class=\"entry\">\r\n                    <label class=\"entry-select\" *ngIf=\"selectable\">\r\n                        <input type=\"checkbox\" name=\"project-id\" [value]=\"project.id\" />\r\n                    </label>\r\n                    <a class=\"entry-link\" [routerLink]=\"['./', project.id]\">\r\n                        <div class=\"entry-fields\">\r\n                            <div class=\"project-list__name\">{{project.name}}</div>\r\n                            <div class=\"vw-icon\">\r\n                                <i class=\"fa fa-paperclip\" *ngIf=\"project.hasAttachments\"></i>\r\n                            </div>\r\n                            <div class=\"project-list__status\">\r\n                                <span class=\"status-{{project.status | text:'L'}}\">{{project.status | text:'L' | translate}}</span>\r\n                            </div>\r\n                            <div class=\"project-list__customer\">\r\n                                <organization-input [org]=\"project.customer\"></organization-input>\r\n                            </div>\r\n                            <div class=\"project-list__manager\">\r\n                                <employee-input [ids]=\"[project.managerUserId]\"></employee-input>\r\n                            </div>\r\n                            <div class=\"project-list__programmer\">\r\n                                <employee-input [ids]=\"[project.programmerUserId]\"></employee-input>\r\n                            </div>\r\n                            <div class=\"project-list__tester\">\r\n                                <employee-input [ids]=\"[project.testerUserId]\"></employee-input>\r\n                            </div>\r\n                            <div class=\"project-list__finish_date\">\r\n                                {{project.finishDate | dateFmt:'DD.MM.YYYY'}}\r\n                                <span>{{'now' | dateDuration:project.finishDate}}</span>\r\n                            </div>\r\n                        </div>\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 630 */
/***/ function(module, exports) {

module.exports = "<form class=\"form\" *ngIf=\"isReady\">\r\n    <header class=\"content-header\">\r\n        <div class=\"content-actions\">\r\n            <button class=\"btn-back\" type=\"button\" title=\"{{'close' | translate}}\" (click)=\"close($event)\">\r\n                <i class=\"fa fa-chevron-left\"></i>\r\n                <span>{{'close' | translate}}</span>\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-primary\" *ngIf=\"canSave\" [disabled]=\"!request.requestTypeId || (isResolveAction && !dueDate)\" (click)=\"sendRequest()\">\r\n                {{'send_request' | translate}}\r\n            </button>\r\n        </div>\r\n        <h1 class=\"header-title\">\r\n            <span>{{'task_request' | translate}}</span>\r\n            <span class=\"request-resolution {{request.resolution | text:'L'}}\" *ngIf=\"request.resolution == 'ACCEPTED'\">\r\n                <i class=\"fa fa-check\"></i>\r\n                {{'accepted' | translate}}\r\n                <span class=\"request__resolution_time\">{{request.resolutionTime | dateFmt:'DD.MM.YYYY'}}</span>\r\n            </span>\r\n            <span class=\"request-resolution {{request.resolution | text:'L'}}\" *ngIf=\"request.resolution == 'DECLINED'\">\r\n                <i class=\"fa fa-times\"></i>\r\n                {{'declined' | translate}}\r\n                <span class=\"request__resolution_time\">{{request.resolutionTime | dateFmt:'DD.MM.YYYY'}}</span>\r\n            </span>\r\n        </h1>\r\n    </header>\r\n    <section class=\"content-body\">\r\n        <section class=\"task-cancel-info\" *ngIf=\"request.resolution == 'DECLINED' && request.decisionComment\">\r\n            <span>{{'decline_reason' | translate}}:&nbsp;</span>\r\n            <span>{{request.decisionComment}}</span>\r\n        </section>\r\n        <tabs>\r\n            <tab class=\"tab-pane\" tabTitle=\"{{'properties' | translate}}\">\r\n                <fieldset class=\"fieldset\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'task' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <a class=\"input-placeholder\" [routerLink]=\"['/task', task.id]\">{{task.title}}</a>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'request_type' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <div class=\"span8\">\r\n                                <request-type-input [editable]=\"editable\" placeHolder=\"{{'request_type' | translate}}\" [requestType]=\"request.requestType\" (change)=\"setRequestType($event)\"></request-type-input>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'comment' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <div class=\"span8\">\r\n                                <textarea name=\"comment\" autosize [disabled]=\"!editable\" [(ngModel)]=\"request.comment\"></textarea>\r\n                                <!-- <markdown-editor\r\n                                    [markdown]=\"''\"\r\n                                    editable=\"true\"\r\n                                    placeHolder=\"{{'comment' | translate}}\"\r\n                                    updateTimeout=\"100\"\r\n                                    (update)=\"setComment($event)\">\r\n                                </markdown-editor> -->\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </fieldset>\r\n            </tab>\r\n            <tab class=\"tab-pane\" tabTitle=\"{{'acl_tab_title' | translate}}\" icon=\"fa fa-share-alt\" *ngIf=\"!isNew\">\r\n                <acl [acl]=\"request.acl\"></acl>\r\n            </tab>\r\n        </tabs>\r\n        <div *ngIf=\"!editable && !request.attachments\">\r\n            <attachments [model]=\"request\" [editable]=\"editable\" (upload)=\"addAttachment($event)\" (delete)=\"deleteAttachment($event)\"></attachments>\r\n        </div>\r\n    </section>\r\n    <section class=\"request__resol\" *ngIf=\"canResolution\">\r\n        <fieldset class=\"fieldset\" *ngIf=\"isResolveAction\">\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'due_date' | translate}}\r\n                </div>\r\n                <div class=\"controls\">\r\n                    <div class=\"span8\">\r\n                        <input datepicker class=\"span2\" name=\"dueDate\" (select)=\"setDueDate($event)\" />\r\n                        <div class=\"help\">\r\n                            {{'new_due_date_help' | translate}}\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </fieldset>\r\n        <div class=\"request__buttons\">\r\n            <button type=\"button\" class=\"btn\" (click)=\"decline(request)\">\r\n                {{'decline' | translate}}\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"request.requestType.name == 'prolong' && !dueDate\" (click)=\"doAccept(request)\">\r\n                {{'accept' | translate}}\r\n            </button>\r\n        </div>\r\n    </section>\r\n    <footer class=\"content-footer\">\r\n        <div class=\"record-author\" *ngIf=\"request.authorId\">\r\n            <span>{{'author' | translate}}</span>\r\n            <employee-input [ids]=\"[request.authorId]\"></employee-input>\r\n            <span>{{request.regDate}}</span>\r\n        </div>\r\n    </footer>\r\n</form>\r\n<request-decline-dialog *ngIf=\"showDeclineDialog\" (confirm)=\"onConfirmDeclineDialog($event)\" (cancel)=\"onCancelDeclineDialog()\"></request-decline-dialog>\r\n"

/***/ },
/* 631 */
/***/ function(module, exports) {

module.exports = "<div class=\"top-entry\" [class.is-last]=\"isLast\" *ngFor=\"let m of children; let isLast = last\">\r\n    <div class=\"entry-wrap\" *ngIf=\"m\">\r\n        <div class=\"entry\" *ngIf=\"m.kind == 'task'\">\r\n            <label class=\"entry-select\" *ngIf=\"selectable\">\r\n                <input type=\"checkbox\" name=\"task-id\" value=\"{{m.id}}\" />\r\n            </label>\r\n            <a class=\"entry-link\" [routerLink]=\"['/task', m.id]\">\r\n                <div class=\"entry-fields\">\r\n                    <div class=\"task-list__reg-number\">\r\n                        <tree-indentation\r\n                            [expandable]=\"m.hasSubtasks || m.hasRequests\"\r\n                            [expanded]=\"expandedIds.indexOf(m.id) != -1\"\r\n                            [level]=\"level + (isLast ? '0' : '1')\"\r\n                            (toggle)=\"toggleExpanded(m.id)\">\r\n                            {{m.regNumber}}\r\n                        </tree-indentation>\r\n                    </div>\r\n                    <div class=\"task-list__title\">\r\n                        <span>{{m.title}}</span>\r\n                    </div>\r\n                    <div class=\"vw-icon\">\r\n                        <i class=\"fa fa-paperclip\" *ngIf=\"m.hasAttachments\"></i>\r\n                    </div>\r\n                    <div class=\"task-list__status\">\r\n                        <span class=\"status-{{m.status | text:'L'}}\">{{m.status | text:'L' | translate}}</span>\r\n                    </div>\r\n                    <div class=\"task-list__priority\">\r\n                        <span class=\"priority-{{m.priority | text:'L'}}\">{{m.priority | text:'L' | translate}}</span>\r\n                    </div>\r\n                    <div class=\"task-list__assignee\">\r\n                        <employee-input [ids]=\"[m.assigneeUserId]\"></employee-input>\r\n                    </div>\r\n                    <div class=\"task-list__start_date\">{{m.startDate | dateFmt:'DD.MM.YYYY'}}</div>\r\n                    <div class=\"task-list__due_date\">\r\n                        <span>{{m.dueDate | dateFmt:'DD.MM.YYYY'}}</span>\r\n                        <span>{{m.startDate | dateDuration:m.dueDate}}</span>\r\n                    </div>\r\n                    <div class=\"task-list__tags\">\r\n                        <tags-input [ids]=\"m.tagIds\"></tags-input>\r\n                    </div>\r\n                </div>\r\n            </a>\r\n        </div>\r\n        <div class=\"entry\" *ngIf=\"m.kind == 'request'\">\r\n            <label class=\"entry-select\" *ngIf=\"selectable\">\r\n                <input type=\"checkbox\" value=\"{{m.id}}\" />\r\n            </label>\r\n            <a class=\"entry-link\" [routerLink]=\"['/requests', m.id]\">\r\n                <div class=\"entry-fields\">\r\n                    <div class=\"task-list__request_type\">\r\n                        <tree-indentation [level]=\"level + (isLast ? '0' : '1')\">\r\n                            {{m.requestType | localizedName}}\r\n                            <span class=\"request__time\">{{m.regDate}}</span>\r\n                            <span class=\"request__comment\">{{m.comment}}</span>\r\n                            <span class=\"request__attachments\" *ngIf=\"m.attachments && m.attachments.length\">\r\n                                <i class=\"fa fa-paperclip\"></i>\r\n                            </span>\r\n                            <span class=\"accepted\" *ngIf=\"m.resolution == 'ACCEPTED'\">\r\n                                <i class=\"fa fa-check\"></i>\r\n                                {{'accepted' | translate}}\r\n                            </span>\r\n                            <span class=\"declined\" *ngIf=\"m.resolution == 'DECLINED'\">\r\n                                <i class=\"fa fa-times\"></i>\r\n                                {{'declined' | translate}}\r\n                            </span>\r\n                            <span class=\"request__resolution_time\">{{m.resolutionTime | dateFmt:'DD.MM.YYYY'}}</span>\r\n                        </tree-indentation>\r\n                    </div>\r\n                </div>\r\n            </a>\r\n        </div>\r\n        <div class=\"entry\" *ngIf=\"m.kind == 'comment'\">\r\n            <label class=\"entry-select\">\r\n                <input type=\"checkbox\" value=\"{{m.id}}\" />\r\n            </label>\r\n            <div class=\"entry-link\">\r\n                <div class=\"entry-fields\">\r\n                    <div class=\"task-list__comment_comment\">{{m.comment}}</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <task-tree *ngIf=\"m.children\"\r\n        [level]=\"level + (isLast ? '0' : '1')\"\r\n        [rootId]=\"m.id\"\r\n        [children]=\"m.children\"\r\n        [selectable]=\"selectable\">\r\n    </task-tree>\r\n</div>\r\n"

/***/ },
/* 632 */
/***/ function(module, exports) {

module.exports = "<form class=\"form\" *ngIf=\"isReady\">\r\n    <header class=\"content-header\">\r\n        <div class=\"content-actions\">\r\n            <button class=\"btn-back\" type=\"button\" (click)=\"close($event)\">\r\n                <i class=\"fa fa-chevron-left\"></i>\r\n                <span>{{'close' | translate}}</span>\r\n            </button>\r\n            <button class=\"btn btn-primary\" type=\"button\" *ngIf=\"canSave\" [disabled]=\"!isValid\" (click)=\"saveTask()\">\r\n                {{'save_close' | translate}}\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" *ngIf=\"canRequestAction\" (click)=\"newRequest($event)\">\r\n                {{'new_request' | translate}}\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" *ngIf=\"canAddSubTask\" (click)=\"addSubtask($event)\">\r\n                {{'add_subtask' | translate}}\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" *ngIf=\"canAcknowledgedTask\" (click)=\"acknowledgedTask()\">\r\n                <span>{{'acknowledged_task' | translate}}</span>\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" *ngIf=\"canCompleteTask\" (click)=\"completeTask()\">\r\n                <i class=\"fa fa-check-square-o\"></i>\r\n                <span>{{'complete_task' | translate}}</span>\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" *ngIf=\"canCancelTask\" (click)=\"cancelTask()\">\r\n                <i class=\"fa fa-ban\"></i>\r\n                <span>{{'cancel_task' | translate}}</span>\r\n            </button>\r\n            <div *ngIf=\"canDelete\" dropdown class=\"buttons\" [tabIndex]=\"-1\">\r\n                <div dropdown-toggle>\r\n                    <span class=\"btn\">...</span>\r\n                </div>\r\n                <div class=\"dropdown-menu\">\r\n                    <ul class=\"menu\">\r\n                        <li>\r\n                            <a class=\"menu-item\" (click)=\"deleteTask()\">{{'delete' | translate}}</a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <h1 class=\"header-title task-header-title\">\r\n            <a *ngIf=\"parentTask\" [routerLink]=\"['/task', parentTask.id]\" class=\"parent-task-link\">{{parentTask.title}}</a>\r\n            <div class=\"header-title-flex\">\r\n                <label class=\"header-title-label\">\r\n                    <div>{{title | translate}}</div>\r\n                    <span class=\"task-status status-{{task.status | text:'L'}}\">{{task.status | text:'L' | translate}}</span>\r\n                </label>\r\n                <div class=\"task-reg-number\" *ngIf=\"task.regNumber\">{{task.regNumber}}</div>\r\n                <input [class.invalid]=\"errors.title\" autofocus required name=\"title\" maxlength=\"140\" placeholder=\"{{'task_title' | translate}}\" [readonly]=\"!isEditable\" (keyup)=\"validateForm()\" [(ngModel)]=\"task.title\" />\r\n            </div>\r\n        </h1>\r\n    </header>\r\n    <section class=\"content-body\">\r\n        <section class=\"task-cancel-info\" *ngIf=\"task.status == 'CANCELLED' && task.cancellationComment\">\r\n            <span>{{'cancel_reason' | translate}}:&nbsp;</span>\r\n            <span>{{task.cancellationComment}}</span>\r\n        </section>\r\n        <div class=\"task-tabs noselect\">\r\n            <div class=\"task-tab__title\" [class.active]=\"showPropertyTab\" (click)=\"togglePropertyTab()\">{{'properties' | translate}}</div>\r\n            <div class=\"task-tab__title\" [class.active]=\"showStreamTab\" [class.hidden]=\"!hasSubTasks && !hasRequests\" (click)=\"toggleStreamTab()\">\r\n                <i class=\"fa fa-align-left\"></i>\r\n                <span>{{'execution' | translate}}</span>\r\n            </div>\r\n            <div class=\"task-tab__title\" [class.active]=\"showObserversTab\" (click)=\"toggleObserversTab()\">\r\n                <i class='fa fa-eye'></i> {{'observers' | translate}}\r\n            </div>\r\n            <div class=\"task-tab__title\" [class.active]=\"showACLTab\" [class.hidden]=\"!hasACL\" (click)=\"toggleACLTab()\">\r\n                <i class='fa fa-share-alt'></i> {{'acl_tab_title' | translate}}\r\n            </div>\r\n        </div>\r\n        <div class=\"task-tab\" [class.active]=\"showStreamTab\" *ngIf=\"!isNew\">\r\n            <tasks [tasks]=\"[task]\" [embedded]=\"true\" [headerVisible]=\"false\" [selectable]=\"false\"></tasks>\r\n        </div>\r\n        <div class=\"task-tab\" [class.active]=\"showObserversTab\">\r\n            <div class=\"fieldset\">\r\n                <div class=\"form-group\">\r\n                    <div class=\"control-label\">\r\n                        {{'observers' | translate}}\r\n                    </div>\r\n                    <div class=\"controls\" [class.has-error]=\"errors.observerUserIds\">\r\n                        <employee-input class=\"span8\" [editable]=\"isEditable\" [allowClear]=\"true\" [multiple]=\"true\" [ids]=\"task.observerUserIds\" (change)=\"setObserver($event)\"></employee-input>\r\n                        <error-message [error]=\"errors.observerUserIds\"></error-message>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"task-tab\" [class.active]=\"showACLTab\" *ngIf=\"!isNew\">\r\n            <acl [acl]=\"task.acl\"></acl>\r\n        </div>\r\n        <div class=\"task-tab\" [class.active]=\"showPropertyTab\">\r\n            <div class=\"fieldset\">\r\n                <div class=\"form-group\" *ngIf=\"!isSubtask\">\r\n                    <div class=\"control-label\">\r\n                        {{'project' | translate}}\r\n                    </div>\r\n                    <div class=\"controls\" [class.has-error]=\"errors.projectId\">\r\n                        <project-input class=\"span8\" [editable]=\"isEditable\" [id]=\"task.projectId\" (change)=\"setProject($event)\"></project-input>\r\n                        <error-message [error]=\"errors.projectId\"></error-message>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\" *ngIf=\"!isSubtask\">\r\n                    <div class=\"control-label\">\r\n                        {{'task_type' | translate}}\r\n                    </div>\r\n                    <div class=\"controls\" [class.has-error]=\"errors.taskTypeId\">\r\n                        <task-type-input class=\"span8\" [editable]=\"isEditable\" [id]=\"task.taskTypeId\" (change)=\"setTaskType($event)\"></task-type-input>\r\n                        <error-message [error]=\"errors.taskTypeId\"></error-message>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"control-label\">\r\n                        {{'priority' | translate}}\r\n                    </div>\r\n                    <div class=\"controls\" [class.has-error]=\"errors.priority\">\r\n                        <switch-button [disabled]=\"!isEditable\" [model]=\"task\" value=\"priority\" [items]=\"taskPriorityTypes\"></switch-button>\r\n                        <error-message [error]=\"errors.priority\"></error-message>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"control-label\">\r\n                        {{'assignee_user' | translate}}\r\n                    </div>\r\n                    <div class=\"controls\" [class.has-error]=\"errors.assigneeUserId\">\r\n                        <employee-input class=\"span8\" [editable]=\"isEditable\" [ids]=\"[task.assigneeUserId]\" (change)=\"setAssigneeUser($event)\"></employee-input>\r\n                        <error-message [error]=\"errors.assigneeUserId\"></error-message>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"control-label\">\r\n                        {{'start_date' | translate}}\r\n                    </div>\r\n                    <div class=\"controls\" [class.has-error]=\"errors.startDate\">\r\n                        <div class=\"span2\" *ngIf=\"!isEditable\">\r\n                            <span class=\"input\">{{task.startDate}}</span>\r\n                        </div>\r\n                        <div class=\"span2\" *ngIf=\"isEditable\">\r\n                            <input datepicker class=\"span2\" name=\"startDate\" (select)=\"setStartDate($event)\" [(ngModel)]=\"task.startDate\" />\r\n                        </div>\r\n                        <error-message [error]=\"errors.startDate\"></error-message>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"control-label\">\r\n                        {{'due_date' | translate}}\r\n                    </div>\r\n                    <div class=\"controls\" [class.has-error]=\"errors.dueDate\">\r\n                        <div class=\"span2\" *ngIf=\"!isEditable\">\r\n                            <span class=\"input\">{{task.dueDate}}</span>\r\n                        </div>\r\n                        <div class=\"span2\" *ngIf=\"isEditable\">\r\n                            <input datepicker class=\"span2\" name=\"dueDate\" (select)=\"setDueDate($event)\" [(ngModel)]=\"task.dueDate\" />\r\n                        </div>\r\n                        <span>{{task.startDate | dateDuration:task.dueDate}}</span>\r\n                        <error-message [error]=\"errors.dueDate\"></error-message>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"control-label\">\r\n                        {{'tags' | translate}}\r\n                    </div>\r\n                    <div class=\"controls\" [class.has-error]=\"errors.tagIds\">\r\n                        <tags-input class=\"span8\" [editable]=\"isEditable\" [allowClear]=\"true\" [ids]=\"task.tagIds\" (change)=\"setTags($event)\"></tags-input>\r\n                        <error-message [error]=\"errors.tagIds\"></error-message>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <div class=\"control-label\"></div>\r\n                    <div class=\"controls\">\r\n                        <label class=\"input\" [class.disabled]=\"!isEditable\">\r\n                            <input type=\"checkbox\" name=\"customerObservation\" value=\"1\" [disabled]=\"!isEditable\" [(ngModel)]=\"task.customerObservation\" />\r\n                            <span>{{'publish_to_customer' | translate}}</span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"form-group\" [class.has-error]=\"errors.body\">\r\n                    <div class=\"control-label\">\r\n                        {{'body' | translate}}\r\n                    </div>\r\n                    <div class=\"controls\">\r\n                        <markdown-editor writeLabel=\"{{'markdown_write' | translate}}\" previewLabel=\"{{'markdown_preview' | translate}}\" [markdown]=\"task.body || ''\" [editable]=\"isEditable\" [updateTimeout]=\"300\" (update)=\"updateTaskBody($event)\"></markdown-editor>\r\n                        <error-message [error]=\"errors.body\"></error-message>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <attachments [editable]=\"isEditable\" [model]=\"task\" (upload)=\"addAttachment($event)\" (delete)=\"deleteAttachment($event)\"></attachments>\r\n        </div>\r\n        <comments *ngIf=\"showComments\" [comments]=\"comments\" (add)=\"saveComment($event)\" (update)=\"saveComment($event)\" (delete)=\"deleteComment($event)\"></comments>\r\n    </section>\r\n    <footer class=\"content-footer\">\r\n        <div class=\"record-author\" *ngIf=\"task.authorId\">\r\n            <span>{{'author' | translate}}</span>\r\n            <employee-input [ids]=\"[task.authorId]\"></employee-input>\r\n            <span>{{task.regDate}}</span>\r\n        </div>\r\n    </footer>\r\n</form>\r\n<task-cancel-dialog *ngIf=\"showTaskCancelDialog\" (confirm)=\"onConfirmTaskCancelDialog($event)\" (cancel)=\"onCancelTaskCancelDialog()\"></task-cancel-dialog>\r\n"

/***/ },
/* 633 */
/***/ function(module, exports) {

module.exports = "<div class=\"content-header\" *ngIf=\"headerVisible\">\r\n    <h1 class=\"header-title\" *ngIf=\"titleVisible\">\r\n        {{title | translate}}\r\n        <sup *ngIf=\"!loading && meta.count\">({{meta.count}})</sup>\r\n    </h1>\r\n    <div class=\"content-actions\" *ngIf=\"actionsVisible\">\r\n        <button class=\"btn\" type=\"button\" (click)=\"newTask()\">\r\n            {{'new_task' | translate}}\r\n        </button>\r\n        <button class=\"btn btn-refresh\" type=\"button\" (click)=\"refresh()\">\r\n            <i class=\"fa fa-refresh\"></i>\r\n        </button>\r\n        <task-filter (change)=\"changeFilter($event)\"></task-filter>\r\n        <pagination [totalPages]=\"meta.totalPages\" [page]=\"meta.page\" (change)=\"goToPage($event)\"></pagination>\r\n    </div>\r\n</div>\r\n<div class=\"content-body\">\r\n    <div class=\"view task-list\">\r\n        <header class=\"entries-head\" *ngIf=\"captionsVisible\">\r\n            <div class=\"head-wrap\">\r\n                <label class=\"entry-select\" *ngIf=\"selectable\">\r\n                    <input type=\"checkbox\" class=\"all\" />\r\n                </label>\r\n                <div class=\"entry-captions\">\r\n                    <div class=\"task-list__reg-number\">{{'reg_number' | translate}}</div>\r\n                    <div class=\"task-list__title\">\r\n                        <sort-control name=\"title\" [active]=\"activeSort\" (sort)=\"onSort($event)\">\r\n                            {{'task_title' | translate}}\r\n                        </sort-control>\r\n                    </div>\r\n                    <div class=\"vw-icon\"><i class=\"fa fa-paperclip\"></i></div>\r\n                    <div class=\"task-list__status\">\r\n                        <sort-control name=\"status\" [active]=\"activeSort\" (sort)=\"onSort($event)\">\r\n                            {{'status' | translate}}\r\n                        </sort-control>\r\n                    </div>\r\n                    <div class=\"task-list__priority\">\r\n                        <sort-control name=\"priority\" [active]=\"activeSort\" (sort)=\"onSort($event)\">\r\n                            {{'priority' | translate}}\r\n                        </sort-control>\r\n                    </div>\r\n                    <div class=\"task-list__assignee\">{{'assignee_user' | translate}}</div>\r\n                    <div class=\"task-list__start_date\">\r\n                        <sort-control name=\"startDate\" [active]=\"activeSort\" (sort)=\"onSort($event)\">\r\n                            {{'start_date' | translate}}\r\n                        </sort-control>\r\n                    </div>\r\n                    <div class=\"task-list__due_date\">\r\n                        <sort-control name=\"dueDate\" [active]=\"activeSort\" (sort)=\"onSort($event)\">\r\n                            {{'due_date' | translate}}\r\n                        </sort-control>\r\n                    </div>\r\n                    <div class=\"task-list__tags\">{{'tags' | translate}}</div>\r\n                </div>\r\n            </div>\r\n        </header>\r\n        <div class=\"entries\">\r\n            <div class=\"top-entry\" [class.is-last]=\"isLast\" *ngFor=\"let task of tasks; let isLast = last\">\r\n                <div class=\"entry-wrap\">\r\n                    <div class=\"entry\">\r\n                        <label class=\"entry-select\" *ngIf=\"selectable\">\r\n                            <input type=\"checkbox\" name=\"task-id\" value=\"{{task.id}}\" />\r\n                        </label>\r\n                        <a class=\"entry-link\" [routerLink]=\"['/task', task.id]\">\r\n                            <div class=\"entry-fields\">\r\n                                <div class=\"task-list__reg-number\">\r\n                                    <tree-indentation\r\n                                        [expandable]=\"task.hasSubtasks || task.hasRequests\"\r\n                                        [expanded]=\"expandedIds.indexOf(task.id) != -1\"\r\n                                        (toggle)=\"toggleExpanded(task.id)\">\r\n                                        {{task.regNumber}}\r\n                                    </tree-indentation>\r\n                                </div>\r\n                                <div class=\"task-list__title\">\r\n                                    <span>{{task.title}}</span>\r\n                                </div>\r\n                                <div class=\"vw-icon\">\r\n                                    <i class=\"fa fa-paperclip\" *ngIf=\"task.hasAttachments\"></i>\r\n                                </div>\r\n                                <div class=\"task-list__status\">\r\n                                    <span class=\"status-{{task.status | text:'L'}}\">{{task.status | text:'L' | translate}}</span>\r\n                                </div>\r\n                                <div class=\"task-list__priority\">\r\n                                    <span class=\"priority-{{task.priority | text:'L'}}\">{{task.priority | text:'L' | translate}}</span>\r\n                                </div>\r\n                                <div class=\"task-list__assignee\">\r\n                                    <employee-input [ids]=\"[task.assigneeUserId]\"></employee-input>\r\n                                </div>\r\n                                <div class=\"task-list__start_date\">{{task.startDate | dateFmt:'DD.MM.YYYY'}}</div>\r\n                                <div class=\"task-list__due_date\">\r\n                                    <span>{{task.dueDate | dateFmt:'DD.MM.YYYY'}}</span>\r\n                                    <span>{{task.startDate | dateDuration:task.dueDate}}</span>\r\n                                </div>\r\n                                <div class=\"task-list__tags\">\r\n                                    <tags-input [ids]=\"task.tagIds\"></tags-input>\r\n                                </div>\r\n                            </div>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n                <task-tree\r\n                    [rootId]=\"task.id\"\r\n                    [children]=\"task.children\"\r\n                    [selectable]=\"selectable\">\r\n                </task-tree>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 634 */
/***/ function(module, exports) {

module.exports = "<form class=\"form form-userprofile\" autocomplete=\"off\" *ngIf=\"user\">\r\n    <header class=\"content-header\">\r\n        <div class=\"content-actions\">\r\n            <button class=\"btn-back\" type=\"button\" (click)=\"close($event)\">\r\n                <i class=\"fa fa-chevron-left\"></i>\r\n                <span>{{'close' | translate}}</span>\r\n            </button>\r\n            <button class=\"btn btn-primary\" type=\"button\" (click)=\"updateUserProfile()\">\r\n                {{'save_close' | translate}}\r\n            </button>\r\n        </div>\r\n        <h1 class=\"header-title\">\r\n            {{'employee' | translate}} / {{user.name}}\r\n        </h1>\r\n    </header>\r\n    <section class=\"content-body\">\r\n        <tabs>\r\n            <tab class=\"tab-pane\" tabTitle=\"{{'properties' | translate}}\">\r\n                <!--<fieldset class=\"fieldset fieldset-user-avatar\">\r\n                            <img class=\"user-avatar\" src=\"img/avatar.png\"/>\r\n                </fieldset>-->\r\n                <fieldset class=\"fieldset fieldset-user-fields\">\r\n                    <!-- <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'user_name' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"input-placeholder\">\r\n                                {{user.name}}\r\n                            </span>\r\n                        </div>\r\n                    </div> -->\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'login_name' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <input type=\"text\" class=\"span4\" ngControl=\"login\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"!changePassword\">\r\n                        <div class=\"control-label\"></div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"btn btn-xs\" (click)=\"toggleChangePassword()\">{{'change_password' | translate}}</span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"changePassword\">\r\n                        <div class=\"control-label\">\r\n                            {{'password' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.pwd\">\r\n                            <input type=\"password\" name=\"pwd\" class=\"span4\" [class.invalid]=\"errors.pwd\" ngControl=\"pwd\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"changePassword\">\r\n                        <div class=\"control-label\">\r\n                            {{'password_new' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.pwd_new\">\r\n                            <input type=\"password\" name=\"pwd_new\" class=\"span4\" [class.invalid]=\"errors.pwd_new\" ngControl=\"pwd_new\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"changePassword\">\r\n                        <div class=\"control-label\">\r\n                            {{'password_confirm' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.pwd_confirm\">\r\n                            <input type=\"password\" name=\"pwd_confirm\" class=\"span4\" [class.invalid]=\"errors.pwd_confirm\" ngControl=\"pwd_confirm\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'email' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"errors.email\">\r\n                            <input type=\"email\" name=\"email\" class=\"span4\" [class.invalid]=\"errors.email\" ngControl=\"email\" />\r\n                            <div class=\"error-message\">{{errors.email | translate}}</div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"user.organization\">\r\n                        <div class=\"control-label\">\r\n                            {{'org_name' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"input-placeholder\">\r\n                                {{user.organization}}\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"user.department\">\r\n                        <div class=\"control-label\">\r\n                            {{'department' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"input-placeholder\">\r\n                                {{user.department}}\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"user.position\">\r\n                        <div class=\"control-label\">\r\n                            {{'position' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"input-placeholder\">\r\n                                {{user.position}}\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"user.roles\">\r\n                        <div class=\"control-label\">\r\n                            {{'roles' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <ul class=\"input-placeholder list-style-none\">\r\n                                <li *ngFor=\"let role of user.roles\">{{role.localizedName[language]}}</li>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </fieldset>\r\n            </tab>\r\n            <tab class=\"tab-pane\" tabTitle=\"{{'interface' | translate}}\">\r\n                <fieldset class=\"fieldset\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'limit_view' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <select name=\"pagesize\" class=\"span2\" (change)=\"changePageSize($event)\">\r\n                                <option value=\"{{ps}}\" [selected]=\"ps == pageSize\" *ngFor=\"let ps of pageSizes\">{{ps}}</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'interface_lang' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <select name=\"lang\" class=\"span2\" (change)=\"changeLang($event)\">\r\n                                <option value=\"{{langCode}}\" [selected]=\"langCode == language\" *ngFor=\"let langCode of languages | keys\">\r\n                                    {{languages[langCode]}}\r\n                                </option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                    <!-- <div class=\"form-group\">\r\n                        <div class=\"control-label\"></div>\r\n                        <div class=\"controls\">\r\n                            <a href=\"javascript:void(0)\" data-toggle-theme=\"theme1\" class=\"input-placeholder\">\r\n                                {{'change_skin' | translate}}\r\n                            </a>\r\n                        </div>\r\n                    </div> -->\r\n                </fieldset>\r\n            </tab>\r\n        </tabs>\r\n    </section>\r\n</form>\r\n"

/***/ },
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(2);
var ScalarObservable_1 = __webpack_require__(403);
var EmptyObservable_1 = __webpack_require__(113);
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
/* 644 */,
/* 645 */,
/* 646 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1 = __webpack_require__(61);
var isPromise_1 = __webpack_require__(418);
var PromiseObservable_1 = __webpack_require__(402);
var IteratorObservable_1 = __webpack_require__(647);
var ArrayObservable_1 = __webpack_require__(77);
var ArrayLikeObservable_1 = __webpack_require__(643);
var iterator_1 = __webpack_require__(179);
var Observable_1 = __webpack_require__(2);
var observeOn_1 = __webpack_require__(411);
var observable_1 = __webpack_require__(180);
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
/* 647 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__(37);
var Observable_1 = __webpack_require__(2);
var iterator_1 = __webpack_require__(179);
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
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(7);
var EmptyError_1 = __webpack_require__(182);
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
/* 657 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(7);
var EmptyError_1 = __webpack_require__(182);
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
/* 658 */,
/* 659 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(7);
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
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(419);


__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);


/***/ }
]),[686]);
//# sourceMappingURL=app.js.map