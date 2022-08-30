import React, { useEffect, useState } from 'react';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import PhotoUploadForm from '../../../components/PhotoUploadForm';
import Slider from '../../../components/Slider';
import { createStory } from '../../../context/actions/storyActions';
import { BASE_URL } from '../../../data/constants';
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
        <Modal classes="story" setIsOpenModal={setIsModalOpen}>
          <>
            <aside className="stories_sidebar flex_col">
              <h1>Your Story</h1>
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
            </aside>
            <div className="stories_container">
              {newStory?.image ? (
                <Slider>{[<Slider.Item item={newStory} mode={editStoryMode} />]}</Slider>
              ) : (
                <PhotoUploadForm resourceId={user?.userId} updateAction={createStory} />
              )}
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default StoryCreateCard;
