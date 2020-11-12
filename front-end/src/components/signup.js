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
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider ,KeyboardDatePicker} from '@material-ui/pickers'
import PreviewSelectedImage from './preview-selected-image';

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
  imageContainer:{
    display: 'flex',
    justifyContent: 'center',
  },
  imageNotChosen:{
      display: 'flex',
      justifyContent: 'center',
      height: 300,
      width: 200,
  },
  input:{
    display: 'none'
  }
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
    dogShortBio: '',
  }
 
  const [dogDateOfBirth, setDogDateOfBirth] = React.useState(new Date());
  const [file, setFile] = useState({selected: null, image:false})
  const [email, setEmail] = useState('')
  const [emailExists, setemailExist] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [password, setPassword] = useState(false)
  const [dogName, setDogName] = useState(false)
  const [dogBreed, setDogBreed] = useState(false)
  const [dogShortBio, setDogShortBio] = useState(null)
  const [error, setError] = useState(errorMessages)
  const [allBreeds, setAllBreeds] = useState([]);
  const [image, setImage] = useState(null)
  
  // fetch dog breeds for select input
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
 // email exist ?
  const emailExistsFunc = async () => {    
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    if (email.match(pattern)) {
      setEmailValid(true)
      console.log('email is valid')
    } else {
      setEmailValid(false)
      console.log('email is not valid')
    }
    
    if(emailValid){
      try {    
        const emailExistsResult = await (await fetch('http://localhost:5000/dogs/email/exist', {
          method: 'POST',
          body: JSON.stringify({ chosenEmail: email}),
          headers: {
            'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json"
          }  
        })).json() ;
        // retrieve the result (true or false)
        console.log(emailExistsResult) 
        //validate email
        if (emailExistsResult) {
          setemailExist(true);
          console.log('email is valid but already exists')
        } else {
          setemailExist(false);
          console.log('email is valid and dosent exist, accepted')
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }     
    };
  }

  // show file name on change
  const changeHandlerFileName = (e) => { 
    const types = ['image/png', 'image/jpeg'];
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile({selected, image:true});
      setImage(URL.createObjectURL(selected))
    } else {
      setFile({selected, image: false});
      setImage(null)
    }
  }

  //handle date change
  const handleDateChange = (date) => {
    setDogDateOfBirth(date)
    console.log(dogDateOfBirth)
  }
  // email exist? 
    useEffect(()=>{
      emailExistsFunc()
    },[email])
  



// on click of create dog
  const saveDog = async (errorMessages) => {   
    const form = new FormData();

    //set all error messages
    if (file.image === false) {
      errorMessages.image = "*Please select an image file (png or jpeg)"
      setError(errorMessages)
    } else {
      errorMessages.image=''
      setError(errorMessages)       
      form.append('photo', file.selected, file.selected.name)
    }

    form.append('username', props.usernameValue)


    
    if(email === '' || email == null) {
      errorMessages.email = 'Please enter an email'
      setError(errorMessages)
      console.log('error message email field is empty')
    } else if(!emailValid){
      errorMessages.email='email not valid'
      setError(errorMessages)
      console.log('setting error message to email is not valid')
    } else if(emailExists) {
      errorMessages.email = `${email} is already in use, please choose a different one`
      setError(errorMessages)
      console.log(emailExists)
      console.log('error message to email already in use')
    } else {
      errorMessages.email = ''
      setError(errorMessages)
      console.log(emailExists)
      form.set ('email',email)
      console.log('email accepted, is valid and dosent exist')
    }
    console.log(errorMessages)

    if (password === '' || password == null) {
      errorMessages.password= "Please enter your password"
      setError(errorMessages)
    } else {    
      errorMessages.password = ''
      setError(errorMessages)
      form.set('password', password)
    }

    if (dogName === '' || dogName == null) {
      errorMessages.dogName= "Please enter your name"
      setError(errorMessages)
    } else {    
      errorMessages.dogName = ''
      setError(errorMessages)
      form.set('name', dogName)
    }

    if (dogBreed === '' || dogBreed == null) {
      errorMessages.dogBreed= "Please enter your breed"
      setError(errorMessages)
    } else {    
      errorMessages.dogBreed = ''
      setError(errorMessages)
      form.set('breed', dogBreed)
    }

    // invalid date is incorrect. need to correct
    if (dogDateOfBirth === 'Invalid Date' || dogDateOfBirth == null) {
      errorMessages.dogDateOfBirth= "Please enter your DOB"
      setError(errorMessages)
    } else {    
      errorMessages.dogDateOfBirth = ''
      setError(errorMessages)
      form.set('dateOfBirth', dogDateOfBirth)
    }

    if (dogShortBio === '' || dogShortBio == null) {
        errorMessages.dogShortBio= "Please enter your fur colour"
        setError(errorMessages)

    } else {    
      errorMessages.dogShortBio = ''
      setError(errorMessages)
      form.set('shortDogBio', dogShortBio)
    }

    const allErrors = Object.values(errorMessages)
    const hasErrors = allErrors.some((errMessages) => {
      return errMessages.length > 0
    })
    if(hasErrors){
      console.log(`${Object.values(errorMessages)} => form not submitted`)
    } else {       
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
                    helperText = {error.email && `${error.email}`}
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Your Humans Email Address"
                    placeholder="example@domain.com"
                    onChange={ e => setEmail(e.target.value)}   
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
                <Grid className={classes.imageContainer} item xs = {12}>
                  {image == null ?(
                    <img className={classes.imageNotChosen} src={require('./dog-not-chosen-default.png')} alt="image-not-chosen"/>
                    ):(
                      <PreviewSelectedImage selectedImage={image} />
                      )}
                  </Grid>
                  <Grid item xs={12} >
                  <div className={classes.output}>
                   { file.image && <FormHelperText > { file.selected.name } </FormHelperText> }
                   { error.image && <FormHelperText error className={classes.error}> { error.image } </FormHelperText> }                         
                  </div>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={changeHandlerFileName}
                  />
                  <label htmlFor="contained-button-file">
                    <Button fullWidth variant="contained" color="primary" component="span">
                      Upload a photo of yourself
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={dogName.length === 0}
                    helperText={dogName.length === 0 && 'name is required'}
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
                  <InputLabel error={dogBreed.length === 0} htmlFor="dogBreed">What breed are you..?</InputLabel>
                  <Select  
                    error={dogBreed.length === 0}
                    native
                    value={allBreeds.breed}
                    onChange={e => setDogBreed(e.target.value)}
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
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      required
                      inputVariant = "outlined"
                      margin="normal"
                      id="date-picker-dialog"
                      label="When were you born? (DD/MM/YYYY)"
                      format="dd/mm/yyyy"
                      value={dogDateOfBirth}
                      onChange={handleDateChange}
                      />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="dog-short-bio"
                    label="Short Bio About Yourself"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    placeholder="A bit about you!"
                    onKeyDown= {e => setDogShortBio(e.target.value)}
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