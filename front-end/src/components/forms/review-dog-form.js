import { Grid, Typography, makeStyles, Button, Paper } from '@material-ui/core'
import Modal from 'react-awesome-modal'
import React from 'react'

const useStyles = makeStyles ((theme) => ({
  image:{
    height: 300,
    width: 200,
    borderRadius: '50%',
    boxShadow: '0 1px 10px #404040'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function ReviewDogForm(props) {
  const classes = useStyles()

  return(
  
  <Modal visible={props.review} width="600" height="750" effect="fadeInUp" onClickAway={props.handleClose}>
  <div>
      <h1>Review {props.dogName}</h1>
         <Grid container sm={10} component={Paper} justify='center' alignItems='center' spacing={2}>
      <Grid item sm={12}>
      <img className={classes.image} src={props.dogPhoto} alt={props.dogPhoto.name} />
      </Grid>
      <Grid item sm={12}>
          Name:
          {props.dogName}
      </Grid>
      <Grid item sm={12}>
          Breed:
          {props.dogBreed}
      </Grid>
      <Grid item sm={12}>
          Date Of Birth:
          {props.dogDateOfBirth}
      </Grid>
      <Grid item sm={12}>
          About Me:
          {props.dogShortBio}
      </Grid>
      <Grid item sm={12}>
          Punch Line:
          {props.dogPunchLine}
      </Grid>
      <Grid item sm={12}>
          Personality:
          {props.dogPersonality}
      </Grid>
      <Grid sm={4}>
      <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={props.handleClose}
        >
        Edit Dog
        </Button>
      </Grid>
      <Grid sm={4}>
      <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={props.handleAddNewDogClick}
        >
        Add Another
        </Button>
      </Grid>
        <Grid sm={4}>
      <Button
          href='/gallery'
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={props.handleSaveDogNoNewDog}
        >
        Create Dawg
        </Button>
      </Grid>
    </Grid>
  </div>
</Modal>
  )
}