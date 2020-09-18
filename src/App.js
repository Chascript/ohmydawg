import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { SignInSignUp } from './components/signin-signup/main';
import { Spring } from 'react-spring/renderprops'



const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}))

function App() {
  const classes = useStyles();

  return (
 
    <Grid container component="main" className={classes.root}>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <SignInSignUp />     
      </Grid>        <Spring
    from={{opacity:0, marginTop:-500}}
    to={{opacity:1, marginTop:0}}
    config={{delay:500}}
    > 
    {props => (
    <Grid style={props} item xs={false} sm={4} md={7} className={classes.image} />
    )}
    </Spring>  
    </Grid>
  );
}

export default App;
