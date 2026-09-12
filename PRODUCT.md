# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Czech-speaking individuals and couples buying a vacation, retirement, or
second home in Abruzzo, Italy — people who want the property itself but are wary of
doing it in a foreign language and legal system. Secondary: English- and
Italian-speaking buyers (site ships `en`/`it` translations). A Slovak-specific
version is deliberately not built — Slovak buyers read Czech, and a near-duplicate
`sk` site would compete with the `cs` site in search rather than add reach
(`lib/i18n.ts`).

Buyers also use the site's investment/rental services (`Investice do nemovitosti`,
`Správa a pronájem` in Služby), but per the client's direction the primary voice and
positioning target the individual home buyer, not the investor.

## Product Purpose

A single-agent real estate practice (Bc. Zuzana Bajgerová, RE/MAX) that lets a Czech
buyer purchase property in Italy without ever having to operate in Italian —
covering search, viewings, price negotiation, notary, contracts, power of attorney,
translations, utility transfers, and tax registration, then optionally renovation,
furnishing, and post-purchase property management/rental. Success is a buyer who
closes on an Abruzzo property while handling nothing in Italian themselves.

## Positioning

The differentiator is not "a RE/MAX agent who sells Italian property" — it's a
Czech-speaking agent who lives year-round in Abruzzo and has personally built and
vetted a local network of notaries, lawyers, technicians, and tradespeople there.
That combination (native-language service + full-time local presence + an
established professional network + 20 years in real estate, RE/MAX Platinum/Hall of
Fame, TOP 10 RE/MAX Czech Republic) is what a remote agent, a generic Italian
listing site, or a foreign-market RE/MAX agent without the Czech language or the
Abruzzo network cannot truthfully replicate.

## Operating Context

- Multi-locale Next.js 15 (App Router) site: `cs` is default and unprefixed, `en`
  and `it` are prefixed (`/en`, `/it`); routing/locale logic in `lib/i18n.ts`,
  `middleware.ts`, `next.config.mjs`.
- Site information architecture is governed by an approved blueprint document
  (`PROJEKT-BAJGEROVA.md`, referenced throughout the code but not present in this
  repo — it lives with the client or elsewhere in the workspace). Page section
  order and role tags (A = acquisition, V = SEO/search, K = conversion, D = trust,
  T = technical/noindex) come from that blueprint and are not to be reordered
  without the client's sign-off (see comments in `lib/nav.ts` and each page file).
- Property listings are scraped from RE/MAX Czech (`scraper.py` → `data/properties.json`,
  read by `lib/data.server.ts`). This repo is the production-domain deployment
  target; the scraper and its `data/` output live outside this repo and must be
  supplied via the `SCRAPER_DIR` env var (or a sibling `data/` folder) at
  build/deploy time — without it, `readDataset()` fails closed and the site
  renders with an empty listings set rather than erroring.
- Photos default to hotlinking the RE/MAX CDN directly (no downloading/hosting);
  a local-hosting fallback path exists (`scraper.py --images` +
  `NEXT_PUBLIC_SERVE_LOCAL_IMAGES=1`) for when hotlinking becomes unreliable.
  EUR listing prices are converted to CZK using a daily ČNB rate
  (`lib/fx.server.ts`), with manual overrides taking precedence.
  Deployed on Netlify (`netlify.toml`, `@netlify/plugin-nextjs`).
- Sibling repos in this workspace cover other stages of the same project:
  `zuzana-bajgerova-web` (development), `zuzana-bajgerova-testovaci-domena`
  (staging/test domain), and `ZuzanaBajgerova-Projekt` (design system source,
  `DESIGN.md`).

## Capabilities and Constraints

- Home page (`app/[locale]/page.tsx` and `components/home/*`) is fully written and
  live: hero, stats, services, process, FAQ, testimonials, guides. Most other
  pages (`o-mne`, `sluzby`, `jak-koupit-nemovitost-v-italii`, `lokality`, etc.) are
  still in blueprint/placeholder state — `PageShell` renders the approved section
  list as numbered placeholders (`NEXT_PUBLIC_SHOW_BLUEPRINT`) until each section
  is written; placeholders are hidden in production.
- Real evidence already in place must not be replaced with invented content:
  named Google-review testimonials plus one video testimonial
  (`components/home/TestimonialsCarousel.tsx`), a live RE/MAX listings feed, and a
  real portrait/hero photography set (`public/hero/*`).
- Terminology: nabídka/nabídky (listing), makléřka (agent, feminine — Zuzana is
  referred to throughout in feminine grammatical forms), notář (notary), codice
  fiscale, Landscape Line (the site's signature decorative motif, see
  `components/LandscapeLine.tsx`).

## Brand Commitments

- Name: Bc. Zuzana Bajgerová. Affiliation: RE/MAX Czech Republic — TOP 10
  nationally, 20+ years in real estate, RE/MAX Platinum and Hall of Fame status.
  These credentials appear verbatim in hero/stat copy across all three locales and
  are factual claims, not marketing flourishes — do not soften, round, or drop them
  when touching that copy.
- Design system name "Abruzzo Heritage Estate" (Playfair Display + Archivo;
  Cobalto/Smalto/Zafferano/Pietra palette; the Landscape Line motif) is
  established design authority, documented in the sibling
  `ZuzanaBajgerova-Projekt/DESIGN.md` and implemented in `app/globals.css` — not
  yet mirrored into this repo's own `DESIGN.md`.

## Evidence on Hand

- Real, named Google-review testimonials and one client video testimonial
  (`components/home/TestimonialsCarousel.tsx`, `/video/referencni-video.MOV`).
- Live property listings sourced from the RE/MAX scraper (when `data/properties.json`
  is present at deploy time).
- Real hero photography (Pexels-credited Abruzzo landscape shots) and a portrait of
  Zuzana Bajgerová (`public/hero/portret-4k.png`).
- No case studies or downloadable buyer's guide exist yet — both are planned
  sections (`jak-koupit` "Průvodce ke stažení", `reference` "Případová studie") but
  currently placeholders; do not fabricate their content.

## Product Principles

1. Removing language and legal/bureaucratic risk is the core promise — every page
   should reinforce that the buyer never has to operate in Italian themselves.
2. The relationship is full-lifecycle, not transactional: pre-purchase, purchase,
   and post-purchase (renovation, furnishing, management, rental) are all part of
   the offer and should be represented as a continuum, not a single closing event.
3. Evidence over assertion — real reviews, real listings, real credentials. New
   copy should cite or point at real evidence already on hand rather than invent
   testimonials, numbers, or case studies.
4. Site structure and section order are contractually stable: the approved
   blueprint's section order and role tags are load-bearing for SEO/IA strategy
   and require the client's sign-off to change, not just a design judgment call.
5. Czech is the primary voice; English and Italian are faithful secondary
   translations, not separately optimized experiences.
