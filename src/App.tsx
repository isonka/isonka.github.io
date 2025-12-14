import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CookieConsent } from './components/CookieConsent';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Schedule } from './pages/Schedule';
import { Equipment } from './pages/Equipment';
import { EquipmentReformer } from './pages/EquipmentReformer';
import { EquipmentTowerReformer } from './pages/EquipmentTowerReformer';
import { EquipmentCadillac } from './pages/EquipmentCadillac';
import { EquipmentWundaChair } from './pages/EquipmentWundaChair';
import { EquipmentLadderBarrel } from './pages/EquipmentLadderBarrel';
import { Congrats } from './pages/Congrats';
import { Trainers } from './pages/Trainers';
import { TrainerElif } from './pages/TrainerElif';
import { TrainerGokben } from './pages/TrainerGokben';
import { TrainerGoknur } from './pages/TrainerGoknur';
import { Academy } from './pages/Academy';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { WorkoutReformerPilates } from './pages/WorkoutReformerPilates';
import { WorkoutTRX } from './pages/WorkoutTRX';
import { WorkoutFunctional } from './pages/WorkoutFunctional';
import { WorkoutCardio } from './pages/WorkoutCardio';
import { WorkoutEMS } from './pages/WorkoutEMS';
import './App.css';

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
            <Route path="/workouts/ems" element={<WorkoutEMS />} />
            <Route path="/congrats" element={<Congrats />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/trainer-elif" element={<TrainerElif />} />
            <Route path="/trainer-gokben" element={<TrainerGokben />} />
            <Route path="/trainer-goknur" element={<TrainerGoknur />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
