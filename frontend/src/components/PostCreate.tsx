import React from 'react';
import { POST } from '../constants/constants';
import usersDummyData from '../inputs/dummyInputs/usersDummyData';
import { createPost } from '../state/actions/postActions';
import Button from './Button';
import InputBoxWithAvatar from './InputBoxWithAvatar';
import './styles/PostCreate.css';

const currentUser = usersDummyData[0];

const PostCreate: React.FC = () => {
  return (
    <div className="post_create card">
      <InputBoxWithAvatar
        // resourceId={postId}
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
    </div>
  );
};

export default PostCreate;
