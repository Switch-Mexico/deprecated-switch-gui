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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Icon, _React$Component);

  function Icon() {
    (0, _classCallCheck3.default)(this, Icon);
    return (0, _possibleConstructorReturn3.default)(this, (Icon.__proto__ || (0, _getPrototypeOf2.default)(Icon)).apply(this, arguments));
  }

  (0, _createClass3.default)(Icon, [{
    key: 'render',
    value: function render() {
      var _glyph = this.props.glyph || "";
      var _bundle = this.props.bundle || "";
      var isGlyphicon = _glyph.search('glyphicon') !== -1 || _bundle.search('glyphicon') !== -1;

      var iconString = _bundle + '-' + _glyph;
      var bundle = _bundle.length ? !isGlyphicon ? 'icon-' + iconString : iconString : null;
      var glyph = !_bundle.length ? _glyph : '';

      var classes = (0, _classnames2.default)(this.props.className, bundle, glyph, {
        'glyphicon': isGlyphicon,
        'rubix-icon': !isGlyphicon,
        'form-control-feedback': this.props.feedback
      });

      var props = (0, _extends3.default)({}, this.props, {
        className: classes
      });

      delete props.glyph;
      delete props.bundle;

      return _react2.default.createElement('span', props);
    }
  }]);
  return Icon;
}(_react2.default.Component), _class.propTypes = {
  bundle: _react2.default.PropTypes.string,
  glyph: _react2.default.PropTypes.string.isRequired
}, _temp);
exports.default = Icon;