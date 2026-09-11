import { Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';

export const PregnancyPilates= () => {
  return (
    <>
      <SEOHead
        title="Pregnancy Pilates Amsterdam | PT 7 Pilates"
        description="Pregnancy-safe Reformer Pilates in Amsterdam Museumplein. Private prenatal sessions with trimester-specific programming, see our prenatal Pilates page."
        keywords="pregnancy pilates amsterdam, prenatal pilates amsterdam, pregnancy reformer pilates"
        canonical="https://www.pt7.nl/prenatal-pilates-amsterdam/"
        ogTitle="Prenatal & Pregnancy Pilates Amsterdam | PT 7 Pilates"
        ogDescription="Private pregnancy-safe Reformer Pilates at Museumplein. Trimester-specific private sessions."
      />
      <Navigate to="/prenatal-pilates-amsterdam/" replace />
    </>
  );
};
