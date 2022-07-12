import { USER, LOCATIONS, WORKPLACE, SCHOOL } from '../constants/constants';
import genders from '../constants/genders';
import relationshipStatuses from '../constants/relationship-statuses';
import rolesEnum from '../constants/roles.enum';

const validate = {
  firstName: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= USER.MIN_FIRST_NAME_LENGTH &&
      value.length <= USER.MAX_FIRST_NAME_LENGTH),
  lastName: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= USER.MIN_LAST_NAME_LENGTH &&
      value.length <= USER.MAX_LAST_NAME_LENGTH),
  email: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= USER.MIN_EMAIL_LENGTH &&
      value.length <= USER.MAX_EMAIL_LENGTH &&
      USER.EMAIL_REGEX.test(value)),
  reenteredEmail: (value: string, match?: string) => value === match,
  password: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length <= USER.MAX_PASSWORD_LENGTH &&
      USER.PASSWORD_REGEX.test(value)),
  reenteredPassword: (value: string, match?: string) => value === match,
  phone: (value: string) => !value || (typeof value === 'string' && USER.PHONE_REGEX.test(value)),
  avatar: (value: string) => !value || typeof value === 'string',
  cover: (value: string) => !value || typeof value === 'string',
  role: (value: string) =>
    !value || (typeof value === 'string' && Object.keys(rolesEnum).includes(value)),
  isDeleted: (value: boolean) => !value || typeof value === 'boolean',
  dateOfBirth: (value: string) =>
    !value || (typeof value === 'string' && new Date(value).getTime() < Date.now()),
  aboutMe: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= USER.MIN_ABOUT_ME_LENGTH &&
      value.length <= USER.MAX_ABOUT_ME_LENGTH),
  relationshipStatus: (value: string) => !value || relationshipStatuses.includes(value),
  gender: (value: string) => !value || genders.includes(value),
  homeCity: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= LOCATIONS.MIN_CITY_LENGTH &&
      value.length <= LOCATIONS.MAX_CITY_LENGTH),
  homeCountry: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= LOCATIONS.MIN_COUNTRY_LENGTH &&
      value.length <= LOCATIONS.MAX_COUNTRY_LENGTH),
  currentCity: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= LOCATIONS.MIN_CITY_LENGTH &&
      value.length <= LOCATIONS.MAX_CITY_LENGTH),
  currentCountry: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= LOCATIONS.MIN_COUNTRY_LENGTH &&
      value.length <= LOCATIONS.MAX_COUNTRY_LENGTH),
  companyName: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= WORKPLACE.MIN_COMPANY_NAME_LENGTH &&
      value.length <= WORKPLACE.MAX_COMPANY_NAME_LENGTH),
  position: (value: string) =>
    !value ||
    (typeof value === 'string' &&
      value.length >= WORKPLACE.MIN_POSITION_LENGTH &&
      value.length <= WORKPLACE.MAX_POSITION_LENGTH),
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
  startDate: (value: string) =>
    !value || (typeof value === 'string' && new Date() >= new Date(value)),
  endDate: (value: string) =>
    !value || (typeof value === 'string' && new Date() >= new Date(value)),
  schoolName: (value: string) =>
    typeof value === 'string' &&
    value.length >= SCHOOL.MIN_SCHOOL_LENGTH &&
    value.length <= SCHOOL.MAX_SCHOOL_LENGTH,
  degree: (value: string) =>
    typeof value === 'string' &&
    value.length >= SCHOOL.MIN_DEGREE_LENGTH &&
    value.length <= SCHOOL.MAX_DEGREE_LENGTH,
  schoolType: (value: string) => typeof value === 'string' && SCHOOL.SCHOOL_TYPES.includes(value),
  startYear: (value: string) => typeof value === 'string' && new Date().getFullYear() >= +value,
  endYear: (value: string) =>
    !value ||
    (typeof value === 'string' && typeof value === 'string' && new Date().getFullYear() >= +value)
};

const validateInputUser = {
  firstName: (value: string) => {
    if (!validate.firstName(value)) {
      return ` must be between ${USER.MIN_FIRST_NAME_LENGTH} and ${USER.MAX_FIRST_NAME_LENGTH} characters`;
    }
    return '';
  },

  lastName: (value: string) => {
    if (!validate.lastName(value)) {
      return ` must be between ${USER.MIN_LAST_NAME_LENGTH} and ${USER.MAX_LAST_NAME_LENGTH} characters`;
    }
    return '';
  },
  email: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.email(value)) {
      return ' must be valid';
    }
    return '';
  },

  reenteredEmail: (value: string, match?: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.reenteredEmail(value, match)) {
      return ' does not match';
    }
    return '';
  },

  password: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.password(value)) {
      return ` must include ${USER.MIN_PASSWORD_LENGTH} - ${USER.MAX_PASSWORD_LENGTH} letters, numbers and at least 1 uppercase`;
    }

    return '';
  },

  reenteredPassword: (value: string, match?: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.reenteredPassword(value, match)) {
      return ' does not match';
    }
    return '';
  },

  phone: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.phone(value)) {
      return ' must be in the format (XXX) XXX-XXXX';
    }
    return '';
  },

  avatar: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.avatar(value)) {
      return ` must be a png, jpg or jpeg file, or a photo image URL string`;
    }
    return '';
  },

  cover: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.cover(value)) {
      return ` must be a png, jpg or jpeg file, or a photo image URL string`;
    }
    return '';
  },

  dateOfBirth: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.dateOfBirth(value)) {
      return ` must be a date string in the past`;
    }
    return '';
  },

  aboutMe: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.aboutMe(value)) {
      return ` must be between ${USER.MIN_ABOUT_ME_LENGTH} and ${USER.MAX_ABOUT_ME_LENGTH} characters`;
    }
    return '';
  },
  relationshipStatus: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.relationshipStatus(value)) {
      return ` must be valid relationship status`;
    }
    return '';
  },
  gender: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.gender(value)) {
      return ` must be a male or female string`;
    }
    return '';
  },
  homeCity: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.homeCity(value)) {
      return ` must be between ${LOCATIONS.MIN_CITY_LENGTH} and ${LOCATIONS.MAX_CITY_LENGTH} characters`;
    }
    return '';
  },
  homeCountry: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.homeCountry(value)) {
      return ` must be between ${LOCATIONS.MIN_COUNTRY_LENGTH} and ${LOCATIONS.MAX_COUNTRY_LENGTH} characters`;
    }
    return '';
  },
  currentCity: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.currentCity(value)) {
      return ` must be between ${LOCATIONS.MIN_CITY_LENGTH} and ${LOCATIONS.MAX_CITY_LENGTH} characters`;
    }
    return '';
  },
  currentCountry: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.currentCountry(value)) {
      return ` must be between ${LOCATIONS.MIN_COUNTRY_LENGTH} and ${LOCATIONS.MAX_COUNTRY_LENGTH} characters`;
    }
    return '';
  },
  companyName: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.companyName(value)) {
      return ` must be between ${WORKPLACE.MIN_COMPANY_NAME_LENGTH} and ${WORKPLACE.MAX_COMPANY_NAME_LENGTH} characters`;
    }
    return '';
  },
  position: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.companyName(value)) {
      return ` must be between ${WORKPLACE.MIN_POSITION_LENGTH} and ${WORKPLACE.MAX_POSITION_LENGTH} characters`;
    }
    return '';
  },
  city: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.city(value)) {
      return ` must be between ${LOCATIONS.MIN_CITY_LENGTH} and ${LOCATIONS.MAX_CITY_LENGTH} characters`;
    }
    return '';
  },
  country: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.country(value)) {
      return ` must be between ${LOCATIONS.MIN_COUNTRY_LENGTH} and ${LOCATIONS.MAX_COUNTRY_LENGTH} characters`;
    }
    return '';
  },
  startDate: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.startDate(value)) {
      return ` must be a date in the past`;
    }
    return '';
  },
  endDate: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.endDate(value)) {
      return ` must be a date in the past`;
    }
    return '';
  },
  schoolName: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.schoolName(value)) {
      return ` must be between ${SCHOOL.MIN_SCHOOL_LENGTH} and ${SCHOOL.MAX_SCHOOL_LENGTH} characters`;
    }
    return '';
  },
  degree: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.degree(value)) {
      return ` must be between ${SCHOOL.MIN_DEGREE_LENGTH} and ${SCHOOL.MAX_DEGREE_LENGTH} characters`;
    }
    return '';
  },
  schoolType: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.schoolType(value)) {
      return ` must be one of the following ${SCHOOL.SCHOOL_TYPES} school types`;
    }
    return '';
  },
  startYear: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.startYear(value)) {
      return ` must be a date in the past`;
    }
    return '';
  },
  endYear: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.endYear(value)) {
      return ` must be a date in the past`;
    }
    return '';
  }
};

export default validateInputUser;
