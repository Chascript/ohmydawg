import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignIn from './sign-in';
import SignUp from './sign-up-component';
import { Message } from './defaultmessagelogin';
import { Spring } from 'react-spring/renderprops'



const accounts = {
  name: 'Manson',
  breed: 'Poodle',
  email: 'manson@gmail.com'
};

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3, 0, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },

}));


const classes = useStyles;

export class SignInSignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      existingEmail: false,
      emailEmpty: true    
    }
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this)
  }

  handleOnKeyUp(e) {
    const email = e.target.value;
    console.log(email)
    if(email === null || email === ''){
      this.setState({
        emailEmpty: true
      })
    } else if (email === accounts.email) {
      this.setState({
        existingEmail: true,
        emailEmpty: false
      });
    } else {
      this.setState({
        existingEmail: false,
        emailEmpty: false
      });
    }
  }

  render(){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Spring 
            from = {{opacity: 0, marginTop: -500}}
            to = {{opacity: 1, marginTop:0}}
            >
            { props => (
              <form style={props} className={classes.form} noValidate>

              <Avatar className={classes.avatar}></Avatar>

              <TextField
                onKeyUp={this.handleOnKeyUp}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Your humans email address"
                name="email"
                />
              </form>
            )}
          </Spring>

          {this.state.emailEmpty ? (
            <div>{ this.state.emailEmpty ? 
              (<Message />
              ) : (
              <div></div>
              )} </div> ) : ( <div>
              { this.state.existingEmail ? (
                <SignIn name={accounts.name} />
                ) : (
                <SignUp />
              )
            }</div>
          )}
        </div> 
      </Container>
    );
  }
}

