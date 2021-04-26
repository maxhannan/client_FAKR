import { useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import gql from 'graphql-tag';
import { useState } from 'react';
import FileUploadButton from '../Components/FileUploadButton';
import { FETCH_POSTS_QUERY } from '../util/GQLQueries';
import { useForm } from '../util/useForm';

const AddPostForm = ({ history }) => {
  const [fileURL, setFileURL] = useState('');

  const handleSubmit = () => {
    createPostCB();
    if (error) console.log(error);
    history.push('/feed');
  };

  const { onSubmit, handleChange, values } = useForm(handleSubmit, {
    title: '',
    body: '',
    liveLink: '',
    repoLink: '',
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      postType: 'Project Showcase',
      title: values.title,
      body: values.body,
      liveLink: values.liveLink,
      repoLink: values.repoLink,
      photoURL: fileURL,
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = '';
    },
    onError(err) {
      return err;
    },
  });
  function createPostCB() {
    createPost();
  }
  return (
    <VStack w="full" maxW="container.sm">
      <FormControl id="title">
        <FormLabel>Project Title</FormLabel>
        <Input
          name="title"
          value={values.title}
          onChange={handleChange}
          type="text"
        />
        <FormHelperText>Give it a catchy name!</FormHelperText>
      </FormControl>

      <FormControl id="title">
        <FileUploadButton
          width="full"
          text="Upload a Picture"
          setFileUrl={setFileURL}
        />
      </FormControl>
      <Image rounded={'5'} w="full" src={fileURL} objectFit="cover" />
      <FormControl id="body">
        <FormLabel>Project Description</FormLabel>
        <Textarea
          name="body"
          value={values.body}
          onChange={handleChange}
          size="lg"
          rows="10"
          placeholder="Here is a sample placeholder"
        />
      </FormControl>

      <FormControl id="title">
        <FormLabel>Live Link</FormLabel>
        <Input
          name="liveLink"
          value={values.liveLink}
          onChange={handleChange}
          placeholder="http://www.yourWebsiteHere.com"
          type="text"
        />
      </FormControl>
      <FormControl id="repoLink">
        <FormLabel>Github Repo</FormLabel>
        <Input
          name="repoLink"
          value={values.repoLink}
          onChange={handleChange}
          placeholder="http://www.github.com/yourUsername/yourRepo"
          type="text"
        />
      </FormControl>
      <Button w="full" onClick={onSubmit} colorScheme="blue">
        Publish
      </Button>
    </VStack>
  );
};

export default AddPostForm;

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $postType: String!
    $title: String!
    $body: String!
    $liveLink: String!
    $repoLink: String!
    $photoURL: String!
  ) {
    createPost(
      postType: $postType
      title: $title
      body: $body
      liveLink: $liveLink
      repoLink: $repoLink
      photoURL: $photoURL
    ) {
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
