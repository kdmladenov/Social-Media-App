import { POST } from '../constants';

const validate = {
  title: (value: string) =>
    typeof value === 'string' &&
    value.length >= POST.MIN_NAME_LENGTH &&
    value.length <= POST.MAX_NAME_LENGTH,
  brand: (value: string) =>
    typeof value === 'string' &&
    value.length >= POST.MIN_BRAND_LENGTH &&
    value.length <= POST.MAX_BRAND_LENGTH,
  description: (value: string) =>
    typeof value === 'string' &&
    value.length >= POST.MIN_DESCRIPTION_LENGTH &&
    value.length <= POST.MAX_DESCRIPTION_LENGTH,
  image: (value: string) => typeof value === 'string',
  isDeleted: (value: boolean) => typeof value === 'boolean',
  modelNumber: (value: string) =>
    typeof value === 'string' &&
    value.length >= POST.MIN_MODEL_NUMBER_LENGTH &&
    value.length <= POST.MAX_MODEL_NUMBER_LENGTH,
  sku: (value: string) =>
    typeof value === 'string' &&
    value.length >= POST.MIN_SKU_LENGTH &&
    value.length <= POST.MAX_SKU_LENGTH,
  releaseYear: (value: number) =>
    typeof +value === 'number' &&
    value >= POST.MIN_RELEASE_YEAR &&
    value <= POST.MAX_RELEASE_YEAR,
  color: (value: string) =>
    typeof value === 'string' &&
    value.length >= POST.MIN_COLOR_LENGTH &&
    value.length <= POST.MAX_COLOR_LENGTH,
  colorFamily: (value: string) =>
    typeof value === 'string' &&
    value.length >= POST.MIN_COLOR_FAMILY_LENGTH &&
    value.length <= POST.MAX_COLOR_FAMILY_LENGTH,
  dimensions: (value: string) => typeof value === 'string' && POST.DIMENSIONS_REGEX.test(value),
  weight: (value: number) =>
    typeof +value === 'number' && value >= POST.MIN_WEIGHT && value <= POST.MAX_WEIGHT
};

const validateInputPost = {
  title: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.title(value)) {
      return ` must be between ${POST.MIN_NAME_LENGTH} and ${POST.MAX_NAME_LENGTH} characters`;
    }
    return '';
  },
  brand: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.brand(value)) {
      return ` must be between ${POST.MIN_BRAND_LENGTH} and ${POST.MAX_BRAND_LENGTH} characters`;
    }
    return '';
  },
  description: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.description(value)) {
      return ` must be between ${POST.MIN_DESCRIPTION_LENGTH} and ${POST.MAX_DESCRIPTION_LENGTH} characters`;
    }
    return '';
  },
  image: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.image(value)) {
      return ' must be valid';
    }
    return '';
  },
  // isDeleted: (value: boolean) => {
  //   if (!value) {
  //     return ' is required!';
  //   }
  //   if (!validate.isDeleted(value)) {
  //     return ` must be true or false`;
  //   }
  //   return '';
  // },
  modelNumber: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.modelNumber(value)) {
      return ` must be between ${POST.MIN_MODEL_NUMBER_LENGTH} and ${POST.MAX_MODEL_NUMBER_LENGTH} characters`;
    }
    return '';
  },
  sku: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.sku(value)) {
      return ` must be between ${POST.MIN_SKU_LENGTH} and ${POST.MAX_SKU_LENGTH} characters`;
    }
    return '';
  },
  releaseYear: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.releaseYear(+value)) {
      return ` must be a number between ${POST.MIN_RELEASE_YEAR} and ${POST.MAX_RELEASE_YEAR}`;
    }
    return '';
  },
  color: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.color(value)) {
      return ` must be between ${POST.MIN_COLOR_LENGTH} and ${POST.MAX_COLOR_LENGTH} characters`;
    }
    return '';
  },
  colorFamily: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.colorFamily(value)) {
      return ` must be between ${POST.MIN_COLOR_FAMILY_LENGTH} and ${POST.MAX_COLOR_FAMILY_LENGTH} characters`;
    }
    return '';
  },
  dimensions: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.dimensions(value)) {
      return ' must be in the format H x W x D inches';
    }
    return '';
  },
  weight: (value: string) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.weight(+value)) {
      return ` must be between ${POST.MIN_WEIGHT} and ${POST.MAX_WEIGHT} pounds`;
    }
    return '';
  }
};

export default validateInputPost;
