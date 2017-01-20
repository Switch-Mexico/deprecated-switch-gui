'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onRouterSetup;

var _isBrowser = require('../isBrowser');

var _isBrowser2 = _interopRequireDefault(_isBrowser);

require('./classList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onRouterSetup() {
  if ((0, _isBrowser2.default)()) {
    if (window.Pace) {
      Pace.once('hide', function () {
        var body = document.body;
        body.classList.add('pace-small');
        body.classList.remove('pace-big');
      });
    }
    if (window.vex) {
      vex.defaultOptions.className = 'vex-theme-flat-attack';
    }

    if (window.hasOwnProperty('Chart')) {
      if (Chart.hasOwnProperty('defaults') && Chart.defaults.hasOwnProperty('global')) {
        Chart.defaults.global.responsive = true;
      }
    }

    if (window.hasOwnProperty('L')) {
      if (window.L.hasOwnProperty('Icon')) {
        L.Icon.Default.imagePath = '/bower_components/leaflet/dist/images';
      }
    }

    if (window.hasOwnProperty('jQuery')) {
      if ($.fn.hasOwnProperty('dataTableExt')) {
        $.extend($.fn.dataTableExt.oStdClasses, {
          "sFilterInput": "form-control",
          "sLengthSelect": "form-control",
          "sPageButton": "paginate_button btn btn-outlined btn-success",
          "sPageButtonActive": "active",
          "sPageButtonDisabled": "disabled"
        });
      }

      if ($.fn.hasOwnProperty('datetimepicker')) {
        $.extend($.fn.datetimepicker.defaults, {
          icons: {
            time: 'fontello icon-fontello-back-in-time icon-2x',
            date: 'fontello icon-fontello-calendar-alt icon-2x',
            up: 'fontello icon-fontello-up-open-3 icon-2x',
            down: 'fontello icon-fontello-down-open-3 icon-2x',
            previous: 'fontello icon-fontello-left-open-1',
            next: 'fontello icon-fontello-right-open-1'
          }
        });
      }

      if ($.hasOwnProperty('trumbowyg')) {
        $.trumbowyg.svgPath = '/bower_components/trumbowyg/dist/ui/icons.svg';
      }
    }

    if (window.hasOwnProperty('Dropzone')) {
      Dropzone.autoDiscover = false;
    }
  }
}