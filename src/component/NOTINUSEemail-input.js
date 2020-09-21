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
    margin: theme.spacing(8, 4),
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
  const [emailValue, setEmailValue] = useState('')
  React.useEffect(() => {
    if (emailValue < 1) {
      props.onKeyUp(emailValue)
    }
  })

  return (

    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

     <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            
          </Avatar>
          <Typography component="h1" variant="h5">
            Dog Creation
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
                
              onKeyUp={e => setEmailValue(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Your humans email address"
                name="email"
                />
          </form>
          <div>      
              {emailValue.length < 1? (
                <div><Message /></div>
                ) : (
                <div> </div>
              )}
            </div>
            </div>
    </Grid>


      
  
  );
}