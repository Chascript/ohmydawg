import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Grid, Hidden, Typography, useMediaQuery } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { Pets } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles'

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
  imagePadding:{
    paddingTop: 10,
    paddingBottom: 10
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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'));


  return (
    <React.Fragment>
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        maxWidth='md'
        open={props.review}
        onClose={props.handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <Grid container >
            <Hidden smUp>
              <Grid container alignItems='center' justify='center' >
                <Grid item >
                  <Typography component="h1" variant="h4">
                    Review {props.dogName} 
                  </Typography>
                </Grid> 
                <Grid item  >
                  <Pets className={classes.avatar}/>
                </Grid>
              </Grid>
            </Hidden>
            <Grid container justify={matches && 'center'} className={matches && classes.imagePadding} item  xs={12} sm={4}>
              <img className={classes.image} src={props.dogPhoto} alt={props.dogName}  />
            </Grid>
            <Grid container item xs={12} sm={8} justify='center' alignItems='center' spacing={2} >
              <Hidden xsDown>
                <Grid item xs={8} sm={5} >
                  <Typography component="h1" variant="h4">
                    Review {props.dogName} 
                  </Typography>
                </Grid> 
                <Grid item xs={4} sm={7} >
                  <Pets className={classes.avatar}/>
                </Grid>
              </Hidden>
              <Grid container item xs={12} sm={12}>
              <Grid item xs={4} sm={4}>
                <Typography component='p'>
                Name:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Typography component='p'>
                  {props.dogName},
                </Typography>
              </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
              <Grid item xs={4} sm={4}>
                <Typography component='p'>
                Breed:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Typography component='p'>
                  {props.dogBreed},
                </Typography>
              </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
              <Grid item xs={4} sm={4}>
                <Typography component='p'>
                Date Of Birth:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Typography component='p'>
                  {props.dogDateOgBirth},
                </Typography>
              </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
              <Grid item xs={4} sm={4}>
                <Typography component='p'>
                Punchline:
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <Typography component='p'>
                  {props.dogPunchline},
                </Typography>
              </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
              <Grid container alignItems='flex-start' item xs={4} sm={4}>
                <Grid item xs={5} sm={4}>
                  <Typography component='p'>
                  Personality:
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={8} sm={8}>
                <Grid item xs={12} sm={12}>
                  <Typography component='p' >
                      {props.dogPersonality.intelligent && 'Intellgiant'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Typography component='p' >
                  {props.dogPersonality.loving && 'Loving'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Typography component='p' >
                  {props.dogPersonality.adventurous && 'Adventurous'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Typography component='p' >
                  {props.dogPersonality.social && 'Social'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12} sm={12}>
                <Grid item xs={4} sm={4}>
                  <Typography component='p'>
                  About Me:
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component='p'>
                    {props.dogShortBio},
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1} item sm={6} justify={matches && 'center'} >
            <Grid item xs={10} sm={4}>
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
            <Grid item xs={10} sm={4}>
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
            <Grid item xs={10} sm={4}>
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
