import React from 'react';

import {
  Row,
  Col,
  Icon
} from '@sketchpixy/rubix';



export default class TransmissionLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let labels = ["Central", "Oriental", "Occidental", "Noroeste", "Norte", "Noreste", "Peninsular", "Baja California", "Baja California Sur"];

    return (
      <div>
        <Row>
          <Col sm={12}>
            <div>
              <div className='map-dest' style={{marginBottom: 12.5}}>
                <h3 className='fg-black50 text-left' style={{color: '#0067c8'}}>
                  <Icon glyph='icon-fontello-dot-circled'/>{' '}
                  <span>Load Zones </span>
                </h3>
                <h5>
                </h5>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
