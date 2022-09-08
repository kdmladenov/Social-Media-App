import { POST } from '../constants';

const addPostMessageInitialInputState = {
  message: {
    label: 'Add text',
    type: 'text',
    placeholder: 'Start typing',
    value: '',
    validations: {
      required: true,
      minLength: POST.MIN_MESSAGE_LENGTH,
      maxLength: POST.MAX_MESSAGE_LENGTH
    },
    valid: true,
    touched: false
  }
};
export default addPostMessageInitialInputState;
