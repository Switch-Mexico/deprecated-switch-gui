import { Conections } from '../schemas'
import { Scenarios } from '../schemas'
import { LoadZones } from '../schemas'

Meteor.publish('conections.data', function() {
  return Conections.find({});
});

Meteor.publish('scenarios.data', function() {
  return Scenarios.find({});
});

Meteor.publish('loadZones.data', function() {
  return LoadZones.find({});
});
