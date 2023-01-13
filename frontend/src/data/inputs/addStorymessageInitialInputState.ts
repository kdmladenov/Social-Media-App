import { STORY as story } from '../constants';

const addStoryMessageInitialInputState = {
  message: {
    label: 'Add text',
    type: 'text',
    placeholder: 'Start Typing ...',
    value: '',
    validations: {
      required: true,
      minLength: story.MIN_MESSAGE_LENGTH,
      maxLength: story.MAX_MESSAGE_LENGTH
    },
    valid: true,
    touched: false
  },
  messageSize: {
    type: 'range',
    label: 'Select Size',
    max: story.MAX_MESSAGE_SIZE,
    min: story.MIN_MESSAGE_SIZE,
    step: story.MESSAGE_SIZE_STEP,
    placeholder: 'Select Size ...',
    value: '25',
    validations: {
      required: false,
      minValue: story.MIN_MESSAGE_SIZE,
      maxValue: story.MAX_MESSAGE_SIZE
    },
    valid: true,
    touched: false
  },
  messageColor: {
    formElement: 'select',
    label: 'Text Color',
    options: story.MESSAGE_COLORS.map((color) => ({
      label: `${color}`,
      value: `${color}`
    })),
    placeholder: 'Color ...',
    value: 'white',
    validations: {
      required: false
    },
    valid: true,
    touched: false
  },
  messageBackground: {
    formElement: 'select',
    label: 'Background',
    options: story.MESSAGE_BACKGROUNDS.map((bgColor) => ({
      label: `${bgColor}`,
      value: `${bgColor}`
    })),
    placeholder: 'Background ...',
    value: 'transparent',
    validations: {
      required: false
    },
    valid: true,
    touched: false
  }
};
export default addStoryMessageInitialInputState;
