import React from 'react'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  imageContainer:{
    display: 'flex',
    justifyContent: 'center',
  },
  imageNotChosen:{
      display: 'flex',
      justifyContent: 'center',
      height: 300,
      width: 200,
  },
  imageSelected:{
    height: 300,
    width: 200,
    borderRadius: '50%',
    boxShadow: '0 1px 10px #404040'
  },
}))

export default function ImageInput(props) {
const classes = useStyles()
  return(
    <Grid className={classes.imageContainer} item xs = {12}>
      {props.file == false ?(
        <img className={classes.imageNotChosen} src={require('./dog-not-chosen-default.png')} alt="image-not-chosen"/>
        ):(
        <img className={classes.imageSelected} src={props.imagePreview} alt={props.previewImage} />
      )}
    </Grid>
  )
}