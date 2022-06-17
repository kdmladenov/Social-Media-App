import { user, locations } from '../constants/constants.js';
import genders from '../constants/genders.enum.js';
import relationshipStatuses from '../constants/relationship-statuses.enum.js';
import rolesEnum from '../constants/roles.enum.js';

export default {
  firstName: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_FIRST_NAME_LENGTH &&
      value.length <= user.MAX_FIRST_NAME_LENGTH),
  lastName: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_LAST_NAME_LENGTH &&
      value.length <= user.MAX_LAST_NAME_LENGTH),
  email: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_EMAIL_LENGTH &&
      value.length <= user.MAX_EMAIL_LENGTH &&
      user.EMAIL_REGEX.test(value)),
  password: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length <= user.MAX_PASSWORD_LENGTH &&
      user.PASSWORD_REGEX.test(value)),
  reenteredPassword: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length <= user.MAX_PASSWORD_LENGTH &&
      user.PASSWORD_REGEX.test(value)),
  phone: (value: string) => !value || (typeof value === 'string' && user.PHONE_REGEX.test(value)),
  avatar: (value: string) => !value || typeof value === 'string',
  role: (value: string) =>
    !value || (typeof value === 'string' && Object.keys(rolesEnum).includes(value)),
  isDeleted: (value: boolean) => !value || typeof value === 'boolean',
  dateOfBirth: (value: string) =>
    !value || (typeof value === 'string' && new Date(value).getTime() < Date.now()),
  about_me: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= user.MIN_ABOUT_ME_LENGTH &&
      value.length <= user.MAX_ABOUT_ME_LENGTH),
  relationshipStatus: (value: string) =>
    !value || Object.keys(relationshipStatuses).includes(value),
  gender: (value: string) => !value || Object.keys(genders).includes(value),
  homeCity: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= locations.MIN_CITY_LENGTH &&
      value.length <= locations.MAX_CITY_LENGTH),
  homeCountry: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= locations.MIN_COUNTRY_LENGTH &&
      value.length <= locations.MAX_COUNTRY_LENGTH),
  currentCity: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= locations.MIN_CITY_LENGTH &&
      value.length <= locations.MAX_CITY_LENGTH),
  currentCountry: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= locations.MIN_COUNTRY_LENGTH &&
      value.length <= locations.MAX_COUNTRY_LENGTH)
};
