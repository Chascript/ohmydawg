import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LongMenu from './menu'
import {Switch} from '@material-ui/core'
import {FormControlLabel} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  switch:{
    justifySelf: "flex-end" // not working ??
  }
}));

export default function DenseAppBar(props) {
  const classes = useStyles();

  return (
        <div  className={classes.root}>
          <AppBar position="static">
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
          </AppBar>
        </div>
  );
}
