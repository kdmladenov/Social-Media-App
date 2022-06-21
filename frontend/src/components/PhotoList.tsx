import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostImageType from '../models/PostImageType';
import Button from './Button';
import './styles/PhotoList.css';

const PhotoList: React.FC<{ screen: string; photos: PostImageType[] }> = ({
  screen = '',
  photos
}) => {
  const navigate = useNavigate();

  const photoCount =
    screen === 'profile_posts_screen' ? 9 : 'profile_about_screen' ? 12 : photos.length;

  return (
    <div className={`photo_list card flex_col ${screen}`}>
      <div className="header flex">
        <h1 onClick={() => navigate('/profile/photos')}>Photos</h1>
        <Button classes="text" onClick={() => navigate('/profile/photos')}>
          {screen === 'profile_posts_screen' ? ' See all photos' : 'Add Photos'}
        </Button>
      </div>
      <div className="photo_list">
        {photos.slice(0, photoCount).map((photo) => (
          <img
            // src={image?.startsWith('http') ? image : `${BASE_URL}/${image}`}
            src={photo.image}
            alt={photo.image}
          />
        ))}
      </div>
      Pagination
    </div>
  );
};

export default PhotoList;
