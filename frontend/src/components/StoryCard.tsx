import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import StoryType from '../models/StoryType';
import Avatar from './Avatar';
import './styles/StoryCard.css';

export const StoryCard: React.FC<{ story: StoryType }> = ({ story }) => {

  const {
    city,
    country,
    createdAt,
    feelingType,
    feelingTypeId,
    image,
    isDeleted,
    locationId,
    message,
    storyId,
    totalDBItems,
    updatedAt,
    userAvatar,
    userFirstName,
    userId,
    userLastName
  } = story;

  return (
    <div className="story_card">
      <div className="story_image">
        <img
          src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
          alt={image}
          className="image"
          crossOrigin="anonymous"
        />
      </div>
      <Avatar classes="image_only" imageUrl={userAvatar} />
      <span className="author_name">{`${userFirstName} ${userLastName}`}</span>
    </div>
  );
};
