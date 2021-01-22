import { CssBaseline, Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AccountForm from '../forms/account-form'
import DogForm from '../forms/dog-form'



export default function Signup() {

  const [allBreeds, setAllBreeds] = useState([]);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(null)
  const [accountForm,setAccountForm] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    firstName: false,
    surname: false,
    dateOfBirth: null,
  })
  const [accountId, setAccountId] = useState()
const [renderedComponent, setRenderedComponents] = useState({
    accountForm: false,
    dogForm: true
  })



  const initialRender = () =>{
    setRenderedComponents({
      accountForm: true,
      dogForm: false
    })
  }  
  useEffect(()=>{
    initialRender()
  },[])

  const fetchBreeds = async () => {
  try{
    const response = await (await fetch(`/api/dogs/breeds`)).json()
    setAllBreeds(response)
    }
    catch(error){
    console.error(error)
  }
}
useEffect(() => {
  fetchBreeds()
  }, []);

const handleEmailChange = async event =>{
  const target = event.target
  const emailValue = target.value
if( emailValue < 1 ) {
  setAccountForm({...accountForm, email:null})
} else {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
  if (emailValue.match(pattern)) {
    try {    
      const emailExistsResult = await (await fetch(`/api/dogs/email/exist`, {
        method: 'POST',
        body: JSON.stringify({ chosenEmail: emailValue}),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-Type": "application/json"
        }  
      })).json() ;
      setAccountForm({...accountForm, email:emailExistsResult})
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }     
  } else {
      setAccountForm({...accountForm, email:'invalid'})
  }
}
}
const handlePasswordChange = event => {
  const target = event.target
  const value = target.value
  setPasswordsDontMatch(true)
  setAccountForm({...accountForm, password: value})
  if(value === accountForm.confirmPassword){
    setPasswordsDontMatch(false)
  }
}

const handleConfirmPassword = event =>{
  const target = event.target
  const confirmPasswordValue = target.value
  setPasswordsDontMatch(true)
  setAccountForm({...accountForm, confirmPassword: confirmPasswordValue})
  if(confirmPasswordValue === accountForm.password){
    setPasswordsDontMatch(false)
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
    fetch(`/api/signup/newaccount`, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(details)
    })
    .then(res => res.json())
    .then(res => {
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
    <Grid container justify='center' >
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
            handlePasswordChange={handlePasswordChange}
            handleConfirmPasswordChange={handleConfirmPassword}
            passwordsDontMatch={passwordsDontMatch}
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
            allBreeds={allBreeds}
          />
        }
      </Grid>
    </Grid>
  )
}