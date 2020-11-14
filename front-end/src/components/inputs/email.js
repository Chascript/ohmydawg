import React from 'react'
import {Grid, TextField} from '@material-ui/core'

export default function EmailInput(props) {

  return (
    <Grid item xs={12} >                                  
      <TextField
        name="email"
        variant="outlined"
        required
        fullWidth
        id="email"
        label="Your Humans Email Address"
        placeholder="example@domain.com"
        helperText = {props.emailErrors === 'empty' ? (
          'An email is required'
          ) : ( 
            props.emailErrors === 'invalid' ? (
            'email is not valid'
            ) : ( 
              props.emailErrors === 'exists' ? (
              `${props.emailValue} already exists`
              ) : ( 
                ''
              )
            )
          )     
        }
        error={props.emailErrors === 'empty' || props.emailErrors === 'invalid' || props.emailErrors === 'exists'}
        onChange={props.handleEmailInputChange}
      /> 
    </Grid>
  )
}