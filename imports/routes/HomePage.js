import React from 'react';

import { withRouter } from 'react-router';
import classNames from 'classnames';

import {
  Row,
  Col,
  Tab,
  Nav,
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
      <div id='homepage'>
          <Col sm={12}>
            <Row>
              <Col sm={12} style={{padding:0}}>
                <div style={{height: 475, width:'100%', background: '#0067c8', backgroundSize: 'cover', overflow: 'hidden', position:'relative'}}>


                  <div style={{height: 55, width:'100%', position:'absolute', top:0, marginTop:15}}>
                    <Col sm={12} style={{padding:0}}>
                      <Col sm={4} ><div className='text-center' style={{marginTop:10}}><img height='65'  src='/imgs/app/logos/switch/switch-w.png'/></div></Col>
                      <Col sm={4} style={{padding:0}}></Col>
                      <Col sm={4} style={{padding:0}}>
                        <div className='text-center' style={{zIndex:99, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', overflow: 'hidden', marginTop:10}}>
                          <Button lg outlined inverse retainBackground bsStyle='white' onClick={::this.handleNavigation}>Click here to View Demo</Button>
                        </div>
                      </Col>
                    </Col>
                  </div>
                  <div className='text-right' style={{verticalAlign:'middle'}}>
                    <img width='30%' height='20%' src='/imgs/app/homepage/triangle3.png'/>
                  </div>
                  <Col xs={12}>
                    <div className='container' style={{overflow: 'hidden'}}>
                      <HeroHeader>
                        <div className='text-center fg-white' >
                          <h1>A CAPACITY EXPANSION MODEL <br/> FOR THE ELECTRICITY SECTOR</h1>
                        </div>
                      </HeroHeader>
                      <HeroHeader2>
                        <div className='text-center fg-white'>
                          <h4>Is a linear programming platform used to examine least cost          <br/>
                            energy systems designed to meet specific reliability,               <br/>
                            performance and enviroment quality standards.
                          </h4>
                        </div>
                      </HeroHeader2>
                    </div>
                  </Col>

                    <div style={{ position:'absolute', left:0, bottom:0}}>
                      <img height='60%'  src='/imgs/app/homepage/polygons1.png'/>
                    </div>
                    <div style={{ position:'absolute', right:0, bottom:0}}>
                      <img height='60%'  src='/imgs/app/homepage/triangle2.png'/>
                    </div>
                  </div>

              </Col>
            </Row>
            <Row>
              <Col sm={12} style={{padding:0}}>
                <Col sm={4} style={{padding:0}}></Col>
                <Col sm={12} style={{padding:0}}>
                  <div className='text-center hidden-xs' style={{height: 475, width:'100%', position:'relative'}}>
                    <div className='text-center' style={{height: 100, width:'100%', position:'absolute', top:-35}}>
                      <Col sm={3}></Col>
                      <Col sm={6} style={st}>
                          <Col sm={4} style={{marginTop:10}}><div style={{marginTop:10}}><img height='55'  src='/imgs/app/logos/berkeley.jpg'/></div></Col>
                          <Col sm={8} style={{padding:0}}> <div style={{marginTop:15}}><img height='55'  src='/imgs/app/logos/rael.png'/></div></Col>
                      </Col>
                      <Col sm={3}></Col>
                    </div>
                  </div>
                </Col>
            </Col>
            </Row>
          </Col>
        </div>
    );
  }
}
