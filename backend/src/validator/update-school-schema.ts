import { school as SCHOOL, locations as LOCATIONS } from '../constants/constants.js';

export default {
  schoolName: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= SCHOOL.MIN_SCHOOL_LENGTH &&
      value.length <= SCHOOL.MAX_SCHOOL_LENGTH),
  degree: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= SCHOOL.MIN_DEGREE_LENGTH &&
      value.length <= SCHOOL.MAX_DEGREE_LENGTH),
  schoolType: (value: string) =>
    !value || (typeof value === 'string' && SCHOOL.SCHOOL_TYPES.includes(value)),
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
  startYear: (value: number) =>
    !value || (typeof value === 'number' && new Date().getFullYear() >= value),
  endYear: (value: number) =>
    !value || (typeof value === 'number' && new Date().getFullYear() >= value),
  isDeleted: (value: number) =>
    !value || (typeof value === 'boolean' && !value) || typeof value === 'boolean'
};
