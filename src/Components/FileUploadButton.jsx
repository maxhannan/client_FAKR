import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { useRef, useState } from 'react';

import { getImageURl } from '../util/FileUpload';

const FileUploadButton = ({
  setFileUrl,
  width = '',
  text = 'Upload Profile Picture',
}) => {
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

      <Button
        w={width}
        isLoading={loading}
        onClick={() => fileInput.current.click()}
      >
        {text}
      </Button>
    </>
  );
};

export default FileUploadButton;
