import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  ApiError,
  getRecordings,
  handleSessionError,
  newClientRef,
  sendReflection,
  updateReflection,
  type MyRecording,
  type MyRecordings,
  type SessionHandlers,
} from './api';
import { hoursText, saveErrorText } from './logbookText';
import { s } from './strings';

// Observation recordings: every class recorded at the academy, for a trainee in their year. Watch plays the video on this
// page in Google Drive's own player (owner, 2026-11-24), the only frame the page's policy allows: Drive still checks the
// trainee's Google account and keeps downloads off. Safari and iPhones block Drive's sign-in inside another site, so
// Open in Drive is always next to it. No third-party script runs in this page. A written reflection becomes
// observation hours waiting for a signature; the API decides the hours from the video's length.

const dateText = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Only ever a Drive video player, whatever the answer holds: the embedded player and the same video opened in Drive. */
function driveVideo(url: string | null): { embed: string; open: string } | null {
  const match = url?.match(/^https:\/\/drive\.google\.com\/file\/d\/([-\w]+)\/preview$/);
  if (!match) return null;
  const base = `https://drive.google.com/file/d/${match[1]}`;
  return { embed: `${base}/preview`, open: `${base}/view` };
}

interface ReflectionValues {
  cues: string;
  modifications: string;
  corrections: string;
  sessionType: string;
  startTime: string;
  notes: string;
}

const valuesOf = (r: MyRecording): ReflectionValues => ({
  cues: r.reflection?.reflection?.cues ?? '',
  modifications: r.reflection?.reflection?.modifications ?? '',
  corrections: r.reflection?.reflection?.corrections ?? '',
  sessionType: r.reflection?.sessionType ?? 'Group',
  startTime: r.reflection?.startTime ?? '',
  notes: r.reflection?.notes ?? '',
});

function ReflectionForm({
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: ReflectionValues;
  submitLabel: string;
  onSubmit: (values: ReflectionValues) => Promise<string>;
  onCancel: () => void;
}) {
  const [v, setV] = useState(initial);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (key: keyof ReflectionValues) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setV((current) => ({ ...current, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const failure = await onSubmit(v);
    setBusy(false);
    setError(failure);
  };

  return (
    <form className="trainee-form trainee-entry-form trainee-spaced" onSubmit={submit}>
      <label>
        {s.observations.form.cues}
        <textarea rows={3} required maxLength={2000} value={v.cues} onChange={set('cues')} />
      </label>
      <label>
        {s.observations.form.modifications}
        <textarea rows={3} required maxLength={2000} value={v.modifications} onChange={set('modifications')} />
      </label>
      <label>
        {s.observations.form.corrections}
        <textarea rows={3} required maxLength={2000} value={v.corrections} onChange={set('corrections')} />
      </label>
      <div className="trainee-entry-fields">
        <label>
          {s.logbook.form.sessionType}
          <select value={v.sessionType} onChange={set('sessionType')}>
            <option value="Group">{s.logbook.form.group}</option>
            <option value="PT">{s.logbook.form.pt}</option>
          </select>
        </label>
        <label>
          {s.logbook.form.time}
          <input type="time" value={v.startTime} onChange={set('startTime')} />
        </label>
      </div>
      <label>
        {s.logbook.form.notes}
        <textarea rows={2} maxLength={2000} value={v.notes} onChange={set('notes')} />
      </label>
      {error && (
        <p className="trainee-error" role="alert">
          {error}
        </p>
      )}
      <div className="trainee-actions">
        <button type="submit" className="btn-ink" disabled={busy}>
          {busy ? s.logbook.form.busy : submitLabel}
        </button>
        <button type="button" className="trainee-secondary" onClick={onCancel} disabled={busy}>
          {s.logbook.form.cancel}
        </button>
      </div>
    </form>
  );
}

function RecordingCard({ recording: r, data, handlers, onChange }: { recording: MyRecording; data: MyRecordings; handlers: SessionHandlers; onChange: () => void }) {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Sending the same text again reuses the ref, so a save whose answer got lost isn't refused as a second reflection
  const attempt = useRef<{ values: string; ref: string } | null>(null);
  const video = r.canWatch ? driveVideo(r.playerUrl) : null;
  const entry = r.reflection;
  const canReflect = r.canWatch && r.creditHours > 0 && !entry;
  const canEdit = entry !== null && entry.status !== 'approved';

  const failureText = (err: unknown) => {
    const message = saveErrorText(err, handlers);
    if (message === s.logbook.saveFailed) {
      onChange(); // the outcome is unknown: the list shows whether it arrived
      return s.observations.saveFailed;
    }
    // Already sent, or signed meanwhile: the reload shows the entry as it is now
    if (err instanceof ApiError && (err.status === 409 || err.status === 403)) onChange();
    return message;
  };

  const save = async (v: ReflectionValues) => {
    try {
      if (entry) {
        await updateReflection(r._id, { ...v });
      } else {
        const values = JSON.stringify(v);
        if (attempt.current?.values !== values) attempt.current = { values, ref: newClientRef() };
        await sendReflection(r._id, { ...v, clientRef: attempt.current.ref });
      }
    } catch (err) {
      return failureText(err);
    }
    attempt.current = null;
    setOpen(false);
    onChange();
    return '';
  };

  const hoursNote =
    r.durationMinutes === null ? s.observations.processing : r.creditHours > 0 ? s.observations.worth(hoursText(r.creditHours)) : s.observations.tooShort;

  return (
    <li className="trainee-recording">
      <div className="trainee-entry">
        <div>
          <span className="trainee-entry-main">{r.title}</span>
          <span className="trainee-entry-meta">
            {[dateText(r.recordedAt), r.durationMinutes === null ? null : s.observations.minutes(r.durationMinutes), hoursNote].filter(Boolean).join(' · ')}
          </span>
        </div>
        <span className={`trainee-status ${entry?.status ?? 'none'}`}>
          {!entry ? s.observations.notSent : entry.status === 'approved' ? s.logbook.signedBy(entry.signedByName) : s.logbook.status[entry.status]}
        </span>
      </div>
      {entry?.status === 'rejected' && entry.rejectionReason && <p className="trainee-error">{entry.rejectionReason}</p>}
      {!r.canWatch && (entry || !data.active) && <p className="trainee-hint trainee-tight">{s.observations.notAvailable}</p>}
      {!r.canWatch && !entry && data.active && data.watchAs && <p className="trainee-hint trainee-tight">{s.observations.sharing}</p>}
      {video && playing && (
        <div className="trainee-player">
          <iframe src={video.embed} title={r.title} allow="autoplay; fullscreen" allowFullScreen />
        </div>
      )}
      {video && playing && data.watchAs && <p className="trainee-hint trainee-tight">{s.observations.playerHelp(data.watchAs)}</p>}
      <div className="trainee-actions">
        {video && (
          <button type="button" className="btn-ink" aria-expanded={playing} onClick={() => setPlaying((p) => !p)}>
            {playing ? s.observations.closeVideo : s.observations.watch}
            <span className="visually-hidden"> {r.title}</span>
          </button>
        )}
        {video && (
          <a className="trainee-secondary trainee-watch" href={video.open} target="_blank" rel="noopener noreferrer">
            {s.observations.openInDrive}
            <span className="visually-hidden"> {r.title} ({s.observations.newTab})</span>
          </a>
        )}
        {!open && (canReflect || canEdit) && (
          <button type="button" className="trainee-secondary" onClick={() => setOpen(true)}>
            {canReflect ? s.observations.write : entry?.status === 'rejected' ? s.logbook.correct : s.logbook.edit}
          </button>
        )}
      </div>
      {open && (canReflect || canEdit) && (
        <ReflectionForm initial={valuesOf(r)} submitLabel={entry ? s.logbook.form.save : s.logbook.form.send} onSubmit={save} onCancel={() => setOpen(false)} />
      )}
    </li>
  );
}

export function ObservationsScreen({ handlers }: { handlers: SessionHandlers }) {
  const { onEnded, onPasswordRequired } = handlers;
  const [data, setData] = useState<MyRecordings | null>(null);
  const [error, setError] = useState<'none' | 'notLinked' | 'failed'>('none');
  const latest = useRef(0); // a slow older answer must not replace a newer one

  const load = useCallback(() => {
    const request = ++latest.current;
    getRecordings()
      .then((answer) => {
        if (request !== latest.current) return;
        setData(answer);
        setError('none');
      })
      .catch((err: unknown) => {
        if (request !== latest.current) return;
        if (handleSessionError(err, { onEnded, onPasswordRequired })) return;
        setError(err instanceof ApiError && err.status === 404 ? 'notLinked' : 'failed');
      });
  }, [onEnded, onPasswordRequired]);

  useEffect(load, [load]);

  if (!data) {
    if (error === 'notLinked') return <p className="trainee-card">{s.logbook.notLinked}</p>;
    if (error === 'failed') {
      return (
        <div className="trainee-card">
          <p>{s.unavailable}</p>
          <button type="button" className="trainee-secondary" onClick={load}>
            {s.retry}
          </button>
        </div>
      );
    }
    return <p role="status">{s.loading}</p>;
  }

  const until = data.until ? dateText(data.until) : '';
  const notice = !data.hasStartDate
    ? s.observations.noStartDate
    : !data.active
      ? s.observations.yearEnded(until)
      : data.watchAs
        ? `${s.observations.watchAs(data.watchAs)} ${s.observations.until(until)}`
        : s.observations.noGoogle;

  return (
    <div>
      <h3>{s.observations.title}</h3>
      <p className="trainee-lead">{s.observations.lead}</p>
      {error !== 'none' && (
        <p className="trainee-error" role="alert">
          {s.observations.stale}
        </p>
      )}
      <p className={`trainee-card trainee-wrap${data.active && data.watchAs ? '' : ' trainee-card-done'}`}>{notice}</p>
      {data.recordings.length === 0 ? (
        data.active && <p className="trainee-card">{s.observations.none}</p>
      ) : (
        <ul className="trainee-card trainee-entries">
          {data.recordings.map((r) => (
            <RecordingCard key={r._id} recording={r} data={data} handlers={handlers} onChange={load} />
          ))}
        </ul>
      )}
    </div>
  );
}
