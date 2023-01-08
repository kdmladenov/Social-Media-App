import { workplace as WORKPLACE, locations as LOCATIONS } from '../constants/constants.js';

export default {
  companyName: (value: string) =>
    typeof value === 'string' &&
    value.length >= WORKPLACE.MIN_COMPANY_NAME_LENGTH &&
    value.length <= WORKPLACE.MAX_COMPANY_NAME_LENGTH,
  position: (value: string) =>
    typeof value === 'string' &&
    value.length >= WORKPLACE.MIN_POSITION_LENGTH &&
    value.length <= WORKPLACE.MAX_POSITION_LENGTH,
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
  startDate: (value: string) => typeof value === 'string' && new Date() >= new Date(value),
  endDate: (value: string) =>
    !value || (typeof value === 'string' && new Date() >= new Date(value)),
  isDeleted: (value: number) =>
    !value || (typeof value === 'boolean' && !value) || typeof value === 'boolean'
};
