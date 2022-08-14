import React from 'react';
import { photoList } from '../../data/inputs/dummyInputs/imagesDummyData';
import PostCreateCard from '../home/posts/PostCreateCard';
import PostsMy from '../home/posts/PostsMy';


import FriendList from './FriendList';
import PhotoList from './PhotoList';
import ProfileIntro from './ProfileIntro';
import './styles/ProfilePosts.css';

const ProfilePosts: React.FC = () => {
  return (
    <div className="profile_posts">
      <aside className="sidebar flex_col">
        <ProfileIntro />
        <PhotoList screen="profile_posts_screen" photos={photoList} />
        <FriendList screen="profile_posts_screen"/>
      </aside>
      <div className="posts flex_col">
        <PostCreateCard />
        <PostsMy />
      </div>
    </div>
  );
};

export default ProfilePosts;
