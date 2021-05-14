import { useQuery } from '@apollo/client';
import { Spinner } from '@chakra-ui/react';
import { Center } from '@chakra-ui/layout';
import { FETCH_POSTS_QUERY } from '../util/GQLQueries';
import PostCard from '../Components/PostCard';
import { useParams } from 'react-router-dom';
import SocialProfileSimple from '../Components/ProfileCard';
import PostsFeed from '../Components/PostsFeed';

const Profile = ({ following, setFollowing }) => {
  const { username } = useParams();

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

  const filteredPosts = posts.filter(post => post.username === username);

  return (
    <PostsFeed>
      <SocialProfileSimple
        username={username}
        following={following}
        setFollowing={setFollowing}
      />
      {filteredPosts &&
        filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
    </PostsFeed>
  );
};

export default Profile;
