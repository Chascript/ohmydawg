import './App.css'
import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, grey,} from '@material-ui/core/colors';


const font = ['Mali']

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: '#9e9e9e',
      main: '#000000', // background nav bar
      dark: '#797a7a',
      contrastText: '#fff', //text
    },
    secondary: {
      light: '#cfcfcf', //
      main: '#797a7a', //switch button
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
    typography:{
      fontFamily: font,
  }
});

export const lightTheme = createMuiTheme({
  palette: {
    type:"light",
    primary: grey,
    secondary: blueGrey,
  },
  typography:{
      fontFamily: font,
  }
});


