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
      <div style={{padding:15}}>
          <Col sm={12}>
            <div className='map-dest' style={{marginBottom: 12.5, height: 10}}>
              <h3 className='fg-black50 text-left' style={{color: '#0067c8',marginTop:0}}>
              <Icon glyph='icon-fontello-dot-circled'/>{' '}
                  Load Zones
              </h3>
            </div>
          </Col>
      </div>
    );
  }
}
