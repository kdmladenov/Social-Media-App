import React, { useState } from 'react';
import './styles/ShowMoreButton.css';

const ShowMoreButton: React.FC<{ text?: string; breakpoint: number }> = ({ text, breakpoint }) => {
  const [showMore, setShowMore] = useState(false);

  const numberOfChars = showMore ? text?.length : breakpoint;

  return (
    <p className="show_more_button">
      <span>{text?.slice(0, numberOfChars)} </span>
      <span className="show_btn" onClick={() => setShowMore(!showMore)}>
        {!showMore ? ' ...show more' : ' ...show less'}
      </span>
    </p>
  );
};

export default ShowMoreButton;
