import React from 'react';
import { composeWithTracker } from 'react-komposer';

import {
  Row,
  Col
} from '@sketchpixy/rubix';

import { LoadZones } from '../schemas';
import { ProjectInfo } from '../schemas';

import LoadZonesWrapper from '../components/LoadZones/LoadZonesWrapper'

class LoadZonesComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {



    if (!this.props.points && !this.props.info){
      return(<div>Loading...</div>);
    }

    let loadzones = []; //creates a list of all load zone that will be listed
    let data = this.props.points.map((point,key)=>{
      if(point['LOAD_ZONE'] != "") {
        loadzones.push(point['LOAD_ZONE']);
        return(point);}
          });

    data = data.filter(function(row) {
        return row != undefined;
    });

    let info = this.props.info.map((inf,key)=>{
      return(inf);
          });

    info = this.props.info.map((row,key)=>{

      if(loadzones.includes(row['proj_load_zone'] )) {return(row);}
          });

    info = info.filter(function(row) {
        return row != undefined;
    });


    return (
      <div className='dashboard'>
        <Row>
          <LoadZonesWrapper loadZones={data} info={info}/>
        </Row>
      </div>
    );
  }
}

function composer(props, onData) {

  const subscriptionLz = Meteor.subscribe("loadZones.data");
  const subscriptionPi = Meteor.subscribe("projectInfo.data");

  if (subscriptionPi.ready() && subscriptionLz.ready() ) {

    const data =  {
      points: LoadZones.find({}),
      info: ProjectInfo.find({}),
      ready: true,
    };
    onData(null, data);
  } else {
    onData(null, {ready: false, points:false, info:false});
  }
}
export default composeWithTracker(composer)(LoadZonesComponent);
