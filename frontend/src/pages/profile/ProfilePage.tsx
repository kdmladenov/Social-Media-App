import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './styles/ProfilePage.css';
import { getUserDetails } from '../../context/actions/userActions';
import useTypedSelector from '../../hooks/useTypedSelector';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useParams } from 'react-router-dom';
import ProfilePosts from './ProfilePosts';
import ProfileAbout from './ProfileAbout';
import { listFriends } from '../../context/actions/friendsActions';
import FriendList from './FriendList';
import PhotoList from './PhotoList';
import ProfileHeader from './ProfileHeader';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { userId, section } = useParams();

  const { user, loading, error } = useTypedSelector((state) => state.userDetails);

  const { success: successUpdateAvatar } = useTypedSelector((state) => state.userAvatarUpdate);
  const { success: successDeleteAvatar } = useTypedSelector((state) => state.userAvatarDelete);
  const { success: successUpdateCover } = useTypedSelector((state) => state.userCoverUpdate);

  useEffect(() => {
    if (!user?.userId || successUpdateAvatar || successDeleteAvatar || successUpdateCover) {
      dispatch(getUserDetails(+userId!));
    }
  }, [dispatch, successUpdateAvatar, successDeleteAvatar, successUpdateCover, section]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message type="error">{error}</Message>
  ) : (
    <main className="profile_page flex_col">
      <ProfileHeader user={user} section={section} />
      <section className="profile_content">
        {section === 'posts' ? (
          <ProfilePosts user={user} />
        ) : section === 'about' ? (
          <ProfileAbout user={user} />
        ) : section === 'friends' ? (
          <FriendList user={user} screen="profile_friends_screen" />
        ) : (
          <PhotoList screen="profile_photos_screen" user={user} />
        )}
      </section>
    </main>
  );
};

export default ProfilePage;
