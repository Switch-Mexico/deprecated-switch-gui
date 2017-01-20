import { Meteor } from 'meteor/meteor';

import { ReactRouterSSR } from 'meteor/rubix:reactrouter:react-router-ssr';
import routes from '../imports/routes';

/* import main stylesheet */
import './sass/main.scss';
import '../imports/schemas/methods.js';

Meteor.startup(() => {
  ReactRouterSSR.Run(routes, {
    rootElement: 'app-container'
  });
});
