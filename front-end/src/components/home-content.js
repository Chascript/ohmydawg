import { Grid,  ListItemText, Typography } from '@material-ui/core'
import { Pets } from '@material-ui/icons'
import React from 'react'



export function HomeContent() {
  return(
    <Grid container  >
      <Grid container >
        <Typography component='h2' variant='h3'>What is 'Oh My Dawg ?</Typography>
      </Grid>
        <Grid container item sm={6} >
        <Typography component='p' variant='body2' >
        ohmydawg will be a site where dogs can create profiles, make paw pals, post their walks and photos, vote for favourite photos. Like facebook but for dogs. This site is in development. For full journey take a look at twitter and LinkedIn (Links in footer). All feedback is helpful, even if its pointing out the obvious that I have missed.        </Typography>
        </Grid>
        <Grid container >
        <Typography component='h2' variant='h5'>The Roadmap</Typography>
      </Grid>
        <Grid container item sm={6} >
          <ListItemText > <Pets/> Each dog to vote on eachothers profile (Possibly a 'High-Paw!') these numbers are account bound and can be sent once a day or week? </ListItemText>
          <ListItemText ><Pets/> To have a gallery of photos for each dog (each photo has individual tally of votes)
 </ListItemText>
          <ListItemText ><Pets/> A feed for posts which can be filtered to friends only, user only or see all.
 </ListItemText>
          <ListItemText ><Pets/> Each dog has their profile page displaying details of themselves along with photos
</ListItemText>
          <ListItemText ><Pets/> Each dog can delete their own photos and edit their details
</ListItemText>
          <ListItemText ><Pets/> Possibly dogs message eachother to plan walks</ListItemText>
        <Typography component='p' variant='body2' >
        
 </Typography>

         </Grid>
    </Grid>
  )
}