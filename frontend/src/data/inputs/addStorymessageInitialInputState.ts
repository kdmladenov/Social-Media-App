import { STORY } from '../constants';

const addStoryMessageInitialInputState = {
  message: {
    label: 'Add text',
    type: 'text',
    placeholder: 'Start typing',
    value: '',
    validations: {
      required: true,
      minLength: STORY.MIN_MESSAGE_LENGTH,
      maxLength: STORY.MAX_MESSAGE_LENGTH
    },
    valid: true,
    touched: false
  }
};
export default addStoryMessageInitialInputState;
