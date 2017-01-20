'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.setupReducers = setupReducers;
exports.createReduxStore = createReduxStore;
exports.default = render;

var _rubixReactrouterReactRouterSsr = require('meteor/rubix:reactrouter:react-router-ssr');

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxFetchData = require('@sketchpixy/redux-fetch-data');

var _onRouterSetup = require('./onRouterSetup');

var _onRouterSetup2 = _interopRequireDefault(_onRouterSetup);

var _onRouterUpdate = require('./onRouterUpdate');

var _onRouterUpdate2 = _interopRequireDefault(_onRouterUpdate);

var _checkScroll = require('./checkScroll');

var _checkScroll2 = _interopRequireDefault(_checkScroll);

var _isBrowser = require('../isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ((0, _isBrowser2.default)()) {
  (0, _onRouterSetup2.default)();
}

var reducer = void 0;

function setupReducers(reducers) {
  reducer = (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
    fetching: _reduxFetchData.reducer,
    routing: _reactRouterRedux.routerReducer
  }));
}

function getData() {
  if (Meteor.isClient) return Inject.getObj('preloadedData');
  return "";
}

function setData(data) {
  if (Meteor.isServer) Inject.obj('preloadedData', data);
}

function createStoreWithMiddleware() {
  return (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), (0, _isBrowser2.default)() && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
    return f;
  })(_redux.createStore);
}

function createReduxStore(initialState) {
  return createStoreWithMiddleware()(reducer, initialState);
}

function onFetchData(props) {
  (0, _onRouterUpdate2.default)();
  var container = document.getElementById('container');
  if (container) {
    container.scrollTop = 0;
  }
  return React.createElement(_reduxFetchData.FetchData, props);
}

function render(routes) {
  var initialState = getData();
  var store = void 0;

  if ((0, _isBrowser2.default)()) {
    store = createReduxStore(initialState);
  } else {
    store = createReduxStore();
  }

  _rubixReactrouterReactRouterSsr.ReactRouterSSR.Run(routes, {
    rootElement: 'app-container',
    props: {
      render: onFetchData
    },
    wrapperHook: function wrapperHook(app) {
      return React.createElement(
        _reactRedux.Provider,
        { store: store, key: 'provider' },
        app
      );
    }
  }, {
    preWrapperHook: function preWrapperHook(renderProps, callback) {
      // pre-fill store with data
      (0, _reduxFetchData.fetchDataOnServer)(renderProps, store).then(function () {
        // store is filled
        setData(store.getState());

        // callback to proceed with rendering
        callback();
      });
    }
  });
}