import React from 'react';
import useTypedSelector from '../../hooks/useTypedSelector';
import UserType from '../../types/UserType';
import PostCreateCard from '../home/posts/PostCreateCard';
import PostsMy from '../home/posts/PostsMy';

import FriendList from './FriendList';
import PhotoList from './PhotoList';
import ProfileIntro from './ProfileIntro';
import './styles/ProfilePosts.css';

const ProfilePosts: React.FC<{ user: UserType }> = ({ user }) => {
  const { userInfo: currentUser } = useTypedSelector((state) => state.userLogin);
  const isCurrentUser = currentUser?.userId === user?.userId;

  return (
    <div className="profile_posts">
      <aside className="sidebar flex_col">
        <ProfileIntro user={user} />
        <PhotoList screen="profile_posts_screen" user={user} />
        <FriendList user={user} screen="profile_posts_screen" />
      </aside>
      <div className="posts flex_col">
        {isCurrentUser && <PostCreateCard />}
        <PostsMy showUserPostsOnly={true} />
      </div>
    </div>
  );
};

export default ProfilePosts;
