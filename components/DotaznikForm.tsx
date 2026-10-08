'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DOTAZNIK } from '@/lib/dotaznik';
import { submitLead, trackEvent } from '@/lib/forms';
import { waLink, PHONE_TEL, PHONE_DISPLAY } from '@/lib/contact';
import { Doplnit } from '@/components/Marked';

type Status = 'idle' | 'sending' | 'ok' | 'error';

// dotaznik pro vazne zajemce. odesila se pres lib/forms.ts, tedy stejnym mistem
// jako kontaktni formular. dokud neni napojeni hotove, formular to rekne a nic nepredstira.
export default function DotaznikForm({ privacyHref }: { privacyHref: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await submitLead('dotaznik', data, Date.now() - startedAt.current);
    if (res.ok) trackEvent('generate_lead', { form: 'dotaznik' });
    setError(res.error ?? '');
    setStatus(res.ok ? 'ok' : 'error');
  }

  if (status === 'ok') {
    return (
      <p className="dq__done" role="status">
        Děkuji, dotazník mám. Ozvu se vám do 24 hodin.
      </p>
    );
  }

  return (
    <form className="dq__form" onSubmit={onSubmit} aria-label="Dotazník pro vážné zájemce">
      {DOTAZNIK.map((group) => (
        <section className="dq__group" key={group.title}>
          <h2 className="dq__group-t">{group.title}</h2>

          {group.fields.map((f) => {
            if (f.type === 'radio') {
              return (
                <fieldset className="dq__field" key={f.id}>
                  <legend>{f.label}</legend>
                  <div className="dq__opts">
                    {f.options.map((o, i) => (
                      <label className="dq__opt" key={o}>
                        <input
                          type="radio"
                          name={f.id}
                          value={o}
                          required={f.required && i === 0}
                        />
                        <span>{o}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            }
            if (f.type === 'select') {
              return (
                <div className="dq__field" key={f.id}>
                  <label htmlFor={`dq-${f.id}`}>{f.label}</label>
                  <select id={`dq-${f.id}`} name={f.id} required={f.required} defaultValue="">
                    <option value="" disabled>
                      Vyberte
                    </option>
                    {f.options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
            if (f.type === 'textarea') {
              return (
                <div className="dq__field" key={f.id}>
                  <label htmlFor={`dq-${f.id}`}>{f.label}</label>
                  <textarea id={`dq-${f.id}`} name={f.id} rows={5} placeholder={f.placeholder} />
                </div>
              );
            }
            return (
              <div className="dq__field" key={f.id}>
                <label htmlFor={`dq-${f.id}`}>{f.label}</label>
                <input
                  id={`dq-${f.id}`}
                  type={f.type}
                  name={f.id}
                  required={f.required}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                />
              </div>
            );
          })}
        </section>
      ))}

      <div className="dq__submit">
        <button type="submit" className="btn btn--saffron" disabled={status === 'sending'}>
          Odeslat dotazník
        </button>
        <p className="dq__fine">
          Ozvu se do 24 hodin. Údaje použiji jen k odpovědi na vaši poptávku a na webu se neukládají. Více v{' '}
          <Link href={privacyHref}>zásadách ochrany osobních údajů</Link>.
        </p>
        {/* skryte pole proti botum */}
        <div className="lf__hp" aria-hidden="true">
          <label>
            Web
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        {status === 'error' && (
          <div className="lf__error" role="alert">
            <p>
              Dotazník se nepodařilo odeslat. Napište mi prosím na WhatsApp nebo zavolejte, ozvu se
              hned, jak to půjde.
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
