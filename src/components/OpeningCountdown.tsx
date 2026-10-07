import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OPENING_OFFER } from '../data/openingOffer';
import { isPrerender } from '../utils/prerender';

const OPENING_TIME_ZONE = 'Europe/Amsterdam';

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const UNITS = ['days', 'hours', 'minutes', 'seconds'] as const;

function timeZoneOffsetMs(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(new Date(utcMs));
  const pick = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  const hour = pick('hour') === 24 ? 0 : pick('hour');
  const asUtc = Date.UTC(pick('year'), pick('month') - 1, pick('day'), hour, pick('minute'), pick('second'));
  return asUtc - utcMs;
}

/** Local midnight on `isoDate` (YYYY-MM-DD) in `timeZone`, as a UTC timestamp. */
function zonedMidnightUtcMs(isoDate: string, timeZone: string): number {
  const [year, month, day] = isoDate.split('-').map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, 0, 0, 0);
  const offset = timeZoneOffsetMs(utcGuess, timeZone);
  const corrected = utcGuess - offset;
  return utcGuess - timeZoneOffsetMs(corrected, timeZone);
}

function remainingUntil(targetMs: number, nowMs: number): Remaining | null {
  const diff = targetMs - nowMs;
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export const OpeningCountdown = () => {
  const { t } = useTranslation('openingOffer');
  const targetMs = useMemo(
    () => zonedMidnightUtcMs(OPENING_OFFER.firstClassOlympisch, OPENING_TIME_ZONE),
    [],
  );
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (isPrerender()) return;
    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = remainingUntil(targetMs, nowMs);
  if (!remaining) return null;

  return (
    <div className="oo-countdown" role="timer" aria-label={t('countdown.aria', remaining)}>
      <p className="oo-countdown-label">{t('countdown.label')}</p>
      <div className="oo-countdown-units">
        {UNITS.map((unit) => (
          <div key={unit} className="oo-countdown-unit">
            <span className="oo-countdown-value" suppressHydrationWarning>
              {pad(remaining[unit])}
            </span>
            <span className="oo-countdown-unit-label">{t(`countdown.${unit}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
