import React from 'react';
import '../styles/Home.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Our Studio</h1>
        <p>Experience the best Pilates and fitness training in Amsterdam</p>
        <button className="cta-button">Book a Class</button>
      </div>
    </section>
  );
};

export default HeroSection;