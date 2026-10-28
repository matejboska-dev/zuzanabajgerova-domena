'use client';
import type { Locale } from '@/lib/i18n';
import { localized, localizeTree } from '@/lib/localize';


import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'next/navigation';

// Filtr vypisu nabidek. Karty vykresli server (kazda nese data-* atributy), tahle komponenta je
// jen schovava a radi. Do prohlizece se tak neposilaji data nabidek. Stav je v URL (?typ=byt...),
// takze filtr jde sdilet a rychle vybery z hlavni strany vedou primo na nej.

type F = { oblast: string; typ: string; cena: string; plocha: string; disp: string; stav: string; kategorie: string; razeni: string };
const EMPTY: F = { oblast: '', typ: '', cena: '', plocha: '', disp: '', stav: '', kategorie: '', razeni: '' };
const KEYS = Object.keys(EMPTY) as (keyof F)[];
/** kolik karet ukazat najednou (zbytek je v HTML, jen skryty, takze ho Google vidi) */
const PAGE = 24;

export type Option = { value: string; label: string };

function ListingFilter({
  gridId,
  moreId,
  oblasti,
  total,
  locale = 'cs',
}: {
  gridId: string;
  /** element pod mrizkou, kam se vlozi tlacitko Zobrazit dalsi */
  moreId: string;
  oblasti: Option[];
  total: number;
  locale?: Locale;
}) {
  const [moreEl, setMoreEl] = useState<HTMLElement | null>(null);
  useEffect(() => setMoreEl(document.getElementById(moreId)), [moreId]);
  const searchParams = useSearchParams();
  const readFilters = () => {
    const next = { ...EMPTY };
    for (const key of KEYS) next[key] = searchParams.get(key) ?? '';
    return next;
  };
  const [f, setF] = useState<F>(readFilters);
  useEffect(() => {
    const next = { ...EMPTY };
    for (const key of KEYS) next[key] = searchParams.get(key) ?? '';
    setF(next);
  }, [searchParams]);
  const [shown, setShown] = useState(total);
  const [limit, setLimit] = useState(PAGE);

  const apply = useCallback(
    (state: F, max: number) => {
      const grid = document.getElementById(gridId);
      if (!grid) return;
      const items = Array.from(grid.querySelectorAll<HTMLElement>('[data-o]'));
      let n = 0;
      const ranked = items.map((el) => {
        const d = el.dataset;
        const cena = Number(d.c || 0);
        const plocha = Number(d.a || 0);
        const ok =
          (!state.oblast ||
            (state.oblast === 'pobrezi' ? d.coast === '1' : d.o === state.oblast)) &&
          (!state.typ || d.t === state.typ) &&
          (!state.cena || (cena > 0 && cena <= Number(state.cena))) &&
          (!state.plocha || plocha >= Number(state.plocha)) &&
          (!state.disp || d.d === state.disp) &&
          (!state.kategorie || (d.k || '').split(' ').includes(state.kategorie)) &&
          (!state.stav || d.s === state.stav);
        if (ok) n++;
        return { el, ok, cena, plocha, i: Number(d.i || 0) };
      });
      const sorted = [...ranked].sort((a, b) => {
        if (state.razeni === 'cena-asc') return (a.cena || Infinity) - (b.cena || Infinity);
        if (state.razeni === 'cena-desc') return b.cena - a.cena;
        if (state.razeni === 'plocha') return b.plocha - a.plocha;
        return a.i - b.i;
      });
      let seen = 0;
      sorted.forEach((r, idx) => {
        r.el.style.order = String(idx);
        r.el.hidden = !r.ok || seen++ >= max;
      });
      setShown(n);
    },
    [gridId],
  );

  // novy filtr = zase od zacatku
  useEffect(() => setLimit(PAGE), [f]);

  useEffect(() => {
    apply(f, limit);
  }, [f, limit, apply]);

  function updateFilters(next: F) {
    setF(next);
    const q = new URLSearchParams();
    for (const k of KEYS) if (next[k]) q.set(k, next[k]);
    const qs = q.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`);
  }

  const set = (k: keyof F) => (e: React.ChangeEvent<HTMLSelectElement>) => updateFilters({ ...f, [k]: e.target.value });
  const active = KEYS.filter((k) => k !== 'razeni' && f[k]).length;

  return (
    <div className="flt">
      <div className="flt__bar" role="search" aria-label="Filtr nabídek">
        <Sel id="flt-oblast" label="Oblast" value={f.oblast} onChange={set('oblast')}
          options={[{ value: '', label: 'Celé Abruzzo' }, { value: 'pobrezi', label: 'Pobřeží' }, ...oblasti]} />
        <Sel id="flt-typ" label="Typ" value={f.typ} onChange={set('typ')}
          options={[{ value: '', label: 'Vše' }, { value: 'byt', label: 'Apartmán' }, { value: 'dum', label: 'Dům' }, { value: 'pozemek', label: 'Pozemek' }]} />
        <Sel id="flt-kategorie" label="Kategorie" value={f.kategorie} onChange={set('kategorie')}
          options={[{ value: '', label: 'Vše' }, { value: 'investicni', label: 'Investiční' }, { value: 'luxusni', label: 'Luxusní' }]} />
        <Sel id="flt-cena" label="Cena do" value={f.cena} onChange={set('cena')}
          options={[{ value: '', label: 'Bez limitu' }, ...[100000, 150000, 200000, 300000, 500000].map((v) => ({ value: String(v), label: `${v.toLocaleString('cs-CZ')} €` }))]} />
        <Sel id="flt-plocha" label="Plocha od" value={f.plocha} onChange={set('plocha')}
          options={[{ value: '', label: 'Jakákoli' }, ...[40, 60, 80, 100, 150].map((v) => ({ value: String(v), label: `${v} m²` }))]} />
        <Sel id="flt-disp" label="Dispozice" value={f.disp} onChange={set('disp')}
          options={[{ value: '', label: 'Jakákoli' }, { value: '1', label: '1+kk a 1+1' }, { value: '2', label: '2+kk a 2+1' }, { value: '3', label: '3+kk a 3+1' }, { value: '4', label: '4 a více pokojů' }]} />
        <Sel id="flt-stav" label="Stav" value={f.stav} onChange={set('stav')}
          options={[{ value: '', label: 'Jakýkoli' }, { value: 'po-rekonstrukci', label: 'Po rekonstrukci' }, { value: 'udrzovany', label: 'Udržovaný' }, { value: 'k-rekonstrukci', label: 'K rekonstrukci' }, { value: 'novostavba', label: 'Novostavba' }]} />
      </div>

      <div className="flt__meta">
        <p className="flt__count" aria-live="polite">
          <b>{shown}</b> z {total} nabídek
        </p>
        <div className="flt__right">
          {active > 0 && (
            <button type="button" className="flt__reset" onClick={() => updateFilters({ ...EMPTY, razeni: f.razeni })}>
              Zrušit filtr
            </button>
          )}
          <label className="flt__sort" htmlFor="flt-razeni">
            <span>Řadit</span>
            <select id="flt-razeni" value={f.razeni} onChange={set('razeni')}>
              <option value="">Doporučené</option>
              <option value="cena-asc">Od nejlevnější</option>
              <option value="cena-desc">Od nejdražší</option>
              <option value="plocha">Největší plocha</option>
            </select>
          </label>
        </div>
      </div>

      {moreEl &&
        shown > limit &&
        createPortal(
          localizeTree(<button type="button" className="btn btn--ghost" onClick={() => setLimit((l) => l + PAGE)}>
            Zobrazit další nabídky ({shown - limit})
          </button>, locale),
          moreEl,
        )}

      {shown === 0 && (
        <div className="flt__empty">
          <p>Tomuhle zadání teď žádná nabídka neodpovídá.</p>
          <a className="btn btn--saffron" href="#na-miru">Najít nemovitost na míru</a>
        </div>
      )}
    </div>
  );
}

function SelContent({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}) {
  return (
    <label className={`flt__field${value ? ' is-set' : ''}`} htmlFor={id}>
      <span className="flt__label">{label}</span>
      <select id={id} value={value} onChange={onChange}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default localized(ListingFilter);

const Sel = localized(SelContent);
