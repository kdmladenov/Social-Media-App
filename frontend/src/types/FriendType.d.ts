interface FriendType {
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
  requestStatusId: number;
  requestStatus: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  totalDBItems: number;
  friends: { userId: number; firstName: string; lastName: string; avatar: string }[];
}

export default FriendType;
