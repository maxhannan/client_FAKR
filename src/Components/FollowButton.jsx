import { useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import gql from 'graphql-tag';
import { useContext } from 'react';
import { myContext } from '../Context';
import { GET_CURRENT_USER } from '../util/GQLQueries';

const FollowButton = ({ user }) => {
  const userObj = useContext(myContext);

  const [followUser, { loading }] = useMutation(FOLLOW_MUTATION, {
    variables: {
      username: user.username,
    },
    update(proxy, result) {
      proxy.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          getCurrentUser: {
            following: {
              ...result.data.followUser.following,
            },
          },
        },
      });
    },
  });

  return (
    <Button flex={1} fontSize={'sm'} onClick={followUser} isLoading={loading}>
      {userObj.following.map(follow => follow.username).includes(user.username)
        ? 'Unfollow'
        : 'Follow'}
    </Button>
  );
};

export default FollowButton;

const FOLLOW_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      displayName
      photos
      username
      following {
        displayName
        photos
        username
      }
    }
  }
`;
