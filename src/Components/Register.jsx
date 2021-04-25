import { FaRegUserCircle } from 'react-icons/fa';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import FileUploadButton from './FileUploadButton';

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [displayName, setDisplayName] = useState();
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const login = async (username, password) => {
    const resTwo = await axios({
      method: 'POST',
      data: {
        username,
        password,
      },
      withCredentials: true,
      url: 'http://localhost:4000/auth/login',
    });
    if (resTwo.data === 'success') {
      window.location = '/feed';
    }
    console.log(resTwo);
  };

  const register = async () => {
    if (registerPassword.length < 6) {
      setError(true);
      setPasswordErrorText('Password must be at least 6 characters');
      return;
    }
    if (registerPassword !== confirmPassword) {
      setError(true);
      setPasswordErrorText('Passwords must match');
      return;
    }
    setError(false);
    setPasswordErrorText('');
    const res = await axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword,
        displayName: displayName,
        photos: fileUrl,
      },
      withCredentials: true,
      url: 'http://localhost:4000/auth/register',
    });
    console.log(res);
    if (res.data === 'success') {
      await setTimeout(login(registerUsername, registerPassword), 500);
    }
    setRegisterUsername('');
    setRegisterPassword('');
    setDisplayName('');
    console.log('Register');
  };

  return (
    <Flex
      minH={'92vh'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading textAlign="center" fontSize={'4xl'}>
            Sign up for an account
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={6}
        >
          <Stack spacing={4}>
            <FileUploadButton fileUrl={fileUrl} setFileUrl={setFileUrl} />
            <FormControl isRequired id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={registerUsername}
                onChange={e => setRegisterUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired id="displayName">
              <FormLabel>Display Name</FormLabel>
              <Input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired isInvalid={error} id="password">
              <FormLabel>Password</FormLabel>
              <Input
                errorBorderColor="crimson"
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
                type="password"
              />
              <FormHelperText color="crimson">
                {passwordErrorText}
              </FormHelperText>
            </FormControl>
            <FormControl isInvalid={error} isRequired id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                errorBorderColor="crimson"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <FormHelperText color="crimson">
                {passwordErrorText}
              </FormHelperText>
            </FormControl>
            <Button size="lg" leftIcon={<FaRegUserCircle />} onClick={register}>
              Register
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
