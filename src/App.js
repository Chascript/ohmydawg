import React, { useState } from 'react';
import './App.css';
import SignInSide from './components/sign-in-side';
import Container from '@material-ui/core/Container';
import DenseAppBar from './components/navigation-bar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css'
import { cyan, indigo } from '@material-ui/core/colors';


const font = ['Mali']



function App() {
  const [darkMode, setDarkMode] = useState(false)

  const darkTheme = createMuiTheme({
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

  const lightTheme = createMuiTheme({
    palette: {
      primary: indigo,
      secondary: cyan,
    },
    typography:{
        fontFamily: font,
    }
  });
    
  return (
    <ThemeProvider theme = {darkMode ? darkTheme : lightTheme} >
      <Container>
        <Container>
          <DenseAppBar checked={darkMode} onChange={()=> setDarkMode(!darkMode)} />
        </Container>
        <Container>
          <SignInSide />
        </Container>
      </Container>
    </ThemeProvider>
  );
}
export default App;
