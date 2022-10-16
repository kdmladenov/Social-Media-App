import { user } from '../constants/constants.js';

export default {
  email: (value: string) => user.EMAIL_REGEX.test(value)
};
