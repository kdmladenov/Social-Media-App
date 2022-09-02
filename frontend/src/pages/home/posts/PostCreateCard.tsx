import React, { useEffect, useState } from 'react';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import FormComponent from '../../../components/FormComponent';
import InputBoxWithAvatar from '../../../components/InputBoxWithAvatar';
import Modal from '../../../components/Modal';
import PhotoUploadForm from '../../../components/PhotoUploadForm';
import Slider from '../../../components/Slider';
import { createPost, updatePost } from '../../../context/actions/postActions';
import { POST } from '../../../data/constants';
import addPostMessageInitialInputState from '../../../data/inputs/addPostMessageInitialInputState';
import usersDummyData from '../../../data/inputs/dummyInputs/usersDummyData';
import useTypedSelector from '../../../hooks/useTypedSelector';
import PostType from '../../../types/PostType';

import './styles/PostCreate.css';

const currentUser = usersDummyData[0];

const PostCreateCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState<PostType>();
  const [editPostMode, setEditPostMode] = useState<string>('');

  const { user } = useTypedSelector((state) => state.userDetails);

  const { success: successCreate, post: createdPost } = useTypedSelector(
    (state) => state.postCreate
  );
  const { success: successUpdate, post: updatedPost } = useTypedSelector(
    (state) => state.postUpdate
  );

  useEffect(() => {
    if (successCreate) {
      setNewPost(createdPost);
    } else if (successUpdate) {
      setNewPost(updatedPost);
    }
  }, [updatedPost, createdPost, successCreate, successUpdate]);

  return (
    <div className="post_create_card card">
      <InputBoxWithAvatar
        onClick={() => setIsModalOpen(true)}
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
      {isModalOpen && (
        <Modal classes="post_create flex_col" setIsOpenModal={setIsModalOpen}>
          <div className="story_create_header flex">
            <Avatar
              classes="big"
              imageUrl={user?.avatar}
              firstName={user?.firstName}
              lastName={user?.lastName}
            />
            {newPost?.images?.length ? (
              <Button onClick={() => setEditPostMode('add_message')}>Add text</Button>
            ) : (
              <></>
            )}
          </div>
          {editPostMode === 'add_message' ? (
            <div className="message">
              <FormComponent
                inputData={addPostMessageInitialInputState}
                resourceId={newPost?.postId}
                updateAction={updatePost}
                mode={'update'}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="story_container">
            {newPost?.images?.length ? (
              <Slider>{[<Slider.Item item={newPost} key="new" />]}</Slider>
            ) : (
              <PhotoUploadForm
                resourceId={user?.userId}
                updateAction={createPost}
                title="Select post images"
                multiple={true}
                name="postImages"
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PostCreateCard;
