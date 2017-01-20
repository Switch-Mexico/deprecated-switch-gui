var weight = 300;

function dependencies(settings) {
  const devDependencies = {
    'sass-loader': '^3.1.2',
    'node-sass': '^3.4.2'
  };

  if (settings.sassResources) {
    devDependencies['sass-resources-loader'] = '^1.0.2';
  }

  return {
    devDependencies: devDependencies
  };
}

function config(settings, require) {
  var plugins = [];
  var config = {};

  // a loader without css-modules, used in case the settings have "modulesExcludes"
  var simpleCssLoader = process.env.NODE_ENV !== 'production' ? 'style-loader!css-loader?-minimize' : 'css?-minimize';
  if (settings.packages.indexOf('webpack:postcss') > 0) {
    simpleCssLoader += '!postcss';
  }

  if (process.env.NODE_ENV !== 'production' && settings.styles && settings.styles.sourceMap) {
    if (!settings.sass) {
      settings.sass = {};
    }
    settings.sass.sourceMap = true;
  }

  var sassLoader = '!sass?' + JSON.stringify(settings.sass || {});
  settings.cssLoader = settings.cssLoader.replace('css?{}', 'css?-minimize');
  var cssLoader = settings.cssLoader + sassLoader;

  // Clone and add indentedSyntax param
  var indentedLoaderOpts = JSON.parse(JSON.stringify(settings.sass || {}));
  indentedLoaderOpts.indentedSyntax = true;
  var indentedLoader = settings.cssLoader + '!sass?' + JSON.stringify(indentedLoaderOpts);
  var indentedSassLoader = simpleCssLoader + '!sass?' + JSON.stringify(indentedLoaderOpts);

  if (settings.sassResources) {
    config.sassResources = settings.sassResources;
    sassLoader += '!sass-resources';
    cssLoader += '!sass-resources';
  }

  if (settings.cssExtract) {
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    cssLoader = ExtractTextPlugin.extract('style', cssLoader);
    simpleCssLoader = ExtractTextPlugin.extract('style', 'css-loader?-minimize');
  }

  var finalLoaders = [];
  var _mapRegex = function(stringArray) {
    var result = [];
    for (var i = 0, len = stringArray.length; i < len; i++) {
      result.push(new RegExp(stringArray[i]));
    }
    return result;
  };

  if (settings.css && settings.css.modules && settings.css.modulesExcludes) {
    // include the normal loaders with activated css-modules with an "exclude" regex-array (so we can exclude imports from ~/nodes_modules/)
    finalLoaders.push({ test: /\.scss$/, loader: cssLoader, exclude: _mapRegex(settings.css.modulesExcludes) });
    finalLoaders.push({ test: /\.sass$/, loader: indentedLoader, exclude: _mapRegex(settings.css.modulesExcludes) });
    // include additional rules for the same file types with an explicit "include" option for the same folders
    finalLoaders.push({ test: /\.scss$/, loader: simpleCssLoader + sassLoader, include: _mapRegex(settings.css.modulesExcludes) });
    finalLoaders.push({ test: /\.sass/, loader: indentedSassLoader, include: _mapRegex(settings.css.modulesExcludes) });
    // add a simple css loader too with the same "include" option as the normal case will be to import final-compiled dist-files (which are .css)
    finalLoaders.push({ test: /\.css$/, loader: simpleCssLoader, include: _mapRegex(settings.css.modulesExcludes) });
  } else {
    finalLoaders.push({ test: /\.scss$/, loader: cssLoader });
    finalLoaders.push({ test: /\.sass$/, loader: indentedLoader });
  }

  return {
    loaders: finalLoaders,
    extensions: ['.scss', '.sass'],
    config: config
  };
}
