import { useState } from 'react';
import SliderType, { SliderItemType } from '../types/components/SliderTypeProps';
import Button from './Button';

import './styles/Slider.css';

const Slider: SliderType = ({ dots = false, children = [], slideIndex = 0, setSlideIndex }) => {
  const prevSlideHandler = () => {
    setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : children.length - 1);
  };

  const nextSlideHandler = () => {
    setSlideIndex(slideIndex !== children.length - 1 ? slideIndex + 1 : 0);
  };

  return (
    <div className="slider_container">
      <ul className="slides_list">
        {children.map((slide, index) => (
          <li className={slideIndex === index ? 'slide active' : 'slide'} key={index}>
            {slide}
          </li>
        ))}
      </ul>

      <button
        className={`slider_btn prev ${slideIndex === 0 ? 'hidden' : ''}`}
        onClick={prevSlideHandler}
      >
        <i className="fas fa-chevron-left" />
      </button>

      <button
        className={`slider_btn next ${slideIndex === children.length - 1 ? 'hidden' : ''}`}
        onClick={nextSlideHandler}
      >
        <i className="fas fa-chevron-right" />
      </button>

      {dots && (
        <div className="slider_dots">
          {children.map((_, index) => (
            <div
              className={slideIndex === index ? 'dot active' : 'dot'}
              onClick={() => setSlideIndex(index)}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Item: SliderItemType = ({
  item,
  button_controls = false,
  isFullScreen = false,
  setIsFullScreen
}) => {
  // TO DO fullscreen

  const [zoom, setZoom] = useState(1);
  return (
    <div className="slide_container">
      <div className="image flex">
        <img
          src={item?.image}
          alt="story"
          className="image"
          style={{
            transform: `scale(${zoom})`
          }}
        />
        {item?.message ? (
          <div className="message">
            <span
              style={{
                color: `${item?.messageColor}`,
                fontSize: `${item?.messageSize}px`,
                backgroundColor: `${item?.messageBackground}`
              }}
            >
              {item?.message}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        className="blurred_background"
        style={{
          backgroundImage: `url(${item?.image})`
        }}
      />
      {button_controls && (
        <div className="button_controls flex">
          <Button classes="icon" onClick={() => setZoom(zoom + 0.25)}>
            <i className="fas fa-search-plus" />
          </Button>
          <Button classes="icon" onClick={() => setZoom(zoom - 0.25)}>
            <i className="fas fa-search-minus" />
          </Button>
          <Button classes="icon" onClick={() => setIsFullScreen(!isFullScreen)}>
            <i className={`fas fa-${isFullScreen ? 'compress' : 'expand'}`} />
          </Button>
        </div>
      )}
    </div>
  );
};

Slider.Item = Item;

export default Slider;
