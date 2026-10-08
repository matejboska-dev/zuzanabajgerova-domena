// NÁVRH KE SCHVÁLENÍ: otázky dotazníku pro vážné zájemce a jejich možnosti.
// Otázky jsou podle zadání z design review. Možnosti u výběrů (typ nemovitosti,
// vzdálenost od moře, rozpočet, termín) jsou návrh a klientka je může upravit.
// Upravuje se jen tenhle soubor, formulář se z něj vykreslí sám.

export type DotaznikField =
  | {
      id: string;
      type: 'text' | 'email' | 'tel';
      label: string;
      required?: boolean;
      autoComplete?: string;
      placeholder?: string;
    }
  | { id: string; type: 'radio'; label: string; options: string[]; required?: boolean }
  | { id: string; type: 'select'; label: string; options: string[]; required?: boolean }
  | { id: string; type: 'textarea'; label: string; placeholder?: string };

export type DotaznikGroup = { title: string; fields: DotaznikField[] };

export const DOTAZNIK: DotaznikGroup[] = [
  {
    title: 'Kontakt',
    fields: [
      { id: 'jmeno', type: 'text', label: 'Jméno', required: true, autoComplete: 'name' },
      { id: 'email', type: 'email', label: 'E-mail', required: true, autoComplete: 'email' },
      {
        id: 'telefon',
        type: 'tel',
        label: 'Telefon nebo WhatsApp',
        required: true,
        autoComplete: 'tel',
        placeholder: '+420',
      },
    ],
  },
  {
    title: 'Co hledáte',
    fields: [
      {
        id: 'ucel',
        type: 'radio',
        label: 'Účel koupě',
        required: true,
        options: ['Vlastní rekreace', 'Investice a pronájem', 'Trvalé bydlení'],
      },
      {
        id: 'typ',
        type: 'radio',
        label: 'Typ nemovitosti',
        options: ['Byt', 'Rodinný dům nebo vila', 'Zatím nevím'],
      },
      {
        id: 'lokalita',
        type: 'radio',
        label: 'Preferovaná lokalita',
        options: ['U moře', 'V horách', 'Nezáleží'],
      },
      {
        id: 'vzdalenost',
        type: 'select',
        label: 'Vzdálenost od moře',
        options: ['Do 200 m', 'Do 1 km', 'Do 5 km', 'Nezáleží'],
      },
    ],
  },
  {
    title: 'Rozpočet a termín',
    fields: [
      {
        id: 'rozpocet',
        type: 'select',
        label: 'Rozpočet včetně všech nákladů',
        required: true,
        options: [
          'Do 100 000 €',
          '100 000 až 150 000 €',
          '150 000 až 250 000 €',
          'Nad 250 000 €',
          'Zatím nevím',
        ],
      },
      {
        id: 'financovani',
        type: 'radio',
        label: 'Způsob financování',
        options: ['Vlastní zdroje', 'Hypotéka', 'Kombinace'],
      },
      {
        id: 'kdy',
        type: 'select',
        label: 'Kdy chcete koupit',
        options: ['Co nejdříve', 'Do 3 měsíců', 'Do 6 měsíců', 'Do roka', 'Zatím jen zjišťuji'],
      },
    ],
  },
  {
    title: 'Služby a zkušenost',
    fields: [
      {
        id: 'rekonstrukce',
        type: 'radio',
        label: 'Zájem o rekonstrukci na klíč',
        options: ['Ano', 'Ne', 'Možná'],
      },
      {
        id: 'sprava',
        type: 'radio',
        label: 'Zájem o správu a pronájem',
        options: ['Ano', 'Ne', 'Možná'],
      },
      { id: 'abruzzo', type: 'radio', label: 'Byli jste už v Abruzzu', options: ['Ano', 'Ne'] },
      {
        id: 'zdroj',
        type: 'radio',
        label: 'Jak jste se o mně dozvěděli',
        options: ['Doporučení', 'Internet', 'Sociální sítě', 'Jiné'],
      },
    ],
  },
  {
    title: 'Něco navíc',
    fields: [
      {
        id: 'predstava',
        type: 'textarea',
        label: 'Popište svou představu',
        placeholder: 'Cokoli, co byste mi chtěli říct předem',
      },
    ],
  },
];
