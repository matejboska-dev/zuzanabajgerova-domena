'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitLead, trackEvent, type LeadSource } from '@/lib/forms';
import { waLink, PHONE_TEL, PHONE_DISPLAY } from '@/lib/contact';
import { path } from '@/lib/routes';
import { Doplnit } from '@/components/Marked';

export type LeadField =
  | {
      name: string;
      label: string;
      type: 'text' | 'email' | 'tel';
      required?: boolean;
      autoComplete?: string;
      placeholder?: string;
      half?: boolean;
    }
  | { name: string; label: string; type: 'select'; options: string[]; required?: boolean; half?: boolean }
  | { name: string; label: string; type: 'radio'; options: string[]; required?: boolean }
  | { name: string; label: string; type: 'textarea'; rows?: number; placeholder?: string; required?: boolean };

type Status = 'idle' | 'sending' | 'error';

const ERRORS: Record<string, string> = {
  invalid_email: 'Zkontrolujte prosím e-mailovou adresu.',
  invalid_fields: 'Vyplňte prosím jméno a e-mail nebo telefon.',
  rate_limited: 'Odesíláte příliš často. Zkuste to prosím za chvíli, nebo mi napište na WhatsApp.',
};

/**
 * Formular, ktery posila poptavku pres lib/forms.ts na /api/lead. Po uspechu presmeruje na
 * /dekujeme (noindex), kde se da merit konverze. Pri chybe nic nepredstira: ukaze zalozni kontakty.
 */
export default function LeadForm({
  source,
  fields,
  submitLabel = 'Odeslat',
  variant = 'light',
  className,
  before,
  fine,
  ariaLabel,
  hidden,
}: {
  source: LeadSource;
  fields: LeadField[];
  submitLabel?: string;
  variant?: 'light' | 'dark';
  className?: string;
  /** vlozeno nad pole (napr. vyber terminu hovoru) */
  before?: React.ReactNode;
  fine?: React.ReactNode;
  ariaLabel: string;
  /** skryta pole, ktera se poslou s poptavkou (napr. nazev a odkaz nemovitosti) */
  hidden?: Record<string, string>;
}) {
  const router = useRouter();
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await submitLead(source, data, Date.now() - startedAt.current);
    if (res.ok) {
      trackEvent('generate_lead', { form: source });
      router.push(`${path('dekujeme', 'cs')}?z=${source}`);
      return;
    }
    setError(res.error ?? '');
    setStatus('error');
  }

  const cls = `lf lf--${variant}${variant === 'dark' ? ' contact__form' : ''}${className ? ` ${className}` : ''}`;

  return (
    <form className={cls} onSubmit={onSubmit} aria-label={ariaLabel} noValidate={false}>
      {before}

      <div className="lf__grid">
        {fields.map((f) => {
          const id = `lf-${source}-${f.name}`;
          const wide = f.type === 'textarea' || f.type === 'radio' || !('half' in f && f.half);

          if (f.type === 'radio') {
            return (
              <fieldset className="lf__field lf__field--wide lf__radio" key={f.name}>
                <legend>{f.label}</legend>
                <div className="lf__opts">
                  {f.options.map((o, i) => (
                    <label className="lf__opt" key={o}>
                      <input type="radio" name={f.name} value={o} required={f.required && i === 0} />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          }

          return (
            <label
              className={`lf__field${wide ? ' lf__field--wide' : ''}`}
              htmlFor={id}
              key={f.name}
            >
              <span>
                {f.label}
                {f.required ? <i aria-hidden="true"> *</i> : null}
              </span>
              {f.type === 'select' ? (
                <select id={id} name={f.name} required={f.required} defaultValue="">
                  <option value="" disabled>
                    Vyberte
                  </option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea
                  id={id}
                  name={f.name}
                  rows={f.rows ?? 4}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              ) : (
                <input
                  id={id}
                  type={f.type}
                  name={f.name}
                  required={f.required}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                />
              )}
            </label>
          );
        })}
      </div>

      {hidden &&
        Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}

      {/* past na boty: lidem se nezobrazi, bot ho vyplni */}
      <div className="lf__hp" aria-hidden="true">
        <label>
          Web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="lf__submit">
        <button type="submit" className="btn btn--saffron" disabled={status === 'sending'}>
          {status === 'sending' ? 'Odesílám…' : submitLabel}
        </button>
        {fine && <p className="lf__fine">{fine}</p>}
      </div>

      <div aria-live="polite">
        {status === 'error' && (
          <div className="lf__error" role="alert">
            <p>
              {ERRORS[error] ??
                'Zprávu se nepodařilo odeslat. Napište mi prosím na WhatsApp nebo zavolejte, ozvu se hned, jak to půjde.'}
            </p>
            <div className="lf__error-actions">
              <a className="btn btn--saffron" href={waLink()} target="_blank" rel="noopener noreferrer">
                Napsat na WhatsApp
              </a>
              <a className="btn btn--ghost" href={PHONE_TEL}>
                Zavolat {PHONE_DISPLAY}
              </a>
            </div>
            {error === 'not_configured' && process.env.NODE_ENV !== 'production' && (
              <p>
                <Doplnit>[DOPLNIT: nastavit doručení poptávek, viz web/.env.example]</Doplnit>
              </p>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
