import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import WorkoutCard from '../components/WorkoutCard';
import { workouts } from '../data/workouts';

const ExperimentHomepage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      
      {/* Replacing static layout with existing components */}
      <section className="featured-classes">
        <div className="container">
          <h2>Popular Classes</h2>
          <div className="workout-grid">
            {workouts.slice(0, 3).map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      </section>

      <section className="studio-info">
        <div className="container">
          <div className="info-content">
            <h2>Our Studio</h2>
            <p>We provide premium Pilates and strength training equipment in a welcoming environment.</p>
            <button className="btn-primary">Learn More</button>
          </div>
          <div className="info-image">
            <img src="/assets/images/studio.webp" alt="Studio interior" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExperimentHomepage;