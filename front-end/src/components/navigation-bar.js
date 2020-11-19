import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LongMenu from './menu'
import {Switch, Grid} from '@material-ui/core'
import {FormControlLabel} from '@material-ui/core'
import Login from './forms/log-in';

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
  }
}));

export default function DenseAppBar(props) {
  const classes = useStyles();

  return (
    <Grid container flexGrow={1} >
      <AppBar className={classes.appBar} position='fixed'>
        <Toolbar variant="dense">      
          <LongMenu />
          <Typography variant="h6" color="inherit">
            Oh My Dawg
          </Typography>
          <FormControlLabel
            className={classes.switch}
            control={<Switch onChange={props.onChange} />}
            label="Dark-Mode?"
            labelPlacement="bottom"
          />
        </Toolbar>
        <Grid item className={classes.login} >
        <Login />
        </Grid>
      </AppBar>
    </Grid>
  );
}
