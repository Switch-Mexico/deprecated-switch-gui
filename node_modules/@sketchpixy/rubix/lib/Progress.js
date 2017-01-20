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

var _BProgressBar = require('./BProgressBar');

var _BProgressBar2 = _interopRequireDefault(_BProgressBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_BProgressBar2.default.propTypes.children = _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.element);

var Progress = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Progress, _React$Component);

  function Progress() {
    (0, _classCallCheck3.default)(this, Progress);
    return (0, _possibleConstructorReturn3.default)(this, (Progress.__proto__ || (0, _getPrototypeOf2.default)(Progress)).apply(this, arguments));
  }

  (0, _createClass3.default)(Progress, [{
    key: 'getValue',
    value: function getValue() {
      console.warn("Progress.getValue() is deprecated in favor of Progress.value");
      return this.value;
    }
  }, {
    key: 'getMin',
    value: function getMin() {
      console.warn("Progress.getMin() is deprecated in favor of Progress.min");
      return this.min;
    }
  }, {
    key: 'getMax',
    value: function getMax() {
      console.warn("Progress.getMax() is deprecated in favor of Progress.max");
      return this.max;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);

      if (props.value) {
        props.now = props.value;
        delete props.value;
      }

      if (props.success) {
        props.bsStyle = 'success';
      }

      if (props.info) {
        props.bsStyle = 'info';
      }

      if (props.warning) {
        props.bsStyle = 'warning';
      }

      if (props.danger) {
        props.bsStyle = 'danger';
      }

      if (props.fgColor) {
        props.style = (0, _extends3.default)({}, props.style, {
          color: props.fgColor
        });
      }

      if (props.collapseBottom) {
        props.className = (0, _classnames2.default)(props.className, 'progress-collapse-bottom');
      }

      return _react2.default.createElement(_BProgressBar2.default, props);
    }
  }, {
    key: 'value',
    get: function get() {
      return this.props.value || this.props.now;
    }
  }, {
    key: 'min',
    get: function get() {
      return this.props.min;
    }
  }, {
    key: 'max',
    get: function get() {
      return this.props.max;
    }
  }]);
  return Progress;
}(_react2.default.Component), _class.propTypes = {
  value: _react2.default.PropTypes.number,
  success: _react2.default.PropTypes.bool,
  info: _react2.default.PropTypes.bool,
  warning: _react2.default.PropTypes.bool,
  danger: _react2.default.PropTypes.bool,
  color: _react2.default.PropTypes.string,
  fgColor: _react2.default.PropTypes.string,
  collapseBottom: _react2.default.PropTypes.bool
}, _temp);
exports.default = Progress;