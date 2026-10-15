'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const BY_SOURCE: Record<string, string> = {
  konzultace: 'Navržený termín hovoru vám osobně potvrdím.',
  kontakt: 'Ozvu se vám osobně.',
  homepage: 'Ozvu se vám osobně.',
};

function Message() {
  const z = useSearchParams().get('z') ?? '';
  return <>{BY_SOURCE[z] ?? 'Ozvu se vám osobně.'}</>;
}

/** veta podle toho, odkud poptavka prisla (?z=konzultace). bez parametru obecna. */
export default function ThanksLead() {
  return (
    <Suspense fallback="Ozvu se vám osobně.">
      <Message />
    </Suspense>
  );
}
