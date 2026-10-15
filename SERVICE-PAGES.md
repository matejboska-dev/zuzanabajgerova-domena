# Předání stránek služeb

Stav k 14. 10. 2026: rozcestník a čtyři služby mají novou fotografickou kompozici v češtině, angličtině a italštině. Detaily používají světlý dělený úvod, skutečné portréty, rozbalovací odpovědnosti, fotografii vedle čtyř kroků a obrázkové odkazy na další služby; rozcestník čtyři střídající se fotografické scény. Na mobilu je úvodní fotografie před delším úvodním textem. Změny přebírají schválenou identitu, existující klientská média, obchodní fakta, formulářová data, videa a FAQ. Zahrnují fotografické menu služeb a nesticky obsah průvodce v toku čtení. Čerstvá nezávislá revize skončila výsledkem `SHIP` bez materiálních nálezů; její vizuální evidence je omezena na uložená zachycení. Lokální sestavení i kontroly prošly; podrobnosti a omezení jsou níže. V tomto požadavku neproběhl commit, push, produkční nasazení ani odeslání formuláře. Nastavení doručování a příjem ve skutečné schránce zůstávají hranicí před produkčním předáním.

## Adresy a vstupy

| Služba | Čeština | Angličtina | Italština |
| --- | --- | --- | --- |
| Koupě | `/sluzby/koupe` | `/en/services/property-purchase` | `/it/servizi/acquisto-immobili` |
| Rekonstrukce | `/sluzby/rekonstrukce` | `/en/services/renovation` | `/it/servizi/ristrutturazioni` |
| Správa | `/sluzby/sprava` | `/en/services/property-management` | `/it/servizi/gestione-immobili` |
| Krátkodobý pronájem | `/sluzby/pronajem` | `/en/services/holiday-rental-management` | `/it/servizi/gestione-affitti-brevi` |
| Rozcestník | `/sluzby` | `/en/services` | `/it/servizi` |

Všechny tři jazykové varianty rozcestníku používají společný `ServiceHub` se čtyřmi střídajícími se fotografickými scénami a lokalizovanými texty. Fotografické položky menu služeb lze otevřít také fokusem klávesnice a zavřít klávesou Escape. Karty služeb na hlavní stránce a položky navigace odkazují přímo na příslušnou službu ve zvoleném jazyce. Přepínač jazyků je výhradně ve sdílené horní navigaci: tři SVG vlajky s přístupnými názvy, viditelné i na mobilu. `languagePath()` zachovává odpovídající přeloženou službu či rozcestník; u dosud nepřeložené stránky vede na úvod vybraného jazyka. V obsahu stránek není druhý přepínač.

Veřejné české adresy nemají prefix. Interní cesty `/cs/sluzby/...` v manifestu Next.js jsou součástí současného routování. URL vytváří výhradně `path()` z [lib/routes.ts](lib/routes.ts); lokalizované segmenty se nemají přepisovat přímo v komponentách. Nesprávné kombinace jazyka a slugu vracejí 404.

## Kde upravovat obsah a chování

| Soubor | Odpovědnost |
| --- | --- |
| [lib/services.ts](lib/services.ts) | `SERVICE_COPY`, `SERVICE_UI`, `SERVICE_MEDIA`: základní texty všech tří jazyků, rozsah služby, proces, FAQ, zprávy do WhatsApp a klientská videa. |
| [components/services/ServicePage.tsx](components/services/ServicePage.tsx) | Společné JSON-LD, drobečková navigace a jazyky; větev `koupe` předává data do `PurchasePage`, ostatní služby do `EditorialServicePage`. `primaryImageOfPage` u těchto tří služeb odpovídá fotografii jejich aktuálního úvodu. |
| [components/services/PurchasePage.tsx](components/services/PurchasePage.tsx) | Kompozice koupě pro cs/en/it: fotografický úvod, místní přítomnost, rozsah, proces, náklady, video, klientskou komunitu, FAQ, sdílený formulář a navazující služby. |
| [lib/purchase-layout.ts](lib/purchase-layout.ts) | Doplňující texty koupě v cs/en/it: místní přítomnost, kontextové akce, cenové informace, video a komunita. |
| [components/services/EditorialServicePage.tsx](components/services/EditorialServicePage.tsx) | Kompozice rekonstrukce, správy a pronájmu pro cs/en/it. Sdílí vizuální pravidla koupě; rekonstrukce má skutečné před/po, správa a pronájem úvodní dvojici fotografií. Obsahuje šest rozbalovacích odpovědností, místní přítomnost, čtyři kroky, samostatnou galerii, rozsah, video, FAQ, formulář a související služby. |
| [lib/service-editorial.ts](lib/service-editorial.ts) | `SERVICE_EDITORIAL` a `EDITORIAL_UI`: výběr fotografií, lokalizované alternativní texty a popisky, tři praktické body, šest odpovědností, místní přítomnost a kontextové akce pro tři navazující služby. |
| [components/services/ServiceInteractions.tsx](components/services/ServiceInteractions.tsx) | Přepnutí před/po s přednačtením obou skutečných fotografií, kreslené kruhové šipky, kontextový WhatsApp a mobilní lišta. |
| [components/services/ServiceHub.tsx](components/services/ServiceHub.tsx) | Rozcestník v cs/en/it: pobřežní úvod, čtyři střídající se fotografické scény a osobní kontaktní závěr. |
| [lib/service-pages.tsx](lib/service-pages.tsx) | Statické parametry, kontrola jazyka/slugu a metadata detailů služeb. |
| [lib/routes.ts](lib/routes.ts), [lib/seo.ts](lib/seo.ts), [app/sitemap.ts](app/sitemap.ts) | Lokalizované URL, publikované jazykové varianty, canonical, hreflang a sitemap. |
| [components/forms/LeadForm.tsx](components/forms/LeadForm.tsx), [lib/forms.ts](lib/forms.ts), [app/api/lead/route.ts](app/api/lead/route.ts) | Sdílené odesílání, lokalizované stavy formuláře a doručovací kanály. |
| [components/page/ClickVideo.tsx](components/page/ClickVideo.tsx) | Video načítané až po záměrném spuštění; stálý poměr stran náhledu i přehrávání (`playbackRatio ?? ratio`), spuštění v prvním kliknutí a opakování při odmítnutí přehrávání. |
| [components/services/ServiceHero.tsx](components/services/ServiceHero.tsx), [ServiceJourney.tsx](components/services/ServiceJourney.tsx), [ServiceRelated.tsx](components/services/ServiceRelated.tsx) | Sdílený světlý dělený úvod s portrétem, fotografie vedle čtyř kroků a obrázkové odkazy na zbývající služby. |
| [components/services/ServiceMotion.tsx](components/services/ServiceMotion.tsx) | Otevření a hloubkový pohyb fotografie úvodu na desktopu; zachovává nativní scroll, respektuje omezení pohybu a bez detailového úvodu nenačítá GSAP. |
| [components/services/service-design.css](components/services/service-design.css) | Kompozice povrchu služeb pod `service-redesign`, lokální typografická škála, fotografické rámy zaoblené podle `--r-img` a responzivní přeskupení; bez nových globálních tokenů. |
| [components/SiteNav.tsx](components/SiteNav.tsx), [app/globals.css](app/globals.css) | Fotografické menu služeb, otevření fokusem a zavření Escape; `globals.css` zůstává zdrojem značkových tokenů a základních stylů. |
| [components/guide/guide.css](components/guide/guide.css), [app/[locale]/jak-koupit-nemovitost-v-italii/page.tsx](app/[locale]/jak-koupit-nemovitost-v-italii/page.tsx) | Obsah průvodce jako běžné odkazy v toku čtení; není sticky. |

## Fakta a obchodní hranice

Obsah vychází z klientských faktů předaných v tomto úkolu z rozhovorů s klientkou. Doslovné přepisy nejsou součástí tohoto předávacího souboru. Při dalších změnách zachovat následující význam:

- Zuzana žije **20 let v Abruzzu** a jejím domovem je Montesilvano. Tento údaj neoznačuje délku praxe v realitách. Dvě původní formulace v [PRODUCT.md](PRODUCT.md) byly opravené na pobyt v Abruzzu.
- Rekonstrukce už zajišťuje existující architektka a místní řemeslníci. Správu koordinují také místní asistentky.
- Zveřejněná cena nabídky zahrnuje nemovitost, daň spojenou s převodem, notáře a realitní provizi. První rok **základního servisu** s asistentkami je v rámci provize; přesný rozsah a rozpis položek určují smluvní podklady.
- Rekonstrukce, vybavení, provozní náklady, IMU/TARI, rozšířená dlouhodobá péče a provoz pronájmu mají samostatný rozsah a náklady. První rok základního servisu není neomezená správa ani úhrada oprav či energií.
- Texty nových detailů neslibují konkrétní výnos, obsazenost, paušální rozpočet, dobu rekonstrukce ani rychlost odpovědi.
- Reference Irmy je označená jako zkušenost s koupí a rekonstrukcí. Video realizace u pronájmu dokládá přípravu interiéru; není vydávané za důkaz příjmů z pronájmu.
- Fotografie před/po zachycují stejný byt z různých pohledů. Přepínač zobrazuje jednotlivé skutečné fotografie; nejde o přesně zarovnané překrytí.

## Vizuální návaznost a média

Redesign z 14. 10. 2026 je změnou kompozice služeb uvnitř zavedené značky. Porovnání se zdrojem v `app/globals.css` potvrzuje Cobalto (`#122b4e`), deep Cobalto (`#0c1d36`), Smalto (`#f1efe7`) a Zafferano (`#d9a441`). Používá také existující Smalto 2, Pietra, světlý šafrán a čitelný `--zafferano-ink`. Archivo zůstává písmem hlavních nadpisů a textu, Playfair Display patkových akcentů a Priestacy podpisů. Nevznikají nové globální tokeny ani nová identita; starší nesoulady v `PRODUCT.md` či úvodním komentáři CSS se tímto průchodem neopravují.

Společný `ServiceHero` staví text na světlou plochu vedle vysoké fotografie s malým skutečným portrétem a jménem Zuzany. Nahrazuje starší tmavý úvod s maskou a překryvem; starší kompozice koupě je zaznamenaná v historii ověření níže. Na mobilu do 760 px je pořadí drobečková navigace, nadpis, hlavní akce, fotografie, delší úvodní text a odkaz dále. Koupě i další služby využívají skutečné fotografie a zachovávají své obsahové rozdíly: koupě prohlídku a notáře i klientskou komunitu, rekonstrukce přepínač před/po, správa a pronájem dvojice fotografií a galerii.

Fotografické dvojice a galerie mají nestejně velké, odsazené rámy zaoblené podle `--r-img` s popisky pod fotografiemi. Tmavá sekce místní přítomnosti používá deep Cobalto, skutečný portrét a podpis. Šest odpovědností tvoří nativní `details`/`summary`; první je otevřená a vedle nich stojí fotografie s kontextovou akcí, na desktopu sticky. `ServiceJourney` připojuje fotografii ke čtyřem očíslovaným krokům. Rozsah a náklady tvoří otevřené sloupce s výzvou před položkami. Zůstávají původní klientská videa, pět FAQ, formulář a jeho skrytá data služby/jazyka; závěr doplňuje skutečný portrét a tři obrázkové odkazy na navazující služby.

Rozcestník používá širokou pobřežní fotografii a čtyři samostatné scény se střídáním fotografie vlevo a vpravo, následované kontaktním závěrem s portrétem. Na mobilu se scény skládají s fotografií před textem. Fotografické menu služeb ve sdílené navigaci používá stejné existující zdroje a podporuje fokus klávesnice i Escape. Obsah českého průvodce je součástí toku čtení s odkazy na existující cíle, bez sticky panelu.

Lokální styly služeb upravují měřítko nadpisů, vzdušnost, rámy fotografií a členění obsahu v `service-design.css`; nejde o pravidla pro celý web. Nadále dědí šířku obsahu, okraje, pilulková tlačítka a značkové barvy. Změny rozložení jsou při 1100, 760 a 420 px; do 760 px se odpovědnosti, kroky, FAQ a kontakt skládají do jednoho sloupce a podpůrná fotografie přestává být sticky. Do 420 px se skládají také fotografické dvojice, galerie a nákladové sloupce. Viditelný fokus a `aria-pressed` přepínače před/po zůstávají; oba skutečné snímky před/po se přednačítají.

`ServiceMotion` při šířce od 900 px a bez požadavku na omezení pohybu animuje jen otevření rámu fotografie úvodu a její hloubkový pohyb při nativním scrollu. Text je dostupný před JavaScriptem. Při `prefers-reduced-motion: reduce` zůstávají fotografie statické a scroll je automatický; rozcestník bez detailového úvodu GSAP nenačítá.

| Služba | Aktuální úvod / portrét | Video / náhled |
| --- | --- | --- |
| Koupě | `/services/curated/home-olive-sea.webp`; portrét úvodu `/services/curated/zuzana-standing.webp` | `/media/ref-petra.mp4`, `/media/ref-petra.webp` |
| Rekonstrukce | `/services/curated/renovation-living.webp`; stejný skutečný portrét úvodu | `/media/reno-ostrava.mp4`, `/media/reno-ostrava.webp` |
| Správa | `/services/curated/home-olive-sea.webp`; stejný skutečný portrét úvodu | `/media/ref-irma.mp4`, `/media/ref-irma.webp` |
| Pronájem | `/services/curated/rental-home-living.webp`; stejný skutečný portrét úvodu | `/media/reno-na-klic.mp4`, `/services/editorial/rental-video-poster.jpg` |

Kontaktní blok detailů používá `/services/curated/zuzana-office.webp`; portréty místní přítomnosti a galerie dalších služeb vybírá `SERVICE_EDITORIAL`. Koupě zachovává `/media/about-zuzana.webp`, prohlídku `/media/prohlidka-vila-silvi.webp`, notáře `/images/zuzana-notar.webp`, komunitu `/media/kom-obed.webp` a `/media/kom-notar.webp`; doprovod rozsahu nyní používá `/media/lok-pescara-garsonka.webp`. Proces doplňují existující okenice, krb, terasa nebo ložnice podle služby. Rozcestník používá pobřeží `/hero/backgrounds/abruzzo-montesilvano-plaz.webp`.

Tato revize nepřidala nové obrazové zdroje. Opětovně používá existující autorizovaná klientská/Drive média a již evidované krajinné fotografie. Původ patnácti WebP souborů z předchozí fotografické revize je v [sources.json](public/services/curated/sources.json) a jednotlivých JSON sidecarech: odkaz na Drive, případný čas snímku z videa a popis výřezu či optimalizace. Nejde o generativní změny ani nové doklady výsledků služby. Ilustrační klíče zůstávají výslovně označené. Přehrávače zachovávají rám 9:16 s maximální výškou 70svh a nativní ovládání; zdroj se připojuje při prvním záměrném spuštění.

Podrobný rozsah a předání kompozice je v [povrchu redesignu z 14. 10. 2026](.impeccable/surfaces/service-redesign-2026-10-14.md).

Rozšíření z 12. 10. 2026 přidalo dva rastry do `public/services/editorial/`:

- `property-keys.jpg`: ilustrační fotografie klíčů, autor Jakub Zerdzicki, [Pexels, fotografie 31651009](https://www.pexels.com/photo/hand-holding-house-keys-in-modern-interior-31651009/), převzatá 12. 10. 2026 s uvedením [licence Pexels](https://www.pexels.com/license/). Na stránce správy je jako ilustrace výslovně označená v popisku i alternativním textu všech tří jazyků; nedokládá klientku, konkrétní nabídku ani realizaci jejího týmu.
- `rental-video-poster.jpg`: snímek z klientského videa `/media/reno-na-klic.mp4` v čase 34,750966 s. Byl zachycený z pozastaveného videa a oříznutý tak, aby náhled neobsahoval nativní ovládací prvky. Nahrazuje předchozí náhled s černými okraji; celé zdrojové video zůstává nezměněné a při přehrávání má nativní ovládání.

Oba nové soubory mají původ zapsaný přímo v metadatech `impeccable:prompt`. Kontrola původu nových rastrů předaná hlavním řešitelem hlásí nula chybějících záznamů; dokumentační průchod přítomnost a obsah metadat v obou souborech také ověřil. Přehrávače všech služeb používají stálý rám 9:16 před kliknutím i během přehrávání, s maximální výškou 70svh a zobrazením celého videa v rámci.

Nový `DESIGN.md` ani `.impeccable/design.json` tento předávací krok nevytváří: jde o běžné rozšíření zavedené identity a závěrečná revize nový návrh systému nevyžaduje. Popis současného stavu nesmí změnit zdrojové tokeny ani povýšit starší rozpory na pravidla pro další stránky.

## Formulář a měření

Každý detail má formulář v sekci `#poptavka`. Vyžaduje jméno, e-mail a zprávu; telefon je nepovinný. Do `/api/lead` posílá `source: "sluzba"`, skrytá pole `sluzba` a `jazyk` a běžná metadata stránky/referreru/UTM. Po přijetí zobrazí potvrzení přímo v jazyce stránky. Při chybě zachová vyplněné údaje a nabídne telefon i WhatsApp s textem konkrétní služby.

Skutečné doručování nastavují proměnné popsané v [.env.example](.env.example): `RESEND_API_KEY` spolu s `LEAD_TO_EMAIL` a případně `LEAD_FROM_EMAIL`, nebo `LEAD_WEBHOOK_URL`. Bez doručovacího kanálu API vrací 503; při selhání všech nastavených kanálů vrací 502. Úspěch API znamená přijetí alespoň jedním kanálem, nikoli doložené doručení do schránky klientky.

WhatsApp zapisuje `whatsapp_click` s `service` a `locale`; přijatá poptávka zapisuje `generate_lead` s `form`, `service` a `locale` do `dataLayer`. Tato implementace nedokládá měření v produkčním analytickém účtu ani počet skutečných poptávek.

## Ověření a závěrečná revize

Následující výsledky pocházejí z dodaných ověřovacích podkladů. Dokumentační průchod nespouštěl nové UI kontroly ani testy.

### Původní ověření čtyř služeb

| Oblast | Doložený výsledek | Podklad |
| --- | --- | --- |
| Sestavení | `npm run build` prošel. Tehdejší manifest a vygenerované HTML obsahovaly všech 12 detailů a tři rozcestníky; sestavení následovalo změny původních komponent a stylů služeb. | Původní lokální výstup Next.js; [behavior.md](../.impeccable/review/services/behavior.md). |
| URL a SEO | 12 lokálních odpovědí 200, jeden H1 a pět FAQ na detail, správný jazyk HTML, canonical, reciproční cs/en/it a `x-default`, sitemap, JSON-LD WebPage/Service/BreadcrumbList/FAQPage a lokální média; neplatné kombinace vracejí 404. | [technical.json](../.impeccable/review/services/technical.json). |
| Rozložení | Čtyři české stránky na šířkách 1440 a 390 px; všech 12 detailů na 320 px. Fonty načtené, bez vodorovného přetékání. | [browser-layout.json](../.impeccable/review/services/browser-layout.json) a zachycené obrazovky uvedené v revizi. |
| Interakce | Skutečné video se přehrálo bez chyby; přepínač zobrazil fotografii po rekonstrukci a aktualizoval `aria-pressed`. | [behavior.md](../.impeccable/review/services/behavior.md). |
| Lokální odeslání | Anglická koupě, italský pronájem a česká správa ověřily obsah, jazyk, službu a potvrzení přes izolovaný místní přijímač. Při vypnutí přijímače anglická rekonstrukce zobrazila chybu, zachovala obsah a nabídla správný WhatsApp. Žádná zpráva nebyla odeslána externě. | [behavior.md](../.impeccable/review/services/behavior.md). |
| Finální opravy | V jedné sadě vyřešený náhled pronájmu, údaj o pobytu v Abruzzu, opakované štítky nad nadpisy, výřez portrétu ve správě a jednotné kreslené ikony. | [finish-review.md](../.impeccable/review/services/finish-review.md), následně [finish-verdict.md](../.impeccable/review/services/finish-verdict.md). |

Původní finální verdikt je `disposition: ship` **pro pět tehdy hodnocených oprav**. Nejde o potvrzení skutečného doručování ani produkčního nasazení.

### Předchozí ověření prototypu koupě

| Oblast | Doložený výsledek | Podklad |
| --- | --- | --- |
| Finální sestavení | Po opravě fokusu prošel `npm run build`, vygeneroval 125 statických stránek. | `/tmp/bajgerova-purchase-final-build.log`; [behavior.md](../.impeccable/review/purchase/behavior.md). |
| URL a kontext | Tři jazykové varianty koupě a tři české navazující služby vracejí 200, jeden H1, pět FAQ, správný jazyk, canonical a cs/en/it/x-default. Koupě má správná skrytá pole služby/jazyka; nová kompozice není přítomná na ostatních službách. JSON-LD a metadata jsou sdílené s `ServicePage`. | [technical.json](../.impeccable/review/purchase/technical.json), [behavior.md](../.impeccable/review/purchase/behavior.md). |
| Rozložení | Česká koupě na 1440 × 1000, 390 × 844 a výchozích 1280 × 720 px; všechny tři jazyky na 320 × 844 px. Bez vodorovného přetékání, s načtenými fonty a fotografiemi. | [browser-layout.json](../.impeccable/review/purchase/browser-layout.json), [behavior.md](../.impeccable/review/purchase/behavior.md), obrazovky uvedené v revizi. |
| Interakce | FAQ se otevřelo kliknutím a zavřelo Enterem; úvodní CTA vede na `#poptavka`, mobilní lišta u formuláře zmizí. Prázdné odeslání zastaví povinná pole a zaměří jméno. Petra se přehrála bez chyby v celém rámci 9:16. Žádná zpráva nebyla odeslána externě; izolované testy sdíleného doručování jsou doložené v původním ověření. | [behavior.md](../.impeccable/review/purchase/behavior.md), [původní formulářové testy](../.impeccable/review/services/behavior.md). |
| Aktuální závěrečná oprava | Světlý šafrán pro fokus na tmavých plochách má vůči Cobalto kontrast 8,53:1. Všech osm požadovaných zachycení prošlo po opravě znovu revizí; bez viditelných přímých regresí. | [finish-review.md](../.impeccable/review/purchase/finish-review.md), [finish-verdict.md](../.impeccable/review/purchase/finish-verdict.md), `focus.jpg`. |

Tehdejší verdikt `disposition: ship` se vztahuje **jen na jedinou hodnocenou opravu fokusu**, nikoli na celý repozitář, předchozích pět oprav nebo doručení do skutečné schránky. Revize i dokumentace využily náhradní role podle degraded kontraktů, protože pojmenované vlastní role nebyly v tomto prostředí dostupné.

### Zpřesnění koupě z 9. 10. 2026

Aktuální zdrojový kód obsahuje šest odpovědností, kontextové akce napříč hlavními sekcemi, cenové akce před seznamy, samostatnou klientskou komunitu a odlišné zdrojové fotografie. Rozšíření je lokalizované do cs/en/it. Výše uvedené starší verdikty automaticky nepotvrzují tyto následné úpravy.

Podle aktuálního ověření předaného hlavním řešitelem prošla kontrola typů a všechny tři jazykové varianty neměly vodorovné přetékání na šířkách 320, 390 a 1440 px. Video po prvním kliknutí dosáhlo `readyState: 4`, `paused: false`; rám měl před spuštěním i během přehrávání 283,5 × 504 px. Aktuální produkční sestavení následně prošlo s návratovým kódem 0; záznam je v [build.log](../.impeccable/review/purchase-v2/build.log). Po opětovném spuštění lokálního webu byla ověřena čerstvá česká stránka s deseti sekcemi a bez vodorovného přetékání také na šířce 455 px. Dokumentační průchod ověřil zdrojové soubory a nepřidává vlastní tvrzení o produkčním provozu nebo skutečném doručení zprávy.

### Rozšíření na rekonstrukci, správu a pronájem z 12. 10. 2026

Dokumentační průchod ověřil dokončený `EditorialServicePage`, směrování z `ServicePage`, obsah `SERVICE_EDITORIAL`, koncový blok stylů a původ obou nových rastrů. Koupě používá dál `PurchasePage`; toto rozšíření nemění její kompozici ani obsah. Kontroly níže platí pro lokální implementaci.

| Oblast | Doložený výsledek | Podklad |
| --- | --- | --- |
| Typy a sestavení | Podle výsledků hlavního řešitele prošla kontrola typů; produkční sestavení skončilo návratovým kódem 0 a vygenerovalo 125 statických stránek. | [build.log](../.impeccable/review/service-editorial/build.log). |
| Rozložení | Hlavní řešitel ověřil všech devět nových jazykových variant v prohlížeči a české stránky na desktopu a mobilu. Zachycení českých stránek zahrnují také výchozí šířku 1280 px. | Zachycení v [.impeccable/review/service-editorial](../.impeccable/review/service-editorial/). |
| Úzké EN/IT a SEO | Šest variant EN/IT na šířce 320 px má jeden H1, šest odpovědností, funkční cíl CTA, správný jazyk, canonical a alternativy cs/en/it/x-default; bez vodorovného přetékání. | [locale-checks.json](../.impeccable/review/service-editorial/locale-checks.json). |
| Původ médií | Dva nové rastry obsahují metadata původu; předaný sken nehlásí chybějící záznamy. Ilustrační klíče jsou označené v cs/en/it. | Metadata souborů v [public/services/editorial](public/services/editorial/) a [service-editorial.ts](lib/service-editorial.ts). |

Čerstvá nezávislá závěrečná revize uzavřela toto rozšíření výsledkem `disposition: ship`, bez materiálních oprav. Otevřela všech 15 požadovaných zachycení; potvrzuje návaznost na koupi, odlišné fotografie, responzivitu a přesně vymezené popisky videí. Podklad: [finish-review.md](../.impeccable/review/service-editorial/finish-review.md). Hlavní řešitel navíc ověřil přehrávání všech tří videí po prvním kliknutí v rámech 283,5 × 504 px, rozbalení FAQ a přechod z úvodního CTA na poptávkový formulář: [behavior-checks.json](../.impeccable/review/service-editorial/behavior-checks.json). Revizní i dokumentační roli zastoupili výchozí agenti podle degraded kontraktů Impeccable, protože pojmenované role nebyly dostupné. Žádná z těchto kontrol nepotvrzuje produkční nasazení, měření v produkčním účtu ani doručení poptávky do skutečné schránky.

### Fotografická revize a úklid podpůrných stránek — 13. 10. 2026

Aktuální podklady jsou v [.impeccable/review/service-photography](../.impeccable/review/service-photography/). Dokumenter ověřil zdrojové komponenty, obsah, styly a evidenci médií; samostatně nespouštěl UI testy.

| Oblast | Doložený výsledek | Podklad |
| --- | --- | --- |
| Adresy | 20 lokálních odpovědí HTTP 200, včetně všech 12 jazykových variant detailů služeb; každá kontrolovaná stránka má jeden H1. | [routes-check.json](../.impeccable/review/service-photography/routes-check.json) |
| Média | U tří českých navazujících služeb a rozcestníku kontrola nehlásí chybějící lokální obrázky. | [assets-check.json](../.impeccable/review/service-photography/assets-check.json) |
| Formulář | Aktuální API vrací HTTP 503 a `not_configured`. Doručování vyžaduje nastavení a test u příjemce. | [lead-check.json](../.impeccable/review/service-photography/lead-check.json) |
| Sestavení a kontrola | Předchozí sestavení této revize prošlo; hlavní řešitel po úpravách potvrdil `npm run check` a čistý `git diff --check`. Starší build ani kontrola kódu nenahrazují nové vizuální ověření. | [build.log](../.impeccable/review/service-photography/build.log), [final-status.json](../.impeccable/review/service-photography/final-status.json) |
| Vizuální revize | `disposition: fix`: revize potvrdila plynulý hero přechod a odlišné zdroje, vyžádala opravu portrétu správy na desktopu a detailu krbu rekonstrukce na mobilu. | [finish-review.md](../.impeccable/review/service-photography/finish-review.md) |

Obě opravy jsou v CSS: desktopový portrét správy má rám 440 px a polohu 50 % / 35 %, detail rekonstrukce na úzkém mobilu polohu 50 % / 82 %. Bezpečnostní politika prohlížeče zablokovala nové zachycení, proto **vizuální verdikt po opravách zůstává otevřený**. Starší verdikty `ship` výše jsou historické a neuzavírají aktuální fotografickou revizi. Dokumentační roli zastupuje výchozí agent podle degraded kontraktu Impeccable.

Na stránkách `/reference`, `/o-mne`, `/clanky` a `/lokality` byly odstraněny prázdné obsahové placeholdery a obsah se opírá o dostupná fakta. Neznamená to dodání nových klientských příběhů, článků ani podrobných lokálních průvodců. Otázky nastavení ochrany osobních údajů a cookies zůstávají otevřené.

### Redesign služeb — 14. 10. 2026

Dokumentační průchod porovnal komponenty a styly se stávajícími tokeny a přečetl aktuální JSON podklady. Nespouštěl nové UI testy. Starší sekce výše zachovávají tehdejší stav a rozsah verdiktů; následující výsledky platí pro nynější redesign.

| Oblast | Doložený výsledek | Podklad |
| --- | --- | --- |
| České služby | Pět požadovaných adres na šířkách 1440, 768, 375 a 320 px: všech 20 odpovědí HTTP 200, bez vodorovného přetékání, chybějících hlavních obrázků nebo JS `pageerror`. | [qa.json](.impeccable/review/service-redesign/qa.json) |
| EN/IT | Všech deset variant rozcestníku a detailů na 375 px: HTTP 200, správný jazyk, bez vodorovného přetékání, chybějících úvodních obrázků či chyb stránky. | [interactions.json](.impeccable/review/service-redesign/interactions.json) |
| Interakce | Skutečné před/po, odpovědnosti a FAQ se rozbalují; testované video se přehrává s `readyState: 4`. CTA vede na `#poptavka` s odstupem přibližně 120 px; prázdný formulář zastaví nativní validace povinných polí. Fotografické menu má čtyři odkazy, ověření klávesnice a zavření Escape. | [interactions.json](.impeccable/review/service-redesign/interactions.json) |
| Průvodce a omezení pohybu | Obsah průvodce je na 1440 a 375 px `position: static`, nepřetéká a všech šest cílů existuje. Omezení pohybu zanechá fotografii bez transformace a scroll `auto`. | [interactions.json](.impeccable/review/service-redesign/interactions.json) |
| Sestavení a kód | Hlavní řešitel potvrdil produkční sestavení 125 statických stránek, kontrolu typů a čistý `git diff --check`. Po následné malé pojistce proti načítání GSAP na rozcestníku znovu prošla kontrola typů; tato pojistka byla přidána po uvedeném sestavení. | Předané výsledky hlavního řešitele; aktuální `ServiceMotion.tsx`. |
| Nezávislá revize | Čerstvá revize skončila `SHIP` bez materiálních nálezů. Vizuální posouzení používá uložená zachycení; nejde o další samostatné živé testování. | [review.md](.impeccable/review/service-redesign/review.md), zachycení a QA podklady v [.impeccable/review/service-redesign](.impeccable/review/service-redesign/). |

V tomto požadavku nebyl formulář odeslán ani testován příjem ve skutečné schránce. Uvedené výsledky nepotvrzují produkční nasazení, analytické měření, růst konverzí ani získání designového ocenění. Commit a push neproběhly.

## Zbývající hranice před předáním do produkce

Prioritizovaný přehled je v [DESIGN-REMAINING.md](DESIGN-REMAINING.md). Žádná lokální kontrola nedokládá nasazení, měření v produkčním účtu ani skutečné doručení poptávky.

Zachované starší odchylky mimo rozsah této revize:

- `PRODUCT.md` stále obsahuje historické obecné označení stránek jako blueprint/placeholder a neúplný popis současných typografických rolí. Tento průchod jej nepřepisuje.
- Lokální `DESIGN.md` chybí; autorita identity je podle `PRODUCT.md` v sourozeneckém projektu. Starší komentář CSS uvádí dvě písma, implementace obsahuje i Priestacy. Běžné rozšíření tuto mezeru ani rozpor nepovyšuje na nové pravidlo.
- Nepřeložené stránky v `CS_ONLY` zůstávají české. Lokalizované služby nejsou překladem celého webu.
- Čtyři převzaté nálezy detektoru mimo přidané styly nejsou aktuální revizí uzavřené ani schválené jako pravidla systému.

Samostatné změny hlavní stránky a médií, které už byly v pracovním stromu, zůstávají zachované. Při budoucím commitu je nutné vybrat zamýšlené soubory; celý aktuální diff nepatří automaticky této revizi.

Korekce podle uživatelské zpětné vazby 14. 10. 2026: odstraněné ostré rámy. Fotografie, videa a galerie používají `--r-img`, panel portrétu `--r-card`, pobřežní pás `--r-shell` a vstupy `--r-md`, shodně s homepage. Animovaný rám úvodu zachovává zaoblení.

Korekce fotografií podle uživatele: čtyři ilustrační obrázky `/services/*-editorial.jpg` z homepage používá společně rozcestník, úvody detailů, menu a navazující služby. Jediným zdrojem je `lib/service-images.ts`; nejde o skutečné zakázky ani ověřenou fotografii lokality. Klientské fotografie v obsahových sekcích zůstávají skutečným důkazem.


### Celo-webové dokončení a lokální designový záznam — 14. 10. 2026

Následná revize otevřela i homepage a skutečné podpůrné trasy. Historické tvrzení o neměněné homepage a chybějícím lokálním DESIGN.md v předchozích sekcích už nepopisuje tento krok. Sdílené layout tokeny zarovnávají vnější a vnitřní osy; čtyři titulní ilustrace služeb zůstávají přesně podle homepage a mají viditelné označení. Galerie/detail zachovává skutečné snímky a dodaný text, doplněný o čitelné členění. SiteNav sjednocuje veřejné a interní české adresy proti původní hydrataci 418. Veřejné prototypové odkazy, PageShell/Filler a prázdná detailní šablona článku byly odstraněné.

Nový [DESIGN.md](DESIGN.md) a [sidecar v2](.impeccable/design.json) zaznamenávají skutečnou zachovanou identitu a schválené rozšíření rozložení. Dokumentační roli zastoupil výchozí agent podle degraded kontraktu; nevytváří novou vizuální identitu ani neopravuje jiné historické rozpory mimo rozsah.

Souhrn aktuálních kontrol, hranice starších verdiktů a podklady jsou v [SITE-FINISH.md](SITE-FINISH.md), [.impeccable/review/site-finish](.impeccable/review/site-finish/) a [DESIGN-REMAINING.md](DESIGN-REMAINING.md). Neoznačovat původní `ship` služeb za závěrečné schválení této celo-webové fáze. Identita Zuzany jako podnikatelky je potvrzená a ověřená; uchování, poskytovatelé, právní schválení, skutečné doručování a aktuálnost katalogu zůstávají otevřené. V tomto požadavku neproběhlo odeslání formuláře, commit, push ani veřejné nasazení.
