import React from 'react'
import {Spring} from 'react-spring/renderprops'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(() => ({
  image: {
    boxShadow: '0 1px 10px #404040',
    objectFit: 'fill',      
    overflow: 'hidden',
    maxwidth: '100%'
  },
  div:{
    display: 'flex',
    flexWrap: 'wrap'
  }
}))
export default function Logo() {
  const classes = useStyles();
  return (
    <Spring
      from={{ opacity: 0, }}
      to={{ opacity:1,}}
      config={{duration:2000}}
    >
      {transition=> (
        <Grid style={transition} item xs={false}  md={12} className={classes.div}>
          <img className={classes.image} src={require('./ohmydawglogo.jpg')} alt={'ohmydawglogo'} />
        </Grid>
      )}
    </Spring>
  )
}