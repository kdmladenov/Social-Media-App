import React, { useState } from 'react';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import InputBoxWithAvatar from '../../../components/InputBoxWithAvatar';
import Modal from '../../../components/Modal';
import { createPost } from '../../../context/actions/postActions';
import { POST } from '../../../data/constants';
import usersDummyData from '../../../data/inputs/dummyInputs/usersDummyData';
import useTypedSelector from '../../../hooks/useTypedSelector';

import './styles/PostCreate.css';

const currentUser = usersDummyData[0];

const PostCreateCard: React.FC = () => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const {  user } = useTypedSelector((state) => state.userDetails); 

  return (
    <div className="post_create_card card">
      <InputBoxWithAvatar
        onClick={() => setShowCreatePostModal(true)}
        currentUserDetails={currentUser}
        createAction={createPost}
        validationMin={POST.MIN_MESSAGE_LENGTH}
        validationMax={POST.MAX_MESSAGE_LENGTH}
        placeholder={`What's on your mind, ${currentUser.firstName}?`}
        errorMessage={`The comment should be ${POST.MIN_MESSAGE_LENGTH} - ${POST.MAX_MESSAGE_LENGTH} characters long`}
      />
      <hr />
      <div className="button_group">
        <Button classes="icon">
          <i className="fa fa-eye" />
        </Button>
        <Button classes="icon">
          <i className="fa fa-eye" />
        </Button>
      </div>
      {showCreatePostModal && (
        <Modal classes="image" setIsOpenModal={setShowCreatePostModal}>
          <div className="create_form">
            <h1>Create Post</h1>
            <Avatar imageUrl={user?.avatar} firstName={user?.firstName} lastName={user?.lastName} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostCreateCard;
