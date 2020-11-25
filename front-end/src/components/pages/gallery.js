import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import Dogs from '../dogs'

export function Gallery() {
  return  (
    <Grid>    
      <CssBaseline/> 
      <Dogs />
    </Grid>
  )
}