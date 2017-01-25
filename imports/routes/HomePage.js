import React from 'react';

import { withRouter } from 'react-router';
import classNames from 'classnames';

import {
  Row,
  Col,
  Tab,
  Nav,
  Image,
  Grid,
  Label,
  Button,
  NavItem,
  PanelContainer
} from '@sketchpixy/rubix';

class Hero extends React.Component {
  render() {
    return (
      <div {...this.props}
           className={classNames(this.props.className,
                                 'homepage-hero')}>
        <Grid fixed>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

class HeroHeader extends React.Component {
  render() {
    return (
      <div {...this.props}
           className={classNames(this.props.className,
                                 'homepage-hero-header')}>
        {this.props.children}
      </div>
    );
  }
}

class HeroHeader2 extends React.Component {
  render() {
    return (
      <div {...this.props}
           className={classNames(this.props.className,
                                 'homepage-hero-header2')}>
        {this.props.children}
      </div>
    );
  }
}

var st = {
  background: '#ffffff',
  height:100,
  webkitBoxShadow: '1px 4px 18px -1px rgba(0,0,0,0.75)',
  mozBoxShadow: '1px 4px 18px -1px rgba(0,0,0,0.75)',
  boxShadow: '1px 4px 18px -1px rgba(0,0,0,0.75)',
}

@withRouter
export default class Homepage extends React.Component {
  handleNavigation() {
    this.props.router.push('/dashboard');
  }

  render() {
    return (
      <div className='MyComponent'>
        <header className="container_initial">
          <Grid>
              <nav>
                <Col xm={6} sm={5} md={4} >
                </Col>
                <Col xm={6} sm={3} md={2} xmOffset={0} smOffset={4} mdOffset={5} >
                  <div className='container_button_demo'>
                    <button className="button_demo" onClick={::this.handleNavigation}>Click here to View Demo</button>
                  </div>
                </Col>
              </nav>
              <div>
                <Row>
                  <div className='container_title'>
                    <Image className="logo" src="/imgs/app/logo.png" responsive />
                  </div>
                </Row>
                <Row>
                  <div className='container_title_description'>
                    <h4>Is a linear programming platform used to examine least cost          <br/>
                      energy systems designed to meet specific reliability,               <br/>
                      performance and enviroment quality standards.
                    </h4>
                  </div>
                </Row>

              </div>
          </Grid>
          <div style={{ zIndex:0,position:'absolute',top:0,right:0}}>
            <img width='100%' height='40%' src='/imgs/app/triangle3.png'/>
          </div>
          <div style={{ zIndex:0,position:'absolute', left:0, bottom:-10}}>
            <img width='100%' height='60%'  src='/imgs/app/polygons1.png'/>
          </div>
          <div style={{ zIndex:0,position:'absolute', right:0, bottom:0}}>
            <img width='100%' height='60%'  src='/imgs/app/triangle2.png'/>
          </div>
        </header>
        <section>
          <Grid>
            <Col md={12} >
              <div className="container_secodary">
                <div className="logo_berkeley_rael">
                  <Col xs={12} sm={4} md={4} className='logo_berkeley'>
                    <img src='/imgs/app/berkeley.jpg'/>
                  </Col>
                  <Col xs={12} sm={8} md={8} className='logo_rael'>
                    <img src='/imgs/app/rael.png'/>
                  </Col>
                </div>
              </div>
            </Col>
          </Grid>
        </section>
        <section>
          <Grid>
            <Row>
              <Col md={12} >
                <div className="container_columns">
                  <div className="columns">
                    <Col xs={4} sm={4} md={4}>
                      <Row className="columns_icon">
                        <img src='/imgs/app/worldwide.svg'/>
                      </Row>
                      <Row className="columns_title">
                        <h3>NUMBER OF</h3>
                      </Row>
                      <Row className="columns_text">
                        <p>
                          Optimizing Electricity<br/>
                          Production and Water<br/>
                          Desalinitation<br/>
                          Simultaneously
                        </p>
                      </Row>
                    </Col>
                    <Col xs={4} sm={4} md={4}>
                      <Row className="columns_icon">
                        <img src='/imgs/app/scoreboard.svg'/>
                      </Row>
                      <Row className="columns_title">
                        <h3>PERCENT OF</h3>
                      </Row>
                      <Row className="columns_text">
                        <p>
                          A system Approach<br/>
                          to Decarbonizing<br/>
                        China's Power System
                        </p>
                      </Row>
                    </Col>
                    <Col xs={4} sm={4} md={4}>
                      <Row className="columns_icon">
                        <img src='/imgs/app/renewable-energy.svg'/>
                      </Row>
                      <Row className="columns_title">
                        <h3>COSITA OF</h3>
                      </Row>
                      <Row className="columns_text">
                        <p>
                          Evidence and future<br/>
                          scenarios of a low-<br/>
                          carbon energy<br/>
                          transition
                        </p>
                      </Row>
                    </Col>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </section>
        <section>
          <Grid style={{marginRight:0,marginLeft:0,padding:0,width:'100%'}}>
            <Col sm={12} md={6} style={{paddingLeft:0,paddingRight:0}}>
              <div className='container_image_full' >
                <Image src='/imgs/app/shutterstock_529618147.jpg' responsive/>
              </div>
            </Col>
            <Col sm={12} md={6} style={{height:'100%'}}>
              <Row className='container_description'>
                <p>
                  SWITCH is a capacity expansion model that invests in new generation an transmission assets as well as in end-use and demand-side management options (including electricfield, vehicles and storage) with a high-resolution assessments and planning package to xplore the system performance resting from differents scenarios.
                </p>
                <p>
                  SWITCH was initially developed for California, but has been expanded and refined to explore energy choices across the US West ( the WECC,Chile,Nicaragua,China), with future plans to cover the East African Power Pool (EAPP) and India.
                </p>
                <p>
                  A wide range of Switch publications are in print and use at various energy, climate, and development agencies.
                </p>
              </Row>
              <Row className='container_percent'>
                <Col xs={4} sm={4} md={4} className='colPercent'>
                  <Row>
                    <h3>#24</h3>
                  </Row>
                  <Row >
                    <h4>NUMBER OF</h4>
                  </Row>
                </Col>
                <Col xs={4} sm={4} md={4} className='colPercent'>
                  <Row>
                    <h3>%78</h3>
                  </Row>
                  <Row>
                    <h4>PERCENT OF</h4>
                  </Row>
                </Col>
                <Col xs={4} sm={4} md={4} className='colPercent'>
                  <Row>
                    <h3>3456</h3>
                  </Row>
                  <Row>
                    <h4>COSITA OF</h4>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Grid>
        </section>
        <section>
          <Grid style={{marginRight:0,marginLeft:0,padding:0,width:'100%'}}>
            <Col sm={7} md={6} style={{height:'100%'}}>
              <Row className='container_description2'>
                <p>
                  EVIDENCE AND FUTURE SCENARIOS OF A <br />
                  LOW CARBON ENERGY TRANSITION IN <br />
                A CASE STUDY IN MEXICO
                </p>
              </Row>
            </Col>
            <Col sm={5} md={6} style={{paddingLeft:0,paddingRight:0}}>
              <div className='container_image_full2 right' >
                <Image src='/imgs/app/pcmap.png' responsive/>
              </div>
            </Col>
          </Grid>
        </section>
    </div>

    );
  }
}
