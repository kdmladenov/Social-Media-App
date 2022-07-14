import { uploads } from '../constants/constants.js';

export default {
  filename: (value: string) => {
    return (
      typeof value === 'string' &&
      uploads.VALID_FILE_FORMATS.includes(value.slice(value.lastIndexOf('.') + 1))
    );
  },
  size: (value: number) =>
    typeof value === 'number' && value > uploads.MIN_FILE_SIZE && value <= uploads.MAX_FILE_SIZE
};
