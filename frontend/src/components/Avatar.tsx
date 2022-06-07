import React from 'react';

import './styles/Avatar.css';
import { BASE_URL } from '../constants/constants';
import getRandomNumber from '../helpers/getRandomNumber';
import AvatarProps from '../models/components/AvatarProps';

// classes: image_only, name_only, small

const Avatar: React.FC<AvatarProps> = ({ classes, imageUrl, fullName }) => {
  const firstName = fullName?.split(' ')[0];
  const firstInitials = `${fullName?.split(' ')?.[0]?.[0]}${fullName?.split(' ')?.[1]?.[0] || ''}`;

  const backgroundColors = ['peeps', 'watermelon', 'mimosa', 'kiwi', 'hendrix', 'thanos'];

  return (
    <div className={`avatar  ${classes ? classes : ''}`}>
      <div className="image ">
        {imageUrl ? (
          <img
            src={imageUrl?.startsWith('http') ? imageUrl : `${BASE_URL}/${imageUrl}`}
            alt={fullName || 'image'}
          />
        ) : fullName ? (
          <div
            className="initials"
            style={{
              background: `var(--${
                backgroundColors[getRandomNumber(0, backgroundColors.length - 1)]
              })`
            }}
          >
            {firstInitials}
          </div>
        ) : (
          <i className="fa fa-user" />
        )}
      </div>
      {fullName && !classes?.includes('large') && (
        <div className="name">{classes?.includes('header') ? firstName : fullName}</div>
      )}
    </div>
  );
};

export default Avatar;
