import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Hash links scroll to their own target; POP leaves the browser's
    // scroll restoration intact so Back returns to the previous position.
    if (hash || navigationType === 'POP') return;
    window.scrollTo(0, 0);
  }, [pathname, hash, navigationType]);

  return null;
};
