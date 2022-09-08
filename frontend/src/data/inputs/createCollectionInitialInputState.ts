import { COLLECTION } from '../constants';

const createCollectionInitialInputState = {
  collection: {
    label: 'Create Collection Name',
    type: 'text',
    placeholder: 'Give your collection a name ...',
    value: '',
    validations: {
      required: true,
      minLength: COLLECTION.MIN_COLLECTION_LENGTH,
      maxLength: COLLECTION.MAX_COLLECTION_LENGTH
    },
    valid: true,
    touched: false
  }
};
export default createCollectionInitialInputState;
