import profileUpdateInitialInputState from '../inputs/profileUpdateInitialInputState';
import FormInputDataType from '../models/FormInputDataType';
import UserType from '../models/UserType';

const getProfileAboutInfoItems = (
  user: UserType
): {
  [key: string]: {
    subsectionKey: string;
    label: string;
    icon: string;
    spanText: string;
    inputData: FormInputDataType;
  }[];
} => {
  const { currentCity, currentCountry, homeCity, homeCountry } = user;

  return {
    Overview: [
      {
        subsectionKey: 'currentCity',
        label: 'current city',
        icon: 'fa fa-home',
        spanText: `Lives in ${currentCity}, ${currentCountry}`,
        inputData: profileUpdateInitialInputState.currentCity
      },
      {
        subsectionKey: 'homeCity',
        label: 'home city',
        icon: 'fa fa-map-pin',
        spanText: `From ${homeCity}, ${homeCountry}`,
        inputData: profileUpdateInitialInputState.homeCity
      }
    ]
  };
};

export default getProfileAboutInfoItems;
