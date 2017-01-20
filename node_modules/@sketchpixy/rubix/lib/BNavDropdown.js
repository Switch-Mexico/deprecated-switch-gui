'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _splitComponentProps3 = require('react-bootstrap/lib/utils/splitComponentProps');

var _splitComponentProps4 = _interopRequireDefault(_splitComponentProps3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = (0, _extends3.default)({}, _Dropdown2.default.propTypes, {

  // Toggle props.
  title: _react2.default.PropTypes.node.isRequired,
  noCaret: _react2.default.PropTypes.bool,
  active: _react2.default.PropTypes.bool,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: _react2.default.PropTypes.node
});

var NavDropdown = function (_React$Component) {
  (0, _inherits3.default)(NavDropdown, _React$Component);

  function NavDropdown() {
    (0, _classCallCheck3.default)(this, NavDropdown);
    return (0, _possibleConstructorReturn3.default)(this, (NavDropdown.__proto__ || (0, _getPrototypeOf2.default)(NavDropdown)).apply(this, arguments));
  }

  (0, _createClass3.default)(NavDropdown, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          active = _props.active,
          className = _props.className,
          style = _props.style,
          children = _props.children,
          props = (0, _objectWithoutProperties3.default)(_props, ['title', 'active', 'className', 'style', 'children']);


      delete props.eventKey;

      // These are injected down by `<Nav>` for building `<SubNav>`s.
      delete props.activeKey;
      delete props.activeHref;

      var _splitComponentProps = (0, _splitComponentProps4.default)(props, _Dropdown2.default.ControlledComponent),
          _splitComponentProps2 = (0, _slicedToArray3.default)(_splitComponentProps, 2),
          dropdownProps = _splitComponentProps2[0],
          toggleProps = _splitComponentProps2[1];

      // Unlike for the other dropdowns, styling needs to go to the `<Dropdown>`
      // rather than the `<Dropdown.Toggle>`.

      return _react2.default.createElement(
        _Dropdown2.default,
        (0, _extends3.default)({}, dropdownProps, {
          componentClass: 'li',
          className: (0, _classnames2.default)(className, { active: active }),
          style: style
        }),
        _react2.default.createElement(
          _Dropdown2.default.Toggle,
          (0, _extends3.default)({}, toggleProps, { useAnchor: true }),
          title
        ),
        _react2.default.createElement(
          _Dropdown2.default.Menu,
          null,
          children
        )
      );
    }
  }]);
  return NavDropdown;
}(_react2.default.Component);

NavDropdown.propTypes = propTypes;

exports.default = NavDropdown;