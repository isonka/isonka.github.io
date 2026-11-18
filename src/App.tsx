import { useEffect, useState, lazy, Suspense, type ComponentType } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { AnalyticsClicks } from './components/AnalyticsClicks';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CookieConsent } from './components/CookieConsent';
import { StructuredData } from './components/StructuredData';
import { LocaleSync } from './i18n/LocaleSync';
import { loadNamespaces, type PageNamespace } from './i18n/config';
import { withTrailingSlash, safeInternalRedirect } from './utils/urls';
import { isPrerender } from './utils/prerender';
import { Home } from './pages/Home';
import './App.css';
import './styles/design.css';

function lazyPage(
  load: () => Promise<{ default: ComponentType }>,
  namespaces: readonly PageNamespace[] = [],
) {
  return lazy(() => Promise.all([load(), loadNamespaces(namespaces)]).then(([page]) => page));
}

const Chatbot = lazyPage(() => import('./components/Chatbot').then(m => ({ default: m.Chatbot })));
const Pricing = lazyPage(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })), ['pricing']);
const IntroOffer = lazyPage(() => import('./pages/IntroOffer').then(m => ({ default: m.IntroOffer })), ['intro']);
const OpeningOffer = lazyPage(() => import('./pages/OpeningOffer').then(m => ({ default: m.OpeningOffer })), ['openingOffer']);
const Schedule = lazyPage(() => import('./pages/Schedule').then(m => ({ default: m.Schedule })), ['schedule']);
const Equipment = lazyPage(() => import('./pages/Equipment').then(m => ({ default: m.Equipment })), ['equipment']);
const EquipmentDetail = lazyPage(() => import('./pages/EquipmentDetail').then(m => ({ default: m.EquipmentDetail })), ['equipment', 'notFound']);
const EquipmentReturnPolicy = lazyPage(() => import('./pages/EquipmentReturnPolicy').then(m => ({ default: m.EquipmentReturnPolicy })), ['equipment']);
const Congrats = lazyPage(() => import('./pages/Congrats').then(m => ({ default: m.Congrats })), ['congrats']);
const Trainers = lazyPage(() => import('./pages/Trainers').then(m => ({ default: m.Trainers })), ['instructors']);
const TrainerDetail = lazyPage(() => import('./pages/TrainerDetail').then(m => ({ default: m.TrainerDetail })), ['instructors', 'notFound']);
const Academy = lazyPage(() => import('./pages/Academy').then(m => ({ default: m.Academy })), ['academy']);
const AcademyPractice = lazyPage(() => import('./pages/AcademyPractice').then(m => ({ default: m.AcademyPractice })));
const Blog = lazyPage(() => import('./pages/Blog').then(m => ({ default: m.Blog })), ['blog']);
const BlogPost = lazyPage(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })), ['blog', 'notFound']);
const WorkoutDetail = lazyPage(() => import('./pages/WorkoutDetail').then(m => ({ default: m.WorkoutDetail })), ['workout', 'notFound']);
const ClassPassOffer = lazyPage(() => import('./pages/ClassPassOffer').then(m => ({ default: m.ClassPassOffer })), ['classpass']);
const HealthcareProviders = lazyPage(() => import('./pages/HealthcareProviders').then(m => ({ default: m.HealthcareProviders })), ['healthcare']);
const Corporate = lazyPage(() => import('./pages/Corporate').then(m => ({ default: m.Corporate })), ['corporate']);
const PregnancyPilates = lazyPage(() => import('./pages/PregnancyPilates').then(m => ({ default: m.PregnancyPilates })));
const PrenatalPilatesAmsterdam = lazyPage(() => import('./pages/PrenatalPilatesAmsterdam').then(m => ({ default: m.PrenatalPilatesAmsterdam })), ['prenatal']);
const PrivatePilates = lazyPage(() => import('./pages/PrivatePilates').then(m => ({ default: m.PrivatePilates })), ['privatePilates']);
const TRXTrainingAmsterdam = lazyPage(() => import('./pages/TRXTrainingAmsterdam').then(m => ({ default: m.TRXTrainingAmsterdam })), ['trx']);
const StrengthTrainingAmsterdam = lazyPage(() => import('./pages/StrengthTrainingAmsterdam').then(m => ({ default: m.StrengthTrainingAmsterdam })), ['strength']);
const ReformerPilatesAmsterdam = lazyPage(() => import('./pages/ReformerPilatesAmsterdam').then(m => ({ default: m.ReformerPilatesAmsterdam })), ['reformer']);
const Privacy = lazyPage(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })), ['privacy']);
const Screen = lazyPage(() => import('./pages/Screen').then(m => ({ default: m.Screen })));
const NotFound = lazyPage(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })), ['notFound']);

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

function DeferredChatbot() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad || isPrerender()) return;

    const load = () => setShouldLoad(true);
    const events = ['pointerdown', 'keydown', 'scroll'] as const;
    events.forEach((event) =>
      window.addEventListener(event, load, { once: true, passive: true }),
    );

    return () => {
      events.forEach((event) => window.removeEventListener(event, load));
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
  const { t } = useTranslation('common');

  return (
    <div className="route-fallback" role="status" aria-live="polite" aria-busy="true">
      <span className="route-fallback-spinner" aria-hidden="true" />
      <span className="route-fallback-label">{t('loading')}</span>
    </div>
  );
}

function Layout() {
  const { pathname } = useLocation();
  const kiosk = pathname === '/screen' || pathname === '/screen/';

  useEffect(() => {
    if (!kiosk) return;
    document.documentElement.classList.add('screen-kiosk');
    return () => document.documentElement.classList.remove('screen-kiosk');
  }, [kiosk]);

  return (
    <>
      {!kiosk && <StructuredData type="Organization" />}
      {!kiosk && <CookieConsent />}
      {!kiosk && <AnalyticsClicks />}
      <ScrollToTop />
      <TrailingSlashNormalizer />
      <RedirectHandler />
      <LocaleSync />
      <div className={kiosk ? 'app app-kiosk' : 'app instructors-silk-host'}>
        {!kiosk && (
          <div className="site-header">
            <Navbar />
          </div>
        )}
        <main className="main-content">
          <Suspense fallback={kiosk ? null : <RouteFallback />}>
            <Outlet />
          </Suspense>
        </main>
        {!kiosk && <Footer />}
        {!kiosk && <DeferredChatbot />}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nl" element={<Home />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="pricing/nl" element={<Pricing />} />
          <Route path="intro" element={<IntroOffer />} />
          <Route path="intro/nl" element={<IntroOffer />} />
          <Route path="opening-offer" element={<OpeningOffer />} />
          <Route path="opening-offer/nl" element={<OpeningOffer />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="schedule/nl" element={<Schedule />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="equipment/nl" element={<Equipment />} />
          <Route path="equipment-return-policy" element={<EquipmentReturnPolicy />} />
          <Route path="equipment-return-policy/nl" element={<EquipmentReturnPolicy />} />
          <Route path="equipment/:slug" element={<EquipmentDetail />} />
          <Route path="equipment/:slug/nl" element={<EquipmentDetail />} />
          <Route path="workouts/:slug" element={<WorkoutDetail />} />
          <Route path="workouts/:slug/nl" element={<WorkoutDetail />} />
          <Route path="congrats" element={<Congrats />} />
          <Route path="congrats/nl" element={<Congrats />} />
          <Route path="screen" element={<Screen />} />
          <Route path="index.html" element={<Navigate to="/" replace />} />
          <Route path="congrats.html" element={<Navigate to="/congrats/" replace />} />
          <Route path="instructors" element={<Trainers />} />
          <Route path="instructors/nl" element={<Trainers />} />
          <Route path="trainer/:slug" element={<TrainerDetail />} />
          <Route path="trainer/:slug/nl" element={<TrainerDetail />} />
          <Route path="academy/practice" element={<AcademyPractice />} />
          <Route path="academy/practice/nl" element={<AcademyPractice />} />
          <Route path="academy" element={<Academy />} />
          <Route path="academy/nl" element={<Academy />} />
          <Route path="pilates-instructor-course-amsterdam" element={<Navigate to="/academy/" replace />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/nl" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="blog/:slug/nl" element={<BlogPost />} />
          <Route path="classpass-offer" element={<ClassPassOffer />} />
          <Route path="classpass-offer/nl" element={<ClassPassOffer />} />
          <Route path="healthcare-providers" element={<HealthcareProviders />} />
          <Route path="healthcare-providers/nl" element={<HealthcareProviders />} />
          <Route path="corporate" element={<Corporate />} />
          <Route path="corporate/nl" element={<Corporate />} />
          <Route path="prenatal-pilates-amsterdam" element={<PrenatalPilatesAmsterdam />} />
          <Route path="prenatal-pilates-amsterdam/nl" element={<PrenatalPilatesAmsterdam />} />
          <Route path="pregnancy-pilates-amsterdam" element={<PregnancyPilates />} />
          <Route path="private-pilates-amsterdam" element={<PrivatePilates />} />
          <Route path="private-pilates-amsterdam/nl" element={<PrivatePilates />} />
          <Route path="trx-training-amsterdam" element={<TRXTrainingAmsterdam />} />
          <Route path="trx-training-amsterdam/nl" element={<TRXTrainingAmsterdam />} />
          <Route path="strength-training-amsterdam" element={<StrengthTrainingAmsterdam />} />
          <Route path="strength-training-amsterdam/nl" element={<StrengthTrainingAmsterdam />} />
          <Route path="reformer-pilates-amsterdam" element={<ReformerPilatesAmsterdam />} />
          <Route path="reformer-pilates-amsterdam/nl" element={<ReformerPilatesAmsterdam />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="privacy/nl" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
