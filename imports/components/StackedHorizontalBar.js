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
        <div id={this.props.container}  style={{height: "100%", width:"100%"}}><div id={this.props.id}></div></div>
      </div>
    );
  }
}

export default class StackedHorizontalBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      render:1

    };

  }


  componentWillReceiveProps(nextProps) {

    if (this.state.render && nextProps.data["08"].properties.capacity){

    let label = '#'+nextProps.id;
    let container_label = '#'+nextProps.container;
    let long_label = '<div id="'+nextProps.id+'"></div>';
    // let color = nextProps.color.substr(0, 2);


    $(label).remove();
    $(container_label).append(long_label);

      var chart = new Rubix(label, {
        height: nextProps.height,
        title: nextProps.title + ":       "  +nextProps.name,
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
          width: '8px',
          format: {
            y: '.0f'
          }
        },

        ticks:50,
        show_markers: false
      });



      for (let key in nextProps.data){

        console.log(key);

        let graph = chart.bar_series({
          name: nextProps.data[key].properties.name,
          color: nextProps.data[key].properties.color,
          strokewidth: '10'
            });

            let values = []

            console.log(nextProps.data[key].properties);

            var data = nextProps.data[key]["properties"]["capacity"]["break_down"];


            for (let element of data){

              values.push({x: element.key, y: element.values,label:element.values});

            }
            graph.addData(values);

          };


    this.setState({
      render : 0
      });
    }
  }

  render() {

    return (
      <div>
        <ChartContainer container={this.props.container} id={this.props.id}/>
      </div>
    );
  }
}
