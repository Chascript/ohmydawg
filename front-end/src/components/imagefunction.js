import React from 'react'
import {Spring} from 'react-spring/renderprops'
import { makeStyles } from '@material-ui/core/styles'
import  Grid  from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  random:{
    objectFit: 'fill',      
    boxShadow: '0 1px 10px #404040',
    maxwidth: '100%',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  div:{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent : 'flex-end'
  }
}))


export default function RandomImage() {
  const classes = useStyles()
  return (
    <Spring
    from={{ opacity: 0, marginTop: -16 }}
    to={{ opacity:1, marginTop:0 }}
    config={{duration:2000}}
    >
      {transition=> (
        <Grid style={transition} item xs={false}  md={12} className={classes.div}>
          <img  src={'https://placedog.net/640/480?random'} alt={'users-profile'} className={classes.random} />
          <img  src={'https://placedog.net/640/400?random'} alt={'users-profile'} className={classes.random} />
          <img  src={'https://placedog.net/640/600?random'} alt={'users-profile'} className={classes.random} />
        </Grid>
      )}
    </Spring>
  )
}