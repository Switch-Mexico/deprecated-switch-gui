'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _isomorphicRelay = require('isomorphic-relay');

var _isomorphicRelay2 = _interopRequireDefault(_isomorphicRelay);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RelayRouterContext2 = require('@sketchpixy/react-router-relay/lib/RelayRouterContext');

var _RelayRouterContext3 = _interopRequireDefault(_RelayRouterContext2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IsomorphicRelayRouterContext = function (_RelayRouterContext) {
  (0, _inherits3.default)(IsomorphicRelayRouterContext, _RelayRouterContext);

  function IsomorphicRelayRouterContext(props, context) {
    (0, _classCallCheck3.default)(this, IsomorphicRelayRouterContext);

    var _this = (0, _possibleConstructorReturn3.default)(this, _RelayRouterContext.call(this, props, context));

    if (props.queryAggregator) {
      _this.queryAggregator = props.queryAggregator;
    }
    return _this;
  }

  IsomorphicRelayRouterContext.prototype.render = function render() {
    return _react2.default.createElement(_isomorphicRelay2.default.Renderer, (0, _extends3.default)({}, this.props, {
      Container: this.queryAggregator.Container,
      queryConfig: this.queryAggregator.queryConfig,
      render: this.renderCallback
    }));
  };

  return IsomorphicRelayRouterContext;
}(_RelayRouterContext3.default);

exports.default = IsomorphicRelayRouterContext;


IsomorphicRelayRouterContext.propTypes = _RelayRouterContext3.default.propTypes;
IsomorphicRelayRouterContext.childContextTypes = _RelayRouterContext3.default.childContextTypes;
IsomorphicRelayRouterContext.defaultProps = _RelayRouterContext3.default.defaultProps;
