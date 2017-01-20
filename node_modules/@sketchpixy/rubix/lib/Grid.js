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

var _Grid = require('react-bootstrap/lib/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Grid, _React$Component);

  function Grid() {
    (0, _classCallCheck3.default)(this, Grid);
    return (0, _possibleConstructorReturn3.default)(this, (Grid.__proto__ || (0, _getPrototypeOf2.default)(Grid)).apply(this, arguments));
  }

  (0, _createClass3.default)(Grid, [{
    key: 'render',
    value: function render() {
      var fluid = true;

      if (this.props.fluid === false) {
        fluid = false;
      }

      if (this.props.fixed === true) {
        fluid = false;
      }

      var props = (0, _extends3.default)({}, this.props, {
        fluid: fluid
      });

      props.className = (0, _classnames2.default)(props.className, {
        'grid-gutter': props.gutter,
        'grid-collapse': props.collapse,
        'grid-gutter-top': props.gutterTop,
        'grid-gutter-left': props.gutterLeft,
        'grid-gutter-right': props.gutterRight,
        'grid-gutter-bottom': props.gutterBottom
      });

      delete props.fixed;
      delete props.gutter;
      delete props.collapse;
      delete props.gutterTop;
      delete props.gutterLeft;
      delete props.gutterRight;
      delete props.gutterBottom;

      return _react2.default.createElement(_Grid2.default, props);
    }
  }]);
  return Grid;
}(_react2.default.Component), _class.propTypes = {
  fixed: _react2.default.PropTypes.bool,
  gutter: _react2.default.PropTypes.bool,
  collapse: _react2.default.PropTypes.bool,
  gutterTop: _react2.default.PropTypes.bool,
  gutterLeft: _react2.default.PropTypes.bool,
  gutterRight: _react2.default.PropTypes.bool,
  gutterBottom: _react2.default.PropTypes.bool
}, _temp);
exports.default = Grid;