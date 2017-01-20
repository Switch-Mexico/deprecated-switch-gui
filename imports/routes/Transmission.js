import React from 'react';
import { composeWithTracker } from 'react-komposer';

import {
  Row,
  Col
} from '@sketchpixy/rubix';

import { Conections } from '../schemas';

import TransmissionWrapper from '../components/Transmission/TransmissionWrapper'

class Transmission extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if (!this.props.points){
      return(<div>Loading...</div>);
    }

    return (
      <div className='dashboard'>
        <Row>
          <Col sm={12}>
          </Col>
        </Row>
        <Row>
          <TransmissionWrapper transmission={this.props.points}/>
        </Row>
      </div>
    );
  }
}

function composer(props, onData) {

  const subscription = Meteor.subscribe("conections.data");
  if (subscription.ready()) {
    console.log("done");
    const data =  {
      points: Conections.find({}),
      ready: true,
    };
    onData(null, data);
  } else {
    onData(null, {ready: false, points:false});
  }
}
export default composeWithTracker(composer)(Transmission);
