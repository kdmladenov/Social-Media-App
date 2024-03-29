export const BASE_URL = 'http://localhost:5555';

export const STORE_NAME = 'MyShop';

export const GOOGLE_DRIVE_PUBLIC_URL = 'https://drive.google.com/uc?export=view&id=';
export const MIN_FILE_SIZE = 10.24; // 0.01MB
export const MAX_FILE_SIZE = 5120; // 5MB

export const DEFAULT_UPLOAD_PHOTO_MESSAGE = `(${MIN_FILE_SIZE / 1024}-${
  MAX_FILE_SIZE / 1024
} MB size limit)`;

// History
export const MIN_HISTORY_LIST_COUNT = 3;

// SearchBar
export const PREVIOUS_SEARCHES_ARRAY_MAX_LENGTH = 5;

// Slider
export const SLIDER_IMAGE_1 = 'https://m.media-amazon.com/images/I/61lJ3xlQX2L._SX3000_.jpg';

// Logo
export const LOGO_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNqlwu8zxTt1fy6b2lZrYnQVUTTba15IX8Q&usqp=CAU';

// Image gallery zoom
export const IMAGE_ZOOM_RATIO = 0.3;

//Rating
export const RATING_STAR_COUNT = 5;

//Search box
export const THROTTLE_DELAY = 1000;
export const RESET_BTN_THRESHOLD_SHOW_CHAR_COUNT = 3;

export const TEST_ACCOUNT_EMAIL = 'kdmladenov@outlook.com';
export const TEST_ACCOUNT_PASSWORD = 'Sekretenklu4';

export const REACTION_NAMES_COUNT_AT_HOVER = 5;

export const USER = {
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
  PHONE_REGEX: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  DEFAULT_AVATAR: `storage/avatars/defaultAvatar.png`,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // letters, numbers and at least 1 uppercase
  MIN_ABOUT_ME_LENGTH: 10,
  MAX_ABOUT_ME_LENGTH: 1000
};

export const LOCATIONS = {
  MIN_CITY_LENGTH: 2,
  MAX_CITY_LENGTH: 50,
  MIN_COUNTRY_LENGTH: 2,
  MAX_COUNTRY_LENGTH: 50
};

export const SCHOOL = {
  MIN_SCHOOL_LENGTH: 2,
  MAX_SCHOOL_LENGTH: 1000,
  MIN_DEGREE_LENGTH: 2,
  MAX_DEGREE_LENGTH: 1000,
  SCHOOL_TYPES: ['College', 'High school']
};

export const WORKPLACE = {
  MIN_COMPANY_NAME_LENGTH: 2,
  MAX_COMPANY_NAME_LENGTH: 1000,
  MIN_POSITION_LENGTH: 2,
  MAX_POSITION_LENGTH: 1000
};

export const PAGING = {
  DEFAULT_PAGE: 1,
  MIN_USERS_PAGESIZE: 5,
  MAX_USERS_PAGESIZE: 20,
  DEFAULT_USERS_PAGESIZE: 12,
  MIN_POST_PAGESIZE: 5,
  MAX_POST_PAGESIZE: 20,
  DEFAULT_POST_PAGESIZE: 20,
  MIN_HISTORY_PAGESIZE: 5,
  MAX_HISTORY_PAGESIZE: 20,
  DEFAULT_HISTORY_PAGESIZE: 12,
  MIN_WISH_LIST_PAGESIZE: 5,
  MAX_WISH_LIST_PAGESIZE: 20,
  DEFAULT_WISH_LIST_PAGESIZE: 12
};

export const POST = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 250,
  MIN_MESSAGE_LENGTH: 2,
  MAX_MESSAGE_LENGTH: 10000,
  MESSAGE_CHARS_SHOWN: 250,
  MIN_BRAND_LENGTH: 2,
  MAX_BRAND_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 6,
  MAX_DESCRIPTION_LENGTH: 1000,
  MIN_RELEASE_YEAR: 2000,
  MAX_RELEASE_YEAR: 2022,
  MIN_WEIGHT: 0.01,
  MAX_WEIGHT: 10000,
  MIN_MODEL_NUMBER_LENGTH: 3,
  MAX_MODEL_NUMBER_LENGTH: 100,
  MIN_COLOR_LENGTH: 3,
  MAX_COLOR_LENGTH: 100,
  MIN_COLOR_FAMILY_LENGTH: 3,
  MAX_COLOR_FAMILY_LENGTH: 100,
  MIN_SKU_LENGTH: 3,
  MAX_SKU_LENGTH: 100,
  MIN_DIMENSIONS_LENGTH: 3,
  MAX_DIMENSIONS_LENGTH: 100,
  DIMENSIONS_REGEX: /\d+(\.\d+|)\s?x\s?\d+(\.\d+|)(\s?x\s?\d*(\.?\d+|))?/,
  RATING_REGEX: /^[1-5]$/,
  MIN_POST_ID_VALUE: 1
};

export const COMMENT = {
  MIN_CONTENT_LENGTH: 2,
  MAX_CONTENT_LENGTH: 255
};

export const IMAGE = {
  IMAGE_URL_PATTERN: `(http(s?):)([/|.|w|s|-])*.(?:jpg|jpeg|png)`,
  IMAGE_URL_REGEX: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png)/g
};

export const COLLECTION = {
  MIN_COLLECTION_LENGTH: 2,
  MAX_COLLECTION_LENGTH: 1000
};

export const STORY = {
  MIN_MESSAGE_LENGTH: 1,
  MAX_MESSAGE_LENGTH: 10000,
  MIN_MESSAGE_SIZE: 20,
  MAX_MESSAGE_SIZE: 40,
  MESSAGE_SIZE_STEP: 1,
  MESSAGE_COLORS: ['white', 'black', 'red', 'yellow', 'blue', 'green'],
  MESSAGE_BACKGROUNDS: ['transparent', 'white', 'black', 'red', 'yellow', 'blue', 'green']
};
