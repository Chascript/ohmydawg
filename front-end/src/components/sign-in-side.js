import React, { useState, useEffect } from "react";import Grid from '@material-ui/core/Grid'
import Email from './email-input'
import SignUp from './signup';
import SignIn from './sign-in-component';
import Paper from '@material-ui/core/Paper'
import { Message } from '@material-ui/icons';
import Image from './image';
import { makeStyles } from '@material-ui/core/styles';


const accounts = {
  name: 'Manson',
  breed: 'Poodle',
  email: 'manson@gmail.com',
  profilePhoto: require('./manson.jpg'),
};

const useStyles = makeStyles((theme) => ({
  container:{
  }

}))
export default function SignInSide() {
  const classes= useStyles()
  const [hasError, setErrors] = useState(false);
  const [emailValue, setEmailValue] = useState('')
  const [newUser, setNewUser] = useState(false)

  
  useEffect(()  =>  {
     try {
      fetch('http://localhost:5000/accounts/details/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({value: emailValue}),
     })
     .then(res => res.json())
     .then(res=>console.log(res))
    }
      catch(error) {
      return error
      }
  })


 
    


  return ( 
    <Grid container component='main'  className={classes.container} >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Email emailValue = {e => setEmailValue(e.target.value)} emailCurrentValue={emailValue}  /> 
        {emailValue === '' ?(
          <Message />
          ) : (
          newUser ? (
            <SignIn emailValue={emailValue}  name={accounts.name} />
            ) : (
            <SignUp /> 
          )  
        )}  
      </Grid>
      <Image emailCurrentValue={emailValue} email={accounts.email} profileImage={accounts.profilePhoto} />
    </Grid>
  )
}
