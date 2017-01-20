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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lead = function (_React$Component) {
  (0, _inherits3.default)(Lead, _React$Component);

  function Lead() {
    (0, _classCallCheck3.default)(this, Lead);
    return (0, _possibleConstructorReturn3.default)(this, (Lead.__proto__ || (0, _getPrototypeOf2.default)(Lead)).apply(this, arguments));
  }

  (0, _createClass3.default)(Lead, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({
        className: (0, _classnames2.default)('lead', this.props.className)
      }, this.props);

      return _react2.default.createElement('p', props);
    }
  }]);
  return Lead;
}(_react2.default.Component);

exports.default = Lead;