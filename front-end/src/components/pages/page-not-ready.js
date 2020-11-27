import { Grid, makeStyles, Typography, Paper } from '@material-ui/core'
import React, {useState} from 'react'
import Slider from '@material-ui/core/Slider';
import { Pets } from '@material-ui/icons';
import RandomDogImage from '../random-online-dog';

const useStyles = makeStyles({
  title:{
    fontSize: 50,
  },
  dogImage:{
    display: 'flex',
    alignItems: 'center'
  }
});

export default function PageNotReady(props) {
  const classes = useStyles();
  const details = props
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container component={Paper} justify='center' alignItems='center' >
      <Typography component='h1' className={classes.title} id="continuous-slider" gutterBottom>
      {details.page} Page Under Construction
      </Typography>
      <Grid container justify='center' spacing={2}>
        <Grid item xs={1} sm={1}>
          <Pets color='primary' />
        </Grid>
        <Grid item xs={10} sm={10}>
          <Slider value={value} min={0} step={0.001} max={1} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item xs={1} sm={1}>
          <Pets />
        </Grid>
        <Grid item sx={12} sm={12} >
       <RandomDogImage opacity={value} />     
        </Grid>
      </Grid>
    </Grid>
  )
}