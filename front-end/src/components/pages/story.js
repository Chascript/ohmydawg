import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import PageNotReady from './page-not-ready';

const page = 'Story';
export default function Story() {
  return (
    <Grid container justify="center" align="center">
      <CssBaseline />
      <PageNotReady page={page} />
    </Grid>
  );
}
