interface FriendsType {
  userId: 22;
  firstName: string;
  lastName: string;
  avatar: string;
  cover: string;
  aboutMe: string;
  email: string;
  phone: string;
  dateOfBirth: string | Date;
  homeCityId: number;
  homeCity: string;
  homeCountry: string;
  currentCityId: number;
  currentCity: string;
  currentCountry: string;
  relationshipStatus: string;
  gender: string;
  dateRegistered: string | Date;
  isDeleted: boolean;
  role: string;
  requestStatusId: number;
  requestStatus: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  friends: { friendUserId: number; firstName: string; lastName: string; avatar: string }[];
  totalDBItems: number;
}

export default FriendsType;

export interface FriendTypeFriendsAsJson extends FriendType {
  friends: string;
}

