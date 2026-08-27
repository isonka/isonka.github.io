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
    src: '/assets/images/studio.webp',
    alt: 'PT Studio 7 Amsterdam boutique studio for Reformer Pilates and training',
    title: 'Reformer & Trapeze Table Pilates',
    description: 'Full-body workout focusing on core strength, flexibility, and posture',
    style: { objectPosition: 'center 45%' },
  },
  {
    to: '/workouts/trx',
    src: '/assets/images/trx.webp',
    alt: 'TRX suspension training at PT Studio 7 Amsterdam',
    title: 'TRX Training',
    description: 'Suspension training for strength, balance, and functional fitness',
    style: { objectPosition: 'center 42%' },
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
];
