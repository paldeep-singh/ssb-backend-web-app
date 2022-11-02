import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import "./index.css";

export default function BasicTextFields() {
  return (
    <Grid xs={12} sx={{
      display: 'flex',
      justifyContent: 'center',
    }} >
    
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <TextField id="standard-basic" label="Email" variant="standard" />

    </Grid>
  );
}
ReactDOM.render( 
 <BasicTextFields />, 
  document.getElementById('root')
);