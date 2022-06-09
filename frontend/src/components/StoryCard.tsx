import React from 'react';
import StoryType from '../models/StoryType';
import Avatar from './Avatar';
import './styles/StoryCard.css';

export const StoryCard: React.FC<StoryType> = ({ image, author }) => {
  return (
    <div className="story_card">
      <div className="story_image">
        <img src={image.image} alt="" />
      </div>
      <Avatar classes="image_only" imageUrl={author.avatar} />
      <span className="author_name">{`${author.firstName} ${author.lastName}`}</span>
    </div>
  );
};
