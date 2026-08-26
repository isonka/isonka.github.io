import type { FC, ReactNode } from 'react';
import '../styles/ContactMap.css';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.7239958408204!2d4.876257777138345!3d52.3572909720188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6090de92c90df%3A0xe44c5d7c1eae1d19!2sPT%20Studio%207!5e0!3m2!1sen!2snl!4v1732445893649!5m2!1sen!2snl';

const stroke = {
  fill: 'none',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function TramGlyph() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" aria-hidden="true">
      <line x1="11" y1="0" x2="11" y2="3" {...stroke} />
      <rect x="2" y="3" width="18" height="11" rx="3" {...stroke} />
      <line x1="2" y1="9" x2="20" y2="9" {...stroke} />
      <line x1="7" y1="5.5" x2="7" y2="8.5" {...stroke} />
      <line x1="15" y1="5.5" x2="15" y2="8.5" {...stroke} />
      <circle cx="6.5" cy="17" r="1.7" {...stroke} />
      <circle cx="15.5" cy="17" r="1.7" {...stroke} />
    </svg>
  );
}

function BusGlyph() {
  return (
    <svg width="24" height="18" viewBox="0 0 24 18" aria-hidden="true">
      <rect x="1" y="1" width="22" height="11" rx="2.5" {...stroke} />
      <line x1="6" y1="4" x2="6" y2="8.5" {...stroke} />
      <line x1="12" y1="4" x2="12" y2="8.5" {...stroke} />
      <line x1="18" y1="4" x2="18" y2="8.5" {...stroke} />
      <circle cx="6.5" cy="15.5" r="1.7" {...stroke} />
      <circle cx="17.5" cy="15.5" r="1.7" {...stroke} />
    </svg>
  );
}

function BikeGlyph() {
  const wheel = { ...stroke, strokeWidth: 1.5 };
  return (
    <svg width="26" height="18" viewBox="0 0 26 18" aria-hidden="true">
      <circle className="contact-map-wheel" cx="6" cy="13" r="4.3" {...wheel} />
      <circle className="contact-map-wheel" cx="20" cy="13" r="4.3" {...wheel} />
      <polyline points="6,13 11,5 18,13" {...wheel} />
      <line x1="11" y1="5" x2="15" y2="5" {...wheel} />
      <line x1="6" y1="13" x2="20" y2="13" {...wheel} />
    </svg>
  );
}

function Chip({
  mode,
  label,
  sub,
}: {
  mode: string;
  label: string;
  sub: string;
}) {
  return (
    <div className={`contact-map-chip contact-map-chip--${mode}`}>
      <div className="contact-map-chip-row">
        <span className="contact-map-chip-dot" />
        <span className="contact-map-chip-label">{label}</span>
      </div>
      <span className="contact-map-chip-sub">{sub}</span>
    </div>
  );
}

function Vehicle({ mode, children }: { mode: string; children: ReactNode }) {
  return (
    <div className={`contact-map-vehicle contact-map-vehicle--${mode}`}>
      <div className="contact-map-bubble">{children}</div>
    </div>
  );
}

export const ContactMap: FC = () => (
  <div className="contact-map">
    <iframe
      src={MAP_SRC}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="PT Studio 7 Location"
    />
    <p className="contact-map-legend">
      Tram lines 5, 12 and 24, night buses, and cycle routes serve Museumplein.
    </p>
    <div className="contact-map-overlay" aria-hidden="true">
      <svg className="contact-map-routes" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line className="contact-map-route contact-map-route--tram" x1="7" y1="62" x2="50" y2="47" />
        <line className="contact-map-route contact-map-route--bus" x1="93" y1="22" x2="50" y2="47" />
        <line className="contact-map-route contact-map-route--bike" x1="50" y1="92" x2="50" y2="47" />
      </svg>
      <Chip mode="tram" label="Tram" sub="5 · 12 · 24" />
      <Chip mode="bus" label="Bus" sub="N84 · N88" />
      <Chip mode="bike" label="Bike" sub="cycle route" />
      <Vehicle mode="tram">
        <TramGlyph />
      </Vehicle>
      <Vehicle mode="bus">
        <BusGlyph />
      </Vehicle>
      <Vehicle mode="bike">
        <BikeGlyph />
      </Vehicle>
    </div>
  </div>
);
