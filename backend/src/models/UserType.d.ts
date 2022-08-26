import GendersType from './GendersType';
import RelationshipStatusTypes from './RelationshipStatusTypes';

export interface UserType {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  reenteredPassword: string;
  phone: string;
  avatar: string;
  cover: string;
  homeCity: string;
  homeCountry: string;
  currentCity: string;
  currentCountry: string;
  role: RolesType;
  isDeleted: number;
  dateOfBirth: string | Date;
  about_me: string;
  relationshipStatus: RelationshipStatusTypes;
  gender: GendersType;
  homeCityId: number;
  homeCity: string;
  homeCountry: string;
  currentCityId: number;
  currentCity: string;
  currentCountry: string;
  aboutMe: string;
  friends: {
    userId: number;
    firstName: string;
    lastName: string;
    avatar: string;
    friends: { userId: number; firstName: string; lastName: string; avatar: string }[];
  }[];
}

export default UserType;

export interface UserTypeFriendsAsJson extends UserType {
  friends: string;
}