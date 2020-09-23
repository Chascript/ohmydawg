import React from 'react';
import './App.css';
import SignInSide from './components/sign-in-side';
import Container from '@material-ui/core/Container';
import DenseAppBar from './components/navigation-bar'

function App() {
  return (
    <Container>
      <Container>
        <DenseAppBar />
      </Container>
      <Container>
        <SignInSide />
      </Container>
    </Container>
  );
}
export default App;
