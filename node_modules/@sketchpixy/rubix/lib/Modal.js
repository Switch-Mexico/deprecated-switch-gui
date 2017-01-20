'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _Modal = require('react-bootstrap/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _ModalDialog = require('./ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Modal, _React$Component);

  function Modal() {
    (0, _classCallCheck3.default)(this, Modal);
    return (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).apply(this, arguments));
  }

  (0, _createClass3.default)(Modal, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);

      if (props.sm) {
        props.bsSize = 'small';
        delete props.sm;
      }

      if (props.lg) {
        props.bsSize = 'large';
        delete props.lg;
      }

      return _react2.default.createElement(_Modal2.default, props);
    }
  }]);
  return Modal;
}(_react2.default.Component), _class.propTypes = {
  sm: _react2.default.PropTypes.bool,
  lg: _react2.default.PropTypes.bool
}, _temp);
exports.default = Modal;


var keys = (0, _keys2.default)(_Modal2.default);
var skipKeys = ['displayName', 'propTypes', 'childContextTypes', 'getDefaultProps', 'defaultProps'];
for (var i = 0; i < keys.length; i++) {
  var key = keys[i];
  if (_Modal2.default.hasOwnProperty(key) && skipKeys.indexOf(key) < 0) {
    Modal[key] = _Modal2.default[key];
  }
}

Modal.Dialog = _ModalDialog2.default;