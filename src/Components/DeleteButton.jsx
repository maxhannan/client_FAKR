import { useMutation } from '@apollo/client';
import { useRef } from 'react';

import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from '../util/GQLQueries';
import { Button, IconButton } from '@chakra-ui/button';
import { BiTrash } from 'react-icons/bi';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const DeleteButton = ({ postId, commentId, callback }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      onClose();
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const newData = data.getPosts.filter(p => p.id !== postId);

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [...newData] },
      });

      if (callback) callback();
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <IconButton
        size="md"
        aria-label="Add to friends"
        colorScheme="red"
        icon={<BiTrash />}
        onClick={onOpen}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Post?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this post? This operation is final.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" onClick={deletePost} ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
