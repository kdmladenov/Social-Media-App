interface FriendsRequestsListType {
  userId: number;
  firstName: string;
  lastName: string;
  avatar: string;
  requestStatusId: number;
  requestStatus: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  type: 'source' | 'target';
}
export default FriendsRequestsListType;
