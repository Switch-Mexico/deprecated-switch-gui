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
      nodexe:0,
      maps:0,
      period:0

    };
  }

  clearMap() {  //this fun clean the map to show new data

  for(let i in this.state.maps._layers) { //get all the map layers
      if(this.state.maps._layers[i]._path != undefined) {
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

    showMap(){ ///draw the new transmission lines
      let a = this;
      let nodex = []

      d3.csv("/data/transmission_lines.csv", (error, data) => { //get the current transmission lines from file

      for (let row of data){

        let lz1 = row['lz1'].substring(0,2); //get the id of transmission line from row in file (firsst two digits)
        let lz2 = row['lz2'].substring(0,2);
        let weight = this.getWeight(row['existing_trans_cap_mw']); //call funct to get weoght
        nodex = [coordinates[lz1],coordinates[lz2]];  //get the coordinates of the oadzones by id
        L.polyline(nodex, {color: '#0067c8',weight:weight}).addTo(a.state.maps); // draw a line from point A to point B


      }

     });


     let i = 0
     L.geoJson(points,{ // draw all the points from file imports> nodes > Points > points.json
     onEachFeature:function (feature, layer) { // iterate over all the features from points.json files
       let latlng = feature.geometry.coordinates;
       L.circle([latlng[1],latlng[0]], {
         color: '#0067c8', //set the points color opacity and radius
         fillColor: '#0067c8',
         fillOpacity: .3,
         opacity:.3,
         radius: 25000
       }).addTo(a.state.maps);
       i++;
     }});
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
    L.polyline(nodex, {color: '#ff4949',weight:weight}).addTo(this.state.maps); //draw the poyline


  }




  showNewPoints(data,period){

    this.clearMap();
    this.showMap();


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


    this.state.maps = L.map(this.refs.map);

    this.state.maps.setView([23,-105], 5);
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';


    L.tileLayer(
      'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        minZoom: 5,
      }).addTo(this.state.maps);

    var color = [ "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00", "#FF55EE","#0084FF","#00EFFF","#51FF00","#4B2CE8","#FF9900","#FF0000","#999999","#CDFF00"];




    this.showMap();

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
    period.push("All New");

    let items = period.map((item , index)=>{
      return (
        <MenuItem key={index} onClick={()=>{this.showNewPoints(data,item)}} eventKey={index+1} >
          {item}
        </MenuItem>
      );
    });

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
                <Col sm={12} collapseRight>
                  <PanelContainer noOverflow>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <Grid>
                          <Row>
                            <Col xs={12} className='text-center' style={{padding: 25}}>
                              <Col xs={10} className='text-right'>
                                <TransmissionLabel year={this.state.year}/>
                              </Col>
                              <Col xs={2} className='text-right'>
                                <div>
                                  <DropdownButton outlined bsStyle='brightblue' title='Filter By' id='dropdown-outlined-dropup' pullRight>
                                    {items}
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
                </Col>
              </Row>
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
