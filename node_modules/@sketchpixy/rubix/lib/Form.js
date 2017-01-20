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

var _Form = require('react-bootstrap/lib/Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _FormControl = require('./FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Form = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Form, _React$Component);

  function Form() {
    (0, _classCallCheck3.default)(this, Form);
    return (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).apply(this, arguments));
  }

  (0, _createClass3.default)(Form, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);

      delete props.allowAutoComplete;

      if (!props.allowAutoComplete) {
        return _react2.default.createElement(
          _Form2.default,
          (0, _extends3.default)({}, props, { autoComplete: 'off' }),
          _react2.default.createElement(
            'div',
            { style: { height: 0, visibility: 'hidden' } },
            _react2.default.createElement(
              _FormGroup2.default,
              null,
              _react2.default.createElement(_FormControl2.default, { type: 'text' })
            ),
            _react2.default.createElement(
              _FormGroup2.default,
              null,
              _react2.default.createElement(_FormControl2.default, { type: 'email' })
            ),
            _react2.default.createElement(
              _FormGroup2.default,
              null,
              _react2.default.createElement(_FormControl2.default, { type: 'password' })
            )
          ),
          this.props.children
        );
      }

      return _react2.default.createElement(_Form2.default, props);
    }
  }]);
  return Form;
}(_react2.default.Component), _class.propTypes = {
  allowAutoComplete: _react2.default.PropTypes.bool
}, _class.defaultProps = {
  allowAutoComplete: false
}, _temp);
exports.default = Form;