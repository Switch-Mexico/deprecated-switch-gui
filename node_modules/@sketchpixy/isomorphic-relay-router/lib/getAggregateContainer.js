'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _weakMap = require('babel-runtime/core-js/weak-map');

var _weakMap2 = _interopRequireDefault(_weakMap);

exports.default = getAggregateContainer;

var _AggregateContainer = require('./AggregateContainer');

var _AggregateContainer2 = _interopRequireDefault(_AggregateContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var containerIds = new _weakMap2.default();
var nextContainerId = 0;

function getContainerId(container) {
  var id = containerIds.get(container);
  if (id === void 0) {
    id = nextContainerId++;
    containerIds.set(container, id);
  }

  return id;
}

function getCacheKey(fragmentSpecs) {
  return (0, _stringify2.default)((0, _entries2.default)(fragmentSpecs).map(function (_ref) {
    var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

    var fragmentName = _ref2[0];
    var _ref2$ = _ref2[1];
    var component = _ref2$.component;
    var queryName = _ref2$.queryName;
    return [fragmentName, getContainerId(component), queryName];
  }).sort(function (_ref3, _ref4) {
    var _ref6 = (0, _slicedToArray3.default)(_ref3, 1);

    var a = _ref6[0];

    var _ref5 = (0, _slicedToArray3.default)(_ref4, 1);

    var b = _ref5[0];
    return a.localeCompare(b);
  }));
}

var containerCache = new _map2.default();

function getAggregateContainer(fragmentSpecs) {
  var cacheKey = getCacheKey(fragmentSpecs);

  var container = containerCache.get(cacheKey);
  if (!container) {
    container = new _AggregateContainer2.default(fragmentSpecs);
    containerCache.set(cacheKey, container);
  }

  return container;
}