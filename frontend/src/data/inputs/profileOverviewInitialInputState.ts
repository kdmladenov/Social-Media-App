import { USER } from '../constants';

const profileOverviewInitialInputState = {
  firstName: {
    label: 'First Name',
    type: 'text',
    placeholder: 'Your first name ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_FIRST_NAME_LENGTH,
      maxLength: USER.MAX_FIRST_NAME_LENGTH
    },
    valid: true,
    touched: false
  },
  lastName: {
    label: 'Last Name',
    type: 'text',
    placeholder: 'Your last name ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_LAST_NAME_LENGTH,
      maxLength: USER.MAX_LAST_NAME_LENGTH
    },
    valid: true,
    touched: false
  },
  email: {
    label: 'Email',
    type: 'email',
    placeholder: 'Your email ...',
    value: '',
    validations: {
      required: true,
      minLength: USER.MIN_EMAIL_LENGTH,
      maxLength: USER.MAX_EMAIL_LENGTH,
      format: USER.EMAIL_REGEX
    },
    valid: true,
    touched: false
  },
  phone: {
    label: 'Phone',
    type: 'tel',
    placeholder: 'Your phone ...',
    value: '',
    validations: {
      required: true,
      format: USER.PHONE_REGEX
    },
    pattern: USER.PHONE_REGEX,
    valid: true,
    touched: false
  }
};
export default profileOverviewInitialInputState;
