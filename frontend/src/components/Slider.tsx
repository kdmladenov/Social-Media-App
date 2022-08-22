import { useState } from 'react';
import { BASE_URL } from '../data/constants';
import SliderType, { SliderItemType } from '../types/components/SliderTypeProps';
import Button from './Button';

import './styles/Slider.css';

const Slider: SliderType = ({ dots, children = [], slideIndex, setSlideIndex }) => {
  const prevSlideHandler = () => {
    setSlideIndex(slideIndex !== 0 ? slideIndex - 1 : children.length - 1);
  };

  const nextSlideHandler = () => {
    setSlideIndex(slideIndex !== children.length - 1 ? slideIndex + 1 : 0);
  };
  console.log('next');
  return (
    <div className="slider_container">
      <ul className="slides_list">
        {children.map((slide, index) => (
          <li className={slideIndex === index ? 'slide active' : 'slide'} key={index}>
            {slide}
          </li>
        ))}
      </ul>

      <button className="slider_btn prev" onClick={prevSlideHandler}>
        <i className="fas fa-chevron-left" />
      </button>
      <button className="slider_btn next" onClick={nextSlideHandler}>
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

const Item: SliderItemType = ({ item, button_controls = false }) => {
  // TO DO fullscreen
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  return (
    <div className={`slide_container ${isFullScreen ? 'full_screen' : ''}`}>
      <div className="image flex">
        <img
          crossOrigin="anonymous"
          src={item?.image?.startsWith('http') ? item?.image : `${BASE_URL}/${item?.image}`}
          alt="story"
          className="image"
          style={{
            transform: `scale(${zoom})`
          }}
        />
      </div>
      <div
        className="blurred_background"
        style={{
          backgroundImage: `url(${
            item?.image?.startsWith('http') ? item?.image : `${BASE_URL}/${item?.image}`
          })`
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
          <Button classes="icon">
            <i className="fas fa-tag" />
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
