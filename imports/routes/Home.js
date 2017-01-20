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
  MenuItem,
  PanelBody,
  FormGroup,
  PanelLeft,
  isBrowser,
  InputGroup,
  LoremIpsum,
  PanelRight,
  PanelHeader,
  ButtonGroup,
  FormControl,
  SplitButton,
  ButtonToolbar,
  PanelContainer,
  DropdownButton,
  SplitHoverButton,
  PanelTabContainer,
  DropdownHoverButton,
} from '@sketchpixy/rubix';


import HorizontalBarChart from '../components/HorizontalBarChart'
import BarChart from '../components/BarChart'
import ChartDescription from '../components/ChartDescription'
import Dropzone from '../components/Dropzonejs'
import BarColSeries from '../components/BarColSeries'

import node0 from '../nodes/node_00';
import node1 from '../nodes/node_01';
import node2 from '../nodes/node_02';
import node3 from '../nodes/node_03';
import node4 from '../nodes/node_04';
import node5 from '../nodes/node_05';
import node6 from '../nodes/node_06';
import node7 from '../nodes/node_07';
import node8 from '../nodes/node_08';
import node9 from '../nodes/node_09';


const color = [ "#feb24c","#E34A33","#2B8CBE","#2CA25F","#C51B8A","#E6550D","#756BB1","#636363","#DD1C77","#1C9099"];


function capitalize(str) {
     var splittedEnter = str.split(" ");
     var capitalized;
     var capitalizedResult;
     for (var i = 0 ; i < splittedEnter.length ; i++){
         capitalized = splittedEnter[i].charAt(0).toUpperCase();
         splittedEnter[i] = capitalized + splittedEnter[i].substr(1).toLowerCase();
    }
    return splittedEnter.join(" ");
}


export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickNode = this.handleClickNode.bind(this);
    this.nationalData = this.nationalData.bind(this);

    this.state = {

      data:[{values:0}],
      nodexe:[{values:0}],
      rerender:false,
      load_zone_id:"",
      balancing_area_id:"",
      load_zone_name:"",
      balancing_area_name:"",
      national: [{values:0}]

    };
  }


  nationalData(){


    d3.csv("/data/PowerPlants.csv", (error, data) => {

      data = data.filter(function(row) {
        return row['being_built'] != 'optimization';
      });

      data = data.filter(function(row) {
        return row['being_built'] != 'generic_project';
      });


      var data = d3.nest()
       .key(function(d) { return d.gen_tech;})
       .rollup(function(d) {
         return d3.sum(d, function(g) {return g.capacity_mw; });
       }).entries(data);

       this.setState({
          national : data
       });

     });


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


      let names = data[0]['load_zone'].split("-");
      let id = names[0];
      let name = names[1].replace("_", " ");
      name = capitalize(name); // convert the first letter to upper case


      var data = d3.nest()
       .key(function(d) { return d.gen_tech;})
       .rollup(function(d) {
         return d3.sum(d, function(g) {return g.capacity_mw; });
       }).entries(data);

       this.setState({
          nodexe : data,
          load_zone_id : id,
          load_zone_name: name + "  " + id
       });

     });


  }

  handleClick(balancing_area){

    let names = balancing_area.split("-");
    let id = names[0];
    let name = names[1].replace("_", " ");
    name = capitalize(name); // convert the first letter to upper case

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
           data : data,
           balancing_area_name : name,
           balancing_area_id   : id
         });

     });
  }

  componentDidMount(){


    var map = L.map(this.refs.mapi);

    map.setView([23,-105], 4);
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';


    L.tileLayer(
      'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        minZoom: 4
      }).addTo(map);


    let a = this;
    let nodex = []
    let nodes = [node0,node1,node2,node3,node4,node5,node6,node7,node8,node9]


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
    this.nationalData();
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


  if (!this.state.data){
    return(<div>Loading...</div>);
  }




    return (
      <div className='dashboard'>
        <Row>
          <Col sm={6}>
            <PanelContainer>
              <Panel>
                <PanelHeader>
                  <div style={{padding: 10}}>
                    <div ref="mapi" style={{height: 400}}></div>
                    <div className='fg-black50 text-center'>
                      <h5>Mexico - SCENARIO</h5>
                    </div>
                  </div>
                </PanelHeader>
              </Panel>
            </PanelContainer>
            <PanelContainer>
              <Panel>
                <PanelHeader>
                  <div style={{padding: 20, height: 400}}>
                    <div className='fg-black50 text-center'>
                      <HorizontalBarChart color={'109'} container={"graph-container-0"} subtitle={"Capacity [ MW ]"} name={'Mexico'} data={this.state.national} id={'hbar-chart-0'} title={'National'}/>
                    </div>
                  </div>
                </PanelHeader>
              </Panel>
            </PanelContainer>
          </Col>
          <Col sm={6} collapseLeft>
            <PanelContainer noOverflow>
              <Panel>
                <PanelBody style={{padding: 0}}>
                  <Grid>
                    <Row>
                      <Col xs={12} className='text-center' style={{padding: 0}}>
                        <Col xs={6} className='text-right'>
                          <div className='fg-black text-center' style={{marginTop: 36}}>
                            <h2> Installed Capacity</h2>
                          </div>
                        </Col>
                        <Col xs={6} className='text-right' style={{padding: 10, height:60}}>
                          <div>
                            <DropdownButton outlined bsStyle='brightblue' title='Outlined' id='dropdown-outlined-dropup' pullRight>
                              <MenuItem eventKey="1">Capacity [ MW ]</MenuItem>
                              <MenuItem eventKey="2">Another action</MenuItem>
                            </DropdownButton>
                          </div>
                          <br />
                        </Col>
                      </Col>
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelContainer>
            <PanelContainer>
              <Panel>
                <PanelBody style={{padding: 0}}>
                  <Grid>
                    <Row>
                      <Col xs={12} className='text-center' style={{padding: 20, height: 380}}>
                        <HorizontalBarChart color={'109'} container={"graph-container-1"} subtitle={"Capacity [ MW ]"} name={this.state.load_zone_name} data={this.state.nodexe} id={'hbar-chart'} title={'Load Zone'}/>
                      </Col>
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelContainer>
            <PanelContainer>
              <Panel>
                <PanelBody style={{padding: 0}}>
                  <Grid>
                    <Row>
                      <Col xs={12} className='text-center' style={{padding: 20, height: 380 }}>
                        <HorizontalBarChart color={this.state.balancing_area_id} container={"graph-container-2"} subtitle={"Capacity [ MW ]"} name={this.state.balancing_area_name} data={this.state.data} id={'hbar-chart2'} title={'Balancing Area'}/>

                      </Col>
                    </Row>
                  </Grid>
                </PanelBody>
              </Panel>
            </PanelContainer>
          </Col>
        </Row>
      </div>
    );
  }
}
