import React from 'react'
import { Route } from 'react-router-dom'
import {Home} from './test'
import {Gallery} from './test2'
import SignInSide from './sign-in-side'
import {Profile} from './test4'
import {Contact} from './test5'
import {Story} from './test6'
import { Grid } from '@material-ui/core'


export function Section() {
  return(
    <Grid>
      <Route path="/" component={Home} exact/>
      <Route path="/gallery" component={Gallery} exact />
      <Route path="/loginsignup" component={SignInSide} exact/>
      <Route path="/profile" component={Profile} exact />
      <Route path="/contact" component={Contact} exact/>
      <Route path="/story" component={Story} exact/>
    </Grid> 
  )
}