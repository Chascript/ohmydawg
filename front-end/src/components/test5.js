import { CssBaseline, Grid } from '@material-ui/core'
import React from 'react'
import PageNotReady from './page-not-ready'

const page = 'Contact'
export function Contact() {
  return  (
    <Grid>    
      <CssBaseline/> 
      <PageNotReady page={page} />
    </Grid>
  )
}