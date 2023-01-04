import profileUpdateInitialInputState from '../data/inputs/profileUpdateInitialInputState';
import ProfileItemType, { createButtonType } from '../types/ProfileItemType';
import UserType from '../types/UserType';
import getDate from './getDate';

const getProfileAboutInfoItems = (user: UserType): { [key: string]: ProfileItemType[] } => {
  const {
    firstName,
    lastName,
    aboutMe,
    currentCity,
    currentCountry,
    homeCity,
    homeCountry,
    relationshipStatus,
    phone,
    email,
    gender,
    dateOfBirth,
    workplaces,
    schools
  } = user;

  const mappedWorkplaces: ProfileItemType[] = workplaces
    ?.sort((a, b) => new Date(b.startDate).getFullYear() - new Date(a.startDate).getFullYear())
    .map((workplace) => {
      return {
        subsectionKey: 'workplaces',
        label: 'workplace',
        icon: 'fas fa-briefcase',
        spanText: `Worked at ${workplace?.companyName}`,
        resource: workplace,
        resourceId: workplace.workplaceId,
        labelText: `${workplace?.city}, ${workplace?.country}`,
        inputData: profileUpdateInitialInputState.workplaces
      };
    });

  const mappedColleges: ProfileItemType[] = schools
    ?.filter((school) => school.schoolType === 'College')
    .sort((a, b) => b.startYear - a.startYear)
    .map((college) => {
      return {
        subsectionKey: 'schools',
        label: 'college',
        icon: 'fas fa-user-graduate',
        resource: college,
        resourceId: college.schoolId,
        spanText: `Studied at ${college?.schoolName}`,
        labelText: `${college.endYear && 'Class of '}${college.endYear}`,
        inputData: profileUpdateInitialInputState.schools
      };
    });

  const mappedHighSchools: ProfileItemType[] = schools
    ?.filter((school) => school.schoolType === 'High school')
    .sort((a, b) => b.startYear - a.startYear)
    .map((highSchool) => {
      return {
        subsectionKey: 'schools',
        label: 'high school',
        icon: 'fas fa-user-graduate',
        resource: highSchool,
        resourceId: highSchool.schoolId,
        spanText: `Studied at ${highSchool?.schoolName}`,
        labelText: `${highSchool.endYear && 'Class of '}${highSchool.endYear}`,
        inputData: profileUpdateInitialInputState.schools
      };
    });

  const createButtonMap: { [key: string]: createButtonType } = {
    workplace: {
      subsectionKey: 'workplace',
      label: 'workplace',
      inputData: profileUpdateInitialInputState.workplaces
    },
    college: {
      subsectionKey: 'schools',
      label: 'college',
      inputData: profileUpdateInitialInputState.schools
    },
    'high school': {
      subsectionKey: 'schools',
      label: 'high school',
      inputData: profileUpdateInitialInputState.schools
    }
  };

  return {
    Overview: [
      ...(mappedWorkplaces?.slice(0, 1) || []),
      ...(mappedColleges?.slice(0, 1) || []),
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
      },
      {
        subsectionKey: 'relationshipStatus',
        label: 'relationship status',
        icon: 'fa fa-heart',
        spanText: `Is ${relationshipStatus}`,
        inputData: profileUpdateInitialInputState.relationshipStatus
      },
      {
        subsectionKey: 'phone',
        label: 'phone',
        icon: 'fa fa-phone',
        spanText: `${phone}`,
        inputData: profileUpdateInitialInputState.phone
      }
    ],
    'Work and Education': [
      { title: 'Work' },
      { addButton: createButtonMap['workplace'] },
      ...(mappedWorkplaces || []),
      { title: 'College' },
      { addButton: createButtonMap['college'] },
      ...(mappedColleges || []),
      { title: 'High school' },
      { addButton: createButtonMap['high school'] },
      ...(mappedHighSchools || [])
    ],
    'Places Lived': [
      { title: 'Places lived' },
      {
        subsectionKey: 'currentCity',
        label: 'current city',
        icon: 'fa fa-home',
        spanText: `Lives in ${currentCity}, ${currentCountry}`,
        labelText: 'Current city',
        inputData: profileUpdateInitialInputState.currentCity
      },
      {
        subsectionKey: 'homeCity',
        label: 'home city',
        icon: 'fa fa-map-pin',
        spanText: `From ${homeCity}, ${homeCountry}`,
        labelText: 'Home city',
        inputData: profileUpdateInitialInputState.homeCity
      }
    ],
    'Contact and basic info': [
      { title: 'Contact info' },
      {
        subsectionKey: 'phone',
        label: 'phone',
        icon: 'fa fa-phone',
        spanText: `${phone}`,
        labelText: 'Phone',
        inputData: profileUpdateInitialInputState.phone
      },
      {
        subsectionKey: 'email',
        label: 'email',
        icon: 'fa fa-envelope',
        spanText: `${email}`,
        labelText: 'Email',
        inputData: profileUpdateInitialInputState.email
      },
      { title: 'Basic info' },
      {
        subsectionKey: 'gender',
        label: 'gender',
        icon: gender === 'Male' ? 'fas fa-male' : 'fas fa-female',
        spanText: `${gender}`,
        labelText: 'Gender',
        inputData: profileUpdateInitialInputState.gender
      },
      {
        subsectionKey: 'dateOfBirth',
        label: 'date of birth',
        icon: 'fas fa-birthday-cake',
        spanText:
          dateOfBirth &&
          `${getDate(dateOfBirth, 0, false, false)}, ${new Date(dateOfBirth).getFullYear()}`,
        labelText: 'Date of birth',
        inputData: profileUpdateInitialInputState.dateOfBirth
      }
    ],
    'Details about you': [
      {
        subsectionKey: 'firstName',
        label: 'first name',
        icon: 'fas fa-user',
        spanText: `${firstName}`,
        labelText: 'First name',
        inputData: profileUpdateInitialInputState.firstName
      },
      {
        subsectionKey: 'lastName',
        label: 'last name',
        icon: 'fas fa-user',
        spanText: `${lastName}`,
        labelText: 'Last name',
        inputData: profileUpdateInitialInputState.lastName
      },
      {
        subsectionKey: 'aboutMe',
        label: 'about me',
        icon: 'fas fa-pen',
        spanText: `${aboutMe}`,
        labelText: 'About me',
        inputData: profileUpdateInitialInputState.aboutMe
      }
    ]
  };
};

export default getProfileAboutInfoItems;
