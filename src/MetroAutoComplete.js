import React from 'react';

import { Autocomplete,TextField } from '@mui/material';


const stationsMetro=require("./metroExtract.json");


class MetroAutoComplete extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      stationsMetro:stationsMetro,
      choosenMetro:{}
    };
  }

 
    render() {
      const stationsMetro=this.state.stationsMetro;
      return (
        <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={stationsMetro}
        sx={{ width: '100%' }}
        onChange={(event,newValue)=>{
          this.state.choosenMetro=newValue;
        }}
        renderInput={(params) => <TextField {...params} label="Station de métro" />}
      />
      
      );
    }

    onChange(event, newValue)
    {
      
    }
    
  }

export default MetroAutoComplete;