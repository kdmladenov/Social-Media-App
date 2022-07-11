import FeelingTypes from './FeelingTypes';

interface SchoolType {
  schoolId: number;
  userId: number;
  schoolName: string;
  schoolTypeId: number;
  schoolType: string;
  degree: string;
  cityId: number;
  city: string;
  country: string;
  startYear: number;
  endYear: number;
  isDeleted: boolean;
}

export default SchoolType;
