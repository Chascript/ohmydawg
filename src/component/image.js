import React from 'react'
import { Spring } from 'react-spring/renderprops'
import  Grid  from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}))

export default function Image() {
  const classes = useStyles();


  return (
      
    <Spring
    from = {{ opacity: 0, marginTop: -500 }}
    to = {{ opacity: 1, marginTop: 0 }}
    >
      {props => ( 
      <Grid item style={props} xs={false} sm={4} md={7} className={classes.image} />
      )}
    </Spring>
    
  )
}