import { Flex, Stack, StackDivider } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../util/GQLQueries';
import PostCard from './PostCard';
const Feed = () => {
  const { loading, error, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  if (error) return <p>{error}</p>;
  if (posts) console.log(posts);
  return (
    <Flex height="90vh" justify="center">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Stack spacing={1} mt={'10'}>
          {posts.map(post => (
            <PostCard
              body={post.body}
              username={post.username}
              userPhoto={post.userPhoto}
            />
          ))}
        </Stack>
      )}
    </Flex>
  );
};

export default Feed;
