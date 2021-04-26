import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
export default function Homepage() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Fakr <br />
            <Text as={'span'} fontSize="" color={'blue.400'}>
              Find your audience
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum
            distinctio, esse ipsa quod ratione tempora repudiandae dicta
            nesciunt molestias recusandae. Ea nesciunt quasi delectus autem
            atque! Amet corporis quibusdam voluptatibus.
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              colorScheme={'blue'}
              bg={'blue.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'blue.500',
              }}
              as={RouterLink}
              to="/login"
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
