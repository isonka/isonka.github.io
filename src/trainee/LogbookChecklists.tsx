import { useState } from 'react';
import { ApiError, createEntry, type LogEntry, type Logbook, type SessionHandlers } from './api';
import { dayText, localDay, saveErrorText } from './logbookText';
import { s } from './strings';

// Homework and the exercise check-in: each item is asked for once and signed by the QTT.

/** The most telling entry for an item: signed, else waiting, else the latest sent back. */
const pick = (entries: LogEntry[]) =>
  entries.find((e) => e.status === 'approved') ?? entries.find((e) => e.status === 'pending') ?? entries[entries.length - 1];

function ItemAction({
  entry,
  body,
  label,
  handlers,
  onChange,
}: {
  entry?: LogEntry;
  body: Record<string, unknown>;
  label: string;
  handlers: SessionHandlers;
  onChange: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const status = entry?.status ?? 'none';

  const ask = async () => {
    setBusy(true);
    setError('');
    try {
      await createEntry({ ...body, date: localDay() });
      onChange();
    } catch (err) {
      // Already there (e.g. an earlier try whose answer got lost): the reload shows it
      if (err instanceof ApiError && err.status === 409) onChange();
      else setError(saveErrorText(err, handlers));
    }
    setBusy(false);
  };

  return (
    <div className="trainee-entry-side">
      <span className={`trainee-status ${status}`}>
        {status === 'approved' && entry ? `${dayText(entry.date)} · ${s.logbook.signedBy(entry.signedByName)}` : s.logbook.status[status]}
      </span>
      {(status === 'none' || status === 'rejected') && (
        <button type="button" className="trainee-link" disabled={busy} aria-label={`${s.logbook.askSignOff}: ${label}`} onClick={ask}>
          {busy ? s.logbook.form.busy : s.logbook.askSignOff}
        </button>
      )}
      {status === 'rejected' && entry?.rejectionReason && <span className="trainee-error">{entry.rejectionReason}</span>}
      {error && (
        <span className="trainee-error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

interface ListProps {
  logbook: Logbook;
  handlers: SessionHandlers;
  onChange: () => void;
}

export function HomeworkList({ logbook, handlers, onChange }: ListProps) {
  return (
    <section className="trainee-card">
      <h3>{s.logbook.homework.title}</h3>
      <ul className="trainee-entries">
        {logbook.summary.homework.map((h) => (
          <li key={h.key} className="trainee-entry">
            <span className="trainee-entry-main">{h.name}</span>
            <ItemAction
              entry={pick(logbook.entries.filter((e) => e.kind === 'homework' && e.homework === h.key))}
              body={{ kind: 'homework', homework: h.key }}
              label={h.name}
              handlers={handlers}
              onChange={onChange}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ExerciseCheckIn({ logbook, handlers, onChange }: ListProps) {
  return (
    <section className="trainee-card">
      <h3>{s.logbook.exercises.title}</h3>
      <p className="trainee-hint">{s.logbook.exercises.lead}</p>
      <ul className="trainee-entries">
        {logbook.summary.exercises.map(({ movement: m }) => {
          const name = `${m.level}.${m.number} ${m.name}`;
          const mine = logbook.entries.filter((e) => e.kind === 'exercise' && e.movement === m._id);
          return (
            <li key={m._id} className="trainee-exercise">
              <span className="trainee-entry-main">{name}</span>
              {(['performing', 'teaching'] as const).map((mode) => {
                const modeLabel = mode === 'performing' ? s.logbook.exercises.performing : s.logbook.exercises.teaching;
                return (
                  <div key={mode} className="trainee-exercise-mode">
                    <span className="trainee-entry-meta">{modeLabel}</span>
                    <ItemAction
                      entry={pick(mine.filter((e) => e.mode === mode))}
                      body={{ kind: 'exercise', movement: m._id, mode }}
                      label={`${name}, ${modeLabel}`}
                      handlers={handlers}
                      onChange={onChange}
                    />
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
