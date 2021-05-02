/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useEffect, useState } from 'react';
import { FaComments, FaRegComments } from 'react-icons/fa';

const CommentButton = ({
  history,
  user,
  post: { id, commentCount, comments },
}) => {
  const [commented, setCommented] = useState(false);

  useEffect(() => {
    if (user && comments.find(comment => comment.username === user.username)) {
      setCommented(true);
    } else setCommented(false);
  }, [user, comments]);

  // creates list of unique users for comment btn list
  const uniqueUsername = Array.from(new Set(comments.map(c => c.username))).map(
    username => {
      return comments.find(c => c.username === username);
    }
  );

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
            <FaComments animation="appear 500ms ease" />
          ) : (
            <FaRegComments animation="disappear 500ms ease" />
          )
        }
      />
      {comments.length > 0 ? (
        <Menu>
          <MenuButton as={Button} mr="-px">
            {commentCount}
          </MenuButton>
          <MenuList>
            {uniqueUsername.map(user => (
              <MenuItem fontSize="md" minH="40px">
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  objectFit="cover"
                  src={user.userPhoto}
                  alt={user.username}
                  mr="12px"
                />
                <span>@{user.username}</span>
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
