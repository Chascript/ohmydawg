import React from 'react'
import { FormHelperText, InputLabel, Grid, FormControl, Select, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=> ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))


export default function SelectBoxInput(props) {
  const classes = useStyles();
  return (
    <FormControl sm={6} required fullWidth variant="outlined" className={classes.formControl}>
      <InputLabel error={props.value.length < 1} htmlFor={props.id}> {props.label}</InputLabel>
      <Select  
        id={props.id}
        error={props.value.length < 1}
        native
        onChange={props.handleChange}
        label={props.label}
        name= {props.name}
        value={props.optionValue.breed}
        fullWidth={true}
      >
        <option aria-label="None" value=''></option>
        {props.optionValue.map(optionValue => 
          <option value={optionValue}>{optionValue}</option>
        )}
      </Select>
      { props.value.length < 1 && <FormHelperText error > {props.errorMessage} </FormHelperText> }          
    </FormControl>
  )
}