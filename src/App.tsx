import { useEffect, useState, lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CookieConsent } from './components/CookieConsent';
import { StructuredData } from './components/StructuredData';
import { LocaleSync } from './i18n/LocaleSync';
import { withTrailingSlash, safeInternalRedirect } from './utils/urls';
import { isPrerender } from './utils/prerender';
import { Home } from './pages/Home';
import './App.css';
import './styles/design.css';

const Chatbot = lazy(() => import('./components/Chatbot').then(m => ({ default: m.Chatbot })));
const Pricing = lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })));
const Schedule = lazy(() => import('./pages/Schedule').then(m => ({ default: m.Schedule })));
const Equipment = lazy(() => import('./pages/Equipment').then(m => ({ default: m.Equipment })));
const EquipmentDetail = lazy(() => import('./pages/EquipmentDetail').then(m => ({ default: m.EquipmentDetail })));
const Congrats = lazy(() => import('./pages/Congrats').then(m => ({ default: m.Congrats })));
const Trainers = lazy(() => import('./pages/Trainers').then(m => ({ default: m.Trainers })));
const TrainerDetail = lazy(() => import('./pages/TrainerDetail').then(m => ({ default: m.TrainerDetail })));
const Academy = lazy(() => import('./pages/Academy').then(m => ({ default: m.Academy })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const WorkoutDetail = lazy(() => import('./pages/WorkoutDetail').then(m => ({ default: m.WorkoutDetail })));
const ClassPassOffer = lazy(() => import('./pages/ClassPassOffer').then(m => ({ default: m.ClassPassOffer })));
const HealthcareProviders = lazy(() => import('./pages/HealthcareProviders').then(m => ({ default: m.HealthcareProviders })));
const Corporate = lazy(() => import('./pages/Corporate').then(m => ({ default: m.Corporate })));
const PregnancyPilates = lazy(() => import('./pages/PregnancyPilates').then(m => ({ default: m.PregnancyPilates })));
const PrenatalPilatesAmsterdam = lazy(() => import('./pages/PrenatalPilatesAmsterdam').then(m => ({ default: m.PrenatalPilatesAmsterdam })));
const PrivatePilates = lazy(() => import('./pages/PrivatePilates').then(m => ({ default: m.PrivatePilates })));
const TRXTrainingAmsterdam = lazy(() => import('./pages/TRXTrainingAmsterdam').then(m => ({ default: m.TRXTrainingAmsterdam })));
const StrengthTrainingAmsterdam = lazy(() => import('./pages/StrengthTrainingAmsterdam').then(m => ({ default: m.StrengthTrainingAmsterdam })));
const ReformerPilatesAmsterdam = lazy(() => import('./pages/ReformerPilatesAmsterdam').then(m => ({ default: m.ReformerPilatesAmsterdam })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));

function TrailingSlashNormalizer() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const normalized = withTrailingSlash(location.pathname);
    if (normalized !== location.pathname) {
      navigate(`${normalized}${location.search}${location.hash}`, { replace: true });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem('ghPagesRedirect');
    if (!redirect || redirect === '/') return;

    sessionStorage.removeItem('ghPagesRedirect');

    const safe = safeInternalRedirect(redirect);
    if (!safe) return;

    navigate(`${safe.path}${safe.rest}`, { replace: true });
  }, [navigate]);

  return null;
}

const CHATBOT_DEFER_MS = 4000;

function DeferredChatbot() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad || isPrerender()) return;

    const load = () => setShouldLoad(true);
    const events = ['pointerdown', 'keydown', 'scroll'] as const;
    events.forEach((event) =>
      window.addEventListener(event, load, { once: true, passive: true }),
    );

    const w = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const idleId = w.requestIdleCallback?.(load, { timeout: CHATBOT_DEFER_MS });
    const timeoutId =
      typeof w.requestIdleCallback === 'function'
        ? undefined
        : window.setTimeout(load, CHATBOT_DEFER_MS);

    return () => {
      events.forEach((event) => window.removeEventListener(event, load));
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [shouldLoad]);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <Chatbot />
    </Suspense>
  );
}

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite" aria-busy="true">
      <span className="route-fallback-spinner" aria-hidden="true" />
      <span className="route-fallback-label">Loading…</span>
    </div>
  );
}

function Layout() {
  return (
    <>
      <StructuredData type="Organization" />
      <CookieConsent />
      <ScrollToTop />
      <TrailingSlashNormalizer />
      <RedirectHandler />
      <LocaleSync />
      <div className="app instructors-silk-host">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <DeferredChatbot />
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'nl', element: <Home /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'schedule', element: <Schedule /> },
      { path: 'equipment', element: <Equipment /> },
      { path: 'equipment/:slug', element: <EquipmentDetail /> },
      { path: 'workouts/:slug', element: <WorkoutDetail /> },
      { path: 'congrats', element: <Congrats /> },
      { path: 'index.html', element: <Navigate to="/" replace /> },
      { path: 'congrats.html', element: <Navigate to="/congrats/" replace /> },
      { path: 'instructors', element: <Trainers /> },
      { path: 'trainer/:slug', element: <TrainerDetail /> },
      { path: 'academy', element: <Academy /> },
      { path: 'academy/nl', element: <Academy /> },
      {
        path: 'pilates-instructor-course-amsterdam',
        element: <Navigate to="/academy/" replace />,
      },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'classpass-offer', element: <ClassPassOffer /> },
      { path: 'healthcare-providers', element: <HealthcareProviders /> },
      { path: 'corporate', element: <Corporate /> },
      { path: 'prenatal-pilates-amsterdam', element: <PrenatalPilatesAmsterdam /> },
      { path: 'pregnancy-pilates-amsterdam', element: <PregnancyPilates /> },
      { path: 'private-pilates-amsterdam', element: <PrivatePilates /> },
      { path: 'trx-training-amsterdam', element: <TRXTrainingAmsterdam /> },
      { path: 'strength-training-amsterdam', element: <StrengthTrainingAmsterdam /> },
      { path: 'reformer-pilates-amsterdam', element: <ReformerPilatesAmsterdam /> },
      { path: 'privacy', element: <Privacy /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
