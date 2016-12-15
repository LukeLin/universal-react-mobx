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
	
	var _http = __webpack_require__(/*! http */ 44);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _express = __webpack_require__(/*! express */ 8);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(/*! compression */ 39);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _morgan = __webpack_require__(/*! morgan */ 45);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _cookieParser = __webpack_require__(/*! cookie-parser */ 40);
	
	var _cookieParser2 = _interopRequireDefault(_cookieParser);
	
	var _bodyParser = __webpack_require__(/*! body-parser */ 38);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _expressSession = __webpack_require__(/*! express-session */ 42);
	
	var _expressSession2 = _interopRequireDefault(_expressSession);
	
	var _csurf = __webpack_require__(/*! csurf */ 41);
	
	var _csurf2 = _interopRequireDefault(_csurf);
	
	var _config = __webpack_require__(/*! ./config/config.json */ 7);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(/*! ./routes/index */ 36);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(/*! ./apis/index */ 31);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _allowCrossDomain = __webpack_require__(/*! ./middlewares/allowCrossDomain */ 34);
	
	var _allowCrossDomain2 = _interopRequireDefault(_allowCrossDomain);
	
	var _renderReactMiddleware = __webpack_require__(/*! ./middlewares/renderReactMiddleware */ 14);
	
	var _renderReactMiddleware2 = _interopRequireDefault(_renderReactMiddleware);
	
	var _helmet = __webpack_require__(/*! helmet */ 43);
	
	var _helmet2 = _interopRequireDefault(_helmet);
	
	var _spaRenderMatch = __webpack_require__(/*! ./middlewares/spaRenderMatch.jsx */ 35);
	
	var _spaRenderMatch2 = _interopRequireDefault(_spaRenderMatch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let app = (0, _express2.default)();
	// import socket from './sockets/socket';
	
	
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
/*!*****************************!*\
  !*** external "mobx-react" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("mobx-react");

/***/ },
/* 3 */
/*!***********************!*\
  !*** external "mobx" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("mobx");

/***/ },
/* 4 */
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
	
	var _events = __webpack_require__(/*! events */ 16);
	
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
/* 5 */
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 6 */
/*!************************************!*\
  !*** ./common/models/TodoModel.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _desc, _value, _class, _descriptor, _descriptor2;
	
	var _mobx = __webpack_require__(/*! mobx */ 3);
	
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

/***/ },
/* 7 */
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
/* 8 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 9 */
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 10 */
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
	
	var _events = __webpack_require__(/*! events */ 16);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _mobx = __webpack_require__(/*! mobx */ 3);
	
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
	        if (this.state.devTools) {
	            return _react2.default.createElement(
	                'div',
	                null,
	                this.props.children,
	                this.state.devTools
	            );
	        } else {
	            return _react2.default.Children.only(this.props.children);
	        }
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
/* 11 */
/*!***********************************!*\
  !*** ./common/pages/App/Vote.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _dec, _dec2, _class, _class2, _temp;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 5);
	
	var _connectDataFetchers = __webpack_require__(/*! ../../utils/connectDataFetchers */ 30);
	
	var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let Vote = (_dec = (0, _connectDataFetchers2.default)(['VoteStore']), _dec2 = (0, _mobxReact.observer)(['VoteStore']), _dec(_class = _dec2(_class = (_temp = _class2 = class Vote extends _react.Component {
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
	}, _temp)) || _class) || _class);
	exports.default = Vote;

/***/ },
/* 12 */
/*!*************************************!*\
  !*** ./common/stores/TimerStore.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _desc, _value, _class, _descriptor;
	
	var _mobx = __webpack_require__(/*! mobx */ 3);
	
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

/***/ },
/* 13 */
/*!************************************!*\
  !*** ./common/stores/TodoStore.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _desc, _value, _class, _descriptor;
	
	var _mobx = __webpack_require__(/*! mobx */ 3);
	
	var _TodoModel = __webpack_require__(/*! ../models/TodoModel */ 6);
	
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
	        return [];
	    }
	}), _applyDecoratedDescriptor(_class.prototype, 'unfinishedTodoCount', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'unfinishedTodoCount'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addTodo', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'addTodo'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'removeTodo', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'removeTodo'), _class.prototype)), _class);
	exports.default = TodoStore;

/***/ },
/* 14 */
/*!******************************************************!*\
  !*** ./server/middlewares/renderReactMiddleware.jsx ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getDefaultJSVersion = getDefaultJSVersion;
	exports.default = reactRender;
	
	var _ejs = __webpack_require__(/*! ejs */ 15);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 17);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _secureFilters = __webpack_require__(/*! secure-filters */ 18);
	
	var _fs = __webpack_require__(/*! fs */ 9);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _App = __webpack_require__(/*! ../../common/App.jsx */ 10);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _config = __webpack_require__(/*! ../config/config.json */ 7);
	
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
	                test: ("production") !== 'production',
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

/***/ },
/* 15 */
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = require("ejs");

/***/ },
/* 16 */
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 17 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 18 */
/*!*********************************!*\
  !*** external "secure-filters" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("secure-filters");

/***/ },
/* 19 */
/*!*****************************************!*\
  !*** ./common/components/todo/Todo.jsx ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _class;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 4);
	
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

/***/ },
/* 20 */
/*!*********************************************!*\
  !*** ./common/components/todo/TodoList.jsx ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _class;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _Base = __webpack_require__(/*! ../../pages/Base */ 4);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _Todo = __webpack_require__(/*! ./Todo */ 19);
	
	var _Todo2 = _interopRequireDefault(_Todo);
	
	var _TodoModel = __webpack_require__(/*! ../../models/TodoModel.js */ 6);
	
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

/***/ },
/* 21 */
/*!*****************************************!*\
  !*** ./common/fetchList/serverFetch.js ***!
  \*****************************************/
/***/ function(module, exports) {

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

/***/ },
/* 22 */
/*!************************************!*\
  !*** ./common/pages/App/About.jsx ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _dec, _class, _class2, _temp;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 5);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let About = (_dec = (0, _mobxReact.observer)(['commonStore']), _dec(_class = (_temp = _class2 = class About extends _react.Component {
	
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
	}, _temp)) || _class);
	exports.default = About;

/***/ },
/* 23 */
/*!**********************************!*\
  !*** ./common/pages/App/App.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let App = ({ children }) => {
	    return _react2.default.Children.only(children);
	};
	
	App.propTypes = {
	    children: _react.PropTypes.object
	};
	
	exports.default = App;

/***/ },
/* 24 */
/*!******************************************!*\
  !*** ./common/pages/timer/TimerPage.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _dec, _class;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _Base = __webpack_require__(/*! ../Base */ 4);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let TimerPage = (_dec = (0, _mobxReact.observer)(['store']), _dec(_class = class TimerPage extends _Base2.default {
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
	}) || _class);
	exports.default = TimerPage;

/***/ },
/* 25 */
/*!****************************************!*\
  !*** ./common/pages/todo/TodoPage.jsx ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _dec, _class;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _Base = __webpack_require__(/*! ../Base */ 4);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	var _TodoList = __webpack_require__(/*! ../../components/todo/TodoList */ 20);
	
	var _TodoList2 = _interopRequireDefault(_TodoList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let TodoPage = (_dec = (0, _mobxReact.observer)(['store']), _dec(_class = class TodoPage extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(_TodoList2.default, { todoList: this.props.store });
	    }
	}) || _class);
	exports.default = TodoPage;

/***/ },
/* 26 */
/*!**************************!*\
  !*** ./common/routes.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	exports.default = function (stores) {
	    return _react2.default.createElement(
	        _reactRouter.Route,
	        { path: '/', component: _App2.default, onChange: onChange },
	        _react2.default.createElement(_reactRouter.IndexRoute, { component: __webpack_require__(/*! ./pages/App/Vote */ 11).default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'vote', component: __webpack_require__(/*! ./pages/App/Vote */ 11).default }),
	        _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _About2.default })
	    );
	};
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 5);
	
	var _App = __webpack_require__(/*! ./pages/App/App */ 23);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _About = __webpack_require__(/*! ./pages/App/About */ 22);
	
	var _About2 = _interopRequireDefault(_About);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// require.ensure polyfill for node
	if (false) {
	    require.ensure = function requireModule(deps, callback) {
	        callback(require);
	    };
	}
	// import Vote from './universalPage/Vote';
	
	
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

/***/ },
/* 27 */
/*!**************************************!*\
  !*** ./common/stores/CommonStore.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _mobx = __webpack_require__(/*! mobx */ 3);
	
	let CommonStore = class CommonStore {
	    constructor(state = {}) {
	        (0, _mobx.runInAction)('CommonStore init', () => {
	            (0, _mobx.extendObservable)(this, state);
	        });
	    }
	};
	exports.default = CommonStore;

/***/ },
/* 28 */
/*!************************************!*\
  !*** ./common/stores/VoteStore.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _desc, _value, _class, _descriptor;
	
	var _mobx = __webpack_require__(/*! mobx */ 3);
	
	var _fetchList = __webpack_require__(/*! ../fetchList */ 21);
	
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

/***/ },
/* 29 */
/*!************************************!*\
  !*** ./common/stores/spaStores.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = configureStore;
	
	var _CommonStore = __webpack_require__(/*! ./CommonStore */ 27);
	
	var _CommonStore2 = _interopRequireDefault(_CommonStore);
	
	var _TimerStore = __webpack_require__(/*! ./TimerStore */ 12);
	
	var _TimerStore2 = _interopRequireDefault(_TimerStore);
	
	var _TodoStore = __webpack_require__(/*! ./TodoStore */ 13);
	
	var _TodoStore2 = _interopRequireDefault(_TodoStore);
	
	var _VoteStore = __webpack_require__(/*! ./VoteStore */ 28);
	
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

/***/ },
/* 30 */
/*!**********************************************!*\
  !*** ./common/utils/connectDataFetchers.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = connectDataFetchers;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _Base = __webpack_require__(/*! ../pages/Base */ 4);
	
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

/***/ },
/* 31 */
/*!******************************!*\
  !*** ./server/apis/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _express = __webpack_require__(/*! express */ 8);
	
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
/* 32 */
/*!*************************************!*\
  !*** ./server/controllers/Timer.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TimerPage = __webpack_require__(/*! ../../common/pages/timer/TimerPage.jsx */ 24);
	
	var _TimerPage2 = _interopRequireDefault(_TimerPage);
	
	var _TimerStore = __webpack_require__(/*! ../../common/stores/TimerStore */ 12);
	
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

/***/ },
/* 33 */
/*!************************************!*\
  !*** ./server/controllers/Todo.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TodoPage = __webpack_require__(/*! ../../common/pages/todo/TodoPage.jsx */ 25);
	
	var _TodoPage2 = _interopRequireDefault(_TodoPage);
	
	var _TodoStore = __webpack_require__(/*! ../../common/stores/TodoStore */ 13);
	
	var _TodoStore2 = _interopRequireDefault(_TodoStore);
	
	var _TodoModel = __webpack_require__(/*! ../../common/models/TodoModel */ 6);
	
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

/***/ },
/* 34 */
/*!************************************************!*\
  !*** ./server/middlewares/allowCrossDomain.js ***!
  \************************************************/
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
/* 35 */
/*!***********************************************!*\
  !*** ./server/middlewares/spaRenderMatch.jsx ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = renderMatch;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 17);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 5);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _routes = __webpack_require__(/*! ../../common/routes */ 26);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _spaStores = __webpack_require__(/*! ../../common/stores/spaStores.js */ 29);
	
	var _spaStores2 = _interopRequireDefault(_spaStores);
	
	var _preRender = __webpack_require__(/*! ../utils/preRender */ 37);
	
	var _preRender2 = _interopRequireDefault(_preRender);
	
	var _ejs = __webpack_require__(/*! ejs */ 15);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _config = __webpack_require__(/*! ../config/config.json */ 7);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _renderReactMiddleware = __webpack_require__(/*! ./renderReactMiddleware */ 14);
	
	var _App = __webpack_require__(/*! ../../common/App.jsx */ 10);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _secureFilters = __webpack_require__(/*! secure-filters */ 18);
	
	var _fs = __webpack_require__(/*! fs */ 9);
	
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
	                    test: ("production") !== 'production',
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

/***/ },
/* 36 */
/*!********************************!*\
  !*** ./server/routes/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 8);
	
	var _fs = __webpack_require__(/*! fs */ 9);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _Timer = __webpack_require__(/*! ../controllers/Timer */ 32);
	
	var _Timer2 = _interopRequireDefault(_Timer);
	
	var _Todo = __webpack_require__(/*! ../controllers/Todo */ 33);
	
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

/***/ },
/* 37 */
/*!***********************************!*\
  !*** ./server/utils/preRender.js ***!
  \***********************************/
/***/ function(module, exports) {

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

/***/ },
/* 38 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 39 */
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 40 */
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 41 */
/*!************************!*\
  !*** external "csurf" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("csurf");

/***/ },
/* 42 */
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 43 */
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 44 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 45 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map