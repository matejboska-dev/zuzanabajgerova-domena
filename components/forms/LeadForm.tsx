'use client';
import { localized } from '@/lib/localize';


import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitLead, trackEvent, type LeadSource } from '@/lib/forms';
import { waLink, PHONE_TEL, PHONE_DISPLAY } from '@/lib/contact';
import { path } from '@/lib/routes';
import { Doplnit } from '@/components/Marked';
import type { Locale } from '@/lib/i18n';

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

type Status = 'idle' | 'sending' | 'error' | 'success';

const ERRORS: Record<string, string> = {
  invalid_email: 'Zkontrolujte prosím e-mailovou adresu.',
  invalid_fields: 'Vyplňte prosím jméno a e-mail nebo telefon.',
  rate_limited: 'Odesíláte příliš často. Zkuste to prosím za chvíli, nebo mi napište na WhatsApp.',
};

const FORM_UI = {
  cs: { sending: 'Odesílám…', select: 'Vyberte', email: ERRORS.invalid_email, fields: ERRORS.invalid_fields, rate: ERRORS.rate_limited, error: 'Zprávu se nepodařilo odeslat. Napište mi prosím na WhatsApp nebo zavolejte.', whatsapp: 'Napsat na WhatsApp', call: 'Zavolat' },
  en: { sending: 'Sending…', select: 'Choose', email: 'Please check your email address.', fields: 'Please enter your name and email or phone.', rate: 'Too many attempts. Please try again later or message me on WhatsApp.', error: 'Your message could not be sent. Please contact me on WhatsApp or call me.', whatsapp: 'Message on WhatsApp', call: 'Call' },
  it: { sending: 'Invio in corso…', select: 'Seleziona', email: 'Controlla l’indirizzo e-mail.', fields: 'Inserisci nome e indirizzo e-mail o telefono.', rate: 'Troppi tentativi. Riprova più tardi o scrivimi su WhatsApp.', error: 'Non è stato possibile inviare il messaggio. Scrivimi su WhatsApp o chiamami.', whatsapp: 'Scrivimi su WhatsApp', call: 'Chiama' },
};

/**
 * Formular, ktery posila poptavku pres lib/forms.ts do Web3Forms. Po uspechu presmeruje na
 * /dekujeme (noindex), kde se da merit konverze. Pri chybe nic nepredstira: ukaze zalozni kontakty.
 */
function LeadForm({
  source,
  fields,
  submitLabel = 'Odeslat',
  variant = 'light',
  className,
  before,
  fine,
  ariaLabel,
  hidden,
  locale = 'cs',
  successMessage,
  whatsappText,
}: {
  source: LeadSource;
  fields: LeadField[];
  submitLabel?: string;
  variant?: 'light' | 'dark';
  className?: string;
  /** Obsah vložený nad pole formuláře. */
  before?: React.ReactNode;
  fine?: React.ReactNode;
  ariaLabel: string;
  /** skryta pole, ktera se poslou s poptavkou (napr. nazev a odkaz nemovitosti) */
  hidden?: Record<string, string>;
  locale?: Locale;
  /** An inline confirmation avoids sending localized service enquiries to a Czech-only page. */
  successMessage?: string;
  whatsappText?: string;
}) {
  const ui = FORM_UI[locale];
  const router = useRouter();
  const startedAt = useRef(0);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending' || status === 'success') return;
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await submitLead(source, data, Date.now() - startedAt.current);
    if (res.ok) {
      trackEvent('generate_lead', { form: source, ...(source === 'sluzba' ? { service: hidden?.sluzba ?? '', locale } : {}) });
      if (successMessage) { setStatus('success'); return; }
      router.push(`${path('dekujeme', locale)}?z=${source}`);
      return;
    }
    setError(res.error ?? '');
    setStatus('error');
  }

  const cls = `lf lf--${variant}${variant === 'dark' ? ' contact__form' : ''}${className ? ` ${className}` : ''}`;

  if (status === 'success') return <div className={`${cls} lf__success`} role="status" tabIndex={-1}><p>{successMessage}</p></div>;

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
                    {ui.select}
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
          {status === 'sending' ? ui.sending : submitLabel}
        </button>
        {fine && <p className="lf__fine">{fine}</p>}
      </div>

      <div aria-live="polite">
        {status === 'error' && (
          <div className="lf__error" role="alert">
            <p>
              {{ invalid_email: ui.email, invalid_fields: ui.fields, rate_limited: ui.rate }[error] ?? ui.error}
            </p>
            <div className="lf__error-actions">
              <a className="btn btn--saffron" href={waLink(whatsappText)} target="_blank" rel="noopener noreferrer">
                {ui.whatsapp}
              </a>
              <a className="btn btn--ghost" href={PHONE_TEL}>
                {ui.call} {PHONE_DISPLAY}
              </a>
            </div>
            {error === 'not_configured' && source !== 'sluzba' && process.env.NODE_ENV !== 'production' && (
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

export default localized(LeadForm);
