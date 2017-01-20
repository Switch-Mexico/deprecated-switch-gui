'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FetchData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _module = require('./module');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FetchData = exports.FetchData = function (_Component) {
  _inherits(FetchData, _Component);

  function FetchData() {
    _classCallCheck(this, FetchData);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FetchData).apply(this, arguments));
  }

  _createClass(FetchData, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.props.isFetched) {
        this.fetchData(this.props);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.fetchData(nextProps);
    }
  }, {
    key: 'fetchData',
    value: function fetchData(props) {
      var _this2 = this;

      var promises = (0, _utils.grabPromises)(props.components, props.params, this.context.store);

      Promise.all(promises).then(function () {
        _this2.props.actions.doneFetching();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactRouter.RouterContext, this.props);
    }
  }]);

  return FetchData;
}(_react.Component);

FetchData.propTypes = {
  isFetched: _react.PropTypes.bool.isRequired,
  actions: _react.PropTypes.object
};

FetchData.defaultProps = {
  isFetched: false
};

FetchData.contextTypes = {
  store: _react.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isFetched: state.fetching.fetched
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: (0, _redux.bindActionCreators)({ doneFetching: _module.doneFetching }, dispatch)
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FetchData);