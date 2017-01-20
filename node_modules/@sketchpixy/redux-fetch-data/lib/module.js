'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doneFetching = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.handleDoneFetching = handleDoneFetching;

var _reduxActions = require('redux-actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DONE_FETCHING = 'fetch-data/DONE_FETCHING';

function handleDoneFetching(state) {
  return _extends({}, state, { fetched: true });
}

var reducer = (0, _reduxActions.handleActions)(_defineProperty({}, DONE_FETCHING, handleDoneFetching), { fetched: false });

var doneFetching = exports.doneFetching = (0, _reduxActions.createAction)(DONE_FETCHING);

exports.default = reducer;