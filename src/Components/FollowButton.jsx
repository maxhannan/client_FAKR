import { useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { useContext } from 'react';
import { myContext } from '../Context';
import { FOLLOW_MUTATION, GET_CURRENT_USER } from '../util/GQLQueries';

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
  const isFollowing = userObj.following
    .map(follow => follow.username)
    .includes(user.username);
  return (
    <Button
      flex={1}
      fontSize={'sm'}
      onClick={followUser}
      isLoading={loading}
      colorScheme={isFollowing ? 'red' : 'green'}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
