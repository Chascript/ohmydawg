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
 
  const [dogDateOfBirth, setDogDateOfBirth] = React.useState(new Date());
  const [allBreeds, setAllBreeds] = useState([]);
  const [image, setPreviewImage] = useState(null)
  const [errorEmptyFields, setErrorEmptyFields] = useState(false)

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    dogName: null,
    dogBreed: null,
    file: null,
  })

  const [userForm, setUserForm] = useState({
    email: false,
    password: false,
    dogName: '(Dogs Name)',
    dogBreed: '(Dogs Breed)',
    shortBio: ``,
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


  const checkEmailInput = async (e) => {    
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    const chosenEmail = e.target.value
    let valid = false
    if (chosenEmail.match(pattern)) {
      valid = true
      try {    
        const emailExistsResult = await (await fetch('http://localhost:5000/dogs/email/exist', {
          method: 'POST',
          body: JSON.stringify({ chosenEmail: chosenEmail}),
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
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }     
    } else {
      valid = false
      setErrors({...errors, email: 'invalid'})
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
                <Grid item xs={12} >                                  
                  <TextField
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Your Humans Email Address"
                    placeholder="example@domain.com"
                    helperText = {errors.email === 'empty' ? (
                      'An email is required'
                      ) : ( 
                        errors.email === 'invalid' ? (
                        'email is not valid'
                        ) : ( 
                          errors.email === 'exists' ? (
                          `${userForm.email} already exists`
                          ) : ( 
                            ''
                          )
                        )
                      )     
                    }
                    error={errors.email === 'empty' || errors.email === 'invalid' || errors.email === 'exists'}

                    onKeyUp={ e =>setUserForm({...userForm, email: e.target.value}) } 
                    onChange={ e => e.target.value < 1 ? (
                      setErrors({...errors, email: 'empty'})
                      ) : (
                        checkEmailInput(e)
                      )}
                  /> 
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password to get into your account"
                    type="password"
                    id="password"
                    placeholder="******"
                    variant="outlined"
                    required
                    fullWidth
                    error={userForm.password.length === 0}
                    helperText={userForm.password.length === 0 && `Password is required`}                  
                    onKeyUp = {e =>
                      e.target.value < 1 ? (
                        setUserForm({...userForm, password: e.target.value}),
                        setErrors({...errors, password: true})
                        ) : (
                        setUserForm({...userForm, password: e.target.value}),
                        setErrors({...errors, password: false})
                       ) 
                    }                  
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
                <Grid item xs={12}>
                  <TextField
                    error={errors.dogName}
                    helperText={errors.dogName &&  'name is required'}
                    variant="outlined"
                    required
                    fullWidth
                    id="dogName"
                    label="What do your humans call you?"
                    name="dogName"
                    placeholder="Dogs Name"
                    onKeyUp = {e =>
                      e.target.value < 1 ? (
                        setUserForm({...userForm, dogName:e.target.value}),
                        setErrors({...errors, dogName:true})
                      ) : (
                        setUserForm({...userForm, dogName:e.target.value}),
                        setErrors({...errors, dogName : false})
                      ) 
                    }
                  />
                </Grid>  
                <FormControl required fullWidth variant="outlined" className={classes.formControl}>
                  <InputLabel error={userForm.dogBreed.length < 1} htmlFor="dogBreed">What breed are you..?</InputLabel>
                  <Select  
                    error={userForm.dogBreed.length < 1}
                    native
                    value={allBreeds.breed}
                    onChange={e => 
                      e.target.value < 1 ? (
                        setUserForm({...userForm, dogBreed: e.target.value}),
                        setErrors({...errors, dogBreed: true})
                      ) : (
                        setUserForm({...userForm, dogBreed:e.target.value}),
                        setErrors({...errors, dogBreed : false})
                      )
                    }
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
                  { userForm.dogBreed.length < 1 && <FormHelperText error > Dog Breed Is Required </FormHelperText> }          
               </FormControl>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    // error={dogDatOfBirth.length === 0}
                    //  helperText= {dogDateOfBirth.length === 0 && 'Date Of Birth Is Required'}
                      fullWidth
                      required
                      inputVariant = "outlined"
                      margin="normal"
                      id="date-picker-dialog"
                      label="When were you born? (DD/MM/ YYYY)"
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
                    onKeyDown= {e => setUserForm({...userForm, shortDogBio: e.target.value})}
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