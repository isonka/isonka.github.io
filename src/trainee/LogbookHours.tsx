import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { createEntry, newClientRef, updateEntry, type LogCategory, type LogEntry, type Logbook, type SessionHandlers } from './api';
import { dayText, localDay, saveErrorText } from './logbookText';
import { s } from './strings';

// One log of the logbook: its entries, adding hours and correcting entries that aren't signed yet.

interface HoursValues {
  date: string;
  startTime: string;
  hours: string;
  apparatus: string;
  sessionType: string;
  clientName: string;
  notes: string;
}

const emptyValues = (): HoursValues => ({
  date: localDay(),
  startTime: '',
  hours: '1',
  apparatus: 'Reformer',
  sessionType: 'Group',
  clientName: '',
  notes: '',
});

const valuesOf = (e: LogEntry): HoursValues => ({
  date: e.date,
  startTime: e.startTime ?? '',
  hours: String(e.hours ?? ''),
  apparatus: e.apparatus ?? 'Reformer',
  sessionType: e.sessionType ?? 'Group',
  clientName: e.clientName ?? '',
  notes: e.notes ?? '',
});

const bodyOf = (v: HoursValues) => ({ ...v, hours: Number(v.hours) });

function HoursForm({
  category,
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  category: LogCategory;
  initial: HoursValues;
  submitLabel: string;
  onSubmit: (values: HoursValues) => Promise<string>;
  onCancel: () => void;
}) {
  const [v, setV] = useState(initial);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const has = (field: LogCategory['fields'][number]) => category.fields.includes(field);
  const set = (key: keyof HoursValues) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
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
    <form className="trainee-form trainee-entry-form" onSubmit={submit}>
      <div className="trainee-entry-fields">
        <label>
          {s.logbook.form.date}
          <input type="date" required value={v.date} max={localDay()} onChange={set('date')} />
        </label>
        {has('startTime') && (
          <label>
            {s.logbook.form.time}
            <input type="time" value={v.startTime} onChange={set('startTime')} />
          </label>
        )}
        {has('clientName') && (
          <label>
            {s.logbook.form.clientName}
            <input required maxLength={120} value={v.clientName} onChange={set('clientName')} />
          </label>
        )}
        {has('apparatus') && (
          <label>
            {s.logbook.form.apparatus}
            <input maxLength={60} value={v.apparatus} onChange={set('apparatus')} />
          </label>
        )}
        {has('sessionType') && (
          <label>
            {s.logbook.form.sessionType}
            <select value={v.sessionType} onChange={set('sessionType')}>
              <option value="Group">{s.logbook.form.group}</option>
              <option value="PT">{s.logbook.form.pt}</option>
            </select>
          </label>
        )}
        <label>
          {s.logbook.form.hours}
          <input type="number" required min="0.25" max="8" step="0.25" value={v.hours} onChange={set('hours')} />
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

export function CategoryLog({
  logbook,
  category,
  handlers,
  onChange,
}: {
  logbook: Logbook;
  category: LogCategory;
  handlers: SessionHandlers;
  onChange: () => void;
}) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  // Trying the same values again reuses the ref, so a save whose answer got lost isn't stored twice. Changed values
  // are a new entry: under the old ref the API would answer with the first copy and drop the change.
  const attempt = useRef<{ values: string; ref: string } | null>(null);
  const rows = logbook.entries.filter((e) => e.kind === 'hours' && e.category === category.key);
  const has = (field: LogCategory['fields'][number]) => category.fields.includes(field);

  const create = async (v: HoursValues) => {
    const values = JSON.stringify(v);
    if (attempt.current?.values !== values) attempt.current = { values, ref: newClientRef() };
    try {
      await createEntry({ ...bodyOf(v), kind: 'hours', category: category.key, clientRef: attempt.current.ref });
    } catch (err) {
      const message = saveErrorText(err, handlers);
      if (message === s.logbook.saveFailed) onChange(); // the outcome is unknown: the list shows whether it arrived
      return message;
    }
    attempt.current = null;
    setAdding(false);
    onChange();
    return '';
  };

  const update = (id: string) => async (v: HoursValues) => {
    try {
      await updateEntry(id, bodyOf(v));
    } catch (err) {
      return saveErrorText(err, handlers);
    }
    setEditing(null);
    onChange();
    return '';
  };

  return (
    <section className="trainee-card">
      <div className="trainee-heading">
        <div>
          <h3 className="trainee-tight">{category.name}</h3>
          <p className="trainee-hint trainee-tight">{s.logbook.required(category.required)}</p>
        </div>
        {!category.staffOnly && !adding && (
          <button type="button" className="btn-ink" onClick={() => setAdding(true)}>
            {s.logbook.logHours}
          </button>
        )}
      </div>
      {category.staffOnly && <p className="trainee-hint">{s.logbook.recordedByAcademy}</p>}
      {adding && (
        <HoursForm
          category={category}
          initial={emptyValues()}
          submitLabel={s.logbook.form.send}
          onSubmit={create}
          onCancel={() => {
            attempt.current = null; // a later identical entry is a new one
            setAdding(false);
          }}
        />
      )}

      {rows.length === 0 ? (
        <p className="trainee-hint">{s.logbook.noEntries}</p>
      ) : (
        <ul className="trainee-entries">
          {rows.map((e) =>
            editing === e._id ? (
              <li key={e._id}>
                <HoursForm category={category} initial={valuesOf(e)} submitLabel={s.logbook.form.save} onSubmit={update(e._id)} onCancel={() => setEditing(null)} />
              </li>
            ) : (
              <li key={e._id} className="trainee-entry">
                <div>
                  <span className="trainee-entry-main">
                    {dayText(e.date)} · {e.hours} h
                  </span>
                  <span className="trainee-entry-meta">
                    {[has('startTime') ? e.startTime : null, has('clientName') ? e.clientName : null, has('apparatus') ? e.apparatus : null, has('sessionType') ? e.sessionType : null]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                  {e.notes && <span className="trainee-entry-meta">{e.notes}</span>}
                  {e.status === 'rejected' && e.rejectionReason && <span className="trainee-error">{e.rejectionReason}</span>}
                </div>
                <div className="trainee-entry-side">
                  <span className={`trainee-status ${e.status}`}>{e.status === 'approved' ? s.logbook.signedBy(e.signedByName) : s.logbook.status[e.status]}</span>
                  {e.recording ? (
                    <a className="trainee-link" href="#observations">{s.logbook.fromRecording}</a>
                  ) : (
                    e.status !== 'approved' && (
                      <button type="button" className="trainee-link" onClick={() => setEditing(e._id)}>
                        {e.status === 'rejected' ? s.logbook.correct : s.logbook.edit}
                      </button>
                    )
                  )}
                </div>
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  );
}
