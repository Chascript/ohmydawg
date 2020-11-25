import { CssBaseline, Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AccountForm from '../forms/account-form'
import DogForm from '../forms/dog-form'



export default function Signup() {

  const [renderedComponent, setRenderedComponents] = useState({
    accountForm: true,
    dogForm: false
  })
  const [accountForm,setAccountForm] = useState({
    email: false,
    password: false,
    confirmPassword: 'invalid',
    firstName: false,
    surname: false,
    dateOfBirth: new Date(),
  })
  const [accountId, setAccountId] = useState()
  const initialRender = () =>{
  setRenderedComponents({
    accountForm: false,
    dogForm: true
  })
}

useEffect(()=>{
  initialRender()
},[])

const handleEmailChange = async event =>{
  const target = event.target
  const emailValue = target.value
  console.log(emailValue)
if( emailValue < 1 ) {
  setAccountForm({...accountForm, email:null})
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
      console.log(emailExistsResult)
      setAccountForm({...accountForm, email:emailExistsResult})
      console.log(accountForm)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }     
  } else {
      setAccountForm({...accountForm, email:'invalid'})
      console.log(accountForm.email)
  }
}
}

const handleConfirmPassword = event =>{
  const target = event.target
  const confirmPasswordValue = target.value
  setAccountForm({...accountForm, confirmPassword: false})
  if(confirmPasswordValue === accountForm.password){
    setAccountForm({...accountForm, confirmPassword: true})
  }
}
const handleDateChange = (date) => {
  setAccountForm({...accountForm, dateOfBirth: date})
}
const [errorMessage, setErrorMessage] = useState(false)

const submitAccountForm = () => {
  setErrorMessage(false)
  const formValues = Object.values(accountForm)
  const formError = [
    formValues.includes(false),
    formValues.includes(null),
    formValues.includes('invalid'),
    formValues.includes('exists')
  ]
  // need to fix error on datepicker
  if(formError[0] || formError[1]||formError[2]||formError[3]){
    console.log('error')
    setErrorMessage(true)
  } else {
    const details = {
      email: accountForm.email,
      password: accountForm.password,
      firstName: accountForm.firstName,
      surname: accountForm.surname,
      dateOfBirth: accountForm.dateOfBirth,
    }
    fetch('http://localhost:5000/signup/newaccount', {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(details)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setAccountId(res)
      setRenderedComponents({
        acountForm: false,
        dogForm: true
      })
    })
    .catch(error => console.log(error))
  }
}
  return(
    <Grid container sm={12} spacing={4} justify='center' wrap='wrap'  >
        <CssBaseline />
        {renderedComponent.accountForm && 
          <Grid item sm={4} component={Paper}>
            <AccountForm
            fieldsEmpty={errorMessage}
            handleSubmitOnClick ={submitAccountForm}
            handleEmail={handleEmailChange}
            handleFirstNameChange={e => setAccountForm({...accountForm, firstName: e.target.value})}
            handleSurnameChange={e => setAccountForm({...accountForm, surname: e.target.value})}
            handleDateOfBirthChange={handleDateChange}
            handlePasswordChange={e => setAccountForm({...accountForm, password: e.target.value})}
            handleConfirmPasswordChange={handleConfirmPassword}
            accountFormValues={accountForm}
            title="Sign Up!" 
            />
          </Grid>
        }
      <Grid item sm={12} >
        {renderedComponent.dogForm && 
          <DogForm 
            usernameValue={accountId}
            title="Create Dawg!" 
          />
        }
      </Grid>
    </Grid>
  )
}