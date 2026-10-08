// zvyrazni znacky [DOPLNIT: ...] a [OVERIT: ...] v textu, at je nejde prehlednout.
// vsechny najdes hledanim data-doplnit="true" (nebo textem "[DOPLNIT" / "[OVĚŘIT").

const MARK = /(\[(?:DOPLNIT|OVĚŘIT):[^\]]*\])/g;

export function Doplnit({ children, overit }: { children: React.ReactNode; overit?: boolean }) {
  return (
    <mark className={`doplnit${overit ? ' doplnit--overit' : ''}`} data-doplnit="true">
      {children}
    </mark>
  );
}

/** vykresli text a kazdou znacku [DOPLNIT: ...] / [OVĚŘIT: ...] obali zvyraznenim */
export default function Marked({ text }: { text: string }) {
  const parts = text.split(MARK);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Doplnit key={i} overit={part.startsWith('[OVĚŘIT')}>
            {part}
          </Doplnit>
        ) : (
          part
        ),
      )}
    </>
  );
}
