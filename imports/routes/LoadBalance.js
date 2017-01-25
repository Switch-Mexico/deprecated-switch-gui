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


class MainChart extends React.Component {
  componentDidMount() {
    var chart = new Rubix('#main-chart', {
      width: '100%',
      height: 300,
      title: 'Chart of Total ',
      titleColor: '#0067c8',
      subtitle: 'Period: 2004 and 2008',
      subtitleColor: '#0067c8',
      axis: {
        x: {
          type: 'datetime',
          tickCount: 3,
          label: 'Time',
          labelColor: '#0067c8'
        },
        y: {
          type: 'linear',
          tickFormat: 'd',
          tickCount: 2,
          labelColor: '#0067c8'
        }
      },
      tooltip: {
        color: 'white',
        format: {
          y: '.0f',
          x: '%x'
        }
      },
      margin: {
        top: 25,
        left: 50,
        right: 25
      },
      interpolate: 'linear',
      master_detail: true
    });

    var total_users = chart.area_series({
      name: 'Total ',
      color: '#0067c8',
      marker: 'circle',
      fillopacity: 0.7,
      noshadow: true
    });

    chart.extent = [1297110663*850+(86400000*20*(.35*40)), 1297110663*850+(86400000*20*(.66*40))];

    var t = 1297110663*850;
    var v = [5, 10, 2, 20, 40, 35, 30, 20, 25, 10, 20, 10, 20, 15, 25, 20, 30, 25, 30, 25, 30, 35, 40, 20, 15, 20, 10, 25, 15, 20, 10, 25, 30, 30, 25, 20, 10, 50, 60, 30];

    var getValue = function() {
      var val = v.shift();
      v.push(val);
      return val;
    }

    var data = d3.range(40).map(function() {
      return {
        x: (t+=(86400000*20)),
        y: getValue()
      };
    });

    total_users.addData(data);
    total_users.addData(data);
  }
  render() {
    return (
      <PanelBody style={{paddingTop: 5}}>
        <div id='main-chart'></div>
      </PanelBody>
    );
  }
}




export default class Dashboard extends React.Component {
  render() {
    return (
      <div className='dashboard'>
        <Row>
          <Col sm={12}>
            <PanelTabContainer id='dashboard-main' defaultActiveKey="demographics">
              <Panel>
                <MainChart />
              </Panel>
            </PanelTabContainer>
          </Col>
        </Row>
      </div>
    );
  }
}
