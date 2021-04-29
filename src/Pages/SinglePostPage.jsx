import { useQuery } from '@apollo/client';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Image } from '@chakra-ui/image';
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import gql from 'graphql-tag';
import { FaGithub } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const SinglePostPage = () => {
  const { postId } = useParams();
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
  return (
    <Container maxW="container.md">
      <VStack spacing={4}>
        <Flex w="100%" align="center" justify="space-between">
          <Heading fontFamily="monospace">{post.title}</Heading>
        </Flex>

        <Flex w="100%" justify="flex-start" align="center">
          <Avatar src={post.userPhoto} mr={4} />
          <Heading fontFamily="monospace" justify="left" size="md">
            By: @{post.username}
          </Heading>
        </Flex>
        <Divider />
        <Image src={post.photoURL} />
        <Text fontSize="lg" fontFamily="body">
          {post.body}
        </Text>
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
      }
      likeCount
      comments {
        id
        createdAt
        username
        body
      }
      commentCount
    }
  }
`;
