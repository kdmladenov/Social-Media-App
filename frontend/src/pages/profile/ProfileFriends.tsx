import React from 'react';
import FriendList from './FriendList';
import './styles/ProfileFriends.css';

const ProfileFriends: React.FC = () => {
  return (
    <div className="profile_friends">
      <FriendList screen="profile_friends_screen" />
    </div>
  );
};

export default ProfileFriends;
