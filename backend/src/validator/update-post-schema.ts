import { post as POST, locations as LOCATIONS } from '../constants/constants.js';
import feelingTypes from '../constants/feeling-types.enum.js';

export default {
  userId: (value: number) => !value || typeof value === 'number',
  authorId: (value: number) => !value || typeof value === 'number',
  message: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= POST.MIN_MESSAGE_LENGTH &&
      value.length <= POST.MAX_MESSAGE_LENGTH),
  image: (value: string) => !value || typeof value === 'string',
  feelingType: (value: string) =>
    !value || (typeof value === 'string' && Object.keys(feelingTypes).includes(value)),
  city: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= LOCATIONS.MIN_CITY_LENGTH &&
      value.length <= LOCATIONS.MAX_CITY_LENGTH),
  country: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= LOCATIONS.MIN_COUNTRY_LENGTH &&
      value.length <= LOCATIONS.MAX_COUNTRY_LENGTH),
  isDeleted: (value: boolean) => !value || typeof value === 'boolean'
};
