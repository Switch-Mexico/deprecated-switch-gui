import React from 'react';


export default class TableRows extends React.Component {

  render() {

    if (!this.props.transmission){
      return(<div>Loading...</div>);
    }

    function firstToUpperCase( str ) {
      return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

    function writeRow( row, index ) {

      let lzs = row['TRANS_BUILD_YEARS_1'].split("-");

      let lz1 = firstToUpperCase( lzs[1]);
      let lz2 = firstToUpperCase( lzs[3]);

      let period = row['TRANS_BUILD_YEARS_2'];

      let mw = Number(row['BuildTrans']);
      mw = mw.toFixed(2)

      return (


        <tr key={index+1}>
          <td>{index+1}</td>
          <td>{lz1}</td>
          <td>{lz2}</td>
          <td>{period}</td>
          <td>{mw}</td>
        </tr>


      );

    }


    let data = this.props.transmission

    let rows = data.map((row , index)=>{
      console.log(row)
      if (!(this.props.period == "All New")){

        if (row['TRANS_BUILD_YEARS_2'] == this.props.period){ return writeRow(row, index);}

      } else{ return writeRow(row, index);}

    });

    return (
      <tbody>

          {rows}

      </tbody>
    );
  }
}
