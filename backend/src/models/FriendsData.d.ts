import FriendsType from './FriendsType';

interface FriendsData {
  getFriendRequestBy: (userId: number, friendUserId: number) => Promise<FriendRequestType>;
  getAllMyFriends: (
    userId: number,
    search: string,
    sort: string,
    page: number,
    pageSize: number
  ) => Promise<any>;
  getAllMySentPendingRequests: (userId: number) => Promise<FriendRequestType[]>;
  getAllMyReceivedPendingRequests: (userId: number) => Promise<FriendRequestType[]>;
  createRequest: (sourceUserId: number, targetUserId: number) => Promise<FriendRequestType>;
  updateRequestStatus: (friendRequest: FriendRequestType) => Promise<FriendRequestType>;
  unfriend: (userId: number, friendId: number) => Promise<FriendRequestType>;
}

export default FriendsData;
