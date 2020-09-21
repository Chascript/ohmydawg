import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import Image from './image';
import Email from './email-input'
import {useState} from 'react'
import SignUp from './signup';
import SignIn from './sign-in-component';
import Paper from '@material-ui/core/Paper'
import { Message } from '@material-ui/icons';
import {Spring} from 'react-spring/renderprops'

const accounts = {
  name: 'Manson',
  breed: 'Poodle',
  email: 'manson@gmail.com'
};





export default function SignInSide() {
  const [emailValue, setEmailValue] = useState('')
    return (      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

        <Email emailValue ={e => setEmailValue(e.target.value)} currentValue={emailValue} /> 
        {emailValue.length < 1 ?(
            <Message />
             ) : (
              emailValue === accounts.email ? (
                <SignIn name={accounts.name} />
                ) : (
                <SignUp /> 
              )  
              )}  
      </Grid>
    )
}
