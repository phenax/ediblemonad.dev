/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

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

	_createClass(Menu, [{
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

	function Menu() {
		_classCallCheck(this, Menu);

		var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

		_this.$menu = document.querySelector('.' + _this.classNames.menu);

		_this.$openMenuBtns = document.querySelectorAll('.' + _this.classNames.openMenu);
		_this.$closeMenuBtns = document.querySelectorAll('.' + _this.classNames.closeMenu);

		_this._initListeners();
		return _this;
	}

	_createClass(Menu, [{
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

			this.$menu.classList.add(this.classNames.menuVisible);
		}
	}, {
		key: '_closeMenuClickHandler',
		value: function _closeMenuClickHandler(e) {
			e.preventDefault();

			this.$menu.classList.remove(this.classNames.menuVisible);
		}
	}]);

	return Menu;
}(_component2.default);

exports.default = Menu;

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
'use strict';

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
		key: 'onUnMount',
		value: function onUnMount() {}
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _menu = __webpack_require__(0);

var _menu2 = _interopRequireDefault(_menu);

var _links = __webpack_require__(3);

var _links2 = _interopRequireDefault(_links);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (window.location.hash.length) window.location.hash = '';

new _menu2.default();
new _links2.default();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

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

var RouterLinks = function (_Component) {
	_inherits(RouterLinks, _Component);

	function RouterLinks(props) {
		_classCallCheck(this, RouterLinks);

		var _this = _possibleConstructorReturn(this, (RouterLinks.__proto__ || Object.getPrototypeOf(RouterLinks)).call(this, props));

		_this.$allLinks = document.querySelectorAll('[data-route]');

		_this.initializeLister();
		return _this;
	}

	_createClass(RouterLinks, [{
		key: 'initializeLister',
		value: function initializeLister() {

			this._linkClickHandler = this._linkClickHandler.bind(this);

			this.addListeners(this.$allLinks, 'click', this._linkClickHandler);
		}
	}, {
		key: '_linkClickHandler',
		value: function _linkClickHandler(e) {
			if ('history' in window && 'pushState' in window.history) {
				e.preventDefault();
			} else return;

			// Trigger view change
		}
	}]);

	return RouterLinks;
}(_component2.default);

exports.default = RouterLinks;

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map