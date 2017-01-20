"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* Helper utilities for nodeDefinitions */
var getWithType = exports.getWithType = function getWithType(promise, type) {
  return promise.then(function (result) {
    result.__type__ = type;
    return result;
  });
};

var isType = exports.isType = function isType(obj, type) {
  return obj.__type__ === type;
};