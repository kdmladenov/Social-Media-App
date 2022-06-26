import {
  user as USER,
  post as POST,
  comments as COMMENTS,
  locations as LOCATIONS
} from './constants.js';

export default {
  user: {
    firstName: `Expected a string with length in the range [${USER.MIN_FIRST_NAME_LENGTH}-${USER.MAX_FIRST_NAME_LENGTH}]`,
    lastName: `Expected a string with length in the range [${USER.MIN_LAST_NAME_LENGTH}-${USER.MAX_LAST_NAME_LENGTH}]`,
    email: `Expected valid e-mail a string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    newEmail: `Expected valid e-mail a string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    reenteredNewEmail: `Expected valid e-mail a string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    avatar: `Expected a string path`,
    phone: `Expected a valid phone number`,
    homeCity: `Expected a string with length in the range [${LOCATIONS.MIN_CITY_LENGTH}-${LOCATIONS.MAX_CITY_LENGTH}]`,
    homeCountry: `Expected a string with length in the range [${LOCATIONS.MIN_COUNTRY_LENGTH}-${LOCATIONS.MAX_COUNTRY_LENGTH}]`,
    currentCity: `Expected a string with length in the range [${LOCATIONS.MIN_CITY_LENGTH}-${LOCATIONS.MAX_CITY_LENGTH}]`,
    currentCountry: `Expected a string with length in the range [${LOCATIONS.MIN_COUNTRY_LENGTH}-${LOCATIONS.MAX_COUNTRY_LENGTH}]`,
    aboutMe: `Expected a string with length in the range [${USER.MIN_ABOUT_ME_LENGTH}-${USER.MAX_ABOUT_ME_LENGTH}]`,
    dateOfBirth: `Expected a date in the past`,
    relationshipStatus: `Expected a valid relationship status`,
    role: `Expected a "admin" or "basic" string`,
    gender: `Expected a "Male", "Female" or "Unspecified" string`,
    isDeleted: `Expected a boolean`
  },

  post: {
    userId: `Expected a number`,
    authorId: `Expected a number`,
    message: `Expected valid message string with length in the range [${POST.MIN_MESSAGE_LENGTH}-${POST.MAX_MESSAGE_LENGTH}]`,
    image: `Expected a valid image path string`,
    feelingType: `Expected  a valid feeling type string`,
    city: `Expected a string with length in the range [${LOCATIONS.MIN_CITY_LENGTH}-${LOCATIONS.MAX_CITY_LENGTH}]`,
    country: `Expected a string with length in the range [${LOCATIONS.MIN_COUNTRY_LENGTH}-${LOCATIONS.MAX_COUNTRY_LENGTH}]`,
    isDeleted: `Expected a boolean`
  },
  comment: {
    comment: `Expected valid comment string with length in the range [${COMMENTS.MIN_CONTENT_LENGTH}-${COMMENTS.MAX_CONTENT_LENGTH}]`
  }
};
