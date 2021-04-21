import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Simple from './Components/Nav';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Simple />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
