import React from 'react';

interface AvatarProps {
  classes?: string;
  imageUrl?: string;
  firstName?: string;
  additionalInfo?: string;
  lastName?: string;
  secondLine?: string | React.ReactNode;
  thirdLine?: string | React.ReactNode;
}

export default AvatarProps;
