import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

export default function BasicTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch', },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Email" variant="standard" />
    </Box>
  );
}
ReactDOM.render( 
 <BasicTextFields />, 
  document.getElementById('root')
);