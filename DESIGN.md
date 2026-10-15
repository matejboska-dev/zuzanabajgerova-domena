---
name: "Zuzana Bajgerová — Abruzzo"
description: "Záznam stávající identity a implementovaných pravidel k 14. 10. 2026."
colors:
  cobalto: "#122b4e"
  cobalto-deep: "#0c1d36"
  cobalto-soft: "#1d3e68"
  zafferano: "#d9a441"
  zafferano-l: "#e8c480"
  zafferano-ink: "#8c590b"
  manganese: "#6b4652"
  verde: "#6e7a4f"
  smalto: "#f1efe7"
  smalto-2: "#e7e3d6"
  pietra: "#d3ccbb"
  surface: "#ffffff"
  ink: "#161a1e"
  ink-soft: "rgba(22, 26, 30, 0.66)"
  error: "#ba1a1a"
typography:
  display:
    fontFamily: "Archivo, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.06em"
  body:
    fontFamily: "Archivo, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "Archivo, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    lineHeight: 1.43
  button:
    fontFamily: "Archivo, 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.02em"
  accent:
    fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif"
    letterSpacing: "-0.01em"
  signature:
    fontFamily: "Priestacy, 'Alex Brush', cursive"
    fontWeight: 400
    lineHeight: 1
rounded:
  sm: "0.375rem"
  md: "1rem"
  img: "1.25rem"
  card: "1.5rem"
  shell: "2rem"
  pill: "9999px"
spacing:
  gutter: "24px"
  shell-max: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.zafferano}"
    textColor: "{colors.cobalto-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 26px"
  button-primary-hover:
    backgroundColor: "{colors.zafferano-l}"
  button-cobalt:
    backgroundColor: "{colors.cobalto}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "12px 26px"
  button-ghost:
    backgroundColor: "rgba(18, 43, 78, 0.03)"
    textColor: "{colors.cobalto}"
    rounded: "{rounded.pill}"
    padding: "12px 26px"
  button-glass:
    backgroundColor: "rgba(255, 255, 255, 0.12)"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "12px 26px"
  input:
    backgroundColor: "{colors.smalto}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "13px 15px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  navigation:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "9px 9px 9px 22px"
---

# Design System: Zuzana Bajgerová

## Overview

**Creative North Star: "Zuzana a Abruzzo"**

Stávající homepage je vizuální autoritou. Osobní česká podpora v Abruzzu se vyjadřuje skutečným portrétem Zuzany, fotografiemi regionu a doloženými setkáními. Teplý světlý podklad, kobaltové plochy a šafránové akce spojují všechny skutečné trasy. Jde o zápis existující značky a schváleného rozšíření rozložení, nikoli návrh nové identity.

Obsah střídá fotografické pasáže, čitelné informace a konkrétní další krok. Pohyb je krátký a podřízený čtení; obsah zůstává viditelný bez JavaScriptu i při omezení animací.

**Key Characteristics:**

- Skutečný člověk, místní fotografie a jasně označené ilustrace.
- Archivo, patkové akcenty Playfair Display a podpis Priestacy.
- Zarovnané vnější rámy, měkké rohy a pill ovládání.
- Jemná hloubka, účelné SVG ikony a čitelné výchozí stavy.

Zdroj tokenů: [globals.css](app/globals.css), následné úpravy [site-finish.css](app/site-finish.css), [service-design.css](components/services/service-design.css) a načtení písem v [layout.tsx](app/[locale]/layout.tsx). Frontmatter obsahuje pouze podporované primitivy; responzivní CSS výrazy jsou zaznamenány níže a v sidecaru. Historický komentář o dvou písmech nepopisuje nynější implementaci.

## Colors

Paleta vychází z majoliky Castelli, šafránu Navelli a světlé glazury. Názvy a hodnoty v úvodu zachovávají skutečné CSS tokeny.

### Primary

- **Cobalto:** hlavní tmavé plochy, nadpisy, navigace a sekundární akce; `cobalto-deep` pro nejtmavší pozadí, `cobalto-soft` pro stav akce.

### Secondary

- **Zafferano:** důležité kontaktní akce a drobné akcenty; `zafferano-l` pro světlý fokus na tmavém podkladu, `zafferano-ink` pro čitelné akcenty na světlém.

### Tertiary

- **Manganese / Verde:** existující podpůrné značky a regionální akcenty; nerozšiřovat na novou dominantní paletu.

### Neutral

- **Smalto / Smalto 2:** základ stránky a střídání světlých ploch.
- **Pietra:** okraje a oddělení; **Surface:** bílé karty a navigace.
- **Ink / Ink Soft:** hlavní a sekundární text. **Error:** chybové zprávy.

**The Contrast Rule.** Na tmavých kontaktních plochách používat světlý šafrán pro fokus; viditelnost textu a placeholderů ověřovat na skutečné barvě pole.

## Typography

**Display Font / Body Font:** Archivo s fallbackem uvedeným v tokenech. **Accent Font:** Playfair Display, běžně kurzivou. **Signature Font:** Priestacy pro wordmark a osobní podpis.

Homepage používá výrazný bezpatkový nadpis s patkovým protipólem. Základní display má `clamp(2.2rem, 4vw, 4rem)`, na mobilu `clamp(30px, 8.2vw, 44px)`. Homepage sekční nadpis používá `--t-3xl` (`clamp(1.7rem, 3.4vw, 2.5rem)`). Služby mají samostatně odvozený hero nadpis (`clamp(46px, 4.7vw, 76px)`, váha 500, řádek 1.04) a sekční nadpis (`clamp(34px, 4.2vw, 60px)`, váha 500, řádek 1.09). Tyto výrazy se nezaměňují za pevný globální fontSize.

Title a body používají pevné role uvedené v tokenech. Dlouhý popis nabídky má řádek 1.85; dodané odstavce, nadpisy a seznamy se formátují bez tvorby nových faktů. Delší čtecí bloky mají nejvýše 70ch. Podpis má podle místa vlastní velikost; nezastupuje běžný text nebo ovládání.

## Layout

Jednotný vnější rám má maximum 1280 px. `--page-gutter: clamp(12px, 4.45vw, 64px)` určuje okraj stránky; `--page-inset: clamp(16px, 4.45vw, 64px)` vnitřní sazební odsazení. `--shell-width: min(var(--wrap), calc(100% - 2 * var(--page-gutter)))`; `--content-width: calc(var(--wrap) - 2 * var(--page-inset))`. Kontejnery používají vnější rám a vnitřní inset společně. Hero, služby, důkazy a patička sdílejí tuto osu.

Základní sekční rytmus je `clamp(56px, 10vw, 120px)`; služby jej pro delší fotografické pasáže rozšiřují na `clamp(72px, 9vw, 136px)`. Vícesloupcové sekce přecházejí na mobilu do čitelného toku. Portrét homepage dostane pod 640 px vlastní prostor; podstránkové úvody se přeskupují pod 800 px. Ovládání a obsah musí zůstat dosažitelné také na 320 px.

**The Shared Axis Rule.** Další plochy odvozovat od společných page-gutter/page-inset/shell-width tokenů; nepřidávat nezávislý levý okraj pro hero, služby nebo patičku.

## Elevation & Depth

Hloubku tvoří střídání Smalto/Cobalto, fotografie a měkké difuzní stíny. Základní `shadow-1`, `shadow-2`, `shadow-card` a `shadow-pill` jsou přesně zapsány v sidecaru. Finální navigace má vlastní tlumenější stín; ikony důvodů používají plné Smalto s jediným měkkým stínem. Nepřenášet odstraněné zkosené highlighty, inset lesk nebo SVG drop-shadow jako podpis značky.

## Shapes

Rozlišení rolí: malé výřezy `sm`, pole `md`, fotografie `img`, karty/portrétní panely `card`, velké rámy `shell`, tlačítka a navigace `pill`. Rohy zůstávají oblé také během otevření fotografie pomocí clip-path. Galerie nepřikrajuje hlavní snímek nemovitosti: používá contain, světle tónovaný rám a samostatná tlačítka.

## Components

### Buttons

Šafránová hlavní akce, kobaltová akce na světlé ploše, ghost a glass protějšek sdílejí pill tvar. Hover mírně zvedá tlačítko; finální active posun je dolů o 1 px. Dlouhé mobilní CTA se zalamuje a respektuje šířku kontejneru. Fokus je viditelný, disabled tlumí ovládání a ruší zdvih.

### Chips

Filtrační chips mají světlou výchozí plochu a tmavě kobaltový vybraný stav. Nezaměňovat užitečný filtr či popisek pole za dekorativní štítek nad nadpisem.

### Cards / Containers

Katalogové karty mají bílé pozadí, měkký okraj a difuzní stín. Služby používají fotografické plochy, které doplňuje obsah a samostatný další krok. Čtyři titulní snímky sdílí `SERVICE_IMAGES` napříč homepage, menu, rozcestníkem a detailem; viditelný popisek je označuje jako ilustraci služby.

### Inputs / Fields

Světlá pole kombinují Smalto, Pietra a md radius; tmavé kontaktní varianty světlý text a dostatečně čitelný placeholder. Povinná pole, stav odesílání, chyba a přímé kontakty mají vlastní funkční význam. Vizuální potvrzení nemůže nahrazovat skutečné přijetí poptávky.

### Navigation

Plovoucí bílá pill navigace má fotografické menu čtyř služeb. Framer Motion řeší otevření; Escape zavírá menu a mobilní navigace se po výběru zavře. Veřejná cesta a interní `/cs/...` musí mít shodný výchozí text pro SSR i klienta.

### Gallery / Motion

Galerie obsahuje skutečné snímky stejné nemovitosti, tlačítkové miniatury, šipky a ovládání klávesnicí. Chyba zdroje zkouší další skutečný snímek, případně pravdivě nabídne kontakt. GSAP otevírá zaoblené okno fotografie a mírně posouvá krajinu jen na vhodném desktopu. Krátké sekční vstupy obsah předem neschovávají; reduced-motion a no-JS zachovávají čitelnost.

## Do's and Don'ts

### Do:

- Do zachovat stávající paletu, tři potvrzené typografické role a oblé rohy.
- Do zarovnat hlavní plochy pomocí společného vnějšího rámu a vnitřní sazební osy.
- Do používat skutečné portréty a klientské důkazy; ilustrační média viditelně označit.
- Do zachovat dostupný obsah, ovládání klávesnicí a čitelné stavy bez pohybu.

### Don't:

- Don't vydávat ilustrace, Ostravu nebo fotografii jiné nabídky za doloženou realizaci v Abruzzu.
- Don't nahrazovat zachovanou identitu novou paletou, písmem nebo ostrými rámy.
- Don't přidávat dekorativní štítky nad nadpisy, umělý lesk ikon nebo scroll-jacking.
- Don't považovat lokální designovou revizi za důkaz nasazení, doručení či produkčního výkonu.
