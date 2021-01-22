import { CssBaseline, Grid } from '@material-ui/core'
import React from 'react'
import PageNotReady from './page-not-ready'

const page = 'Contact'
export function Contact() {
  return  (
    <Grid container justify='center' align='center'>    
      <CssBaseline/> 
      <PageNotReady page={page} />
    </Grid>
  )
}