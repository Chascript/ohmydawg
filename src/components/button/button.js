import React from 'react';
import { Button } from '@material-ui/core'


export class CreateDogButton extends React.Component {
  render() {
    return (
      <Button variant="outlined" color="primary">
        Create Dog
      </Button>
    );
  }
}