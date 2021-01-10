import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useTheme } from '@material-ui/styles'


const useStyles = makeStyles(() => ({
  dogImage:{
    width: 350
  },
}))

export default function RandomDogImage(props) {
const classes = useStyles()
const theme = useTheme()
  return (
    <Grid item xs={12} sm={12}>    
      <img 
        src='https://placedog.net/640/400?random' 
        style={{opacity: props.opacity}} 
        className={classes.dogImage} 
        alt="random-dog" 
        />    
    </Grid>
  )
}