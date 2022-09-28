import { collection as COLLECTION } from '../constants/constants.js';

export default {
  collection: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= COLLECTION.MIN_MESSAGE_LENGTH &&
      value.length <= COLLECTION.MAX_MESSAGE_LENGTH)
};
