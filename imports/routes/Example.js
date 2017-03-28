import React from 'react';

import {
  Row,
  Col,
  Panel,
  PanelHeader,
  PanelContainer,
} from '@sketchpixy/rubix';

export default class Example extends React.Component {

  render() {

    return (
      <div className='dashboard'>
        <Row>
          <Col sm={7}>
            <PanelContainer>
              <Panel>
                <PanelHeader>
                  <div style={{padding: 10}}>
                    <div ref="national_map" style={{height: 600}}></div>
                  </div>
                </PanelHeader>
              </Panel>
            </PanelContainer>
          </Col>
        </Row>
      </div>
    );
  }
}
