import React from 'react'
import {Spring} from 'react-spring/renderprops'
import { makeStyles } from '@material-ui/core/styles'
import  Grid  from '@material-ui/core/Grid'

const useStyles = makeStyles(() => ({
  div:{
    display: 'flex',
    flexWrap: 'wrap'
  },
  usersImage:{
    boxShadow: '0 1px 10px #404040',
    objectFit: 'fill',      
    overflow: 'hidden',
    maxWidth: '100%'
  }
}))

export default function UsersImage(props) {
  const classes = useStyles();
  

  return (
    <Spring
    from={{ opacity: 0, marginTop: -16 }}
    to={{ opacity:1, marginTop:0 }}
    config={{duration:3000}}
    >
      {transition=> (
        <Grid style={transition} item xs={false}  md={12} className={classes.div}>
          <img src= { props.photo} alt={'users-profile'} className={classes.usersImage}/>
        </Grid>
      )}
    </Spring>
  )
}