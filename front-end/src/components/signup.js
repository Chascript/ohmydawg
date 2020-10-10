import React, { useState, useEffect } from 'react';
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
import UploadButtons from './upload-button';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  /*   email: props.emailValue,
            'username': username,
            'password': password,
            'name': dogName,
            'breed': dogBreed,
            'dob': dateOfBirth,
            'colour': colour,   */
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [dogName, setDogName] = useState('')
  const [dogBreed, setDogBreed] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [colour, setColour] = useState('')
  const [errors, setErrors] = useState(false)

  const saveDog = () => {
    setErrors(false)
    try{
      fetch('http://localhost:5000/signup/newdog', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: props.emailValue,
          username: username,
          password: password,
          name: dogName,
          breed: dogBreed,
          dob: dateOfBirth,
          colour: colour,
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
        })
    } catch(error) {
      setErrors(true)
      return error
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
          <Typography style={{display: 'flex', justifyContent: 'center'}}  component="h2" variant="h5">
              Dog Creation
          </Typography>
          <Box  m={4} pt={3}>   
            <Typography component="p"  >
              Welcome, to begin creating your account please fill in your details below
              (If you already have an account please provide email associated with your account)
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <UploadButtons />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="Account Username"
                    onKeyUp = {e => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password to get into your account"
                    type="password"
                    id="password"
                    onKeyUp = {e => setPassword(e.target.value)}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="dogName"
                    label="What do your humans call you?"
                    name="dogName"
                    onKeyUp = {e => setDogName(e.target.value)}
                  />
                </Grid>            
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="breed"
                    label="What breed are you..?"
                    name="breed"
                    onKeyUp = {e => setDogBreed(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="dateOfBirth"
                    label="What date were you born?"
                    name="dateOfBirth"
                    onKeyUp = {e => setDateOfBirth(e.target.value)}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="colour"
                    label="What colour do you think you are?"
                    name="colour"
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
                  onClick = {e => saveDog()}
                  href= '/gallery'
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