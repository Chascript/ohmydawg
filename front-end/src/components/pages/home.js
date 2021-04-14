import React from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import HomeContent from '../home-content';

export default function Home() {
  return (
    <Grid container>
      <CssBaseline />
      <HomeContent />
    </Grid>
  );
}
