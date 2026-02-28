import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Workout } from '../data/workouts';

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: FC<WorkoutCardProps> = ({ workout }) => (
  <Link to={workout.to} className="workout-card">
    <img
      src={workout.src}
      alt={workout.alt}
      width="400"
      height="220"
      loading="lazy"
      decoding="async"
      style={workout.style}
    />
    <h3>{workout.title}</h3>
    <p>{workout.description}</p>
    <span className="learn-more">Learn More →</span>
  </Link>
);
