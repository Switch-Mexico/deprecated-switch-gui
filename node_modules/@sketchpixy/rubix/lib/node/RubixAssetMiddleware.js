'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_dir) {
  var dir = _dir || 'ltr';

  return function (req, res, next) {
    var mainjs = 'main.js',
        maincss = 'main.css';

    if (dir === 'rtl') {
      dir = 'rtl';
      mainjs = 'main-rtl.js';
      maincss = 'main-rtl.css';
    }

    res.locals.dir = dir;

    switch (process.env.NODE_ENV) {
      case "development":
        if (dir === 'rtl' && process.env.RTL !== 'true') {
          res.status(500).send('ERROR: Launch with "npm run dev:rtl -s" instead of "npm run dev -s"');
          return;
        }

        res.locals.pretty = true;
        res.locals.app_stylesheets = '\n      <script src=\'' + static_path + '/assets/js/devServerClient.js\'></script>\n      <script src=\'' + static_path + '/assets/js/' + mainjs + '\'></script>';
        res.locals.app_scripts = '\n      <script src=\'' + static_path + '/assets/js/plugins.js\'></script>\n      <script src=\'' + static_path + '/assets/js/app.js\'></script>';
        break;
      default:
        res.locals.app_stylesheets = '\n      <link rel=\'stylesheet\' href=\'/css/' + maincss + '\' />';
        res.locals.app_scripts = '\n      <script src=\'/js/plugins.js\'></script>\n      <script src=\'/js/app.js\'></script>';
        break;
    }

    next();
  };
};

var hostname = process.env.WP_HOST || "localhost";
var port = process.env.WP_PORT || 8079;
var static_path = 'http://' + hostname + ':' + port;