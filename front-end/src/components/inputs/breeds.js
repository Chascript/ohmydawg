import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=> ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

}))

export default function BreedsInput(props) {
const classes = useStyles();
  return (
    <FormControl required fullWidth variant="outlined" className={classes.formControl}>
      <InputLabel error={props.dogBreedErrors} htmlFor="dogBreed">What breed are you..?</InputLabel>
      <Select  
        error={props.dogBreedErrors}
        native
        value={props.options.breed}
        onChange={props.handleInputChange}
        label="What breed are you..?"
        name= 'dogBreed'
      >
        <option aria-label="None" value={null}></option>
        {props.options.map(allBreeds => 
          <option value={allBreeds}>{allBreeds}</option>
        )}
      </Select>
    { props.dogBreedErrors && <FormHelperText error > Dog Breed Is Required </FormHelperText> }          
 </FormControl>

  )
}