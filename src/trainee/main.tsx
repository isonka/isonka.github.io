import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import '../styles/design.css';
import './trainee.css';
import { TraineeApp } from './TraineeApp';

// Entry of the trainee area (academy/trainee/index.html). Only the site's fonts and design tokens; no router, no
// i18n, no analytics, no third-party scripts.
// Never inside a frame: another page could read what is typed here (until the hosting headers say
// frame-ancestors 'none'). Framed, the page shows nothing and offers no form.
if (window.top === window.self) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <TraineeApp />
    </StrictMode>,
  );
} else {
  document.getElementById('root')!.replaceChildren();
}
