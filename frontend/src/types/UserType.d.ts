import GendersType from './GendersType';
import RelationshipStatusTypes from './RelationshipStatusTypes';
import SchoolType from './SchoolType';
import WorkplaceType from './WorkplaceType';

interface UserType {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  reenteredPassword?: string;
  phone: string;
  avatar: string;
  cover: string;
  role: string;
  token: string;
  isDeleted: boolean;
  dateOfBirth: string | Date;
  relationshipStatus?: RelationshipStatusTypes;
  gender?: GendersType;
  homeCityId?: number;
  homeCity?: string;
  homeCountry?: string;
  currentCityId?: number;
  currentCity?: string;
  currentCountry?: string;
  aboutMe: string;
  totalDBItems: number;
  schools: SchoolType[];
  workplaces: WorkplaceType[];
  friends?: {
    userId: number;
    firstName: string;
    lastName: string;
    avatar: string;
    friends?: { userId: number; firstName: string; lastName: string; avatar: string }[];
  }[];
  type?: string;
}

export default UserType;


export interface UserShortType {
  userId: number;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  friends?: { userId: number; firstName: string; lastName: string; avatar: string }[];
}