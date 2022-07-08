import React, { useState } from 'react';
import Button from './Button';
import './styles/ShowMoreButton.css';

const ShowMoreButton: React.FC<{ text?: string; breakpoint: number }> = ({ text, breakpoint }) => {
  const [showMore, setShowMore] = useState(false);

  const numberOfItems = showMore ? text?.length : breakpoint;

  return (
    <div className="show_more_button">
      {text?.slice(0, numberOfItems)}{' '}
      <Button classes="text" onClick={() => setShowMore(!showMore)}>
        {!showMore ? ' ...show more' : ' ...show less'}
      </Button>
    </div>
  );
};

export default ShowMoreButton;
