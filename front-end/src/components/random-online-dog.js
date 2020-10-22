import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  dogImage:{
    display: 'flex',
    alignItems: 'center'
  },
}))

export default function RandomDogImage(props) {
const classes = useStyles()
const details = props
  return (
    <Grid>    
      <img src='https://placedog.net/640/400?random' style={{opacity: details.opacity}} className={classes.dogImage} />    
    </Grid>
  )
}