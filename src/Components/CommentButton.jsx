import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useEffect, useState } from 'react';
import { FaComments, FaRegComments } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const CommentButton = ({
  history,
  user,
  post: { id, commentCount, comments },
}) => {
  const [commented, setCommented] = useState(false);

  useEffect(() => {
    console.log({ id, commentCount, comments });
    if (user && comments.find(comment => comment.username === user.username)) {
      setCommented(true);
    } else setCommented(false);
  }, [user, comments]);
  let userNames = [];
  let addedUsers = [];
  comments.forEach(comment => {
    if (addedUsers.includes(comment.username)) {
      return;
    } else {
      addedUsers.push(comment.username);
      userNames.push({ user: comment.username, photo: comment.userPhoto });
    }
  });

  const navigate = () => {
    history.push(`/post/${id}`);
  };
  return (
    <ButtonGroup size="md" isAttached variant="outline">
      <IconButton
        onClick={navigate}
        aria-label="Add to friends"
        icon={
          commented ? (
            <FaComments style={{ animation: 'appear 500ms ease' }} />
          ) : (
            <FaRegComments style={{ animation: 'disappear 500ms ease' }} />
          )
        }
      />
      {comments.length > 0 ? (
        <Menu>
          <MenuButton as={Button} mr="-px">
            {commentCount}
          </MenuButton>
          <MenuList>
            {userNames.map(username => (
              <MenuItem
                fontSize="md"
                minH="40px"
                // as={RouterLink}
                // to={`/profile/${like.username}`}
              >
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  objectFit="cover"
                  src={username.photo}
                  alt={username}
                  mr="12px"
                />
                <span>@{username.user}</span>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Button mr="-px">{commentCount}</Button>
      )}
    </ButtonGroup>
  );
};

export default CommentButton;
