import React from 'react';
import { composeWithTracker } from 'react-komposer';

import {
  Row,
  Tab,
  Col,
  Nav,
  Icon,
  Grid,
  Panel,
  PanelTabContainer,
} from '@sketchpixy/rubix';

import { Scenarios } from '../schemas';
import MainChart from '../components/MainChart'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.showData = this.showData.bind(this);
    this.state = {
      data:[{}],
      render:true,

    };
  }


  formatTimestamp(str){

    let format = d3.time.format("%Y/%m/%d/%H");
    let splited = str.slice(0,4) +"/"+ str.slice(4,6) +"/"+ str.slice(6,8) +"/"+ str.slice(8);
    let formated_timestamp = format.parse(splited);
    return formated_timestamp;

  }

  showData(scenarios){

    if (this.state.render){



    let data = scenarios.map((scenario,key)=>{
          return(scenario);
        });

    let proj_names = [];
    var a = this;

    data.forEach(function (row, i) {
      row['timestamp'] = a.formatTimestamp(row['timepoints']);
    });

    proj_names = data[0];
    proj_names = Object.keys(proj_names);
    console.log(proj_names,"proj names");
    let length_of = proj_names.length;
    proj_names = proj_names.slice(2,length_of-1);
    console.log(proj_names.pop(),"proj names");

    var all_projects_data = []
    let indx = 0;
    proj_names.forEach(function (name, indx) {
      console.log(name);

      var x_timestamp = [];
      var y_values = [];
      var y_for_shift_values_in_chart = [];

    data.forEach(function (row, i) {

      let value = (row[name] == '') ? 0 : Number(row[name]);
      x_timestamp[i] = row.timestamp;
      y_values[i] = value;


    });

    var getValue = function() {
      var val = y_values.shift();
      y_values.push(val);
      return val;
    }

    var getTimestamp = function() {

      var val = x_timestamp.shift();
      x_timestamp.push(val);

      return val;
    }

    var chart_data = d3.range(x_timestamp.length).map(function() {

      let time_miliseconds = getTimestamp().getTime();

      return {

        x: time_miliseconds,
        y: getValue()

      };



    });

    all_projects_data[indx] = chart_data;


  });

  console.log(all_projects_data);
  return all_projects_data;

  }
}

  componentWillReceiveProps(nextProps){
    if(nextProps.ready){
      console.log(nextProps.scenarios,"SCENARIOOOS")
      let data = this.showData(nextProps.scenarios);
      console.log(data,"data")
      this.setState({
        data: data
      });
    }
  }

  render() {

  if (!this.props.ready){
    return(<div>Loading...</div>);
  }

  return (
    <div style={{height: 900}} className='dashboard'>
      <Row>
        <Col sm={12}>
          <PanelTabContainer id='dashboard-main' defaultActiveKey="demographics">
            <Panel>
              <MainChart data={this.state.data} redraw/>
            </Panel>
          </PanelTabContainer>
        </Col>
      </Row>
    </div>
  );

}

}

function composer(props, onData) {

  const subscription = Meteor.subscribe("scenarios.data");

  if (subscription.ready()) {

    const data =  {
      scenarios: Scenarios.find({}),
      ready: true,
    };

    console.log(data, "Scenarios subscription done");

    onData(null, data);
  } else {
    onData(null, {ready: false, scenarios: false});
  }
}

export default composeWithTracker(composer)(Dashboard);
