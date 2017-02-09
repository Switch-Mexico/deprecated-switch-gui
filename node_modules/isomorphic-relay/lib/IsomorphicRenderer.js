'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INACTIVE_READY_STATE = {
  aborted: false,
  done: false,
  error: null,
  ready: false,
  stale: false
};

var IsomorphicRenderer = function (_React$Component) {
  (0, _inherits3.default)(IsomorphicRenderer, _React$Component);

  function IsomorphicRenderer(props, context) {
    (0, _classCallCheck3.default)(this, IsomorphicRenderer);

    var _this = (0, _possibleConstructorReturn3.default)(this, _React$Component.call(this, props, context));

    _this.mounted = true;
    _this.pendingRequest = null;
    _this.state = {
      active: !!props.initialReadyState,
      readyState: props.initialReadyState || INACTIVE_READY_STATE,
      retry: _this._retry.bind(_this)
    };
    return _this;
  }

  IsomorphicRenderer.prototype.componentDidMount = function componentDidMount() {
    var readyState = this.state.readyState;

    if (!readyState || !readyState.done) {
      this._runQueries(this.props);
    }
  };

  IsomorphicRenderer.prototype._runQueries = function _runQueries(_ref) {
    var _this2 = this;

    var Container = _ref.Container,
        forceFetch = _ref.forceFetch,
        queryConfig = _ref.queryConfig,
        environment = _ref.environment,
        shouldFetch = _ref.shouldFetch;

    if (!shouldFetch) {
      return;
    }

    var onReadyStateChange = function onReadyStateChange(readyState) {
      if (!_this2.mounted) {
        _this2._handleReadyStateChange((0, _extends3.default)({}, readyState, { mounted: false }));
        return;
      }

      if (request !== _this2.pendingRequest) {
        return;
      }

      if (readyState.aborted || readyState.done || readyState.error) {
        _this2.pendingRequest = null;
      }

      _this2.setState({
        active: true,
        readyState: readyState
      });
    };

    if (this.pendingRequest) {
      this.pendingRequest.abort();
    }

    var querySet = _reactRelay2.default.getQueries(Container, queryConfig);
    var request = this.pendingRequest = environment[forceFetch ? 'forceFetch' : 'primeCache'](querySet, onReadyStateChange);
  };

  IsomorphicRenderer.prototype._retry = function _retry() {
    var readyState = this.state.readyState;

    if (readyState && readyState.error) {
      this._runQueries(this.props);
      this.setState({ readyState: null });
    }
  };

  IsomorphicRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.Container !== this.props.Container || nextProps.environment !== this.props.environment || nextProps.queryConfig !== this.props.queryConfig || nextProps.shouldFetch && !this.props.shouldFetch || nextProps.forceFetch && !this.props.forceFetch) {
      this._runQueries(nextProps);
      this.setState({ readyState: null });
    }
  };

  IsomorphicRenderer.prototype.componentDidUpdate = function componentDidUpdate(_ref2, prevState) {
    (0, _objectDestructuringEmpty3.default)(_ref2);
    var readyState = this.state.readyState;

    if (readyState && readyState !== prevState.readyState) {
      this._handleReadyStateChange((0, _extends3.default)({}, readyState, { mounted: true }));
    }
  };

  IsomorphicRenderer.prototype._handleReadyStateChange = function _handleReadyStateChange(readyState) {
    if (this.props.onReadyStateChange) {
      this.props.onReadyStateChange(readyState);
    }
  };

  IsomorphicRenderer.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.pendingRequest) {
      this.pendingRequest.abort();
    }

    this.mounted = false;
  };

  IsomorphicRenderer.prototype.render = function render() {
    var readyState = this.state.active ? this.state.readyState : INACTIVE_READY_STATE;

    return _react2.default.createElement(_reactRelay2.default.ReadyStateRenderer, {
      Container: this.props.Container,
      environment: this.props.environment,
      queryConfig: this.props.queryConfig,
      readyState: readyState,
      render: this.props.render,
      retry: this.state.retry
    });
  };

  return IsomorphicRenderer;
}(_react2.default.Component);

exports.default = IsomorphicRenderer;


IsomorphicRenderer.propTypes = {
  Container: _reactRelay2.default.PropTypes.Container,
  forceFetch: _react2.default.PropTypes.bool,
  initialReadyState: _react2.default.PropTypes.shape({
    aborted: _react2.default.PropTypes.bool.isRequired,
    done: _react2.default.PropTypes.bool.isRequired,
    error: _react2.default.PropTypes.any,
    ready: _react2.default.PropTypes.bool.isRequired,
    stale: _react2.default.PropTypes.bool.isRequired
  }),
  onReadyStateChange: _react2.default.PropTypes.func,
  queryConfig: _reactRelay2.default.PropTypes.QueryConfig.isRequired,
  environment: _reactRelay2.default.PropTypes.Environment,
  render: _react2.default.PropTypes.func,
  shouldFetch: _react2.default.PropTypes.bool
};

IsomorphicRenderer.defaultProps = {
  shouldFetch: true
};