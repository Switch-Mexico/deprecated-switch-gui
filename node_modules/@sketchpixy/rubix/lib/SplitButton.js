'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var SplitButton = (0, _DropdownButton.DropdownButtonHOC)(_class = function (_React$Component) {
  (0, _inherits3.default)(SplitButton, _React$Component);

  function SplitButton() {
    (0, _classCallCheck3.default)(this, SplitButton);
    return (0, _possibleConstructorReturn3.default)(this, (SplitButton.__proto__ || (0, _getPrototypeOf2.default)(SplitButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(SplitButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_RSplitButton2.default, this.props.buttonProps);
    }
  }]);
  return SplitButton;
}(_react2.default.Component)) || _class;

exports.default = SplitButton;