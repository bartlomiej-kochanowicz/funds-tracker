import { useState, useEffect } from 'react';
import { BREAKPOINTS } from 'constants/breakpoints';

type Media = 'min' | 'max';

export const useBreakpoint = (name: keyof typeof BREAKPOINTS, type: Media) => {
  const pixels = BREAKPOINTS[name];

  const getMatchMediaQuery = (mediaType: Media) => {
    if (mediaType === 'min') {
      return `(min-width: ${pixels}px)`;
    }

    return `(max-width: ${pixels}px)`;
  };

  const matchMediaQuery = getMatchMediaQuery(type);

  const [match, setMatch] = useState(
    typeof window !== 'undefined' ? window.matchMedia(matchMediaQuery).matches : false,
  );

  useEffect(() => {
    const onMatch = (event: MediaQueryListEvent) => setMatch(event.matches);

    const matcher = window.matchMedia(matchMediaQuery);

    matcher.addListener(onMatch);

    return () => matcher.removeListener(onMatch);
  }, [pixels, matchMediaQuery]);

  return match;
};
