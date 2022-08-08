import FriendRequestType from './FriendRequestType';
import FriendsType from './FriendsType';

interface FriendsData {
  getFriendRequestBy: (userId: number, friendUserId: number) => Promise<FriendRequestType>;
  getAllFriendRequestsByUser: (userId: number) => Promise<FriendRequestType[]>;
  getAllMyFriends: (
    userId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => Promise<FriendType[]>;
  getAllMySentPendingRequests: (userId: number) => Promise<UserType[]>;
  getAllMyReceivedPendingRequests: (userId: number) => Promise<UserType[]>;
  getAllFriendSuggestions: (userId: number) => Promise<FriendType[]>;
  createRequest: (sourceUserId: number, targetUserId: number) => Promise<FriendRequestType>;
  updateRequestStatus: (friendRequest: FriendRequestType) => Promise<FriendRequestType>;
  unfriend: (userId: number, friendId: number) => Promise<FriendRequestType>;
}

export default FriendsData;
