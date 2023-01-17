import React from 'react';

import './styles/Avatar.css';
import { BASE_URL } from '../data/constants';
import getRandomNumber from '../utils/getRandomNumber';
import AvatarProps from '../types/components/AvatarProps';

// classes: image_only, name_only, small

const Avatar: React.FC<AvatarProps> = ({
  classes,
  imageUrl,
  firstName = '',
  lastName = '',
  additionalInfo = ''
}) => {
  const initials = `${firstName?.[0]}${lastName?.[0] || ''}`;

  const backgroundColors = ['peeps', 'watermelon', 'mimosa', 'kiwi', 'hendrix', 'thanos'];

  return (
    <div className={`avatar  ${classes ? classes : ''}`}>
      <div className="image ">
        {imageUrl ? (
          <img src={imageUrl} alt={firstName || 'image'} />
        ) : firstName ? (
          <div
            className="initials"
            style={{
              background: `var(--${
                backgroundColors[getRandomNumber(0, backgroundColors.length - 1)]
              })`
            }}
          >
            {initials}
          </div>
        ) : (
          <i className="fa fa-user" />
        )}
      </div>

      {firstName && !classes?.includes('large') && (
        <div className="info flex_col">
          <div className="name">
            {classes?.includes('header') ? firstName : `${firstName} ${lastName}`}
          </div>

          {additionalInfo && <h4>{additionalInfo}</h4>}
        </div>
      )}
    </div>
  );
};

export default Avatar;
