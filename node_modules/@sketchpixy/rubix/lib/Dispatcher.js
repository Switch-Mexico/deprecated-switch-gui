'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pubsubJs = require('pubsub-js');

var _pubsubJs2 = _interopRequireDefault(_pubsubJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dispatcher = {
  subscribe: function subscribe(event, callback) {
    var _this = this;

    var token = _pubsubJs2.default.subscribe(event, function (msg, data) {
      callback.apply(_this, data);
    });

    return token;
  },
  unsubscribe: _pubsubJs2.default.unsubscribe,
  publish: function publish(event) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    _pubsubJs2.default.publish(event, args);
  }
};

exports.default = Dispatcher;