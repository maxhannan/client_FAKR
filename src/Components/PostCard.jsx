import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Avatar,
  useColorModeValue,
  Button,
  ButtonGroup,
  IconButton,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FaRegComments } from 'react-icons/fa';
import { myContext } from '../Context';
import LikeButton from './LikeButton';

export default function PostCard({ post }) {
  const [imageReady, setimageReady] = useState(false);
  const userObj = useContext(myContext);

  return (
    <>
      {!imageReady && (
        <Center h="600px">
          <Spinner />
        </Center>
      )}
      <Center
        style={{
          opacity: imageReady ? '1' : '0',
          transition: 'opacity 250ms ease-in',
        }}
      >
        <Box
          maxW={'full'}
          w={'full'}
          bg={useColorModeValue('gray.50', 'gray.900')}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
        >
          <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
            <Image
              onLoad={() => setimageReady(true)}
              src={post.photoURL}
              objectFit="cover"
            />
          </Box>
          <Stack>
            <Text
              color={'red.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              {post.postType}
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
            >
              {post.title}
            </Heading>
            <Text color={'gray.500'}>{`${post.body.substring(
              0,
              150
            )}...`}</Text>
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Avatar src={post.userPhoto} alt={'Author'} />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text
                color={'red.500'}
                fontWeight={600}
                fontSize="sm"
              >{`@${post.username}`}</Text>
              <Text color={'gray.500'}>
                {formatDistance(new Date(post.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </Text>
            </Stack>
          </Stack>
          <Stack
            mt={6}
            direction={'row'}
            justify="space-between"
            align={'center'}
          >
            <HStack>
              <LikeButton user={userObj} post={post} />
              <ButtonGroup
                size="md"
                colorScheme="red"
                isAttached
                variant="outline"
              >
                <IconButton
                  aria-label="Add to friends"
                  icon={<FaRegComments />}
                />
                <Button mr="-px">{post.commentCount}</Button>
              </ButtonGroup>
            </HStack>
            <IconButton
              as={RouterLink}
              to={`/post/${post.id}`}
              colorScheme="red"
              size="md"
              aria-label="Add to friends"
              icon={<ArrowForwardIcon />}
            />
          </Stack>
        </Box>
      </Center>
    </>
  );
}
