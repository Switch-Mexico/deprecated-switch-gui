import { Meteor } from 'meteor/meteor';
import { ReactRouterSSR } from 'meteor/rubix:reactrouter:react-router-ssr';


import './setup-plugins';

import routes from '../imports/routes';
import '../imports/publications/publications.js';
import '../imports/schemas/methods.js';

Meteor.startup(() => {
  // Do server-rendering only in production
  // Otherwise, it will break the hot-reload
  // DO NOT REMOVE THIS LINE. TO TEST run: "meteor --production" instead
  if (process.env.NODE_ENV === 'production') {
    ReactRouterSSR.LoadWebpackStats(WebpackStats);

    ReactRouterSSR.Run(routes, {
      rootElement: 'app-container'
    });
  }

  WebApp.addHtmlAttributeHook(function() {
    return {
      "dir": "ltr",
      "class": "default"
    }
  });
});
