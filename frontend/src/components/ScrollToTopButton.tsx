import React, { useState } from 'react';

import './styles/ScrollToTopButton.css';
import Tooltip from './Tooltip';

const ScrollToTopButton: React.FC = () => {
  const [topOfPage, setTopOfPage] = useState(true);

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    setTopOfPage(
      document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? false : true
    );
  };

  const scrollToTop = () => {
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`scroll_to_top_btn ${!topOfPage ? 'top' : ''}`} onClick={scrollToTop}>
      <Tooltip direction="top" text="Scroll To Top">
        <i className="fa fa-arrow-circle-up" />
      </Tooltip>
    </div>
  );
};

export default ScrollToTopButton;
