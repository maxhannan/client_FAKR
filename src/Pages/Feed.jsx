import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../util/GQLQueries';
import { Spinner } from '@chakra-ui/react';
import { Center } from '@chakra-ui/layout';

import PostCard from '../Components/PostCard';
import PostsFeed from '../Components/PostsFeed';

const Feed = () => {
  const {
    loading,
    error,
    data: { getPosts: posts } = {},
  } = useQuery(FETCH_POSTS_QUERY);

  if (error) return <p>{error}</p>;

  if (loading)
    return (
      <Center height="90vh" w="100vw">
        <Spinner size="lg" />
      </Center>
    );

  return (
    <PostsFeed>
      {posts && posts.map(post => <PostCard key={post.id} post={post} />)}
    </PostsFeed>
  );
};

export default Feed;
