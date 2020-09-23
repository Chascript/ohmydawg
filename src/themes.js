import { createMuiTheme } from '@material-ui/core/styles';
import './App.css'
import { cyan, indigo } from '@material-ui/core/colors';

const font = ['Mali']

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: '#757ce8',
      main: '#000000', // background nav bar
      dark: '#002884',
      contrastText: '#ffffff', //text
    },
    secondary: {
      light: '#cfcfcf', //
      main: '#707070', //switch button
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
    primary: indigo,
    secondary: cyan,
  },
  typography:{
      fontFamily: font,
  }
});


