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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItem = function (_React$Component) {
  (0, _inherits3.default)(MenuItem, _React$Component);

  function MenuItem() {
    (0, _classCallCheck3.default)(this, MenuItem);
    return (0, _possibleConstructorReturn3.default)(this, (MenuItem.__proto__ || (0, _getPrototypeOf2.default)(MenuItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(MenuItem, [{
    key: 'render',
    value: function render() {
      if (this.props.noHover) {
        var props = (0, _extends3.default)({}, this.props);

        delete props.noHover;
        delete props.eventKey;

        return _react2.default.createElement('li', (0, _extends3.default)({ role: 'presentation' }, props));
      }

      return _react2.default.createElement(_MenuItem2.default, this.props);
    }
  }]);
  return MenuItem;
}(_react2.default.Component);

exports.default = MenuItem;