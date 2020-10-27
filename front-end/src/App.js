import React, { useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import DenseAppBar from './components/navigation-bar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider,  } from '@material-ui/core/styles';
import { blueGrey, grey,} from '@material-ui/core/colors';
import {Section} from '../src/components/section';
import {BrowserRouter as Router} from 'react-router-dom'
import Footer from './components/footer';
const font = ['Mali']



function App() {
  const [darkMode, setDarkMode] = useState(false)
  const darkTheme = createMuiTheme({
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
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: font,
    }
  });
  const lightTheme = createMuiTheme({
    palette: {
      primary: grey,
      secondary: blueGrey,
    },
    typography:{
      fontFamily: font,
    }
  });
    
  return (
    <Router>
      <ThemeProvider theme = {darkMode ? darkTheme : lightTheme} >
        <Container >
          <Container>   
            <DenseAppBar checked={darkMode} onChange={()=> setDarkMode(!darkMode)} />
          </Container>
          <Container>
            <Section/>        
          </Container>
          <Container>
            <Footer />
          </Container>
        </Container>
      </ThemeProvider>  
    </Router>
  );
}
export default App;
