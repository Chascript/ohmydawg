import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Spring} from 'react-spring/renderprops'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  subHeaders: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5
  },
  message:{
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5,
    fontSize: 15
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



export default function SignUp(props) {
  const classes = useStyles();
   const errors = {
      email: false,
      password: false,
      image: false,
      dogName: false,
      dogBreed: false,
      dogDateOfBirth: false,
      dogColour: false,
      message: false,
    }

   
    const errorMessages = {
      email: '',
      password: '',
      image: '',
      dogName: '',
      dogBreed: '',
      dogDateOfBirth: '',
      dogColour: '',
      message: '',
    }
 
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [dogName, setDogName] = useState(null)
  const [dogBreed, setDogBreed] = useState(null)
  const [dogDateOfBirth, setDateOfBirth] = useState(null)
  const [dogColour, setColour] = useState(null)
  const [errorstate, setError] = useState(errors)
  const [mess, setMess] = useState(errorMessages)
  const [allBreeds, setAllBreeds] = useState([]);
  
  const handleChange = (event) => {
    setDogBreed(event.target.value);
  };

 const fetchBreeds = async () => {
  await fetch('http://localhost:5000/dogs/breeds')
   .then(res => res.json())
   .then(breeds => setAllBreeds(breeds))
   .catch(error => console.error(error))
  }

 useEffect(() => {
   fetchBreeds()
 }, []);
 

  const changeHandler = (e) => { 
    const types = ['image/png', 'image/jpeg'];
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      errors.image=false
      errorMessages.image=''
    } else {
      setFile(null);
      errors.image = true
      errorMessages.image = "*Please select an image file (png or jpeg)"
    }
  }

 useEffect(()=>{

    },[errorstate])



  const saveDog =  (errors, errorMessages) => {  
    const form = new FormData();
    if(!errors.image) {
      form.append('photo', file, file.name)
    }

    form.append('username', props.usernameValue)

    if(email === '' || email == null) {
      errorMessages.email= "Please enter your email"
      errors.email = true
      setError(errors)
      setMess(errorMessages)
      console.log(mess)

    } else {    
      errors.email=false
      errorMessages.email= ""
      setError(errors)
      setMess(errorMessages)
      console.log(mess)

      form.set('email', email)
    }

    if(password === '' || password == null) {
      errors.password = true
      errorMessages.password= "Please enter your password"
    } else {    
    errors.password = false
    errorMessages.password = ''
    form.set('password', password)
    }

    if(dogName === '' || dogName == null) {
      errors.dogName = true
      errorMessages.dogName= "Please enter your name"
    } else {    
    errors.dogName = false
    errorMessages.dogName = ''
    form.set('name', dogName)
    }

    if(dogBreed === '' || dogBreed == null) {
      errors.dogBreed = true
      errorMessages.dogBreed= "Please enter your breed"
    } else {    
    errors.dogBreed = false
    errorMessages.dogBreed = ''
    form.set('breed', dogBreed)
    }

    if(dogDateOfBirth === '' || dogDateOfBirth == null) {
      errors.dogDateOfBirth = true
      errorMessages.dogDateOfBirth= "Please enter your DOB"
    } else {    
    errors.dogDateOfBirth = false
    errorMessages.dogDateOfBirth = ''
    form.set('dateOfBirth', dogDateOfBirth)
    }

    if(dogColour === '' || dogColour == null) {
      errors.dogColour = true
      errorMessages.dogColour= "Please enter your name"
    } else {    
    errors.dogColour = false
    errorMessages.dogColour = ''
    form.set('colour', dogColour)
    }

    if( errors.dogName || errors.dogBreed || errors.dogColour || errors.dogDateOfBirth || errors.email || errors.image || errors.password ) {
      errorMessages.message ='Please correct fields below'
      errors.message = true
      console.log(errorMessages)
      console.log(errors)
      console.log(errorstate)
      return
    } else {
      errorMessages.message =''
      errors.message = false
    }
    
    
/*
      fetch('http://localhost:5000/signup/newdog', {
        method: 'POST',
        body: form,
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
        })
    .catch(error => console.log(error))
    }
  */
  }

  return (
    <Spring
    from = {{opacity: 0, marginTop:-500}}
    to = {{opacity: 1, marginTop: 0}}
    config= {{delay:500}}
    >
      { transition => (
        <Grid style={transition} component="main" maxwidth="xs">
          <CssBaseline />
          <Box  m={4}>
            <Typography className={classes.subHeaders} component="h2" variant="h4">
                Dog Creation
            </Typography>
            <Typography className={classes.message} component="p"  >
              Welcome, to begin creating your account please fill in your details below
              (If you already have an account please provide the username associated with your account)
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <Typography className={classes.subHeaders}  component="h2" variant="h5">Account Details</Typography>
                </Grid>
                {errors.message && <FormHelperText error>{mess.message}</FormHelperText>}
                <Grid item xs={12} >
                  <TextField
                    helperText={errorstate.email && `${mess.email}`}
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Your Humans Email Address"
                    placeholder="example@domain.com"
                    onKeyUp = {e => setEmail(e.target.value)}
                  /> 
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.password && `${errorMessages.password}`}                  
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password to get into your account"
                    type="password"
                    id="password"
                    placeholder="******"
                    onKeyUp = {e => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Typography className={classes.subHeaders} component="h2" variant="h5" >Dog Details</Typography>
                  <Typography className={classes.message}>(You can more dogs to your pack once you have created your first dog)</Typography>
                </Grid>
                <Grid item xs={12} >
                  <div className={classes.output}>
                   { file && <FormHelperText > { file.name } </FormHelperText> }
                   { errors.image && <FormHelperText error className={classes.error}> { errorMessages.image } </FormHelperText> }          
                  </div>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={changeHandler}
                  />
                  <label htmlFor="contained-button-file">
                    <Button fullWidth variant="contained" color="primary" component="span">
                      Upload a photo of yourself
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.dogName && `${errorMessages.dogName}`}
                    variant="outlined"
                    required
                    fullWidth
                    id="dogName"
                    label="What do your humans call you?"
                    name="dogName"
                    placeholder="Dogs Name"
                    onKeyUp = {e => setDogName(e.target.value)}
                  />
                </Grid>  
                <FormControl required fullWidth variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="dogBreed">What breed are you..?</InputLabel>
                  <Select  
                    native
                    value={allBreeds.breed}
                    onChange={handleChange}
                    label="What breed are you..?"
                    inputProps={{
                      id: 'dogBreed',
                    }}
                  >
                    <option aria-label="None" value=""></option>
                    {allBreeds.map(allBreeds => 
                      <option value={allBreeds}>{allBreeds}</option>
                    )}
                  </Select>
                  { errors.dogBreed && <FormHelperText error className={classes.error}> { errors.dogBreed } </FormHelperText> }          
               </FormControl>
                <Grid item xs={12}>
                  <TextField
                    helperText={errors.dogDateOfBirth && `${errorMessages.dogDateOfBirth}`}
                    variant="outlined"
                    required
                    fullWidth
                    id="dateOfBirth"
                    label="What date were you born?"
                    name="dateOfBirth"
                    placeholder= "dd/mm/yyyy"
                    onKeyUp = {e => setDateOfBirth(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error = {errors.dogColour}
                    helperText={errors.dogColour && `${errorMessages.dogColour}`}
                    variant="outlined"
                    required
                    fullWidth
                    id="colour"
                    label="What colour do you think you are?"
                    name="colour"
                    placeholder="Dogs Fur Colour"
                    onKeyUp = {e => setColour(e.target.value)}
                  />
                </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowToBeEmailed" color="primary" />}
                      label="By providing email address I allow ohmydawg to contact me. (We dont do this often at all)"
                    />
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={ev => saveDog(errors,errorMessages)}
                >
                  Create Dog!
                </Button>
            </form>
          </Box>
        </Grid>
      )}
    </Spring>
  );
}