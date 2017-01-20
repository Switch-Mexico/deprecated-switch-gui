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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Col = require('react-bootstrap/lib/Col');

var _Col2 = _interopRequireDefault(_Col);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var breakpoints = ['xs', 'sm', 'md', 'lg'];
var directions = ['left', 'right', 'top', 'bottom'];

function ucfirst(str) {
  return typeof str != "undefined" ? (str += '', str[0].toUpperCase() + str.substr(1)) : '';
}

function setLayoutClass(props, name, what, key) {
  if (props[name] !== undefined && props[key] !== undefined) {
    props.className = (0, _classnames2.default)('col-' + name + '-' + what + ' ', props.className);
    delete props[key];
  }
}

function convertAndSetCamelCaseClass(props, key) {
  var klass = 'col-' + key.replace(/([A-Z])/mg, function (a) {
    return '-' + a.toLowerCase();
  });
  props.className = (0, _classnames2.default)(klass, props.className);
  delete props[key];
}

var Col = function (_React$Component) {
  (0, _inherits3.default)(Col, _React$Component);

  function Col() {
    (0, _classCallCheck3.default)(this, Col);
    return (0, _possibleConstructorReturn3.default)(this, (Col.__proto__ || (0, _getPrototypeOf2.default)(Col)).apply(this, arguments));
  }

  (0, _createClass3.default)(Col, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);

      for (var i = 0; i < breakpoints.length; i++) {
        for (var j = 0; j < directions.length; j++) {
          setLayoutClass(props, breakpoints[i], 'collapse-' + directions[j], 'collapse' + ucfirst(directions[j]));
          setLayoutClass(props, breakpoints[i], 'gutter-' + directions[j], 'gutter' + ucfirst(directions[j]));
        }

        if (props.hasOwnProperty(breakpoints[i] + 'Visible')) {
          props.className = (0, _classnames2.default)('visible-' + breakpoints[i], props.className);
        }
      }

      if (props.hasOwnProperty('visible') && typeof props.visible === 'string') {
        var visibleBreakpoints = props.visible.split(',');
        for (var i = 0; i < visibleBreakpoints.length; i++) {
          var visibleBreakpoint = visibleBreakpoints[i].trim();
          props.className = (0, _classnames2.default)('visible-' + visibleBreakpoint, props.className);
        }
      }

      if (props.hasOwnProperty('hidden') && typeof props.hidden === 'string') {
        var hiddenBreakpoints = props.hidden.split(',');
        for (var i = 0; i < hiddenBreakpoints.length; i++) {
          var hiddenBreakpoint = hiddenBreakpoints[i].trim();
          props.className = (0, _classnames2.default)('hidden-' + hiddenBreakpoint, props.className);
        }
      }

      for (var key in props) {
        if (props.hasOwnProperty(key)) {
          if (key.search('Collapse') !== -1 || key.search('Gutter') !== -1) {
            convertAndSetCamelCaseClass(props, key);
          }
        }
      }

      delete props.visible;

      return _react2.default.createElement(_Col2.default, props);
    }
  }]);
  return Col;
}(_react2.default.Component);

exports.default = Col;