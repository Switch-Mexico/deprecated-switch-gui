import React from 'react';

import {
  Row,
  Tab,
  Col,
  Grid,
  Panel,
  PanelBody,
  PanelHeader,
  PanelContainer,
} from '@sketchpixy/rubix';

import StackedHorizontalBar from '../components/StackedHorizontalBar'
import HorizontalBarChart from '../components/HorizontalBarChart'

import country from  '../data'

//-------------------------------------------functionts

function capitalize(str) {
     var splittedEnter = str.split("_");
     var capitalized;
     var capitalizedResult;
     for (var i = 0 ; i < splittedEnter.length ; i++){
         capitalized = splittedEnter[i].charAt(0).toUpperCase();
         splittedEnter[i] = capitalized + splittedEnter[i].substr(1).toLowerCase();
    }
    return splittedEnter.join(" ");
}

//--------------------------------------------react class

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.nationalData = this.nationalData.bind(this);
    this.highlightFeature = this.highlightFeature.bind(this);
    this.resetHighlight = this.resetHighlight.bind(this);
    this.zoomToFeature = this.zoomToFeature.bind(this);
    this.setLegend = this.setLegend.bind(this);




    this.state = {
      mapInfo:0,
      country: country
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

      let load_zones_capacity = d3.nest()
       .key(function(d) { return d.load_zone;})
       .entries(data);


       let loadZonesObject = {}
       load_zones_capacity.forEach(function(load_zone,i){


         let id = load_zone.key.substring(0,2);
         let name = capitalize(load_zone.key.substring(3));

         let dato = d3.nest()
         .key(function(d) { return d.gen_tech;})
         .rollup(function(d) {
           return d3.sum(d, function(g) {return g.capacity_mw; });
         }).entries(load_zone.values);

         let total_capacity = d3.nest()
         .key(function(d) { return "total";})
         .rollup(function(d) {
           return d3.sum(d, function(g) {

             return g.values;
           });
         }).entries(dato);

         let total = Number(total_capacity[0].values);
         total = total.toFixed(2);
         loadZonesObject[id] = {type:"loadZone", properties:{ID: load_zone.key, name:name,capacity:{total:total,break_down:dato},index:id}};

       });


      var data = d3.nest()
       .key(function(d) { return d.balancing_area;})
       .entries(data);


      data.forEach(function(b_a,i){

        let dato = d3.nest()
        .key(function(d) { return d.gen_tech;})
        .rollup(function(d) {
          return d3.sum(d, function(g) {return g.capacity_mw; });
        }).entries(b_a.values);

        let total_capacity = d3.nest()
        .key(function(d) { return "total";})
        .rollup(function(d) {
          return d3.sum(d, function(g) {

            return g.values;
          });
        }).entries(dato);

        let total = Number(total_capacity[0].values);
        total = total.toFixed(2);


        for (var key in country.balancingAreas) {
          if (b_a.key == country.balancingAreas[key].properties.ID) {
            country.balancingAreas[key].properties["index"] = key;
            country.balancingAreas[key].properties["capacity"] = {total:total,break_down:dato};
          }
        }

        country["loadZones"] = loadZonesObject;


     });

     let balancingArea = country.balancingAreas["01"];
     let loadZone = country.loadZones["31"];
     let color = country.balancingAreas["01"].properties.color;

     this.setState({
       country: country,
       balancingArea: balancingArea,
       loadZone: loadZone,
       color: color

      });

    });
  }

  setLegend(){
    let legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {

      let div = L.DomUtil.create('div', 'info legend');
      // loop through our balancing_areas and generate a label with a colored square for each balancing_area
      for (var key in country.balancingAreas) {
        div.innerHTML += '<i style="background:' + country.balancingAreas[key].properties.color + '"></i> ' + country.balancingAreas[key].properties.name + '<br>';
      }
      return div;
    };

    return legend;
  }



  highlightFeature(layer,l_z,map,b_a){

    let name  = this.state.country.loadZones[l_z.ID] ? this.state.country.loadZones[l_z.ID].properties.name : "No Data";
    let total = this.state.country.loadZones[l_z.ID] ? this.state.country.loadZones[l_z.ID].properties.capacity.total : "No Data";

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    let props = {
      l_z:{name:name,total:total},
      b_a:{name:b_a.properties.name,total:b_a.properties.capacity.total}
    }


    this.state.mapInfo.update(props);

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


  handleClick(data){

    if (data){
      let color = data.properties.color;
        this.setState({
          [data.type] : data,
          color : color
        });
      } else { //FIXME temporal approach to skip loadZones w/o data
          this.setState({
            loadZone : [],
          });
      }
  }

  setInfo(props){

    let info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control operating over the feature properties received
    info.update = function (props) {
      this._div.innerHTML = '<h4>Mexico\'s Balancing Areas</h4>' +  (props ? // ternary operator to decide wheter there are function's arguments or not
        'Balancing Area:     '+ '<b>' + props.b_a.name  + '</b>'  + '<br>' + // if arguments
        'Installed Capacity: '+ '<b>' + props.b_a.total + ' [MW]' + '</b>' + '<br>' +
        'Load Zone:          '+ '<b>' + props.l_z.name  + '</b>'  + '<br>' +
        'Installed Capacity: '+ '<b>' + props.l_z.total + ' [MW]' + '</b>'
        : 'Hover over a Load Zone'); //if no arguments
      };

      return info;
  }

  componentDidMount(){

    this.nationalData();

    var map = L.map(this.refs.national_map);

    map.setView([23.8,-103.5], 5);
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    map.createPane('labels');
    map.getPane('labels').style.zIndex = 300;

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB',
      pane: 'labels'
    }).addTo(map);


    let a = this;  //inside gejson's functions (onEachFeature) the aplication context change so we declare the context (this) to variable "a" so ww will be able to use the application context inside those functions


    map.createPane('shapes');
    map.getPane('shapes').style.zIndex = 350;

    let shape_layers = {};

    for (let shape_name in country.balancingAreas["01"].properties.shape){
      //iterates over the shapes that a country has (in our case the ones provided by prodesen and the ones generated by Mateo's work)

      let geojsonLayers = [];

      for (let key in country.balancingAreas){
        //functon to iterate over the gejson files and attach them a click funcion per feature (polygon, point .. sh/ape)
        geojsonLayers.push(
          L.geoJson(this.state.country.balancingAreas[key].properties.shape[shape_name],{
            fillColor:this.state.country.balancingAreas[key].properties.color,
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity:.7,
            b_a:this.state.country.balancingAreas[key],
            pane:'shapes',
            onEachFeature:function (feature, layer) {

              layer.on('click', function(e) {
                let id = feature.properties.ID;
                a.zoomToFeature(layer,map);
                a.handleClick(a.state.country.loadZones[id]);

              });

              layer.on('mouseover', function(e) {
                a.highlightFeature(layer,layer.feature.properties,map,a.state.country.balancingAreas[key]);
              });

              layer.on('mouseout', function(e) {
                a.resetHighlight(layer,map);
              });

            }}));

            geojsonLayers.forEach(function(layer,i){
              let featureGroup = L.featureGroup([layer]);
              featureGroup.on('click', () => a.handleClick(layer.options.b_a));
            });
          }

          shape_layers[shape_name] = L.layerGroup(geojsonLayers);
        }

    let mapInfo = this.setInfo();
    let mapLegend = this.setLegend();
    this.setState({mapInfo:mapInfo})

    mapInfo.addTo(map);
    mapLegend.addTo(map);
    L.control.layers(shape_layers).addTo(map);

    this.handleClick(this.state.balancingArea); // execute these funtions in order to show some info when the application starts
    this.handleClick(this.state.loadZone);
  }



  render() {

    return (
      <div className='dashboard'>
        <Row>
          <Col sm={7}>
            <PanelContainer>
              <Panel>
                <PanelHeader>
                  <div style={{padding: 10}}>
                    <div ref="national_map" style={{height: 600}}></div>
                  </div>
                </PanelHeader>
              </Panel>
            </PanelContainer>
            <PanelContainer>
              <Panel>
                <PanelHeader>
                  <Col xs={12} className='text-center' style={{padding: 20, height: 280 }}>
                    <HorizontalBarChart title={'Load Zone'} color={this.state.color} height={210} container={"graph-container-1"} subtitle={"Installed Capacity [ MW ]"}  data={this.state.loadZone} id={'hbar-chart'} />
                  </Col>
                </PanelHeader>
              </Panel>
            </PanelContainer>
          </Col>
          <Col sm={5} collapseLeft>
            <PanelContainer>
              <Panel>
                <PanelBody style={{padding: 0}}>
                  <Grid>
                    <Row>
                      <Col xs={12} className='text-center' style={{padding: 20, height: 500}}>
                        <StackedHorizontalBar title={'National'} height={430}  container={"graph-container-0"} subtitle={"Installed Capacity [ MW ]"} name={'Mexico'} data={this.state.country.balancingAreas} id={'hbar-chart-0'} />
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
                        <HorizontalBarChart title={'Balancing Area'} color={this.state.color} height={330}  container={"graph-container-2"} subtitle={"Installed Capacity [ MW ]"}  data={this.state.balancingArea} id={'hbar-chart-2'} />
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
