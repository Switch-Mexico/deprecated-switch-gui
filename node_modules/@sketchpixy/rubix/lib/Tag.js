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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Tag, _React$Component);

  function Tag() {
    (0, _classCallCheck3.default)(this, Tag);
    return (0, _possibleConstructorReturn3.default)(this, (Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tag, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          color = _props.color,
          className = _props.className;

      color = color || "darkgreen45";
      var props = (0, _extends3.default)({}, this.props, {
        href: this.props.href || "#",
        className: (0, _classnames2.default)(className, {
          'left-tag': true,
          'fg-hover-white': true,
          'bg-lightgray50': true,
          'border-lightgray50': true,
          'fg-text': true
        }, 'border-hover-' + color, 'bg-hover-' + color)
      });

      delete props.color;

      return _react2.default.createElement('a', props);
    }
  }]);
  return Tag;
}(_react2.default.Component), _class.propTypes = {
  href: _react2.default.PropTypes.string,
  color: _react2.default.PropTypes.string
}, _temp);
exports.default = Tag;