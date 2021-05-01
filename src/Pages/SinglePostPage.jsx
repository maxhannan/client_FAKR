import { useQuery } from '@apollo/client';
import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import {
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useContext, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { CgWebsite } from 'react-icons/cg';
import { TiArrowBackOutline } from 'react-icons/ti';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Comments from '../Components/Comments';
import LikeButton from '../Components/LikeButton';
import { myContext } from '../Context';
import normalizeUrl from 'normalize-url';
import { GET_POST_BY_ID } from '../util/GQLQueries';

const SinglePostPage = () => {
  const { postId } = useParams();
  const userObj = useContext(myContext);
  const [imageReady, setImageReady] = useState(false);
  const { loading, error, data: { getPost: post } = {} } = useQuery(
    GET_POST_BY_ID,
    {
      variables: {
        postId,
      },
    }
  );

  if (error) return <p>{error}</p>;

  if (loading) {
    return (
      <Center height="90vh" w="100vw">
        <Spinner size="lg" />
      </Center>
    );
  }

  if (post) console.log(post);

  const navigate = url => {
    window.open(normalizeUrl(url), '_blank');
  };

  return (
    <>
      {!imageReady && (
        <Center h="600px">
          <Spinner />
        </Center>
      )}
      <Container
        style={{
          opacity: imageReady ? '1' : '0',
          transition: 'opacity 250ms ease-in',
        }}
        maxW="container.md"
      >
        <VStack spacing={4}>
          <VStack w="100%">
            <Flex w="100%" align="center" justify="space-between">
              <Heading fontSize="md">{post.postType}</Heading>
              <Flex>
                <LikeButton post={post} user={userObj} />
                <IconButton
                  ml="2"
                  as={RouterLink}
                  to="/feed"
                  size="md"
                  aria-label="Add to friends"
                  icon={<TiArrowBackOutline />}
                />
              </Flex>
            </Flex>
            <Flex w="100%" justify="space-between">
              <Heading fontSize="3xl">{post.title}</Heading>
            </Flex>
            <Flex w="100%" h="50px" justify="flex-start" align="center">
              <Avatar size="sm" src={post.userPhoto} mr={4} />
              <Heading justify="left" fontFamily="body" fontSize="md">
                By: {post.username}
              </Heading>
            </Flex>
            <Divider />
          </VStack>
          <Image
            src={post.photoURL}
            rounded={8}
            onLoad={() => setImageReady(true)}
          />
          <Flex w="full" flexDirection={{ md: 'row', base: 'column' }}>
            <Button
              onClick={() => navigate(post.repoLink)}
              leftIcon={<FaGithub />}
              fontSize="md"
              m={1}
              w="full"
            >
              Github Repo Link
            </Button>
            <Button
              m={1}
              onClick={() => navigate(post.liveLink)}
              leftIcon={<CgWebsite />}
              fontSize="md"
              colorScheme="red"
              w="full"
            >
              Live Website Link
            </Button>
          </Flex>
          <Text fontSize="lg" fontFamily="body">
            {post.body}
          </Text>
          <Flex w="100%" justify="flex-start" align="center"></Flex>
          <Comments post={post} />
        </VStack>
      </Container>
    </>
  );
};

export default SinglePostPage;
