'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /* eslint no-unused-vars: 0 */

exports.grabPromises = grabPromises;
exports.flattenComponents = flattenComponents;
exports.fetchDataOnServer = fetchDataOnServer;

var _module = require('./module');

/**
 *
 * @param {Array} components
 * @param {Object} params
 * @param {Object} store
 * @returns {Promise[]}
 */
function grabPromises(components, params, store) {
  return flattenComponents(components).filter(function (component) {
    return component && component.fetchData instanceof Function;
  }).map(function (component) {
    return component.fetchData(store, params);
  });
}

/**
 *
 * @param {Array} components
 * @returns {Array}
 */
function flattenComponents(components) {
  var flattened = [];
  for (var i = 0; i < components.length; i++) {
    // handle named components
    // https://github.com/reactjs/react-router/blob/latest/docs/API.md#named-components
    if (_typeof(components[i]) === 'object') {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(components[i])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var key = _step$value[0];
          var value = _step$value[1];

          flattened.push(value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      flattened.push(components[i]);
    }
  }
  return flattened;
}

/**
 *
 * @param {Array} components
 * @param {Object} params
 * @param {Object} store
 * @returns {Promise}
 */
function fetchDataOnServer(_ref, store) {
  var components = _ref.components;
  var params = _ref.params;

  return Promise.all(grabPromises(components, params, store)).then(function () {
    store.dispatch((0, _module.doneFetching)());
  });
}
