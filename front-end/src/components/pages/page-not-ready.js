import { Grid, makeStyles, Typography, Paper } from '@material-ui/core'
import React, {useState} from 'react'
import Slider from '@material-ui/core/Slider';
import { Pets } from '@material-ui/icons';
import RandomDogImage from '../random-online-dog';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title:{
    fontSize: 50,
    display: 'flex',
    alignItems: 'center'
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
    <Grid container component={Paper} className={classes.root}>
      <Typography component='h1' className={classes.title} id="continuous-slider" gutterBottom>
      {details.page} Page Under Construction
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Pets color='primary' />
        </Grid>
        <Grid item xs>
          <Slider value={value} min={0} step={0.001} max={1} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <Pets />
        </Grid>
      </Grid>
        <RandomDogImage opacity={value} />     
    </Grid>
  )
}