import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import '../styles/design.css';
import './trainee.css';
import { TraineeApp } from './TraineeApp';

// Entry of the trainee area (academy/trainee/index.html). Only the site's fonts and design tokens; no router, no
// i18n, no analytics, no third-party scripts.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TraineeApp />
  </StrictMode>,
);
