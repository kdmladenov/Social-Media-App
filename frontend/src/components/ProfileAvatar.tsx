import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/ProfileAvatar.css';
import { deleteUserAvatar } from '../state/actions/userActions';

import Avatar from './Avatar';
import Button from './Button';
import UserType from '../models/UserType';
import Modal from './Modal';
import PhotoUploadForm from './PhotoUploadForm';

const ProfileAvatar: React.FC<{ user: UserType }> = ({ user }) => {
  const dispatch = useDispatch();
  const [showImageUrlForm, setShowImageUrlForm] = useState(false);

  console.log(user?.avatar, 'user?.avatar');

  return (
    <div className="profile_avatar flex_col">
      <div className="avatar_container">
        <Avatar
          classes="large"
          imageUrl={user?.avatar}
          firstName={user.firstName}
          lastName={user.lastName}
        />
        <Button classes="icon" onClick={() => setShowImageUrlForm(!showImageUrlForm)}>
          <i className="fa fa-camera" />
        </Button>
        <Button classes="icon delete" onClick={() => dispatch(deleteUserAvatar(user.userId))}>
          <i className="fas fa-trash" />
        </Button>
      </div>
      {showImageUrlForm && (
        <Modal classes="image" setIsOpenModal={setShowImageUrlForm}>
          <PhotoUploadForm user={user} />
        </Modal>
      )}
    </div>
  );
};

export default ProfileAvatar;
