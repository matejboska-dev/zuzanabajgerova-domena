import type { ArticleText } from './articles';

const NOTE = 'Figures are indicative, as of October 2026. Rates and procedures change, so always confirm them with the notary and a tax adviser before signing.';

export const ARTICLES_EN: Record<string, ArticleText> = {
  'kolik-stoji-koupe-domu-v-italii': {
    slug: 'how-much-does-it-cost-to-buy-a-house-in-italy',
    title: 'How much does it really cost to buy a house in Italy?',
    description: 'The purchase price is not the final amount. Taxes, notary, agency fee and yearly running costs when buying a house in Italy, with a worked example for a €120,000 house.',
    category: 'Costs',
    imageAlt: 'Viewing a house in Abruzzo before buying',
    summary: 'On top of the advertised price, add roughly 8 to 15% when buying a house in Italy: registration tax, notary, agency commission and small fees. The biggest item is usually the tax, which for a holiday home is 9% of the cadastral value, not of the price.',
    sections: [
      { id: 'extra-costs', h: 'What you pay on top of the purchase price', blocks: [
        { t: 'p', text: 'The price in the advertisement is the price of the property. The costs of the transfer are paid separately, and most of them are calculated by the notary only when the contract is prepared. That is why it pays to keep a reserve from the very start of your search.' },
        { t: 'table', head: ['Item', 'Indicative amount', 'Note'], rows: [
          ['Registration tax (imposta di registro)', '9% of the cadastral value, minimum €1,000', 'For a second home or holiday property. The 2% rate applies only to a main residence (prima casa).'],
          ['Mortgage and cadastral tax', '2 × €50', 'Fixed amounts when buying from a private seller.'],
          ['Notary (notaio)', 'in the low thousands of euros', 'Depends on the price and complexity. The notary quotes the amount in advance.'],
          ['Agency commission', 'commonly around 3% + VAT', 'In Italy both sides usually pay a commission. Get the amount confirmed in writing.'],
          ['Technical survey (geometra)', 'hundreds of euros', 'Checks that the house matches the cadastre and building documents. Always recommended.'],
          ['Translations, power of attorney, interpreter', 'as needed', 'If you do not sign in person or do not speak Italian.'],
        ], note: NOTE },
      ] },
      { id: 'registration-tax', h: 'Why the tax is based on the cadastral value', blocks: [
        { t: 'p', text: 'When you buy from a private person, registration tax is calculated on the cadastral value (valore catastale), which is usually much lower than the real price. That is why the actual tax is often lower than the percentage suggests. The notary finds the cadastral value in the land registry and shows it in the cost breakdown.' },
        { t: 'p', text: 'The 2% rate for a main residence depends on conditions, above all residence in the municipality where the property is located. Most foreign buyers purchase a holiday home and therefore pay 9%. If you are moving to Italy permanently, check your eligibility for the lower rate with the notary beforehand.' },
        { t: 'callout', title: 'Buying from a developer is different', text: 'For a new house from a construction company, VAT (IVA) is paid instead of registration tax: 4%, 10% or 22% depending on the type of property. The fixed fees also differ from a purchase from a private seller.' },
      ] },
      { id: 'example', h: 'Example: a holiday home for €120,000', blocks: [
        { t: 'p', text: 'A simplified example for a house bought from a private seller. We assume a cadastral value of €40,000, a notary at €2,500 and a commission of 3% of the price plus 22% VAT. Real numbers differ for every property.' },
        { t: 'table', head: ['Item', 'Amount'], rows: [
          ['Registration tax, 9% of €40,000', '€3,600'],
          ['Mortgage and cadastral tax', '€100'],
          ['Notary (assumption)', '€2,500'],
          ['Commission 3% of €120,000 + 22% VAT', '€4,392'],
          ['Surveyor and small fees (assumption)', '€700'],
          ['Total costs', 'about €11,300'],
        ], note: 'That is about 9.4% of the price. The result is illustrative, not an offer or tax advice.' },
      ] },
      { id: 'running-costs', h: 'Yearly costs after purchase', blocks: [
        { t: 'p', text: 'Once you own the property, ordinary running costs begin. Include them in your budget:' },
        { t: 'ul', items: [
          'IMU, the local property tax. It is paid on a second home, not on a main residence. It is based on the cadastral value, so it is typically hundreds of euros per year.',
          'TARI, the waste collection fee.',
          'Energy, water, internet and home insurance.',
          'Condominium fees (condominio) if you buy an apartment or a house in a shared building.',
          'Maintenance and repairs. Older houses in Abruzzo often need work on the roof, heating or pipework.',
        ] },
        { t: 'p', text: 'If you plan to rent the property out, also count income tax on rental income and management fees. Have the tax setup checked by a tax adviser.' },
      ] },
      { id: 'avoid-surprises', h: 'How to avoid unpleasant surprises', blocks: [
        { t: 'ul', items: [
          'Ask for an itemised breakdown of all costs before you make an offer.',
          'Ask whether the advertised price includes the commission or not.',
          'Have the cadastral compliance of the house checked (geometra) before paying a deposit.',
          'Budget for renovation and furnishing separately from the transfer.',
          'Try the indicative cost calculator on the Practical information page.',
        ] },
      ] },
    ],
    faq: [
      { q: 'What percentage of the price do the additional costs make up in Italy?', a: 'Roughly 8 to 15% of the price. The largest part is registration tax (9% of the cadastral value for a holiday home), followed by the notary and the commission.' },
      { q: 'Does a foreigner pay more than an Italian when buying a house?', a: 'Not because of nationality. What matters is whether it is a main residence (2% rate) or a second home (9%). Most foreign buyers purchase a second home.' },
      { q: 'Who pays the notary?', a: 'Usually the buyer. The notary is responsible for the safety of the transfer and quotes all fees before signing.' },
      { q: 'When is the agency commission paid?', a: 'Usually when the preliminary or final contract is signed, as agreed. Always have the commission terms confirmed in writing.' },
    ],
    cta: { title: "Let's calculate it", accent: 'for your property', text: 'Send me a link to a house you like and I will show you what costs come on top of the price.', label: 'Open the cost calculator' },
  },
  'domy-za-1-euro-jak-to-je-doopravdy': {
    slug: 'houses-for-1-euro-in-italy-the-real-story',
    title: 'Houses for 1 euro in Italy: the real story',
    description: 'Houses for €1 in Italy are not free. What municipalities require, what renovation costs, the risks, and when an ordinary cheap property makes more sense.',
    category: 'Buying',
    imageAlt: 'Garden by a stone house in Abruzzo',
    summary: 'You really can buy a house for €1 in Italy, but you do not get a finished house for that price. The municipality obliges you to renovate within a deadline, put down a deposit and pay the notary and taxes. The total investment usually runs into tens of thousands of euros.',
    sections: [
      { id: 'what-it-is', h: 'What the €1 house scheme is', blocks: [
        { t: 'p', text: 'Several Italian municipalities, mostly small and depopulating villages, offer abandoned houses for a symbolic €1. The aim is not to sell property but to bring new residents and renovated houses back to the village. Each municipality sets its own terms; there is no nationwide programme.' },
      ] },
      { id: 'conditions', h: 'What municipalities usually require', blocks: [
        { t: 'ul', items: [
          'Submit a renovation project and obtain a building permit.',
          'Finish the renovation by a deadline, often within 1 to 3 years.',
          'Provide a deposit (bank or insurance guarantee), often a few thousand euros. It is returned once the works are complete.',
          'Pay the notary, taxes and transfer fees.',
          'In some municipalities, commit not to sell the house for a year or two.',
        ] },
        { t: 'p', text: 'Terms change. Always check the current rules directly with the municipality before you respond to any offer.' },
      ] },
      { id: 'real-costs', h: 'What it really costs', blocks: [
        { t: 'table', head: ['Item', 'Indicative amount'], rows: [
          ['Purchase price', '€1'],
          ['Notary, taxes and fees', 'a few thousand euros'],
          ['Project and surveyor', 'thousands of euros'],
          ['Deposit (refundable after completion)', 'often €2,000 to €5,000'],
          ['Renovation', 'tens of thousands of euros, usually more for houses in old stone centres'],
        ], note: NOTE },
        { t: 'p', text: 'These houses are often unused for decades: the roof, structure, utilities and windows frequently need a complete overhaul. Renovation is therefore usually more expensive than buying a smaller house in usable condition.' },
      ] },
      { id: 'risks', h: 'Risks people overlook', blocks: [
        { t: 'ul', items: [
          'Location. Villages tend to be remote, with few services, poorer connections and low interest from future buyers or tenants.',
          'Ownership. An old house may have several co-owners or an unsettled inheritance.',
          'Deadlines. A construction delay can cost you the deposit.',
          'Remote management. You handle the build, tradespeople and authorities from afar and in Italian.',
          'Availability. Offers change quickly and many villages have already ended the scheme.',
        ] },
      ] },
      { id: 'who-for', h: 'Who it suits and what else to consider', blocks: [
        { t: 'p', text: 'A €1 house suits people who want a renovation project, have time and budget, and are drawn to the village itself. As a cheap route to a holiday flat by the sea or an investment, it is mostly not a good fit.' },
        { t: 'p', text: 'If your aim is to live there or rent out, it often works out better to buy a smaller flat or house in usable condition near the coast and services, or a property that needs only light renovation. You can find concrete options in Abruzzo in the property listings and the overview of locations.' },
      ] },
    ],
    faq: [
      { q: 'Is a €1 house really €1?', a: 'The purchase price is €1, but notary, taxes, project, deposit and above all the renovation come on top. The total investment runs into tens of thousands of euros.' },
      { q: 'Can a foreigner buy a €1 house?', a: 'Usually yes; the municipality sets the terms. An Italian tax code (codice fiscale) and a commitment to renovate by a deadline are typically required.' },
      { q: 'Are there €1 houses in Abruzzo?', a: 'The schemes are fragmented across Italy and change quickly. Always check current offers directly with the municipality concerned.' },
      { q: 'Is a €1 house worth it as an investment?', a: 'Usually not. A remote location and high renovation costs often mean a lower return than a property in a more accessible area.' },
    ],
    cta: { title: 'Looking for a cheaper', accent: 'property to renovate?', text: 'Tell me your budget and plans. I will show you realistic options in Abruzzo, including what the renovation would cost.', label: 'Book a consultation' },
  },
  'codice-fiscale-pro-cechy-a-slovaky': {
    slug: 'codice-fiscale-how-to-get-it-when-buying-in-italy',
    title: 'Codice fiscale: how to get it and why you need it to buy',
    metaTitle: 'Codice fiscale for foreign buyers: how to get it',
    description: 'The codice fiscale is the Italian tax code you need to buy property or set up utilities. Where and how to get it as a Czech or Slovak citizen, what to bring and what it costs.',
    category: 'Buying',
    imageAlt: 'View of Pescara and the surrounding hills in Abruzzo',
    summary: 'The codice fiscale is a 16-character Italian tax code. Without it you cannot sign a purchase contract, set up utilities or open a bank account. Czech and Slovak citizens get it free of charge at the Agenzia delle Entrate in Italy, or through an Italian diplomatic mission.',
    sections: [
      { id: 'what-it-is', h: 'What the codice fiscale is for', blocks: [
        { t: 'p', text: 'The codice fiscale is the identification number of an individual for Italian authorities. You need it to buy property, switch utilities, open an account, take out insurance or be taxed on rental income. The notary requires it already when preparing the contract.' },
      ] },
      { id: 'how-to-get', h: 'How to get it', blocks: [
        { t: 'ul', items: [
          'In Italy, at a branch of the Agenzia delle Entrate. You usually receive it on the spot, often the same day.',
          'Through an Italian diplomatic mission. Czech and Slovak citizens should contact the Italian embassy in Prague or Bratislava; check the current procedure and deadlines.',
          'Through a representative. A person you authorise can apply for you. Check the required form of the power of attorney.',
        ] },
        { t: 'p', text: 'The application is made on the form for individuals provided by the office. The code is issued free of charge.' },
      ] },
      { id: 'what-to-bring', h: 'What to prepare', blocks: [
        { t: 'ul', items: [
          'A valid ID card or passport.',
          'The completed application form.',
          'Details of your place and date of birth and of your residence.',
          'If represented, a power of attorney and the representative’s ID.',
        ] },
        { t: 'callout', title: 'Get it before the viewings', text: 'You need the codice fiscale at the latest for the preliminary contract. Getting it does not take long, but leave yourself time so you are not hunting for it at the last minute.' },
      ] },
      { id: 'check', h: 'How to check the code is correct', blocks: [
        { t: 'p', text: 'The code has 16 characters, letters and digits, and is derived from your name, date of birth and place of birth. Check that your first name, surname and date of birth match your ID to avoid delays at the notary.' },
      ] },
    ],
    faq: [
      { q: 'Do I need a codice fiscale to buy property in Italy?', a: 'Yes. The notary needs it for the transfer, taxes and registration. You cannot buy property without it.' },
      { q: 'How much does a codice fiscale cost?', a: 'It is issued free of charge.' },
      { q: 'Do I have to go to Italy in person?', a: 'Not necessarily. You can apply through an Italian diplomatic mission or authorise a representative. Check the procedure and required documents in advance.' },
      { q: 'Is the codice fiscale the same as a tax ID?', a: 'It is the tax identification number of an individual in Italy. For Italian authorities and banks it works much like a personal tax number.' },
    ],
    cta: { title: "Don't want to handle", accent: 'the paperwork yourself?', text: 'I handle the codice fiscale, the notary and the documents with clients regularly. Let’s arrange a first, no-obligation call.', label: 'Arrange a call' },
  },
};
