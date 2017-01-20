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
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.example))
      .addClass('nowrap')
      .dataTable({
        responsive: true,
        columnDefs: [
          { targets: [-1, -3], className: 'dt-body-right' }
        ]
    });
  }

  componentWillUnmount(){
       $(ReactDOM.findDOMNode(this.example))
       .dataTable()
       .destroy(true);
    }

  // shouldComponentUpdate() {
  //   return false;
  // }
  //
  // reloadTableData(names) {
  //
  //
  //
  //   const table = $(ReactDOM.findDOMNode(this.example))
  //                 .find('nowrap')
  //                 .DataTable();
  //   table.clear();
  //   table.rows.add(names);
  //   table.draw();
  //
  // }

  render() {
    return (
      <Table ref={(c) => this.example = c} className='display' cellSpacing='0' width='100%'>
        <thead>
          <tr>
            <th></th>
            <th>FROM</th>
            <th>TO</th>
            <th>Period</th>
            <th>Transmission [ MW ]</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th></th>
            <th>FROM</th>
            <th>TO</th>
            <th>Period</th>
            <th>Transmission [ MW ]</th>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>1</td>
            <td>Acapulco</td>
            <td>Central</td>
            <td>2020</td>
            <td>246.65</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Aguascalientes</td>
            <td>Queretaro</td>
            <td>2022</td>
            <td>255.37</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Lerma</td>
            <td>Hermosillo</td>
            <td>2024</td>
            <td>694.42</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Chihuahua</td>
            <td>Central</td>
            <td>Legacy</td>
            <td>181.22</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Lerma</td>
            <td>Moctezuma</td>
            <td>2028</td>
            <td>694.42</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}


export default class Datatablesjs extends React.Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <PanelContainer>
            <Panel>
              <PanelBody>
                <Grid>
                  <Row>
                    <Col xs={12} style={{padding:0}}>
                      <DatatableComponent />
                      <br/>
                    </Col>
                  </Row>
                </Grid>
              </PanelBody>
            </Panel>
          </PanelContainer>
        </Col>
      </Row>
    );
  }
}
