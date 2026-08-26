import React from 'react';
import '../styles/Home.css';

const ExperimentHomepage = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to PT Studio 7</h1>
          <p>Your journey to wellness starts here</p>
          <button className="cta-button">Book a Class</button>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2>About Us</h2>
          <p>PT Studio 7 offers premium pilates and strength training in a welcoming environment.</p>
        </div>
      </section>

      {/* Classes Section */}
      <section className="classes">
        <div className="container">
          <h2>Our Classes</h2>
          <div className="class-grid">
            <div className="class-card">
              <img src="/assets/images/reformer_1.webp" alt="Reformer Pilates" />
              <h3>Reformer Pilates</h3>
              <p>Classic pilates on state-of-the-art reformers</p>
            </div>
            <div className="class-card">
              <img src="/assets/images/strength.webp" alt="Strength Training" />
              <h3>Strength Training</h3>
              <p>Build muscle and improve functional fitness</p>
            </div>
            <div className="class-card">
              <img src="/assets/images/trx.webp" alt="TRX Training" />
              <h3>TRX Training</h3>
              <p>Suspension training for all fitness levels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="trainers">
        <div className="container">
          <h2>Meet Our Trainers</h2>
          <div className="trainer-grid">
            <div className="trainer-card">
              <img src="/assets/images/ayse.webp" alt="Ayse" />
              <h3>Ayse</h3>
              <p>Pilates Specialist</p>
            </div>
            <div className="trainer-card">
              <img src="/assets/images/cansu.webp" alt="Cansu" />
              <h3>Cansu</h3>
              <p>Strength Coach</p>
            </div>
            <div className="trainer-card">
              <img src="/assets/images/goknur.webp" alt="Goknur" />
              <h3>Goknur</h3>
              <p>TRX Instructor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <blockquote>
            "The best pilates studio in Amsterdam! Highly recommended."
          </blockquote>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Have questions? Reach out to us!</p>
          <button className="cta-button">Get in Touch</button>
        </div>
      </section>
    </div>
  );
};

export default ExperimentHomepage;