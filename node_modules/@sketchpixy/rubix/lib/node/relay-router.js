'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.setNetworkLayer = setNetworkLayer;
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

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

var _isomorphicRelay = require('isomorphic-relay');

var _isomorphicRelay2 = _interopRequireDefault(_isomorphicRelay);

var _isomorphicRelayRouter = require('@sketchpixy/isomorphic-relay-router');

var _isomorphicRelayRouter2 = _interopRequireDefault(_isomorphicRelayRouter);

var _reactRouterScroll = require('@sketchpixy/react-router-scroll');

var _reactRouterScroll2 = _interopRequireDefault(_reactRouterScroll);

var _onRouterSetup = require('./onRouterSetup');

var _onRouterSetup2 = _interopRequireDefault(_onRouterSetup);

var _checkScroll = require('./checkScroll');

var _checkScroll2 = _interopRequireDefault(_checkScroll);

var _isBrowser = require('../isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ((0, _isBrowser2.default)()) {
  (0, _onRouterSetup2.default)();
}

var GRAPHQL_URL = 'http://localhost:8080/graphql',
    CLIENT_GRAPHQL_URL = '/graphql',
    networkLayer;

function setNetworkLayer(endpoint) {
  if ((0, _isBrowser2.default)()) {
    CLIENT_GRAPHQL_URL = endpoint;
  } else {
    GRAPHQL_URL = endpoint || GRAPHQL_URL;

    networkLayer = !(0, _isBrowser2.default)() ? new _reactRelay2.default.DefaultNetworkLayer(GRAPHQL_URL) : null;
  }
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

function render(Component, onRender) {
  if (!onRender) onRender = function onRender() {};

  if ((0, _isBrowser2.default)()) {
    (function () {
      // in browser
      var history = Modernizr.history ? _reactRouter.browserHistory : _reactRouter.hashHistory;

      var environment = new _reactRelay2.default.Environment();
      environment.injectNetworkLayer(new _reactRelay2.default.DefaultNetworkLayer(CLIENT_GRAPHQL_URL));

      var preloadedData = document.getElementById('preloadedData');
      var data = preloadedData ? JSON.parse(preloadedData.textContent) : '';
      _isomorphicRelay2.default.injectPreparedData(environment, data);

      (0, _reactRouter.match)({ routes: Component, history: history }, function (error, redirectLocation, renderProps) {
        _isomorphicRelayRouter2.default.prepareInitialRender(environment, renderProps).then(function (props) {
          _reactDom2.default.render(_react2.default.createElement(
            _reactHotLoader.AppContainer,
            null,
            _react2.default.createElement(_reactRouter.Router, props)
          ), document.getElementById('app-container'), onRender);
        });
      });
    })();
  }
}

function renderIRData(_ref) {
  var data = _ref.data,
      props = _ref.props;

  var content = null;

  try {
    content = _server2.default.renderToString(_react2.default.createElement(
      _reactHotLoader.AppContainer,
      null,
      _isomorphicRelayRouter2.default.render(props)
    ));
  } catch (e) {
    // do nothing
  }

  return {
    content: content,
    data: data
  };
}

function renderHTMLString(routes, req, callback) {
  // in server
  (0, _reactRouter.match)({ routes: routes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      callback(error);
    } else if (redirectLocation) {
      callback(null, redirectLocation);
    } else if (renderProps) {
      _isomorphicRelayRouter2.default.prepareData(renderProps, networkLayer).then(renderIRData).then(function (data) {
        callback(null, null, data);
      }).catch(callback);
    } else {
      callback({
        message: 'Not found'
      });
    }
  });
}