import { ACADEMY_ENROLL_WIDGET, ACADEMY_INSTALLMENTS_WIDGET } from '../data/academy';

type AcademyEnrollButtonsProps = {
  course: 'reformer' | 'mat';
  location: string;
  variant?: 'course' | 'cta';
};

export function AcademyEnrollButtons({
  course,
  location,
  variant = 'course',
}: AcademyEnrollButtonsProps) {
  const prefix = variant === 'cta' ? 'cta-btn' : 'course-btn';
  return (
    <>
      <div
        className={`${prefix} primary academy-enroll-btn`}
        data-course={course}
        data-location={location}
        dangerouslySetInnerHTML={{ __html: ACADEMY_ENROLL_WIDGET }}
      />
      <div
        className={`${prefix} secondary academy-enroll-btn academy-enroll-btn--installments`}
        data-course={course}
        data-location={location}
        dangerouslySetInnerHTML={{ __html: ACADEMY_INSTALLMENTS_WIDGET }}
      />
    </>
  );
}
