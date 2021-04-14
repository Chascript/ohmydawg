import { Button, CssBaseline, Grid, makeStyles, TextField } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'spaceBetween',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputs: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Login() {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.container} spacing={1}>
      <CssBaseline />
      <Grid item sm={5} className={classes.inputs}>
        <TextField
          color="secondary"
          size="small"
          variant="outlined"
          margin="normal"
          required
          id="loginEmail"
          label="Email"
          name="email"
          placeholder="example@example.com"
        />
      </Grid>
      <Grid item sm={5} className={classes.inputs}>
        <TextField
          color="secondary"
          size="small"
          variant="outlined"
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
          id="loginPassword"
          autoComplete="current-password"
          placeholder="******"
        />
      </Grid>
      <Grid item sm={2} className={classes.buttonContainer}>
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
