'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _all = require('react-prop-types/lib/all');

var _all2 = _interopRequireDefault(_all);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _bootstrapUtils = require('react-bootstrap/lib/utils/bootstrapUtils');

var _createChainedFunction = require('react-bootstrap/lib/utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _ValidComponentChildren = require('react-bootstrap/lib/utils/ValidComponentChildren');

var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Should we expose `<NavItem>` as `<Nav.Item>`?

// TODO: This `bsStyle` is very unlike the others. Should we rename it?

// TODO: `pullRight` and `pullLeft` don't render right outside of `navbar`.
// Consider renaming or replacing them.

var propTypes = {
  /**
   * Marks the NavItem with a matching `eventKey` as active. Has a
   * higher precedence over `activeHref`.
   */
  activeKey: _react2.default.PropTypes.any,

  /**
   * Marks the child NavItem with a matching `href` prop as active.
   */
  activeHref: _react2.default.PropTypes.string,

  /**
   * NavItems are be positioned vertically.
   */
  stacked: _react2.default.PropTypes.bool,

  justified: (0, _all2.default)(_react2.default.PropTypes.bool, function (_ref) {
    var justified = _ref.justified,
        navbar = _ref.navbar;
    return justified && navbar ? Error('justified navbar `Nav`s are not supported') : null;
  }),

  /**
   * A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   *  Any eventKey,
   *  SyntheticEvent event?
   * )
   * ```
   */
  onSelect: _react2.default.PropTypes.func,

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: _react2.default.PropTypes.string,

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: _react2.default.PropTypes.bool,

  /**
   * Float the Nav to the right. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullRight: _react2.default.PropTypes.bool,

  /**
   * Float the Nav to the left. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullLeft: _react2.default.PropTypes.bool
};

var defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};

var contextTypes = {
  $bs_navbar: _react2.default.PropTypes.shape({
    bsClass: _react2.default.PropTypes.string
  }),

  $bs_tabContainer: _react2.default.PropTypes.shape({
    activeKey: _react2.default.PropTypes.any,
    onSelect: _react2.default.PropTypes.func.isRequired,
    getTabId: _react2.default.PropTypes.func.isRequired,
    getPaneId: _react2.default.PropTypes.func.isRequired
  })
};

var Nav = function (_React$Component) {
  (0, _inherits3.default)(Nav, _React$Component);

  function Nav() {
    (0, _classCallCheck3.default)(this, Nav);
    return (0, _possibleConstructorReturn3.default)(this, (Nav.__proto__ || (0, _getPrototypeOf2.default)(Nav)).apply(this, arguments));
  }

  (0, _createClass3.default)(Nav, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var _this2 = this;

      if (!this._needsRefocus) {
        return;
      }

      this._needsRefocus = false;

      var children = this.props.children;

      var activeChild = _ValidComponentChildren2.default.find(children, function (child) {
        return _this2.isChildActive(child);
      });

      var childrenArray = _ValidComponentChildren2.default.toArray(children);
      var activeChildIndex = childrenArray.indexOf(activeChild);

      var childNodes = _reactDom2.default.findDOMNode(this).children;
      var activeNode = childNodes && childNodes[activeChildIndex];

      if (!activeNode || !activeNode.firstChild) {
        return;
      }

      activeNode.firstChild.focus();
    }
  }, {
    key: 'handleTabKeyDown',
    value: function handleTabKeyDown(onSelect, event) {
      var nextActiveChild = void 0;

      switch (event.keyCode) {
        case _keycode2.default.codes.left:
        case _keycode2.default.codes.up:
          nextActiveChild = this.getNextActiveChild(-1);
          break;
        case _keycode2.default.codes.right:
        case _keycode2.default.codes.down:
          nextActiveChild = this.getNextActiveChild(1);
          break;
        default:
          // It was a different key; don't handle this keypress.
          return;
      }

      event.preventDefault();

      if (onSelect && nextActiveChild && nextActiveChild.props.eventKey) {
        onSelect(nextActiveChild.props.eventKey);
      }

      this._needsRefocus = true;
    }
  }, {
    key: 'getNextActiveChild',
    value: function getNextActiveChild(offset) {
      var _this3 = this;

      var children = this.props.children;

      var validChildren = children.filter(function (child) {
        return child.props.eventKey && !child.props.disabled;
      });

      var activeChild = _ValidComponentChildren2.default.find(children, function (child) {
        return _this3.isChildActive(child);
      });

      // This assumes the active child is not disabled.
      var activeChildIndex = validChildren.indexOf(activeChild);
      if (activeChildIndex === -1) {
        // Something has gone wrong. Select the first valid child we can find.
        return validChildren[0];
      }

      var nextIndex = activeChildIndex + offset;
      var numValidChildren = validChildren.length;

      if (nextIndex >= numValidChildren) {
        nextIndex = 0;
      } else if (nextIndex < 0) {
        nextIndex = numValidChildren - 1;
      }

      return validChildren[nextIndex];
    }
  }, {
    key: 'isChildActive',
    value: function isChildActive(child) {
      var _props = this.props,
          activeKey = _props.activeKey,
          activeHref = _props.activeHref;

      var tabContainer = this.context.$bs_tabContainer;

      if (tabContainer) {
        var childKey = child.props.eventKey;

        (0, _warning2.default)(!child.props.active, 'Specifying a `<NavItem>` `active` prop in the context of a ' + '`<TabContainer>` is not supported. Instead use `<TabContainer ' + ('activeKey={' + childKey + '} />`'));

        var active = childKey === tabContainer.activeKey;

        // Only warn on the active child to avoid spamming the console.
        (0, _warning2.default)(!active || activeKey == null && !activeHref, 'Specifying a `<Nav>` `activeKey` or `activeHref` in the context of ' + 'a `<TabContainer>` is not supported. Instead use `<TabContainer ' + ('activeKey={' + childKey + '} />`'));

        return active;
      }

      if (child.props.active) {
        return true;
      }

      if (activeKey != null && child.props.eventKey === activeKey) {
        return true;
      }

      if (activeHref && child.props.href === activeHref) {
        return true;
      }

      return child.props.active;
    }
  }, {
    key: 'getTabProps',
    value: function getTabProps(child, tabContainer, navRole, active, onSelect) {
      var _this4 = this;

      if (!tabContainer && navRole !== 'tablist') {
        // No tab props here.
        return null;
      }

      var _child$props = child.props,
          id = _child$props.id,
          controls = _child$props['aria-controls'],
          eventKey = _child$props.eventKey,
          role = _child$props.role,
          onKeyDown = _child$props.onKeyDown,
          tabIndex = _child$props.tabIndex;


      if (tabContainer) {
        (0, _warning2.default)(!id && !controls, 'In the context of a `<TabContainer>`, `<NavItem>`s are given ' + 'generated `id` and `aria-controls` attributes for the sake of ' + 'proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly, provide a `generateChildId` ' + 'prop to the parent `<TabContainer>`.');

        id = tabContainer.getTabId(eventKey);
        controls = tabContainer.getPaneId(eventKey);
      }

      if (navRole === 'tablist') {
        role = role || 'tab';
        onKeyDown = (0, _createChainedFunction2.default)(function (event) {
          return _this4.handleTabKeyDown(onSelect, event);
        }, onKeyDown);
        tabIndex = active ? tabIndex : -1;
      }

      return {
        id: id,
        role: role,
        onKeyDown: onKeyDown,
        'aria-controls': controls,
        tabIndex: tabIndex
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _extends2,
          _this5 = this;

      var _props2 = this.props,
          activeKey = _props2.activeKey,
          activeHref = _props2.activeHref,
          stacked = _props2.stacked,
          justified = _props2.justified,
          onSelect = _props2.onSelect,
          propsRole = _props2.role,
          propsNavbar = _props2.navbar,
          pullRight = _props2.pullRight,
          pullLeft = _props2.pullLeft,
          className = _props2.className,
          children = _props2.children,
          props = (0, _objectWithoutProperties3.default)(_props2, ['activeKey', 'activeHref', 'stacked', 'justified', 'onSelect', 'role', 'navbar', 'pullRight', 'pullLeft', 'className', 'children']);


      var tabContainer = this.context.$bs_tabContainer;
      var role = propsRole || (tabContainer ? 'tablist' : null);

      var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props),
          _splitBsProps2 = (0, _slicedToArray3.default)(_splitBsProps, 2),
          bsProps = _splitBsProps2[0],
          elementProps = _splitBsProps2[1];

      var classes = (0, _extends4.default)({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, (0, _defineProperty3.default)(_extends2, (0, _bootstrapUtils.prefix)(bsProps, 'stacked'), stacked), (0, _defineProperty3.default)(_extends2, (0, _bootstrapUtils.prefix)(bsProps, 'justified'), justified), _extends2));

      var navbar = propsNavbar != null ? propsNavbar : this.context.$bs_navbar;
      var pullLeftClassName = void 0;
      var pullRightClassName = void 0;

      if (navbar) {
        var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

        classes[(0, _bootstrapUtils.prefix)(navbarProps, 'nav')] = true;

        pullRightClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'right');
        pullLeftClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'left');
      } else {
        pullRightClassName = 'pull-right';
        pullLeftClassName = 'pull-left';
      }

      classes[pullRightClassName] = pullRight;
      classes[pullLeftClassName] = pullLeft;

      delete elementProps.active;

      return _react2.default.createElement(
        'ul',
        (0, _extends4.default)({}, elementProps, {
          role: role,
          className: (0, _classnames2.default)(className, classes)
        }),
        _ValidComponentChildren2.default.map(children, function (child) {
          var active = _this5.isChildActive(child);
          var childOnSelect = (0, _createChainedFunction2.default)(child.props.onSelect, onSelect, tabContainer && tabContainer.onSelect);

          return (0, _react.cloneElement)(child, (0, _extends4.default)({}, _this5.getTabProps(child, tabContainer, role, active, childOnSelect), {
            active: active,
            activeKey: activeKey,
            activeHref: activeHref,
            onSelect: childOnSelect
          }));
        })
      );
    }
  }]);
  return Nav;
}(_react2.default.Component);

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
Nav.contextTypes = contextTypes;

exports.default = (0, _bootstrapUtils.bsClass)('nav', (0, _bootstrapUtils.bsStyles)(['tabs', 'pills'], Nav));