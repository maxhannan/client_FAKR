import { Flex, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { useQuery, gql } from '@apollo/client';

const Feed = () => {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (error) return <p>{error}</p>;

  return (
    <Flex height="90vh" align="center" justify="center">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Text fontSize="5xl">
          {' '}
          {data ? data.getCurrentUser.username : ''}'s feed
        </Text>
      )}
    </Flex>
  );
};
const TEST_QUERY = gql`
  query {
    getCurrentUser {
      id
      githubID
      twitterID
      displayName
      photos
      username
    }
  }
`;

export default Feed;
