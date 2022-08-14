import React from 'react';
import { photoList } from '../../data/inputs/dummyInputs/imagesDummyData';
import PhotoList from './PhotoList';
import './styles/ProfilePhotos.css';

const ProfilePhotos: React.FC = () => {
  return (
    <div className="profile_photos">
      <PhotoList screen="profile_photos_screen" photos={photoList} />
    </div>
  );
};

export default ProfilePhotos;
