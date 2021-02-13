import { CssBaseline, Grid, makeStyles, Typography, Link } from '@material-ui/core'
import React from 'react'
import ContactIcons from './contact-icons'
import Copyright from './copyright'
import paw from './paw-print-footer.png'
import pawMirror from './paw-mirror.png'
import cookie from './ohmydawgcookies.pdf';

const useStyles = makeStyles((theme) => ({
  paw: {
    width: 50,
    height: 'auto',
  },
  color:{
    backgroundColor: theme.palette.primary.main,  }
}))

export default function Footer() {
const classes = useStyles()
  return (
    <Grid container className={classes.color} direction="row" justify="space-between" alignItems="center"  >
       <CssBaseline />
      <Grid item xs={2} sm={4} >
        <img className={classes.paw} src={paw} alt={'paw-print'} />
      </Grid >
        <Grid container item xs={6} sm={4}  justify='space-between' alignItems='center' direction='column' >
          <Grid item  >
            <Typography component='p' variant="body2" align="center"> A Site For Dawgs </Typography>
            <Typography  component='p' variant="caption" align="center"> <Link color='textPrimary' href = {cookie} target = "_blank" >Cookie Policy</Link> </Typography>
          </Grid>
          <Grid item xs={12}>
            <ContactIcons/>
          </Grid>
          <Grid item >
            <Copyright />
          </Grid>
          <Typography variant='caption' >
            Site Under Development
          </Typography>
        </Grid>
      <Grid container item xs={2} sm={4} justify='flex-end' >
        <img className={classes.paw} src={pawMirror} alt={'paw-print'} />
      </Grid>
    </Grid>
  )
}