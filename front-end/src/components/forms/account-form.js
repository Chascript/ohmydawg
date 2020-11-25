import { Grid, makeStyles, TextField, Typography, Button, Link } from '@material-ui/core'
import React from 'react'
import {  Pets } from '@material-ui/icons'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";


const useStyles = makeStyles((theme) =>({
  avatar: {
    margin: theme.spacing(1),
    fontSize: 'fontSizeLarge'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function AccountForm(props) {
  const classes = useStyles()
  return(      
    <Grid container sm={12} >
    <Grid container item sm={12} direction='row' alignItems='flex-start' justify='flex-start'>
      <Grid item >
      <Typography component="h1" variant="h4">
        {props.title} 
      </Typography>
      </Grid>
      <Grid item  >
        <Pets className={classes.avatar}/>
      </Grid>
    </Grid>
      {props.fieldsEmpty && <Typography color='error'>All Fields Are Required*</Typography>}
    <Grid container sm={12} justify='center'  alignItems='center' spacing={2}>

      <Grid item sm={10} >
        <TextField 
            label='Humans Email'
            id='email'
            variant="outlined"
            required
            fullWidth  
            placeholder='example@domain.com'
            type='text'
            error={props.accountFormValues.email === null || props.accountFormValues.email === 'invalid' || props.accountFormValues.email === 'exists'}
            helperText= {props.accountFormValues.email === null ? (
              'An email is required'
              ) : ( 
                props.accountFormValues.email === 'invalid' ? (
                'email is not valid'
                ) : ( 
                  props.accountFormValues.email === 'exists' ? (
                  `email already exists`
                  ) : ( 
                  ''
                  )
                )
              )     
            }
            onChange={props.handleEmail}
          />
      </Grid>
      <Grid item sm={5} >
      <TextField 
          label='New Password'
          id='password'
          placeholder="******"
          required
          fullWidth
          variant='outlined'
          error={props.accountFormValues.password.length < 1}
          helperText={props.accountFormValues.password.length < 1 && 'password is required'}
          type='password'
          onChange={props.handlePasswordChange}        
          />     
      </Grid>      
      <Grid item sm={5} >
        <TextField
          label='Confirm Password'
          id='confirmPassword'
          placeholder="******"
          variant='outlined'
          fullWidth
          helperText={!props.accountFormValues.confirmPassword && 'Passwords not match'}
          required
          error={!props.accountFormValues.confirmPassword}
          type='password'
          onChange = {props.handleConfirmPasswordChange}
        />     
      </Grid>
      <Grid item sm={5}>
      <TextField   
          onChange={props.handleFirstNameChange}
          error={props.accountFormValues.firstName.length < 1}
          helperText={props.accountFormValues.firstName.length < 1 && 'First Name is Required'}
          variant="outlined"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          placeholder="Account Holders First Name"
        />
      </Grid>
      <Grid item sm={5}>
      <TextField   
          onChange={props.handleSurnameChange}
          error={props.accountFormValues.surname.length < 1}
          helperText={props.accountFormValues.surname.length < 1 && 'Surname is required'}
          variant="outlined"
          required
          fullWidth
          id="surname"
          label="Surname"
          name="surname"
          placeholder="Account Holders Surname"
        />
      </Grid>
      <Grid item sm={10}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            invalidDateMessage='A Complete Date Is Required dd/mm/yyyy'
            required
            fullWidth
            disableFuture={true}
            value={props.accountFormValues.dateOfBirth}
            inputVariant = "outlined"
            label='Date Of Birth'
            format="dd/MM/yyyy"
            onChange={props.handleDateOfBirthChange}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Typography component='body2'>
        By clicking Create Account, you agree to Oh My Dawgs Terms. 
        Learn how we collect, use and share your data in our <Link>Data Policy</Link> 
        and how we use cookies and similar technology in our <Link>Cookie Policy</Link>.
        You may recieve emails from Oh My Dawg but this is not frequent at all!
      </Typography>
      <Grid sm={8}> 
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={props.handleSubmitOnClick}
        >
        Create Account!
        </Button>
      </Grid>
    </Grid> 
  </Grid>   
  )
}