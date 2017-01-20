'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterRelay = require('@sketchpixy/react-router-relay');

var _reactRouterRelay2 = _interopRequireDefault(_reactRouterRelay);

var _IsomorphicRelayRouterContext = require('./IsomorphicRelayRouterContext');

var _IsomorphicRelayRouterContext2 = _interopRequireDefault(_IsomorphicRelayRouterContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRouter.applyRouterMiddleware)({
  renderRouterContext: function renderRouterContext(child, props) {
    return _react2.default.createElement(
      _IsomorphicRelayRouterContext2.default,
      props,
      child
    );
  },

  renderRouteComponent: _reactRouterRelay2.default.renderRouteComponent
});
