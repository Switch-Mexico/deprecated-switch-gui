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



export default class ThreeTabsPanel extends React.Component {
  render() {
    return (
      <div className='dashboard'>
        <Row>
          <Col sm={12} collapseRight>
            <PanelContainer>
              <Panel>
                <PanelBody style={{padding: 0}}>
                  <Grid>
                    <Row>
                      <Col xs={12} className='text-center' style={{padding: 25}}>

                      </Col>
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelContainer>

            <PanelTabContainer id='dashboard-contacts-sales-tickets' defaultActiveKey='sales'>
              <Panel>
                <PanelHeader className='bg-lightblue50 fg-white fg-tab-active'>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="sales">
                      <Icon className='icon-1-and-quarter-x' bundle='feather' glyph='bar-graph-2'/>
                    </NavItem>
                    <NavItem eventKey="contacts">
                      <Icon className='icon-1-and-quarter-x' bundle='feather' glyph='pie-graph'/>
                    </NavItem>
                    <NavItem eventKey="tickets">
                      <Icon className='icon-1-and-quarter-x' bundle='feather' glyph='pie-graph'/>
                    </NavItem>
                  </Nav>
                </PanelHeader>
                <PanelBody style={{paddingTop: 0}}>
                  <Tab.Content>
                    <Tab.Pane eventKey='sales'>



                    </Tab.Pane>
                    <Tab.Pane eventKey='contacts'>




                    </Tab.Pane>
                    <Tab.Pane eventKey='tickets'>



                    </Tab.Pane>
                  </Tab.Content>
                </PanelBody>
              </Panel>
            </PanelTabContainer>
          </Col>
        </Row>
      </div>
    );
  }
}
