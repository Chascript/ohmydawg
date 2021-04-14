import React from 'react';
import { TextField } from '@material-ui/core';

export default function MultilineTextBox(props) {
  return (
    <TextField
      id={props.id}
      label={props.label}
      multiline
      rows={props.numOfRows}
      variant="outlined"
      fullWidth
      placeholder={props.placeholder}
      onChange={props.handleChange}
      required={props.required}
    />
  );
}
