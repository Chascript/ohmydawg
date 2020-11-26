import { Grid, IconButton } from '@material-ui/core'
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons'
import React from 'react'

export default function ContactIcons() {

  return(
    <Grid item >
      <IconButton onClick={() => window.open("https://github.com/Chascript")}>
        <GitHub />
      </IconButton>
      <IconButton onClick={() => window.open("https://twitter.com/Chascript")}>
        <Twitter />
      </IconButton>
      <IconButton onClick={() => window.open("https://www.linkedin.com/in/conan-chambers-6b5a421a1/")}>
        <LinkedIn />
      </IconButton>
    </Grid>
  )
}