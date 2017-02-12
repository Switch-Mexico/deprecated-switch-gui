import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { Link, withRouter } from 'react-router';

import l20n, { Entity } from '@sketchpixy/rubix/lib/L20n';

import {
  Label,
  SidebarBtn,
  Dispatcher,
  NavDropdown,
  NavDropdownHover,
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  Badge,
  Button,
  Icon,
  Grid,
  Row,
  Radio,
  Col } from '@sketchpixy/rubix';

class Brand extends React.Component {
  render() {
    return (
      <Navbar.Header {...this.props}>
        <Navbar.Brand tabIndex='-1'>
          <a href='#'>

          </a>
        </Navbar.Brand>
      </Navbar.Header>
    );
  }
}

@withRouter
class HeaderNavigation extends React.Component {
  render() {
    return (
      <Nav pullRight>
        <Nav>
          <NavItem className='logout' href='/'>
            <Icon bundle='fontello' glyph='off-1' />
          </NavItem>
        </Nav>
      </Nav>
    );
  }
}

export default class Header extends React.Component {
  render() {

    return (
    <Col xs={12} visible='xs'>
      <Grid id='navbar' {...this.props}>
        <Col xs={12} >
          <Row >
            <Col xs={12}>
              <Navbar fixedTop fluid id='rubix-nav-header' >
                <Row>
                  <Col xs={3} visible='xs'>
                    <SidebarBtn />
                  </Col>
                </Row>
              </Navbar>
            </Col>
          </Row>
        </Col>
      </Grid>
    </Col>
  );
}
}
