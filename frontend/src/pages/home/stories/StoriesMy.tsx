import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import Carousel from '../../../components/Carousel';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import Modal from '../../../components/Modal';
import Slider from '../../../components/Slider';
import { listMyStories } from '../../../context/actions/storyActions';
import { BASE_URL } from '../../../data/constants';
import defaultEndpoint from '../../../data/inputs/defaultEndpoint';
import useTypedSelector from '../../../hooks/useTypedSelector';
import getTimeDuration from '../../../utils/getTimeDuration';
import StoryCreateCard from './StoryCreateCard';
import './styles/StoriesMy.css';

const StoriesMy = () => {
  const dispatch = useDispatch();
  const [endpoint, setEndpoint] = useState(defaultEndpoint['storiesMy']);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { stories, loading, error } = useTypedSelector((state) => state.storiesMyList);

  const storyModalHandler = (storyId: number) => {
    setSelectedStoryIndex(stories.findIndex((story) => story.storyId === storyId));
    setIsModalOpen(true);
  };

  useEffect(() => {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listMyStories(`${page}${pageSize}${sort}${search}`));

    // }
  }, [dispatch, endpoint]);

  return (
    <section className="stories_my">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : stories?.length > 0 ? (
        <Carousel>
          <ul>
            <StoryCreateCard />
            {stories.map((story) => (
              <li
                className="story_card card"
                key={story?.storyId}
                onClick={() => storyModalHandler(story.storyId)}
              >
                <div className="story_image">
                  <img
                    src={
                      story?.image?.startsWith('http')
                        ? story?.image
                        : `${BASE_URL}/${story?.image}`
                    }
                    alt={story?.userFirstName}
                    className="image"
                  />
                </div>
                <Avatar classes="image_only" imageUrl={story?.userAvatar} />
                <span className="author_name">{`${story?.userFirstName} ${story?.userLastName}`}</span>
              </li>
            ))}
          </ul>
        </Carousel>
      ) : (
        <h2>You have no posts</h2>
      )}
      {isModalOpen && (
        <Modal classes="story" setIsOpenModal={setIsModalOpen}>
          <>
            <aside className="stories_sidebar flex_col">
              <h1>Stories</h1>
              <div className="add_story">
                <h4>Your Story</h4>
                <Button classes="icon">
                  <i className="fa fa-plus"></i>
                </Button>
              </div>
              <h4>All Stories</h4>
              <ul className="flex_col">
                {stories?.map((story, index) => (
                  <li
                    className={`story_button flex ${selectedStoryIndex === index ? 'active' : ''}`}
                    onClick={() =>
                      setSelectedStoryIndex(
                        stories.findIndex((item) => item.storyId === story.storyId)
                      )
                    }
                    key={story?.storyId}
                  >
                    <Avatar
                      classes="big"
                      imageUrl={story?.userAvatar}
                      firstName={story?.userFirstName}
                      lastName={story?.userLastName}
                      additionalInfo={getTimeDuration(
                        story?.updatedAt ? story?.updatedAt : story?.createdAt
                      )}
                    />
                  </li>
                ))}
              </ul>
            </aside>
            <div className="stories_container">
              <Slider
                dots={false}
                slideIndex={selectedStoryIndex}
                setSlideIndex={setSelectedStoryIndex}
              >
                {stories?.map((story) => (
                  <Slider.Item item={story} key={story?.storyId}/>
                ))}
              </Slider>
            </div>
          </>
        </Modal>
      )}
    </section>
  );
};

export default StoriesMy;
