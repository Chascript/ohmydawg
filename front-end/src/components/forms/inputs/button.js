import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function OnClickButton(props) {
  const classes = useStyles()
  return(
  <Button
    fullWidth
    variant="contained"
    color="primary"
    className={classes.submit}
    onClick={props.handleClick}
  >
    {props.buttonText}
  </Button>
  )
}