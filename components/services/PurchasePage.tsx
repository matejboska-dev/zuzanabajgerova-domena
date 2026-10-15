import Link from 'next/link';
import ServiceHero from './ServiceHero';
import ServiceJourney from './ServiceJourney';
import ServiceRelated from './ServiceRelated';
import ServiceMotion from './ServiceMotion';
import './service-design.css';
import LeadForm from '@/components/forms/LeadForm';
import ClickVideo from '@/components/page/ClickVideo';
import JsonLd from '@/components/page/JsonLd';
import type { Locale } from '@/lib/i18n';
import { path } from '@/lib/routes';
import { SERVICE_COPY, SERVICE_MEDIA, SERVICE_UI } from '@/lib/services';
import { CircleArrow, ServiceMobileActions, WhatsAppAction } from './ServiceInteractions';
import { PURCHASE_LAYOUT } from '@/lib/purchase-layout';


function Heading({ title, accent }: { title: string; accent?: string }) {
  if (accent) return <h2>{title}<em>{accent}</em></h2>;
  const stop = title.indexOf('. ');
  return stop > 0 ? <h2>{title.slice(0, stop + 1)}<em>{title.slice(stop + 2)}</em></h2> : <h2>{title}</h2>;
}

function Check() {
  return <svg className="buy-check" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function PurchasePage({ locale, structuredData, breadcrumbs }: {
  locale: Locale; structuredData: object; breadcrumbs: React.ReactNode;
}) {
  const c = SERVICE_COPY[locale].koupe, ui = SERVICE_UI[locale], media = SERVICE_MEDIA.koupe, l = PURCHASE_LAYOUT[locale];
  const enquiry = (className = 'buy-button', label = l.introCta) => <a className={className} href="#poptavka">{label}<CircleArrow /></a>;
  const whatsapp = (className = 'buy-button buy-button--outline', label = ui.whatsapp) => <WhatsAppAction locale={locale} service="koupe" text={c.whatsapp} className={className}>{label}<CircleArrow /></WhatsAppAction>;

  return <ServiceMotion><main className="service-page purchase-page service-redesign service-redesign--koupe">
    <JsonLd data={structuredData} />
    <ServiceHero locale={locale} service="koupe" breadcrumbs={breadcrumbs} cta={l.introCta} />

    <section className="wrap buy-section buy-intro" id="poznat">
      <div className="buy-heading-row"><Heading title={c.detailTitle} /><p>{c.detailLead}</p></div>
      <div className="buy-photo-pair">
        <figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/media/prohlidka-vila-silvi.webp" alt={l.sea} width="1920" height="1080" loading="lazy" /><figcaption>{l.sea}</figcaption></figure>
        <figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={media.detail} alt={l.notary} width="576" height="1024" loading="lazy" /><figcaption>{l.notary}</figcaption></figure>
      </div>
      <div className="buy-concerns">{l.facts.map(fact => <div key={fact.title}><div><h3>{fact.title}</h3><CircleArrow /></div><p>{fact.text}</p></div>)}</div>
    </section>

    <section className="buy-presence buy-section"><div className="wrap">
      <Heading title={l.presence} accent={l.presenceAccent} />
      <div className="buy-presence__grid">
        <div className="buy-presence__place"><figure className="buy-presence__landscape">
          {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/hero/backgrounds/abruzzo-montesilvano-colle.webp" alt={l.landscape} width="1920" height="1080" loading="lazy" />
          <figcaption><span>{l.landscape}</span>{enquiry('buy-button buy-button--light')}</figcaption>
        </figure><p className="buy-presence__note">{l.presenceNote}</p></div>
        <div className="buy-presence__person">
          {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/media/about-zuzana.webp" alt={l.photo} width="1000" height="1250" loading="lazy" />
          <span className="svc-signature">Zuzana Bajgerová</span>
          {l.presenceText.map(text => <p key={text}>{text}</p>)}
          {whatsapp('buy-text-action')}
        </div>
      </div>
    </div></section>

    <section className="wrap buy-section buy-support" id="rozsah">
      <div className="buy-heading-row"><Heading title={l.support} accent={l.supportAccent} /><p>{l.supportLead}</p></div>
      <div className="buy-support__grid">
        <div className="estate-responsibilities">{c.rows.map((row, i) => <details key={row.title} open={i === 0}><summary>{row.title}<span className="buy-plus" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" /></svg></span></summary><p>{row.text}</p></details>)}</div>
        <div className="buy-support__visual">
          {/* eslint-disable-next-line @next/next/no-img-element */}<img src="/media/lok-pescara-garsonka.webp" alt={{ cs: 'Pohled z bytu směrem k moři v Pescaře', en: 'Looking towards the sea from an apartment in Pescara', it: 'Vista verso il mare da un appartamento a Pescara' }[locale]} width="1080" height="1920" loading="lazy" />
          <div><h3>{l.searchCta}</h3>{enquiry('buy-button buy-button--light')}</div>
        </div>
      </div>
    </section>

    <ServiceJourney locale={locale} service="koupe" cta={l.introCta} />

    <section className="wrap buy-section buy-price">
      <div className="buy-price__heading"><Heading title={c.scopeTitle} /></div>
      <div className="buy-price__grid">
        <div className="buy-price__panel"><h3>{c.includedTitle}</h3>{enquiry('buy-button', l.priceCta)}<ul>{c.included.map(item => <li key={item}><Check />{item}</li>)}</ul></div>
        <figure>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/abruzzo-costa-trabocchi.jpg" alt="Costa dei Trabocchi · Abruzzo" width="1400" height="1866" loading="lazy" /><figcaption>Abruzzo · Italia</figcaption></figure>
        <div className="buy-price__panel"><h3>{c.separateTitle}</h3>{enquiry('buy-button', l.budgetCta)}<ul>{c.separate.map(item => <li key={item}><Check />{item}</li>)}</ul></div>
      </div>
      <p className="buy-price__note">{c.scopeNote}</p>
    </section>

    <section className="buy-proof buy-section" id="z-praxe"><div className="wrap">
      <div className="buy-heading-row"><Heading title={c.proofTitle} /><p>{c.proofText}</p></div>
      <div className="buy-proof__grid">
        <div className="buy-proof__video"><ClickVideo src={media.video} poster={media.poster} label={c.videoCaption} playLabel={ui.play} ratio="9 / 16" /><p>{c.videoCaption}<span>{ui.videoLanguage}</span></p></div>
        <div className="buy-proof__invitation"><h3>{l.proofLead}</h3><ul>{l.proofPoints.map(text => <li key={text}><CircleArrow /><span>{text}</span></li>)}</ul><div className="buy-actions">{enquiry('buy-button', l.proofCta)}{whatsapp('buy-text-action')}</div><p className="buy-proof__personal">{l.contactNote}</p></div>
      </div>
    </div></section>

    <section className="wrap buy-section buy-community">
      <div className="buy-heading-row"><Heading title={l.community} accent={l.communityAccent} /><div><p>{l.communityText}</p>{enquiry('buy-button', l.communityCta)}</div></div>
      <div className="buy-community__photos">
        <figure><img src="/media/kom-obed.webp" alt={l.communityCaption} width="800" height="1000" loading="lazy" /><figcaption>{l.communityCaption}</figcaption></figure>
        <figure><img src="/media/kom-notar.webp" alt={l.notary} width="720" height="1000" loading="lazy" /><figcaption>{l.notary}</figcaption></figure>
      </div>
    </section>

    <section className="wrap buy-section buy-faq"><div><Heading title={ui.faqTitle} /><p className="buy-faq__lead">{l.faqLead}</p>{whatsapp('buy-button', l.faqCta)}</div><div>{c.faq.map(f => <details key={f.q}><summary>{f.q}<span className="buy-plus" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span></summary><p>{f.a}</p></details>)}</div></section>

    <section className="buy-contact buy-section" id="poptavka"><div className="wrap buy-contact__grid">
      <div><img className="estate-contact-portrait" src="/services/curated/zuzana-office.webp" alt="Bc. Zuzana Bajgerová" width="788" height="1400" loading="lazy" /><Heading title={c.contactTitle} /><p>{c.contactLead}</p><p className="buy-contact__note">{l.contactNote}</p>{whatsapp('buy-text-action')}<span className="svc-signature">Zuzana Bajgerová</span></div>
      <LeadForm source="sluzba" locale={locale} variant="dark" ariaLabel={ui.enquiry} submitLabel={ui.send} successMessage={ui.success} whatsappText={c.whatsapp} hidden={{ sluzba: 'koupe', jazyk: locale }} fields={[
        { name: 'jmeno', label: ui.name, type: 'text', required: true, autoComplete: 'name', half: true },
        { name: 'email', label: 'E-mail', type: 'email', required: true, autoComplete: 'email', half: true },
        { name: 'telefon', label: ui.phone, type: 'tel', autoComplete: 'tel' },
        { name: 'zprava', label: ui.message, type: 'textarea', required: true, rows: 4, placeholder: c.messageHint },
      ]} fine={<>{ui.privacy} <Link href={path('ochranaUdaju', locale)}>{ui.privacyLink}</Link></>} />
    </div></section>

    <ServiceRelated locale={locale} service="koupe" />
    <ServiceMobileActions locale={locale} service="koupe" text={c.whatsapp} />
  </main></ServiceMotion>;
}
