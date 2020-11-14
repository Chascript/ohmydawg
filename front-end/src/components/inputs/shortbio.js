import React from 'react'
import {Grid, TextField} from '@material-ui/core'

export default function ShortBioInput(props) {

  return (
    <Grid item xs={12}>
    <TextField
      id="dog-short-bio"
      label="Short Bio About Yourself"
      multiline
      rows={4}
      variant="outlined"
      fullWidth
      placeholder="A bit about you!"
      onChange={props.handleChange}
    />
  </Grid>

  )
}