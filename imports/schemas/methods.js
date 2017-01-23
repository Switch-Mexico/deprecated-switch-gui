import { Conections } from '../schemas';
import { Scenarios } from '../schemas';
import { LoadZones } from '../schemas';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


const schema = {
  _id: String,
  tagName: [String],
};

Meteor.methods({


  "file.remove.conections": function(dataArray) {
    //check(data, _.omit(schema, '_id'));

    Conections.remove({});
   },

   "file.add.conections": function(dataArray) {
     //check(data, _.omit(schema, '_id'));

     dataArray.map((data)=>{

       Conections.insert(data);


     });
    },

    "file.remove.scenarios": function(dataArray) {

      Scenarios.remove({});

     },

     "file.add.scenarios": function(dataArray) {

       dataArray.map((data)=>{

         Scenarios.insert(data);


       });
      },

      "file.remove.loadZones": function(dataArray) {

        LoadZones.remove({});

       },

       "file.add.loadZones": function(dataArray) {

         dataArray.map((data)=>{

           LoadZones.insert(data);


         });
        },



});
