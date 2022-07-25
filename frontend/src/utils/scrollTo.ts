import { RefObject } from 'react';

// Scroll to a specified element
const scrollTo = (
  ref: RefObject<HTMLElement>,
  margin: number = 0,
  behavior: ScrollBehavior | undefined = 'smooth'
) => {
  window.scrollTo({
    top: ref.current!.offsetTop - margin,
    behavior
  });
};

export default scrollTo;
