import React from 'react';

import {
  Row,
  Tab,
  Col,
  Nav,
  Icon,
  Grid,
  Form,
  Table,
  Label,
  Panel,
  Button,
  NavItem,
  Checkbox,
  Progress,
  PanelBody,
  FormGroup,
  PanelLeft,
  isBrowser,
  InputGroup,
  LoremIpsum,
  PanelRight,
  PanelHeader,
  FormControl,
  PanelContainer,
  PanelTabContainer,
} from '@sketchpixy/rubix';


import Dropzone from '../components/Dropzonejs'





export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      data:0,
      nodexe:0,
      rerender:false

    };
  }



  componentDidMount(){



  }


  render() {

    return (
      <div className='dashboard'>
        <Row>
          <Col sm={12}>
          </Col>
        </Row>
        <Row>
          <Col sm={5} collapseRight>
            <PanelContainer>
              <Panel>
                <PanelBody style={{padding: 0}}>
                  <Grid>
                    <Row>
                    <Dropzone/>
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelContainer>
          </Col>
          <Col sm={7}>
            <Col sm={8}>
            </Col>
            <Col sm={4}>
              <PanelContainer>
                <Panel>
                  <PanelBody style={{padding: 0}}>
                    <Grid className='hidden-print'>
                       <Row>
                         <Col xs={12}>
                           <p>
                             <strong>Files Allowed</strong><span className='fg-darkgray40'></span>
                           </p>
                           <p className='inbox-attachments'>
                             <Icon glyph='icon-1-and-quarter-x icon-outlined-image' /><span><strong> build_proj.csv</strong> <span className='fg-darkgray40'>(20 MB Max)</span></span>
                           </p>
                           <p className='inbox-attachments'>
                             <Icon glyph='icon-1-and-quarter-x icon-outlined-image' /><span><strong> build_proj.csv</strong> <span className='fg-darkgray40'>(20 MB Max)</span></span>
                           </p>
                           <p className='inbox-attachments' style={{marginBottom: 0}}>
                             <Icon glyph='icon-1-and-quarter-x devicon-html5-plain-wordmark' /><span><strong> build_proj.csv</strong> <span className='fg-darkgray40'>(20 MB Max)</span></span>
                           </p>
                         </Col>
                       </Row>
                     </Grid>
                  </PanelBody>
                </Panel>
              </PanelContainer>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}
