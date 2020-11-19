import React from 'react'
import { Route } from 'react-router-dom'
import {Home} from './test'
import {Gallery} from './test2'
import {Profile} from './test4'
import {Contact} from './test5'
import {Story} from './test6'

import { Grid } from '@material-ui/core'
import Signup from './forms/sign-up'
import DogForm from './forms/dog-form'


export function Section() {
  return(
    <Grid>
      <Route path="/" component={Home} exact/>
      <Route path="/gallery" component={Gallery} exact />
      <Route path="/signup" component={Signup} exact/>
      <Route path="/profile" component={Profile} exact />
      <Route path="/contact" component={Contact} exact/>
      <Route path="/story" component={Story} exact/>
    </Grid> 
  )
}