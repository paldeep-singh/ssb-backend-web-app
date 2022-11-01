import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function BasicTextFields() {
  return (
    <Grid xs={12} sx={{
      display: 'flex',
      justifyContent: 'center',
    }} >
      <TextField id="standard-basic" label="Email" variant="standard" />

    </Grid>
  );
}
ReactDOM.render( 
 <BasicTextFields />, 
  document.getElementById('root')
);