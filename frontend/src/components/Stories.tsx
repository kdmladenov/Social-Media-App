import React from 'react';
import { Link } from 'react-router-dom';
import storiesDummyData from '../inputs/dummyInputs/storiesDummyData';
import Carousel from './Carousel';
import { StoryCard } from './StoryCard';
import './styles/Stories.css';

const Stories = () => {
  const storiesList = storiesDummyData;
  return (
    <div className="stories">
      <Carousel>
        <ul>
          {storiesList.map((story) => (
            <li key={story.storyId}>
              <Link to={`/story/${story.storyId}`}>
                <StoryCard image={story.image} author={story.author} message={story.message} />
              </Link>
            </li>
          ))}
        </ul>
      </Carousel>
    </div>
  );
};

export default Stories;
