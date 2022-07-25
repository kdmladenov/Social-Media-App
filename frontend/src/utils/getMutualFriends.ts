import UserType, { UserShortType } from '../types/UserType';

const getMutualFriends = (otherUserFriends: UserShortType[], currentUser: UserShortType) => {
  const intersection = [];

  const myFriendsMap = currentUser.friends?.reduce((acc, curr) => {
    return { ...acc, [curr.userId]: curr };
  }, {}) as {
    [key: string]: UserType[];
  };

  for (const otherUserFriend of otherUserFriends) {
    if (
      myFriendsMap[`${otherUserFriend.userId}`] &&
      otherUserFriend.userId !== currentUser.userId
    ) {
      intersection.push(otherUserFriend);
    }
  }
  return intersection;
};

export default getMutualFriends;
