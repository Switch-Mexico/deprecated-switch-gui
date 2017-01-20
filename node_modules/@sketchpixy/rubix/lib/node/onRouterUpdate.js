'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onRouterUpdate;

var _isBrowser = require('../isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

var _Dispatcher = require('../Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _isTouchDevice = require('../isTouchDevice');

var _isTouchDevice2 = _interopRequireDefault(_isTouchDevice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isSetup = false;
function onRouterUpdate() {
  if ((0, _isBrowser2.default)()) {
    // in browser
    if (window.Rubix) {
      if (isSetup) {
        window.Rubix.Cleanup();
      }

      isSetup = true;
    }

    if (window.Pace) Pace.restart();

    if ((0, _isTouchDevice2.default)()) {
      // close sidebar on router update
      _Dispatcher2.default.publish('sidebar', false);
    }
  }
}