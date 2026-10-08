import Link from 'next/link';
import LeadForm, { type LeadField } from './LeadForm';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { BUDGET_OPTIONS, PURPOSE_OPTIONS } from '@/lib/contact';
import type { LeadSource } from '@/lib/forms';

// kratky formular na hlavni strane (4 pole) a rozsireny kvalifikacni na /kontakt (6 poli).
// kvalifikace odfiltruje zvedavce od vaznych zajemcu (PROJEKT-BAJGEROVA.md 2).

const SHORT: LeadField[] = [
  { name: 'jmeno', label: 'Jméno', type: 'text', required: true, autoComplete: 'name', placeholder: 'Vaše jméno' },
  { name: 'email', label: 'E-mail', type: 'email', required: true, autoComplete: 'email', placeholder: 'vas@email.cz' },
  { name: 'telefon', label: 'Telefon', type: 'tel', autoComplete: 'tel', placeholder: '+420 723 824 348' },
  {
    name: 'zprava',
    label: 'Zpráva',
    type: 'textarea',
    rows: 4,
    placeholder: 'Co hledáte, jaký máte rozpočet a kdy chcete kupovat',
  },
];

const EXTENDED: LeadField[] = [
  { name: 'jmeno', label: 'Jméno', type: 'text', required: true, autoComplete: 'name', half: true },
  { name: 'email', label: 'E-mail', type: 'email', required: true, autoComplete: 'email', half: true },
  {
    name: 'telefon',
    label: 'Telefon nebo WhatsApp',
    type: 'tel',
    autoComplete: 'tel',
    placeholder: '+420',
    half: true,
  },
  { name: 'ucel', label: 'Co hledáte', type: 'select', options: PURPOSE_OPTIONS, half: true },
  { name: 'rozpocet', label: 'Rozpočet včetně všech nákladů', type: 'select', options: BUDGET_OPTIONS },
  {
    name: 'zprava',
    label: 'Zpráva',
    type: 'textarea',
    rows: 4,
    placeholder: 'Například: hledám byt u moře, rozpočet do 120 000 €, chci koupit do půl roku',
  },
];

export default function ContactFormCard({
  source,
  extended = false,
  variant = 'dark',
}: {
  source: LeadSource;
  extended?: boolean;
  variant?: 'dark' | 'light';
}) {
  return (
    <LeadForm
      source={source}
      variant={variant}
      fields={extended ? EXTENDED : SHORT}
      submitLabel={extended ? 'Odeslat poptávku' : 'Odeslat'}
      ariaLabel="Kontaktní formulář"
      fine={
        <>
          Ozvu se do 24 hodin. Údaje použiji jen k odpovědi na vaši poptávku a na webu se neukládají. Více v{' '}
          <Link href={path('ochranaUdaju', DEFAULT_LOCALE)}>zásadách ochrany osobních údajů</Link>.
        </>
      }
    />
  );
}
