import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import React from 'react'


export default function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {' © '}
      <Link color="inherit" href="http://www.ohmydawg.co.uk/home.html">
        ohmydawg
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}