import React from 'react';

import {
  Row,
  Tab,
  Col,
  Nav,
  Icon,
  Grid,
  Table,
  Label,
  Panel,
  NavItem,
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

import StackedHorizontalBar from '../components/StackedHorizontalBar'
import HorizontalBarChart from '../components/HorizontalBarChart'
import BarChart from '../components/BarChart'
import ChartDescription from '../components/ChartDescription'
import Dropzone from '../components/Dropzonejs'
import BarColSeries from '../components/BarColSeries'

import node00 from '../nodes/node_00';
import node01 from '../nodes/node_01';
import node02 from '../nodes/node_02';
import node03 from '../nodes/node_03';
import node04 from '../nodes/node_04';
import node05 from '../nodes/node_05';
import node06 from '../nodes/node_06';
import node07 from '../nodes/node_07';
import node08 from '../nodes/node_08';
import node09 from '../nodes/node_09';


const color = ["#1C9099", "#feb24c","#E34A33","#2B8CBE","#2CA25F","#C51B8A","#E6550D","#756BB1","#636363","#DD1C77","#1C9099"];
const balancing_areas = ['08-baja_california','09-baja_california_sur','04-noroeste','05-norte','06-noreste','03-occidental','01-central','02-oriental','07-peninsular'];
const balancing_area = ['Baja California','Baja California Sur','Noroeste','Norte','Noreste','Occidental','Central','Oriental','Peninsular'];

const country = { "type" : "BalancingAreaCollection",
                  "name" : "Mexico",
                  "balancingAreas": [
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"08-baja_california", "name":"Baja California", "shape": node08, "color":"#756BB1"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"09-baja_california_sur", "name":"Baja California Sur", "shape": node09, "color":"#DD1C77"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"04-noroeste", "name":"Noroeste", "shape": node04, "color":"#636363"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"05-norte", "name":"Norte", "shape": node05, "color":"#2CA25F"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"06-noreste", "name":"Noreste", "shape": node06, "color":"#feb24c"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"03-occidental", "name":"Occidental", "shape": node03, "color":"#1C9099"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"01-central", "name":"Central", "shape": node01, "color":"#E34A33"}
                    },
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"02-oriental", "name":"Oriental", "shape": node02, "color":"#C51B8A"}
                    }
                    ,
                    {
                      "type" : "balancingArea",
                      "properties" : {"ID":"07-peninsular", "name":"Peninsular", "shape": node07, "color":"#2B8CBE"}
                    }
                  ]

                };


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


      data = data.filter(function(row) {
        let gen_tech = row['gen_tech'];
        if(gen_tech  == 'bioenergy_natural_gas'
        || gen_tech  == 'bioenergy_diesel'
        || gen_tech  == 'bioenergy_fuel_oil'){
          row['gen_tech'] = 'bioenergy';
        }
        return row;
      });



      data = data.filter(function(row) {
        let gen_tech = row['gen_tech'];

        if( gen_tech == 'geothermal'
        || gen_tech  == 'solar'
        || gen_tech  == 'hydroelectric'
        || gen_tech  == 'eolic'
        || gen_tech  == 'termosolar'
        || gen_tech  == 'solar'
        || gen_tech  == 'bioenergy'){
          return row;
        }

      });


      data = data.filter(function(row) {
        row['gen_tech'] = capitalize(row['gen_tech']);
        return row;
      });
      var data = d3.nest()
       .key(function(d) { return d.balancing_area;})
       .entries(data);

      let bal_areas = []

      data.forEach(function(b_a,i){

        let dato = d3.nest()
        .key(function(d) { return d.gen_tech;})
        .rollup(function(d) {
          return d3.sum(d, function(g) {return g.capacity_mw; });
        }).entries(b_a.values);



        country.balancingAreas.forEach(function(bal_area,i){
          if (bal_area.properties.ID == b_a.key) {bal_areas.push({"capacity":dato, "properties":bal_area.properties})};
        });

      });

      this.setState({
        national : bal_areas
       });

     });


  }


  setLegend(){



    let legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {

      let div = L.DomUtil.create('div', 'info legend');
      // loop through our balancing_areas and generate a label with a colored square for each balancing_area
      country.balancingAreas.forEach(function(b_a,i) {

        div.innerHTML += '<i style="background:' + b_a.properties.color + '"></i> ' + b_a.properties.name + '<br>';
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



    d3.csv("/data/PowerPlants.csv", (error, data) => {

      data = data.filter(function(row) {
        return row['being_built'] != 'optimization';
      });

      data = data.filter(function(row) {
        return row['being_built'] != 'generic_project';


      });

      data = data.filter(function(row) {
        let gen_tech = row['gen_tech'];

        if( gen_tech == 'geothermal'
        || gen_tech  == 'solar'
        || gen_tech  == 'hydroelectric'
        || gen_tech  == 'eolic'
        || gen_tech  == 'termosolar'
        || gen_tech  == 'solar'
        || gen_tech  == 'bioenergy_natural_gas'
        || gen_tech  == 'bioenergy_diesel'
        || gen_tech  == 'bioenergy_fuel_oil'){
          return row;
        }

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

    d3.csv("/data/PowerPlants.csv", (error, data) => {

      data = data.filter(function(row) {


        return row['being_built'] != 'optimization';


      });

      data = data.filter(function(row) {
        return row['being_built'] != 'generic_project';

      });

      data = data.filter(function(row) {
        let gen_tech = row['gen_tech'];

        if( gen_tech == 'geothermal'
        || gen_tech  == 'solar'
        || gen_tech  == 'hydroelectric'
        || gen_tech  == 'eolic'
        || gen_tech  == 'termosolar'
        || gen_tech  == 'solar'
        || gen_tech  == 'bioenergy_natural_gas'
        || gen_tech  == 'bioenergy_diesel'
        || gen_tech  == 'bioenergy_fuel_oil'){
          return row;
        }

      });





      data = data.filter(function(row) {
        return row['balancing_area'] == balancing_area.properties.ID;
      });

      var data = d3.nest()
       .key(function(d) { return d.gen_tech;})
       .rollup(function(d) {
         return d3.sum(d, function(g) {return g.capacity_mw; });
       }).entries(data);


         this.setState({
           data : data,
           balancing_area_name : balancing_area.properties.name,
           balancing_area_id   : balancing_area.properties.ID
         });

     });
  }

  componentDidMount(){

    var map = L.map(this.refs.mapi);

    map.setView([23.8,-103.5], 5);
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    map.createPane('labels');
    map.getPane('labels').style.zIndex = 0;

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB',
      pane: 'labels'
    }).addTo(map);


    let a = this;
    let geojsonLayers = []

    let i = 0;


    for (let b_a of country.balancingAreas){
    //functon to iterate over the gejson files and attach them a click funcion per feature (polygon, point .. shape)

      geojsonLayers.push(
        L.geoJson(b_a.properties.shape,{
        fillColor:b_a.properties.color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity:.7,
        b_a:b_a,
        onEachFeature:function (feature, layer) {

          layer.on('click', function(e) {
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

    this.handleClick(country.balancingAreas[0]); // execute these funtions in order to show some info when application starts
    this.handleClickNode("31");
    this.nationalData();


    geojsonLayers.forEach(function(layer,i){

      let featureGroup = L.featureGroup([layer]);
      featureGroup.on('click', () => a.handleClick(layer.b_a));
      featureGroup.addTo(map);

    });

    let mapInfo = this.setInfo();
    let mapLegend = this.setLegend();

    this.setState({mapInfo:mapInfo})

    mapInfo.addTo(map);
    mapLegend.addTo(map);




  }

  setInfo(){

    let info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on the feature properties received
    info.update = function (props) {
      this._div.innerHTML = '<h4>Mexico\'s Balancing Areas</h4>' +  (props ?
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
          <Col sm={7}>
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
                  <div style={{padding: 20, height: 300}}>
                    <div className='fg-black50 text-center'>
                      <HorizontalBarChart height={220} color={this.state.balancing_area_id} title={'Load Zone'} container={"graph-container-1"} subtitle={"Capacity [ MW ]"} name={this.state.load_zone_name} data={this.state.nodexe} id={'hbar-chart'} />

                  </div>
                  </div>
                </PanelHeader>
              </Panel>
            </PanelContainer>
          </Col>
          <Col sm={5} collapseLeft>
            <PanelContainer>
            </PanelContainer>
            <PanelContainer>
              <Panel>
                <PanelBody style={{padding: 0}}>
                  <Grid>
                    <Row>
                      <Col xs={12} className='text-center' style={{padding: 20, height: 500}}>
                        <StackedHorizontalBar height={430} color={'109'} title={'National'} container={"graph-container-0"} subtitle={"Capacity [ MW ]"} name={'Mexico'} data={this.state.national} id={'hbar-chart-0'} />
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
                      <Col xs={12} className='text-center' style={{padding: 20, height: 400 }}>
                        <HorizontalBarChart height={330} color={this.state.balancing_area_id} title={'Balancing Area'} container={"graph-container-2"} subtitle={"Capacity [ MW ]"} name={this.state.balancing_area_name} data={this.state.data} id={'hbar-chart2'} />
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
