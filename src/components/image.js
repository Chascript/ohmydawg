import React from 'react'
import  Grid  from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import RandomImage from './imagefunction'
import UserImage from './userimage'
import Logo from './logo'



const useStyles = makeStyles((theme) => ({
  div:{
    display: 'flex',
    flexWrap: 'wrap'
  },
}))

export default function Image(props) {
  const classes = useStyles();
  return (
    <Grid item xs={false} sm={4} md={7} className={classes.div}>
      {props.emailCurrentValue === '' ? (
        <Logo/>            
        ) : (
        props.emailCurrentValue === props.email ? ( 
          <UserImage />          
          ) : ( 
          <RandomImage />
        )
      )}
    </Grid>
  )
}