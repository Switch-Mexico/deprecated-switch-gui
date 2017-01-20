'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DropdownHoverButtonHOC = exports.DropdownButtonHOC = undefined;

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

var _class4;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownButton = require('react-bootstrap/lib/DropdownButton');

var _DropdownButton2 = _interopRequireDefault(_DropdownButton);

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

var DropdownButtonHOC = exports.DropdownButtonHOC = function DropdownButtonHOC(ComposedComponent) {
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
            props.className = (0, _classnames2.default)(props.className, 'btn-' + styles[i]);
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

        if (!props.className) {
          props.className = 'btn-default';
        }

        if (!props.bsClass) {
          props.bsClass = 'menu-default dropdown';
        }

        if (props.hasOwnProperty('dropup')) {
          props.bsClass = 'dropup ' + props.bsClass;
        }

        if (props.retainBackground) {
          props.className = (0, _classnames2.default)(props.className, 'btn-retainBg');
        }

        if (props.rounded) {
          props.className = (0, _classnames2.default)(props.className, 'btn-rounded');
        }

        if (props.onlyOnHover) {
          props.className = (0, _classnames2.default)(props.className, 'btn-onlyOnHover');
        }

        if (props.inverse || props.retainBackground) {
          props.className = (0, _classnames2.default)(props.className, 'btn-inverse');
        }

        if (props.outlined || props.onlyOnHover || props.inverse || props.retainBackground) {
          props.className = (0, _classnames2.default)(props.className, 'btn-outlined');
        }

        delete props.retainBackground;
        delete props.onlyOnHover;
        delete props.outlined;
        delete props.rounded;
        delete props.inverse;
        delete props.dropup;

        return _react2.default.createElement(ComposedComponent, { buttonProps: props });
      }
    }]);
    return _class;
  }(_react2.default.Component), _class.displayName = 'DropdownButton', _class.propTypes = {
    xs: _react2.default.PropTypes.bool,
    sm: _react2.default.PropTypes.bool,
    lg: _react2.default.PropTypes.bool,
    rounded: _react2.default.PropTypes.bool,
    onlyOnHover: _react2.default.PropTypes.bool,
    retainBackground: _react2.default.PropTypes.bool,
    inverse: _react2.default.PropTypes.bool,
    outlined: _react2.default.PropTypes.bool
  }, _temp;
};

var DropdownHoverButtonHOC = exports.DropdownHoverButtonHOC = function DropdownHoverButtonHOC(ComposedComponent) {
  var _class2, _class3, _temp2;

  return DropdownButtonHOC(_class2 = (_temp2 = _class3 = function (_React$Component2) {
    (0, _inherits3.default)(_class2, _React$Component2);

    function _class2(props) {
      (0, _classCallCheck3.default)(this, _class2);

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (_class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call(this, props));

      _this2.state = {
        open: false
      };

      _this2._eventObject = {
        handleEvent: _this2._handleOver.bind(_this2),
        name: 'DropdownHoverEvent'
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
  }(_react2.default.Component), _class3.displayName = 'DropdownHoverButton', _temp2)) || _class2;
};

var DropdownButton = DropdownButtonHOC(_class4 = function (_React$Component3) {
  (0, _inherits3.default)(DropdownButton, _React$Component3);

  function DropdownButton() {
    (0, _classCallCheck3.default)(this, DropdownButton);
    return (0, _possibleConstructorReturn3.default)(this, (DropdownButton.__proto__ || (0, _getPrototypeOf2.default)(DropdownButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(DropdownButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_DropdownButton2.default, this.props.buttonProps);
    }
  }]);
  return DropdownButton;
}(_react2.default.Component)) || _class4;

exports.default = DropdownButton;