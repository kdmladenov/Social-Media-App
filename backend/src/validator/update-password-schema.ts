import { user } from '../constants/constants.js';

export default {
  currentPassword: (value: string) =>
    typeof value === 'string' &&
    value.length <= user.MAX_PASSWORD_LENGTH &&
    user.PASSWORD_REGEX.test(value),
  password: (value: string) =>
    typeof value === 'string' &&
    value.length <= user.MAX_PASSWORD_LENGTH &&
    user.PASSWORD_REGEX.test(value),
  reenteredPassword: (value: string) =>
    typeof value === 'string' &&
    value.length <= user.MAX_PASSWORD_LENGTH &&
    user.PASSWORD_REGEX.test(value),
  userId: (value: number) => !value || (typeof value === 'number' && value > 0)
};
