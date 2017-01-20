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

var _BProgressBar = require('./BProgressBar');

var _BProgressBar2 = _interopRequireDefault(_BProgressBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProgressBar = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(ProgressBar, _React$Component);

  function ProgressBar() {
    (0, _classCallCheck3.default)(this, ProgressBar);
    return (0, _possibleConstructorReturn3.default)(this, (ProgressBar.__proto__ || (0, _getPrototypeOf2.default)(ProgressBar)).apply(this, arguments));
  }

  (0, _createClass3.default)(ProgressBar, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);

      if (props.value) {
        props.now = props.value;
        delete props.value;
      }

      return _react2.default.createElement(_BProgressBar2.default, props);
    }
  }]);
  return ProgressBar;
}(_react2.default.Component), _class.propTypes = {
  value: _react2.default.PropTypes.number
}, _temp);
exports.default = ProgressBar;