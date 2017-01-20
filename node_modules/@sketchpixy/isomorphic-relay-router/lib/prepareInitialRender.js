'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = prepareInitialRender;

var _isomorphicRelay = require('isomorphic-relay');

var _isomorphicRelay2 = _interopRequireDefault(_isomorphicRelay);

var _IsomorphicQueryAggregator = require('./IsomorphicQueryAggregator');

var _IsomorphicQueryAggregator2 = _interopRequireDefault(_IsomorphicQueryAggregator);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareInitialRender(environment, renderProps) {
  var queryAggregator = new _IsomorphicQueryAggregator2.default(renderProps);

  return _isomorphicRelay2.default.prepareInitialRender({
    environment: environment,
    Container: queryAggregator.Container,
    queryConfig: queryAggregator.queryConfig
  }).then(function (_ref) {
    var initialReadyState = _ref.initialReadyState;
    return (0, _extends3.default)({}, renderProps, {
      environment: environment,
      initialReadyState: initialReadyState,
      queryAggregator: queryAggregator,
      render: _render2.default
    });
  });
}