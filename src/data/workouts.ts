import type { CSSProperties } from 'react';

export interface Workout {
  to: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  style?: CSSProperties;
}

export const workouts: Workout[] = [
  {
    to: '/workouts/reformer-pilates',
    src: '/assets/images/reformer_1.webp',
    alt: 'Reformer & Trapeze Table Pilates',
    title: 'Reformer & Trapeze Table Pilates',
    description: 'Full-body workout focusing on core strength, flexibility, and posture',
  },
  {
    to: '/workouts/trx',
    src: '/assets/images/trx.webp',
    alt: 'TRX Training',
    title: 'TRX Training',
    description: 'Suspension training for strength, balance, and functional fitness',
  },
  {
    to: '/workouts/functional-training',
    src: '/assets/images/nike_strength_studio.webp',
    alt: 'Nike Strength Training',
    title: 'Nike Strength Training',
    description: 'Premium Nike equipment: half rack, Olympic barbell & dumbbells',
  },
  {
    to: '/workouts/cardio',
    src: '/assets/images/cardio.webp',
    alt: 'Cardio Training',
    title: 'Cardio',
    description: 'High-intensity cardio workouts to boost endurance and burn calories',
  },
  {
    to: '/workouts/summer-shred-lab',
    src: '/assets/images/summer-shred-lab-poster.webp',
    alt: 'Summer Shred Lab',
    title: 'Summer Shred Lab',
    description: '6-week body transformation — Skillrun, RowErg & Nike Strength. Max 3 people.',
    style: { objectPosition: 'center' },
  },
];
