/** ciselne karty krok za krokem (01, 02, 03 v Playfair, safranova) */
export default function StepCards({ items, cols = 3 }: { items: { title: string; text: string }[]; cols?: 3 | 4 }) {
  return (
    <ol className={`stepcards stepcards--${cols}`}>
      {items.map((s, i) => (
        <li className="stepcard" key={s.title}>
          <span className="stepcard__n" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="stepcard__t">{s.title}</h3>
          <p className="stepcard__d">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
