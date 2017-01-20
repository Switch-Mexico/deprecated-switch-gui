'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prepareData = require('./prepareData');

var _prepareData2 = _interopRequireDefault(_prepareData);

var _prepareInitialRender = require('./prepareInitialRender');

var _prepareInitialRender2 = _interopRequireDefault(_prepareInitialRender);

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  prepareData: _prepareData2.default,
  prepareInitialRender: _prepareInitialRender2.default,
  render: _render2.default
};