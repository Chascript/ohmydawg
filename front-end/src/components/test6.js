import React from 'react'
import {Grid, CssBaseline} from '@material-ui/core'
import PageNotReady from './page-not-ready'
const page = 'Story'
export function Story() {
  return  (
    <Grid>    
      <CssBaseline/> 
      <PageNotReady page={page}/>
    </Grid>
  )
}