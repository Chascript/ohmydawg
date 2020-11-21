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
          <Grid item container justify='center' sm={12}>
            <Grid item justify='center' sm={2}>
              <Typography component='h6'>
                Name:
              </Typography>
            </Grid>
            <Grid item sm={2}>
              <Typography>
                {props.dogName}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid item sm={6}>
              <Typography component='h6'>
                Breed:
              </Typography>
          </Grid>
            <Grid item sm={6}>
              <Typography>
                {props.dogBreed}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid item sm={6}>
              <Typography component='h6'>
                Date Of Birth:
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>
                {props.dogDateOfBirth}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid item sm={6}>
              <Typography component='h6'>
                About Me:
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>
                {props.dogShortBio}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid item sm={6}>
              <Typography component='h6'>
                Punch Line:
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>              
                {props.dogPunchLine}
              </Typography>
            </Grid>
          </Grid>
          <Grid item sm={12}>
            <Grid item sm={6}>
              <Typography component='h6'>
                Personality:
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>
                {props.dogPersonality}
              </Typography>
            </Grid>
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