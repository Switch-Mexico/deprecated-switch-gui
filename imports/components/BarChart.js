import React from 'react';

import {
  Row,
  Col,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

class ChartContainer extends React.Component {
  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 25}} className='text-center'>
            <h4>{this.props.name}</h4>
            <div><canvas id={this.props.id} width={this.props.width} height={this.props.height}></canvas></div>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values : []
    };
  }



  componentDidMount() {

    d3.csv("/data/PowerPlants.csv", (error, data) => {

      data = data.filter(function(row) {
        return row['being_built'] != 'optimization';
      });

      data = data.filter(function(row) {
        return row['being_built'] != 'generic_project';
      });

      var data = d3.nest()
       .key(function(d) { return d.balancing_area;})
       .rollup(function(d) {
         return d3.sum(d, function(g) {return g.capacity_mw; });
       }).entries(data);


       var central,oriental,occidental,noroeste,norte,noreste,peninsular,baja_california,baja_california_sur=0;

       for (let d of data){
         let v = d.values.toFixed(2)
         switch (d.key) {
           case '01-central':
               central = v;
               break;
           case '02-oriental':
               oriental = v;
               break;
           case '03-occidental':
               occidental = v;
               break;
           case '04-noroeste':
               noroeste = v;
               break;
           case '05-norte':
               norte = v;
               break;
           case '06-noreste':
               noreste = v;
               break;
           case '07-peninsular':
               peninsular = v;
               break;
           case '08-baja_california':
               baja_california = v;
               break;
           case '09-baja_california_sur' || '10-baja_california_sur-mulege':
               baja_california_sur += v;
               break;
           default:
               break;
         }
       }
       var values = [central,oriental,occidental,noroeste,norte,noreste,peninsular,baja_california,baja_california_sur];


        var ctx = $("#bar-chart").get(0).getContext("2d");


        var data = {
          labels: ["", "", "", "", "", "", "", "", ""],
          datasets: [
            {
              label: "My First dataset",
              fillColor: [ "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00"],
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              data: values
            }
          ]
        };
        new Chart(ctx).Bar(data);
      });
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
            <ChartContainer id='bar-chart' height='300px' width='250px'/>
          </Col>
        </Row>
      </div>
    );
  }
}
