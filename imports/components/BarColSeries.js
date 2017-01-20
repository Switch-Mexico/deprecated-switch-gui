import React from 'react';

import {
  Row,
  Col,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

class Chart extends React.Component {
  render() {
    return (
      <div id={this.props.id}></div>
    );
  }
}
var color = [ "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00"];


export default class BarColSeries extends React.Component {
  componentDidMount() {
    (() => {
        var chart = new Rubix('#single-series-column-chart', {
          height: 250,
          title: 'National',
          titleColor: '#000000',
          axis: {
            x: {
              type: 'ordinal'
            },
            y: {
              type: 'linear',
              tickFormat: 'd',
              label: '[MW]',
              labelColor: '#000000'
            }
          },
          tooltip: {
            color: color[1],
            format: {
              y: '.0f'
            }
          },
          margin: {
            left: 50
          },
          grouped: false,
          show_markers: false
        });

        var fruits = chart.column_series({
          name: 'Data',
          color: '#0067c8'
        });

        fruits.addData([
          {x: 'data1', y: 5},
          {x: 'data2', y: 3},
          {x: 'data3', y: 4},
          {x: 'data4', y: 7},
          {x: 'data5', y: 2},
          {x: 'data6', y: 15}
        ]);
    })();

  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
            <Chart id='single-series-column-chart' />
          </Col>
        </Row>
      </div>
    );
  }
}
