import FriendType from '../types/FriendType';

const getSortedFriendsByBirthday = (friends:FriendType[]) => {
  const currMonth = new Date().getMonth();
  const currDate = new Date().getDate();

  const sorted = friends.sort((a, b) => {
    const fullDateA = new Date(a.dateOfBirth);
    const fullDateB = new Date(b.dateOfBirth);
    return fullDateA.getMonth() > fullDateB.getMonth()
      ? 1
      : fullDateA.getMonth() === fullDateB.getMonth() && fullDateA.getDate() > fullDateB.getDate()
      ? 1
      : -1;
  });

  const birthDaysAfterToday = sorted.filter((friend) => {
    const dateOfBirth = new Date(friend.dateOfBirth);
    return currMonth > dateOfBirth.getMonth() ||
      (currMonth === dateOfBirth.getMonth() && currDate > dateOfBirth.getDate())
      ? false
      : true;
  });

  const birthDaysBeforeToday = sorted.filter((friend) => {
    const dateOfBirth = new Date(friend.dateOfBirth);
    return currMonth < dateOfBirth.getMonth() ||
      (currMonth === dateOfBirth.getMonth() && currDate < dateOfBirth.getDate())
      ? false
      : true;
  });
  return [...birthDaysAfterToday, ...birthDaysBeforeToday];
};

export default getSortedFriendsByBirthday;