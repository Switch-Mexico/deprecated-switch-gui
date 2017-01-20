import { Conections } from '../schemas'
import { Scenarios } from '../schemas'


Meteor.publish('conections.data', function() {
  return Conections.find({});
});

Meteor.publish('scenarios.data', function() {
  return Scenarios.find({});
});
