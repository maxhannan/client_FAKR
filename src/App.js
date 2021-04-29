import React, { useContext } from 'react';
import { ChakraProvider, Container, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { myContext } from './Context';

import Homepage from './Pages/Homepage';
import LoginForm from './Pages/LoginForm';
import Nav from './Components/Nav';
import Feed from './Pages/Feed';
import RegisterForm from './Pages/RegisterForm';
import AddPostForm from './Pages/AddPostForm';
import Profile from './Pages/Profile';
import SinglePostPage from './Pages/SinglePostPage';

function App() {
  const userObj = useContext(myContext);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Nav />
        <Container centerContent mt={6} mb={14} maxW={'container.xl'}>
          <Route exact path="/">
            {userObj ? <Redirect to="/feed" /> : <Homepage />}
          </Route>
          {userObj ? (
            <Redirect to="/feed" />
          ) : (
            <Route exact path="/login" component={LoginForm} />
          )}
          {userObj ? (
            <Redirect to="/feed" />
          ) : (
            <Route exact path="/register" component={RegisterForm} />
          )}
          {userObj ? <Route exact path="/feed" component={Feed} /> : null}
          {userObj ? (
            <Route exact path="/create" component={AddPostForm} />
          ) : (
            <Redirect to="/" />
          )}
          {userObj ? (
            <Route exact path="/profile/:username" component={Profile} />
          ) : (
            <Redirect to="/" />
          )}
          <Route exact path="/post/:postId" component={SinglePostPage} />
        </Container>
      </Router>
    </ChakraProvider>
  );
}

export default App;
