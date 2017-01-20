'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initGoogleAnalytics;

var _isBrowser = require('../isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initGoogleAnalytics() {
  if ((0, _isBrowser2.default)()) {
    if (window.hasOwnProperty('ga') && typeof window.ga === 'function') {
      window.ga('send', 'pageview', {
        'page': window.location.pathname + window.location.search + window.location.hash
      });
    }
  }
};