import { useQuery } from '@apollo/client';
import { Spinner } from '@chakra-ui/react';
import { Center } from '@chakra-ui/layout';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { FETCH_POSTS_QUERY } from '../util/GQLQueries';
import PostCard from '../Components/PostCard';
import { useParams } from 'react-router-dom';
import SocialProfileSimple from '../Components/ProfileCard';
import FAB from '../Components/FAB';

const Profile = ({ history }) => {
  const { username } = useParams();
  const { loading, error, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  if (error) return <p>{error}</p>;

  if (loading)
    return (
      <Center height="90vh" w="100vw">
        <Spinner size="lg" />
      </Center>
    );

  if (posts) console.log(posts);
  const filteredPosts = posts.filter(post => post.username === username);
  return (
    <>
      <ResponsiveMasonry
        style={{ width: '100%', marginBottom: '80px' }}
        columnsCountBreakPoints={{ 350: 1, 850: 2, 1100: 3 }}
      >
        <Masonry gutter="20px">
          <SocialProfileSimple
            username={username}
            userPhoto={filteredPosts[0].userPhoto}
          />
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      <FAB history={history} />
    </>
  );
};

export default Profile;
