import React, { useState } from 'react';
import './fonts.css';
import DenseAppBar from './components/master-page/navigation-bar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider,  } from '@material-ui/core/styles';
import { blueGrey, grey,} from '@material-ui/core/colors';
import {Section} from '../src/components/master-page/section';
import {BrowserRouter as Router} from 'react-router-dom'
import Footer from './components/master-page/footer';
import { Grid } from '@material-ui/core';
const font = "'Mali', 'cursive'";

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
      fontFamily: font
    }
  });
    
  return (
    <Router> 
      <ThemeProvider theme = {darkMode ? darkTheme : lightTheme} >
        <Grid container  >
          <Grid item container xs={12} sm={12}>   
            <DenseAppBar  onChange={()=> setDarkMode(!darkMode)} />
          </Grid>
          <Grid item container xs={12} sm={12} style={{marginTop:'120px', marginBottom:'44px'}} justify='center' alignItems='center' >
            <Section/>        
          </Grid>
          <Grid  item container xs={12} sm={12}>
            <Footer />
          </Grid>
        </Grid>
      </ThemeProvider>  
    </Router>
  );
}
export default App;
