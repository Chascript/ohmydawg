import { CssBaseline, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import ContactIcons from './contact-icons'
import Copyright from './copyright'
import paw from './paw-print-footer.png'


const useStyles = makeStyles((theme) => ({
  paw: {
    width: 50,
  },
  color:{
    backgroundColor: theme.palette.primary.main,  }
}))

export default function Footer() {
const classes = useStyles()
  return (
    <Grid container className={classes.color} component={Paper} direction="row" justify="space-between" alignItems="center" wrap='wrap' >
       <CssBaseline />
      <Grid item sm={4} >
        <img className={classes.paw} src={paw} alt={'paw-print'} />
      </Grid >
        <Grid container item justify='space-between' alignItems='center' direction='column' sm={4} >
          <Grid item  >
            <Typography component='p' variant="body2" align="center"> A Site For Dawgs </Typography>
          </Grid>
          <Grid item>
            <ContactIcons/>
          </Grid>
          <Grid item >
            <Copyright />
          </Grid>
       </Grid>
      <Grid item sm={4} style={{display:'flex', justifyContent:'flex-end'}}>
      <img style={{ transform: "scaleX(-1)"}} className={classes.paw} src={paw} alt={'paw-print'} />
      </Grid>
    </Grid>
  )
}