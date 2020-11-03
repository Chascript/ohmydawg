import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid'
import Username from './username-input'
import SignUp from './signup';
import SignIn from './sign-in-component';
import Paper from '@material-ui/core/Paper'
import { Message } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Logo from "./logo";
import RandomImage from "./imagefunction";
import UsersImage from "./userimage";




const useStyles = makeStyles(() => ({
  div:{
    display: 'flex',
    flexWrap: 'wrap'
  },

}))
export default function SignInSide() {
  const classes= useStyles()
  const [usernameValue, setUsernameValue] = useState('')
  const [newUser, setNewUser] = useState('')
  const [usersName, setUsersName] = useState('')
  const [image, setImage] = useState('')
  const [randomDogImage, setRandomDogImage] = useState([''])
  
  useEffect(()  =>  {
      fetch('http://localhost:5000/accounts/details/username', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({value: usernameValue}),
      })
      .then(res => res.json())
      .then(data => {
        if(!data[2]){
        setUsersName(data[0])
        setImage(data[1])
        setNewUser(data[2])
        } else{
          setNewUser(data[2])
        }
      })
    .catch(error => console.log(error))
    
  },[usernameValue])

  useEffect(() => {
    fetch('http://localhost:5000/photos/random')
    .then(res => res.json())
    .then(dogPhoto => {
      setRandomDogImage([dogPhoto[0], dogPhoto[1], dogPhoto[2]])
    })   
  .catch(error => console.log(error))
  },[newUser])

  return ( 
    <Grid container component='main'  className={classes.container} >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Username usernameValue = {e => setUsernameValue(e.target.value)} usernameCurrentValue={usernameValue} /> 
        {usernameValue === '' ?(
          <Message />
          ) : (
          newUser ? (
            <SignUp usernameValue={usernameValue}/>
            ) : (
            <SignIn usernameValue={usernameValue}  name={usersName} />
          )  
        )}  
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.div}>

      {usernameValue === '' ?(
        <Logo />
          ) : (
          newUser ? (
            <RandomImage photos={randomDogImage} />
            ) : (
            <UsersImage photo={image}/>
          )  
        )}  
        </Grid>
    </Grid>
  )
}
