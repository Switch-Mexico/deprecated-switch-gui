var plugins = require('../imports/plugins'), scripts = [];
for (var i = 0; i < plugins.length; i++) {
  scripts[i] = `<script src='${plugins[i]}' type='text/javascript'></script>`;
}
scripts = scripts.join('\n');

Inject.rawHead('plugins', scripts);
