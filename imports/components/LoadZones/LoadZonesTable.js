import React from 'react';
import ReactDOM from 'react-dom';

import {
  Row,
  Col,
  Grid,
  Panel,
  Table,
  PanelBody,
  PanelHeader,
  FormControl,
  PanelContainer,
} from '@sketchpixy/rubix';


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

class DatatableComponent extends React.Component {

  constructor(props) {
    super(props);
    this.reloadTableData = this.reloadTableData.bind(this);
    this.writeRow = this.writeRow.bind(this);
  }

  componentDidMount() {
    $(ReactDOM.findDOMNode(this.example))
      .addClass('nowrap')
      .find('nowrap')
      .dataTable({
        responsive: true,
        pagination: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]});
  }


  writeRow( row, index ) {
    console.log(row);

    let lzs = row['proj_load_zone'].split("-");

    let id = lzs[0];
    let lz = capitalize(lzs[1]);
    let project = row['PROJECT'];
    let tech = row['proj_gen_tech'];
    let col1 = capitalize(project);
    let col0 = capitalize(tech);
    let col2 = lz;
    let col3 = Number(row['proj_capacity_limit_mw']).toFixed(2);
    // let existing_local_td = Number(row['existing_local_td']).toFixed(2);
    //
    // let local_td_annual_cost_per_mw = Number(row['local_td_annual_cost_per_mw']);
    // local_td_annual_cost_per_mw = local_td_annual_cost_per_mw.toFixed(2);

    return ([col0, col1, col2, col3]);

  }

  componentWillUnmount(){

       $(ReactDOM.findDOMNode(this.example))
       .dataTable()
       .fnDestroy(true);
    }

  componentDidMount() {

    this.reloadTableData();

  }

  reloadTableData() {

    let data = this.props.info; // uses the project_info.tab

    let rowx = data.map((row , index)=>{

      return this.writeRow(row, index);

    });
    const table = $(ReactDOM.findDOMNode(this.example))
                  .DataTable({"pageLength": 11})
                  .rows.add(rowx).draw();
  }

  render() {

    if (!this.props.loadZones){
      return(<div>Loading...</div>);
    }

    return (
      <Table ref={(c) => this.example = c} className='display' cellSpacing='0' width='100%' style={{paddingLeft:0}}>
        <thead>
          <tr>
            <th>Tech</th>
            <th>Project</th>
            <th>Load Zone</th>
            <th>Capacity [ MW ]</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>Tech</th>
            <th>Project</th>
            <th>Load Zone</th>
            <th>Capacity [ MW ]</th>
          </tr>
        </tfoot>
        <tbody>
        </tbody>
      </Table>
    );
  }
}


export default class Datatablesjs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col xs={12} style={{padding:15,paddingBottom:0}}>
          <DatatableComponent loadZones={this.props.loadZones} info={this.props.info}/>
          <br/>
        </Col>
      </Row>

    );
  }
}
