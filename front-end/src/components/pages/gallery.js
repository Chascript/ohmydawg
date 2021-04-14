import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import Dogs from '../dogs';

export default function Gallery() {
  return (
    <Grid container justify="center" align="center">
      <CssBaseline />
      <Grid item xs={12} sm={12}>
        <Dogs />
      </Grid>
    </Grid>
  );
}
