import FriendsType from './FriendsType';

interface FriendsData {
  getFriendRequestBy: (userId: number, friendUserId: number) => Promise<FriendsType>;
  getAllMyFriends: (userId: number, search: string, sort: string, page: number, pageSize: number) => Promise<FriendsType[]>
  getAllMySentPendingRequests: (userId: number) => Promise<FriendsType[]>;
  getAllMyReceivedPendingRequests: (userId: number) => Promise<FriendsType[]>;
  createRequest: (sourceUserId: number, targetUserId: number) => Promise<FriendsType>;
  updateRequestStatus: (friendRequest: FriendsType) => Promise<FriendsType>;
  unfriend: (userId: number, friendId: number) => Promise<FriendsType>;
}

export default FriendsData;
