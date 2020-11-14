import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Spring} from 'react-spring/renderprops'
import { FormHelperText } from '@material-ui/core';

import PreviewSelectedImage from './preview-selected-image';
import DogName from './inputs/dognamei';
import PasswordInput from './inputs/password';
import BreedsInput from './inputs/breeds';
import DateOfBirthInput from './inputs/dob';
import ShortBioInput from './inputs/shortbio';
import EmailInput from './inputs/email';

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
 
  const [dogDateOfBirth, setDogDateOfBirth] = React.useState(new Date());
  const [allBreeds, setAllBreeds] = useState([]);
  const [image, setPreviewImage] = useState(null)
  const [errorEmptyFields, setErrorEmptyFields] = useState(false)

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    dogName: null,
    dogBreed: false,
    file: null,
    dateOfBirth: null
  })

  const [userForm, setUserForm] = useState({
    email: false,
    password: false,
    dogName: false,
    dogBreed: false,
    shortBio: false,
    file: false,
  })
  
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

  // handles input change
  const emailInputChangeHandler = async event =>{
    const target = event.target
    const emailValue = target.value

    if( emailValue < 1 ) {
      setErrors({...errors, email: 'empty'})
    } else {
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
      if (emailValue.match(pattern)) {
        try {    
          const emailExistsResult = await (await fetch('http://localhost:5000/dogs/email/exist', {
            method: 'POST',
            body: JSON.stringify({ chosenEmail: emailValue}),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              "Content-Type": "application/json"
            }  
          })).json() ;
          // retrieve the result (true or false)
          console.log(`results exists ${emailExistsResult}`) 
          
          if (emailExistsResult) {
            setErrors({...errors, email: 'exists'});
          } else {
            setErrors({...errors, email: false})
            setUserForm({...userForm, email: emailValue})
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }     
      } else {
        setErrors({...errors, email: 'invalid'})
      }
    }
  }

  const fileSelect = (e) => { 
    const types = ['image/png', 'image/jpeg'];
    let selected = e.target.files[0];
    console.log(selected)
    
    if (selected && types.includes(selected.type)) {
      setUserForm({...userForm, file:selected})
      setPreviewImage(URL.createObjectURL(selected))
      setErrors({...errors, file: false})
    } else {
      setUserForm({...userForm, file:selected});
      setPreviewImage(null)
      setErrors({...errors, file: true})
    }
  }

  // handles change for non complex inputs
  const handleChange = event =>{
    const target = event.target
    const value = target.value
    const inputName = target.name
    setUserForm({...userForm, [inputName]: value})

    if(value < 1 || !value) {
      setErrors({...errors, [inputName]: true})
    } else{
      setErrors({...errors, [inputName]: false})
    }
  }

  //handle date change
  const handleDateChange = (date) => {
    setDogDateOfBirth(date)
    console.log(dogDateOfBirth)
  }

// on click of create dog
  const saveDog = async () => {   
    setErrorEmptyFields(false)
    const form = new FormData();

    const allErrors = Object.values(errors)
    const hasErrors = allErrors.some((errMessages) => {
      return errMessages === true
    })   
    const nullErrors = allErrors.some((errMessages) => {
      return errMessages == null
    })
    console.log(errors)

    if (nullErrors || hasErrors) {
      console.log(`${Object.values(errors)} => form not submitted`)
      setErrorEmptyFields(true)
    } else {
      form.append('username', props.usernameValue)
      form.append('photo', userForm.file, userForm.file.name)
      form.set('email', userForm.email)
      form.set('password', userForm.password)
      form.set('dogBreed', userForm.dogBreed)
      form.set('dogDateOfBirth', userForm.dogDateOfBirth)
      form.set('dogPunchLine', userForm.dogPunchLine)

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
                {errorEmptyFields && <Typography color='error'>Please fill in required fields*</Typography> } 
                <EmailInput handleEmailInputChange={emailInputChangeHandler} emailErrors={errors.email} emailValue={userForm.email} />
                <PasswordInput handleChange={e => setUserForm({...userForm, password: e.target.value})} passwordValue={userForm.password} />

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
                   { userForm.file && <FormHelperText > { userForm.file.name } </FormHelperText> }
                   { errors.file && <FormHelperText error > Please Select a jpeg or png file </FormHelperText> }                       
                  </div>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={fileSelect}
                  />
                  <label htmlFor="contained-button-file">
                    <Button fullWidth variant="contained" color="primary" component="span">
                      Upload a photo of yourself
                    </Button>
                  </label>
                </Grid>
                <DogName handleChange={e => setUserForm({...userForm, dogName: e.target.value})} dogNameValue={userForm.dogName}/>
                <ShortBioInput handleChange={e => setUserForm({...userForm, shortBio: e.target.value})} shortBioValue={userForm.shortBio} />
                <BreedsInput handleInputChange={handleChange} dogBreedErrors={errors.dogBreed} options={allBreeds} dogBreedValue={userForm.dogBreed} />
                <DateOfBirthInput handleInputChange={handleChange} dateOfBirthErrors={errors.dateOfBirth} dobChange={handleDateChange} date={dogDateOfBirth} />
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
                  onClick={ev => saveDog()}
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