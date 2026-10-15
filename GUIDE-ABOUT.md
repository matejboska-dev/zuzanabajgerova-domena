# Průvodce koupí a O mně — stav 13. 10. 2026

Lokálně implementované české stránky `/jak-koupit-nemovitost-v-italii` a `/o-mne`.
Anglické ani italské verze nejsou součástí této úpravy. Jde o rozšíření stávající
značky podle [směrového zadání](.impeccable/surfaces/guide-about.md) a
[PRODUCT.md](PRODUCT.md), nikoli o nový designový systém.

## Rozsah a zdrojové soubory

- `app/[locale]/jak-koupit-nemovitost-v-italii/page.tsx`: osm kroků koupě,
  smlouvy, rozpočet, dokumenty, otázky, slovníček, oficiální zdroje a poptávka.
- `app/[locale]/o-mne/page.tsx`: portrét, místní život, způsob spolupráce,
  ocenění, videa, komunita, služby, reference a kontakt.
- `components/guide/guide.css`, `about.css`: styly omezené na tyto dvě stránky.
- `components/guide/GuideMotion.tsx`: desktopový pohyb fotografií a odhalení
  smluvních fotografií pomocí masky; GSAP se načítá dynamicky.
- `components/guide/GuideBudget.tsx`: součet tří ručně zadaných částek v EUR
  a orientační převod do Kč. Nejde o daňový výpočet; nezadané a pravidelné
  náklady nejsou zahrnuté, zahrnuté poplatky se nemají přičítat podruhé.
- `components/home/TestimonialsCarousel.tsx`: pouze chování Petřina videa.
  Při vstupu do viewportu zkusí zvuk, po odmítnutí prohlížečem přejde na
  ztlumené přehrávání; zvuk lze zapnout tlačítkem. Mimo obrazovku se pozastaví.

## Zachovaná značka a lokální kompozice

Autoritou zůstává `app/globals.css`: Cobalto `#122b4e`, hluboké Cobalto
`#0c1d36`, Smalto `#f1efe7`, Zafferano `#d9a441`; Archivo pro hlavní text
a nadpisy, Playfair Display pro patkové akcenty, Priestacy pro podpis.

Obě stránky používají společný kontejner do 1180 px, svislý rytmus
100/80/64 px, nadpisy sekcí 32–48 px, převážně 14–17px text, fotografie
se 14px rohy a pilulková tlačítka s kruhovou šipkou. Průvodce má fotografický
hero s nadpisem 42–70 px; O mně má rozdělený portrétní hero s nadpisem
48–74 px. Mobilní pravidla upravují velikosti a skládají sloupce pod sebe.
Tyto hodnoty popisují konkrétní stránky, nezavádějí nové globální tokeny.

Pravidlo skutečných podkladů: osobu, nemovitosti a důkazy reprezentují existující
fotografie a videa. Pravidlo viditelného obsahu: obsah je viditelný i bez GSAP;
animace běží od 900 px a respektují omezení pohybu. Portrétní videa mají
stálý poměr 9:16. FAQ používá nativní `details` a `summary`.

## Fotografie, videa a obsahové zdroje

Nově zařazené fotografie pocházejí z již existujících klientských podkladů
z Drive v `public/media/` a `public/services/curated/`; nejde o nově generované
obrázky. [Manifest původu](public/services/curated/sources.json) uchovává Drive
odkazy a u výřezů z videa časové značky. Použitý záběr pláže je existující
soubor `public/hero/backgrounds/abruzzo-montesilvano-plaz.webp`.
Videa, certifikát a klientské reference jsou opětovně použité podklady.

Právní orientaci doprovázejí odkazy na Consiglio Nazionale del Notariato
a Agenzia delle Entrate. [Kontrola zdrojů](../.impeccable/review/guide-about/sources-check.json)
zaznamenává HTTP 200 pro čtyři cíle; tři notářské stránky byly ověřeny
s běžným ověřováním TLS. Úspěšné načtení zdroje není individuální právní posouzení.

## Ověření a hranice vydání

Důkazy jsou v [adresáři QA](../.impeccable/review/guide-about/):

- `build.log`: produkční build prošel na Next.js 15.5.27. Zůstal warning
  Autoprefixeru ve stávajícím `globals.css` pro hodnotu `start`.
- `dependency-audit.json`: při uložené kontrole nula zranitelností;
  lockfile obsahuje PostCSS 8.5.30, `package.json` má override `^8.5.30`.
- `responsive-check.json` a osm hlavních snímků: obě stránky na šířkách
  1440, 1280, 390 a 320 px; jeden H1, žádné chybějící obrázky ani přetečení
  dokumentu v zaznamenaných kontrolách. `fixes-check.json` ověřuje opravené
  řádkování a proklad podtitulků smluv.
- `functional-check.json`: 120 000 + 15 000 + 5 000 = 140 000 EUR; otevření
  FAQ, posun na poptávku, přehrání portrétního videa a Petřino přehrávání,
  zvuk, pozastavení mimo viewport a obnovení po návratu.
- `detector.json`: prázdný seznam nálezů. `finish-verdict.md`: opravy
  posouzených nedostatků přijaty; verdikt se nevztahuje na produkční připravenost.

**Produkční blokátor:** chybí konfigurace prostředí pro doručování formulářů
a potvrzení přijetí v cílové schránce. Tento stav neprokazuje odeslání leadu,
nasazení ani commit/push. Překlady a ostatní stránky nejsou tímto QA pokryté.

Stávající rozpor mezi úvodním komentářem `globals.css` o dvou písmech
a skutečným použitím Archivo, Playfair a Priestacy zůstává zaznamenaným
dokumentačním dluhem. Lokální velikosti, rohy a stíny nejsou povýšeny na
nová globální pravidla; incumbentní DESIGN/system soubory se nemění.
