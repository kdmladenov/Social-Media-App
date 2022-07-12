import { LOCATIONS, USER, WORKPLACE, SCHOOL } from '../constants/constants';
import genders from '../constants/genders';
import relationshipStatuses from '../constants/relationship-statuses';
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
  },
  relationshipStatus: {
    relationshipStatus: {
      formElement: 'select',
      label: 'Relationship status',
      placeholder: 'Your relationship status...',
      options: relationshipStatuses.map((itemValue) => ({
        label: `${itemValue}`,
        value: `${itemValue}`
      })),
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    }
  },
  phone: {
    phone: {
      label: 'Phone',
      type: 'tel',
      placeholder: 'Your phone number...',
      value: '',
      validations: {
        required: true,
        format: USER.PHONE_REGEX
      },
      valid: true,
      touched: false
    }
  },
  email: {
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'Your email...',
      value: '',
      validations: {
        required: true,
        format: USER.EMAIL_REGEX
      },
      valid: true,
      touched: false
    }
  },
  gender: {
    gender: {
      formElement: 'select',
      label: 'Gender',
      placeholder: 'Your gender...',
      options: genders.map((itemValue) => ({
        label: `${itemValue}`,
        value: `${itemValue}`
      })),
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    }
  },
  dateOfBirth: {
    dateOfBirth: {
      label: 'Date of birth',
      type: 'date',
      placeholder: 'Your date of birth...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    }
  },
  workplaces: {
    companyName: {
      label: 'Company name',
      type: 'text',
      placeholder: 'Company name...',
      value: '',
      validations: {
        required: true,
        minLength: WORKPLACE.MIN_COMPANY_NAME_LENGTH,
        maxLength: WORKPLACE.MAX_COMPANY_NAME_LENGTH
      },
      valid: true,
      touched: false
    },
    position: {
      label: 'Position',
      type: 'text',
      placeholder: 'Jop position...',
      value: '',
      validations: {
        required: true,
        minLength: WORKPLACE.MIN_POSITION_LENGTH,
        maxLength: WORKPLACE.MAX_POSITION_LENGTH
      },
      valid: true,
      touched: false
    },
    city: {
      label: 'City',
      type: 'text',
      placeholder: 'City...',
      value: '',
      validations: {
        required: true,
        minLength: LOCATIONS.MIN_CITY_LENGTH,
        maxLength: LOCATIONS.MAX_CITY_LENGTH
      },
      valid: true,
      touched: false
    },
    country: {
      label: 'Country',
      type: 'text',
      placeholder: 'Country...',
      value: '',
      validations: {
        required: true,
        minLength: LOCATIONS.MIN_COUNTRY_LENGTH,
        maxLength: LOCATIONS.MAX_COUNTRY_LENGTH
      },
      valid: true,
      touched: false
    },
    startDate: {
      label: 'Start date',
      type: 'date',
      placeholder: 'Start date...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    endDate: {
      label: 'End date',
      type: 'date',
      placeholder: 'End date...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    }
  },
  schools: {
    schoolName: {
      label: 'School name',
      type: 'text',
      placeholder: 'School name...',
      value: '',
      validations: {
        required: true,
        minLength: SCHOOL.MIN_SCHOOL_LENGTH,
        maxLength: SCHOOL.MAX_SCHOOL_LENGTH
      },
      valid: true,
      touched: false
    },
    degree: {
      label: 'Degree',
      type: 'text',
      placeholder: 'Degree...',
      value: '',
      validations: {
        required: true,
        minLength: SCHOOL.MIN_DEGREE_LENGTH,
        maxLength: SCHOOL.MAX_DEGREE_LENGTH
      },
      valid: true,
      touched: false
    },
    city: {
      label: 'City',
      type: 'text',
      placeholder: 'City...',
      value: '',
      validations: {
        required: true,
        minLength: LOCATIONS.MIN_CITY_LENGTH,
        maxLength: LOCATIONS.MAX_CITY_LENGTH
      },
      valid: true,
      touched: false
    },
    country: {
      label: 'Country',
      type: 'text',
      placeholder: 'Country...',
      value: '',
      validations: {
        required: true,
        minLength: LOCATIONS.MIN_COUNTRY_LENGTH,
        maxLength: LOCATIONS.MAX_COUNTRY_LENGTH
      },
      valid: true,
      touched: false
    },
    startYear: {
      label: 'Start year',
      type: 'number',
      placeholder: 'Start year...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    endYear: {
      label: 'End year',
      type: 'number',
      placeholder: 'End year...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    }
  },
  firstName: {
    firstName: {
      label: 'First name',
      type: 'text',
      placeholder: 'Your first name...',
      value: '',
      validations: {
        required: true,
        minLength: USER.MIN_FIRST_NAME_LENGTH,
        maxLength: USER.MAX_FIRST_NAME_LENGTH
      },
      valid: true,
      touched: false
    }
  },
  lastName: {
    lastName: {
      label: 'Last name',
      type: 'text',
      placeholder: 'Your last name...',
      value: '',
      validations: {
        required: true,
        minLength: USER.MIN_LAST_NAME_LENGTH,
        maxLength: USER.MAX_LAST_NAME_LENGTH
      },
      valid: true,
      touched: false
    }
  },
  aboutMe: {
    aboutMe: {
      label: 'About me',
      type: 'textarea',
      placeholder: 'Write about you...',
      value: '',
      validations: {
        required: true,
        minLength: USER.MIN_ABOUT_ME_LENGTH,
        maxLength: USER.MAX_ABOUT_ME_LENGTH
      },
      valid: true,
      touched: false
    }
  }
};

export default profileUpdateInitialInputState;
