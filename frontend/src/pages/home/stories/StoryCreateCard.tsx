import React, { useEffect, useState } from 'react';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import FormComponent from '../../../components/FormComponent';
import Modal from '../../../components/Modal';
import PhotoUploadForm from '../../../components/PhotoUploadForm';
import Slider from '../../../components/Slider';
import { createStory, updateStory } from '../../../context/actions/storyActions';
import { BASE_URL } from '../../../data/constants';
import addStoryMessageInitialInputState from '../../../data/inputs/addPostMessageInitialInputState';
import useTypedSelector from '../../../hooks/useTypedSelector';
import StoryType from '../../../types/StoryType';
import './styles/StoryCreateCard.css';

const StoryCreateCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStory, setNewStory] = useState<StoryType>();
  const [editStoryMode, setEditStoryMode] = useState<string>('');

  const { success: successCreate, story: createdStory } = useTypedSelector(
    (state) => state.storyCreate
  );
  const { success: successUpdate, story: updatedStory } = useTypedSelector(
    (state) => state.storyUpdate
  );
  const { user } = useTypedSelector((state) => state.userDetails);

  useEffect(() => {
    if (successCreate) {
      setNewStory(createdStory);
    } else if (successUpdate) {
      setNewStory(updatedStory);
    }
  }, [updatedStory, createdStory, successCreate, successUpdate]);

  return (
    <>
      <li
        className="story_create_card  card flex_col"
        key="story_create"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="story_image">
          <img
            src={user?.avatar?.startsWith('http') ? user?.avatar : `${BASE_URL}/${user?.avatar}`}
            alt={user?.firstName || 'image'}
            crossOrigin="anonymous"
          />
        </div>
        <div className="icon flex">
          <i className="fa fa-plus"></i>
        </div>
        <span>Create story</span>
      </li>

      {isModalOpen && (
        <Modal classes="story_create flex_col" setIsOpenModal={setIsModalOpen}>
          <div className="story_create_header flex">
            <Avatar
              classes="big"
              imageUrl={user?.avatar}
              firstName={user?.firstName}
              lastName={user?.lastName}
            />
            {newStory?.image ? (
              <Button onClick={() => setEditStoryMode('add_message')}>Add text</Button>
            ) : (
              <></>
            )}
          </div>
          {editStoryMode === 'add_message' ? (
            <div className="message">
              <FormComponent
                inputData={addStoryMessageInitialInputState}
                resourceId={newStory?.storyId}
                updateAction={updateStory}
                mode={'update'}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="story_container">
            {newStory?.image ? (
              <Slider>{[<Slider.Item item={newStory} key="new" />]}</Slider>
            ) : (
              <PhotoUploadForm
                resourceId={user?.userId}
                updateAction={createStory}
                title="Select a story image"
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default StoryCreateCard;
