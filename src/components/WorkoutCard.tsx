import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Workout } from '../data/workouts';

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: FC<WorkoutCardProps> = ({ workout }) => (
  <li className="workout-item">
    <Link to={workout.to} className="workout-card">
      <span className={`lane-stripe lane-${workout.lane}`} aria-hidden="true" />
      <span className="workout-card-copy">
        <span className="workout-card-title">{workout.title}</span>
        <span className="workout-card-types">{workout.description}</span>
      </span>
      <svg className="home-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 3l5 5-5 5" />
      </svg>
    </Link>
  </li>
);

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
