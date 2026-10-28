# Jazykové verze webu

Všechny aktuální stránky mají CS, EN a IT verzi. České URL jsou bez prefixu, překlady pod `/en` a `/it`. Služby a blog používají vlastní EN/IT segmenty; ostatní existující slugy jsou zachované.

- `lib/localize.tsx`: statické překlady prezentačních textů a interaktivních stavů, propagace jazyka do sdílených komponent. Hodnoty filtrů, identifikátory polí a cesty k médiím zůstávají stabilní.
- `lib/translations/{en,it}.json`: UI a kratší texty; klíčem je původní text po sjednocení mezer. `ZXQ0QXZ` označuje proměnnou část popisku.
- `lib/localize.server.tsx` a `*.server.json`: delší texty a popisy nemovitostí pouze na serveru. Frontend nevolá překladatelskou službu.
- První pracovní překlady vznikly automaticky přes Google Translate; nadpisy, hlavní UI a zjištěné významové nepřesnosti byly následně upravené v kontextu stránek.
- Jména, adresy a citace klientů se zachovávají. Citace mají uvedený jazyk. Překládají se ovládací prvky recenzí.
- Přeložených je všech 85 aktuálních popisů nemovitostí. Změněný či nový popis ze scraperu vyžaduje nový překlad; přesná shoda zdroje brání použití zastaralého překladu. Do té doby EN/IT detail požádá návštěvníka, aby si vyžádal přeložený popis a aktuální podrobnosti.
- `/dekujeme` a `/dotaznik` zůstávají ve všech jazycích noindex a mimo sitemapu.

## Ověření 28. 10. 2026

`npm run build` prošel v adresáři `web`.

`python3 scripts/check-locales.py` ověřil 339 předrenderovaných stránek (333 indexovatelných): jazyk dokumentu, canonical, úplnost a reciprocitu hreflang, existenci interních odkazů, zachování jazyka, sitemapu a nepřeložené známé UI texty. Bez chyb.

Prohlížečová kontrola 15 reprezentativních EN/IT stránek při šířkách 1440, 1024, 390 a 320 px: bez horizontálního přetékání a bez chyb hydratace. Ověřený přepínač jazyka v kontextu stránky, filtry, kalkulačka, klávesové zaměření, dialog recenze a lokalizované 404. Testováno také s preferencí omezeného pohybu.

Úspěšné stavy italského kontaktního formuláře a přesměrování anglické poptávky nemovitosti na `/en/dekujeme` byly ověřeny se simulovanou odpovědí Web3Forms. Tyto kontroly nepotvrzují skutečné doručení do schránky.
