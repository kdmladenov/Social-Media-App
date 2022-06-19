import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/ProfileScreen.css';
import { getUserDetails } from '../state/actions/userActions';
import useTypedSelector from '../hooks/useTypedSelector';

import Profile from '../components/Profile';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ButtonNav from '../components/ButtonNav';
import { useParams } from 'react-router-dom';
import ProfileAvatar from '../components/ProfileAvatar';
import Button from '../components/Button';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import Avatar from '../components/Avatar';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { section } = useParams();

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const friendsList = usersDummyData;

  const {
    user,
    loading: loadingUser,
    error: errorUser
  } = useTypedSelector((state) => state.userDetails);

  const { avatar, cover, firstName, lastName } = user;

  const { success: successUpdateAvatar } = useTypedSelector((state) => state.userAvatarUpdate);

  const { success: successDeleteAvatar } = useTypedSelector((state) => state.userAvatarDelete);

  useEffect(() => {
    if (!user?.email) {
      dispatch(getUserDetails(userInfo?.userId));
    }
  }, [dispatch, user, userInfo, successUpdateAvatar, successDeleteAvatar, section]);

  return loadingUser ? (
    <Loader />
  ) : errorUser ? (
    <Message type="error">{errorUser}</Message>
  ) : (
    <main className="profile_screen">
      <section className="profile_header flex_col">
        <div className="container flex_col">
          <div
            className="cover"
            // style={{
            //   backgroundImage: cover ? `url(${cover})` : 'none'
            // }}
          >
            <img src={cover} alt={`${firstName} ${lastName}`} />
          </div>
          <div className="info flex">
            <div className="avatar_name flex">
              <ProfileAvatar user={user} />
              <div className="details flex_col">
                <h1>{`${firstName} ${lastName}`}</h1>
                <h6>999 Friends</h6>
                <div className="friends_avatars flex">
                  {friendsList.slice(0, 8).map((friend) => (
                    <Avatar classes="image_only" imageUrl={friend?.avatar} />
                  ))}
                </div>
              </div>
            </div>
            <div className="button_group flex">
              <Button>
                <i className="fas fa-plus" /> <span>Add to story</span>
              </Button>
              <Button>
                {' '}
                <i className="fa fa-edit" /> <span>Edit profile</span>
              </Button>
            </div>
          </div>
          <hr />
          <ButtonNav currentPath={`/profile/${section}`} screen="profile" />
        </div>
      </section>
      <section className="profile_container">
        {section === 'posts' ? (
          <span>posts</span>
        ) : section === 'about' ? (
          <span>about</span>
        ) : section === 'friends' ? (
          <span>friends</span>
        ) : (
          <span>photos</span>
        )}
      </section>
    </main>
  );
};

export default ProfileScreen;
