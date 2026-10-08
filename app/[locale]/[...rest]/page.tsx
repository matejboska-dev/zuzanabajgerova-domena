import { notFound } from 'next/navigation';

// Kazda neznama adresa uvnitr jazykove verze skonci na navrzene 404 (app/[locale]/not-found.tsx)
// s hlavickou a patickou webu, ne na nouzove strance bez stylu.
export default function CatchAll() {
  notFound();
}
