import { FaGithub, FaTwitter } from 'react-icons/fa';

import {
  Flex,
  Box,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Login() {
  const githubLogin = () => {
    window.open('http://localhost:4000/auth/github', '_self');
  };
  const twitterLogin = () => {
    window.open('http://localhost:4000/auth/twitter', '_self');
  };

  return (
    <Flex
      minH={'92vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
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
}
