import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UploadButtons from './upload-photo-button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Spring } from 'react-spring/renderprops'


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3, 0, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  return (
    <Spring
      from = {{opacity: 0, marginTop:-500}}
      to = {{opacity: 1, marginTop: 0}}
      config= {{delay:750}}
    >
    { props => (
      <Container style={props} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Typography component="p"  >
              Well we see you have found your way "Oh My Dawg!" (this is paw-some news). You are currently 1 bark away from signing yourself up and voting! (If you already have an account please double check your email)
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <UploadButtons />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  autoComplete="fname"
                  name="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="Account Username"
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
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="What do your humans call you?"
                  name="lastName"
                  autoComplete="lname"
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
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Dog!
              </Button>
            </form>
          </div>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Container>    
      )}
    </Spring>
  );
}