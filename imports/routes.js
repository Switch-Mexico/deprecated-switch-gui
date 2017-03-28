import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

/* Common Components */

import Sidebar from './common/sidebar';
import Header from './common/header';
import Footer from './common/footer';

/* Pages */
import Home from './routes/Home';

import Example from './routes/Example';

import CloseUp from './routes/CloseUp';
import Transmission from './routes/Transmission';
import LoadBalance from './routes/LoadBalance';
import BuildProject from './routes/BuildProject';
import Uploads from './routes/Uploads';
import LoadZones from './routes/LoadZones';

import HomePage from './routes/HomePage';
import Lock from './routes/Uploads';

class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}

class Landing extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}


const routes = (
  <Route path='/Dashboard' component={App}>
    <IndexRoute component={Home} />
    <Route path='/home2' component={Home} />
    <Route path='/Uploads' component={Uploads} />

    <Route path='/outputs/home3' component={CloseUp} />
    <Route path='/outputs/Transmission' component={Transmission} />
    <Route path='/outputs/BuildProject' component={BuildProject} />
    <Route path='/outputs/LoadBalance' component={LoadBalance} />
    <Route path='/example' component={Example} />
    <Route path='/inputs/load-zones' component={LoadZones} />
  </Route>
);

/**
 * No Sidebar, Header or Footer. Only the Body is rendered.
 */

const basicRoutes = (
  <Route>
    <Route path='lock' component={Lock} />
  </Route>
);

const combinedRoutes = (
  <Route>
    <Route>
      {routes}
    </Route>
    <Route>
      {basicRoutes}
    </Route>
  </Route>
);

export default (
  <Route>
    <Route path='/' component={HomePage} />
      {combinedRoutes}
  </Route>
);
