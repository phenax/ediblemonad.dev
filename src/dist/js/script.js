/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Need to support old people
Array.from = Array.from || function (list) {
	return [].slice.call(list);
};

/**
 * Router class for handling client-side routing
 */

var Router = function (_EventEmitter) {
	_inherits(Router, _EventEmitter);

	_createClass(Router, null, [{
		key: 'ROUTE_CHANGE',


		// Route update event listener
		get: function get() {
			return 'ROUTE_CHANGE';
		}
	}]);

	function Router() {
		_classCallCheck(this, Router);

		// All routes
		var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

		_this.routes = new Map();

		_this._routeChangeHandler = _this._routeChangeHandler.bind(_this);
		_this.triggerUpdate = _this.triggerUpdate.bind(_this);
		return _this;
	}

	// Initialize router


	_createClass(Router, [{
		key: 'init',
		value: function init(config) {

			this.baseUrl = config.baseUrl || '/';
			this.otherwise = config.otherwise || '/';
			this.mounts = config.mounts || [];

			// When the router initializes, mount all mountables
			this.mounts.forEach(function (elem) {
				return elem.onMount();
			});

			// All the view elements in the DOM
			this.$views = document.querySelectorAll('[data-view]');

			this._attachEventHandlers();

			// Trigger a manual update to check what route the user is currently in
			this.triggerUpdate();

			return this;
		}

		// Attach route change handler to events

	}, {
		key: '_attachEventHandlers',
		value: function _attachEventHandlers() {

			// Attach route change handler
			this.onRouteChange(this._routeChangeHandler);

			// Attach route change handler to popstate listener
			window.addEventListener('popstate', this._routeChangeHandler);
		}

		// Is called when the route changes(To trigger view update)

	}, {
		key: '_routeChangeHandler',
		value: function _routeChangeHandler() {
			var _this2 = this;

			// Resolve a url i.e. get rid of extra '/'
			var resolveRoute = function resolveRoute(url) {
				return (_this2.baseUrl + '/' + url).replace(/[\/]+/gi, '/');
			};

			// Find the matching route for the current url
			var matchingRoute = this.routes.get(resolveRoute(window.location.pathname.replace(/\/$/, '')));

			// If a match exists
			if (matchingRoute) {

				// Call the controller and if it returns true, dont render view
				if (matchingRoute.controller && matchingRoute.controller()) return;

				// Render view for the route
				this.showView(matchingRoute);
			} else {

				// If a match is not found, navigate back to the default(this.otherwise) route
				this.trigger(this.otherwise);
			}
		}

		// Get view for a route

	}, {
		key: 'getView',
		value: function getView(routeUrl) {

			// For each views, filter out the ones that match the current route
			return Array.from(this.$views).filter(function ($el) {
				return $el.dataset.view === routeUrl;
			});
		}

		// Render the view

	}, {
		key: 'showView',
		value: function showView(route) {

			var $views = this.getView(route.url);

			if ($views.length) {

				// If the view is already rendered, dont re-render
				if ($views.filter(function ($view) {
					return $view.dataset.active === 'true';
				}).length) {
					return;
				}

				// "Un-render" all other views
				Array.from(this.$views).filter(function ($el) {
					return $el !== $views[0];
				}).forEach(function ($el) {
					return $el.removeAttribute('data-active');
				});

				// Render the current view
				$views.forEach(function ($view) {
					$view.dataset.active = 'true';
				});
			}
		}

		// Add a new route

	}, {
		key: 'add',
		value: function add() {
			var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


			// If the route had a url field, add the route
			if (route.url) this.routes.set(route.url, route);

			return this;
		}

		// Navigate to a new url

	}, {
		key: 'trigger',
		value: function trigger(url) {

			// Change history
			history.pushState({}, null, url);

			// Update view
			this.triggerUpdate();
		}

		// Trigger view update

	}, {
		key: 'triggerUpdate',
		value: function triggerUpdate() {
			this.emit(Router.ROUTE_CHANGE);
		}

		// Add route change listeners

	}, {
		key: 'onRouteChange',
		value: function onRouteChange(callback) {
			this.on(Router.ROUTE_CHANGE, callback);
		}

		// Remove route change listeners

	}, {
		key: 'removeListener',
		value: function removeListener(callback) {
			this.off(Router.ROUTE_CHANGE, callback);
		}
	}]);

	return Router;
}(_events.EventEmitter);

// Create and export an instance of the router


exports.default = new Router();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
	function Component() {
		_classCallCheck(this, Component);
	}

	_createClass(Component, [{
		key: 'onMount',
		value: function onMount() {}
	}, {
		key: 'onUnmount',
		value: function onUnmount() {}
	}, {
		key: 'addListeners',
		value: function addListeners($elems, events, callback) {
			var _this = this;

			Array.from($elems).forEach(function ($el) {
				return _this.addListener($el, events, callback);
			});
		}
	}, {
		key: 'addListener',
		value: function addListener($el, events, callback) {

			events.split(' ').forEach(function (event) {
				return $el.addEventListener(event, callback);
			});
		}
	}, {
		key: 'removeListeners',
		value: function removeListeners($elems, events, callback) {
			var _this2 = this;

			Array.from($elems).forEach(function ($el) {
				return _this2.removeListener($el, events, callback);
			});
		}
	}, {
		key: 'removeListener',
		value: function removeListener($el, events, callback) {

			events.split(' ').forEach(function (event) {
				return $el.removeEventListener(event, callback);
			});
		}
	}]);

	return Component;
}();

exports.default = Component;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(1);

var _component2 = _interopRequireDefault(_component);

var _router = __webpack_require__(0);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterLinks = function (_Component) {
	_inherits(RouterLinks, _Component);

	function RouterLinks() {
		_classCallCheck(this, RouterLinks);

		return _possibleConstructorReturn(this, (RouterLinks.__proto__ || Object.getPrototypeOf(RouterLinks)).apply(this, arguments));
	}

	_createClass(RouterLinks, [{
		key: 'onMount',
		value: function onMount() {

			this.$allLinks = document.querySelectorAll('[data-route]');

			this.initializeLister();
		}
	}, {
		key: 'initializeLister',
		value: function initializeLister() {

			if ('history' in window && 'pushState' in window.history) {
				this._linkClickHandler = this._linkClickHandler.bind(this);

				this.addListeners(this.$allLinks, 'click', this._linkClickHandler);
			}
		}
	}, {
		key: '_linkClickHandler',
		value: function _linkClickHandler(e) {
			e.preventDefault();

			// Trigger view change
			_router2.default.trigger(e.currentTarget.getAttribute('href'));
		}
	}]);

	return RouterLinks;
}(_component2.default);

exports.default = new RouterLinks();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(1);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Component) {
	_inherits(Menu, _Component);

	function Menu() {
		_classCallCheck(this, Menu);

		return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
	}

	_createClass(Menu, [{
		key: 'onMount',
		value: function onMount() {

			this.$menu = document.querySelector('.' + this.classNames.menu);

			this.$openMenuBtns = document.querySelectorAll('.' + this.classNames.openMenu);
			this.$closeMenuBtns = document.querySelectorAll('.' + this.classNames.closeMenu);

			this._initListeners();
		}
	}, {
		key: '_initListeners',
		value: function _initListeners() {

			this._openMenuClickHandler = this._openMenuClickHandler.bind(this);
			this._closeMenuClickHandler = this._closeMenuClickHandler.bind(this);

			this.addListeners(this.$openMenuBtns, 'click', this._openMenuClickHandler);

			this.addListeners(this.$closeMenuBtns, 'click', this._closeMenuClickHandler);
		}
	}, {
		key: '_openMenuClickHandler',
		value: function _openMenuClickHandler(e) {
			e.preventDefault();

			this.show();
		}
	}, {
		key: '_closeMenuClickHandler',
		value: function _closeMenuClickHandler(e) {
			e.preventDefault();

			this.hide();
		}
	}, {
		key: 'show',
		value: function show() {

			if (!this.$menu.classList.contains(this.classNames.menuVisible)) this.$menu.classList.add(this.classNames.menuVisible);
		}
	}, {
		key: 'hide',
		value: function hide() {

			if (this.$menu.classList.contains(this.classNames.menuVisible)) this.$menu.classList.remove(this.classNames.menuVisible);
		}
	}, {
		key: 'classNames',
		get: function get() {
			return {
				menu: 'js-menu',
				openMenu: 'js-open-menu',
				closeMenu: 'js-close-menu',
				menuVisible: 'menu--visible'
			};
		}
	}]);

	return Menu;
}(_component2.default);

exports.default = new Menu();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _router = __webpack_require__(0);

var _router2 = _interopRequireDefault(_router);

var _menu = __webpack_require__(3);

var _menu2 = _interopRequireDefault(_menu);

var _links = __webpack_require__(2);

var _links2 = _interopRequireDefault(_links);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  All mountables(elements to mount when the router is set up)
var mountElems = [_menu2.default, _links2.default];

// If it supports pushState routing
if ('history' in window && 'pushState' in window.history) {

	// Add a route change listener
	_router2.default.onRouteChange(function () {

		// Remove hash(if the user had js disabled and just enabled it)
		if (window.location.hash.length) window.location.hash = '';

		// Hide menu
		_menu2.default.hide();
	});

	// Router configuration
	_router2.default.add({ url: '/' }).add({ url: '/about' }).add({ url: '/skills' }).add({ url: '/contact' }).init({
		otherwise: '/',
		mounts: mountElems
	});
} else {

	// Else mount the elements
	mountElems.forEach(function (el) {
		return el.onMount();
	});
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map