import React from 'react';
import {Pets} from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Message} from './default-message'
import {Spring} from 'react-spring/renderprops'
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8,4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    fontSize: 'fontSizeLarge'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Email(props) {
  const classes = useStyles();
  return (
    <Spring
    from = {{opacity: 0}}
    to = {{opacity: 1}}
    config= {{delay:1000}}
    >
      { transitions => (
        <Grid style={transitions} item component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Pets className={classes.avatar}/>
            <Typography component="h1" variant="h4">
              Log-in / Sign-up
            </Typography>
            <form className={classes.form} noValidate>
              <TextField   
                onKeyUp={props.emailValue}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Your humans email address"
                name="email"
              />
            </form>
            {props.emailCurrentValue < 1 ? (
              <Message />
              ) : (
              <div></div>
            )}
          </div>
        </Grid>
      )}
    </Spring>
  );
}