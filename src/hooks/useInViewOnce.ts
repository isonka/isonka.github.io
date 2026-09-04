import { useEffect, useRef, useState } from 'react';
import { isPrerender } from '../utils/prerender';

export function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Reveal state is animation, not content: leaving it at the first-paint value
    // keeps prerendered HTML identical to the client's first render.
    if (isPrerender()) return;

    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setInView(true);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect();
          requestAnimationFrame(() => requestAnimationFrame(reveal));
        }
      },
      { threshold: 0.28, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}
