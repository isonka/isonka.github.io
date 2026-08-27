import { useEffect, useRef, type FC } from 'react';
import { Link } from 'react-router-dom';
import type { Workout } from '../data/workouts';
import { useInViewOnce } from '../hooks/useInViewOnce';

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: FC<WorkoutCardProps> = ({ workout }) => {
  const { ref, inView } = useInViewOnce<HTMLLIElement>();
  const mediaInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const mediaInner = mediaInnerRef.current;
    const card = ref.current;
    if (!mediaInner || !card) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = card.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const progress = (rect.top + rect.height / 2 - viewH / 2) / viewH;
      const y = progress * -0.25 * rect.height;
      mediaInner.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return (
    <li ref={ref} className={`workout-item${inView ? ' is-inview' : ''}`}>
      <Link to={workout.to} className="workout-card">
        <div className="workout-card-content">
          <div className="workout-card-media">
            <div className="workout-card-media-inner" ref={mediaInnerRef}>
              <img
                src={workout.src}
                alt={workout.alt}
                width="720"
                height="720"
                loading="lazy"
                decoding="async"
                style={workout.style}
              />
            </div>
          </div>
          <span className="workout-card-title">{workout.title}</span>
          <p className="workout-card-types">{workout.description}</p>
        </div>
      </Link>
    </li>
  );
};

interface WorkoutGalleryProps {
  items: Workout[];
}

export const WorkoutGallery: FC<WorkoutGalleryProps> = ({ items }) => (
  <div className="workouts-gallery">
    <ul className="workouts-list">
      {items.map((w) => (
        <WorkoutCard key={w.to} workout={w} />
      ))}
    </ul>
  </div>
);
