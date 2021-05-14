import { Button, ButtonGroup } from '@chakra-ui/button';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import FAB from './FAB';

const PostsFeed = ({ children }) => {
  return (
    <>
      <ResponsiveMasonry
        style={{ width: '100%', marginBottom: '80px' }}
        columnsCountBreakPoints={{ 350: 1, 800: 2, 1100: 3 }}
      >
        <Masonry gutter="20px">{children}</Masonry>
      </ResponsiveMasonry>
      <FAB />
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button colorScheme="red">1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup>
    </>
  );
};

export default PostsFeed;
