import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import FormComponent from '../../../components/FormComponent';
import Modal from '../../../components/Modal';
import PhotoUploadForm from '../../../components/PhotoUploadForm';
import Slider from '../../../components/Slider';
import { createStory, listMyStories, updateStory } from '../../../context/actions/storyActions';
import { STORY_CREATE_RESET, STORY_UPDATE_RESET } from '../../../context/constants/storyConstants';
import { BASE_URL } from '../../../data/constants';
import addStoryMessageInitialInputState from '../../../data/inputs/addStoryMessageInitialInputState';
import useTypedSelector from '../../../hooks/useTypedSelector';
import StoryType from '../../../types/StoryType';
import StoryMessageForm from './StoryMessageForm';
import './styles/StoryCreateCard.css';

const StoryCreateCard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStory, setNewStory] = useState<StoryType | null>(null);
  const [editStoryMode, setEditStoryMode] = useState<string>('');

  const { success: successCreate, story: createdStory } = useTypedSelector(
    (state) => state.storyCreate
  );
  const { success: successUpdate, story: updatedStory } = useTypedSelector(
    (state) => state.storyUpdate
  );
  const { user } = useTypedSelector((state) => state.userDetails);

  useEffect(() => {
    if (successCreate) setNewStory(createdStory);
    if (successUpdate) setIsModalOpen(false);
    if ((successCreate || successUpdate) && !isModalOpen) dispatch(listMyStories());
    if (!isModalOpen) {
      setEditStoryMode('');
      setNewStory(null);
      dispatch({ type: STORY_CREATE_RESET });
      dispatch({ type: STORY_UPDATE_RESET });
    }
  }, [updatedStory, createdStory, successCreate, successUpdate, isModalOpen, dispatch]);

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
              <Button
                classes={'blue rounded'}
                onClick={() => setEditStoryMode(!editStoryMode ? 'add_message' : '')}
              >
                Add text
              </Button>
            ) : (
              <></>
            )}
          </div>
          {editStoryMode === 'add_message' ? (
            <div className="message">
              <StoryMessageForm
                inputData={addStoryMessageInitialInputState}
                resourceId={newStory?.storyId}
                updateAction={updateStory}
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
