// ── GOVERNMENT SCHEMES ──
const SCHEMES_DATA = [
  { name: "PM-KISAN", year: 2019, ministry: "Agriculture & Farmers Welfare", objective: "Income support of ₹6,000/yr to small & marginal farmers in 3 instalments", beneficiaries: "~11 crore farm families", budget: "₹60,000 cr", type: "Central", category: "Agriculture", tags: ["Farmers", "Direct Benefit Transfer"] },
  { name: "Jal Jeevan Mission", year: 2019, ministry: "Jal Shakti", objective: "Provide functional household tap connections to every rural household by 2024", beneficiaries: "19.2 crore rural households", budget: "₹3.6 lakh cr (2019-24)", type: "CSS", category: "Welfare", tags: ["Water", "Rural", "WASH"] },
  { name: "PM Vishwakarma", year: 2023, ministry: "MSME", objective: "Holistic support to artisans in 18 traditional trades: recognition, skill, credit, market linkage", beneficiaries: "30 lakh artisans (phase 1)", budget: "₹13,000 cr (5 years)", type: "Central", category: "Skill", tags: ["Artisans", "Skill", "MSMEs"] },
  { name: "MISHTI", year: 2023, ministry: "Environment, Forest & Climate Change", objective: "Mangrove Initiative for Shoreline Habitats & Tangible Incomes — restore mangroves along coastline", beneficiaries: "9 coastal states + 2 UTs", budget: "₹900 cr", type: "CSS", category: "Environment", tags: ["Mangroves", "Coastal", "Biodiversity"] },
  { name: "PM Surya Ghar", year: 2024, ministry: "New & Renewable Energy", objective: "1 crore households to get rooftop solar, free up to 300 units/month electricity", beneficiaries: "1 crore households (target)", budget: "₹75,021 cr", type: "Central", category: "Energy", tags: ["Solar", "Rooftop", "Electricity"] },
  { name: "PM POSHAN (MDM)", year: 2021, ministry: "Education", objective: "Mid-day meal nutrition for government school students (renamed from Mid-Day Meal Scheme)", beneficiaries: "11.8 crore children", budget: "₹12,467 cr", type: "CSS", category: "Education", tags: ["Nutrition", "Children", "School"] },
  { name: "Ayushman Bharat PM-JAY", year: 2018, ministry: "Health & Family Welfare", objective: "Health insurance of ₹5 lakh/year per family for secondary & tertiary hospitalisation", beneficiaries: "10.74 crore families (~50 crore)", budget: "₹7,200 cr", type: "CSS", category: "Health", tags: ["Health Insurance", "Poor", "Hospitals"] },
  { name: "PM Awas Yojana (Gramin)", year: 2016, ministry: "Rural Development", objective: "Affordable housing for rural BPL households — ₹1.2 lakh (plains) / ₹1.3 lakh (hills)", beneficiaries: "2.95 crore houses (Phase 1 & 2)", budget: "₹1.3 lakh cr", type: "CSS", category: "Housing", tags: ["Housing", "Rural", "BPL"] },
  { name: "PM Awas Yojana (Urban)", year: 2015, ministry: "Housing & Urban Affairs", objective: "Housing for all in urban areas by 2022 — EWS/LIG/MIG beneficiaries", beneficiaries: "1.2 crore urban houses sanctioned", budget: "₹2 lakh cr+ (total)", type: "CSS", category: "Housing", tags: ["Housing", "Urban", "Affordable"] },
  { name: "National Health Mission", year: 2013, ministry: "Health & Family Welfare", objective: "Universal healthcare access in rural (NRHM) and urban (NUHM) areas", beneficiaries: "Pan India rural + urban population", budget: "₹36,785 cr", type: "CSS", category: "Health", tags: ["Healthcare", "Rural", "Maternal Health"] },
  { name: "MGNREGS", year: 2005, ministry: "Rural Development", objective: "Guarantee 100 days of unskilled wage employment per year to rural households", beneficiaries: "Pan India rural households", budget: "₹86,000 cr", type: "Central", category: "Employment", tags: ["Employment Guarantee", "Rural", "Wages"] },
  { name: "Pradhan Mantri Fasal Bima Yojana", year: 2016, ministry: "Agriculture", objective: "Crop insurance with low premium rates — kharif 2%, rabi 1.5%, horticulture 5%", beneficiaries: "Farming community", budget: "₹15,978 cr", type: "CSS", category: "Agriculture", tags: ["Crop Insurance", "Farmers", "Risk"] },
  { name: "Startup India", year: 2016, ministry: "DPIIT (Commerce)", objective: "Tax benefits, easier compliance, fund of funds for Indian startups", beneficiaries: "100,000+ DPIIT-recognised startups", budget: "₹10,000 cr (Fund of Funds)", type: "Central", category: "Economy", tags: ["Startups", "Innovation", "Entrepreneurship"] },
  { name: "Make in India", year: 2014, ministry: "DPIIT (Commerce)", objective: "Transform India into global manufacturing hub — 25 sectors targeted", beneficiaries: "Manufacturing sector & workers", budget: "Multiple schemes", type: "Central", category: "Economy", tags: ["Manufacturing", "FDI", "Employment"] },
  { name: "Digital India", year: 2015, ministry: "Electronics & IT", objective: "Three pillars: digital infrastructure, digital services, digital literacy", beneficiaries: "1.4 billion citizens", budget: "₹1.13 lakh cr (Phase 2)", type: "Central", category: "Technology", tags: ["Digital", "Connectivity", "e-Governance"] },
  { name: "PM KISAN Samman Nidhi", year: 2019, ministry: "Agriculture", objective: "₹6,000/year direct income support via DBT to land-holding farmers", beneficiaries: "11 crore farmers", budget: "₹60,000 cr", type: "Central", category: "Agriculture", tags: ["DBT", "Farmers", "Income Support"] },
  { name: "Swachh Bharat Mission", year: 2014, ministry: "Housing & Urban Affairs / Jal Shakti", objective: "Open defecation free India + solid waste management (urban & rural)", beneficiaries: "Pan India", budget: "₹62,009 cr (2.0 urban)", type: "Central", category: "Sanitation", tags: ["Sanitation", "ODF", "Hygiene"] },
  { name: "UDAN (RCS)", year: 2016, ministry: "Civil Aviation", objective: "Regional Connectivity Scheme — affordable airfares for tier 2/3 cities", beneficiaries: "Small city flyers", budget: "₹4,500 cr", type: "Central", category: "Transport", tags: ["Aviation", "Regional", "Connectivity"] },
  { name: "PM Jan Dhan Yojana", year: 2014, ministry: "Finance", objective: "Financial inclusion — zero balance bank accounts, RuPay debit card, insurance", beneficiaries: "53+ crore account holders", budget: "Ongoing", type: "Central", category: "Finance", tags: ["Financial Inclusion", "Banking", "DBT"] },
  { name: "Aspirational Districts Programme", year: 2018, ministry: "NITI Aayog", objective: "Rapid transformation of 112 most underdeveloped districts in health, education, livelihoods", beneficiaries: "112 districts across 28 states", budget: "Convergence approach", type: "Central", category: "Development", tags: ["Districts", "Development", "Convergence"] }
];

const SCHEME_CATEGORIES = ["All", "Agriculture", "Welfare", "Health", "Education", "Environment", "Energy", "Housing", "Employment", "Economy", "Technology", "Finance", "Sanitation", "Transport", "Development", "Skill"];

// ── REVISION TOPICS ──
const REVISION_TOPICS = [
  { id: 1, topic: "Fundamental Rights — Articles 12–35", subject: "Polity", paper: "GS II", studied: "2026-02-05", revisions: [0, 7, 14], urgency: "overdue", nextRevision: "Overdue by 3 days" },
  { id: 2, topic: "Monetary Policy Instruments — RBI Toolkit", subject: "Economy", paper: "GS III", studied: "2026-02-24", revisions: [0, 7], urgency: "due", nextRevision: "Due today · Day 7" },
  { id: 3, topic: "Green Climate Fund & UNFCCC Framework", subject: "Environment", paper: "GS III", studied: "2026-03-06", revisions: [0], urgency: "due", nextRevision: "Due today · Day 1" },
  { id: 4, topic: "Directive Principles — Articles 36–51", subject: "Polity", paper: "GS II", studied: "2026-02-10", revisions: [0, 7, 30, 90], urgency: "fresh", nextRevision: "Next in 23 days" },
  { id: 5, topic: "Indus Valley Civilisation — Key Sites & Features", subject: "History", paper: "GS I", studied: "2026-03-01", revisions: [0, 7], urgency: "fresh", nextRevision: "Next in 4 days" },
  { id: 6, topic: "Western Disturbances & Indian Monsoon System", subject: "Geography", paper: "GS I", studied: "2026-03-01", revisions: [0], urgency: "fresh", nextRevision: "Next in 6 days" },
  { id: 7, topic: "Union Budget — Types of Deficits", subject: "Economy", paper: "GS III", studied: "2026-02-20", revisions: [0, 7, 30], urgency: "overdue", nextRevision: "Overdue by 5 days" },
  { id: 8, topic: "Bhakti & Sufi Movements", subject: "History", paper: "GS I", studied: "2026-02-28", revisions: [0, 7], urgency: "fresh", nextRevision: "Next in 5 days" },
  { id: 9, topic: "Environmental Conventions (Ramsar, CITES, Basel)", subject: "Environment", paper: "GS III", studied: "2026-02-15", revisions: [0, 7], urgency: "overdue", nextRevision: "Overdue by 2 days" },
  { id: 10, topic: "Parliamentary Procedures — Bills & Committees", subject: "Polity", paper: "GS II", studied: "2026-03-03", revisions: [0], urgency: "fresh", nextRevision: "Next in 4 days" },
  { id: 11, topic: "Agriculture — MSP, APMC, Reforms", subject: "Economy", paper: "GS III", studied: "2026-03-05", revisions: [0], urgency: "due", nextRevision: "Due today · Day 2" },
  { id: 12, topic: "Panchayati Raj — 73rd & 74th Amendments", subject: "Governance", paper: "GS II", studied: "2026-02-12", revisions: [0, 7, 30], urgency: "fresh", nextRevision: "Next in 15 days" }
];

// ── MAINS QUESTIONS ──
const MAINS_QUESTIONS = [
  {
    id: 1, paper: "GS II", topic: "Federalism", marks: 15, words: 250, time: 20,
    question: "\"The principle of cooperative federalism, though constitutionally implicit, has found expression primarily through political accommodation rather than institutional design.\" Critically examine with reference to Finance Commission, GST Council, and NITI Aayog.",
    structure: [
      { num: "01", head: "Introduction (30–40w)", detail: "Define cooperative federalism + constitutional basis (Art. 263, 280, 279A)" },
      { num: "02", head: "Finance Commission", detail: "Art. 280 mandate · vertical/horizontal devolution · limits of FC recommendations" },
      { num: "03", head: "GST Council", detail: "Art. 279A · weighted voting · SC ruling 2022 on recommendatory nature" },
      { num: "04", head: "NITI Aayog", detail: "Replaced Planning Commission · advisory role · Governing Council · no fiscal powers" },
      { num: "05", head: "Critical Analysis", detail: "Political will vs structural guarantees · Inter-State Council dormancy · Sarkaria Commission" },
      { num: "06", head: "Conclusion (20–30w)", detail: "Forward-looking · institutional reform suggestion · cite Granville Austin or Ambedkar" }
    ],
    keywords: ["Article 263", "7th Schedule", "Asymmetric federalism", "Concurrent List", "Punchhi Commission", "GST SC 2022", "Cooperative federalism", "Fiscal federalism"]
  },
  {
    id: 2, paper: "GS III", topic: "Environment & Climate", marks: 15, words: 250, time: 20,
    question: "\"India's climate ambition must be evaluated not just by its targets but by the structural transformation of its energy economy.\" In this context, analyse India's progress on renewable energy transition and the challenges that remain.",
    structure: [
      { num: "01", head: "Introduction (30–40w)", detail: "Context — India as 3rd largest emitter, also renewable champion · NDC commitments" },
      { num: "02", head: "Progress Made", detail: "500 GW target · current 175 GW+ RE · solar costs fallen 90% · ISTS waiver · ISA" },
      { num: "03", head: "Policy Architecture", detail: "PM Surya Ghar · NHGM · National Solar Mission · RPO · REC mechanism" },
      { num: "04", head: "Challenges", detail: "Grid integration · storage cost · land acquisition · DISCOM finances · supply chain · just transition" },
      { num: "05", head: "Way Forward", detail: "Green hydrogen · offshore wind · battery storage policy · ISTS expansion · green bonds" },
      { num: "06", head: "Conclusion", detail: "Structural transformation beyond capacity addition · energy security + climate + jobs trinity" }
    ],
    keywords: ["NDC", "500 GW", "ISTS waiver", "PM Surya Ghar", "NHGM", "ISA", "DISCOM", "Just transition", "Green hydrogen", "RPO"]
  },
  {
    id: 3, paper: "GS II", topic: "Governance", marks: 10, words: 150, time: 12,
    question: "\"The Right to Information Act has been a powerful tool but its implementation has remained uneven across India.\" Examine the challenges in effective implementation of RTI.",
    structure: [
      { num: "01", head: "Introduction (20–25w)", detail: "RTI Act 2005 — landmark transparency legislation · Section 4 proactive disclosure" },
      { num: "02", head: "Achievements", detail: "2 crore+ RTI applications annually · unearthed scams · citizen empowerment" },
      { num: "03", head: "Challenges", detail: "Pendency at ICs · deemed refusal · PIO appointments · RTI activists' safety · fee barriers" },
      { num: "04", head: "2019 Amendment Controversy", detail: "Changed tenure/salary of CIC — concerns about independence" },
      { num: "05", head: "Way Forward", detail: "Digital RTI portal · time-bound disposal · protection for activists · training PIOs" }
    ],
    keywords: ["Section 4", "PIO", "CIC", "Information Commission", "Proactive disclosure", "2019 Amendment", "Second ARC", "Accountability"]
  },
  {
    id: 4, paper: "GS I", topic: "Modern History", marks: 15, words: 250, time: 20,
    question: "\"Gandhi transformed Indian nationalism from an elite constitutional movement to a mass struggle by linking political freedom with social and economic justice.\" Evaluate this statement.",
    structure: [
      { num: "01", head: "Introduction (30–40w)", detail: "Pre-Gandhi nationalism — moderate constitutional approach of Gokhale/early Congress" },
      { num: "02", head: "Mass Mobilisation", detail: "Non-Cooperation (1920) · Civil Disobedience (1930) · Quit India (1942) — inclusion of peasants/workers" },
      { num: "03", head: "Social Dimension", detail: "Anti-untouchability · Harijan campaign · Hindu-Muslim unity · Khilafat" },
      { num: "04", head: "Economic Dimension", detail: "Swadeshi · khadi · salt satyagraha (anti-colonial economic symbolism) · village self-sufficiency" },
      { num: "05", head: "Limitations/Critiques", detail: "Ambedkar's critique · caste question not fully resolved · communal tensions" },
      { num: "06", head: "Conclusion", detail: "Gandhi's lasting contribution: gave moral and mass character to Indian nationalism" }
    ],
    keywords: ["Satyagraha", "Non-cooperation", "Civil Disobedience", "Khilafat", "Swadeshi", "Harijan", "Constructive programme", "Swaraj"]
  },
  {
    id: 5, paper: "GS IV", topic: "Ethics", marks: 10, words: 150, time: 12,
    question: "A district collector receives credible information that a popular local politician is involved in siphoning funds from a welfare scheme. The politician has strong political backing including from the ruling party. As the collector, what ethical dilemma do you face? How would you act?",
    structure: [
      { num: "01", head: "Introduction — Identify Dilemma", detail: "Conflict: public duty vs political pressure · Rule of law vs self-preservation" },
      { num: "02", head: "Stakeholder Analysis", detail: "Beneficiaries of welfare scheme · public trust · rule of law · political ecosystem" },
      { num: "03", head: "Ethical Frameworks", detail: "Deontological (duty to law) vs Consequentialist (outcomes) — both point to action" },
      { num: "04", head: "Course of Action", detail: "Document evidence · inform senior · refer to vigilance/anti-corruption · maintain process integrity" },
      { num: "05", head: "Conclusion", detail: "Constitutional morality over political convenience · Article 311 protection for honest officers" }
    ],
    keywords: ["Constitutional morality", "Public interest", "Integrity", "Accountability", "Whistleblower", "Article 311", "Nolan principles", "Civil service values"]
  }
];

// ── ESSAY PROMPTS ──
const ESSAY_PROMPTS = [
  { topic: "Technology and Democracy: Ally or Adversary?", category: "Technology & Society", hints: ["Social media misinformation", "Digital public sphere", "Surveillance capitalism", "Digital divide in democratic participation"] },
  { topic: "The river is the same, but the water is different — continuity and change in Indian civilisation", category: "Culture & Civilisation", hints: ["Continuity of cultural traditions", "Colonial rupture", "Constitutional values vs traditional norms", "Modernity and India"] },
  { topic: "Climate change is not an environmental problem — it is a civilisational one", category: "Environment", hints: ["Consumption patterns", "North-South equity", "CBDR principle", "Energy transition", "Lifestyle change"] },
  { topic: "Forests precede civilisations; deserts follow them", category: "Environment & History", hints: ["Deforestation and civilisation collapse", "India's forest policy", "Tribal rights", "Green GDP"] },
  { topic: "Education is the most powerful weapon you can use to change the world", category: "Education", hints: ["NEP 2020", "Quality vs access", "Skill India", "Digital education", "Social mobility"] },
  { topic: "The true measure of a nation's strength is how well it cares for its weakest members", category: "Welfare & Governance", hints: ["Social security architecture", "MGNREGS", "Ayushman Bharat", "Judicial activism for poor"] }
];

// ── SYLLABUS MAP DATA ──
const SYLLABUS_MAP = {
  "uniform civil code": { papers: ["Polity (GS II)", "Governance (GS II)", "Ethics (GS IV)", "Essay Paper"], description: "Rights of religious communities, Article 44 DPSP, secularism" },
  "ucc": { papers: ["Polity (GS II)", "Governance (GS II)", "Ethics (GS IV)", "Essay Paper"], description: "Rights of religious communities, Article 44 DPSP" },
  "carbon credits": { papers: ["Environment (GS III)", "Economy (GS III)", "International Relations (GS II)"], description: "Carbon markets, UNFCCC mechanisms, NDC" },
  "basic structure doctrine": { papers: ["Polity (GS II)"], description: "Kesavananda Bharati case, limits on constitutional amendment" },
  "gst": { papers: ["Economy (GS III)", "Governance (GS II)", "Polity — Federalism (GS II)"], description: "GST Council, Article 279A, fiscal federalism" },
  "climate change": { papers: ["Environment (GS III)", "International Relations (GS II)", "Essay Paper", "Science & Tech (GS III)"], description: "Paris Agreement, NDC, IPCC, Net Zero" },
  "federalism": { papers: ["Polity (GS II)", "Governance (GS II)", "GS II Mains"], description: "7th Schedule, Finance Commission, GST Council, cooperative federalism" },
  "artificial intelligence": { papers: ["Science & Tech (GS III)", "Ethics (GS IV)", "Economy (GS III)"], description: "AI regulation, IndiaAI Mission, ethical AI" },
  "poverty": { papers: ["Economy (GS III)", "Social Justice (GS II)", "Essay Paper"], description: "Multidimensional poverty, welfare schemes, trickle-down vs direct transfer" },
  "agriculture": { papers: ["Economy (GS III)", "GS III — Agriculture"], description: "MSP, APMC, crop insurance, organic farming, land reforms" },
  "judiciary": { papers: ["Polity (GS II)"], description: "Collegium system, judicial independence, PIL, access to justice" },
  "tribal rights": { papers: ["Social Justice (GS II)", "Environment (GS III)", "Polity (GS II)"], description: "Forest Rights Act, PESA, 5th & 6th Schedule areas" },
  "cryptocurrency": { papers: ["Economy (GS III)", "Science & Tech (GS III)", "Governance (GS II)"], description: "Digital currency, RBI CBDC, regulation challenges" },
  "nuclear energy": { papers: ["Science & Tech (GS III)", "Environment (GS III)", "International Relations (GS II)"], description: "Nuclear liability, NSG, India's nuclear doctrine" },
  "education": { papers: ["Social Justice (GS II)", "Essay Paper", "GS II — Governance"], description: "NEP 2020, Right to Education, skill development" }
};
