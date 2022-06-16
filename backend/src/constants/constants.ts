export const user = {
  MIN_FIRST_NAME_LENGTH: 2,
  MAX_FIRST_NAME_LENGTH: 100,
  MIN_LAST_NAME_LENGTH: 2,
  MAX_LAST_NAME_LENGTH: 100,
  MIN_COMPANY_NAME_LENGTH: 2,
  MAX_COMPANY_NAME_LENGTH: 40,
  MIN_EMAIL_LENGTH: 4,
  MAX_EMAIL_LENGTH: 100,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 20,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  PHONE_REGEX: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  DEFAULT_AVATAR: `storage/avatars/defaultAvatar.png`,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // letters, numbers and at least 1 uppercase
  MIN_ABOUT_ME_LENGTH: 10,
  MAX_ABOUT_ME_LENGTH: 1000
};

export const locations = {
  MIN_CITY_LENGTH: 2,
  MAX_CITY_LENGTH: 50,
  MIN_COUNTRY_LENGTH: 2,
  MAX_COUNTRY_LENGTH: 50
};

export const paging = {
  DEFAULT_PAGE: 1,
  MIN_USERS_PAGESIZE: 10,
  MAX_USERS_PAGESIZE: 20,
  DEFAULT_USERS_PAGESIZE: 15,
  MIN_POST_PAGESIZE: 5,
  MAX_POST_PAGESIZE: 50,
  DEFAULT_POST_PAGESIZE: 20,
  MIN_REVIEWS_PAGESIZE: 3,
  MAX_REVIEWS_PAGESIZE: 20,
  DEFAULT_REVIEWS_PAGESIZE: 3,
  MIN_ORDER_PAGESIZE: 5,
  MAX_ORDER_PAGESIZE: 20,
  DEFAULT_ORDER_PAGESIZE: 10,
  MIN_HISTORY_PAGESIZE: 5,
  MAX_HISTORY_PAGESIZE: 50,
  DEFAULT_HISTORY_PAGESIZE: 12,
  MIN_WISH_LIST_PAGESIZE: 5,
  MAX_WISH_LIST_PAGESIZE: 50,
  DEFAULT_WISH_LIST_PAGESIZE: 12,
  MIN_COMMENTS_PAGESIZE: 3,
  MAX_COMMENTS_PAGESIZE: 20,
  DEFAULT_COMMENTS_PAGESIZE: 6
};

export const post = {
  MIN_MESSAGE_LENGTH: 1,
  MAX_MESSAGE_LENGTH: 10000,

  // MIN_NAME_LENGTH: 2,
  // MAX_NAME_LENGTH: 250,
  // MIN_NAME_LENGTH: 2,
  // MAX_NAME_LENGTH: 250,
};

export const uploads = {
  VALID_FILE_FORMATS: ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'webp'],
  MAX_FILE_SIZE: 102400, //   divide by 1000 for KB
  MIN_FILE_SIZE: 0,
  DEFAULT_IMAGE_URL: 'storage/images/defaultImage.png'
};

export const forgotPassword = {
  tokenExpiration: '15m',
  emailService: 'hotmail',
  frontEndPort: 3000
};

export const comments = {
  MIN_CONTENT_LENGTH: 2,
  MAX_CONTENT_LENGTH: 255
};