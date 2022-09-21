import React, { useState } from 'react';
import UserType from '../../types/UserType';
import { BASE_URL } from '../../data/constants';
import Button from '../../components/Button';
import ProfileAvatar from './ProfileAvatar';
import Avatar from '../../components/Avatar';
import ButtonNav from '../../components/ButtonNav';
import PhotoUploadForm from '../../components/PhotoUploadForm';
import Modal from '../../components/Modal';
import { updateUserCover } from '../../context/actions/userActions';
import './styles/ProfileHeader.css';
import useTypedSelector from '../../hooks/useTypedSelector';

const ProfileHeader: React.FC<{ user: UserType; section?: string }> = ({ user, section }) => {
  const [showImageUrlForm, setShowImageUrlForm] = useState(false);
  const { userInfo: currentUser } = useTypedSelector((state) => state.userLogin);
  const isCurrentUser = currentUser?.userId === user?.userId;

  return (
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
          {isCurrentUser && (
            <Button classes="white" onClick={() => setShowImageUrlForm(!showImageUrlForm)}>
              <i className="fa fa-camera"></i>
              <span> Edit cover photo</span>
            </Button>
          )}
        </div>
        <div className="info flex">
          <div className="avatar_name flex">
            <ProfileAvatar user={user} editable={isCurrentUser} />
            <div className="details flex_col">
              <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
              <h6>{`${user?.friends?.length} Friends`}</h6>
              <div className="friends_avatars flex">
                {user?.friends?.slice(0, 8).map((friend) => (
                  <Avatar classes="image_only" imageUrl={friend?.avatar} key={friend.userId} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <hr />
        {isCurrentUser && (
          <ButtonNav currentPath={`/profile/${section}`} screen="profile" userId={user?.userId} />
        )}
      </div>
      {showImageUrlForm && (
        <Modal classes="image" setIsOpenModal={setShowImageUrlForm}>
          <PhotoUploadForm
            resourceId={user?.userId}
            updateAction={updateUserCover}
            title="Change your profile cover"
          />
        </Modal>
      )}
    </section>
  );
};

export default ProfileHeader;
