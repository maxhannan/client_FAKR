import { useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Divider, Flex, Heading } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import gql from 'graphql-tag';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import Comment from './Comment';

const Comments = ({ post }) => {
  const [comment, setComment] = useState();

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
    },
    variables: {
      postId: post.id,
      body: comment,
    },
  });

  return (
    <>
      <Flex w="100%" align="center" justify="space-between">
        <Heading fontSize="2xl">Comments</Heading>
      </Flex>
      <Divider />
      <FormControl id="body">
        <Textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          name="body"
          size="lg"
          rows="3"
          placeholder="Here is a sample comment..."
        />
      </FormControl>
      <Flex w="100%" align="center" justify="flex-end">
        <Button
          onClick={submitComment}
          w="full"
          mb={4}
          rightIcon={<FiSend />}
          colorScheme="red"
          variant="outline"
        >
          Comment
        </Button>
      </Flex>
      {post.comments.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </>
  );
};

export default Comments;
const SUBMIT_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        createdAt
        username
        body
        userPhoto
      }
      commentCount
    }
  }
`;
