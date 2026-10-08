'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const BY_SOURCE: Record<string, string> = {
  konzultace: 'Navržený termín hovoru vám potvrdím do 24 hodin.',
  kontakt: 'Ozvu se vám do 24 hodin.',
  homepage: 'Ozvu se vám do 24 hodin.',
};

function Message() {
  const z = useSearchParams().get('z') ?? '';
  return <>{BY_SOURCE[z] ?? 'Ozvu se vám do 24 hodin.'}</>;
}

/** veta podle toho, odkud poptavka prisla (?z=konzultace). bez parametru obecna. */
export default function ThanksLead() {
  return (
    <Suspense fallback="Ozvu se vám do 24 hodin.">
      <Message />
    </Suspense>
  );
}
