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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expectedTypes = ["success", "warning", "danger", "info", "default", "primary", "link"];

function isBtnOfType(type) {
  for (var i = 0; i < expectedTypes.length; i++) {
    if (expectedTypes[i] === type) {
      return true;
    }
  }
  return false;
}

var Button = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Button, _React$Component);

  function Button() {
    (0, _classCallCheck3.default)(this, Button);
    return (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).apply(this, arguments));
  }

  (0, _createClass3.default)(Button, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);

      if (props.close) {
        console.error('Button "close" prop has been deprecated in Rubix v4.0.0');
      }

      if (props.xs) {
        props.bsSize = 'xsmall';
        delete props.xs;
      }

      if (props.sm) {
        props.bsSize = 'small';
        delete props.sm;
      }

      if (props.lg) {
        props.bsSize = 'large';
        delete props.lg;
      }

      if (props.hasOwnProperty('bsStyle') && typeof props.bsStyle === 'string') {
        var styles = props.bsStyle.split(/\s|\,/mgi).filter(function (a) {
          return a;
        });
        for (var i = 0; i < styles.length; i++) {
          if (isBtnOfType(styles[i])) {
            props.bsStyle = styles[i];
          } else {
            props.className = (0, _classnames2.default)(props.className, 'btn-' + styles[i]);
            props.bsStyle = 'default';
          }
        }
      }

      if (props.retainBackground) {
        props.className = (0, _classnames2.default)(props.className, 'btn-retainBg');
      }

      if (props.rounded) {
        props.className = (0, _classnames2.default)(props.className, 'btn-rounded');
      }

      if (props.onlyOnHover) {
        props.className = (0, _classnames2.default)(props.className, 'btn-onlyOnHover');
      }

      if (props.inverse || props.retainBackground) {
        props.className = (0, _classnames2.default)(props.className, 'btn-inverse');
      }

      if (props.outlined || props.onlyOnHover || props.inverse || props.retainBackground) {
        props.className = (0, _classnames2.default)(props.className, 'btn-outlined');
      }

      delete props.retainBackground;
      delete props.rounded;
      delete props.onlyOnHover;
      delete props.inverse;
      delete props.outlined;

      return _react2.default.createElement(_Button2.default, props);
    }
  }]);
  return Button;
}(_react2.default.Component), _class.propTypes = {
  xs: _react2.default.PropTypes.bool,
  sm: _react2.default.PropTypes.bool,
  lg: _react2.default.PropTypes.bool,
  rounded: _react2.default.PropTypes.bool,
  onlyOnHover: _react2.default.PropTypes.bool,
  retainBackground: _react2.default.PropTypes.bool,
  inverse: _react2.default.PropTypes.bool,
  outlined: _react2.default.PropTypes.bool
}, _temp);
exports.default = Button;