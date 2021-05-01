import { Avatar } from '@chakra-ui/avatar';
import { Flex } from '@chakra-ui/layout';
import { chakra, useColorModeValue } from '@chakra-ui/system';
import { formatDistance } from 'date-fns';

const Comment = ({ comment }) => {
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
        <chakra.p fontWeight={'bold'} fontSize={14}>
          @{comment.username}
        </chakra.p>
        <chakra.p color="GrayText" fontSize={14}>
          {formatDistance(new Date(comment.createdAt), new Date(), {
            addSuffix: true,
          })}
        </chakra.p>
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
