import { useMutation } from '@apollo/client';
import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { chakra, useColorModeValue } from '@chakra-ui/system';
import { formatDistance } from 'date-fns';
import gql from 'graphql-tag';
import { useContext } from 'react';
import { myContext } from '../Context';

const Comment = ({ postId, comment }) => {
  const userObj = useContext(myContext);

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      postId,
      commentId: comment.id,
    },
  });
  return (
    <Flex
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={6}
      p={7}
      bg={useColorModeValue('gray.50', 'gray.900')}
      justifyContent={'space-between'}
      position={'relative'}
    >
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}
      >
        <chakra.p fontWeight={'medium'} fontSize={'15px'} pb={2}>
          {comment.body}
        </chakra.p>
        <chakra.p fontWeight={'bold'} fontSize={14} pb={2}>
          @{comment.username}
        </chakra.p>
        <chakra.p color="GrayText" fontSize={14} pb={2}>
          {formatDistance(new Date(comment.createdAt), new Date(), {
            addSuffix: true,
          })}
        </chakra.p>
        {comment.username === userObj.username && (
          <Button
            size="sm"
            w="90px"
            variant="outline"
            colorScheme="red"
            mt={2}
            onClick={deleteComment}
          >
            Delete
          </Button>
        )}
      </Flex>

      <Avatar
        src={comment.userPhoto}
        size="lg"
        alignSelf={'center'}
        m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
      />
    </Flex>
  );
};

export default Comment;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
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
