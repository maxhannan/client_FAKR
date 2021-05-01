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

import DeleteButton from './DeleteButton';
import CommentButton from './CommentButton';

export default function PostCard({ history, post }) {
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
          boxShadow="lg"
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
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'xs'}
              fontFamily="heading"
              letterSpacing={1.1}
            >
              {post.postType}
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'xl'}
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
                as={RouterLink}
                to={`/profile/${post.username}`}
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
              <CommentButton history={history} user={userObj} post={post} />
            </HStack>
            <HStack>
              {userObj.username === post.username && (
                <DeleteButton postId={post.id} />
              )}
              <IconButton
                as={RouterLink}
                to={`/post/${post.id}`}
                size="md"
                aria-label="Add to friends"
                icon={<ArrowForwardIcon />}
              />
            </HStack>
          </Stack>
        </Box>
      </Center>
    </>
  );
}
