import UserInfoType from './UserInfoType.js';
import UserType from './UserType.js';

interface UsersData {
  getBy: (
    column: string,
    value: string | number,
    isProfileOwner?: boolean,
    role?: RolesType,
    isProfileOwnerFriend?: boolean
  ) => Promise<UserType>;
  getAll: (
    search: string,
    sort: string,
    page: number,
    pageSize: number,
    role: RolesType
  ) => Promise<UserType[]>;
  create: (user: UserType) => Promise<UserType>;
  updateUser: (
    user: UserType,
  ) => Promise<UserType>;
  remove: (userId: number) => Promise<UserType>;
  restore: (userId: number) => Promise<UserType>;
  loginUser: (email: string) => Promise<Payload>;
  logoutUser: (token: string) => Promise<void>;
  getPasswordBy: (column: string, value: string | number) => Promise<{ password: string }>;
  updatePassword: (userId: number, password: string) => Promise<{ password: string }>;
}

export default UsersData;
