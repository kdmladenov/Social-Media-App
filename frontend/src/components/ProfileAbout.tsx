import React from 'react';
import { photoList } from '../inputs/dummyInputs/imagesDummyData';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import FriendList from './FriendList';
import PhotoList from './PhotoList';
import ProfileAboutCard from './ProfileAboutCard';
import './styles/ProfileAbout.css';

const friendsList = [...usersDummyData, ...usersDummyData];

const ProfileAbout: React.FC = () => {
  return (
    <div className="profile_about flex_col">
      <ProfileAboutCard />
      <PhotoList screen="profile_about_screen" photos={photoList} />
      <FriendList screen="profile_about_screen" friends={friendsList} />
    </div>
  );
};

export default ProfileAbout;
