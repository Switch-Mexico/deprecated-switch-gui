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



export default class HorizontalBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      render:[{values:0}]

    };

  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps.data[0].values,"values")
    if (this.state.render[0].values != nextProps.data[0].values){
    (() => {

      var colors = { '00':"#feb24c",'01': "#E34A33" , '02': "#2B8CBE", '03': "#2CA25F", '04': "#C51B8A", '05': "#E6550D", '06': "#756BB1",'07':"#636363", '08':"#DD1C77", '09': "#1C9099",'10':'#0067c8'};


      let label = '#'+nextProps.id;
      let container_label = '#'+nextProps.container;
      let long_label = '<div id="'+nextProps.id+'"></div>';
      let color = nextProps.color.substr(0, 2);


      $(label).remove();
      $(container_label).append(long_label);


      if (nextProps.data){


        var chart = new Rubix(label, {
            height: 300,
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
              color: '#0067c8',
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
          for (let d of nextProps.data){

            let graph = chart.bar_series({

              color: colors[color],
              strokewidth: '10'
            });

            let value = d.values;

            graph.addData([{x: d.key, y: value}]);
            i++;

          }

      }
      })();

      this.setState({
         render : nextProps.data
      });

    }

    }

  render() {
    if (!this.props.data){
      return(<div>Loading...</div>);
    }
    return (
      <div>
        <ChartContainer container={this.props.container} id={this.props.id}/>
      </div>
    );
  }
}
