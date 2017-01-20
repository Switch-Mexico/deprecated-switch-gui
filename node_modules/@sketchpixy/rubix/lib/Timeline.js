'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineBody = exports.TimelineTitle = exports.TimelineAvatar = exports.TimelineIcon = exports.TimelineHeader = exports.TimelineItem = exports.TimelineView = undefined;

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimelineView = exports.TimelineView = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(TimelineView, _React$Component);

  function TimelineView() {
    (0, _classCallCheck3.default)(this, TimelineView);
    return (0, _possibleConstructorReturn3.default)(this, (TimelineView.__proto__ || (0, _getPrototypeOf2.default)(TimelineView)).apply(this, arguments));
  }

  (0, _createClass3.default)(TimelineView, [{
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)({
        'rubix-timeline-view': true,
        'rubix-timeline-centered': this.props.centered || false,
        'rubix-timeline-with-header': this.props.withHeader || false,
        'rubix-timeline-normal': !this.props.withHeader
      }, this.props.className);

      var props = (0, _extends3.default)({}, this.props, {
        centered: null,
        withHeader: null,
        className: classes.trim()
      });

      delete props.centered;
      delete props.withHeader;

      return _react2.default.createElement(
        'div',
        props,
        this.props.children
      );
    }
  }]);
  return TimelineView;
}(_react2.default.Component), _class.propTypes = {
  centered: _react2.default.PropTypes.bool,
  withHeader: _react2.default.PropTypes.bool
}, _temp);

var TimelineItem = exports.TimelineItem = function (_React$Component2) {
  (0, _inherits3.default)(TimelineItem, _React$Component2);

  function TimelineItem() {
    (0, _classCallCheck3.default)(this, TimelineItem);
    return (0, _possibleConstructorReturn3.default)(this, (TimelineItem.__proto__ || (0, _getPrototypeOf2.default)(TimelineItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(TimelineItem, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props, {
        className: (0, _classnames2.default)('rubix-timeline-item', this.props.className)
      });

      return _react2.default.createElement(
        'div',
        props,
        this.props.children
      );
    }
  }]);
  return TimelineItem;
}(_react2.default.Component);

var TimelineHeader = exports.TimelineHeader = function (_React$Component3) {
  (0, _inherits3.default)(TimelineHeader, _React$Component3);

  function TimelineHeader() {
    (0, _classCallCheck3.default)(this, TimelineHeader);
    return (0, _possibleConstructorReturn3.default)(this, (TimelineHeader.__proto__ || (0, _getPrototypeOf2.default)(TimelineHeader)).apply(this, arguments));
  }

  (0, _createClass3.default)(TimelineHeader, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props, {
        className: (0, _classnames2.default)('rubix-timeline-header', this.props.className)
      });

      return _react2.default.createElement(
        'div',
        props,
        this.props.children
      );
    }
  }]);
  return TimelineHeader;
}(_react2.default.Component);

var TimelineIcon = exports.TimelineIcon = function (_React$Component4) {
  (0, _inherits3.default)(TimelineIcon, _React$Component4);

  function TimelineIcon() {
    (0, _classCallCheck3.default)(this, TimelineIcon);
    return (0, _possibleConstructorReturn3.default)(this, (TimelineIcon.__proto__ || (0, _getPrototypeOf2.default)(TimelineIcon)).apply(this, arguments));
  }

  (0, _createClass3.default)(TimelineIcon, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props, {
        className: (0, _classnames2.default)('rubix-timeline-icon', this.props.className)
      });

      return _react2.default.createElement(_Icon2.default, props);
    }
  }]);
  return TimelineIcon;
}(_react2.default.Component);

var TimelineAvatar = exports.TimelineAvatar = function (_React$Component5) {
  (0, _inherits3.default)(TimelineAvatar, _React$Component5);

  function TimelineAvatar() {
    (0, _classCallCheck3.default)(this, TimelineAvatar);
    return (0, _possibleConstructorReturn3.default)(this, (TimelineAvatar.__proto__ || (0, _getPrototypeOf2.default)(TimelineAvatar)).apply(this, arguments));
  }

  (0, _createClass3.default)(TimelineAvatar, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({
        width: 30,
        height: 30
      }, this.props, {
        className: (0, _classnames2.default)('rubix-timeline-avatar', this.props.className),
        style: {
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 100,
          padding: 2,
          position: 'absolute',
          top: 0
        }
      });

      return _react2.default.createElement('img', props);
    }
  }]);
  return TimelineAvatar;
}(_react2.default.Component);

var TimelineTitle = exports.TimelineTitle = function (_React$Component6) {
  (0, _inherits3.default)(TimelineTitle, _React$Component6);

  function TimelineTitle() {
    (0, _classCallCheck3.default)(this, TimelineTitle);
    return (0, _possibleConstructorReturn3.default)(this, (TimelineTitle.__proto__ || (0, _getPrototypeOf2.default)(TimelineTitle)).apply(this, arguments));
  }

  (0, _createClass3.default)(TimelineTitle, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props, {
        className: (0, _classnames2.default)('rubix-timeline-title', this.props.className)
      });

      return _react2.default.createElement(
        'div',
        props,
        this.props.children
      );
    }
  }]);
  return TimelineTitle;
}(_react2.default.Component);

var TimelineBody = exports.TimelineBody = function (_React$Component7) {
  (0, _inherits3.default)(TimelineBody, _React$Component7);

  function TimelineBody() {
    (0, _classCallCheck3.default)(this, TimelineBody);
    return (0, _possibleConstructorReturn3.default)(this, (TimelineBody.__proto__ || (0, _getPrototypeOf2.default)(TimelineBody)).apply(this, arguments));
  }

  (0, _createClass3.default)(TimelineBody, [{
    key: 'render',
    value: function render() {
      var props = (0, _extends3.default)({}, this.props, {
        className: (0, _classnames2.default)('rubix-timeline-body', this.props.className)
      });

      return _react2.default.createElement(
        'div',
        props,
        this.props.children
      );
    }
  }]);
  return TimelineBody;
}(_react2.default.Component);