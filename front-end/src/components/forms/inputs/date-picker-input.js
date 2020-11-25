import React from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider ,KeyboardDatePicker} from '@material-ui/pickers'
import {Grid} from '@material-ui/core'

export default function DatePickerInput(props) {
  return (
    <Grid item xs={12}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          invalidDateMessage='A Complete Date Is Required'
          required
          fullWidth
          disableFuture={true}
          inputVariant = "outlined"
          margin="normal"
          label={props.label}
          format="dd/mm/yyyy"
          value={props.value}
          onChange={props.handleChange}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  )
}