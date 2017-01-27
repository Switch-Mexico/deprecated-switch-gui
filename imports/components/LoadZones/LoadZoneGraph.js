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
      <div id='chart-container'>
         <div id={this.props.id}></div>
      </div>

    );
  }
}

export default class BarColSeries extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {

    let label = '#chart';
    let long_label = "<div id='chart'></div>";

    $(label).remove();
    $('#chart-container').append(long_label);


    var chart = new Rubix('#chart', {
      title: 'Project Information by Load Zone',
      subtitle: this.props.id,
      titleColor: '#ff4949',
      subtitleColor: '#ff4949',
      height: 200,
      axis: {
        x: {
          type: 'ordinal'
        },
        y:  {
          type: 'linear',
          tickFormat: 'd',
          label: 'Capacity [ MW ]',
          labelColor: 'black'
        }
      },
      tooltip: {
        color: 'white',
        format: {
          y: '.0f'
        }
      },
      show_markers: false
    });

    if (nextProps.data){


      let data = nextProps.data;
      let values = data.map((row,key)=>{

        return {

          x: row['PROJECT'],
          y: Number(row['proj_capacity_limit_mw'])

        };

      });


      chart.column_series({
        name: 'Capacity Limit',
        color: '#ff4949'
      }).addData(values);



    }



  }

  render() {

    return (
      <div>
        <Row>
          <Col sm={12} >
            <Chart id='chart' />
          </Col>
        </Row>
      </div>
    );
  }
}
