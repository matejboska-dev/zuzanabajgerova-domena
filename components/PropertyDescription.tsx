import type { ReactNode } from 'react';

type Block = { kind: 'paragraph' | 'heading'; text: string } | { kind: 'list'; items: string[] };

/** Format only the listing's supplied text. Never generate headings or summaries. */
function blocksOf(text: string): Block[] {
  const blocks: Block[] = [];
  for (const paragraph of text.replace(/\r\n?/g, '\n').split(/\n\s*\n/).map(part => part.trim()).filter(Boolean)) {
    const lines = paragraph.split('\n').map(line => line.trim()).filter(Boolean);
    if (lines.every(line => /^[-•–]\s+/.test(line))) {
      const items = lines.map(line => line.replace(/^[-•–]\s+/, ''));
      const previous = blocks.at(-1);
      if (previous?.kind === 'list') previous.items.push(...items);
      else blocks.push({ kind: 'list', items });
    } else if (lines.length === 1 && paragraph.length <= 55 && paragraph.split(/\s+/).length <= 7 && !/[.!]$/.test(paragraph)) {
      blocks.push({ kind: 'heading', text: paragraph });
    } else blocks.push({ kind: 'paragraph', text: paragraph });
  }
  return blocks;
}
function paragraphText(text: string): ReactNode {
  const colon = text.indexOf(':');
  // Preserve the exact label and punctuation, only make the supplied label easier to scan.
  if (colon > 0 && colon <= 45 && !/[.!?]/.test(text.slice(0, colon))) return <><strong>{text.slice(0, colon + 1)}</strong>{text.slice(colon + 1)}</>;
  return text;
}
export default function PropertyDescription({ text }: { text: string }) {
  if (!text.trim()) return <p className="pd-prose">Popis není k dispozici.</p>;
  return <div className="pd-prose pd-description">{blocksOf(text).map((block, index) => block.kind === 'heading'
    ? <h3 key={index}>{block.text}</h3>
    : block.kind === 'list'
      ? <ul key={index}>{block.items.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}</ul>
      : <p key={index}>{paragraphText(block.text)}</p>)}</div>;
}
