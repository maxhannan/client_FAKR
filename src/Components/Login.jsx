import { Button } from '@chakra-ui/button';
import { Box, Container, Flex, Text, VStack } from '@chakra-ui/layout';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaTwitter } from 'react-icons/fa';
const Login = () => {
  return (
    <div>
      <Flex height="90vh" align="center" justify="center">
        <VStack>
          <Text fontSize="5xl">Hello Login</Text>
          <Button size="lg" leftIcon={<FcGoogle />}>
            Login with Google
          </Button>
          <Button size="lg" leftIcon={<FaGithub />}>
            Login with Github
          </Button>
          <Button size="lg" leftIcon={<FaTwitter />}>
            Login with Twitter
          </Button>
        </VStack>
      </Flex>
    </div>
  );
};

export default Login;
