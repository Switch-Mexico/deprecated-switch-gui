'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.setupReducers = setupReducers;
exports.replaceReducers = replaceReducers;
exports.applyMiddleware = applyMiddleware;
exports.createReduxStore = createReduxStore;
exports.default = render;
exports.renderHTMLString = renderHTMLString;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require('react-router');

var _reactHotLoader = require('react-hot-loader');

var _reactRouterScroll = require('@sketchpixy/react-router-scroll');

var _reactRouterScroll2 = _interopRequireDefault(_reactRouterScroll);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxFetchData = require('@sketchpixy/redux-fetch-data');

var _utils = require('@sketchpixy/redux-fetch-data/lib/utils');

var _onRouterSetup = require('./onRouterSetup');

var _onRouterSetup2 = _interopRequireDefault(_onRouterSetup);

var _onRouterUpdate = require('./onRouterUpdate');

var _onRouterUpdate2 = _interopRequireDefault(_onRouterUpdate);

var _checkScroll = require('./checkScroll');

var _checkScroll2 = _interopRequireDefault(_checkScroll);

var _isBrowser = require('../isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ((0, _isBrowser2.default)()) {
  (0, _onRouterSetup2.default)();
}

var WrapperComponent = function (_React$Component) {
  (0, _inherits3.default)(WrapperComponent, _React$Component);

  function WrapperComponent() {
    (0, _classCallCheck3.default)(this, WrapperComponent);
    return (0, _possibleConstructorReturn3.default)(this, (WrapperComponent.__proto__ || (0, _getPrototypeOf2.default)(WrapperComponent)).apply(this, arguments));
  }

  (0, _createClass3.default)(WrapperComponent, [{
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return WrapperComponent;
}(_react2.default.Component);

var isRouterSet = false,
    history,
    reducer,
    store,
    routes;

function setupReducers(reducers) {
  reducer = (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    fetching: _reduxFetchData.reducer,
    routing: _reactRouterRedux.routerReducer
  }));
}

function replaceReducers(reducers) {
  setupReducers(reducers);
  store.replaceReducer(reducer);
}

function preloadedData() {
  return document.getElementById('preloadedData');
}

function getData() {
  var element = preloadedData();
  return element ? JSON.parse(element.textContent || "{}") : '';
}

var middlewares = [_reduxThunk2.default];
function applyMiddleware() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length) {
    middlewares = middlewares.concat(args);
  }
}

function createStoreWithMiddleware() {
  return (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middlewares)), (0, _isBrowser2.default)() && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
    return f;
  })(_redux.createStore);
}

function createReduxStore(initialState) {
  return createStoreWithMiddleware()(reducer, initialState);
}

function onFetchData(props) {
  // onRouterUpdate();
  var container = document.getElementById('container');
  if (container) {
    container.scrollTop = 0;
  }
  return _react2.default.createElement(_reduxFetchData.FetchData, props);
}

function render(Component, onRender) {
  if (!onRender) onRender = function onRender() {};

  if ((0, _isBrowser2.default)()) {
    // in browser

    if (!isRouterSet) {
      isRouterSet = true;
      history = Modernizr.history ? _reactRouter.browserHistory : _reactRouter.hashHistory;

      var initialState = getData();
      store = createReduxStore(initialState);
      history = (0, _reactRouterRedux.syncHistoryWithStore)(history, store);

      routes = _react2.default.createElement(
        _reactRedux.Provider,
        { store: store, key: 'provider' },
        _react2.default.createElement(
          _reactRouter.Router,
          { history: history,
            render: onFetchData },
          Component
        )
      );
    }

    _reactDom2.default.render(_react2.default.createElement(
      _reactHotLoader.AppContainer,
      null,
      _react2.default.createElement(
        WrapperComponent,
        null,
        routes
      )
    ), document.getElementById('app-container'), onRender);
  }
}

function renderHTMLString(routes, req, callback) {
  var store = createReduxStore();

  // in server
  (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (!renderProps) {
      callback('renderProps not defined!');
      return;
    }

    (0, _reduxFetchData.fetchDataOnServer)(renderProps, store).then(function () {
      if (error) {
        callback(error);
      } else if (redirectLocation) {
        callback(null, redirectLocation);
      } else if (renderProps) {
        var content = null;

        try {
          content = _server2.default.renderToString(_react2.default.createElement(
            _reactHotLoader.AppContainer,
            null,
            _react2.default.createElement(
              _reactRedux.Provider,
              { store: store, key: 'provider' },
              _react2.default.createElement(_reactRouter.RouterContext, renderProps)
            )
          ));
        } catch (e) {
          // do nothing
        }

        callback(null, null, {
          content: content,
          data: store.getState()
        });
      } else {
        callback({
          message: 'Not found'
        });
      }
    }).catch(callback);
  });
}