import { user } from '../constants/constants.js';

export default {
  firstName: (value: string) =>
    typeof value === 'string' &&
    value.length >= user.MIN_FIRST_NAME_LENGTH &&
    value.length <= user.MAX_FIRST_NAME_LENGTH,
  lastName: (value: string) =>
    typeof value === 'string' &&
    value.length >= user.MIN_LAST_NAME_LENGTH &&
    value.length <= user.MAX_LAST_NAME_LENGTH,
  email: (value: string) =>
    typeof value === 'string' &&
    value.length >= user.MIN_EMAIL_LENGTH &&
    value.length <= user.MAX_EMAIL_LENGTH &&
    user.EMAIL_REGEX.test(value),
  password: (value: string) =>
    typeof value === 'string' &&
    value.length <= user.MAX_PASSWORD_LENGTH &&
    user.PASSWORD_REGEX.test(value),
  reenteredPassword: (value: string) =>
    typeof value === 'string' &&
    value.length <= user.MAX_PASSWORD_LENGTH &&
    user.PASSWORD_REGEX.test(value)
};
