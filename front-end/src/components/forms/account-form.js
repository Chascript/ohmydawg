import { useMediaQuery, Grid, makeStyles, TextField, Typography, Button, Link } from '@material-ui/core'
import React from 'react'
import {  Pets } from '@material-ui/icons'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import {Spring} from 'react-spring/renderprops'
import { useTheme } from '@material-ui/styles'
import Pdf from '../forms/ohmydawgcookies.pdf';

const useStyles = makeStyles((theme) =>({
  avatar: {
    margin: theme.spacing(1),
    fontSize: 'fontSizeLarge'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title:{
    paddingBottom: 20
  }
}))

export default function AccountForm(props) {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'));

  return(      
    <Spring
    from={{ opacity: 0, marginTop: -16 }}
    to={{ opacity:1, marginTop:0 }}
    config={{duration:2000}}
    >
      {transition=> (
    <Grid style={transition} container >
    <Grid container item sm={12}
      className={classes.title} 
      direction='row' 
      alignItems={matches ? 'center' : 'flex-start' }
      justify={matches ? 'center' : 'flex-start' }
    >
      <Grid item >
        <Typography component="h1" variant="h4">
          {props.title} 
        </Typography>
      </Grid>
      <Grid item  >
        <Pets className={classes.avatar}/>
      </Grid>
      <Grid container item sm={12}>
        <Typography component="p" >
          Please Enter Account Holders Information
        </Typography>
      </Grid>
    </Grid>
    <Grid container justify='center'  alignItems='center' spacing={2}>
      <Grid item sm={10} >
        <TextField 
            label='Humans Email'
            id='email'
            variant="outlined"
            required
            name="email"
            fullWidth  
            autoComplete="new-password"
            placeholder='example@domain.com'
            type='text'
            error={props.accountFormValues.email === null || props.accountFormValues.email === 'invalid' || props.accountFormValues.email === 'exists' || props.emailError}
            helperText= {props.accountFormValues.email === null || props.emailError ? (
              'An Email Is Required'
              ) : ( 
                props.accountFormValues.email === 'invalid' ? (
                `Email Isn't Valid`
                ) : ( 
                  props.accountFormValues.email === 'exists' ? (
                  `Email Already Exists`
                  ) : ( 
                  ''
                  )
                )
              )     
            }
            onBlur={props.handleEmail}
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
          error={props.accountFormValues.password.length < 1 || props.passwordsDontMatch || props.passwordError}
          helperText={props.accountFormValues.password.length < 1 || props.passwordError ?
            ('Password Is Required'):(
              props.passwordsDontMatch && `Passwords Don't Match`
            )}
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
          helperText={props.passwordsDontMatch && `Passwords Don't Match`}
          required
          error={props.passwordsDontMatch}
          type='password'
          onChange = {props.handleConfirmPasswordChange}
        />     
      </Grid>
      <Grid item sm={5}>
      <TextField   
          onBlur={props.handleFirstNameChange}
          error={props.accountFormValues.firstName.length < 1 || props.firstNameError}
          helperText={props.accountFormValues.firstName.length < 1 || props.firstNameError ? 
            ('First Name Is Required') : ('')
          }
          variant="outlined"
          required
          fullWidth
          autoComplete="new-password"
          id="firstName"
          label="First Name"
          name="firstName"
          placeholder="Your First Name"
        />
      </Grid>
      <Grid item sm={5}>
      <TextField   
          onBlur={props.handleSurnameChange}
          error={props.accountFormValues.surname.length < 1 || props.surnameError}
          helperText={props.accountFormValues.surname.length < 1 || props.surnameError ? 
            ('Surname Is Required') : ('')
          }
          variant="outlined"
          required
          fullWidth
          autoComplete="new-password"
          id="surname"
          label="Surname"
          name="surname"
          placeholder="Your Surname"
        />
      </Grid>
      <Grid item sm={10}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            error={props.dateOfBirthError}
            invalidDateMessage='A Complete Date Is Required dd/mm/yyyy'
            required
            fullWidth
            disableFuture={true}
            value={props.accountFormValues.dateOfBirth}
            inputVariant = "outlined"
            label='Date Of Birth'
            format="dd/MM/yyyy"
            onChange={props.handleDateOfBirthChange}
            helperText={props.dateOfBirthError && 'Date Of Birth Is Required'}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={7} >
        <Typography component='p' variant='body2'>
          By clicking Create Account, you agree to Oh My Dawgs Terms. 
          Learn how we collect, use and share your data in our <Link>Data Policy </Link> 
          and how we use cookies and similar technology in our <Link href = {Pdf} target = "_blank" >Cookie Policy</Link>.
          You may recieve emails from Oh My Dawg but this is not frequent at all!
        </Typography>
      </Grid>
      <Grid item xs={7} sm={8}> 
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
      )}
      </Spring>
  )
}
