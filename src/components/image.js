import React from 'react'
import { Spring } from 'react-spring/renderprops'
import  Grid  from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  image: {
    boxShadow: '0 1px 10px #404040',
    objectFit: 'fill',  
    overflow: 'hidden',
  },
}))

export default function Image(props) {
  const classes = useStyles();
  return (
    <Spring
    from = {{ opacity: 0, marginTop: -500 }}
    to = {{ opacity: 1, marginTop: 0 }}
    config = {{duration:2000}}
    >
      {props => ( 
        <Grid item style={props} xs={false} sm={4} md={7} className={classes.image} >
          <img src={require('./ohmydawglogo.jpg')} alt={'ohmydawglogo'} />
        </Grid>
      )}
    </Spring>
  )
}