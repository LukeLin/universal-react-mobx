require("source-map-support").install();
module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 64);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!*****************************!*\
  !*** external "mobx-react" ***!
  \*****************************/
/***/ (function(module, exports) {

module.exports = require("mobx-react");

/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** external "mobx" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ }),
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./common/pages/Base.jsx ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _events = __webpack_require__(/*! events */ 20);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventMatchReg = /^on[A-Z]/;
function getEventMethodsProps(instance) {
    let methods = Object.getOwnPropertyNames(instance).filter(prop => {
        return eventMatchReg.test(prop) && typeof instance[prop] === 'function';
    });

    let instancePrototype = Object.getPrototypeOf(instance);
    if (instancePrototype !== Object.prototype) {
        methods = methods.concat(getEventMethodsProps(instancePrototype));
    }

    return methods;
}

let Base = class Base extends _react.Component {
    constructor(props, context) {
        super(props, context);

        this.__eventNames = {};

        this.__bindFunctions();
    }

    __bindFunctions() {
        let props = getEventMethodsProps(this);
        for (let prop of props) {
            if (!this[prop].funcBinded) {
                this[prop] = this[prop].bind(this);
                this[prop].funcBinded = true;
            }
        }
    }

    on(eventName, fn) {
        if (typeof fn !== 'function') throw new Error('fn should be a function');

        if (!this.__eventNames[eventName]) {
            this.__eventNames[eventName] = [fn];
        } else {
            this.__eventNames[eventName].push(fn);
        }

        return this.context.$eventBus.addListener(eventName, fn);
    }

    emit(eventName, ...args) {
        return this.context.$eventBus.emit(eventName, ...args);
    }

    off(eventName, fn) {
        let events = this.__eventNames[eventName];
        if (events) {
            let index = events.indexOf(fn);

            if (index >= 0) {
                this.context.$eventBus.removeListener(eventName, fn);

                events.splice(index, 1);

                if (!events.length) {
                    delete this.__eventNames[eventName];
                }
            } else {
                console.warn('event: ' + eventName + ' is not registered in ' + this._reactInternalInstance.getName() + ' Component');
            }

            return true;
        } else {
            console.warn('event: ' + eventName + ' is not registered in ' + this.constructor.name + ' Component');

            return false;
        }
    }

    componentWillUnmount() {
        for (let eventName in this.__eventNames) {
            if (this.__eventNames.hasOwnProperty(eventName)) {
                for (let fn of this.__eventNames[eventName]) {
                    this.off(eventName, fn);
                }
            }
        }
    }
};
exports.default = Base;

Base.contextTypes = {
    $eventBus: _react.PropTypes.instanceOf(_events2.default)
};

/***/ }),
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./~/warning/warning.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "production" !== 'production';

var warning = function() {};

if (__DEV__) {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),
/* 5 */
/* exports provided: MemoryRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, matchPath, withRouter */
/* all exports used */
/*!************************************!*\
  !*** ./~/react-router/es/index.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MemoryRouter__ = __webpack_require__(/*! ./MemoryRouter */ 54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return __WEBPACK_IMPORTED_MODULE_0__MemoryRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Prompt__ = __webpack_require__(/*! ./Prompt */ 55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return __WEBPACK_IMPORTED_MODULE_1__Prompt__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Redirect__ = __webpack_require__(/*! ./Redirect */ 56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return __WEBPACK_IMPORTED_MODULE_2__Redirect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Route__ = __webpack_require__(/*! ./Route */ 18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return __WEBPACK_IMPORTED_MODULE_3__Route__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Router__ = __webpack_require__(/*! ./Router */ 10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return __WEBPACK_IMPORTED_MODULE_4__Router__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__StaticRouter__ = __webpack_require__(/*! ./StaticRouter */ 57);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return __WEBPACK_IMPORTED_MODULE_5__StaticRouter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Switch__ = __webpack_require__(/*! ./Switch */ 58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return __WEBPACK_IMPORTED_MODULE_6__Switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__matchPath__ = __webpack_require__(/*! ./matchPath */ 11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return __WEBPACK_IMPORTED_MODULE_7__matchPath__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__withRouter__ = __webpack_require__(/*! ./withRouter */ 59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return __WEBPACK_IMPORTED_MODULE_8__withRouter__["a"]; });



















/***/ }),
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./server/config/config.json ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = {
	"application": {
		"version": {
			"css": "",
			"js": ""
		},
		"debugName": "test"
	},
	"serverName": "isomophic-react-redux-starter"
};

/***/ }),
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./common/models/TodoModel.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _desc, _value, _class, _descriptor, _descriptor2;

var _mobx = __webpack_require__(/*! mobx */ 2);

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

let TodoModel = (_class = class TodoModel {

    constructor(data) {
        _initDefineProp(this, 'title', _descriptor, this);

        _initDefineProp(this, 'finished', _descriptor2, this);

        (0, _mobx.runInAction)('initialize TodoModel', () => {
            (0, _mobx.extendObservable)(this, data);
        });
    }

    setFinished(finished) {
        this.finished = finished;
    }

    static fromJS(object) {
        return new TodoModel(object);
    }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'title', [_mobx.observable], {
    enumerable: true,
    initializer: function () {
        return '';
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'finished', [_mobx.observable], {
    enumerable: true,
    initializer: function () {
        return false;
    }
}), _applyDecoratedDescriptor(_class.prototype, 'setFinished', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setFinished'), _class.prototype)), _class);
exports.default = TodoModel;

/***/ }),
/* 9 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./~/history/PathUtils.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var stripPrefix = exports.stripPrefix = function stripPrefix(path, prefix) {
  return path.indexOf(prefix) === 0 ? path.substr(prefix.length) : path;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  pathname = decodeURI(pathname);
  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return encodeURI(path);
};

/***/ }),
/* 10 */
/* exports provided: default */
/* exports used: default */
/*!*************************************!*\
  !*** ./~/react-router/es/Router.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(/*! warning */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(/*! invariant */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * The public API for putting history on context.
 */

var Router = function (_React$Component) {
  _inherits(Router, _React$Component);

  function Router() {
    var _temp, _this, _ret;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props.history.location.pathname)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Router.prototype.getChildContext = function getChildContext() {
    return {
      router: _extends({}, this.context.router, {
        history: this.props.history,
        route: {
          location: this.props.history.location,
          match: this.state.match
        }
      })
    };
  };

  Router.prototype.computeMatch = function computeMatch(pathname) {
    return {
      path: '/',
      url: '/',
      params: {},
      isExact: pathname === '/'
    };
  };

  Router.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        children = _props.children,
        history = _props.history;


    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(children == null || __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.count(children) === 1, 'A <Router> may have only one child element');

    // Do this here so we can setState when a <Redirect> changes the
    // location in componentWillMount. This happens e.g. when doing
    // server rendering using a <StaticRouter>.
    this.unlisten = history.listen(function () {
      _this2.setState({
        match: _this2.computeMatch(history.location.pathname)
      });
    });
  };

  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(this.props.history === nextProps.history, 'You cannot change <Router history>');
  };

  Router.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  Router.prototype.render = function render() {
    var children = this.props.children;

    return children ? __WEBPACK_IMPORTED_MODULE_2_react___default.a.Children.only(children) : null;
  };

  return Router;
}(__WEBPACK_IMPORTED_MODULE_2_react___default.a.Component);

Router.propTypes = {
  history: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].object.isRequired,
  children: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].node
};
Router.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].object
};
Router.childContextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = Router;

/***/ }),
/* 11 */
/* exports provided: default */
/* exports used: default */
/*!****************************************!*\
  !*** ./~/react-router/es/matchPath.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp__ = __webpack_require__(/*! path-to-regexp */ 61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path_to_regexp__);


var patternCache = {};
var cacheLimit = 10000;
var cacheCount = 0;

var compilePath = function compilePath(pattern, options) {
  var cacheKey = '' + options.end + options.strict;
  var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  var keys = [];
  var re = __WEBPACK_IMPORTED_MODULE_0_path_to_regexp___default()(pattern, keys, options);
  var compiledPattern = { re: re, keys: keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
var matchPath = function matchPath(pathname) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof options === 'string') options = { path: options };

  var _options = options,
      _options$path = _options.path,
      path = _options$path === undefined ? '/' : _options$path,
      _options$exact = _options.exact,
      exact = _options$exact === undefined ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === undefined ? false : _options$strict;

  var _compilePath = compilePath(path, { end: exact, strict: strict }),
      re = _compilePath.re,
      keys = _compilePath.keys;

  var match = re.exec(pathname);

  if (!match) return null;

  var url = match[0],
      values = match.slice(1);

  var isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path: path, // the path pattern used to match
    url: path === '/' && url === '' ? '/' : url, // the matched portion of the URL
    isExact: isExact, // whether or not we matched exactly
    params: keys.reduce(function (memo, key, index) {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};

/* harmony default export */ __webpack_exports__["a"] = matchPath;

/***/ }),
/* 12 */
/* unknown exports provided */
/* all exports used */
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 13 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./server/middlewares/renderReactMiddleware.jsx ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDefaultJSVersion = getDefaultJSVersion;
exports.default = reactRender;

var _ejs = __webpack_require__(/*! ejs */ 19);

var _ejs2 = _interopRequireDefault(_ejs);

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(/*! react-dom/server */ 21);

var _mobxReact = __webpack_require__(/*! mobx-react */ 1);

var _secureFilters = __webpack_require__(/*! secure-filters */ 22);

var _fs = __webpack_require__(/*! fs */ 12);

var _fs2 = _interopRequireDefault(_fs);

var _App = __webpack_require__(/*! ../../common/App.jsx */ 14);

var _App2 = _interopRequireDefault(_App);

var _config = __webpack_require__(/*! ../config/config.json */ 6);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mobxReact.useStaticRendering)(true);

const defaultTemplate = _fs2.default.readFileSync(__dirname + '/../views/index.html', 'utf8');

function getDefaultJSVersion(name) {
    let webpackAssets = _fs2.default.readFileSync(__dirname + '/../../webpack-assets.json', 'utf8');

    try {
        webpackAssets = JSON.parse(webpackAssets);
    } catch (ex) {
        console.log('webpack-assets.json parsed error');
        webpackAssets = {};
    }
    return webpackAssets[name];
}

function reactRender(middlewareConfig = {}) {
    return function (req, res, next) {
        res.renderReactHTML = function (opts = {}) {
            let {
                template = '',
                component = '',
                store = {},
                locals = {},
                pageConfig = {},
                needTransform = true
            } = opts;
            let html = '';
            pageConfig = Object.assign(typeof middlewareConfig.appConfig === 'object' ? middlewareConfig.appConfig : {}, pageConfig);

            try {
                html = (0, _server.renderToString)(_react2.default.createElement(
                    _mobxReact.Provider,
                    { store: store },
                    _react2.default.createElement(
                        _App2.default,
                        { appconfig: pageConfig },
                        component
                    )
                ));
            } catch (ex) {
                html = 'internal server error: \n' + ex.message;
                console.error(ex.stack);
            }

            let debug = req.query.debug && req.query.debug === _config2.default.application.debugName;
            let version = _config2.default.application.version;
            let jsVersion = '';
            // prefer config version, useful when using CDN config
            if (true) {
                jsVersion = version && version.js;
            } else {
                jsVersion = getDefaultJSVersion(locals.appName || 'index');
            }
            template = template || middlewareConfig.defaultTemplate || defaultTemplate;

            let finalLocals = Object.assign({
                html,
                state: (0, _secureFilters.jsObj)(store),
                appName: 'index',
                title: '',
                test: "production" !== 'production',
                debug,
                appConfig: (0, _secureFilters.jsObj)(pageConfig),
                version: {
                    js: jsVersion,
                    css: version && version.css
                }
            }, res.locals, locals);

            let pageStr = _ejs2.default.render(template, finalLocals, {
                compileDebug: false
            });

            res.status(200).send(pageStr);
        };

        next();
    };
}
/* WEBPACK VAR INJECTION */}.call(exports, "server\\middlewares"))

/***/ }),
/* 14 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** ./common/App.jsx ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _events = __webpack_require__(/*! events */ 20);

var _events2 = _interopRequireDefault(_events);

var _mobx = __webpack_require__(/*! mobx */ 2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mobx.useStrict)(true);

if (false) {
    var DevTools = require('mobx-react-devtools').default;
}

let mediator = new _events2.default();

let App = class App extends _react.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            devTools: null
        };
    }

    getChildContext() {
        return {
            $eventBus: mediator,
            $appConfig: this.props.appConfig
        };
    }

    componentDidMount() {
        if (DevTools) {
            this.setState({
                devTools: _react2.default.createElement(DevTools, { position: { left: 0, bottom: 0 } })
            });
        }
    }

    componentDidUpdate() {}

    componentWillUnmount() {}

    render() {
        return _react2.default.createElement(
            'div',
            null,
            this.props.children,
            this.state.devTools
        );
    }
};

App.defaultProps = {
    appConfig: null
};
App.propTypes = {
    appConfig: _react.PropTypes.object
};
App.childContextTypes = {
    $eventBus: _react.PropTypes.instanceOf(_events2.default),
    $appConfig: _react.PropTypes.object
};

exports.default = App;

/***/ }),
/* 15 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./common/stores/TimerStore.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(/*! mobx */ 2);

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

let TimerStore = (_class = class TimerStore {

    constructor() {
        _initDefineProp(this, 'timer', _descriptor, this);
    }

    startTimer() {
        setInterval((0, _mobx.action)('startTimer', () => {
            this.timer += 1;
        }), 1000);
    }

    resetTimer() {
        this.timer = 0;
    }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'timer', [_mobx.observable], {
    enumerable: true,
    initializer: function () {
        return 0;
    }
}), _applyDecoratedDescriptor(_class.prototype, 'startTimer', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'startTimer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resetTimer', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'resetTimer'), _class.prototype)), _class);
exports.default = TimerStore;

/***/ }),
/* 16 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./common/stores/TodoStore.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(/*! mobx */ 2);

var _TodoModel = __webpack_require__(/*! ../models/TodoModel */ 8);

var _TodoModel2 = _interopRequireDefault(_TodoModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

let TodoStore = (_class = class TodoStore {
    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }

    constructor(state = {}) {
        _initDefineProp(this, 'todos', _descriptor, this);

        // required in strict mode to be allowed to update state:
        (0, _mobx.runInAction)('initialize TodoStore', () => {
            (0, _mobx.extendObservable)(this, state);
        });
    }

    addTodo(todo) {
        todo && this.todos.push(todo);
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }

    static fromJS(state) {
        if (state && state.todos) {
            let todoStore = new TodoStore({
                todos: state.todos.map(item => _TodoModel2.default.fromJS(item))
            });
            return todoStore;
        }
    }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'todos', [_mobx.observable], {
    enumerable: true,
    initializer: function () {
        return (0, _mobx.asFlat)([]);
    }
}), _applyDecoratedDescriptor(_class.prototype, 'unfinishedTodoCount', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'unfinishedTodoCount'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addTodo', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'addTodo'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeTodo', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'removeTodo'), _class.prototype)), _class);
exports.default = TodoStore;

/***/ }),
/* 17 */
/* unknown exports provided */
/* exports used: default */
/*!**********************************!*\
  !*** ./~/invariant/invariant.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "production";

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),
/* 18 */
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./~/react-router/es/Route.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning__ = __webpack_require__(/*! warning */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matchPath__ = __webpack_require__(/*! ./matchPath */ 11);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * The public API for matching a single path and rendering.
 */

var Route = function (_React$Component) {
  _inherits(Route, _React$Component);

  function Route() {
    var _temp, _this, _ret;

    _classCallCheck(this, Route);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      match: _this.computeMatch(_this.props, _this.context.router)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Route.prototype.getChildContext = function getChildContext() {
    var router = this.context.router;

    return {
      router: _extends({}, this.context.router, {
        route: {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        }
      })
    };
  };

  Route.prototype.computeMatch = function computeMatch(_ref, _ref2) {
    var computedMatch = _ref.computedMatch,
        location = _ref.location,
        path = _ref.path,
        strict = _ref.strict,
        exact = _ref.exact;
    var route = _ref2.route;

    if (computedMatch) return computedMatch; // <Switch> already computed the match for us

    var pathname = (location || route.location).pathname;

    return path ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__matchPath__["a" /* default */])(pathname, { path: path, strict: strict, exact: exact }) : route.match;
  };

  Route.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        component = _props.component,
        render = _props.render,
        children = _props.children;


    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(component && render), 'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored');

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(component && children), 'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored');

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(render && children), 'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored');
  };

  Route.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    __WEBPACK_IMPORTED_MODULE_0_warning___default()(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');

    this.setState({
      match: this.computeMatch(nextProps, nextContext.router)
    });
  };

  Route.prototype.render = function render() {
    var match = this.state.match;
    var _props2 = this.props,
        children = _props2.children,
        component = _props2.component,
        render = _props2.render;
    var _context$router = this.context.router,
        history = _context$router.history,
        route = _context$router.route,
        staticContext = _context$router.staticContext;

    var location = this.props.location || route.location;
    var props = { match: match, location: location, history: history, staticContext: staticContext };

    return component ? // component prop gets first priority, only called if there's a match
    match ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(component, props) : null : render ? // render prop is next, only called if there's a match
    match ? render(props) : null : children ? // children come last, always called
    typeof children === 'function' ? children(props) : !Array.isArray(children) || children.length ? // Preact defaults to empty children array
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.Children.only(children) : null : null;
  };

  return Route;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

Route.propTypes = {
  computedMatch: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].object, // private, from <Switch>
  path: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].string,
  exact: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].bool,
  strict: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].bool,
  component: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].func,
  render: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].func,
  children: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].oneOfType([__WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].func, __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].node]),
  location: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].object
};
Route.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].shape({
    history: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].object.isRequired,
    route: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].object.isRequired,
    staticContext: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].object
  })
};
Route.childContextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = Route;

/***/ }),
/* 19 */
/* unknown exports provided */
/* all exports used */
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 20 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 21 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 22 */
/* unknown exports provided */
/* all exports used */
/*!*********************************!*\
  !*** external "secure-filters" ***!
  \*********************************/
/***/ (function(module, exports) {

module.exports = require("secure-filters");

/***/ }),
/* 23 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** ./server/apis/index.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = __webpack_require__(/*! express */ 7);

let router = new _express.Router();

router.post('/ajax', function (req, res, next) {
    if (error) {
        next();
    } else {
        res.send('test');
    }
});

exports.default = router;

/***/ }),
/* 24 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./server/middlewares/allowCrossDomain.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = allowCrossDomain;
function allowCrossDomain(req, res, next) {
    let allowedOrigins = ['http://www.test.com'];
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    next();
}

/***/ }),
/* 25 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./server/middlewares/spaRenderMatch.jsx ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = renderMatch;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(/*! react-dom/server */ 21);

var _reactRouter = __webpack_require__(/*! react-router */ 5);

var _mobxReact = __webpack_require__(/*! mobx-react */ 1);

var _routes = __webpack_require__(/*! ../../common/routes */ 43);

var _routes2 = _interopRequireDefault(_routes);

var _spaStores = __webpack_require__(/*! ../../common/stores/spaStores.js */ 46);

var _spaStores2 = _interopRequireDefault(_spaStores);

var _preRender = __webpack_require__(/*! ../utils/preRender */ 50);

var _preRender2 = _interopRequireDefault(_preRender);

var _ejs = __webpack_require__(/*! ejs */ 19);

var _ejs2 = _interopRequireDefault(_ejs);

var _config = __webpack_require__(/*! ../config/config.json */ 6);

var _config2 = _interopRequireDefault(_config);

var _renderReactMiddleware = __webpack_require__(/*! ./renderReactMiddleware */ 13);

var _App = __webpack_require__(/*! ../../common/App.jsx */ 14);

var _App2 = _interopRequireDefault(_App);

var _secureFilters = __webpack_require__(/*! secure-filters */ 22);

var _fs = __webpack_require__(/*! fs */ 12);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const defaultTemplate = _fs2.default.readFileSync(__dirname + '/../views/index.html', 'utf8');

(0, _mobxReact.useStaticRendering)(true);

function renderMatch(req, res) {
    const history = (0, _reactRouter.createMemoryHistory)();
    const stores = (0, _spaStores2.default)({
        commonStore: {
            user: {
                name: 'test'
            }
        }
    });
    let appConfig = {
        time: Date.now()
    };
    const routes = (0, _routes2.default)(stores, appConfig);

    (0, _reactRouter.match)({ routes, location: req.originalUrl }, (() => {
        var _ref = _asyncToGenerator(function* (err, redirect, props) {
            if (err) {
                res.status(500).json(err);
            } else if (redirect) {
                res.redirect(302, redirect.pathname + redirect.search);
            } else if (props) {
                let debug = req.query.debug && req.query.debug === _config2.default.application.debugName;
                let version = _config2.default.application.version;
                let jsVersion = '';
                // prefer config version, useful when using CDN config
                if (true) {
                    jsVersion = version && version.js;
                } else {
                    jsVersion = (0, _renderReactMiddleware.getDefaultJSVersion)('app');
                }
                let componentHTML = '';
                let errorMsg = '';

                try {
                    yield (0, _preRender2.default)(stores, props, appConfig, req);

                    componentHTML = (0, _server.renderToString)(_react2.default.createElement(
                        _mobxReact.Provider,
                        stores,
                        _react2.default.createElement(
                            _App2.default,
                            { appConfig: appConfig },
                            _react2.default.createElement(_reactRouter.RouterContext, props)
                        )
                    ));
                } catch (ex) {
                    errorMsg = ex.stack;
                    console.log(ex.stack);
                }

                let pageStr = _ejs2.default.render(defaultTemplate, Object.assign({
                    errorMsg,
                    html: componentHTML,
                    state: (0, _secureFilters.jsObj)(stores),
                    appName: 'app',
                    title: '',
                    test: "production" !== 'production',
                    debug: debug,
                    appConfig: (0, _secureFilters.jsObj)(appConfig),
                    version: {
                        js: jsVersion,
                        css: version && version.css
                    }
                }, {}), {
                    compileDebug: false
                });

                res.status(200).send(pageStr);
            } else {
                res.redirect('/');
            }
        });

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    })());
}
/* WEBPACK VAR INJECTION */}.call(exports, "server\\middlewares"))

/***/ }),
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./server/routes/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(/*! express */ 7);

var _fs = __webpack_require__(/*! fs */ 12);

var _fs2 = _interopRequireDefault(_fs);

var _Timer = __webpack_require__(/*! ../controllers/Timer */ 48);

var _Timer2 = _interopRequireDefault(_Timer);

var _Todo = __webpack_require__(/*! ../controllers/Todo */ 49);

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let router = new _express.Router();

/**
 * 首页请求
 */
router.get('/', _Timer2.default);
router.get('/todo', _Todo2.default);

/**
 * 静态资源
 */
let content = _fs2.default.readFileSync(__dirname + '/../../client/js/utils/sw.js', 'utf8');

router.get('/sw.js', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    res.set('Content-Type', 'application/javascript');
    res.send(content);
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

exports.default = router;
/* WEBPACK VAR INJECTION */}.call(exports, "server\\routes"))

/***/ }),
/* 27 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 28 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 29 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 30 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** external "csurf" ***!
  \************************/
/***/ (function(module, exports) {

module.exports = require("csurf");

/***/ }),
/* 31 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 32 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 33 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 34 */
/* unknown exports provided */
/* all exports used */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 35 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./common/components/todo/Todo.jsx ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(/*! mobx-react */ 1);

var _Base = __webpack_require__(/*! ../../pages/Base */ 3);

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Todo = (0, _mobxReact.observer)(_class = class Todo extends _Base2.default {
    constructor(props, context) {
        super(props, context);

        // this.onChange = this.onChange.bind(this);
        // this.removeTodo = this.removeTodo.bind(this);
    }

    onChange() {
        let { todo } = this.props;

        todo.setFinished(!todo.finished);
    }

    onRemoveTodo(e) {
        this.props.removeTodo(e, this.props.index);
    }

    render() {
        let { todo, index } = this.props;

        return _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement('input', {
                type: 'checkbox',
                checked: todo.finished,
                onChange: this.onChange
            }),
            todo.title,
            _react2.default.createElement(
                'button',
                { onClick: this.props.addTodo },
                'add'
            ),
            _react2.default.createElement(
                'button',
                { onClick: this.onRemoveTodo },
                'remove'
            )
        );
    }
}) || _class;

exports.default = Todo;

/***/ }),
/* 36 */
/* unknown exports provided */
/* all exports used */
/*!*********************************************!*\
  !*** ./common/components/todo/TodoList.jsx ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _class;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(/*! mobx-react */ 1);

var _Base = __webpack_require__(/*! ../../pages/Base */ 3);

var _Base2 = _interopRequireDefault(_Base);

var _Todo = __webpack_require__(/*! ./Todo */ 35);

var _Todo2 = _interopRequireDefault(_Todo);

var _TodoModel = __webpack_require__(/*! ../../models/TodoModel.js */ 8);

var _TodoModel2 = _interopRequireDefault(_TodoModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let TodoList = (0, _mobxReact.observer)(_class = class TodoList extends _Base2.default {
    constructor(props, context) {
        super(props, context);

        // this.addTodo = this.addTodo.bind(this);
        // this.removeTodo = this.removeTodo.bind(this);
    }

    onAddTodo(e) {
        e.preventDefault();

        let { todoList } = this.props;

        todoList.addTodo(new _TodoModel2.default({
            id: todoList.todos.length,
            title: 'some text' + todoList.todos.length
        }));
    }

    onRemoveTodo(e, index) {
        e.preventDefault();

        let { todoList } = this.props;

        todoList.removeTodo(index);
    }

    render() {
        let { todoList } = this.props;

        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'ul',
                null,
                todoList.todos.map((todo, index) => {
                    return _react2.default.createElement(_Todo2.default, { todo: todo,
                        index: index,
                        key: todo.id,
                        addTodo: this.onAddTodo,
                        removeTodo: this.onRemoveTodo });
                })
            ),
            'Tasks left: ',
            todoList.unfinishedTodoCount
        );
    }
}) || _class;

exports.default = TodoList;

/***/ }),
/* 37 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************!*\
  !*** ./common/fetchList/serverFetch.js ***!
  \*****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    getVote(opts, req) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: {
                        message: 123
                    }
                });
            }, 500);
        });
    }
};

/***/ }),
/* 38 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./common/pages/App/About.jsx ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class, _class2, _temp;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(/*! react-router */ 5);

var _mobxReact = __webpack_require__(/*! mobx-react */ 1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let About = (_dec = (0, _mobxReact.inject)(['commonStore']), _dec(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 = class About extends _react.Component {

    render() {
        return _react2.default.createElement(
            'div',
            { className: 'about' },
            'this is about page',
            _react2.default.createElement(
                _reactRouter.Link,
                { to: '/vote?debug=test' },
                'vote'
            ),
            _react2.default.createElement('br', null),
            'userName: ',
            this.props.commonStore.user.name
        );
    }
}, _class2.pageConfig = {
    pageId: 'About'
}, _temp)) || _class) || _class);
exports.default = About;

/***/ }),
/* 39 */
/* unknown exports provided */
/* all exports used */
/*!**********************************!*\
  !*** ./common/pages/App/App.jsx ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let App = ({ children }) => {
    return _react2.default.Children.only(children);
};

App.propTypes = {
    children: _react.PropTypes.object
};

exports.default = App;

/***/ }),
/* 40 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./common/pages/App/Vote.jsx ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _dec2, _class, _class2, _temp;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(/*! mobx-react */ 1);

var _reactRouter = __webpack_require__(/*! react-router */ 5);

var _connectDataFetchers = __webpack_require__(/*! ../../utils/connectDataFetchers */ 47);

var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Vote = (_dec = (0, _connectDataFetchers2.default)(['VoteStore']), _dec2 = (0, _mobxReact.inject)(['VoteStore']), _dec(_class = _dec2(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 = class Vote extends _react.Component {

    componentDidMount() {
        console.log('vote did mount');
    }

    render() {
        return _react2.default.createElement(
            'div',
            { className: 'vote' },
            'this is vote',
            _react2.default.createElement(
                _reactRouter.Link,
                { to: '/about?debug=test' },
                'about'
            ),
            _react2.default.createElement(
                _reactRouter.Link,
                { to: '/test' },
                'test'
            ),
            'message: ',
            this.props.VoteStore.message
        );
    }
}, _class2.pageConfig = {
    pageId: 'Vote'
}, _temp)) || _class) || _class) || _class);
exports.default = Vote;

/***/ }),
/* 41 */
/* unknown exports provided */
/* all exports used */
/*!******************************************!*\
  !*** ./common/pages/timer/TimerPage.jsx ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(/*! mobx-react */ 1);

var _Base = __webpack_require__(/*! ../Base */ 3);

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let TimerPage = (_dec = (0, _mobxReact.inject)(['store']), _dec(_class = (0, _mobxReact.observer)(_class = class TimerPage extends _Base2.default {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.props.store.startTimer();
    }

    render() {
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'button',
                { onClick: this.onReset },
                'Seconds passed: ',
                this.props.store.timer
            )
        );
    }

    onReset() {
        this.props.store.resetTimer();
    }
}) || _class) || _class);
exports.default = TimerPage;

/***/ }),
/* 42 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./common/pages/todo/TodoPage.jsx ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dec, _class;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(/*! mobx-react */ 1);

var _Base = __webpack_require__(/*! ../Base */ 3);

var _Base2 = _interopRequireDefault(_Base);

var _TodoList = __webpack_require__(/*! ../../components/todo/TodoList */ 36);

var _TodoList2 = _interopRequireDefault(_TodoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let TodoPage = (_dec = (0, _mobxReact.inject)(['store']), _dec(_class = (0, _mobxReact.observer)(_class = class TodoPage extends _Base2.default {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return _react2.default.createElement(_TodoList2.default, { todoList: this.props.store });
    }
}) || _class) || _class);
exports.default = TodoPage;

/***/ }),
/* 43 */
/* unknown exports provided */
/* all exports used */
/*!**************************!*\
  !*** ./common/routes.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (stores) {
    return _react2.default.createElement(
        _reactRouter.Route,
        { path: '/', component: _App2.default, onChange: onChange },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _Vote2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: 'vote', component: _Vote2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _About2.default })
    );
};

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(/*! react-router */ 5);

var _App = __webpack_require__(/*! ./pages/App/App */ 39);

var _App2 = _interopRequireDefault(_App);

var _Vote = __webpack_require__(/*! ./pages/App/Vote.jsx */ 40);

var _Vote2 = _interopRequireDefault(_Vote);

var _About = __webpack_require__(/*! ./pages/App/About */ 38);

var _About2 = _interopRequireDefault(_About);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require.ensure polyfill for node
if (false) {
    require.ensure = function requireModule(deps, callback) {
        callback(require);
    };
}

function onChange(prevState, nextState, replace, cb) {
    let lastRoute = nextState.routes[nextState.routes.length - 1];

    if (lastRoute.component) {
        let component = lastRoute.component;
        let location = nextState.location;
        let pageComponent = component.OriginalPage ? component.OriginalPage : component;

        Object.assign(window.__APP_CONFIG__, {
            pageId: location.query.pageId || pageComponent.pageConfig && pageComponent.pageConfig.pageId
        });
    }

    cb();
}

;

/***/ }),
/* 44 */
/* unknown exports provided */
/* all exports used */
/*!**************************************!*\
  !*** ./common/stores/CommonStore.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mobx = __webpack_require__(/*! mobx */ 2);

let CommonStore = class CommonStore {
    constructor(state = {}) {
        (0, _mobx.runInAction)('CommonStore init', () => {
            (0, _mobx.extendObservable)(this, state);
        });
    }
};
exports.default = CommonStore;

/***/ }),
/* 45 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./common/stores/VoteStore.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(/*! mobx */ 2);

var _fetchList = __webpack_require__(/*! ../fetchList */ 37);

var _fetchList2 = _interopRequireDefault(_fetchList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

let VoteStore = (_class = class VoteStore {

    constructor(state = {}) {
        _initDefineProp(this, 'message', _descriptor, this);

        (0, _mobx.runInAction)('initialize VoteStore', () => {
            (0, _mobx.extendObservable)(this, state);
        });
    }

    loadData(opts, req) {
        console.log('loadData...');

        return _fetchList2.default.getVote(opts, req).then((0, _mobx.action)('update state after fetching data', resp => {
            this.message = resp.data.message;
        }));
    }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'message', [_mobx.observable], {
    enumerable: true,
    initializer: function () {
        return '';
    }
}), _applyDecoratedDescriptor(_class.prototype, 'loadData', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'loadData'), _class.prototype)), _class);
exports.default = VoteStore;

/***/ }),
/* 46 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./common/stores/spaStores.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureStore;

var _CommonStore = __webpack_require__(/*! ./CommonStore */ 44);

var _CommonStore2 = _interopRequireDefault(_CommonStore);

var _TimerStore = __webpack_require__(/*! ./TimerStore */ 15);

var _TimerStore2 = _interopRequireDefault(_TimerStore);

var _TodoStore = __webpack_require__(/*! ./TodoStore */ 16);

var _TodoStore2 = _interopRequireDefault(_TodoStore);

var _VoteStore = __webpack_require__(/*! ./VoteStore */ 45);

var _VoteStore2 = _interopRequireDefault(_VoteStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initStore(Store, state) {
    return Store.fromJS ? Store.fromJS(state) : new Store(state);
}

function configureStore(state = {}) {
    return {
        commonStore: initStore(_CommonStore2.default, state.commonStore),
        timerStore: initStore(_TimerStore2.default, state.timerStore),
        todoStore: initStore(_TodoStore2.default, state.todoStore),
        VoteStore: initStore(_VoteStore2.default, state.VoteStore)
    };
}

/***/ }),
/* 47 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./common/utils/connectDataFetchers.jsx ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = connectDataFetchers;

var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(/*! mobx-react */ 1);

var _Base = __webpack_require__(/*! ../pages/Base */ 3);

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IS_FIRST_MOUNT_AFTER_LOAD = true;
// import { action } from 'mobx';

if (process.browser) {
    var FIRST_PAGE_ID = window.__APP_CONFIG__.pageId;
}

function connectDataFetchers(storeKeys = [], cache) {
    return function (Page) {
        var _class, _temp;

        if (process.browser) {
            if (!Page.pageConfig) {
                console.error(`Page Component static propery pageConfig.pageId required!`);
            } else {
                IS_FIRST_MOUNT_AFTER_LOAD = Page.pageConfig.pageId === FIRST_PAGE_ID;
            }
        }

        let DataFetchersWrapper = (_temp = _class = class DataFetchersWrapper extends _Base2.default {

            static fetchData({
                stores,
                location,
                params,
                appConfig,
                pageConfig
            }, req) {
                return Promise.all(storeKeys.map(storeKey => {
                    let currentStore = stores[storeKey];

                    return currentStore && currentStore.loadData && currentStore.loadData({
                        location,
                        params,
                        appConfig,
                        pageConfig
                    });
                }, req));
            }

            shouldComponentUpdate(nextProps) {
                return this.props !== nextProps;
            }

            componentDidUpdate(prevProps) {
                const {
                    location
                } = this.props;
                const {
                    location: prevLocation
                } = prevProps;

                const isUrlChanged = location.pathname !== prevLocation.pathname || location.search.slice(1) !== prevLocation.search.slice(1);

                if (isUrlChanged) {
                    this._fetchDataOnClient();
                }
            }

            componentDidMount() {
                if (!cache) {
                    if (!IS_FIRST_MOUNT_AFTER_LOAD) {
                        this._fetchDataOnClient();
                    }

                    IS_FIRST_MOUNT_AFTER_LOAD = false;
                } else {
                    if (!IS_FIRST_MOUNT_AFTER_LOAD && !Page.DATA_LOADED) {
                        this._fetchDataOnClient();
                    }

                    Page.DATA_LOADED = true;
                    IS_FIRST_MOUNT_AFTER_LOAD = false;
                }
            }

            _fetchDataOnClient() {
                this.constructor.fetchData({
                    stores: this.context.mobxStores,
                    params: this.props.params,
                    location: this.props.location,
                    appConfig: this.context.$appConfig
                });
            }

            render() {
                return _react2.default.createElement(Page, this.props);
            }
        }, _class.propTypes = {
            params: _react.PropTypes.object,
            location: _react.PropTypes.shape({
                pathname: _react.PropTypes.string.required,
                search: _react.PropTypes.string,
                query: _react.PropTypes.string.object
            }).isRequired
        }, _class.contextTypes = {
            $appConfig: _react.PropTypes.object,
            mobxStores: _react.PropTypes.object
        }, _class.OriginalPage = Page, _temp);


        return DataFetchersWrapper;
    };
}

/***/ }),
/* 48 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./server/controllers/Timer.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _TimerPage = __webpack_require__(/*! ../../common/pages/timer/TimerPage.jsx */ 41);

var _TimerPage2 = _interopRequireDefault(_TimerPage);

var _TimerStore = __webpack_require__(/*! ../../common/stores/TimerStore */ 15);

var _TimerStore2 = _interopRequireDefault(_TimerStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res, next) {
    res.renderReactHTML({
        component: _react2.default.createElement(_TimerPage2.default, null),
        store: new _TimerStore2.default(),
        locals: {
            appName: 'timer',
            title: 'timer page'
        },
        pageConfig: {
            user: 'test'
        }
    });
};

/***/ }),
/* 49 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./server/controllers/Todo.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(/*! react */ 0);

var _react2 = _interopRequireDefault(_react);

var _TodoPage = __webpack_require__(/*! ../../common/pages/todo/TodoPage.jsx */ 42);

var _TodoPage2 = _interopRequireDefault(_TodoPage);

var _TodoStore = __webpack_require__(/*! ../../common/stores/TodoStore */ 16);

var _TodoStore2 = _interopRequireDefault(_TodoStore);

var _TodoModel = __webpack_require__(/*! ../../common/models/TodoModel */ 8);

var _TodoModel2 = _interopRequireDefault(_TodoModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (req, res, next) {
    let store = new _TodoStore2.default();

    store.addTodo(new _TodoModel2.default({
        id: 0,
        title: "Get Coffee"
    }));
    store.addTodo(new _TodoModel2.default({
        id: 1,
        title: "Write simpler code"
    }));

    store.todos[0].setFinished(true);

    res.renderReactHTML({
        component: _react2.default.createElement(_TodoPage2.default, null),
        store,
        locals: {
            appName: 'todo',
            title: 'todo page'
        },
        pageConfig: {
            user: 'test'
        }
    });
};

/***/ }),
/* 50 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** ./server/utils/preRender.js ***!
  \***********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function preRender(stores, { components, location, params }, appConfig = {}, req) {
    const promises = components.map(current => {
        if (!current) return null;

        const component = current.WrappedComponent ? current.WrappedComponent : current;
        const pageConfig = component.OriginalPage && component.OriginalPage.pageConfig;

        return component.fetchData ? component.fetchData({ stores, location, params, appConfig, pageConfig }, req) : null;
    });

    let lastComponent = components[components.length - 1].WrappedComponent ? components[components.length - 1].WrappedComponent : components[components.length - 1];
    appConfig.pageId = lastComponent && lastComponent.OriginalPage && lastComponent.OriginalPage.pageConfig && lastComponent.OriginalPage.pageConfig.pageId;

    return Promise.all(promises);
}

exports.default = preRender;

/***/ }),
/* 51 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./~/history/LocationUtils.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resolvePathname = __webpack_require__(/*! resolve-pathname */ 62);

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__(/*! value-equal */ 63);

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__(/*! ./PathUtils */ 9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};

/***/ }),
/* 52 */
/* unknown exports provided */
/* exports used: default */
/*!******************************************!*\
  !*** ./~/history/createMemoryHistory.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(/*! warning */ 4);

var _warning2 = _interopRequireDefault(_warning);

var _PathUtils = __webpack_require__(/*! ./PathUtils */ 9);

var _LocationUtils = __webpack_require__(/*! ./LocationUtils */ 51);

var _createTransitionManager = __webpack_require__(/*! ./createTransitionManager */ 53);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? (0, _LocationUtils.createLocation)(entry, undefined, createKey()) : (0, _LocationUtils.createLocation)(entry, undefined, entry.key || createKey());
  });

  // Public interface

  var createHref = _PathUtils.createPath;

  var push = function push(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createMemoryHistory;

/***/ }),
/* 53 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/history/createTransitionManager.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _warning = __webpack_require__(/*! warning */ 4);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;

/***/ }),
/* 54 */
/* exports provided: default */
/* exports used: default */
/*!*******************************************!*\
  !*** ./~/react-router/es/MemoryRouter.js ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_history_createMemoryHistory__ = __webpack_require__(/*! history/createMemoryHistory */ 52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_history_createMemoryHistory___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_history_createMemoryHistory__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Router__ = __webpack_require__(/*! ./Router */ 10);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * The public API for a <Router> that stores location in memory.
 */

var MemoryRouter = function (_React$Component) {
  _inherits(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, MemoryRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.history = __WEBPACK_IMPORTED_MODULE_1_history_createMemoryHistory___default()(_this.props), _temp), _possibleConstructorReturn(_this, _ret);
  }

  MemoryRouter.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Router__["a" /* default */], { history: this.history, children: this.props.children });
  };

  return MemoryRouter;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

MemoryRouter.propTypes = {
  initialEntries: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].array,
  initialIndex: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
  getUserConfirmation: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
  keyLength: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
  children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].node
};


/* harmony default export */ __webpack_exports__["a"] = MemoryRouter;

/***/ }),
/* 55 */
/* exports provided: default */
/* exports used: default */
/*!*************************************!*\
  !*** ./~/react-router/es/Prompt.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/**
 * The public API for prompting the user before navigating away
 * from a screen with a component.
 */

var Prompt = function (_React$Component) {
  _inherits(Prompt, _React$Component);

  function Prompt() {
    _classCallCheck(this, Prompt);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Prompt.prototype.enable = function enable(message) {
    if (this.unblock) this.unblock();

    this.unblock = this.context.router.history.block(message);
  };

  Prompt.prototype.disable = function disable() {
    if (this.unblock) {
      this.unblock();
      this.unblock = null;
    }
  };

  Prompt.prototype.componentWillMount = function componentWillMount() {
    if (this.props.when) this.enable(this.props.message);
  };

  Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.when) {
      if (!this.props.when || this.props.message !== nextProps.message) this.enable(nextProps.message);
    } else {
      this.disable();
    }
  };

  Prompt.prototype.componentWillUnmount = function componentWillUnmount() {
    this.disable();
  };

  Prompt.prototype.render = function render() {
    return null;
  };

  return Prompt;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Prompt.propTypes = {
  when: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
  message: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOfType([__WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func, __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string]).isRequired
};
Prompt.defaultProps = {
  when: true
};
Prompt.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
    history: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
      block: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
    }).isRequired
  }).isRequired
};


/* harmony default export */ __webpack_exports__["a"] = Prompt;

/***/ }),
/* 56 */
/* exports provided: default */
/* exports used: default */
/*!***************************************!*\
  !*** ./~/react-router/es/Redirect.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



/**
 * The public API for updating the location programatically
 * with a component.
 */

var Redirect = function (_React$Component) {
  _inherits(Redirect, _React$Component);

  function Redirect() {
    _classCallCheck(this, Redirect);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Redirect.prototype.isStatic = function isStatic() {
    return this.context.router && this.context.router.staticContext;
  };

  Redirect.prototype.componentWillMount = function componentWillMount() {
    if (this.isStatic()) this.perform();
  };

  Redirect.prototype.componentDidMount = function componentDidMount() {
    if (!this.isStatic()) this.perform();
  };

  Redirect.prototype.perform = function perform() {
    var history = this.context.router.history;
    var _props = this.props,
        push = _props.push,
        to = _props.to;


    if (push) {
      history.push(to);
    } else {
      history.replace(to);
    }
  };

  Redirect.prototype.render = function render() {
    return null;
  };

  return Redirect;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Redirect.propTypes = {
  push: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,
  from: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,
  to: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOfType([__WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string, __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object])
};
Redirect.defaultProps = {
  push: false
};
Redirect.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
    history: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
      push: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
      replace: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
    }).isRequired,
    staticContext: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object
  }).isRequired
};


/* harmony default export */ __webpack_exports__["a"] = Redirect;

/***/ }),
/* 57 */
/* exports provided: default */
/* exports used: default */
/*!*******************************************!*\
  !*** ./~/react-router/es/StaticRouter.js ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant__ = __webpack_require__(/*! invariant */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_PathUtils__ = __webpack_require__(/*! history/PathUtils */ 9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_history_PathUtils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_history_PathUtils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Router__ = __webpack_require__(/*! ./Router */ 10);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var normalizeLocation = function normalizeLocation(object) {
  var _object$pathname = object.pathname,
      pathname = _object$pathname === undefined ? '/' : _object$pathname,
      _object$search = object.search,
      search = _object$search === undefined ? '' : _object$search,
      _object$hash = object.hash,
      hash = _object$hash === undefined ? '' : _object$hash;


  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var addBasename = function addBasename(basename, location) {
  if (!basename) return location;

  return _extends({}, location, {
    pathname: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_history_PathUtils__["addLeadingSlash"])(basename) + location.pathname
  });
};

var stripBasename = function stripBasename(basename, location) {
  if (!basename) return location;

  var base = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_history_PathUtils__["addLeadingSlash"])(basename);

  if (location.pathname.indexOf(base) !== 0) return location;

  return _extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
};

var createLocation = function createLocation(location) {
  return typeof location === 'string' ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_history_PathUtils__["parsePath"])(location) : normalizeLocation(location);
};

var createURL = function createURL(location) {
  return typeof location === 'string' ? location : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_history_PathUtils__["createPath"])(location);
};

var staticHandler = function staticHandler(methodName) {
  return function () {
    __WEBPACK_IMPORTED_MODULE_0_invariant___default()(false, 'You cannot %s with <StaticRouter>', methodName);
  };
};

var noop = function noop() {};

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */

var StaticRouter = function (_React$Component) {
  _inherits(StaticRouter, _React$Component);

  function StaticRouter() {
    var _temp, _this, _ret;

    _classCallCheck(this, StaticRouter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.createHref = function (path) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_history_PathUtils__["addLeadingSlash"])(_this.props.basename + createURL(path));
    }, _this.handlePush = function (location) {
      var _this$props = _this.props,
          basename = _this$props.basename,
          context = _this$props.context;

      context.action = 'PUSH';
      context.location = addBasename(basename, createLocation(location));
      context.url = createURL(context.location);
    }, _this.handleReplace = function (location) {
      var _this$props2 = _this.props,
          basename = _this$props2.basename,
          context = _this$props2.context;

      context.action = 'REPLACE';
      context.location = addBasename(basename, createLocation(location));
      context.url = createURL(context.location);
    }, _this.handleListen = function () {
      return noop;
    }, _this.handleBlock = function () {
      return noop;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  StaticRouter.prototype.getChildContext = function getChildContext() {
    return {
      router: {
        staticContext: this.props.context
      }
    };
  };

  StaticRouter.prototype.render = function render() {
    var _props = this.props,
        basename = _props.basename,
        context = _props.context,
        location = _props.location,
        props = _objectWithoutProperties(_props, ['basename', 'context', 'location']);

    var history = {
      createHref: this.createHref,
      action: 'POP',
      location: stripBasename(basename, createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler('go'),
      goBack: staticHandler('goBack'),
      goForward: staticHandler('goForward'),
      listen: this.handleListen,
      block: this.handleBlock
    };

    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Router__["a" /* default */], _extends({}, props, { history: history }));
  };

  return StaticRouter;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

StaticRouter.propTypes = {
  basename: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].string,
  context: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].object.isRequired,
  location: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].oneOfType([__WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].string, __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].object])
};
StaticRouter.defaultProps = {
  basename: '',
  location: '/'
};
StaticRouter.childContextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_1_react__["PropTypes"].object.isRequired
};


/* harmony default export */ __webpack_exports__["a"] = StaticRouter;

/***/ }),
/* 58 */
/* exports provided: default */
/* exports used: default */
/*!*************************************!*\
  !*** ./~/react-router/es/Switch.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_warning__ = __webpack_require__(/*! warning */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_warning___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_warning__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matchPath__ = __webpack_require__(/*! ./matchPath */ 11);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * The public API for rendering the first <Route> that matches.
 */

var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch() {
    _classCallCheck(this, Switch);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    __WEBPACK_IMPORTED_MODULE_1_warning___default()(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');

    __WEBPACK_IMPORTED_MODULE_1_warning___default()(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
  };

  Switch.prototype.render = function render() {
    var route = this.context.router.route;
    var children = this.props.children;

    var location = this.props.location || route.location;

    var match = void 0,
        child = void 0;
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.forEach(children, function (element) {
      var _element$props = element.props,
          pathProp = _element$props.path,
          exact = _element$props.exact,
          strict = _element$props.strict,
          from = _element$props.from;

      var path = pathProp || from;

      if (match == null) {
        child = element;
        match = path ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__matchPath__["a" /* default */])(location.pathname, { path: path, exact: exact, strict: strict }) : route.match;
      }
    });

    return match ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(child, { location: location, computedMatch: match }) : null;
  };

  return Switch;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Switch.contextTypes = {
  router: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
    route: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired
  }).isRequired
};
Switch.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].node,
  location: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object
};


/* harmony default export */ __webpack_exports__["a"] = Switch;

/***/ }),
/* 59 */
/* exports provided: default */
/* exports used: default */
/*!*****************************************!*\
  !*** ./~/react-router/es/withRouter.js ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Route__ = __webpack_require__(/*! ./Route */ 18);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/**
 * A public higher-order component to access the imperative API
 */
var withRouter = function withRouter(Component) {
  var C = function C(props) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Route__["a" /* default */], { render: function render(routeComponentProps) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Component, _extends({}, props, routeComponentProps));
      } });
  };

  C.displayName = 'withRouter(' + (Component.displayName || Component.name) + ')';

  return C;
};

/* harmony default export */ __webpack_exports__["a"] = withRouter;

/***/ }),
/* 60 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/react-router/~/isarray/index.js ***!
  \*******************************************/
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 61 */
/* unknown exports provided */
/* exports used: default */
/*!**************************************************!*\
  !*** ./~/react-router/~/path-to-regexp/index.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(/*! isarray */ 60)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),
/* 62 */
/* unknown exports provided */
/* all exports used */
/*!*************************************!*\
  !*** ./~/resolve-pathname/index.js ***!
  \*************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsolute = function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
};

// About 1.5x faster than the two-arg version of Array#splice()
var spliceOne = function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }list.pop();
};

// This implementation is based heavily on node's url.parse
var resolvePathname = function resolvePathname(to) {
  var from = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
};

module.exports = resolvePathname;

/***/ }),
/* 63 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./~/value-equal/index.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var valueEqual = function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;

    return a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
};

exports.default = valueEqual;

/***/ }),
/* 64 */
/* unknown exports provided */
/* all exports used */
/*!***********************!*\
  !*** ./server/app.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _http = __webpack_require__(/*! http */ 33);

var _http2 = _interopRequireDefault(_http);

var _express = __webpack_require__(/*! express */ 7);

var _express2 = _interopRequireDefault(_express);

var _compression = __webpack_require__(/*! compression */ 28);

var _compression2 = _interopRequireDefault(_compression);

var _morgan = __webpack_require__(/*! morgan */ 34);

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = __webpack_require__(/*! cookie-parser */ 29);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = __webpack_require__(/*! body-parser */ 27);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = __webpack_require__(/*! express-session */ 31);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _csurf = __webpack_require__(/*! csurf */ 30);

var _csurf2 = _interopRequireDefault(_csurf);

var _config = __webpack_require__(/*! ./config/config.json */ 6);

var _config2 = _interopRequireDefault(_config);

var _index = __webpack_require__(/*! ./routes/index */ 26);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ./apis/index */ 23);

var _index4 = _interopRequireDefault(_index3);

var _allowCrossDomain = __webpack_require__(/*! ./middlewares/allowCrossDomain */ 24);

var _allowCrossDomain2 = _interopRequireDefault(_allowCrossDomain);

var _renderReactMiddleware = __webpack_require__(/*! ./middlewares/renderReactMiddleware */ 13);

var _renderReactMiddleware2 = _interopRequireDefault(_renderReactMiddleware);

var _helmet = __webpack_require__(/*! helmet */ 32);

var _helmet2 = _interopRequireDefault(_helmet);

var _spaRenderMatch = __webpack_require__(/*! ./middlewares/spaRenderMatch.jsx */ 25);

var _spaRenderMatch2 = _interopRequireDefault(_spaRenderMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let app = (0, _express2.default)();
// import socket from './sockets/socket';


app.set('host', __webpack_require__.i({"NODE_ENV":"production"}).IP || '127.0.0.1');
app.set('port', __webpack_require__.i({"NODE_ENV":"production"}).PORT || 3000);
app.disable('x-powered-by');

app.use(_helmet2.default.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", 'default.com'],
        styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
        scriptSrc: ["'self'", 'maxcdn.bootstrapcdn.com', "'unsafe-inline'"],
        imgSrc: ["'self'", 'img.com', 'data:'],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report'
    }
}));
app.use(_helmet2.default.frameguard());
app.use(_helmet2.default.noSniff());
app.use(_helmet2.default.xssFilter());
app.use(_helmet2.default.hsts());
app.use((0, _compression2.default)());
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({
    resave: true,
    secret: 'mySecretCookieSalt',
    key: 'myCookieSessionId',
    saveUninitialized: true,
    cookie: {
        httpOnly: true
    }
}));

// app.use(favicon(__dirname + '/../public/favicon.ico'));
app.use('/static', _express2.default.static(__dirname + '/../public', {
    maxAge: 86400000
}));

// if(process.env.NODE_ENV !== 'production'){
//     let webpack = require('webpack');
//     let config = require('../create-webpack.config')(true);
//     let webpackDevMiddleware = require('webpack-dev-middleware');
//     let webpackHotMiddleware = require('webpack-hot-middleware');
//     let compiler = webpack(config);
//     app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
//     app.use(webpackHotMiddleware(compiler));
// }

app.use(_allowCrossDomain2.default);

app.use((0, _csurf2.default)());
app.use(function (req, res, next) {
    res.locals.csrftoken = req.csrfToken();
    next();
});
app.use((0, _renderReactMiddleware2.default)());

app.use('/api', _index4.default);
app.use('/', _index2.default);
app.use('*', _spaRenderMatch2.default);

// error handlers
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.dir(err);
    res.status(err.status || 500);
    if (err.status === 500) {
        console.error(err.stack);
        res.json({ error: 'Internal Server Error' });
    } else if (err.status === 404) {
        res.render('error'); //render error page
    } else {
        res.json({ error: err.message });
    }
});

process.on('uncaughtException', err => {
    console.error(err.message + '\n' + err.stack);
});
process.on('unhandledRejection', (reason, p) => {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});
process.on('rejectionHandled', (reason, p) => {
    console.warn("rejectionHandled at: Promise ", p, " reason: ", reason);
});

let server = _http2.default.createServer(app);

/* Socket.io Communication */
// let io = require('socket.io').listen(server);
// io.sockets.on('connection', socket);

server.listen(app.get('port'), app.get('host'), function () {
    let { address, port } = server.address();
    console.log(`${_config2.default.serverName} server listening at http://%s:%s`, address, port);
});
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map