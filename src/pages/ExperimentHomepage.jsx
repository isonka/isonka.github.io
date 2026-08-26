import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AcademyUrgencyBanner from '../components/AcademyUrgencyBanner';
import '../styles/Home.css';

const ExperimentHomepage = () => {
  return (
    <div className="home-page">
      {/* Reusing the AcademyUrgencyBanner as the header/banner component */}
      <AcademyUrgencyBanner 
        style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          textAlign: 'center',
          borderBottom: '1px solid #eaeaea'
        }}
      />
      
      <Navbar />
      
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Our Experimental Homepage</h1>
            <p>This is a new design exploration for our website.</p>
          </div>
        </section>
        
        <section className="content-section">
          <h2>Our Services</h2>
          <p>Explore our range of pilates and fitness services.</p>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExperimentHomepage;