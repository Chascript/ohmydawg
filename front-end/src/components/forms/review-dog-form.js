import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { getThemeProps } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { Pets } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
image:{
  height: 300,
  width: 200,
  borderRadius: '50%',
  boxShadow: '0 1px 10px #404040'
}
}));

export default function ReviewDogForm(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        fullWidth='md'
        maxWidth='md'
        open={props.review}
        onClose={props.handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
        <Grid container sm={12} >
          <Grid container item sm={4}>
            <img className={classes.image} src={props.dogPhoto} alt={props.dogName}  />
          </Grid>

          <Grid container item sm={8} alignItems='center' >
            <Grid item >
              <Typography component="h1" variant="h4">
                Review {props.dogName} 
              </Typography>
            </Grid> 
            <Grid item justify='center' >
              <Pets className={classes.avatar}/>
            </Grid>


            <Grid item sm={12}>
              <DialogContentText>
                Hello my name is {props.dogName},
              </DialogContentText>
            </Grid>
            <Grid item sm={12}>
              <DialogContentText>
                I am a {props.dogBreed},
              </DialogContentText>
            </Grid>
            <Grid item sm={12} >
              <DialogContentText>
                I was born on the {props.dogDateOfBirth},
              </DialogContentText>
            </Grid>
            <Grid item sm={12}>
              <DialogContentText>
                The punchline that best defines me is: {props.dogPunchline},
              </DialogContentText>
            </Grid>
            <Grid item sm={12}>
              <DialogContentText>
                The personality options you selected for me were: {props.dogPersonality},
              </DialogContentText>
            </Grid>
            <Grid item sm={12}>
              <DialogContentText>
                My human said this about me: {props.dogShortBio}
              </DialogContentText>
            </Grid>
          </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container item sm={6} >
            <Grid item sm={4}>
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
            <Grid item sm={4}>
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
            <Grid item sm={4}>
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
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
