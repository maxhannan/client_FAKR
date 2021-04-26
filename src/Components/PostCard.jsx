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
  Fade,
} from '@chakra-ui/react';
import { formatDistance } from 'date-fns';
import { useEffect, useState } from 'react';
import { BsHeart } from 'react-icons/bs';
import { FaRegComments } from 'react-icons/fa';

export default function PostCard({ post }) {
  const [imageReady, setimageReady] = useState(false);
  return (
    <Center
      style={{
        opacity: imageReady ? '1' : '0',
        transition: 'opacity 500ms ease-in',
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
            color={'blue.500'}
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
            fontFamily={'body'}
          >
            {post.title}
          </Heading>
          <Text color={'gray.500'}>{`${post.body.substring(0, 150)}...`}</Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Avatar src={post.userPhoto} alt={'Author'} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{`@${post.username}`}</Text>
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
            <ButtonGroup
              size="md"
              colorScheme="blue"
              isAttached
              variant="outline"
            >
              <IconButton aria-label="Add to friends" icon={<BsHeart />} />
              <Button mr="-px">{post.likeCount}</Button>
            </ButtonGroup>
            <ButtonGroup
              size="md"
              colorScheme="blue"
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
            colorScheme="blue"
            size="md"
            aria-label="Add to friends"
            icon={<ArrowForwardIcon />}
          />
        </Stack>
      </Box>
    </Center>
  );
}
