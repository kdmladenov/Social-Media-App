import { MAX_FILE_SIZE, MIN_FILE_SIZE } from '../data/constants';

export const validateSelectedFile = (
  selectedFile: File,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const fileSizeKiloBytes = selectedFile.size / 1024;

  if (fileSizeKiloBytes < MIN_FILE_SIZE) {
    setMessage(`The file size is less than ${MIN_FILE_SIZE/1024} MB`);
    return false;
  }
  if (fileSizeKiloBytes > MAX_FILE_SIZE) {
    setMessage(`The file size is larger than ${MAX_FILE_SIZE / 1024} MB`);
    return false;
  }
  return true;
};
