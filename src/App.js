import React, { useContext } from 'react';
import { Box, ChakraProvider, Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { myContext } from './Context';
import { theme } from './Theme';
import Homepage from './Pages/Homepage';
import LoginForm from './Pages/LoginForm';
import Nav from './Components/Nav';
import Feed from './Pages/Feed';
import RegisterForm from './Pages/RegisterForm';
import AddPostForm from './Pages/AddPostForm';
import Profile from './Pages/Profile';
import SinglePostPage from './Pages/SinglePostPage';
import ScrollToTop from './Components/ScrollToTop';
function App() {
  const userObj = useContext(myContext);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Nav />
        <Box h="100px" />
        {userObj ? (
          <Redirect to="/feed" />
        ) : (
          <Route exact path="/login" component={LoginForm} />
        )}
        <Container centerContent mb={14} maxW={'container.xl'}>
          <Route exact path="/">
            {userObj ? <Redirect to="/feed" /> : <Homepage />}
          </Route>

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
