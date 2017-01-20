'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NavDropdownHover = exports.NavDropdownHoverHOC = exports.NavDropdownHOC = undefined;

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

var _class4, _class5;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _BNavDropdown = require('./BNavDropdown');

var _BNavDropdown2 = _interopRequireDefault(_BNavDropdown);

var _isBrowser = require('./isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

var _isTouchDevice = require('./isTouchDevice');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestFrame = null,
    rAF = function rAF() {},
    cAF = function cAF() {};

if ((0, _isBrowser2.default)()) {
  requestFrame = require('request-frame');
  rAF = requestFrame('request');
  cAF = requestFrame('cancel');
}

var expectedTypes = ["success", "warning", "danger", "info", "default", "primary", "link"];

function isBtnOfType(type) {
  for (var i = 0; i < expectedTypes.length; i++) {
    if (expectedTypes[i] === type) {
      return true;
    }
  }
  return false;
}

var NavDropdownHOC = exports.NavDropdownHOC = function NavDropdownHOC(ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    (0, _inherits3.default)(_class, _React$Component);

    function _class() {
      (0, _classCallCheck3.default)(this, _class);
      return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, [{
      key: 'render',
      value: function render() {
        var props = (0, _extends3.default)({}, this.props);

        if (this.props.hasOwnProperty('xs')) {
          props.bsSize = 'xsmall';
          delete props.xs;
        }

        if (this.props.hasOwnProperty('sm')) {
          props.bsSize = 'small';
          delete props.sm;
        }

        if (this.props.hasOwnProperty('lg')) {
          props.bsSize = 'large';
          delete props.lg;
        }

        if (this.props.hasOwnProperty('bsStyle') && typeof this.props.bsStyle === 'string') {
          var styles = this.props.bsStyle.split(/\s|\,/mgi).filter(function (a) {
            return a;
          });
          for (var i = 0; i < styles.length; i++) {
            if (styles[i] === 'link') {
              props.bsClass = 'menu-default dropdown';
            } else {
              props.bsClass = 'menu-' + styles[i] + ' dropdown';
            }
            if (isBtnOfType(styles[i])) {
              props.bsStyle = styles[i];
            } else {
              props.bsStyle = 'default';
            }
          }
        }

        if (!props.bsStyle) {
          props.bsStyle = 'default';
        }

        if (!props.bsClass) {
          props.bsClass = 'menu-default dropdown';
        }

        if (props.hasOwnProperty('dropup')) {
          props.bsClass = 'dropup ' + props.bsClass;
        }

        delete props.dropup;

        return _react2.default.createElement(ComposedComponent, { buttonProps: props });
      }
    }]);
    return _class;
  }(_react2.default.Component), _class.displayName = 'NavDropdown', _class.propTypes = {
    xs: _react2.default.PropTypes.bool,
    sm: _react2.default.PropTypes.bool,
    lg: _react2.default.PropTypes.bool
  }, _temp;
};

var NavDropdownHoverHOC = exports.NavDropdownHoverHOC = function NavDropdownHoverHOC(ComposedComponent) {
  var _class2, _class3, _temp2;

  return NavDropdownHOC(_class2 = (_temp2 = _class3 = function (_React$Component2) {
    (0, _inherits3.default)(_class2, _React$Component2);

    function _class2(props) {
      (0, _classCallCheck3.default)(this, _class2);

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (_class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call(this, props));

      _this2.state = {
        open: false
      };

      _this2._eventObject = {
        handleEvent: _this2._handleOver.bind(_this2),
        name: 'NavDropdownHoverEvent'
      };

      _this2._timeout = null;
      return _this2;
    }

    (0, _createClass3.default)(_class2, [{
      key: '_isWithinDropdown',
      value: function _isWithinDropdown(node) {
        var componentNode = _reactDom2.default.findDOMNode(this._node);
        return componentNode.contains(node) || componentNode === node;
      }
    }, {
      key: '_handleOver',
      value: function _handleOver(e) {
        var _this3 = this;

        if (this._isWithinDropdown(e.target)) {
          cAF(this._timeout);
          this.setState({ open: true });
        } else {
          this._timeout = rAF(function () {
            _this3.setState({ open: false });
          });
        }
      }
    }, {
      key: '_onToggle',
      value: function _onToggle(isOpen) {
        this.setState({ open: isOpen });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (!(0, _isTouchDevice2.default)()) {
          document.removeEventListener('mouseover', this._eventObject);
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this4 = this;

        if (!(0, _isTouchDevice2.default)()) {
          rAF(function () {
            document.addEventListener('mouseover', _this4._eventObject);
          });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this5 = this;

        return _react2.default.createElement(ComposedComponent, { ref: function ref(node) {
            return _this5._node = node;
          },
          onToggle: this._onToggle.bind(this),
          open: this.state.open,
          buttonProps: this.props.buttonProps });
      }
    }]);
    return _class2;
  }(_react2.default.Component), _class3.displayName = 'NavDropdownHover', _temp2)) || _class2;
};

var NavDropdownHover = exports.NavDropdownHover = NavDropdownHoverHOC(_class4 = function (_React$Component3) {
  (0, _inherits3.default)(NavDropdownHover, _React$Component3);

  function NavDropdownHover() {
    (0, _classCallCheck3.default)(this, NavDropdownHover);
    return (0, _possibleConstructorReturn3.default)(this, (NavDropdownHover.__proto__ || (0, _getPrototypeOf2.default)(NavDropdownHover)).apply(this, arguments));
  }

  (0, _createClass3.default)(NavDropdownHover, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_BNavDropdown2.default, (0, _extends3.default)({ open: this.props.open,
        onToggle: this.props.onToggle
      }, this.props.buttonProps));
    }
  }]);
  return NavDropdownHover;
}(_react2.default.Component)) || _class4;

var NavDropdown = NavDropdownHOC(_class5 = function (_React$Component4) {
  (0, _inherits3.default)(NavDropdown, _React$Component4);

  function NavDropdown() {
    (0, _classCallCheck3.default)(this, NavDropdown);
    return (0, _possibleConstructorReturn3.default)(this, (NavDropdown.__proto__ || (0, _getPrototypeOf2.default)(NavDropdown)).apply(this, arguments));
  }

  (0, _createClass3.default)(NavDropdown, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_BNavDropdown2.default, this.props.buttonProps);
    }
  }]);
  return NavDropdown;
}(_react2.default.Component)) || _class5;

exports.default = NavDropdown;