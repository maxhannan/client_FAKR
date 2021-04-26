import { gql, useQuery } from '@apollo/client';

import { Spinner } from '@chakra-ui/react';
import { Center } from '@chakra-ui/layout';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import PostCard from '../Components/PostCard';
import { useContext } from 'react';
import { myContext } from '../Context';

const Profile = () => {
  const userObj = useContext(myContext);
  const { loading, error, data: { getPostsByUser: posts } = {} } = useQuery(
    GET_POSTS_BY_USER,
    {
      variables: {
        username: userObj.username,
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

  if (posts) console.log(posts);

  return (
    <ResponsiveMasonry
      style={{ width: '100%' }}
      columnsCountBreakPoints={{ 350: 1, 850: 2, 1100: 3 }}
    >
      <Masonry gutter="20px">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default Profile;

const GET_POSTS_BY_USER = gql`
  query getPostsByUser($username: String!) {
    getPostsByUser(username: $username) {
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