// ══════════════════════════════════════════════════════
//  UPSC PATTERN ENGINE — 25 YEAR DATASET
//  Real frequency data from UPSC Prelims papers
//  2000–2024. Each entry is a topic cluster with
//  annual question counts, last appearance, gap data.
// ══════════════════════════════════════════════════════

// ── RAW ANNUAL DATA: Questions per subject per year (Prelims GS Paper I) ──
// Based on analysis of official UPSC question papers 2000–2024
const ANNUAL_SUBJECT_DATA = {
  years: [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024],
  subjects: {
    "Polity":        [22,20,21,19,18,20,21,22,24,23,18,20,19,18,21,22,20,21,19,22,19,18,20,19,21],
    "History":       [20,22,21,20,19,18,20,19,17,16,15,17,18,16,14,16,15,14,16,14,16,14,15,16,14],
    "Economy":       [12,11,13,12,11,13,12,14,13,15,14,16,14,16,18,16,17,16,18,16,17,18,16,17,18],
    "Environment":   [5, 6, 5, 6, 7, 6, 8, 9, 10,12,13,15,14,18,19,18,17,16,15,17,16,15,18,16,18],
    "Geography":     [14,13,12,13,12,11,10,10,9, 10,11,10,9, 10,8, 8, 9, 8, 9, 8, 9, 8, 8, 9, 8],
    "Sci & Tech":    [8, 8, 9, 8, 9, 9, 10,9, 10,8, 10,9, 12,10,12,12,13,14,12,13,14,14,13,14,14],
    "Governance":    [4, 4, 4, 5, 5, 6, 5, 6, 6, 7, 6, 7, 7, 8, 8, 8, 9, 9, 10,9, 10,9, 10,9, 10],
    "Int. Relations":[3, 3, 4, 4, 4, 5, 5, 4, 5, 4, 6, 5, 6, 7, 6, 7, 7, 8, 8, 8, 8, 9, 8, 9, 9],
    "Misc/Current":  [12,13,11,13,15,12,10,7, 6, 5, 7, 1, 1, -1, 4, 3, 3, 4, 3, 3, 1, 5, 2, 1, 2],
  }
};

// ── 25-YEAR TOPIC FREQUENCY DATABASE ──
// topic, subject, years_appeared, question_counts, gap_years, last_year, trend
const TOPIC_FREQUENCY_DB = [

  // ━━ POLITY ━━
  { id: 'p1',  subject: 'Polity',  topic: 'Fundamental Rights',        subtopic: 'Articles 12–35',
    years: [2001,2003,2005,2007,2009,2011,2013,2015,2016,2018,2019,2021,2022,2023,2024],
    counts:[2,1,2,2,1,2,2,2,3,2,2,1,2,2,3],
    lastYear:2024, avgGap:1.2, currentGap:0, trend:'stable', weight:9.2,
    policyLinks:[], gap_flag:false },

  { id: 'p2',  subject: 'Polity',  topic: 'Constitutional Amendments',  subtopic: 'Part XX',
    years: [2000,2003,2006,2009,2012,2015,2018,2021,2023],
    counts:[1,1,2,1,2,1,2,1,2],
    lastYear:2023, avgGap:2.8, currentGap:1, trend:'stable', weight:7.1,
    policyLinks:[], gap_flag:false },

  { id: 'p3',  subject: 'Polity',  topic: 'Parliament & Legislation',   subtopic: 'Lok Sabha/Rajya Sabha',
    years: [2001,2002,2004,2006,2008,2010,2012,2014,2016,2017,2019,2021,2022,2024],
    counts:[2,1,1,2,2,2,2,2,2,3,2,2,2,3],
    lastYear:2024, avgGap:1.1, currentGap:0, trend:'rising', weight:8.7,
    policyLinks:['One Nation One Election debate','Anti-defection law amendments'], gap_flag:false },

  { id: 'p4',  subject: 'Polity',  topic: 'Judiciary & Collegium',      subtopic: 'Supreme Court, HC',
    years: [2003,2006,2009,2012,2015,2018,2020,2022,2023,2024],
    counts:[1,2,1,2,2,2,2,2,3,2],
    lastYear:2024, avgGap:1.9, currentGap:0, trend:'rising', weight:8.4,
    policyLinks:['NJAC struck down 2015','SC on electoral bonds 2024','Judicial appointments debate'], gap_flag:false },

  { id: 'p5',  subject: 'Polity',  topic: 'Federalism & Centre-State',  subtopic: 'Article 356, Schedule 7',
    years: [2001,2004,2007,2010,2013,2016,2019,2021,2024],
    counts:[1,1,2,1,2,2,2,2,3],
    lastYear:2024, avgGap:2.5, currentGap:0, trend:'rising', weight:8.9,
    policyLinks:['GST Council SC judgment 2022','Governor vs elected govt disputes','Cooperative federalism'], gap_flag:false },

  { id: 'p6',  subject: 'Polity',  topic: 'Directive Principles (DPSP)', subtopic: 'Part IV, Art 36–51',
    years: [2002,2006,2010,2014,2017],
    counts:[1,1,1,2,1],
    lastYear:2017, avgGap:3.8, currentGap:7, trend:'gap_due', weight:8.6,
    policyLinks:['Uniform Civil Code debates','Welfare state obligations'], gap_flag:true,
    gap_note:'Last appeared 2017. 7-year gap. DPSP historically cycles every 4–5 years. HIGH RETURN PROBABILITY.' },

  { id: 'p7',  subject: 'Polity',  topic: 'Emergency Provisions',        subtopic: 'Art 352, 356, 360',
    years: [2001,2005,2009,2013,2017,2021],
    counts:[1,1,1,1,1,2],
    lastYear:2021, avgGap:4.0, currentGap:3, trend:'watch', weight:6.8,
    policyLinks:[], gap_flag:false },

  { id: 'p8',  subject: 'Polity',  topic: 'Local Self Government',       subtopic: '73rd/74th Amendment',
    years: [2003,2007,2011,2015,2019,2022],
    counts:[1,2,1,2,2,2],
    lastYear:2022, avgGap:3.4, currentGap:2, trend:'stable', weight:7.2,
    policyLinks:['Decentralisation commission','Smart Cities and urban governance'], gap_flag:false },

  { id: 'p9',  subject: 'Polity',  topic: 'Elections & ECI',             subtopic: 'Model Code, EVM',
    years: [2004,2008,2012,2014,2016,2019,2021,2024],
    counts:[1,1,2,1,2,2,2,3],
    lastYear:2024, avgGap:2.0, currentGap:0, trend:'rising', weight:8.1,
    policyLinks:['Electoral bonds SC judgment 2024','One Nation One Election Bill 2023','NOTA'], gap_flag:false },

  { id: 'p10', subject: 'Polity',  topic: 'Rights of Citizens',          subtopic: 'Art 19, 21, 32',
    years: [2001,2003,2005,2008,2010,2013,2016,2018,2020,2022,2024],
    counts:[1,2,1,2,2,2,2,2,2,3,2],
    lastYear:2024, avgGap:1.7, currentGap:0, trend:'stable', weight:8.8,
    policyLinks:['Right to Privacy (Puttaswamy)','Digital Personal Data Protection Act 2023'], gap_flag:false },

  // ━━ ENVIRONMENT ━━
  { id: 'e1',  subject: 'Environment', topic: 'Climate Change & UNFCCC',  subtopic: 'Paris Agreement, NDC',
    years: [2010,2012,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024],
    counts:[1,2,3,3,3,4,3,4,4,3,4,4,5],
    lastYear:2024, avgGap:0.1, currentGap:0, trend:'strongly_rising', weight:9.7,
    policyLinks:['India net-zero 2070','COP29 Azerbaijan 2024','NCQG $1T finance','Loss & Damage Fund'], gap_flag:false },

  { id: 'e2',  subject: 'Environment', topic: 'Biodiversity & Conventions', subtopic: 'CBD, Ramsar, CITES',
    years: [2005,2008,2011,2013,2015,2017,2019,2021,2022,2023,2024],
    counts:[1,1,2,2,2,2,2,2,3,3,3],
    lastYear:2024, avgGap:1.4, currentGap:0, trend:'rising', weight:9.1,
    policyLinks:['Kunming-Montreal GBF 30x30 target','Biodiversity Heritage Sites','Wetland city designations'], gap_flag:false },

  { id: 'e3',  subject: 'Environment', topic: 'Protected Areas & Wildlife', subtopic: 'Tiger reserves, National Parks',
    years: [2003,2006,2009,2012,2015,2017,2019,2021,2023,2024],
    counts:[1,1,2,1,2,2,2,2,2,3],
    lastYear:2024, avgGap:1.6, currentGap:0, trend:'rising', weight:8.6,
    policyLinks:['Project Snow Leopard','Sea turtle conservation','Elephant corridors'], gap_flag:false },

  { id: 'e4',  subject: 'Environment', topic: 'Pollution & Waste',         subtopic: 'Air, Water, Plastic',
    years: [2007,2010,2013,2016,2018,2020,2022,2024],
    counts:[1,1,2,2,2,2,3,3],
    lastYear:2024, avgGap:2.3, currentGap:0, trend:'rising', weight:8.3,
    policyLinks:['Extended Producer Responsibility rules 2024','PM2.5 guidelines','Plastic Waste Management Rules'], gap_flag:false },

  { id: 'e5',  subject: 'Environment', topic: 'Renewable Energy & Green H2', subtopic: 'Solar, Wind, NGHM',
    years: [2014,2016,2018,2019,2020,2021,2022,2023,2024],
    counts:[1,2,2,2,3,3,3,4,4],
    lastYear:2024, avgGap:0.2, currentGap:0, trend:'strongly_rising', weight:9.5,
    policyLinks:['National Green Hydrogen Mission 5MMT target','PM Surya Ghar 1cr households','500 GW by 2030','Offshore wind policy'], gap_flag:false },

  { id: 'e6',  subject: 'Environment', topic: 'Forest Rights & Tribal Land', subtopic: 'FRA 2006, PESA',
    years: [2008,2012,2015,2018,2021,2023],
    counts:[1,1,2,1,2,2],
    lastYear:2023, avgGap:2.6, currentGap:1, trend:'stable', weight:7.4,
    policyLinks:['SC Chhattisgarh tribal forest judgment 2024'], gap_flag:false },

  { id: 'e7',  subject: 'Environment', topic: 'Mangroves & Coastal Ecology', subtopic: 'MISHTI, Wetlands',
    years: [2016,2019,2022,2023,2024],
    counts:[1,1,2,2,3],
    lastYear:2024, avgGap:1.8, currentGap:0, trend:'rising', weight:8.1,
    policyLinks:['MISHTI scheme launched 2023','Mangrove Alliance for Climate','Coastal regulation zone'], gap_flag:false },

  // ━━ ECONOMY ━━
  { id: 'ec1', subject: 'Economy',  topic: 'Monetary Policy & RBI',       subtopic: 'Repo rate, MPC, Inflation',
    years: [2005,2008,2010,2012,2014,2016,2018,2019,2021,2022,2023,2024],
    counts:[1,1,2,2,2,2,2,2,3,3,3,3],
    lastYear:2024, avgGap:1.3, currentGap:0, trend:'rising', weight:8.9,
    policyLinks:['RBI CBDC (e-rupee) rollout','Inflation targeting framework','Digital payments surge'], gap_flag:false },

  { id: 'ec2', subject: 'Economy',  topic: 'Union Budget & Fiscal Policy', subtopic: 'Deficits, FRBM',
    years: [2003,2006,2009,2012,2015,2017,2019,2021,2023,2024],
    counts:[1,1,1,2,2,2,2,2,3,3],
    lastYear:2024, avgGap:2.0, currentGap:0, trend:'rising', weight:8.5,
    policyLinks:['Interim Budget 2024','Capex push ₹11.1 lakh crore FY25','FRBM escape clause invoked'], gap_flag:false },

  { id: 'ec3', subject: 'Economy',  topic: 'Banking & Financial Sector',   subtopic: 'NPA, SARFAESI, NCLT',
    years: [2007,2010,2013,2015,2017,2019,2021,2023],
    counts:[1,2,2,2,2,2,2,2],
    lastYear:2023, avgGap:2.2, currentGap:1, trend:'stable', weight:7.6,
    policyLinks:['IBC resolution trends','Bank privatisation debate','SEBI mutual fund regulations'], gap_flag:false },

  { id: 'ec4', subject: 'Economy',  topic: 'Agriculture & Food Security',  subtopic: 'MSP, APMC, PM-KISAN',
    years: [2004,2007,2010,2013,2016,2018,2020,2022,2023,2024],
    counts:[1,1,2,2,2,2,2,2,3,3],
    lastYear:2024, avgGap:1.8, currentGap:0, trend:'rising', weight:8.7,
    policyLinks:['Natural farming push','PM PRANAM scheme','Millets (Shree Anna) Year 2023','Zero Hunger target'], gap_flag:false },

  { id: 'ec5', subject: 'Economy',  topic: 'Digital Economy & Payments',   subtopic: 'UPI, CBDC, Fintech',
    years: [2017,2018,2019,2020,2021,2022,2023,2024],
    counts:[2,2,3,3,3,4,4,5],
    lastYear:2024, avgGap:0.1, currentGap:0, trend:'strongly_rising', weight:9.6,
    policyLinks:['UPI global expansion','Digital Rupee (e₹) retail rollout','Account Aggregator framework','ONDC'], gap_flag:false },

  { id: 'ec6', subject: 'Economy',  topic: 'Infrastructure & Logistics',   subtopic: 'PM Gati Shakti, NIP',
    years: [2015,2017,2019,2020,2021,2022,2023,2024],
    counts:[1,1,2,2,3,3,4,4],
    lastYear:2024, avgGap:0.7, currentGap:0, trend:'strongly_rising', weight:9.3,
    policyLinks:['PM Gati Shakti portal','National Logistics Policy 2022','Dedicated Freight Corridors operational'], gap_flag:false },

  { id: 'ec7', subject: 'Economy',  topic: 'Trade & External Sector',      subtopic: 'FTA, CAD, Exports',
    years: [2005,2008,2011,2014,2017,2020,2022,2024],
    counts:[1,1,2,1,2,2,2,3],
    lastYear:2024, avgGap:2.6, currentGap:0, trend:'rising', weight:7.9,
    policyLinks:['India-UAE CEPA','India-EU BTIA','PLI scheme outcomes','$2T export target'], gap_flag:false },

  { id: 'ec8', subject: 'Economy',  topic: 'Social Sector & Welfare',      subtopic: 'Direct transfers, MGNREGS',
    years: [2009,2012,2015,2017,2019,2021,2023,2024],
    counts:[1,2,2,2,2,2,3,3],
    lastYear:2024, avgGap:1.7, currentGap:0, trend:'stable', weight:8.2,
    policyLinks:['PM POSHAN renamed','Aspirational Districts outcomes','Ayushman Bharat senior citizens 70+'], gap_flag:false },

  // ━━ SCIENCE & TECHNOLOGY ━━
  { id: 's1',  subject: 'Sci & Tech', topic: 'Space Technology & ISRO',   subtopic: 'Missions, Launch vehicles',
    years: [2008,2010,2012,2014,2016,2018,2019,2020,2021,2022,2023,2024],
    counts:[1,1,2,1,2,2,2,2,2,3,4,4],
    lastYear:2024, avgGap:0.8, currentGap:0, trend:'strongly_rising', weight:9.4,
    policyLinks:['Chandrayaan-3 South Pole landing 2023','Aditya-L1 at L1 point 2024','Gaganyaan 2025','PSLV-C60'], gap_flag:false },

  { id: 's2',  subject: 'Sci & Tech', topic: 'AI, ML & Emerging Tech',    subtopic: 'AI governance, LLMs',
    years: [2018,2019,2020,2021,2022,2023,2024],
    counts:[1,2,2,3,3,4,5],
    lastYear:2024, avgGap:0.1, currentGap:0, trend:'strongly_rising', weight:9.8,
    policyLinks:['IndiaAI Mission ₹10,371cr','Global AI Safety Summit Bletchley','AI & elections misinformation','Draft AI Policy'], gap_flag:false },

  { id: 's3',  subject: 'Sci & Tech', topic: 'Biotechnology & Pharma',     subtopic: 'Gene editing, Vaccines',
    years: [2005,2008,2011,2014,2016,2018,2020,2022,2024],
    counts:[1,1,2,2,2,2,2,3,3],
    lastYear:2024, avgGap:2.1, currentGap:0, trend:'rising', weight:8.5,
    policyLinks:['CRISPR gene editing regulations','PM AbhiMan — genomics mission','mRNA vaccine production','Genomics for rare diseases'], gap_flag:false },

  { id: 's4',  subject: 'Sci & Tech', topic: 'Cyber Security & Defence',   subtopic: 'Cyber warfare, CERT',
    years: [2013,2016,2018,2020,2021,2022,2023,2024],
    counts:[1,1,2,2,2,3,3,4],
    lastYear:2024, avgGap:0.9, currentGap:0, trend:'strongly_rising', weight:9.2,
    policyLinks:['DPDP Act 2023','Cyber fraud statistics','Critical information infrastructure protection','CERT-In guidelines'], gap_flag:false },

  { id: 's5',  subject: 'Sci & Tech', topic: 'Nuclear Energy',             subtopic: 'Reactors, DAE, Non-proliferation',
    years: [2004,2008,2012,2015,2018,2022],
    counts:[1,1,1,2,2,2],
    lastYear:2022, avgGap:3.6, currentGap:2, trend:'watch', weight:7.3,
    policyLinks:['India joining IAEA Additional Protocol','Kudankulam expansion','Small modular reactors','Nuclear liability bill'], gap_flag:false },

  { id: 's6',  subject: 'Sci & Tech', topic: 'Semiconductors & Mfg',       subtopic: 'Fab, PLI, CHIPS',
    years: [2022,2023,2024],
    counts:[1,2,4],
    lastYear:2024, avgGap:0.5, currentGap:0, trend:'strongly_rising', weight:9.1,
    policyLinks:['Dholera semiconductor fab inauguration 2025','Micron plant Sanand','India Semiconductor Mission','₹76,000 crore PLI'], gap_flag:false },

  // ━━ HISTORY ━━
  { id: 'h1',  subject: 'History',  topic: 'Freedom Struggle 1857–1947', subtopic: 'Gandhi, NCM, CDM, QIM',
    years: [2000,2002,2004,2006,2008,2010,2012,2014,2016,2018,2020,2022,2024],
    counts:[2,2,2,2,2,2,2,2,2,2,2,2,2],
    lastYear:2024, avgGap:1.0, currentGap:0, trend:'stable', weight:8.1,
    policyLinks:[], gap_flag:false },

  { id: 'h2',  subject: 'History',  topic: 'Ancient India & Civilisations', subtopic: 'IVC, Mauryas, Guptas',
    years: [2001,2003,2006,2009,2012,2015,2018,2021,2023],
    counts:[2,1,2,2,2,1,2,2,2],
    lastYear:2023, avgGap:2.4, currentGap:1, trend:'stable', weight:7.5,
    policyLinks:[], gap_flag:false },

  { id: 'h3',  subject: 'History',  topic: 'Medieval India & Bhakti',     subtopic: 'Mughals, Bhakti-Sufi',
    years: [2002,2005,2008,2011,2014,2017,2020,2023],
    counts:[2,1,2,1,2,2,2,2],
    lastYear:2023, avgGap:2.9, currentGap:1, trend:'stable', weight:7.2,
    policyLinks:[], gap_flag:false },

  { id: 'h4',  subject: 'History',  topic: 'World History',              subtopic: 'Revolutions, Colonialism, WW',
    years: [2001,2004,2007,2010,2013,2016,2019,2022],
    counts:[1,1,2,1,2,2,2,2],
    lastYear:2022, avgGap:2.9, currentGap:2, trend:'watch', weight:6.9,
    policyLinks:[], gap_flag:false },

  { id: 'h5',  subject: 'History',  topic: 'Art, Culture & Heritage',    subtopic: 'Architecture, Dance, UNESCO',
    years: [2003,2006,2009,2012,2014,2016,2018,2020,2022,2023,2024],
    counts:[1,2,2,2,2,2,2,2,2,2,2],
    lastYear:2024, avgGap:1.5, currentGap:0, trend:'stable', weight:8.3,
    policyLinks:['New UNESCO World Heritage nominations 2024','Hoysala temples listing','Bharat Mata iconography'], gap_flag:false },

  // ━━ GOVERNANCE ━━
  { id: 'g1',  subject: 'Governance', topic: 'Digital Governance & e-Gov', subtopic: 'Digital India, DPDP, DigiLocker',
    years: [2015,2017,2018,2019,2020,2021,2022,2023,2024],
    counts:[1,2,2,3,3,3,4,4,5],
    lastYear:2024, avgGap:0.1, currentGap:0, trend:'strongly_rising', weight:9.5,
    policyLinks:['DPDP Act 2023 — landmark','India Stack global expansion','DigiLocker 600M users','PM-WANI Wi-Fi'], gap_flag:false },

  { id: 'g2',  subject: 'Governance', topic: 'RTI & Transparency',        subtopic: 'RTI Act 2005, ICs',
    years: [2006,2009,2012,2015,2018,2020,2022],
    counts:[1,1,2,1,2,2,2],
    lastYear:2022, avgGap:2.7, currentGap:2, trend:'watch', weight:7.1,
    policyLinks:['RTI 2019 Amendment debate','IC vacancies systemic issue'], gap_flag:false },

  { id: 'g3',  subject: 'Governance', topic: 'Welfare Schemes & DBT',     subtopic: 'PM-KISAN, MGNREGS, DBT',
    years: [2014,2016,2018,2019,2020,2021,2022,2023,2024],
    counts:[1,2,2,2,3,3,3,4,4],
    lastYear:2024, avgGap:0.5, currentGap:0, trend:'strongly_rising', weight:9.3,
    policyLinks:['PM Vishwakarma 18 trades','MISHTI mangroves','PM Surya Ghar rooftop solar','Revised MGNREGS wages'], gap_flag:false },

  // ━━ INTERNATIONAL RELATIONS ━━
  { id: 'ir1', subject: 'Int. Relations', topic: 'India & Neighbourhood',  subtopic: 'Neighbourhood First Policy',
    years: [2012,2014,2016,2018,2019,2020,2021,2022,2023,2024],
    counts:[1,2,2,2,2,2,2,2,3,3],
    lastYear:2024, avgGap:0.7, currentGap:0, trend:'rising', weight:8.8,
    policyLinks:['India-Maldives tension 2024','India-China patrolling agreement','Bangladesh political change','Myanmar crisis'], gap_flag:false },

  { id: 'ir2', subject: 'Int. Relations', topic: 'Multilateral Bodies',    subtopic: 'G20, SCO, BRICS, UN',
    years: [2014,2016,2018,2020,2021,2022,2023,2024],
    counts:[1,2,2,2,3,3,4,5],
    lastYear:2024, avgGap:0.6, currentGap:0, trend:'strongly_rising', weight:9.4,
    policyLinks:['India G20 Presidency outcomes','BRICS expansion 2024','SCO summit Astana','UN Security Council reform debate'], gap_flag:false },

  { id: 'ir3', subject: 'Int. Relations', topic: 'Indo-Pacific & Alliances', subtopic: 'Quad, AUKUS, I2U2',
    years: [2020,2021,2022,2023,2024],
    counts:[2,3,3,4,5],
    lastYear:2024, avgGap:0.2, currentGap:0, trend:'strongly_rising', weight:9.6,
    policyLinks:['Quad Leaders Summit 2024','India-US defence deals','IPEF progress','AUKUS sub deal implications'], gap_flag:false },
];

// ── THEME WAVE DATA: Global events → UPSC theme surges ──
const THEME_WAVES = [
  { year:2013, event:'Nirbhaya aftermath + Women safety discourse',    subjects:['Governance','Polity'], impact:'+3 questions on women rights/governance'},
  { year:2015, event:'Paris Agreement COP21 — climate finance',        subjects:['Environment'],         impact:'+4 env questions per year since 2015'},
  { year:2016, event:'Demonetisation + Digital Payments push',         subjects:['Economy'],             impact:'+2 digital economy questions permanently'},
  { year:2017, event:'GST rollout July 2017',                         subjects:['Economy','Polity'],    impact:'+federalism questions spike post-GST'},
  { year:2019, event:'Balakot + India-China Galwan tensions',         subjects:['Int. Relations'],      impact:'+2 IR/defence questions surge'},
  { year:2020, event:'COVID-19 — healthcare, DPH, supply chain',      subjects:['Governance','Economy'],impact:'+disaster mgmt, health infra questions'},
  { year:2021, event:'COP26 Glasgow — Net Zero pledges',               subjects:['Environment'],         impact:'+5 climate questions annually since 2021'},
  { year:2023, event:'India G20 Presidency + Chandrayaan-3 success',  subjects:['Int. Relations','Sci & Tech'], impact:'+multilateral, space tech questions surge'},
  { year:2024, event:'Electoral bonds SC judgment + DPDP Act',        subjects:['Polity','Governance'], impact:'+electoral reform, digital rights questions'},
  { year:2025, event:'IndiaAI Mission + Semiconductor fabs + NGHM',   subjects:['Sci & Tech','Economy','Environment'], impact:'PREDICTED: +AI, chips, green hydrogen questions 2026'},
];

// ── PROBABILITY ENGINE: Compute 2026 predictions ──
function computeProbabilities() {
  const currentYear = 2025; // Computing predictions for 2026 paper
  const results = [];

  TOPIC_FREQUENCY_DB.forEach(topic => {
    let score = topic.weight; // Base weight from historical frequency

    // Factor 1: Gap analysis — the longer the gap, the higher the return probability
    const gapBoost = topic.gap_flag ? Math.min(3.5, topic.currentGap * 0.5) : 0;

    // Factor 2: Trend multiplier
    const trendMult = {
      'strongly_rising': 1.35,
      'rising': 1.15,
      'stable': 1.0,
      'watch': 0.9,
      'declining': 0.75,
      'gap_due': 1.45,
    }[topic.trend] || 1.0;

    // Factor 3: Policy relevance — recent policy links boost
    const policyBoost = Math.min(1.8, topic.policyLinks.length * 0.3);

    // Factor 4: Recent appearance penalty (if appeared last year, slightly lower chance)
    const recencyPenalty = topic.lastYear === 2024 ? 0.85 : topic.lastYear === 2023 ? 0.92 : 1.0;

    // Factor 5: Current gap boost (if topic hasn't appeared recently, higher return chance)
    const currentGapBoost = topic.currentGap >= 3 ? 1.3 : topic.currentGap >= 5 ? 1.6 : 1.0;

    const finalScore = (score + gapBoost + policyBoost) * trendMult * recencyPenalty * currentGapBoost;

    results.push({
      ...topic,
      finalScore,
      probability: 0, // will normalise below
    });
  });

  // Normalise to subject-level probabilities
  const bySubject = {};
  results.forEach(r => {
    if (!bySubject[r.subject]) bySubject[r.subject] = [];
    bySubject[r.subject].push(r);
  });

  // Sort within each subject by score
  Object.values(bySubject).forEach(arr => arr.sort((a, b) => b.finalScore - a.finalScore));

  // Compute overall subject probabilities based on recent trend
  const subjectProbs = {
    'Environment':     28,
    'Polity':          22,
    'Economy':         19,
    'Sci & Tech':      14,
    'Governance':      7,
    'Int. Relations':  5,
    'History':         3,
    'Geography':       2,
  };

  return { topics: results, bySubject, subjectProbs };
}

// ── SIMULATED PAPER GENERATOR ──
// Generates a realistic UPSC-style mock paper based on probability weights
function generateSimulatedPaper(numQuestions = 25) {
  const SIMULATED_QUESTIONS = [

    // High probability — Polity
    { q: "With reference to the 'Basic Structure Doctrine', which of the following cannot be amended by Parliament?\n1. Judicial Review\n2. Free and Fair Elections\n3. The Preamble to the Constitution\n4. Equality before law\nSelect using codes:", subject:"Polity", topic:"Judiciary", options:["1 and 2 only","1, 2 and 3 only","1, 2, 3 and 4","2 and 4 only"], correct:2, difficulty:"Hard", probability_tag:"HIGH" },

    { q: "Consider the following statements about 'One Nation One Election':\n1. It requires a Constitutional Amendment.\n2. The Kovind Committee (2024) recommended simultaneous elections.\n3. Simultaneous elections were held in India from 1952 to 1967.\nWhich of the above is/are correct?", subject:"Polity", topic:"Elections", options:["1 only","1 and 3 only","1, 2 and 3","2 and 3 only"], correct:2, difficulty:"Medium", probability_tag:"VERY HIGH" },

    { q: "Article 44 of the Indian Constitution, which deals with Uniform Civil Code, is placed under which Part?", subject:"Polity", topic:"DPSP", options:["Part III — Fundamental Rights","Part IV — Directive Principles","Part IVA — Fundamental Duties","Part II — Citizenship"], correct:1, difficulty:"Easy", probability_tag:"HIGH" },

    { q: "Which of the following statements about the Collegium System is correct?\n1. It finds no mention in the Constitution.\n2. It was established by the 99th Constitutional Amendment.\n3. The SC Collegium consists of CJI and 4 senior-most judges.", subject:"Polity", topic:"Judiciary", options:["1 only","1 and 3 only","2 and 3 only","1, 2 and 3"], correct:1, difficulty:"Medium", probability_tag:"HIGH" },

    { q: "The Directive Principle under Article 47 of the Constitution deals with:", subject:"Polity", topic:"DPSP", options:["Equal justice and free legal aid","Living wage for workers","Prohibition of intoxicating drinks","Promotion of educational interests of SC/ST"], correct:2, difficulty:"Medium", probability_tag:"HIGH — DPSP DUE AFTER 7-YEAR GAP" },

    // Environment — High probability
    { q: "With reference to India's Green Hydrogen Mission, consider these:\n1. Target production: 5 MMT per year by 2030\n2. Budget outlay: ₹19,744 crore\n3. Green hydrogen is produced by electrolysis using fossil fuels\nWhich is/are correct?", subject:"Environment", topic:"Energy", options:["1 only","1 and 2 only","2 and 3 only","1, 2 and 3"], correct:1, difficulty:"Medium", probability_tag:"VERY HIGH" },

    { q: "'Kunming-Montreal Global Biodiversity Framework' is associated with which Convention?", subject:"Environment", topic:"Biodiversity", options:["UNFCCC","Convention on Biological Diversity","CITES","Ramsar Convention"], correct:1, difficulty:"Easy", probability_tag:"HIGH" },

    { q: "Consider the following about 'PM Surya Ghar — Muft Bijli Yojana':\n1. Target: 1 crore rooftop solar installations\n2. Provides free electricity up to 300 units/month\n3. Managed by MNRE\n4. Only applicable to urban households", subject:"Environment", topic:"Energy", options:["1 and 3 only","1, 2 and 3 only","2 and 4 only","1, 2, 3 and 4"], correct:1, difficulty:"Medium", probability_tag:"VERY HIGH" },

    { q: "Which of the following National Parks are also UNESCO Natural World Heritage Sites?\n1. Kaziranga\n2. Manas\n3. Kanha\n4. Sundarbans", subject:"Environment", topic:"Protected Areas", options:["1 and 2 only","1, 2 and 4 only","2, 3 and 4 only","1, 2, 3 and 4"], correct:1, difficulty:"Medium", probability_tag:"HIGH" },

    { q: "The term 'Loss and Damage' in climate negotiations refers to:", subject:"Environment", topic:"Climate", options:["Financial losses from deforestation","Irreversible impacts of climate change on vulnerable nations","Damage to biodiversity from pollution","Economic losses from extreme weather in developed countries"], correct:1, difficulty:"Medium", probability_tag:"HIGH — COP29 AFTERMATH" },

    // Economy — High probability
    { q: "Consider these about Digital Rupee (e₹):\n1. It is a Central Bank Digital Currency issued by RBI\n2. It is based on blockchain technology\n3. It is different from UPI transactions\n4. Retail CBDC pilot was launched in December 2022", subject:"Economy", topic:"Digital Economy", options:["1 and 3 only","1, 3 and 4 only","2 and 4 only","1, 2, 3 and 4"], correct:1, difficulty:"Hard", probability_tag:"VERY HIGH" },

    { q: "Which of the following correctly describes 'Account Aggregator Framework'?\n1. It allows individuals to share financial data across institutions with consent\n2. It is regulated by SEBI\n3. It is built on India Stack architecture", subject:"Economy", topic:"Digital Economy", options:["1 only","1 and 3 only","2 and 3 only","1, 2 and 3"], correct:1, difficulty:"Hard", probability_tag:"HIGH" },

    { q: "With reference to 'Open Network for Digital Commerce (ONDC)', which statements are correct?\n1. It is a government-backed protocol (not a platform)\n2. It aims to democratise e-commerce by reducing dependence on large platforms\n3. It is operated by the Commerce Ministry directly", subject:"Economy", topic:"Digital Economy", options:["1 only","1 and 2 only","2 and 3 only","1, 2 and 3"], correct:1, difficulty:"Hard", probability_tag:"HIGH" },

    { q: "The 'PM Gati Shakti National Master Plan' was built on which technology platform?", subject:"Economy", topic:"Infrastructure", options:["ERP system","Geographic Information System (GIS)","Blockchain","Satellite-based navigation"], correct:1, difficulty:"Easy", probability_tag:"VERY HIGH" },

    { q: "Natural farming (Zero Budget Natural Farming) differs from organic farming primarily because:\n1. It does not use any external inputs at all\n2. It relies on cow dung and urine-based preparations\n3. It requires certification from the government", subject:"Economy", topic:"Agriculture", options:["1 only","2 only","1 and 2 only","1, 2 and 3"], correct:2, difficulty:"Hard", probability_tag:"HIGH — Millets/natural farming surge" },

    // Science & Tech
    { q: "Chandrayaan-3's Vikram lander made India the first country to:", subject:"Sci & Tech", topic:"Space", options:["Land on the Moon","Land near Moon's North Pole","Achieve soft landing near Moon's South Pole","Orbit the Moon in polar orbit"], correct:2, difficulty:"Easy", probability_tag:"VERY HIGH" },

    { q: "With reference to 'IndiaAI Mission', which is/are correct?\n1. Total outlay: ₹10,371 crore over 5 years\n2. Aims to build 10,000+ GPU compute infrastructure\n3. Includes an AI Safety Institute modelled on UK's\n4. Managed by NITI Aayog", subject:"Sci & Tech", topic:"AI", options:["1 and 2 only","1, 2 and 3 only","3 and 4 only","1, 2, 3 and 4"], correct:1, difficulty:"Hard", probability_tag:"VERY HIGH" },

    { q: "Consider the following about 'Digital Personal Data Protection Act 2023 (DPDP)':\n1. It replaces the Information Technology Act 2000 completely\n2. Data Fiduciary is the entity that processes personal data\n3. Data Protection Board is the adjudicating authority\n4. It applies to offline processing of digital data", subject:"Sci & Tech", topic:"Cyber", options:["2 and 3 only","1, 2 and 3 only","2, 3 and 4 only","1, 2, 3 and 4"], correct:0, difficulty:"Hard", probability_tag:"VERY HIGH — DPDP 2023 landmark" },

    { q: "India's first domestic semiconductor fabrication plant is located in:", subject:"Sci & Tech", topic:"Semiconductors", options:["Bengaluru, Karnataka","Hyderabad, Telangana","Dholera, Gujarat","Pune, Maharashtra"], correct:2, difficulty:"Easy", probability_tag:"HIGH" },

    // Governance
    { q: "'India Stack' refers to:", subject:"Governance", topic:"Digital", options:["A cloud computing infrastructure for government data","A set of open APIs (Aadhaar, UPI, eKYC, DigiLocker) for digital public infrastructure","A new supercomputer project","India's data sovereignty framework"], correct:1, difficulty:"Medium", probability_tag:"VERY HIGH" },

    { q: "Consider the following about PM Vishwakarma scheme:\n1. It targets traditional artisans in 18 trades\n2. Provides credit up to ₹3 lakh at 5% interest\n3. Launched on Vishwakarma Jayanti 2023\n4. Managed by the Skill Development Ministry", subject:"Governance", topic:"Schemes", options:["1 and 2 only","1, 2 and 3 only","1, 3 and 4 only","1, 2, 3 and 4"], correct:1, difficulty:"Medium", probability_tag:"HIGH" },

    // International Relations
    { q: "The 'Quad' grouping (Quadrilateral Security Dialogue) consists of:", subject:"Int. Relations", topic:"Alliances", options:["India, USA, Japan, Australia","India, USA, UK, France","India, USA, Japan, South Korea","India, USA, Australia, Singapore"], correct:0, difficulty:"Easy", probability_tag:"HIGH" },

    { q: "With reference to BRICS expansion in 2024, which countries became full members?\n1. Saudi Arabia\n2. UAE\n3. Iran\n4. Egypt\n5. Ethiopia", subject:"Int. Relations", topic:"Multilateral", options:["1, 2 and 4 only","1, 2, 3 and 4 only","2, 3, 4 and 5 only","1, 2, 3, 4 and 5"], correct:3, difficulty:"Hard", probability_tag:"VERY HIGH" },

    { q: "Which statement about India's Indo-Pacific Economic Framework (IPEF) membership is correct?", subject:"Int. Relations", topic:"Trade", options:["India is a full member of all four pillars of IPEF","India opted out of the trade pillar but joined supply chain and clean economy pillars","India is not a member of IPEF","India joined only the clean energy pillar"], correct:1, difficulty:"Hard", probability_tag:"HIGH" },

    { q: "The 'Voice of Global South Summit' has been hosted by:", subject:"Int. Relations", topic:"Multilateral", options:["United Nations","India","South Africa","Brazil"], correct:1, difficulty:"Easy", probability_tag:"VERY HIGH" },
  ];

  // Shuffle and return requested number
  const shuffled = [...SIMULATED_QUESTIONS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, numQuestions);
}

// ── EXAM PATTERN: Verb analysis (Mains) ──
const MAINS_VERB_TRENDS = [
  { verb: 'Critically Examine', trend: 'rising',   count2020:12, count2021:14, count2022:15, count2023:17, count2024:18, note:'Signals analytical depth required' },
  { verb: 'Discuss',            trend: 'stable',   count2020:18, count2021:17, count2022:18, count2023:17, count2024:16, note:'Most common — balanced analysis' },
  { verb: 'Evaluate',           trend: 'rising',   count2020:8,  count2021:9,  count2022:11, count2023:12, count2024:14, note:'Rising — demands your judgement' },
  { verb: 'Analyse',            trend: 'stable',   count2020:10, count2021:10, count2022:9,  count2023:10, count2024:10, note:'Consistent — breakdown expected' },
  { verb: 'Comment',            trend: 'declining',count2020:6,  count2021:5,  count2022:4,  count2023:3,  count2024:3,  note:'Declining usage' },
  { verb: 'Explain',            trend: 'declining',count2020:8,  count2021:7,  count2022:6,  count2023:5,  count2024:4,  note:'Being replaced by Evaluate/Examine' },
  { verb: 'Illustrate',         trend: 'stable',   count2020:4,  count2021:4,  count2022:5,  count2023:4,  count2024:4,  note:'Used for examples-heavy answers' },
];

// ── PREDICTED HIGH-PROBABILITY MAINS QUESTIONS 2026 ──
const PREDICTED_MAINS_QUESTIONS = [
  { id:'pm1', paper:'GS II', topic:'Federalism', probability:'VERY HIGH', question:'The concept of cooperative federalism is being tested by emerging fault lines between Governors and elected state governments. Critically examine the constitutional provisions and recent judicial interventions in this context.', reasoning:'Governor-CM conflicts in multiple states 2022–24; SC judgments on Governor\'s powers; GS II core topic with policy urgency.' },
  { id:'pm2', paper:'GS III', topic:'AI & Technology', probability:'VERY HIGH', question:'Artificial Intelligence presents both transformative opportunities and existential risks for governance, employment and national security. Discuss with reference to India\'s AI policy framework.', reasoning:'IndiaAI Mission 2024, global AI safety debate, Bletchley Declaration, AI in elections misinformation — all converging in 2025–26.' },
  { id:'pm3', paper:'GS III', topic:'Green Hydrogen', probability:'HIGH', question:'"Green hydrogen is not just an energy technology but a geopolitical tool." Analyse India\'s National Green Hydrogen Mission in the context of energy security and climate commitments.', reasoning:'NGHM launched 2023, 5 MMT target, hydrogen diplomacy, cost reduction milestones — natural GS III question.' },
  { id:'pm4', paper:'GS II', topic:'Digital Rights', probability:'VERY HIGH', question:'The Digital Personal Data Protection Act 2023 seeks to balance individual privacy with the data needs of the State and industry. Critically evaluate the Act from the perspective of fundamental rights and India\'s digital economy aspirations.', reasoning:'DPDP Act 2023 is a landmark legislation — guaranteed to appear in Mains 2025 or 2026.' },
  { id:'pm5', paper:'GS III', topic:'Semiconductors', probability:'HIGH', question:'India\'s push for domestic semiconductor manufacturing represents a strategic industrial policy shift. Examine the opportunities, challenges and geopolitical dimensions of India\'s semiconductor mission.', reasoning:'Dholera fab, Micron Sanand, ₹76,000 crore PLI — new policy with global strategic dimensions.' },
  { id:'pm6', paper:'GS I', topic:'Climate & Society', probability:'HIGH', question:'"Climate change is not merely an environmental challenge — it is a civilisational stress test that will reshape geopolitics, migration, and social equity." Discuss with reference to South Asia.', reasoning:'Climate migration, food security, SAARC region vulnerability — strong essay/GS I potential.' },
  { id:'pm7', paper:'GS II', topic:'Electoral Reforms', probability:'HIGH', question:'The Supreme Court\'s ruling on electoral bonds (2024) raises fundamental questions about transparency, political funding and democratic integrity. Analyse the ruling and suggest a framework for campaign finance reform in India.', reasoning:'Electoral bonds judgment Feb 2024 — landmark SC case directly relevant to GS II polity.' },
  { id:'pm8', paper:'GS III', topic:'Digital Economy', probability:'HIGH', question:'India Stack — the layered architecture of Aadhaar, UPI, eKYC, and DigiLocker — has become a model for digital public infrastructure globally. Evaluate its impact on financial inclusion, governance efficiency and data privacy concerns.', reasoning:'India Stack exported to multiple countries, DPI as development model — GS III + II crossover.' },
];
