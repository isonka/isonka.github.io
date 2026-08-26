import React from 'react';
import '../styles/Home.css';

const ExperimentHomepage = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">STUDIO 7 PILATES</h1>
          <p className="hero-subtitle">Amsterdam's Premier Pilates Studio</p>
          <div className="hero-buttons">
            <button className="btn-primary">Book a Class</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
      </header>

      <section className="intro-section">
        <div className="intro-content">
          <h2>Welcome to Studio 7</h2>
          <p>
            At Studio 7 Pilates, we believe in the power of movement to transform lives. Our expert instructors guide you through every session with precision and care.
          </p>
        </div>
      </section>

      <section className="services-section">
        <div className="services-grid">
          <div className="service-card">
            <h3>Reformer Pilates</h3>
            <p>Experience the full-body workout with our state-of-the-art reformers</p>
          </div>
          <div className="service-card">
            <h3>Private Sessions</h3>
            <p>One-on-one attention tailored to your specific needs and goals</p>
          </div>
          <div className="service-card">
            <h3>Group Classes</h3>
            <p>Energizing classes designed for all levels and abilities</p>
          </div>
        </div>
      </section>

      <section className="trainers-section">
        <h2>Meet Our Trainers</h2>
        <div className="trainers-grid">
          <div className="trainer-card">
            <div className="trainer-image-placeholder"></div>
            <h3>Lead Trainer Name</h3>
            <p>Certified Pilates Instructor</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-card">
          <p>"Studio 7 has transformed my relationship with movement and my body."</p>
          <p className="client-name">- Jane D., Amsterdam</p>
        </div>
      </section>

      <footer className="footer-section">
        <p>Contact us to start your Pilates journey today</p>
        <button className="btn-primary">Get in Touch</button>
      </footer>
    </div>
  );
};

export default ExperimentHomepage;