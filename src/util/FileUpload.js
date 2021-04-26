import imageCompression from 'browser-image-compression';
import axios from 'axios';

export const getImageURl = async file => {
  const compressedImage = await handleImageCompression(file);
  const {
    data: { url },
  } = await axios.get('http://localhost:4000/s3Url');
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: compressedImage,
  });
  return url.split('?')[0];
};

async function handleImageCompression(imageFile) {
  console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    console.log(
      'compressedFile instanceof Blob',
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}
