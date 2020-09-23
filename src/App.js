import React, { useState } from 'react';
import './App.css';
import SignInSide from './components/sign-in-side';
import Container from '@material-ui/core/Container';
import DenseAppBar from './components/navigation-bar';
import { ThemeProvider } from '@material-ui/core/styles';
import {darkTheme, lightTheme} from './themes'


function App() {
  const [darkMode, setDarkMode] = useState(false)

    
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
