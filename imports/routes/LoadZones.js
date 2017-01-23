import React from 'react';
import { composeWithTracker } from 'react-komposer';

import {
  Row,
  Col
} from '@sketchpixy/rubix';

import { LoadZones } from '../schemas';

import LoadZonesWrapper from '../components/LoadZones/LoadZonesWrapper'

class LoadZonesComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {



    if (!this.props.points){
      return(<div>Loading...</div>);
    }

    console.log(this.props.points)


    let data = this.props.points.map((point,key)=>{
      if(point['LOAD_ZONE'] != "") {return(point);}
          });
    console.log(data)
    data = data.filter(function(row) {
        return row != undefined;
    });

    return (
      <div className='dashboard'>
        <Row>
          <Col sm={12}>
          </Col>
        </Row>
        <Row>
          <LoadZonesWrapper loadZones={data}/>
        </Row>
      </div>
    );
  }
}

function composer(props, onData) {

  const subscription = Meteor.subscribe("loadZones.data");
  if (subscription.ready()) {
    console.log("done");
    const data =  {
      points: LoadZones.find({}),
      ready: true,
    };
    onData(null, data);
  } else {
    onData(null, {ready: false, points:false});
  }
}
export default composeWithTracker(composer)(LoadZonesComponent);
