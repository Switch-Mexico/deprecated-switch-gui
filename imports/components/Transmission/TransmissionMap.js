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
    this.clearMap = this.clearMap.bind(this);
    this.showMap = this.showMap.bind(this);
    this.getWeight = this.getWeight.bind(this);
    this.drawPolylines = this.drawPolylines.bind(this);
    this.state = { /// declare initial state

      data:0,
      blueLines:[],
      nodexe:0,
      maps:0,
      period:0

    };
  }

  clearMap(layer,zIndx) {  //this function clean the map to show new data
    console.log(this.state.maps._layers)
    for(let i in this.state.maps._layers) { //get all the map layers
    if(this.state.maps._layers[i]._path != undefined && this.state.maps._layers[i].options.pane == layer) {
        try {
            this.state.maps.removeLayer(this.state.maps._layers[i]); //delete a layer
        }
        catch(e) {
            console.log("problem with " + e + this.state.maps._layers[i]); // if error then
        }
      }
    }

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





  getPeriod(data){ // get all the years and legacy periods from droped  file

    var m = d3.map(data, function(d) { return d['TRANS_BUILD_YEARS_2']; });
    var years = m.keys();

    return years;

  }

  drawPolylines(row){ // draw the new lines from droped file

    let nodex = []
    let lzs = row['TRANS_BUILD_YEARS_1'].split("-"); //get the names of the transmission lines
    let lz1 = lzs[0]; // set transmission line one and two
    let lz2 = lzs[2];
    let weight = this.getWeight(row['BuildTrans']); //get the underlying weight
    nodex = [coordinates[lz1],coordinates[lz2]]; //set corrdinates obteined from coordinates.json file
    L.polyline(nodex, {color: '#ff4949',weight:weight,pane:'red'}).addTo(this.state.maps); //draw the poyline


  }




  showNewPoints(data,period){

    this.clearMap('red');

    if (period == "All New") {

      for (let row of data){
        this.drawPolylines(row);
      }
    } else {

      for (let row of data){
        if (row['TRANS_BUILD_YEARS_2'] == period){this.drawPolylines(row);}
      }
    }


    this.setState({
      year:period
    });



  }


  componentDidMount(){

    let blueLayer = this.showMap();


    this.state.maps = L.map(this.refs.map);


    this.state.maps.setView([23,-105], 5);
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    this.state.maps.createPane('labels');
    this.state.maps.getPane('labels').style.zIndex = 0;

    this.state.maps.createPane('blue');
    this.state.maps.getPane('blue').style.zIndex = 500;

    this.state.maps.createPane('red');
    this.state.maps.getPane('red').style.zIndex = 850;

    this.state.maps.createPane('description');
    this.state.maps.getPane('description').style.zIndex = 750;




    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
      }).addTo(this.state.maps);

    let base = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB',
      pane: 'labels'
    });



    let overlayMaps = {"Legacy Transmission Lines":this.props.blueLines};
    L.control.layers({},overlayMaps).addTo(this.state.maps);



    var color = [ "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00"];






  }







  render() {


    return (

      <div style={{padding: 25}}>
        <div ref="map" style={{height: 550}}>
        </div>
        <div className='fg-black50 text-center' style={{borderBottom: '1px solid #ccc'}}>
          <h5 style={{padding: 12.5, margin: 0}}>Scenario</h5>
        </div>
      </div>


    );
  }
}
