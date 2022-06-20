import React from 'react';
import { postImage1, postImage2, postImage3 } from '../inputs/dummyInputs/imagesDummyData';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import FriendList from './FriendList';
import PhotoList from './PhotoList';
import PostCreate from './PostCreate';
import Posts from './Posts';
import './styles/ProfilePosts.css';

const ProfilePosts: React.FC = () => {
  return (
    <div className="profile_posts">
      <aside className="sidebar flex_col">
        <div className="intro card"></div>
        <PhotoList
          screen="profile_posts_screen"
          photos={[
            postImage1,
            postImage2,
            postImage3,
            postImage1,
            postImage2,
            postImage3,
            postImage1,
            postImage2,
            postImage3,
            postImage1,
            postImage2,
            postImage3,
            postImage1,
            postImage1,
            postImage1,
            postImage1,
            postImage1,
            postImage1,
            postImage1,
            postImage1,
            postImage1,
            postImage1
          ]}
        />
        <FriendList
          screen="profile_posts_screen"
          friends={[...usersDummyData, ...usersDummyData]}
        />
      </aside>
      <div className="posts flex_col">
        <PostCreate />
        <Posts />
      </div>
    </div>
  );
};

export default ProfilePosts;
