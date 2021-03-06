import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Spring } from 'react-spring/renderprops'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0.5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const details = props

  return (
    <Spring 
      from = {{opacity: 0, marginTop:-250 }}
      to = {{opacity: 1, marginTop: 0 }}
      config= {{delay:500}}
    >
      { props => (
        <Grid item  maxWidth="xs">
          <CssBaseline />
          <Typography style={{display: 'flex', justifyContent: 'center'}}  component="h2" variant="h5">
            Welcome Back {details.name}! 
          </Typography>
          <Typography style={{display: 'flex', justifyContent: 'center'}} component="p"  >
                (If this isn't you please double check your username).
          </Typography>
          <Box  m={4} >   
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="******"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      )} 
    </Spring> 
  );
}