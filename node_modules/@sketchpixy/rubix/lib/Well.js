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

var _Well = require('react-bootstrap/lib/Well');

var _Well2 = _interopRequireDefault(_Well);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Well = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Well, _React$Component);

  function Well() {
    (0, _classCallCheck3.default)(this, Well);
    return (0, _possibleConstructorReturn3.default)(this, (Well.__proto__ || (0, _getPrototypeOf2.default)(Well)).apply(this, arguments));
  }

  (0, _createClass3.default)(Well, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);

      if (props.hasOwnProperty('sm')) {
        props.bsSize = 'sm';
        delete props.sm;
      }

      if (props.hasOwnProperty('lg')) {
        props.bsSize = 'lg';
        delete props.lg;
      }

      if (props.hasOwnProperty('noMargin')) {
        props.style = props.style || {};
        props.style.margin = 0;
      }

      return _react2.default.createElement(_Well2.default, props);
    }
  }]);
  return Well;
}(_react2.default.Component), _class.propTypes = {
  sm: _react2.default.PropTypes.bool,
  lg: _react2.default.PropTypes.bool,
  noMargin: _react2.default.PropTypes.bool
}, _temp);
exports.default = Well;