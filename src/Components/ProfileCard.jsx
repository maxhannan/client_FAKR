import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SocialProfileSimple({ username, userPhoto }) {
  return (
    <Center>
      <Box
        w={'full'}
        bg={useColorModeValue('gray.50', 'gray.900')}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          src={userPhoto}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {username}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @lindsey_jam3s
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae sit
          magnam odio esse id praesentium illum nobis alias unde eaque omnis
          quibusdam voluptate ratione magni itaque quas molestias, ex dolor
          tempore animi vel commodi?
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}
          >
            #music
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            variant="outline"
            _focus={{
              bg: 'gray.200',
            }}
          >
            Message
          </Button>
          <Button flex={1} fontSize={'sm'}>
            Follow
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
