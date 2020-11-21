import React from 'react'
import {TextField} from '@material-ui/core'

export default function TextBox(props){

  return(
  <TextField
    label={props.label}
    id={props.id}
    variant="outlined"
    fullWidth
    placeholder={props.placeholder}
    required={props.required}
    error={props.errorFunc}
    helperText={props.errorFunc &&  `${props.errorMessage}`}
    type={props.type}
    onChange= {props.handleChange}
  />
  )
}