import { useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Divider, Flex, Heading, VStack } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import Comment from './Comment';
import { SUBMIT_COMMENT_MUTATION } from '../util/GQLQueries';

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
        <Button onClick={submitComment} w="full" mb={4} rightIcon={<FiSend />}>
          Comment
        </Button>
      </Flex>
      <VStack w="full">
        {post.comments.map(comment => (
          <Comment postId={post.id} comment={comment} key={comment.id} />
        ))}
      </VStack>
    </>
  );
};

export default Comments;
