import React from 'react'
import {Grid, TextField} from '@material-ui/core'

export default function DogName(props) {
  return(
    <Grid item xs={12}>
    <TextField
      error={props.dogNameValue.length < 1}
      helperText={props.dogNameValue.length < 1 &&  'name is required'}
      variant="outlined"
      type='text'
      required
      fullWidth
      id="dogName"
      label="What do your humans call you?"
      name="dogName"
      placeholder="Dogs Name"
      onChange= {props.handleChange}
    />
  </Grid>  
  )
  }