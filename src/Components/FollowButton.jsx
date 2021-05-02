import { useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import gql from 'graphql-tag';

const FollowButton = ({ user, following, setFollowing }) => {
  const [followUser] = useMutation(FOLLOW_MUTATION, {
    variables: {
      username: user.username,
    },
  });

  const nav = () => {
    if (following.includes(user.username)) {
      setFollowing(following.filter(follow => follow !== user.username));
    } else {
      setFollowing([...following, user.username]);
    }
    followUser();
  };

  return (
    <Button flex={1} fontSize={'sm'} onClick={nav}>
      {following.includes(user.username) ? 'Unfollow' : 'Follow'}
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
