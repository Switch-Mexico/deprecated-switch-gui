'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelBody = exports.PanelRight = exports.PanelLeft = exports.PanelFooter = exports.PanelHeader = exports.Panel = exports.PanelTabContainer = exports.default = undefined;

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

var _class, _temp, _class2, _temp2, _class3, _temp3;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _TabContainer = require('react-bootstrap/lib/TabContainer');

var _TabContainer2 = _interopRequireDefault(_TabContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PanelContainer = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(PanelContainer, _React$Component);

  function PanelContainer() {
    var _ref;

    (0, _classCallCheck3.default)(this, PanelContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = PanelContainer.__proto__ || (0, _getPrototypeOf2.default)(PanelContainer)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      collapse: false, style: {}, hidden: false, glyph: 'minus'
    };
    return _this;
  }

  (0, _createClass3.default)(PanelContainer, [{
    key: 'getBtnProps',
    value: function getBtnProps(func) {
      return {
        onClick: func,
        onTouchEnd: func
      };
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.setState({
        collapse: true
      });

      if (this.props.onRemove) this.props.onRemove();
    }
  }, {
    key: 'show',
    value: function show() {
      this.setState({
        hidden: false,
        glyph: 'minus',
        style: {}
      });

      if (this.props.onShow) this.props.onShow();
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({
        hidden: true,
        glyph: 'plus',
        style: {
          height: 16,
          overflow: 'hidden'
        }
      });

      this._node.scrollTop = 0;

      if (this.props.onHide) this.props.onHide();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.state.hidden) {
        this.show();
      } else {
        this.hide();
      }

      if (this.props.onToggle) this.props.onToggle();
    }
  }, {
    key: 'maximize',
    value: function maximize() {
      if (this.props.handleMaximize) {
        this.props.handleMaximize();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2, oldProps) {
      var minimize = _ref2.minimize;

      if (minimize === oldProps.minimize) return;

      if (minimize === true) {
        this.hide();
      } else if (minimize === false) {
        this.show();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.minimize === true) {
        this.hide();
      }
    }
  }, {
    key: 'renderControls',
    value: function renderControls() {
      return _react2.default.createElement(
        'div',
        { className: 'rubix-panel-controls' },
        _react2.default.createElement(
          _Button2.default,
          this.getBtnProps(this.maximize.bind(this)),
          _react2.default.createElement(_Icon2.default, { bundle: 'fontello', glyph: 'loop-alt-1' })
        ),
        _react2.default.createElement(
          _Button2.default,
          this.getBtnProps(this.toggle.bind(this)),
          _react2.default.createElement(_Icon2.default, { bundle: 'fontello', glyph: this.state.glyph })
        ),
        _react2.default.createElement(
          _Button2.default,
          this.getBtnProps(this.remove.bind(this)),
          _react2.default.createElement(_Icon2.default, { bundle: 'fontello', glyph: 'cancel' })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = (0, _extends3.default)({}, this.props);
      var controls = this.renderControls();

      if (props.controls === false) {
        controls = null;
      } else if (props.controls !== undefined) {
        controls = _react2.default.createElement(
          'div',
          { className: 'rubix-panel-controls' },
          this.props.controls
        );
      }

      props.className = (0, _classnames2.default)('rubix-panel-container-with-controls', props.className, {
        active: this.state.style.height === 16
      });

      var panelClassname = (0, _classnames2.default)('rubix-panel-container', {
        'bordered': this.props.bordered,
        'panel-plain': this.props.plain,
        'noOverflow': this.props.noOverflow,
        'panel-gutter-bottom': this.props.gutterBottom,
        'panel-collapse-bottom': this.props.collapseBottom
      }, this.props.containerClasses);

      if (this.state.collapse) return null;

      delete props.minimize;
      delete props.controls;
      delete props.containerClasses;
      delete props.collapseBottom;
      delete props.gutterBottom;
      delete props.noOverflow;
      delete props.bordered;
      delete props.plain;
      delete props.onMaximize;
      delete props.onShow;
      delete props.onHide;
      delete props.onToggle;
      delete props.onRemove;
      delete props.defaultActiveKey;
      delete props.generateChildId;
      delete props.onSelect;

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { ref: function ref(c) {
            return _this2._node = c;
          } }),
        controls,
        _react2.default.createElement(
          'div',
          { className: panelClassname, style: this.state.style },
          this.props.children
        )
      );
    }
  }]);
  return PanelContainer;
}(_react2.default.Component), _class.propTypes = {
  controls: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.element]),
  minimize: _react2.default.PropTypes.bool,
  containerClasses: _react2.default.PropTypes.string,
  collapseBottom: _react2.default.PropTypes.bool,
  gutterBottom: _react2.default.PropTypes.bool,
  noOverflow: _react2.default.PropTypes.bool,
  bordered: _react2.default.PropTypes.bool,
  plain: _react2.default.PropTypes.bool,
  onMaximize: _react2.default.PropTypes.func,
  onShow: _react2.default.PropTypes.func,
  onHide: _react2.default.PropTypes.func,
  onToggle: _react2.default.PropTypes.func,
  onRemove: _react2.default.PropTypes.func
}, _temp);
exports.default = PanelContainer;
var PanelTabContainer = exports.PanelTabContainer = (_temp2 = _class2 = function (_React$Component2) {
  (0, _inherits3.default)(PanelTabContainer, _React$Component2);

  function PanelTabContainer() {
    (0, _classCallCheck3.default)(this, PanelTabContainer);
    return (0, _possibleConstructorReturn3.default)(this, (PanelTabContainer.__proto__ || (0, _getPrototypeOf2.default)(PanelTabContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelTabContainer, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props, {
        className: (0, _classnames2.default)('panel-tab-container', this.props.className)
      });

      return _react2.default.createElement(
        _TabContainer2.default,
        { id: this.props.id, defaultActiveKey: this.props.defaultActiveKey, onSelect: this.props.onSelect, generateChildId: this.props.generateChildId },
        _react2.default.createElement(PanelContainer, (0, _extends3.default)({}, props, { id: null, defaultActiveKey: null, onSelect: null, generateChildId: null }))
      );
    }
  }]);
  return PanelTabContainer;
}(_react2.default.Component), _class2.propTypes = {
  id: _react2.default.PropTypes.string.isRequired,
  defaultActiveKey: _react2.default.PropTypes.any,
  onSelect: _react2.default.PropTypes.func,
  generateChildId: _react2.default.PropTypes.func
}, _temp2);
var Panel = exports.Panel = (_temp3 = _class3 = function (_React$Component3) {
  (0, _inherits3.default)(Panel, _React$Component3);

  function Panel() {
    (0, _classCallCheck3.default)(this, Panel);
    return (0, _possibleConstructorReturn3.default)(this, (Panel.__proto__ || (0, _getPrototypeOf2.default)(Panel)).apply(this, arguments));
  }

  (0, _createClass3.default)(Panel, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);
      props.className = (0, _classnames2.default)('rubix-panel', {
        horizontal: props.horizontal
      }, props.className);

      delete props.horizontal;

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { children: null }),
        _react2.default.createElement(
          'div',
          null,
          this.props.children
        )
      );
    }
  }]);
  return Panel;
}(_react2.default.Component), _class3.propTypes = {
  horizontal: _react2.default.PropTypes.bool
}, _temp3);

var PanelHeader = exports.PanelHeader = function (_React$Component4) {
  (0, _inherits3.default)(PanelHeader, _React$Component4);

  function PanelHeader() {
    (0, _classCallCheck3.default)(this, PanelHeader);
    return (0, _possibleConstructorReturn3.default)(this, (PanelHeader.__proto__ || (0, _getPrototypeOf2.default)(PanelHeader)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelHeader, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);
      props.className = (0, _classnames2.default)('rubix-panel-header', props.className);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { children: null }),
        this.props.children
      );
    }
  }]);
  return PanelHeader;
}(_react2.default.Component);

var PanelFooter = exports.PanelFooter = function (_React$Component5) {
  (0, _inherits3.default)(PanelFooter, _React$Component5);

  function PanelFooter() {
    (0, _classCallCheck3.default)(this, PanelFooter);
    return (0, _possibleConstructorReturn3.default)(this, (PanelFooter.__proto__ || (0, _getPrototypeOf2.default)(PanelFooter)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelFooter, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);
      props.className = (0, _classnames2.default)('rubix-panel-footer', props.className);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { children: null }),
        this.props.children
      );
    }
  }]);
  return PanelFooter;
}(_react2.default.Component);

var PanelLeft = exports.PanelLeft = function (_React$Component6) {
  (0, _inherits3.default)(PanelLeft, _React$Component6);

  function PanelLeft() {
    (0, _classCallCheck3.default)(this, PanelLeft);
    return (0, _possibleConstructorReturn3.default)(this, (PanelLeft.__proto__ || (0, _getPrototypeOf2.default)(PanelLeft)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelLeft, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);
      props.className = (0, _classnames2.default)('rubix-panel-left', props.className);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { children: null }),
        this.props.children
      );
    }
  }]);
  return PanelLeft;
}(_react2.default.Component);

var PanelRight = exports.PanelRight = function (_React$Component7) {
  (0, _inherits3.default)(PanelRight, _React$Component7);

  function PanelRight() {
    (0, _classCallCheck3.default)(this, PanelRight);
    return (0, _possibleConstructorReturn3.default)(this, (PanelRight.__proto__ || (0, _getPrototypeOf2.default)(PanelRight)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelRight, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);
      props.className = (0, _classnames2.default)('rubix-panel-right', props.className);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { children: null }),
        this.props.children
      );
    }
  }]);
  return PanelRight;
}(_react2.default.Component);

var PanelBody = exports.PanelBody = function (_React$Component8) {
  (0, _inherits3.default)(PanelBody, _React$Component8);

  function PanelBody() {
    (0, _classCallCheck3.default)(this, PanelBody);
    return (0, _possibleConstructorReturn3.default)(this, (PanelBody.__proto__ || (0, _getPrototypeOf2.default)(PanelBody)).apply(this, arguments));
  }

  (0, _createClass3.default)(PanelBody, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props);
      props.className = (0, _classnames2.default)('rubix-panel-body', props.className);

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, props, { children: null }),
        this.props.children
      );
    }
  }]);
  return PanelBody;
}(_react2.default.Component);