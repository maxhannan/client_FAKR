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

import FileUploadButton from '../Components/FileUploadButton';
import { useForm } from '../util/useForm';
import { authLogin } from '../util/AuthFunctions';

const RegisterForm = () => {
  const [error, setError] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const register = async () => {
    const {
      registerPassword,
      confirmPassword,
      registerUsername,
      displayName,
    } = values;
    if (fileUrl.length < 2) {
      setError(true);
      return;
    }
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
    setLoading(true);
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
      await new Promise(r => setTimeout(r, 500));
      const loginRes = await authLogin(registerUsername, registerPassword);

      console.log(loginRes);
      if (loginRes === 'success') {
        setLoading(false);
        window.location = '/feed';
      }
    }
    setLoading(false);
  };

  const { onSubmit, handleChange, values } = useForm(register, {
    registerUsername: '',
    displayName: '',
    registerPassword: '',
    confirmPassword: '',
  });

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
                name="registerUsername"
                value={values.registerUsername}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired id="displayName">
              <FormLabel>Display Name</FormLabel>
              <Input
                type="text"
                name="displayName"
                value={values.displayName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired isInvalid={error} id="password">
              <FormLabel>Password</FormLabel>
              <Input
                errorBorderColor="crimson"
                name="registerPassword"
                value={values.registerPassword}
                onChange={handleChange}
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
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              <FormHelperText color="crimson">
                {passwordErrorText}
              </FormHelperText>
            </FormControl>
            <Button
              size="lg"
              isLoading={loading}
              leftIcon={<FaRegUserCircle />}
              onClick={onSubmit}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterForm;
