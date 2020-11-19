import React, { useState } from 'react';
import {makeStyles, Grid, Box, Typography, CssBaseline} from '@material-ui/core'
import {Spring} from 'react-spring/renderprops'
// Components
import AccountForm from './forms/account-form';
import DogForm from './forms/dog-form'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  subHeaders: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5
  },
  message:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5,
    fontSize: 15
  }
}));



export default function SignUp(props) {
  const classes = useStyles();
  const [accountForm, setAccountForm] = useState(true)
  const [dogForm, setRenderDogForm] = useState(false)
  
const renderDogForm =()=>{
  setRenderDogForm(true)
  setAccountForm(false)
}
  return (
    
    <Spring
    from = {{opacity: 0, marginTop:-500}}
    to = {{opacity: 1, marginTop: 0}}
    config= {{delay:500}}
    >
      { transition => (
        <Grid style={transition} component="main" maxwidth="xs">
          <CssBaseline />
            <Box  m={4}>
              <Typography className={classes.subHeaders} component="h2" variant="h4">
                Account Details
              </Typography>
              <Typography className={classes.message} component="p"  >
                Welcome! Please ensure you are happy with your chosen Username as you currently
                are not able to change this. To begin creating your account please fill in your details below.
                (If you already have an account please provide the username associated with your account, you will then be prompted to login)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <Typography className={classes.subHeaders}  component="h2" variant="h5">Account Details</Typography>
                  <AccountForm usernameValue={props.usernameValue} handleClick={renderDogForm} />
                </Grid>
                <Grid item xs={12} >
                </Grid>
              </Grid>
          </Box>
          {dogForm && 
            <Box component='div' m={4} >
              <Typography className={classes.subHeaders} component="h2" variant="h5" >Dog Details</Typography>
              <Typography className={classes.message}>(You can more dogs to your pack once you have created your first dog)</Typography>
              <DogForm usernameValue={props.usernameValue} />
            </Box>
          }
        </Grid>
      )}        
    </Spring>
  );
}