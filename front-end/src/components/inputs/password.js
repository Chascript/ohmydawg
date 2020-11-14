import React from 'react'
import {Grid, TextField} from '@material-ui/core'

export default function PasswordInput(props) {

  return (
    <Grid item xs={12}>
    <TextField
      name="password"
      label="Password to get into your account"
      type="password"
      id="password"
      placeholder="******"
      variant="outlined"
      required
      fullWidth
      error={props.passwordValue.length < 1}
      helperText={props.passwordValue.length < 1 && 'Password is required'}
      onChange= {props.handleChange}
    />
  </Grid>
  )
}