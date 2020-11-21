import React from 'react'
import { FormHelperText, Button, Box, InputLabel, Input, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  input:{
    display: 'none'
  }
}))

export default function FileUploadButton(props) {
const classes = useStyles()
  return (
    <Grid item xs={12}>
      <Box component="div" display="inline">
        {!props.isFileSelected && <FormHelperText error > {props.errorMessage} </FormHelperText>}
      </Box>
      <Input
        accept={props.inputAccept}
        className={classes.input}
        id="button-file"
        multiple={props.multiple}
        type='file'
        onChange={props.handleChange}
      />
      <InputLabel htmlFor="button-file">
        <Button fullWidth variant="contained" color="primary" component="span">
          {props.buttonText}
        </Button>
      </InputLabel>
      {props.isFileSelected && <FormHelperText > {props.fileName} </FormHelperText>}
    </Grid>
  )
}