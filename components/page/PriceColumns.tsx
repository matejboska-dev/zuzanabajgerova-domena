import { PRICE_IN, PRICE_OUT } from '@/lib/home';

// dva sloupce "co je v provizi / co v cene neni". stejne tridy jako sekce ceny na hlavni strane.
export default function PriceColumns() {
  return (
    <div className="pricecols">
      <div className="pricecol pricecol--included">
        <div className="pricecol__head">
          <h3 className="pricecol__h">V naší provizi je vždy</h3>
          <span className="pricecol__badge pricecol__badge--in">Zahrnuto</span>
        </div>
        <ul className="pricecol__list">
          {PRICE_IN.map((x) => (
            <li key={x} className="pricecol__item">
              <span className="pricecol__icon pricecol__icon--check" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5l3 3 6-6" />
                </svg>
              </span>
              <span className="pricecol__text">{x}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pricecol pricecol--excluded">
        <div className="pricecol__head">
          <h3 className="pricecol__h">V ceně není, ale řeknu vám to předem</h3>
          <span className="pricecol__badge pricecol__badge--out">Předem známo</span>
        </div>
        <ul className="pricecol__list">
          {PRICE_OUT.map((x) => (
            <li key={x} className="pricecol__item">
              <span className="pricecol__icon pricecol__icon--info" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="8" r="3" />
                </svg>
              </span>
              <span className="pricecol__text">{x}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
