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
  const [error, setError] = useState(errorMessages)
  const [allBreeds, setAllBreeds] = useState([]);
  const [formSubmit, setformSubmit] = useState(false)
  
  const handleChange = (event) => {
    setDogBreed(event.target.value);
  };

  const fetchBreeds = async () => {
    try{
      const response = await (await fetch('http://localhost:5000/dogs/breeds')).json()
      setAllBreeds(response)
      }
    catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    fetchBreeds()
  }, []);
 

  const changeHandler = (e) => { 
    const types = ['image/png', 'image/jpeg'];
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      errorMessages.image=''
      setError(errorMessages)
      setformSubmit(true)
    } else {
      setFile(null);
      errorMessages.image = "*Please select an image file (png or jpeg)"
      setError(errorMessages)
      setformSubmit(false)
    }
  }

  const saveDog =  (errorMessages) => {  
    const form = new FormData();

    if (error.image || file == null) {
      errorMessages.image = "*Please select an image file (png or jpeg)"
      setError(errorMessages)
      setformSubmit(false)
    } else {
      errorMessages.image=''
      setError(errorMessages)      
      setformSubmit(true)
      form.append('photo', file, file.name)
    }

    form.append('username', props.usernameValue)

    if (email === '' || email == null) {
      errorMessages.email= "Please enter your email"
      setError(errorMessages)
      setformSubmit(false)
    } else {    
      errorMessages.email= ""
      setError(errorMessages)
      form.set('email', email)
      setformSubmit(true)
    }

    if (password === '' || password == null) {
      errorMessages.password= "Please enter your password"
      setError(errorMessages)
      setformSubmit(false)
    } else {    
      errorMessages.password = ''
      setError(errorMessages)
      form.set('password', password)
      setformSubmit(true)
    }

    if (dogName === '' || dogName == null) {
      errorMessages.dogName= "Please enter your name"
      setError(errorMessages)
      setformSubmit(false)
    } else {    
      errorMessages.dogName = ''
      setError(errorMessages)
      form.set('name', dogName)
      setformSubmit(true)
    }

    if (dogBreed === '' || dogBreed == null) {
      errorMessages.dogBreed= "Please enter your breed"
      setError(errorMessages)
      setformSubmit(false)
    } else {    
      errorMessages.dogBreed = ''
      setError(errorMessages)
      form.set('breed', dogBreed)
      setformSubmit(true)
    }

    if (dogDateOfBirth === '' || dogDateOfBirth == null) {
      errorMessages.dogDateOfBirth= "Please enter your DOB"
      setError(errorMessages)
      setformSubmit(false)
    } else {    
      errorMessages.dogDateOfBirth = ''
      setError(errorMessages)
      form.set('dateOfBirth', dogDateOfBirth)
      setformSubmit(true)
    }

    if(dogColour === '' || dogColour == null) {
        errorMessages.dogColour= "Please enter your fur colour"
        setError(errorMessages)
        setformSubmit(false)

    } else {    
      errorMessages.dogColour = ''
      setError(errorMessages)
      form.set('colour', dogColour)
      setformSubmit(true)
    }
    if( formSubmit) { 
      errorMessages.message =''
      setError(errorMessages)

      fetch('http://localhost:5000/signup/newdog', {
        method: 'POST',
        body: form,
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error))

    } else {
      errorMessages.message ='Please correct fields below'
      setError(errorMessages)
      console.log('errors')
      return
    }
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
                {error.message && <FormHelperText error>{error.message}</FormHelperText>}
                <Grid item xs={12} >
                  <TextField
                    error={error.email}
                    helperText={error.email && `${error.email}`}
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
                    error={error.password}
                    helperText={error.password && `${error.password}`}                  
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
                  {!error.image && <img style={{width:200}} src={file} /> }
                <Grid item xs={12} >
                  <div className={classes.output}>
                   { file && <FormHelperText > { file.name } </FormHelperText> }
                   { error.image && <FormHelperText error className={classes.error}> { error.image } </FormHelperText> }          
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
                    error={error.dogName}
                    helperText={error.dogName && `${error.dogName}`}
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
                  <InputLabel error={error.dogBreed} htmlFor="dogBreed">What breed are you..?</InputLabel>
                  <Select  
                    error={error.dogBreed}
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
                  { error.dogBreed && <FormHelperText error={error.dogBreed} className={classes.error}> { error.dogBreed } </FormHelperText> }          
               </FormControl>
                <Grid item xs={12}>
                  <TextField
                    error={error.dogDateOfBirth}
                    helperText={error.dogDateOfBirth && `${error.dogDateOfBirth}`}
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
                    error = {error.dogColour}
                    helperText={error.dogColour && `${error.dogColour}`}
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
                  onClick={ev => saveDog(errorMessages)}
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