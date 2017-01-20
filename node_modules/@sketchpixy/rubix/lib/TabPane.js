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

var _TabPane = require('react-bootstrap/lib/TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _isBrowser = require('./isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TabPane = function (_React$Component) {
  (0, _inherits3.default)(TabPane, _React$Component);

  function TabPane() {
    (0, _classCallCheck3.default)(this, TabPane);
    return (0, _possibleConstructorReturn3.default)(this, (TabPane.__proto__ || (0, _getPrototypeOf2.default)(TabPane)).apply(this, arguments));
  }

  (0, _createClass3.default)(TabPane, [{
    key: 'onEntering',
    value: function onEntering() {
      if ((0, _isBrowser2.default)()) {
        if (window.hasOwnProperty('Rubix')) {
          Rubix.redraw();
        }
      }

      if (this.props.onEntering && typeof this.props.onEntering === 'function') {
        this.props.onEntering();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props, {
        onEntering: this.onEntering.bind(this)
      });

      return _react2.default.createElement(_TabPane2.default, props);
    }
  }]);
  return TabPane;
}(_react2.default.Component);

exports.default = TabPane;