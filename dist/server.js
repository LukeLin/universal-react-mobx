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
	
	var _http = __webpack_require__(/*! http */ 31);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _express = __webpack_require__(/*! express */ 5);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _compression = __webpack_require__(/*! compression */ 25);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _morgan = __webpack_require__(/*! morgan */ 32);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _cookieParser = __webpack_require__(/*! cookie-parser */ 26);
	
	var _cookieParser2 = _interopRequireDefault(_cookieParser);
	
	var _bodyParser = __webpack_require__(/*! body-parser */ 24);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _expressSession = __webpack_require__(/*! express-session */ 29);
	
	var _expressSession2 = _interopRequireDefault(_expressSession);
	
	var _csurf = __webpack_require__(/*! csurf */ 27);
	
	var _csurf2 = _interopRequireDefault(_csurf);
	
	var _config = __webpack_require__(/*! ./config/config.json */ 6);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(/*! ./routes/index */ 20);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(/*! ./apis/index */ 17);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _allowCrossDomain = __webpack_require__(/*! ./utils/allowCrossDomain */ 21);
	
	var _allowCrossDomain2 = _interopRequireDefault(_allowCrossDomain);
	
	var _renderReactMiddleware = __webpack_require__(/*! ./utils/renderReactMiddleware */ 22);
	
	var _renderReactMiddleware2 = _interopRequireDefault(_renderReactMiddleware);
	
	var _helmet = __webpack_require__(/*! helmet */ 30);
	
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
	
	var _events = __webpack_require__(/*! events */ 7);
	
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
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 6 */
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
/* 7 */
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 8 */
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 9 */
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
	
	var _events = __webpack_require__(/*! events */ 7);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _mobx = __webpack_require__(/*! mobx */ 3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _mobx.useStrict)(true);
	
	if (process.browser && ("production") !== 'production') {
	    var DevTools = __webpack_require__(/*! mobx-react-devtools */ 23).default;
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
	                devTools: _react2.default.createElement(DevTools, null)
	            });
	        }
	    }
	
	    componentDidUpdate() {}
	
	    componentWillUnmount() {}
	
	    render() {
	        // return React.Children.only(this.props.children);
	
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

/***/ },
/* 10 */
/*!******************************************!*\
  !*** ./common/components/todos/Todo.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _class;
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let Todo = (0, _mobxReact.observer)(_class = class Todo extends _react.Component {
	    constructor(props, context) {
	        super(props, context);
	
	        this.onItemClick = this.onItemClick.bind(this);
	    }
	
	    render() {
	        let { todo } = this.props;
	
	        return _react2.default.createElement(
	            'li',
	            null,
	            _react2.default.createElement('input', {
	                type: 'checkbox',
	                checked: todo.finished,
	                onChange: () => {
	                    todo.setFinished(!todo.finished);
	                }
	            }),
	            todo.title,
	            _react2.default.createElement(
	                'button',
	                { onClick: this.props.addTodo },
	                'add'
	            )
	        );
	    }
	}) || _class;
	
	exports.default = Todo;

/***/ },
/* 11 */
/*!**********************************************!*\
  !*** ./common/components/todos/TodoList.jsx ***!
  \**********************************************/
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
	
	var _Todo = __webpack_require__(/*! ./Todo */ 10);
	
	var _Todo2 = _interopRequireDefault(_Todo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let TodoList = (0, _mobxReact.observer)(_class = class TodoList extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	
	        this.addTodo = this.addTodo.bind(this);
	    }
	
	    addTodo(e) {
	        e.preventDefault();
	
	        let { todoList } = this.props;
	        let todos = todoLisst.todos;
	
	        todos.addTodo('some text');
	    }
	
	    render() {
	        return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	                'ul',
	                null,
	                this.props.todoList.todos.map(todo => _react2.default.createElement(_Todo2.default, { todo: todo, key: todo.id, addTodo: this.addTodo }))
	            ),
	            'Tasks left: ',
	            this.props.todoList.unfinishedTodoCount
	        );
	    }
	}) || _class;
	
	exports.default = TodoList;

/***/ },
/* 12 */
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
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _Base = __webpack_require__(/*! ../Base */ 4);
	
	var _Base2 = _interopRequireDefault(_Base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let IndexPage = (_dec = (0, _mobxReact.observer)(['store']), _dec(_class = class IndexPage extends _Base2.default {
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
	exports.default = IndexPage;

/***/ },
/* 13 */
/*!******************************************!*\
  !*** ./common/pages/todos/TodosPage.jsx ***!
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
	
	var _TodoList = __webpack_require__(/*! ../../components/todos/TodoList */ 11);
	
	var _TodoList2 = _interopRequireDefault(_TodoList);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let TodosPage = (_dec = (0, _mobxReact.observer)(['store']), _dec(_class = class TodosPage extends _Base2.default {
	    constructor(props, context) {
	        super(props, context);
	    }
	
	    render() {
	        return _react2.default.createElement(_TodoList2.default, { todoList: this.props.store });
	    }
	}) || _class);
	exports.default = TodosPage;

/***/ },
/* 14 */
/*!******************************************!*\
  !*** ./common/pages/todos/todosModel.js ***!
  \******************************************/
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
	
	let Todo = (_class = class Todo {
	
	    constructor(title) {
	        this.id = Math.random();
	
	        _initDefineProp(this, 'finished', _descriptor, this);
	
	        this.title = title;
	    }
	
	    setFinished(finished) {
	        this.finished = finished;
	    }
	}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'finished', [_mobx.observable], {
	    enumerable: true,
	    initializer: function () {
	        return false;
	    }
	}), _applyDecoratedDescriptor(_class.prototype, 'setFinished', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setFinished'), _class.prototype)), _class);
	exports.default = Todo;

/***/ },
/* 15 */
/*!********************************!*\
  !*** ./common/stores/index.js ***!
  \********************************/
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
/* 16 */
/*!********************************!*\
  !*** ./common/stores/todos.js ***!
  \********************************/
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
	
	let TodoList = (_class = class TodoList {
	    get unfinishedTodoCount() {
	        return this.todos.filter(todo => !todo.finished).length;
	    }
	
	    constructor(state = {}) {
	        _initDefineProp(this, 'todos', _descriptor, this);
	
	        (0, _mobx.extendObservable)(this, state);
	    }
	
	    addTodo(todo) {
	        todo && this.todos.push(todo);
	    }
	}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'todos', [_mobx.observable], {
	    enumerable: true,
	    initializer: function () {
	        return [];
	    }
	}), _applyDecoratedDescriptor(_class.prototype, 'unfinishedTodoCount', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'unfinishedTodoCount'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addTodo', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'addTodo'), _class.prototype)), _class);
	exports.default = TodoList;

/***/ },
/* 17 */
/*!******************************!*\
  !*** ./server/apis/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _express = __webpack_require__(/*! express */ 5);
	
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
/* 18 */
/*!*************************************!*\
  !*** ./server/controllers/Todos.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TodosPage = __webpack_require__(/*! ../../common/pages/todos/TodosPage.jsx */ 13);
	
	var _TodosPage2 = _interopRequireDefault(_TodosPage);
	
	var _todos = __webpack_require__(/*! ../../common/stores/todos */ 16);
	
	var _todos2 = _interopRequireDefault(_todos);
	
	var _todosModel = __webpack_require__(/*! ../../common/pages/todos/todosModel */ 14);
	
	var _todosModel2 = _interopRequireDefault(_todosModel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = function (req, res, next) {
	    let store = new _todos2.default();
	
	    let {
	        todos
	    } = store;
	
	    todos.addTodo(new _todosModel2.default("Get Coffee"));
	    todos.addTodo(new _todosModel2.default("Write simpler code"));
	
	    store.todos[0].setFinished(true);
	
	    res.renderReactHTML({
	        component: _react2.default.createElement(_TodosPage2.default, null),
	        store,
	        locals: {
	            appName: 'todos',
	            title: 'todos page'
	        },
	        pageConfig: {
	            user: 'test'
	        }
	    });
	};

/***/ },
/* 19 */
/*!*************************************!*\
  !*** ./server/controllers/index.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _IndexPage = __webpack_require__(/*! ../../common/pages/index/IndexPage */ 12);
	
	var _IndexPage2 = _interopRequireDefault(_IndexPage);
	
	var _index = __webpack_require__(/*! ../../common/stores/index */ 15);
	
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
/* 20 */
/*!********************************!*\
  !*** ./server/routes/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(/*! express */ 5);
	
	var _fs = __webpack_require__(/*! fs */ 8);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _index = __webpack_require__(/*! ../controllers/index */ 19);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _Todos = __webpack_require__(/*! ../controllers/Todos */ 18);
	
	var _Todos2 = _interopRequireDefault(_Todos);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	let router = new _express.Router();
	
	/**
	 * 首页请求
	 */
	router.get('/', _index2.default);
	router.get('/todos', _Todos2.default);
	
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
/* 21 */
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
/* 22 */
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
	
	var _ejs = __webpack_require__(/*! ejs */ 28);
	
	var _ejs2 = _interopRequireDefault(_ejs);
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(/*! react-dom/server */ 33);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 2);
	
	var _fs = __webpack_require__(/*! fs */ 8);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _App = __webpack_require__(/*! ../../common/App.jsx */ 9);
	
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
	
	function safeJSON(obj) {
	    return JSON.stringify(obj).replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');
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
	                state: safeJSON(store),
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
/* 23 */
/*!****************************************!*\
  !*** ./~/mobx-react-devtools/index.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ 1),__webpack_require__(/*! mobx */ 3),__webpack_require__(/*! mobx-react */ 2)):"function"==typeof define&&define.amd?define(["react","mobx","mobx-react"],t):"object"==typeof exports?exports.mobxDevtools=t(require("react"),require("mobx"),require("mobx-react")):e.mobxDevtools=t(e.React,e.mobx,e.mobxReact)}(this,function(e,t,n){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.setLogEnabled=t.setGraphEnabled=t.setUpdatesEnabled=t.configureDevtool=t.UpdatesControl=t.LogControl=t.GraphControl=t["default"]=void 0;var r=n(1);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o(r)["default"]}});var i=n(10);Object.defineProperty(t,"GraphControl",{enumerable:!0,get:function(){return o(i)["default"]}});var a=n(11);Object.defineProperty(t,"LogControl",{enumerable:!0,get:function(){return o(a)["default"]}});var u=n(12);Object.defineProperty(t,"UpdatesControl",{enumerable:!0,get:function(){return o(u)["default"]}});var l=n(28),s=o(l),c=n(3);s["default"].polyfill();var d=t.configureDevtool=function(e){var t=e.logEnabled,n=e.updatesEnabled,o=e.graphEnabled,r=e.logFilter,i={};void 0!==t&&(i.logEnabled=Boolean(t)),void 0!==n&&(i.updatesEnabled=Boolean(n)),void 0!==o&&(i.graphEnabled=Boolean(o)),"function"==typeof r&&(i.logFilter=r),(0,c.setGlobalState)(i)};t.setUpdatesEnabled=function(e){return d({updatesEnabled:e})},t.setGraphEnabled=function(e){return d({graphEnabled:e})},t.setLogEnabled=function(e){return d({logEnabled:e})}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(2),s=o(l),c=n(3),d=n(9),p=o(d),f=n(22),g=o(f),h=n(24),b=o(h),y=function(e){function t(){var e,n,o,a;r(this,t);for(var u=arguments.length,l=Array(u),s=0;u>s;s++)l[s]=arguments[s];return n=o=i(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.handleUpdate=function(){return o.setState((0,c.getGlobalState)())},o.handleToggleGraph=function(){o.setState({hoverBoxes:[],graphEnabled:!o.state.graphEnabled})},a=n,i(o,a)}return a(t,e),u(t,[{key:"componentWillMount",value:function(){this.setState((0,c.getGlobalState)())}},{key:"componentDidMount",value:function(){c.eventEmitter.on("update",this.handleUpdate)}},{key:"componentWillUnmount",value:function(){c.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"render",value:function(){var e=this.props,t=e.noPanel,n=e.highlightTimeout,o=this.state,r=o.renderingBoxes,i=o.hoverBoxes;return s["default"].createElement("div",null,t!==!0&&s["default"].createElement(p["default"],{position:this.props.position,highlightTimeout:n}),s["default"].createElement(g["default"],{boxes:r.concat(i)}),s["default"].createElement(b["default"],null))}}]),t}(l.Component);y.propTypes={highlightTimeout:l.PropTypes.number,position:l.PropTypes.object,noPanel:l.PropTypes.bool},y.defaultProps={noPanel:!1},t["default"]=y},function(t,n){t.exports=e},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t._handleClick=t._handleMouseMove=t.restoreLogFromLocalstorage=t.restoreUpdatesFromLocalstorage=t.getGlobalState=t.setGlobalState=t.eventEmitter=void 0;var r=n(4),i=o(r),a=n(5),u=o(a),l=n(6),s=o(l),c=n(7),d=o(c),p=n(8),f=o(p),g="mobx-react-devtool__updatesEnabled",h="mobx-react-devtool__logEnabled",b={updatesEnabled:!1,graphEnabled:!1,logEnabled:!1,hoverBoxes:[],renderingBoxes:[],logFilter:function(){return!0}},y=t.eventEmitter=new s["default"];y.setMaxListeners(1/0);var v=void 0,m=t.setGlobalState=function(e){b.logEnabled!==e.logEnabled&&(e.logEnabled===!0?(v&&v(),v=i["default"].spy(function(e){return(0,f["default"])(e,b.logFilter)})):e.logEnabled===!1&&v&&v()),"undefined"!=typeof window&&window.localStorage&&(e.updatesEnabled===!0?window.localStorage.setItem(g,"YES"):e.updatesEnabled===!1&&window.localStorage.removeItem(g),e.logEnabled===!0?window.localStorage.setItem(h,"YES"):e.logEnabled===!1&&window.localStorage.removeItem(h)),e.graphEnabled===!1&&(e.hoverBoxes=[]),b=Object.assign({},b,e),y.emit("update")},I=(t.getGlobalState=function(){return b},t.restoreUpdatesFromLocalstorage=function(){if("undefined"!=typeof window&&window.localStorage){var e="YES"===window.localStorage.getItem(g);m({updatesEnabled:e})}},t.restoreLogFromLocalstorage=function(){if("undefined"!=typeof window&&window.localStorage){var e="YES"===window.localStorage.getItem(h);m({logEnabled:e})}},function(e){for(var t=e,n=void 0;t;){if(n=u["default"].componentByNodeRegistery.get(t))return{component:n,node:t};t=t.parentNode}return{component:void 0,node:void 0}});t._handleMouseMove=function(e){if(b.graphEnabled){var t=e.target,n=I(t).node;if(n){var o=n.getBoundingClientRect();m({hoverBoxes:[{id:"the hovered node",type:"hover",x:o.left,y:o.top,width:o.width,height:o.height,lifeTime:1/0}]})}}},t._handleClick=function(e){if(b.graphEnabled){var t=e.target,n=I(t).component;if(n){e.stopPropagation(),e.preventDefault();var o=i["default"].extras.getDependencyTree(n.render.$mobx);(0,d["default"])(o),m({dependencyTree:o,hoverBoxes:[],graphEnabled:!1})}}}},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(e){return"function"==typeof e}function r(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!r(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,r,u,l,s;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var c=new Error('Uncaught, unspecified "error" event. ('+t+")");throw c.context=t,c}if(n=this._events[e],a(n))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:u=Array.prototype.slice.call(arguments,1),n.apply(this,u)}else if(i(n))for(u=Array.prototype.slice.call(arguments,1),s=n.slice(),r=s.length,l=0;r>l;l++)s[l].apply(this,u);return!0},n.prototype.addListener=function(e,t){var r;if(!o(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,o(t.listener)?t.listener:t),this._events[e]?i(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,i(this._events[e])&&!this._events[e].warned&&(r=a(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,r&&r>0&&this._events[e].length>r&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!o(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,r,a,u;if(!o(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],a=n.length,r=-1,n===t||o(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(n)){for(u=a;u-- >0;)if(n[u]===t||n[u].listener&&n[u].listener===t){r=u;break}if(0>r)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],o(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?o(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(o(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function o(e){if(e.dependencies){for(var t=e.dependencies.length-1;t>=0;t--)for(var n=e.dependencies[t].name,r=t-1;r>=0;r--)if(e.dependencies[r].name===n){e.dependencies[r].dependencies=[].concat(e.dependencies[r].dependencies||[],e.dependencies[t].dependencies||[]),e.dependencies.splice(t,1);break}e.dependencies.forEach(o)}};t["default"]=n},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){m===!1&&"undefined"!=typeof navigator&&-1===navigator.userAgent.indexOf("Chrome")&&(console.warn("The output of the MobX logger is optimized for Chrome"),m=!0);var n=e.spyReportStart===!0,o=e.spyReportEnd===!0,r=void 0;if(0===I?(r=t(e),n&&!r&&(w=!0)):o&&w&&1===I?(r=!1,w=!1):r=w!==!0,r&&o)a(e.time);else if(r){var h=n?i:u;switch(e.type){case"action":h("%caction '%s' %s","color:dodgerblue",e.name,d("(",g(e.target))),u(e.arguments),s();break;case"transaction":h("%ctransaction '%s' %s","color:gray",e.name,d("(",g(e.target)));break;case"scheduled-reaction":h("%cscheduled async reaction '%s'","color:#10a210",p(e.object));break;case"reaction":h("%creaction '%s'","color:#10a210",p(e.object)),s();break;case"compute":i("%ccomputed '%s' %s","color:#10a210",p(e.object),d("(",g(e.target))),a();break;case"error":h("%cerror: %s","color:tomato",e.message),s(),c();break;case"update":v["default"].isObservableArray(e.object)?h("updated '%s[%s]': %s (was: %s)",p(e.object),e.index,f(e.newValue),f(e.oldValue)):v["default"].isObservableObject(e.object)?h("updated '%s.%s': %s (was: %s)",p(e.object),e.name,f(e.newValue),f(e.oldValue)):h("updated '%s': %s (was: %s)",p(e.object),e.name,f(e.newValue),f(e.oldValue)),l({newValue:e.newValue,oldValue:e.oldValue}),s();break;case"splice":h("spliced '%s': index %d, added %d, removed %d",p(e.object),e.index,e.addedCount,e.removedCount),l({added:e.added,removed:e.removed}),s();break;case"add":h("set '%s.%s': %s",p(e.object),e.name,f(e.newValue)),l({newValue:e.newValue}),s();break;case"delete":h("removed '%s.%s' (was %s)",p(e.object),e.name,f(e.oldValue)),l({oldValue:e.oldValue}),s();break;case"create":h("set '%s': %s",p(e.object),f(e.newValue)),l({newValue:e.newValue}),s();break;default:h(e.type),l(e)}}n&&I++,o&&I--}function i(){console[x?"groupCollapsed":"log"].apply(console,arguments),j++}function a(e){j--,"number"==typeof e&&u("%ctotal time: %sms","color:gray",e),x&&console.groupEnd()}function u(){console.log.apply(console,arguments)}function l(){console.dir.apply(console,arguments)}function s(){console.trace("stack")}function c(){for(var e=0,t=j;t>e;e++)a()}function d(e,t){return t?(e||"")+t+(C[e]||""):""}function p(e){return v["default"].extras.getDebugName(e)}function f(e){return h(e)?"string"==typeof e&&e.length>100?e.substr(0,97)+"...":e:d("(",g(e))}function g(e){if(null===e||void 0===e)return"";if(e&&"object"===("undefined"==typeof e?"undefined":b(e))){if(e&&e.$mobx)return e.$mobx.name;if(e.constructor)return e.constructor.name||"object"}return""+("undefined"==typeof e?"undefined":b(e))}function h(e){return null===e||void 0===e||"string"==typeof e||"number"==typeof e||"boolean"==typeof e}Object.defineProperty(t,"__esModule",{value:!0});var b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t["default"]=r;var y=n(4),v=o(y),m=!1,I=0,w=!1,x="function"==typeof console.groupCollapsed,j=0,C={'"':'"',"'":"'","(":")","[":"]","<":"]","#":""}},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(3),p=n(10),f=r(p),g=n(11),h=r(g),b=n(12),y=r(b),v=n(14),m=r(v),I=n(15),w=o(I),x=function(e){function t(){var e,n,o,r;i(this,t);for(var u=arguments.length,l=Array(u),s=0;u>s;s++)l[s]=arguments[s];return n=o=a(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.handleUpdate=function(){return o.setState({})},r=n,a(o,r)}return u(t,e),l(t,[{key:"componentDidMount",value:function(){d.eventEmitter.on("update",this.handleUpdate)}},{key:"componentWillUnmount",value:function(){d.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"render",value:function(){var e=this.props,t=e.position,n=e.highlightTimeout,o={};return t?(o.top=t.top,o.right=t.right,o.bottom=t.bottom,o.left=t.left):(o.top="0px",o.right="20px"),c["default"].createElement("div",null,c["default"].createElement("div",{style:Object.assign({},w.panel,o)},c["default"].createElement(y["default"],{highlightTimeout:n},c["default"].createElement(m["default"],{id:"buttonUpdates"})),c["default"].createElement(f["default"],null,c["default"].createElement(m["default"],{id:"buttonGraph"})),c["default"].createElement(h["default"],null,c["default"].createElement(m["default"],{id:"buttonLog"}))))}}]),t}(s.Component);x.propTypes={highlightTimeout:s.PropTypes.number},t["default"]=x},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(2),s=o(l),c=n(5),d=o(c),p=n(3),f=function(e){function t(){var e,n,o,a;r(this,t);for(var u=arguments.length,l=Array(u),s=0;u>s;s++)l[s]=arguments[s];return n=o=i(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.handleUpdate=function(){return o.setState({})},o.handleToggleGraph=function(){var e=(0,p.getGlobalState)(),t=e.graphEnabled;(0,p.setGlobalState)({hoverBoxes:[],graphEnabled:!t})},a=n,i(o,a)}return a(t,e),u(t,[{key:"componentWillMount",value:function(){this.setState({})}},{key:"componentDidMount",value:function(){d["default"].trackComponents(),p.eventEmitter.on("update",this.handleUpdate),"undefined"!=typeof window&&"undefined"!=typeof document&&(document.body.addEventListener("mousemove",p._handleMouseMove,!0),document.body.addEventListener("click",p._handleClick,!0))}},{key:"componentWillUnmount",value:function(){p.eventEmitter.removeListener("update",this.handleUpdate),"undefined"!=typeof document&&(document.body.removeEventListener("mousemove",p._handleMouseMove,!0),document.body.removeEventListener("click",p._handleMouseMove,!0))}},{key:"render",value:function(){var e=(0,p.getGlobalState)(),t=e.graphEnabled,n=this.props.children;return s["default"].cloneElement(n,{onToggle:this.handleToggleGraph,active:t})}}]),t}(l.Component);t["default"]=f},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(2),s=o(l),c=n(3),d=function(e){function t(){var e,n,o,a;r(this,t);for(var u=arguments.length,l=Array(u),s=0;u>s;s++)l[s]=arguments[s];return n=o=i(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.handleUpdate=function(){o.setState({})},o.handleToggleLog=function(){var e=(0,c.getGlobalState)(),t=e.logEnabled;(0,c.setGlobalState)({logEnabled:!t})},a=n,i(o,a)}return a(t,e),u(t,[{key:"componentDidMount",value:function(){c.eventEmitter.on("update",this.handleUpdate),(0,c.restoreLogFromLocalstorage)()}},{key:"componentWillUnmount",value:function(){c.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"render",value:function(){var e=(0,c.getGlobalState)(),t=e.logEnabled,n=this.props.children;return s["default"].cloneElement(n,{onToggle:this.handleToggleLog,active:t})}}]),t}(l.Component);t["default"]=d},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=n(2),s=o(l),c=n(13),d=o(c),p=n(3),f=function(e){function t(){var e,n,o,a;r(this,t);for(var u=arguments.length,l=Array(u),s=0;u>s;s++)l[s]=arguments[s];return n=o=i(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.handleUpdate=function(){return o.setState({})},o.handleToggleUpdates=function(){var e=(0,p.getGlobalState)(),t=e.updatesEnabled;(0,p.setGlobalState)({updatesEnabled:!t})},a=n,i(o,a)}return a(t,e),u(t,[{key:"componentDidMount",value:function(){p.eventEmitter.on("update",this.handleUpdate);var e=this.props.highlightTimeout;this.renderingMonitor=new d["default"]({highlightTimeout:e}),(0,p.restoreUpdatesFromLocalstorage)()}},{key:"componentWillUnmount",value:function(){p.eventEmitter.removeListener("update",this.handleUpdate),this.renderingMonitor.dispose()}},{key:"render",value:function(){var e=(0,p.getGlobalState)(),t=e.updatesEnabled,n=this.props.children;return s["default"].cloneElement(n,{onToggle:this.handleToggleUpdates,active:t})}}]),t}(l.Component);f.propTypes={highlightTimeout:l.PropTypes.number},f.defaultProps={highlightTimeout:1500},t["default"]=f},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(5),u=o(a),l=n(3),s=function(e){switch(!0){case 25>e:return"cheap";case 100>e:return"acceptable";default:return"expensive"}},c=function(){function e(t){var n=this,o=t.highlightTimeout;r(this,e),this._boxesRegistry="undefined"!=typeof WeakMap?new WeakMap:new Map,this._renderReporterDisposer=u["default"].renderReporter.on(function(e){if((0,l.getGlobalState)().updatesEnabled===!0)switch(e.event){case"render":if(!e.node||isNaN(e.renderTime))return;var t=e.node.getBoundingClientRect(),r=n.getBoxForNode(e.node);r.type="rendering",r.y=t.top,r.x=t.left,r.width=t.width,r.height=t.height,r.renderInfo={count:r.renderInfo&&++r.renderInfo.count||1,renderTime:e.renderTime,totalTime:e.totalTime,cost:s(e.renderTime)},r.lifeTime=o;var i=(0,l.getGlobalState)().renderingBoxes;return-1===i.indexOf(r)&&(i=i.concat([r])),(0,l.setGlobalState)({renderingBoxes:i}),r._timeout&&clearTimeout(r._timeout),void(r._timeout=setTimeout(function(){return n.removeBox(e.node,!0)},o));case"destroy":return n.removeBox(e.node),void n._boxesRegistry["delete"](e.node);default:return}})}return i(e,[{key:"getBoxForNode",value:function(e){if(this._boxesRegistry.has(e))return this._boxesRegistry.get(e);var t={id:Math.random().toString(32).substr(2)};return this._boxesRegistry.set(e,t),t}},{key:"dispose",value:function(){this._renderReporterDisposer()}},{key:"removeBox",value:function(e){if(this._boxesRegistry.has(e)!==!1){var t=(0,l.getGlobalState)().renderingBoxes,n=t.indexOf(this._boxesRegistry.get(e));-1!==n&&(t=t.slice(0,n).concat(t.slice(n+1)),(0,l.setGlobalState)({renderingBoxes:t}))}}}]),e}();t["default"]=c},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(15),p=o(d),f=function(e){function t(){var e,n,o,r;i(this,t);for(var u=arguments.length,l=Array(u),s=0;u>s;s++)l[s]=arguments[s];return n=o=a(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.state={hovered:!1},o.handleMouseOver=function(){return o.setState({hovered:!0})},o.handleMouseOut=function(){return o.setState({hovered:!1})},r=n,a(o,r)}return u(t,e),l(t,[{key:"render",value:function(){var e=this.props,t=e.active,n=e.id,o=e.onToggle,r=this.state.hovered,i=function(){switch(n){case"buttonUpdates":return t?p.buttonUpdatesActive:p.buttonUpdates;case"buttonGraph":return t?p.buttonGraphActive:p.buttonGraph;case"buttonLog":return t?p.buttonLogActive:p.buttonLog}}(),a=function(){switch(n){case"buttonUpdates":return"Visualize component re-renders";case"buttonGraph":return"Select a component and show it's dependency tree";case"buttonLog":return"Log all MobX state changes and reactions to the browser console (use F12 to show / hide the console). Use Chrome / Chromium for an optimal experience"}}(),u=Object.assign({},p.button,i,t&&p.button.active,r&&p.button.hover);return c["default"].createElement("button",{type:"button",onClick:o,title:a,style:u,onMouseOver:this.handleMouseOver,onMouseOut:this.handleMouseOut})}}]),t}(s.Component);f.props={onToggle:s.PropTypes.bool.isRequired,active:s.PropTypes.bool.isRequired,name:s.PropTypes.oneOf(["buttonUpdates","buttonGraph","buttonLog"]).isRequired},t["default"]=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.panel={position:"fixed",height:"26px",backgroundColor:"#fff",color:"rgba(0, 0, 0, 0.8)",borderRadius:"0 0 2px 2px",borderStyle:"solid",borderWidth:"0 1px 1px",borderColor:"rgba(0, 0, 0, 0.1)",zIndex:"65000",fontFamily:"Helvetica, sans-serif",display:"flex",padding:"0 5px"},t.button={opacity:.45,background:"transparent none center / 16px 16px no-repeat",width:"26px",margin:"0 10px",cursor:"pointer",border:"none",hover:{opacity:.7},active:{opacity:1,":hover":{opacity:1}}},t.buttonLog={backgroundImage:"url("+n(16)+")"},t.buttonLogActive={backgroundImage:"url("+n(17)+")"},t.buttonUpdates={backgroundImage:"url("+n(18)+")"},t.buttonUpdatesActive={backgroundImage:"url("+n(19)+")"},t.buttonGraph={backgroundImage:"url("+n(20)+")"},t.buttonGraphActive={backgroundImage:"url("+n(21)+")"}},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxwYXRoIGQ9Ik0xMi41IDMuNWgtOGMtMS4xIDAtMiAuOS0yIDJ2NWMwIDEuMS45IDIgMiAyaDF2Mmw1LTJoMmMxLjEgMCAyLS45IDItMnYtNWMwLTEuMS0uOS0yLTItMnoiLz4KICAgICAgICA8cGF0aCBkPSJNNSA2LjVoNyIvPgogICAgICAgIDxwYXRoIGQ9Ik01IDkuNWg3Ii8+CiAgICA8L2c+Cjwvc3ZnPgo="},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij4KICAgIDxnIHN0cm9rZT0iIzE3ODBmYSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxLjI1Ij4KICAgICAgICA8cGF0aCBkPSJNMTIuNSAzLjVoLThjLTEuMSAwLTIgLjktMiAydjVjMCAxLjEuOSAyIDIgMmgxdjJsNS0yaDJjMS4xIDAgMi0uOSAyLTJ2LTVjMC0xLjEtLjktMi0yLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTUgNi41aDciLz4KICAgICAgICA8cGF0aCBkPSJNNSA5LjVoNyIvPgogICAgPC9nPgo8L3N2Zz4K"},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iNiIvPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTBWNCIvPgogICAgPC9nPgogICAgPGcgc3Ryb2tlPSJub25lIiBmaWxsPSIjMDAwIj4KICAgICAgICA8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDFoMnYxLjVoLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTE0IDEuNmwtLjcuNy4zLjMtLjcuOC43LjcuOC0uNy4zLjMuNy0uN3oiLz4KICAgIDwvZz4KPC9zdmc+Cg=="},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMTc4MGZhIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuMjUiPgogICAgICAgIDxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iNiIvPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTBWNCIvPgogICAgPC9nPgogICAgPGcgc3Ryb2tlPSJub25lIiBmaWxsPSIjMTc4MGZhIj4KICAgICAgICA8Y2lyY2xlIGN4PSI4LjUiIGN5PSI4LjUiIHI9IjEiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDFoMnYxLjVoLTJ6Ii8+CiAgICAgICAgPHBhdGggZD0iTTE0IDEuNmwtLjcuNy4zLjMtLjcuOC43LjcuOC0uNy4zLjMuNy0uN3oiLz4KICAgIDwvZz4KPC9zdmc+Cg=="},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPgogICAgICAgIDxwYXRoIGQ9Ik0yLjUgMi41aDl2MmgtOXoiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDcuNWg3djJoLTd6Ii8+CiAgICAgICAgPHBhdGggZD0iTTcuNSAxMi41aDd2MmgtN3oiLz4KICAgICAgICA8cGF0aCBkPSJNNC41IDQuNXY5aDMiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDguNWgtMyIvPgogICAgPC9nPgo8L3N2Zz4K"},function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iYmFzaWMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE2IDE2IiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiPgogICAgPGcgc3Ryb2tlPSIjMTc4MGZhIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjEuMjUiPgogICAgICAgIDxwYXRoIGQ9Ik0yLjUgMi41aDl2MmgtOXoiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDcuNWg3djJoLTd6Ii8+CiAgICAgICAgPHBhdGggZD0iTTcuNSAxMi41aDd2MmgtN3oiLz4KICAgICAgICA8cGF0aCBkPSJNNC41IDQuNXY5aDMiLz4KICAgICAgICA8cGF0aCBkPSJNNy41IDguNWgtMyIvPgogICAgPC9nPgo8L3N2Zz4K"},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(23),p=o(d),f=function(e){function t(){return i(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments));
	}return u(t,e),l(t,[{key:"componentWillAppear",value:function(e){this.props.willAppear(e)}},{key:"componentWillLeave",value:function(){this.props.willLeave()}},{key:"render",value:function(){return this.props.children}}]),t}(s.Component);f.propTypes={willAppear:s.PropTypes["function"],willLeave:s.PropTypes["function"]},f.defaultProps={willAppear:function(){},willLeave:function(){}};var g=function(e){function t(){return i(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),l(t,[{key:"renderBox",value:function(e){switch(e.type){case"rendering":var t=p.rendering[e.renderInfo.cost]||{};return c["default"].createElement("div",{key:e.id,ref:function(t){return setTimeout(function(){t&&(t.style.opacity=0)},e.lifeTime-500)},style:Object.assign({},p.box,p.rendering,t,{left:e.x,top:e.y,width:e.width,height:e.height})},c["default"].createElement("span",{style:Object.assign({},p.text,t.text)},e.renderInfo.count,"x | ",e.renderInfo.renderTime," / ",e.renderInfo.totalTime," ms"));case"hover":return c["default"].createElement("div",{key:e.id,style:Object.assign({},p.box,p.hover,{left:e.x,top:e.y,width:e.width,height:e.height})});default:throw new Error}}},{key:"render",value:function(){var e=this,t=this.props.boxes;return c["default"].createElement("div",null,t.map(function(t){return e.renderBox(t)}))}}]),t}(s.Component);g.propTypes={boxes:s.PropTypes.arrayOf(s.PropTypes.shape({type:s.PropTypes.oneOf(["rendering","hover"]).isRequired,x:s.PropTypes.number.isRequired,y:s.PropTypes.number.isRequired,width:s.PropTypes.number.isRequired,height:s.PropTypes.number.isRequired,renderInfo:s.PropTypes.shape({count:s.PropTypes.number.isRequired,renderTime:s.PropTypes.number.isRequired,totalTime:s.PropTypes.number.isRequired,cost:s.PropTypes.oneOf(["cheap","acceptable","expensive"]).isRequired}),lifeTime:s.PropTypes.number.isRequired})).isRequired},t["default"]=g},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.box={display:"block",position:"fixed",zIndex:"64998",minWidth:"60px",outline:"3px solid",pointerEvents:"none",transition:"opacity 500ms ease-in"},t.text={fontFamily:"verdana, sans-serif",padding:"0 4px 2px",color:"rgba(0, 0, 0, 0.6)",fontSize:"10px",lineHeight:"12px",pointerEvents:"none","float":"right",borderBottomRightRadius:"2px",maxWidth:"100%",maxHeight:"100%",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},t.rendering={cheap:{outlineColor:"rgba(182, 218, 146, 0.75)",text:{backgroundColor:"rgba(182, 218, 146, 0.75)"}},acceptable:{outlineColor:"rgba(228, 195, 66, 0.85)",text:{backgroundColor:"rgba(228, 195, 66, 0.85)"}},expensive:{outlineColor:"rgba(228, 171, 171, 0.95)",text:{backgroundColor:"rgba(228, 171, 171, 0.95)"}}},t.hover={outlineColor:"rgba(128, 128, 255, 0.5)"}},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(25),p=r(d),f=n(3),g=n(27),h=o(g),b=function(e){function t(){var e,n,o,r;i(this,t);for(var u=arguments.length,l=Array(u),s=0;u>s;s++)l[s]=arguments[s];return n=o=a(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.handleUpdate=function(){return o.setState({})},o.handleClose=function(){return(0,f.setGlobalState)({dependencyTree:void 0})},r=n,a(o,r)}return u(t,e),l(t,[{key:"componentDidMount",value:function(){f.eventEmitter.on("update",this.handleUpdate)}},{key:"componentWillUnmount",value:function(){f.eventEmitter.removeListener("update",this.handleUpdate)}},{key:"renderTreeItem",value:function(e,t,n){var o=e.name,r=e.dependencies,i=this;return c["default"].createElement("div",{style:h.item,key:o},c["default"].createElement("span",{style:Object.assign({},h.box,n&&h.box.root)},o),r&&c["default"].createElement("div",{style:h.tree},r.map(function(e,t){return i.renderTreeItem(e,t==r.length-1)})),!n&&c["default"].createElement("span",{style:h.itemHorisontalDash}),!n&&c["default"].createElement("span",{style:Object.assign({},h.itemVericalStick,t&&h.itemVericalStick["short"])}))}},{key:"render",value:function(){var e=(0,f.getGlobalState)(),t=e.dependencyTree;return c["default"].createElement(p["default"],{onOverlayClick:this.handleClose},t&&c["default"].createElement("div",{style:h.graph},c["default"].createElement("span",{style:h.close,onClick:this.handleClose},"×"),c["default"].createElement("div",{style:h.tree},this.renderTreeItem(t,!0,!0))))}}]),t}(s.Component);t["default"]=b},function(e,t,n){"use strict";function o(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(2),c=r(s),d=n(26),p=o(d),f=function(e){function t(){var e,n,o,r;i(this,t);for(var u=arguments.length,l=Array(u),s=0;u>s;s++)l[s]=arguments[s];return n=o=a(this,(e=Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),o.stopPropogation=function(e){return e.stopPropagation()},r=n,a(o,r)}return u(t,e),l(t,[{key:"componentDidUpdate",value:function(e){var t=document.body.parentNode;if(e.children&&!this.props.children)this.rightOffset=0,t.style.borderRight=null,t.style.overflow=null;else if(!e.children&&this.props.children){var n=t.offsetWidth;t.style.overflow="hidden";var o=t.offsetWidth,r=Math.max(0,o-n);t.style.borderRight=r+"px solid transparent"}}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.onOverlayClick;return t?c["default"].createElement("div",{style:p.overlay,onClick:n},c["default"].createElement("div",{key:"content",style:p.modal,onClick:this.stopPropogation},t)):null}}]),t}(s.Component);f.propTypes={children:s.PropTypes.node,onOverlayClick:s.PropTypes.func.isRequired},t["default"]=f},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.overlay={position:"fixed",top:0,right:0,bottom:0,left:0,zIndex:66e3,overflow:"auto",WebkitOverflowScrolling:"touch",outline:0,backgroundColor:"rgba(40, 40, 50, 0.5)",transformOrigin:"50% 25%"},t.modal={position:"relative",width:"auto",margin:"5% 10%",zIndex:1060}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.graph={background:"white",padding:"40px"},t.close={color:"rgba(0, 0, 0, 0.2)",fontSize:"36px",position:"absolute",top:"5px",right:"5px",width:"40px",height:"40px",lineHeight:"34px",textAlign:"center",cursor:"pointer",":hover":{color:"rgba(0, 0, 0, 0.5)"}},t.tree={position:"relative",paddingLeft:"25px"},t.item={position:"relative"},t.box={padding:"4px 10px",background:"rgba(0, 0, 0, 0.05)",display:"inline-block",marginBottom:"8px",color:"#000",root:{fontSize:"15px",fontWeight:"bold",padding:"6px 13px"}},t.itemHorisontalDash={position:"absolute",left:"-12px",borderTop:"1px solid rgba(0, 0, 0, 0.2)",top:"14px",width:"12px",height:"0"},t.itemVericalStick={position:"absolute",left:"-12px",borderLeft:"1px solid rgba(0, 0, 0, 0.2)",height:"100%",width:0,top:"-8px","short":{height:"23px"}}},function(e,t){"use strict";function n(e,t){if(void 0===e||null===e)throw new TypeError("Cannot convert first argument to object");for(var n=Object(e),o=1;o<arguments.length;o++){var r=arguments[o];if(void 0!==r&&null!==r)for(var i=Object.keys(Object(r)),a=0,u=i.length;u>a;a++){var l=i[a],s=Object.getOwnPropertyDescriptor(r,l);void 0!==s&&s.enumerable&&(n[l]=r[l])}}return n}function o(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:n})}e.exports={assign:n,polyfill:o}}])});

/***/ },
/* 24 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 25 */
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 26 */
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 27 */
/*!************************!*\
  !*** external "csurf" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("csurf");

/***/ },
/* 28 */
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = require("ejs");

/***/ },
/* 29 */
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 30 */
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 31 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 32 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 33 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map