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
  PanelTabContainer
} from '@sketchpixy/rubix';




class ChartContainer extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        <div id={this.props.container} style={{height: "100%", width:"100%"}}><div style={{height: "100%", width:"100%"}} id={this.props.id}></div></div>
      </div>
    );
  }
}



export default class HorizontalBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      name:""

    };

  }


  componentWillReceiveProps(nextProps) {

    console.log(nextProps)

    var name  = nextProps.data ? nextProps.data.properties.name : "No Data"



        let label = '#'+nextProps.id;
        let container_label = '#'+nextProps.container;
        let long_label = '<div style={{height: "100%", width:"100%"}} id="'+nextProps.id+'"></div>';

        $(label).remove();
        $(container_label).append(long_label);

        var chart = new Rubix(label, {
            height: nextProps.height,
            title: nextProps.title + ":       "  +name,
            titleColor: '#000000',
            subtitleColor: 'gray',
            subtitle:nextProps.subtitle,
            axis: {
              x: {
                type: 'ordinal',
                label: '[MW]',
                labelColor: '#000000'
              },
              y:  {
                type: 'linear',
                tickFormat: 'd'
              }
            },
            tooltip: {
              color: 'white',
              width: '10px',
              format: {
                y: '.0f'
              }
            },
            grouped: true,
            ticks:50,
            show_markers: false
          });


          let i = 0;

          if (nextProps.data){

            if (nextProps.data.properties ){

              let data = nextProps.data.properties ;


          if (data.capacity){

            for (let d of data.capacity.break_down){


            let graph = chart.bar_series({
              name: d.key,
              color: nextProps.color,
              strokewidth: '10'
            });


            graph.addData([{x: d.key, y: d.values,label:d.values}]);
            i++;

          }

          this.setState({
             name : data.name
          });
        }
      }}
  }

  render() {

    return (
      <div>
        <ChartContainer container={this.props.container} id={this.props.id}/>
      </div>
    );
  }
}
