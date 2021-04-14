import { CssBaseline, Grid } from '@material-ui/core';
import React from 'react';
import PageNotReady from './page-not-ready';

export default function Contact() {
  return (
    <Grid container justify="center" align="center">
      <CssBaseline />
      <PageNotReady page="Contact" />
    </Grid>
  );
}
