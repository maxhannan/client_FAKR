import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useMutation, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Image } from '@chakra-ui/image';
import { Link as RouterLink } from 'react-router-dom';

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
    <ButtonGroup size="md" colorScheme="red" isAttached variant="outline">
      <IconButton
        aria-label="Add to friends"
        onClick={likePost}
        icon={liked ? <BsHeartFill /> : <BsHeart />}
      />
      {likes.length > 0 ? (
        <Menu>
          <MenuButton fontFamily={'monospace'} as={Button} mr="-px">
            {likeCount}
          </MenuButton>
          <MenuList>
            {likes.map(like => (
              <MenuItem
                fontFamily={'monospace'}
                fontSize="md"
                minH="40px"
                as={RouterLink}
                to={`/profile/${like.username}`}
              >
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  objectFit="cover"
                  src={like.userPhoto}
                  alt={like.username}
                  mr="12px"
                />
                <span>@{like.username}</span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Button mr="-px">{likeCount}</Button>
      )}
    </ButtonGroup>
  );
};

export default LikeButton;

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        createdAt
        userPhoto
        username
      }
      likeCount
    }
  }
`;
