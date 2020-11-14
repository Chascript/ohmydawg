import React from 'react'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider ,KeyboardDatePicker} from '@material-ui/pickers'
import {Grid} from '@material-ui/core'


export default function DateOfBirthInput(props) {

  return (
    <Grid item xs={12}>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        // error={dogDatOfBirth.length === 0}
        // helperText= {dogDateOfBirth.length === 0 && 'Date Of Birth Is Required'}
        fullWidth
        required
        inputVariant = "outlined"
        margin="normal"
        id="date-picker-dialog"
        label="When were you born? (DD/MM/ YYYY)"
        format="dd/mm/yyyy"
        value={props.date}
        onChange={props.dobChange}
        />
    </MuiPickersUtilsProvider>
  </Grid>

  )
}