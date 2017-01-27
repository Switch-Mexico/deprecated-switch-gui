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


import HorizontalBarChart from '../components/HorizontalBarChart'
import BarChart from '../components/BarChart'
import ChartDescription from '../components/ChartDescription'
import Dropzone from '../components/Dropzonejs'
import BarColSeries from '../components/BarColSeries'


import node1 from '../nodes/node_01';
import node2 from '../nodes/node_02';
import node3 from '../nodes/node_03';
import node4 from '../nodes/node_04';
import node5 from '../nodes/node_05';
import node6 from '../nodes/node_06';
import node7 from '../nodes/node_07';
import node8 from '../nodes/node_08';
import node9 from '../nodes/node_09';

export default class Map extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickNode = this.handleClickNode.bind(this);
    this.state = {

      data:0,
      nodexe:0,
      rerender:false

    };
  }

  handleClickNode(e){

    d3.csv("/data/PowerPlants.csv", (error, data) => {

      data = data.filter(function(row) {
        return row['being_built'] != 'optimization';
      });

      data = data.filter(function(row) {
        return row['being_built'] != 'generic_project';
      });

      data = data.filter(function(row) {
        let r = row['load_zone'];
        r = r.substring(0,2);
        if(r == e || r == "0"+e){
          return row;
        }
      });

      var data = d3.nest()
       .key(function(d) { return d.gen_tech;})
       .rollup(function(d) {
         return d3.sum(d, function(g) {return g.capacity_mw; });
       }).entries(data);


       this.setState({
          nodexe : data
       });

     });


  }

  handleClick(balancing_area){



    d3.csv("/data/PowerPlants.csv", (error, data) => {

      data = data.filter(function(row) {
        return row['being_built'] != 'optimization';
      });

      data = data.filter(function(row) {
        return row['being_built'] != 'generic_project';
      });

      data = data.filter(function(row) {
        return row['balancing_area'] == balancing_area;
      });

      var data = d3.nest()
       .key(function(d) { return d.gen_tech;})
       .rollup(function(d) {
         return d3.sum(d, function(g) {return g.capacity_mw; });
       }).entries(data);


         this.setState({
           data : data
         });


     });
  }

  componentDidMount(){


    var map = L.map(this.refs.mapi);

    map.setView([23,-105], 13);
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';


    L.tileLayer(
      'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 5,
        minZoom: 5
      }).addTo(map);

    var color = [ "#feb24c","#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00"];

    let a = this;
    let nodex = []
    let nodes = [node1,node2,node3,node4,node5,node6,node7,node8,node9]


    let i = 0;


    for (let n of nodes){

      nodex.push(
        L.geoJson(n,{
        color:color[i],
        fillOpacity:1,
        onEachFeature:function (feature, layer) {

          layer.on('click', function(e) {
              let v = feature.properties.ID;
              a.handleClickNode(v);
          });
        }}));
      i++;
    }

    let balancing_areas = ['01-central','02-oriental','03-occidental','04-noroeste','05-norte','06-noreste','07-peninsular','08-baja_california','09-baja_california_sur'];
    this.handleClick('01-central');
    this.handleClickNode("31");
    let j = 0;

    for (let n of nodex){
      let b_a = balancing_areas[j];
      let f = L.featureGroup([n]);

      f.on('click', () => this.handleClick(b_a));
      f.addTo(map);
      j++;

    }

  }


  render() {

    return (
      <PanelContainer collapseBottom>
        <Panel>
          <PanelHeader>
            <div style={{padding: 25}}>
              <div id='routingmap' style={{height: 250}}></div>
              <div className='fg-black50 text-center' style={{borderBottom: '1px solid #ccc'}}>
                <h5 style={{padding: 12.5, margin: 0}}>WALK 0.3 MILES - FOR 6 MINUTES</h5>
              </div>
              <div>
                <div className='map-dest' style={{marginBottom: 12.5}}>
                  <h3 className='fg-black50'>
                    <Icon glyph='icon-fontello-dot-circled' className='fg-darkgray'/>{' '}
                    <span>                                </span>
                  </h3>
                  <h5>

                  </h5>
                </div>
                <div ref='map'></div>
                <div className='map-dest'>
                  <h3 className='fg-black50'>
                    <Icon glyph='icon-fontello-dot-circled'/>{' '}
                    <span>                              </span>
                  </h3>
                  <h5 style={{marginBottom: 0}}>

                  </h5>
                </div>
              </div>
            </div>
          </PanelHeader>
        </Panel>
      </PanelContainer>
    );
  }
}
