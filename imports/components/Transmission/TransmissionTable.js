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


class DatatableComponent extends React.Component {

  constructor(props) {
    super(props);
    this.reloadTableData = this.reloadTableData.bind(this);
    this.writeRow = this.writeRow.bind(this);
    this.firstToUpperCase = this.firstToUpperCase.bind(this);
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
        ]

      });
  }


  firstToUpperCase( str ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }

  writeRow( row, index ) {

    let lzs = row['TRANS_BUILD_YEARS_1'].split("-");

    let lz1 = this.firstToUpperCase( lzs[1]);
    let lz2 = this.firstToUpperCase( lzs[3]);

    let period = row['TRANS_BUILD_YEARS_2'];

    let mw = Number(row['BuildTrans']);
    mw = mw.toFixed(2)

    return ([index+1,lz1,lz2,period,mw]);

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

    let data = this.props.transmission;


    let rowx = data.map((row , index)=>{

      return this.writeRow(row, index);

    });


    const table = $(ReactDOM.findDOMNode(this.example))
                  .DataTable({"pageLength": 13})
                  .rows.add(rowx).draw();
  }

  render() {

    if (!this.props.transmission){
      return(<div>Loading...</div>);
    }

    return (
      <Table ref={(c) => this.example = c} className='display' cellSpacing='0' width='100%'>
        <thead>
          <tr>
            <th></th>
            <th>From Load Zone</th>
            <th>To Load Zone</th>
            <th>Period</th>
            <th>Transmission [ MW ]</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th></th>
            <th>From Load Zone</th>
            <th>To Load Zone</th>
            <th>Period</th>
            <th>Transmission [ MW ]</th>
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
        <Col xs={12} style={{padding:25}}>
          <DatatableComponent transmission={this.props.transmission} />
          <br/>
        </Col>
      </Row>

    );
  }
}
