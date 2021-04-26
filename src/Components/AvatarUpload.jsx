import { Avatar } from '@chakra-ui/avatar';
import { Flex } from '@chakra-ui/layout';
import FileUploadButton from './FileUploadButton';
const AvatarUpload = ({ fileUrl, setFileUrl }) => {
  return (
    <Flex alignItems="center" justifyContent="space-around">
      <Avatar size="lg" src={fileUrl} />
      <FileUploadButton setFileUrl={setFileUrl} />
    </Flex>
  );
};

export default AvatarUpload;
