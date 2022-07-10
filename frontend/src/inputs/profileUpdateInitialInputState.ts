import { LOCATIONS } from '../constants/constants';
import FormInputDataType from '../models/FormInputDataType';

const profileUpdateInitialInputState: {
  [key: string]: FormInputDataType;
} = {
  currentCity: {
    currentCity: {
      label: 'Current city',
      type: 'text',
      placeholder: 'Your current city...',
      value: '',
      validations: {
        required: true,
        minLength: LOCATIONS.MIN_CITY_LENGTH,
        maxLength: LOCATIONS.MAX_CITY_LENGTH
      },
      valid: true,
      touched: false
    },
    currentCountry: {
      label: 'Current country',
      type: 'text',
      placeholder: 'Your current country...',
      value: '',
      validations: {
        required: true,
        minLength: LOCATIONS.MIN_COUNTRY_LENGTH,
        maxLength: LOCATIONS.MAX_COUNTRY_LENGTH
      },
      valid: true,
      touched: false
    }
  },
  homeCity: {
    homeCity: {
      label: 'Home city',
      type: 'text',
      placeholder: 'Your home city...',
      value: '',
      validations: {
        required: true,
        minLength: LOCATIONS.MIN_CITY_LENGTH,
        maxLength: LOCATIONS.MAX_CITY_LENGTH
      },
      valid: true,
      touched: false
    },
    homeCountry: {
      label: 'Home country',
      type: 'text',
      placeholder: 'Your home country...',
      value: '',
      validations: {
        required: true,
        minLength: LOCATIONS.MIN_COUNTRY_LENGTH,
        maxLength: LOCATIONS.MAX_COUNTRY_LENGTH
      },
      valid: true,
      touched: false
    }
  }
};

export default profileUpdateInitialInputState;
