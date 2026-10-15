# Co zbývá dokončit

Stav k 14. 10. 2026 po sjednocení vzhledu skutečných stránek. Aktuální rozsah a důkazy popisuje [SITE-FINISH.md](SITE-FINISH.md). Lokální designová revize není potvrzením nasazení ani celého projektu jako hotového.

## Klientská revize a obsah

- [x] **Uzavřít šest hodnocených vizuálních oprav.** Čerstvý [závěrečný verdikt](.impeccable/review/site-finish/review-verdict.md) je `ship`; všech šest připomínek je vyřešených a opravené snímky prošly kontrolou důkazů. Tento výsledek nepotvrzuje celý povrch ani produkční spuštění.
- [ ] **P1 — Získat klientské schválení.** Předat aktuální verzi k obsahové a vizuální revizi klientkou; lokální technické kontroly její schválení nenahrazují.
- [x] **Zaznamenat existující systém lokálně.** [DESIGN.md](DESIGN.md) a [design.json v2](.impeccable/design.json) popisují skutečnou paletu, tři typografické role, společné osy, radiusy a komponenty. Nejde o novou značku ani kompletní balíček tiskových brandových exportů.
- [ ] **P2 — Doplnit vlastní obsah z klientských podkladů.** Praktické informace každé lokality, doložené klientské příběhy, skutečné články a případný PDF průvodce. Členění stávajícího popisu nabídky nevytváří nové informace.
- [ ] **P2 — Uzavřít EN/IT.** Služby a jejich rozcestník jsou lokalizované; homepage EN/IT mají české sekce a ostatní trasy CS_ONLY zůstávají české. Rozhodnout rozsah první publikované verze a provést korekturu.
- [ ] **P3 — Případné další focení a brandové exporty.** Použité skutečné portréty a pracovní média mají přednost; nový balíček fotografií, log, tisku a podpisu vyžaduje vlastní předání.

## Spuštění a provoz

- [ ] **P1 — Nastavit doručování a potvrdit příjem.** Doplnit skutečný kanál a příjemce dle [.env.example](.env.example), provést test a ověřit zprávu přímo v zamýšlené schránce. V aktuálním požadavku se formulář neodesílal; stav bez konfigurace je 503 / `not_configured`.
- [x] **Potvrdit provozovatelku.** Zuzana jako podnikatelka; jméno, IČO 87491095 a sídlo jsou ověřené a uvedené v implementaci. [Evidence](.impeccable/review/site-finish/identity-verification.md).
- [ ] **P1 — Uzavřít skutečné nastavení ochrany údajů a cookies.** Doby uchování, poskytovatelé hostingu/doručování/měření a právní schválení. Potvrzená identita sama tyto otázky neřeší.
- [ ] **P1 — Obnovit katalog a ověřit automatické běhy.** Snapshot je z 27. 8. 2026, má 85 záznamů a jednu nabídku mimo cílový trh. Workflow v repozitáři neprokazuje aktuální nabídky v ostrém provozu.
- [ ] **P1 — Nastavit a ověřit měření, produkční výkon a veřejný web.** GSC/analytické účty, reálné konverzní události, výkon mobilu, DNS/HTTPS, všechna média a formuláře po schváleném nasazení. Build a místní HTTP 200 tyto výsledky nepotvrzují.
- [ ] **P2 — Další funkce podle odsouhlaseného rozsahu.** Skutečný rezervační kalendář, administrace, CRM/hlídač, mapový výpis a případné další filtry. Připravený webhook nebo výběr termínu nejsou dokončenou integrací.
