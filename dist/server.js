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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./server/app.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var _http = __webpack_require__(/*! http */ 23);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _express = __webpack_require__(/*! express */ 2);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(/*! compression */ 17);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _morgan = __webpack_require__(/*! morgan */ 25);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _cookieParser = __webpack_require__(/*! cookie-parser */ 18);
	
	var _cookieParser2 = _interopRequireDefault(_cookieParser);
	
	var _bodyParser = __webpack_require__(/*! body-parser */ 16);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _expressSession = __webpack_require__(/*! express-session */ 21);
	
	var _expressSession2 = _interopRequireDefault(_expressSession);
	
	var _csurf = __webpack_require__(/*! csurf */ 19);
	
	var _csurf2 = _interopRequireDefault(_csurf);
	
	var _config = __webpack_require__(/*! ./config/config.json */ 3);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(/*! ./routes/index */ 13);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(/*! ./apis/index */ 11);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _allowCrossDomain = __webpack_require__(/*! ./utils/allowCrossDomain */ 14);
	
	var _allowCrossDomain2 = _interopRequireDefault(_allowCrossDomain);
	
	var _renderReactMiddleware = __webpack_require__(/*! ./utils/renderReactMiddleware */ 15);
	
	var _renderReactMiddleware2 = _interopRequireDefault(_renderReactMiddleware);
	
	var _helmet = __webpack_require__(/*! helmet */ 22);
	
	var _helmet2 = _interopRequireDefault(_helmet);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import socket from './sockets/socket';
	// import spaRenderMatch from './utils/spaRenderMatch';
	
	let app = (0, _express2.default)();
	
	app.set('host', ({"NODE_ENV":"production"}).IP || '127.0.0.1');
	app.set('port', ({"NODE_ENV":"production"}).PORT || 3000);
	app.disable('x-powered-by');
	
	app.use(_helmet2.default.contentSecurityPolicy());
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
	// app.use('*', spaRenderMatch);
	
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
	    console.log(`${ _config2.default.serverName } server listening at http://%s:%s`, address, port);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ },
/* 1 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/*!***********************************!*\
  !*** ./server/config/config.json ***!
  \***********************************/
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 5 */
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 6 */
/*!*****************************!*\
  !*** external "mobx-react" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("mobx-react");

/***/ },
/* 7 */
/*!************************!*\
  !*** ./common/App.jsx ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _events = __webpack_require__(/*! events */ 4);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let mediator = new _events2.default();
	
	let App = class App extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    getChildContext() {
	        return {
	            $eventBus: mediator,
	            $appConfig: this.props.appConfig
	        };
	    }
	
	    componentDidMount() {}
	
	    componentDidUpdate() {}
	
	    componentWillUnmount() {}
	
	    render() {
	        return _react2.default.Children.only(this.props.children);
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

/***/ },
/* 8 */
/*!*******************************!*\
  !*** ./common/pages/Base.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _events = __webpack_require__(/*! events */ 4);
	
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

/***/ },
/* 9 */
/*!******************************************!*\
  !*** ./common/pages/index/IndexPage.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _dec, _class;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 6);
	
	var _Base = __webpack_require__(/*! ../Base */ 8);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import DevTools from 'mobx-react-devtools';
	
	let App = (_dec = (0, _mobxReact.observer)(['store']), _dec(_class = class App extends _Base2.default {
	    constructor(...args) {
	        var _temp;
	
	        return _temp = super(...args), this.onReset = () => {
	            this.props.store.resetTimer();
	        }, _temp;
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
	
	}) || _class);
	exports.default = App;

/***/ },
/* 10 */
/*!********************************!*\
  !*** ./common/stores/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _desc, _value, _class, _descriptor;
	
	var _mobx = __webpack_require__(/*! mobx */ 24);
	
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
	
	let IndexStore = (_class = class IndexStore {
	
	    constructor() {
	        _initDefineProp(this, 'timer', _descriptor, this);
	
	        setInterval(() => {
	            this.timer += 1;
	        }, 1000);
	    }
	
	    resetTimer() {
	        this.timer = 0;
	    }
	}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'timer', [_mobx.observable], {
	    enumerable: true,
	    initializer: function () {
	        return 0;
	    }
	})), _class);
	exports.default = IndexStore;

/***/ },
/* 11 */
/*!******************************!*\
  !*** ./server/apis/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _express = __webpack_require__(/*! express */ 2);
	
	let router = new _express.Router();
	
	router.post('/ajax', function (req, res, next) {
	    if (error) {
	        next();
	    } else {
	        res.send('test');
	    }
	});
	
	exports.default = router;

/***/ },
/* 12 */
/*!*************************************!*\
  !*** ./server/controllers/index.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _IndexPage = __webpack_require__(/*! ../../common/pages/index/IndexPage */ 9);
	
	var _IndexPage2 = _interopRequireDefault(_IndexPage);
	
	var _index = __webpack_require__(/*! ../../common/stores/index */ 10);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = function (req, res, next) {
	    res.renderReactHTML({
	        component: _react2.default.createElement(_IndexPage2.default, null),
	        store: new _index2.default(),
	        locals: {
	            appName: 'index',
	            title: 'index page'
	        },
	        pageConfig: {
	            user: 'test'
	        }
	    });
	};

/***/ },
/* 13 */
/*!********************************!*\
  !*** ./server/routes/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 2);
	
	var _fs = __webpack_require__(/*! fs */ 5);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _index = __webpack_require__(/*! ../controllers/index */ 12);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	let router = new _express.Router();
	
	/**
	 * 首页请求
	 */
	router.get('/', _index2.default);
	
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

/***/ },
/* 14 */
/*!******************************************!*\
  !*** ./server/utils/allowCrossDomain.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';
	
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

/***/ },
/* 15 */
/*!************************************************!*\
  !*** ./server/utils/renderReactMiddleware.jsx ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getDefaultJSVersion = getDefaultJSVersion;
	exports.safeJSON = safeJSON;
	exports.default = reactRender;
	
	var _ejs = __webpack_require__(/*! ejs */ 20);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 26);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 6);
	
	var _fs = __webpack_require__(/*! fs */ 5);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _App = __webpack_require__(/*! ../../common/App.jsx */ 7);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _config = __webpack_require__(/*! ../config/config.json */ 3);
	
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
	
	function safeJSON(obj) {
	    return JSON.stringify(obj).replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
	}
	
	function reactRender(middlewareConfig = {}) {
	    return function (req, res, next) {
	        res.renderReactHTML = function (opts = {}) {
	            let {
	                template = '',
	                component = '',
	                data = {},
	                store = {},
	                locals = {},
	                pageConfig = {},
	                needTransform = true
	            } = opts;
	            let transformedData = typeof middlewareConfig.transformer === 'function' && needTransform ? middlewareConfig.transformer(data) : data;
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
	            let state = data;
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
	                state: safeJSON(data),
	                appName: 'index',
	                title: '',
	                test: ("production") !== 'production',
	                debug,
	                appConfig: safeJSON(pageConfig),
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
	/* WEBPACK VAR INJECTION */}.call(exports, "server\\utils"))

/***/ },
/* 16 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 17 */
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 18 */
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 19 */
/*!************************!*\
  !*** external "csurf" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("csurf");

/***/ },
/* 20 */
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = require("ejs");

/***/ },
/* 21 */
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 22 */
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 23 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 24 */
/*!***********************!*\
  !*** external "mobx" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("mobx");

/***/ },
/* 25 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 26 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map