import { gql, useQuery } from '@apollo/client';
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
import { useContext } from 'react';
import { myContext } from '../Context';
import FollowButton from './FollowButton';

export default function SocialProfileSimple({
  username,
  following,
  setFollowing,
}) {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'gray.400');
  const tagColor = useColorModeValue('gray.50', 'gray.800');
  const userObj = useContext(myContext);
  const {
    loading,
    error,
    data: { getUserByName: user } = {},
  } = useQuery(GET_USER_BY_NAME, {
    variables: {
      username,
    },
  });
  if (error) console.error(error);
  if (loading) return <h3>loading...</h3>;

  return (
    <Center>
      <Box w={'full'} bg={bgColor} rounded={'lg'} p={6} textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={user.photos}
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
          {user.displayName}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @{user.username}
        </Text>
        <Text textAlign={'center'} color={textColor} px={3}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae sit
          magnam odio esse id praesentium illum nobis alias unde eaque omnis
          quibusdam voluptate ratione magni itaque quas molestias, ex dolor
          tempore animi vel commodi?
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge px={2} py={1} bg={tagColor} fontWeight={'400'}>
            #art
          </Badge>
          <Badge px={2} py={1} bg={tagColor} fontWeight={'400'}>
            #photography
          </Badge>
          <Badge px={2} py={1} bg={tagColor} fontWeight={'400'}>
            #music
          </Badge>
        </Stack>
        {username === userObj.username && (
          <Button mt={4} w="full">
            Edit Profile
          </Button>
        )}
        {username !== userObj.username && (
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
            <FollowButton user={user} />
          </Stack>
        )}
      </Box>
    </Center>
  );
}

const GET_USER_BY_NAME = gql`
  query getUserByName($username: String!) {
    getUserByName(username: $username) {
      id
      displayName
      photos
      username
      following {
        displayName
        photos
        username
      }
    }
  }
`;
