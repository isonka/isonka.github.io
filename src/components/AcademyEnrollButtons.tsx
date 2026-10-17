import { useTranslation } from 'react-i18next';
import { academyEnrollWidget, academyInstallmentsWidget } from '../data/academy';

type AcademyEnrollButtonsProps = {
  course: 'reformer' | 'mat';
  location: string;
  variant?: 'course' | 'cta';
  /** When false, only the primary Enroll button is shown (installments live in fee section). */
  showInstallments?: boolean;
};

export function AcademyEnrollButtons({
  course,
  location,
  variant = 'course',
  showInstallments = true,
}: AcademyEnrollButtonsProps) {
  const { t } = useTranslation('academy');
  const prefix = variant === 'cta' ? 'cta-btn' : 'course-btn';
  return (
    <>
      <div
        className={`${prefix} primary academy-enroll-btn`}
        data-course={course}
        data-location={location}
        dangerouslySetInnerHTML={{ __html: academyEnrollWidget(t('enroll.button')) }}
      />
      {showInstallments ? (
        <div
          className={`${prefix} secondary academy-enroll-btn academy-enroll-btn--installments`}
          data-course={course}
          data-location={location}
          dangerouslySetInnerHTML={{ __html: academyInstallmentsWidget(t('enroll.installments')) }}
        />
      ) : null}
    </>
  );
}
