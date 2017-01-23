import React from 'react';

import {
  Sidebar, SidebarNav, SidebarNavItem,
  SidebarControls, SidebarControlBtn,
  LoremIpsum, Grid, Row, Col, FormControl,
  Label, Progress, Icon,
  SidebarDivider
} from '@sketchpixy/rubix';

import { Link, withRouter } from 'react-router';

@withRouter
class ApplicationSidebar extends React.Component {
  handleChange(e) {
    this._nav.search(e.target.value);
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>
                  { /** Pages Section */ }
                  <div className='sidebar-header'>CONTENT</div>
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Capacity' href='/dashboard' />
                    <SidebarNavItem glyph='icon-fontello-gauge' name='Upload' href='/Uploads' />
                    <SidebarNavItem glyph='icon-fontello-chart-area' name='Outputs'>
                      <SidebarNav>
                        <SidebarNavItem glyph='icon-fontello-cluster' name='Transmission Lines' href='/outputs/Transmission' />
                        <SidebarNavItem glyph='chart-pie-2' name='Capacity Evolution' href='/outputs/home3' />
                        <SidebarNavItem glyph='chart-pie-2' name='Build Project' href='/outputs/BuildProject' />
                        <SidebarNavItem glyph='chart-pie-2' name='Load Balance' href='/outputs/LoadBalance' />
                      </SidebarNav>
                    </SidebarNavItem>
                    <SidebarNavItem glyph='icon-fontello-chart-area' name='Inputs'>
                      <SidebarNav>
                        <SidebarNavItem glyph='chart-pie-2' name='Load Zones' href='/inputs/load-zones' />
                      </SidebarNav>
                    </SidebarNavItem>
                </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

@withRouter
export default class SidebarContainer extends React.Component {
  render() {
    return (
      <div id='sidebar'>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={12} collapseRight>
                <Col xs={8} >
                  <div>
                    <img src='/imgs/app/logos/switch/switch-w.png' height='65'/>
                  </div>
                </Col>
              </Col>
            </Row>
          </Grid>
        </div>
        <SidebarControls>
          <SidebarControlBtn bundle='fontello' glyph='' sidebar={0} />
        </SidebarControls>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicationSidebar />
          </Sidebar>
        </div>
      </div>
    );
  }
}
