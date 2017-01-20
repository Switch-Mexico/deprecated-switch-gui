'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

var _isBrowser = require('./isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var win = null;
if (!(0, _isBrowser2.default)()) {
  win = {
    L20n: {
      getContext: function getContext() {}
    }
  };
} else {
  win = window;

  if (!win.hasOwnProperty('L20n')) {
    win.L20n = {
      getContext: function getContext() {}
    };
  }
}

var ctx = win.L20n.getContext();

var Entities = {
  ready: false,
  entities: {},
  registerEntity: function registerEntity(entity) {
    if (Entities.hasOwnProperty(entity)) {
      if (!Entities.ready) return;
      _Dispatcher2.default.publish('ctx:' + entity);
      return;
    }
    ctx.localize([entity], function (l) {
      _Dispatcher2.default.publish('ctx:' + entity);
    });
    Entities[entity] = 1;
  }
};

var _initializeLocales = function _initializeLocales(locales, rpath) {
  rpath = rpath || '';
  ctx.ready(function () {
    Entities.ready = true;
    for (var i in Entities.entities) {
      Entities.registerEntity(Entities.entities[i]);
    }
    _Dispatcher2.default.publish('ctx:ready');
  });
  ctx.linkResource(function (locale) {
    return rpath + '/locales/' + locale + '/strings.l20n';
  });
  ctx.registerLocales(locales.default, locales.locales);
  ctx.requestLocales(locales.default);
};

var Entity = _react2.default.createClass({
  displayName: 'Entity',

  propTypes: {
    data: _react2.default.PropTypes.object,
    entity: _react2.default.PropTypes.string,
    dangerouslySetInnerHTML: _react2.default.PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'span',
      componentAttribute: ''
    };
  },
  getInitialState: function getInitialState() {
    return {
      entity: this.props.defaultValue || ''
    };
  },
  handler: function handler() {
    this.setState({
      entity: ctx.getSync(this.props.entity, this.props.data)
    });
  },
  componentDidMount: function componentDidMount() {
    this.subscription = _Dispatcher2.default.subscribe('ctx:' + this.props.entity, this.handler);
    Entities.registerEntity(this.props.entity);
    if (Entities.ready) {
      this.handler();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    _Dispatcher2.default.unsubscribe(this.subscription);
  },
  render: function render() {
    var ComponentClass = this.props.componentClass;
    var componentAttribute = this.props.componentAttribute;

    var props = (0, _extends3.default)({}, this.props, {
      data: null,
      entity: null,
      componentClass: null,
      componentAttribute: null
    });

    delete props.entity;
    delete props.componentClass;
    delete props.componentAttribute;
    delete props.dangerouslySetInnerHTML;

    if (ComponentClass && componentAttribute.length) {
      props[componentAttribute] = this.state.entity;

      return _react2.default.createElement(ComponentClass, props);
    }

    if (ComponentClass === 'input') {
      return _react2.default.createElement(ComponentClass, (0, _extends3.default)({}, props, { value: this.state.entity }));
    }
    if (this.props.dangerouslySetInnerHTML) {
      return _react2.default.createElement(ComponentClass, (0, _extends3.default)({}, props, { dangerouslySetInnerHTML: { __html: this.state.entity } }));
    }
    return _react2.default.createElement(
      ComponentClass,
      props,
      this.state.entity
    );
  }
});

module.exports = {
  ctx: ctx,
  initializeLocales: function initializeLocales(locales, rpath) {
    _initializeLocales(locales, rpath);
  },
  ready: function ready() {
    if (Entities.ready) {
      _Dispatcher2.default.publish('ctx:ready');
      return;
    }
  },
  changeLocale: function changeLocale(locale) {
    ctx.requestLocales(locale);
  },
  Entity: Entity
};