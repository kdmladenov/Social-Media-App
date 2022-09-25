import {
  user as USER,
  post as POST,
  comments as COMMENTS,
  locations as LOCATIONS,
  school as SCHOOL,
  workplace as WORKPLACE,
  collection
} from './constants.js';
import reactionsEnum from './reactions.enum.js';

export default {
  user: {
    firstName: `Expected a string with length in the range [${USER.MIN_FIRST_NAME_LENGTH}-${USER.MAX_FIRST_NAME_LENGTH}]`,
    lastName: `Expected a string with length in the range [${USER.MIN_LAST_NAME_LENGTH}-${USER.MAX_LAST_NAME_LENGTH}]`,
    email: `Expected valid e-mail a string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    newEmail: `Expected valid e-mail a string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    reenteredNewEmail: `Expected valid e-mail a string with length in the range [${USER.MIN_EMAIL_LENGTH}-${USER.MAX_EMAIL_LENGTH}]`,
    avatar: `Expected a string path`,
    cover: `Expected a string path`,
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
    content: `Expected valid comment string with length in the range [${COMMENTS.MIN_CONTENT_LENGTH}-${COMMENTS.MAX_CONTENT_LENGTH}]`,
    replyTo: `Expected a number`
  },

  reaction: {
    reactionName: `Expected valid reaction from ${Object.keys(reactionsEnum)}]`
  },

  school: {
    schoolName: `Expected valid school name string with length in the range [${SCHOOL.MIN_SCHOOL_LENGTH}-${SCHOOL.MAX_SCHOOL_LENGTH}]`,
    degree: `Expected valid degree string with length in the range [${SCHOOL.MIN_DEGREE_LENGTH}-${SCHOOL.MAX_DEGREE_LENGTH}]`,
    schoolType: `Expected valid schoolType string from ${SCHOOL.SCHOOL_TYPES}`,
    city: `Expected a string with length in the range [${LOCATIONS.MIN_CITY_LENGTH}-${LOCATIONS.MAX_CITY_LENGTH}]`,
    country: `Expected a string with length in the range [${LOCATIONS.MIN_COUNTRY_LENGTH}-${LOCATIONS.MAX_COUNTRY_LENGTH}]`,
    startYear: `Expected a start year from the past`,
    endYear: `Expected a end year from the past`
  },

  workplace: {
    workplaceName: `Expected valid workplace name string with length in the range [${WORKPLACE.MIN_COMPANY_NAME_LENGTH}-${WORKPLACE.MAX_COMPANY_NAME_LENGTH}]`,
    position: `Expected valid position string with length in the range [${WORKPLACE.MIN_POSITION_LENGTH}-${WORKPLACE.MAX_POSITION_LENGTH}]`,
    city: `Expected a string with length in the range [${LOCATIONS.MIN_CITY_LENGTH}-${LOCATIONS.MAX_CITY_LENGTH}]`,
    country: `Expected a string with length in the range [${LOCATIONS.MIN_COUNTRY_LENGTH}-${LOCATIONS.MAX_COUNTRY_LENGTH}]`,
    startDate: `Expected a start date from the past`,
    endDate: `Expected a end date from the past`
  },

  savedPost: {
    collection: `Expected valid collection string with length in the range [${collection.MIN_MESSAGE_LENGTH}-${collection.MAX_MESSAGE_LENGTH}]`
  },
  postImages: {
    images: `Expected valid array of image strings `
  }
};
