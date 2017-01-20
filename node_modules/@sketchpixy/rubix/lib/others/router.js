'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = render;
exports.setRoutes = setRoutes;
exports.getCsrfToken = getCsrfToken;

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

var _onRouterSetup = require('../node/onRouterSetup');

var _onRouterSetup2 = _interopRequireDefault(_onRouterSetup);

var _checkScroll = require('../node/checkScroll');

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
    routes;

function getPreloadedDataElement() {
  return document.getElementById('preloadedData');
}

function getData() {
  var data = '""';
  if ((0, _isBrowser2.default)()) {
    var preloadedData = getPreloadedDataElement();
    data = preloadedData ? JSON.parse(preloadedData.textContent) : '""';
  }
  return data;
}

function clearData() {
  if ((0, _isBrowser2.default)()) {
    var preloadedData = getPreloadedDataElement();
    if (preloadedData) {
      preloadedData.textContent = '""';
    }
  }
}

var FetchData = function (_React$Component2) {
  (0, _inherits3.default)(FetchData, _React$Component2);

  function FetchData() {
    var _ref;

    (0, _classCallCheck3.default)(this, FetchData);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = FetchData.__proto__ || (0, _getPrototypeOf2.default)(FetchData)).call.apply(_ref, [this].concat(args)));

    var props = args[0];

    _this2.originalData = props.data || getData() || '""';

    _this2.state = {
      data: props.data || getData() || '""'
    };
    return _this2;
  }

  (0, _createClass3.default)(FetchData, [{
    key: 'fetchData',
    value: function fetchData(props) {
      var _this3 = this;

      if ((0, _isBrowser2.default)()) {
        var component = props.component;

        if (component.fetchData) {
          component.fetchData(props).then(function (result) {
            _this3.setState({
              data: result.data,
              errors: result.errors
            });
          });
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.fetchData(nextProps);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if ((0, _isBrowser2.default)()) {
        // clear server data once rendered
        clearData();

        var component = this.props.component;

        if (component.fetchDataOnPageLoad) {
          this.fetchData(this.props);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          routerProps = _props.routerProps;

      var Component = component;
      return _react2.default.createElement(Component, (0, _extends3.default)({}, routerProps, { data: this.state.data }));
    }
  }]);
  return FetchData;
}(_react2.default.Component);

function onCreateElement(Component, routerProps) {
  return _react2.default.createElement(FetchData, { component: Component, routerProps: routerProps });
}

function render(Component, onRender) {
  if (!onRender) onRender = function onRender() {};

  if ((0, _isBrowser2.default)()) {
    // in browser

    if (!isRouterSet) {
      isRouterSet = true;
      history = Modernizr.history ? _reactRouter.browserHistory : _reactRouter.hashHistory;
      routes = _react2.default.createElement(
        _reactRouter.Router,
        { history: history,
          createElement: onCreateElement,
          render: (0, _reactRouter.applyRouterMiddleware)((0, _reactRouterScroll2.default)(_checkScroll2.default)) },
        Component
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

var StaticComponentInternal = function (_React$Component3) {
  (0, _inherits3.default)(StaticComponentInternal, _React$Component3);

  function StaticComponentInternal() {
    (0, _classCallCheck3.default)(this, StaticComponentInternal);
    return (0, _possibleConstructorReturn3.default)(this, (StaticComponentInternal.__proto__ || (0, _getPrototypeOf2.default)(StaticComponentInternal)).apply(this, arguments));
  }

  (0, _createClass3.default)(StaticComponentInternal, [{
    key: 'render',
    value: function render() {
      var Handler = null,
          props = this.props,
          data = props.data || '""';

      var location = this.props.path + (this.props.query ? '?' + this.props.query : '');

      (0, _reactRouter.match)({ routes: routes, location: location }, function (error, redirectLocation, renderProps) {
        Handler = _react2.default.createElement(
          _reactHotLoader.AppContainer,
          null,
          _react2.default.createElement(_reactRouter.RouterContext, (0, _extends3.default)({}, renderProps, {
            createElement: function createElement(Component, routerProps) {
              return _react2.default.createElement(FetchData, { component: Component,
                routerProps: routerProps,
                data: data });
            } }))
        );
      });

      return Handler;
    }
  }]);
  return StaticComponentInternal;
}(_react2.default.Component);

function setRoutes(_routes) {
  routes = _routes;
}

function getCsrfToken() {
  if (!(0, _isBrowser2.default)()) return "";
  var el = document.getElementById('csrfToken') || document.querySelectorAll('[name=csrf-token]')[0];

  if (el) {
    if (el.textContent.length) {
      return el.textContent.trim();
    } else {
      return el.getAttribute('content');
    }
  }
}

if (!(0, _isBrowser2.default)()) {
  global.StaticComponent = StaticComponentInternal;
}