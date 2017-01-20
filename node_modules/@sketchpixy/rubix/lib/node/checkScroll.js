'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkScroll;

var _isBrowser = require('../isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

var _onRouterUpdate = require('./onRouterUpdate');

var _onRouterUpdate2 = _interopRequireDefault(_onRouterUpdate);

var _ga = require('./ga');

var _ga2 = _interopRequireDefault(_ga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkScroll(prevRouterProps, _ref) {
  var location = _ref.location;

  // change of page
  // onRouterUpdate();
  (0, _ga2.default)();

  if (prevRouterProps && location.pathname !== prevRouterProps.location.pathname) {
    if ((0, _isBrowser2.default)()) {
      var container = document.getElementById('container');
      if (container) {
        container.scrollTop = 0;
        return true;
      }
    }
    return false;
  }

  return true;
}