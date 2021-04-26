import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { useRef, useState } from 'react';

import { getImageURl } from '../util/AuthFunctions';

const FileUploadButton = ({ fileUrl, setFileUrl }) => {
  const fileInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async event => {
    setLoading(true);
    const file = event.target.files[0];
    if (file.name) {
      const imageUrl = await getImageURl(file);
      await setFileUrl(imageUrl);
    }
    setLoading(false);
  };

  return (
    <>
      <input
        ref={fileInput}
        onChange={handleFileUpload}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        multiple={false}
      />
      <Flex alignItems="center" justifyContent="space-around">
        <Avatar size="lg" src={fileUrl} />
        <Button isLoading={loading} onClick={() => fileInput.current.click()}>
          Upload Profile Picture
        </Button>
      </Flex>
    </>
  );
};

export default FileUploadButton;
