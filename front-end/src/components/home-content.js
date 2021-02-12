import { Grid, useMediaQuery, useTheme, ListItem,  ListItemIcon, makeStyles, Typography } from '@material-ui/core'
import { Pets } from '@material-ui/icons'
import React from 'react'

const useStyles = makeStyles(() => ({
  underline: {
    textDecoration: 'underline'
  }
}))



export function HomeContent() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  return(
    <Grid container  >
      <Grid container >
        <Typography className={classes.underline} component='h2' variant={matches ? 'h5' : 'h3'}>What is 'Oh My Dawg ?</Typography>
      </Grid>
        <Grid container item sm={9} >
        <ListItem>
          <ListItemIcon>
            <Pets/>
          </ListItemIcon>
          <Typography>
            Oh My Dawg will be a site where dogs can create profiles, 
            make paw pals, post their walks and vote for favourite photos. 
            In a nutshell a bit like facebook but for dogs. 
            For the full journey take a look at my twitter and LinkedIn pages (Links in footer). 
            All feedback is helpful, even if its pointing out the obvious that I have overlooked.
          </Typography>
        </ListItem>
        </Grid>
        <Grid container >
          <Typography className={classes.underline} component='h2' variant={matches ? 'h6' : 'h5'} >The Roadmap</Typography>
        </Grid>
        <Grid container item sm={6} >
        <ListItem>
          <ListItemIcon>
            <Pets/>
          </ListItemIcon>
          <Typography>
            Each dog to vote on eachothers profile (Possibly a 'High-Paw!') 
            these numbers are account bound and can be sent once a day or week?
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Pets/>
          </ListItemIcon>
          <Typography>
            To have a gallery of photos for each dog (each photo has individual tally of votes)
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Pets/>
          </ListItemIcon>
          <Typography>
            A feed for posts which can be filtered to friends only, user only or see all.
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Pets/>
          </ListItemIcon>
          <Typography>
            Each dog has their profile page displaying details of themselves along with photos
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Pets/>
          </ListItemIcon>
          <Typography>
            Each dog can delete their own photos and edit their details
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Pets/>
          </ListItemIcon>
          <Typography>
            Possibly dogs message eachother to plan walks
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Pets/>
          </ListItemIcon>
          <Typography>
            Potentially have a map with dog friendly buisinesses (Pubs/resturants/walks) listed
            and Oh My Dawg users can leave reviews with the optional photo
          </Typography>
        </ListItem>
      </Grid>
    </Grid>
  )
}