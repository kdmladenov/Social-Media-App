import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useTypedSelector from '../hooks/useTypedSelector';
import defaultEndpoint from '../inputs/defaultEndpoint';
import { listMyStories } from '../state/actions/storyActions';
import Carousel from './Carousel';
import Loader from './Loader';
import Message from './Message';
import { StoryCard } from './StoryCard';
import './styles/StoriesMy.css';

const StoriesMy = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const [endpoint, setEndpoint] = useState(defaultEndpoint['storiesMy']);

  const { stories, loading, error } = useTypedSelector((state) => state.storiesMyList);

  useEffect(() => {
    // dispatch({ type: STORY_CREATE_RESET });
    // if (userInfo?.role !== 'admin') {
    //   navigate('/login');
    // }
    // if (successCreate) {
    //   navigate(`/admin/products/${createdStory.storyId}/edit/details`);
    // } else {
    const { page, pageSize, sort, search } = endpoint;
    dispatch(listMyStories(`${page}${pageSize}${sort}${search}`));
    // }
  }, [
    dispatch,
    // navigate,
    // userInfo,
    // successDelete,
    // successRestore,
    // successCreate,
    // createdPost,
    endpoint
  ]);

  return (
    <section className="stories_my">
      {loading ? (
        //  || loadingDelete || loadingRestore || loadingCreate
        <Loader />
      ) : error ? (
        // || errorDelete || errorRestore || errorCreate
        <Message type="error">
          {
            error
            // || errorDelete || errorRestore || errorCreate
          }
        </Message>
      ) : stories?.length > 0 ? (
        <Carousel>
          <ul>
            {stories.map((story) => (
              <li key={story.storyId}>
                <Link to={`/story/${story.storyId}`}>
                  <StoryCard story={story} />
                </Link>
              </li>
            ))}
          </ul>
        </Carousel>
      ) : (
        <h2>You have no posts</h2>
      )}
    </section>
  );
};

export default StoriesMy;
