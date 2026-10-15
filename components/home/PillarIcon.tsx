export default function PillarIcon({ index }: { index: number }) {
  const shared = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const paths = [
    <><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
    <><path d="M4 19h16M7 16V8l5-4 5 4v8M10 12h4M12 4v8" /></>,
    <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></>,
    <><path d="M4 11.5 12 4l8 7.5V20H4v-8.5Z" /><path d="M9 20v-6h6v6" /></>,
    <><path d="m12 2 8 4v6c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6l8-4Z" /><path d="m8.5 12 2.3 2.3 4.7-4.7" /></>,
    <><path d="M3 12.5 7.2 8l3.4 2.5 2.8-2.2L21 13" /><path d="m3 12.5 5.5 5.2c.7.7 1.8.7 2.5 0l1-1m1.7-1.4 1.3 1.1c.7.6 1.8.5 2.4-.2l3.6-3.2" /><path d="M7.2 8 4.7 6 2 9m11.4-.7L17 6l5 3" /></>,
  ];

  return <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...shared}>{paths[index]}</svg>;
}
