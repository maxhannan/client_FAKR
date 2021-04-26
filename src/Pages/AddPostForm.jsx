import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { Textarea } from '@chakra-ui/textarea';
import { useState } from 'react';

const AddPostForm = () => {
  const [image, setImage] = useState('');
  const testimage = '';
  return (
    <VStack w="full" maxW="container.sm" mb={14}>
      <FormControl id="title">
        <FormLabel>Post Type</FormLabel>
        <Select placeholder="Select option">
          <option value="option1">Project Showcase</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <FormHelperText>Give it a catchy name!</FormHelperText>
      </FormControl>
      <FormControl id="title">
        <FormLabel>Project Title</FormLabel>
        <Input type="text" />
        <FormHelperText>Give it a catchy name!</FormHelperText>
      </FormControl>
      <FormControl id="title">
        <FormLabel>Project Description</FormLabel>
        <Textarea
          size="lg"
          rows="10"
          placeholder="Here is a sample placeholder"
        />
      </FormControl>

      <FormControl id="title">
        <FormLabel>Live Link</FormLabel>
        <Input placeholder="http://www.yourWebsiteHere.com" type="text" />
      </FormControl>
      <FormControl id="title">
        <FormLabel>Github Repo</FormLabel>
        <Input
          placeholder="http://www.github.com/yourUsername/yourRepo"
          type="text"
        />
      </FormControl>
      <FormControl id="title">
        <FormLabel>Project Photo</FormLabel>
        <Button
          onClick={() => {
            if (image.length > 1) {
              setImage('');
              return;
            }
            setImage(testimage);
          }}
        >
          Add a photo
        </Button>
      </FormControl>

      <Image rounded={'5'} w="full" src={image} objectFit="fill" />
      <Button w="full" colorScheme="blue">
        Publish
      </Button>
    </VStack>
  );
};

export default AddPostForm;
