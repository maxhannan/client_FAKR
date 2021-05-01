import { Button } from '@chakra-ui/button';
import { Circle } from '@chakra-ui/layout';
import { RiQuillPenLine } from 'react-icons/ri';

const FAB = ({ history }) => {
  return (
    <Circle
      position="fixed"
      bottom="10"
      right="30px"
      size="70px"
      opacity=".8"
      colorScheme="red"
      color="white"
      as={Button}
      onClick={() => history.push('/create')}
      _hover={{ opacity: '1', transform: 'scale(1.2)' }}
    >
      <RiQuillPenLine size="50px" />
    </Circle>
  );
};

export default FAB;
