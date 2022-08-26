import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/ProfilePage.css';
import { getUserDetails, updateUserCover } from '../../context/actions/userActions';
import useTypedSelector from '../../hooks/useTypedSelector';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ButtonNav from '../../components/ButtonNav';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import usersDummyData from '../../data/inputs/dummyInputs/usersDummyData';
import Avatar from '../../components/Avatar';

import { BASE_URL } from '../../data/constants';
import ProfileAvatar from './ProfileAvatar';
import ProfilePosts from './ProfilePosts';
import ProfileAbout from './ProfileAbout';
import ProfileFriends from './ProfileFriends';
import ProfilePhotos from './ProfilePhotos';
import Modal from '../../components/Modal';
import PhotoUploadForm from '../../components/PhotoUploadForm';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { section } = useParams();

  const [showImageUrlForm, setShowImageUrlForm] = useState(false);

  const { userInfo } = useTypedSelector((state) => state.userLogin);

  const friendsList = usersDummyData;

  const {
    user,
    loading: loadingUser,
    error: errorUser
  } = useTypedSelector((state) => state.userDetails);

  const { success: successUpdateAvatar } = useTypedSelector((state) => state.userAvatarUpdate);
  const { success: successDeleteAvatar } = useTypedSelector((state) => state.userAvatarDelete);

  const { success: successUpdateCover } = useTypedSelector((state) => state.userCoverUpdate);

  useEffect(() => {
    if (!user?.email || successUpdateAvatar || successDeleteAvatar || successUpdateCover) {
      dispatch(getUserDetails(userInfo?.userId));
      setShowImageUrlForm(false)
    }
  }, [dispatch, userInfo, successUpdateAvatar, successDeleteAvatar, successUpdateCover, section]);

  return loadingUser ? (
    <Loader />
  ) : errorUser ? (
    <Message type="error">{errorUser}</Message>
  ) : (
    <main className="profile_page flex_col">
      <section className="profile_header flex_col">
        <div
          className="blurred_background"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, white, white), url(${
              user?.cover?.startsWith('http') ? user?.cover : `${BASE_URL}/${user?.cover}`
            })`
          }}
        />
        <div className="container flex_col">
          <div className="cover">
            {user?.cover ? (
              <img
                src={user?.cover?.startsWith('http') ? user?.cover : `${BASE_URL}/${user?.cover}`}
                alt={`${user?.firstName} ${user?.lastName}`}
                crossOrigin="anonymous"
              />
            ) : (
              <></>
            )}
            <Button classes="white" onClick={() => setShowImageUrlForm(!showImageUrlForm)}>
              <i className="fa fa-camera"></i>
              <span> Edit cover photo</span>
            </Button>
          </div>
          <div className="info flex">
            <div className="avatar_name flex">
              <ProfileAvatar user={user} />
              <div className="details flex_col">
                <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
                <h6>999 Friends</h6>
                <div className="friends_avatars flex">
                  {friendsList.slice(0, 8).map((friend) => (
                    <Avatar classes="image_only" imageUrl={friend?.avatar} key={friend.userId} />
                  ))}
                </div>
              </div>
            </div>
            <div className="button_group flex">
              <Button>
                <i className="fas fa-plus" /> <span>Add to story</span>
              </Button>
              <Button>
                <i className="fa fa-edit" /> <span>Edit profile</span>
              </Button>
            </div>
          </div>
          <hr />
          <ButtonNav currentPath={`/profile/${section}`} screen="profile" />
        </div>
      </section>
      <section className="profile_content">
        {section === 'posts' ? (
          <ProfilePosts />
        ) : section === 'about' ? (
          <ProfileAbout user={user} />
        ) : section === 'friends' ? (
          <ProfileFriends />
        ) : (
          <ProfilePhotos />
        )}
      </section>
      {showImageUrlForm && (
        <Modal classes="image" setIsOpenModal={setShowImageUrlForm}>
          <PhotoUploadForm resourceId={user?.userId} updateAction={updateUserCover} />
        </Modal>
      )}
    </main>
  );
};

export default ProfilePage;
