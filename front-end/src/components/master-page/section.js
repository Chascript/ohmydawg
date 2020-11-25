import React from 'react'
import { Route } from 'react-router-dom'
import {Home} from './../pages/home'
import {Gallery} from './../pages/gallery'
import {Profile} from './../pages/profile'
import {Contact} from './../pages/contact'
import {Story} from './../pages/story'

import { Grid } from '@material-ui/core'
import Signup from './../pages/sign-up'

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