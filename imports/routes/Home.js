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
const balancing_areas = ['01-central','02-oriental','03-occidental','04-noroeste','05-norte','06-noreste','07-peninsular','08-baja_california','09-baja_california_sur'];
const balancing_area = ['Central','Oriental','Occidental','Noroeste','Norte','Noreste','Peninsular','Baja California','Baja California Sur'];


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
    this.highlightFeature = this.highlightFeature.bind(this);
    this.resetHighlight = this.resetHighlight.bind(this);
    this.zoomToFeature = this.zoomToFeature.bind(this);
    this.setLegend = this.setLegend.bind(this);




    this.state = {

      data:[{values:0}],
      nodexe:[{values:0}],
      rerender:false,
      mapInfo:0,
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


  setLegend(color,balancing_areas){

    let legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

      let div = L.DomUtil.create('div', 'info legend');
      // loop through our balancing_areas and generate a label with a colored square for each balancing_area
      balancing_areas.forEach(function(b_a,i) {

        div.innerHTML += '<i style="background:' + color[i] + '"></i> ' + b_a + '<br>';
      });

      return div;
    };

    return legend;

  }

  highlightFeature(layer,props,map){

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    this.state.mapInfo.update(layer.feature.properties);

  }

  resetHighlight(layer,map){
    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    this.state.mapInfo.update();
  }

  zoomToFeature(layer,map){
    map.fitBounds(layer.getBounds());
  }

  handleClickNode(e){
    console.log(e);


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

    map.setView([23,-105], 13);
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    map.createPane('labels');
    map.getPane('labels').style.zIndex = 650;

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB',
      pane: 'labels'
    }).addTo(map);


    let a = this;
    let nodex = []
    let nodes = [node0,node1,node2,node3,node4,node5,node6,node7,node8,node9]


    let i = 0;




    for (let n of nodes){
    //functon to iterate over the gejson files and attach them a click funcion per feature (polygon, point .. shape)

      nodex.push(
        L.geoJson(n,{
        fillColor:color[i],
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity:.7,
        onEachFeature:function (feature, layer) {

          layer.on('click', function(e) {
            console.log(layer,feature, "taaarget")
              let id = feature.properties.ID;
              a.zoomToFeature(layer,map);
              a.handleClickNode(id);

          });

          layer.on('mouseover', function(e) {
              a.highlightFeature(layer,layer.feature.properties,map);
          });

          layer.on('mouseout', function(e) {
              a.resetHighlight(layer,map);
          });

        }}));
      i++;
    }


    this.handleClick('01-central'); // execute these funtions in order to show some info when application starts
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

    let mapInfo = this.setInfo();
    let legend = this.setLegend(color,balancing_area);

    this.setState({mapInfo:mapInfo})

    mapInfo.addTo(map);
    legend.addTo(map);




  }

  setInfo(){

    let info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      this._div.innerHTML = '<h4>Mexico</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a Load Zone');
      };

      return info;
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
                    <div ref="mapi" style={{height: 600}}></div>
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
