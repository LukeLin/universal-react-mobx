webpackJsonp([0],{

/***/ 50:
/*!*******************************!*\
  !*** ./common/pages/Base.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = undefined;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 16);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 15);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 10);
	
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

/***/ 103:
/*!***********************************!*\
  !*** ./common/pages/App/Vote.jsx ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 16);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 15);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _dec, _dec2, _class, _class2, _temp;
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 26);
	
	var _reactRouter = __webpack_require__(/*! react-router */ 90);
	
	var _connectDataFetchers = __webpack_require__(/*! ../../utils/connectDataFetchers */ 138);
	
	var _connectDataFetchers2 = _interopRequireDefault(_connectDataFetchers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Vote = (_dec = (0, _mobxReact.observer)(['commonStore']), _dec2 = (0, _connectDataFetchers2.default)(['VoteStore']), _dec(_class = _dec2(_class = (_temp = _class2 = function (_Component) {
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
	            this.props.message
	        );
	    };
	
	    return Vote;
	}(_react.Component), _class2.pageConfig = {
	    pageId: 'Vote'
	}, _temp)) || _class) || _class);
	exports.default = Vote;

/***/ },

/***/ 138:
/*!**********************************************!*\
  !*** ./common/utils/connectDataFetchers.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 16);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 15);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	exports.default = connectDataFetchers;
	
	var _react = __webpack_require__(/*! react */ 10);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _mobxReact = __webpack_require__(/*! mobx-react */ 26);
	
	var _Base2 = __webpack_require__(/*! ../pages/Base */ 50);
	
	var _Base3 = _interopRequireDefault(_Base2);
	
	var _spaStores = __webpack_require__(/*! ../stores/spaStores.js */ 104);
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/node-libs-browser/~/process/browser.js */ 38)))

/***/ }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9EOi93b3Jrc3BhY2UvamF2YXNjcmlwdC91bml2ZXJzYWwtcmVhY3QtbW9ieC9jb21tb24vcGFnZXMvQmFzZS5qc3giLCJ3ZWJwYWNrOi8vLy4vRDovd29ya3NwYWNlL2phdmFzY3JpcHQvdW5pdmVyc2FsLXJlYWN0LW1vYngvY29tbW9uL3BhZ2VzL0FwcC9Wb3RlLmpzeCIsIndlYnBhY2s6Ly8vLi9EOi93b3Jrc3BhY2UvamF2YXNjcmlwdC91bml2ZXJzYWwtcmVhY3QtbW9ieC9jb21tb24vdXRpbHMvY29ubmVjdERhdGFGZXRjaGVycy5qc3giXSwibmFtZXMiOlsiZXZlbnRNYXRjaFJlZyIsImdldEV2ZW50TWV0aG9kc1Byb3BzIiwiaW5zdGFuY2UiLCJtZXRob2RzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZpbHRlciIsInByb3AiLCJ0ZXN0IiwiaW5zdGFuY2VQcm90b3R5cGUiLCJnZXRQcm90b3R5cGVPZiIsInByb3RvdHlwZSIsImNvbmNhdCIsIkJhc2UiLCJwcm9wcyIsImNvbnRleHQiLCJfX2V2ZW50TmFtZXMiLCJfX2JpbmRGdW5jdGlvbnMiLCJmdW5jQmluZGVkIiwiYmluZCIsIm9uIiwiZXZlbnROYW1lIiwiZm4iLCJFcnJvciIsInB1c2giLCIkZXZlbnRCdXMiLCJhZGRMaXN0ZW5lciIsImVtaXQiLCJhcmdzIiwib2ZmIiwiZXZlbnRzIiwiaW5kZXgiLCJpbmRleE9mIiwicmVtb3ZlTGlzdGVuZXIiLCJzcGxpY2UiLCJsZW5ndGgiLCJjb25zb2xlIiwid2FybiIsIl9yZWFjdEludGVybmFsSW5zdGFuY2UiLCJnZXROYW1lIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnRleHRUeXBlcyIsImluc3RhbmNlT2YiLCJWb3RlIiwicmVuZGVyIiwibWVzc2FnZSIsInBhZ2VDb25maWciLCJwYWdlSWQiLCJjb25uZWN0RGF0YUZldGNoZXJzIiwiSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRCIsInByb2Nlc3MiLCJicm93c2VyIiwiRklSU1RfUEFHRV9JRCIsIndpbmRvdyIsIl9fQVBQX0NPTkZJR19fIiwic3RvcmVLZXlzIiwiY2FjaGUiLCJQYWdlIiwiZXJyb3IiLCJEYXRhRmV0Y2hlcnNXcmFwcGVyIiwiZmV0Y2hEYXRhIiwicmVxIiwibG9jYXRpb24iLCJwYXJhbXMiLCJhcHBDb25maWciLCJsb2ciLCJQcm9taXNlIiwiYWxsIiwibWFwIiwic3RvcmVLZXkiLCJsb2FkRGF0YSIsInNob3VsZENvbXBvbmVudFVwZGF0ZSIsIm5leHRQcm9wcyIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZMb2NhdGlvbiIsImlzVXJsQ2hhbmdlZCIsInBhdGhuYW1lIiwic2VhcmNoIiwic2xpY2UiLCJfZmV0Y2hEYXRhT25DbGllbnQiLCJjb21wb25lbnREaWRNb3VudCIsIkRBVEFfTE9BREVEIiwiJGFwcENvbmZpZyIsInByb3BUeXBlcyIsIm9iamVjdCIsInNoYXBlIiwic3RyaW5nIiwicmVxdWlyZWQiLCJxdWVyeSIsImlzUmVxdWlyZWQiLCJPcmlnaW5hbFBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxLQUFNQSxnQkFBZ0IsVUFBdEI7QUFDQSxVQUFTQyxvQkFBVCxDQUE4QkMsUUFBOUIsRUFBdUM7QUFDbkMsU0FBSUMsVUFBVUMsT0FBT0MsbUJBQVAsQ0FBMkJILFFBQTNCLEVBQ1RJLE1BRFMsQ0FDRixVQUFDQyxJQUFELEVBQVU7QUFDZCxnQkFBT1AsY0FBY1EsSUFBZCxDQUFtQkQsSUFBbkIsS0FDQSxPQUFPTCxTQUFTSyxJQUFULENBQVAsS0FBMEIsVUFEakM7QUFFSCxNQUpTLENBQWQ7O0FBTUEsU0FBSUUsb0JBQW9CTCxPQUFPTSxjQUFQLENBQXNCUixRQUF0QixDQUF4QjtBQUNBLFNBQUdPLHNCQUFzQkwsT0FBT08sU0FBaEMsRUFBMkM7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QkFBTyxpQkFBVUYsTUFBVixDQUFpQkY7QUFIRixjQUFoQixFQUlQSztBQU5ZLFVBVkosU0FtQlJqRCxZQW5CUSxHQW1CTztBQUNsQjBDLHlCQUFZLGlCQUFVRTtBQURKLFVBbkJQLFNBdUJSTSxZQXZCUSxHQXVCT2xDLElBdkJQOzs7QUErRm5CLGdCQUFPRSxtQkFBUDtBQUNILE1BaEdEO0FBaUdILEUiLCJmaWxlIjoiL2pzL2RlYnVnL1ZvdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzLCBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cyc7XG5cbmNvbnN0IGV2ZW50TWF0Y2hSZWcgPSAvXm9uW0EtWl0vO1xuZnVuY3Rpb24gZ2V0RXZlbnRNZXRob2RzUHJvcHMoaW5zdGFuY2Upe1xuICAgIGxldCBtZXRob2RzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5zdGFuY2UpXG4gICAgICAgIC5maWx0ZXIoKHByb3ApID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudE1hdGNoUmVnLnRlc3QocHJvcClcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgaW5zdGFuY2VbcHJvcF0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgIH0pO1xuXG4gICAgbGV0IGluc3RhbmNlUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGluc3RhbmNlKTtcbiAgICBpZihpbnN0YW5jZVByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICBtZXRob2RzID0gbWV0aG9kcy5jb25jYXQoZ2V0RXZlbnRNZXRob2RzUHJvcHMoaW5zdGFuY2VQcm90b3R5cGUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWV0aG9kc1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KXtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIHRoaXMuX19ldmVudE5hbWVzID0ge307XG5cbiAgICAgICAgdGhpcy5fX2JpbmRGdW5jdGlvbnMoKTtcbiAgICB9XG5cbiAgICBfX2JpbmRGdW5jdGlvbnMoKXtcbiAgICAgICAgbGV0IHByb3BzID0gZ2V0RXZlbnRNZXRob2RzUHJvcHModGhpcyk7XG4gICAgICAgIGZvcihsZXQgcHJvcCBvZiBwcm9wcyl7XG4gICAgICAgICAgICBpZighdGhpc1twcm9wXS5mdW5jQmluZGVkKXtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BdID0gdGhpc1twcm9wXS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0uZnVuY0JpbmRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbihldmVudE5hbWUsIGZuKXtcbiAgICAgICAgaWYodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgRXJyb3IoJ2ZuIHNob3VsZCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgICAgICAgaWYoIXRoaXMuX19ldmVudE5hbWVzW2V2ZW50TmFtZV0pe1xuICAgICAgICAgICAgdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXSA9IFtmbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9fZXZlbnROYW1lc1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC4kZXZlbnRCdXMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCBmbik7XG4gICAgfVxuXG4gICAgZW1pdChldmVudE5hbWUsIC4uLmFyZ3Mpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LiRldmVudEJ1cy5lbWl0KGV2ZW50TmFtZSwgLi4uYXJncyk7XG4gICAgfVxuXG4gICAgb2ZmKGV2ZW50TmFtZSwgZm4pe1xuICAgICAgICBsZXQgZXZlbnRzID0gdGhpcy5fX2V2ZW50TmFtZXNbZXZlbnROYW1lXTtcbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGV2ZW50cy5pbmRleE9mKGZuKTtcblxuICAgICAgICAgICAgaWYoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC4kZXZlbnRCdXMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBmbik7XG5cbiAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIGlmKCFldmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9fZXZlbnROYW1lc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdldmVudDogJyArIGV2ZW50TmFtZSArICcgaXMgbm90IHJlZ2lzdGVyZWQgaW4gJyArIHRoaXMuX3JlYWN0SW50ZXJuYWxJbnN0YW5jZS5nZXROYW1lKCkgKyAnIENvbXBvbmVudCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignZXZlbnQ6ICcgKyBldmVudE5hbWUgKyAnIGlzIG5vdCByZWdpc3RlcmVkIGluICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgKyAnIENvbXBvbmVudCcpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xuICAgICAgICBmb3IobGV0IGV2ZW50TmFtZSBpbiB0aGlzLl9fZXZlbnROYW1lcyl7XG4gICAgICAgICAgICBpZih0aGlzLl9fZXZlbnROYW1lcy5oYXNPd25Qcm9wZXJ0eShldmVudE5hbWUpKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGZuIG9mIHRoaXMuX19ldmVudE5hbWVzW2V2ZW50TmFtZV0pe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZihldmVudE5hbWUsIGZuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5CYXNlLmNvbnRleHRUeXBlcyA9IHtcbiAgICAkZXZlbnRCdXM6IFByb3BUeXBlcy5pbnN0YW5jZU9mKEV2ZW50RW1pdHRlcilcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9EOi93b3Jrc3BhY2UvamF2YXNjcmlwdC91bml2ZXJzYWwtcmVhY3QtbW9ieC9jb21tb24vcGFnZXMvQmFzZS5qc3giLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IG9ic2VydmVyIH0gZnJvbSAnbW9ieC1yZWFjdCc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xyXG5cclxuaW1wb3J0IGNvbm5lY3REYXRhRmV0Y2hlcnMgZnJvbSAnLi4vLi4vdXRpbHMvY29ubmVjdERhdGFGZXRjaGVycyc7XHJcblxyXG5cclxuQG9ic2VydmVyKFsnY29tbW9uU3RvcmUnXSlcclxuQGNvbm5lY3REYXRhRmV0Y2hlcnMoWydWb3RlU3RvcmUnXSlcclxuY2xhc3MgVm90ZSBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgcGFnZUNvbmZpZyA9IHtcclxuICAgICAgICBwYWdlSWQ6ICdWb3RlJ1xyXG4gICAgfTtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZvdGVcIj5cclxuICAgICAgICAgICAgICAgIHRoaXMgaXMgdm90ZVxyXG4gICAgICAgICAgICAgICAgPExpbmsgdG89XCIvYWJvdXQ/ZGVidWc9dGVzdFwiPmFib3V0PC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPExpbmsgdG89XCIvdGVzdFwiPnRlc3Q8L0xpbms+XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7IHRoaXMucHJvcHMubWVzc2FnZSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZvdGU7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0Q6L3dvcmtzcGFjZS9qYXZhc2NyaXB0L3VuaXZlcnNhbC1yZWFjdC1tb2J4L2NvbW1vbi9wYWdlcy9BcHAvVm90ZS5qc3giLCJpbXBvcnQgUmVhY3QsIHtcclxuICAgIFByb3BUeXBlc1xyXG59IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgaW5qZWN0LCBvYnNlcnZlciB9IGZyb20gJ21vYngtcmVhY3QnO1xyXG5cclxuaW1wb3J0IEJhc2UgZnJvbSAnLi4vcGFnZXMvQmFzZSc7XHJcbmltcG9ydCB7IHN0b3JlcyB9IGZyb20gJy4uL3N0b3Jlcy9zcGFTdG9yZXMuanMnO1xyXG5cclxubGV0IElTX0ZJUlNUX01PVU5UX0FGVEVSX0xPQUQgPSB0cnVlO1xyXG5pZiAocHJvY2Vzcy5icm93c2VyKSB7XHJcbiAgICB2YXIgRklSU1RfUEFHRV9JRCA9IHdpbmRvdy5fX0FQUF9DT05GSUdfXy5wYWdlSWQ7XHJcbn1cclxuXHJcbi8vIHRvZG9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29ubmVjdERhdGFGZXRjaGVycyhzdG9yZUtleXMgPSBbXSwgY2FjaGUpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoUGFnZSkge1xyXG4gICAgICAgIGlmIChwcm9jZXNzLmJyb3dzZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFQYWdlLnBhZ2VDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFBhZ2UgQ29tcG9uZW50IHN0YXRpYyBwcm9wZXJ5IHBhZ2VDb25maWcucGFnZUlkIHJlcXVpcmVkIWApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgSVNfRklSU1RfTU9VTlRfQUZURVJfTE9BRCA9IFBhZ2UucGFnZUNvbmZpZy5wYWdlSWQgPT09IEZJUlNUX1BBR0VfSUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIERhdGFGZXRjaGVyc1dyYXBwZXIgZXh0ZW5kcyBCYXNlIHtcclxuICAgICAgICAgICAgc3RhdGljIHByb3BUeXBlcyA9IHtcclxuICAgICAgICAgICAgICAgIHBhcmFtczogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogUHJvcFR5cGVzLnN0cmluZy5vYmplY3RcclxuICAgICAgICAgICAgICAgIH0pLmlzUmVxdWlyZWRcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBjb250ZXh0VHlwZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAkYXBwQ29uZmlnOiBQcm9wVHlwZXMub2JqZWN0XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgT3JpZ2luYWxQYWdlID0gUGFnZTtcclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBmZXRjaERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24sXHJcbiAgICAgICAgICAgICAgICBwYXJhbXMsXHJcbiAgICAgICAgICAgICAgICBhcHBDb25maWcsXHJcbiAgICAgICAgICAgICAgICBwYWdlQ29uZmlnXHJcbiAgICAgICAgICAgIH0sIHJlcSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RvcmVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUtleXMubWFwKHN0b3JlS2V5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3Jlc1tzdG9yZUtleV0gJiYgc3RvcmVzW3N0b3JlS2V5XS5sb2FkRGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcENvbmZpZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VDb25maWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LCByZXEpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMgIT09IG5leHRQcm9wcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICAgICAgICAgIGNvbnN0IHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogcHJldkxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB9ID0gcHJldlByb3BzO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzVXJsQ2hhbmdlZCA9IChsb2NhdGlvbi5wYXRobmFtZSAhPT0gcHJldkxvY2F0aW9uLnBhdGhuYW1lKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIChsb2NhdGlvbi5zZWFyY2guc2xpY2UoMSkgIT09IHByZXZMb2NhdGlvbi5zZWFyY2guc2xpY2UoMSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1VybENoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mZXRjaERhdGFPbkNsaWVudCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUlTX0ZJUlNUX01PVU5UX0FGVEVSX0xPQUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmV0Y2hEYXRhT25DbGllbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIElTX0ZJUlNUX01PVU5UX0FGVEVSX0xPQUQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFJU19GSVJTVF9NT1VOVF9BRlRFUl9MT0FEICYmICFQYWdlLkRBVEFfTE9BREVEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZldGNoRGF0YU9uQ2xpZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBQYWdlLkRBVEFfTE9BREVEID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBJU19GSVJTVF9NT1VOVF9BRlRFUl9MT0FEID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9mZXRjaERhdGFPbkNsaWVudCgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuZmV0Y2hEYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMucHJvcHMucGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB0aGlzLnByb3BzLmxvY2F0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGFwcENvbmZpZzogdGhpcy5jb250ZXh0LiRhcHBDb25maWdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKCBcclxuICAgICAgICAgICAgICAgICAgICA8UGFnZSB7Li4udGhpcy5wcm9wcyB9Lz5cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBEYXRhRmV0Y2hlcnNXcmFwcGVyO1xyXG4gICAgfTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9EOi93b3Jrc3BhY2UvamF2YXNjcmlwdC91bml2ZXJzYWwtcmVhY3QtbW9ieC9jb21tb24vdXRpbHMvY29ubmVjdERhdGFGZXRjaGVycy5qc3giXSwic291cmNlUm9vdCI6IiJ9