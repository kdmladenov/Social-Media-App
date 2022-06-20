import React from 'react';
import PostImageType from '../models/PostImageType';
import Button from './Button';
import './styles/PhotoList.css';

const PhotoList: React.FC<{ screen: string; photos: PostImageType[] }> = ({
  screen = '',
  photos
}) => {
  return (
    <div className={`photo_list card flex_col ${screen}`}>
      <div className="header flex">
        <h1>Photos</h1>
        <Button classes="text"> See all photos</Button>
      </div>
      <div className="photo_list">
        {photos.slice(0, screen === 'profile_posts_screen' ? 9 : photos.length - 1).map((photo) => (
          <img
            // src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
            src={photo.image}
            alt={photo.image}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoList;
