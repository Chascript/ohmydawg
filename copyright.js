import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import React from 'react'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.ohmydawg.co.uk/home.html">
        ohmydawg
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function EnterEmail() { return <Copyright /> }