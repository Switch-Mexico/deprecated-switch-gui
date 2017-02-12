import React from 'react';
import { composeWithTracker } from 'react-komposer';

import {
  Row,
  Col,
  Grid,
  Table,
  Panel,
  MenuItem,
  PanelBody,
  PanelHeader,
  DropdownButton,
  PanelContainer,

} from '@sketchpixy/rubix';


import points from '../../nodes/Points/points';
import coordinates from '../../nodes/Points/coordinates';

import TransmissionTable from './TransmissionTable'
import TransmissionLabel from './TransmissionLabel'

export default class TransmissionWrapper extends React.Component {

  constructor(props) {

    super(props);
    this.showNewPoints = this.showNewPoints.bind(this); // declare all the functions that will be available
    this.getPeriod = this.getPeriod.bind(this);
    this.showMap = this.showMap.bind(this);
    this.setLegend = this.setLegend.bind(this);
    this.getWeight = this.getWeight.bind(this);

    this.state = { /// declare initial state

      data:0,
      blueLines:0,
      redLines:{},
      nodexe:0,
      maps:0,
      period:0

    };
  }


    getWeight(mw){ // set the weight of the transmission line

      if (mw == 0) { return 1 } else
      if (mw < 100) { return 3 } else
      if (mw >= 100 && mw < 500) { return 4 } else
      if (mw >= 500 && mw < 1000) { return 5 } else
      if (mw >= 1000 && mw < 2000) { return 6 } else
      if (mw >= 2000 && mw < 4000) { return 7 } else
      if (mw >= 4000) { return 8 }

    }

    setLegend(){

      let legend = L.control({position: 'bottomright'});
      let color = ['#0067c8','#ff4949'];
      let transmission_lines = ['Legacy Transmission Lines', 'Switch\'s Transmission Lines'];

      legend.onAdd = function (map) {

        let div = L.DomUtil.create('div', 'info legend');
        // loop through our transmission_lines and generate a label with a colored square for each transmission_line
        transmission_lines.forEach(function(t_l,i) {

          div.innerHTML += '<i style="background:' + color[i] + '"></i> ' + t_l + '<br>';
        });

        return div;
      };

      return legend;

    }

    showMap(mapa){ ///draw the new transmission lines
      let a = this;
      let nodex = []

      let b = [];

      let data = []

      d3.csv("/data/transmission_lines.csv", (error, data) => { //get the current transmission lines from file

         data = data.filter(function(row) {
           return row;
         });

         data.map((row , index)=>{

           let lz1 = row['lz1'].substring(0,2); //get the id of transmission line from row in file (first two digits)
           let lz2 = row['lz2'].substring(0,2);
           let weight = this.getWeight(row['existing_trans_cap_mw']); //call funct to get weight
           nodex = [coordinates[lz1],coordinates[lz2]];  //get the coordinates of the oadzones by id
           b.push(L.polyline(nodex, {color: '#0067c8',weight:weight,pane:'blue'})); // draw a line from point A to point B

         });

         L.geoJson(points,{ // draw all the points from file imports> nodes > Points > points.json

         onEachFeature:function (feature, layer) { // iterate over all the features from points.json files
           let latlng = feature.geometry.coordinates;

          L.circle([latlng[1],latlng[0]], {
             color: '#0067c8', //set the points color opacity and radius
             fillColor: '#0067c8',
             fillOpacity: .3,
             opacity:.3,
             radius: 25000,
             pane:'blue'
           }).addTo(mapa);



         }});



         b = L.layerGroup(b);

         a.setState({blueLines:b})


     });


   }



  getPeriod(data){ // get all the years and legacy periods from droped  file

    var m = d3.map(data, function(d) { return d['TRANS_BUILD_YEARS_2']; });
    var years = m.keys();

    return years;

  }


  showNewPoints(mapa,data,period,blueLines){

    let a = this;
    let overlayMaps = {};

    period.forEach(function(year) {

      let lines = [];

      data.map((row , index)=>{

        if (row['TRANS_BUILD_YEARS_2'] == year){

          let nodex = [];

          let lzs = row['TRANS_BUILD_YEARS_1'].split("-"); //get the names of the transmission lines
          let lz1 = lzs[0]; // set transmission line one and two
          let lz2 = lzs[2];
          let weight = a.getWeight(row['BuildTrans']); //get the underlying weight
          nodex = [coordinates[lz1],coordinates[lz2]]; //set corrdinates obteined from coordinates.json file
          let polyline = L.polyline(nodex, {color: '#ff4949',weight:weight,pane:'red'}); //draw the poyline
          lines.push(polyline);

        }

      });


      lines  = L.layerGroup(lines);

      overlayMaps[year]=lines;

    });

    overlayMaps["Current Transmission Lines"] = blueLines;
    L.control.layers({},overlayMaps).addTo(mapa);

  }


  componentDidMount(){


    this.state.maps = L.map(this.refs.map);

    this.state.maps.setView([23,-105], 5);
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    let mapa  = this.state.maps;

    mapa.createPane('labels');
    mapa.getPane('labels').style.zIndex = 0;

    mapa.createPane('blue');
    mapa.getPane('blue').style.zIndex = 500;

    mapa.createPane('red');
    mapa.getPane('red').style.zIndex = 850;

    mapa.createPane('description');
    mapa.getPane('description').style.zIndex = 750;



    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
      }).addTo(mapa);

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB',
      pane: 'labels'
    });

    this.showMap(mapa);
    let legend = this.setLegend();

    legend.addTo(mapa);





  }

  render() {

    if (!this.props.transmission){
      return(<div>Loading...</div>);
    }

    let data = this.props.transmission.map((point,key)=>{
      if(point['TRANS_BUILD_YEARS_1'] != "") {return(point);}
          });

    data = data.filter(function(row) {
        return row != undefined;
    });

    let period = this.getPeriod(data);

    if(this.state.blueLines != 0)
    {
      console.log(this.state.blueLines,"----------------------------------")
      this.showNewPoints(this.state.maps,data,period,this.state.blueLines);}


    return (
          <Col sm={12}>
            <Col sm={5} style={{padding: 0 }}>

              <Col sm={12} style={{padding: 0 }}>
                <PanelContainer collapseBottom>
                  <Panel>
                    <PanelBody style={{padding: 0 }}>
                      <Grid>
                        <Row>
                          <Col xs={12}  style={{padding: 25}}>
                            <div style={{height: 780}}>
                              <TransmissionTable transmission={data}/>
                            </div>
                          </Col>
                        </Row>
                      </Grid>
                    </PanelBody>
                  </Panel>
                </PanelContainer>
              </Col>

            </Col>
            <Col sm={7}>
              <Row>
                <Col sm={12} >
                  <PanelContainer collapseBottom>
                    <Panel>
                      <PanelHeader>
                        <div style={{padding: 25}}>
                          <div ref="map" style={{height: 550}}>
                          </div>
                          <div className='fg-black50 text-center' style={{borderBottom: '1px solid #ccc'}}>
                            <h5 style={{padding: 12.5, margin: 0}}>Scenario</h5>
                          </div>
                        </div>
                      </PanelHeader>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Col>
          </Col>

    );
  }
}
