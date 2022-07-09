import React, { useState } from 'react';
import './styles/ProfileAvatar.css';
import { deleteUserAvatar } from '../state/actions/userActions';

import Avatar from './Avatar';
import Button from './Button';
import UserType from '../models/UserType';
import Modal from './Modal';
import PhotoUploadForm from './PhotoUploadForm';
import ConfirmMessage from './ConfirmMessage';

const ProfileAvatar: React.FC<{ user: UserType }> = ({ user }) => {
  const [showImageUrlForm, setShowImageUrlForm] = useState(false);
  const [showDeleteAvatarModal, setShowDeleteAvatarModal] = useState(false);
  const [modalContent, setModalContent] = useState(<></>);

  const deleteAvatarHandler = (userId: number) => {
    setShowDeleteAvatarModal(true);
    setModalContent(
      <ConfirmMessage
        setIsModalOpen={setShowDeleteAvatarModal}
        message={`Are your sure you want to delete this avatar?`}
        resourceId={userId}
        action={deleteUserAvatar}
      />
    );
  };

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
        <Button classes="icon delete" onClick={() => deleteAvatarHandler(user.userId)}>
          <i className="fas fa-trash" />
        </Button>
      </div>
      {showImageUrlForm && (
        <Modal classes="image" setIsOpenModal={setShowImageUrlForm}>
          <PhotoUploadForm user={user} />
        </Modal>
      )}
      {showDeleteAvatarModal && (
        <Modal classes="confirm" setIsOpenModal={setShowDeleteAvatarModal}>
          {modalContent}
        </Modal>
      )}
    </div>
  );
};

export default ProfileAvatar;
