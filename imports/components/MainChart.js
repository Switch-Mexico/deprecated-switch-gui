import React from 'react';
import { composeWithTracker } from 'react-komposer';

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

import { Scenarios } from '../schemas';


export default class MainChart extends React.Component {
  constructor(props) {
    super(props);

  }


  componentDidMount() {


        let label = '#main-chart';
        let long_label = "<div id = 'main-chart'></div>";

        $(label).remove();
        $('#graph-container').append(long_label);

        console.log(this.props.data,"right away from will receive");

        var chart = new Rubix(label, {
          width: '100%',
          height: 500,
          title: '',
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
            color: '#0067c8',
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
          master_detail: true,
          stacked: true
        });

        var color = ['#000000','#CCE0F4','#ffb119','#0067c8','#ff4949','#feb4b1','#a5d582','#B2D1EE','#CCE0F4','#E5EFF9','#FFFFFF'];
        var data = this.props.data.reverse();

        console.log(data);
        let coal = chart.area_series({
          name: 'Coal',
          color: color[0],
          marker: 'circle',
          fillopacity: 1,
          noshadow: true,
          stacked: true
        });

        let wind = chart.area_series({
          name: 'Wind ',
          color: color[1],
          marker: 'circle',
          fillopacity: 1,
          noshadow: true,
          stacked: true
        });

        let solar = chart.area_series({
          name: 'Solar',
          color: color[2],
          marker: 'circle',
          fillopacity: 1,
          noshadow: true,
          stacked: true
        });

        let hydropower = chart.area_series({
          name: 'Hydropower',
          color: color[3],
          marker: 'circle',
          fillopacity: 1,
          noshadow: true,
          stacked: true
        });

        let fuel_oil = chart.area_series({
          name: 'Fuel Oil',
          color: color[4],
          marker: 'circle',
          fillopacity: 1,
          noshadow: true,
          stacked: true
        });

        let geothermal = chart.area_series({
          name: 'Geothermal',
          color: color[5],
          marker: 'circle',
          fillopacity: 1,
          noshadow: true,
          stacked: true
        });

        let biosolid = chart.area_series({
          name: 'Biosolid',
          color: color[6],
          marker: 'circle',
          fillopacity: 1,
          noshadow: true,
          stacked: true
        });




        chart.extent = [1581235200000, 2203135200000];

        console.log("inside main chart");



        geothermal.addData(data[6]);
        fuel_oil.addData(data[5]);
        hydropower.addData(data[4]);
        solar.addData(data[3]);
        hydropower.addData(data[2]);
        wind.addData(data[1]);
        coal.addData(data[0]);


  }



  render() {

    return (
      <PanelBody style={{paddingTop: 5}}>
        <div id='graph-container'>
          <div id='main-chart'></div>
        </div>
      </PanelBody>
    );
  }
}
