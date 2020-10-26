import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Spring } from 'react-spring/renderprops'

export class Message extends React.Component {
  render() {
    return (
      <Spring
        from = {{opacity: 0}}
        to = {{opacity: 1}}
        config= {{delay:500}}
      >
        { props => (
          <div style={props} >
            <Typography style={{marginTop: 10}} component='p'>
              Please enter your username. If it matches up with an account you will 
              be prompted to enter your password. If it dosen't match an account you will be 
              prompted to create your dog with the username provided!
            </Typography>
          </div>  
        )}
      </Spring>
    );
  }
}