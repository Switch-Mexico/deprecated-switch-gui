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

import LoadZonesTable from './LoadZonesTable'
import LoadZonesLabel from './LoadZonesLabel'



export default class LoadZonesWrapper extends React.Component {

  constructor(props) {

    super(props);
    this.showMap = this.showMap.bind(this);

    this.state = { /// declare initial state

      data:0,
      nodexe:0,
      maps:0,
      period:0

    };
  }

  getIDs( row, index ) {

    let lzs = row['LOAD_ZONE'].split("-");
    let id = lzs[0];

    return id;

  }
  showMap(){ ///draw the new transmission lines

    let a = this;
    let data = this.props.loadZones;

    let IDs = data.map((row , index)=>{

      return this.getIDs(row, index);

    });
    console.log(IDs);

    L.geoJson(points,{ // draw all the points from file imports> nodes > Points > points.json
      onEachFeature:function (feature, layer) { // iterate over all the features from points.json files
        let id = feature.properties.ID.toString();
        console.log(id,typeof(id));

      if (IDs.includes(id)){
        let latlng = feature.geometry.coordinates;
        L.circle([latlng[1],latlng[0]], {
          color: '#ff4949', //set the points color opacity and radius
          fillColor: '#ff4949',
          fillOpacity: .3,
          opacity:.3,
          radius: 25000
        }).addTo(a.state.maps);


      }

      }});
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

    if (!this.props.loadZones){
      return(<div>Loading...</div>);
    }


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
                              <LoadZonesTable loadZones={this.props.loadZones}/>
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
                                <LoadZonesLabel year={this.state.year}/>
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
