import errors from '../constants/service-errors.js';
import UsersData from '../models/UsersData.js';
import RolesType from '../models/RolesType.js';
import FriendsData from '../models/FriendsData.js';
import { maxSuggestionsCount, suggestionWeights } from '../constants/constants.js';

const getAllMyFriends =
  (friendsData: FriendsData) =>
  async (userId: number, search: string, sort: string, page: number, pageSize: number) => {
    const result = await friendsData.getAllMyFriends(userId, search, sort, page, pageSize);

    return result;
  };

const getAllMySentPendingFriendRequests = (friendsData: FriendsData) => async (userId: number) => {
  const result = await friendsData.getAllMySentPendingRequests(userId);

  return result;
};

const getAllMyReceivedPendingFriendRequests =
  (friendsData: FriendsData) => async (userId: number) => {
    const result = await friendsData.getAllMyReceivedPendingRequests(userId);

    return result;
  };

const getAllFriendSuggestions =
  (friendsData: FriendsData, usersData: UsersData) => async (userId: number) => {
    const friends = await friendsData.getAllFriendSuggestions(userId);
    const currentUser = await usersData.getBy('user_id', userId, true);
    const map = new Map();
    const currentCitySet = new Set();
    const homeCitySet = new Set();
    // TODO - Add workplace and school
    for (const friend of friends) {
      for (const potentialFriend of friend.friends) {
        const friendAsString = JSON.stringify(potentialFriend);
        if (potentialFriend.friendUserId !== userId) {
          // Friend
          map.set(friendAsString, (map.get(friendAsString) || 0) + suggestionWeights.friend);
          // Current city
          if (
            potentialFriend.currentCityId === currentUser.currentCityId &&
            !currentCitySet.has(friendAsString)
          ) {
            map.set(friendAsString, (map.get(friendAsString) || 0) + suggestionWeights.currentCity);
            currentCitySet.add(friendAsString);
          }
          // Home City
          if (
            potentialFriend.homeCityId === currentUser.homeCityId &&
            !homeCitySet.has(friendAsString)
          ) {
            map.set(friendAsString, (map.get(friendAsString) || 0) + suggestionWeights.homeCity);
            homeCitySet.add(friendAsString);
          }
        }
      }
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map((user) => {
        return { ...JSON.parse(user[0]), friends: JSON.parse(JSON.parse(user[0]).friends) };
      })
      .slice(0, maxSuggestionsCount);
  };

// register
const createFriendRequest =
  (friendsData: FriendsData, usersData: UsersData) =>
  async (sourceUserId: number, targetUserId: number) => {
    const existingRequestor = await usersData.getBy('user_id', sourceUserId);

    if (!existingRequestor) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const existingFriendRequest = await friendsData.getFriendRequestBy(
      +sourceUserId,
      +targetUserId
    );

    if (existingFriendRequest) {
      return {
        error: errors.DUPLICATE_RECORD,
        result: null
      };
    }

    return {
      error: null,
      result: await friendsData.createRequest(+sourceUserId, +targetUserId)
    };
  };

//  Accept or reject a friend request
const updateFriendRequestStatus =
  (friendsData: FriendsData, usersData: UsersData) =>
  async (sourceUserId: number, targetUserId: number, requestStatus: string) => {
    const existingRequestor = await usersData.getBy('user_id', sourceUserId);

    const existingFriendRequest = await friendsData.getFriendRequestBy(
      +sourceUserId,
      +targetUserId
    );

    if (!existingFriendRequest || !existingRequestor) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    // if a request has been rejected before - no corrections are possible
    if (
      existingFriendRequest.requestStatus === 'rejected' ||
      existingFriendRequest.requestStatus === 'unfriended'
    ) {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        result: null
      };
    }

    const updatedRequestStatus = await friendsData.updateRequestStatus({
      ...existingFriendRequest,
      requestStatus
    });

    return {
      error: null,
      result: updatedRequestStatus
    };
  };

// Unfriend already approved friend
const unfriendFriend =
  (friendsData: FriendsData, usersData: UsersData) =>
  async (userId: number, friendId: number, role: RolesType) => {
    const existingFriendUser = await usersData.getBy('user_id', friendId);

    const existingFriendRequest = await friendsData.getFriendRequestBy(+userId, +friendId);

    if (existingFriendRequest.requestStatus === 'pending') {
      return {
        error: errors.OPERATION_NOT_PERMITTED,
        post: null
      };
    }

    if (
      existingFriendRequest.requestStatus === 'rejected' ||
      existingFriendRequest.requestStatus === 'unfriended' ||
      !existingFriendUser
    ) {
      return {
        error: errors.RECORD_NOT_FOUND,
        result: null
      };
    }

    const deletedFriendship = await friendsData.unfriend(userId, friendId);

    return {
      error: null,
      result: deletedFriendship
    };
  };

export default {
  createFriendRequest,
  getAllMyFriends,
  getAllMySentPendingFriendRequests,
  getAllMyReceivedPendingFriendRequests,
  getAllFriendSuggestions,
  updateFriendRequestStatus,
  unfriendFriend
};
