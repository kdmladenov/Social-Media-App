import React, { useRef, useState } from 'react';

import './styles/Carousel.css';
import { useResize } from '../hooks/useResize';
import CarouselProps from '../types/components/CarouselProps';

const Carousel: React.FC<CarouselProps> = ({ title, children }) => {
  const [showControls, setShowControls] = useState(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const bodyPosition = useResize(sliderRef);

  const slide = (direction: string) => {
    let scrollCompleted = 0;
    const slider = setInterval(() => {
      direction === 'left'
        ? (sliderRef.current!.scrollLeft -= 20)
        : (sliderRef.current!.scrollLeft += 20);

      scrollCompleted += 20;
      if (scrollCompleted >= bodyPosition.width) {
        window.clearInterval(slider);
      }
    }, 1);
  };

  return (
    <div
      className="carousel_container"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="carousel_header">{title}</div>
      <div className={`carousel_slider ${!showControls && 'hidden_scrollbar'}`} ref={sliderRef}>
        {children}
      </div>
      {showControls && (
        <button onClick={() => slide('right')} className="carousel_btn next">
          <i className="fas fa-chevron-right" />
        </button>
      )}
      {showControls && (
        <button onClick={() => slide('left')} className="carousel_btn prev">
          <i className="fas fa-chevron-left" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
