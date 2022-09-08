import { USER } from '../constants';

const userResetPasswordInitialInputState = {
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
  },
  reenteredPassword: {
    label: 'Re-enter password',
    type: 'password',
    placeholder: 'Re-enter your password ...',
    value: '',
    validations: {
      required: true
    },
    valid: true,
    touched: false
  }
};

export default userResetPasswordInitialInputState;
