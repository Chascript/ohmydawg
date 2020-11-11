import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import ContactIcons from './contact-icons'
import Copyright from './copyright'


const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', 
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  paw: {
    width: 50,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

export default function Footer() {
const classes = useStyles()
  return (
    <Grid container component={Paper} elevation={6} className={classes.container} >
      <Grid>
        <img className={classes.paw} src={require('./paw-print-footer.png')} alt={'paw-print'} />
      </Grid>
        <Grid className={classes.details}>
        <Grid >
          <Typography variant="body2" align="center"> A Site For Dawgs </Typography>
        </Grid>
        <Grid >
          <Copyright />
        </Grid>
        <Grid>
          <ContactIcons/>
        </Grid>
      </Grid>
      <Grid>
      <img style={{ transform: "scaleX(-1)"}} className={classes.paw} src={require('./paw-print-footer.png')} alt={'paw-print'} />
      </Grid>
    </Grid>
  )
}