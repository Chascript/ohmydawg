import React from 'react'
import  Grid  from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import RandomImage from './imagefunction'
import UserImage from './userimage'
import Logo from './logo'



const useStyles = makeStyles(() => ({
  div:{
    display: 'flex',
    flexWrap: 'wrap'
  },
}))

export default function Image(props) {
  const classes = useStyles();
  return (
    <Grid item xs={false} sm={4} md={7} className={classes.div}>
      {props.usernameCurrentValue === '' ? (
        <Logo/>            
        ) : (
        props.usernameCurrentValue === props.username ? ( 
          <UserImage />          
          ) : ( 
          <RandomImage />
        )
      )}
    </Grid>
  )
}