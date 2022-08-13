import { USER } from '../constants';

const userLoginInitialInputState = {
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
  password: {
    label: 'Password',
    type: 'password',
    placeholder: 'Your password ...',
    value: '',
    validations: {
      required: true,
      format: USER.PASSWORD_REGEX
    },
    valid: true,
    touched: false
  }
};

export default userLoginInitialInputState;
