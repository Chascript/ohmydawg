import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  imageSelected:{
    height: 300,
    width: 200,
    borderRadius: '50%',
    boxShadow: '0 1px 10px #404040'
  },

}))


export default function PreviewSelectedImage(props) {
const classes = useStyles()
  return <img className={classes.imageSelected} src={props.selectedImage} alt="selected-image"/>
}