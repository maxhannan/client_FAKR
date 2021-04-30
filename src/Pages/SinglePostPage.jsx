import { useQuery } from '@apollo/client';
import { Avatar } from '@chakra-ui/avatar';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import {
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import gql from 'graphql-tag';
import { useContext } from 'react';
import { FaGithub } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { TiArrowBackOutline } from 'react-icons/ti';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Comments from '../Components/Comments';
import LikeButton from '../Components/LikeButton';
import { myContext } from '../Context';
import normalizeUrl from 'normalize-url';

const SinglePostPage = () => {
  const { postId } = useParams();
  const userObj = useContext(myContext);
  const headingColor = useColorModeValue('red.600', 'red.200');

  const { loading, error, data: { getPost: post } = {} } = useQuery(
    GET_POST_BY_ID,
    {
      variables: {
        postId,
      },
    }
  );

  if (error) return <p>{error}</p>;

  if (loading)
    return (
      <Center height="90vh" w="100vw">
        <Spinner size="lg" />
      </Center>
    );

  if (post) console.log(post);

  const navigate = url => {
    window.open(normalizeUrl(url), '_blank');
  };
  return (
    <Container maxW="container.md">
      <VStack spacing={4}>
        <VStack w="100%" spacing={3}>
          <Flex w="100%" align="center" justify="space-between">
            <Heading color={headingColor} textAlign="left" fontSize="2xl">
              {post.postType}
            </Heading>
            <Flex>
              <LikeButton post={post} user={userObj} />
              <IconButton
                ml="2"
                as={RouterLink}
                to="/feed"
                colorScheme="red"
                size="md"
                variant="outline"
                aria-label="Add to friends"
                icon={<TiArrowBackOutline />}
              />
            </Flex>
          </Flex>
          <Flex w="100%" align="center" justify="space-between">
            <Heading fontSize="5xl">{post.title}</Heading>
          </Flex>
          <Flex w="100%" justify="flex-start" align="center">
            <Avatar size="sm" src={post.userPhoto} mr={4} />
            <Heading color={headingColor} justify="left" fontSize="md">
              By: {post.username}
            </Heading>
          </Flex>
          <Divider />
        </VStack>
        <Image src={post.photoURL} rounded={8} />
        <ButtonGroup
          w="full"
          size="sm"
          colorScheme="red"
          isAttached
          variant="outline"
        >
          <Button
            size="lg"
            w="full"
            onClick={() => navigate(post.repoLink)}
            leftIcon={<FaGithub />}
          >
            Github Repo Link
          </Button>
          <Button
            size="lg"
            onClick={() => navigate(post.liveLink)}
            w="full"
            leftIcon={<CgWebsite />}
          >
            Live Website Link
          </Button>
        </ButtonGroup>
        <Text fontSize="lg" fontFamily="body">
          {post.body}
        </Text>
        <Flex w="100%" justify="flex-start" align="center"></Flex>
        <Comments post={post} />
      </VStack>
    </Container>
  );
};

export default SinglePostPage;

const GET_POST_BY_ID = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      postType
      title
      body
      liveLink
      repoLink
      photoURL
      createdAt
      username
      userPhoto

      likes {
        id
        createdAt
        username
        userPhoto
      }
      likeCount
      comments {
        id
        createdAt
        username
        body
        userPhoto
      }
      commentCount
    }
  }
`;
