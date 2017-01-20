'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = prepareInitialRender;

var _reactRelay = require('react-relay');

var _reactRelay2 = _interopRequireDefault(_reactRelay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareInitialRender(props) {
  return new _promise2.default(function (resolve) {
    var querySet = _reactRelay2.default.getQueries(props.Container, props.queryConfig);
    var fetchMethod = props.forceFetch ? 'forceFetch' : 'primeCache';
    var request = props.environment[fetchMethod](querySet, onReadyStateChange);

    function onReadyStateChange(readyState) {
      if (readyState.aborted || readyState.error || readyState.ready) {
        request.abort();

        resolve((0, _extends3.default)({}, props, {
          initialReadyState: readyState
        }));
      }
    }
  });
}