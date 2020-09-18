import React from 'react'
import Typography from '@material-ui/core/Typography'
import '../mystyles.css'
import { Spring } from 'react-spring/renderprops'

export class Message extends React.Component {

  render(){
    return(
      <Spring
        from = {{opacity: 0}}
        to = {{opacity: 1}}
        config= {{delay:500}}>
         { props => (
          <div style={props} >
          <Typography component='p'>
            Please enter your email address. If it matches up with an account you will 
            be prompted to enter your password. If it dosen't match an account you will be 
            prompted to create your dog with the email provided!
          </Typography>
         </div>  
         )}
      </Spring>

    )
  }
}  

