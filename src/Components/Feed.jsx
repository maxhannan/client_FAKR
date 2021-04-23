import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../util/GQLQueries';
const Feed = () => {
  const { loading, error, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  if (error) return <p>{error}</p>;
  if (posts) console.log(posts);
  return (
    <Flex height="90vh" align="center" justify="center">
      {loading ? <Spinner size="xl" /> : <h1>Done</h1>}
    </Flex>
  );
};

export default Feed;
