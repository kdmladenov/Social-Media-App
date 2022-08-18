import { useCallback, useEffect, useRef } from 'react';

const useThrottle = (callback: () => void, delay: number, dependencies: string[]) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(reset, [...dependencies, reset]);

  useEffect(clear, []);
};

export default useThrottle;
