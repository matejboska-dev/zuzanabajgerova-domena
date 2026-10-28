'use client';
import { localized } from '@/lib/localize';


import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const BY_SOURCE: Record<string, string> = {
  konzultace: 'Ozvu se vám osobně a domluvíme se na dalším postupu.',
  kontakt: 'Ozvu se vám osobně.',
  homepage: 'Ozvu se vám osobně.',
};

function SourceMessage() {
  const z = useSearchParams().get('z') ?? '';
  return <>{BY_SOURCE[z] ?? 'Ozvu se vám osobně.'}</>;
}

/** veta podle toho, odkud poptavka prisla (?z=konzultace). bez parametru obecna. */
function ThanksLead() {
  return (
    <Suspense fallback="Ozvu se vám osobně.">
      <Message />
    </Suspense>
  );
}

export default localized(ThanksLead);

const Message = localized(SourceMessage);
