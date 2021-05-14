import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../util/GQLQueries';
import { Spinner } from '@chakra-ui/react';
import { Center } from '@chakra-ui/layout';
import PostCard from '../Components/PostCard';
import PostsFeed from '../Components/PostsFeed';
import { useContext } from 'react';
import { myContext } from '../Context';

const Following = () => {
  const userObj = useContext(myContext);
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
  const filteredPosts = posts.filter(post =>
    userObj.following.map(follow => follow.username).includes(post.username)
  );
  return (
    <PostsFeed>
      {filteredPosts &&
        filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
    </PostsFeed>
  );
};

export default Following;
