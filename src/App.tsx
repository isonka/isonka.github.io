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
const EquipmentReformer = lazy(() => import('./pages/EquipmentReformer').then(m => ({ default: m.EquipmentReformer })));
const EquipmentTowerReformer = lazy(() => import('./pages/EquipmentTowerReformer').then(m => ({ default: m.EquipmentTowerReformer })));
const EquipmentCadillac = lazy(() => import('./pages/EquipmentCadillac').then(m => ({ default: m.EquipmentCadillac })));
const EquipmentWundaChair = lazy(() => import('./pages/EquipmentWundaChair').then(m => ({ default: m.EquipmentWundaChair })));
const EquipmentLadderBarrel = lazy(() => import('./pages/EquipmentLadderBarrel').then(m => ({ default: m.EquipmentLadderBarrel })));
const Congrats = lazy(() => import('./pages/Congrats').then(m => ({ default: m.Congrats })));
const Trainers = lazy(() => import('./pages/Trainers').then(m => ({ default: m.Trainers })));
const TrainerElif = lazy(() => import('./pages/TrainerElif').then(m => ({ default: m.TrainerElif })));
const TrainerGokben = lazy(() => import('./pages/TrainerGokben').then(m => ({ default: m.TrainerGokben })));
const TrainerGoknur = lazy(() => import('./pages/TrainerGoknur').then(m => ({ default: m.TrainerGoknur })));
const TrainerGulce = lazy(() => import('./pages/TrainerGulce').then(m => ({ default: m.TrainerGulce })));
const TrainerMelis = lazy(() => import('./pages/TrainerMelis').then(m => ({ default: m.TrainerMelis })));
const TrainerLal = lazy(() => import('./pages/TrainerLal').then(m => ({ default: m.TrainerLal })));
const TrainerNisan = lazy(() => import('./pages/TrainerNisan').then(m => ({ default: m.TrainerNisan })));
const Academy = lazy(() => import('./pages/Academy').then(m => ({ default: m.Academy })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));
const WorkoutReformerPilates = lazy(() => import('./pages/WorkoutReformerPilates').then(m => ({ default: m.WorkoutReformerPilates })));
const WorkoutTRX = lazy(() => import('./pages/WorkoutTRX').then(m => ({ default: m.WorkoutTRX })));
const WorkoutFunctional = lazy(() => import('./pages/WorkoutFunctional').then(m => ({ default: m.WorkoutFunctional })));
const WorkoutCardio = lazy(() => import('./pages/WorkoutCardio').then(m => ({ default: m.WorkoutCardio })));
const WorkoutSummerShredLab = lazy(() => import('./pages/WorkoutSummerShredLab').then(m => ({ default: m.WorkoutSummerShredLab })));
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
              <Route path="/equipment/reformer" element={<EquipmentReformer />} />
              <Route path="/equipment/tower-reformer" element={<EquipmentTowerReformer />} />
              <Route path="/equipment/cadillac" element={<EquipmentCadillac />} />
              <Route path="/equipment/wunda-chair" element={<EquipmentWundaChair />} />
              <Route path="/equipment/ladder-barrel" element={<EquipmentLadderBarrel />} />
              <Route path="/workouts/reformer-pilates" element={<WorkoutReformerPilates />} />
              <Route path="/workouts/trx" element={<WorkoutTRX />} />
              <Route path="/workouts/functional-training" element={<WorkoutFunctional />} />
              <Route path="/workouts/cardio" element={<WorkoutCardio />} />
              <Route path="/workouts/summer-shred-lab" element={<WorkoutSummerShredLab />} />
              <Route path="/congrats" element={<Congrats />} />
              <Route path="/congrats.html" element={<Navigate to="/congrats" replace />} />
              <Route path="/instructors" element={<Trainers />} />
              <Route path="/trainer-elif" element={<TrainerElif />} />
              <Route path="/trainer-gokben" element={<TrainerGokben />} />
              <Route path="/trainer-goknur" element={<TrainerGoknur />} />
              <Route path="/trainer-gulce" element={<TrainerGulce />} />
              <Route path="/trainer-melis" element={<TrainerMelis />} />
              <Route path="/trainer-lal" element={<TrainerLal />} />
              <Route path="/trainer-nisan" element={<TrainerNisan />} />
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
