'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _router = require('../others/router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = _axios2.default.create({
  headers: {
    'XSRF-Token': (0, _router.getCsrfToken)(),
    'X-Requested-With': 'XMLHttpRequest'
  },
  transformRequest: function transformRequest(data) {
    return _queryString2.default.stringify(data);
  }
});

var commonData = {
  _token: (0, _router.getCsrfToken)(),
  utf8: "✓",
  authenticity_token: (0, _router.getCsrfToken)()
};

var HttpClient = {
  request: function request(config) {
    return axios.request(config);
  },
  get: function get(url, config) {
    return axios.get(url, config);
  },
  delete: function _delete(url, config) {
    return axios.post(url, (0, _extends3.default)({
      _method: 'delete'
    }, commonData), config);
  },
  head: function head(url, config) {
    return axios.post(url, (0, _extends3.default)({
      _method: 'head'
    }, commonData), config);
  },
  post: function post(url, data, config) {
    return axios.post(url, (0, _extends3.default)({}, commonData, data), config);
  },
  put: function put(url, data, config) {
    return axios.post(url, (0, _extends3.default)({
      _method: 'put'
    }, commonData, data), config);
  },
  patch: function patch(url, data, config) {
    return axios.post(url, (0, _extends3.default)({
      _method: 'patch'
    }, commonData, data), config);
  }
};

exports.default = HttpClient;