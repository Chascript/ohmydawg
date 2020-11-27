import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LongMenu from './menu'
import {Switch, Grid, Hidden} from '@material-ui/core'
import {FormControlLabel} from '@material-ui/core'
import Login from './../forms/log-in';

const useStyles = makeStyles((theme) => ({
  appBar:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  switch:{
    display:'flex',
  },
  login:{
    display: 'flex',
    justifyContent: 'flex-end'
  },
  formControlLabel:{
    fontSize: 16
  }
}));

export default function DenseAppBar(props) {
  const classes = useStyles();

  return (
      <AppBar className={classes.appBar} >
        <Toolbar > 
          <Grid container alignItems='center'  >
            <Grid item xs={3} sm={3} >
              <LongMenu />
            </Grid>     
          <Grid item xs={9} sm={6} >
            <Typography variant="h6" color="inherit">
              Oh My Dawg
            </Typography>
          </Grid>  
          <Hidden xsDown>   
            <Grid item sm={3} >
              <FormControlLabel
                className={classes.switch}
                control={<Switch onChange={props.onChange} />}
                label={<Typography className={classes.formControlLabel}>Dark</Typography>}
                labelPlacement="bottom"
              />
            </Grid>
          </Hidden>
        </Grid>     
        </Toolbar>
        <Hidden xsDown> 
        <Grid container alignItems='center'  justify='flex-end'>
          <Grid item className={classes.login} >
            <Login />
          </Grid> 
        </Grid>  
        </Hidden>
      </AppBar>
  );
}
