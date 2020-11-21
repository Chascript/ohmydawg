import React from 'react'
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core'

export default function CheckBox(props) {

  return(
    <Grid item xs={12}>
      <FormControlLabel
        control={<Checkbox value={props.value} color="primary" />}
        label={props.label}
        onChange={props.handleChange}
      />
    </Grid>
  )
}