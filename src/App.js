import React, { useContext } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Simple from './Components/Nav';
import { myContext } from './Context';
import Feed from './Components/Feed';
function App() {
  const userObj = useContext(myContext);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Simple />
        <Route exact path = '/'>
          {userObj ? <Redirect to = '/feed'/> : <Homepage />}
        </Route>
        {userObj ? null : <Route exact path="/login" component={Login} />}
        {userObj ?  <Route exact path="/feed" component={Feed} /> : null}
      </Router>
    </ChakraProvider>
  );
}

export default App;