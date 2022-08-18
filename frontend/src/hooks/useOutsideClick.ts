import { useEffect, useRef } from 'react';

const useOutsideClick = (callback: () => void) => {
  let nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!nodeRef?.current?.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return nodeRef;
};

export default useOutsideClick;
