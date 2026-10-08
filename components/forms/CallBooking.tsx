'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LeadForm, { type LeadField } from './LeadForm';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { BUDGET_OPTIONS, PURPOSE_OPTIONS } from '@/lib/contact';

// Rezervace hovoru bez cizi sluzby: navstevnik navrhne den a cast dne, ja termin potvrdim.
// Kdyz klientka vybere kalendar (Calendly, Cal.com), nahradi se jen tahle komponenta.
// Cesko i Italie maji stejny cas, takze zadne prepocitavani casovych pasem.

const PARTS = ['Dopoledne', 'Odpoledne', 'Večer', 'Kdykoli během dne'];
const CHANNELS = ['WhatsApp', 'Telefon', 'Videohovor'];

type Day = { value: string; short: string; long: string };

/** nasledujicich 10 pracovnich dnu, od zitrka (dnesek nestihnu potvrdit) */
function nextWeekdays(count: number): Day[] {
  const out: Day[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue;
    out.push({
      value: d.toISOString().slice(0, 10),
      short: d.toLocaleDateString('cs-CZ', { weekday: 'short', day: 'numeric', month: 'numeric' }),
      long: d.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' }),
    });
  }
  return out;
}

const FIELDS: LeadField[] = [
  { name: 'jmeno', label: 'Jméno', type: 'text', required: true, autoComplete: 'name', half: true },
  { name: 'telefon', label: 'Telefon nebo WhatsApp', type: 'tel', required: true, autoComplete: 'tel', placeholder: '+420', half: true },
  { name: 'email', label: 'E-mail', type: 'email', required: true, autoComplete: 'email', half: true },
  { name: 'ucel', label: 'Co hledáte', type: 'select', options: PURPOSE_OPTIONS, half: true },
  { name: 'rozpocet', label: 'Rozpočet včetně všech nákladů', type: 'select', options: BUDGET_OPTIONS },
  {
    name: 'poznamka',
    label: 'Poznámka k hovoru',
    type: 'textarea',
    rows: 3,
    placeholder: 'Cokoli, co byste chtěli probrat nebo vědět předem',
  },
];

function SlotPicker() {
  const [days, setDays] = useState<Day[]>([]);
  useEffect(() => setDays(nextWeekdays(10)), []);

  return (
    <div className="slot">
      <fieldset className="lf__field lf__field--wide lf__radio">
        <legend>1. Vyberte den, který se vám hodí</legend>
        <div className="lf__opts lf__opts--days">
          {days.length === 0 && <span className="slot__wait">Načítám dny…</span>}
          {days.map((d, i) => (
            <label className="lf__opt" key={d.value}>
              <input type="radio" name="termin" value={d.long} required={i === 0} />
              <span>{d.short}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="lf__field lf__field--wide lf__radio">
        <legend>2. Kdy během dne</legend>
        <div className="lf__opts">
          {PARTS.map((p, i) => (
            <label className="lf__opt" key={p}>
              <input type="radio" name="cas" value={p} required={i === 0} defaultChecked={i === PARTS.length - 1} />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="lf__field lf__field--wide lf__radio">
        <legend>3. Jak se vám mám ozvat</legend>
        <div className="lf__opts">
          {CHANNELS.map((c, i) => (
            <label className="lf__opt" key={c}>
              <input type="radio" name="kanal" value={c} defaultChecked={i === 0} />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="slot__note">
        Itálie i Česko mají stejný čas. Navržený termín vám potvrdím do 24 hodin.
      </p>

      <h3 className="slot__h">4. Kam termín potvrdit</h3>
    </div>
  );
}

export default function CallBooking({ id }: { id?: string }) {
  return (
    <div id={id}>
      <LeadForm
        source="konzultace"
        variant="light"
        ariaLabel="Rezervace nezávazné konzultace"
        before={<SlotPicker />}
        fields={FIELDS}
        submitLabel="Rezervovat hovor"
        fine={
          <>
            Konzultace je zdarma a k ničemu vás nezavazuje. Údaje použiji jen k domluvě hovoru a na webu se
            neukládají. Více v <Link href={path('ochranaUdaju', DEFAULT_LOCALE)}>zásadách ochrany osobních údajů</Link>.
          </>
        }
      />
    </div>
  );
}
