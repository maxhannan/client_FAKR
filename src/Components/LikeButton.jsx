/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Image } from '@chakra-ui/image';
import { Link as RouterLink } from 'react-router-dom';
import { LIKE_POST_MUTATION } from '../util/GQLQueries';

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    console.log({ id, likeCount, likes });
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  return (
    <ButtonGroup size="md" isAttached variant="outline">
      <IconButton
        aria-label="Add to friends"
        onClick={likePost}
        icon={
          liked ? (
            <BsHeartFill
              color="#E53E3E"
              style={{ animation: 'appear 500ms ease' }}
            />
          ) : (
            <BsHeart style={{ animation: 'disappear 500ms ease' }} />
          )
        }
      />
      {likes.length > 0 ? (
        <Menu>
          <MenuButton as={Button} mr="-px">
            {likeCount}
          </MenuButton>
          <MenuList>
            {likes.map(like => (
              <MenuItem
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
