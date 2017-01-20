'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _QueryAggregator2 = require('@sketchpixy/react-router-relay/lib/QueryAggregator');

var _QueryAggregator3 = _interopRequireDefault(_QueryAggregator2);

var _getAggregateContainer = require('./getAggregateContainer');

var _getAggregateContainer2 = _interopRequireDefault(_getAggregateContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IsomorphicQueryAggregator = function (_QueryAggregator) {
  (0, _inherits3.default)(IsomorphicQueryAggregator, _QueryAggregator);

  function IsomorphicQueryAggregator() {
    (0, _classCallCheck3.default)(this, IsomorphicQueryAggregator);
    return (0, _possibleConstructorReturn3.default)(this, _QueryAggregator.apply(this, arguments));
  }

  IsomorphicQueryAggregator.prototype.updateQueryConfig = function updateQueryConfig(routerProps) {
    _QueryAggregator.prototype.updateQueryConfig.call(this, routerProps);

    this.Container = (0, _getAggregateContainer2.default)(this.fragmentSpecs);
  };

  return IsomorphicQueryAggregator;
}(_QueryAggregator3.default);

exports.default = IsomorphicQueryAggregator;
