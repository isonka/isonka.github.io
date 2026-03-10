import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CookieConsent } from './components/CookieConsent';
import { Home } from './pages/Home';
import './App.css';

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

// Component to handle GitHub Pages redirects
function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle GitHub Pages SPA routing
    // The 404.html stores the intended path in sessionStorage
    const redirect = sessionStorage.getItem('ghPagesRedirect');
    if (redirect && redirect !== '/') {
      sessionStorage.removeItem('ghPagesRedirect');
      // Navigate to the stored path
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <CookieConsent />
      <ScrollToTop />
      <RedirectHandler />
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/equipment/:slug" element={<EquipmentDetail />} />
              <Route path="/workouts/:slug" element={<WorkoutDetail />} />
              <Route path="/congrats" element={<Congrats />} />
              <Route path="/congrats.html" element={<Navigate to="/congrats" replace />} />
              <Route path="/instructors" element={<Trainers />} />
              <Route path="/trainer/:slug" element={<TrainerDetail />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/classpass-offer" element={<ClassPassOffer />} />
              <Route path="/healthcare-providers" element={<HealthcareProviders />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
