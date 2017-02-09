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
import LoadZoneGraph from './LoadZoneGraph'



export default class LoadZonesWrapper extends React.Component {

  constructor(props) {

    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.showMap = this.showMap.bind(this);

    this.state = { /// declare initial state

      data:0,
      nodexe:0,
      maps:0,
      period:0,
      load_zone:false,
      load_zone_id: '01'

    };
  }

  getIDs( row, index ) {

    let lzs = row['LOAD_ZONE'].split("-");
    let id = lzs[0];

    return id;

  }

  handleClick(id){


    let info = this.props.info.map((row,key)=>{

      if(row['proj_load_zone'].substring(0,2) == id) {return(row);}

          });
    info = info.filter(function(row) {
      return row != undefined;
    });

    console.log(info);

    this.setState({load_zone:info,load_zone_id:id});

  }


  showMap(){ ///draw the new transmission lines

    let a = this;
    let data = this.props.loadZones;

    let IDs = data.map((row , index)=>{

      return this.getIDs(row, index);

    });


    let nodex = [];

    L.geoJson(points,{ // draw all the points from file imports> nodes > Points > points.json

      onEachFeature:function (feature, layer) { // iterate over all the features from points.json files
        let id = feature.properties.ID.toString();


      if (IDs.includes(id)){
        let latlng = feature.geometry.coordinates;
        nodex.push(
          L.circle([latlng[1],latlng[0]], {
            color: '#ff4949', //set the points color opacity and radius
            fillColor: '#ff4949',
            fillOpacity: .3,
            opacity:.3,
            radius: 25000
          }).on('click', () => a.handleClick(id)).addTo(a.state.maps)
        );

      }

      }});

    }



  componentDidMount(){


    this.state.maps = L.map(this.refs.map);


    this.state.maps.setView([23,-105], 5);
    var mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    this.state.maps.createPane('labels');
    this.state.maps.getPane('labels').style.zIndex = 650;


    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
      }).addTo(this.state.maps);

      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
          attribution: '©OpenStreetMap, ©CartoDB',
          pane: 'labels'
  }).addTo(this.state.maps);


    this.showMap();

    this.handleClick('01');


  }

  render() {

    if (!this.props.loadZones && !this.state.load_zone && !this.props.info){
      return(<div>Loading...</div>);
    }


    return (
          <Col sm={12} style={{padding: 20, paddingTop:0, paddingBottom:0}}>
            <Col xs={12} sm={7} sm={7} style={{padding: 0}}>
              <Row>
                <Col sm={12} xs={12} md={12} collapseBottom >
                  <PanelContainer>
                    <Panel>
                      <PanelHeader>
                        <div style={{padding: 25, paddingBottom:0}}>
                          <div ref="map" style={{height: 445}}>
                          </div>
                          <div className='fg-black50 text-center' style={{borderBottom: '1px solid #ccc'}}>
                            <h5 style={{padding: 12.5, margin: 0, paddingBottom:0, marginBottom: 3}}>Scenario</h5>
                          </div>
                        </div>
                      </PanelHeader>
                    </Panel>
                  </PanelContainer>
              </Col>
            </Row>
            <Row>
              <Col sm={12} xs={12} md={12} collapseBottom >
                <PanelContainer style={{marginBottom: 0+'!important'}}>
                  <Panel>
                    <PanelHeader>
                      <Col sm={12} xs={12} md={12}  style={{paddingTop: 25, paddingBottom:0}}>
                        <div style={{height: 300}}>
                          <LoadZoneGraph data={this.state.load_zone} id={this.state.load_zone_id}/>
                          </div>
                        </Col>
                      </PanelHeader>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Col>
            <Col xs={12} xs={12} sm={5} style={{paddingLeft: 25, paddingRight:25}} >
              <Row>
                <Col xs={12} sm={12} md={12} collapseBottom style={{paddingTop: 0,paddingBottom:0, paddingRight:0}}>
                  <PanelContainer noOverflow>
                    <Panel>
                      <PanelBody style={{padding: 0}}>
                        <Grid>
                          <Col xs={12} className='text-center' style={{padding: 5}}>
                            <Col xs={12} className='text-right'>
                              <LoadZonesLabel year={this.state.year}/>
                            </Col>
                          </Col>
                        </Grid>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} sm={12} style={{padding: 25, paddingTop:0, paddingBottom:0, paddingRight:0}} collapseBottom>
                  <PanelContainer>
                    <Panel>
                      <PanelBody style={{padding: 0 }}>
                        <Grid>
                          <Col xs={12}  style={{padding: 25,paddingBottom:0, paddingLeft:0}} collapseLeft>
                            <div style={{height: 675}}>
                              <LoadZonesTable loadZones={this.props.loadZones} info={this.props.info}/>
                            </div>
                          </Col>
                        </Grid>
                      </PanelBody>
                    </Panel>
                  </PanelContainer>
                </Col>
              </Row>
            </Col>
          </Col>

        );
  }
}
