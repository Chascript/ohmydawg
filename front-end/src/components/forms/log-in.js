import { Button, CssBaseline, Grid, makeStyles, TextField } from '@material-ui/core'
import React from 'react'


const useStyles = makeStyles((theme)=>({
  container:{
    display:'flex',
    flexDirection: 'row',  
  },
  inputContainer:{
    display:'flex',
    justifyContent: 'spaceBetween'
  },
  submit:{
      margin: theme.spacing(3, 0, 2),
  },
  inputs:{
    display: 'flex',
    alignItems:'center',
  },
buttonContainer:{
justifyContent:'center',    
}
}))

export default function Login(){
const classes = useStyles()
  return(
    <Grid container className={classes.container} spacing={2} >
      <CssBaseline />
      <Grid item className={classes.inputs}>
        <TextField 
         color='secondary'
          size='small'
          variant="outlined"
          margin="normal"
          required
          id="email"
          label="Email"
          name="email"
          placeholder="example@example.com"
        />
      </Grid>
      <Grid item className={classes.inputs} >
        <TextField
          color='secondary'
          size='small'
          variant="outlined"
          margin="normal"
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="******"
        />         
      </Grid>
      <Grid item  className={classes.buttonContainer}>
        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Login
       </Button>
      </Grid>
    </Grid>
  )
}