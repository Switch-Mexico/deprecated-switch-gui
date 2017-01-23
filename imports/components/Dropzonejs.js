import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';


import {
  Row,
  Col,
  Grid,
  Form,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

export default class Dropzonejs extends React.Component {
  componentDidMount() {

    var reader = new FileReader();

    let a =  $('#my-awesome-dropzone').dropzone({
      paramName: "file", // The name that will be used to transfer the file
      maxFilesize: 20, // MB

      accept: (file, done) => {




        var reader = new FileReader();
        reader.readAsText(file);
        switch (file.name)
        {
          case 'BuildTrans.tab':
          reader.onload = function(){

            let data = reader.result;
            data = d3.tsv.parse(data);
            Meteor.call('file.remove.conections');
            Meteor.call('file.add.conections',data);

          };

          break;

          case 'scenarios.csv':
          reader.onload = function(){

            let data = reader.result;
            data = d3.tsv.parse(data);
            Meteor.call('file.remove.scenarios');
            Meteor.call('file.add.scenarios',data);

          };

          break;

          case 'load_zones.tab':
          reader.onload = function(){

            let data = reader.result;
            data = d3.tsv.parse(data);
            Meteor.call('file.remove.loadZones');
            Meteor.call('file.add.loadZones',data);


          };

          break;



          default: console.log("lol")
        }

        done();


      }

    });
  }

  render() {
    return (
      <Row>
        <Col sm={12}>
          <PanelContainer>
            <Panel>
              <PanelBody>
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <h4>
                        Drop
                      </h4>
                      <Form action='/dropzone/file-upload'
                            className='dropzone'
                            id='my-awesome-dropzone'>
                      </Form>
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
