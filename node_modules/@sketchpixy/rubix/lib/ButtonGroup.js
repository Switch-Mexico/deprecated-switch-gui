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

var _ButtonGroup = require('react-bootstrap/lib/ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonGroup = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(ButtonGroup, _React$Component);

  function ButtonGroup() {
    (0, _classCallCheck3.default)(this, ButtonGroup);
    return (0, _possibleConstructorReturn3.default)(this, (ButtonGroup.__proto__ || (0, _getPrototypeOf2.default)(ButtonGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(ButtonGroup, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);

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

      if (props.bsSize) {
        props.children = _react2.default.Children.map(props.children, function (child) {
          return _react2.default.cloneElement(child, {
            bsSize: props.bsSize
          });
        });
      }

      return _react2.default.createElement(_ButtonGroup2.default, props);
    }
  }]);
  return ButtonGroup;
}(_react2.default.Component), _class.propTypes = {
  xs: _react2.default.PropTypes.bool,
  sm: _react2.default.PropTypes.bool,
  lg: _react2.default.PropTypes.bool
}, _temp);
exports.default = ButtonGroup;