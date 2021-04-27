import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useMutation, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  return (
    <ButtonGroup size="md" colorScheme="blue" isAttached variant="outline">
      <IconButton
        aria-label="Add to friends"
        onClick={likePost}
        icon={liked ? <BsHeartFill /> : <BsHeart />}
      />
      <Button mr="-px">{likeCount}</Button>
    </ButtonGroup>
  );
};

export default LikeButton;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
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
