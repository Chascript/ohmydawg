import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react'
import {Message} from './default-message'



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8,4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Email(props) {
  const classes = useStyles();
  return (

    <Grid item component="main" maxWidth="xs">

     <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            
        </Avatar>
          <Typography component="h1" variant="h5">
            Dog Creation
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
        {props.currentValue < 1 ? (
          <Message />
        ) : (
          <div></div>
        )}
      
      </div>
    </Grid>


      
  
  );
}