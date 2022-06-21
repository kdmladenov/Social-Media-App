import React from 'react';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import FriendList from './FriendList';
import './styles/ProfileFriends.css';

const friendsList = [...usersDummyData, ...usersDummyData];

const ProfileFriends: React.FC = () => {
  return (
    <div className='profile_friends'>
      <FriendList screen="profile_friends_screen" friends={friendsList} />
    </div>
  );
};

export default ProfileFriends;
