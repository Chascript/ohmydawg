import { createMuiTheme } from '@material-ui/core/styles';
import './App.css'

const font = ['Mali']

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242',
    }
  },
  typography:{
      fontFamily: font,
  }
});

export default theme