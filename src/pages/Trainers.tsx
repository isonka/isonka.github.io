import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import '../styles/Trainers.css';

interface Trainer {
  id: string;
  name: string;
  title: string;
  tier: 'master' | 'senior' | 'junior';
  image: string;
  languages: string[];
  specialties: string[];
  link: string;
  available: boolean;
}

const trainers: Trainer[] = [
  {
    id: 'elif',
    name: 'Elif Arzu Ogan',
    title: 'Comprehensive Pilates\nStrength Training\nPrenatal Pilates',
    tier: 'master',
    image: '/assets/images/elif.JPG',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates', 'TRX', 'Strength Training'],
    link: '/trainer-elif',
    available: true,
  },
  {
    id: 'gokben',
    name: 'Gökben Öztekin',
    title: 'Comprehensive Pilates',
    tier: 'senior',
    image: '/assets/images/gokben.jpeg',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates', 'Mat Pilates', 'Prenatal Pilates'],
    link: '/trainer-gokben',
    available: true,
  },
  {
    id: 'goknur',
    name: 'Göknur Dipli',
    title: 'Comprehensive Pilates\nStrength Training\nPrenatal Pilates',
    tier: 'senior',
    image: '/assets/images/goknur.jpeg',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates', 'Mat Pilates', 'Rehabilitation'],
    link: '/trainer-goknur',
    available: true,
  },
  {
    id: 'gulce',
    name: 'Gülce',
    title: 'Reformer Pilates',
    tier: 'junior',
    image: '/assets/images/gulce.JPG',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates'],
    link: '/trainer-gulce',
    available: true,
  },
  {
    id: 'melis',
    name: 'Melis',
    title: 'Reformer Pilates',
    tier: 'junior',
    image: '/assets/images/melis.JPG',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates'],
    link: '/trainer-melis',
    available: true,
  },
  {
    id: 'lal',
    name: 'Lal',
    title: 'Reformer Pilates',
    tier: 'junior',
    image: '/assets/images/lal.JPG',
    languages: ['English', 'Turkish'],
    specialties: ['Reformer Pilates'],
    link: '/trainer-lal',
    available: true,
  },
  {
    id: 'nisan',
    name: 'Nisan',
    title: 'Reformer Pilates',
    tier: 'junior',
    image: '/assets/images/nisan.JPG',
    languages: ['English', 'Turkish', 'Dutch'],
    specialties: ['Reformer Pilates'],
    link: '/trainer-nisan',
    available: true,
  },
  // Placeholder trainer - Coming Soon
  {
    id: 'trainer-8',
    name: 'Coming Soon',
    title: 'Instructor',
    tier: 'junior',
    image: '',
    languages: [],
    specialties: [],
    link: '',
    available: false,
  },
];

export const Trainers: React.FC = () => {
  const availableInstructors = trainers.filter(t => t.available);
  const comingSoon = trainers.filter(t => !t.available);

  return (
    <>
      <SEOHead
        title="Our Instructors | PT Studio 7 Amsterdam"
        description="Meet our expert team of certified Pilates and fitness instructors at PT Studio 7 Amsterdam. Master, senior, and junior instructors dedicated to your fitness journey."
        keywords="Pilates instructors Amsterdam, Pilates leraren Amsterdam, gecertificeerde Pilates instructeurs, Pilates teachers Museumplein, Pilates team Oud-Zuid"
        canonical="https://www.ptstudio7amsterdam.nl/instructors"
      />
      <Breadcrumbs items={[{ name: 'Instructors', path: '/instructors' }]} />

      <div className="trainers-page">
        {/* All Instructors */}
        {availableInstructors.length > 0 && (
          <section className="trainers-section trainers-section-main">
            <div className="trainers-section-header">
              <h1>Meet Our Team</h1>
              <p>Experienced professionals with advanced certifications</p>
            </div>
            <div className="trainers-grid">
              {availableInstructors.map(instructor => (
                <Link to={instructor.link} key={instructor.id} className="trainer-card">
                  <div className="trainer-card-image">
                    <img src={instructor.image} alt={instructor.name} loading="lazy" />
                    <span className={`trainer-tier-badge tier-${instructor.tier}`}>
                      {instructor.tier === 'master' ? 'Master' : instructor.tier === 'senior' ? 'Senior' : 'Junior'}
                    </span>
                  </div>
                  <div className="trainer-card-content">
                    <h3>{instructor.name}</h3>
                    <p className="trainer-card-title" style={{ whiteSpace: 'pre-line' }}>{instructor.title}</p>
                    <div className="trainer-card-languages">
                      {instructor.languages.map(lang => (
                        <span key={lang} className="language-tag">{lang}</span>
                      ))}
                    </div>
                    <span className="trainer-card-link">View Profile →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Coming Soon */}
        {comingSoon.length > 0 && (
          <section className="trainers-section trainers-section-coming">
            <div className="trainers-section-header">
              <h2>Growing Team</h2>
              <p>We're expanding! New instructors joining soon</p>
            </div>
            <div className="trainers-grid trainers-grid-coming">
              {comingSoon.map(trainer => (
                <div key={trainer.id} className="trainer-card trainer-card-placeholder">
                  <div className="trainer-card-image placeholder-image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                    </svg>
                  </div>
                  <div className="trainer-card-content">
                    <h3>{trainer.name}</h3>
                    <p className="trainer-card-title">Pilates Instructor</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="trainers-cta">
          <h2>Ready to Train with Our Instructors?</h2>
          <p>Book a session and experience personalized training at its finest</p>
          <div className="trainers-cta-buttons">
            <Link to="/schedule" className="trainers-btn-primary">Book a Class</Link>
            <Link to="/pricing" className="trainers-btn-secondary">View Pricing</Link>
          </div>
        </section>
      </div>
    </>
  );
};

