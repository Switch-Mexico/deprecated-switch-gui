"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filterVariables(component, variableMapping) {
  var result = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(variableMapping)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = (0, _slicedToArray3.default)(_step.value, 2);

      var name = _step$value[0];
      var value = _step$value[1];

      if (component.hasVariable(name)) {
        result[name] = value;
      }
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

  return result;
}

var AggregateContainer = function () {
  function AggregateContainer(fragmentSpecs) {
    (0, _classCallCheck3.default)(this, AggregateContainer);

    this.fragmentSpecs = fragmentSpecs;
  }

  AggregateContainer.prototype.getFragmentNames = function getFragmentNames() {
    return (0, _keys2.default)(this.fragmentSpecs);
  };

  AggregateContainer.prototype.getFragment = function getFragment(fragmentName, variableMapping) {
    var _fragmentSpecs$fragme = this.fragmentSpecs[fragmentName];
    var component = _fragmentSpecs$fragme.component;
    var queryName = _fragmentSpecs$fragme.queryName;


    return component.getFragment(queryName, filterVariables(component, variableMapping));
  };

  AggregateContainer.prototype.hasFragment = function hasFragment(fragmentName) {
    return !!this.fragmentSpecs[fragmentName];
  };

  AggregateContainer.prototype.hasVariable = function hasVariable(variableName) {
    return true;
  };

  return AggregateContainer;
}();

exports.default = AggregateContainer;