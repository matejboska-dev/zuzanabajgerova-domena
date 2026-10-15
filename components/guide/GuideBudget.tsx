'use client';
import { useState } from 'react';
import { waLink } from '@/lib/contact';
import { CircleArrow } from '@/components/services/ServiceInteractions';
const format = (n: number) => new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 0 }).format(n);
const number = (v: string) => { const n = Number(v.replace(/\s/g, '').replace(',', '.')); return Number.isFinite(n) ? Math.max(0, n) : 0; };
export default function GuideBudget({ rate }: { rate: number }) {
  const [price, setPrice] = useState('');
  const [works, setWorks] = useState('');
  const [fees, setFees] = useState('');
  const total = number(price) + number(works) + number(fees);
  return <div className="guide-budget">
    <div className="guide-budget__fields">
      <label>Cena z nabídky (€)<input inputMode="decimal" value={price} onChange={e => setPrice(e.target.value)} placeholder="Například 120 000" /></label>
      <label>Rekonstrukce a vybavení (€)<input inputMode="decimal" value={works} onChange={e => setWorks(e.target.value)} placeholder="Například 15 000" /></label>
      <label>Náklady nad rámec nabídky (€)<input inputMode="decimal" value={fees} onChange={e => setFees(e.target.value)} placeholder="Podle písemného rozpisu" aria-describedby="guide-budget-note" /></label>
      <p id="guide-budget-note">Zahrnuté daně, notáře či provizi nepřičítejte podruhé. U cizí nabídky si jejich výši nejdříve nechte potvrdit.</p>
    </div>
    <div className="guide-budget__result" aria-live="polite" aria-atomic="true"><span>Váš jednorázový rozpočet</span><strong>{number(price) > 0 ? `${format(total)} €` : 'Začněte cenou domu.'}</strong>{number(price) > 0 && <p>Orientačně {format(total * rate)} Kč při kurzu {new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 2 }).format(rate)} Kč/€.</p>}<p>Výsledek sčítá zadané částky. Nezahrnuje pravidelný provoz ani nevyplněné náklady a nenahrazuje daňový výpočet.</p><a className="guide-button" href={waLink(`Dobrý den, rádi bychom probrali rozpočet na koupi v Abruzzu.${number(price) > 0 ? ` Počítáme přibližně s ${format(total)} € včetně námi zadaných nákladů.` : ''}`)} target="_blank" rel="noopener noreferrer">Probrat můj rozpočet<CircleArrow /></a></div>
  </div>;
}
