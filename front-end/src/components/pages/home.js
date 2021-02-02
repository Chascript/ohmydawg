import React from 'react'
import { Grid, CssBaseline, Typography } from '@material-ui/core'
import { HomeContent } from '../home-content'

export function Home() {
  return  (
    <Grid container >    
      <CssBaseline/> 
      <HomeContent />
   <Typography variant='caption' >
     For more information checkout my github repo located in the footer
   </Typography>
    </Grid>
  )
}