import { FaGithub, FaTwitter, FaRegUserCircle } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useState } from 'react';

import { useForm } from '../util/useForm';
import { authLogin } from '../util/AuthFunctions';

const LoginForm = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const githubLogin = () => {
    window.open('http://localhost:4000/auth/github', '_self');
  };

  const twitterLogin = () => {
    window.open('http://localhost:4000/auth/twitter', '_self');
  };

  const localLogin = async () => {
    const res = await authLogin(values.loginUsername, values.loginPassword);
    console.log(res);
    if (res === 'success') {
      setError(false);
      setErrorMsg('');
      window.location = '/feed';
    } else {
      setError(true);
      setErrorMsg(res);
      return;
    }
  };

  const { onSubmit, handleChange, values } = useForm(localLogin, {
    loginUsername: '',
    loginPassword: '',
  });

  return (
    <Flex
      minH={'92vh'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} mt={'6'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading textAlign="center" fontSize={'4xl'}>
            Sign in to your account
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={6}
        >
          <Stack spacing={4}>
            <FormControl isInvalid={error} id="username">
              <FormLabel>Username</FormLabel>
              <Input
                name="loginUsername"
                value={values.loginUsername}
                onChange={handleChange}
                type="text"
              />
              <FormHelperText color="crimson">{errorMsg}</FormHelperText>
            </FormControl>
            <FormControl isInvalid={error} id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="loginPassword"
                value={values.loginPassword}
                onChange={handleChange}
                type="password"
              />
              <FormHelperText color="crimson">{errorMsg}</FormHelperText>
            </FormControl>
            <Button size="lg" onClick={onSubmit} leftIcon={<FaRegUserCircle />}>
              Login
            </Button>
            <Link
              as={RouterLink}
              to="/register"
              color={'blue.400'}
              alignSelf="center"
            >
              Register for an account
            </Link>
            <Button size="lg" onClick={githubLogin} leftIcon={<FaGithub />}>
              Login with Github
            </Button>
            <Button
              size="lg"
              colorScheme="twitter"
              onClick={twitterLogin}
              leftIcon={<FaTwitter />}
            >
              Login with Twitter
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
