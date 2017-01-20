'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarDivider = exports.SidebarBtn = exports.SidebarControlBtn = exports.SidebarControls = exports.SidebarNavItem = exports.SidebarNav = exports.Sidebar = undefined;

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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _React$createClass, _class, _temp, _class2, _temp2, _class3, _class4, _temp3, _class5, _temp4, _class6, _temp5, _class7, _temp7, _class8, _temp8;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _PatternUtils = require('react-router/lib/PatternUtils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactMotion = require('react-motion');

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _isBrowser = require('./isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

var _isTouchDevice = require('./isTouchDevice');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _NavItem = require('./NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routesStore = {};

function enableStateForPathname(pathname, params) {
  for (var pattern in routesStore) {
    var matchedRoute = matchRoutes([pattern], pathname, params);

    if (matchedRoute == pattern) {
      routesStore[pattern] = true;
    } else {
      routesStore[pattern] = false;
    }
  }
}

function matchRoute(pattern, pathname, params) {
  var remainingPathname = pathname;
  var paramNames = [],
      paramValues = [];

  if (remainingPathname !== null && pattern) {
    var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);

    if (!matched || !matched.paramNames || !matched.paramValues) {
      return false;
    }
    remainingPathname = matched.remainingPathname;
    paramNames = [].concat((0, _toConsumableArray3.default)(paramNames), (0, _toConsumableArray3.default)(matched.paramNames));
    paramValues = [].concat((0, _toConsumableArray3.default)(paramValues), (0, _toConsumableArray3.default)(matched.paramValues));

    if (remainingPathname === '') {
      // We have an exact match on the route. Just check that all the params
      // match.
      // FIXME: This doesn't work on repeated params.
      return paramNames.every(function (paramName, index) {
        return String(paramValues[index]) === String(params[paramName]);
      });
    }
  }

  return false;
}

function matchRoutes(routes, pathname, params) {
  var matched = false,
      patternMatched = '';
  for (var i = 0; i < routes.length; i++) {
    if (matchRoute(routes[i], pathname, params)) {
      if (matched == true) {
        if (matchRoute(patternMatched, routes[i], params)) {
          patternMatched = routes[i];
        }
      } else {
        matched = true;
        patternMatched = routes[i];
      }
    }
  }

  if (matched) {
    return patternMatched;
  } else {
    return false;
  }
}

function getOpenState() {
  return !(0, _isTouchDevice2.default)() ? localStorage.getItem('sidebar-open-state') === 'true' ? true : false : false;
}

var MainContainer = _react2.default.createClass((_React$createClass = {
  displayName: 'MainContainer',
  getInitialState: function getInitialState() {
    return {
      open: true,
      forceClose: false
    };
  },
  isOpen: function isOpen(open) {
    return this.state.open === open;
  },
  closeSidebar: function closeSidebar() {
    var forceClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this.setState({
      open: false,
      forceClose: forceClose
    });
    localStorage.setItem('sidebar-open-state', false);
  },
  openSidebar: function openSidebar() {
    var forceClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this.setState({
      open: true,
      forceClose: forceClose
    });
    localStorage.setItem('sidebar-open-state', true);
  },
  toggleSidebar: function toggleSidebar() {
    if (this.state.forceClose) {
      this.openSidebar(false);
    } else {
      this.closeSidebar(true);
    }
  },
  sidebarStateChangeCallback: function sidebarStateChangeCallback(open) {
    var openState = getOpenState();
    if (this.isOpen(open)) return;
    if (open !== undefined) {
      openState = open;
    } else {
      openState = !this.state.open;
    }
    this.setState({
      open: openState // toggle sidebar
    });
    localStorage.setItem('sidebar-open-state', openState);
  },
  enablePath: function enablePath(props) {
    if (props) {
      enableStateForPathname(props.location.pathname, props.params);
    }
    _Dispatcher2.default.publish('sidebar:activate');
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this = this;

    setTimeout(function () {
      _this.enablePath(nextProps);
    }, 50);
    // this.enablePath();
  },
  componentWillUnmount: function componentWillUnmount() {
    _Dispatcher2.default.unsubscribe(this.handler);
  },
  startSwipe: function startSwipe(e) {
    if (e.changedTouches.length) {
      var touches = e.changedTouches[0];
      this.startX = touches.pageX;
    }
  },
  swiping: function swiping(e) {
    if (e.changedTouches.length) {
      var touches = e.changedTouches[0];
      var change = Math.abs(touches.pageX - this.startX);
      var hasSwiped = change > 25;

      var body = document.getElementById('body');
      var sidebar = document.getElementById('sidebar');
      var header = document.getElementById('rubix-nav-header');
      if (hasSwiped) {
        if (!this.state.open) {
          if (change > 250) return;
          body.style.marginLeft = change + 'px';
          body.style.marginRight = -change + 'px';
          sidebar.style.left = -250 + change + 'px';
          header.style.marginLeft = change + 'px';
          header.style.marginRight = -change + 'px';
        } else {
          if (250 - change < 0) return;
          body.style.marginLeft = 250 - change + 'px';
          body.style.marginRight = -(250 - change) + 'px';
          sidebar.style.left = 0 - (250 - change) + 'px';
          header.style.marginLeft = 250 - change + 'px';
          header.style.marginRight = -(250 - change) + 'px';
        }
      }
    }
  },
  cancelSwipe: function cancelSwipe(e) {
    this.startX = 0;
    var body = document.getElementById('body');
    var sidebar = document.getElementById('sidebar');
    var header = document.getElementById('rubix-nav-header');
    body.style.marginLeft = '';
    body.style.marginRight = '';
    sidebar.style.left = '';
    header.style.marginLeft = '';
    header.style.marginRight = '';
    this.setState({
      open: false
    });
  },
  endSwipe: function endSwipe(e) {
    if (e.changedTouches.length) {
      var touches = e.changedTouches[0];
      var change = touches.pageX - this.startX;
      var hasSwiped = Math.abs(change) > 25;

      var body = document.getElementById('body');
      var sidebar = document.getElementById('sidebar');
      var header = document.getElementById('rubix-nav-header');

      if (hasSwiped) {
        body.style.marginLeft = '';
        body.style.marginRight = '';
        sidebar.style.left = '';
        header.style.marginLeft = '';
        header.style.marginRight = '';

        if (!this.state.open) {
          this.setState({
            open: true
          });
        } else {
          this.setState({
            open: false
          });
        }
      }
    }
  }
}, (0, _defineProperty3.default)(_React$createClass, 'componentWillUnmount', function componentWillUnmount() {
  _Dispatcher2.default.unsubscribe(this.sidebarStateChangeCallback);
  _Dispatcher2.default.unsubscribe(this.closeSidebar);
  _Dispatcher2.default.unsubscribe(this.toggleSidebar);
}), (0, _defineProperty3.default)(_React$createClass, 'componentDidMount', function componentDidMount() {
  this.handler = _Dispatcher2.default.subscribe('sidebar', this.sidebarStateChangeCallback);
  this.closeHandler = _Dispatcher2.default.subscribe('sidebar:closeSidebar', this.closeSidebar);
  this.closeHandler = _Dispatcher2.default.subscribe('sidebar:toggleSidebar', this.toggleSidebar);

  var openState = getOpenState();
  this.setState({
    open: openState
  });

  this.enablePath();
}), (0, _defineProperty3.default)(_React$createClass, 'render', function render() {
  var classes = (0, _classnames2.default)({
    'container-open': this.state.open,
    'force-close': this.state.forceClose
  });

  return _react2.default.createElement(
    'div',
    { id: 'container', className: classes },
    this.props.children
  );
}), _React$createClass));

exports.default = MainContainer;
var Sidebar = exports.Sidebar = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Sidebar, _React$Component);

  function Sidebar(props) {
    (0, _classCallCheck3.default)(this, Sidebar);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Sidebar.__proto__ || (0, _getPrototypeOf2.default)(Sidebar)).call(this, props));

    _this2.timer = null;

    _this2.state = {
      left: props.sidebar * 100 + '%',
      visibility: props.sidebar === 0 ? 'visible' : 'hidden'
    };

    _this2.reinitializeScrollbarHandler = null;
    _this2.destroyScrollbarHandler = null;
    _this2.repositionHandler = null;
    _this2.keychangeHandler = null;
    _this2.updateHandler = null;
    return _this2;
  }

  (0, _createClass3.default)(Sidebar, [{
    key: 'repositionScrollbar',
    value: function repositionScrollbar(child_node, top, height) {
      var node = _reactDom2.default.findDOMNode(this.refs.sidebar);
      var scrollTo = top - node.getBoundingClientRect().top + node.scrollTop;

      while (child_node.parentNode) {
        if (child_node.parentNode === node) {
          if (scrollTo > window.innerHeight / 2) {
            node.scrollTop = scrollTo - window.innerHeight / 2 + 100;
          }
          break;
        }

        child_node = child_node.parentNode;
      }

      if (!(0, _isTouchDevice2.default)()) {
        this.updateScrollbar();
      }
    }
  }, {
    key: 'updateScrollbar',
    value: function updateScrollbar() {
      if (!(0, _isTouchDevice2.default)()) {
        if ((0, _isBrowser2.default)()) {
          if (window.Ps) {
            Ps.update(_reactDom2.default.findDOMNode(this.refs.sidebar));
          }
        }
      }
    }
  }, {
    key: 'initializeScrollbar',
    value: function initializeScrollbar() {
      if ((0, _isBrowser2.default)() && !(0, _isTouchDevice2.default)()) {
        if (window.Ps) {
          Ps.initialize(_reactDom2.default.findDOMNode(this.refs.sidebar), {
            suppressScrollX: true
          });
        }
      }
    }
  }, {
    key: 'destroyScrollbar',
    value: function destroyScrollbar() {
      if ((0, _isBrowser2.default)() && !(0, _isTouchDevice2.default)()) {
        if (window.Ps) {
          Ps.destroy(_reactDom2.default.findDOMNode(this.refs.sidebar));
        }
      }
    }
  }, {
    key: 'handleKeyChange',
    value: function handleKeyChange(sidebar) {
      var newLeft = this.props.sidebar * 100 - sidebar * 100 + '%';
      this.setState({
        left: newLeft,
        visibility: 'visible'
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _Dispatcher2.default.unsubscribe(this.reinitializeScrollbarHandler);
      _Dispatcher2.default.unsubscribe(this.destroyScrollbarHandler);
      _Dispatcher2.default.unsubscribe(this.repositionHandler);
      _Dispatcher2.default.unsubscribe(this.keychangeHandler);
      _Dispatcher2.default.unsubscribe(this.updateHandler);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initializeScrollbar();

      this.reinitializeScrollbarHandler = _Dispatcher2.default.subscribe('sidebar:reinitialize', this.initializeScrollbar.bind(this));
      this.destroyScrollbarHandler = _Dispatcher2.default.subscribe('sidebar:destroy', this.destroyScrollbar.bind(this));
      this.repositionHandler = _Dispatcher2.default.subscribe('sidebar:reposition', this.repositionScrollbar.bind(this));
      this.keychangeHandler = _Dispatcher2.default.subscribe('sidebar:keychange', this.handleKeyChange.bind(this));
      this.updateHandler = _Dispatcher2.default.subscribe('sidebar:update', this.updateScrollbar.bind(this));

      if (this.props.active) {
        _Dispatcher2.default.publish('sidebar:controlbtn', this.props);
        _Dispatcher2.default.publish('sidebar:keychange', this.props.sidebar);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({
        style: {
          left: this.state.left,
          visibility: this.state.visibility,
          transition: 'all 0.3s ease',
          OTransition: 'all 0.3s ease',
          MsTransition: 'all 0.3s ease',
          MozTransition: 'all 0.3s ease',
          WebkitTransition: 'all 0.3s ease'
        }
      }, this.props, {
        className: (0, _classnames2.default)('sidebar', 'sidebar__main', this.props.className)
      });

      delete props.sidebar;

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ ref: 'sidebar' }, props, { children: null, 'data-id': this.props.sidebar }),
        _react2.default.createElement(
          'div',
          { ref: 'innersidebar' },
          this.props.children
        )
      );
    }
  }]);
  return Sidebar;
}(_react2.default.Component), _class.belongsTo = 'Sidebar', _temp);
var SidebarNav = exports.SidebarNav = (_temp2 = _class2 = function (_React$Component2) {
  (0, _inherits3.default)(SidebarNav, _React$Component2);

  function SidebarNav(props) {
    (0, _classCallCheck3.default)(this, SidebarNav);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (SidebarNav.__proto__ || (0, _getPrototypeOf2.default)(SidebarNav)).call(this, props));

    _this3.id = ++SidebarNav.id;
    return _this3;
  }

  (0, _createClass3.default)(SidebarNav, [{
    key: 'getID',
    value: function getID() {
      return this.id;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return _reactDom2.default.findDOMNode(this.refs.ul).getClientRects()[0].height;
    }
  }, {
    key: 'search',
    value: function search(text) {
      _Dispatcher2.default.publish('sidebar:search', text, this.getID());
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var classes = (0, _classnames2.default)('sidebar-nav', this.props.className);

      if (this.props.sidebarNavItem) {
        this.props.sidebarNavItem.childSidebarNav = this;
      }

      var props = (0, _extends3.default)({}, this.props, {
        className: classes
      });

      var children = _react2.default.Children.map(this.props.children, function (el) {
        switch (el.type) {
          case SidebarNav:
          case SidebarNavItem:
            return _react2.default.cloneElement(el, {
              SidebarNavID: _this4.props.SidebarNavID || _this4.getID(),
              sidebarNavItem: _this4.props.sidebarNavItem,
              rootSidebarNavItem: _this4.props.rootSidebarNavItem
            });
          default:
            return _react2.default.cloneElement(el);
        }
      });

      delete props.SidebarNavID;
      delete props.sidebarNavItem;
      delete props.rootSidebarNavItem;

      return _react2.default.createElement(
        'ul',
        (0, _extends3.default)({ ref: 'ul' }, props),
        children
      );
    }
  }]);
  return SidebarNav;
}(_react2.default.Component), _class2.belongsTo = 'Sidebar', _class2.id = 0, _temp2);

var SidebarNavItem = exports.SidebarNavItem = (0, _reactRouter.withRouter)(_class3 = (_temp3 = _class4 = function (_React$Component3) {
  (0, _inherits3.default)(SidebarNavItem, _React$Component3);

  function SidebarNavItem(props) {
    (0, _classCallCheck3.default)(this, SidebarNavItem);

    var _this5 = (0, _possibleConstructorReturn3.default)(this, (SidebarNavItem.__proto__ || (0, _getPrototypeOf2.default)(SidebarNavItem)).call(this, props));

    _this5.handleClick = function (e) {
      if (!_this5.props.href) {
        e.preventDefault();
        e.stopPropagation();
        _this5.toggleSidebarNav();
      }
      if (_this5.props.hasOwnProperty('onClick')) {
        _this5.props.onClick();
      }

      _this5.closeNav();
    };

    _this5.state = {
      open: props.open || false,
      active: props.active || false,
      toggleOpen: props.open || false,
      dir: 'left',
      opposite: false,
      height: 45
    };

    _this5.routes = [];

    _this5.activateHandler = null;
    _this5.searchHandler = null;
    _this5.closeHandler = null;
    return _this5;
  }

  (0, _createClass3.default)(SidebarNavItem, [{
    key: 'handleLayoutDirChange',
    value: function handleLayoutDirChange(dir) {
      this.setState({
        dir: dir === 'ltr' ? 'left' : 'right',
        opposite: dir === 'ltr' ? false : true
      });
    }
  }, {
    key: 'getTotalHeight',
    value: function getTotalHeight() {
      if (this.childSidebarNav) {
        return this.childSidebarNav.getHeight() + 45;
      } else {
        return 45;
      }
    }
  }, {
    key: 'openSidebarNav',
    value: function openSidebarNav(fullOpen, height, isClosing) {
      var _this6 = this;

      if (this.state.open && !height) return;

      height = height || 0;
      var thisHeight = this.getTotalHeight();
      var totalHeight = height + thisHeight;

      if (this.childSidebarNav) {
        this.setState({
          height: totalHeight,
          open: true,
          toggleOpen: true
        }, function () {
          _Dispatcher2.default.publish('sidebar:update');
          if (_this6.props.sidebarNavItem) {
            if (isClosing) {
              _this6.props.sidebarNavItem.openSidebarNav(false, 45 - totalHeight, true);
            } else {
              if (fullOpen) {
                _this6.props.sidebarNavItem.openSidebarNav(true, totalHeight - 45);
              } else {
                _this6.props.sidebarNavItem.openSidebarNav(false, thisHeight - 45);
              }
            }
          }
        });
      }
    }
  }, {
    key: 'closeSidebarNav',
    value: function closeSidebarNav(collapseRoot) {
      var _this7 = this;

      if (!this.state.open) return;

      var thisHeight = this.getTotalHeight();
      if (this.childSidebarNav) {
        this.setState({
          height: 45,
          open: false,
          toggleOpen: false
        }, function () {
          _Dispatcher2.default.publish('sidebar:update');
          if (_this7.props.sidebarNavItem) {
            _this7.props.sidebarNavItem.openSidebarNav(false, 45 - thisHeight, true);
          }
        });
      }
    }
  }, {
    key: 'toggleSidebarNav',
    value: function toggleSidebarNav() {
      if (this.state.height === 45) {
        this.openSidebarNav();
      } else {
        this.closeSidebarNav();
      }
    }
  }, {
    key: 'getTopmostLi',
    value: function getTopmostLi(node, li, original_node) {
      if (!original_node) original_node = node;
      while (node.parentNode) {
        if (node.parentNode.className.search('sidebar-nav-container') !== -1) {
          if (li) {
            return li;
          } else {
            return original_node;
          }
        }

        if (node.parentNode.nodeName.toLowerCase() === 'li') {
          li = node.parentNode;
        }
        node = node.parentNode;
      }
    }
  }, {
    key: 'getSiblingsLi',
    value: function getSiblingsLi(node) {
      var original_node = node;
      var sibilings = [];
      while (node.nextSibling) {
        sibilings.push(node.nextSibling);
        node = node.nextSibling;
      }
      node = original_node;
      while (node.previousSibling) {
        sibilings.push(node.previousSibling);
        node = node.previousSibling;
      }

      return sibilings;
    }
  }, {
    key: 'getSiblingsNav',
    value: function getSiblingsNav(node) {
      var original_node = node;
      var siblings = [];
      while (node.nextSibling) {
        if (node.nextSibling.className.search('sidebar-nav') !== -1) {
          siblings.push(node.nextSibling);
        }
        node = node.nextSibling;
      }
      node = original_node;
      while (node.previousSibling) {
        if (node.previousSibling.className.search('sidebar-nav') !== -1) {
          siblings.push(node.previousSibling);
        }
        node = node.previousSibling;
      }

      return siblings;
    }
  }, {
    key: 'getTopmostSidebar',
    value: function getTopmostSidebar(node) {
      while (node.parentNode) {
        if (node.parentNode.className.search('sidebar__main') !== -1) {
          return node.parentNode;
        }
        node = node.parentNode;
      }
    }
  }, {
    key: 'checkAndClose',
    value: function checkAndClose(props) {
      var node = _reactDom2.default.findDOMNode(this._node);

      var topmostLi = this.getTopmostLi(node);
      var topmostSiblingLis = this.getSiblingsLi(topmostLi);
      var siblingLis = this.getSiblingsLi(node);
      var topmostSidebar = this.getTopmostSidebar(node);
      var id = parseInt(topmostSidebar.getAttribute('data-id')) || 0;

      _Dispatcher2.default.publish('sidebar:controlbtn', { sidebar: id });
      _Dispatcher2.default.publish('sidebar:keychange', id);

      for (var i = siblingLis.length - 1; i >= 0; i--) {
        var li = siblingLis[i];
        if (li && typeof li.close === 'function') li.close();
      };

      for (var i = 0; i < topmostSiblingLis.length; i++) {
        var li = topmostSiblingLis[i];
        if (li && typeof li.close === 'function') li.close();
      }

      try {
        var height = node.getClientRects()[0].height;
        var top = node.getClientRects()[0].top;
        setTimeout(function () {
          _Dispatcher2.default.publish('sidebar:reposition', node, top, height);

          if ((0, _isTouchDevice2.default)()) {
            _Dispatcher2.default.publish('sidebar:closeSidebar');
          }
        }, 300);
      } catch (e) {}
    }
  }, {
    key: 'handleSearch',
    value: function handleSearch(text, id) {
      var links = this._node.getElementsByTagName('a');
      var link = links[0];

      if (id === this.props.SidebarNavID) {
        if (!this.props.hidden && links.length === 1) {
          if (link.innerText.toLowerCase().search(text.toLowerCase()) === -1) {
            this._node.style.display = 'none';
          } else {
            this._node.style.display = 'block';
          }
        } else if (links.length > 1) {
          if (this._node.innerText.toLowerCase().search(text.toLowerCase()) === -1) {
            this._node.style.display = 'none';
          } else {
            this._node.style.display = 'block';
          }
        }
      }
    }
  }, {
    key: 'closeNav',
    value: function closeNav() {
      this.closeSidebarNav();
    }
  }, {
    key: 'activateSidebar',
    value: function activateSidebar() {
      var found = false,
          route;
      for (var i = 0; i < this.routes.length; i++) {
        var r = this.routes[i];
        if (routesStore[r]) {
          route = r;
          found = true;
          break;
        }
      }
      if (found) {
        this.setState({
          active: true
        });

        this.checkAndClose(this.props);

        if (this.props.sidebarNavItem) {
          this.props.sidebarNavItem.openSidebarNav(true);
        }

        if (this.props.rootSidebarNavItem) {
          this.props.rootSidebarNavItem.openSidebarNav();
        }
      } else {
        this.setState({
          active: false
        });
      }
    }
  }, {
    key: 'closeSidebarRoot',
    value: function closeSidebarRoot() {
      if (!this.props.sidebarNavItem) {
        this.closeSidebarNav();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _Dispatcher2.default.unsubscribe(this.activateHandler);
      _Dispatcher2.default.unsubscribe(this.closeHandler);
      _Dispatcher2.default.unsubscribe(this.searchHandler);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.activateHandler = _Dispatcher2.default.subscribe('sidebar:activate', this.activateSidebar.bind(this));
      this.closeHandler = _Dispatcher2.default.subscribe('sidebar:close', this.closeSidebarRoot.bind(this));
      this.searchHandler = _Dispatcher2.default.subscribe('sidebar:search', this.handleSearch.bind(this));

      if (this.props.hasOwnProperty('href') && this.props.href.length && this.props.href !== '#') {
        routesStore[this.props.href] = this.state.active;

        this.routes.push(this.props.href);

        if (this.props.aliases) {
          for (var i = 0; i < this.props.aliases.length; i++) {
            var alias = this.props.aliases[i];
            this.routes.push(alias);
            routesStore[alias] = this.state.active;
          }
        }
      }

      var node = _reactDom2.default.findDOMNode(this._node);
      node.close = this.closeNav.bind(this);

      enableStateForPathname(this.props.router.location.pathname, this.props.router.params);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var classes = (0, _classnames2.default)({
        'open': this.state.open,
        'active': this.state.active,
        'sidebar-nav-item': true
      });
      var toggleClasses = (0, _classnames2.default)({
        'toggle-button': true,
        'open': this.state.toggleOpen,
        'opposite': this.state.opposite
      });
      var icon = null,
          toggleButton = null;
      if (this.props.children) {
        toggleButton = _react2.default.createElement(_Icon2.default, { className: toggleClasses.trim(), bundle: 'fontello', glyph: this.state.dir + '-open-3' });
      }
      if (this.props.glyph || this.props.bundle) {
        icon = _react2.default.createElement(_Icon2.default, { bundle: this.props.bundle, glyph: this.props.glyph });
      }
      var style = { height: this.props.autoHeight ? 'auto' : this.state.height };

      var props = {
        name: null,
        style: style,
        tabIndex: '-1',
        className: classes.trim()
      };

      var RouteLink = 'a';
      var componentProps = {
        name: null,
        tabIndex: -1,
        href: this.props.href || '',
        onClick: this.handleClick,
        style: { height: 45 }
      };

      var pointerEvents = 'all';
      if (this.props.hasOwnProperty('href') && this.props.href.length && this.props.href !== '#') {
        RouteLink = _reactRouter.Link;
        componentProps.to = this.props.href;
        delete componentProps.href;

        if (this.props.href.search(":") !== -1) {
          pointerEvents = 'none';
        }
      }

      var isRoot = this.props.sidebarNavItem ? false : true;

      var children = _react2.default.Children.map(this.props.children, function (el) {
        return _react2.default.cloneElement(el, {
          sidebarNavItem: _this8,
          SidebarNavID: _this8.props.SidebarNavID,
          rootSidebarNavItem: isRoot ? _this8 : _this8.props.rootSidebarNavItem
        });
      });

      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: { height: (0, _reactMotion.spring)(this.state.height, { stiffness: 300, damping: 20, precision: 0.0001 }) } },
        function (style) {
          return _react2.default.createElement(
            'li',
            (0, _extends3.default)({ ref: function ref(c) {
                return _this8._node = c;
              } }, props, { style: (0, _extends3.default)({ display: _this8.props.hidden ? 'none' : 'block', pointerEvents: pointerEvents }, style) }),
            _react2.default.createElement(
              RouteLink,
              componentProps,
              icon,
              _react2.default.createElement(
                'span',
                { className: 'name' },
                _this8.props.name
              ),
              toggleButton
            ),
            children
          );
        }
      );
    }
  }]);
  return SidebarNavItem;
}(_react2.default.Component), _class4.belongsTo = 'Sidebar', _temp3)) || _class3;

var SidebarControls = exports.SidebarControls = (_temp4 = _class5 = function (_React$Component4) {
  (0, _inherits3.default)(SidebarControls, _React$Component4);

  function SidebarControls() {
    (0, _classCallCheck3.default)(this, SidebarControls);
    return (0, _possibleConstructorReturn3.default)(this, (SidebarControls.__proto__ || (0, _getPrototypeOf2.default)(SidebarControls)).apply(this, arguments));
  }

  (0, _createClass3.default)(SidebarControls, [{
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)('sidebar-controls-container', this.props.className);
      var props = (0, _extends3.default)({
        dir: 'ltr'
      }, this.props, {
        className: classes
      });

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { children: null }),
        _react2.default.createElement(
          'ul',
          { className: 'sidebar-controls', tabIndex: '-1' },
          this.props.children
        )
      );
    }
  }]);
  return SidebarControls;
}(_react2.default.Component), _class5.belongsTo = 'Sidebar', _temp4);
var SidebarControlBtn = exports.SidebarControlBtn = (_temp5 = _class6 = function (_React$Component5) {
  (0, _inherits3.default)(SidebarControlBtn, _React$Component5);

  function SidebarControlBtn(props) {
    (0, _classCallCheck3.default)(this, SidebarControlBtn);

    var _this10 = (0, _possibleConstructorReturn3.default)(this, (SidebarControlBtn.__proto__ || (0, _getPrototypeOf2.default)(SidebarControlBtn)).call(this, props));

    _this10.handleClick = function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      _Dispatcher2.default.publish('sidebar:controlbtn', _this10.props);
      _Dispatcher2.default.publish('sidebar:keychange', _this10.props.sidebar);
    };

    _this10.state = {
      active: props.active || false
    };

    _this10.controlbtnHandler = null;
    return _this10;
  }

  (0, _createClass3.default)(SidebarControlBtn, [{
    key: 'handleState',
    value: function handleState(props) {
      if (props.hasOwnProperty('sidebar')) {
        if (props.sidebar === this.props.sidebar) {
          this.setState({ active: true });
        } else {
          this.setState({ active: false });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _Dispatcher2.default.unsubscribe(this.controlbtnHandler);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.controlbtnHandler = _Dispatcher2.default.subscribe('sidebar:controlbtn', this.handleState.bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)('sidebar-control-btn', {
        'active': this.state.active
      }, this.props.className);

      var props = (0, _extends3.default)({
        tabIndex: '-1',
        onClick: this.handleClick
      }, this.props, {
        className: classes.trim()
      });

      delete props.glyph;
      delete props.bundle;
      delete props.sidebar;

      return _react2.default.createElement(
        'li',
        props,
        _react2.default.createElement(
          'a',
          { href: '#', tabIndex: '-1' },
          _react2.default.createElement(_Icon2.default, { bundle: this.props.bundle, glyph: this.props.glyph })
        )
      );
    }
  }]);
  return SidebarControlBtn;
}(_react2.default.Component), _class6.belongsTo = 'Sidebar', _temp5);
var SidebarBtn = exports.SidebarBtn = (_temp7 = _class7 = function (_React$Component6) {
  (0, _inherits3.default)(SidebarBtn, _React$Component6);

  function SidebarBtn() {
    var _ref;

    var _temp6, _this11, _ret;

    (0, _classCallCheck3.default)(this, SidebarBtn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp6 = (_this11 = (0, _possibleConstructorReturn3.default)(this, (_ref = SidebarBtn.__proto__ || (0, _getPrototypeOf2.default)(SidebarBtn)).call.apply(_ref, [this].concat(args))), _this11), _this11.handleSidebarStateChange = function () {
      var visible = _this11.props.visible;


      if (!visible) {
        _Dispatcher2.default.publish('sidebar');
        return;
      }

      if ((0, _isBrowser2.default)()) {
        if (window.hasOwnProperty('Rubix')) {
          Rubix.redraw();
        }
      }

      _Dispatcher2.default.publish('sidebar:toggleSidebar');
    }, _temp6), (0, _possibleConstructorReturn3.default)(_this11, _ret);
  }

  (0, _createClass3.default)(SidebarBtn, [{
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)({
        'pull-left': true,
        'visible-xs-inline-block': !this.props.visible
      }, this.props.className);

      var props = (0, _extends3.default)({}, this.props, {
        className: classes
      });

      delete props.visible;

      return _react2.default.createElement(
        _Nav2.default,
        (0, _extends3.default)({}, props, { onSelect: this.handleSidebarStateChange }),
        _react2.default.createElement(
          _NavItem2.default,
          { 'data-id': 'sidebar-btn', className: 'sidebar-btn', href: '/' },
          _react2.default.createElement(_Icon2.default, { bundle: 'fontello', glyph: 'th-list-5' })
        )
      );
    }
  }]);
  return SidebarBtn;
}(_react2.default.Component), _class7.belongsTo = 'Sidebar', _temp7);
var SidebarDivider = exports.SidebarDivider = (_temp8 = _class8 = function (_React$Component7) {
  (0, _inherits3.default)(SidebarDivider, _React$Component7);

  function SidebarDivider() {
    (0, _classCallCheck3.default)(this, SidebarDivider);
    return (0, _possibleConstructorReturn3.default)(this, (SidebarDivider.__proto__ || (0, _getPrototypeOf2.default)(SidebarDivider)).apply(this, arguments));
  }

  (0, _createClass3.default)(SidebarDivider, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('hr', { style: {
          borderColor: this.props.color,
          borderWidth: 2,
          marginTop: 15,
          marginBottom: 0,
          width: 200 } });
    }
  }]);
  return SidebarDivider;
}(_react2.default.Component), _class8.belongsTo = 'Sidebar', _class8.propTypes = {
  color: _react2.default.PropTypes.string
}, _class8.defaultProps = {
  color: '#3B4648'
}, _temp8);