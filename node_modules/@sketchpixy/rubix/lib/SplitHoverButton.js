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

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RSplitButton = require('./RSplitButton');

var _RSplitButton2 = _interopRequireDefault(_RSplitButton);

var _DropdownButton = require('./DropdownButton');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SplitHoverButton = (0, _DropdownButton.DropdownHoverButtonHOC)(_class = function (_React$Component) {
  (0, _inherits3.default)(SplitHoverButton, _React$Component);

  function SplitHoverButton() {
    (0, _classCallCheck3.default)(this, SplitHoverButton);
    return (0, _possibleConstructorReturn3.default)(this, (SplitHoverButton.__proto__ || (0, _getPrototypeOf2.default)(SplitHoverButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(SplitHoverButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_RSplitButton2.default, (0, _extends3.default)({ open: this.props.open,
        onToggle: this.props.onToggle
      }, this.props.buttonProps));
    }
  }]);
  return SplitHoverButton;
}(_react2.default.Component)) || _class;

exports.default = SplitHoverButton;