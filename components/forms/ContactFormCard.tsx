
import { localized } from '@/lib/localize';
import Link from 'next/link';
import LeadForm, { type LeadField } from './LeadForm';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { BUDGET_OPTIONS, PURPOSE_OPTIONS } from '@/lib/contact';
import type { LeadSource } from '@/lib/forms';

// kratky formular na hlavni strane (4 pole) a rozsireny kvalifikacni na /kontakt (6 poli).
// kvalifikace odfiltruje zvedavce od vaznych zajemcu (PROJEKT-BAJGEROVA.md 2).

const COPY: Record<
  Locale,
  {
    name: string; namePh: string; email: string; emailPh: string; phone: string; phoneExt: string; message: string; messagePh: string;
    messageExtPh: string; looking: string; budget: string; send: string; sendExt: string; aria: string; fine: string; privacy: string;
    budgetOptions: string[]; purposeOptions: string[]; success?: string;
  }
> = {
  cs: {
    name: 'Jméno', namePh: 'Vaše jméno', email: 'E-mail', emailPh: 'vas@email.cz', phone: 'Telefon', phoneExt: 'Telefon nebo WhatsApp',
    message: 'Zpráva', messagePh: 'S čím vám mohu pomoci?', messageExtPh: 'Napište mi, co hledáte nebo s čím potřebujete poradit.',
    looking: 'Co hledáte', budget: 'Rozpočet včetně všech nákladů', send: 'Odeslat', sendExt: 'Odeslat poptávku', aria: 'Kontaktní formulář',
    fine: 'Ozvu se vám osobně. Údaje použiji jen k odpovědi na vaši poptávku a na webu se neukládají. Více v',
    privacy: 'zásadách ochrany osobních údajů', budgetOptions: BUDGET_OPTIONS, purposeOptions: PURPOSE_OPTIONS,
  },
  en: {
    name: 'Name', namePh: 'Your name', email: 'Email', emailPh: 'you@email.com', phone: 'Phone', phoneExt: 'Phone or WhatsApp',
    message: 'Message', messagePh: 'How can I help you?', messageExtPh: 'Tell me what you are looking for or what you need advice on.',
    looking: 'What are you looking for', budget: 'Budget including all costs', send: 'Send', sendExt: 'Send enquiry', aria: 'Contact form',
    fine: 'I will get back to you personally. I use your details only to reply to your enquiry and they are not stored on the website. More in the',
    privacy: 'privacy policy',
    budgetOptions: ['Up to €100,000', '€100,000 to €150,000', '€150,000 to €250,000', 'Over €250,000', 'Not sure yet'],
    purposeOptions: ['Own holiday use', 'Investment and rental', 'Permanent residence', 'Not sure yet'],
    success: 'Thank you. Your message has been sent and I will get back to you personally.',
  },
  it: {
    name: 'Nome', namePh: 'Il tuo nome', email: 'E-mail', emailPh: 'tu@email.it', phone: 'Telefono', phoneExt: 'Telefono o WhatsApp',
    message: 'Messaggio', messagePh: 'Come posso aiutarti?', messageExtPh: 'Scrivimi cosa cerchi o su cosa hai bisogno di una consulenza.',
    looking: 'Cosa cerchi', budget: 'Budget comprensivo di tutti i costi', send: 'Invia', sendExt: 'Invia la richiesta', aria: 'Modulo di contatto',
    fine: 'Ti risponderò personalmente. Uso i tuoi dati solo per rispondere alla richiesta e non vengono salvati sul sito. Maggiori informazioni nell’',
    privacy: 'informativa sulla privacy',
    budgetOptions: ['Fino a 100.000 €', 'Da 100.000 a 150.000 €', 'Da 150.000 a 250.000 €', 'Oltre 250.000 €', 'Non lo so ancora'],
    purposeOptions: ['Vacanze personali', 'Investimento e affitto', 'Residenza stabile', 'Non lo so ancora'],
    success: 'Grazie. Il messaggio è stato inviato e ti risponderò personalmente.',
  },
};

function ContactFormCard({
  source,
  extended = false,
  variant = 'dark',
  locale = DEFAULT_LOCALE,
}: {
  source: LeadSource;
  extended?: boolean;
  variant?: 'dark' | 'light';
  locale?: Locale;
}) {
  const c = COPY[locale];
  const short: LeadField[] = [
    { name: 'jmeno', label: c.name, type: 'text', required: true, autoComplete: 'name', placeholder: c.namePh },
    { name: 'email', label: c.email, type: 'email', required: true, autoComplete: 'email', placeholder: c.emailPh },
    { name: 'telefon', label: c.phone, type: 'tel', autoComplete: 'tel', placeholder: '+420 723 824 348' },
    { name: 'zprava', label: c.message, type: 'textarea', rows: 4, placeholder: c.messagePh },
  ];
  const long: LeadField[] = [
    { name: 'jmeno', label: c.name, type: 'text', required: true, autoComplete: 'name', half: true },
    { name: 'email', label: c.email, type: 'email', required: true, autoComplete: 'email', half: true },
    { name: 'telefon', label: c.phoneExt, type: 'tel', autoComplete: 'tel', placeholder: '+420', half: true },
    { name: 'ucel', label: c.looking, type: 'select', options: c.purposeOptions, half: true },
    { name: 'rozpocet', label: c.budget, type: 'select', options: c.budgetOptions },
    { name: 'zprava', label: c.message, type: 'textarea', rows: 4, placeholder: c.messageExtPh },
  ];
  return (
    <LeadForm
      source={source}
      variant={variant}
      locale={locale}
      fields={extended ? long : short}
      submitLabel={extended ? c.sendExt : c.send}
      ariaLabel={c.aria}
      successMessage={c.success}
      fine={
        <>
          {c.fine}{' '}
          <Link href={path('ochranaUdaju', locale)}>{c.privacy}</Link>.
        </>
      }
    />
  );
}

export default localized(ContactFormCard);
