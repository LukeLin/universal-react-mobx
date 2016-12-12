webpackJsonp([0],{

/***/ 49:
/*!*******************************!*\
  !*** ./common/pages/Base.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 16);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 15);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 8);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _events = __webpack_require__(/*! events */ 48);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var eventMatchReg = /^on[A-Z]/;
	function getEventMethodsProps(instance) {
	    var methods = Object.getOwnPropertyNames(instance).filter(function (prop) {
	        return eventMatchReg.test(prop) && typeof instance[prop] === 'function';
	    });
	
	    var instancePrototype = Object.getPrototypeOf(instance);
	    if (instancePrototype !== Object.prototype) {
	        methods = methods.concat(getEventMethodsProps(instancePrototype));
	    }
	
	    return methods;
	}
	
	var Base = function (_Component) {
	    (0, _inherits3.default)(Base, _Component);
	
	    function Base(props, context) {
	        (0, _classCallCheck3.default)(this, Base);
	
	        var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props, context));
	
	        _this.__eventNames = {};
	
	        _this.__bindFunctions();
	        return _this;
	    }
	
	    Base.prototype.__bindFunctions = function __bindFunctions() {
	        var props = getEventMethodsProps(this);
	        for (var _iterator = props, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	
	            var prop = _ref;
	
	            if (!this[prop].funcBinded) {
	                this[prop] = this[prop].bind(this);
	                this[prop].funcBinded = true;
	            }
	        }
	    };
	
	    Base.prototype.on = function on(eventName, fn) {
	        if (typeof fn !== 'function') throw new Error('fn should be a function');
	
	        if (!this.__eventNames[eventName]) {
	            this.__eventNames[eventName] = [fn];
	        } else {
	            this.__eventNames[eventName].push(fn);
	        }
	
	        return this.context.$eventBus.addListener(eventName, fn);
	    };
	
	    Base.prototype.emit = function emit(eventName) {
	        var _context$$eventBus;
	
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	        }
	
	        return (_context$$eventBus = this.context.$eventBus).emit.apply(_context$$eventBus, [eventName].concat(args));
	    };
	
	    Base.prototype.off = function off(eventName, fn) {
	        var events = this.__eventNames[eventName];
	        if (events) {
	            var index = events.indexOf(fn);
	
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
	    };
	
	    Base.prototype.componentWillUnmount = function componentWillUnmount() {
	        for (var eventName in this.__eventNames) {
	            if (this.__eventNames.hasOwnProperty(eventName)) {
	                for (var _iterator2 = this.__eventNames[eventName], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                    var _ref2;
	
	                    if (_isArray2) {
	                        if (_i2 >= _iterator2.length) break;
	                        _ref2 = _iterator2[_i2++];
	                    } else {
	                        _i2 = _iterator2.next();
	                        if (_i2.done) break;
	                        _ref2 = _i2.value;
	                    }
	
	                    var fn = _ref2;
	
	                    this.off(eventName, fn);
	                }
	            }
	        }
	    };
	
	    return Base;
	}(_react.Component);
	
	exports.default = Base;
	
	Base.contextTypes = {
	    $eventBus: _react.PropTypes.instanceOf(_events2.default)
	};

/***/ },

/***/ 101:
/*!***********************************!*\
  !*** ./common/pages/App/Vote.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 16);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 15);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class, _class2, _temp;
	
	var _react = __webpack_require__(/*! react */ 8);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 23);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 90);
	
	var _connectDataFetchers = __webpack_require__(/*! ../../utils/connectDataFetchers */ 120);
	
	var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// @inject((allStores) => {
	//     return {
	//         VoteStore: allStores.VoteStore,
	//         commonStore: allStores.commonStore
	//     };
	// })
	var Vote = (_dec = (0, _mobxReact.observer)(['VoteStore', 'commonStore']), _dec2 = (0, _connectDataFetchers2.default)(['VoteStore']), _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
	    (0, _inherits3.default)(Vote, _Component);
	
	    function Vote() {
	        (0, _classCallCheck3.default)(this, Vote);
	        return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
	    }
	
	    Vote.prototype.render = function render() {
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
	    };
	
	    return Vote;
	}(_react.Component), _class2.pageConfig = {
	    pageId: 'Vote'
	}, _temp)) || _class) || _class);
	exports.default = Vote;

/***/ },

/***/ 120:
/*!**********************************************!*\
  !*** ./common/utils/connectDataFetchers.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 3);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 16);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 15);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	exports.default = connectDataFetchers;
	
	var _react = __webpack_require__(/*! react */ 8);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 23);
	
	var _Base2 = __webpack_require__(/*! ../pages/Base */ 49);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	var _spaStores = __webpack_require__(/*! ../stores/spaStores.js */ 102);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var IS_FIRST_MOUNT_AFTER_LOAD = true;
	if (process.browser) {
	    var FIRST_PAGE_ID = window.__APP_CONFIG__.pageId;
	}
	
	// todo
	function connectDataFetchers() {
	    var storeKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var cache = arguments[1];
	
	    return function (Page) {
	        var _class, _temp;
	
	        if (process.browser) {
	            if (!Page.pageConfig) {
	                console.error('Page Component static propery pageConfig.pageId required!');
	            } else {
	                IS_FIRST_MOUNT_AFTER_LOAD = Page.pageConfig.pageId === FIRST_PAGE_ID;
	            }
	        }
	
	        var DataFetchersWrapper = (_temp = _class = function (_Base) {
	            (0, _inherits3.default)(DataFetchersWrapper, _Base);
	
	            function DataFetchersWrapper() {
	                (0, _classCallCheck3.default)(this, DataFetchersWrapper);
	                return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
	            }
	
	            DataFetchersWrapper.fetchData = function fetchData(_ref, req) {
	                var location = _ref.location,
	                    params = _ref.params,
	                    appConfig = _ref.appConfig,
	                    pageConfig = _ref.pageConfig;
	
	                console.log(_spaStores.stores);
	                return Promise.all(storeKeys.map(function (storeKey) {
	                    return _spaStores.stores[storeKey] && _spaStores.stores[storeKey].loadData({
	                        location: location,
	                        params: params,
	                        appConfig: appConfig,
	                        pageConfig: pageConfig
	                    });
	                }, req));
	            };
	
	            DataFetchersWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	                return this.props !== nextProps;
	            };
	
	            DataFetchersWrapper.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	                var location = this.props.location;
	                var prevLocation = prevProps.location;
	
	
	                var isUrlChanged = location.pathname !== prevLocation.pathname || location.search.slice(1) !== prevLocation.search.slice(1);
	
	                if (isUrlChanged) {
	                    this._fetchDataOnClient();
	                }
	            };
	
	            DataFetchersWrapper.prototype.componentDidMount = function componentDidMount() {
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
	            };
	
	            DataFetchersWrapper.prototype._fetchDataOnClient = function _fetchDataOnClient() {
	                this.constructor.fetchData({
	                    params: this.props.params,
	                    location: this.props.location,
	                    appConfig: this.context.$appConfig
	                });
	            };
	
	            DataFetchersWrapper.prototype.render = function render() {
	                return _react2.default.createElement(Page, this.props);
	            };
	
	            return DataFetchersWrapper;
	        }(_Base3.default), _class.propTypes = {
	            params: _react.PropTypes.object,
	            location: _react.PropTypes.shape({
	                pathname: _react.PropTypes.string.required,
	                search: _react.PropTypes.string,
	                query: _react.PropTypes.string.object
	            }).isRequired
	        }, _class.contextTypes = {
	            $appConfig: _react.PropTypes.object
	        }, _class.OriginalPage = Page, _temp);
	
	
	        return DataFetchersWrapper;
	    };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/node-libs-browser/~/process/browser.js */ 37)))

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9EOi93b3Jrc3BhY2UvamF2YXNjcmlwdC91bml2ZXJzYWwtcmVhY3QtbW9ieC9jb21tb24vcGFnZXMvQmFzZS5qc3giLCJ3ZWJwYWNrOi8vLy4vRDovd29ya3NwYWNlL2phdmFzY3JpcHQvdW5pdmVyc2FsLXJlYWN0LW1vYngvY29tbW9uL3BhZ2VzL0FwcC9Wb3RlLmpzeCIsIndlYnBhY2s6Ly8vLi9EOi93b3Jrc3BhY2UvamF2YXNjcmlwdC91bml2ZXJzYWwtcmVhY3QtbW9ieC9jb21tb24vdXRpbHMvY29ubmVjdERhdGFGZXRjaGVycy5qc3giXSwibmFtZXMiOlsiZXZlbnRNYXRjaFJlZyIsImdldEV2ZW50TWV0aG9kc1Byb3BzIiwiaW5zdGFuY2UiLCJtZXRob2RzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZpbHRlciIsInByb3AiLCJ0ZXN0IiwiaW5zdGFuY2VQcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsImNvbmNhdCIsIkJhc2UiLCJwcm9wcyIsImNvbnRleHQiLCJfX2V2ZW50TmFtZXMiLCJfX2JpbmRGdW5jdGlvbnMiLCJmdW5jQmluZGVkIiwiYmluZCIsIm9uIiwiZXZlbnROYW1lIiwiZm4iLCJFcnJvciIsInB1c2giLCIkZXZlbnRCdXMiLCJhZGRMaXN0ZW5lciIsImVtaXQiLCJhcmdzIiwib2ZmIiwiZXZlbnRzIiwiaW5kZXgiLCJpbmRleE9mIiwicmVtb3ZlTGlzdGVuZXIiLCJzcGxpY2UiLCJsZW5ndGgiLCJjb25zb2xlIiwid2FybiIsIl9yZWFjdEludGVybmFsSW5zdGFuY2UiLCJnZXROYW1lIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHRUeXBlcyIsImluc3RhbmNlT2YiLCJWb3RlIiwicmVuZGVyIiwiVm90ZVN0b3JlIiwibWVzc2FnZSIsInBhZ2VDb25maWciLCJwYWdlSWQiLCJjb25uZWN0RGF0YUZldGNoZXJzIiwiSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRCIsInByb2Nlc3MiLCJicm93c2VyIiwiRklSU1RfUEFHRV9JRCIsIndpbmRvdyIsIl9fQVBQX0NPTkZJR19fIiwic3RvcmVLZXlzIiwiY2FjaGUiLCJQYWdlIiwiZXJyb3IiLCJEYXRhRmV0Y2hlcnNXcmFwcGVyIiwiZmV0Y2hEYXRhIiwicmVxIiwibG9jYXRpb24iLCJwYXJhbXMiLCJhcHBDb25maWciLCJsb2ciLCJQcm9taXNlIiwiYWxsIiwibWFwIiwic3RvcmVLZXkiLCJsb2FkRGF0YSIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZMb2NhdGlvbiIsImlzVXJsQ2hhbmdlZCIsInBhdGhuYW1lIiwic2VhcmNoIiwic2xpY2UiLCJfZmV0Y2hEYXRhT25DbGllbnQiLCJjb21wb25lbnREaWRNb3VudCIsIkRBVEFfTE9BREVEIiwiJGFwcENvbmZpZyIsInByb3BUeXBlcyIsIm9iamVjdCIsInNoYXBlIiwic3RyaW5nIiwicmVxdWlyZWQiLCJxdWVyeSIsImlzUmVxdWlyZWQiLCJPcmlnaW5hbFBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxLQUFNQSxnQkFBZ0IsVUFBdEI7QUFDQSxVQUFTQyxvQkFBVCxDQUE4QkMsUUFBOUIsRUFBdUM7QUFDbkMsU0FBSUMsVUFBVUMsT0FBT0MsbUJBQVAsQ0FBMkJILFFBQTNCLEVBQ1RJLE1BRFMsQ0FDRixVQUFDQyxJQUFELEVBQVU7QUFDZCxnQkFBT1AsY0FBY1EsSUFBZCxDQUFtQkQsSUFBbkIsS0FDQSxPQUFPTCxTQUFTSyxJQUFULENBQVAsS0FBMEIsVUFEakM7QUFFSCxNQUpTLENBQWQ7O0FBTUEsU0FBSUUsb0JBQW9CTCxPQUFPTSxjQUFQLENBQXNCUixRQUF0QixDQUF4QjtBQUNBLFNBQUdPLHNCQUFzQkwsT0FBT08s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VCwyQkFBVSxpQkFBVVUsTUFBVixDQUFpQkMsUUFETDtBQUV0QlYseUJBQVEsaUJBQVVTLE1BRkk7QUFHdEJFLHdCQUFPLGlCQUFVRixNQUFWLENBQWlCRjtBQUhGLGNBQWhCLEVBSVBLO0FBTlksVUFWSixTQW1CUmxELFlBbkJRLEdBbUJPO0FBQ2xCMkMseUJBQVksaUJBQVVFO0FBREosVUFuQlAsU0F1QlJNLFlBdkJRLEdBdUJPbEMsSUF2QlA7OztBQStGbkIsZ0JBQU9FLG1CQUFQO0FBQ0gsTUFoR0Q7QUFpR0gsRSIsImZpbGUiOiIvanMvZGVidWcvVm90ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMsIENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcblxuY29uc3QgZXZlbnRNYXRjaFJlZyA9IC9eb25bQS1aXS87XG5mdW5jdGlvbiBnZXRFdmVudE1ldGhvZHNQcm9wcyhpbnN0YW5jZSl7XG4gICAgbGV0IG1ldGhvZHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhpbnN0YW5jZSlcbiAgICAgICAgLmZpbHRlcigocHJvcCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50TWF0Y2hSZWcudGVzdChwcm9wKVxuICAgICAgICAgICAgICAgICYmIHR5cGVvZiBpbnN0YW5jZVtwcm9wXSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgfSk7XG5cbiAgICBsZXQgaW5zdGFuY2VQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5zdGFuY2UpO1xuICAgIGlmKGluc3RhbmNlUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICAgIG1ldGhvZHMgPSBtZXRob2RzLmNvbmNhdChnZXRFdmVudE1ldGhvZHNQcm9wcyhpbnN0YW5jZVByb3RvdHlwZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBtZXRob2RzXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpe1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5fX2V2ZW50TmFtZXMgPSB7fTtcblxuICAgICAgICB0aGlzLl9fYmluZEZ1bmN0aW9ucygpO1xuICAgIH1cblxuICAgIF9fYmluZEZ1bmN0aW9ucygpe1xuICAgICAgICBsZXQgcHJvcHMgPSBnZXRFdmVudE1ldGhvZHNQcm9wcyh0aGlzKTtcbiAgICAgICAgZm9yKGxldCBwcm9wIG9mIHByb3BzKXtcbiAgICAgICAgICAgIGlmKCF0aGlzW3Byb3BdLmZ1bmNCaW5kZWQpe1xuICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0gPSB0aGlzW3Byb3BdLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wXS5mdW5jQmluZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uKGV2ZW50TmFtZSwgZm4pe1xuICAgICAgICBpZih0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBFcnJvcignZm4gc2hvdWxkIGJlIGEgZnVuY3Rpb24nKTtcblxuICAgICAgICBpZighdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXSl7XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnROYW1lc1tldmVudE5hbWVdID0gW2ZuXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX19ldmVudE5hbWVzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LiRldmVudEJ1cy5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZuKTtcbiAgICB9XG5cbiAgICBlbWl0KGV2ZW50TmFtZSwgLi4uYXJncyl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuJGV2ZW50QnVzLmVtaXQoZXZlbnROYW1lLCAuLi5hcmdzKTtcbiAgICB9XG5cbiAgICBvZmYoZXZlbnROYW1lLCBmbil7XG4gICAgICAgIGxldCBldmVudHMgPSB0aGlzLl9fZXZlbnROYW1lc1tldmVudE5hbWVdO1xuICAgICAgICBpZihldmVudHMpe1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gZXZlbnRzLmluZGV4T2YoZm4pO1xuXG4gICAgICAgICAgICBpZihpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LiRldmVudEJ1cy5yZW1vdmVMaXN0ZW5lcihldmVudE5hbWUsIGZuKTtcblxuICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgaWYoIWV2ZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX19ldmVudE5hbWVzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ2V2ZW50OiAnICsgZXZlbnROYW1lICsgJyBpcyBub3QgcmVnaXN0ZXJlZCBpbiAnICsgdGhpcy5fcmVhY3RJbnRlcm5hbEluc3RhbmNlLmdldE5hbWUoKSArICcgQ29tcG9uZW50Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdldmVudDogJyArIGV2ZW50TmFtZSArICcgaXMgbm90IHJlZ2lzdGVyZWQgaW4gJyArIHRoaXMuY29uc3RydWN0b3IubmFtZSArICcgQ29tcG9uZW50Jyk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIGZvcihsZXQgZXZlbnROYW1lIGluIHRoaXMuX19ldmVudE5hbWVzKXtcbiAgICAgICAgICAgIGlmKHRoaXMuX19ldmVudE5hbWVzLmhhc093blByb3BlcnR5KGV2ZW50TmFtZSkpe1xuICAgICAgICAgICAgICAgIGZvcihsZXQgZm4gb2YgdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50TmFtZSwgZm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbkJhc2UuY29udGV4dFR5cGVzID0ge1xuICAgICRldmVudEJ1czogUHJvcFR5cGVzLmluc3RhbmNlT2YoRXZlbnRFbWl0dGVyKVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0Q6L3dvcmtzcGFjZS9qYXZhc2NyaXB0L3VuaXZlcnNhbC1yZWFjdC1tb2J4L2NvbW1vbi9wYWdlcy9CYXNlLmpzeCIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgb2JzZXJ2ZXIsIGluamVjdCB9IGZyb20gJ21vYngtcmVhY3QnO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJztcclxuXHJcbmltcG9ydCBjb25uZWN0RGF0YUZldGNoZXJzIGZyb20gJy4uLy4uL3V0aWxzL2Nvbm5lY3REYXRhRmV0Y2hlcnMnO1xyXG5cclxuXHJcbi8vIEBpbmplY3QoKGFsbFN0b3JlcykgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICBWb3RlU3RvcmU6IGFsbFN0b3Jlcy5Wb3RlU3RvcmUsXHJcbi8vICAgICAgICAgY29tbW9uU3RvcmU6IGFsbFN0b3Jlcy5jb21tb25TdG9yZVxyXG4vLyAgICAgfTtcclxuLy8gfSlcclxuQG9ic2VydmVyKFsnVm90ZVN0b3JlJywgJ2NvbW1vblN0b3JlJ10pXHJcbkBjb25uZWN0RGF0YUZldGNoZXJzKFsnVm90ZVN0b3JlJ10pXHJcbmNsYXNzIFZvdGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgc3RhdGljIHBhZ2VDb25maWcgPSB7XHJcbiAgICAgICAgcGFnZUlkOiAnVm90ZSdcclxuICAgIH07XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2b3RlXCI+XHJcbiAgICAgICAgICAgICAgICB0aGlzIGlzIHZvdGVcclxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2Fib3V0P2RlYnVnPXRlc3RcIj5hYm91dDwvTGluaz5cclxuICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL3Rlc3RcIj50ZXN0PC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogeyB0aGlzLnByb3BzLlZvdGVTdG9yZS5tZXNzYWdlIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVm90ZTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vRDovd29ya3NwYWNlL2phdmFzY3JpcHQvdW5pdmVyc2FsLXJlYWN0LW1vYngvY29tbW9uL3BhZ2VzL0FwcC9Wb3RlLmpzeCIsImltcG9ydCBSZWFjdCwge1xyXG4gICAgUHJvcFR5cGVzXHJcbn0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBpbmplY3QsIG9ic2VydmVyIH0gZnJvbSAnbW9ieC1yZWFjdCc7XHJcblxyXG5pbXBvcnQgQmFzZSBmcm9tICcuLi9wYWdlcy9CYXNlJztcclxuaW1wb3J0IHsgc3RvcmVzIH0gZnJvbSAnLi4vc3RvcmVzL3NwYVN0b3Jlcy5qcyc7XHJcblxyXG5sZXQgSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRCA9IHRydWU7XHJcbmlmIChwcm9jZXNzLmJyb3dzZXIpIHtcclxuICAgIHZhciBGSVJTVF9QQUdFX0lEID0gd2luZG93Ll9fQVBQX0NPTkZJR19fLnBhZ2VJZDtcclxufVxyXG5cclxuLy8gdG9kb1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25uZWN0RGF0YUZldGNoZXJzKHN0b3JlS2V5cyA9IFtdLCBjYWNoZSkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChQYWdlKSB7XHJcbiAgICAgICAgaWYgKHByb2Nlc3MuYnJvd3Nlcikge1xyXG4gICAgICAgICAgICBpZiAoIVBhZ2UucGFnZUNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgUGFnZSBDb21wb25lbnQgc3RhdGljIHByb3BlcnkgcGFnZUNvbmZpZy5wYWdlSWQgcmVxdWlyZWQhYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBJU19GSVJTVF9NT1VOVF9BRlRFUl9MT0FEID0gUGFnZS5wYWdlQ29uZmlnLnBhZ2VJZCA9PT0gRklSU1RfUEFHRV9JRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3MgRGF0YUZldGNoZXJzV3JhcHBlciBleHRlbmRzIEJhc2Uge1xyXG4gICAgICAgICAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb246IFByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IFByb3BUeXBlcy5zdHJpbmcucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBQcm9wVHlwZXMuc3RyaW5nLm9iamVjdFxyXG4gICAgICAgICAgICAgICAgfSkuaXNSZXF1aXJlZFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcclxuICAgICAgICAgICAgICAgICRhcHBDb25maWc6IFByb3BUeXBlcy5vYmplY3RcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBPcmlnaW5hbFBhZ2UgPSBQYWdlO1xyXG5cclxuICAgICAgICAgICAgc3RhdGljIGZldGNoRGF0YSh7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbixcclxuICAgICAgICAgICAgICAgIHBhcmFtcyxcclxuICAgICAgICAgICAgICAgIGFwcENvbmZpZyxcclxuICAgICAgICAgICAgICAgIHBhZ2VDb25maWdcclxuICAgICAgICAgICAgfSwgcmVxKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdG9yZXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlS2V5cy5tYXAoc3RvcmVLZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmVzW3N0b3JlS2V5XSAmJiBzdG9yZXNbc3RvcmVLZXldLmxvYWREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZUNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHJlcSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcyAhPT0gbmV4dFByb3BzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBwcmV2TG9jYXRpb25cclxuICAgICAgICAgICAgICAgIH0gPSBwcmV2UHJvcHM7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNVcmxDaGFuZ2VkID0gKGxvY2F0aW9uLnBhdGhuYW1lICE9PSBwcmV2TG9jYXRpb24ucGF0aG5hbWUpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKGxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSAhPT0gcHJldkxvY2F0aW9uLnNlYXJjaC5zbGljZSgxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzVXJsQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZldGNoRGF0YU9uQ2xpZW50KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjYWNoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9mZXRjaERhdGFPbkNsaWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUlTX0ZJUlNUX01PVU5UX0FGVEVSX0xPQUQgJiYgIVBhZ2UuREFUQV9MT0FERUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmV0Y2hEYXRhT25DbGllbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFBhZ2UuREFUQV9MT0FERUQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIElTX0ZJUlNUX01PVU5UX0FGVEVSX0xPQUQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX2ZldGNoRGF0YU9uQ2xpZW50KCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5mZXRjaERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogdGhpcy5wcm9wcy5wYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IHRoaXMucHJvcHMubG9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwQ29uZmlnOiB0aGlzLmNvbnRleHQuJGFwcENvbmZpZ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlbmRlcigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoIFxyXG4gICAgICAgICAgICAgICAgICAgIDxQYWdlIHsuLi50aGlzLnByb3BzIH0vPlxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIERhdGFGZXRjaGVyc1dyYXBwZXI7XHJcbiAgICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0Q6L3dvcmtzcGFjZS9qYXZhc2NyaXB0L3VuaXZlcnNhbC1yZWFjdC1tb2J4L2NvbW1vbi91dGlscy9jb25uZWN0RGF0YUZldGNoZXJzLmpzeCJdLCJzb3VyY2VSb290IjoiIn0=