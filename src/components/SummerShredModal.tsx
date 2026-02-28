import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SummerShredModal.css';

const COOKIE_KEY = 'ssl_modal_seen';

export const SummerShredModal: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(COOKIE_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      localStorage.setItem(COOKIE_KEY, '1');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="ssl-modal-backdrop" onClick={() => setVisible(false)}>
      <div className="ssl-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="ssl-modal-close"
          onClick={() => setVisible(false)}
          aria-label="Close"
        >
          ×
        </button>
        <img
          src="/assets/images/summer-shred-lab-poster-v2.png"
          alt="Summer Shred Lab"
          className="ssl-modal-poster"
        />
        <div className="ssl-modal-body">
          <span className="ssl-modal-badge">Now Enrolling — Max 3 Spots</span>
          <h2>Summer Shred Lab</h2>
          <p>6 weeks · 2 × 45-min HIIT sessions per week · Skillrun, RowErg & Nike Strength. A small-group program built to get you summer-ready.</p>
          <div className="ssl-modal-actions">
            <Link to="/workouts/summer-shred-lab" className="ssl-modal-btn primary" onClick={() => setVisible(false)}>
              Learn More
            </Link>
            <Link to="/workouts/summer-shred-lab#buy" className="ssl-modal-btn secondary" onClick={() => setVisible(false)}>
              Reserve Your Spot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
