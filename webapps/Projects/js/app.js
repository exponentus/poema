webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var platform_browser_dynamic_1 = __webpack_require__(1);
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var common_1 = __webpack_require__(2);
	var ng2_translate_1 = __webpack_require__(350);
	var notification_1 = __webpack_require__(376);
	var markdown_1 = __webpack_require__(380);
	var app_1 = __webpack_require__(393);
	var app_routes_1 = __webpack_require__(488);
	var translate_service_1 = __webpack_require__(463);
	var services_1 = __webpack_require__(460);
	var store_1 = __webpack_require__(638);
	var actions_1 = __webpack_require__(453);
	if (false) {
	    core_1.enableProdMode();
	}
	platform_browser_dynamic_1.bootstrap(app_1.AppComponent, [
	    http_1.HTTP_PROVIDERS,
	    app_routes_1.APP_ROUTER_PROVIDERS,
	    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
	    ng2_translate_1.TranslateService,
	    ng2_translate_1.TRANSLATE_PROVIDERS,
	    core_1.provide(ng2_translate_1.TranslateLoader, {
	        useFactory: function (trs) { return new CustomTranslateLoader(trs); },
	        deps: [translate_service_1.TranslateService]
	    }),
	    notification_1.NotificationService,
	    markdown_1.MarkdownConverter,
	    services_1.APP_SERVICES,
	    store_1.APP_STORE,
	    actions_1.APP_STORE_ACTIONS
	]).catch(function (err) { return console.error(err); });
	var CustomTranslateLoader = (function () {
	    function CustomTranslateLoader(translateService) {
	        this.translateService = translateService;
	    }
	    CustomTranslateLoader.prototype.getTranslation = function (lang) {
	        return this.translateService.fetchTranslations();
	    };
	    return CustomTranslateLoader;
	}());


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
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
/* 74 */,
/* 75 */,
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
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
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
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
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
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
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
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(377));
	__export(__webpack_require__(379));
	__export(__webpack_require__(378));


/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var notification_1 = __webpack_require__(378);
	var NotificationService = (function () {
	    function NotificationService() {
	        this.emitter = new core_1.EventEmitter();
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
	        var noty = new notification_1.Notification(options.type, options.message);
	        this.emitter.emit({ command: 'add', notify: noty });
	        return noty;
	    };
	    NotificationService.prototype.removeAll = function () {
	        this.emitter.emit({ command: 'cleanAll' });
	    };
	    NotificationService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], NotificationService);
	    return NotificationService;
	}());
	exports.NotificationService = NotificationService;


/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var core_1 = __webpack_require__(5);
	var Notification = (function () {
	    function Notification(type, message) {
	        this.emitter = new core_1.EventEmitter();
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
	exports.Notification = Notification;


/***/ },
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var notification_service_1 = __webpack_require__(377);
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
	        core_1.HostBinding('class.nb-notify'), 
	        __metadata('design:type', Object)
	    ], NotificationComponent.prototype, "true", void 0);
	    __decorate([
	        core_1.HostBinding('class.hidden'), 
	        __metadata('design:type', Object)
	    ], NotificationComponent.prototype, "isHidden", null);
	    NotificationComponent = __decorate([
	        core_1.Component({
	            selector: 'notification',
	            template: "\n        <div class=\"nb-notify-entry-{{notify.type}}\"\n            [class.dismiss-click]=\"notify.delay == 'click'\"\n            [style.display]=\"notify.display ? 'block': 'none'\"\n            (click)=\"notify.dismiss()\"\n            *ngFor=\"let notify of notifications\">\n            {{notify.message}}\n        </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [notification_service_1.NotificationService])
	    ], NotificationComponent);
	    return NotificationComponent;
	}());
	exports.NotificationComponent = NotificationComponent;


/***/ },
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var markdown_converter_1 = __webpack_require__(381);
	exports.MarkdownConverter = markdown_converter_1.MarkdownConverter;
	var markdown_editor_1 = __webpack_require__(391);
	exports.MarkdownEditorComponent = markdown_editor_1.MarkdownEditorComponent;
	var marked_pipe_1 = __webpack_require__(392);
	exports.MarkedPipe = marked_pipe_1.MarkedPipe;


/***/ },
/* 381 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var marked = __webpack_require__(382);
	var toMarkdown = __webpack_require__(383);
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
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], MarkdownConverter);
	    return MarkdownConverter;
	}());
	exports.MarkdownConverter = MarkdownConverter;


/***/ },
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var markdown_converter_1 = __webpack_require__(381);
	var MarkdownEditorComponent = (function () {
	    function MarkdownEditorComponent(mdc) {
	        this.mdc = mdc;
	        this.editable = true;
	        this.markdown = '';
	        this.klass = '';
	        this.updateTimeout = 150;
	        this.update = new core_1.EventEmitter();
	        this.focus = new core_1.EventEmitter();
	        this.blur = new core_1.EventEmitter();
	        this.hasValue = false;
	    }
	    MarkdownEditorComponent.prototype.ngOnInit = function () {
	        this.html = this.mdc.toHtml(this.markdown);
	        this.hasValue = this.markdown.length > 0;
	    };
	    MarkdownEditorComponent.prototype.updateValue = function ($el) {
	        var _this = this;
	        this.hasValue = $el.innerHTML.length > 0;
	        clearTimeout(this.to);
	        this.to = setTimeout(function () {
	            _this.update.emit(_this.mdc.toMarkdown($el.innerHTML));
	        }, this.updateTimeout);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], MarkdownEditorComponent.prototype, "editable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MarkdownEditorComponent.prototype, "markdown", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MarkdownEditorComponent.prototype, "klass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], MarkdownEditorComponent.prototype, "placeHolder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], MarkdownEditorComponent.prototype, "updateTimeout", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], MarkdownEditorComponent.prototype, "update", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], MarkdownEditorComponent.prototype, "focus", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], MarkdownEditorComponent.prototype, "blur", void 0);
	    MarkdownEditorComponent = __decorate([
	        core_1.Component({
	            selector: 'markdown-editor',
	            template: "\n        <div class=\"rt-editor\">\n            <div class=\"rt-editor__area {{klass}}\"\n                [class.edit]=\"editable\"\n                [contentEditable]=\"editable\"\n                (keyup)=\"updateValue($event.target)\"\n                (focus)=\"focus.emit($event)\"\n                (blur)=\"blur.emit($event)\"\n                innerHTML=\"{{html}}\">\n            </div>\n            <span class=\"rt-editor__placeholder\" *ngIf=\"placeHolder && !hasValue\">{{placeHolder}}</span>\n        </div>\n    ",
	            providers: [markdown_converter_1.MarkdownConverter]
	        }), 
	        __metadata('design:paramtypes', [markdown_converter_1.MarkdownConverter])
	    ], MarkdownEditorComponent);
	    return MarkdownEditorComponent;
	}());
	exports.MarkdownEditorComponent = MarkdownEditorComponent;


/***/ },
/* 392 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var markdown_converter_1 = __webpack_require__(381);
	var MarkedPipe = (function () {
	    function MarkedPipe(mdc) {
	        this.mdc = mdc;
	    }
	    MarkedPipe.prototype.transform = function (text) {
	        return this.mdc.toHtml(text);
	    };
	    MarkedPipe = __decorate([
	        core_1.Pipe({ name: 'marked' }), 
	        __metadata('design:paramtypes', [markdown_converter_1.MarkdownConverter])
	    ], MarkedPipe);
	    return MarkedPipe;
	}());
	exports.MarkedPipe = MarkedPipe;


/***/ },
/* 393 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var actions_1 = __webpack_require__(453);
	var services_1 = __webpack_require__(460);
	var notification_1 = __webpack_require__(376);
	var dropdown_1 = __webpack_require__(480);
	var navbar_1 = __webpack_require__(483);
	var nav_1 = __webpack_require__(485);
	var models_1 = __webpack_require__(465);
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
	        this.loggedUser = new models_1.User();
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
	        this.appService.fetchUserProfile().subscribe(function (data) {
	            _this.store.dispatch(_this.appActions.fetchUserProfileFulfilled(data));
	            _this.isReady = true;
	        });
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
	        this.staffService.fetchUsers().subscribe(function (payload) {
	            _this.store.dispatch(_this.staffActions.fetchUsers(payload.users));
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
	        this.store.dispatch({ type: actions_1.EnvironmentActions.HIDE_NAV });
	        event.preventDefault();
	    };
	    AppComponent.prototype.isMobile = function () {
	        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	    };
	    AppComponent.prototype.onResize = function (window) {
	        this.isMobileDevice = window.innerWidth <= 1024 || this.isMobile();
	    };
	    __decorate([
	        core_1.HostListener('window:resize', ['$event.target']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Object]), 
	        __metadata('design:returntype', void 0)
	    ], AppComponent.prototype, "resize", null);
	    __decorate([
	        core_1.HostBinding('class.phone'), 
	        __metadata('design:type', Object)
	    ], AppComponent.prototype, "device", null);
	    __decorate([
	        core_1.HostBinding('class.side-nav-toggle'), 
	        __metadata('design:type', Object)
	    ], AppComponent.prototype, "toggleNavVisible", null);
	    __decorate([
	        core_1.HostBinding('class.search-open'), 
	        __metadata('design:type', Object)
	    ], AppComponent.prototype, "toggleSearch", null);
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'app',
	            template: __webpack_require__(487),
	            directives: [router_1.ROUTER_DIRECTIVES, dropdown_1.DROPDOWN_DIRECTIVES, notification_1.NotificationComponent, navbar_1.NavbarComponent, nav_1.NavComponent],
	            providers: [notification_1.NotificationService],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, actions_1.AppActions, actions_1.ReferenceActions, actions_1.StaffActions, services_1.AppService, services_1.ReferenceService, services_1.StaffService, ng2_translate_1.TranslateService])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;


/***/ },
/* 394 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_link_1 = __webpack_require__(395);
	var router_link_active_1 = __webpack_require__(433);
	var router_outlet_1 = __webpack_require__(434);
	var router_1 = __webpack_require__(396);
	exports.NavigationCancel = router_1.NavigationCancel;
	exports.NavigationEnd = router_1.NavigationEnd;
	exports.NavigationError = router_1.NavigationError;
	exports.NavigationStart = router_1.NavigationStart;
	exports.Router = router_1.Router;
	exports.RoutesRecognized = router_1.RoutesRecognized;
	var router_outlet_map_1 = __webpack_require__(432);
	exports.RouterOutletMap = router_outlet_map_1.RouterOutletMap;
	var router_providers_1 = __webpack_require__(435);
	exports.provideRouter = router_providers_1.provideRouter;
	var router_state_1 = __webpack_require__(423);
	exports.ActivatedRoute = router_state_1.ActivatedRoute;
	exports.ActivatedRouteSnapshot = router_state_1.ActivatedRouteSnapshot;
	exports.RouterState = router_state_1.RouterState;
	exports.RouterStateSnapshot = router_state_1.RouterStateSnapshot;
	var shared_1 = __webpack_require__(416);
	exports.PRIMARY_OUTLET = shared_1.PRIMARY_OUTLET;
	var url_serializer_1 = __webpack_require__(418);
	exports.DefaultUrlSerializer = url_serializer_1.DefaultUrlSerializer;
	exports.UrlSerializer = url_serializer_1.UrlSerializer;
	var url_tree_1 = __webpack_require__(417);
	exports.UrlPathWithParams = url_tree_1.UrlPathWithParams;
	exports.UrlTree = url_tree_1.UrlTree;
	exports.ROUTER_DIRECTIVES = [router_outlet_1.RouterOutlet, router_link_1.RouterLink, router_link_active_1.RouterLinkActive];
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDRCQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3BELG1DQUErQixpQ0FBaUMsQ0FBQyxDQUFBO0FBQ2pFLDhCQUEyQiw0QkFBNEIsQ0FBQyxDQUFBO0FBS3hELHVCQUFpSCxVQUFVLENBQUM7QUFBN0cscURBQWdCO0FBQUUsK0NBQWE7QUFBRSxtREFBZTtBQUFFLG1EQUFlO0FBQUUsaUNBQU07QUFBRSxxREFBa0M7QUFDNUgsa0NBQThCLHFCQUFxQixDQUFDO0FBQTVDLDhEQUE0QztBQUNwRCxpQ0FBNEIsb0JBQW9CLENBQUM7QUFBekMseURBQXlDO0FBQ2pELDZCQUF1RixnQkFBZ0IsQ0FBQztBQUFoRyx1REFBYztBQUFFLHVFQUFzQjtBQUFFLGlEQUFXO0FBQUUsaUVBQTJDO0FBQ3hHLHVCQUFxQyxVQUFVLENBQUM7QUFBeEMsaURBQXdDO0FBQ2hELCtCQUFrRCxrQkFBa0IsQ0FBQztBQUE3RCxxRUFBb0I7QUFBRSx1REFBdUM7QUFDckUseUJBQXlDLFlBQVksQ0FBQztBQUE5Qyx5REFBaUI7QUFBRSxxQ0FBMkI7QUFFekMseUJBQWlCLEdBQUcsQ0FBQyw0QkFBWSxFQUFFLHdCQUFVLEVBQUUscUNBQWdCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Um91dGVyTGlua30gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9saW5rJztcbmltcG9ydCB7Um91dGVyTGlua0FjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9saW5rX2FjdGl2ZSc7XG5pbXBvcnQge1JvdXRlck91dGxldH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuXG5leHBvcnQge0V4dHJhT3B0aW9uc30gZnJvbSAnLi9jb21tb25fcm91dGVyX3Byb3ZpZGVycyc7XG5leHBvcnQge1JvdXRlLCBSb3V0ZXJDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmV4cG9ydCB7Q2FuQWN0aXZhdGUsIENhbkRlYWN0aXZhdGV9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5leHBvcnQge0V2ZW50LCBOYXZpZ2F0aW9uQ2FuY2VsLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IsIE5hdmlnYXRpb25TdGFydCwgUm91dGVyLCBSb3V0ZXNSZWNvZ25pemVkfSBmcm9tICcuL3JvdXRlcic7XG5leHBvcnQge1JvdXRlck91dGxldE1hcH0gZnJvbSAnLi9yb3V0ZXJfb3V0bGV0X21hcCc7XG5leHBvcnQge3Byb3ZpZGVSb3V0ZXJ9IGZyb20gJy4vcm91dGVyX3Byb3ZpZGVycyc7XG5leHBvcnQge0FjdGl2YXRlZFJvdXRlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBSb3V0ZXJTdGF0ZSwgUm91dGVyU3RhdGVTbmFwc2hvdH0gZnJvbSAnLi9yb3V0ZXJfc3RhdGUnO1xuZXhwb3J0IHtQUklNQVJZX09VVExFVCwgUGFyYW1zfSBmcm9tICcuL3NoYXJlZCc7XG5leHBvcnQge0RlZmF1bHRVcmxTZXJpYWxpemVyLCBVcmxTZXJpYWxpemVyfSBmcm9tICcuL3VybF9zZXJpYWxpemVyJztcbmV4cG9ydCB7VXJsUGF0aFdpdGhQYXJhbXMsIFVybFRyZWV9IGZyb20gJy4vdXJsX3RyZWUnO1xuXG5leHBvcnQgY29uc3QgUk9VVEVSX0RJUkVDVElWRVMgPSBbUm91dGVyT3V0bGV0LCBSb3V0ZXJMaW5rLCBSb3V0ZXJMaW5rQWN0aXZlXTsiXX0=

/***/ },
/* 395 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var common_1 = __webpack_require__(2);
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(396);
	var router_state_1 = __webpack_require__(423);
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
	    RouterLink.prototype.ngOnChanges = function (changes) { this.updateTargetUrlAndHref(); };
	    RouterLink.prototype.onClick = function (button, ctrlKey, metaKey) {
	        if (button !== 0 || ctrlKey || metaKey) {
	            return true;
	        }
	        if (typeof this.target === 'string' && this.target != '_self') {
	            return true;
	        }
	        this.router.navigateByUrl(this.urlTree);
	        return false;
	    };
	    RouterLink.prototype.updateTargetUrlAndHref = function () {
	        this.urlTree = this.router.createUrlTree(this.commands, { relativeTo: this.route, queryParams: this.queryParams, fragment: this.fragment });
	        if (this.urlTree) {
	            this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], RouterLink.prototype, "target", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], RouterLink.prototype, "queryParams", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], RouterLink.prototype, "fragment", void 0);
	    __decorate([
	        core_1.HostBinding(), 
	        __metadata('design:type', String)
	    ], RouterLink.prototype, "href", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], RouterLink.prototype, "routerLink", null);
	    __decorate([
	        core_1.HostListener('click', ['$event.button', '$event.ctrlKey', '$event.metaKey']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [Number, Boolean, Boolean]), 
	        __metadata('design:returntype', Boolean)
	    ], RouterLink.prototype, "onClick", null);
	    RouterLink = __decorate([
	        core_1.Directive({ selector: '[routerLink]' }), 
	        __metadata('design:paramtypes', [router_1.Router, router_state_1.ActivatedRoute, common_1.LocationStrategy])
	    ], RouterLink);
	    return RouterLink;
	}());
	exports.RouterLink = RouterLink;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGlyZWN0aXZlcy9yb3V0ZXJfbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUJBQStCLGlCQUFpQixDQUFDLENBQUE7QUFDakQscUJBQXFFLGVBQWUsQ0FBQyxDQUFBO0FBRXJGLHVCQUFxQixXQUFXLENBQUMsQ0FBQTtBQUNqQyw2QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQStCL0M7SUFjRSxvQkFDWSxNQUFjLEVBQVUsS0FBcUIsRUFDN0MsZ0JBQWtDO1FBRGxDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUM3QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBZHRDLGFBQVEsR0FBVSxFQUFFLENBQUM7SUFjb0IsQ0FBQztJQUdsRCxzQkFBSSxrQ0FBVTthQUFkLFVBQWUsSUFBa0I7WUFDL0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQVEsSUFBSSxDQUFDO1lBQzVCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsQ0FBQztRQUNILENBQUM7OztPQUFBO0lBRUQsZ0NBQVcsR0FBWCxVQUFZLE9BQVcsSUFBUyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFHaEUsNEJBQU8sR0FBUCxVQUFRLE1BQWMsRUFBRSxPQUFnQixFQUFFLE9BQWdCO1FBQ3hELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVPLDJDQUFzQixHQUE5QjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQ3BDLElBQUksQ0FBQyxRQUFRLEVBQ2IsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7UUFDdEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDL0YsQ0FBQztJQUNILENBQUM7SUFqREQ7UUFBQyxZQUFLLEVBQUU7OzhDQUFBO0lBRVI7UUFBQyxZQUFLLEVBQUU7O21EQUFBO0lBQ1I7UUFBQyxZQUFLLEVBQUU7O2dEQUFBO0lBR1I7UUFBQyxrQkFBVyxFQUFFOzs0Q0FBQTtJQVdkO1FBQUMsWUFBSyxFQUFFOzs7Z0RBQUE7SUFXUjtRQUFDLG1CQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQUM7Ozs7NkNBQUE7SUE5Qi9FO1FBQUMsZ0JBQVMsQ0FBQyxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUMsQ0FBQzs7a0JBQUE7SUFvRHRDLGlCQUFDO0FBQUQsQ0FBQyxBQW5ERCxJQW1EQztBQW5EWSxrQkFBVSxhQW1EdEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RGlyZWN0aXZlLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gJy4uL3JvdXRlcic7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICcuLi9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtVcmxUcmVlfSBmcm9tICcuLi91cmxfdHJlZSc7XG5cblxuXG4vKipcbiAqIFRoZSBSb3V0ZXJMaW5rIGRpcmVjdGl2ZSBsZXRzIHlvdSBsaW5rIHRvIHNwZWNpZmljIHBhcnRzIG9mIHlvdXIgYXBwLlxuICpcbiAqIENvbnNpZGVyIHRoZSBmb2xsb3dpbmcgcm91dGUgY29uZmlndXJhdGlvbjpcblxuICogYGBgXG4gKiBbeyBwYXRoOiAnL3VzZXInLCBjb21wb25lbnQ6IFVzZXJDbXAgfV1cbiAqIGBgYFxuICpcbiAqIFdoZW4gbGlua2luZyB0byB0aGlzIGBVc2VyYCByb3V0ZSwgeW91IGNhbiB3cml0ZTpcbiAqXG4gKiBgYGBcbiAqIDxhIFtyb3V0ZXJMaW5rXT1cIlsnL3VzZXInXVwiPmxpbmsgdG8gdXNlciBjb21wb25lbnQ8L2E+XG4gKiBgYGBcbiAqXG4gKiBSb3V0ZXJMaW5rIGV4cGVjdHMgdGhlIHZhbHVlIHRvIGJlIGFuIGFycmF5IG9mIHBhdGggc2VnbWVudHMsIGZvbGxvd2VkIGJ5IHRoZSBwYXJhbXNcbiAqIGZvciB0aGF0IGxldmVsIG9mIHJvdXRpbmcuIEZvciBpbnN0YW5jZSBgWycvdGVhbScsIHt0ZWFtSWQ6IDF9LCAndXNlcicsIHt1c2VySWQ6IDJ9XWBcbiAqIG1lYW5zIHRoYXQgd2Ugd2FudCB0byBnZW5lcmF0ZSBhIGxpbmsgdG8gYC90ZWFtO3RlYW1JZD0xL3VzZXI7dXNlcklkPTJgLlxuICpcbiAqIFRoZSBmaXJzdCBzZWdtZW50IG5hbWUgY2FuIGJlIHByZXBlbmRlZCB3aXRoIGAvYCwgYC4vYCwgb3IgYC4uL2AuXG4gKiBJZiB0aGUgc2VnbWVudCBiZWdpbnMgd2l0aCBgL2AsIHRoZSByb3V0ZXIgd2lsbCBsb29rIHVwIHRoZSByb3V0ZSBmcm9tIHRoZSByb290IG9mIHRoZSBhcHAuXG4gKiBJZiB0aGUgc2VnbWVudCBiZWdpbnMgd2l0aCBgLi9gLCBvciBkb2Vzbid0IGJlZ2luIHdpdGggYSBzbGFzaCwgdGhlIHJvdXRlciB3aWxsXG4gKiBpbnN0ZWFkIGxvb2sgaW4gdGhlIGN1cnJlbnQgY29tcG9uZW50J3MgY2hpbGRyZW4gZm9yIHRoZSByb3V0ZS5cbiAqIEFuZCBpZiB0aGUgc2VnbWVudCBiZWdpbnMgd2l0aCBgLi4vYCwgdGhlIHJvdXRlciB3aWxsIGdvIHVwIG9uZSBsZXZlbC5cbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbcm91dGVyTGlua10nfSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJMaW5rIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgdGFyZ2V0OiBzdHJpbmc7XG4gIHByaXZhdGUgY29tbWFuZHM6IGFueVtdID0gW107XG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zOiB7W2s6IHN0cmluZ106IGFueX07XG4gIEBJbnB1dCgpIGZyYWdtZW50OiBzdHJpbmc7XG5cbiAgLy8gdGhlIHVybCBkaXNwbGF5ZWQgb24gdGhlIGFuY2hvciBlbGVtZW50LlxuICBASG9zdEJpbmRpbmcoKSBocmVmOiBzdHJpbmc7XG5cbiAgdXJsVHJlZTogVXJsVHJlZTtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgcHJpdmF0ZSBsb2NhdGlvblN0cmF0ZWd5OiBMb2NhdGlvblN0cmF0ZWd5KSB7fVxuXG4gIEBJbnB1dCgpXG4gIHNldCByb3V0ZXJMaW5rKGRhdGE6IGFueVtdfHN0cmluZykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gPGFueT5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gW2RhdGFdO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHt9KTogYW55IHsgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50LmJ1dHRvbicsICckZXZlbnQuY3RybEtleScsICckZXZlbnQubWV0YUtleSddKVxuICBvbkNsaWNrKGJ1dHRvbjogbnVtYmVyLCBjdHJsS2V5OiBib29sZWFuLCBtZXRhS2V5OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgaWYgKGJ1dHRvbiAhPT0gMCB8fCBjdHJsS2V5IHx8IG1ldGFLZXkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQgPT09ICdzdHJpbmcnICYmIHRoaXMudGFyZ2V0ICE9ICdfc2VsZicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlQnlVcmwodGhpcy51cmxUcmVlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTogdm9pZCB7XG4gICAgdGhpcy51cmxUcmVlID0gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZShcbiAgICAgICAgdGhpcy5jb21tYW5kcyxcbiAgICAgICAge3JlbGF0aXZlVG86IHRoaXMucm91dGUsIHF1ZXJ5UGFyYW1zOiB0aGlzLnF1ZXJ5UGFyYW1zLCBmcmFnbWVudDogdGhpcy5mcmFnbWVudH0pO1xuICAgIGlmICh0aGlzLnVybFRyZWUpIHtcbiAgICAgIHRoaXMuaHJlZiA9IHRoaXMubG9jYXRpb25TdHJhdGVneS5wcmVwYXJlRXh0ZXJuYWxVcmwodGhpcy5yb3V0ZXIuc2VyaWFsaXplVXJsKHRoaXMudXJsVHJlZSkpO1xuICAgIH1cbiAgfVxufVxuIl19

/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(363);
	__webpack_require__(397);
	__webpack_require__(399);
	__webpack_require__(401);
	__webpack_require__(403);
	__webpack_require__(405);
	__webpack_require__(407);
	__webpack_require__(408);
	var core_1 = __webpack_require__(5);
	var Observable_1 = __webpack_require__(38);
	var Subject_1 = __webpack_require__(37);
	var of_1 = __webpack_require__(354);
	var apply_redirects_1 = __webpack_require__(415);
	var config_1 = __webpack_require__(420);
	var create_router_state_1 = __webpack_require__(421);
	var create_url_tree_1 = __webpack_require__(425);
	var recognize_1 = __webpack_require__(426);
	var resolve_1 = __webpack_require__(427);
	var router_outlet_map_1 = __webpack_require__(432);
	var router_state_1 = __webpack_require__(423);
	var shared_1 = __webpack_require__(416);
	var url_tree_1 = __webpack_require__(417);
	var collection_1 = __webpack_require__(419);
	var NavigationStart = (function () {
	    function NavigationStart(id, url) {
	        this.id = id;
	        this.url = url;
	    }
	    NavigationStart.prototype.toString = function () { return "NavigationStart(id: " + this.id + ", url: '" + this.url + "')"; };
	    return NavigationStart;
	}());
	exports.NavigationStart = NavigationStart;
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
	exports.NavigationEnd = NavigationEnd;
	var NavigationCancel = (function () {
	    function NavigationCancel(id, url) {
	        this.id = id;
	        this.url = url;
	    }
	    NavigationCancel.prototype.toString = function () { return "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')"; };
	    return NavigationCancel;
	}());
	exports.NavigationCancel = NavigationCancel;
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
	exports.NavigationError = NavigationError;
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
	exports.RoutesRecognized = RoutesRecognized;
	var Router = (function () {
	    function Router(rootComponentType, resolver, urlSerializer, outletMap, location, injector, config) {
	        this.rootComponentType = rootComponentType;
	        this.resolver = resolver;
	        this.urlSerializer = urlSerializer;
	        this.outletMap = outletMap;
	        this.location = location;
	        this.injector = injector;
	        this.navigationId = 0;
	        this.resetConfig(config);
	        this.routerEvents = new Subject_1.Subject();
	        this.currentUrlTree = url_tree_1.createEmptyUrlTree();
	        this.currentRouterState = router_state_1.createEmptyState(this.currentUrlTree, this.rootComponentType);
	    }
	    Router.prototype.initialNavigation = function () {
	        this.setUpLocationChangeListener();
	        this.navigateByUrl(this.location.path());
	    };
	    Object.defineProperty(Router.prototype, "routerState", {
	        get: function () { return this.currentRouterState; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Router.prototype, "url", {
	        get: function () { return this.serializeUrl(this.currentUrlTree); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Router.prototype, "events", {
	        get: function () { return this.routerEvents; },
	        enumerable: true,
	        configurable: true
	    });
	    Router.prototype.resetConfig = function (config) {
	        config_1.validateConfig(config);
	        this.config = config;
	    };
	    Router.prototype.dispose = function () { this.locationSubscription.unsubscribe(); };
	    Router.prototype.createUrlTree = function (commands, _a) {
	        var _b = _a === void 0 ? {} : _a, relativeTo = _b.relativeTo, queryParams = _b.queryParams, fragment = _b.fragment;
	        var a = relativeTo ? relativeTo : this.routerState.root;
	        return create_url_tree_1.createUrlTree(a, this.currentUrlTree, commands, queryParams, fragment);
	    };
	    Router.prototype.navigateByUrl = function (url) {
	        if (url instanceof url_tree_1.UrlTree) {
	            return this.scheduleNavigation(url, false);
	        }
	        else {
	            var urlTree = this.urlSerializer.parse(url);
	            return this.scheduleNavigation(urlTree, false);
	        }
	    };
	    Router.prototype.navigate = function (commands, extras) {
	        if (extras === void 0) { extras = {}; }
	        return this.scheduleNavigation(this.createUrlTree(commands, extras), false);
	    };
	    Router.prototype.serializeUrl = function (url) { return this.urlSerializer.serialize(url); };
	    Router.prototype.parseUrl = function (url) { return this.urlSerializer.parse(url); };
	    Router.prototype.scheduleNavigation = function (url, preventPushState) {
	        var _this = this;
	        var id = ++this.navigationId;
	        this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
	        return Promise.resolve().then(function (_) { return _this.runNavigate(url, preventPushState, id); });
	    };
	    Router.prototype.setUpLocationChangeListener = function () {
	        var _this = this;
	        this.locationSubscription = this.location.subscribe(function (change) {
	            return _this.scheduleNavigation(_this.urlSerializer.parse(change['url']), change['pop']);
	        });
	    };
	    Router.prototype.runNavigate = function (url, preventPushState, id) {
	        var _this = this;
	        if (id !== this.navigationId) {
	            this.location.go(this.urlSerializer.serialize(this.currentUrlTree));
	            this.routerEvents.next(new NavigationCancel(id, this.serializeUrl(url)));
	            return Promise.resolve(false);
	        }
	        return new Promise(function (resolvePromise, rejectPromise) {
	            var updatedUrl;
	            var state;
	            apply_redirects_1.applyRedirects(url, _this.config)
	                .mergeMap(function (u) {
	                updatedUrl = u;
	                return recognize_1.recognize(_this.rootComponentType, _this.config, updatedUrl, _this.serializeUrl(updatedUrl));
	            })
	                .mergeMap(function (newRouterStateSnapshot) {
	                _this.routerEvents.next(new RoutesRecognized(id, _this.serializeUrl(url), _this.serializeUrl(updatedUrl), newRouterStateSnapshot));
	                return resolve_1.resolve(_this.resolver, newRouterStateSnapshot);
	            })
	                .map(function (routerStateSnapshot) {
	                return create_router_state_1.createRouterState(routerStateSnapshot, _this.currentRouterState);
	            })
	                .map(function (newState) {
	                state = newState;
	            })
	                .mergeMap(function (_) {
	                return new GuardChecks(state.snapshot, _this.currentRouterState.snapshot, _this.injector)
	                    .check(_this.outletMap);
	            })
	                .forEach(function (shouldActivate) {
	                if (!shouldActivate || id !== _this.navigationId) {
	                    _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url)));
	                    return Promise.resolve(false);
	                }
	                new ActivateRoutes(state, _this.currentRouterState).activate(_this.outletMap);
	                _this.currentUrlTree = updatedUrl;
	                _this.currentRouterState = state;
	                if (!preventPushState) {
	                    var path = _this.urlSerializer.serialize(updatedUrl);
	                    if (_this.location.isCurrentPathEqualTo(path)) {
	                        _this.location.replaceState(path);
	                    }
	                    else {
	                        _this.location.go(path);
	                    }
	                }
	                return Promise.resolve(true);
	            })
	                .then(function () {
	                _this.routerEvents.next(new NavigationEnd(id, _this.serializeUrl(url), _this.serializeUrl(updatedUrl)));
	                resolvePromise(true);
	            }, function (e) {
	                _this.routerEvents.next(new NavigationError(id, _this.serializeUrl(url), e));
	                rejectPromise(e);
	            });
	        });
	    };
	    return Router;
	}());
	exports.Router = Router;
	var CanActivate = (function () {
	    function CanActivate(route) {
	        this.route = route;
	    }
	    return CanActivate;
	}());
	var CanDeactivate = (function () {
	    function CanDeactivate(component, route) {
	        this.component = component;
	        this.route = route;
	    }
	    return CanDeactivate;
	}());
	var GuardChecks = (function () {
	    function GuardChecks(future, curr, injector) {
	        this.future = future;
	        this.curr = curr;
	        this.injector = injector;
	        this.checks = [];
	    }
	    GuardChecks.prototype.check = function (parentOutletMap) {
	        var _this = this;
	        var futureRoot = this.future._root;
	        var currRoot = this.curr ? this.curr._root : null;
	        this.traverseChildRoutes(futureRoot, currRoot, parentOutletMap);
	        if (this.checks.length === 0)
	            return of_1.of(true);
	        return Observable_1.Observable.from(this.checks)
	            .map(function (s) {
	            if (s instanceof CanActivate) {
	                return _this.runCanActivate(s.route);
	            }
	            else if (s instanceof CanDeactivate) {
	                return _this.runCanDeactivate(s.component, s.route);
	            }
	            else {
	                throw new Error('Cannot be reached');
	            }
	        })
	            .mergeAll()
	            .every(function (result) { return result === true; });
	    };
	    GuardChecks.prototype.traverseChildRoutes = function (futureNode, currNode, outletMap) {
	        var _this = this;
	        var prevChildren = nodeChildrenAsMap(currNode);
	        futureNode.children.forEach(function (c) {
	            _this.traverseRoutes(c, prevChildren[c.value.outlet], outletMap);
	            delete prevChildren[c.value.outlet];
	        });
	        collection_1.forEach(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(v, outletMap._outlets[k]); });
	    };
	    GuardChecks.prototype.traverseRoutes = function (futureNode, currNode, parentOutletMap) {
	        var future = futureNode.value;
	        var curr = currNode ? currNode.value : null;
	        var outlet = parentOutletMap ? parentOutletMap._outlets[futureNode.value.outlet] : null;
	        if (curr && future._routeConfig === curr._routeConfig) {
	            if (!collection_1.shallowEqual(future.params, curr.params)) {
	                this.checks.push(new CanDeactivate(outlet.component, curr), new CanActivate(future));
	            }
	            this.traverseChildRoutes(futureNode, currNode, outlet ? outlet.outletMap : null);
	        }
	        else {
	            this.deactivateOutletAndItChildren(curr, outlet);
	            this.checks.push(new CanActivate(future));
	            this.traverseChildRoutes(futureNode, null, outlet ? outlet.outletMap : null);
	        }
	    };
	    GuardChecks.prototype.deactivateOutletAndItChildren = function (route, outlet) {
	        var _this = this;
	        if (outlet && outlet.isActivated) {
	            collection_1.forEach(outlet.outletMap._outlets, function (v) {
	                if (v.isActivated) {
	                    _this.deactivateOutletAndItChildren(v.activatedRoute.snapshot, v);
	                }
	            });
	            this.checks.push(new CanDeactivate(outlet.component, route));
	        }
	    };
	    GuardChecks.prototype.runCanActivate = function (future) {
	        var _this = this;
	        var canActivate = future._routeConfig ? future._routeConfig.canActivate : null;
	        if (!canActivate || canActivate.length === 0)
	            return of_1.of(true);
	        return Observable_1.Observable.from(canActivate)
	            .map(function (c) {
	            var guard = _this.injector.get(c);
	            if (guard.canActivate) {
	                return wrapIntoObservable(guard.canActivate(future, _this.future));
	            }
	            else {
	                return wrapIntoObservable(guard(future, _this.future));
	            }
	        })
	            .mergeAll()
	            .every(function (result) { return result === true; });
	    };
	    GuardChecks.prototype.runCanDeactivate = function (component, curr) {
	        var _this = this;
	        var canDeactivate = curr._routeConfig ? curr._routeConfig.canDeactivate : null;
	        if (!canDeactivate || canDeactivate.length === 0)
	            return of_1.of(true);
	        return Observable_1.Observable.from(canDeactivate)
	            .map(function (c) {
	            var guard = _this.injector.get(c);
	            if (guard.canDeactivate) {
	                return wrapIntoObservable(guard.canDeactivate(component, curr, _this.curr));
	            }
	            else {
	                return wrapIntoObservable(guard(component, curr, _this.curr));
	            }
	        })
	            .mergeAll()
	            .every(function (result) { return result === true; });
	    };
	    return GuardChecks;
	}());
	function wrapIntoObservable(value) {
	    if (value instanceof Observable_1.Observable) {
	        return value;
	    }
	    else {
	        return of_1.of(value);
	    }
	}
	var ActivateRoutes = (function () {
	    function ActivateRoutes(futureState, currState) {
	        this.futureState = futureState;
	        this.currState = currState;
	    }
	    ActivateRoutes.prototype.activate = function (parentOutletMap) {
	        var futureRoot = this.futureState._root;
	        var currRoot = this.currState ? this.currState._root : null;
	        pushQueryParamsAndFragment(this.futureState);
	        this.activateChildRoutes(futureRoot, currRoot, parentOutletMap);
	    };
	    ActivateRoutes.prototype.activateChildRoutes = function (futureNode, currNode, outletMap) {
	        var _this = this;
	        var prevChildren = nodeChildrenAsMap(currNode);
	        futureNode.children.forEach(function (c) {
	            _this.activateRoutes(c, prevChildren[c.value.outlet], outletMap);
	            delete prevChildren[c.value.outlet];
	        });
	        collection_1.forEach(prevChildren, function (v, k) { return _this.deactivateOutletAndItChildren(outletMap._outlets[k]); });
	    };
	    ActivateRoutes.prototype.activateRoutes = function (futureNode, currNode, parentOutletMap) {
	        var future = futureNode.value;
	        var curr = currNode ? currNode.value : null;
	        var outlet = getOutlet(parentOutletMap, futureNode.value);
	        if (future === curr) {
	            router_state_1.advanceActivatedRoute(future);
	            this.activateChildRoutes(futureNode, currNode, outlet.outletMap);
	        }
	        else {
	            this.deactivateOutletAndItChildren(outlet);
	            var outletMap = new router_outlet_map_1.RouterOutletMap();
	            this.activateNewRoutes(outletMap, future, outlet);
	            this.activateChildRoutes(futureNode, null, outletMap);
	        }
	    };
	    ActivateRoutes.prototype.activateNewRoutes = function (outletMap, future, outlet) {
	        var resolved = core_1.ReflectiveInjector.resolve([
	            { provide: router_state_1.ActivatedRoute, useValue: future },
	            { provide: router_outlet_map_1.RouterOutletMap, useValue: outletMap }
	        ]);
	        router_state_1.advanceActivatedRoute(future);
	        outlet.activate(future._futureSnapshot._resolvedComponentFactory, future, resolved, outletMap);
	    };
	    ActivateRoutes.prototype.deactivateOutletAndItChildren = function (outlet) {
	        var _this = this;
	        if (outlet && outlet.isActivated) {
	            collection_1.forEach(outlet.outletMap._outlets, function (v) { return _this.deactivateOutletAndItChildren(v); });
	            outlet.deactivate();
	        }
	    };
	    return ActivateRoutes;
	}());
	function pushQueryParamsAndFragment(state) {
	    if (!collection_1.shallowEqual(state.snapshot.queryParams, state.queryParams.value)) {
	        state.queryParams.next(state.snapshot.queryParams);
	    }
	    if (state.snapshot.fragment !== state.fragment.value) {
	        state.fragment.next(state.snapshot.fragment);
	    }
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
	        if (route.outlet === shared_1.PRIMARY_OUTLET) {
	            throw new Error("Cannot find primary outlet to load '" + componentName + "'");
	        }
	        else {
	            throw new Error("Cannot find the outlet " + route.outlet + " to load '" + componentName + "'");
	        }
	    }
	    return outlet;
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyx1QkFBdUIsQ0FBQyxDQUFBO0FBQy9CLFFBQU8sd0JBQXdCLENBQUMsQ0FBQTtBQUNoQyxRQUFPLDRCQUE0QixDQUFDLENBQUE7QUFDcEMsUUFBTywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xDLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQUNyQyxRQUFPLHlCQUF5QixDQUFDLENBQUE7QUFDakMsUUFBTyw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3BDLFFBQU8sMEJBQTBCLENBQUMsQ0FBQTtBQUdsQyxxQkFBb0UsZUFBZSxDQUFDLENBQUE7QUFDcEYsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFDM0Msd0JBQXNCLGNBQWMsQ0FBQyxDQUFBO0FBRXJDLG1CQUFrQixvQkFBb0IsQ0FBQyxDQUFBO0FBRXZDLGdDQUE2QixtQkFBbUIsQ0FBQyxDQUFBO0FBQ2pELHVCQUEyQyxVQUFVLENBQUMsQ0FBQTtBQUN0RCxvQ0FBZ0MsdUJBQXVCLENBQUMsQ0FBQTtBQUN4RCxnQ0FBNEIsbUJBQW1CLENBQUMsQ0FBQTtBQUVoRCwwQkFBd0IsYUFBYSxDQUFDLENBQUE7QUFDdEMsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLGtDQUE4QixxQkFBcUIsQ0FBQyxDQUFBO0FBQ3BELDZCQUFnSSxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2pKLHVCQUFxQyxVQUFVLENBQUMsQ0FBQTtBQUVoRCx5QkFBMEMsWUFBWSxDQUFDLENBQUE7QUFDdkQsMkJBQW9DLG9CQUFvQixDQUFDLENBQUE7QUFZekQ7SUFDRSx5QkFBbUIsRUFBVSxFQUFTLEdBQVc7UUFBOUIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFTLFFBQUcsR0FBSCxHQUFHLENBQVE7SUFBRyxDQUFDO0lBRXJELGtDQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLHlCQUF1QixJQUFJ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LGFBQWEsR0FBUyxLQUFLLENBQUMsU0FBVSxDQUFDLElBQUksQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLHVCQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXVDLGFBQWEsTUFBRyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBMEIsS0FBSyxDQUFDLE1BQU0sa0JBQWEsYUFBYSxNQUFHLENBQUMsQ0FBQztRQUN2RixDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3Ivc2Nhbic7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlTWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY29uY2F0JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvY29uY2F0TWFwJztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvZXZlcnknO1xuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tZXJnZUFsbCc7XG5pbXBvcnQgJ3J4anMvYWRkL29ic2VydmFibGUvZnJvbSc7XG5cbmltcG9ydCB7TG9jYXRpb259IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvbXBvbmVudFJlc29sdmVyLCBJbmplY3RvciwgUmVmbGVjdGl2ZUluamVjdG9yLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQge29mIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL29mJztcblxuaW1wb3J0IHthcHBseVJlZGlyZWN0c30gZnJvbSAnLi9hcHBseV9yZWRpcmVjdHMnO1xuaW1wb3J0IHtSb3V0ZXJDb25maWcsIHZhbGlkYXRlQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQge2NyZWF0ZVJvdXRlclN0YXRlfSBmcm9tICcuL2NyZWF0ZV9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtjcmVhdGVVcmxUcmVlfSBmcm9tICcuL2NyZWF0ZV91cmxfdHJlZSc7XG5pbXBvcnQge1JvdXRlck91dGxldH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuaW1wb3J0IHtyZWNvZ25pemV9IGZyb20gJy4vcmVjb2duaXplJztcbmltcG9ydCB7cmVzb2x2ZX0gZnJvbSAnLi9yZXNvbHZlJztcbmltcG9ydCB7Um91dGVyT3V0bGV0TWFwfSBmcm9tICcuL3JvdXRlcl9vdXRsZXRfbWFwJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlLCBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBhZHZhbmNlQWN0aXZhdGVkUm91dGUsIGNyZWF0ZUVtcHR5U3RhdGV9IGZyb20gJy4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7UFJJTUFSWV9PVVRMRVQsIFBhcmFtc30gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtVcmxTZXJpYWxpemVyfSBmcm9tICcuL3VybF9zZXJpYWxpemVyJztcbmltcG9ydCB7VXJsVHJlZSwgY3JlYXRlRW1wdHlVcmxUcmVlfSBmcm9tICcuL3VybF90cmVlJztcbmltcG9ydCB7Zm9yRWFjaCwgc2hhbGxvd0VxdWFsfSBmcm9tICcuL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUcmVlTm9kZX0gZnJvbSAnLi91dGlscy90cmVlJztcblxuZXhwb3J0IGludGVyZmFjZSBOYXZpZ2F0aW9uRXh0cmFzIHtcbiAgcmVsYXRpdmVUbz86IEFjdGl2YXRlZFJvdXRlO1xuICBxdWVyeVBhcmFtcz86IFBhcmFtcztcbiAgZnJhZ21lbnQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gZXZlbnQgdHJpZ2dlcmVkIHdoZW4gYSBuYXZpZ2F0aW9uIHN0YXJ0c1xuICovXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblN0YXJ0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGlkOiBudW1iZXIsIHB1YmxpYyB1cmw6IHN0cmluZykge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYE5hdmlnYXRpb25TdGFydChpZDogJHt0aGlzLmlkfSwgdXJsOiAnJHt0aGlzLnVybH0nKWA7IH1cbn1cblxuLyoqXG4gKiBBbiBldmVudCB0cmlnZ2VyZWQgd2hlbiBhIG5hdmlnYXRpb24gZW5kcyBzdWNjZXNzZnVsbHlcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25FbmQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IG51bWJlciwgcHVibGljIHVybDogc3RyaW5nLCBwdWJsaWMgdXJsQWZ0ZXJSZWRpcmVjdHM6IHN0cmluZykge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBgTmF2aWdhdGlvbkVuZChpZDogJHt0aGlzLmlkfSwgdXJsOiAnJHt0aGlzLnVybH0nLCB1cmxBZnRlclJlZGlyZWN0czogJyR7dGhpcy51cmxBZnRlclJlZGlyZWN0c30nKWA7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiBldmVudCB0cmlnZ2VyZWQgd2hlbiBhIG5hdmlnYXRpb24gaXMgY2FuY2VsZWRcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25DYW5jZWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IG51bWJlciwgcHVibGljIHVybDogc3RyaW5nKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBgTmF2aWdhdGlvbkNhbmNlbChpZDogJHt0aGlzLmlkfSwgdXJsOiAnJHt0aGlzLnVybH0nKWA7IH1cbn1cblxuLyoqXG4gKiBBbiBldmVudCB0cmlnZ2VyZWQgd2hlbiBhIG5hdmlnYXRpb24gZmFpbHMgZHVlIHRvIHVuZXhwZWN0ZWQgZXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25FcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogbnVtYmVyLCBwdWJsaWMgdXJsOiBzdHJpbmcsIHB1YmxpYyBlcnJvcjogYW55KSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBOYXZpZ2F0aW9uRXJyb3IoaWQ6ICR7dGhpcy5pZH0sIHVybDogJyR7dGhpcy51cmx9JywgZXJyb3I6ICR7dGhpcy5lcnJvcn0pYDtcbiAgfVxufVxuXG4vKipcbiAqIEFuIGV2ZW50IHRyaWdnZXJlZCB3aGVuIHJvdXRlcyBhcmUgcmVjb2duaXplZFxuICovXG5leHBvcnQgY2xhc3MgUm91dGVzUmVjb2duaXplZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGlkOiBudW1iZXIsIHB1YmxpYyB1cmw6IHN0cmluZywgcHVibGljIHVybEFmdGVyUmVkaXJlY3RzOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgc3RhdGU6IFJvdXRlclN0YXRlU25hcHNob3QpIHt9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFJvdXRlc1JlY29nbml6ZWQoaWQ6ICR7dGhpcy5pZH0sIHVybDogJyR7dGhpcy51cmx9JywgdXJsQWZ0ZXJSZWRpcmVjdHM6ICcke3RoaXMudXJsQWZ0ZXJSZWRpcmVjdHN9Jywgc3RhdGU6ICR7dGhpcy5zdGF0ZX0pYDtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBFdmVudCA9IE5hdmlnYXRpb25TdGFydCB8IE5hdmlnYXRpb25FbmQgfCBOYXZpZ2F0aW9uQ2FuY2VsIHwgTmF2aWdhdGlvbkVycm9yO1xuXG4vKipcbiAqIFRoZSBgUm91dGVyYCBpcyByZXNwb25zaWJsZSBmb3IgbWFwcGluZyBVUkxzIHRvIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZXIge1xuICBwcml2YXRlIGN1cnJlbnRVcmxUcmVlOiBVcmxUcmVlO1xuICBwcml2YXRlIGN1cnJlbnRSb3V0ZXJTdGF0ZTogUm91dGVyU3RhdGU7XG4gIHByaXZhdGUgbG9jYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSByb3V0ZXJFdmVudHM6IFN1YmplY3Q8RXZlbnQ+O1xuICBwcml2YXRlIG5hdmlnYXRpb25JZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBjb25maWc6IFJvdXRlckNvbmZpZztcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm9vdENvbXBvbmVudFR5cGU6IFR5cGUsIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLCBwcml2YXRlIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLFxuICAgICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBjb25maWc6IFJvdXRlckNvbmZpZykge1xuICAgIHRoaXMucmVzZXRDb25maWcoY29uZmlnKTtcbiAgICB0aGlzLnJvdXRlckV2ZW50cyA9IG5ldyBTdWJqZWN0PEV2ZW50PigpO1xuICAgIHRoaXMuY3VycmVudFVybFRyZWUgPSBjcmVhdGVFbXB0eVVybFRyZWUoKTtcbiAgICB0aGlzLmN1cnJlbnRSb3V0ZXJTdGF0ZSA9IGNyZWF0ZUVtcHR5U3RhdGUodGhpcy5jdXJyZW50VXJsVHJlZSwgdGhpcy5yb290Q29tcG9uZW50VHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBpbml0aWFsTmF2aWdhdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNldFVwTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcigpO1xuICAgIHRoaXMubmF2aWdhdGVCeVVybCh0aGlzLmxvY2F0aW9uLnBhdGgoKSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCByb3V0ZSBzdGF0ZS5cbiAgICovXG4gIGdldCByb3V0ZXJTdGF0ZSgpOiBSb3V0ZXJTdGF0ZSB7IHJldHVybiB0aGlzLmN1cnJlbnRSb3V0ZXJTdGF0ZTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHVybC5cbiAgICovXG4gIGdldCB1cmwoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuc2VyaWFsaXplVXJsKHRoaXMuY3VycmVudFVybFRyZWUpOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gb2JzZXJ2YWJsZSBvZiByb3V0ZSBldmVudHNcbiAgICovXG4gIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxFdmVudD4geyByZXR1cm4gdGhpcy5yb3V0ZXJFdmVudHM7IH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBjb25maWd1cmF0aW9uIHVzZWQgZm9yIG5hdmlnYXRpb24gYW5kIGdlbmVyYXRpbmcgbGlua3MuXG4gICAqXG4gICAqICMjIyBVc2FnZVxuICAgKlxuICAgKiBgYGBcbiAgICogcm91dGVyLnJlc2V0Q29uZmlnKFtcbiAgICogIHsgcGF0aDogJ3RlYW0vOmlkJywgY29tcG9uZW50OiBUZWFtQ21wLCBjaGlsZHJlbjogW1xuICAgKiAgICB7IHBhdGg6ICdzaW1wbGUnLCBjb21wb25lbnQ6IFNpbXBsZUNtcCB9LFxuICAgKiAgICB7IHBhdGg6ICd1c2VyLzpuYW1lJywgY29tcG9uZW50OiBVc2VyQ21wIH1cbiAgICogIF0gfVxuICAgKiBdKTtcbiAgICogYGBgXG4gICAqL1xuICByZXNldENvbmZpZyhjb25maWc6IFJvdXRlckNvbmZpZyk6IHZvaWQge1xuICAgIHZhbGlkYXRlQ29uZmlnKGNvbmZpZyk7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gIH1cblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBkaXNwb3NlKCk6IHZvaWQgeyB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH1cblxuICAvKipcbiAgICogQXBwbGllcyBhbiBhcnJheSBvZiBjb21tYW5kcyB0byB0aGUgY3VycmVudCB1cmwgdHJlZSBhbmQgY3JlYXRlc1xuICAgKiBhIG5ldyB1cmwgdHJlZS5cbiAgICpcbiAgICogV2hlbiBnaXZlbiBhbiBhY3RpdmF0ZSByb3V0ZSwgYXBwbGllcyB0aGUgZ2l2ZW4gY29tbWFuZHMgc3RhcnRpbmcgZnJvbSB0aGUgcm91dGUuXG4gICAqIFdoZW4gbm90IGdpdmVuIGEgcm91dGUsIGFwcGxpZXMgdGhlIGdpdmVuIGNvbW1hbmQgc3RhcnRpbmcgZnJvbSB0aGUgcm9vdC5cbiAgICpcbiAgICogIyMjIFVzYWdlXG4gICAqXG4gICAqIGBgYFxuICAgKiAvLyBjcmVhdGUgL3RlYW0vMzMvdXNlci8xMVxuICAgKiByb3V0ZXIuY3JlYXRlVXJsVHJlZShbJy90ZWFtJywgMzMsICd1c2VyJywgMTFdKTtcbiAgICpcbiAgICogLy8gY3JlYXRlIC90ZWFtLzMzO2V4cGFuZD10cnVlL3VzZXIvMTFcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycvdGVhbScsIDMzLCB7ZXhwYW5kOiB0cnVlfSwgJ3VzZXInLCAxMV0pO1xuICAgKlxuICAgKiAvLyB5b3UgY2FuIGNvbGxhcHNlIHN0YXRpYyBmcmFnbWVudHMgbGlrZSB0aGlzXG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnL3RlYW0vMzMvdXNlcicsIHVzZXJJZF0pO1xuICAgKlxuICAgKiAvLyBhc3N1bWluZyB0aGUgY3VycmVudCB1cmwgaXMgYC90ZWFtLzMzL3VzZXIvMTFgIGFuZCB0aGUgcm91dGUgcG9pbnRzIHRvIGB1c2VyLzExYFxuICAgKlxuICAgKiAvLyBuYXZpZ2F0ZSB0byAvdGVhbS8zMy91c2VyLzExL2RldGFpbHNcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWydkZXRhaWxzJ10sIHtyZWxhdGl2ZVRvOiByb3V0ZX0pO1xuICAgKlxuICAgKiAvLyBuYXZpZ2F0ZSB0byAvdGVhbS8zMy91c2VyLzIyXG4gICAqIHJvdXRlci5jcmVhdGVVcmxUcmVlKFsnLi4vMjInXSwge3JlbGF0aXZlVG86IHJvdXRlfSk7XG4gICAqXG4gICAqIC8vIG5hdmlnYXRlIHRvIC90ZWFtLzQ0L3VzZXIvMjJcbiAgICogcm91dGVyLmNyZWF0ZVVybFRyZWUoWycuLi8uLi90ZWFtLzQ0L3VzZXIvMjInXSwge3JlbGF0aXZlVG86IHJvdXRlfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgY3JlYXRlVXJsVHJlZShjb21tYW5kczogYW55W10sIHtyZWxhdGl2ZVRvLCBxdWVyeVBhcmFtcywgZnJhZ21lbnR9OiBOYXZpZ2F0aW9uRXh0cmFzID0ge30pOlxuICAgICAgVXJsVHJlZSB7XG4gICAgY29uc3QgYSA9IHJlbGF0aXZlVG8gPyByZWxhdGl2ZVRvIDogdGhpcy5yb3V0ZXJTdGF0ZS5yb290O1xuICAgIHJldHVybiBjcmVhdGVVcmxUcmVlKGEsIHRoaXMuY3VycmVudFVybFRyZWUsIGNvbW1hbmRzLCBxdWVyeVBhcmFtcywgZnJhZ21lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCB1cmwuIFRoaXMgbmF2aWdhdGlvbiBpcyBhbHdheXMgYWJzb2x1dGUuXG4gICAqXG4gICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQ6XG4gICAqIC0gaXMgcmVzb2x2ZWQgd2l0aCAndHJ1ZScgd2hlbiBuYXZpZ2F0aW9uIHN1Y2NlZWRzXG4gICAqIC0gaXMgcmVzb2x2ZWQgd2l0aCAnZmFsc2UnIHdoZW4gbmF2aWdhdGlvbiBmYWlsc1xuICAgKiAtIGlzIHJlamVjdGVkIHdoZW4gYW4gZXJyb3IgaGFwcGVuc1xuICAgKlxuICAgKiAjIyMgVXNhZ2VcbiAgICpcbiAgICogYGBgXG4gICAqIHJvdXRlci5uYXZpZ2F0ZUJ5VXJsKFwiL3RlYW0vMzMvdXNlci8xMVwiKTtcbiAgICogYGBgXG4gICAqL1xuICBuYXZpZ2F0ZUJ5VXJsKHVybDogc3RyaW5nfFVybFRyZWUpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAodXJsIGluc3RhbmNlb2YgVXJsVHJlZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVOYXZpZ2F0aW9uKHVybCwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cmxUcmVlID0gdGhpcy51cmxTZXJpYWxpemVyLnBhcnNlKHVybCk7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZU5hdmlnYXRpb24odXJsVHJlZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgYXJyYXkgb2YgY29tbWFuZHMgYW5kIGEgc3RhcnRpbmcgcG9pbnQuXG4gICAqIElmIG5vIHN0YXJ0aW5nIHJvdXRlIGlzIHByb3ZpZGVkLCB0aGUgbmF2aWdhdGlvbiBpcyBhYnNvbHV0ZS5cbiAgICpcbiAgICogUmV0dXJucyBhIHByb21pc2UgdGhhdDpcbiAgICogLSBpcyByZXNvbHZlZCB3aXRoICd0cnVlJyB3aGVuIG5hdmlnYXRpb24gc3VjY2VlZHNcbiAgICogLSBpcyByZXNvbHZlZCB3aXRoICdmYWxzZScgd2hlbiBuYXZpZ2F0aW9uIGZhaWxzXG4gICAqIC0gaXMgcmVqZWN0ZWQgd2hlbiBhbiBlcnJvciBoYXBwZW5zXG4gICAqXG4gICAqICMjIyBVc2FnZVxuICAgKlxuICAgKiBgYGBcbiAgICogcm91dGVyLm5hdmlnYXRlKFsndGVhbScsIDMzLCAndGVhbScsICcxMV0sIHtyZWxhdGl2ZVRvOiByb3V0ZX0pO1xuICAgKiBgYGBcbiAgICovXG4gIG5hdmlnYXRlKGNvbW1hbmRzOiBhbnlbXSwgZXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge30pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zY2hlZHVsZU5hdmlnYXRpb24odGhpcy5jcmVhdGVVcmxUcmVlKGNvbW1hbmRzLCBleHRyYXMpLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIHtAbGluayBVcmxUcmVlfSBpbnRvIGEgc3RyaW5nLlxuICAgKi9cbiAgc2VyaWFsaXplVXJsKHVybDogVXJsVHJlZSk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHVybCk7IH1cblxuICAvKipcbiAgICogUGFyc2UgYSBzdHJpbmcgaW50byBhIHtAbGluayBVcmxUcmVlfS5cbiAgICovXG4gIHBhcnNlVXJsKHVybDogc3RyaW5nKTogVXJsVHJlZSB7IHJldHVybiB0aGlzLnVybFNlcmlhbGl6ZXIucGFyc2UodXJsKTsgfVxuXG4gIHByaXZhdGUgc2NoZWR1bGVOYXZpZ2F0aW9uKHVybDogVXJsVHJlZSwgcHJldmVudFB1c2hTdGF0ZTogYm9vbGVhbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGlkID0gKyt0aGlzLm5hdmlnYXRpb25JZDtcbiAgICB0aGlzLnJvdXRlckV2ZW50cy5uZXh0KG5ldyBOYXZpZ2F0aW9uU3RhcnQoaWQsIHRoaXMuc2VyaWFsaXplVXJsKHVybCkpKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoXykgPT4gdGhpcy5ydW5OYXZpZ2F0ZSh1cmwsIHByZXZlbnRQdXNoU3RhdGUsIGlkKSk7XG4gIH1cblxuICBwcml2YXRlIHNldFVwTG9jYXRpb25DaGFuZ2VMaXN0ZW5lcigpOiB2b2lkIHtcbiAgICB0aGlzLmxvY2F0aW9uU3Vic2NyaXB0aW9uID0gPGFueT50aGlzLmxvY2F0aW9uLnN1YnNjcmliZSgoY2hhbmdlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZU5hdmlnYXRpb24odGhpcy51cmxTZXJpYWxpemVyLnBhcnNlKGNoYW5nZVsndXJsJ10pLCBjaGFuZ2VbJ3BvcCddKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcnVuTmF2aWdhdGUodXJsOiBVcmxUcmVlLCBwcmV2ZW50UHVzaFN0YXRlOiBib29sZWFuLCBpZDogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKGlkICE9PSB0aGlzLm5hdmlnYXRpb25JZCkge1xuICAgICAgdGhpcy5sb2NhdGlvbi5nbyh0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHRoaXMuY3VycmVudFVybFRyZWUpKTtcbiAgICAgIHRoaXMucm91dGVyRXZlbnRzLm5leHQobmV3IE5hdmlnYXRpb25DYW5jZWwoaWQsIHRoaXMuc2VyaWFsaXplVXJsKHVybCkpKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZVByb21pc2UsIHJlamVjdFByb21pc2UpID0+IHtcbiAgICAgIGxldCB1cGRhdGVkVXJsOiBVcmxUcmVlO1xuICAgICAgbGV0IHN0YXRlOiBSb3V0ZXJTdGF0ZTtcbiAgICAgIGFwcGx5UmVkaXJlY3RzKHVybCwgdGhpcy5jb25maWcpXG4gICAgICAgICAgLm1lcmdlTWFwKHUgPT4ge1xuICAgICAgICAgICAgdXBkYXRlZFVybCA9IHU7XG4gICAgICAgICAgICByZXR1cm4gcmVjb2duaXplKFxuICAgICAgICAgICAgICAgIHRoaXMucm9vdENvbXBvbmVudFR5cGUsIHRoaXMuY29uZmlnLCB1cGRhdGVkVXJsLCB0aGlzLnNlcmlhbGl6ZVVybCh1cGRhdGVkVXJsKSk7XG4gICAgICAgICAgfSlcblxuICAgICAgICAgIC5tZXJnZU1hcCgobmV3Um91dGVyU3RhdGVTbmFwc2hvdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHMubmV4dChuZXcgUm91dGVzUmVjb2duaXplZChcbiAgICAgICAgICAgICAgICBpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSwgdGhpcy5zZXJpYWxpemVVcmwodXBkYXRlZFVybCksIG5ld1JvdXRlclN0YXRlU25hcHNob3QpKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMucmVzb2x2ZXIsIG5ld1JvdXRlclN0YXRlU25hcHNob3QpO1xuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKChyb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlUm91dGVyU3RhdGUocm91dGVyU3RhdGVTbmFwc2hvdCwgdGhpcy5jdXJyZW50Um91dGVyU3RhdGUpO1xuXG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKChuZXdTdGF0ZTogUm91dGVyU3RhdGUpID0+IHtcbiAgICAgICAgICAgIHN0YXRlID0gbmV3U3RhdGU7XG5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5tZXJnZU1hcChfID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgR3VhcmRDaGVja3Moc3RhdGUuc25hcHNob3QsIHRoaXMuY3VycmVudFJvdXRlclN0YXRlLnNuYXBzaG90LCB0aGlzLmluamVjdG9yKVxuICAgICAgICAgICAgICAgIC5jaGVjayh0aGlzLm91dGxldE1hcCk7XG5cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mb3JFYWNoKChzaG91bGRBY3RpdmF0ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKCFzaG91bGRBY3RpdmF0ZSB8fCBpZCAhPT0gdGhpcy5uYXZpZ2F0aW9uSWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHMubmV4dChuZXcgTmF2aWdhdGlvbkNhbmNlbChpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSkpO1xuICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3IEFjdGl2YXRlUm91dGVzKHN0YXRlLCB0aGlzLmN1cnJlbnRSb3V0ZXJTdGF0ZSkuYWN0aXZhdGUodGhpcy5vdXRsZXRNYXApO1xuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRVcmxUcmVlID0gdXBkYXRlZFVybDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFJvdXRlclN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICBpZiAoIXByZXZlbnRQdXNoU3RhdGUpIHtcbiAgICAgICAgICAgICAgbGV0IHBhdGggPSB0aGlzLnVybFNlcmlhbGl6ZXIuc2VyaWFsaXplKHVwZGF0ZWRVcmwpO1xuICAgICAgICAgICAgICBpZiAodGhpcy5sb2NhdGlvbi5pc0N1cnJlbnRQYXRoRXF1YWxUbyhwYXRoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24ucmVwbGFjZVN0YXRlKHBhdGgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYXRpb24uZ28ocGF0aCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXZlbnRzLm5leHQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBOYXZpZ2F0aW9uRW5kKGlkLCB0aGlzLnNlcmlhbGl6ZVVybCh1cmwpLCB0aGlzLnNlcmlhbGl6ZVVybCh1cGRhdGVkVXJsKSkpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHRydWUpO1xuXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXZlbnRzLm5leHQobmV3IE5hdmlnYXRpb25FcnJvcihpZCwgdGhpcy5zZXJpYWxpemVVcmwodXJsKSwgZSkpO1xuICAgICAgICAgICAgICAgIHJlamVjdFByb21pc2UoZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7fVxufVxuY2xhc3MgQ2FuRGVhY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb21wb25lbnQ6IE9iamVjdCwgcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KSB7fVxufVxuXG5jbGFzcyBHdWFyZENoZWNrcyB7XG4gIHByaXZhdGUgY2hlY2tzOiBBcnJheTxDYW5BY3RpdmF0ZXxDYW5EZWFjdGl2YXRlPiA9IFtdO1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgZnV0dXJlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBwcml2YXRlIGN1cnI6IFJvdXRlclN0YXRlU25hcHNob3QsXG4gICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3Rvcikge31cblxuICBjaGVjayhwYXJlbnRPdXRsZXRNYXA6IFJvdXRlck91dGxldE1hcCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGZ1dHVyZVJvb3QgPSB0aGlzLmZ1dHVyZS5fcm9vdDtcbiAgICBjb25zdCBjdXJyUm9vdCA9IHRoaXMuY3VyciA/IHRoaXMuY3Vyci5fcm9vdCA6IG51bGw7XG4gICAgdGhpcy50cmF2ZXJzZUNoaWxkUm91dGVzKGZ1dHVyZVJvb3QsIGN1cnJSb290LCBwYXJlbnRPdXRsZXRNYXApO1xuICAgIGlmICh0aGlzLmNoZWNrcy5sZW5ndGggPT09IDApIHJldHVybiBvZiAodHJ1ZSk7XG5cbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tKHRoaXMuY2hlY2tzKVxuICAgICAgICAubWFwKHMgPT4ge1xuICAgICAgICAgIGlmIChzIGluc3RhbmNlb2YgQ2FuQWN0aXZhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkNhbkFjdGl2YXRlKHMucm91dGUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocyBpbnN0YW5jZW9mIENhbkRlYWN0aXZhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkNhbkRlYWN0aXZhdGUocy5jb21wb25lbnQsIHMucm91dGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBiZSByZWFjaGVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAubWVyZ2VBbGwoKVxuICAgICAgICAuZXZlcnkocmVzdWx0ID0+IHJlc3VsdCA9PT0gdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIHRyYXZlcnNlQ2hpbGRSb3V0ZXMoXG4gICAgICBmdXR1cmVOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiwgY3Vyck5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LFxuICAgICAgb3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2Q2hpbGRyZW46IHtba2V5OiBzdHJpbmddOiBhbnl9ID0gbm9kZUNoaWxkcmVuQXNNYXAoY3Vyck5vZGUpO1xuICAgIGZ1dHVyZU5vZGUuY2hpbGRyZW4uZm9yRWFjaChjID0+IHtcbiAgICAgIHRoaXMudHJhdmVyc2VSb3V0ZXMoYywgcHJldkNoaWxkcmVuW2MudmFsdWUub3V0bGV0XSwgb3V0bGV0TWFwKTtcbiAgICAgIGRlbGV0ZSBwcmV2Q2hpbGRyZW5bYy52YWx1ZS5vdXRsZXRdO1xuICAgIH0pO1xuICAgIGZvckVhY2goXG4gICAgICAgIHByZXZDaGlsZHJlbixcbiAgICAgICAgKHY6IGFueSwgazogc3RyaW5nKSA9PiB0aGlzLmRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKHYsIG91dGxldE1hcC5fb3V0bGV0c1trXSkpO1xuICB9XG5cbiAgdHJhdmVyc2VSb3V0ZXMoXG4gICAgICBmdXR1cmVOb2RlOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiwgY3Vyck5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LFxuICAgICAgcGFyZW50T3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiB2b2lkIHtcbiAgICBjb25zdCBmdXR1cmUgPSBmdXR1cmVOb2RlLnZhbHVlO1xuICAgIGNvbnN0IGN1cnIgPSBjdXJyTm9kZSA/IGN1cnJOb2RlLnZhbHVlIDogbnVsbDtcbiAgICBjb25zdCBvdXRsZXQgPSBwYXJlbnRPdXRsZXRNYXAgPyBwYXJlbnRPdXRsZXRNYXAuX291dGxldHNbZnV0dXJlTm9kZS52YWx1ZS5vdXRsZXRdIDogbnVsbDtcblxuICAgIGlmIChjdXJyICYmIGZ1dHVyZS5fcm91dGVDb25maWcgPT09IGN1cnIuX3JvdXRlQ29uZmlnKSB7XG4gICAgICBpZiAoIXNoYWxsb3dFcXVhbChmdXR1cmUucGFyYW1zLCBjdXJyLnBhcmFtcykpIHtcbiAgICAgICAgdGhpcy5jaGVja3MucHVzaChuZXcgQ2FuRGVhY3RpdmF0ZShvdXRsZXQuY29tcG9uZW50LCBjdXJyKSwgbmV3IENhbkFjdGl2YXRlKGZ1dHVyZSkpO1xuICAgICAgfVxuICAgICAgdGhpcy50cmF2ZXJzZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIGN1cnJOb2RlLCBvdXRsZXQgPyBvdXRsZXQub3V0bGV0TWFwIDogbnVsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZU91dGxldEFuZEl0Q2hpbGRyZW4oY3Vyciwgb3V0bGV0KTtcbiAgICAgIHRoaXMuY2hlY2tzLnB1c2gobmV3IENhbkFjdGl2YXRlKGZ1dHVyZSkpO1xuICAgICAgdGhpcy50cmF2ZXJzZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIG51bGwsIG91dGxldCA/IG91dGxldC5vdXRsZXRNYXAgOiBudWxsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBvdXRsZXQ6IFJvdXRlck91dGxldCk6IHZvaWQge1xuICAgIGlmIChvdXRsZXQgJiYgb3V0bGV0LmlzQWN0aXZhdGVkKSB7XG4gICAgICBmb3JFYWNoKG91dGxldC5vdXRsZXRNYXAuX291dGxldHMsICh2OiBSb3V0ZXJPdXRsZXQpID0+IHtcbiAgICAgICAgaWYgKHYuaXNBY3RpdmF0ZWQpIHtcbiAgICAgICAgICB0aGlzLmRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKHYuYWN0aXZhdGVkUm91dGUuc25hcHNob3QsIHYpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuY2hlY2tzLnB1c2gobmV3IENhbkRlYWN0aXZhdGUob3V0bGV0LmNvbXBvbmVudCwgcm91dGUpKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJ1bkNhbkFjdGl2YXRlKGZ1dHVyZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGNhbkFjdGl2YXRlID0gZnV0dXJlLl9yb3V0ZUNvbmZpZyA/IGZ1dHVyZS5fcm91dGVDb25maWcuY2FuQWN0aXZhdGUgOiBudWxsO1xuICAgIGlmICghY2FuQWN0aXZhdGUgfHwgY2FuQWN0aXZhdGUubGVuZ3RoID09PSAwKSByZXR1cm4gb2YgKHRydWUpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmZyb20oY2FuQWN0aXZhdGUpXG4gICAgICAgIC5tYXAoYyA9PiB7XG4gICAgICAgICAgY29uc3QgZ3VhcmQgPSB0aGlzLmluamVjdG9yLmdldChjKTtcbiAgICAgICAgICBpZiAoZ3VhcmQuY2FuQWN0aXZhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwSW50b09ic2VydmFibGUoZ3VhcmQuY2FuQWN0aXZhdGUoZnV0dXJlLCB0aGlzLmZ1dHVyZSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcEludG9PYnNlcnZhYmxlKGd1YXJkKGZ1dHVyZSwgdGhpcy5mdXR1cmUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5tZXJnZUFsbCgpXG4gICAgICAgIC5ldmVyeShyZXN1bHQgPT4gcmVzdWx0ID09PSB0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgcnVuQ2FuRGVhY3RpdmF0ZShjb21wb25lbnQ6IE9iamVjdCwgY3VycjogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGNhbkRlYWN0aXZhdGUgPSBjdXJyLl9yb3V0ZUNvbmZpZyA/IGN1cnIuX3JvdXRlQ29uZmlnLmNhbkRlYWN0aXZhdGUgOiBudWxsO1xuICAgIGlmICghY2FuRGVhY3RpdmF0ZSB8fCBjYW5EZWFjdGl2YXRlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG9mICh0cnVlKTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tKGNhbkRlYWN0aXZhdGUpXG4gICAgICAgIC5tYXAoYyA9PiB7XG4gICAgICAgICAgY29uc3QgZ3VhcmQgPSB0aGlzLmluamVjdG9yLmdldChjKTtcbiAgICAgICAgICBpZiAoZ3VhcmQuY2FuRGVhY3RpdmF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdyYXBJbnRvT2JzZXJ2YWJsZShndWFyZC5jYW5EZWFjdGl2YXRlKGNvbXBvbmVudCwgY3VyciwgdGhpcy5jdXJyKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB3cmFwSW50b09ic2VydmFibGUoZ3VhcmQoY29tcG9uZW50LCBjdXJyLCB0aGlzLmN1cnIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5tZXJnZUFsbCgpXG4gICAgICAgIC5ldmVyeShyZXN1bHQgPT4gcmVzdWx0ID09PSB0cnVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwSW50b09ic2VydmFibGU8VD4odmFsdWU6IFQgfCBPYnNlcnZhYmxlPFQ+KTogT2JzZXJ2YWJsZTxUPiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9mICh2YWx1ZSk7XG4gIH1cbn1cblxuY2xhc3MgQWN0aXZhdGVSb3V0ZXMge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZ1dHVyZVN0YXRlOiBSb3V0ZXJTdGF0ZSwgcHJpdmF0ZSBjdXJyU3RhdGU6IFJvdXRlclN0YXRlKSB7fVxuXG4gIGFjdGl2YXRlKHBhcmVudE91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwKTogdm9pZCB7XG4gICAgY29uc3QgZnV0dXJlUm9vdCA9IHRoaXMuZnV0dXJlU3RhdGUuX3Jvb3Q7XG4gICAgY29uc3QgY3VyclJvb3QgPSB0aGlzLmN1cnJTdGF0ZSA/IHRoaXMuY3VyclN0YXRlLl9yb290IDogbnVsbDtcblxuICAgIHB1c2hRdWVyeVBhcmFtc0FuZEZyYWdtZW50KHRoaXMuZnV0dXJlU3RhdGUpO1xuICAgIHRoaXMuYWN0aXZhdGVDaGlsZFJvdXRlcyhmdXR1cmVSb290LCBjdXJyUm9vdCwgcGFyZW50T3V0bGV0TWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgYWN0aXZhdGVDaGlsZFJvdXRlcyhcbiAgICAgIGZ1dHVyZU5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPiwgY3Vyck5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPixcbiAgICAgIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwKTogdm9pZCB7XG4gICAgY29uc3QgcHJldkNoaWxkcmVuOiB7W2tleTogc3RyaW5nXTogYW55fSA9IG5vZGVDaGlsZHJlbkFzTWFwKGN1cnJOb2RlKTtcbiAgICBmdXR1cmVOb2RlLmNoaWxkcmVuLmZvckVhY2goYyA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlUm91dGVzKGMsIHByZXZDaGlsZHJlbltjLnZhbHVlLm91dGxldF0sIG91dGxldE1hcCk7XG4gICAgICBkZWxldGUgcHJldkNoaWxkcmVuW2MudmFsdWUub3V0bGV0XTtcbiAgICB9KTtcbiAgICBmb3JFYWNoKFxuICAgICAgICBwcmV2Q2hpbGRyZW4sXG4gICAgICAgICh2OiBhbnksIGs6IHN0cmluZykgPT4gdGhpcy5kZWFjdGl2YXRlT3V0bGV0QW5kSXRDaGlsZHJlbihvdXRsZXRNYXAuX291dGxldHNba10pKTtcbiAgfVxuXG4gIGFjdGl2YXRlUm91dGVzKFxuICAgICAgZnV0dXJlTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+LCBjdXJyTm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+LFxuICAgICAgcGFyZW50T3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiB2b2lkIHtcbiAgICBjb25zdCBmdXR1cmUgPSBmdXR1cmVOb2RlLnZhbHVlO1xuICAgIGNvbnN0IGN1cnIgPSBjdXJyTm9kZSA/IGN1cnJOb2RlLnZhbHVlIDogbnVsbDtcblxuICAgIGNvbnN0IG91dGxldCA9IGdldE91dGxldChwYXJlbnRPdXRsZXRNYXAsIGZ1dHVyZU5vZGUudmFsdWUpO1xuXG4gICAgaWYgKGZ1dHVyZSA9PT0gY3Vycikge1xuICAgICAgYWR2YW5jZUFjdGl2YXRlZFJvdXRlKGZ1dHVyZSk7XG4gICAgICB0aGlzLmFjdGl2YXRlQ2hpbGRSb3V0ZXMoZnV0dXJlTm9kZSwgY3Vyck5vZGUsIG91dGxldC5vdXRsZXRNYXApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKG91dGxldCk7XG4gICAgICBjb25zdCBvdXRsZXRNYXAgPSBuZXcgUm91dGVyT3V0bGV0TWFwKCk7XG4gICAgICB0aGlzLmFjdGl2YXRlTmV3Um91dGVzKG91dGxldE1hcCwgZnV0dXJlLCBvdXRsZXQpO1xuICAgICAgdGhpcy5hY3RpdmF0ZUNoaWxkUm91dGVzKGZ1dHVyZU5vZGUsIG51bGwsIG91dGxldE1hcCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhY3RpdmF0ZU5ld1JvdXRlcyhcbiAgICAgIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLCBmdXR1cmU6IEFjdGl2YXRlZFJvdXRlLCBvdXRsZXQ6IFJvdXRlck91dGxldCk6IHZvaWQge1xuICAgIGNvbnN0IHJlc29sdmVkID0gUmVmbGVjdGl2ZUluamVjdG9yLnJlc29sdmUoW1xuICAgICAge3Byb3ZpZGU6IEFjdGl2YXRlZFJvdXRlLCB1c2VWYWx1ZTogZnV0dXJlfSxcbiAgICAgIHtwcm92aWRlOiBSb3V0ZXJPdXRsZXRNYXAsIHVzZVZhbHVlOiBvdXRsZXRNYXB9XG4gICAgXSk7XG4gICAgYWR2YW5jZUFjdGl2YXRlZFJvdXRlKGZ1dHVyZSk7XG4gICAgb3V0bGV0LmFjdGl2YXRlKGZ1dHVyZS5fZnV0dXJlU25hcHNob3QuX3Jlc29sdmVkQ29tcG9uZW50RmFjdG9yeSwgZnV0dXJlLCByZXNvbHZlZCwgb3V0bGV0TWFwKTtcbiAgfVxuXG4gIHByaXZhdGUgZGVhY3RpdmF0ZU91dGxldEFuZEl0Q2hpbGRyZW4ob3V0bGV0OiBSb3V0ZXJPdXRsZXQpOiB2b2lkIHtcbiAgICBpZiAob3V0bGV0ICYmIG91dGxldC5pc0FjdGl2YXRlZCkge1xuICAgICAgZm9yRWFjaChcbiAgICAgICAgICBvdXRsZXQub3V0bGV0TWFwLl9vdXRsZXRzLCAodjogUm91dGVyT3V0bGV0KSA9PiB0aGlzLmRlYWN0aXZhdGVPdXRsZXRBbmRJdENoaWxkcmVuKHYpKTtcbiAgICAgIG91dGxldC5kZWFjdGl2YXRlKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHB1c2hRdWVyeVBhcmFtc0FuZEZyYWdtZW50KHN0YXRlOiBSb3V0ZXJTdGF0ZSk6IHZvaWQge1xuICBpZiAoIXNoYWxsb3dFcXVhbChzdGF0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcywgKDxhbnk+c3RhdGUucXVlcnlQYXJhbXMpLnZhbHVlKSkge1xuICAgICg8YW55PnN0YXRlLnF1ZXJ5UGFyYW1zKS5uZXh0KHN0YXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5zbmFwc2hvdC5mcmFnbWVudCAhPT0gKDxhbnk+c3RhdGUuZnJhZ21lbnQpLnZhbHVlKSB7XG4gICAgKDxhbnk+c3RhdGUuZnJhZ21lbnQpLm5leHQoc3RhdGUuc25hcHNob3QuZnJhZ21lbnQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vZGVDaGlsZHJlbkFzTWFwKG5vZGU6IFRyZWVOb2RlPGFueT4pIHtcbiAgcmV0dXJuIG5vZGUgPyBub2RlLmNoaWxkcmVuLnJlZHVjZSgobTogYW55LCBjOiBUcmVlTm9kZTxhbnk+KSA9PiB7XG4gICAgbVtjLnZhbHVlLm91dGxldF0gPSBjO1xuICAgIHJldHVybiBtO1xuICB9LCB7fSkgOiB7fTtcbn1cblxuZnVuY3Rpb24gZ2V0T3V0bGV0KG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLCByb3V0ZTogQWN0aXZhdGVkUm91dGUpOiBSb3V0ZXJPdXRsZXQge1xuICBsZXQgb3V0bGV0ID0gb3V0bGV0TWFwLl9vdXRsZXRzW3JvdXRlLm91dGxldF07XG4gIGlmICghb3V0bGV0KSB7XG4gICAgY29uc3QgY29tcG9uZW50TmFtZSA9ICg8YW55PnJvdXRlLmNvbXBvbmVudCkubmFtZTtcbiAgICBpZiAocm91dGUub3V0bGV0ID09PSBQUklNQVJZX09VVExFVCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBwcmltYXJ5IG91dGxldCB0byBsb2FkICcke2NvbXBvbmVudE5hbWV9J2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIHRoZSBvdXRsZXQgJHtyb3V0ZS5vdXRsZXR9IHRvIGxvYWQgJyR7Y29tcG9uZW50TmFtZX0nYCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXRsZXQ7XG59XG4iXX0=

/***/ },
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(38);
	var scan_1 = __webpack_require__(398);
	Observable_1.Observable.prototype.scan = scan_1.scan;
	//# sourceMappingURL=scan.js.map

/***/ },
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(38);
	var concat_1 = __webpack_require__(402);
	Observable_1.Observable.prototype.concat = concat_1.concat;
	//# sourceMappingURL=concat.js.map

/***/ },
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var isScheduler_1 = __webpack_require__(358);
	var ArrayObservable_1 = __webpack_require__(355);
	var mergeAll_1 = __webpack_require__(367);
	/**
	 * Creates an output Observable which sequentially emits all values from every
	 * given input Observable after the current Observable.
	 *
	 * <span class="informal">Concatenates multiple Observables together by
	 * sequentially emitting their values, one Observable after the other.</span>
	 *
	 * <img src="./img/concat.png" width="100%">
	 *
	 * Joins this Observable with multiple other Observables by subscribing to them
	 * one at a time, starting with the source, and merging their results into the
	 * output Observable. Will wait for each Observable to complete before moving
	 * on to the next.
	 *
	 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
	 * var timer = Rx.Observable.interval(1000).take(4);
	 * var sequence = Rx.Observable.range(1, 10);
	 * var result = timer.concat(sequence);
	 * result.subscribe(x => console.log(x));
	 *
	 * @example <caption>Concatenate 3 Observables</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var result = timer1.concat(timer2, timer3);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatAll}
	 * @see {@link concatMap}
	 * @see {@link concatMapTo}
	 *
	 * @param {Observable} other An input Observable to concatenate after the source
	 * Observable. More than one input Observables may be given as argument.
	 * @param {Scheduler} [scheduler=null] An optional Scheduler to schedule each
	 * Observable subscription on.
	 * @return {Observable} All values of each passed Observable merged into a
	 * single Observable, in order, in serial fashion.
	 * @method concat
	 * @owner Observable
	 */
	function concat() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    return concatStatic.apply(void 0, [this].concat(observables));
	}
	exports.concat = concat;
	/* tslint:enable:max-line-length */
	/**
	 * Creates an output Observable which sequentially emits all values from every
	 * given input Observable after the current Observable.
	 *
	 * <span class="informal">Concatenates multiple Observables together by
	 * sequentially emitting their values, one Observable after the other.</span>
	 *
	 * <img src="./img/concat.png" width="100%">
	 *
	 * Joins multiple Observables together by subscribing to them one at a time and
	 * merging their results into the output Observable. Will wait for each
	 * Observable to complete before moving on to the next.
	 *
	 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
	 * var timer = Rx.Observable.interval(1000).take(4);
	 * var sequence = Rx.Observable.range(1, 10);
	 * var result = Rx.Observable.concat(timer, sequence);
	 * result.subscribe(x => console.log(x));
	 *
	 * @example <caption>Concatenate 3 Observables</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var result = Rx.Observable.concat(timer1, timer2, timer3);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatAll}
	 * @see {@link concatMap}
	 * @see {@link concatMapTo}
	 *
	 * @param {Observable} input1 An input Observable to concatenate with others.
	 * @param {Observable} input2 An input Observable to concatenate with others.
	 * More than one input Observables may be given as argument.
	 * @param {Scheduler} [scheduler=null] An optional Scheduler to schedule each
	 * Observable subscription on.
	 * @return {Observable} All values of each passed Observable merged into a
	 * single Observable, in order, in serial fashion.
	 * @static true
	 * @name concat
	 * @owner Observable
	 */
	function concatStatic() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var scheduler = null;
	    var args = observables;
	    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
	        scheduler = args.pop();
	    }
	    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
	}
	exports.concatStatic = concatStatic;
	//# sourceMappingURL=concat.js.map

/***/ },
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(38);
	var concatMap_1 = __webpack_require__(404);
	Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
	//# sourceMappingURL=concatMap.js.map

/***/ },
/* 404 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var mergeMap_1 = __webpack_require__(400);
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable, in a serialized fashion waiting for each one to complete before
	 * merging the next.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link concatAll}.</span>
	 *
	 * <img src="./img/concatMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an (so-called "inner") Observable. Each new inner Observable is
	 * concatenated with the previous inner Observable.
	 *
	 * __Warning:__ if source values arrive endlessly and faster than their
	 * corresponding inner Observables can complete, it will result in memory issues
	 * as inner Observables amass in an unbounded buffer waiting for their turn to
	 * be subscribed to.
	 *
	 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
	 * to `1`.
	 *
	 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concat}
	 * @see {@link concatAll}
	 * @see {@link concatMapTo}
	 * @see {@link exhaustMap}
	 * @see {@link mergeMap}
	 * @see {@link switchMap}
	 *
	 * @param {function(value: T, ?index: number): Observable} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} an observable of values merged from the projected
	 * Observables as they were subscribed to, one at a time. Optionally, these
	 * values may have been projected from a passed `projectResult` argument.
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and taking values from each projected inner
	 * Observable sequentially.
	 * @method concatMap
	 * @owner Observable
	 */
	function concatMap(project, resultSelector) {
	    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
	}
	exports.concatMap = concatMap;
	//# sourceMappingURL=concatMap.js.map

/***/ },
/* 405 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(38);
	var every_1 = __webpack_require__(406);
	Observable_1.Observable.prototype.every = every_1.every;
	//# sourceMappingURL=every.js.map

/***/ },
/* 406 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1 = __webpack_require__(42);
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
/* 407 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(38);
	var mergeAll_1 = __webpack_require__(367);
	Observable_1.Observable.prototype.mergeAll = mergeAll_1.mergeAll;
	//# sourceMappingURL=mergeAll.js.map

/***/ },
/* 408 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(38);
	var from_1 = __webpack_require__(409);
	Observable_1.Observable.from = from_1.from;
	//# sourceMappingURL=from.js.map

/***/ },
/* 409 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var FromObservable_1 = __webpack_require__(410);
	exports.from = FromObservable_1.FromObservable.create;
	//# sourceMappingURL=from.js.map

/***/ },
/* 410 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isArray_1 = __webpack_require__(45);
	var isFunction_1 = __webpack_require__(43);
	var isPromise_1 = __webpack_require__(370);
	var isScheduler_1 = __webpack_require__(358);
	var PromiseObservable_1 = __webpack_require__(57);
	var IteratorObservable_1 = __webpack_require__(411);
	var ArrayObservable_1 = __webpack_require__(355);
	var ArrayLikeObservable_1 = __webpack_require__(412);
	var iterator_1 = __webpack_require__(371);
	var Observable_1 = __webpack_require__(38);
	var observeOn_1 = __webpack_require__(413);
	var $$observable = __webpack_require__(52);
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
	     * @param {function(x: any, i: number): T} [mapFn] A "map" function to call
	     * when converting array-like objects, where `x` is a value from the
	     * array-like and `i` is the index of that value in the sequence.
	     * @param {any} [thisArg] The context object to use when calling the `mapFn`,
	     * if provided.
	     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
	     * emissions of values.
	     * @return {Observable<T>} The Observable whose values are originally from the
	     * input object that was converted.
	     * @static true
	     * @name from
	     * @owner Observable
	     */
	    FromObservable.create = function (ish, mapFnOrScheduler, thisArg, lastScheduler) {
	        var scheduler = null;
	        var mapFn = null;
	        if (isFunction_1.isFunction(mapFnOrScheduler)) {
	            scheduler = lastScheduler || null;
	            mapFn = mapFnOrScheduler;
	        }
	        else if (isScheduler_1.isScheduler(scheduler)) {
	            scheduler = mapFnOrScheduler;
	        }
	        if (ish != null) {
	            if (typeof ish[$$observable] === 'function') {
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
	                return new IteratorObservable_1.IteratorObservable(ish, null, null, scheduler);
	            }
	            else if (isArrayLike(ish)) {
	                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, mapFn, thisArg, scheduler);
	            }
	        }
	        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
	    };
	    FromObservable.prototype._subscribe = function (subscriber) {
	        var ish = this.ish;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            return ish[$$observable]().subscribe(subscriber);
	        }
	        else {
	            return ish[$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
	        }
	    };
	    return FromObservable;
	}(Observable_1.Observable));
	exports.FromObservable = FromObservable;
	//# sourceMappingURL=FromObservable.js.map

/***/ },
/* 411 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1 = __webpack_require__(39);
	var isObject_1 = __webpack_require__(46);
	var tryCatch_1 = __webpack_require__(47);
	var Observable_1 = __webpack_require__(38);
	var isFunction_1 = __webpack_require__(43);
	var iterator_1 = __webpack_require__(371);
	var errorObject_1 = __webpack_require__(48);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var IteratorObservable = (function (_super) {
	    __extends(IteratorObservable, _super);
	    function IteratorObservable(iterator, project, thisArg, scheduler) {
	        _super.call(this);
	        if (iterator == null) {
	            throw new Error('iterator cannot be null.');
	        }
	        if (isObject_1.isObject(project)) {
	            this.thisArg = project;
	            this.scheduler = thisArg;
	        }
	        else if (isFunction_1.isFunction(project)) {
	            this.project = project;
	            this.thisArg = thisArg;
	            this.scheduler = scheduler;
	        }
	        else if (project != null) {
	            throw new Error('When provided, `project` must be a function.');
	        }
	        this.iterator = getIterator(iterator);
	    }
	    IteratorObservable.create = function (iterator, project, thisArg, scheduler) {
	        return new IteratorObservable(iterator, project, thisArg, scheduler);
	    };
	    IteratorObservable.dispatch = function (state) {
	        var index = state.index, hasError = state.hasError, thisArg = state.thisArg, project = state.project, iterator = state.iterator, subscriber = state.subscriber;
	        if (hasError) {
	            subscriber.error(state.error);
	            return;
	        }
	        var result = iterator.next();
	        if (result.done) {
	            subscriber.complete();
	            return;
	        }
	        if (project) {
	            result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index);
	            if (result === errorObject_1.errorObject) {
	                state.error = errorObject_1.errorObject.e;
	                state.hasError = true;
	            }
	            else {
	                subscriber.next(result);
	                state.index = index + 1;
	            }
	        }
	        else {
	            subscriber.next(result.value);
	            state.index = index + 1;
	        }
	        if (subscriber.isUnsubscribed) {
	            return;
	        }
	        this.schedule(state);
	    };
	    IteratorObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this, iterator = _a.iterator, project = _a.project, thisArg = _a.thisArg, scheduler = _a.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(IteratorObservable.dispatch, 0, {
	                index: index, thisArg: thisArg, project: project, iterator: iterator, subscriber: subscriber
	            });
	        }
	        else {
	            do {
	                var result = iterator.next();
	                if (result.done) {
	                    subscriber.complete();
	                    break;
	                }
	                else if (project) {
	                    result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index++);
	                    if (result === errorObject_1.errorObject) {
	                        subscriber.error(errorObject_1.errorObject.e);
	                        break;
	                    }
	                    subscriber.next(result);
	                }
	                else {
	                    subscriber.next(result.value);
	                }
	                if (subscriber.isUnsubscribed) {
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
	        throw new TypeError('Object is not iterable');
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
/* 412 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1 = __webpack_require__(38);
	var ScalarObservable_1 = __webpack_require__(356);
	var EmptyObservable_1 = __webpack_require__(357);
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayLikeObservable = (function (_super) {
	    __extends(ArrayLikeObservable, _super);
	    function ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler) {
	        _super.call(this);
	        this.arrayLike = arrayLike;
	        this.scheduler = scheduler;
	        if (!mapFn && !scheduler && arrayLike.length === 1) {
	            this._isScalar = true;
	            this.value = arrayLike[0];
	        }
	        if (mapFn) {
	            this.mapFn = mapFn.bind(thisArg);
	        }
	    }
	    ArrayLikeObservable.create = function (arrayLike, mapFn, thisArg, scheduler) {
	        var length = arrayLike.length;
	        if (length === 0) {
	            return new EmptyObservable_1.EmptyObservable();
	        }
	        else if (length === 1 && !mapFn) {
	            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
	        }
	        else {
	            return new ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler);
	        }
	    };
	    ArrayLikeObservable.dispatch = function (state) {
	        var arrayLike = state.arrayLike, index = state.index, length = state.length, mapFn = state.mapFn, subscriber = state.subscriber;
	        if (subscriber.isUnsubscribed) {
	            return;
	        }
	        if (index >= length) {
	            subscriber.complete();
	            return;
	        }
	        var result = mapFn ? mapFn(arrayLike[index], index) : arrayLike[index];
	        subscriber.next(result);
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this, arrayLike = _a.arrayLike, mapFn = _a.mapFn, scheduler = _a.scheduler;
	        var length = arrayLike.length;
	        if (scheduler) {
	            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
	                arrayLike: arrayLike, index: index, length: length, mapFn: mapFn, subscriber: subscriber
	            });
	        }
	        else {
	            for (var i = 0; i < length && !subscriber.isUnsubscribed; i++) {
	                var result = mapFn ? mapFn(arrayLike[i], i) : arrayLike[i];
	                subscriber.next(result);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayLikeObservable;
	}(Observable_1.Observable));
	exports.ArrayLikeObservable = ArrayLikeObservable;
	//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ },
/* 413 */,
/* 414 */,
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(38);
	var of_1 = __webpack_require__(354);
	var shared_1 = __webpack_require__(416);
	var url_tree_1 = __webpack_require__(417);
	var NoMatch = (function () {
	    function NoMatch(segment) {
	        if (segment === void 0) { segment = null; }
	        this.segment = segment;
	    }
	    return NoMatch;
	}());
	var GlobalRedirect = (function () {
	    function GlobalRedirect(paths) {
	        this.paths = paths;
	    }
	    return GlobalRedirect;
	}());
	function applyRedirects(urlTree, config) {
	    try {
	        return createUrlTree(urlTree, expandSegment(config, urlTree.root, shared_1.PRIMARY_OUTLET));
	    }
	    catch (e) {
	        if (e instanceof GlobalRedirect) {
	            return createUrlTree(urlTree, new url_tree_1.UrlSegment([], (_a = {}, _a[shared_1.PRIMARY_OUTLET] = new url_tree_1.UrlSegment(e.paths, {}), _a)));
	        }
	        else if (e instanceof NoMatch) {
	            return new Observable_1.Observable(function (obs) {
	                return obs.error(new Error("Cannot match any routes: '" + e.segment + "'"));
	            });
	        }
	        else {
	            return new Observable_1.Observable(function (obs) { return obs.error(e); });
	        }
	    }
	    var _a;
	}
	exports.applyRedirects = applyRedirects;
	function createUrlTree(urlTree, root) {
	    return of_1.of(new url_tree_1.UrlTree(root, urlTree.queryParams, urlTree.fragment));
	}
	function expandSegment(routes, segment, outlet) {
	    if (segment.pathsWithParams.length === 0 && Object.keys(segment.children).length > 0) {
	        return new url_tree_1.UrlSegment([], expandSegmentChildren(routes, segment));
	    }
	    else {
	        return expandPathsWithParams(segment, routes, segment.pathsWithParams, outlet, true);
	    }
	}
	function expandSegmentChildren(routes, segment) {
	    return url_tree_1.mapChildren(segment, function (child, childOutlet) { return expandSegment(routes, child, childOutlet); });
	}
	function expandPathsWithParams(segment, routes, paths, outlet, allowRedirects) {
	    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
	        var r = routes_1[_i];
	        try {
	            return expandPathsWithParamsAgainstRoute(segment, routes, r, paths, outlet, allowRedirects);
	        }
	        catch (e) {
	            if (!(e instanceof NoMatch))
	                throw e;
	        }
	    }
	    throw new NoMatch(segment);
	}
	function expandPathsWithParamsAgainstRoute(segment, routes, route, paths, outlet, allowRedirects) {
	    if ((route.outlet ? route.outlet : shared_1.PRIMARY_OUTLET) !== outlet)
	        throw new NoMatch();
	    if (route.redirectTo && !allowRedirects)
	        throw new NoMatch();
	    if (route.redirectTo) {
	        return expandPathsWithParamsAgainstRouteUsingRedirect(segment, routes, route, paths, outlet);
	    }
	    else {
	        return matchPathsWithParamsAgainstRoute(segment, route, paths);
	    }
	}
	function expandPathsWithParamsAgainstRouteUsingRedirect(segment, routes, route, paths, outlet) {
	    if (route.path === '**') {
	        return expandWildCardWithParamsAgainstRouteUsingRedirect(route);
	    }
	    else {
	        return expandRegularPathWithParamsAgainstRouteUsingRedirect(segment, routes, route, paths, outlet);
	    }
	}
	function expandWildCardWithParamsAgainstRouteUsingRedirect(route) {
	    var newPaths = applyRedirectCommands([], route.redirectTo, {});
	    if (route.redirectTo.startsWith('/')) {
	        throw new GlobalRedirect(newPaths);
	    }
	    else {
	        return new url_tree_1.UrlSegment(newPaths, {});
	    }
	}
	function expandRegularPathWithParamsAgainstRouteUsingRedirect(segment, routes, route, paths, outlet) {
	    var _a = match(segment, route, paths), consumedPaths = _a.consumedPaths, lastChild = _a.lastChild, positionalParamSegments = _a.positionalParamSegments;
	    var newPaths = applyRedirectCommands(consumedPaths, route.redirectTo, positionalParamSegments);
	    if (route.redirectTo.startsWith('/')) {
	        throw new GlobalRedirect(newPaths);
	    }
	    else {
	        return expandPathsWithParams(segment, routes, newPaths.concat(paths.slice(lastChild)), outlet, false);
	    }
	}
	function matchPathsWithParamsAgainstRoute(segment, route, paths) {
	    if (route.path === '**') {
	        return new url_tree_1.UrlSegment(paths, {});
	    }
	    else {
	        var _a = match(segment, route, paths), consumedPaths = _a.consumedPaths, lastChild = _a.lastChild;
	        var childConfig = route.children ? route.children : [];
	        var slicedPath = paths.slice(lastChild);
	        if (childConfig.length === 0 && slicedPath.length === 0) {
	            return new url_tree_1.UrlSegment(consumedPaths, {});
	        }
	        else if (slicedPath.length === 0 && Object.keys(segment.children).length > 0) {
	            var children = expandSegmentChildren(childConfig, segment);
	            return new url_tree_1.UrlSegment(consumedPaths, children);
	        }
	        else {
	            var cs = expandPathsWithParams(segment, childConfig, slicedPath, shared_1.PRIMARY_OUTLET, true);
	            return new url_tree_1.UrlSegment(consumedPaths.concat(cs.pathsWithParams), cs.children);
	        }
	    }
	}
	function match(segment, route, paths) {
	    if (route.path === '') {
	        if (route.terminal && (Object.keys(segment.children).length > 0 || paths.length > 0)) {
	            throw new NoMatch();
	        }
	        else {
	            return { consumedPaths: [], lastChild: 0, positionalParamSegments: {} };
	        }
	    }
	    var path = route.path;
	    var parts = path.split('/');
	    var positionalParamSegments = {};
	    var consumedPaths = [];
	    var currentIndex = 0;
	    for (var i = 0; i < parts.length; ++i) {
	        if (currentIndex >= paths.length)
	            throw new NoMatch();
	        var current = paths[currentIndex];
	        var p = parts[i];
	        var isPosParam = p.startsWith(':');
	        if (!isPosParam && p !== current.path)
	            throw new NoMatch();
	        if (isPosParam) {
	            positionalParamSegments[p.substring(1)] = current;
	        }
	        consumedPaths.push(current);
	        currentIndex++;
	    }
	    if (route.terminal && (Object.keys(segment.children).length > 0 || currentIndex < paths.length)) {
	        throw new NoMatch();
	    }
	    return { consumedPaths: consumedPaths, lastChild: currentIndex, positionalParamSegments: positionalParamSegments };
	}
	function applyRedirectCommands(paths, redirectTo, posParams) {
	    if (redirectTo.startsWith('/')) {
	        var parts = redirectTo.substring(1).split('/');
	        return createPaths(redirectTo, parts, paths, posParams);
	    }
	    else {
	        var parts = redirectTo.split('/');
	        return createPaths(redirectTo, parts, paths, posParams);
	    }
	}
	function createPaths(redirectTo, parts, segments, posParams) {
	    return parts.map(function (p) { return p.startsWith(':') ? findPosParam(p, posParams, redirectTo) :
	        findOrCreatePath(p, segments); });
	}
	function findPosParam(part, posParams, redirectTo) {
	    var paramName = part.substring(1);
	    var pos = posParams[paramName];
	    if (!pos)
	        throw new Error("Cannot redirect to '" + redirectTo + "'. Cannot find '" + part + "'.");
	    return pos;
	}
	function findOrCreatePath(part, paths) {
	    var matchingIndex = paths.findIndex(function (s) { return s.path === part; });
	    if (matchingIndex > -1) {
	        var r = paths[matchingIndex];
	        paths.splice(matchingIndex);
	        return r;
	    }
	    else {
	        return new url_tree_1.UrlPathWithParams(part, {});
	    }
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHlfcmVkaXJlY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcGx5X3JlZGlyZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFFM0MsbUJBQWtCLG9CQUFvQixDQUFDLENBQUE7QUFHdkMsdUJBQTZCLFVBQVUsQ0FBQyxDQUFBO0FBQ3hDLHlCQUFrRSxZQUFZLENBQUMsQ0FBQTtBQUUvRTtJQUNFLGlCQUFtQixPQUEwQjtRQUFqQyx1QkFBaUMsR0FBakMsY0FBaUM7UUFBMUIsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7SUFBRyxDQUFDO0lBQ25ELGNBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUNEO0lBQ0Usd0JBQW1CLEtBQTBCO1FBQTFCLFVBQUssR0FBTCxLQUFLLENBQXFCO0lBQUcsQ0FBQztJQUNuRCxxQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRUQsd0JBQStCLE9BQWdCLEVBQUUsTUFBb0I7SUFDbkUsSUFBSSxDQUFDO1FBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLHVCQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUU7SUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FDaEIsT0FBTyxFQUFFLElBQUkscUJBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBQyxHQUFDLHVCQUFjLENBQUMsR0FBRSxJQUFJLHFCQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxPQUFPLENB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Q0FBQztRQUN0QyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBRGpELENBQ2lELENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsc0JBQ0ksSUFBWSxFQUFFLFNBQTJDLEVBQ3pELFVBQWtCO0lBQ3BCLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBdUIsVUFBVSx3QkFBbUIsSUFBSSxPQUFJLENBQUMsQ0FBQztJQUN4RixNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELDBCQUEwQixJQUFZLEVBQUUsS0FBMEI7SUFDaEUsSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQzVELEVBQUUsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9CLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxJQUFJLDRCQUFpQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuaW1wb3J0IHtvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5cbmltcG9ydCB7Um91dGUsIFJvdXRlckNvbmZpZ30gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtQUklNQVJZX09VVExFVH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtVcmxQYXRoV2l0aFBhcmFtcywgVXJsU2VnbWVudCwgVXJsVHJlZSwgbWFwQ2hpbGRyZW59IGZyb20gJy4vdXJsX3RyZWUnO1xuXG5jbGFzcyBOb01hdGNoIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNlZ21lbnQ6IFVybFNlZ21lbnQgPSBudWxsKSB7fVxufVxuY2xhc3MgR2xvYmFsUmVkaXJlY3Qge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF0aHM6IFVybFBhdGhXaXRoUGFyYW1zW10pIHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVJlZGlyZWN0cyh1cmxUcmVlOiBVcmxUcmVlLCBjb25maWc6IFJvdXRlckNvbmZpZyk6IE9ic2VydmFibGU8VXJsVHJlZT4ge1xuICB0cnkge1xuICAgIHJldHVybiBjcmVhdGVVcmxUcmVlKHVybFRyZWUsIGV4cGFuZFNlZ21lbnQoY29uZmlnLCB1cmxUcmVlLnJvb3QsIFBSSU1BUllfT1VUTEVUKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIEdsb2JhbFJlZGlyZWN0KSB7XG4gICAgICByZXR1cm4gY3JlYXRlVXJsVHJlZShcbiAgICAgICAgICB1cmxUcmVlLCBuZXcgVXJsU2VnbWVudChbXSwge1tQUklNQVJZX09VVExFVF06IG5ldyBVcmxTZWdtZW50KGUucGF0aHMsIHt9KX0pKTtcbiAgICB9IGVsc2UgaWYgKGUgaW5zdGFuY2VvZiBOb01hdGNoKSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8VXJsVHJlZT4oXG4gICAgICAgICAgKG9iczogT2JzZXJ2ZXI8VXJsVHJlZT4pID0+XG4gICAgICAgICAgICAgIG9icy5lcnJvcihuZXcgRXJyb3IoYENhbm5vdCBtYXRjaCBhbnkgcm91dGVzOiAnJHtlLnNlZ21lbnR9J2ApKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxVcmxUcmVlPigob2JzOiBPYnNlcnZlcjxVcmxUcmVlPikgPT4gb2JzLmVycm9yKGUpKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVXJsVHJlZSh1cmxUcmVlOiBVcmxUcmVlLCByb290OiBVcmxTZWdtZW50KTogT2JzZXJ2YWJsZTxVcmxUcmVlPiB7XG4gIHJldHVybiBvZiAobmV3IFVybFRyZWUocm9vdCwgdXJsVHJlZS5xdWVyeVBhcmFtcywgdXJsVHJlZS5mcmFnbWVudCkpO1xufVxuXG5mdW5jdGlvbiBleHBhbmRTZWdtZW50KHJvdXRlczogUm91dGVbXSwgc2VnbWVudDogVXJsU2VnbWVudCwgb3V0bGV0OiBzdHJpbmcpOiBVcmxTZWdtZW50IHtcbiAgaWYgKHNlZ21lbnQucGF0aHNXaXRoUGFyYW1zLmxlbmd0aCA9PT0gMCAmJiBPYmplY3Qua2V5cyhzZWdtZW50LmNoaWxkcmVuKS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIG5ldyBVcmxTZWdtZW50KFtdLCBleHBhbmRTZWdtZW50Q2hpbGRyZW4ocm91dGVzLCBzZWdtZW50KSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGV4cGFuZFBhdGhzV2l0aFBhcmFtcyhzZWdtZW50LCByb3V0ZXMsIHNlZ21lbnQucGF0aHNXaXRoUGFyYW1zLCBvdXRsZXQsIHRydWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4cGFuZFNlZ21lbnRDaGlsZHJlbihyb3V0ZXM6IFJvdXRlW10sIHNlZ21lbnQ6IFVybFNlZ21lbnQpOiB7W25hbWU6IHN0cmluZ106IFVybFNlZ21lbnR9IHtcbiAgcmV0dXJuIG1hcENoaWxkcmVuKHNlZ21lbnQsIChjaGlsZCwgY2hpbGRPdXRsZXQpID0+IGV4cGFuZFNlZ21lbnQocm91dGVzLCBjaGlsZCwgY2hpbGRPdXRsZXQpKTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kUGF0aHNXaXRoUGFyYW1zKFxuICAgIHNlZ21lbnQ6IFVybFNlZ21lbnQsIHJvdXRlczogUm91dGVbXSwgcGF0aHM6IFVybFBhdGhXaXRoUGFyYW1zW10sIG91dGxldDogc3RyaW5nLFxuICAgIGFsbG93UmVkaXJlY3RzOiBib29sZWFuKTogVXJsU2VnbWVudCB7XG4gIGZvciAobGV0IHIgb2Ygcm91dGVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBleHBhbmRQYXRoc1dpdGhQYXJhbXNBZ2FpbnN0Um91dGUoc2VnbWVudCwgcm91dGVzLCByLCBwYXRocywgb3V0bGV0LCBhbGxvd1JlZGlyZWN0cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIE5vTWF0Y2gpKSB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgTm9NYXRjaChzZWdtZW50KTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kUGF0aHNXaXRoUGFyYW1zQWdhaW5zdFJvdXRlKFxuICAgIHNlZ21lbnQ6IFVybFNlZ21lbnQsIHJvdXRlczogUm91dGVbXSwgcm91dGU6IFJvdXRlLCBwYXRoczogVXJsUGF0aFdpdGhQYXJhbXNbXSwgb3V0bGV0OiBzdHJpbmcsXG4gICAgYWxsb3dSZWRpcmVjdHM6IGJvb2xlYW4pOiBVcmxTZWdtZW50IHtcbiAgaWYgKChyb3V0ZS5vdXRsZXQgPyByb3V0ZS5vdXRsZXQgOiBQUklNQVJZX09VVExFVCkgIT09IG91dGxldCkgdGhyb3cgbmV3IE5vTWF0Y2goKTtcbiAgaWYgKHJvdXRlLnJlZGlyZWN0VG8gJiYgIWFsbG93UmVkaXJlY3RzKSB0aHJvdyBuZXcgTm9NYXRjaCgpO1xuXG4gIGlmIChyb3V0ZS5yZWRpcmVjdFRvKSB7XG4gICAgcmV0dXJuIGV4cGFuZFBhdGhzV2l0aFBhcmFtc0FnYWluc3RSb3V0ZVVzaW5nUmVkaXJlY3Qoc2VnbWVudCwgcm91dGVzLCByb3V0ZSwgcGF0aHMsIG91dGxldCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG1hdGNoUGF0aHNXaXRoUGFyYW1zQWdhaW5zdFJvdXRlKHNlZ21lbnQsIHJvdXRlLCBwYXRocyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhwYW5kUGF0aHNXaXRoUGFyYW1zQWdhaW5zdFJvdXRlVXNpbmdSZWRpcmVjdChcbiAgICBzZWdtZW50OiBVcmxTZWdtZW50LCByb3V0ZXM6IFJvdXRlW10sIHJvdXRlOiBSb3V0ZSwgcGF0aHM6IFVybFBhdGhXaXRoUGFyYW1zW10sXG4gICAgb3V0bGV0OiBzdHJpbmcpOiBVcmxTZWdtZW50IHtcbiAgaWYgKHJvdXRlLnBhdGggPT09ICcqKicpIHtcbiAgICByZXR1cm4gZXhwYW5kV2lsZENhcmRXaXRoUGFyYW1zQWdhaW5zdFJvdXRlVXNpbmdSZWRpcmVjdChyb3V0ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGV4cGFuZFJlZ3VsYXJQYXRoV2l0aFBhcmFtc0FnYWluc3RSb3V0ZVVzaW5nUmVkaXJlY3QoXG4gICAgICAgIHNlZ21lbnQsIHJvdXRlcywgcm91dGUsIHBhdGhzLCBvdXRsZXQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4cGFuZFdpbGRDYXJkV2l0aFBhcmFtc0FnYWluc3RSb3V0ZVVzaW5nUmVkaXJlY3Qocm91dGU6IFJvdXRlKTogVXJsU2VnbWVudCB7XG4gIGNvbnN0IG5ld1BhdGhzID0gYXBwbHlSZWRpcmVjdENvbW1hbmRzKFtdLCByb3V0ZS5yZWRpcmVjdFRvLCB7fSk7XG4gIGlmIChyb3V0ZS5yZWRpcmVjdFRvLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgIHRocm93IG5ldyBHbG9iYWxSZWRpcmVjdChuZXdQYXRocyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBVcmxTZWdtZW50KG5ld1BhdGhzLCB7fSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhwYW5kUmVndWxhclBhdGhXaXRoUGFyYW1zQWdhaW5zdFJvdXRlVXNpbmdSZWRpcmVjdChcbiAgICBzZWdtZW50OiBVcmxTZWdtZW50LCByb3V0ZXM6IFJvdXRlW10sIHJvdXRlOiBSb3V0ZSwgcGF0aHM6IFVybFBhdGhXaXRoUGFyYW1zW10sXG4gICAgb3V0bGV0OiBzdHJpbmcpOiBVcmxTZWdtZW50IHtcbiAgY29uc3Qge2NvbnN1bWVkUGF0aHMsIGxhc3RDaGlsZCwgcG9zaXRpb25hbFBhcmFtU2VnbWVudHN9ID0gbWF0Y2goc2VnbWVudCwgcm91dGUsIHBhdGhzKTtcbiAgY29uc3QgbmV3UGF0aHMgPVxuICAgICAgYXBwbHlSZWRpcmVjdENvbW1hbmRzKGNvbnN1bWVkUGF0aHMsIHJvdXRlLnJlZGlyZWN0VG8sIDxhbnk+cG9zaXRpb25hbFBhcmFtU2VnbWVudHMpO1xuICBpZiAocm91dGUucmVkaXJlY3RUby5zdGFydHNXaXRoKCcvJykpIHtcbiAgICB0aHJvdyBuZXcgR2xvYmFsUmVkaXJlY3QobmV3UGF0aHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBleHBhbmRQYXRoc1dpdGhQYXJhbXMoXG4gICAgICAgIHNlZ21lbnQsIHJvdXRlcywgbmV3UGF0aHMuY29uY2F0KHBhdGhzLnNsaWNlKGxhc3RDaGlsZCkpLCBvdXRsZXQsIGZhbHNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXRjaFBhdGhzV2l0aFBhcmFtc0FnYWluc3RSb3V0ZShcbiAgICBzZWdtZW50OiBVcmxTZWdtZW50LCByb3V0ZTogUm91dGUsIHBhdGhzOiBVcmxQYXRoV2l0aFBhcmFtc1tdKTogVXJsU2VnbWVudCB7XG4gIGlmIChyb3V0ZS5wYXRoID09PSAnKionKSB7XG4gICAgcmV0dXJuIG5ldyBVcmxTZWdtZW50KHBhdGhzLCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qge2NvbnN1bWVkUGF0aHMsIGxhc3RDaGlsZH0gPSBtYXRjaChzZWdtZW50LCByb3V0ZSwgcGF0aHMpO1xuICAgIGNvbnN0IGNoaWxkQ29uZmlnID0gcm91dGUuY2hpbGRyZW4gPyByb3V0ZS5jaGlsZHJlbiA6IFtdO1xuICAgIGNvbnN0IHNsaWNlZFBhdGggPSBwYXRocy5zbGljZShsYXN0Q2hpbGQpO1xuXG4gICAgaWYgKGNoaWxkQ29uZmlnLmxlbmd0aCA9PT0gMCAmJiBzbGljZWRQYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG5ldyBVcmxTZWdtZW50KGNvbnN1bWVkUGF0aHMsIHt9KTtcblxuICAgICAgLy8gVE9ETzogY2hlY2sgdGhhdCB0aGUgcmlnaHQgc2VnbWVudCBpcyBwcmVzZW50XG4gICAgfSBlbHNlIGlmIChzbGljZWRQYXRoLmxlbmd0aCA9PT0gMCAmJiBPYmplY3Qua2V5cyhzZWdtZW50LmNoaWxkcmVuKS5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGV4cGFuZFNlZ21lbnRDaGlsZHJlbihjaGlsZENvbmZpZywgc2VnbWVudCk7XG4gICAgICByZXR1cm4gbmV3IFVybFNlZ21lbnQoY29uc3VtZWRQYXRocywgY2hpbGRyZW4pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNzID0gZXhwYW5kUGF0aHNXaXRoUGFyYW1zKHNlZ21lbnQsIGNoaWxkQ29uZmlnLCBzbGljZWRQYXRoLCBQUklNQVJZX09VVExFVCwgdHJ1ZSk7XG4gICAgICByZXR1cm4gbmV3IFVybFNlZ21lbnQoY29uc3VtZWRQYXRocy5jb25jYXQoY3MucGF0aHNXaXRoUGFyYW1zKSwgY3MuY2hpbGRyZW4pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtYXRjaChzZWdtZW50OiBVcmxTZWdtZW50LCByb3V0ZTogUm91dGUsIHBhdGhzOiBVcmxQYXRoV2l0aFBhcmFtc1tdKToge1xuICBjb25zdW1lZFBhdGhzOiBVcmxQYXRoV2l0aFBhcmFtc1tdLFxuICBsYXN0Q2hpbGQ6IG51bWJlcixcbiAgcG9zaXRpb25hbFBhcmFtU2VnbWVudHM6IHtbazogc3RyaW5nXTogVXJsUGF0aFdpdGhQYXJhbXN9XG59IHtcbiAgaWYgKHJvdXRlLnBhdGggPT09ICcnKSB7XG4gICAgaWYgKHJvdXRlLnRlcm1pbmFsICYmIChPYmplY3Qua2V5cyhzZWdtZW50LmNoaWxkcmVuKS5sZW5ndGggPiAwIHx8IHBhdGhzLmxlbmd0aCA+IDApKSB7XG4gICAgICB0aHJvdyBuZXcgTm9NYXRjaCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge2NvbnN1bWVkUGF0aHM6IFtdLCBsYXN0Q2hpbGQ6IDAsIHBvc2l0aW9uYWxQYXJhbVNlZ21lbnRzOiB7fX07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGF0aCA9IHJvdXRlLnBhdGg7XG4gIGNvbnN0IHBhcnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICBjb25zdCBwb3NpdGlvbmFsUGFyYW1TZWdtZW50czoge1trOiBzdHJpbmddOiBVcmxQYXRoV2l0aFBhcmFtc30gPSB7fTtcbiAgY29uc3QgY29uc3VtZWRQYXRoczogVXJsUGF0aFdpdGhQYXJhbXNbXSA9IFtdO1xuXG4gIGxldCBjdXJyZW50SW5kZXggPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoY3VycmVudEluZGV4ID49IHBhdGhzLmxlbmd0aCkgdGhyb3cgbmV3IE5vTWF0Y2goKTtcbiAgICBjb25zdCBjdXJyZW50ID0gcGF0aHNbY3VycmVudEluZGV4XTtcblxuICAgIGNvbnN0IHAgPSBwYXJ0c1tpXTtcbiAgICBjb25zdCBpc1Bvc1BhcmFtID0gcC5zdGFydHNXaXRoKCc6Jyk7XG5cbiAgICBpZiAoIWlzUG9zUGFyYW0gJiYgcCAhPT0gY3VycmVudC5wYXRoKSB0aHJvdyBuZXcgTm9NYXRjaCgpO1xuICAgIGlmIChpc1Bvc1BhcmFtKSB7XG4gICAgICBwb3NpdGlvbmFsUGFyYW1TZWdtZW50c1twLnN1YnN0cmluZygxKV0gPSBjdXJyZW50O1xuICAgIH1cbiAgICBjb25zdW1lZFBhdGhzLnB1c2goY3VycmVudCk7XG4gICAgY3VycmVudEluZGV4Kys7XG4gIH1cblxuICBpZiAocm91dGUudGVybWluYWwgJiYgKE9iamVjdC5rZXlzKHNlZ21lbnQuY2hpbGRyZW4pLmxlbmd0aCA+IDAgfHwgY3VycmVudEluZGV4IDwgcGF0aHMubGVuZ3RoKSkge1xuICAgIHRocm93IG5ldyBOb01hdGNoKCk7XG4gIH1cblxuICByZXR1cm4ge2NvbnN1bWVkUGF0aHMsIGxhc3RDaGlsZDogY3VycmVudEluZGV4LCBwb3NpdGlvbmFsUGFyYW1TZWdtZW50c307XG59XG5cbmZ1bmN0aW9uIGFwcGx5UmVkaXJlY3RDb21tYW5kcyhcbiAgICBwYXRoczogVXJsUGF0aFdpdGhQYXJhbXNbXSwgcmVkaXJlY3RUbzogc3RyaW5nLFxuICAgIHBvc1BhcmFtczoge1trOiBzdHJpbmddOiBVcmxQYXRoV2l0aFBhcmFtc30pOiBVcmxQYXRoV2l0aFBhcmFtc1tdIHtcbiAgaWYgKHJlZGlyZWN0VG8uc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgY29uc3QgcGFydHMgPSByZWRpcmVjdFRvLnN1YnN0cmluZygxKS5zcGxpdCgnLycpO1xuICAgIHJldHVybiBjcmVhdGVQYXRocyhyZWRpcmVjdFRvLCBwYXJ0cywgcGF0aHMsIHBvc1BhcmFtcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcGFydHMgPSByZWRpcmVjdFRvLnNwbGl0KCcvJyk7XG4gICAgcmV0dXJuIGNyZWF0ZVBhdGhzKHJlZGlyZWN0VG8sIHBhcnRzLCBwYXRocywgcG9zUGFyYW1zKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQYXRocyhcbiAgICByZWRpcmVjdFRvOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSwgc2VnbWVudHM6IFVybFBhdGhXaXRoUGFyYW1zW10sXG4gICAgcG9zUGFyYW1zOiB7W2s6IHN0cmluZ106IFVybFBhdGhXaXRoUGFyYW1zfSk6IFVybFBhdGhXaXRoUGFyYW1zW10ge1xuICByZXR1cm4gcGFydHMubWFwKFxuICAgICAgcCA9PiBwLnN0YXJ0c1dpdGgoJzonKSA/IGZpbmRQb3NQYXJhbShwLCBwb3NQYXJhbXMsIHJlZGlyZWN0VG8pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5kT3JDcmVhdGVQYXRoKHAsIHNlZ21lbnRzKSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRQb3NQYXJhbShcbiAgICBwYXJ0OiBzdHJpbmcsIHBvc1BhcmFtczoge1trOiBzdHJpbmddOiBVcmxQYXRoV2l0aFBhcmFtc30sXG4gICAgcmVkaXJlY3RUbzogc3RyaW5nKTogVXJsUGF0aFdpdGhQYXJhbXMge1xuICBjb25zdCBwYXJhbU5hbWUgPSBwYXJ0LnN1YnN0cmluZygxKTtcbiAgY29uc3QgcG9zID0gcG9zUGFyYW1zW3BhcmFtTmFtZV07XG4gIGlmICghcG9zKSB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCByZWRpcmVjdCB0byAnJHtyZWRpcmVjdFRvfScuIENhbm5vdCBmaW5kICcke3BhcnR9Jy5gKTtcbiAgcmV0dXJuIHBvcztcbn1cblxuZnVuY3Rpb24gZmluZE9yQ3JlYXRlUGF0aChwYXJ0OiBzdHJpbmcsIHBhdGhzOiBVcmxQYXRoV2l0aFBhcmFtc1tdKTogVXJsUGF0aFdpdGhQYXJhbXMge1xuICBjb25zdCBtYXRjaGluZ0luZGV4ID0gcGF0aHMuZmluZEluZGV4KHMgPT4gcy5wYXRoID09PSBwYXJ0KTtcbiAgaWYgKG1hdGNoaW5nSW5kZXggPiAtMSkge1xuICAgIGNvbnN0IHIgPSBwYXRoc1ttYXRjaGluZ0luZGV4XTtcbiAgICBwYXRocy5zcGxpY2UobWF0Y2hpbmdJbmRleCk7XG4gICAgcmV0dXJuIHI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBVcmxQYXRoV2l0aFBhcmFtcyhwYXJ0LCB7fSk7XG4gIH1cbn1cbiJdfQ==

/***/ },
/* 416 */
/***/ function(module, exports) {

	"use strict";
	exports.PRIMARY_OUTLET = 'PRIMARY_OUTLET';
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NoYXJlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSWEsc0JBQWMsR0FBRyxnQkFBZ0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTmFtZSBvZiB0aGUgcHJpbWFyeSBvdXRsZXQuXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgUFJJTUFSWV9PVVRMRVQgPSAnUFJJTUFSWV9PVVRMRVQnO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBwYXJhbWV0ZXJzLlxuICovXG5leHBvcnQgdHlwZSBQYXJhbXMgPSB7XG4gIFtrZXk6IHN0cmluZ106IGFueVxufTtcbiJdfQ==

/***/ },
/* 417 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var shared_1 = __webpack_require__(416);
	var url_serializer_1 = __webpack_require__(418);
	var collection_1 = __webpack_require__(419);
	function createEmptyUrlTree() {
	    return new UrlTree(new UrlSegment([], {}), {}, null);
	}
	exports.createEmptyUrlTree = createEmptyUrlTree;
	function containsTree(container, containee, exact) {
	    if (exact) {
	        return equalSegments(container.root, containee.root);
	    }
	    else {
	        return containsSegment(container.root, containee.root);
	    }
	}
	exports.containsTree = containsTree;
	function equalSegments(container, containee) {
	    if (!equalPath(container.pathsWithParams, containee.pathsWithParams))
	        return false;
	    if (Object.keys(container.children).length !== Object.keys(containee.children).length)
	        return false;
	    for (var c in containee.children) {
	        if (!container.children[c])
	            return false;
	        if (!equalSegments(container.children[c], containee.children[c]))
	            return false;
	    }
	    return true;
	}
	function containsSegment(container, containee) {
	    return containsSegmentHelper(container, containee, containee.pathsWithParams);
	}
	function containsSegmentHelper(container, containee, containeePaths) {
	    if (container.pathsWithParams.length > containeePaths.length) {
	        var current = container.pathsWithParams.slice(0, containeePaths.length);
	        if (!equalPath(current, containeePaths))
	            return false;
	        if (Object.keys(containee.children).length > 0)
	            return false;
	        return true;
	    }
	    else if (container.pathsWithParams.length === containeePaths.length) {
	        if (!equalPath(container.pathsWithParams, containeePaths))
	            return false;
	        for (var c in containee.children) {
	            if (!container.children[c])
	                return false;
	            if (!containsSegment(container.children[c], containee.children[c]))
	                return false;
	        }
	        return true;
	    }
	    else {
	        var current = containeePaths.slice(0, container.pathsWithParams.length);
	        var next = containeePaths.slice(container.pathsWithParams.length);
	        if (!equalPath(container.pathsWithParams, current))
	            return false;
	        return containsSegmentHelper(container.children[shared_1.PRIMARY_OUTLET], containee, next);
	    }
	}
	var UrlTree = (function () {
	    function UrlTree(root, queryParams, fragment) {
	        this.root = root;
	        this.queryParams = queryParams;
	        this.fragment = fragment;
	    }
	    UrlTree.prototype.toString = function () { return new url_serializer_1.DefaultUrlSerializer().serialize(this); };
	    return UrlTree;
	}());
	exports.UrlTree = UrlTree;
	var UrlSegment = (function () {
	    function UrlSegment(pathsWithParams, children) {
	        var _this = this;
	        this.pathsWithParams = pathsWithParams;
	        this.children = children;
	        this.parent = null;
	        collection_1.forEach(children, function (v, k) { return v.parent = _this; });
	    }
	    UrlSegment.prototype.toString = function () { return url_serializer_1.serializePaths(this); };
	    return UrlSegment;
	}());
	exports.UrlSegment = UrlSegment;
	var UrlPathWithParams = (function () {
	    function UrlPathWithParams(path, parameters) {
	        this.path = path;
	        this.parameters = parameters;
	    }
	    UrlPathWithParams.prototype.toString = function () { return url_serializer_1.serializePath(this); };
	    return UrlPathWithParams;
	}());
	exports.UrlPathWithParams = UrlPathWithParams;
	function equalPathsWithParams(a, b) {
	    if (a.length !== b.length)
	        return false;
	    for (var i = 0; i < a.length; ++i) {
	        if (a[i].path !== b[i].path)
	            return false;
	        if (!collection_1.shallowEqual(a[i].parameters, b[i].parameters))
	            return false;
	    }
	    return true;
	}
	exports.equalPathsWithParams = equalPathsWithParams;
	function equalPath(a, b) {
	    if (a.length !== b.length)
	        return false;
	    for (var i = 0; i < a.length; ++i) {
	        if (a[i].path !== b[i].path)
	            return false;
	    }
	    return true;
	}
	exports.equalPath = equalPath;
	function mapChildren(segment, fn) {
	    var newChildren = {};
	    collection_1.forEach(segment.children, function (child, childOutlet) {
	        if (childOutlet === shared_1.PRIMARY_OUTLET) {
	            newChildren[childOutlet] = fn(child, childOutlet);
	        }
	    });
	    collection_1.forEach(segment.children, function (child, childOutlet) {
	        if (childOutlet !== shared_1.PRIMARY_OUTLET) {
	            newChildren[childOutlet] = fn(child, childOutlet);
	        }
	    });
	    return newChildren;
	}
	exports.mapChildren = mapChildren;
	function mapChildrenIntoArray(segment, fn) {
	    var res = [];
	    collection_1.forEach(segment.children, function (child, childOutlet) {
	        if (childOutlet === shared_1.PRIMARY_OUTLET) {
	            res = res.concat(fn(child, childOutlet));
	        }
	    });
	    collection_1.forEach(segment.children, function (child, childOutlet) {
	        if (childOutlet !== shared_1.PRIMARY_OUTLET) {
	            res = res.concat(fn(child, childOutlet));
	        }
	    });
	    return res;
	}
	exports.mapChildrenIntoArray = mapChildrenIntoArray;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3RyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXJsX3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUE2QixVQUFVLENBQUMsQ0FBQTtBQUN4QywrQkFBa0Usa0JBQWtCLENBQUMsQ0FBQTtBQUNyRiwyQkFBb0Msb0JBQW9CLENBQUMsQ0FBQTtBQUV6RDtJQUNFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFGZSwwQkFBa0IscUJBRWpDLENBQUE7QUFFRCxzQkFBNkIsU0FBa0IsRUFBRSxTQUFrQixFQUFFLEtBQWM7SUFDakYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNWLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0FBQ0gsQ0FBQztBQU5lLG9CQUFZLGVBTTNCLENBQUE7QUFFRCx1QkFBdUIsU0FBcUIsRUFBRSxTQUFxQjtJQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDbkYsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNwRixNQUFN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Q0FBQyxDQUFDLENBQUM7WUFDbkMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDYixDQUFDO0FBZGUsNEJBQW9CLHVCQWNuQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQUklNQVJZX09VVExFVH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtEZWZhdWx0VXJsU2VyaWFsaXplciwgc2VyaWFsaXplUGF0aCwgc2VyaWFsaXplUGF0aHN9IGZyb20gJy4vdXJsX3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtmb3JFYWNoLCBzaGFsbG93RXF1YWx9IGZyb20gJy4vdXRpbHMvY29sbGVjdGlvbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbXB0eVVybFRyZWUoKSB7XG4gIHJldHVybiBuZXcgVXJsVHJlZShuZXcgVXJsU2VnbWVudChbXSwge30pLCB7fSwgbnVsbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluc1RyZWUoY29udGFpbmVyOiBVcmxUcmVlLCBjb250YWluZWU6IFVybFRyZWUsIGV4YWN0OiBib29sZWFuKTogYm9vbGVhbiB7XG4gIGlmIChleGFjdCkge1xuICAgIHJldHVybiBlcXVhbFNlZ21lbnRzKGNvbnRhaW5lci5yb290LCBjb250YWluZWUucm9vdCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnRhaW5zU2VnbWVudChjb250YWluZXIucm9vdCwgY29udGFpbmVlLnJvb3QpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVxdWFsU2VnbWVudHMoY29udGFpbmVyOiBVcmxTZWdtZW50LCBjb250YWluZWU6IFVybFNlZ21lbnQpOiBib29sZWFuIHtcbiAgaWYgKCFlcXVhbFBhdGgoY29udGFpbmVyLnBhdGhzV2l0aFBhcmFtcywgY29udGFpbmVlLnBhdGhzV2l0aFBhcmFtcykpIHJldHVybiBmYWxzZTtcbiAgaWYgKE9iamVjdC5rZXlzKGNvbnRhaW5lci5jaGlsZHJlbikubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhjb250YWluZWUuY2hpbGRyZW4pLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIGZvciAobGV0IGMgaW4gY29udGFpbmVlLmNoaWxkcmVuKSB7XG4gICAgaWYgKCFjb250YWluZXIuY2hpbGRyZW5bY10pIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWVxdWFsU2VnbWVudHMoY29udGFpbmVyLmNoaWxkcmVuW2NdLCBjb250YWluZWUuY2hpbGRyZW5bY10pKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5zU2VnbWVudChjb250YWluZXI6IFVybFNlZ21lbnQsIGNvbnRhaW5lZTogVXJsU2VnbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gY29udGFpbnNTZWdtZW50SGVscGVyKGNvbnRhaW5lciwgY29udGFpbmVlLCBjb250YWluZWUucGF0aHNXaXRoUGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gY29udGFpbnNTZWdtZW50SGVscGVyKFxuICAgIGNvbnRhaW5lcjogVXJsU2VnbWVudCwgY29udGFpbmVlOiBVcmxTZWdtZW50LCBjb250YWluZWVQYXRoczogVXJsUGF0aFdpdGhQYXJhbXNbXSk6IGJvb2xlYW4ge1xuICBpZiAoY29udGFpbmVyLnBhdGhzV2l0aFBhcmFtcy5sZW5ndGggPiBjb250YWluZWVQYXRocy5sZW5ndGgpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gY29udGFpbmVyLnBhdGhzV2l0aFBhcmFtcy5zbGljZSgwLCBjb250YWluZWVQYXRocy5sZW5ndGgpO1xuICAgIGlmICghZXF1YWxQYXRoKGN1cnJlbnQsIGNvbnRhaW5lZVBhdGhzKSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChPYmplY3Qua2V5cyhjb250YWluZWUuY2hpbGRyZW4pLmxlbmd0aCA+IDApIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKGNvbnRhaW5lci5wYXRoc1dpdGhQYXJhbXMubGVuZ3RoID09PSBjb250YWluZWVQYXRocy5sZW5ndGgpIHtcbiAgICBpZiAoIWVxdWFsUGF0aChjb250YWluZXIucGF0aHNXaXRoUGFyYW1zLCBjb250YWluZWVQYXRocykpIHJldHVybiBmYWxzZTtcbiAgICBmb3IgKGxldCBjIGluIGNvbnRhaW5lZS5jaGlsZHJlbikge1xuICAgICAgaWYgKCFjb250YWluZXIuY2hpbGRyZW5bY10pIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghY29udGFpbnNTZWdtZW50KGNvbnRhaW5lci5jaGlsZHJlbltjXSwgY29udGFpbmVlLmNoaWxkcmVuW2NdKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGN1cnJlbnQgPSBjb250YWluZWVQYXRocy5zbGljZSgwLCBjb250YWluZXIucGF0aHNXaXRoUGFyYW1zLmxlbmd0aCk7XG4gICAgY29uc3QgbmV4dCA9IGNvbnRhaW5lZVBhdGhzLnNsaWNlKGNvbnRhaW5lci5wYXRoc1dpdGhQYXJhbXMubGVuZ3RoKTtcbiAgICBpZiAoIWVxdWFsUGF0aChjb250YWluZXIucGF0aHNXaXRoUGFyYW1zLCBjdXJyZW50KSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBjb250YWluc1NlZ21lbnRIZWxwZXIoY29udGFpbmVyLmNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXSwgY29udGFpbmVlLCBuZXh0KTtcbiAgfVxufVxuXG4vKipcbiAqIEEgVVJMIGluIHRoZSB0cmVlIGZvcm0uXG4gKi9cbmV4cG9ydCBjbGFzcyBVcmxUcmVlIHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcm9vdDogVXJsU2VnbWVudCwgcHVibGljIHF1ZXJ5UGFyYW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICAgIHB1YmxpYyBmcmFnbWVudDogc3RyaW5nKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBuZXcgRGVmYXVsdFVybFNlcmlhbGl6ZXIoKS5zZXJpYWxpemUodGhpcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFVybFNlZ21lbnQge1xuICBwdWJsaWMgcGFyZW50OiBVcmxTZWdtZW50ID0gbnVsbDtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcGF0aHNXaXRoUGFyYW1zOiBVcmxQYXRoV2l0aFBhcmFtc1tdLCBwdWJsaWMgY2hpbGRyZW46IHtba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50fSkge1xuICAgIGZvckVhY2goY2hpbGRyZW4sICh2OiBhbnksIGs6IGFueSkgPT4gdi5wYXJlbnQgPSB0aGlzKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBzZXJpYWxpemVQYXRocyh0aGlzKTsgfVxufVxuXG5leHBvcnQgY2xhc3MgVXJsUGF0aFdpdGhQYXJhbXMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF0aDogc3RyaW5nLCBwdWJsaWMgcGFyYW1ldGVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pIHt9XG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7IHJldHVybiBzZXJpYWxpemVQYXRoKHRoaXMpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbFBhdGhzV2l0aFBhcmFtcyhhOiBVcmxQYXRoV2l0aFBhcmFtc1tdLCBiOiBVcmxQYXRoV2l0aFBhcmFtc1tdKTogYm9vbGVhbiB7XG4gIGlmIChhLmxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFbaV0ucGF0aCAhPT0gYltpXS5wYXRoKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFzaGFsbG93RXF1YWwoYVtpXS5wYXJhbWV0ZXJzLCBiW2ldLnBhcmFtZXRlcnMpKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbFBhdGgoYTogVXJsUGF0aFdpdGhQYXJhbXNbXSwgYjogVXJsUGF0aFdpdGhQYXJhbXNbXSk6IGJvb2xlYW4ge1xuICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhW2ldLnBhdGggIT09IGJbaV0ucGF0aCkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFwQ2hpbGRyZW4oc2VnbWVudDogVXJsU2VnbWVudCwgZm46ICh2OiBVcmxTZWdtZW50LCBrOiBzdHJpbmcpID0+IFVybFNlZ21lbnQpOlxuICAgIHtbbmFtZTogc3RyaW5nXTogVXJsU2VnbWVudH0ge1xuICBjb25zdCBuZXdDaGlsZHJlbjoge1tuYW1lOiBzdHJpbmddOiBVcmxTZWdtZW50fSA9IHt9O1xuICBmb3JFYWNoKHNlZ21lbnQuY2hpbGRyZW4sIChjaGlsZDogVXJsU2VnbWVudCwgY2hpbGRPdXRsZXQ6IHN0cmluZykgPT4ge1xuICAgIGlmIChjaGlsZE91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgIG5ld0NoaWxkcmVuW2NoaWxkT3V0bGV0XSA9IGZuKGNoaWxkLCBjaGlsZE91dGxldCk7XG4gICAgfVxuICB9KTtcbiAgZm9yRWFjaChzZWdtZW50LmNoaWxkcmVuLCAoY2hpbGQ6IFVybFNlZ21lbnQsIGNoaWxkT3V0bGV0OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoY2hpbGRPdXRsZXQgIT09IFBSSU1BUllfT1VUTEVUKSB7XG4gICAgICBuZXdDaGlsZHJlbltjaGlsZE91dGxldF0gPSBmbihjaGlsZCwgY2hpbGRPdXRsZXQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBuZXdDaGlsZHJlbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcENoaWxkcmVuSW50b0FycmF5PFQ+KFxuICAgIHNlZ21lbnQ6IFVybFNlZ21lbnQsIGZuOiAodjogVXJsU2VnbWVudCwgazogc3RyaW5nKSA9PiBUW10pOiBUW10ge1xuICBsZXQgcmVzOiBUW10gPSBbXTtcbiAgZm9yRWFjaChzZWdtZW50LmNoaWxkcmVuLCAoY2hpbGQ6IFVybFNlZ21lbnQsIGNoaWxkT3V0bGV0OiBzdHJpbmcpID0+IHtcbiAgICBpZiAoY2hpbGRPdXRsZXQgPT09IFBSSU1BUllfT1VUTEVUKSB7XG4gICAgICByZXMgPSByZXMuY29uY2F0KGZuKGNoaWxkLCBjaGlsZE91dGxldCkpO1xuICAgIH1cbiAgfSk7XG4gIGZvckVhY2goc2VnbWVudC5jaGlsZHJlbiwgKGNoaWxkOiBVcmxTZWdtZW50LCBjaGlsZE91dGxldDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKGNoaWxkT3V0bGV0ICE9PSBQUklNQVJZX09VVExFVCkge1xuICAgICAgcmVzID0gcmVzLmNvbmNhdChmbihjaGlsZCwgY2hpbGRPdXRsZXQpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzO1xufVxuIl19

/***/ },
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var shared_1 = __webpack_require__(416);
	var url_tree_1 = __webpack_require__(417);
	var collection_1 = __webpack_require__(419);
	var UrlSerializer = (function () {
	    function UrlSerializer() {
	    }
	    return UrlSerializer;
	}());
	exports.UrlSerializer = UrlSerializer;
	var DefaultUrlSerializer = (function () {
	    function DefaultUrlSerializer() {
	    }
	    DefaultUrlSerializer.prototype.parse = function (url) {
	        var p = new UrlParser(url);
	        return new url_tree_1.UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
	    };
	    DefaultUrlSerializer.prototype.serialize = function (tree) {
	        var segment = "/" + serializeSegment(tree.root, true);
	        var query = serializeQueryParams(tree.queryParams);
	        var fragment = tree.fragment !== null ? "#" + tree.fragment : '';
	        return "" + segment + query + fragment;
	    };
	    return DefaultUrlSerializer;
	}());
	exports.DefaultUrlSerializer = DefaultUrlSerializer;
	function serializePaths(segment) {
	    return segment.pathsWithParams.map(function (p) { return serializePath(p); }).join('/');
	}
	exports.serializePaths = serializePaths;
	function serializeSegment(segment, root) {
	    if (segment.children[shared_1.PRIMARY_OUTLET] && root) {
	        var primary = serializeSegment(segment.children[shared_1.PRIMARY_OUTLET], false);
	        var children_1 = [];
	        collection_1.forEach(segment.children, function (v, k) {
	            if (k !== shared_1.PRIMARY_OUTLET) {
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
	    else if (segment.children[shared_1.PRIMARY_OUTLET] && !root) {
	        var children_2 = [serializeSegment(segment.children[shared_1.PRIMARY_OUTLET], false)];
	        collection_1.forEach(segment.children, function (v, k) {
	            if (k !== shared_1.PRIMARY_OUTLET) {
	                children_2.push(k + ":" + serializeSegment(v, false));
	            }
	        });
	        return serializePaths(segment) + "/(" + children_2.join('//') + ")";
	    }
	    else {
	        return serializePaths(segment);
	    }
	}
	function serializeChildren(segment) {
	    if (segment.children[shared_1.PRIMARY_OUTLET]) {
	        var primary = serializePaths(segment.children[shared_1.PRIMARY_OUTLET]);
	        var secondary_1 = [];
	        collection_1.forEach(segment.children, function (v, k) {
	            if (k !== shared_1.PRIMARY_OUTLET) {
	                secondary_1.push(k + ":" + serializePaths(v) + serializeChildren(v));
	            }
	        });
	        var secondaryStr = secondary_1.length > 0 ? "(" + secondary_1.join('//') + ")" : '';
	        var primaryChildren = serializeChildren(segment.children[shared_1.PRIMARY_OUTLET]);
	        var primaryChildrenStr = primaryChildren ? "/" + primaryChildren : '';
	        return "" + primary + secondaryStr + primaryChildrenStr;
	    }
	    else {
	        return '';
	    }
	}
	function serializePath(path) {
	    return "" + path.path + serializeParams(path.parameters);
	}
	exports.serializePath = serializePath;
	function serializeParams(params) {
	    return pairs(params).map(function (p) { return (";" + p.first + "=" + p.second); }).join('');
	}
	function serializeQueryParams(params) {
	    var strs = pairs(params).map(function (p) { return (p.first + "=" + p.second); });
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
	function matchPathWithParams(str) {
	    SEGMENT_RE.lastIndex = 0;
	    var match = SEGMENT_RE.exec(str);
	    return match ? match[0] : '';
	}
	var QUERY_PARAM_RE = /^[^=\?&#]+/;
	function matchQueryParams(str) {
	    QUERY_PARAM_RE.lastIndex = 0;
	    var match = SEGMENT_RE.exec(str);
	    return match ? match[0] : '';
	}
	var QUERY_PARAM_VALUE_RE = /^[^\?&#]+/;
	function matchUrlQueryParamValue(str) {
	    QUERY_PARAM_VALUE_RE.lastIndex = 0;
	    var match = QUERY_PARAM_VALUE_RE.exec(str);
	    return match ? match[0] : '';
	}
	var UrlParser = (function () {
	    function UrlParser(remaining) {
	        this.remaining = remaining;
	    }
	    UrlParser.prototype.peekStartsWith = function (str) { return this.remaining.startsWith(str); };
	    UrlParser.prototype.capture = function (str) {
	        if (!this.remaining.startsWith(str)) {
	            throw new Error("Expected \"" + str + "\".");
	        }
	        this.remaining = this.remaining.substring(str.length);
	    };
	    UrlParser.prototype.parseRootSegment = function () {
	        if (this.remaining === '' || this.remaining === '/') {
	            return new url_tree_1.UrlSegment([], {});
	        }
	        else {
	            return new url_tree_1.UrlSegment([], this.parseSegmentChildren());
	        }
	    };
	    UrlParser.prototype.parseSegmentChildren = function () {
	        if (this.remaining.length == 0) {
	            return {};
	        }
	        if (this.peekStartsWith('/')) {
	            this.capture('/');
	        }
	        var paths = [this.parsePathWithParams()];
	        while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
	            this.capture('/');
	            paths.push(this.parsePathWithParams());
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
	        res[shared_1.PRIMARY_OUTLET] = new url_tree_1.UrlSegment(paths, children);
	        return res;
	    };
	    UrlParser.prototype.parsePathWithParams = function () {
	        var path = matchPathWithParams(this.remaining);
	        this.capture(path);
	        var matrixParams = {};
	        if (this.peekStartsWith(';')) {
	            matrixParams = this.parseMatrixParams();
	        }
	        return new url_tree_1.UrlPathWithParams(path, matrixParams);
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
	            return this.remaining.substring(1);
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
	        var key = matchPathWithParams(this.remaining);
	        if (!key) {
	            return;
	        }
	        this.capture(key);
	        var value = 'true';
	        if (this.peekStartsWith('=')) {
	            this.capture('=');
	            var valueMatch = matchPathWithParams(this.remaining);
	            if (valueMatch) {
	                value = valueMatch;
	                this.capture(value);
	            }
	        }
	        params[key] = value;
	    };
	    UrlParser.prototype.parseQueryParam = function (params) {
	        var key = matchQueryParams(this.remaining);
	        if (!key) {
	            return;
	        }
	        this.capture(key);
	        var value = 'true';
	        if (this.peekStartsWith('=')) {
	            this.capture('=');
	            var valueMatch = matchUrlQueryParamValue(this.remaining);
	            if (valueMatch) {
	                value = valueMatch;
	                this.capture(value);
	            }
	        }
	        params[key] = value;
	    };
	    UrlParser.prototype.parseParens = function (allowPrimary) {
	        var segments = {};
	        this.capture('(');
	        while (!this.peekStartsWith(')') && this.remaining.length > 0) {
	            var path = matchPathWithParams(this.remaining);
	            var outletName = void 0;
	            if (path.indexOf(':') > -1) {
	                outletName = path.substr(0, path.indexOf(':'));
	                this.capture(outletName);
	                this.capture(':');
	            }
	            else if (allowPrimary) {
	                outletName = shared_1.PRIMARY_OUTLET;
	            }
	            var children = this.parseSegmentChildren();
	            segments[outletName] = Object.keys(children).length === 1 ? children[shared_1.PRIMARY_OUTLET] :
	                new url_tree_1.UrlSegment([], children);
	            if (this.peekStartsWith('//')) {
	                this.capture('//');
	            }
	        }
	        this.capture(')');
	        return segments;
	    };
	    return UrlParser;
	}());
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3NlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXJsX3NlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUE2QixVQUFVLENBQUMsQ0FBQTtBQUN4Qyx5QkFBcUQsWUFBWSxDQUFDLENBQUE7QUFDbEUsMkJBQXNCLG9CQUFvQixDQUFDLENBQUE7QUFPM0M7SUFBQTtJQVVBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVnFCLHFCQUFhLGdCQVVsQyxDQUFBO0FBS0Q7SUFBQTtJQVlBLENBQUM7SUFYQyxvQ0FBSyxHQUFMLFVBQU0sR0FBVztRQUNmLElBQU0sQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLGtCQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELHdDQUFTLEdBQVQsVUFBVSxJQUFhO1FBQ3JCLElBQU0sT0FBTyxHQUFHLE1BQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUcsQ0FBQztRQUN4RCxJQUFNLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEdBQUcsTUFBSSxJQUFJLENBQUMsUUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNuRSxNQUFNLENBQUMsS0FBRyxPQUFPLEdBQUcsS0FBSyxHQUFHLFFBQVUsQ0FBQztJQUN6QyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLDRCQUFvQix1QkFZaEMsQ0FBQTtBQUVELHdCQUErQixPQUFtQjtJQUNoRCxNQUFNLENBQUMsT0FB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QyxBQTNKRCxJQTJKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UFJJTUFSWV9PVVRMRVR9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7VXJsUGF0aFdpdGhQYXJhbXMsIFVybFNlZ21lbnQsIFVybFRyZWV9IGZyb20gJy4vdXJsX3RyZWUnO1xuaW1wb3J0IHtmb3JFYWNofSBmcm9tICcuL3V0aWxzL2NvbGxlY3Rpb24nO1xuXG5cblxuLyoqXG4gKiBEZWZpbmVzIGEgd2F5IHRvIHNlcmlhbGl6ZS9kZXNlcmlhbGl6ZSBhIHVybCB0cmVlLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVXJsU2VyaWFsaXplciB7XG4gIC8qKlxuICAgKiBQYXJzZSBhIHVybCBpbnRvIGEge0BMaW5rIFVybFRyZWV9XG4gICAqL1xuICBhYnN0cmFjdCBwYXJzZSh1cmw6IHN0cmluZyk6IFVybFRyZWU7XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEge0BMaW5rIFVybFRyZWV9IGludG8gYSB1cmxcbiAgICovXG4gIGFic3RyYWN0IHNlcmlhbGl6ZSh0cmVlOiBVcmxUcmVlKTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEEgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgc2VyaWFsaXphdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRVcmxTZXJpYWxpemVyIGltcGxlbWVudHMgVXJsU2VyaWFsaXplciB7XG4gIHBhcnNlKHVybDogc3RyaW5nKTogVXJsVHJlZSB7XG4gICAgY29uc3QgcCA9IG5ldyBVcmxQYXJzZXIodXJsKTtcbiAgICByZXR1cm4gbmV3IFVybFRyZWUocC5wYXJzZVJvb3RTZWdtZW50KCksIHAucGFyc2VRdWVyeVBhcmFtcygpLCBwLnBhcnNlRnJhZ21lbnQoKSk7XG4gIH1cblxuICBzZXJpYWxpemUodHJlZTogVXJsVHJlZSk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2VnbWVudCA9IGAvJHtzZXJpYWxpemVTZWdtZW50KHRyZWUucm9vdCwgdHJ1ZSl9YDtcbiAgICBjb25zdCBxdWVyeSA9IHNlcmlhbGl6ZVF1ZXJ5UGFyYW1zKHRyZWUucXVlcnlQYXJhbXMpO1xuICAgIGNvbnN0IGZyYWdtZW50ID0gdHJlZS5mcmFnbWVudCAhPT0gbnVsbCA/IGAjJHt0cmVlLmZyYWdtZW50fWAgOiAnJztcbiAgICByZXR1cm4gYCR7c2VnbWVudH0ke3F1ZXJ5fSR7ZnJhZ21lbnR9YDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplUGF0aHMoc2VnbWVudDogVXJsU2VnbWVudCk6IHN0cmluZyB7XG4gIHJldHVybiBzZWdtZW50LnBhdGhzV2l0aFBhcmFtcy5tYXAocCA9PiBzZXJpYWxpemVQYXRoKHApKS5qb2luKCcvJyk7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZVNlZ21lbnQoc2VnbWVudDogVXJsU2VnbWVudCwgcm9vdDogYm9vbGVhbik6IHN0cmluZyB7XG4gIGlmIChzZWdtZW50LmNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXSAmJiByb290KSB7XG4gICAgY29uc3QgcHJpbWFyeSA9IHNlcmlhbGl6ZVNlZ21lbnQoc2VnbWVudC5jaGlsZHJlbltQUklNQVJZX09VVExFVF0sIGZhbHNlKTtcbiAgICBjb25zdCBjaGlsZHJlbjogc3RyaW5nW10gPSBbXTtcbiAgICBmb3JFYWNoKHNlZ21lbnQuY2hpbGRyZW4sICh2OiBVcmxTZWdtZW50LCBrOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChrICE9PSBQUklNQVJZX09VVExFVCkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGAke2t9OiR7c2VyaWFsaXplU2VnbWVudCh2LCBmYWxzZSl9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBgJHtwcmltYXJ5fSgke2NoaWxkcmVuLmpvaW4oJy8vJyl9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHtwcmltYXJ5fWA7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNlZ21lbnQuY2hpbGRyZW5bUFJJTUFSWV9PVVRMRVRdICYmICFyb290KSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbc2VyaWFsaXplU2VnbWVudChzZWdtZW50LmNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXSwgZmFsc2UpXTtcbiAgICBmb3JFYWNoKHNlZ21lbnQuY2hpbGRyZW4sICh2OiBVcmxTZWdtZW50LCBrOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChrICE9PSBQUklNQVJZX09VVExFVCkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKGAke2t9OiR7c2VyaWFsaXplU2VnbWVudCh2LCBmYWxzZSl9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGAke3NlcmlhbGl6ZVBhdGhzKHNlZ21lbnQpfS8oJHtjaGlsZHJlbi5qb2luKCcvLycpfSlgO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBzZXJpYWxpemVQYXRocyhzZWdtZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVDaGlsZHJlbihzZWdtZW50OiBVcmxTZWdtZW50KSB7XG4gIGlmIChzZWdtZW50LmNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXSkge1xuICAgIGNvbnN0IHByaW1hcnkgPSBzZXJpYWxpemVQYXRocyhzZWdtZW50LmNoaWxkcmVuW1BSSU1BUllfT1VUTEVUXSk7XG5cbiAgICBjb25zdCBzZWNvbmRhcnk6IHN0cmluZ1tdID0gW107XG4gICAgZm9yRWFjaChzZWdtZW50LmNoaWxkcmVuLCAodjogVXJsU2VnbWVudCwgazogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoayAhPT0gUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgICAgc2Vjb25kYXJ5LnB1c2goYCR7a306JHtzZXJpYWxpemVQYXRocyh2KX0ke3NlcmlhbGl6ZUNoaWxkcmVuKHYpfWApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHNlY29uZGFyeVN0ciA9IHNlY29uZGFyeS5sZW5ndGggPiAwID8gYCgke3NlY29uZGFyeS5qb2luKCcvLycpfSlgIDogJyc7XG4gICAgY29uc3QgcHJpbWFyeUNoaWxkcmVuID0gc2VyaWFsaXplQ2hpbGRyZW4oc2VnbWVudC5jaGlsZHJlbltQUklNQVJZX09VVExFVF0pO1xuICAgIGNvbnN0IHByaW1hcnlDaGlsZHJlblN0cjogc3RyaW5nID0gcHJpbWFyeUNoaWxkcmVuID8gYC8ke3ByaW1hcnlDaGlsZHJlbn1gIDogJyc7XG4gICAgcmV0dXJuIGAke3ByaW1hcnl9JHtzZWNvbmRhcnlTdHJ9JHtwcmltYXJ5Q2hpbGRyZW5TdHJ9YDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZVBhdGgocGF0aDogVXJsUGF0aFdpdGhQYXJhbXMpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7cGF0aC5wYXRofSR7c2VyaWFsaXplUGFyYW1zKHBhdGgucGFyYW1ldGVycyl9YDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplUGFyYW1zKHBhcmFtczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pOiBzdHJpbmcge1xuICByZXR1cm4gcGFpcnMocGFyYW1zKS5tYXAocCA9PiBgOyR7cC5maXJzdH09JHtwLnNlY29uZH1gKS5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplUXVlcnlQYXJhbXMocGFyYW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSk6IHN0cmluZyB7XG4gIGNvbnN0IHN0cnMgPSBwYWlycyhwYXJhbXMpLm1hcChwID0+IGAke3AuZmlyc3R9PSR7cC5zZWNvbmR9YCk7XG4gIHJldHVybiBzdHJzLmxlbmd0aCA+IDAgPyBgPyR7c3Rycy5qb2luKFwiJlwiKX1gIDogJyc7XG59XG5cbmNsYXNzIFBhaXI8QSwgQj4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlyc3Q6IEEsIHB1YmxpYyBzZWNvbmQ6IEIpIHt9XG59XG5mdW5jdGlvbiBwYWlyczxUPihvYmo6IHtba2V5OiBzdHJpbmddOiBUfSk6IFBhaXI8c3RyaW5nLCBUPltdIHtcbiAgY29uc3QgcmVzOiBQYWlyPHN0cmluZywgVD5bXSA9IFtdO1xuICBmb3IgKGxldCBwcm9wIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIHJlcy5wdXNoKG5ldyBQYWlyPHN0cmluZywgVD4ocHJvcCwgb2JqW3Byb3BdKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5cbmNvbnN0IFNFR01FTlRfUkUgPSAvXlteXFwvXFwoXFwpXFw/Oz0mI10rLztcbmZ1bmN0aW9uIG1hdGNoUGF0aFdpdGhQYXJhbXMoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBTRUdNRU5UX1JFLmxhc3RJbmRleCA9IDA7XG4gIGNvbnN0IG1hdGNoID0gU0VHTUVOVF9SRS5leGVjKHN0cik7XG4gIHJldHVybiBtYXRjaCA/IG1hdGNoWzBdIDogJyc7XG59XG5cbmNvbnN0IFFVRVJZX1BBUkFNX1JFID0gL15bXj1cXD8mI10rLztcbmZ1bmN0aW9uIG1hdGNoUXVlcnlQYXJhbXMoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICBRVUVSWV9QQVJBTV9SRS5sYXN0SW5kZXggPSAwO1xuICBjb25zdCBtYXRjaCA9IFNFR01FTlRfUkUuZXhlYyhzdHIpO1xuICByZXR1cm4gbWF0Y2ggPyBtYXRjaFswXSA6ICcnO1xufVxuXG5jb25zdCBRVUVSWV9QQVJBTV9WQUxVRV9SRSA9IC9eW15cXD8mI10rLztcbmZ1bmN0aW9uIG1hdGNoVXJsUXVlcnlQYXJhbVZhbHVlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgUVVFUllfUEFSQU1fVkFMVUVfUkUubGFzdEluZGV4ID0gMDtcbiAgY29uc3QgbWF0Y2ggPSBRVUVSWV9QQVJBTV9WQUxVRV9SRS5leGVjKHN0cik7XG4gIHJldHVybiBtYXRjaCA/IG1hdGNoWzBdIDogJyc7XG59XG5cbmNsYXNzIFVybFBhcnNlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVtYWluaW5nOiBzdHJpbmcpIHt9XG5cbiAgcGVla1N0YXJ0c1dpdGgoc3RyOiBzdHJpbmcpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucmVtYWluaW5nLnN0YXJ0c1dpdGgoc3RyKTsgfVxuXG4gIGNhcHR1cmUoc3RyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVtYWluaW5nLnN0YXJ0c1dpdGgoc3RyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBcIiR7c3RyfVwiLmApO1xuICAgIH1cbiAgICB0aGlzLnJlbWFpbmluZyA9IHRoaXMucmVtYWluaW5nLnN1YnN0cmluZyhzdHIubGVuZ3RoKTtcbiAgfVxuXG4gIHBhcnNlUm9vdFNlZ21lbnQoKTogVXJsU2VnbWVudCB7XG4gICAgaWYgKHRoaXMucmVtYWluaW5nID09PSAnJyB8fCB0aGlzLnJlbWFpbmluZyA9PT0gJy8nKSB7XG4gICAgICByZXR1cm4gbmV3IFVybFNlZ21lbnQoW10sIHt9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBVcmxTZWdtZW50KFtdLCB0aGlzLnBhcnNlU2VnbWVudENoaWxkcmVuKCkpO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlU2VnbWVudENoaWxkcmVuKCk6IHtba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50fSB7XG4gICAgaWYgKHRoaXMucmVtYWluaW5nLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCcvJyk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF0aHMgPSBbdGhpcy5wYXJzZVBhdGhXaXRoUGFyYW1zKCldO1xuXG4gICAgd2hpbGUgKHRoaXMucGVla1N0YXJ0c1dpdGgoJy8nKSAmJiAhdGhpcy5wZWVrU3RhcnRzV2l0aCgnLy8nKSAmJiAhdGhpcy5wZWVrU3RhcnRzV2l0aCgnLygnKSkge1xuICAgICAgdGhpcy5jYXB0dXJlKCcvJyk7XG4gICAgICBwYXRocy5wdXNoKHRoaXMucGFyc2VQYXRoV2l0aFBhcmFtcygpKTtcbiAgICB9XG5cbiAgICBsZXQgY2hpbGRyZW46IHtba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50fSA9IHt9O1xuICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcvKCcpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJy8nKTtcbiAgICAgIGNoaWxkcmVuID0gdGhpcy5wYXJzZVBhcmVucyh0cnVlKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzOiB7W2tleTogc3RyaW5nXTogVXJsU2VnbWVudH0gPSB7fTtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnKCcpKSB7XG4gICAgICByZXMgPSB0aGlzLnBhcnNlUGFyZW5zKGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXNbUFJJTUFSWV9PVVRMRVRdID0gbmV3IFVybFNlZ21lbnQocGF0aHMsIGNoaWxkcmVuKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcGFyc2VQYXRoV2l0aFBhcmFtcygpOiBVcmxQYXRoV2l0aFBhcmFtcyB7XG4gICAgbGV0IHBhdGggPSBtYXRjaFBhdGhXaXRoUGFyYW1zKHRoaXMucmVtYWluaW5nKTtcbiAgICB0aGlzLmNhcHR1cmUocGF0aCk7XG4gICAgbGV0IG1hdHJpeFBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnOycpKSB7XG4gICAgICBtYXRyaXhQYXJhbXMgPSB0aGlzLnBhcnNlTWF0cml4UGFyYW1zKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVXJsUGF0aFdpdGhQYXJhbXMocGF0aCwgbWF0cml4UGFyYW1zKTtcbiAgfVxuXG4gIHBhcnNlUXVlcnlQYXJhbXMoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGNvbnN0IHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnPycpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJz8nKTtcbiAgICAgIHRoaXMucGFyc2VRdWVyeVBhcmFtKHBhcmFtcyk7XG4gICAgICB3aGlsZSAodGhpcy5yZW1haW5pbmcubGVuZ3RoID4gMCAmJiB0aGlzLnBlZWtTdGFydHNXaXRoKCcmJykpIHtcbiAgICAgICAgdGhpcy5jYXB0dXJlKCcmJyk7XG4gICAgICAgIHRoaXMucGFyc2VRdWVyeVBhcmFtKHBhcmFtcyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBwYXJzZUZyYWdtZW50KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMucGVla1N0YXJ0c1dpdGgoJyMnKSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVtYWluaW5nLnN1YnN0cmluZygxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VNYXRyaXhQYXJhbXMoKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIGNvbnN0IHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICB3aGlsZSAodGhpcy5yZW1haW5pbmcubGVuZ3RoID4gMCAmJiB0aGlzLnBlZWtTdGFydHNXaXRoKCc7JykpIHtcbiAgICAgIHRoaXMuY2FwdHVyZSgnOycpO1xuICAgICAgdGhpcy5wYXJzZVBhcmFtKHBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBwYXJzZVBhcmFtKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcbiAgICBjb25zdCBrZXkgPSBtYXRjaFBhdGhXaXRoUGFyYW1zKHRoaXMucmVtYWluaW5nKTtcbiAgICBpZiAoIWtleSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNhcHR1cmUoa2V5KTtcbiAgICBsZXQgdmFsdWU6IGFueSA9ICd0cnVlJztcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnPScpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJz0nKTtcbiAgICAgIGNvbnN0IHZhbHVlTWF0Y2ggPSBtYXRjaFBhdGhXaXRoUGFyYW1zKHRoaXMucmVtYWluaW5nKTtcbiAgICAgIGlmICh2YWx1ZU1hdGNoKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWVNYXRjaDtcbiAgICAgICAgdGhpcy5jYXB0dXJlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcGFyc2VRdWVyeVBhcmFtKHBhcmFtczoge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHtcbiAgICBjb25zdCBrZXkgPSBtYXRjaFF1ZXJ5UGFyYW1zKHRoaXMucmVtYWluaW5nKTtcbiAgICBpZiAoIWtleSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNhcHR1cmUoa2V5KTtcbiAgICBsZXQgdmFsdWU6IGFueSA9ICd0cnVlJztcbiAgICBpZiAodGhpcy5wZWVrU3RhcnRzV2l0aCgnPScpKSB7XG4gICAgICB0aGlzLmNhcHR1cmUoJz0nKTtcbiAgICAgIHZhciB2YWx1ZU1hdGNoID0gbWF0Y2hVcmxRdWVyeVBhcmFtVmFsdWUodGhpcy5yZW1haW5pbmcpO1xuICAgICAgaWYgKHZhbHVlTWF0Y2gpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZU1hdGNoO1xuICAgICAgICB0aGlzLmNhcHR1cmUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcGFyc2VQYXJlbnMoYWxsb3dQcmltYXJ5OiBib29sZWFuKToge1trZXk6IHN0cmluZ106IFVybFNlZ21lbnR9IHtcbiAgICBjb25zdCBzZWdtZW50czoge1trZXk6IHN0cmluZ106IFVybFNlZ21lbnR9ID0ge307XG4gICAgdGhpcy5jYXB0dXJlKCcoJyk7XG5cbiAgICB3aGlsZSAoIXRoaXMucGVla1N0YXJ0c1dpdGgoJyknKSAmJiB0aGlzLnJlbWFpbmluZy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgcGF0aCA9IG1hdGNoUGF0aFdpdGhQYXJhbXModGhpcy5yZW1haW5pbmcpO1xuICAgICAgbGV0IG91dGxldE5hbWU6IHN0cmluZztcbiAgICAgIGlmIChwYXRoLmluZGV4T2YoJzonKSA+IC0xKSB7XG4gICAgICAgIG91dGxldE5hbWUgPSBwYXRoLnN1YnN0cigwLCBwYXRoLmluZGV4T2YoJzonKSk7XG4gICAgICAgIHRoaXMuY2FwdHVyZShvdXRsZXROYW1lKTtcbiAgICAgICAgdGhpcy5jYXB0dXJlKCc6Jyk7XG4gICAgICB9IGVsc2UgaWYgKGFsbG93UHJpbWFyeSkge1xuICAgICAgICBvdXRsZXROYW1lID0gUFJJTUFSWV9PVVRMRVQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5wYXJzZVNlZ21lbnRDaGlsZHJlbigpO1xuICAgICAgc2VnbWVudHNbb3V0bGV0TmFtZV0gPSBPYmplY3Qua2V5cyhjaGlsZHJlbikubGVuZ3RoID09PSAxID8gY2hpbGRyZW5bUFJJTUFSWV9PVVRMRVRdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBVcmxTZWdtZW50KFtdLCBjaGlsZHJlbik7XG5cbiAgICAgIGlmICh0aGlzLnBlZWtTdGFydHNXaXRoKCcvLycpKSB7XG4gICAgICAgIHRoaXMuY2FwdHVyZSgnLy8nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jYXB0dXJlKCcpJyk7XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG4gIH1cbn1cbiJdfQ==

/***/ },
/* 419 */
/***/ function(module, exports) {

	"use strict";
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
	exports.shallowEqual = shallowEqual;
	function flatten(a) {
	    var target = [];
	    for (var i = 0; i < a.length; ++i) {
	        for (var j = 0; j < a[i].length; ++j) {
	            target.push(a[i][j]);
	        }
	    }
	    return target;
	}
	exports.flatten = flatten;
	function first(a) {
	    return a.length > 0 ? a[0] : null;
	}
	exports.first = first;
	function last(a) {
	    return a.length > 0 ? a[a.length - 1] : null;
	}
	exports.last = last;
	function and(bools) {
	    return bools.reduce(function (a, b) { return a && b; }, true);
	}
	exports.and = and;
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
	exports.merge = merge;
	function forEach(map, callback) {
	    for (var prop in map) {
	        if (map.hasOwnProperty(prop)) {
	            callback(map[prop], prop);
	        }
	    }
	}
	exports.forEach = forEach;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBNkIsQ0FBcUIsRUFBRSxDQUFxQjtJQUN2RSxJQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLElBQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELElBQUksR0FBVyxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ25DLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQWRlLG9CQUFZLGVBYzNCLENBQUE7QUFFRCxpQkFBMkIsQ0FBUTtJQUNqQyxJQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFDdkIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVJlLGVBQU8sVUFRdEIsQ0FBQTtBQUVELGVBQXlCLENBQU07SUFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDcEMsQ0FBQztBQUZlLGFBQUssUUFFcEIsQ0FBQTtBQUVELGNBQXdCLENBQU07SUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUMvQyxDQUFDO0FBRmUsWUFBSSxPQUVuQixDQUFBO0FBRUQsYUFBb0IsS0FBZ0I7SUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxJQUFJLENBQUMsRUFBTixDQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUZlLFdBQUcsTUFFbEIsQ0FBQTtBQUVELGVBQXlCLEVBQXNCLEVBQUUsRUFBc0I7SUFDckUsSUFBSSxDQUFDLEdBQXVCLEVBQUUsQ0FBQztJQUUvQixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7SUFFRCxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQWhCZSxhQUFLLFFBZ0JwQixDQUFBO0FBRUQsaUJBQ0ksR0FBdUIsRUFBRSxRQUFxQztJQUNoRSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBUGUsZUFBTyxVQU90QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHNoYWxsb3dFcXVhbChhOiB7W3g6IHN0cmluZ106IGFueX0sIGI6IHtbeDogc3RyaW5nXTogYW55fSk6IGJvb2xlYW4ge1xuICBjb25zdCBrMSA9IE9iamVjdC5rZXlzKGEpO1xuICBjb25zdCBrMiA9IE9iamVjdC5rZXlzKGIpO1xuICBpZiAoazEubGVuZ3RoICE9IGsyLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBsZXQga2V5OiBzdHJpbmc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgazEubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBrMVtpXTtcbiAgICBpZiAoYVtrZXldICE9PSBiW2tleV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuPFQ+KGE6IFRbXVtdKTogVFtdIHtcbiAgY29uc3QgdGFyZ2V0OiBUW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBhW2ldLmxlbmd0aDsgKytqKSB7XG4gICAgICB0YXJnZXQucHVzaChhW2ldW2pdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0PFQ+KGE6IFRbXSk6IFQge1xuICByZXR1cm4gYS5sZW5ndGggPiAwID8gYVswXSA6IG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0PFQ+KGE6IFRbXSk6IFQge1xuICByZXR1cm4gYS5sZW5ndGggPiAwID8gYVthLmxlbmd0aCAtIDFdIDogbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuZChib29sczogYm9vbGVhbltdKTogYm9vbGVhbiB7XG4gIHJldHVybiBib29scy5yZWR1Y2UoKGEsIGIpID0+IGEgJiYgYiwgdHJ1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZTxWPihtMToge1trZXk6IHN0cmluZ106IFZ9LCBtMjoge1trZXk6IHN0cmluZ106IFZ9KToge1trZXk6IHN0cmluZ106IFZ9IHtcbiAgdmFyIG06IHtba2V5OiBzdHJpbmddOiBWfSA9IHt9O1xuXG4gIGZvciAodmFyIGF0dHIgaW4gbTEpIHtcbiAgICBpZiAobTEuaGFzT3duUHJvcGVydHkoYXR0cikpIHtcbiAgICAgIG1bYXR0cl0gPSBtMVthdHRyXTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBhdHRyIGluIG0yKSB7XG4gICAgaWYgKG0yLmhhc093blByb3BlcnR5KGF0dHIpKSB7XG4gICAgICBtW2F0dHJdID0gbTJbYXR0cl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JFYWNoPEssIFY+KFxuICAgIG1hcDoge1trZXk6IHN0cmluZ106IFZ9LCBjYWxsYmFjazogLyooViwgSykgPT4gdm9pZCovIEZ1bmN0aW9uKTogdm9pZCB7XG4gIGZvciAodmFyIHByb3AgaW4gbWFwKSB7XG4gICAgaWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgY2FsbGJhY2sobWFwW3Byb3BdLCBwcm9wKTtcbiAgICB9XG4gIH1cbn0iXX0=

/***/ },
/* 420 */
/***/ function(module, exports) {

	"use strict";
	function validateConfig(config) {
	    config.forEach(validateNode);
	}
	exports.validateConfig = validateConfig;
	function validateNode(route) {
	    if (!!route.redirectTo && !!route.children) {
	        throw new Error("Invalid configuration of route '" + route.path + "': redirectTo and children cannot be used together");
	    }
	    if (!!route.redirectTo && !!route.component) {
	        throw new Error("Invalid configuration of route '" + route.path + "': redirectTo and component cannot be used together");
	    }
	    if (route.path === undefined) {
	        throw new Error("Invalid route configuration: routes must have path specified");
	    }
	    if (route.path.startsWith('/')) {
	        throw new Error("Invalid route configuration of route '" + route.path + "': path cannot start with a slash");
	    }
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBZUEsd0JBQStCLE1BQW9CO0lBQ2pELE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUZlLHNCQUFjLGlCQUU3QixDQUFBO0FBRUQsc0JBQXNCLEtBQVk7SUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sSUFBSSxLQUFLLENBQ1gscUNBQW1DLEtBQUssQ0FBQyxJQUFJLHVEQUFvRCxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM1QyxNQUFNLElBQUksS0FBSyxDQUNYLHFDQUFtQyxLQUFLLENBQUMsSUFBSSx3REFBcUQsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBeUMsS0FBSyxDQUFDLElBQUksc0NBQW1DLENBQUMsQ0FBQztJQUMxRyxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCB0eXBlIFJvdXRlckNvbmZpZyA9IFJvdXRlW107XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGUge1xuICBwYXRoPzogc3RyaW5nO1xuICB0ZXJtaW5hbD86IGJvb2xlYW47XG4gIGNvbXBvbmVudD86IFR5cGV8c3RyaW5nO1xuICBvdXRsZXQ/OiBzdHJpbmc7XG4gIGNhbkFjdGl2YXRlPzogYW55W107XG4gIGNhbkRlYWN0aXZhdGU/OiBhbnlbXTtcbiAgcmVkaXJlY3RUbz86IHN0cmluZztcbiAgY2hpbGRyZW4/OiBSb3V0ZVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVDb25maWcoY29uZmlnOiBSb3V0ZXJDb25maWcpOiB2b2lkIHtcbiAgY29uZmlnLmZvckVhY2godmFsaWRhdGVOb2RlKTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVOb2RlKHJvdXRlOiBSb3V0ZSk6IHZvaWQge1xuICBpZiAoISFyb3V0ZS5yZWRpcmVjdFRvICYmICEhcm91dGUuY2hpbGRyZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJyR7cm91dGUucGF0aH0nOiByZWRpcmVjdFRvIGFuZCBjaGlsZHJlbiBjYW5ub3QgYmUgdXNlZCB0b2dldGhlcmApO1xuICB9XG4gIGlmICghIXJvdXRlLnJlZGlyZWN0VG8gJiYgISFyb3V0ZS5jb21wb25lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBJbnZhbGlkIGNvbmZpZ3VyYXRpb24gb2Ygcm91dGUgJyR7cm91dGUucGF0aH0nOiByZWRpcmVjdFRvIGFuZCBjb21wb25lbnQgY2Fubm90IGJlIHVzZWQgdG9nZXRoZXJgKTtcbiAgfVxuICBpZiAocm91dGUucGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHJvdXRlIGNvbmZpZ3VyYXRpb246IHJvdXRlcyBtdXN0IGhhdmUgcGF0aCBzcGVjaWZpZWRgKTtcbiAgfVxuICBpZiAocm91dGUucGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcm91dGUgY29uZmlndXJhdGlvbiBvZiByb3V0ZSAnJHtyb3V0ZS5wYXRofSc6IHBhdGggY2Fubm90IHN0YXJ0IHdpdGggYSBzbGFzaGApO1xuICB9XG59Il19

/***/ },
/* 421 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var BehaviorSubject_1 = __webpack_require__(422);
	var router_state_1 = __webpack_require__(423);
	var tree_1 = __webpack_require__(424);
	function createRouterState(curr, prevState) {
	    var root = createNode(curr._root, prevState ? prevState._root : undefined);
	    var queryParams = prevState ? prevState.queryParams : new BehaviorSubject_1.BehaviorSubject(curr.queryParams);
	    var fragment = prevState ? prevState.fragment : new BehaviorSubject_1.BehaviorSubject(curr.fragment);
	    return new router_state_1.RouterState(root, queryParams, fragment, curr);
	}
	exports.createRouterState = createRouterState;
	function createNode(curr, prevState) {
	    if (prevState && equalRouteSnapshots(prevState.value.snapshot, curr.value)) {
	        var value = prevState.value;
	        value._futureSnapshot = curr.value;
	        var children = createOrReuseChildren(curr, prevState);
	        return new tree_1.TreeNode(value, children);
	    }
	    else {
	        var value = createActivatedRoute(curr.value);
	        var children = curr.children.map(function (c) { return createNode(c); });
	        return new tree_1.TreeNode(value, children);
	    }
	}
	function createOrReuseChildren(curr, prevState) {
	    return curr.children.map(function (child) {
	        var index = prevState.children.findIndex(function (p) { return equalRouteSnapshots(p.value.snapshot, child.value); });
	        if (index >= 0) {
	            return createNode(child, prevState.children[index]);
	        }
	        else {
	            return createNode(child);
	        }
	    });
	}
	function createActivatedRoute(c) {
	    return new router_state_1.ActivatedRoute(new BehaviorSubject_1.BehaviorSubject(c.url), new BehaviorSubject_1.BehaviorSubject(c.params), c.outlet, c.component, c);
	}
	function equalRouteSnapshots(a, b) {
	    return a._routeConfig === b._routeConfig;
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX3JvdXRlcl9zdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jcmVhdGVfcm91dGVyX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxnQ0FBOEIsc0JBQXNCLENBQUMsQ0FBQTtBQUVyRCw2QkFBdUYsZ0JBQWdCLENBQUMsQ0FBQTtBQUN4RyxxQkFBdUIsY0FBYyxDQUFDLENBQUE7QUFFdEMsMkJBQWtDLElBQXlCLEVBQUUsU0FBc0I7SUFDakYsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFDN0UsSUFBTSxXQUFXLEdBQUcsU0FBUyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5RixJQUFNLFFBQVEsR0FBRyxTQUFTLEdBQUcsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLGlDQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JGLE1BQU0sQ0FBQyxJQUFJLDBCQUFXLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUQsQ0FBQztBQUxlLHlCQUFpQixvQkFLaEMsQ0FBQTtBQUVELG9CQUFvQixJQUFzQyxFQUFFLFNBQW9DO0lBRTlGLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDOUIsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRW5DLElBQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxNQUFNLENBQUMsSUFBSSxlQUFRLENBQWlCLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUV2RCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixJQUFNLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLElBQUksZUFBUSxDQUFpQixLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQztBQUNILENBQUM7QUFFRCwrQkFDSSxJQUFzQyxFQUFFLFNBQW1DO0lBQzdFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7UUFDNUIsSUFBTSxLQUFLLEdBQ1AsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQWxELENBQWtELENBQUMsQ0FBQztRQUMxRixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCw4QkFBOEIsQ0FBeUI7SUFDckQsTUFBTSxDQUFDLElBQUksNkJBQWMsQ0FDckIsSUFBSSxpQ0FBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLGlDQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzRixDQUFDO0FBRUQsNkJBQTZCLENBQXlCLEVBQUUsQ0FBeUI7SUFDL0UsTUFBTSxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcblxuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGUsIFJvdXRlclN0YXRlU25hcHNob3R9IGZyb20gJy4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7VHJlZU5vZGV9IGZyb20gJy4vdXRpbHMvdHJlZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSb3V0ZXJTdGF0ZShjdXJyOiBSb3V0ZXJTdGF0ZVNuYXBzaG90LCBwcmV2U3RhdGU6IFJvdXRlclN0YXRlKTogUm91dGVyU3RhdGUge1xuICBjb25zdCByb290ID0gY3JlYXRlTm9kZShjdXJyLl9yb290LCBwcmV2U3RhdGUgPyBwcmV2U3RhdGUuX3Jvb3QgOiB1bmRlZmluZWQpO1xuICBjb25zdCBxdWVyeVBhcmFtcyA9IHByZXZTdGF0ZSA/IHByZXZTdGF0ZS5xdWVyeVBhcmFtcyA6IG5ldyBCZWhhdmlvclN1YmplY3QoY3Vyci5xdWVyeVBhcmFtcyk7XG4gIGNvbnN0IGZyYWdtZW50ID0gcHJldlN0YXRlID8gcHJldlN0YXRlLmZyYWdtZW50IDogbmV3IEJlaGF2aW9yU3ViamVjdChjdXJyLmZyYWdtZW50KTtcbiAgcmV0dXJuIG5ldyBSb3V0ZXJTdGF0ZShyb290LCBxdWVyeVBhcmFtcywgZnJhZ21lbnQsIGN1cnIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb2RlKGN1cnI6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LCBwcmV2U3RhdGU/OiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4pOlxuICAgIFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPiB7XG4gIGlmIChwcmV2U3RhdGUgJiYgZXF1YWxSb3V0ZVNuYXBzaG90cyhwcmV2U3RhdGUudmFsdWUuc25hcHNob3QsIGN1cnIudmFsdWUpKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwcmV2U3RhdGUudmFsdWU7XG4gICAgdmFsdWUuX2Z1dHVyZVNuYXBzaG90ID0gY3Vyci52YWx1ZTtcblxuICAgIGNvbnN0IGNoaWxkcmVuID0gY3JlYXRlT3JSZXVzZUNoaWxkcmVuKGN1cnIsIHByZXZTdGF0ZSk7XG4gICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4odmFsdWUsIGNoaWxkcmVuKTtcblxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHZhbHVlID0gY3JlYXRlQWN0aXZhdGVkUm91dGUoY3Vyci52YWx1ZSk7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBjdXJyLmNoaWxkcmVuLm1hcChjID0+IGNyZWF0ZU5vZGUoYykpO1xuICAgIHJldHVybiBuZXcgVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+KHZhbHVlLCBjaGlsZHJlbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlT3JSZXVzZUNoaWxkcmVuKFxuICAgIGN1cnI6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LCBwcmV2U3RhdGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlPikge1xuICByZXR1cm4gY3Vyci5jaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xuICAgIGNvbnN0IGluZGV4ID1cbiAgICAgICAgcHJldlN0YXRlLmNoaWxkcmVuLmZpbmRJbmRleChwID0+IGVxdWFsUm91dGVTbmFwc2hvdHMocC52YWx1ZS5zbmFwc2hvdCwgY2hpbGQudmFsdWUpKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5vZGUoY2hpbGQsIHByZXZTdGF0ZS5jaGlsZHJlbltpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3JlYXRlTm9kZShjaGlsZCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQWN0aXZhdGVkUm91dGUoYzogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge1xuICByZXR1cm4gbmV3IEFjdGl2YXRlZFJvdXRlKFxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdChjLnVybCksIG5ldyBCZWhhdmlvclN1YmplY3QoYy5wYXJhbXMpLCBjLm91dGxldCwgYy5jb21wb25lbnQsIGMpO1xufVxuXG5mdW5jdGlvbiBlcXVhbFJvdXRlU25hcHNob3RzKGE6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIGI6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBib29sZWFuIHtcbiAgcmV0dXJuIGEuX3JvdXRlQ29uZmlnID09PSBiLl9yb3V0ZUNvbmZpZztcbn0iXX0=

/***/ },
/* 422 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(37);
	var throwError_1 = __webpack_require__(55);
	var ObjectUnsubscribedError_1 = __webpack_require__(56);
	/**
	 * @class BehaviorSubject<T>
	 */
	var BehaviorSubject = (function (_super) {
	    __extends(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	    }
	    BehaviorSubject.prototype.getValue = function () {
	        if (this.hasErrored) {
	            throwError_1.throwError(this.errorValue);
	        }
	        else if (this.isUnsubscribed) {
	            throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
	        }
	        else {
	            return this._value;
	        }
	    };
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (subscription && !subscription.isUnsubscribed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype._next = function (value) {
	        _super.prototype._next.call(this, this._value = value);
	    };
	    BehaviorSubject.prototype._error = function (err) {
	        this.hasErrored = true;
	        _super.prototype._error.call(this, this.errorValue = err);
	    };
	    return BehaviorSubject;
	}(Subject_1.Subject));
	exports.BehaviorSubject = BehaviorSubject;
	//# sourceMappingURL=BehaviorSubject.js.map

/***/ },
/* 423 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BehaviorSubject_1 = __webpack_require__(422);
	var shared_1 = __webpack_require__(416);
	var url_tree_1 = __webpack_require__(417);
	var collection_1 = __webpack_require__(419);
	var tree_1 = __webpack_require__(424);
	var RouterState = (function (_super) {
	    __extends(RouterState, _super);
	    function RouterState(root, queryParams, fragment, snapshot) {
	        _super.call(this, root);
	        this.queryParams = queryParams;
	        this.fragment = fragment;
	        this.snapshot = snapshot;
	    }
	    RouterState.prototype.toString = function () { return this.snapshot.toString(); };
	    return RouterState;
	}(tree_1.Tree));
	exports.RouterState = RouterState;
	function createEmptyState(urlTree, rootComponent) {
	    var snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
	    var emptyUrl = new BehaviorSubject_1.BehaviorSubject([new url_tree_1.UrlPathWithParams('', {})]);
	    var emptyParams = new BehaviorSubject_1.BehaviorSubject({});
	    var emptyQueryParams = new BehaviorSubject_1.BehaviorSubject({});
	    var fragment = new BehaviorSubject_1.BehaviorSubject('');
	    var activated = new ActivatedRoute(emptyUrl, emptyParams, shared_1.PRIMARY_OUTLET, rootComponent, snapshot.root);
	    activated.snapshot = snapshot.root;
	    return new RouterState(new tree_1.TreeNode(activated, []), emptyQueryParams, fragment, snapshot);
	}
	exports.createEmptyState = createEmptyState;
	function createEmptyStateSnapshot(urlTree, rootComponent) {
	    var emptyParams = {};
	    var emptyQueryParams = {};
	    var fragment = '';
	    var activated = new ActivatedRouteSnapshot([], emptyParams, shared_1.PRIMARY_OUTLET, rootComponent, null, urlTree.root, -1);
	    return new RouterStateSnapshot('', new tree_1.TreeNode(activated, []), emptyQueryParams, fragment);
	}
	var ActivatedRoute = (function () {
	    function ActivatedRoute(url, params, outlet, component, futureSnapshot) {
	        this.url = url;
	        this.params = params;
	        this.outlet = outlet;
	        this.component = component;
	        this._futureSnapshot = futureSnapshot;
	    }
	    ActivatedRoute.prototype.toString = function () {
	        return this.snapshot ? this.snapshot.toString() : "Future(" + this._futureSnapshot + ")";
	    };
	    return ActivatedRoute;
	}());
	exports.ActivatedRoute = ActivatedRoute;
	var ActivatedRouteSnapshot = (function () {
	    function ActivatedRouteSnapshot(url, params, outlet, component, routeConfig, urlSegment, lastPathIndex) {
	        this.url = url;
	        this.params = params;
	        this.outlet = outlet;
	        this.component = component;
	        this._routeConfig = routeConfig;
	        this._urlSegment = urlSegment;
	        this._lastPathIndex = lastPathIndex;
	    }
	    ActivatedRouteSnapshot.prototype.toString = function () {
	        var url = this.url.map(function (s) { return s.toString(); }).join('/');
	        var matched = this._routeConfig ? this._routeConfig.path : '';
	        return "Route(url:'" + url + "', path:'" + matched + "')";
	    };
	    return ActivatedRouteSnapshot;
	}());
	exports.ActivatedRouteSnapshot = ActivatedRouteSnapshot;
	var RouterStateSnapshot = (function (_super) {
	    __extends(RouterStateSnapshot, _super);
	    function RouterStateSnapshot(url, root, queryParams, fragment) {
	        _super.call(this, root);
	        this.url = url;
	        this.queryParams = queryParams;
	        this.fragment = fragment;
	    }
	    RouterStateSnapshot.prototype.toString = function () { return serializeNode(this._root); };
	    return RouterStateSnapshot;
	}(tree_1.Tree));
	exports.RouterStateSnapshot = RouterStateSnapshot;
	function serializeNode(node) {
	    var c = node.children.length > 0 ? " { " + node.children.map(serializeNode).join(", ") + " } " : '';
	    return "" + node.value + c;
	}
	function advanceActivatedRoute(route) {
	    if (route.snapshot && !collection_1.shallowEqual(route.snapshot.params, route._futureSnapshot.params)) {
	        route.snapshot = route._futureSnapshot;
	        route.url.next(route.snapshot.url);
	        route.params.next(route.snapshot.params);
	    }
	    else {
	        route.snapshot = route._futureSnapshot;
	    }
	}
	exports.advanceActivatedRoute = advanceActivatedRoute;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3N0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcl9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxnQ0FBOEIsc0JBQXNCLENBQUMsQ0FBQTtBQUlyRCx1QkFBcUMsVUFBVSxDQUFDLENBQUE7QUFDaEQseUJBQXFELFlBQVksQ0FBQyxDQUFBO0FBQ2xFLDJCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hELHFCQUE2QixjQUFjLENBQUMsQ0FBQTtBQWtCNUM7SUFBaUMsK0JBQW9CO0lBSW5ELHFCQUNJLElBQThCLEVBQVMsV0FBK0IsRUFDL0QsUUFBNEIsRUFBUyxRQUE2QjtRQUMzRSxrQkFBTSxJQUFJLENBQUMsQ0FBQztRQUY2QixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0QsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFxQjtJQUU3RSxDQUFDO0lBRUQsOEJBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsa0JBQUM7QUFBRCxDQUFDLEFBWEQsQ0FBaUMsV0FBSSxHQVdwQztBQVhZLG1CQUFXLGNBV3ZCLENBQUE7QUFFRCwwQkFBaUMsT0FBZ0IsRUFBRSxhQUFtQjtJQUNwRSxJQUFNLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDbEUsSUFBTSxRQUFRLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLENBQUMsSUFBSSw0QkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLElBQU0sV0FBVyxHQUFHLElBQUksaUNBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QyxJQUFNLGdCQUFnQixHQUFHLElBQUksaUNBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqRCxJQUFNLFFBQVEs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UUFDTixLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7SUFDekMsQ0FBQztBQUNILENBQUM7QUFSZSw2QkFBcUIsd0JBUXBDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudEZhY3RvcnksIFR5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHtSb3V0ZX0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHtQUklNQVJZX09VVExFVCwgUGFyYW1zfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQge1VybFBhdGhXaXRoUGFyYW1zLCBVcmxTZWdtZW50LCBVcmxUcmVlfSBmcm9tICcuL3VybF90cmVlJztcbmltcG9ydCB7c2hhbGxvd0VxdWFsfSBmcm9tICcuL3V0aWxzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtUcmVlLCBUcmVlTm9kZX0gZnJvbSAnLi91dGlscy90cmVlJztcblxuXG4vKipcbiAqIFRoZSBzdGF0ZSBvZiB0aGUgcm91dGVyLlxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqIGBgYFxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlcikge1xuICogICAgIGNvbnN0IHN0YXRlID0gcm91dGVyLnJvdXRlclN0YXRlO1xuICogICAgIGNvbnN0IGlkOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBzdGF0ZS5maXJzdENoaWxkKHN0YXRlLnJvb3QpLnBhcmFtcy5tYXAocCA9PiBwLmlkKTtcbiAqICAgICBjb25zdCBpc0RlYnVnOiBPYnNlcnZhYmxlPHN0cmluZz4gPSBzdGF0ZS5xdWVyeVBhcmFtcy5tYXAocSA9PiBxLmRlYnVnKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBSb3V0ZXJTdGF0ZSBleHRlbmRzIFRyZWU8QWN0aXZhdGVkUm91dGU+IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICByb290OiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZT4sIHB1YmxpYyBxdWVyeVBhcmFtczogT2JzZXJ2YWJsZTxQYXJhbXM+LFxuICAgICAgcHVibGljIGZyYWdtZW50OiBPYnNlcnZhYmxlPHN0cmluZz4sIHB1YmxpYyBzbmFwc2hvdDogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xuICAgIHN1cGVyKHJvb3QpO1xuICB9XG5cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuc25hcHNob3QudG9TdHJpbmcoKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRW1wdHlTdGF0ZSh1cmxUcmVlOiBVcmxUcmVlLCByb290Q29tcG9uZW50OiBUeXBlKTogUm91dGVyU3RhdGUge1xuICBjb25zdCBzbmFwc2hvdCA9IGNyZWF0ZUVtcHR5U3RhdGVTbmFwc2hvdCh1cmxUcmVlLCByb290Q29tcG9uZW50KTtcbiAgY29uc3QgZW1wdHlVcmwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtuZXcgVXJsUGF0aFdpdGhQYXJhbXMoJycsIHt9KV0pO1xuICBjb25zdCBlbXB0eVBhcmFtcyA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xuICBjb25zdCBlbXB0eVF1ZXJ5UGFyYW1zID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gIGNvbnN0IGZyYWdtZW50ID0gbmV3IEJlaGF2aW9yU3ViamVjdCgnJyk7XG4gIGNvbnN0IGFjdGl2YXRlZCA9XG4gICAgICBuZXcgQWN0aXZhdGVkUm91dGUoZW1wdHlVcmwsIGVtcHR5UGFyYW1zLCBQUklNQVJZX09VVExFVCwgcm9vdENvbXBvbmVudCwgc25hcHNob3Qucm9vdCk7XG4gIGFjdGl2YXRlZC5zbmFwc2hvdCA9IHNuYXBzaG90LnJvb3Q7XG4gIHJldHVybiBuZXcgUm91dGVyU3RhdGUoXG4gICAgICBuZXcgVHJlZU5vZGU8QWN0aXZhdGVkUm91dGU+KGFjdGl2YXRlZCwgW10pLCBlbXB0eVF1ZXJ5UGFyYW1zLCBmcmFnbWVudCwgc25hcHNob3QpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbXB0eVN0YXRlU25hcHNob3QodXJsVHJlZTogVXJsVHJlZSwgcm9vdENvbXBvbmVudDogVHlwZSk6IFJvdXRlclN0YXRlU25hcHNob3Qge1xuICBjb25zdCBlbXB0eVBhcmFtcyA9IHt9O1xuICBjb25zdCBlbXB0eVF1ZXJ5UGFyYW1zID0ge307XG4gIGNvbnN0IGZyYWdtZW50ID0gJyc7XG4gIGNvbnN0IGFjdGl2YXRlZCA9IG5ldyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KFxuICAgICAgW10sIGVtcHR5UGFyYW1zLCBQUklNQVJZX09VVExFVCwgcm9vdENvbXBvbmVudCwgbnVsbCwgdXJsVHJlZS5yb290LCAtMSk7XG4gIHJldHVybiBuZXcgUm91dGVyU3RhdGVTbmFwc2hvdChcbiAgICAgICcnLCBuZXcgVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4oYWN0aXZhdGVkLCBbXSksIGVtcHR5UXVlcnlQYXJhbXMsIGZyYWdtZW50KTtcbn1cblxuLyoqXG4gKiBDb250YWlucyB0aGUgaW5mb3JtYXRpb24gYWJvdXQgYSBjb21wb25lbnQgbG9hZGVkIGluIGFuIG91dGxldC4gVGhlIGluZm9ybWF0aW9uIGlzIHByb3ZpZGVkXG4gKiB0aHJvdWdoXG4gKiB0aGUgcGFyYW1zIGFuZCB1cmxTZWdtZW50cyBvYnNlcnZhYmxlcy5cbiAqXG4gKiAjIyMgVXNhZ2VcbiAqXG4gKiBgYGBcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgY29uc3RydWN0b3Iocm91dGU6IEFjdGl2YXRlZFJvdXRlKSB7XG4gKiAgICAgY29uc3QgaWQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHJvdXRlLnBhcmFtcy5tYXAocCA9PiBwLmlkKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBBY3RpdmF0ZWRSb3V0ZSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2Z1dHVyZVNuYXBzaG90OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90O1xuICBzbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdDtcblxuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB1cmw6IE9ic2VydmFibGU8VXJsUGF0aFdpdGhQYXJhbXNbXT4sIHB1YmxpYyBwYXJhbXM6IE9ic2VydmFibGU8UGFyYW1zPixcbiAgICAgIHB1YmxpYyBvdXRsZXQ6IHN0cmluZywgcHVibGljIGNvbXBvbmVudDogVHlwZXxzdHJpbmcsXG4gICAgICBmdXR1cmVTbmFwc2hvdDogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCkge1xuICAgIHRoaXMuX2Z1dHVyZVNuYXBzaG90ID0gZnV0dXJlU25hcHNob3Q7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNuYXBzaG90ID8gdGhpcy5zbmFwc2hvdC50b1N0cmluZygpIDogYEZ1dHVyZSgke3RoaXMuX2Z1dHVyZVNuYXBzaG90fSlgO1xuICB9XG59XG5cbi8qKlxuICogQ29udGFpbnMgdGhlIGluZm9ybWF0aW9uIGFib3V0IGEgY29tcG9uZW50IGxvYWRlZCBpbiBhbiBvdXRsZXQgYXQgYSBwYXJ0aWN1bGFyIG1vbWVudCBpbiB0aW1lLlxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqIGBgYFxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3Rvcihyb3V0ZTogQWN0aXZhdGVkUm91dGUpIHtcbiAqICAgICBjb25zdCBpZDogc3RyaW5nID0gcm91dGUuc25hcHNob3QucGFyYW1zLmlkO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIEFjdGl2YXRlZFJvdXRlU25hcHNob3Qge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqL1xuICBfcmVzb2x2ZWRDb21wb25lbnRGYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT47XG5cbiAgLyoqIEBpbnRlcm5hbCAqKi9cbiAgX3JvdXRlQ29uZmlnOiBSb3V0ZTtcblxuICAvKiogQGludGVybmFsICoqL1xuICBfdXJsU2VnbWVudDogVXJsU2VnbWVudDtcblxuICBfbGFzdFBhdGhJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHVybDogVXJsUGF0aFdpdGhQYXJhbXNbXSwgcHVibGljIHBhcmFtczogUGFyYW1zLCBwdWJsaWMgb3V0bGV0OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgY29tcG9uZW50OiBUeXBlfHN0cmluZywgcm91dGVDb25maWc6IFJvdXRlLCB1cmxTZWdtZW50OiBVcmxTZWdtZW50LFxuICAgICAgbGFzdFBhdGhJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcm91dGVDb25maWcgPSByb3V0ZUNvbmZpZztcbiAgICB0aGlzLl91cmxTZWdtZW50ID0gdXJsU2VnbWVudDtcbiAgICB0aGlzLl9sYXN0UGF0aEluZGV4ID0gbGFzdFBhdGhJbmRleDtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgY29uc3QgdXJsID0gdGhpcy51cmwubWFwKHMgPT4gcy50b1N0cmluZygpKS5qb2luKCcvJyk7XG4gICAgY29uc3QgbWF0Y2hlZCA9IHRoaXMuX3JvdXRlQ29uZmlnID8gdGhpcy5fcm91dGVDb25maWcucGF0aCA6ICcnO1xuICAgIHJldHVybiBgUm91dGUodXJsOicke3VybH0nLCBwYXRoOicke21hdGNoZWR9JylgO1xuICB9XG59XG5cbi8qKlxuICogVGhlIHN0YXRlIG9mIHRoZSByb3V0ZXIgYXQgYSBwYXJ0aWN1bGFyIG1vbWVudCBpbiB0aW1lLlxuICpcbiAqICMjIyBVc2FnZVxuICpcbiAqIGBgYFxuICogY2xhc3MgTXlDb21wb25lbnQge1xuICogICBjb25zdHJ1Y3Rvcihyb3V0ZXI6IFJvdXRlcikge1xuICogICAgIGNvbnN0IHNuYXBzaG90ID0gcm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90O1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIFJvdXRlclN0YXRlU25hcHNob3QgZXh0ZW5kcyBUcmVlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdXJsOiBzdHJpbmcsIHJvb3Q6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+LCBwdWJsaWMgcXVlcnlQYXJhbXM6IFBhcmFtcyxcbiAgICAgIHB1YmxpYyBmcmFnbWVudDogc3RyaW5nKSB7XG4gICAgc3VwZXIocm9vdCk7XG4gIH1cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gc2VyaWFsaXplTm9kZSh0aGlzLl9yb290KTsgfVxufVxuXG5mdW5jdGlvbiBzZXJpYWxpemVOb2RlKG5vZGU6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+KTogc3RyaW5nIHtcbiAgY29uc3QgYyA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGAgeyAke25vZGUuY2hpbGRyZW4ubWFwKHNlcmlhbGl6ZU5vZGUpLmpvaW4oXCIsIFwiKX0gfSBgIDogJyc7XG4gIHJldHVybiBgJHtub2RlLnZhbHVlfSR7Y31gO1xufVxuXG5cbi8qKlxuICogVGhlIGV4cGVjdGF0aW9uIGlzIHRoYXQgdGhlIGFjdGl2YXRlIHJvdXRlIGlzIGNyZWF0ZWQgd2l0aCB0aGUgcmlnaHQgc2V0IG9mIHBhcmFtZXRlcnMuXG4gKiBTbyB3ZSBwdXNoIG5ldyB2YWx1ZXMgaW50byB0aGUgb2JzZXJ2YWJsZXMgb25seSB3aGVuIHRoZXkgYXJlIG5vdCB0aGUgaW5pdGlhbCB2YWx1ZXMuXG4gKiBBbmQgd2UgZGV0ZWN0IHRoYXQgYnkgY2hlY2tpbmcgaWYgdGhlIHNuYXBzaG90IGZpZWxkIGlzIHNldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkdmFuY2VBY3RpdmF0ZWRSb3V0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGUpOiB2b2lkIHtcbiAgaWYgKHJvdXRlLnNuYXBzaG90ICYmICFzaGFsbG93RXF1YWwocm91dGUuc25hcHNob3QucGFyYW1zLCByb3V0ZS5fZnV0dXJlU25hcHNob3QucGFyYW1zKSkge1xuICAgIHJvdXRlLnNuYXBzaG90ID0gcm91dGUuX2Z1dHVyZVNuYXBzaG90O1xuICAgICg8YW55PnJvdXRlLnVybCkubmV4dChyb3V0ZS5zbmFwc2hvdC51cmwpO1xuICAgICg8YW55PnJvdXRlLnBhcmFtcykubmV4dChyb3V0ZS5zbmFwc2hvdC5wYXJhbXMpO1xuICB9IGVsc2Uge1xuICAgIHJvdXRlLnNuYXBzaG90ID0gcm91dGUuX2Z1dHVyZVNuYXBzaG90O1xuICB9XG59Il19

/***/ },
/* 424 */
/***/ function(module, exports) {

	"use strict";
	var Tree = (function () {
	    function Tree(root) {
	        this._root = root;
	    }
	    Object.defineProperty(Tree.prototype, "root", {
	        get: function () { return this._root.value; },
	        enumerable: true,
	        configurable: true
	    });
	    Tree.prototype.parent = function (t) {
	        var p = this.pathFromRoot(t);
	        return p.length > 1 ? p[p.length - 2] : null;
	    };
	    Tree.prototype.children = function (t) {
	        var n = findNode(t, this._root);
	        return n ? n.children.map(function (t) { return t.value; }) : [];
	    };
	    Tree.prototype.firstChild = function (t) {
	        var n = findNode(t, this._root);
	        return n && n.children.length > 0 ? n.children[0].value : null;
	    };
	    Tree.prototype.siblings = function (t) {
	        var p = findPath(t, this._root, []);
	        if (p.length < 2)
	            return [];
	        var c = p[p.length - 2].children.map(function (c) { return c.value; });
	        return c.filter(function (cc) { return cc !== t; });
	    };
	    Tree.prototype.pathFromRoot = function (t) { return findPath(t, this._root, []).map(function (s) { return s.value; }); };
	    Tree.prototype.contains = function (tree) { return contains(this._root, tree._root); };
	    return Tree;
	}());
	exports.Tree = Tree;
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
	        if (r)
	            return r;
	    }
	    return [];
	}
	function contains(tree, subtree) {
	    if (tree.value !== subtree.value)
	        return false;
	    var _loop_1 = function(subtreeNode) {
	        var s = tree.children.filter(function (child) { return child.value === subtreeNode.value; });
	        if (s.length === 0)
	            return { value: false };
	        if (!contains(s[0], subtreeNode))
	            return { value: false };
	    };
	    for (var _i = 0, _a = subtree.children; _i < _a.length; _i++) {
	        var subtreeNode = _a[_i];
	        var state_1 = _loop_1(subtreeNode);
	        if (typeof state_1 === "object") return state_1.value;
	    }
	    return true;
	}
	var TreeNode = (function () {
	    function TreeNode(value, children) {
	        this.value = value;
	        this.children = children;
	    }
	    TreeNode.prototype.toString = function () { return "TreeNode(" + this.value + ")"; };
	    return TreeNode;
	}());
	exports.TreeNode = TreeNode;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUlFLGNBQVksSUFBaUI7UUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUFDLENBQUM7SUFFckQsc0JBQUksc0JBQUk7YUFBUixjQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUUxQyxxQkFBTSxHQUFOLFVBQU8sQ0FBSTtRQUNULElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBRUQsdUJBQVEsR0FBUixVQUFTLENBQUk7UUFDWCxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHlCQUFVLEdBQVYsVUFBVyxDQUFJO1FBQ2IsSUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pFLENBQUM7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SyxFQUFqQyxDQUFpQyxDQUFDLENBQUM7UUFDM0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7WUFBQyxnQkFBTyxLQUFLLEdBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQUMsZ0JBQU8sS0FBSyxHQUFDOztJQUhqRCxHQUFHLENBQUMsQ0FBb0IsVUFBZ0IsRUFBaEIsS0FBQSxPQUFPLENBQUMsUUFBUSxFQUFoQixjQUFnQixFQUFoQixJQUFnQixDQUFDO1FBQXBDLElBQUksV0FBVyxTQUFBOzs7S0FJbkI7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUVEO0lBQ0Usa0JBQW1CLEtBQVEsRUFBUyxRQUF1QjtRQUF4QyxVQUFLLEdBQUwsS0FBSyxDQUFHO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBZTtJQUFHLENBQUM7SUFFL0QsMkJBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsY0FBWSxJQUFJLENBQUMsS0FBSyxNQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFELGVBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLGdCQUFRLFdBSXBCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVHJlZTxUPiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3Jvb3Q6IFRyZWVOb2RlPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKHJvb3Q6IFRyZWVOb2RlPFQ+KSB7IHRoaXMuX3Jvb3QgPSByb290OyB9XG5cbiAgZ2V0IHJvb3QoKTogVCB7IHJldHVybiB0aGlzLl9yb290LnZhbHVlOyB9XG5cbiAgcGFyZW50KHQ6IFQpOiBUIHtcbiAgICBjb25zdCBwID0gdGhpcy5wYXRoRnJvbVJvb3QodCk7XG4gICAgcmV0dXJuIHAubGVuZ3RoID4gMSA/IHBbcC5sZW5ndGggLSAyXSA6IG51bGw7XG4gIH1cblxuICBjaGlsZHJlbih0OiBUKTogVFtdIHtcbiAgICBjb25zdCBuID0gZmluZE5vZGUodCwgdGhpcy5fcm9vdCk7XG4gICAgcmV0dXJuIG4gPyBuLmNoaWxkcmVuLm1hcCh0ID0+IHQudmFsdWUpIDogW107XG4gIH1cblxuICBmaXJzdENoaWxkKHQ6IFQpOiBUIHtcbiAgICBjb25zdCBuID0gZmluZE5vZGUodCwgdGhpcy5fcm9vdCk7XG4gICAgcmV0dXJuIG4gJiYgbi5jaGlsZHJlbi5sZW5ndGggPiAwID8gbi5jaGlsZHJlblswXS52YWx1ZSA6IG51bGw7XG4gIH1cblxuICBzaWJsaW5ncyh0OiBUKTogVFtdIHtcbiAgICBjb25zdCBwID0gZmluZFBhdGgodCwgdGhpcy5fcm9vdCwgW10pO1xuICAgIGlmIChwLmxlbmd0aCA8IDIpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IGMgPSBwW3AubGVuZ3RoIC0gMl0uY2hpbGRyZW4ubWFwKGMgPT4gYy52YWx1ZSk7XG4gICAgcmV0dXJuIGMuZmlsdGVyKGNjID0+IGNjICE9PSB0KTtcbiAgfVxuXG4gIHBhdGhGcm9tUm9vdCh0OiBUKTogVFtdIHsgcmV0dXJuIGZpbmRQYXRoKHQsIHRoaXMuX3Jvb3QsIFtdKS5tYXAocyA9PiBzLnZhbHVlKTsgfVxuXG4gIGNvbnRhaW5zKHRyZWU6IFRyZWU8VD4pOiBib29sZWFuIHsgcmV0dXJuIGNvbnRhaW5zKHRoaXMuX3Jvb3QsIHRyZWUuX3Jvb3QpOyB9XG59XG5cbmZ1bmN0aW9uIGZpbmROb2RlPFQ+KGV4cGVjdGVkOiBULCBjOiBUcmVlTm9kZTxUPik6IFRyZWVOb2RlPFQ+IHtcbiAgaWYgKGV4cGVjdGVkID09PSBjLnZhbHVlKSByZXR1cm4gYztcbiAgZm9yIChsZXQgY2Mgb2YgYy5jaGlsZHJlbikge1xuICAgIGNvbnN0IHIgPSBmaW5kTm9kZShleHBlY3RlZCwgY2MpO1xuICAgIGlmIChyKSByZXR1cm4gcjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZmluZFBhdGg8VD4oZXhwZWN0ZWQ6IFQsIGM6IFRyZWVOb2RlPFQ+LCBjb2xsZWN0ZWQ6IFRyZWVOb2RlPFQ+W10pOiBUcmVlTm9kZTxUPltdIHtcbiAgY29sbGVjdGVkLnB1c2goYyk7XG4gIGlmIChleHBlY3RlZCA9PT0gYy52YWx1ZSkgcmV0dXJuIGNvbGxlY3RlZDtcblxuICBmb3IgKGxldCBjYyBvZiBjLmNoaWxkcmVuKSB7XG4gICAgY29uc3QgY2xvbmVkID0gY29sbGVjdGVkLnNsaWNlKDApO1xuICAgIGNvbnN0IHIgPSBmaW5kUGF0aChleHBlY3RlZCwgY2MsIGNsb25lZCk7XG4gICAgaWYgKHIpIHJldHVybiByO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuXG5mdW5jdGlvbiBjb250YWluczxUPih0cmVlOiBUcmVlTm9kZTxUPiwgc3VidHJlZTogVHJlZU5vZGU8VD4pOiBib29sZWFuIHtcbiAgaWYgKHRyZWUudmFsdWUgIT09IHN1YnRyZWUudmFsdWUpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGxldCBzdWJ0cmVlTm9kZSBvZiBzdWJ0cmVlLmNoaWxkcmVuKSB7XG4gICAgY29uc3QgcyA9IHRyZWUuY2hpbGRyZW4uZmlsdGVyKGNoaWxkID0+IGNoaWxkLnZhbHVlID09PSBzdWJ0cmVlTm9kZS52YWx1ZSk7XG4gICAgaWYgKHMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjb250YWlucyhzWzBdLCBzdWJ0cmVlTm9kZSkpIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgY2xhc3MgVHJlZU5vZGU8VD4ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdmFsdWU6IFQsIHB1YmxpYyBjaGlsZHJlbjogVHJlZU5vZGU8VD5bXSkge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYFRyZWVOb2RlKCR7dGhpcy52YWx1ZX0pYDsgfVxufSJdfQ==

/***/ },
/* 425 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var shared_1 = __webpack_require__(416);
	var url_tree_1 = __webpack_require__(417);
	var collection_1 = __webpack_require__(419);
	function createUrlTree(route, urlTree, commands, queryParams, fragment) {
	    if (commands.length === 0) {
	        return tree(urlTree.root, urlTree.root, urlTree, queryParams, fragment);
	    }
	    var normalizedCommands = normalizeCommands(commands);
	    if (navigateToRoot(normalizedCommands)) {
	        return tree(urlTree.root, new url_tree_1.UrlSegment([], {}), urlTree, queryParams, fragment);
	    }
	    var startingPosition = findStartingPosition(normalizedCommands, urlTree, route);
	    var segment = startingPosition.processChildren ?
	        updateSegmentChildren(startingPosition.segment, startingPosition.index, normalizedCommands.commands) :
	        updateSegment(startingPosition.segment, startingPosition.index, normalizedCommands.commands);
	    return tree(startingPosition.segment, segment, urlTree, queryParams, fragment);
	}
	exports.createUrlTree = createUrlTree;
	function tree(oldSegment, newSegment, urlTree, queryParams, fragment) {
	    var q = queryParams ? stringify(queryParams) : urlTree.queryParams;
	    var f = fragment ? fragment : urlTree.fragment;
	    if (urlTree.root === oldSegment) {
	        return new url_tree_1.UrlTree(newSegment, q, f);
	    }
	    else {
	        return new url_tree_1.UrlTree(replaceSegment(urlTree.root, oldSegment, newSegment), q, f);
	    }
	}
	function replaceSegment(current, oldSegment, newSegment) {
	    var children = {};
	    collection_1.forEach(current.children, function (c, outletName) {
	        if (c === oldSegment) {
	            children[outletName] = newSegment;
	        }
	        else {
	            children[outletName] = replaceSegment(c, oldSegment, newSegment);
	        }
	    });
	    return new url_tree_1.UrlSegment(current.pathsWithParams, children);
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
	    for (var i = 0; i < commands.length; ++i) {
	        var c = commands[i];
	        if (!(typeof c === 'string')) {
	            res.push(c);
	            continue;
	        }
	        var parts = c.split('/');
	        for (var j = 0; j < parts.length; ++j) {
	            var cc = parts[j];
	            if (i == 0) {
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
	            else {
	                if (cc != '') {
	                    res.push(cc);
	                }
	            }
	        }
	    }
	    return new NormalizedNavigationCommands(isAbsolute, numberOfDoubleDots, res);
	}
	var Position = (function () {
	    function Position(segment, processChildren, index) {
	        this.segment = segment;
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
	    else if (route.snapshot._lastPathIndex + 1 - normalizedChange.numberOfDoubleDots >= 0) {
	        return new Position(route.snapshot._urlSegment, false, route.snapshot._lastPathIndex + 1 - normalizedChange.numberOfDoubleDots);
	    }
	    else {
	        throw new Error('Invalid number of \'../\'');
	    }
	}
	function getPath(command) {
	    if (!(typeof command === 'string'))
	        return command.toString();
	    var parts = command.toString().split(':');
	    return parts.length > 1 ? parts[1] : command;
	}
	function getOutlet(commands) {
	    if (!(typeof commands[0] === 'string'))
	        return shared_1.PRIMARY_OUTLET;
	    var parts = commands[0].toString().split(':');
	    return parts.length > 1 ? parts[0] : shared_1.PRIMARY_OUTLET;
	}
	function updateSegment(segment, startIndex, commands) {
	    if (!segment) {
	        segment = new url_tree_1.UrlSegment([], {});
	    }
	    if (segment.pathsWithParams.length === 0 && Object.keys(segment.children).length > 0) {
	        return updateSegmentChildren(segment, startIndex, commands);
	    }
	    var m = prefixedWith(segment, startIndex, commands);
	    var slicedCommands = commands.slice(m.lastIndex);
	    if (m.match && slicedCommands.length === 0) {
	        return new url_tree_1.UrlSegment(segment.pathsWithParams, {});
	    }
	    else if (m.match && Object.keys(segment.children).length === 0) {
	        return createNewSegment(segment, startIndex, commands);
	    }
	    else if (m.match) {
	        return updateSegmentChildren(segment, 0, slicedCommands);
	    }
	    else {
	        return createNewSegment(segment, startIndex, commands);
	    }
	}
	function updateSegmentChildren(segment, startIndex, commands) {
	    if (commands.length === 0) {
	        return new url_tree_1.UrlSegment(segment.pathsWithParams, {});
	    }
	    else {
	        var outlet_1 = getOutlet(commands);
	        var children_1 = {};
	        children_1[outlet_1] = updateSegment(segment.children[outlet_1], startIndex, commands);
	        collection_1.forEach(segment.children, function (child, childOutlet) {
	            if (childOutlet !== outlet_1) {
	                children_1[childOutlet] = child;
	            }
	        });
	        return new url_tree_1.UrlSegment(segment.pathsWithParams, children_1);
	    }
	}
	function prefixedWith(segment, startIndex, commands) {
	    var currentCommandIndex = 0;
	    var currentPathIndex = startIndex;
	    var noMatch = { match: false, lastIndex: 0 };
	    while (currentPathIndex < segment.pathsWithParams.length) {
	        if (currentCommandIndex >= commands.length)
	            return noMatch;
	        var path = segment.pathsWithParams[currentPathIndex];
	        var curr = getPath(commands[currentCommandIndex]);
	        var next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
	        if (curr && next && (typeof next === 'object')) {
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
	function createNewSegment(segment, startIndex, commands) {
	    var paths = segment.pathsWithParams.slice(0, startIndex);
	    var i = 0;
	    while (i < commands.length) {
	        if (i === 0 && (typeof commands[0] === 'object')) {
	            var p = segment.pathsWithParams[startIndex];
	            paths.push(new url_tree_1.UrlPathWithParams(p.path, commands[0]));
	            i++;
	            continue;
	        }
	        var curr = getPath(commands[i]);
	        var next = (i < commands.length - 1) ? commands[i + 1] : null;
	        if (curr && next && (typeof next === 'object')) {
	            paths.push(new url_tree_1.UrlPathWithParams(curr, stringify(next)));
	            i += 2;
	        }
	        else {
	            paths.push(new url_tree_1.UrlPathWithParams(curr, {}));
	            i++;
	        }
	    }
	    return new url_tree_1.UrlSegment(paths, {});
	}
	function stringify(params) {
	    var res = {};
	    collection_1.forEach(params, function (v, k) { return res[k] = "" + v; });
	    return res;
	}
	function compare(path, params, pathWithParams) {
	    return path == pathWithParams.path && collection_1.shallowEqual(params, pathWithParams.parameters);
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX3VybF90cmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZV91cmxfdHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsdUJBQXFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2hELHlCQUFxRCxZQUFZLENBQUMsQ0FBQTtBQUNsRSwyQkFBb0Msb0JBQW9CLENBQUMsQ0FBQTtBQUV6RCx1QkFDSSxLQUFxQixFQUFFLE9BQWdCLEVBQUUsUUFBZSxFQUFFLFdBQW1CLEVBQzdFLFFBQWdCO0lBQ2xCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxJQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxxQkFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxJQUFNLGdCQUFnQixHQUFHLG9CQUFvQixDQUFDLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRixJQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlO1FBQzVDLHFCQUFxQixDQUNqQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztRQUNsRixhQUFhLENBQUMsZ0JBQWdCLENB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QkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1QyxDQUFDLEVBQUUsQ0FBQztRQUNOLENBQUM7SUFDSCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUkscUJBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELG1CQUFtQixNQUE0QjtJQUM3QyxJQUFNLEdBQUcsR0FBNEIsRUFBRSxDQUFDO0lBQ3hDLG9CQUFPLENBQUMsTUFBTSxFQUFFLFVBQUMsQ0FBTSxFQUFFLENBQVMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFHLENBQUcsRUFBZixDQUFlLENBQUMsQ0FBQztJQUN4RCxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELGlCQUNJLElBQVksRUFBRSxNQUE0QixFQUFFLGNBQWlDO0lBQy9FLE1BQU0sQ0FBQyxJQUFJLElBQUksY0FBYyxDQUFDLElBQUksSUFBSSx5QkFBWSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gJy4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7UFJJTUFSWV9PVVRMRVQsIFBhcmFtc30gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtVcmxQYXRoV2l0aFBhcmFtcywgVXJsU2VnbWVudCwgVXJsVHJlZX0gZnJvbSAnLi91cmxfdHJlZSc7XG5pbXBvcnQge2ZvckVhY2gsIHNoYWxsb3dFcXVhbH0gZnJvbSAnLi91dGlscy9jb2xsZWN0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVybFRyZWUoXG4gICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlLCB1cmxUcmVlOiBVcmxUcmVlLCBjb21tYW5kczogYW55W10sIHF1ZXJ5UGFyYW1zOiBQYXJhbXMsXG4gICAgZnJhZ21lbnQ6IHN0cmluZyk6IFVybFRyZWUge1xuICBpZiAoY29tbWFuZHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRyZWUodXJsVHJlZS5yb290LCB1cmxUcmVlLnJvb3QsIHVybFRyZWUsIHF1ZXJ5UGFyYW1zLCBmcmFnbWVudCk7XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkQ29tbWFuZHMgPSBub3JtYWxpemVDb21tYW5kcyhjb21tYW5kcyk7XG4gIGlmIChuYXZpZ2F0ZVRvUm9vdChub3JtYWxpemVkQ29tbWFuZHMpKSB7XG4gICAgcmV0dXJuIHRyZWUodXJsVHJlZS5yb290LCBuZXcgVXJsU2VnbWVudChbXSwge30pLCB1cmxUcmVlLCBxdWVyeVBhcmFtcywgZnJhZ21lbnQpO1xuICB9XG5cbiAgY29uc3Qgc3RhcnRpbmdQb3NpdGlvbiA9IGZpbmRTdGFydGluZ1Bvc2l0aW9uKG5vcm1hbGl6ZWRDb21tYW5kcywgdXJsVHJlZSwgcm91dGUpO1xuICBjb25zdCBzZWdtZW50ID0gc3RhcnRpbmdQb3NpdGlvbi5wcm9jZXNzQ2hpbGRyZW4gP1xuICAgICAgdXBkYXRlU2VnbWVudENoaWxkcmVuKFxuICAgICAgICAgIHN0YXJ0aW5nUG9zaXRpb24uc2VnbWVudCwgc3RhcnRpbmdQb3NpdGlvbi5pbmRleCwgbm9ybWFsaXplZENvbW1hbmRzLmNvbW1hbmRzKSA6XG4gICAgICB1cGRhdGVTZWdtZW50KHN0YXJ0aW5nUG9zaXRpb24uc2VnbWVudCwgc3RhcnRpbmdQb3NpdGlvbi5pbmRleCwgbm9ybWFsaXplZENvbW1hbmRzLmNvbW1hbmRzKTtcbiAgcmV0dXJuIHRyZWUoc3RhcnRpbmdQb3NpdGlvbi5zZWdtZW50LCBzZWdtZW50LCB1cmxUcmVlLCBxdWVyeVBhcmFtcywgZnJhZ21lbnQpO1xufVxuXG5mdW5jdGlvbiB0cmVlKFxuICAgIG9sZFNlZ21lbnQ6IFVybFNlZ21lbnQsIG5ld1NlZ21lbnQ6IFVybFNlZ21lbnQsIHVybFRyZWU6IFVybFRyZWUsIHF1ZXJ5UGFyYW1zOiBQYXJhbXMsXG4gICAgZnJhZ21lbnQ6IHN0cmluZyk6IFVybFRyZWUge1xuICBjb25zdCBxID0gcXVlcnlQYXJhbXMgPyBzdHJpbmdpZnkocXVlcnlQYXJhbXMpIDogdXJsVHJlZS5xdWVyeVBhcmFtcztcbiAgY29uc3QgZiA9IGZyYWdtZW50ID8gZnJhZ21lbnQgOiB1cmxUcmVlLmZyYWdtZW50O1xuXG4gIGlmICh1cmxUcmVlLnJvb3QgPT09IG9sZFNlZ21lbnQpIHtcbiAgICByZXR1cm4gbmV3IFVybFRyZWUobmV3U2VnbWVudCwgcSwgZik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBVcmxUcmVlKHJlcGxhY2VTZWdtZW50KHVybFRyZWUucm9vdCwgb2xkU2VnbWVudCwgbmV3U2VnbWVudCksIHEsIGYpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTZWdtZW50KFxuICAgIGN1cnJlbnQ6IFVybFNlZ21lbnQsIG9sZFNlZ21lbnQ6IFVybFNlZ21lbnQsIG5ld1NlZ21lbnQ6IFVybFNlZ21lbnQpOiBVcmxTZWdtZW50IHtcbiAgY29uc3QgY2hpbGRyZW46IHtba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50fSA9IHt9O1xuICBmb3JFYWNoKGN1cnJlbnQuY2hpbGRyZW4sIChjOiBVcmxTZWdtZW50LCBvdXRsZXROYW1lOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoYyA9PT0gb2xkU2VnbWVudCkge1xuICAgICAgY2hpbGRyZW5bb3V0bGV0TmFtZV0gPSBuZXdTZWdtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZHJlbltvdXRsZXROYW1lXSA9IHJlcGxhY2VTZWdtZW50KGMsIG9sZFNlZ21lbnQsIG5ld1NlZ21lbnQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBuZXcgVXJsU2VnbWVudChjdXJyZW50LnBhdGhzV2l0aFBhcmFtcywgY2hpbGRyZW4pO1xufVxuXG5mdW5jdGlvbiBuYXZpZ2F0ZVRvUm9vdChub3JtYWxpemVkQ2hhbmdlOiBOb3JtYWxpemVkTmF2aWdhdGlvbkNvbW1hbmRzKTogYm9vbGVhbiB7XG4gIHJldHVybiBub3JtYWxpemVkQ2hhbmdlLmlzQWJzb2x1dGUgJiYgbm9ybWFsaXplZENoYW5nZS5jb21tYW5kcy5sZW5ndGggPT09IDEgJiZcbiAgICAgIG5vcm1hbGl6ZWRDaGFuZ2UuY29tbWFuZHNbMF0gPT0gJy8nO1xufVxuXG5jbGFzcyBOb3JtYWxpemVkTmF2aWdhdGlvbkNvbW1hbmRzIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgaXNBYnNvbHV0ZTogYm9vbGVhbiwgcHVibGljIG51bWJlck9mRG91YmxlRG90czogbnVtYmVyLCBwdWJsaWMgY29tbWFuZHM6IGFueVtdKSB7fVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVDb21tYW5kcyhjb21tYW5kczogYW55W10pOiBOb3JtYWxpemVkTmF2aWdhdGlvbkNvbW1hbmRzIHtcbiAgaWYgKCh0eXBlb2YgY29tbWFuZHNbMF0gPT09ICdzdHJpbmcnKSAmJiBjb21tYW5kcy5sZW5ndGggPT09IDEgJiYgY29tbWFuZHNbMF0gPT0gJy8nKSB7XG4gICAgcmV0dXJuIG5ldyBOb3JtYWxpemVkTmF2aWdhdGlvbkNvbW1hbmRzKHRydWUsIDAsIGNvbW1hbmRzKTtcbiAgfVxuXG4gIGxldCBudW1iZXJPZkRvdWJsZURvdHMgPSAwO1xuICBsZXQgaXNBYnNvbHV0ZSA9IGZhbHNlO1xuICBjb25zdCByZXM6IGFueVtdID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21tYW5kcy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGMgPSBjb21tYW5kc1tpXTtcblxuICAgIGlmICghKHR5cGVvZiBjID09PSAnc3RyaW5nJykpIHtcbiAgICAgIHJlcy5wdXNoKGMpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgcGFydHMgPSBjLnNwbGl0KCcvJyk7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7ICsraikge1xuICAgICAgbGV0IGNjID0gcGFydHNbal07XG5cbiAgICAgIC8vIGZpcnN0IGV4cCBpcyB0cmVhdGVkIGluIGEgc3BlY2lhbCB3YXlcbiAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgaWYgKGogPT0gMCAmJiBjYyA9PSAnLicpIHsgIC8vICAnLi9hJ1xuICAgICAgICAgIC8vIHNraXAgaXRcbiAgICAgICAgfSBlbHNlIGlmIChqID09IDAgJiYgY2MgPT0gJycpIHsgIC8vICAnL2EnXG4gICAgICAgICAgaXNBYnNvbHV0ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY2MgPT0gJy4uJykgeyAgLy8gICcuLi9hJ1xuICAgICAgICAgIG51bWJlck9mRG91YmxlRG90cysrO1xuICAgICAgICB9IGVsc2UgaWYgKGNjICE9ICcnKSB7XG4gICAgICAgICAgcmVzLnB1c2goY2MpO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjYyAhPSAnJykge1xuICAgICAgICAgIHJlcy5wdXNoKGNjKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgTm9ybWFsaXplZE5hdmlnYXRpb25Db21tYW5kcyhpc0Fic29sdXRlLCBudW1iZXJPZkRvdWJsZURvdHMsIHJlcyk7XG59XG5cbmNsYXNzIFBvc2l0aW9uIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNlZ21lbnQ6IFVybFNlZ21lbnQsIHB1YmxpYyBwcm9jZXNzQ2hpbGRyZW46IGJvb2xlYW4sIHB1YmxpYyBpbmRleDogbnVtYmVyKSB7fVxufVxuXG5mdW5jdGlvbiBmaW5kU3RhcnRpbmdQb3NpdGlvbihcbiAgICBub3JtYWxpemVkQ2hhbmdlOiBOb3JtYWxpemVkTmF2aWdhdGlvbkNvbW1hbmRzLCB1cmxUcmVlOiBVcmxUcmVlLFxuICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSk6IFBvc2l0aW9uIHtcbiAgaWYgKG5vcm1hbGl6ZWRDaGFuZ2UuaXNBYnNvbHV0ZSkge1xuICAgIHJldHVybiBuZXcgUG9zaXRpb24odXJsVHJlZS5yb290LCB0cnVlLCAwKTtcbiAgfSBlbHNlIGlmIChyb3V0ZS5zbmFwc2hvdC5fbGFzdFBhdGhJbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHJvdXRlLnNuYXBzaG90Ll91cmxTZWdtZW50LCB0cnVlLCAwKTtcbiAgfSBlbHNlIGlmIChyb3V0ZS5zbmFwc2hvdC5fbGFzdFBhdGhJbmRleCArIDEgLSBub3JtYWxpemVkQ2hhbmdlLm51bWJlck9mRG91YmxlRG90cyA+PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBQb3NpdGlvbihcbiAgICAgICAgcm91dGUuc25hcHNob3QuX3VybFNlZ21lbnQsIGZhbHNlLFxuICAgICAgICByb3V0ZS5zbmFwc2hvdC5fbGFzdFBhdGhJbmRleCArIDEgLSBub3JtYWxpemVkQ2hhbmdlLm51bWJlck9mRG91YmxlRG90cyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG51bWJlciBvZiBcXCcuLi9cXCcnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXRoKGNvbW1hbmQ6IGFueSk6IGFueSB7XG4gIGlmICghKHR5cGVvZiBjb21tYW5kID09PSAnc3RyaW5nJykpIHJldHVybiBjb21tYW5kLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHBhcnRzID0gY29tbWFuZC50b1N0cmluZygpLnNwbGl0KCc6Jyk7XG4gIHJldHVybiBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHNbMV0gOiBjb21tYW5kO1xufVxuXG5mdW5jdGlvbiBnZXRPdXRsZXQoY29tbWFuZHM6IGFueVtdKTogc3RyaW5nIHtcbiAgaWYgKCEodHlwZW9mIGNvbW1hbmRzWzBdID09PSAnc3RyaW5nJykpIHJldHVybiBQUklNQVJZX09VVExFVDtcbiAgY29uc3QgcGFydHMgPSBjb21tYW5kc1swXS50b1N0cmluZygpLnNwbGl0KCc6Jyk7XG4gIHJldHVybiBwYXJ0cy5sZW5ndGggPiAxID8gcGFydHNbMF0gOiBQUklNQVJZX09VVExFVDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2VnbWVudChzZWdtZW50OiBVcmxTZWdtZW50LCBzdGFydEluZGV4OiBudW1iZXIsIGNvbW1hbmRzOiBhbnlbXSk6IFVybFNlZ21lbnQge1xuICBpZiAoIXNlZ21lbnQpIHtcbiAgICBzZWdtZW50ID0gbmV3IFVybFNlZ21lbnQoW10sIHt9KTtcbiAgfVxuICBpZiAoc2VnbWVudC5wYXRoc1dpdGhQYXJhbXMubGVuZ3RoID09PSAwICYmIE9iamVjdC5rZXlzKHNlZ21lbnQuY2hpbGRyZW4pLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gdXBkYXRlU2VnbWVudENoaWxkcmVuKHNlZ21lbnQsIHN0YXJ0SW5kZXgsIGNvbW1hbmRzKTtcbiAgfVxuICBjb25zdCBtID0gcHJlZml4ZWRXaXRoKHNlZ21lbnQsIHN0YXJ0SW5kZXgsIGNvbW1hbmRzKTtcbiAgY29uc3Qgc2xpY2VkQ29tbWFuZHMgPSBjb21tYW5kcy5zbGljZShtLmxhc3RJbmRleCk7XG5cbiAgaWYgKG0ubWF0Y2ggJiYgc2xpY2VkQ29tbWFuZHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBVcmxTZWdtZW50KHNlZ21lbnQucGF0aHNXaXRoUGFyYW1zLCB7fSk7XG4gIH0gZWxzZSBpZiAobS5tYXRjaCAmJiBPYmplY3Qua2V5cyhzZWdtZW50LmNoaWxkcmVuKS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gY3JlYXRlTmV3U2VnbWVudChzZWdtZW50LCBzdGFydEluZGV4LCBjb21tYW5kcyk7XG4gIH0gZWxzZSBpZiAobS5tYXRjaCkge1xuICAgIHJldHVybiB1cGRhdGVTZWdtZW50Q2hpbGRyZW4oc2VnbWVudCwgMCwgc2xpY2VkQ29tbWFuZHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjcmVhdGVOZXdTZWdtZW50KHNlZ21lbnQsIHN0YXJ0SW5kZXgsIGNvbW1hbmRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVTZWdtZW50Q2hpbGRyZW4oXG4gICAgc2VnbWVudDogVXJsU2VnbWVudCwgc3RhcnRJbmRleDogbnVtYmVyLCBjb21tYW5kczogYW55W10pOiBVcmxTZWdtZW50IHtcbiAgaWYgKGNvbW1hbmRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgVXJsU2VnbWVudChzZWdtZW50LnBhdGhzV2l0aFBhcmFtcywge30pO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IG91dGxldCA9IGdldE91dGxldChjb21tYW5kcyk7XG4gICAgY29uc3QgY2hpbGRyZW46IHtba2V5OiBzdHJpbmddOiBVcmxTZWdtZW50fSA9IHt9O1xuICAgIGNoaWxkcmVuW291dGxldF0gPSB1cGRhdGVTZWdtZW50KHNlZ21lbnQuY2hpbGRyZW5bb3V0bGV0XSwgc3RhcnRJbmRleCwgY29tbWFuZHMpO1xuICAgIGZvckVhY2goc2VnbWVudC5jaGlsZHJlbiwgKGNoaWxkOiBVcmxTZWdtZW50LCBjaGlsZE91dGxldDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoY2hpbGRPdXRsZXQgIT09IG91dGxldCkge1xuICAgICAgICBjaGlsZHJlbltjaGlsZE91dGxldF0gPSBjaGlsZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IFVybFNlZ21lbnQoc2VnbWVudC5wYXRoc1dpdGhQYXJhbXMsIGNoaWxkcmVuKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVmaXhlZFdpdGgoc2VnbWVudDogVXJsU2VnbWVudCwgc3RhcnRJbmRleDogbnVtYmVyLCBjb21tYW5kczogYW55W10pIHtcbiAgbGV0IGN1cnJlbnRDb21tYW5kSW5kZXggPSAwO1xuICBsZXQgY3VycmVudFBhdGhJbmRleCA9IHN0YXJ0SW5kZXg7XG5cbiAgY29uc3Qgbm9NYXRjaCA9IHttYXRjaDogZmFsc2UsIGxhc3RJbmRleDogMH07XG4gIHdoaWxlIChjdXJyZW50UGF0aEluZGV4IDwgc2VnbWVudC5wYXRoc1dpdGhQYXJhbXMubGVuZ3RoKSB7XG4gICAgaWYgKGN1cnJlbnRDb21tYW5kSW5kZXggPj0gY29tbWFuZHMubGVuZ3RoKSByZXR1cm4gbm9NYXRjaDtcbiAgICBjb25zdCBwYXRoID0gc2VnbWVudC5wYXRoc1dpdGhQYXJhbXNbY3VycmVudFBhdGhJbmRleF07XG4gICAgY29uc3QgY3VyciA9IGdldFBhdGgoY29tbWFuZHNbY3VycmVudENvbW1hbmRJbmRleF0pO1xuICAgIGNvbnN0IG5leHQgPVxuICAgICAgICBjdXJyZW50Q29tbWFuZEluZGV4IDwgY29tbWFuZHMubGVuZ3RoIC0gMSA/IGNvbW1hbmRzW2N1cnJlbnRDb21tYW5kSW5kZXggKyAxXSA6IG51bGw7XG5cbiAgICBpZiAoY3VyciAmJiBuZXh0ICYmICh0eXBlb2YgbmV4dCA9PT0gJ29iamVjdCcpKSB7XG4gICAgICBpZiAoIWNvbXBhcmUoY3VyciwgbmV4dCwgcGF0aCkpIHJldHVybiBub01hdGNoO1xuICAgICAgY3VycmVudENvbW1hbmRJbmRleCArPSAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWNvbXBhcmUoY3Vyciwge30sIHBhdGgpKSByZXR1cm4gbm9NYXRjaDtcbiAgICAgIGN1cnJlbnRDb21tYW5kSW5kZXgrKztcbiAgICB9XG4gICAgY3VycmVudFBhdGhJbmRleCsrO1xuICB9XG5cbiAgcmV0dXJuIHttYXRjaDogdHJ1ZSwgbGFzdEluZGV4OiBjdXJyZW50Q29tbWFuZEluZGV4fTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3U2VnbWVudChzZWdtZW50OiBVcmxTZWdtZW50LCBzdGFydEluZGV4OiBudW1iZXIsIGNvbW1hbmRzOiBhbnlbXSk6IFVybFNlZ21lbnQge1xuICBjb25zdCBwYXRocyA9IHNlZ21lbnQucGF0aHNXaXRoUGFyYW1zLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuICBsZXQgaSA9IDA7XG4gIHdoaWxlIChpIDwgY29tbWFuZHMubGVuZ3RoKSB7XG4gICAgLy8gaWYgd2Ugc3RhcnQgd2l0aCBhbiBvYmplY3QgbGl0ZXJhbCwgd2UgbmVlZCB0byByZXVzZSB0aGUgcGF0aCBwYXJ0IGZyb20gdGhlIHNlZ21lbnRcbiAgICBpZiAoaSA9PT0gMCAmJiAodHlwZW9mIGNvbW1hbmRzWzBdID09PSAnb2JqZWN0JykpIHtcbiAgICAgIGNvbnN0IHAgPSBzZWdtZW50LnBhdGhzV2l0aFBhcmFtc1tzdGFydEluZGV4XTtcbiAgICAgIHBhdGhzLnB1c2gobmV3IFVybFBhdGhXaXRoUGFyYW1zKHAucGF0aCwgY29tbWFuZHNbMF0pKTtcbiAgICAgIGkrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnIgPSBnZXRQYXRoKGNvbW1hbmRzW2ldKTtcbiAgICBjb25zdCBuZXh0ID0gKGkgPCBjb21tYW5kcy5sZW5ndGggLSAxKSA/IGNvbW1hbmRzW2kgKyAxXSA6IG51bGw7XG4gICAgaWYgKGN1cnIgJiYgbmV4dCAmJiAodHlwZW9mIG5leHQgPT09ICdvYmplY3QnKSkge1xuICAgICAgcGF0aHMucHVzaChuZXcgVXJsUGF0aFdpdGhQYXJhbXMoY3Vyciwgc3RyaW5naWZ5KG5leHQpKSk7XG4gICAgICBpICs9IDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhdGhzLnB1c2gobmV3IFVybFBhdGhXaXRoUGFyYW1zKGN1cnIsIHt9KSk7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgVXJsU2VnbWVudChwYXRocywge30pO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkocGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9IHtcbiAgY29uc3QgcmVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBmb3JFYWNoKHBhcmFtcywgKHY6IGFueSwgazogc3RyaW5nKSA9PiByZXNba10gPSBgJHt2fWApO1xuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBjb21wYXJlKFxuICAgIHBhdGg6IHN0cmluZywgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSwgcGF0aFdpdGhQYXJhbXM6IFVybFBhdGhXaXRoUGFyYW1zKTogYm9vbGVhbiB7XG4gIHJldHVybiBwYXRoID09IHBhdGhXaXRoUGFyYW1zLnBhdGggJiYgc2hhbGxvd0VxdWFsKHBhcmFtcywgcGF0aFdpdGhQYXJhbXMucGFyYW1ldGVycyk7XG59Il19

/***/ },
/* 426 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(38);
	var of_1 = __webpack_require__(354);
	var router_state_1 = __webpack_require__(423);
	var shared_1 = __webpack_require__(416);
	var url_tree_1 = __webpack_require__(417);
	var collection_1 = __webpack_require__(419);
	var tree_1 = __webpack_require__(424);
	var NoMatch = (function () {
	    function NoMatch(segment) {
	        if (segment === void 0) { segment = null; }
	        this.segment = segment;
	    }
	    return NoMatch;
	}());
	function recognize(rootComponentType, config, urlTree, url) {
	    try {
	        var children = processSegment(config, urlTree.root, shared_1.PRIMARY_OUTLET);
	        var root = new router_state_1.ActivatedRouteSnapshot([], {}, shared_1.PRIMARY_OUTLET, rootComponentType, null, urlTree.root, -1);
	        var rootNode = new tree_1.TreeNode(root, children);
	        return of_1.of(new router_state_1.RouterStateSnapshot(url, rootNode, urlTree.queryParams, urlTree.fragment));
	    }
	    catch (e) {
	        if (e instanceof NoMatch) {
	            return new Observable_1.Observable(function (obs) {
	                return obs.error(new Error("Cannot match any routes: '" + e.segment + "'"));
	            });
	        }
	        else {
	            return new Observable_1.Observable(function (obs) { return obs.error(e); });
	        }
	    }
	}
	exports.recognize = recognize;
	function processSegment(config, segment, outlet) {
	    if (segment.pathsWithParams.length === 0 && Object.keys(segment.children).length > 0) {
	        return processSegmentChildren(config, segment);
	    }
	    else {
	        return [processPathsWithParams(config, segment, 0, segment.pathsWithParams, outlet)];
	    }
	}
	function processSegmentChildren(config, segment) {
	    var children = url_tree_1.mapChildrenIntoArray(segment, function (child, childOutlet) { return processSegment(config, child, childOutlet); });
	    checkOutletNameUniqueness(children);
	    sortActivatedRouteSnapshots(children);
	    return children;
	}
	function sortActivatedRouteSnapshots(nodes) {
	    nodes.sort(function (a, b) {
	        if (a.value.outlet === shared_1.PRIMARY_OUTLET)
	            return -1;
	        if (b.value.outlet === shared_1.PRIMARY_OUTLET)
	            return 1;
	        return a.value.outlet.localeCompare(b.value.outlet);
	    });
	}
	function processPathsWithParams(config, segment, pathIndex, paths, outlet) {
	    for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
	        var r = config_1[_i];
	        try {
	            return processPathsWithParamsAgainstRoute(r, segment, pathIndex, paths, outlet);
	        }
	        catch (e) {
	            if (!(e instanceof NoMatch))
	                throw e;
	        }
	    }
	    throw new NoMatch(segment);
	}
	function processPathsWithParamsAgainstRoute(route, segment, pathIndex, paths, outlet) {
	    if (route.redirectTo)
	        throw new NoMatch();
	    if ((route.outlet ? route.outlet : shared_1.PRIMARY_OUTLET) !== outlet)
	        throw new NoMatch();
	    if (route.path === '**') {
	        var params = paths.length > 0 ? collection_1.last(paths).parameters : {};
	        var snapshot_1 = new router_state_1.ActivatedRouteSnapshot(paths, params, outlet, route.component, route, segment, -1);
	        return new tree_1.TreeNode(snapshot_1, []);
	    }
	    var _a = match(segment, route, paths), consumedPaths = _a.consumedPaths, parameters = _a.parameters, lastChild = _a.lastChild;
	    var snapshot = new router_state_1.ActivatedRouteSnapshot(consumedPaths, parameters, outlet, route.component, route, segment, pathIndex + lastChild - 1);
	    var slicedPath = paths.slice(lastChild);
	    var childConfig = route.children ? route.children : [];
	    if (childConfig.length === 0 && slicedPath.length === 0) {
	        return new tree_1.TreeNode(snapshot, []);
	    }
	    else if (slicedPath.length === 0 && Object.keys(segment.children).length > 0) {
	        var children = processSegmentChildren(childConfig, segment);
	        return new tree_1.TreeNode(snapshot, children);
	    }
	    else {
	        var child = processPathsWithParams(childConfig, segment, pathIndex + lastChild, slicedPath, shared_1.PRIMARY_OUTLET);
	        return new tree_1.TreeNode(snapshot, [child]);
	    }
	}
	function match(segment, route, paths) {
	    if (route.path === '') {
	        if (route.terminal && (Object.keys(segment.children).length > 0 || paths.length > 0)) {
	            throw new NoMatch();
	        }
	        else {
	            return { consumedPaths: [], lastChild: 0, parameters: {} };
	        }
	    }
	    var path = route.path;
	    var parts = path.split('/');
	    var posParameters = {};
	    var consumedPaths = [];
	    var currentIndex = 0;
	    for (var i = 0; i < parts.length; ++i) {
	        if (currentIndex >= paths.length)
	            throw new NoMatch();
	        var current = paths[currentIndex];
	        var p = parts[i];
	        var isPosParam = p.startsWith(':');
	        if (!isPosParam && p !== current.path)
	            throw new NoMatch();
	        if (isPosParam) {
	            posParameters[p.substring(1)] = current.path;
	        }
	        consumedPaths.push(current);
	        currentIndex++;
	    }
	    if (route.terminal && (Object.keys(segment.children).length > 0 || currentIndex < paths.length)) {
	        throw new NoMatch();
	    }
	    var parameters = collection_1.merge(posParameters, consumedPaths[consumedPaths.length - 1].parameters);
	    return { consumedPaths: consumedPaths, lastChild: currentIndex, parameters: parameters };
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JlY29nbml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFFM0MsbUJBQWtCLG9CQUFvQixDQUFDLENBQUE7QUFHdkMsNkJBQTBELGdCQUFnQixDQUFDLENBQUE7QUFDM0UsdUJBQTZCLFVBQVUsQ0FBQyxDQUFBO0FBQ3hDLHlCQUEyRSxZQUFZLENBQUMsQ0FBQTtBQUN4RiwyQkFBMEIsb0JBQW9CLENBQUMsQ0FBQTtBQUMvQyxxQkFBdUIsY0FBYyxDQUFDLENBQUE7QUFFdEM7SUFDRSxpQkFBbUIsT0FBMEI7UUFBakMsdUJBQWlDLEdBQWpDLGNBQWlDO1FBQTFCLFlBQU8sR0FBUCxPQUFPLENBQW1CO0lBQUcsQ0FBQztJQUNuRCxjQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFFRCxtQkFDSSxpQkFBdUIsRUFBRSxNQUFvQixFQUFFLE9BQWdCLEVBQy9ELEdBQVc7SUFDYixJQUFJLENBQUM7UUFDSCxJQUFNLFFBQVEsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsdUJBQWMsQ0FBQyxDQUFDO1FBQ3RFLElBQU0sSUFBSSxHQUFHLElBQUkscUNBQXNCLENBQ25DLEVBQUUsRUFBRSxFQUFFLEVBQUUsdUJBQWMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLElBQU0sUUFBUSxHQUFHLElBQUksZUFBUSxDQUF5QixJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEUsTUFBTSxDQUFDLE9BQUUsQ0FBRSxJQUFJLGtDQUFtQixDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM1RixDQUFFO0lBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQ2pCLFVBQUMsR0FBa0M7Z0JBQy9CLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQywrQkFBNkIsQ0FBQyxDQUFDLE9BQU8sTUFBRyxDQUFDLENBQUM7WUFBL0QsQ0FBK0QsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQ2pCLFVBQUMsR0FBa0MsSUFBSyxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQVosQ0FBWSxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBbkJlLGlCQUFTLFlBbUJ4QixDQUFBO0FBRUQsd0JBQ0ksTUFBZSxFQUFFLE9BQW1CLEVBQUUsTUFBYztJQUN0RCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsTUFBTSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztBQUNILENBQUM7QUFFRCxnQ0FDSSxNQUFlLEVBQUUsT0FBbUI7SUFDdEMsSUFBTSxRQUFRLEdBQUcsK0JBQW9CLENBQ2pDLE9BQU8sRUFBRSxVQUFDLEtBQUssRUFBRSxXQUFXLElBQUssT0FBQSxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQyxDQUFDO0lBQ2pGLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLDJCQUEyQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELHFDQUFxQyxLQUF5QztJQUM1RSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7UUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyx1QkFBYyxDQUFDO1lBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLHVCQUFjLENBQUM7WUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxnQ0FDSSxNQUFlLEVBQUUsT0FBbUIsRUFBRSxTQUFpQixFQUFFLEtBQTBCLEVBQ25GLE1BQWM7SUFDaEIsR0FBRyxDQUFDLENBQVUsVUFBTSxFQUFOLGlCQUFNLEVBQU4sb0JBQU0sRUFBTixJQUFNLENBQUM7UUFBaEIsSUFBSSxDQUFDLGVBQUE7UUFDUixJQUFJLENBQUM7WUFDSCxNQUFNLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xGLENBQUU7UUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxPQUFPLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQ0Y7SUFDRCxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFFRCw0Q0FDSSxLQUFZLEVBQUUsT0FBbUIsRUFBRSxTQUFpQixFQUFFLEtBQTBCLEVBQ2hGLE1BQWM7SUFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyx1QkFBYyxDQUFDLEtBQUssTUFBTSxDQUFDO1FBQUMsTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRW5GLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4QixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxpQkFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDOUQsSUFBTSxVQUFRLEdBQ1YsSUFBSSxxQ0FBc0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixNQUFNLENBQUMsSUFBSSxlQUFRLENBQXlCLFVBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsSUFBQSxpQ0FBMkUsRUFBcEUsZ0NBQWEsRUFBRSwwQkFBVSxFQUFFLHdCQUFTLENBQWlDO0lBRTVFLElBQU0sUUFBUSxHQUFHLElBQUkscUNBQXNCLENBQ3ZDLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFDbEUsU0FBUyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQixJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLElBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFekQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLGVBQVEsQ0FBeUIsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRzVELENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsSUFBTSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxJQUFJLGVBQVEsQ0FBeUIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRWxFLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLElBQU0sS0FBSyxHQUFHLHNCQUFzQixDQUNoQyxXQUFXLEVBQUUsT0FBTyxFQUFFLFNBQVMsR0FBRyxTQUFTLEVBQUUsVUFBVSxFQUFFLHVCQUFjLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsSUFBSSxlQUFRLENBQXlCLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztBQUNILENBQUM7QUFFRCxlQUFlLE9BQW1CLEVBQUUsS0FBWSxFQUFFLEtBQTBCO0lBQzFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRixNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDeEIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixJQUFNLGFBQWEsR0FBeUIsRUFBRSxDQUFDO0lBQy9DLElBQU0sYUFBYSxHQUF3QixFQUFFLENBQUM7SUFFOUMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBRXJCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsTUFBTSxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3RELElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVwQyxJQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQztZQUFDLE1BQU0sSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2YsYUFBYSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQy9DLENBQUM7UUFDRCxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLFlBQVksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRyxNQUFNLElBQUksT0FBTyxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQU0sVUFBVSxHQUFHLGtCQUFLLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVGLE1BQU0sQ0FBQyxFQUFDLGVBQUEsYUFBYSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBQSxVQUFVLEVBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRUQsbUNBQW1DLEtBQXlDO0lBQzFFLElBQU0sS0FBSyxHQUEwQyxFQUFFLENBQUM7SUFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7UUFDYixJQUFJLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFNLENBQUMsR0FBRyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RSxJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQVosQ0FBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMscURBQW1ELENBQUMsZUFBVSxDQUFDLE9BQUksQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQge09ic2VydmVyfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCB7b2YgfSBmcm9tICdyeGpzL29ic2VydmFibGUvb2YnO1xuXG5pbXBvcnQge1JvdXRlLCBSb3V0ZXJDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdH0gZnJvbSAnLi9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtQUklNQVJZX09VVExFVH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtVcmxQYXRoV2l0aFBhcmFtcywgVXJsU2VnbWVudCwgVXJsVHJlZSwgbWFwQ2hpbGRyZW5JbnRvQXJyYXl9IGZyb20gJy4vdXJsX3RyZWUnO1xuaW1wb3J0IHtsYXN0LCBtZXJnZX0gZnJvbSAnLi91dGlscy9jb2xsZWN0aW9uJztcbmltcG9ydCB7VHJlZU5vZGV9IGZyb20gJy4vdXRpbHMvdHJlZSc7XG5cbmNsYXNzIE5vTWF0Y2gge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2VnbWVudDogVXJsU2VnbWVudCA9IG51bGwpIHt9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWNvZ25pemUoXG4gICAgcm9vdENvbXBvbmVudFR5cGU6IFR5cGUsIGNvbmZpZzogUm91dGVyQ29uZmlnLCB1cmxUcmVlOiBVcmxUcmVlLFxuICAgIHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxSb3V0ZXJTdGF0ZVNuYXBzaG90PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBwcm9jZXNzU2VnbWVudChjb25maWcsIHVybFRyZWUucm9vdCwgUFJJTUFSWV9PVVRMRVQpO1xuICAgIGNvbnN0IHJvb3QgPSBuZXcgQWN0aXZhdGVkUm91dGVTbmFwc2hvdChcbiAgICAgICAgW10sIHt9LCBQUklNQVJZX09VVExFVCwgcm9vdENvbXBvbmVudFR5cGUsIG51bGwsIHVybFRyZWUucm9vdCwgLTEpO1xuICAgIGNvbnN0IHJvb3ROb2RlID0gbmV3IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+KHJvb3QsIGNoaWxkcmVuKTtcbiAgICByZXR1cm4gb2YgKG5ldyBSb3V0ZXJTdGF0ZVNuYXBzaG90KHVybCwgcm9vdE5vZGUsIHVybFRyZWUucXVlcnlQYXJhbXMsIHVybFRyZWUuZnJhZ21lbnQpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgTm9NYXRjaCkge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFJvdXRlclN0YXRlU25hcHNob3Q+KFxuICAgICAgICAgIChvYnM6IE9ic2VydmVyPFJvdXRlclN0YXRlU25hcHNob3Q+KSA9PlxuICAgICAgICAgICAgICBvYnMuZXJyb3IobmV3IEVycm9yKGBDYW5ub3QgbWF0Y2ggYW55IHJvdXRlczogJyR7ZS5zZWdtZW50fSdgKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Um91dGVyU3RhdGVTbmFwc2hvdD4oXG4gICAgICAgICAgKG9iczogT2JzZXJ2ZXI8Um91dGVyU3RhdGVTbmFwc2hvdD4pID0+IG9icy5lcnJvcihlKSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NTZWdtZW50KFxuICAgIGNvbmZpZzogUm91dGVbXSwgc2VnbWVudDogVXJsU2VnbWVudCwgb3V0bGV0OiBzdHJpbmcpOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PltdIHtcbiAgaWYgKHNlZ21lbnQucGF0aHNXaXRoUGFyYW1zLmxlbmd0aCA9PT0gMCAmJiBPYmplY3Qua2V5cyhzZWdtZW50LmNoaWxkcmVuKS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHByb2Nlc3NTZWdtZW50Q2hpbGRyZW4oY29uZmlnLCBzZWdtZW50KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW3Byb2Nlc3NQYXRoc1dpdGhQYXJhbXMoY29uZmlnLCBzZWdtZW50LCAwLCBzZWdtZW50LnBhdGhzV2l0aFBhcmFtcywgb3V0bGV0KV07XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1NlZ21lbnRDaGlsZHJlbihcbiAgICBjb25maWc6IFJvdXRlW10sIHNlZ21lbnQ6IFVybFNlZ21lbnQpOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PltdIHtcbiAgY29uc3QgY2hpbGRyZW4gPSBtYXBDaGlsZHJlbkludG9BcnJheShcbiAgICAgIHNlZ21lbnQsIChjaGlsZCwgY2hpbGRPdXRsZXQpID0+IHByb2Nlc3NTZWdtZW50KGNvbmZpZywgY2hpbGQsIGNoaWxkT3V0bGV0KSk7XG4gIGNoZWNrT3V0bGV0TmFtZVVuaXF1ZW5lc3MoY2hpbGRyZW4pO1xuICBzb3J0QWN0aXZhdGVkUm91dGVTbmFwc2hvdHMoY2hpbGRyZW4pO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIHNvcnRBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90cyhub2RlczogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD5bXSk6IHZvaWQge1xuICBub2Rlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEudmFsdWUub3V0bGV0ID09PSBQUklNQVJZX09VVExFVCkgcmV0dXJuIC0xO1xuICAgIGlmIChiLnZhbHVlLm91dGxldCA9PT0gUFJJTUFSWV9PVVRMRVQpIHJldHVybiAxO1xuICAgIHJldHVybiBhLnZhbHVlLm91dGxldC5sb2NhbGVDb21wYXJlKGIudmFsdWUub3V0bGV0KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NQYXRoc1dpdGhQYXJhbXMoXG4gICAgY29uZmlnOiBSb3V0ZVtdLCBzZWdtZW50OiBVcmxTZWdtZW50LCBwYXRoSW5kZXg6IG51bWJlciwgcGF0aHM6IFVybFBhdGhXaXRoUGFyYW1zW10sXG4gICAgb3V0bGV0OiBzdHJpbmcpOiBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PiB7XG4gIGZvciAobGV0IHIgb2YgY29uZmlnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBwcm9jZXNzUGF0aHNXaXRoUGFyYW1zQWdhaW5zdFJvdXRlKHIsIHNlZ21lbnQsIHBhdGhJbmRleCwgcGF0aHMsIG91dGxldCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIE5vTWF0Y2gpKSB0aHJvdyBlO1xuICAgIH1cbiAgfVxuICB0aHJvdyBuZXcgTm9NYXRjaChzZWdtZW50KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc1BhdGhzV2l0aFBhcmFtc0FnYWluc3RSb3V0ZShcbiAgICByb3V0ZTogUm91dGUsIHNlZ21lbnQ6IFVybFNlZ21lbnQsIHBhdGhJbmRleDogbnVtYmVyLCBwYXRoczogVXJsUGF0aFdpdGhQYXJhbXNbXSxcbiAgICBvdXRsZXQ6IHN0cmluZyk6IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+IHtcbiAgaWYgKHJvdXRlLnJlZGlyZWN0VG8pIHRocm93IG5ldyBOb01hdGNoKCk7XG4gIGlmICgocm91dGUub3V0bGV0ID8gcm91dGUub3V0bGV0IDogUFJJTUFSWV9PVVRMRVQpICE9PSBvdXRsZXQpIHRocm93IG5ldyBOb01hdGNoKCk7XG5cbiAgaWYgKHJvdXRlLnBhdGggPT09ICcqKicpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBwYXRocy5sZW5ndGggPiAwID8gbGFzdChwYXRocykucGFyYW1ldGVycyA6IHt9O1xuICAgIGNvbnN0IHNuYXBzaG90ID1cbiAgICAgICAgbmV3IEFjdGl2YXRlZFJvdXRlU25hcHNob3QocGF0aHMsIHBhcmFtcywgb3V0bGV0LCByb3V0ZS5jb21wb25lbnQsIHJvdXRlLCBzZWdtZW50LCAtMSk7XG4gICAgcmV0dXJuIG5ldyBUcmVlTm9kZTxBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90PihzbmFwc2hvdCwgW10pO1xuICB9XG5cbiAgY29uc3Qge2NvbnN1bWVkUGF0aHMsIHBhcmFtZXRlcnMsIGxhc3RDaGlsZH0gPSBtYXRjaChzZWdtZW50LCByb3V0ZSwgcGF0aHMpO1xuXG4gIGNvbnN0IHNuYXBzaG90ID0gbmV3IEFjdGl2YXRlZFJvdXRlU25hcHNob3QoXG4gICAgICBjb25zdW1lZFBhdGhzLCBwYXJhbWV0ZXJzLCBvdXRsZXQsIHJvdXRlLmNvbXBvbmVudCwgcm91dGUsIHNlZ21lbnQsXG4gICAgICBwYXRoSW5kZXggKyBsYXN0Q2hpbGQgLSAxKTtcbiAgY29uc3Qgc2xpY2VkUGF0aCA9IHBhdGhzLnNsaWNlKGxhc3RDaGlsZCk7XG4gIGNvbnN0IGNoaWxkQ29uZmlnID0gcm91dGUuY2hpbGRyZW4gPyByb3V0ZS5jaGlsZHJlbiA6IFtdO1xuXG4gIGlmIChjaGlsZENvbmZpZy5sZW5ndGggPT09IDAgJiYgc2xpY2VkUGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+KHNuYXBzaG90LCBbXSk7XG5cbiAgICAvLyBUT0RPOiBjaGVjayB0aGF0IHRoZSByaWdodCBzZWdtZW50IGlzIHByZXNlbnRcbiAgfSBlbHNlIGlmIChzbGljZWRQYXRoLmxlbmd0aCA9PT0gMCAmJiBPYmplY3Qua2V5cyhzZWdtZW50LmNoaWxkcmVuKS5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBwcm9jZXNzU2VnbWVudENoaWxkcmVuKGNoaWxkQ29uZmlnLCBzZWdtZW50KTtcbiAgICByZXR1cm4gbmV3IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+KHNuYXBzaG90LCBjaGlsZHJlbik7XG5cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBjaGlsZCA9IHByb2Nlc3NQYXRoc1dpdGhQYXJhbXMoXG4gICAgICAgIGNoaWxkQ29uZmlnLCBzZWdtZW50LCBwYXRoSW5kZXggKyBsYXN0Q2hpbGQsIHNsaWNlZFBhdGgsIFBSSU1BUllfT1VUTEVUKTtcbiAgICByZXR1cm4gbmV3IFRyZWVOb2RlPEFjdGl2YXRlZFJvdXRlU25hcHNob3Q+KHNuYXBzaG90LCBbY2hpbGRdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXRjaChzZWdtZW50OiBVcmxTZWdtZW50LCByb3V0ZTogUm91dGUsIHBhdGhzOiBVcmxQYXRoV2l0aFBhcmFtc1tdKSB7XG4gIGlmIChyb3V0ZS5wYXRoID09PSAnJykge1xuICAgIGlmIChyb3V0ZS50ZXJtaW5hbCAmJiAoT2JqZWN0LmtleXMoc2VnbWVudC5jaGlsZHJlbikubGVuZ3RoID4gMCB8fCBwYXRocy5sZW5ndGggPiAwKSkge1xuICAgICAgdGhyb3cgbmV3IE5vTWF0Y2goKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtjb25zdW1lZFBhdGhzOiBbXSwgbGFzdENoaWxkOiAwLCBwYXJhbWV0ZXJzOiB7fX07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGF0aCA9IHJvdXRlLnBhdGg7XG4gIGNvbnN0IHBhcnRzID0gcGF0aC5zcGxpdCgnLycpO1xuICBjb25zdCBwb3NQYXJhbWV0ZXJzOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBjb25zdCBjb25zdW1lZFBhdGhzOiBVcmxQYXRoV2l0aFBhcmFtc1tdID0gW107XG5cbiAgbGV0IGN1cnJlbnRJbmRleCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChjdXJyZW50SW5kZXggPj0gcGF0aHMubGVuZ3RoKSB0aHJvdyBuZXcgTm9NYXRjaCgpO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBwYXRoc1tjdXJyZW50SW5kZXhdO1xuXG4gICAgY29uc3QgcCA9IHBhcnRzW2ldO1xuICAgIGNvbnN0IGlzUG9zUGFyYW0gPSBwLnN0YXJ0c1dpdGgoJzonKTtcblxuICAgIGlmICghaXNQb3NQYXJhbSAmJiBwICE9PSBjdXJyZW50LnBhdGgpIHRocm93IG5ldyBOb01hdGNoKCk7XG4gICAgaWYgKGlzUG9zUGFyYW0pIHtcbiAgICAgIHBvc1BhcmFtZXRlcnNbcC5zdWJzdHJpbmcoMSldID0gY3VycmVudC5wYXRoO1xuICAgIH1cbiAgICBjb25zdW1lZFBhdGhzLnB1c2goY3VycmVudCk7XG4gICAgY3VycmVudEluZGV4Kys7XG4gIH1cblxuICBpZiAocm91dGUudGVybWluYWwgJiYgKE9iamVjdC5rZXlzKHNlZ21lbnQuY2hpbGRyZW4pLmxlbmd0aCA+IDAgfHwgY3VycmVudEluZGV4IDwgcGF0aHMubGVuZ3RoKSkge1xuICAgIHRocm93IG5ldyBOb01hdGNoKCk7XG4gIH1cblxuICBjb25zdCBwYXJhbWV0ZXJzID0gbWVyZ2UocG9zUGFyYW1ldGVycywgY29uc3VtZWRQYXRoc1tjb25zdW1lZFBhdGhzLmxlbmd0aCAtIDFdLnBhcmFtZXRlcnMpO1xuICByZXR1cm4ge2NvbnN1bWVkUGF0aHMsIGxhc3RDaGlsZDogY3VycmVudEluZGV4LCBwYXJhbWV0ZXJzfTtcbn1cblxuZnVuY3Rpb24gY2hlY2tPdXRsZXROYW1lVW5pcXVlbmVzcyhub2RlczogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD5bXSk6IHZvaWQge1xuICBjb25zdCBuYW1lczoge1trOiBzdHJpbmddOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90fSA9IHt9O1xuICBub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgIGxldCByb3V0ZVdpdGhTYW1lT3V0bGV0TmFtZSA9IG5hbWVzW24udmFsdWUub3V0bGV0XTtcbiAgICBpZiAocm91dGVXaXRoU2FtZU91dGxldE5hbWUpIHtcbiAgICAgIGNvbnN0IHAgPSByb3V0ZVdpdGhTYW1lT3V0bGV0TmFtZS51cmwubWFwKHMgPT4gcy50b1N0cmluZygpKS5qb2luKCcvJyk7XG4gICAgICBjb25zdCBjID0gbi52YWx1ZS51cmwubWFwKHMgPT4gcy50b1N0cmluZygpKS5qb2luKCcvJyk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFR3byBzZWdtZW50cyBjYW5ub3QgaGF2ZSB0aGUgc2FtZSBvdXRsZXQgbmFtZTogJyR7cH0nIGFuZCAnJHtjfScuYCk7XG4gICAgfVxuICAgIG5hbWVzW24udmFsdWUub3V0bGV0XSA9IG4udmFsdWU7XG4gIH0pO1xufSJdfQ==

/***/ },
/* 427 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(363);
	__webpack_require__(428);
	var forkJoin_1 = __webpack_require__(429);
	var fromPromise_1 = __webpack_require__(431);
	function resolve(resolver, state) {
	    return resolveNode(resolver, state._root).map(function (_) { return state; });
	}
	exports.resolve = resolve;
	function resolveNode(resolver, node) {
	    if (node.children.length === 0) {
	        return fromPromise_1.fromPromise(resolver.resolveComponent(node.value.component).then(function (factory) {
	            node.value._resolvedComponentFactory = factory;
	            return node.value;
	        }));
	    }
	    else {
	        var c = node.children.map(function (c) { return resolveNode(resolver, c).toPromise(); });
	        return forkJoin_1.forkJoin(c).map(function (_) { return resolver.resolveComponent(node.value.component).then(function (factory) {
	            node.value._resolvedComponentFactory = factory;
	            return node.value;
	        }); });
	    }
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNvbHZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFDL0IsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBSXJDLHlCQUF1QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xELDRCQUEwQiw2QkFBNkIsQ0FBQyxDQUFBO0FBS3hELGlCQUNJLFFBQTJCLEVBQUUsS0FBMEI7SUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBSGUsZUFBTyxVQUd0QixDQUFBO0FBRUQscUJBQ0ksUUFBMkIsRUFBRSxJQUFzQztJQUNyRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyx5QkFBVyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU87WUFDbEYsSUFBSSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxPQUFPLENBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVOLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxtQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDbEIsVUFBQSxDQUFDLElBQUksT0FBQSxRQUFRLENBQUMsZ0JBQWdCLENBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO1lBQ3BFLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLEdBQUcsT0FBTyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxFQUhHLENBR0gsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL3RvUHJvbWlzZSc7XG5cbmltcG9ydCB7Q29tcG9uZW50UmVzb2x2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtmb3JrSm9pbn0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2ZvcmtKb2luJztcbmltcG9ydCB7ZnJvbVByb21pc2V9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9mcm9tUHJvbWlzZSc7XG5cbmltcG9ydCB7QWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdH0gZnJvbSAnLi9yb3V0ZXJfc3RhdGUnO1xuaW1wb3J0IHtUcmVlTm9kZX0gZnJvbSAnLi91dGlscy90cmVlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmUoXG4gICAgcmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Um91dGVyU3RhdGVTbmFwc2hvdD4ge1xuICByZXR1cm4gcmVzb2x2ZU5vZGUocmVzb2x2ZXIsIHN0YXRlLl9yb290KS5tYXAoXyA9PiBzdGF0ZSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVOb2RlKFxuICAgIHJlc29sdmVyOiBDb21wb25lbnRSZXNvbHZlciwgbm9kZTogVHJlZU5vZGU8QWN0aXZhdGVkUm91dGVTbmFwc2hvdD4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnJvbVByb21pc2UocmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudCg8YW55Pm5vZGUudmFsdWUuY29tcG9uZW50KS50aGVuKGZhY3RvcnkgPT4ge1xuICAgICAgbm9kZS52YWx1ZS5fcmVzb2x2ZWRDb21wb25lbnRGYWN0b3J5ID0gZmFjdG9yeTtcbiAgICAgIHJldHVybiBub2RlLnZhbHVlO1xuICAgIH0pKTtcblxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGMgPSBub2RlLmNoaWxkcmVuLm1hcChjID0+IHJlc29sdmVOb2RlKHJlc29sdmVyLCBjKS50b1Byb21pc2UoKSk7XG4gICAgcmV0dXJuIGZvcmtKb2luKGMpLm1hcChcbiAgICAgICAgXyA9PiByZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50KDxhbnk+bm9kZS52YWx1ZS5jb21wb25lbnQpLnRoZW4oZmFjdG9yeSA9PiB7XG4gICAgICAgICAgbm9kZS52YWx1ZS5fcmVzb2x2ZWRDb21wb25lbnRGYWN0b3J5ID0gZmFjdG9yeTtcbiAgICAgICAgICByZXR1cm4gbm9kZS52YWx1ZTtcbiAgICAgICAgfSkpO1xuICB9XG59Il19

/***/ },
/* 428 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Observable_1 = __webpack_require__(38);
	var toPromise_1 = __webpack_require__(58);
	Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
	//# sourceMappingURL=toPromise.js.map

/***/ },
/* 429 */,
/* 430 */,
/* 431 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var PromiseObservable_1 = __webpack_require__(57);
	exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
	//# sourceMappingURL=fromPromise.js.map

/***/ },
/* 432 */
/***/ function(module, exports) {

	"use strict";
	var RouterOutletMap = (function () {
	    function RouterOutletMap() {
	        this._outlets = {};
	    }
	    RouterOutletMap.prototype.registerOutlet = function (name, outlet) { this._outlets[name] = outlet; };
	    return RouterOutletMap;
	}());
	exports.RouterOutletMap = RouterOutletMap;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX291dGxldF9tYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVyX291dGxldF9tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBO0lBQUE7UUFFRSxhQUFRLEdBQW1DLEVBQUUsQ0FBQztJQUVoRCxDQUFDO0lBREMsd0NBQWMsR0FBZCxVQUFlLElBQVksRUFBRSxNQUFvQixJQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUM1RixzQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksdUJBQWUsa0JBSTNCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JvdXRlck91dGxldH0gZnJvbSAnLi9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQnO1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY2xhc3MgUm91dGVyT3V0bGV0TWFwIHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfb3V0bGV0czoge1tuYW1lOiBzdHJpbmddOiBSb3V0ZXJPdXRsZXR9ID0ge307XG4gIHJlZ2lzdGVyT3V0bGV0KG5hbWU6IHN0cmluZywgb3V0bGV0OiBSb3V0ZXJPdXRsZXQpOiB2b2lkIHsgdGhpcy5fb3V0bGV0c1tuYW1lXSA9IG91dGxldDsgfVxufVxuIl19

/***/ },
/* 433 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(396);
	var url_tree_1 = __webpack_require__(417);
	var router_link_1 = __webpack_require__(395);
	var RouterLinkActive = (function () {
	    function RouterLinkActive(router, element, renderer) {
	        var _this = this;
	        this.router = router;
	        this.element = element;
	        this.renderer = renderer;
	        this.classes = [];
	        this.routerLinkActiveOptions = { exact: true };
	        this.subscription = router.events.subscribe(function (s) {
	            if (s instanceof router_1.NavigationEnd) {
	                _this.update();
	            }
	        });
	    }
	    RouterLinkActive.prototype.ngAfterContentInit = function () {
	        var _this = this;
	        this.links.changes.subscribe(function (s) { return _this.update(); });
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
	        if (!this.links || this.links.length === 0)
	            return;
	        var currentUrlTree = this.router.parseUrl(this.router.url);
	        var isActive = this.links.reduce(function (res, link) {
	            return res || url_tree_1.containsTree(currentUrlTree, link.urlTree, _this.routerLinkActiveOptions.exact);
	        }, false);
	        this.classes.forEach(function (c) { return _this.renderer.setElementClass(_this.element.nativeElement, c, isActive); });
	    };
	    __decorate([
	        core_1.ContentChildren(router_link_1.RouterLink), 
	        __metadata('design:type', core_1.QueryList)
	    ], RouterLinkActive.prototype, "links", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], RouterLinkActive.prototype, "routerLinkActiveOptions", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object), 
	        __metadata('design:paramtypes', [Object])
	    ], RouterLinkActive.prototype, "routerLinkActive", null);
	    RouterLinkActive = __decorate([
	        core_1.Directive({ selector: '[routerLinkActive]' }), 
	        __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef, core_1.Renderer])
	    ], RouterLinkActive);
	    return RouterLinkActive;
	}());
	exports.RouterLinkActive = RouterLinkActive;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmtfYWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmtfYWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBeUgsZUFBZSxDQUFDLENBQUE7QUFHekksdUJBQW9DLFdBQVcsQ0FBQyxDQUFBO0FBQ2hELHlCQUEyQixhQUFhLENBQUMsQ0FBQTtBQUV6Qyw0QkFBeUIsZUFBZSxDQUFDLENBQUE7QUFPekM7SUFVRSwwQkFBb0IsTUFBYyxFQUFVLE9BQW1CLEVBQVUsUUFBa0I7UUFWN0YsaUJBK0NDO1FBckNxQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFSbkYsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUdkLDRCQUF1QixHQUE0QixFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztRQU1oRixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQztZQUMzQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksc0JBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNkNBQWtCLEdBQWxCO1FBQUEsaUJBR0M7UUFGQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxFQUFFLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFHRCxzQkFBSSw4Q0FBZ0I7YUFBcEIsVUFBcUIsSUFBcUI7WUFDeEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQVEsSUFBSSxDQUFDO1lBQzNCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7OztPQUFBO0lBRUQsc0NBQVcsR0FBWCxVQUFZLE9BQVcsSUFBUyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hELHNDQUFXLEdBQVgsY0FBcUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFL0MsaUNBQU0sR0FBZDtRQUFBLGlCQVdDO1FBVkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVuRCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUM5QixVQUFDLEdBQUcsRUFBRSxJQUFJO1lBQ04sT0FBQSxHQUFHLElBQUksdUJBQVksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDO1FBQXJGLENBQXFGLEVBQ3pGLEtBQUssQ0FBQyxDQUFDO1FBRVgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ2hCLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUF0RSxDQUFzRSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQTdDRDtRQUFDLHNCQUFlLENBQUMsd0JBQVUsQ0FBQzs7bURBQUE7SUFJNUI7UUFBQyxZQUFLLEVBQUU7O3FFQUFBO0lBa0JSO1FBQUMsWUFBSyxFQUFFOzs7NERBQUE7SUF4QlY7UUFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFDLENBQUM7O3dCQUFBO0lBZ0Q1Qyx1QkFBQztBQUFELENBQUMsQUEvQ0QsSUErQ0M7QUEvQ1ksd0JBQWdCLG1CQStDNUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgUXVlcnlMaXN0LCBSZW5kZXJlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5pbXBvcnQge05hdmlnYXRpb25FbmQsIFJvdXRlcn0gZnJvbSAnLi4vcm91dGVyJztcbmltcG9ydCB7Y29udGFpbnNUcmVlfSBmcm9tICcuLi91cmxfdHJlZSc7XG5cbmltcG9ydCB7Um91dGVyTGlua30gZnJvbSAnLi9yb3V0ZXJfbGluayc7XG5cbmludGVyZmFjZSBSb3V0ZXJMaW5rQWN0aXZlT3B0aW9ucyB7XG4gIGV4YWN0OiBib29sZWFuO1xufVxuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1tyb3V0ZXJMaW5rQWN0aXZlXSd9KVxuZXhwb3J0IGNsYXNzIFJvdXRlckxpbmtBY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oUm91dGVyTGluaykgcHJpdmF0ZSBsaW5rczogUXVlcnlMaXN0PFJvdXRlckxpbms+O1xuICBwcml2YXRlIGNsYXNzZXM6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgQElucHV0KCkgcHJpdmF0ZSByb3V0ZXJMaW5rQWN0aXZlT3B0aW9uczogUm91dGVyTGlua0FjdGl2ZU9wdGlvbnMgPSB7ZXhhY3Q6IHRydWV9O1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHJvdXRlci5ldmVudHMuc3Vic2NyaWJlKHMgPT4ge1xuICAgICAgaWYgKHMgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saW5rcy5jaGFuZ2VzLnN1YnNjcmliZShzID0+IHRoaXMudXBkYXRlKCkpO1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgcm91dGVyTGlua0FjdGl2ZShkYXRhOiBzdHJpbmdbXXxzdHJpbmcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdGhpcy5jbGFzc2VzID0gPGFueT5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsYXNzZXMgPSBkYXRhLnNwbGl0KCcgJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczoge30pOiBhbnkgeyB0aGlzLnVwZGF0ZSgpOyB9XG4gIG5nT25EZXN0cm95KCk6IGFueSB7IHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7IH1cblxuICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubGlua3MgfHwgdGhpcy5saW5rcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGNvbnN0IGN1cnJlbnRVcmxUcmVlID0gdGhpcy5yb3V0ZXIucGFyc2VVcmwodGhpcy5yb3V0ZXIudXJsKTtcbiAgICBjb25zdCBpc0FjdGl2ZSA9IHRoaXMubGlua3MucmVkdWNlKFxuICAgICAgICAocmVzLCBsaW5rKSA9PlxuICAgICAgICAgICAgcmVzIHx8IGNvbnRhaW5zVHJlZShjdXJyZW50VXJsVHJlZSwgbGluay51cmxUcmVlLCB0aGlzLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zLmV4YWN0KSxcbiAgICAgICAgZmFsc2UpO1xuXG4gICAgdGhpcy5jbGFzc2VzLmZvckVhY2goXG4gICAgICAgIGMgPT4gdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50Q2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGMsIGlzQWN0aXZlKSk7XG4gIH1cbn1cbiJdfQ==

/***/ },
/* 434 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(5);
	var router_outlet_map_1 = __webpack_require__(432);
	var shared_1 = __webpack_require__(416);
	var RouterOutlet = (function () {
	    function RouterOutlet(parentOutletMap, location, name) {
	        this.location = location;
	        parentOutletMap.registerOutlet(name ? name : shared_1.PRIMARY_OUTLET, this);
	    }
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
	            this.activated.destroy();
	            this.activated = null;
	        }
	    };
	    RouterOutlet.prototype.activate = function (factory, activatedRoute, providers, outletMap) {
	        this.outletMap = outletMap;
	        this._activatedRoute = activatedRoute;
	        var inj = core_1.ReflectiveInjector.fromResolvedProviders(providers, this.location.parentInjector);
	        this.activated = this.location.createComponent(factory, this.location.length, inj, []);
	    };
	    RouterOutlet = __decorate([
	        core_1.Directive({ selector: 'router-outlet' }),
	        __param(2, core_1.Attribute('name')), 
	        __metadata('design:paramtypes', [router_outlet_map_1.RouterOutletMap, core_1.ViewContainerRef, String])
	    ], RouterOutlet);
	    return RouterOutlet;
	}());
	exports.RouterOutlet = RouterOutlet;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX291dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHFCQUFxSSxlQUFlLENBQUMsQ0FBQTtBQUNySixrQ0FBOEIsc0JBQXNCLENBQUMsQ0FBQTtBQUVyRCx1QkFBNkIsV0FBVyxDQUFDLENBQUE7QUFHekM7SUFRRSxzQkFDSSxlQUFnQyxFQUFVLFFBQTBCLEVBQ2pELElBQVk7UUFEVyxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUV0RSxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsdUJBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsc0JBQUkscUNBQVc7YUFBZixjQUE2QixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUN2RCxzQkFBSSxtQ0FBUzthQUFiO1lBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSx3Q0FBYzthQUFsQjtZQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFBQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFRCxpQ0FBVSxHQUFWO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFDSSxPQUE4QixFQUFFLGNBQThCLEVBQzlELFNBQXVDLEVBQUUsU0FBMEI7UUFDckUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7UUFDdEMsSUFBTSxHQUFHLEdBQUcseUJBQWtCLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUF2Q0g7UUFBQyxnQkFBUyxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxDQUFDO21CQVdoQyxnQkFBUyxDQUFDLE1BQU0sQ0FBQzs7b0JBWGU7SUF3Q3ZDLG1CQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQztBQXZDWSxvQkFBWSxlQXVDeEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXR0cmlidXRlLCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgUmVmbGVjdGl2ZUluamVjdG9yLCBSZXNvbHZlZFJlZmxlY3RpdmVQcm92aWRlciwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1JvdXRlck91dGxldE1hcH0gZnJvbSAnLi4vcm91dGVyX291dGxldF9tYXAnO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSAnLi4vcm91dGVyX3N0YXRlJztcbmltcG9ydCB7UFJJTUFSWV9PVVRMRVR9IGZyb20gJy4uL3NoYXJlZCc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAncm91dGVyLW91dGxldCd9KVxuZXhwb3J0IGNsYXNzIFJvdXRlck91dGxldCB7XG4gIHByaXZhdGUgYWN0aXZhdGVkOiBDb21wb25lbnRSZWY8YW55PjtcbiAgcHJpdmF0ZSBfYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlO1xuICBwdWJsaWMgb3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXA7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwYXJlbnRPdXRsZXRNYXA6IFJvdXRlck91dGxldE1hcCwgcHJpdmF0ZSBsb2NhdGlvbjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgIEBBdHRyaWJ1dGUoJ25hbWUnKSBuYW1lOiBzdHJpbmcpIHtcbiAgICBwYXJlbnRPdXRsZXRNYXAucmVnaXN0ZXJPdXRsZXQobmFtZSA/IG5hbWUgOiBQUklNQVJZX09VVExFVCwgdGhpcyk7XG4gIH1cblxuICBnZXQgaXNBY3RpdmF0ZWQoKTogYm9vbGVhbiB7IHJldHVybiAhIXRoaXMuYWN0aXZhdGVkOyB9XG4gIGdldCBjb21wb25lbnQoKTogT2JqZWN0IHtcbiAgICBpZiAoIXRoaXMuYWN0aXZhdGVkKSB0aHJvdyBuZXcgRXJyb3IoJ091dGxldCBpcyBub3QgYWN0aXZhdGVkJyk7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZhdGVkLmluc3RhbmNlO1xuICB9XG4gIGdldCBhY3RpdmF0ZWRSb3V0ZSgpOiBBY3RpdmF0ZWRSb3V0ZSB7XG4gICAgaWYgKCF0aGlzLmFjdGl2YXRlZCkgdGhyb3cgbmV3IEVycm9yKCdPdXRsZXQgaXMgbm90IGFjdGl2YXRlZCcpO1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZWRSb3V0ZTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWN0aXZhdGVkKSB7XG4gICAgICB0aGlzLmFjdGl2YXRlZC5kZXN0cm95KCk7XG4gICAgICB0aGlzLmFjdGl2YXRlZCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgYWN0aXZhdGUoXG4gICAgICBmYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT4sIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgIHByb3ZpZGVyczogUmVzb2x2ZWRSZWZsZWN0aXZlUHJvdmlkZXJbXSwgb3V0bGV0TWFwOiBSb3V0ZXJPdXRsZXRNYXApOiB2b2lkIHtcbiAgICB0aGlzLm91dGxldE1hcCA9IG91dGxldE1hcDtcbiAgICB0aGlzLl9hY3RpdmF0ZWRSb3V0ZSA9IGFjdGl2YXRlZFJvdXRlO1xuICAgIGNvbnN0IGluaiA9IFJlZmxlY3RpdmVJbmplY3Rvci5mcm9tUmVzb2x2ZWRQcm92aWRlcnMocHJvdmlkZXJzLCB0aGlzLmxvY2F0aW9uLnBhcmVudEluamVjdG9yKTtcbiAgICB0aGlzLmFjdGl2YXRlZCA9IHRoaXMubG9jYXRpb24uY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIHRoaXMubG9jYXRpb24ubGVuZ3RoLCBpbmosIFtdKTtcbiAgfVxufVxuIl19

/***/ },
/* 435 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(2);
	var platform_browser_1 = __webpack_require__(260);
	var common = __webpack_require__(436);
	function provideRouter(config, opts) {
	    if (opts === void 0) { opts = {}; }
	    return [
	        { provide: common_1.PlatformLocation, useClass: platform_browser_1.BrowserPlatformLocation }
	    ].concat(common.provideRouter(config, opts));
	}
	exports.provideRouter = provideRouter;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXJfcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRCxpQ0FBc0MsMkJBQTJCLENBQUMsQ0FBQTtBQUVsRSxJQUFZLE1BQU0sV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBc0JwRCx1QkFBOEIsTUFBb0IsRUFBRSxJQUE4QjtJQUE5QixvQkFBOEIsR0FBOUIsU0FBOEI7SUFDaEYsTUFBTSxDQUFDO1FBQ0wsRUFBQyxPQUFPLEVBQUUseUJBQWdCLEVBQUUsUUFBUSxFQUFFLDBDQUF1QixFQUFDO2FBQzNELE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUN0QyxDQUFDO0FBQ0osQ0FBQztBQUxlLHFCQUFhLGdCQUs1QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQbGF0Zm9ybUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCAqIGFzIGNvbW1vbiBmcm9tICcuL2NvbW1vbl9yb3V0ZXJfcHJvdmlkZXJzJztcbmltcG9ydCB7Um91dGVyQ29uZmlnfSBmcm9tICcuL2NvbmZpZyc7XG5cblxuLyoqXG4gKiBBIGxpc3Qgb2Yge0BsaW5rIFByb3ZpZGVyfXMuIFRvIHVzZSB0aGUgcm91dGVyLCB5b3UgbXVzdCBhZGQgdGhpcyB0byB5b3VyIGFwcGxpY2F0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBAQ29tcG9uZW50KHtkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdfSlcbiAqIGNsYXNzIEFwcENtcCB7XG4gKiAgIC8vIC4uLlxuICogfVxuICpcbiAqIGNvbnN0IHJvdXRlciA9IFtcbiAqICAge3BhdGg6ICcvaG9tZScsIGNvbXBvbmVudDogSG9tZX1cbiAqIF07XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW3Byb3ZpZGVSb3V0ZXIocm91dGVyKV0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUm91dGVyKGNvbmZpZzogUm91dGVyQ29uZmlnLCBvcHRzOiBjb21tb24uRXh0cmFPcHRpb25zID0ge30pOiBhbnlbXSB7XG4gIHJldHVybiBbXG4gICAge3Byb3ZpZGU6IFBsYXRmb3JtTG9jYXRpb24sIHVzZUNsYXNzOiBCcm93c2VyUGxhdGZvcm1Mb2NhdGlvbn0sXG4gICAgLi4uY29tbW9uLnByb3ZpZGVSb3V0ZXIoY29uZmlnLCBvcHRzKVxuICBdO1xufVxuIl19

/***/ },
/* 436 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(2);
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(396);
	var router_outlet_map_1 = __webpack_require__(432);
	var router_state_1 = __webpack_require__(423);
	var url_serializer_1 = __webpack_require__(418);
	exports.ROUTER_CONFIG = new core_1.OpaqueToken('ROUTER_CONFIG');
	exports.ROUTER_OPTIONS = new core_1.OpaqueToken('ROUTER_OPTIONS');
	function setupRouter(ref, resolver, urlSerializer, outletMap, location, injector, config, opts) {
	    if (ref.componentTypes.length == 0) {
	        throw new Error('Bootstrap at least one component before injecting Router.');
	    }
	    var componentType = ref.componentTypes[0];
	    var r = new router_1.Router(componentType, resolver, urlSerializer, outletMap, location, injector, config);
	    ref.registerDisposeListener(function () { return r.dispose(); });
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
	exports.setupRouter = setupRouter;
	function setupRouterInitializer(injector) {
	    setTimeout(function () {
	        var appRef = injector.get(core_1.ApplicationRef);
	        if (appRef.componentTypes.length == 0) {
	            appRef.registerBootstrapListener(function () { injector.get(router_1.Router).initialNavigation(); });
	        }
	        else {
	            injector.get(router_1.Router).initialNavigation();
	        }
	    }, 0);
	    return function () { return null; };
	}
	exports.setupRouterInitializer = setupRouterInitializer;
	function provideRouter(_config, _opts) {
	    return [
	        { provide: exports.ROUTER_CONFIG, useValue: _config }, { provide: exports.ROUTER_OPTIONS, useValue: _opts },
	        common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
	        { provide: url_serializer_1.UrlSerializer, useClass: url_serializer_1.DefaultUrlSerializer },
	        {
	            provide: router_1.Router,
	            useFactory: setupRouter,
	            deps: [
	                core_1.ApplicationRef, core_1.ComponentResolver, url_serializer_1.UrlSerializer, router_outlet_map_1.RouterOutletMap, common_1.Location, core_1.Injector,
	                exports.ROUTER_CONFIG, exports.ROUTER_OPTIONS
	            ]
	        },
	        router_outlet_map_1.RouterOutletMap,
	        { provide: router_state_1.ActivatedRoute, useFactory: function (r) { return r.routerState.root; }, deps: [router_1.Router] },
	        { provide: core_1.APP_INITIALIZER, multi: true, useFactory: setupRouterInitializer, deps: [core_1.Injector] }
	    ];
	}
	exports.provideRouter = provideRouter;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3JvdXRlcl9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tbW9uX3JvdXRlcl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUErRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2pGLHFCQUF3RixlQUFlLENBQUMsQ0FBQTtBQUd4Ryx1QkFBcUIsVUFBVSxDQUFDLENBQUE7QUFDaEMsa0NBQThCLHFCQUFxQixDQUFDLENBQUE7QUFDcEQsNkJBQTZCLGdCQUFnQixDQUFDLENBQUE7QUFDOUMsK0JBQWtELGtCQUFrQixDQUFDLENBQUE7QUFFeEQscUJBQWEsR0FBRyxJQUFJLGtCQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakQsc0JBQWMsR0FBRyxJQUFJLGtCQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUloRSxxQkFDSSxHQUFtQixFQUFFLFFBQTJCLEVBQUUsYUFBNEIsRUFDOUUsU0FBMEIsRUFBRSxRQUFrQixFQUFFLFFBQWtCLEVBQUUsTUFBb0IsRUFDeEYsSUFBa0I7SUFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNELElBQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBTSxDQUFDLEdBQ0gsSUFBSSxlQUFNLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUYsR0FBRyxDQUFDLHVCQUF1QixDQUFDLGNBQU0sT0FBQSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7SUFFL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQXVCLENBQUMsQ0FBQyxXQUFZLENBQUMsSUFBTSxDQUFDLENBQUM7WUFDNUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBdEJlLG1CQUFXLGNBc0IxQixDQUFBO0FBRUQsZ0NBQXVDLFFBQWtCO0lBSXZELFVBQVUsQ0FBQztRQUNULElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQWMsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLGNBQVEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNDLENBQUM7SUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDTixNQUFNLENBQUMsY0FBVyxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7QUFDekIsQ0FBQztBQWJlLDhCQUFzQix5QkFhckMsQ0FBQTtBQW9CRCx1QkFBOEIsT0FBcUIsRUFBRSxLQUFtQjtJQUN0RSxNQUFNLENBQUM7UUFDTCxFQUFDLE9BQU8sRUFBRSxxQkFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxzQkFBYyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUM7UUFDdkYsaUJBQVEsRUFBRSxFQUFDLE9BQU8sRUFBRSx5QkFBZ0IsRUFBRSxRQUFRLEVBQUUsNkJBQW9CLEVBQUM7UUFDckUsRUFBQyxPQUFPLEVBQUUsOEJBQWEsRUFBRSxRQUFRLEVBQUUscUNBQW9CLEVBQUM7UUFFeEQ7WUFDRSxPQUFPLEVBQUUsZUFBTTtZQUNmLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLElBQUksRUFBRTtnQkFDSixxQkFBYyxFQUFFLHdCQUFpQixFQUFFLDhCQUFhLEVBQUUsbUNBQWUsRUFBRSxpQkFBUSxFQUFFLGVBQVE7Z0JBQ3JGLHFCQUFhLEVBQUUsc0JBQWM7YUFDOUI7U0FDRjtRQUVELG1DQUFlO1FBQ2YsRUFBQyxPQUFPLEVBQUUsNkJBQWMsRUFBRSxVQUFVLEVBQUUsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBbEIsQ0FBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFNLENBQUMsRUFBQztRQUd4RixFQUFDLE9BQU8sRUFBRSxzQkFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxDQUFDLGVBQVEsQ0FBQyxFQUFDO0tBQzlGLENBQUM7QUFDSixDQUFDO0FBckJlLHFCQUFhLGdCQXFCNUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TG9jYXRpb24sIExvY2F0aW9uU3RyYXRlZ3ksIFBhdGhMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBUFBfSU5JVElBTElaRVIsIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZXNvbHZlciwgSW5qZWN0b3IsIE9wYXF1ZVRva2VufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtSb3V0ZXJDb25maWd9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7Um91dGVyfSBmcm9tICcuL3JvdXRlcic7XG5pbXBvcnQge1JvdXRlck91dGxldE1hcH0gZnJvbSAnLi9yb3V0ZXJfb3V0bGV0X21hcCc7XG5pbXBvcnQge0FjdGl2YXRlZFJvdXRlfSBmcm9tICcuL3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge0RlZmF1bHRVcmxTZXJpYWxpemVyLCBVcmxTZXJpYWxpemVyfSBmcm9tICcuL3VybF9zZXJpYWxpemVyJztcblxuZXhwb3J0IGNvbnN0IFJPVVRFUl9DT05GSUcgPSBuZXcgT3BhcXVlVG9rZW4oJ1JPVVRFUl9DT05GSUcnKTtcbmV4cG9ydCBjb25zdCBST1VURVJfT1BUSU9OUyA9IG5ldyBPcGFxdWVUb2tlbignUk9VVEVSX09QVElPTlMnKTtcblxuZXhwb3J0IGludGVyZmFjZSBFeHRyYU9wdGlvbnMgeyBlbmFibGVUcmFjaW5nPzogYm9vbGVhbjsgfVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBSb3V0ZXIoXG4gICAgcmVmOiBBcHBsaWNhdGlvblJlZiwgcmVzb2x2ZXI6IENvbXBvbmVudFJlc29sdmVyLCB1cmxTZXJpYWxpemVyOiBVcmxTZXJpYWxpemVyLFxuICAgIG91dGxldE1hcDogUm91dGVyT3V0bGV0TWFwLCBsb2NhdGlvbjogTG9jYXRpb24sIGluamVjdG9yOiBJbmplY3RvciwgY29uZmlnOiBSb3V0ZXJDb25maWcsXG4gICAgb3B0czogRXh0cmFPcHRpb25zKSB7XG4gIGlmIChyZWYuY29tcG9uZW50VHlwZXMubGVuZ3RoID09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcCBhdCBsZWFzdCBvbmUgY29tcG9uZW50IGJlZm9yZSBpbmplY3RpbmcgUm91dGVyLicpO1xuICB9XG4gIGNvbnN0IGNvbXBvbmVudFR5cGUgPSByZWYuY29tcG9uZW50VHlwZXNbMF07XG4gIGNvbnN0IHIgPVxuICAgICAgbmV3IFJvdXRlcihjb21wb25lbnRUeXBlLCByZXNvbHZlciwgdXJsU2VyaWFsaXplciwgb3V0bGV0TWFwLCBsb2NhdGlvbiwgaW5qZWN0b3IsIGNvbmZpZyk7XG4gIHJlZi5yZWdpc3RlckRpc3Bvc2VMaXN0ZW5lcigoKSA9PiByLmRpc3Bvc2UoKSk7XG5cbiAgaWYgKG9wdHMuZW5hYmxlVHJhY2luZykge1xuICAgIHIuZXZlbnRzLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGNvbnNvbGUuZ3JvdXAoYFJvdXRlciBFdmVudDogJHsoPGFueT5lLmNvbnN0cnVjdG9yKS5uYW1lfWApO1xuICAgICAgY29uc29sZS5sb2coZS50b1N0cmluZygpKTtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFJvdXRlckluaXRpYWxpemVyKGluamVjdG9yOiBJbmplY3Rvcikge1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy85MTAxXG4gIC8vIERlbGF5IHRoZSByb3V0ZXIgaW5zdGFudGlhdGlvbiB0byBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5IChBcHBsaWNhdGlvblJlZiAtPlxuICAvLyBBUFBfSU5JVElBTElaRVIgLT4gUm91dGVyKVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb25zdCBhcHBSZWYgPSBpbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpO1xuICAgIGlmIChhcHBSZWYuY29tcG9uZW50VHlwZXMubGVuZ3RoID09IDApIHtcbiAgICAgIGFwcFJlZi5yZWdpc3RlckJvb3RzdHJhcExpc3RlbmVyKCgpID0+IHsgaW5qZWN0b3IuZ2V0KFJvdXRlcikuaW5pdGlhbE5hdmlnYXRpb24oKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluamVjdG9yLmdldChSb3V0ZXIpLmluaXRpYWxOYXZpZ2F0aW9uKCk7XG4gICAgfVxuICB9LCAwKTtcbiAgcmV0dXJuICgpOiBhbnkgPT4gbnVsbDtcbn1cblxuLyoqXG4gKiBBIGxpc3Qgb2Yge0BsaW5rIFByb3ZpZGVyfXMuIFRvIHVzZSB0aGUgcm91dGVyLCB5b3UgbXVzdCBhZGQgdGhpcyB0byB5b3VyIGFwcGxpY2F0aW9uLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBAQ29tcG9uZW50KHtkaXJlY3RpdmVzOiBbUk9VVEVSX0RJUkVDVElWRVNdfSlcbiAqIGNsYXNzIEFwcENtcCB7XG4gKiAgIC8vIC4uLlxuICogfVxuICpcbiAqIGNvbnN0IHJvdXRlciA9IFtcbiAqICAge3BhdGg6ICcvaG9tZScsIGNvbXBvbmVudDogSG9tZX1cbiAqIF07XG4gKlxuICogYm9vdHN0cmFwKEFwcENtcCwgW3Byb3ZpZGVSb3V0ZXIocm91dGVyKV0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUm91dGVyKF9jb25maWc6IFJvdXRlckNvbmZpZywgX29wdHM6IEV4dHJhT3B0aW9ucyk6IGFueVtdIHtcbiAgcmV0dXJuIFtcbiAgICB7cHJvdmlkZTogUk9VVEVSX0NPTkZJRywgdXNlVmFsdWU6IF9jb25maWd9LCB7cHJvdmlkZTogUk9VVEVSX09QVElPTlMsIHVzZVZhbHVlOiBfb3B0c30sXG4gICAgTG9jYXRpb24sIHtwcm92aWRlOiBMb2NhdGlvblN0cmF0ZWd5LCB1c2VDbGFzczogUGF0aExvY2F0aW9uU3RyYXRlZ3l9LFxuICAgIHtwcm92aWRlOiBVcmxTZXJpYWxpemVyLCB1c2VDbGFzczogRGVmYXVsdFVybFNlcmlhbGl6ZXJ9LFxuXG4gICAge1xuICAgICAgcHJvdmlkZTogUm91dGVyLFxuICAgICAgdXNlRmFjdG9yeTogc2V0dXBSb3V0ZXIsXG4gICAgICBkZXBzOiBbXG4gICAgICAgIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRSZXNvbHZlciwgVXJsU2VyaWFsaXplciwgUm91dGVyT3V0bGV0TWFwLCBMb2NhdGlvbiwgSW5qZWN0b3IsXG4gICAgICAgIFJPVVRFUl9DT05GSUcsIFJPVVRFUl9PUFRJT05TXG4gICAgICBdXG4gICAgfSxcblxuICAgIFJvdXRlck91dGxldE1hcCxcbiAgICB7cHJvdmlkZTogQWN0aXZhdGVkUm91dGUsIHVzZUZhY3Rvcnk6IChyOiBSb3V0ZXIpID0+IHIucm91dGVyU3RhdGUucm9vdCwgZGVwczogW1JvdXRlcl19LFxuXG4gICAgLy8gVHJpZ2dlciBpbml0aWFsIG5hdmlnYXRpb25cbiAgICB7cHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLCBtdWx0aTogdHJ1ZSwgdXNlRmFjdG9yeTogc2V0dXBSb3V0ZXJJbml0aWFsaXplciwgZGVwczogW0luamVjdG9yXX1cbiAgXTtcbn1cbiJdfQ==

/***/ },
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
/* 453 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var environment_actions_1 = __webpack_require__(454);
	exports.EnvironmentActions = environment_actions_1.EnvironmentActions;
	var app_actions_1 = __webpack_require__(455);
	exports.AppActions = app_actions_1.AppActions;
	var project_actions_1 = __webpack_require__(456);
	exports.ProjectActions = project_actions_1.ProjectActions;
	var task_actions_1 = __webpack_require__(457);
	exports.TaskActions = task_actions_1.TaskActions;
	var reference_actions_1 = __webpack_require__(458);
	exports.ReferenceActions = reference_actions_1.ReferenceActions;
	var staff_actions_1 = __webpack_require__(459);
	exports.StaffActions = staff_actions_1.StaffActions;
	exports.APP_STORE_ACTIONS = [
	    environment_actions_1.EnvironmentActions,
	    app_actions_1.AppActions,
	    project_actions_1.ProjectActions,
	    task_actions_1.TaskActions,
	    reference_actions_1.ReferenceActions,
	    staff_actions_1.StaffActions
	];


/***/ },
/* 454 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var EnvironmentActions = (function () {
	    function EnvironmentActions() {
	    }
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
	    EnvironmentActions.TOGGLE_NAV = 'TOGGLE_NAV';
	    EnvironmentActions.TOGGLE_SEARCH = 'TOGGLE_SEARCH';
	    EnvironmentActions.HIDE_NAV = 'HIDE_NAV';
	    EnvironmentActions = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], EnvironmentActions);
	    return EnvironmentActions;
	}());
	exports.EnvironmentActions = EnvironmentActions;


/***/ },
/* 455 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
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
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], AppActions);
	    return AppActions;
	}());
	exports.AppActions = AppActions;


/***/ },
/* 456 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
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
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], ProjectActions);
	    return ProjectActions;
	}());
	exports.ProjectActions = ProjectActions;


/***/ },
/* 457 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
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
	    TaskActions.TASK_REQUEST_NEW = 'TASK_REQUEST_NEW';
	    TaskActions.TASK_REQUEST_CANCEL = 'TASK_REQUEST_CANCEL';
	    TaskActions.CREATE_TASK_REQUEST = 'CREATE_REQUEST_TASK';
	    TaskActions.CREATE_TASK_REQUEST_FAILED = 'CREATE_TASK_REQUEST_FAILED';
	    TaskActions.CREATE_TASK_REQUEST_FULFILLED = 'CREATE_TASK_REQUEST_FULFILLED';
	    TaskActions.FETCH_TASK_REQUESTS = 'FETCH_TASK_REQUESTS';
	    TaskActions.FETCH_TASK_REQUESTS_FAILED = 'FETCH_TASK_REQUESTS_FAILED';
	    TaskActions.FETCH_TASK_REQUESTS_FULFILLED = 'FETCH_TASK_REQUESTS_FULFILLED';
	    TaskActions = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], TaskActions);
	    return TaskActions;
	}());
	exports.TaskActions = TaskActions;


/***/ },
/* 458 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
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
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], ReferenceActions);
	    return ReferenceActions;
	}());
	exports.ReferenceActions = ReferenceActions;


/***/ },
/* 459 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var StaffActions = (function () {
	    function StaffActions() {
	    }
	    StaffActions.prototype.fetchOrganizations = function (organizations) {
	        return {
	            type: StaffActions.FETCH_ORGANIZATIONS,
	            payload: { organizations: organizations }
	        };
	    };
	    StaffActions.prototype.fetchUsers = function (users) {
	        return {
	            type: StaffActions.FETCH_USERS,
	            payload: { users: users }
	        };
	    };
	    StaffActions.FETCH_ORGANIZATIONS = 'FETCH_ORGANIZATIONS';
	    StaffActions.FETCH_USERS = 'FETCH_USERS';
	    StaffActions = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], StaffActions);
	    return StaffActions;
	}());
	exports.StaffActions = StaffActions;


/***/ },
/* 460 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var app_service_1 = __webpack_require__(461);
	exports.AppService = app_service_1.AppService;
	var translate_service_1 = __webpack_require__(463);
	exports.TranslateService = translate_service_1.TranslateService;
	var project_service_1 = __webpack_require__(464);
	exports.ProjectService = project_service_1.ProjectService;
	var task_service_1 = __webpack_require__(476);
	exports.TaskService = task_service_1.TaskService;
	var reference_service_1 = __webpack_require__(477);
	exports.ReferenceService = reference_service_1.ReferenceService;
	var staff_service_1 = __webpack_require__(478);
	exports.StaffService = staff_service_1.StaffService;
	var upload_service_1 = __webpack_require__(479);
	exports.UploadService = upload_service_1.UploadService;
	exports.APP_SERVICES = [
	    app_service_1.AppService,
	    translate_service_1.TranslateService,
	    project_service_1.ProjectService,
	    task_service_1.TaskService,
	    reference_service_1.ReferenceService,
	    staff_service_1.StaffService,
	    upload_service_1.UploadService
	];


/***/ },
/* 461 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var utils_1 = __webpack_require__(462);
	var HEADERS = new http_1.Headers({
	    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	    'Accept': 'application/json'
	});
	var AppService = (function () {
	    function AppService(http) {
	        this.http = http;
	        this.isLogged = false;
	        this.language = 'RUS';
	        var ck = document.cookie.match('(lang)=(.*?)($|;|,(?! ))');
	        if (ck) {
	            this.language = ck[2];
	        }
	    }
	    AppService.prototype.fetchUserProfile = function () {
	        var _this = this;
	        return this.http.get('p?id=userprofile', { headers: HEADERS }).map(function (response) {
	            var res = utils_1.parseResponseObjects(response.json().objects);
	            var pageSize = 20;
	            if (res[0].pagesize) {
	                pageSize = res[0].pagesize;
	            }
	            _this.isLogged = true;
	            return {
	                userProfile: res.employee,
	                languages: res.language.list[0].localizedName,
	                pageSize: pageSize,
	                language: _this.language
	            };
	        }, function (error) {
	            _this.isLogged = false;
	        });
	    };
	    AppService.prototype.updateUserProfile = function (userForm) {
	        return this.http.post('p?id=userprofile', utils_1.serializeObj(userForm), { headers: HEADERS }).map(function (response) {
	            return response;
	        }, function (error) {
	            return error;
	        });
	    };
	    AppService.prototype.logout = function () {
	        return this.http.delete('/');
	    };
	    AppService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], AppService);
	    return AppService;
	}());
	exports.AppService = AppService;


/***/ },
/* 462 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var http_1 = __webpack_require__(329);
	function createURLSearchParams(_params) {
	    var params = new http_1.URLSearchParams();
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
	exports.createURLSearchParams = createURLSearchParams;
	function serializeObj(obj) {
	    var result = [];
	    for (var property in obj) {
	        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
	    }
	    return result.join('&');
	}
	exports.serializeObj = serializeObj;
	function parseResponseObjects(objects) {
	    var result = [];
	    for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
	        var obj = objects_1[_i];
	        if (obj.kind) {
	            result[obj.kind] = obj;
	        }
	        else if (obj.list && obj.meta && obj.type) {
	            result[obj.type] = obj;
	        }
	        else if (obj.name && obj.value) {
	            result[obj.name] = obj.value;
	        }
	        else {
	            result.push(obj);
	        }
	    }
	    return result;
	}
	exports.parseResponseObjects = parseResponseObjects;
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
	exports.parseListObjectsToKeyValue = parseListObjectsToKeyValue;
	function transformPostResponse(response) {
	    var json = response.json();
	    return Object.assign(json, {
	        ok: json.type === 'DOCUMENT_SAVED',
	        message: json.captions ? json.captions.type : json.message
	    });
	}
	exports.transformPostResponse = transformPostResponse;
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
	exports.createCookie = createCookie;


/***/ },
/* 463 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var TranslateService = (function () {
	    function TranslateService(http) {
	        this.http = http;
	    }
	    TranslateService.prototype.fetchTranslations = function () {
	        var headers = new http_1.Headers({
	            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	            'Accept': 'application/json'
	        });
	        return this.http.get('p?id=common-captions', { headers: headers }).map(function (response) {
	            return response.json().captions;
	        });
	    };
	    TranslateService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], TranslateService);
	    return TranslateService;
	}());
	exports.TranslateService = TranslateService;


/***/ },
/* 464 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var Observable_1 = __webpack_require__(38);
	var ng2_translate_1 = __webpack_require__(350);
	var models_1 = __webpack_require__(465);
	var utils_1 = __webpack_require__(462);
	var HEADERS = new http_1.Headers({
	    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	    'Accept': 'application/json'
	});
	var ProjectService = (function () {
	    function ProjectService(http, translate) {
	        this.http = http;
	        this.translate = translate;
	    }
	    ProjectService.prototype.getProjectStatusTypes = function () {
	        return this.translate.get(['draft', 'processed', 'finished']).map(function (t) { return [
	            { value: 'DRAFT', text: t.draft, default: true },
	            { value: 'PROCESSED', text: t.processed },
	            { value: 'FINISHED', text: t.finished }
	        ]; });
	    };
	    ProjectService.prototype.fetchProjects = function (queryParams) {
	        if (queryParams === void 0) { queryParams = {}; }
	        return this.http.get('p?id=project-view', {
	            headers: HEADERS,
	            search: utils_1.createURLSearchParams(queryParams)
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
	        if (projectId === 'new') {
	            return Observable_1.Observable.of(new models_1.Project());
	        }
	        return this.http.get('p?id=project-form&projectId=' + projectId, { headers: HEADERS })
	            .map(function (response) {
	            var data = utils_1.parseResponseObjects(response.json().objects);
	            var project = data.project;
	            if (data.fsid) {
	                project.fsid = data.fsid;
	            }
	            if (data.attachment) {
	                project.attachments = data.attachment.list;
	            }
	            return project;
	        });
	    };
	    ProjectService.prototype.saveProject = function (project) {
	        var url = 'p?id=project-form&projectId=' + project.id;
	        return this.http.post(url, utils_1.serializeObj(project), { headers: HEADERS })
	            .map(function (response) { return utils_1.transformPostResponse(response); })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    ProjectService.prototype.deleteProject = function (projects) {
	        return this.http.delete('p?id=project-view&projectIds=' + projects.map(function (it) { return it.id; }).join(','), { headers: HEADERS })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    ProjectService.prototype.deleteProjectAttachment = function (project, attachment) {
	        return this.http.delete('p?id=project-form&projectId=' + project.id + '&attachmentId=' + attachment.id, { headers: HEADERS })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    ProjectService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http, ng2_translate_1.TranslateService])
	    ], ProjectService);
	    return ProjectService;
	}());
	exports.ProjectService = ProjectService;


/***/ },
/* 465 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var user_1 = __webpack_require__(466);
	exports.User = user_1.User;
	var organization_1 = __webpack_require__(467);
	exports.Organization = organization_1.Organization;
	var attachment_1 = __webpack_require__(468);
	exports.Attachment = attachment_1.Attachment;
	var project_1 = __webpack_require__(469);
	exports.Project = project_1.Project;
	var task_1 = __webpack_require__(470);
	exports.Task = task_1.Task;
	var tag_1 = __webpack_require__(471);
	exports.Tag = tag_1.Tag;
	var task_type_1 = __webpack_require__(472);
	exports.TaskType = task_type_1.TaskType;
	var comment_1 = __webpack_require__(473);
	exports.Comment = comment_1.Comment;
	var request_1 = __webpack_require__(474);
	exports.Request = request_1.Request;
	var request_type_1 = __webpack_require__(475);
	exports.RequestType = request_type_1.RequestType;


/***/ },
/* 466 */
/***/ function(module, exports) {

	"use strict";
	var User = (function () {
	    function User() {
	        this.id = '';
	        this.name = '@anonymous';
	    }
	    return User;
	}());
	exports.User = User;


/***/ },
/* 467 */
/***/ function(module, exports) {

	"use strict";
	var Organization = (function () {
	    function Organization() {
	        this.id = '';
	    }
	    return Organization;
	}());
	exports.Organization = Organization;


/***/ },
/* 468 */
/***/ function(module, exports) {

	"use strict";
	var Attachment = (function () {
	    function Attachment() {
	        this.id = '';
	    }
	    return Attachment;
	}());
	exports.Attachment = Attachment;


/***/ },
/* 469 */
/***/ function(module, exports) {

	"use strict";
	var Project = (function () {
	    function Project() {
	        this.id = '';
	        this.fsid = '' + Date.now();
	        this.status = 'DRAFT';
	    }
	    return Project;
	}());
	exports.Project = Project;


/***/ },
/* 470 */
/***/ function(module, exports) {

	"use strict";
	var Task = (function () {
	    function Task() {
	        this.id = '';
	        this.fsid = '' + Date.now();
	        this.status = 'DRAFT';
	        this.priority = 'NORMAL';
	    }
	    return Task;
	}());
	exports.Task = Task;


/***/ },
/* 471 */
/***/ function(module, exports) {

	"use strict";
	var Tag = (function () {
	    function Tag() {
	        this.id = '';
	    }
	    return Tag;
	}());
	exports.Tag = Tag;


/***/ },
/* 472 */
/***/ function(module, exports) {

	"use strict";
	var TaskType = (function () {
	    function TaskType() {
	        this.id = '';
	    }
	    return TaskType;
	}());
	exports.TaskType = TaskType;


/***/ },
/* 473 */
/***/ function(module, exports) {

	"use strict";
	var Comment = (function () {
	    function Comment() {
	        this.id = '';
	        this.fsid = '' + Date.now();
	    }
	    return Comment;
	}());
	exports.Comment = Comment;


/***/ },
/* 474 */
/***/ function(module, exports) {

	"use strict";
	var Request = (function () {
	    function Request() {
	        this.id = '';
	        this.fsid = '' + Date.now();
	    }
	    return Request;
	}());
	exports.Request = Request;


/***/ },
/* 475 */
/***/ function(module, exports) {

	"use strict";
	var RequestType = (function () {
	    function RequestType() {
	        this.id = '';
	    }
	    return RequestType;
	}());
	exports.RequestType = RequestType;


/***/ },
/* 476 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var Observable_1 = __webpack_require__(38);
	var ng2_translate_1 = __webpack_require__(350);
	var models_1 = __webpack_require__(465);
	var utils_1 = __webpack_require__(462);
	var HEADERS = new http_1.Headers({
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
	    TaskService.prototype.getTaskStatusTypes = function () {
	        return this.translate.get(['draft', 'waiting', 'processed', 'finished']).map(function (t) { return [
	            { value: 'DRAFT', text: t.draft, default: true },
	            { value: 'WAITING', text: t.waiting },
	            { value: 'PROCESSED', text: t.processed },
	            { value: 'FINISHED', text: t.finished }
	        ]; });
	    };
	    TaskService.prototype.fetchTasks = function (queryParams) {
	        if (queryParams === void 0) { queryParams = {}; }
	        return this.http.get('p?id=task-view', {
	            headers: HEADERS,
	            search: utils_1.createURLSearchParams(queryParams)
	        })
	            .map(function (response) { return response.json().objects[0]; })
	            .map(function (data) {
	            return {
	                tasks: data.list,
	                meta: data.meta
	            };
	        });
	    };
	    TaskService.prototype.fetchTaskById = function (taskId) {
	        if (taskId === 'new') {
	            return Observable_1.Observable.of(new models_1.Task());
	        }
	        return this.http.get('p?id=task-form&taskId=' + taskId, { headers: HEADERS })
	            .map(function (response) {
	            var data = utils_1.parseResponseObjects(response.json().objects);
	            var task = data.task;
	            if (data.fsid) {
	                task.fsid = data.fsid;
	            }
	            if (data.attachment) {
	                task.attachments = data.attachment.list;
	            }
	            return task;
	        });
	    };
	    TaskService.prototype.saveTask = function (task) {
	        var url = 'p?id=task-form' + (task.id ? '&taskId=' + task.id : '');
	        return this.http.post(url, utils_1.serializeObj(task), { headers: HEADERS })
	            .map(function (response) { return utils_1.transformPostResponse(response); })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.completeTask = function (task) {
	        return this.http.put('p?id=task-form&taskId=' + task.id + '&_action=complete', '', { headers: HEADERS })
	            .map(function (response) { return utils_1.transformPostResponse(response); })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.deleteTask = function (tasks) {
	        return this.http.delete('p?id=task-view&taskIds=' + tasks.map(function (it) { return it.id; }).join(','), { headers: HEADERS })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.deleteTaskAttachment = function (task, attachment) {
	        return this.http.delete('p?id=task-form&taskId=' + task.id + '&attachmentId=' + attachment.id, { headers: HEADERS })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.fetchTaskRequests = function (task, page) {
	        if (page === void 0) { page = 0; }
	        return this.http.get('p?id=task-requests&taskId=' + task.id, { headers: HEADERS })
	            .map(function (response) { return utils_1.parseResponseObjects(response.json().objects).request || {}; })
	            .map(function (data) {
	            return {
	                requests: data.list,
	                meta: data.meta
	            };
	        });
	    };
	    TaskService.prototype.sendTaskRequest = function (request) {
	        var url = 'p?id=task-requests&taskId=' + request.taskId;
	        return this.http.post(url, utils_1.serializeObj(request), { headers: HEADERS })
	            .map(function (response) { return utils_1.transformPostResponse(response); })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.doRequestResolution = function (request, resolution) {
	        var url = 'p?id=task-requests&requestId=' + request.id + '&resolution=' + resolution;
	        return this.http.put(url, '', { headers: HEADERS })
	            .map(function (response) { return utils_1.transformPostResponse(response); })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.deleteRequest = function (request) {
	        return this.http.delete('p?id=task-requests&requestId=' + request.id, { headers: HEADERS })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.deleteRequestAttachment = function (request, attachment) {
	        return this.http.delete('p?id=task-requests&requestId=' + request.id + '&attachmentId=' + attachment.id, { headers: HEADERS })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.fetchComments = function (task, page) {
	        if (page === void 0) { page = 0; }
	        return this.http.get('p?id=comments&taskId=' + task.id, { headers: HEADERS })
	            .map(function (response) { return utils_1.parseResponseObjects(response.json().objects).comment || {}; })
	            .map(function (data) {
	            return {
	                comments: data.list,
	                meta: data.meta
	            };
	        });
	    };
	    TaskService.prototype.saveComment = function (task, comment) {
	        var url = 'p?id=comments&taskId=' + task.id + (comment.id ? '&commentId=' + comment.id : '');
	        return this.http.post(url, utils_1.serializeObj(comment), { headers: HEADERS })
	            .map(function (response) { return utils_1.transformPostResponse(response); })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.deleteComment = function (comment) {
	        return this.http.delete('p?id=comments&commentId=' + comment.id, { headers: HEADERS })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService.prototype.deleteCommentAttachment = function (comment, attachment) {
	        return this.http.delete('p?id=comments&commentId=' + comment.id + '&attachmentId=' + attachment.id, { headers: HEADERS })
	            .catch(function (error) { return Observable_1.Observable.throw(utils_1.transformPostResponse(error)); });
	    };
	    TaskService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http, ng2_translate_1.TranslateService])
	    ], TaskService);
	    return TaskService;
	}());
	exports.TaskService = TaskService;


/***/ },
/* 477 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var HEADERS = new http_1.Headers({
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
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], ReferenceService);
	    return ReferenceService;
	}());
	exports.ReferenceService = ReferenceService;


/***/ },
/* 478 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var utils_1 = __webpack_require__(462);
	var HEADERS = new http_1.Headers({
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
	            search: utils_1.createURLSearchParams(queryParams)
	        })
	            .map(function (response) { return response.json().objects[0]; })
	            .map(function (data) {
	            return {
	                organizations: data.list,
	                meta: data.meta
	            };
	        });
	    };
	    StaffService.prototype.fetchUsers = function () {
	        return this.http.get('p?id=users', { headers: HEADERS })
	            .map(function (response) { return response.json().objects[0]; })
	            .map(function (data) {
	            return {
	                users: data.list
	            };
	        });
	    };
	    StaffService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], StaffService);
	    return StaffService;
	}());
	exports.StaffService = StaffService;


/***/ },
/* 479 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var Observable_1 = __webpack_require__(38);
	var UploadService = (function () {
	    function UploadService() {
	        var _this = this;
	        this.progress$ = Observable_1.Observable.create(function (observer) {
	            _this.progressObserver = observer;
	        }).share();
	    }
	    UploadService.prototype.makeFileRequest = function (url, params, files) {
	        var _this = this;
	        return Observable_1.Observable.create(function (observer) {
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
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], UploadService);
	    return UploadService;
	}());
	exports.UploadService = UploadService;


/***/ },
/* 480 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var dropdown_component_1 = __webpack_require__(481);
	var dropdown_toggle_component_1 = __webpack_require__(482);
	exports.DROPDOWN_DIRECTIVES = [dropdown_component_1.DropdownComponent, dropdown_toggle_component_1.DropdownToggleComponent];


/***/ },
/* 481 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var dropdown_toggle_component_1 = __webpack_require__(482);
	var DropdownComponent = (function () {
	    function DropdownComponent(renderer) {
	        var _this = this;
	        this.renderer = renderer;
	        this.open = false;
	        this.mouseEvent = false;
	        this.dropdownToggle = new core_1.EventEmitter();
	        this.selfClick = false;
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
	        core_1.HostBinding('class.dropdown'), 
	        __metadata('design:type', Object)
	    ], DropdownComponent.prototype, "true", void 0);
	    __decorate([
	        core_1.HostBinding('class.open'), 
	        __metadata('design:type', Object)
	    ], DropdownComponent.prototype, "isOpen", null);
	    __decorate([
	        core_1.HostListener('mouseenter', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [MouseEvent]), 
	        __metadata('design:returntype', void 0)
	    ], DropdownComponent.prototype, "onMouseEnter", null);
	    __decorate([
	        core_1.HostListener('mouseleave', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [MouseEvent]), 
	        __metadata('design:returntype', void 0)
	    ], DropdownComponent.prototype, "onMouseLeave", null);
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [MouseEvent]), 
	        __metadata('design:returntype', void 0)
	    ], DropdownComponent.prototype, "onClick", null);
	    __decorate([
	        core_1.ContentChildren(dropdown_toggle_component_1.DropdownToggleComponent), 
	        __metadata('design:type', core_1.QueryList)
	    ], DropdownComponent.prototype, "toggleComponent", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], DropdownComponent.prototype, "open", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], DropdownComponent.prototype, "mouseEvent", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], DropdownComponent.prototype, "dropdownToggle", void 0);
	    DropdownComponent = __decorate([
	        core_1.Component({
	            selector: '[dropdown]',
	            template: "<ng-content></ng-content>"
	        }), 
	        __metadata('design:paramtypes', [core_1.Renderer])
	    ], DropdownComponent);
	    return DropdownComponent;
	}());
	exports.DropdownComponent = DropdownComponent;


/***/ },
/* 482 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var DropdownToggleComponent = (function () {
	    function DropdownToggleComponent() {
	        this.toggle = new core_1.EventEmitter();
	    }
	    DropdownToggleComponent.prototype.onClick = function ($event) {
	        this.toggle.emit($event);
	    };
	    __decorate([
	        core_1.HostBinding('class.dropdown-toggle'), 
	        __metadata('design:type', Object)
	    ], DropdownToggleComponent.prototype, "true", void 0);
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [MouseEvent]), 
	        __metadata('design:returntype', void 0)
	    ], DropdownToggleComponent.prototype, "onClick", null);
	    DropdownToggleComponent = __decorate([
	        core_1.Component({
	            selector: '[dropdown-toggle]',
	            template: "<ng-content></ng-content>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DropdownToggleComponent);
	    return DropdownToggleComponent;
	}());
	exports.DropdownToggleComponent = DropdownToggleComponent;


/***/ },
/* 483 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var environment_actions_1 = __webpack_require__(454);
	var dropdown_1 = __webpack_require__(480);
	var user_1 = __webpack_require__(466);
	var NavbarComponent = (function () {
	    function NavbarComponent(store, environmentActions) {
	        this.store = store;
	        this.environmentActions = environmentActions;
	        this.HEADER_TITLE = 'Projects';
	        this.workspaceUrl = '/Workspace/p?id=workspace';
	    }
	    NavbarComponent.prototype.searchFocus = function () {
	        this.store.dispatch(this.environmentActions.toggleSearch());
	    };
	    NavbarComponent.prototype.searchBlur = function () {
	        this.store.dispatch(this.environmentActions.hideNav());
	    };
	    NavbarComponent.prototype.toggleNav = function () {
	        this.store.dispatch(this.environmentActions.toggleNav());
	    };
	    NavbarComponent.prototype.logout = function (event) {
	        event.preventDefault();
	        window.location.href = 'Logout';
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', user_1.User)
	    ], NavbarComponent.prototype, "user", void 0);
	    NavbarComponent = __decorate([
	        core_1.Component({
	            selector: 'navbar',
	            template: __webpack_require__(484),
	            directives: [router_1.ROUTER_DIRECTIVES, dropdown_1.DROPDOWN_DIRECTIVES],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, environment_actions_1.EnvironmentActions])
	    ], NavbarComponent);
	    return NavbarComponent;
	}());
	exports.NavbarComponent = NavbarComponent;


/***/ },
/* 484 */
/***/ function(module, exports) {

	module.exports = "<div class=\"navbar-header\">\r\n    <button class=\"btn-side-nav-toggle\" type=\"button\" (click)=\"toggleNav()\"></button>\r\n    <img class=\"brand-logo\" alt=\"logo\" src=\"{{ 'img/logo.png' }}\" />\r\n    <span class=\"brand-title\">\r\n        {{ HEADER_TITLE }}\r\n    </span>\r\n</div>\r\n<nav class=\"navbar-nav navbar-right\">\r\n    <ul class=\"nav nav-inline navbar-right\">\r\n        <li dropdown class=\"dropdown\">\r\n            <a dropdown-toggle href=\"#\" class=\"dropdown-toggle\" (click)=\"$event.preventDefault()\">\r\n                <i class=\"fa fa-user\"></i>\r\n            </a>\r\n            <ul class=\"dropdown-menu right\">\r\n                <li *ngIf=\"user\">\r\n                    <a class=\"user-profile\" [routerLink]=\"['/user-profile']\">\r\n                        <i class=\"fa fa-user\"></i>\r\n                        <span>{{ user.name }}</span>\r\n                    </a>\r\n                </li>\r\n                <li class=\"divider\"></li>\r\n                <li>\r\n                    <a class=\"ws\" href=\"{{workspaceUrl}}\">\r\n                        <i class=\"fa fa-th\"></i>\r\n                        <span>{{ 'workspace' | translate }}</span>\r\n                    </a>\r\n                </li>\r\n            </ul>\r\n        </li>\r\n    </ul>\r\n    <form class=\"navbar-form navbar-search\" name=\"ft-search\" (submit)=\"ftSearch()\">\r\n        <input type=\"hidden\" name=\"id\" value=\"search\" />\r\n        <input type=\"search\" class=\"q\" name=\"keyword\" value=\"{{ search_keyword }}\" placeholder=\"{{ 'search' | translate }}\" required autocomplete=\"off\" (focus)=\"searchFocus()\" (blur)=\"searchBlur($event.target)\" />\r\n        <button type=\"reset\">\r\n            <i class=\"fa fa-times\"></i>\r\n        </button>\r\n        <input type=\"submit\" value=\"search\" />\r\n    </form>\r\n</nav>\r\n"

/***/ },
/* 485 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var project_actions_1 = __webpack_require__(456);
	var project_service_1 = __webpack_require__(464);
	var NavComponent = (function () {
	    function NavComponent(store, projectActions, projectService) {
	        this.store = store;
	        this.projectActions = projectActions;
	        this.projectService = projectService;
	    }
	    NavComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.store.select('projects').subscribe(function (state) {
	            _this.projects = state.projects;
	        });
	        this.loadNavProjects();
	    };
	    NavComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    NavComponent.prototype.loadNavProjects = function () {
	        var _this = this;
	        this.projectService.fetchProjects().subscribe(function (data) {
	            _this.store.dispatch(_this.projectActions.fetchProjectsFulfilled(data.projects, data.meta));
	        });
	    };
	    NavComponent = __decorate([
	        core_1.Component({
	            selector: '[data-c=nav]',
	            template: __webpack_require__(486),
	            directives: [router_1.ROUTER_DIRECTIVES],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, project_actions_1.ProjectActions, project_service_1.ProjectService])
	    ], NavComponent);
	    return NavComponent;
	}());
	exports.NavComponent = NavComponent;


/***/ },
/* 486 */
/***/ function(module, exports) {

	module.exports = "<ul>\r\n    <li>\r\n        <a [routerLink]=\"['/tasks', 'my']\" class=\"nav-link\">\r\n            <i class=\"fa fa-pencil\"></i>\r\n            <span>{{'my_tasks' | translate}}</span>\r\n        </a>\r\n    </li>\r\n    <li>\r\n        <a [routerLink]=\"['/tasks', 'inbox']\" class=\"nav-link\">\r\n            <i class=\"fa fa-inbox\"></i>\r\n            <span>{{'tasks_assigned_to_me' | translate}}</span>\r\n        </a>\r\n    </li>\r\n    <!-- <li>\r\n        <a [routerLink]=\"['/']\" class=\"nav-link\">\r\n            <i class=\"fa fa-dashboard\"></i>\r\n            <span>{{'dashboard' | translate}}</span>\r\n        </a>\r\n    </li> -->\r\n    <li class=\"divider\"></li>\r\n    <li>\r\n        <a [routerLink]=\"['/projects']\" class=\"nav-link\">\r\n            <i class=\"fa fa-puzzle-piece\"></i>\r\n            <span>{{'projects' | translate}}</span>\r\n        </a>\r\n        <ul>\r\n            <li *ngFor=\"let project of projects\">\r\n                <a [routerLink]=\"['/project', project.id, 'tasks']\" class=\"nav-link\">\r\n                    <i class=\"fa fa-file-text-o\"></i>\r\n                    <span>{{project.name}}</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </li>\r\n</ul>\r\n"

/***/ },
/* 487 */
/***/ function(module, exports) {

	module.exports = "<notification></notification>\r\n<div class=\"layout\" [class.hidden]=\"!isReady\">\r\n    <div class=\"content-overlay\" (mousedown)=\"hideNav($event)\" (touchstart)=\"hideNav($event)\"></div>\r\n    <header class=\"header navbar navbar-fixed-top\">\r\n        <div class=\"container\">\r\n            <navbar [user]=\"loggedUser\"></navbar>\r\n        </div>\r\n    </header>\r\n    <section class=\"container\">\r\n        <nav data-c=\"nav\" class=\"aside side-nav\"></nav>\r\n        <main class=\"content\">\r\n            <router-outlet></router-outlet>\r\n        </main>\r\n    </section>\r\n</div>\r\n"

/***/ },
/* 488 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var router_1 = __webpack_require__(394);
	var auth_guard_1 = __webpack_require__(489);
	var dashboard_1 = __webpack_require__(490);
	var projects_1 = __webpack_require__(492);
	var project_1 = __webpack_require__(612);
	var tasks_1 = __webpack_require__(619);
	var task_1 = __webpack_require__(626);
	var user_profile_1 = __webpack_require__(635);
	var login_1 = __webpack_require__(637);
	var routes = [
	    { path: '', component: tasks_1.TasksComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'dashboard', component: dashboard_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'projects/:projectId', component: project_1.ProjectComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'projects', component: projects_1.ProjectsComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'project/:projectId/tasks', component: tasks_1.TasksComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'tasks/:for', component: tasks_1.TasksComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'tasks', component: tasks_1.TasksComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'task/:taskId/:new', component: task_1.TaskComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'task/:taskId', component: task_1.TaskComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'user-profile', component: user_profile_1.UserProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
	    { path: 'login', component: login_1.LoginComponent },
	    { path: '**', component: tasks_1.TasksComponent, canActivate: [auth_guard_1.AuthGuard] }
	];
	exports.APP_ROUTER_PROVIDERS = [
	    router_1.provideRouter(routes),
	    auth_guard_1.AuthGuard
	];


/***/ },
/* 489 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var services_1 = __webpack_require__(460);
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
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [services_1.AppService, router_1.Router])
	    ], AuthGuard);
	    return AuthGuard;
	}());
	exports.AuthGuard = AuthGuard;


/***/ },
/* 490 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var ng2_translate_1 = __webpack_require__(350);
	var project_input_1 = __webpack_require__(491);
	var utils_1 = __webpack_require__(462);
	var HEADERS = new http_1.Headers({
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
	            .map(function (response) { return utils_1.parseResponseObjects(response.json().objects).project; })
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
	        core_1.Component({
	            selector: '[dashboard]',
	            template: "\n        <div class=\"content-header\">\n            <h1 class=\"header-title\">\n                {{'dashboard' | translate}}\n            </h1>\n        </div>\n        <div class=\"content-body\">\n            \u0417\u0434\u0435\u0441\u044C \u0447\u0442\u043E-\u0442\u043E \u0431\u0443\u0434\u0435\u0442\n            <!-- <div class=\"dashboard\" *ngFor=\"let project of projects\">\n                <header>\n                    <span>{{project.name}}</span>\n                    <button (click)=\"deleteProjectFromDashboard(project.id)\">delete</button>\n                </header>\n                <section>\n                    project data\n                </section>\n            </div>\n            <div class=\"span3\">\n                <project-input editable=\"true\" (select)=\"selectProject($event)\"></project-input>\n                <button class=\"btn\" type=\"button\" (click)=\"addProjectToDashboard()\">{{'dashboard_add_project' | translate}}</button>\n            </div> -->\n        </div>\n    ",
	            directives: [project_input_1.ProjectInputComponent],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [http_1.Http])
	    ], DashboardComponent);
	    return DashboardComponent;
	}());
	exports.DashboardComponent = DashboardComponent;


/***/ },
/* 491 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var dropdown_1 = __webpack_require__(480);
	var ProjectInputComponent = (function () {
	    function ProjectInputComponent(store) {
	        this.store = store;
	        this.placeHolder = '';
	        this.editable = false;
	        this.searchable = false;
	        this.allowClear = false;
	        this.select = new core_1.EventEmitter();
	        this.projects = [];
	        this.keyWord = '';
	    }
	    ProjectInputComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.store.select('projects').subscribe(function (state) {
	            _this.projects = state.projects;
	            _this.project = state.projects.filter(function (it) { return it.id == _this.projectId; })[0];
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
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ProjectInputComponent.prototype, "projectId", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ProjectInputComponent.prototype, "placeHolder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ProjectInputComponent.prototype, "editable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ProjectInputComponent.prototype, "searchable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ProjectInputComponent.prototype, "allowClear", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], ProjectInputComponent.prototype, "select", void 0);
	    ProjectInputComponent = __decorate([
	        core_1.Component({
	            selector: 'project-input',
	            template: "\n        <span *ngIf=\"!editable\">\n            {{project?.name}}\n        </span>\n        <div dropdown class=\"select project-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"project\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span>{{project?.name}}</span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && project\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <!-- <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button> -->\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"project?.id == m.id\" *ngFor=\"let m of getProjects()\" (click)=\"onSelect(m)\">\n                        {{m.name}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
	            directives: [dropdown_1.DROPDOWN_DIRECTIVES],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store])
	    ], ProjectInputComponent);
	    return ProjectInputComponent;
	}());
	exports.ProjectInputComponent = ProjectInputComponent;


/***/ },
/* 492 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var pipes_1 = __webpack_require__(493);
	var pagination_1 = __webpack_require__(601);
	var staff_service_1 = __webpack_require__(478);
	var project_service_1 = __webpack_require__(464);
	var project_list_1 = __webpack_require__(603);
	var project_actions_1 = __webpack_require__(456);
	var ProjectsComponent = (function () {
	    function ProjectsComponent(store, router, projectActions, projectService, staffService) {
	        this.store = store;
	        this.router = router;
	        this.projectActions = projectActions;
	        this.projectService = projectService;
	        this.staffService = staffService;
	        this.title = 'projects';
	        this.meta = {};
	        this.loading = true;
	    }
	    ProjectsComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.subs = this.store.select('projects').subscribe(function (state) {
	            if (state) {
	                _this.projects = state.projects;
	                _this.meta = state.meta;
	                _this.loading = state.loading;
	            }
	        });
	        this.loadData();
	    };
	    ProjectsComponent.prototype.ngOnDestroy = function () {
	        this.subs && this.subs.unsubscribe();
	    };
	    ProjectsComponent.prototype.loadData = function (params) {
	        var _this = this;
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
	    ProjectsComponent.prototype.goToPage = function (params) {
	        this.loadData({
	            page: params.page
	        });
	    };
	    ProjectsComponent.prototype.newProject = function () {
	        this.router.navigate(['/projects', 'new']);
	    };
	    ProjectsComponent.prototype.deleteProject = function () {
	    };
	    ProjectsComponent = __decorate([
	        core_1.Component({
	            selector: 'project-list',
	            template: __webpack_require__(611),
	            directives: [
	                router_1.ROUTER_DIRECTIVES,
	                pagination_1.PaginationComponent,
	                project_list_1.ProjectListComponent
	            ],
	            pipes: [pipes_1.DateFormatPipe, ng2_translate_1.TranslatePipe, pipes_1.TextTransformPipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, router_1.Router, project_actions_1.ProjectActions, project_service_1.ProjectService, staff_service_1.StaffService])
	    ], ProjectsComponent);
	    return ProjectsComponent;
	}());
	exports.ProjectsComponent = ProjectsComponent;


/***/ },
/* 493 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var date_format_pipe_1 = __webpack_require__(494);
	exports.DateFormatPipe = date_format_pipe_1.DateFormatPipe;
	var text_transform_pipe_1 = __webpack_require__(598);
	exports.TextTransformPipe = text_transform_pipe_1.TextTransformPipe;
	var values_pipe_1 = __webpack_require__(599);
	exports.ValuesPipe = values_pipe_1.ValuesPipe;
	var keys_pipe_1 = __webpack_require__(600);
	exports.KeysPipe = keys_pipe_1.KeysPipe;


/***/ },
/* 494 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var moment = __webpack_require__(495);
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
	        var md = moment(date, format);
	        if (md.isValid()) {
	            return md.format(format);
	        }
	        return '';
	    };
	    DateFormatPipe = __decorate([
	        core_1.Pipe({ name: 'dateFmt' }), 
	        __metadata('design:paramtypes', [])
	    ], DateFormatPipe);
	    return DateFormatPipe;
	}());
	exports.DateFormatPipe = DateFormatPipe;


/***/ },
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
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
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
	        core_1.Pipe({ name: 'text' }), 
	        __metadata('design:paramtypes', [])
	    ], TextTransformPipe);
	    return TextTransformPipe;
	}());
	exports.TextTransformPipe = TextTransformPipe;


/***/ },
/* 599 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ValuesPipe = (function () {
	    function ValuesPipe() {
	    }
	    ValuesPipe.prototype.transform = function (values, args) {
	        return Object.keys(values).map(function (key) { return values[key]; });
	    };
	    ValuesPipe = __decorate([
	        core_1.Pipe({ name: 'values' }), 
	        __metadata('design:paramtypes', [])
	    ], ValuesPipe);
	    return ValuesPipe;
	}());
	exports.ValuesPipe = ValuesPipe;


/***/ },
/* 600 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
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
	        core_1.Pipe({ name: 'keys' }), 
	        __metadata('design:paramtypes', [])
	    ], KeysPipe);
	    return KeysPipe;
	}());
	exports.KeysPipe = KeysPipe;


/***/ },
/* 601 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(602));


/***/ },
/* 602 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var PaginationComponent = (function () {
	    function PaginationComponent() {
	        this.maxPageControl = 5;
	        this.change = new core_1.EventEmitter();
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
	        core_1.HostBinding('hidden'), 
	        __metadata('design:type', Object)
	    ], PaginationComponent.prototype, "isHidden", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], PaginationComponent.prototype, "maxPageControl", void 0);
	    __decorate([
	        core_1.Input('totalPages'), 
	        __metadata('design:type', Number), 
	        __metadata('design:paramtypes', [Number])
	    ], PaginationComponent.prototype, "_totalPages", null);
	    __decorate([
	        core_1.Input('page'), 
	        __metadata('design:type', Number), 
	        __metadata('design:paramtypes', [Number])
	    ], PaginationComponent.prototype, "_page", null);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], PaginationComponent.prototype, "change", void 0);
	    PaginationComponent = __decorate([
	        core_1.Component({
	            selector: 'pagination',
	            template: "\n        <div class=\"pagination\" *ngIf=\"totalPages > 1\">\n            <a href=\"#\" *ngIf=\"startPage > 1\" (click)=\"setPage(1, $event)\">1</a>\n            <span *ngIf=\"startPage > 1\">...</span>\n            <a [class.page-active]=\"p == currentPage\" href=\"#\" *ngFor=\"let p of pages\" (click)=\"setPage(p, $event)\">{{p}}</a>\n            <span *ngIf=\"stopPage < totalPages\">...</span>\n            <a *ngIf=\"stopPage < totalPages\" href=\"#\" (click)=\"setPage(totalPages, $event)\">{{totalPages}}</a>\n        </div>\n    ",
	            changeDetection: core_1.ChangeDetectionStrategy.OnPush
	        }), 
	        __metadata('design:paramtypes', [])
	    ], PaginationComponent);
	    return PaginationComponent;
	}());
	exports.PaginationComponent = PaginationComponent;


/***/ },
/* 603 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var ng2_translate_1 = __webpack_require__(350);
	var shared_1 = __webpack_require__(604);
	var pipes_1 = __webpack_require__(493);
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
	        core_1.Input('projects'), 
	        __metadata('design:type', Array), 
	        __metadata('design:paramtypes', [Array])
	    ], ProjectListComponent.prototype, "_projects", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ProjectListComponent.prototype, "showHeader", void 0);
	    ProjectListComponent = __decorate([
	        core_1.Component({
	            selector: 'project-list',
	            template: __webpack_require__(610),
	            directives: [router_1.ROUTER_DIRECTIVES, shared_1.OrganizationInputComponent, shared_1.UserInputComponent],
	            pipes: [pipes_1.DateFormatPipe, ng2_translate_1.TranslatePipe, pipes_1.TextTransformPipe]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ProjectListComponent);
	    return ProjectListComponent;
	}());
	exports.ProjectListComponent = ProjectListComponent;


/***/ },
/* 604 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(605));
	__export(__webpack_require__(491));
	__export(__webpack_require__(606));
	__export(__webpack_require__(607));
	__export(__webpack_require__(608));
	__export(__webpack_require__(609));


/***/ },
/* 605 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ng2_translate_1 = __webpack_require__(350);
	var dropdown_1 = __webpack_require__(480);
	var staff_service_1 = __webpack_require__(478);
	var models_1 = __webpack_require__(465);
	var OrganizationInputComponent = (function () {
	    function OrganizationInputComponent(staffService) {
	        this.staffService = staffService;
	        this.placeHolder = '';
	        this.editable = false;
	        this.searchable = false;
	        this.allowClear = false;
	        this.select = new core_1.EventEmitter();
	        this.organizations = [];
	        this.keyWord = '';
	        this.allLoaded = false;
	        this.firstLoad = true;
	    }
	    OrganizationInputComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        if (!this.org && this.orgId) {
	            this.staffService.fetchOrganizations({ ids: this.orgId }).subscribe(function (payload) {
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
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], OrganizationInputComponent.prototype, "orgId", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', models_1.Organization)
	    ], OrganizationInputComponent.prototype, "org", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], OrganizationInputComponent.prototype, "placeHolder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], OrganizationInputComponent.prototype, "editable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], OrganizationInputComponent.prototype, "searchable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], OrganizationInputComponent.prototype, "allowClear", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], OrganizationInputComponent.prototype, "select", void 0);
	    OrganizationInputComponent = __decorate([
	        core_1.Component({
	            selector: 'organization-input',
	            template: "\n        <span *ngIf=\"!editable\">\n            {{org?.name}}\n        </span>\n        <div dropdown class=\"select organization-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"org\" *ngIf=\"editable\" (dropdownToggle)=\"startLoad()\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span>{{org?.name}}</span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && org\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <!-- <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button> -->\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"org?.id == m.id\" *ngFor=\"let m of getOrganizations()\" (click)=\"onSelect(m)\">\n                        {{m.name}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
	            directives: [dropdown_1.DROPDOWN_DIRECTIVES],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [staff_service_1.StaffService])
	    ], OrganizationInputComponent);
	    return OrganizationInputComponent;
	}());
	exports.OrganizationInputComponent = OrganizationInputComponent;


/***/ },
/* 606 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var dropdown_1 = __webpack_require__(480);
	var services_1 = __webpack_require__(460);
	var RequestTypeInputComponent = (function () {
	    function RequestTypeInputComponent(store, appService) {
	        this.store = store;
	        this.appService = appService;
	        this.placeHolder = '';
	        this.editable = false;
	        this.searchable = false;
	        this.allowClear = false;
	        this.select = new core_1.EventEmitter();
	    }
	    RequestTypeInputComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.store.select('reference').subscribe(function (state) {
	            _this.requestTypes = state.requestTypes;
	            _this.requestType = state.requestTypes.filter(function (it) { return it.id == _this.requestTypeId; })[0];
	            _this.searchable = _this.requestTypes.length > 13;
	        });
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
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], RequestTypeInputComponent.prototype, "requestTypeId", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], RequestTypeInputComponent.prototype, "placeHolder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], RequestTypeInputComponent.prototype, "editable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], RequestTypeInputComponent.prototype, "searchable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], RequestTypeInputComponent.prototype, "allowClear", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], RequestTypeInputComponent.prototype, "select", void 0);
	    RequestTypeInputComponent = __decorate([
	        core_1.Component({
	            selector: 'request-type-input',
	            template: "\n        <span *ngIf=\"!editable\">\n            {{requestType?.name}}\n        </span>\n        <div dropdown class=\"select task-type-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"requestType\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span *ngIf=\"requestType\">\n                    {{requestType.localizedName[appService.language]}}\n                </span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && requestType\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button>\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"requestType?.id == m.id\" *ngFor=\"let m of requestTypes\" (click)=\"onSelect(m)\">\n                        {{m.localizedName[appService.language]}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
	            directives: [dropdown_1.DROPDOWN_DIRECTIVES],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, services_1.AppService])
	    ], RequestTypeInputComponent);
	    return RequestTypeInputComponent;
	}());
	exports.RequestTypeInputComponent = RequestTypeInputComponent;


/***/ },
/* 607 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var dropdown_1 = __webpack_require__(480);
	var TagsInputComponent = (function () {
	    function TagsInputComponent(store) {
	        this.store = store;
	        this.tagIds = [];
	        this.placeHolder = '';
	        this.editable = false;
	        this.searchable = false;
	        this.allowClear = false;
	        this.select = new core_1.EventEmitter();
	        this.tags = [];
	        this.selectedTags = [];
	    }
	    TagsInputComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.store.select('reference').subscribe(function (state) {
	            _this.tags = state.tags;
	            if (_this.tagIds) {
	                _this.selectedTags = state.tags.filter(function (it) { return _this.tagIds.indexOf(it.id) != -1; });
	            }
	            _this.searchable = _this.tags.length > 13;
	        });
	    };
	    TagsInputComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    TagsInputComponent.prototype.getTags = function () {
	        var _this = this;
	        if (this.tagIds) {
	            return this.tags.filter(function (it) { return _this.tagIds.indexOf(it.id) == -1; });
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
	        this.tagIds = [];
	        this.select.emit(this.selectedTags);
	    };
	    TagsInputComponent.prototype.add = function (tag) {
	        this.selectedTags.push(tag);
	        this.tagIds = this.selectedTags.map(function (it) { return it.id; });
	        this.select.emit(this.selectedTags);
	    };
	    TagsInputComponent.prototype.remove = function (tag, $event) {
	        $event.stopPropagation();
	        this.selectedTags = this.selectedTags.filter(function (it) { return it.id != tag.id; });
	        this.tagIds = this.selectedTags.map(function (it) { return it.id; });
	        this.select.emit(this.selectedTags);
	    };
	    TagsInputComponent.prototype.onScroll = function ($event) {
	        var _a = $event.target, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop;
	        if ((scrollHeight - clientHeight) == scrollTop) {
	            console.log('scroll end');
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], TagsInputComponent.prototype, "tagIds", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], TagsInputComponent.prototype, "placeHolder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], TagsInputComponent.prototype, "editable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], TagsInputComponent.prototype, "searchable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], TagsInputComponent.prototype, "allowClear", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], TagsInputComponent.prototype, "select", void 0);
	    TagsInputComponent = __decorate([
	        core_1.Component({
	            selector: 'tags-input',
	            template: "\n        <span *ngIf=\"!editable\">\n            <span\n                class=\"tag\"\n                *ngFor=\"let m of selectedTags\"\n                [style.color]=\"m.color\"\n                (click)=\"remove(m, $event)\">\n                {{m.name}}\n            </span>\n        </span>\n        <div dropdown class=\"select tags-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"selectedTags.length\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span\n                    class=\"tag\"\n                    *ngFor=\"let m of selectedTags\"\n                    [style.color]=\"m.color\"\n                    (click)=\"remove(m, $event)\">\n                    {{m.name}}\n                </span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && selectedTags.length\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button>\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" *ngFor=\"let m of getTags()\" (click)=\"add(m)\">\n                        <span [style.color]=\"m.color\">\n                            {{m.name}}\n                        </span>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
	            directives: [dropdown_1.DROPDOWN_DIRECTIVES],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store])
	    ], TagsInputComponent);
	    return TagsInputComponent;
	}());
	exports.TagsInputComponent = TagsInputComponent;


/***/ },
/* 608 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var dropdown_1 = __webpack_require__(480);
	var TaskTypeInputComponent = (function () {
	    function TaskTypeInputComponent(store) {
	        this.store = store;
	        this.placeHolder = '';
	        this.editable = false;
	        this.searchable = false;
	        this.allowClear = false;
	        this.select = new core_1.EventEmitter();
	    }
	    TaskTypeInputComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.store.select('reference').subscribe(function (state) {
	            _this.taskTypes = state.taskTypes;
	            _this.taskType = state.taskTypes.filter(function (it) { return it.id == _this.taskTypeId; })[0];
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
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], TaskTypeInputComponent.prototype, "taskTypeId", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], TaskTypeInputComponent.prototype, "placeHolder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], TaskTypeInputComponent.prototype, "editable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], TaskTypeInputComponent.prototype, "searchable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], TaskTypeInputComponent.prototype, "allowClear", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], TaskTypeInputComponent.prototype, "select", void 0);
	    TaskTypeInputComponent = __decorate([
	        core_1.Component({
	            selector: 'task-type-input',
	            template: "\n        <span *ngIf=\"!editable\">\n            {{taskType?.name}}\n        </span>\n        <div dropdown class=\"select task-type-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"taskType\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span>{{taskType?.name}}</span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && taskType\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button>\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"taskTypeId == m.id\" *ngFor=\"let m of taskTypes\" (click)=\"onSelect(m)\">\n                        {{m.name}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
	            directives: [dropdown_1.DROPDOWN_DIRECTIVES],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store])
	    ], TaskTypeInputComponent);
	    return TaskTypeInputComponent;
	}());
	exports.TaskTypeInputComponent = TaskTypeInputComponent;


/***/ },
/* 609 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var dropdown_1 = __webpack_require__(480);
	var UserInputComponent = (function () {
	    function UserInputComponent(store) {
	        this.store = store;
	        this.placeHolder = '';
	        this.multiple = false;
	        this.editable = false;
	        this.searchable = false;
	        this.allowClear = false;
	        this.select = new core_1.EventEmitter();
	        this.users = [];
	        this.selectedUsers = [];
	    }
	    UserInputComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.sub = this.store.select('staff').subscribe(function (state) {
	            _this.users = state.users;
	            if (_this.userIds) {
	                _this.selectedUsers = state.users.filter(function (it) { return _this.userIds.indexOf(it.id) != -1; });
	            }
	            _this.searchable = _this.users.length > 13;
	        });
	    };
	    UserInputComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    UserInputComponent.prototype.getUsers = function () {
	        var _this = this;
	        if (this.multiple && this.userIds) {
	            return this.users.filter(function (it) { return _this.userIds.indexOf(it.id) == -1; });
	        }
	        else {
	            return this.users;
	        }
	    };
	    UserInputComponent.prototype.search = function (keyWord) {
	        console.log(keyWord);
	    };
	    UserInputComponent.prototype.clear = function ($event) {
	        $event.stopPropagation();
	        this.selectedUsers = [];
	        this.userIds = [];
	        this.select.emit(this.selectedUsers);
	    };
	    UserInputComponent.prototype.add = function (user) {
	        if (this.multiple) {
	            this.selectedUsers.push(user);
	            this.userIds = this.selectedUsers.map(function (it) { return it.id; });
	        }
	        else {
	            this.selectedUsers = [user];
	            this.userIds = [user.id];
	            document.body.click();
	        }
	        this.select.emit(this.selectedUsers);
	    };
	    UserInputComponent.prototype.remove = function (user, $event) {
	        if (this.multiple) {
	            $event.stopPropagation();
	            this.selectedUsers = this.selectedUsers.filter(function (it) { return it.id != user.id; });
	            this.userIds = this.selectedUsers.map(function (it) { return it.id; });
	            this.select.emit(this.selectedUsers);
	        }
	    };
	    UserInputComponent.prototype.onScroll = function ($event) {
	        var _a = $event.target, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight, scrollTop = _a.scrollTop;
	        if ((scrollHeight - clientHeight) == scrollTop) {
	            console.log('scroll end');
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], UserInputComponent.prototype, "userIds", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], UserInputComponent.prototype, "placeHolder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], UserInputComponent.prototype, "multiple", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], UserInputComponent.prototype, "editable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], UserInputComponent.prototype, "searchable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], UserInputComponent.prototype, "allowClear", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], UserInputComponent.prototype, "select", void 0);
	    UserInputComponent = __decorate([
	        core_1.Component({
	            selector: 'user-input',
	            template: "\n        <span *ngIf=\"!editable\">\n            <span [class.tag]=\"multiple\" *ngFor=\"let m of selectedUsers\">\n                {{m?.userName || m?.login}}\n            </span>\n        </span>\n        <div dropdown class=\"select user-input\" [class.allow-clear]=\"allowClear\" [class.has-selected]=\"selectedUsers.length\" *ngIf=\"editable\">\n            <div dropdown-toggle class=\"select-selection input\">\n                <span [class.tag]=\"multiple\" *ngFor=\"let m of selectedUsers\" (click)=\"remove(m, $event)\">\n                    {{m?.userName || m?.login}}\n                </span>\n                <span class=\"placeholder\">{{placeHolder}}</span>\n                <div class=\"clear\" *ngIf=\"allowClear && selectedUsers.length\" (click)=\"clear($event)\">\n                    <i class=\"fa fa-times\"></i>\n                </div>\n            </div>\n            <div class=\"dropdown-menu select-dropdown\">\n                <div class=\"select-search\" *ngIf=\"searchable\">\n                    <input placeholder=\"{{'search' | translate}}\" #searchInput (keyup)=\"search($event.target.value)\" />\n                    <button type=\"button\" class=\"btn select-search-reset\" *ngIf=\"searchInput.value\" (click)=\"searchInput.value = '' && search('')\">\n                        <i class=\"fa fa-times\"></i>\n                    </button>\n                </div>\n                <ul class=\"select-list scroll-shadow\" (scroll)=\"onScroll($event)\">\n                    <li class=\"select-option\" [class.selected]=\"userIds && userIds.indexOf(m.id) !=- 1\" *ngFor=\"let m of getUsers()\" (click)=\"add(m)\">\n                        {{m.name || m.login}}\n                    </li>\n                </ul>\n            </div>\n        </div>\n    ",
	            directives: [dropdown_1.DROPDOWN_DIRECTIVES],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store])
	    ], UserInputComponent);
	    return UserInputComponent;
	}());
	exports.UserInputComponent = UserInputComponent;


/***/ },
/* 610 */
/***/ function(module, exports) {

	module.exports = "<div class=\"view project-list\">\r\n    <header class=\"entries-head\" *ngIf=\"showHeader\">\r\n        <div class=\"head-wrap\">\r\n            <label class=\"entry-select\">\r\n                <input type=\"checkbox\" class=\"all\" [checked]=\"isSelectedAll\" (change)=\"toggleSelectAll()\" />\r\n            </label>\r\n            <div class=\"entry-captions\">\r\n                <span class=\"project-list__name\">{{'name' | translate}}</span>\r\n                <span class=\"vw-icon\"><i class=\"fa fa-paperclip\"></i></span>\r\n                <span class=\"project-list__status\">{{'status' | translate}}</span>\r\n                <span class=\"project-list__customer\">{{'customer' | translate}}</span>\r\n                <span class=\"project-list__manager\">{{'manager' | translate}}</span>\r\n                <span class=\"project-list__programmer\">{{'programmer' | translate}}</span>\r\n                <span class=\"project-list__tester\">{{'tester' | translate}}</span>\r\n                <span class=\"project-list__finish_date\">{{'finish_date' | translate}}</span>\r\n            </div>\r\n        </div>\r\n    </header>\r\n    <div class=\"entries\">\r\n        <div class=\"entry-wrap\" *ngFor=\"let project of projects\" [class.active]=\"isSelected(project.id)\">\r\n            <div class=\"entry\">\r\n                <label class=\"entry-select\">\r\n                    <input type=\"checkbox\" name=\"project-id\" value=\"{{project.id}}\" [checked]=\"isSelected(project.id)\" (change)=\"toggleSelected(project.id)\" />\r\n                </label>\r\n                <a class=\"entry-link\" [routerLink]=\"['./', project.id]\">\r\n                    <div class=\"entry-fields\">\r\n                        <span class=\"project-list__name\">{{project.name}}</span>\r\n                        <span class=\"vw-icon\">\r\n                            <i class=\"fa fa-paperclip\" *ngIf=\"project.hasAttachments\"></i>\r\n                        </span>\r\n                        <span class=\"project-list__status\">\r\n                            <span class=\"status-{{project.status | text:'L'}}\">{{project.status | text:'L' | translate}}</span>\r\n                        </span>\r\n                        <span class=\"project-list__customer\">\r\n                            <organization-input [org]=\"project.customer\"></organization-input>\r\n                        </span>\r\n                        <span class=\"project-list__manager\">\r\n                            <user-input [userIds]=\"[project.managerUserId]\"></user-input>\r\n                        </span>\r\n                        <span class=\"project-list__programmer\">\r\n                            <user-input [userIds]=\"[project.programmerUserId]\"></user-input>\r\n                        </span>\r\n                        <span class=\"project-list__tester\">\r\n                            <user-input [userIds]=\"[project.testerUserId]\"></user-input>\r\n                        </span>\r\n                        <span class=\"project-list__finish_date\">{{project.finishDate | dateFmt}}</span>\r\n                    </div>\r\n                </a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 611 */
/***/ function(module, exports) {

	module.exports = "<div class=\"content-header\">\r\n    <h1 class=\"header-title\">\r\n        {{title | translate}}\r\n    </h1>\r\n    <div class=\"content-actions\">\r\n        <button class=\"btn\" type=\"button\" (click)=\"newProject()\">\r\n            {{'new_project' | translate}}\r\n        </button>\r\n        <pagination [totalPages]=\"meta.totalPages\" [page]=\"meta.page\" (change)=\"goToPage($event)\"></pagination>\r\n    </div>\r\n</div>\r\n<div class=\"content-body\">\r\n    <project-list [projects]=\"projects\"></project-list>\r\n</div>\r\n<router-outlet></router-outlet>\r\n"

/***/ },
/* 612 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var common_1 = __webpack_require__(2);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var notification_1 = __webpack_require__(376);
	var datepicker_1 = __webpack_require__(613);
	var dropdown_1 = __webpack_require__(480);
	var markdown_1 = __webpack_require__(380);
	var switch_button_1 = __webpack_require__(615);
	var shared_1 = __webpack_require__(604);
	var attachments_1 = __webpack_require__(617);
	var pipes_1 = __webpack_require__(493);
	var services_1 = __webpack_require__(460);
	var models_1 = __webpack_require__(465);
	var ProjectComponent = (function () {
	    function ProjectComponent(store, router, route, formBuilder, translate, appService, projectService, staffService, notifyService) {
	        this.store = store;
	        this.router = router;
	        this.route = route;
	        this.formBuilder = formBuilder;
	        this.translate = translate;
	        this.appService = appService;
	        this.projectService = projectService;
	        this.staffService = staffService;
	        this.notifyService = notifyService;
	        this.isReady = false;
	        this.isNew = true;
	        this.isEditable = true;
	    }
	    ProjectComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.form = this.formBuilder.group({
	            name: ['', common_1.Validators.required],
	            status: [''],
	            customerUserId: [''],
	            managerUserId: [''],
	            programmerUserId: [''],
	            testerUserId: [''],
	            observerUserIds: [''],
	            comment: [''],
	            finishDate: [''],
	            attachments: ['']
	        });
	        this.sub = this.route.params.subscribe(function (params) {
	            _this.projectService.fetchProjectById(params['projectId']).subscribe(function (project) {
	                _this.project = project;
	                _this.loadData();
	                _this.isReady = true;
	                _this.isNew = _this.project.id == '';
	            }, function (error) { return _this.handleXhrError(error); });
	        });
	    };
	    ProjectComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    ProjectComponent.prototype.loadData = function () {
	        var _this = this;
	        this.projectService.getProjectStatusTypes().subscribe(function (pst) { return _this.projectStatusTypes = pst; });
	    };
	    ProjectComponent.prototype.saveProject = function () {
	        var _this = this;
	        var noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
	        this.projectService.saveProject(this.project).subscribe(function (response) {
	            console.log(response);
	            noty.set({ type: 'success', message: response.message }).remove(1500);
	            _this.close();
	            return response;
	        }, function (error) {
	            console.log(error);
	            noty.set({ type: 'error', message: error.message }).remove(1500);
	            _this.errorSaveProject(error);
	            return error;
	        }, function () { return noty.remove(1500); });
	    };
	    ProjectComponent.prototype.errorSaveProject = function (errorResponse) {
	        this.notifyService.error(errorResponse.message).show().remove(2000);
	    };
	    ProjectComponent.prototype.deleteProject = function () {
	        var _this = this;
	        this.projectService.deleteProject([this.project]).subscribe(function (data) {
	            _this.close();
	        }, function (error) {
	            _this.errorSaveProject(error);
	        });
	    };
	    ProjectComponent.prototype.close = function () {
	        this.router.navigate(['/projects']);
	    };
	    ProjectComponent.prototype.handleXhrError = function (errorResponse) {
	        console.log(errorResponse);
	        if (errorResponse.status === 401) {
	            this.router.navigate(['/login']);
	        }
	    };
	    ProjectComponent.prototype.setStatus = function (value) {
	        this.project.status = value;
	    };
	    ProjectComponent.prototype.setCustomer = function (customer) {
	        this.project.customerId = customer.id;
	    };
	    ProjectComponent.prototype.setManager = function (user) {
	        this.project.managerUserId = user[0].id;
	    };
	    ProjectComponent.prototype.setProgrammer = function (user) {
	        this.project.programmerUserId = user[0].id;
	    };
	    ProjectComponent.prototype.setTester = function (user) {
	        this.project.testerUserId = user[0].id;
	    };
	    ProjectComponent.prototype.setObserver = function (observers) {
	        this.project.observerUserIds = observers.map(function (it) { return it.id; });
	    };
	    ProjectComponent.prototype.removeObserver = function (observer, $event) {
	        var _this = this;
	        this.project.observerUserIds.forEach(function (id, index) {
	            if (id === observer.id) {
	                _this.project.observerUserIds.splice(index, 1);
	            }
	        });
	        $event.stopPropagation();
	    };
	    ProjectComponent.prototype.setFinishDate = function (date) {
	        this.project.finishDate = date;
	    };
	    ProjectComponent.prototype.setProjectComment = function (text) {
	        this.project.comment = text;
	    };
	    ProjectComponent.prototype.addAttachment = function (file) {
	        var att = new models_1.Attachment();
	        att.realFileName = file.files[0];
	        if (!this.project.attachments) {
	            this.project.attachments = [];
	        }
	        if (!this.project.fsid) {
	            this.project.fsid = '' + Date.now();
	        }
	        this.project.attachments.push(att);
	    };
	    ProjectComponent.prototype.deleteAttachment = function (attachment) {
	        var _this = this;
	        this.projectService.deleteProjectAttachment(this.project, attachment).subscribe(function (r) {
	            _this.project.attachments = _this.project.attachments.filter(function (it) { return it.id != attachment.id; });
	        });
	    };
	    ProjectComponent = __decorate([
	        core_1.Component({
	            selector: 'project',
	            template: __webpack_require__(618),
	            directives: [
	                router_1.ROUTER_DIRECTIVES,
	                common_1.FORM_DIRECTIVES,
	                dropdown_1.DROPDOWN_DIRECTIVES,
	                switch_button_1.SwitchButtonComponent,
	                shared_1.OrganizationInputComponent,
	                shared_1.UserInputComponent,
	                attachments_1.AttachmentsComponent,
	                markdown_1.MarkdownEditorComponent,
	                datepicker_1.DatepickerDirective
	            ],
	            providers: [common_1.FormBuilder],
	            pipes: [ng2_translate_1.TranslatePipe, pipes_1.TextTransformPipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, router_1.Router, router_1.ActivatedRoute, common_1.FormBuilder, ng2_translate_1.TranslateService, services_1.AppService, services_1.ProjectService, services_1.StaffService, notification_1.NotificationService])
	    ], ProjectComponent);
	    return ProjectComponent;
	}());
	exports.ProjectComponent = ProjectComponent;


/***/ },
/* 613 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var Pikaday = __webpack_require__(614);
	var DatepickerDirective = (function () {
	    function DatepickerDirective(elementRef) {
	        this.elementRef = elementRef;
	        this.format = 'DD.MM.YYYY HH:mm';
	        this.select = new core_1.EventEmitter();
	    }
	    DatepickerDirective.prototype.ngOnInit = function () {
	        var _this = this;
	        this.picker = new Pikaday({
	            field: this.elementRef.nativeElement,
	            format: this.format,
	            onSelect: function () {
	                _this.select.emit(_this.picker.toString(_this.format));
	            }
	        });
	    };
	    DatepickerDirective.prototype.ngOnDestroy = function () {
	        this.picker.destroy();
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], DatepickerDirective.prototype, "format", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], DatepickerDirective.prototype, "select", void 0);
	    DatepickerDirective = __decorate([
	        core_1.Directive({
	            selector: '[datepicker]'
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], DatepickerDirective);
	    return DatepickerDirective;
	}());
	exports.DatepickerDirective = DatepickerDirective;


/***/ },
/* 614 */,
/* 615 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(616));


/***/ },
/* 616 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
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
	            if (_this.checkDefault && it.value == _this.model[_this.value]) {
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
	        core_1.HostBinding('class.switch-button'), 
	        __metadata('design:type', Object)
	    ], SwitchButtonComponent.prototype, "true", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SwitchButtonComponent.prototype, "model", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SwitchButtonComponent.prototype, "value", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SwitchButtonComponent.prototype, "items", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SwitchButtonComponent.prototype, "class", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SwitchButtonComponent.prototype, "name", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SwitchButtonComponent.prototype, "multi", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], SwitchButtonComponent.prototype, "disabled", void 0);
	    SwitchButtonComponent = __decorate([
	        core_1.Component({
	            selector: 'switch-button',
	            template: "\n        <label\n             [ngClass]=\"class\"\n             [class.active]=\"isSelected(item)\"\n             [class.disabled]=\"disabled || item.disabled\"\n             *ngFor=\"let item of items\">\n            <input\n                type=\"{{multi ? 'checkbox' : 'radio'}}\"\n                name=\"{{name}}\"\n                value=\"{{item.value}}\"\n                [checked]=\"isSelected(item)\"\n                [disabled]=\"disabled || item.disabled\"\n                (change)=\"select(item.value)\" />\n            <i class=\"fa fa-{{item.icon}}\" *ngIf=\"item.icon\"></i>\n            <span>{{item.text}}</span>\n        </label>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], SwitchButtonComponent);
	    return SwitchButtonComponent;
	}());
	exports.SwitchButtonComponent = SwitchButtonComponent;


/***/ },
/* 617 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var ng2_translate_1 = __webpack_require__(350);
	var services_1 = __webpack_require__(460);
	var AttachmentsComponent = (function () {
	    function AttachmentsComponent(http, uploadService) {
	        this.http = http;
	        this.uploadService = uploadService;
	        this.editable = false;
	        this.upload = new core_1.EventEmitter();
	        this.delete = new core_1.EventEmitter();
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
	    AttachmentsComponent.prototype.uploadFile = function (files) {
	        var _this = this;
	        this.uploadService.makeFileRequest('UploadFile?time=' + Date.now(), { fsid: this.model.fsid }, files).subscribe(function (response) {
	            _this.upload.emit(response);
	        });
	    };
	    __decorate([
	        core_1.HostBinding('class.attachments'), 
	        __metadata('design:type', Object)
	    ], AttachmentsComponent.prototype, "true", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], AttachmentsComponent.prototype, "model", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], AttachmentsComponent.prototype, "editable", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], AttachmentsComponent.prototype, "upload", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], AttachmentsComponent.prototype, "delete", void 0);
	    AttachmentsComponent = __decorate([
	        core_1.Component({
	            selector: 'attachments',
	            template: "\n        <label class=\"btn btn-upload\" title=\"{{'attach_file' | translate}}\" *ngIf=\"editable\">\n            <i class=\"fa fa-paperclip\"></i>\n            <span>{{ 'attach_file' | translate }}</span>\n            <input type=\"file\" (change)=\"uploadFile($event.target.files)\" style=\"display:none;\"/>\n        </label>\n        <div class=\"attachment-list\">\n            <div class=\"attachment-list__item\" *ngFor=\"let att of model.attachments\">\n                <div class=\"attachment\">\n                    <a class=\"attachment__link\" href=\"{{model.url}}&attachment={{att.id}}\">{{ att.realFileName }}</a>\n                    <span class=\"attachment__size\"></span>\n                    <button type=\"button\" class=\"btn btn-sm btn-link btn-remove\" *ngIf=\"editable\" (click)=\"delete.emit(att)\">\n                        <i class=\"fa fa-times\"></i>\n                    </button>\n                </div>\n            </div>\n        </div>\n    ",
	            providers: [services_1.UploadService],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [http_1.Http, services_1.UploadService])
	    ], AttachmentsComponent);
	    return AttachmentsComponent;
	}());
	exports.AttachmentsComponent = AttachmentsComponent;


/***/ },
/* 618 */
/***/ function(module, exports) {

	module.exports = "<form class=\"form\" [ngFormModel]=\"form\" *ngIf=\"isReady\">\r\n    <header class=\"content-header\">\r\n        <button class=\"btn-back\" type=\"button\" (click)=\"close($event)\">\r\n            <i class=\"fa fa-chevron-left\"></i>\r\n        </button>\r\n        <h1 class=\"header-title\">\r\n            {{(project.id ? 'project' : 'new_project') | translate}}\r\n        </h1>\r\n        <div class=\"content-actions\">\r\n            <button class=\"btn btn-primary\" type=\"button\" [disabled]=\"!form.valid\" (click)=\"saveProject()\">\r\n                {{'save_close' | translate}}\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" (click)=\"close($event)\">\r\n                {{'close' | translate}}\r\n            </button>\r\n            <div *ngIf=\"!isNew\" dropdown class=\"buttons\">\r\n                <div dropdown-toggle>\r\n                    <span class=\"btn\">...</span>\r\n                </div>\r\n                <div class=\"dropdown-menu\">\r\n                    <ul class=\"menu\">\r\n                        <li>\r\n                            <a class=\"menu-item\" (click)=\"deleteProject()\">{{'delete' | translate}}</a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </header>\r\n    <section class=\"content-body\">\r\n        <fieldset class=\"fieldset\">\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'name' | translate}}\r\n                </div>\r\n                <div class=\"controls\" [class.has-error]=\"!form.controls.name.valid\">\r\n                    <input class=\"span8\" [(ngModel)]=\"project.name\" ngControl=\"name\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'customer' | translate}}\r\n                </div>\r\n                <div class=\"controls\" [class.has-error]=\"!form.controls.customerUserId.valid\">\r\n                    <div class=\"span8\">\r\n                        <organization-input [editable]=\"isEditable\" [orgId]=\"project.customerId\" (select)=\"setCustomer($event)\"></organization-input>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'manager' | translate}}\r\n                </div>\r\n                <div class=\"controls\" [class.has-error]=\"!form.controls.managerUserId.valid\">\r\n                    <div class=\"span8\">\r\n                        <user-input [editable]=\"isEditable\" [userIds]=\"[project.managerUserId]\" (select)=\"setManager($event)\"></user-input>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'programmer' | translate}}\r\n                </div>\r\n                <div class=\"controls\" [class.has-error]=\"!form.controls.programmerUserId.valid\">\r\n                    <div class=\"span8\">\r\n                        <user-input [editable]=\"isEditable\" [userIds]=\"[project.programmerUserId]\" (select)=\"setProgrammer($event)\"></user-input>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'tester' | translate}}\r\n                </div>\r\n                <div class=\"controls\" [class.has-error]=\"!form.controls.testerUserId.valid\">\r\n                    <div class=\"span8\">\r\n                        <user-input [editable]=\"isEditable\" [userIds]=\"[project.testerUserId]\" (select)=\"setTester($event)\"></user-input>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'observers' | translate}}\r\n                </div>\r\n                <div class=\"controls\">\r\n                    <div class=\"span8\">\r\n                        <user-input [editable]=\"isEditable\" multiple=\"true\" [userIds]=\"project.observerUserIds\" (select)=\"setObserver($event)\"></user-input>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'status' | translate}}\r\n                </div>\r\n                <div class=\"controls\">\r\n                    <switch-button [disabled]=\"!isEditable\" [model]=\"project\" value=\"status\" [items]=\"projectStatusTypes\"></switch-button>\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'finish_date' | translate}}\r\n                </div>\r\n                <div class=\"controls\">\r\n                    <input class=\"span2\" datepicker (select)=\"setFinishDate($event)\" [(ngModel)]=\"project.finishDate\" ngControl=\"finishDate\" />\r\n                </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <div class=\"control-label\">\r\n                    {{'comment' | translate}}\r\n                </div>\r\n                <div class=\"controls\" [class.has-error]=\"!form.controls.comment.valid\">\r\n                    <div class=\"span8\">\r\n                        <markdown-editor [markdown]=\"project.comment || ''\" [editable]=\"isEditable\" updateTimeout=\"300\" (update)=\"setProjectComment($event)\"></markdown-editor>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </fieldset>\r\n        <attachments editable=\"true\" [model]=\"project\" (upload)=\"addAttachment($event)\" (delete)=\"deleteAttachment($event)\"></attachments>\r\n    </section>\r\n    <footer>\r\n        <div class=\"record-author\" *ngIf=\"project.authorId\">\r\n            <span>{{'author' | translate}}</span>\r\n            <user-input [editable]=\"false\" [userIds]=\"[project.authorId]\"></user-input>\r\n            <time>{{project.regDate}}</time>\r\n        </div>\r\n    </footer>\r\n</form>\r\n"

/***/ },
/* 619 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var notification_1 = __webpack_require__(376);
	var pipes_1 = __webpack_require__(493);
	var pagination_1 = __webpack_require__(601);
	var task_filter_1 = __webpack_require__(620);
	var task_service_1 = __webpack_require__(476);
	var task_list_1 = __webpack_require__(621);
	var actions_1 = __webpack_require__(453);
	var TasksComponent = (function () {
	    function TasksComponent(store, router, route, taskActions, taskService, notifyService) {
	        this.store = store;
	        this.router = router;
	        this.route = route;
	        this.taskActions = taskActions;
	        this.taskService = taskService;
	        this.notifyService = notifyService;
	        this.subs = [];
	        this.meta = {};
	        this.filter = {};
	        this.loading = true;
	    }
	    TasksComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.subs.push(this.store.select(function (state) { return state.tasks; }).subscribe(function (state) {
	            if (state) {
	                _this.tasks = state.tasks;
	                _this.meta = state.meta;
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
	            _this.loadData(Object.assign({}, params, _this.filter));
	        }));
	    };
	    TasksComponent.prototype.ngOnDestroy = function () {
	        this.subs.map(function (s) { return s.unsubscribe(); });
	    };
	    TasksComponent.prototype.loadData = function (params) {
	        var _this = this;
	        this.store.dispatch(this.taskActions.fetchTasks());
	        this.taskService.fetchTasks(params).subscribe(function (payload) {
	            _this.store.dispatch(_this.taskActions.fetchTasksFulfilled(payload.tasks, payload.meta));
	        }, function (error) { return _this.store.dispatch(_this.taskActions.fetchTasksFailed(error)); });
	    };
	    TasksComponent.prototype.goToPage = function (params) {
	        this.loadData(Object.assign({}, params, this.filter));
	    };
	    TasksComponent.prototype.changeFilter = function (filter) {
	        this.filter = filter;
	        this.loadData(filter);
	    };
	    TasksComponent.prototype.newTask = function () {
	        this.router.navigate(['/task', 'new']);
	    };
	    TasksComponent.prototype.deleteTask = function (task) {
	        this.taskService.deleteTask([task]).subscribe();
	    };
	    TasksComponent = __decorate([
	        core_1.Component({
	            selector: 'tasks',
	            template: __webpack_require__(625),
	            directives: [router_1.ROUTER_DIRECTIVES, pagination_1.PaginationComponent, task_list_1.TaskListComponent, task_filter_1.TaskFilterComponent],
	            pipes: [pipes_1.DateFormatPipe, ng2_translate_1.TranslatePipe, pipes_1.TextTransformPipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, router_1.Router, router_1.ActivatedRoute, actions_1.TaskActions, task_service_1.TaskService, notification_1.NotificationService])
	    ], TasksComponent);
	    return TasksComponent;
	}());
	exports.TasksComponent = TasksComponent;


/***/ },
/* 620 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ng2_translate_1 = __webpack_require__(350);
	var shared_1 = __webpack_require__(604);
	var pipes_1 = __webpack_require__(493);
	var TaskFilterComponent = (function () {
	    function TaskFilterComponent() {
	        this.change = new core_1.EventEmitter();
	        this.tagIds = [];
	    }
	    TaskFilterComponent.prototype.setTaskType = function (taskType) {
	        if (taskType) {
	            this.taskTypeId = taskType.id;
	        }
	        else {
	            this.taskTypeId = null;
	        }
	        this.updateFilter();
	    };
	    TaskFilterComponent.prototype.setAssigneeUser = function (assigneeUsers) {
	        if (assigneeUsers.length) {
	            this.assigneeUserId = assigneeUsers[0].id;
	        }
	        else {
	            this.assigneeUserId = null;
	        }
	        this.updateFilter();
	    };
	    TaskFilterComponent.prototype.setTags = function (tags) {
	        this.tagIds = tags.map(function (it) { return it.id; });
	        this.updateFilter();
	    };
	    TaskFilterComponent.prototype.updateFilter = function () {
	        this.change.emit({
	            taskTypeId: this.taskTypeId,
	            assigneeUserId: this.assigneeUserId,
	            tagIds: this.tagIds
	        });
	    };
	    __decorate([
	        core_1.HostBinding('class.task-filter'), 
	        __metadata('design:type', Object)
	    ], TaskFilterComponent.prototype, "true", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], TaskFilterComponent.prototype, "change", void 0);
	    TaskFilterComponent = __decorate([
	        core_1.Component({
	            selector: 'task-filter',
	            template: "\n        <div class=\"task-filter__icon\">\n            <i class=\"fa fa-filter\"></i>\n        </div>\n        <task-type-input [taskTypeId]=\"taskTypeId\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'task_type' | translate}}\" (select)=\"setTaskType($event)\"></task-type-input>\n        <user-input [assigneeUserId]=\"assigneeUserId\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'assignee_user' | translate}}\" (select)=\"setAssigneeUser($event)\"></user-input>\n        <tags-input [tagIds]=\"tagIds\" editable=\"true\" allowClear=\"true\" placeHolder=\"{{'tags' | translate}}\" (select)=\"setTags($event)\"></tags-input>\n    ",
	            directives: [shared_1.TaskTypeInputComponent, shared_1.UserInputComponent, shared_1.TagsInputComponent],
	            pipes: [pipes_1.DateFormatPipe, ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], TaskFilterComponent);
	    return TaskFilterComponent;
	}());
	exports.TaskFilterComponent = TaskFilterComponent;


/***/ },
/* 621 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var ng2_translate_1 = __webpack_require__(350);
	var store_1 = __webpack_require__(437);
	var shared_1 = __webpack_require__(604);
	var pipes_1 = __webpack_require__(493);
	var task_stream_1 = __webpack_require__(622);
	var TaskListComponent = (function () {
	    function TaskListComponent(store) {
	        this.store = store;
	        this.showHeader = true;
	        this.selectedIds = [];
	        this.isSelectedAll = false;
	        this.expandedIds = [];
	    }
	    Object.defineProperty(TaskListComponent.prototype, "_tasks", {
	        set: function (tasks) {
	            this.tasks = tasks;
	            this.selectedIds = [];
	            this.isSelectedAll = false;
	        },
	        enumerable: true,
	        configurable: true
	    });
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
	    TaskListComponent.prototype.toggleExpandable = function (id, $event) {
	        $event.preventDefault();
	        $event.stopPropagation();
	    };
	    __decorate([
	        core_1.Input('tasks'), 
	        __metadata('design:type', Array), 
	        __metadata('design:paramtypes', [Array])
	    ], TaskListComponent.prototype, "_tasks", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], TaskListComponent.prototype, "showHeader", void 0);
	    TaskListComponent = __decorate([
	        core_1.Component({
	            selector: 'task-list',
	            template: __webpack_require__(624),
	            directives: [router_1.ROUTER_DIRECTIVES, shared_1.UserInputComponent, shared_1.TagsInputComponent, task_stream_1.TaskStreamComponent],
	            pipes: [pipes_1.DateFormatPipe, ng2_translate_1.TranslatePipe, pipes_1.TextTransformPipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store])
	    ], TaskListComponent);
	    return TaskListComponent;
	}());
	exports.TaskListComponent = TaskListComponent;


/***/ },
/* 622 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var ng2_translate_1 = __webpack_require__(350);
	var shared_1 = __webpack_require__(604);
	var pipes_1 = __webpack_require__(493);
	var services_1 = __webpack_require__(460);
	var models_1 = __webpack_require__(465);
	var TaskStreamComponent = (function () {
	    function TaskStreamComponent(taskService) {
	        this.taskService = taskService;
	        this.loading = true;
	        this.level = 0;
	        this.comments = [];
	        this.requests = [];
	    }
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
	        this.taskService.fetchTasks({
	            parentTaskId: this.task.id
	        }).subscribe(function (payload) { return _this.tasks = payload.tasks; });
	    };
	    TaskStreamComponent.prototype.getStream = function () {
	        return this.tasks;
	    };
	    __decorate([
	        core_1.HostBinding('class.stream-level'), 
	        __metadata('design:type', Object)
	    ], TaskStreamComponent.prototype, "true", void 0);
	    __decorate([
	        core_1.Input('level'), 
	        __metadata('design:type', Number), 
	        __metadata('design:paramtypes', [Number])
	    ], TaskStreamComponent.prototype, "_level", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', models_1.Task)
	    ], TaskStreamComponent.prototype, "task", void 0);
	    TaskStreamComponent = __decorate([
	        core_1.Component({
	            selector: 'task-stream',
	            template: __webpack_require__(623),
	            directives: [router_1.ROUTER_DIRECTIVES, shared_1.UserInputComponent, shared_1.TagsInputComponent, TaskStreamComponent],
	            pipes: [pipes_1.DateFormatPipe, pipes_1.TextTransformPipe, ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [services_1.TaskService])
	    ], TaskStreamComponent);
	    return TaskStreamComponent;
	}());
	exports.TaskStreamComponent = TaskStreamComponent;


/***/ },
/* 623 */
/***/ function(module, exports) {

	module.exports = "<div class=\"entry-wrap level-{{level}}\" *ngFor=\"let m of stream\">\r\n    <div class=\"entry\" *ngIf=\"m.kind == 'task'\">\r\n        <label class=\"entry-select\">\r\n            <input type=\"checkbox\" name=\"task-id\" value=\"{{task.id}}\" (change)=\"toggleSelected(task.id)\" />\r\n        </label>\r\n        <a class=\"entry-link\" [routerLink]=\"['/task', task.id]\">\r\n            <div class=\"entry-fields\">\r\n                <span class=\"task-list__title level-indent\">\r\n                    <div class=\"entry-expander\" [class.is-expanded]=\"true\" (click)=\"toggleExpandable(task.id)\">\r\n                        <i class=\"entry-expander_icon fa\"></i>\r\n                    </div>\r\n                    <span>{{task.title}}</span>\r\n                </span>\r\n                <span class=\"vw-icon\">\r\n                    <i class=\"fa fa-paperclip\" *ngIf=\"task.hasAttachments\"></i>\r\n                </span>\r\n                <span class=\"task-list__status\">{{task.status | text:'L' | translate}}</span>\r\n                <span class=\"task-list__priority\">{{task.priority | text:'L' | translate}}</span>\r\n                <span class=\"task-list__assignee\">\r\n                    <user-input [userIds]=\"[task.assigneeUserId]\"></user-input>\r\n                </span>\r\n                <span class=\"task-list__start_date\">{{task.startDate | dateFmt}}</span>\r\n                <span class=\"task-list__due_date\">{{task.dueDate | dateFmt}}</span>\r\n                <span class=\"task-list__tags\">\r\n                    <tags-input [tagIds]=\"task.tagIds\"></tags-input>\r\n                </span>\r\n            </div>\r\n        </a>\r\n    </div>\r\n    <task-stream [level]=\"level\" [task]=\"m\"></task-stream>\r\n</div>\r\n"

/***/ },
/* 624 */
/***/ function(module, exports) {

	module.exports = "<div class=\"view task-list\">\r\n    <header class=\"entries-head\" *ngIf=\"showHeader\">\r\n        <div class=\"head-wrap\">\r\n            <label class=\"entry-select\">\r\n                <input type=\"checkbox\" class=\"all\" [checked]=\"isSelectedAll\" (change)=\"toggleSelectAll()\" />\r\n            </label>\r\n            <div class=\"entry-captions\">\r\n                <span class=\"task-list__title\">{{'task_title' | translate}}</span>\r\n                <span class=\"vw-icon\"><i class=\"fa fa-paperclip\"></i></span>\r\n                <span class=\"task-list__status\">{{'status' | translate}}</span>\r\n                <span class=\"task-list__priority\">{{'priority' | translate}}</span>\r\n                <span class=\"task-list__assignee\">{{'assignee_user' | translate}}</span>\r\n                <span class=\"task-list__start_date\">{{'start_date' | translate}}</span>\r\n                <span class=\"task-list__due_date\">{{'due_date' | translate}}</span>\r\n                <span class=\"task-list__tags\">{{'tags' | translate}}</span>\r\n            </div>\r\n        </div>\r\n    </header>\r\n    <div class=\"entries\">\r\n        <div class=\"entry-wrap\" *ngFor=\"let task of tasks\">\r\n            <div class=\"entry\" [class.active]=\"isSelected(task.id)\">\r\n                <label class=\"entry-select\">\r\n                    <input type=\"checkbox\" name=\"task-id\" value=\"{{task.id}}\" [checked]=\"isSelected(task.id)\" (change)=\"toggleSelected(task.id)\" />\r\n                </label>\r\n                <a class=\"entry-link\" [routerLink]=\"['/task', task.id]\">\r\n                    <div class=\"entry-fields\">\r\n                        <span class=\"task-list__title\">\r\n                            <div class=\"entry-expander\" (click)=\"toggleExpandable(task.id, $event)\">\r\n                                <i class=\"entry-expander_icon fa\"></i>\r\n                            </div>\r\n                            <span>{{task.title}}</span>\r\n                        </span>\r\n                        <span class=\"vw-icon\">\r\n                            <i class=\"fa fa-paperclip\" *ngIf=\"task.hasAttachments\"></i>\r\n                        </span>\r\n                        <span class=\"task-list__status\">\r\n                            <span class=\"status-{{task.status | text:'L'}}\">{{task.status | text:'L' | translate}}</span>\r\n                        </span>\r\n                        <span class=\"task-list__priority\">\r\n                            <span class=\"priority-{{task.priority | text:'L'}}\">{{task.priority | text:'L' | translate}}</span>\r\n                        </span>\r\n                        <span class=\"task-list__assignee\">\r\n                            <user-input [userIds]=\"[task.assigneeUserId]\"></user-input>\r\n                        </span>\r\n                        <span class=\"task-list__start_date\">{{task.startDate | dateFmt}}</span>\r\n                        <span class=\"task-list__due_date\">{{task.dueDate | dateFmt}}</span>\r\n                        <span class=\"task-list__tags\">\r\n                            <tags-input [tagIds]=\"task.tagIds\"></tags-input>\r\n                        </span>\r\n                    </div>\r\n                </a>\r\n            </div>\r\n            <!-- <task-stream [level]=\"0\" [task]=\"task\"></task-stream> -->\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 625 */
/***/ function(module, exports) {

	module.exports = "<div class=\"content-header\">\r\n    <h1 class=\"header-title\">\r\n        {{title | translate}}\r\n    </h1>\r\n    <div class=\"content-actions\">\r\n        <button class=\"btn\" type=\"button\" (click)=\"newTask()\">\r\n            {{'new_task' | translate}}\r\n        </button>\r\n        <task-filter (change)=\"changeFilter($event)\"></task-filter>\r\n        <pagination [totalPages]=\"meta.totalPages\" [page]=\"meta.page\" (change)=\"goToPage($event)\"></pagination>\r\n    </div>\r\n</div>\r\n<div class=\"content-body\" [class.load]=\"loading\">\r\n    <task-list [tasks]=\"tasks\"></task-list>\r\n</div>\r\n<router-outlet></router-outlet>\r\n"

/***/ },
/* 626 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var router_1 = __webpack_require__(394);
	var common_1 = __webpack_require__(2);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var notification_1 = __webpack_require__(376);
	var datepicker_1 = __webpack_require__(613);
	var tabs_1 = __webpack_require__(627);
	var dropdown_1 = __webpack_require__(480);
	var markdown_1 = __webpack_require__(380);
	var switch_button_1 = __webpack_require__(615);
	var shared_1 = __webpack_require__(604);
	var task_list_1 = __webpack_require__(621);
	var request_list_1 = __webpack_require__(630);
	var request_1 = __webpack_require__(631);
	var attachments_1 = __webpack_require__(617);
	var comments_1 = __webpack_require__(632);
	var pipes_1 = __webpack_require__(493);
	var actions_1 = __webpack_require__(453);
	var services_1 = __webpack_require__(460);
	var models_1 = __webpack_require__(465);
	var TaskComponent = (function () {
	    function TaskComponent(store, router, route, formBuilder, translate, taskActions, appService, projectService, taskService, referenceService, notifyService) {
	        var _this = this;
	        this.store = store;
	        this.router = router;
	        this.route = route;
	        this.formBuilder = formBuilder;
	        this.translate = translate;
	        this.taskActions = taskActions;
	        this.appService = appService;
	        this.projectService = projectService;
	        this.taskService = taskService;
	        this.referenceService = referenceService;
	        this.notifyService = notifyService;
	        this.subs = [];
	        this.isReady = false;
	        this.isNew = true;
	        this.isEditable = true;
	        this.isSubtask = false;
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
	            comments: true
	        };
	        this.showRequest = false;
	        this.hasUnResolvedRequest = true;
	        this.hasAcceptedRequestResolution = false;
	        this.subs.push(this.store.select('task').subscribe(function (state) {
	            _this.comments = state.comments;
	            _this.requests = state.requests;
	            if (!_this.requests) {
	                _this.hasUnResolvedRequest = false;
	            }
	            else {
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
	        this.form = formBuilder.group({
	            title: [''],
	            projectId: [''],
	            taskTypeId: [''],
	            status: [''],
	            priority: [''],
	            body: [''],
	            assigneeUserId: [''],
	            startDate: [''],
	            dueDate: [''],
	            tagIds: [''],
	            attachments: ['']
	        });
	    }
	    TaskComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.subs.push(this.route.params.subscribe(function (params) {
	            _this.isNew = (params['taskId'] === 'new') || (params['taskId'] && params['new'] === 'new');
	            _this.isSubtask = params['taskId'] && params['new'] === 'new';
	            _this.taskService.fetchTaskById(params['taskId']).subscribe(function (task) {
	                if (_this.isSubtask) {
	                    _this.parentTask = task;
	                    _this.task = new models_1.Task();
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
	                    });
	                }
	                _this.isReady = true;
	            }, function (errorResponse) { return _this.handleXhrError(errorResponse); });
	        }));
	        this.taskService.getTaskStatusTypes().subscribe(function (tst) { return _this.taskStatusTypes = tst; });
	        this.taskService.getTaskPriorityTypes().subscribe(function (tpt) { return _this.taskPriorityTypes = tpt; });
	    };
	    TaskComponent.prototype.ngOnDestroy = function () {
	        this.store.dispatch({ type: actions_1.TaskActions.TASK_UNLOAD });
	        this.subs.map(function (s) { return s.unsubscribe(); });
	    };
	    TaskComponent.prototype.getTitle = function () {
	        if (this.isNew && this.isSubtask) {
	            return 'new_subtask';
	        }
	        else if (this.isNew) {
	            return 'new_task';
	        }
	        else if (this.isSubtask) {
	            return 'sub_task';
	        }
	        else {
	            return 'task';
	        }
	    };
	    TaskComponent.prototype.getEditable = function () {
	        console.log('getEditable');
	        return this.isNew;
	    };
	    TaskComponent.prototype.saveTask = function () {
	        var _this = this;
	        var noty = this.notifyService.process(this.translate.instant('wait_while_document_save')).show();
	        this.taskService.saveTask(this.task).subscribe(function (response) {
	            noty.set({ type: 'success', message: response.message }).remove(1500);
	            _this.close();
	        }, function (error) {
	            noty.set({ type: 'error', message: error.message }).remove(1500);
	            _this.errorSaveTask(error);
	        });
	    };
	    TaskComponent.prototype.completeTask = function () {
	        var _this = this;
	        var noty = this.notifyService.process(this.translate.instant('wait_while_process')).show();
	        this.taskService.completeTask(this.task).subscribe(function (response) {
	            noty.set({ type: 'success', message: response.message }).remove(1500);
	            _this.close();
	        }, function (error) {
	            noty.set({ type: 'error', message: error.message }).remove(1500);
	            _this.errorSaveTask(error);
	        });
	    };
	    TaskComponent.prototype.deleteTask = function () {
	        var _this = this;
	        this.taskService.deleteTask([this.task]).subscribe(function (data) {
	            _this.close();
	        }, function (error) {
	            _this.errorSaveTask(error);
	        });
	    };
	    TaskComponent.prototype.addSubtask = function () {
	        this.router.navigate(['/task', this.task.id, '/new']);
	    };
	    TaskComponent.prototype.loadComments = function (page) {
	        var _this = this;
	        if (page === void 0) { page = 1; }
	        this.taskService.fetchComments(this.task, page).subscribe(function (payload) {
	            _this.store.dispatch({ type: actions_1.TaskActions.FETCH_TASK_COMMENTS_FULFILLED, payload: payload });
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
	    TaskComponent.prototype.hasComments = function () {
	        return this.comments && this.comments.length;
	    };
	    TaskComponent.prototype.loadRequests = function (page) {
	        var _this = this;
	        if (page === void 0) { page = 1; }
	        this.taskService.fetchTaskRequests(this.task, page).subscribe(function (payload) {
	            _this.store.dispatch({ type: actions_1.TaskActions.FETCH_TASK_REQUESTS_FULFILLED, payload: payload });
	        });
	    };
	    TaskComponent.prototype.acceptRequest = function (request) {
	        var _this = this;
	        this.taskService.doRequestResolution(request, 'ACCEPT').subscribe(function (action) {
	            _this.store.dispatch(action);
	            _this.loadRequests(1);
	        });
	    };
	    TaskComponent.prototype.declineRequest = function (request) {
	        var _this = this;
	        this.taskService.doRequestResolution(request, 'DECLINE').subscribe(function (action) {
	            _this.store.dispatch(action);
	            _this.loadRequests(1);
	        });
	    };
	    TaskComponent.prototype.hasRequests = function () {
	        return this.requests && this.requests.length;
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
	    TaskComponent.prototype.errorSaveTask = function (errorResponse) {
	        console.log(errorResponse);
	        this.notifyService.error(errorResponse.message).show().remove(2000);
	    };
	    TaskComponent.prototype.close = function () {
	        this.router.navigate(['/tasks']);
	    };
	    TaskComponent.prototype.handleXhrError = function (errorResponse) {
	        if (errorResponse.status === 401) {
	            this.router.navigate(['/login']);
	        }
	    };
	    TaskComponent.prototype.canSaveTask = function () {
	        return true;
	    };
	    TaskComponent.prototype.canCompleteTask = function () {
	        return !this.isNew && this.task.status != 'FINISHED';
	    };
	    TaskComponent.prototype.canRequestAction = function () {
	        return (this.task && this.task.id && this.task.status != 'FINISHED') && !this.hasUnResolvedRequest && !this.hasAcceptedRequestResolution;
	    };
	    TaskComponent.prototype.newRequest = function () {
	        this.store.dispatch({ type: actions_1.TaskActions.TASK_REQUEST_NEW, payload: this.task });
	    };
	    TaskComponent.prototype.requestSendEventHandler = function (_a) {
	        var requestSendSuccess = _a.requestSendSuccess;
	        if (requestSendSuccess) {
	            this.close();
	        }
	    };
	    TaskComponent.prototype.setStatus = function (value) {
	        this.task.status = value;
	    };
	    TaskComponent.prototype.setPriority = function (value) {
	        this.task.priority = value;
	    };
	    TaskComponent.prototype.setProject = function (project) {
	        this.task.projectId = project.id;
	    };
	    TaskComponent.prototype.setTaskType = function (taskType) {
	        this.task.taskTypeId = taskType.id;
	    };
	    TaskComponent.prototype.setAssigneeUser = function (assigneeUser) {
	        this.task.assigneeUserId = assigneeUser[0].id;
	    };
	    TaskComponent.prototype.setStartDate = function (date) {
	        this.task.startDate = date;
	    };
	    TaskComponent.prototype.setDueDate = function (date) {
	        this.task.dueDate = date;
	    };
	    TaskComponent.prototype.updateTaskBody = function (text) {
	        this.task.body = text;
	    };
	    TaskComponent.prototype.setTags = function (tags) {
	        this.task.tagIds = tags.map(function (it) { return it.id; });
	    };
	    TaskComponent.prototype.addAttachment = function (file) {
	        var att = new models_1.Attachment();
	        att.realFileName = file.files[0];
	        if (!this.task.attachments) {
	            this.task.attachments = [];
	        }
	        if (!this.task.fsid) {
	            this.task.fsid = '' + Date.now();
	        }
	        this.task.attachments.push(att);
	    };
	    TaskComponent.prototype.deleteAttachment = function (attachment) {
	        var _this = this;
	        this.taskService.deleteTaskAttachment(this.task, attachment).subscribe(function (r) {
	            _this.task.attachments = _this.task.attachments.filter(function (it) { return it.id != attachment.id; });
	        });
	    };
	    TaskComponent = __decorate([
	        core_1.Component({
	            selector: 'task',
	            template: __webpack_require__(634),
	            directives: [
	                router_1.ROUTER_DIRECTIVES,
	                common_1.FORM_DIRECTIVES,
	                switch_button_1.SwitchButtonComponent,
	                dropdown_1.DROPDOWN_DIRECTIVES,
	                tabs_1.TAB_DIRECTIVES,
	                shared_1.UserInputComponent,
	                shared_1.ProjectInputComponent,
	                shared_1.TaskTypeInputComponent,
	                shared_1.TagsInputComponent,
	                task_list_1.TaskListComponent,
	                request_list_1.RequestListComponent,
	                request_1.RequestComponent,
	                attachments_1.AttachmentsComponent,
	                comments_1.CommentsComponent,
	                markdown_1.MarkdownEditorComponent,
	                datepicker_1.DatepickerDirective
	            ],
	            providers: [common_1.FormBuilder],
	            pipes: [ng2_translate_1.TranslatePipe, pipes_1.TextTransformPipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, router_1.Router, router_1.ActivatedRoute, common_1.FormBuilder, ng2_translate_1.TranslateService, actions_1.TaskActions, services_1.AppService, services_1.ProjectService, services_1.TaskService, services_1.ReferenceService, notification_1.NotificationService])
	    ], TaskComponent);
	    return TaskComponent;
	}());
	exports.TaskComponent = TaskComponent;


/***/ },
/* 627 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var tabs_1 = __webpack_require__(628);
	var tab_1 = __webpack_require__(629);
	exports.TAB_DIRECTIVES = [tabs_1.Tabs, tab_1.Tab];


/***/ },
/* 628 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var tab_1 = __webpack_require__(629);
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
	        core_1.ContentChildren(tab_1.Tab), 
	        __metadata('design:type', core_1.QueryList)
	    ], Tabs.prototype, "tabs", void 0);
	    Tabs = __decorate([
	        core_1.Component({
	            selector: 'tabs',
	            template: "\n        <ul class=\"nav nav-tabs\">\n            <li *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\" [class.active]=\"tab.active\">\n                <a href=\"#\" (click)=\"$event.preventDefault()\">{{tab.title}}</a>\n            </li>\n        </ul>\n        <ng-content></ng-content>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Tabs);
	    return Tabs;
	}());
	exports.Tabs = Tabs;


/***/ },
/* 629 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var Tab = (function () {
	    function Tab() {
	        this.active = false;
	        this.select = new core_1.EventEmitter();
	    }
	    __decorate([
	        core_1.Input('tabTitle'), 
	        __metadata('design:type', String)
	    ], Tab.prototype, "title", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Tab.prototype, "active", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], Tab.prototype, "select", void 0);
	    Tab = __decorate([
	        core_1.Component({
	            selector: 'tab',
	            template: "\n      <div [hidden]=\"!active\">\n        <ng-content></ng-content>\n      </div>\n    "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Tab);
	    return Tab;
	}());
	exports.Tab = Tab;


/***/ },
/* 630 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ng2_translate_1 = __webpack_require__(350);
	var markdown_1 = __webpack_require__(380);
	var pipes_1 = __webpack_require__(493);
	var attachments_1 = __webpack_require__(617);
	var RequestListComponent = (function () {
	    function RequestListComponent() {
	        this.accept = new core_1.EventEmitter();
	        this.decline = new core_1.EventEmitter();
	        this.disabled = false;
	    }
	    RequestListComponent.prototype.doAccept = function (request) {
	        this.disabled = true;
	        this.accept.emit(request);
	    };
	    RequestListComponent.prototype.doDecline = function (request) {
	        this.disabled = true;
	        this.decline.emit(request);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], RequestListComponent.prototype, "requests", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], RequestListComponent.prototype, "accept", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], RequestListComponent.prototype, "decline", void 0);
	    RequestListComponent = __decorate([
	        core_1.Component({
	            selector: 'request-list',
	            template: "\n        <ul class=\"request-list\">\n            <li class=\"request-list__header\">\n                <div class=\"request__details\">\n                    <div class=\"request__type\">{{'request_type' | translate}}</div>\n                    <div class=\"request__comment\">{{'comment' | translate}}</div>\n                    <div class=\"request__time\">{{'request_time' | translate}}</div>\n                </div>\n            </li>\n            <li class=\"request-list__item\" *ngFor=\"let request of requests\">\n                <div class=\"request\">\n                    <div class=\"request__details\">\n                        <div class=\"request__type\">{{request.requestType.name}}</div>\n                        <div class=\"request__comment\">{{request.comment}}</div>\n                        <div class=\"request__time\">{{request.regDate}}</div>\n                        <div class=\"request__attachments\" *ngIf=\"request.attachments\">\n                            <attachments [model]=\"request\"></attachments>\n                        </div>\n                    </div>\n                    <div class=\"request__resol\">\n                        <div class=\"request__resolution\">\n                            <span *ngIf=\"request.resolution == 'ACCEPT'\">{{'accepted' | text:'L' | translate}}</span>\n                            <span *ngIf=\"request.resolution == 'DECLINE'\">{{'declined' | text:'L' | translate}}</span>\n                        </div>\n                        <div class=\"request__resolution_time\">{{request.resolutionTime}}</div>\n                        <div class=\"request__buttons\" *ngIf=\"request.resolution == 'UNKNOWN'\">\n                            <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"disabled\" (click)=\"doAccept(request)\">\n                                {{'accept' | translate}}\n                            </button>\n                            <button type=\"button\" class=\"btn\" [disabled]=\"disabled\" (click)=\"doDecline(request)\">\n                                {{'decline' | translate}}\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </li>\n        </ul>\n    ",
	            directives: [attachments_1.AttachmentsComponent],
	            pipes: [ng2_translate_1.TranslatePipe, markdown_1.MarkedPipe, pipes_1.TextTransformPipe, pipes_1.DateFormatPipe]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], RequestListComponent);
	    return RequestListComponent;
	}());
	exports.RequestListComponent = RequestListComponent;


/***/ },
/* 631 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var notification_1 = __webpack_require__(376);
	var markdown_1 = __webpack_require__(380);
	var attachments_1 = __webpack_require__(617);
	var request_type_input_1 = __webpack_require__(606);
	var actions_1 = __webpack_require__(453);
	var services_1 = __webpack_require__(460);
	var models_1 = __webpack_require__(465);
	var RequestComponent = (function () {
	    function RequestComponent(store, translate, notifyService, taskService) {
	        var _this = this;
	        this.store = store;
	        this.translate = translate;
	        this.notifyService = notifyService;
	        this.taskService = taskService;
	        this.send = new core_1.EventEmitter();
	        this.subs = [];
	        this.isOpen = false;
	        this.subs.push(store.select('reference').subscribe(function (state) {
	            _this.requestTypes = state.requestTypes;
	        }));
	        this.subs.push(store.select('task').subscribe(function (state) {
	            if (state) {
	                _this.request = state.request || new models_1.Request();
	                _this.isOpen = state.showRequest;
	                if (state.task) {
	                    _this.request.taskId = state.task.id;
	                    if (!_this.request.fsid) {
	                        _this.request.fsid = '' + Date.now();
	                    }
	                }
	            }
	        }));
	    }
	    RequestComponent.prototype.ngOnInit = function () { };
	    RequestComponent.prototype.ngOnDestroy = function () {
	        this.subs.map(function (s) { return s.unsubscribe(); });
	    };
	    RequestComponent.prototype.cancel = function () {
	        this.store.dispatch({ type: actions_1.TaskActions.TASK_REQUEST_CANCEL });
	    };
	    RequestComponent.prototype.sendRequest = function ($event) {
	        var _this = this;
	        $event.preventDefault();
	        this.request.comment = this.comment;
	        this.request.requestTypeId = this.requestType.id;
	        this.taskService.sendTaskRequest(this.request).subscribe(function (response) {
	            _this.notifyService.info(_this.translate.instant('request_send_success')).show().remove(3000);
	            _this.cancel();
	            _this.send.emit({
	                requestSendSuccess: true
	            });
	        });
	    };
	    RequestComponent.prototype.setRequestType = function (requestType) {
	        this.requestType = requestType;
	    };
	    RequestComponent.prototype.setComment = function (comment) {
	        this.comment = comment;
	    };
	    RequestComponent.prototype.addAttachment = function (file) {
	        var att = new models_1.Attachment();
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
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], RequestComponent.prototype, "send", void 0);
	    RequestComponent = __decorate([
	        core_1.Component({
	            selector: 'request',
	            template: "\n        <form (submit)=\"sendRequest($event)\">\n            <header>{{'task_request' | translate}}</header>\n            <section>\n                <request-type-input\n                    editable=\"true\"\n                    placeHolder=\"{{'request_type' | translate}}\"\n                    (select)=\"setRequestType($event)\">\n                </request-type-input>\n                <textarea class=\"rt-editor\" placeholder=\"{{'comment' | translate}}\" [(ngModel)]=\"comment\"></textarea>\n                <!-- <markdown-editor\n                    [markdown]=\"''\"\n                    editable=\"true\"\n                    placeHolder=\"{{'comment' | translate}}\"\n                    updateTimeout=\"100\"\n                    (update)=\"setComment($event)\">\n                </markdown-editor> -->\n                <attachments [model]=\"request\" editable=\"true\" (upload)=\"addAttachment($event)\" (delete)=\"deleteAttachment($event)\"></attachments>\n            </section>\n            <footer>\n                <button class=\"btn btn-cancel\" type=\"button\" (click)=\"cancel()\">{{'cancel' | translate}}</button>\n                <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!requestType\">{{'send_request' | translate}}</button>\n            </footer>\n        </form>\n    ",
	            host: {
	                '[class.request-composer]': 'true',
	                '[class.open]': 'isOpen',
	                '(keyup.escape)': 'cancel()'
	            },
	            directives: [attachments_1.AttachmentsComponent, request_type_input_1.RequestTypeInputComponent, markdown_1.MarkdownEditorComponent],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, ng2_translate_1.TranslateService, notification_1.NotificationService, services_1.TaskService])
	    ], RequestComponent);
	    return RequestComponent;
	}());
	exports.RequestComponent = RequestComponent;


/***/ },
/* 632 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ng2_translate_1 = __webpack_require__(350);
	var markdown_editor_1 = __webpack_require__(391);
	var models_1 = __webpack_require__(465);
	var comment_1 = __webpack_require__(633);
	var CommentsComponent = (function () {
	    function CommentsComponent() {
	        this.add = new core_1.EventEmitter();
	        this.update = new core_1.EventEmitter();
	        this.delete = new core_1.EventEmitter();
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
	        var comment = new models_1.Comment();
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
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], CommentsComponent.prototype, "comments", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], CommentsComponent.prototype, "add", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], CommentsComponent.prototype, "update", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], CommentsComponent.prototype, "delete", void 0);
	    CommentsComponent = __decorate([
	        core_1.Component({
	            selector: 'comments',
	            template: "\n        <div class=\"comments-wrap\">\n            <section class=\"comments\">\n                <comment *ngFor=\"let comment of comments\"\n                    [comment]=\"comment\"\n                    [editable]=\"true\"\n                    (save)=\"updateComment($event)\"\n                    (delete)=\"deleteComment($event)\">\n                </comment>\n            </section>\n            <section class=\"comment-composer\" [class.edit]=\"isEdit\">\n                <div class=\"comment-composer__editor\">\n                    <markdown-editor\n                        editable=\"true\"\n                        placeHolder=\"{{'comment' | translate}}\"\n                        (update)=\"setCommentText($event)\"\n                        (focus)=\"onEditorFocus($event)\"\n                        (blur)=\"onEditorBlur($event)\">\n                    </markdown-editor>\n                </div>\n                <button class=\"btn btn-add-comment\"\n                    (click)=\"addComment()\"\n                    [disabled]=\"!commentText\">\n                    {{ 'add_comment' | translate }}\n                </button>\n            </section>\n        </div>\n    ",
	            directives: [comment_1.CommentComponent, markdown_editor_1.MarkdownEditorComponent],
	            pipes: [ng2_translate_1.TranslatePipe]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CommentsComponent);
	    return CommentsComponent;
	}());
	exports.CommentsComponent = CommentsComponent;


/***/ },
/* 633 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var ng2_translate_1 = __webpack_require__(350);
	var markdown_1 = __webpack_require__(380);
	var attachments_1 = __webpack_require__(617);
	var pipes_1 = __webpack_require__(493);
	var models_1 = __webpack_require__(465);
	var CommentComponent = (function () {
	    function CommentComponent() {
	        this.editable = false;
	        this.save = new core_1.EventEmitter();
	        this.delete = new core_1.EventEmitter();
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
	        core_1.Input(), 
	        __metadata('design:type', models_1.Comment)
	    ], CommentComponent.prototype, "comment", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], CommentComponent.prototype, "editable", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], CommentComponent.prototype, "save", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], CommentComponent.prototype, "delete", void 0);
	    CommentComponent = __decorate([
	        core_1.Component({
	            selector: 'comment',
	            template: "\n        <div class=\"comment\" [class.edit]=\"edit\" [class.saving]=\"saving\">\n            <div class=\"comment__avatar\"></div>\n            <div class=\"comment__details\">\n                <span class=\"comment__author\">{{comment.authorId}}</span>\n                <span class=\"comment__time\">{{comment.regDate}}</span>\n                <p class=\"comment__text\" *ngIf=\"!edit\" innerHTML=\"{{comment.comment | marked}}\"></p>\n                <div class=\"comment__editor\" *ngIf=\"edit\">\n                    <markdown-editor\n                        markdown=\"{{comment.comment}}\"\n                        editable=\"true\"\n                        placeHolder=\"{{'add_comment' | translate}}\"\n                        (update)=\"setCommentText($event)\">\n                    </markdown-editor>\n                    <button type=\"button\" class=\"btn btn-cancel\" [disabled]=\"saving\" (click)=\"toggleEdit()\">{{'cancel' | translate}}</button>\n                    <button type=\"button\" class=\"btn btn-primary btn-save\" [disabled]=\"saving\" (click)=\"saveComment()\">{{'save' | translate}}</button>\n                </div>\n                <!-- <attachments\n                    [model]=\"comment\"\n                    (upload)=\"addAttachment($event)\"\n                    (delete)=\"deleteAttachment($event)\">\n                </attachments> -->\n            </div>\n            <div class=\"comment__buttons\" *ngIf=\"editable\">\n                <button type=\"button\" class=\"btn btn-sm\" *ngIf=\"!edit\" (click)=\"toggleEdit()\">\n                    <i class=\"fa fa-pencil\"></i>{{'edit' | translate}}\n                </button>\n                <button type=\"button\" class=\"btn btn-sm\" title=\"{{'delete' | translate}}\" (click)=\"delete.emit(comment)\">\n                    <i class=\"fa fa-remove\"></i>\n                </button>\n            </div>\n        </div>\n    ",
	            directives: [attachments_1.AttachmentsComponent, markdown_1.MarkdownEditorComponent],
	            pipes: [pipes_1.DateFormatPipe, ng2_translate_1.TranslatePipe, markdown_1.MarkedPipe]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CommentComponent);
	    return CommentComponent;
	}());
	exports.CommentComponent = CommentComponent;


/***/ },
/* 634 */
/***/ function(module, exports) {

	module.exports = "<form class=\"form\" [ngFormModel]=\"form\" *ngIf=\"isReady\">\r\n    <header class=\"content-header\">\r\n        <button class=\"btn-back\" type=\"button\" (click)=\"close($event)\">\r\n            <i class=\"fa fa-chevron-left\"></i>\r\n        </button>\r\n        <h1 class=\"header-title\">\r\n            <a *ngIf=\"parentTask\" [routerLink]=\"['/task', parentTask.id]\" class=\"parent-task-link\">\r\n                {{parentTask.title}}\r\n            </a>\r\n            <div>\r\n                {{getTitle() | translate}}\r\n                <small class=\"status-{{task.status | text:'L'}}\">{{task.status | text:'L' | translate}}</small>\r\n            </div>\r\n        </h1>\r\n        <div class=\"content-actions\">\r\n            <button class=\"btn btn-primary\" type=\"button\" *ngIf=\"canSaveTask()\" [disabled]=\"!form.valid\" (click)=\"saveTask()\">\r\n                <span *ngIf=\"isNew\">{{'send_task' | translate}}</span>\r\n                <span *ngIf=\"!isNew\">{{'save_close' | translate}}</span>\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" (click)=\"close($event)\">\r\n                {{'close' | translate}}\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" *ngIf=\"canRequestAction()\" (click)=\"newRequest($event)\">\r\n                {{'new_request' | translate}}\r\n            </button>\r\n            <button *ngIf=\"!isNew && FEATURE_FLAGS.subTask\" class=\"btn\" type=\"button\" (click)=\"addSubtask($event)\">\r\n                {{'add_subtask' | translate}}\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" *ngIf=\"canCompleteTask()\" (click)=\"completeTask()\">\r\n                <span>{{'complete_task' | translate}}</span>\r\n            </button>\r\n            <div *ngIf=\"!isNew\" dropdown class=\"buttons\">\r\n                <div dropdown-toggle>\r\n                    <span class=\"btn\">...</span>\r\n                </div>\r\n                <div class=\"dropdown-menu\">\r\n                    <ul class=\"menu\">\r\n                        <li>\r\n                            <a class=\"menu-item\" (click)=\"deleteTask()\">{{'delete' | translate}}</a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </header>\r\n    <section class=\"content-body\">\r\n        <tabs>\r\n            <tab class=\"tab-pane\" tabTitle=\"{{'properties' | translate}}\">\r\n                <fieldset class=\"fieldset\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'task_title' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"!form.controls.title.valid\">\r\n                            <input class=\"span8\" [(ngModel)]=\"task.title\" ngControl=\"title\" [disabled]=\"!isEditable\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"!isSubtask\">\r\n                        <div class=\"control-label\">\r\n                            {{'project' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"!form.controls.projectId.valid\">\r\n                            <div class=\"span8\">\r\n                                <project-input [editable]=\"isEditable\" [projectId]=\"task.projectId\" (select)=\"setProject($event)\"></project-input>\r\n                            </div>\r\n                        </div>\r\n                        <div [hidden]=\"form.controls.projectId.valid || form.controls.projectId.pristine\" class=\"error-message\">\r\n                            {{'required' | translate}}\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"!isSubtask\">\r\n                        <div class=\"control-label\">\r\n                            {{'task_type' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"!form.controls.taskTypeId.valid\">\r\n                            <div class=\"span8\">\r\n                                <task-type-input [editable]=\"isEditable\" [taskTypeId]=\"task.taskTypeId\" (select)=\"setTaskType($event)\"></task-type-input>\r\n                            </div>\r\n                            <div [hidden]=\"form.controls.taskTypeId.valid || form.controls.taskTypeId.pristine\" class=\"error-message\">\r\n                                {{'required' | translate}}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'priority' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"!form.controls.priority.valid\">\r\n                            <switch-button [disabled]=\"!isEditable\" [model]=\"task\" value=\"priority\" [items]=\"taskPriorityTypes\"></switch-button>\r\n                            <div [hidden]=\"form.controls.priority.valid || form.controls.priority.pristine\" class=\"error-message\">\r\n                                {{'required' | translate}}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'assignee_user' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"!form.controls.assigneeUserId.valid\">\r\n                            <div class=\"span8\">\r\n                                <user-input [editable]=\"isEditable\" [userIds]=\"[task.assigneeUserId]\" (select)=\"setAssigneeUser($event)\"></user-input>\r\n                            </div>\r\n                            <div [hidden]=\"form.controls.assigneeUserId.valid || form.controls.assigneeUserId.pristine\" class=\"error-message\">\r\n                                {{'required' | translate}}\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'start_date' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <input datepicker class=\"span2\" (select)=\"setStartDate($event)\" [(ngModel)]=\"task.startDate\" ngControl=\"startDate\" [disabled]=\"!isEditable\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'due_date' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <input datepicker class=\"span2\" (select)=\"setDueDate($event)\" [(ngModel)]=\"task.dueDate\" ngControl=\"dueDate\" [disabled]=\"!isEditable\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'tags' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"!form.controls.tagIds.valid\">\r\n                            <div class=\"span8\">\r\n                                <tags-input [editable]=\"isEditable\" [tagIds]=\"task.tagIds\" (select)=\"setTags($event)\"></tags-input>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'body' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\" [class.has-error]=\"!form.controls.body.valid\">\r\n                            <div class=\"span8\">\r\n                                <markdown-editor [markdown]=\"task.body || ''\" [editable]=\"isEditable\" updateTimeout=\"300\" (update)=\"updateTaskBody($event)\"></markdown-editor>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </fieldset>\r\n                <attachments editable=\"true\" [model]=\"task\" (upload)=\"addAttachment($event)\" (delete)=\"deleteAttachment($event)\"></attachments>\r\n            </tab>\r\n            <tab *ngIf=\"!isNew && hasSubTasks()\" class=\"tab-pane\" tabTitle=\"{{'subtasks' | translate}}\" (select)=\"loadSubtasks()\">\r\n                <task-list [tasks]=\"subTasks\"></task-list>\r\n            </tab>\r\n            <tab *ngIf=\"!isNew && FEATURE_FLAGS.comments\" class=\"tab-pane\" tabTitle=\"{{'comments' | translate}}\" (select)=\"loadComments()\">\r\n                <comments [comments]=\"comments\" (add)=\"saveComment($event)\" (update)=\"saveComment($event)\" (delete)=\"deleteComment($event)\"></comments>\r\n            </tab>\r\n            <tab *ngIf=\"!isNew && hasRequests()\" class=\"tab-pane\" tabTitle=\"{{'requests' | translate}} {{hasUnResolvedRequest ? '1' : '0'}}\" (select)=\"loadRequests()\">\r\n                <request-list [requests]=\"requests\" (accept)=\"acceptRequest($event)\" (decline)=\"declineRequest($event)\"></request-list>\r\n            </tab>\r\n        </tabs>\r\n    </section>\r\n    <footer>\r\n        <div class=\"record-author\" *ngIf=\"task.authorId\">\r\n            <span>{{'author' | translate}}</span>\r\n            <user-input [editable]=\"false\" [userIds]=\"[task.authorId]\"></user-input>\r\n            <time>{{task.regDate}}</time>\r\n        </div>\r\n    </footer>\r\n</form>\r\n<request (send)=\"requestSendEventHandler($event)\"></request>\r\n"

/***/ },
/* 635 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var http_1 = __webpack_require__(329);
	var router_1 = __webpack_require__(394);
	var common_1 = __webpack_require__(2);
	var store_1 = __webpack_require__(437);
	var ng2_translate_1 = __webpack_require__(350);
	var tabs_1 = __webpack_require__(627);
	var keys_pipe_1 = __webpack_require__(600);
	var app_service_1 = __webpack_require__(461);
	var translate_service_1 = __webpack_require__(463);
	var user_1 = __webpack_require__(466);
	var utils_1 = __webpack_require__(462);
	var HEADERS = new http_1.Headers({
	    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
	    'Accept': 'application/json'
	});
	var UserProfileComponent = (function () {
	    function UserProfileComponent(store, http, router, formBuilder, ng2TranslateService, appService, translateService) {
	        var _this = this;
	        this.store = store;
	        this.http = http;
	        this.router = router;
	        this.formBuilder = formBuilder;
	        this.ng2TranslateService = ng2TranslateService;
	        this.appService = appService;
	        this.translateService = translateService;
	        this.user = new user_1.User();
	        this.changePassword = false;
	        this.language = 'RUS';
	        this.pageSizes = [10, 20, 30, 40, 50];
	        var ck = document.cookie.match('(lang)=(.*?)($|;|,(?! ))');
	        if (ck) {
	            this.language = ck[2];
	        }
	        this.sub = this.store.select('authed').subscribe(function (data) {
	            _this.user = data.userProfile;
	            _this.pageSize = data.pageSize;
	            _this.languages = data.languages;
	            _this.form = formBuilder.group({
	                login: [_this.user.name],
	                pwd: [],
	                pwd_new: [],
	                pwd_confirm: [],
	                email: []
	            });
	        });
	    }
	    UserProfileComponent.prototype.ngOnDestroy = function () {
	        this.sub.unsubscribe();
	    };
	    UserProfileComponent.prototype.toggleChangePassword = function () {
	        this.changePassword = !this.changePassword;
	    };
	    UserProfileComponent.prototype.updateUserProfile = function () {
	        this.appService.updateUserProfile(this.form.value).subscribe(function (data) { return console.log(data); });
	    };
	    UserProfileComponent.prototype.changeLang = function ($event) {
	        var _this = this;
	        var langCode = $event.target.value;
	        var url = '/Staff/p?id=change-session-val-action&lang=' + langCode;
	        return this.http.post(url, {}, { headers: HEADERS })
	            .map(function (response) { return response.json(); })
	            .subscribe(function (data) {
	            _this.ng2TranslateService.reloadLang(langCode).subscribe(function (r) {
	                _this.ng2TranslateService.use(langCode);
	            });
	            utils_1.createCookie('lang', langCode, 365);
	            window.location.reload();
	        });
	    };
	    UserProfileComponent.prototype.close = function (event) {
	        event.preventDefault();
	        window.history.back();
	    };
	    UserProfileComponent = __decorate([
	        core_1.Component({
	            selector: '[user-profile]',
	            template: __webpack_require__(636),
	            directives: [common_1.FORM_DIRECTIVES, tabs_1.TAB_DIRECTIVES],
	            providers: [common_1.FormBuilder],
	            pipes: [ng2_translate_1.TranslatePipe, keys_pipe_1.KeysPipe]
	        }), 
	        __metadata('design:paramtypes', [store_1.Store, http_1.Http, router_1.Router, common_1.FormBuilder, ng2_translate_1.TranslateService, app_service_1.AppService, translate_service_1.TranslateService])
	    ], UserProfileComponent);
	    return UserProfileComponent;
	}());
	exports.UserProfileComponent = UserProfileComponent;


/***/ },
/* 636 */
/***/ function(module, exports) {

	module.exports = "<form class=\"form form-userprofile\" autocomplete=\"off\" [ngFormModel]=\"form\" *ngIf=\"user\">\r\n    <header class=\"content-header\">\r\n        <button class=\"btn-back\" type=\"button\" (click)=\"close($event)\">\r\n            <i class=\"fa fa-chevron-left\"></i>\r\n        </button>\r\n        <h1 class=\"header-title\">\r\n            {{'employee' | translate}} {{user.name}}\r\n        </h1>\r\n        <div class=\"content-actions\">\r\n            <button class=\"btn btn-primary\" type=\"button\" [disabled]=\"!form.valid\" (click)=\"updateUserProfile()\">\r\n                {{'save_close' | translate}}\r\n            </button>\r\n            <button class=\"btn\" type=\"button\" (click)=\"close($event)\">\r\n                {{'close' | translate}}\r\n            </button>\r\n        </div>\r\n    </header>\r\n    <section class=\"content-body\">\r\n        <tabs>\r\n            <tab class=\"tab-pane\" tabTitle=\"{{'properties' | translate}}\">\r\n                <!--<fieldset class=\"fieldset fieldset-user-avatar\">\r\n                            <img class=\"user-avatar\" src=\"img/avatar.png\"/>\r\n                </fieldset>-->\r\n                <fieldset class=\"fieldset fieldset-user-fields\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'user_name' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"input-placeholder\">\r\n                                {{user.name}}\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'login_name' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <input type=\"text\" class=\"span4\" ngControl=\"login\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"!changePassword\">\r\n                        <div class=\"control-label\"></div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"btn btn-xs\" (click)=\"toggleChangePassword()\">{{'change_password' | translate}}</span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"changePassword\">\r\n                        <div class=\"control-label\">\r\n                            {{'password' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <input type=\"password\" class=\"span4\" ngControl=\"pwd\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"changePassword\">\r\n                        <div class=\"control-label\">\r\n                            {{'password_new' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <input type=\"password\" class=\"span4\" ngControl=\"pwd_new\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"changePassword\">\r\n                        <div class=\"control-label\">\r\n                            {{'password_confirm' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <input type=\"password\" class=\"span4\" ngControl=\"pwd_confirm\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'email' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <input type=\"email\" class=\"span4\" ngControl=\"email\" />\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"user.organization\">\r\n                        <div class=\"control-label\">\r\n                            {{'org_name' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"input-placeholder\">\r\n                                {{user.organization}}\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"user.department\">\r\n                        <div class=\"control-label\">\r\n                            {{'department' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"input-placeholder\">\r\n                                {{user.department}}\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"user.position\">\r\n                        <div class=\"control-label\">\r\n                            {{'position' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <span class=\"input-placeholder\">\r\n                                {{user.position}}\r\n                            </span>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\" *ngIf=\"user.roles\">\r\n                        <div class=\"control-label\">\r\n                            {{'roles' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <ul class=\"input-placeholder list-style-none\">\r\n                                <li *ngFor=\"let role of user.roles\">{{role.localizedName[language]}}</li>\r\n                            </ul>\r\n                        </div>\r\n                    </div>\r\n                </fieldset>\r\n            </tab>\r\n            <tab class=\"tab-pane\" tabTitle=\"{{'interface' | translate}}\">\r\n                <fieldset class=\"fieldset\">\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'limit_view' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <select name=\"pagesize\" class=\"span2\" (change)=\"changePageSize($event)\">\r\n                                <option value=\"{{ps}}\" [selected]=\"ps == pageSize\" *ngFor=\"let ps of pageSizes\">{{ps}}</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group\">\r\n                        <div class=\"control-label\">\r\n                            {{'interface_lang' | translate}}\r\n                        </div>\r\n                        <div class=\"controls\">\r\n                            <select name=\"lang\" class=\"span2\" (change)=\"changeLang($event)\">\r\n                                <option value=\"{{langCode}}\" [selected]=\"langCode == language\" *ngFor=\"let langCode of languages | keys\">\r\n                                    {{languages[langCode]}}\r\n                                </option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                    <!-- <div class=\"form-group\">\r\n                        <div class=\"control-label\"></div>\r\n                        <div class=\"controls\">\r\n                            <a href=\"javascript:void(0)\" data-toggle-theme=\"theme1\" class=\"input-placeholder\">\r\n                                {{'change_skin' | translate}}\r\n                            </a>\r\n                        </div>\r\n                    </div> -->\r\n                </fieldset>\r\n            </tab>\r\n        </tabs>\r\n    </section>\r\n</form>\r\n"

/***/ },
/* 637 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(5);
	var LoginComponent = (function () {
	    function LoginComponent() {
	        window.location.href = 'Logout';
	    }
	    LoginComponent = __decorate([
	        core_1.Component({
	            selector: '[login]',
	            template: ''
	        }), 
	        __metadata('design:paramtypes', [])
	    ], LoginComponent);
	    return LoginComponent;
	}());
	exports.LoginComponent = LoginComponent;


/***/ },
/* 638 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(639));


/***/ },
/* 639 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var compose_1 = __webpack_require__(640);
	var store_1 = __webpack_require__(437);
	var ngrx_store_logger_1 = __webpack_require__(641);
	var environment_reducer_1 = __webpack_require__(642);
	var authed_reducer_1 = __webpack_require__(643);
	var projects_reducer_1 = __webpack_require__(644);
	var tasks_reducer_1 = __webpack_require__(645);
	var task_reducer_1 = __webpack_require__(646);
	var staff_reducer_1 = __webpack_require__(647);
	var reference_reducer_1 = __webpack_require__(648);
	var logger = ngrx_store_logger_1.storeLogger({
	    level: 'log',
	    collapsed: false,
	    duration: true,
	    timestamp: true
	});
	exports.APP_STORE = store_1.provideStore(compose_1.compose(logger, store_1.combineReducers)({
	    environment: environment_reducer_1.environmentReducer,
	    authed: authed_reducer_1.authedReducer,
	    projects: projects_reducer_1.projectsReducer,
	    tasks: tasks_reducer_1.tasksReducer,
	    task: task_reducer_1.taskReducer,
	    staff: staff_reducer_1.staffReducer,
	    reference: reference_reducer_1.referenceReducer
	}));


/***/ },
/* 640 */
/***/ function(module, exports) {

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
	//# sourceMappingURL=compose.js.map

/***/ },
/* 641 */
/***/ function(module, exports) {

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
	        var ua = window && window.navigator.userAgent ? window.navigator.userAgent : '';
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
/* 642 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var environment_actions_1 = __webpack_require__(454);
	;
	var initialState = {
	    isMobile: false,
	    isNavOpen: true,
	    isSearchOpen: false
	};
	exports.environmentReducer = function (state, _a) {
	    if (state === void 0) { state = initialState; }
	    var type = _a.type, payload = _a.payload;
	    switch (type) {
	        case environment_actions_1.EnvironmentActions.TOGGLE_NAV:
	            return Object.assign({}, state, {
	                isNavOpen: !state.isNavOpen
	            });
	        case environment_actions_1.EnvironmentActions.TOGGLE_SEARCH:
	            return Object.assign({}, state, {
	                isSearchOpen: !state.isSearchOpen
	            });
	        case environment_actions_1.EnvironmentActions.HIDE_NAV:
	            return Object.assign({}, state, {
	                isNavOpen: true,
	                isSearchOpen: false
	            });
	        default:
	            return state;
	    }
	};


/***/ },
/* 643 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var app_actions_1 = __webpack_require__(455);
	;
	var initialState = {
	    userProfile: null,
	    languages: {},
	    pageSize: 20,
	    language: 'RUS'
	};
	exports.authedReducer = function (state, _a) {
	    if (state === void 0) { state = initialState; }
	    var type = _a.type, payload = _a.payload;
	    switch (type) {
	        case app_actions_1.AppActions.FETCH_USER_PROFILE_FULFILLED:
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
/* 644 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var project_actions_1 = __webpack_require__(456);
	;
	var initialState = {
	    meta: {},
	    projects: [],
	    project: undefined,
	    loading: false
	};
	exports.projectsReducer = function (state, _a) {
	    if (state === void 0) { state = initialState; }
	    var type = _a.type, payload = _a.payload;
	    switch (type) {
	        case project_actions_1.ProjectActions.FETCH_PROJECTS:
	            return Object.assign({}, state, {
	                loading: true
	            });
	        case project_actions_1.ProjectActions.FETCH_PROJECTS_FAILED:
	            return Object.assign({}, state, {
	                loading: false
	            });
	        case project_actions_1.ProjectActions.FETCH_PROJECTS_FULFILLED:
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
/* 645 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var actions_1 = __webpack_require__(453);
	exports.SET_FILTER = 'SET_FILTER';
	exports.EXPAND_ID = 'EXPAND_ID';
	exports.COLLAPSE_ID = 'COLLAPSE_ID';
	;
	var initialState = {
	    meta: {},
	    tasks: [],
	    expandIds: [],
	    loading: false,
	    filter: {
	        taskType: null,
	        assigneeUser: null,
	        tags: []
	    }
	};
	exports.tasksReducer = function (state, _a) {
	    if (state === void 0) { state = initialState; }
	    var type = _a.type, payload = _a.payload;
	    switch (type) {
	        case actions_1.TaskActions.FETCH_TASKS_FULFILLED:
	            return Object.assign({}, state, {
	                tasks: payload.tasks,
	                meta: payload.meta
	            });
	        case actions_1.TaskActions.FETCH_TASK_FULFILLED:
	            return Object.assign({}, state, {
	                task: payload.task
	            });
	        case exports.SET_FILTER:
	            return Object.assign({}, state, {
	                filter: payload
	            });
	        case exports.EXPAND_ID:
	            if (state.expandIds.indexOf(payload.id) == -1) {
	                return Object.assign({}, state, {
	                    expandIds: state.expandIds.push(payload.id)
	                });
	            }
	            return state;
	        case exports.COLLAPSE_ID:
	            var ind = state.expandIds.indexOf(payload.id);
	            if (ind != -1) {
	                var ids = state.expandIds.splice(ind);
	                return Object.assign({}, state, {
	                    expandIds: ids
	                });
	            }
	            return state;
	        default:
	            return state;
	    }
	};


/***/ },
/* 646 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var actions_1 = __webpack_require__(453);
	;
	var initialState = {
	    task: null,
	    request: null,
	    requests: [],
	    showRequest: false,
	    comments: []
	};
	exports.taskReducer = function (state, _a) {
	    if (state === void 0) { state = initialState; }
	    var type = _a.type, payload = _a.payload;
	    switch (type) {
	        case actions_1.TaskActions.FETCH_TASK_REQUESTS_FULFILLED:
	            return Object.assign({}, state, {
	                requests: payload.requests
	            });
	        case actions_1.TaskActions.TASK_REQUEST_NEW:
	            return Object.assign({}, state, {
	                task: payload,
	                showRequest: true
	            });
	        case actions_1.TaskActions.TASK_REQUEST_CANCEL:
	            return Object.assign({}, state, {
	                showRequest: false
	            });
	        case actions_1.TaskActions.FETCH_TASK_COMMENTS_FULFILLED:
	            return Object.assign({}, state, {
	                comments: payload.comments
	            });
	        case actions_1.TaskActions.TASK_UNLOAD:
	            return {
	                task: null,
	                request: null,
	                requests: [],
	                showRequest: false,
	                comments: []
	            };
	        default:
	            return state;
	    }
	};


/***/ },
/* 647 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var actions_1 = __webpack_require__(453);
	;
	var initialState = {
	    organizations: [],
	    users: []
	};
	exports.staffReducer = function (state, _a) {
	    if (state === void 0) { state = initialState; }
	    var type = _a.type, payload = _a.payload;
	    switch (type) {
	        case actions_1.StaffActions.FETCH_ORGANIZATIONS:
	            return Object.assign({}, state, {
	                organizations: payload.organizations
	            });
	        case actions_1.StaffActions.FETCH_USERS:
	            return Object.assign({}, state, {
	                users: payload.users
	            });
	        default:
	            return state;
	    }
	};


/***/ },
/* 648 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var reference_actions_1 = __webpack_require__(458);
	;
	var initialState = {
	    tags: [],
	    taskTypes: [],
	    requestTypes: [],
	    fetchFail: false
	};
	exports.referenceReducer = function (state, _a) {
	    if (state === void 0) { state = initialState; }
	    var type = _a.type, payload = _a.payload;
	    switch (type) {
	        case reference_actions_1.ReferenceActions.FETCH_TAGS:
	            return Object.assign({}, state, {
	                tags: payload.tags
	            });
	        case reference_actions_1.ReferenceActions.FETCH_TASK_TYPES:
	            return Object.assign({}, state, {
	                taskTypes: payload.taskTypes
	            });
	        case reference_actions_1.ReferenceActions.FETCH_REQUEST_TYPES:
	            return Object.assign({}, state, {
	                requestTypes: payload.requestTypes
	            });
	        case reference_actions_1.ReferenceActions.FETCH_REFERENCE_FAILED:
	            return Object.assign({}, state, {
	                fetchFail: true
	            });
	        default:
	            return state;
	    }
	};


/***/ }
]);
//# sourceMappingURL=app.js.map