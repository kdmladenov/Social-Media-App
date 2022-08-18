import { useEffect, useState } from 'react';

const useCreateDiv = (idDiv: string) => {
  const [loaded, setLoaded] = useState(false);
  const [divId] = useState(idDiv);

  useEffect(() => {
    const newDiv = document.createElement('div');
    newDiv.id = divId;

    document.getElementsByTagName('body')[0].prepend(newDiv);

    setLoaded(true);

    return () => {
      document.getElementsByTagName('body')[0].removeChild(newDiv);
    };
  }, [divId]);

  return { loaded, divId };
};

export default useCreateDiv;
