const NEWS_DATA = [
  {
    id: 1, tag: "Polity", tagClass: "tag-polity",
    cardClass: "polity",
    headline: "Supreme Court clarifies Article 21 scope in digital privacy cases",
    excerpt: "A 5-judge Constitution Bench rules that biometric data collection mandates must satisfy proportionality standard under the Puttaswamy framework. The verdict reinforces the 'three-pronged test' of legality, necessity, and proportionality for privacy infringement.",
    source: "The Hindu · PIB",
    badge: "Prelims + Mains", badgeClass: "badge-both",
    date: "Mar 7, 2026",
    prelims_points: ["Article 21 — Right to Life and Personal Liberty", "Puttaswamy judgment (2017) — Right to Privacy as fundamental right", "Proportionality test: legality, necessity, proportionality, procedural guarantee"],
    mains_angle: "Discuss the evolution of Right to Privacy in India with reference to recent judicial developments. How does the proportionality doctrine balance State surveillance with individual liberty?"
  },
  {
    id: 2, tag: "Economy", tagClass: "tag-economy",
    cardClass: "economy",
    headline: "RBI MPC holds repo rate at 6.25%, revises GDP growth forecast upward to 7.2%",
    excerpt: "The Monetary Policy Committee voted 4-2 to maintain the repo rate at 6.25% citing moderation in food inflation. Governor revised FY26 GDP growth forecast from 6.8% to 7.2%, citing robust service exports and urban consumption recovery.",
    source: "PIB · RBI",
    badge: "Prelims", badgeClass: "badge-prelims",
    date: "Mar 7, 2026",
    prelims_points: ["Repo rate: rate at which RBI lends to banks (currently 6.25%)", "MPC: 6 members (3 from RBI, 3 external) under Section 45ZB of RBI Act", "Inflation target: 4% ± 2% under FRBM framework"],
    mains_angle: "Examine the role of the Monetary Policy Committee in inflation targeting. How does the repo rate transmission mechanism affect growth and inflation?"
  },
  {
    id: 3, tag: "Environment", tagClass: "tag-environment",
    cardClass: "environment",
    headline: "India submits updated NDC with 500 GW non-fossil target ahead of COP31",
    excerpt: "India's revised Nationally Determined Contribution commits to 500 GW non-fossil energy capacity by 2030 and raises the carbon sink target to 3.5 billion tonnes CO₂ equivalent. The submission reinforces India's position as a responsible major emitter.",
    source: "PIB · UNFCCC",
    badge: "Prelims + Mains", badgeClass: "badge-both",
    date: "Mar 6, 2026",
    prelims_points: ["NDC: commitments under Paris Agreement 2015", "India's targets: 500 GW non-fossil, 45% emission intensity reduction vs 2005", "Net-zero target: 2070", "COP31 hosted by Brazil (Belém)"],
    mains_angle: "Analyse India's climate commitments in the context of the principle of 'common but differentiated responsibilities'. Is India doing enough?"
  },
  {
    id: 4, tag: "Int. Relations", tagClass: "tag-ir",
    cardClass: "ir",
    headline: "India-EU Free Trade Agreement enters final round — IPR and data localisation remain sticking points",
    excerpt: "The 10th negotiating round of the India-EU Bilateral Trade and Investment Agreement (BTIA) has concluded in Brussels. Sticking points remain on IPR protections for pharmaceuticals and data localisation norms. Both sides signal intent to conclude by Q4 2026.",
    source: "MEA · PRS",
    badge: "Mains", badgeClass: "badge-mains",
    date: "Mar 6, 2026",
    prelims_points: ["India-EU BTIA: negotiations paused 2013, resumed 2022", "EU is India's largest trading bloc (over $120 billion trade)", "Key issues: IPR, data localisation, government procurement, carbon border tax"],
    mains_angle: "What are the key contentious issues in India-EU trade negotiations? How can the agreement benefit India's services and pharma sectors?"
  },
  {
    id: 5, tag: "Sci & Tech", tagClass: "tag-science",
    cardClass: "science",
    headline: "DRDO successfully tests Agni-Prime II with indigenously developed composite motor casing",
    excerpt: "The Defence Research and Development Organisation successfully test-fired the Agni-Prime II (AP-2) intermediate-range ballistic missile from Abdul Kalam Island. The canisterised missile features dual-redundancy guidance and marks India's entry into precision-strike deterrence.",
    source: "PIB · DRDO",
    badge: "Prelims", badgeClass: "badge-prelims",
    date: "Mar 5, 2026",
    prelims_points: ["Agni series: Agni-I to Agni-V (ranges 700 km to 5000+ km)", "Agni-Prime: new generation, canisterised, lighter MRBM (1000–2000 km)", "Abdul Kalam Island (formerly Wheeler Island): DRDO test range, Odisha"],
    mains_angle: "Discuss India's missile development programme in the context of nuclear deterrence and strategic autonomy."
  },
  {
    id: 6, tag: "Governance", tagClass: "tag-polity",
    cardClass: "polity",
    headline: "Finance Committee recommends unified financial regulator merging SEBI, IRDAI, PFRDA oversight",
    excerpt: "The Parliamentary Standing Committee on Finance has recommended creating a unified Financial Sector Development Council with statutory powers, merging the oversight functions of SEBI, IRDAI, and PFRDA. The report cites regulatory arbitrage as a systemic risk.",
    source: "Rajya Sabha TV · PRS",
    badge: "Mains", badgeClass: "badge-mains",
    date: "Mar 5, 2026",
    prelims_points: ["SEBI: Securities and Exchange Board of India (statutory body, 1992)", "IRDAI: Insurance Regulatory and Development Authority of India", "PFRDA: Pension Fund Regulatory and Development Authority", "FSDC: Financial Stability and Development Council (existing, non-statutory)"],
    mains_angle: "Should India move towards a unified financial regulator? Discuss the pros and cons with reference to global examples like UK's FCA."
  },
  {
    id: 7, tag: "Economy", tagClass: "tag-economy",
    cardClass: "economy",
    headline: "India's merchandise exports cross $500 billion for second consecutive year",
    excerpt: "India's merchandise exports crossed the $500 billion mark for FY 2025-26, driven by engineering goods, pharmaceuticals, and textiles. Services exports separately touched $380 billion. The combined figure positions India as a major global trading nation.",
    source: "DGCI&S · Commerce Ministry",
    badge: "Prelims + Mains", badgeClass: "badge-both",
    date: "Mar 4, 2026",
    prelims_points: ["India's target: $2 trillion exports (goods + services) by 2030", "Top export items: Engineering goods, Petroleum products, Gems & Jewellery, Pharma", "Top export destination: USA, UAE, Netherlands"],
    mains_angle: "Analyse the composition and direction of India's exports. What structural reforms are needed to achieve the $2 trillion export target by 2030?"
  },
  {
    id: 8, tag: "Polity", tagClass: "tag-polity",
    cardClass: "polity",
    headline: "Centre tables Waqf (Amendment) Bill — minority rights groups raise constitutional concerns",
    excerpt: "The Waqf (Amendment) Bill proposes sweeping changes to the Waqf Act 1995, including inclusion of non-Muslim members in Waqf Boards and revised dispute resolution mechanisms. Constitutional validity challenges are expected on grounds of Article 26 (freedom of religious institutions).",
    source: "PRS · Rajya Sabha",
    badge: "Mains", badgeClass: "badge-mains",
    date: "Mar 4, 2026",
    prelims_points: ["Waqf: Islamic endowment of property for religious or charitable purposes", "Waqf Act 1995: governs management of waqf properties in India", "Article 26: freedom to manage religious affairs"],
    mains_angle: "Examine the Constitutional provisions related to religious minorities in India. How should the state balance administrative efficiency with minority rights?"
  },
  {
    id: 9, tag: "Environment", tagClass: "tag-environment",
    cardClass: "environment",
    headline: "NITI Aayog releases report on 'Mission LiFE' — Lifestyle for Environment indicators",
    excerpt: "A NITI Aayog report tracking India's Mission LiFE (Lifestyle for Environment) shows 34% of urban households have adopted at least two sustainable practices. The mission, launched in 2022, focuses on individual behaviour change for environmental sustainability.",
    source: "NITI Aayog · PIB",
    badge: "Prelims + Mains", badgeClass: "badge-both",
    date: "Mar 3, 2026",
    prelims_points: ["Mission LiFE launched Oct 2022 at COP27 by PM Modi", "Focuses on: saving water, saving energy, reducing single-use plastic, healthy lifestyles", "P3 (Pro Planet People) movement"],
    mains_angle: "How does Mission LiFE represent a departure from 'use and throw' culture? Discuss its relevance to India's climate commitments."
  },
  {
    id: 10, tag: "History", tagClass: "tag-polity",
    cardClass: "polity",
    headline: "150th birth anniversary of Bal Gangadhar Tilak — PM calls him 'true architect of Swaraj'",
    excerpt: "As India marks the 150th birth anniversary of Bal Gangadhar Tilak, historians debate his legacy in integrating mass mobilisation, cultural nationalism, and political agitation. His slogan 'Swaraj is my birthright' remains a cornerstone of India's freedom struggle narrative.",
    source: "PIB · The Hindu",
    badge: "Prelims + Mains", badgeClass: "badge-both",
    date: "Mar 3, 2026",
    prelims_points: ["Bal Gangadhar Tilak (1856–1920): Lokmanya Tilak", "Launched: Ganesh Chaturthi public celebrations, Shivaji festivals", "Newspaper: Kesari (Marathi), Mahratta (English)", "Home Rule League: founded 1916"],
    mains_angle: "Compare and contrast the political philosophies of Bal Gangadhar Tilak and Gopal Krishna Gokhale. How did their differences shape the Congress's approach to independence?"
  }
];
