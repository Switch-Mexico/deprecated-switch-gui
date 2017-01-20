import React from 'react';

import {
  Row,
  Col,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';



export default class ChartDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values : []
    };
  }

  render() {
    let labels = ["Central", "Oriental", "Occidental", "Noroeste", "Norte", "Noreste", "Peninsular", "Baja California", "Baja California Sur"];

    return (
      <div>
        <Row>
          <Col sm={12}>
            <div>{labels[0]}</div>
            <div>{labels[1]}</div>
            <div>{labels[2]}</div>
            <div>{labels[3]}</div>
            <div>{labels[4]}</div>
            <div>{labels[5]}</div>
            <div>{labels[6]}</div>
            <div>{labels[7]}</div>
          </Col>
        </Row>
      </div>
    );
  }
}
