'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Alert = require('react-bootstrap/lib/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Alert = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Alert, _React$Component);

  function Alert() {
    var _ref;

    (0, _classCallCheck3.default)(this, Alert);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Alert.__proto__ || (0, _getPrototypeOf2.default)(Alert)).call.apply(_ref, [this].concat(args)));

    _this.state = { alertVisible: true };
    return _this;
  }

  (0, _createClass3.default)(Alert, [{
    key: 'handleAlertDismiss',
    value: function handleAlertDismiss() {
      this.setState({ alertVisible: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);

      if (props.success) {
        props.bsStyle = 'success';
        delete props.success;
      }

      if (props.info) {
        props.bsStyle = 'info';
        delete props.info;
      }

      if (props.warning) {
        props.bsStyle = 'warning';
        delete props.warning;
      }

      if (props.danger) {
        props.bsStyle = 'danger';
        delete props.danger;
      }

      if (!props.dismissible) {
        delete props.dismissible;
        return _react2.default.createElement(_Alert2.default, props);
      }

      if (this.state.alertVisible) {
        delete props.dismissible;
        return _react2.default.createElement(_Alert2.default, (0, _extends3.default)({}, props, { onDismiss: this.handleAlertDismiss.bind(this) }));
      }

      return null;
    }
  }]);
  return Alert;
}(_react2.default.Component), _class.propTypes = {
  success: _react2.default.PropTypes.bool,
  info: _react2.default.PropTypes.bool,
  warning: _react2.default.PropTypes.bool,
  danger: _react2.default.PropTypes.bool,
  dismissible: _react2.default.PropTypes.bool
}, _temp);
exports.default = Alert;