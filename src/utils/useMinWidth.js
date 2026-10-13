import { useContext, useEffect, useState } from 'react';
import { Context as ResponsiveContext } from 'react-responsive';

const matchesMinWidth = (query) => (
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia(query).matches
    : false
);

/**
 * True while the viewport is at least `minWidth` px wide, updating live on resize.
 *
 * Replaces react-responsive's <MediaQuery>: in 8.x its effect cleanup disposes the
 * matchMedia listener and React 18 StrictMode's remount never recreates it, so the
 * header stayed on whichever layout it first rendered. A ResponsiveContext width
 * (tests, SSR) still takes precedence, as it did with <MediaQuery>.
 */
const useMinWidth = (minWidth) => {
  const device = useContext(ResponsiveContext);
  const query = `(min-width: ${minWidth}px)`;
  const [matches, setMatches] = useState(() => matchesMinWidth(query));

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    // Safari < 14 only has the deprecated addListener API.
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [query]);

  if (device && device.width != null) {
    return device.width >= minWidth;
  }
  return matches;
};

export default useMinWidth;
