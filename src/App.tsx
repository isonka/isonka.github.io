import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Trainers from './pages/Trainers';
import TrainerDetail from './pages/TrainerDetail';
import Pricing from './pages/Pricing';
import Schedule from './pages/Schedule';
import Workouts from './pages/WorkoutDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Congrats from './pages/Congrats';
import Academy from './pages/Academy';
import AcademyNl from './pages/AcademyNl';
import ClassPassOffer from './pages/ClassPassOffer';
import HealthcareProviders from './pages/HealthcareProviders';
import Equipment from './pages/Equipment';
import EquipmentDetail from './pages/EquipmentDetail';
import PregnancyPilates from './pages/PregnancyPilates';
import ReformerPilatesAmsterdam from './pages/ReformerPilatesAmsterdam';
import StrengthTrainingAmsterdam from './pages/StrengthTrainingAmsterdam';
import TRXTrainingAmsterdam from './pages/TRXTrainingAmsterdam';
import PrivatePilates from './pages/PrivatePilates';
import PrenatalPilatesAmsterdam from './pages/PrenatalPilatesAmsterdam';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import Chatbot from './components/Chatbot';
import Breadcrumbs from './components/Breadcrumbs';
import SEOHead from './components/SEOHead';
import StructuredData from './components/StructuredData';

function App() {
  return (
    <Router>
      <SEOHead />
      <StructuredData />
      <ScrollToTop />
      <Navbar />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/trainer/:id" element={<TrainerDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/workout/:id" element={<Workouts />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/congrats" element={<Congrats />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy-nl" element={<AcademyNl />} />
        <Route path="/classpass" element={<ClassPassOffer />} />
        <Route path="/healthcare" element={<HealthcareProviders />} />
        <Route path="/equipment" element={<Equipment />} />
        <Route path="/equipment/:id" element={<EquipmentDetail />} />
        <Route path="/pregnancy-pilates" element={<PregnancyPilates />} />
        <Route path="/reformer-pilates-amsterdam" element={<ReformerPilatesAmsterdam />} />
        <Route path="/strength-training-amsterdam" element={<StrengthTrainingAmsterdam />} />
        <Route path="/trx-training-amsterdam" element={<TRXTrainingAmsterdam />} />
        <Route path="/private-pilates" element={<PrivatePilates />} />
        <Route path="/prenatal-pilates-amsterdam" element={<PrenatalPilatesAmsterdam />} />
        {/* New experimental homepage route */}
        <Route path="/experiment-homepage" element={
          <div style={{ padding: '2rem' }}>
            <h1>Experimental Homepage Variant</h1>
            <p>This is a placeholder for the new homepage design.</p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              marginTop: '2rem'
            }}>
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    height: '100px', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: '4px',
                    animation: 'pulse 1.5s infinite'
                  }}
                />
              ))}
            </div>
          </div>
        } />
      </Routes>
      <CookieConsent />
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;