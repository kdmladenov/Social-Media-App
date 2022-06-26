import { comments } from '../constants/constants.js';

export default {
  replyTo: (value: number) => !value || typeof value === 'number',
  content: (value: string) =>
    typeof value === 'string' &&
    value.length >= comments.MIN_CONTENT_LENGTH &&
    value.length <= comments.MAX_CONTENT_LENGTH
};
