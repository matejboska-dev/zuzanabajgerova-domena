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
import { BeforeAfter, CircleArrow, ServiceMobileActions, WhatsAppAction } from './ServiceInteractions';
import { SERVICE_EDITORIAL, EDITORIAL_UI, type EditorialServiceId } from '@/lib/service-editorial';


function Heading({ title, accent }: { title: string; accent?: string }) {
  if (accent) return <h2>{title}<em>{accent}</em></h2>;
  const stop = title.indexOf('. ');
  return stop > 0 ? <h2>{title.slice(0, stop + 1)}<em>{title.slice(stop + 2)}</em></h2> : <h2>{title}</h2>;
}

function Check() {
  return <svg className="buy-check" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function EditorialServicePage({ locale, service, structuredData, breadcrumbs }: {
  locale: Locale; service: EditorialServiceId; structuredData: object; breadcrumbs: React.ReactNode;
}) {
  const c = SERVICE_COPY[locale][service], ui = SERVICE_UI[locale], media = SERVICE_MEDIA[service], l = SERVICE_EDITORIAL[service];
  const photo = (p: typeof l.hero, eager = false) => <img src={p.src} alt={p.alt[locale]} width={p.width} height={p.height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} />;
  const enquiry = (className = 'buy-button', label = l.cta[locale]) => <a className={className} href="#poptavka">{label}<CircleArrow /></a>;
  const whatsapp = (className = 'buy-button buy-button--outline', label = ui.whatsapp) => <WhatsAppAction locale={locale} service={service} text={c.whatsapp} className={className}>{label}<CircleArrow /></WhatsAppAction>;

  return <ServiceMotion><main className={`service-page purchase-page editorial-service editorial-service--${service} service-redesign service-redesign--${service}`}>
    <JsonLd data={structuredData} />
    <ServiceHero locale={locale} service={service} breadcrumbs={breadcrumbs} cta={l.cta[locale]} />

    <section className="wrap buy-section buy-intro" id="poznat">
      <div className="buy-heading-row"><Heading title={l.introTitle[locale]} /><p>{l.introText[locale]}</p></div>
      {service === 'rekonstrukce' ? <div className="editorial-transformation"><BeforeAfter locale={locale} /><div><Heading title={ui.transformation} /><p>{ui.transformationText}</p><a href="#z-praxe" className="buy-text-action">{ui.play}<CircleArrow /></a>{enquiry()}</div></div> : <div className="buy-photo-pair">{l.pair.map(p => <figure key={p.src}>{photo(p)}<figcaption>{(p.caption ?? p.alt)[locale]}</figcaption></figure>)}</div>}
      <div className="buy-concerns">{l.facts.map(fact => <div key={fact.title[locale]}><div><h3>{fact.title[locale]}</h3><CircleArrow /></div><p>{fact.text[locale]}</p></div>)}</div>
    </section>

    <section className="buy-presence buy-section"><div className="wrap">
      <Heading title={l.presenceTitle[locale]} />
      <div className="buy-presence__grid">
        <div className="buy-presence__place"><figure className="buy-presence__landscape">
          {photo(l.presence)}
          <figcaption><span>{(l.presence.caption ?? l.presence.alt)[locale]}</span>{enquiry('buy-button buy-button--light')}</figcaption>
        </figure><p className="buy-presence__note">{l.presenceNote[locale]}</p></div>
        <div className="buy-presence__person">
          {photo(l.person)}
          <span className="svc-signature">Zuzana Bajgerová</span>
          {l.presenceText.map(text => <p key={text[locale]}>{text[locale]}</p>)}
          {whatsapp('buy-text-action')}
        </div>
      </div>
    </div></section>

    <section className="wrap buy-section buy-support" id="rozsah">
      <div className="buy-heading-row"><Heading title={EDITORIAL_UI.support[locale]} /><p>{EDITORIAL_UI.supportLead[locale]}</p></div>
      <div className="buy-support__grid">
        <div className="estate-responsibilities">{l.rows.map((row, i) => <details key={row.title[locale]} open={i === 0}><summary>{row.title[locale]}<span className="buy-plus" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" /></svg></span></summary><p>{row.text[locale]}</p></details>)}</div>
        <div className="buy-support__visual">
          {photo(l.support)}
          <div><h3>{l.supportCta[locale]}</h3>{enquiry('buy-button buy-button--light')}</div>
        </div>
      </div>
    </section>

    <ServiceJourney locale={locale} service={service} cta={l.cta[locale]} />

    <section className="wrap editorial-gallery buy-section">
      <div className="buy-heading-row"><Heading title={l.galleryTitle[locale]} />{enquiry('buy-text-action')}</div>
      <div className="editorial-gallery__photos">{l.gallery.map(p => <figure key={p.src}>{photo(p)}<figcaption>{(p.caption ?? p.alt)[locale]}</figcaption></figure>)}</div>
    </section>

    <section className="wrap buy-section buy-price">
      <div className="buy-price__heading"><Heading title={c.scopeTitle} /></div>
      <div className="buy-price__grid">
        <div className="buy-price__panel"><h3>{c.includedTitle}</h3>{enquiry('buy-button', EDITORIAL_UI.scopeCta[locale])}<ul>{c.included.map(item => <li key={item}><Check />{item}</li>)}</ul></div>
        <figure>{photo(l.scope)}{l.scope.caption && <figcaption>{l.scope.caption[locale]}</figcaption>}</figure>
        <div className="buy-price__panel"><h3>{c.separateTitle}</h3>{enquiry('buy-button', EDITORIAL_UI.budgetCta[locale])}<ul>{c.separate.map(item => <li key={item}><Check />{item}</li>)}</ul></div>
      </div>
      <p className="buy-price__note">{c.scopeNote}</p>
    </section>

    <section className="buy-proof buy-section" id="z-praxe"><div className="wrap">
      <div className="buy-heading-row"><Heading title={c.proofTitle} /><p>{c.proofText}</p></div>
      <div className="buy-proof__grid">
        <div className="buy-proof__video"><ClickVideo src={media.video} poster={service === 'pronajem' ? '/services/editorial/rental-video-poster.jpg' : media.poster} label={c.videoCaption} playLabel={ui.play} ratio="9 / 16" /><p>{c.videoCaption}<span>{ui.videoLanguage}</span></p></div>
        <div className="buy-proof__invitation"><h3>{l.proofLead[locale]}</h3><ul>{l.proofPoints.map(text => <li key={text[locale]}><CircleArrow /><span>{text[locale]}</span></li>)}</ul><div className="buy-actions">{enquiry('buy-button', l.cta[locale])}{whatsapp('buy-text-action')}</div><p className="buy-proof__personal">{l.contactNote[locale]}</p></div>
      </div>
    </div></section>

    <section className="wrap buy-section buy-faq"><div><Heading title={ui.faqTitle} /><p className="buy-faq__lead">{EDITORIAL_UI.faqLead[locale]}</p>{whatsapp('buy-button', EDITORIAL_UI.faqCta[locale])}</div><div>{c.faq.map(f => <details key={f.q}><summary>{f.q}<span className="buy-plus" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span></summary><p>{f.a}</p></details>)}</div></section>

    <section className="buy-contact buy-section" id="poptavka"><div className="wrap buy-contact__grid">
      <div><img className="estate-contact-portrait" src="/services/curated/zuzana-office.webp" alt="Bc. Zuzana Bajgerová" width="788" height="1400" loading="lazy" /><Heading title={c.contactTitle} /><p>{c.contactLead}</p><p className="buy-contact__note">{l.contactNote[locale]}</p>{whatsapp('buy-text-action')}<span className="svc-signature">Zuzana Bajgerová</span></div>
      <LeadForm source="sluzba" locale={locale} variant="dark" ariaLabel={ui.enquiry} submitLabel={ui.send} successMessage={ui.success} whatsappText={c.whatsapp} hidden={{ sluzba: service, jazyk: locale }} fields={[
        { name: 'jmeno', label: ui.name, type: 'text', required: true, autoComplete: 'name', half: true },
        { name: 'email', label: 'E-mail', type: 'email', required: true, autoComplete: 'email', half: true },
        { name: 'telefon', label: ui.phone, type: 'tel', autoComplete: 'tel' },
        { name: 'zprava', label: ui.message, type: 'textarea', required: true, rows: 4, placeholder: c.messageHint },
      ]} fine={<>{ui.privacy} <Link href={path('ochranaUdaju', locale)}>{ui.privacyLink}</Link></>} />
    </div></section>

    <ServiceRelated locale={locale} service={service} />
    <ServiceMobileActions locale={locale} service={service} text={c.whatsapp} />
  </main></ServiceMotion>;
}
