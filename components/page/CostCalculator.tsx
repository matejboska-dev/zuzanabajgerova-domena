'use client';
import { localized } from '@/lib/localize';


import { useMemo, useState } from 'react';
import Link from 'next/link';
import { waLink } from '@/lib/contact';

// Kalkulacka celkoveho rozpoctu. NEPOCITA dane ani poplatky: cena na webu je konecna a uz je
// obsahuje (dan z prevodu, notar, nase provize, prvni rok servisu). Prida jen to, co v cene neni:
// rekonstrukci a vybaveni a rocni IMU a TARI (rozpeti z FAQ na hlavni strane).

const IMU_TARI_MIN = 500;
const IMU_TARI_MAX = 2000;

const fmt = (n: number) => new Intl.NumberFormat('cs-CZ').format(Math.round(n));
const czk = (eur: number, rate: number) => Math.round((eur * rate) / 1000) * 1000;

function toNumber(v: string): number {
  const n = Number(v.replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function CostCalculator({ rate, consultHref }: { rate: number; consultHref: string }) {
  const [price, setPrice] = useState('');
  const [reno, setReno] = useState('');

  const p = toNumber(price);
  const r = toNumber(reno);
  const total = p + r;

  const waText = useMemo(
    () =>
      p
        ? `Dobrý den, mám zájem o koupi nemovitosti v Abruzzu za cca ${fmt(p)} €${
            r ? ` a s rekonstrukcí za cca ${fmt(r)} €` : ''
          }. Prosím, ozvěte se mi.`
        : undefined,
    [p, r],
  );

  return (
    <div className="calc">
      <div className="calc__inputs">
        <label className="calc__field">
          <span>Cena nemovitosti na webu (€)</span>
          <input
            inputMode="numeric"
            placeholder="například 120 000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            aria-describedby="calc-price-note"
          />
          <small id="calc-price-note">Cena, kterou vidíte u nabídky. Je konečná.</small>
        </label>
        <label className="calc__field">
          <span>Rekonstrukce a vybavení (€), pokud ji plánujete</span>
          <input
            inputMode="numeric"
            placeholder="například 15 000"
            value={reno}
            onChange={(e) => setReno(e.target.value)}
          />
          <small>Odhad rozpočtu určíme společně podle stavu bytu.</small>
        </label>
      </div>

      <div className="calc__result" aria-live="polite">
        {p === 0 ? (
          <p className="calc__empty">Zadejte cenu z nabídky a hned uvidíte celkový rozpočet.</p>
        ) : (
          <>
            <dl className="calc__rows">
              <div>
                <dt>Cena nemovitosti, konečná</dt>
                <dd>
                  {fmt(p)} €<small>≈ {fmt(czk(p, rate))} Kč</small>
                </dd>
              </div>
              {r > 0 && (
                <div>
                  <dt>Rekonstrukce a vybavení</dt>
                  <dd>
                    {fmt(r)} €<small>≈ {fmt(czk(r, rate))} Kč</small>
                  </dd>
                </div>
              )}
              <div className="calc__total">
                <dt>Jednorázově celkem</dt>
                <dd>
                  {fmt(total)} €<small>≈ {fmt(czk(total, rate))} Kč</small>
                </dd>
              </div>
              <div>
                <dt>Každý rok navíc: IMU a TARI</dt>
                <dd>
                  {fmt(IMU_TARI_MIN)} až {fmt(IMU_TARI_MAX)} €<small>orientačně, přesný výpočet udělám před koupí</small>
                </dd>
              </div>
            </dl>
            <p className="calc__incl">
              V ceně nemovitosti už je daň z převodu, odměna notáře, naše provize a první rok
              základního servisu s mými asistentkami.
            </p>
            <div className="calc__cta">
              <a className="btn btn--saffron" href={waLink(waText)} target="_blank" rel="noopener noreferrer">
                Probrat výpočet na WhatsApp
              </a>
              <Link className="btn btn--glass" href={consultHref}>
                Rezervovat hovor
              </Link>
            </div>
          </>
        )}
        <p className="calc__fine">Kč jsou orientační, podle aktuálního kurzu ČNB.</p>
      </div>
    </div>
  );
}

export default localized(CostCalculator);
