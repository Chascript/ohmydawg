import React from 'react'
import {Spring} from 'react-spring/renderprops'
import { makeStyles } from '@material-ui/core/styles'
import  Grid  from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  random:{
    objectFit: 'fill',      
    boxShadow: '0 1px 10px #404040',
    maxWidth: '100%',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  div:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent : 'flex-end'
  }
}))


export default function RandomImage(props) {
  const classes = useStyles()
  return (
    <Spring
    from={{ opacity: 0, marginTop: -16 }}
    to={{ opacity:1, marginTop:0 }}
    config={{duration:2000}}
    >
      {transition=> (
        <Grid style={transition} item xs={false}  md={12} className={classes.div}>
          <img  src={props.photos[0]} alt={'users-profile'} className={classes.random} />
          <img  src={props.photos[1]} alt={'users-profile'} className={classes.random} />
          <img  src={props.photos[2]} alt={'users-profile'} className={classes.random} />
        </Grid>
      )}
    </Spring>
  )
}