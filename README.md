# web/ — Next.js verze

Next.js 15 (App Router) + React 19 + TypeScript. Čte `../data/properties.json`
(výstup `../scraper.py`), umí scraper spustit. Design systém **Abruzzo Heritage
Estate** (Playfair Display + Archivo, paleta Cobalto / Smalto / Zafferano / Pietra).

## Spuštění

```bash
cd web
npm install
npm run dev
```
→ `http://localhost:3939`

Python musí být v PATH (`python` na Windows, `python3` jinde) — přepis `PYTHON_BIN`.
Cesta ke scraperu: `SCRAPER_DIR` (default `..`).

## Rychlost

| stránka | režim | pozn. |
|---|---|---|
| `/` | **static** + `revalidate 120` | slider, obnova po 2 min |
| `/nemovitost/[id]` | **SSG** (`generateStaticParams`) + `revalidate 300` | všech 85 předrenderováno při buildu |
| `/api/*` | dynamic | scrape / media / properties |

`npm run build` → detail stránky jsou statické HTML, žádná DB, čtení JSON jednou
za revalidaci.

## Struktura

```
app/
  layout.tsx                 next/font (Playfair Display + Archivo) → CSS proměnné
  globals.css                celý design systém (barvy, typo role, komponenty)
  page.tsx                   domovská stránka se sliderem
  nemovitost/[id]/page.tsx   editorial detail nabídky (SSG)
  not-found.tsx              nabídka stažená z RE/MAXu
  api/scrape/route.ts        POST → spustí ../scraper.py, streamuje výstup
  api/media/[...path]/route.ts  GET → lokální fotky z ../data/images/ (guard proti traversal)
  api/properties/route.ts    GET → properties.json
components/
  Slider.tsx                 klientský slider (scroll-snap + šipky)
  PropertyCard.tsx           karta → Link na detail; cover s CDN fallbackem
  Gallery.tsx                galerie na detailu (šipky, fallback plné rozlišení → náhled)
  LandscapeLine.tsx          dekorativní vlnovka (profil Gran Sassa), dokreslí se při scrollu
  ScrapeButton.tsx           tlačítko + streamovaná konzole (dev/admin)
lib/
  types.ts                   typy + klientské helpery (photoList, thumbUrl, fmtEur)
  data.server.ts             čtení dat (fs) — jediné místo pro napojení DB/CMS
```

## Design systém

Definován v `app/globals.css` jako CSS proměnné. Klíčové:

- **Barvy:** `--cobalto` (#122b4e) primární, `--smalto` (#fbf9f1) plátno,
  `--zafferano` (#d9a441) cena/CTA, `--pietra` (#d3ccbb) rámečky/oddělovače.
- **Písmo:** `--font-serif` (Playfair Display) nadpisy, `--font-sans` (Archivo) text a labely.
- **Radiusy:** fotky `--r-img` 16px, tlačítka `--r` 8px, inputy `--r-sm` 4px, tagy pill.
- **Elevace:** tonální vrstvy + `--shadow-1/2` (jemné, průhledné), hover lift + scale 1.02.
- **Landscape Line:** `<LandscapeLine />` mezi sekcemi, 48px+ vzduchu kolem.

## Fotky

**Default = hotlink přímo na RE/MAX CDN** (`mlsf.remax-czech.cz`), nic se nestahuje
ani nehostuje. Scraper ukládá do `photos[]` přímo adresy obrázků; karty berou
lehký `_th350` náhled, detail plné rozlišení.

Pozn.: RE/MAX v právních ustanoveních hotlink nedoporučuje (můžou změnit cestu
nebo nasadit ochranu). Pro ostrou verzi je připravená cesta k vlastnímu hostování:
`scraper.py --images` (stáhne + dedup do `../data/images/`) a
`NEXT_PUBLIC_SERVE_LOCAL_IMAGES=1` (web pak servíruje přes `/api/media/...`).

## Env

| proměnná | default | k čemu |
|---|---|---|
| `SCRAPER_DIR` | `..` | složka se `scraper.py` a `data/` |
| `PYTHON_BIN` | `python` / `python3` | interpret pro `/api/scrape` |
| `NEXT_PUBLIC_SHOW_SCRAPE_BUTTON` | `1` | `0` skryje dev tlačítko (produkce sbírá cronem) |
| `NEXT_PUBLIC_SERVE_LOCAL_IMAGES` | `0` | `1` = fotky z `/api/media` místo RE/MAX CDN (nutné `--images`) |

## Implementace do ostrého webu

`lib/data.server.ts` je jediné místo, kde se čtou data — sem se napojí DB / CMS /
XML feed. Komponenty berou typované `Property[]`. Design je celý v `globals.css`.
Nasazení viz `../DEPLOY.md`.
