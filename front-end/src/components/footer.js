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

}))

export default function Footer() {
const classes = useStyles()
  return (
    <Grid container component={Paper} elevation={6} className={classes.container} >
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
  )
}