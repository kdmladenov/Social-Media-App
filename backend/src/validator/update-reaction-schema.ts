import reactionsEnum from '../constants/reactions.enum.js';

export default {
  reactionName: (value: string) => Object.keys(reactionsEnum).includes(value)
};
