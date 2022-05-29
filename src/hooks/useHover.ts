import { useState } from 'react';

export const useHover = () => {
  const [isHover, setHover] = useState<boolean>(false);

  const props = {
    onMouseOver: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  return { props, isHover };
};
