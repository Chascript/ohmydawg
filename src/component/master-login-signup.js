import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'
import SignInSide from './sign-in-side';
import Image from './image';
import Email from './email-input'
import {useState} from 'react'
import SignUp from './signup';
import SignIn from './sign-in-component';
import Paper from '@material-ui/core/Paper'



const useStyles = makeStyles((theme) => ({
 container: {
  direction: 'row',
 },
}));


export default function MasterLoginSignup() {
  const classes = useStyles()
    return (
      <Grid container component='main' className={classes.container}>
        <SignInSide />
        <Image />
      </Grid>
    )
}
