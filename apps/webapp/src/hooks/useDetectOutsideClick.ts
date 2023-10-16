import { RefObject, useCallback, useEffect } from 'react';

export const useDetectOutsideClick = <RefType extends HTMLElement = HTMLElement>(
  ref: RefObject<RefType>,
  handler: () => void,
) => {
  const listener = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation();

      if (!ref?.current || ref.current?.contains(event.target as Node)) {
        return null;
      }

      handler();

      return null;
    },
    [handler, ref],
  );

  useEffect(() => {
    document.addEventListener('mousedown', listener);

    return () => document.removeEventListener('mousedown', listener);
  }, [handler, listener]);

  return null;
};
