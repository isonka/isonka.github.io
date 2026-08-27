import type { ReactNode } from 'react';
import { useInViewOnce } from '../hooks/useInViewOnce';

type RevealProps = {
  className?: string;
  children: ReactNode;
};

export const Reveal: React.FC<RevealProps> = ({ className = '', children }) => {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const classes = [className, inView ? 'is-in' : ''].filter(Boolean).join(' ');

  return (
    <section ref={ref} className={classes}>
      {children}
    </section>
  );
};
