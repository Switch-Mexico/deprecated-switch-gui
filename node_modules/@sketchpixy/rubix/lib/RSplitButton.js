'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dropdown = require('react-bootstrap/lib/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _SplitToggle = require('react-bootstrap/lib/SplitToggle');

var _SplitToggle2 = _interopRequireDefault(_SplitToggle);

var _omit = require('lodash-compat/object/omit');

var _omit2 = _interopRequireDefault(_omit);

var _pick = require('lodash-compat/object/pick');

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SplitButton = function (_React$Component) {
  (0, _inherits3.default)(SplitButton, _React$Component);

  function SplitButton() {
    (0, _classCallCheck3.default)(this, SplitButton);
    return (0, _possibleConstructorReturn3.default)(this, (SplitButton.__proto__ || (0, _getPrototypeOf2.default)(SplitButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(SplitButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          title = _props.title,
          onClick = _props.onClick,
          target = _props.target,
          href = _props.href,
          toggleLabel = _props.toggleLabel,
          bsSize = _props.bsSize,
          bsStyle = _props.bsStyle,
          props = (0, _objectWithoutProperties3.default)(_props, ['children', 'title', 'onClick', 'target', 'href', 'toggleLabel', 'bsSize', 'bsStyle']);
      var disabled = props.disabled;


      var dropdownProps = (0, _pick2.default)(props, (0, _keys2.default)(_Dropdown2.default.ControlledComponent.propTypes));
      var buttonProps = (0, _omit2.default)(props, (0, _keys2.default)(_Dropdown2.default.ControlledComponent.propTypes));

      return _react2.default.createElement(
        _Dropdown2.default,
        dropdownProps,
        _react2.default.createElement(
          _Button2.default,
          (0, _extends3.default)({}, buttonProps, {
            onClick: onClick,
            bsStyle: bsStyle,
            bsSize: bsSize,
            disabled: disabled,
            target: target,
            href: href
          }),
          title
        ),
        _react2.default.createElement(_SplitToggle2.default, (0, _extends3.default)({}, buttonProps, {
          'aria-label': toggleLabel || title,
          bsStyle: bsStyle,
          bsSize: bsSize,
          disabled: disabled
        })),
        _react2.default.createElement(
          _Dropdown2.default.Menu,
          null,
          children
        )
      );
    }
  }]);
  return SplitButton;
}(_react2.default.Component);

SplitButton.propTypes = (0, _extends3.default)({}, _Dropdown2.default.propTypes, {
  bsStyle: _Button2.default.propTypes.bsStyle,

  /**
   * @private
   */
  onClick: function onClick() {},

  target: _react2.default.PropTypes.string,
  href: _react2.default.PropTypes.string,
  /**
   * The content of the split button.
   */
  title: _react2.default.PropTypes.node.isRequired,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: _react2.default.PropTypes.string
});

SplitButton.defaultProps = {
  disabled: false,
  dropup: false,
  pullRight: false
};

SplitButton.Toggle = _SplitToggle2.default;

exports.default = SplitButton;