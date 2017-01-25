import React from 'react';

import {
  Row,
  Col,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

import ThreeTabsPanel from '../components/ThreeTabsPanel'

class Chart extends React.Component {

  componentWillReceiveProps(nextProps) {



      let label = '#grouped-multi-series-column-chart';
      let long_label = "<div id='grouped-multi-series-column-chart'></div>";

      $(label).remove();
      $('#grouped-multi-series-column-chart-container').append(long_label);

      var chart = new Rubix('#grouped-multi-series-column-chart', {
        title: 'Grouped multi series column chart',

        titleColor: '#0000ff',
        subtitleColor: '#0000ff',
        height: 300,
        axis: {
          x: {
            type: 'ordinal',
          },
          y:  {
            type: 'linear',
            tickFormat: 'd'
          }
        },
        tooltip: {
          color: 'white',
          format: {
            y: '.0f',
            y: 'd'

          }
        },
        grouped: true,
        show_markers: true
      });




      let valores = Object.create(Object.prototype);

      let box = []
      let i = 0;
      let n = {}

      for (let d of nextProps.data){
        let year  = Number(d.key);
        let string_year = d.key;
        if (year > 2016){

            let charts = chart.column_series({
              name: string_year,
              color: '#0000ff'
            });

        let valores = new Array();
        let elements = d.values;


        let array_mw = [];
        let array_years = [];
        for(let element of elements){

          let mw = Number(element.BuildProj);
          mw = mw.toFixed(2);
          mw = Number(mw);

          let years = element.PROJECT_BUILDYEARS_1;
          array_mw.push(mw);
          array_years.push(years);

        }

        var getMW = function() {
          var val = array_mw.shift();
          array_mw.push(val);
          return val;
        }

        var getYears = function() {
          var val = array_years.shift();
          array_years.push(val);
          return val;
        }

        console.log(getYears());
        var data = d3.range(array_mw.length).map(function() {
          return {
            x: getYears(),
            y: getMW()
          };
        });

        console.log(data)
        //console.log(data)
        //charts.addData(data);
        // charts.addData(data);
        // charts.addData(data);


        }
      }

  }

  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 25}}>
            <div id='grouped-multi-series-column-chart-container'>
              <div id='grouped-multi-series-column-chart'></div>
            </div>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}




export default class BarColSeries extends React.Component {

  constructor(props) {
    super(props);


    this.state = {

      dat:"bullshit"

    };
  }

  componentWillMount(){


    d3.tsv("/data/BuildProj/BuildProj.tab", (error, data) => {

      data = data.filter(function(row) {
        return row['BuildProj'] != '0.0';
      });

      var data = d3.nest()
       .key(function(d) { return d.PROJECT_BUILDYEARS_2;}).entries(data);

       this.setState({
          dat : data
       });
     });

  }


  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
            <Col sm={6}>
              <ThreeTabsPanel/>
            </Col>
            <Col sm={6}>
              <Chart data={this.state.dat}/>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}
