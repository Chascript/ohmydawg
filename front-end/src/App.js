import React, { useState } from 'react';
import './App.css';
import DenseAppBar from './components/navigation-bar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider,  } from '@material-ui/core/styles';
import { blueGrey, grey,} from '@material-ui/core/colors';
import {Section} from '../src/components/section';
import {BrowserRouter as Router} from 'react-router-dom'
import Footer from './components/footer';
import { Grid } from '@material-ui/core';
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
        <Grid container sm={12} flexGrow={1} flex-wrap='wrap' >
          <Grid item sm={12}>   
            <DenseAppBar  onChange={()=> setDarkMode(!darkMode)} />
          </Grid>
          <Grid item container sm={12} style={{marginTop:'100px', marginBottom:'26px'}} justify='center' align='center' >
            <Section/>        
          </Grid>
          <Grid  item sm={12}>
            <Footer />
          </Grid>
        </Grid>
      </ThemeProvider>  
    </Router>
  );
}
export default App;
