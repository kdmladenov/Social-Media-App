import React, { useEffect, useState } from 'react';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import DropDown from '../../../components/Dropdown';
import FormComponent from '../../../components/FormComponent';
import InputBoxWithAvatar from '../../../components/InputBoxWithAvatar';
import Modal from '../../../components/Modal';
import PhotoUploadForm from '../../../components/PhotoUploadForm';
import Slider from '../../../components/Slider';
import Tooltip from '../../../components/Tooltip';
import { createPost, updatePost } from '../../../context/actions/postActions';
import { BASE_URL, POST } from '../../../data/constants';
import addPostMessageInitialInputState from '../../../data/inputs/addPostMessageInitialInputState';
import usersDummyData from '../../../data/inputs/dummyInputs/usersDummyData';
import useTypedSelector from '../../../hooks/useTypedSelector';
import PostType from '../../../types/PostType';
import getPostImagesClass from '../../../utils/getPostImagesClass';

import './styles/PostCreateCard.css';

const currentUser = usersDummyData[0];

const PostCreateCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState<PostType>();
  const [modalScreen, setModalScreen] = useState<string>('main');

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

  console.log(newPost, 'newPost');

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
          {modalScreen === 'main' ? (
            <>
              <div className="title flex">
                <span>Create post</span>
              </div>
              <div className="post_create_header flex">
                <Avatar
                  classes="big"
                  imageUrl={user?.avatar}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                />
              </div>

              {newPost?.images?.length ? (
                <>
                  <div className="post_create_message flex">Text</div>
                  <ul className="post_create_action_list flex">
                    <span>Add to your post</span>
                    <ul className="button_group flex">
                      <Tooltip direction="top" text="Tag people">
                        <i
                          className="fas fa-user-tag"
                          onClick={() => setModalScreen('tag_people')}
                        ></i>
                      </Tooltip>
                      <Tooltip direction="top" text="Add Feeling">
                        <i className="fa fa-smile" onClick={() => setModalScreen('feelings')}></i>
                      </Tooltip>
                      <Tooltip direction="top" text="Add location">
                        <i className="fa fa-map" onClick={() => setModalScreen('add_location')}></i>
                      </Tooltip>
                    </ul>
                  </ul>
                  <div className="images_container">
                    <ul className={`images ${getPostImagesClass(newPost?.images)}`}>
                      {newPost?.images.map((image, index) => (
                        <li className={`image${index + 1}`}>
                          <img
                            crossOrigin="anonymous"
                            src={
                              image?.image?.startsWith('http')
                                ? image?.image
                                : `${BASE_URL}/${image?.image}`
                            }
                            alt="post"
                          />
                          {newPost?.images?.length > 4 && (
                            <span>{`+${newPost?.images.length - 4} more`}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <PhotoUploadForm
                  resourceId={user?.userId}
                  updateAction={createPost}
                  multiple={true}
                  name="postImages"
                />
              )}
            </>
          ) : modalScreen === 'feelings' ? (
            <>
              <span>Feelings</span>
            </>
          ) : modalScreen === 'tag_people' ? (
            <>
              <span>People tags</span>
            </>
          ) : modalScreen === 'add_location' ? (
            <>
              <span>Add location</span>
            </>
          ) : (
            <></>
          )}
        </Modal>
      )}
    </div>
  );
};

export default PostCreateCard;
