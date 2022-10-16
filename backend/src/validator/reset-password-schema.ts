import { user } from '../constants/constants.js';

export default {
  password: (value: string) => user.PASSWORD_REGEX.test(value),
  reenteredPassword: (value: string) => user.PASSWORD_REGEX.test(value)
};
