const QUESTION_BANK = [
  // ── POLITY ──
  {
    id: 1, subject: "Polity", topic: "Fundamental Rights", difficulty: "Medium", year: "PYQ 2019", paper: "Prelims",
    question: "With reference to 'Doctrine of Basic Structure', consider the following statements:\n1. It was propounded in the Kesavananda Bharati case (1973).\n2. Parliament cannot amend any part of the Constitution under this doctrine.\n3. The Supreme Court acts as the guardian of the Basic Structure.",
    options: ["1 and 2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: 1,
    explanation: "Statement 1 is correct — Basic Structure doctrine emerged from Kesavananda Bharati (1973). Statement 2 is INCORRECT — Parliament CAN amend the Constitution but cannot destroy its basic features. Statement 3 is correct — the SC is the final arbiter. Hence 1 and 3 only is correct.",
    syllabus: "GS II → Polity → Constitutional Amendments"
  },
  {
    id: 2, subject: "Polity", topic: "Parliament", difficulty: "Easy", year: "PYQ 2021", paper: "Prelims",
    question: "Which of the following Bills cannot be introduced in the Rajya Sabha?",
    options: ["Ordinary Bill", "Constitutional Amendment Bill", "Money Bill", "Financial Bill"],
    correct: 2,
    explanation: "A Money Bill (Article 110) can ONLY be introduced in the Lok Sabha. It requires the Speaker's certification and the Rajya Sabha can only make recommendations (not amend). The Lok Sabha may or may not accept these recommendations.",
    syllabus: "GS II → Polity → Parliament"
  },
  {
    id: 3, subject: "Polity", topic: "Fundamental Rights", difficulty: "Hard", year: "PYQ 2020", paper: "Prelims",
    question: "Consider the following with reference to Article 32 of the Constitution:\n1. Dr. B.R. Ambedkar called it the 'Heart and Soul' of the Constitution.\n2. The right under Article 32 cannot be suspended even during a National Emergency.\n3. Only the Supreme Court can issue writs under Article 32.",
    options: ["1 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: 1,
    explanation: "Statement 1 is correct — Ambedkar called Art. 32 the heart and soul. Statement 2 is INCORRECT — Art. 32 can be suspended during National Emergency (Art. 359). Statement 3 is correct — Art. 32 writs are only by SC; High Courts issue writs under Art. 226. So 1 and 3 only is correct.",
    syllabus: "GS II → Polity → Fundamental Rights"
  },
  {
    id: 4, subject: "Polity", topic: "Federalism", difficulty: "Medium", year: "PYQ 2018", paper: "Prelims",
    question: "Which of the following are features of 'Cooperative Federalism' in India?\n1. GST Council with weighted voting\n2. Inter-State Council under Article 263\n3. NITI Aayog replacing Planning Commission\n4. Finance Commission recommendations",
    options: ["1 and 2 only", "1, 2 and 4 only", "2, 3 and 4 only", "1, 2, 3 and 4"],
    correct: 3,
    explanation: "All four are features. GST Council (Art. 279A) with weighted voting embodies cooperative federalism. Inter-State Council (Art. 263) facilitates coordination. NITI Aayog's Governing Council includes CMs. Finance Commission ensures fiscal federalism. Hence all 1, 2, 3 and 4.",
    syllabus: "GS II → Polity → Federalism"
  },
  {
    id: 5, subject: "Polity", topic: "DPSP", difficulty: "Easy", year: "PYQ 2022", paper: "Prelims",
    question: "The Directive Principles of State Policy (DPSPs) are contained in which Part of the Constitution?",
    options: ["Part III", "Part IV", "Part IVA", "Part V"],
    correct: 1,
    explanation: "DPSPs are in Part IV (Articles 36–51) of the Constitution. Part III contains Fundamental Rights. Part IVA contains Fundamental Duties (added by 42nd Amendment). Part V deals with the Union.",
    syllabus: "GS II → Polity → DPSP"
  },

  // ── ECONOMY ──
  {
    id: 6, subject: "Economy", topic: "Monetary Policy", difficulty: "Medium", year: "PYQ 2020", paper: "Prelims",
    question: "With reference to 'Repo Rate', which of the following statements is/are correct?\n1. It is the rate at which RBI lends short-term funds to commercial banks.\n2. An increase in repo rate makes borrowing cheaper for banks.\n3. Repo rate is a tool of monetary policy used to control inflation.",
    options: ["1 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
    correct: 1,
    explanation: "Statement 1 is correct — repo rate is the rate at which RBI lends to banks against government securities. Statement 2 is INCORRECT — an increase in repo rate makes borrowing MORE expensive. Statement 3 is correct — higher repo rate contracts money supply, reducing inflation. Hence 1 and 3 only.",
    syllabus: "GS III → Economy → Monetary Policy"
  },
  {
    id: 7, subject: "Economy", topic: "Budget", difficulty: "Hard", year: "PYQ 2019", paper: "Prelims",
    question: "Consider the following deficit concepts:\n1. Revenue Deficit = Revenue Expenditure − Revenue Receipts\n2. Fiscal Deficit = Total Expenditure − Total Receipts excluding borrowings\n3. Primary Deficit = Fiscal Deficit − Capital Expenditure\n4. Effective Revenue Deficit excludes grants for capital asset creation",
    options: ["1 and 2 only", "1, 2 and 4 only", "2, 3 and 4 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Statements 1, 2 and 4 are correct. Statement 3 is INCORRECT — Primary Deficit = Fiscal Deficit MINUS Interest Payments (not capital expenditure). Primary deficit shows borrowing needs excluding interest obligations. Effective Revenue Deficit (introduced in 2011-12) = Revenue Deficit minus grants for capital asset creation.",
    syllabus: "GS III → Economy → Union Budget"
  },
  {
    id: 8, subject: "Economy", topic: "GST", difficulty: "Medium", year: "PYQ 2021", paper: "Prelims",
    question: "Which of the following is/are correct about the GST Council?\n1. It is a constitutional body established under Article 279A.\n2. The Union Finance Minister chairs the GST Council.\n3. Decisions in the GST Council are taken by 3/4th weighted majority.\n4. State of Jammu & Kashmir was excluded from GST initially.",
    options: ["1 and 2 only", "1, 2 and 3 only", "2 and 4 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Statements 1, 2 and 3 are correct. J&K was NOT excluded from GST — it was included after passing its own GST Act in 2017. GST Council has weighted voting: Centre has 1/3 and States together have 2/3 of total votes. Decisions require 3/4th majority.",
    syllabus: "GS III → Economy → GST"
  },
  {
    id: 9, subject: "Economy", topic: "Banking", difficulty: "Easy", year: "2023", paper: "Prelims",
    question: "Which of the following is the full form of 'SARFAESI Act'?",
    options: [
      "Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act",
      "Securities and Regulated Financial Assets Enforcement System Interest Act",
      "Securitisation and Recovery of Financial Assets and Enforcement of Security Income Act",
      "Securities Regulation and Financial Assets Enforcement of Securities Income Act"
    ],
    correct: 0,
    explanation: "SARFAESI stands for Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002. It allows banks and financial institutions to recover non-performing assets (NPAs) without court intervention by enforcing security interests.",
    syllabus: "GS III → Economy → Banking"
  },
  {
    id: 10, subject: "Economy", topic: "International Trade", difficulty: "Medium", year: "PYQ 2020", paper: "Prelims",
    question: "With reference to 'Current Account Deficit (CAD)', which of the following is correct?",
    options: [
      "CAD occurs when imports of goods and services exceed exports",
      "CAD includes only merchandise trade deficit",
      "A CAD always indicates a weak economy",
      "CAD is measured as a percentage of fiscal deficit"
    ],
    correct: 0,
    explanation: "Current Account Deficit occurs when a country's total imports of goods, services, and transfers exceed its total exports. It includes merchandise trade, services trade, income, and current transfers. A CAD doesn't always mean a weak economy — developing countries often run CAD due to high investment needs.",
    syllabus: "GS III → Economy → External Sector"
  },

  // ── ENVIRONMENT ──
  {
    id: 11, subject: "Environment", topic: "Biodiversity", difficulty: "Medium", year: "PYQ 2022", paper: "Prelims",
    question: "With reference to 'Kunming-Montreal Global Biodiversity Framework', which statements are correct?\n1. It sets a target to protect 30% of land and oceans by 2030 (30x30 target).\n2. It was adopted at COP15 of the Convention on Biological Diversity.\n3. India was the first signatory to ratify the framework.",
    options: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: 1,
    explanation: "Statements 1 and 2 are correct. The 30x30 target and CBD COP15 adoption (Montreal, December 2022) are accurate. Statement 3 is INCORRECT — China, as the host of COP15, led the ratification. India was not the first signatory.",
    syllabus: "GS III → Environment → International Conventions"
  },
  {
    id: 12, subject: "Environment", topic: "Climate Change", difficulty: "Hard", year: "PYQ 2021", paper: "Prelims",
    question: "Consider the following about India's climate commitments:\n1. India's NDC target includes achieving 500 GW of non-fossil fuel energy capacity by 2030.\n2. India aims to reduce emissions intensity of GDP by 45% by 2030 compared to 2005 levels.\n3. Net-zero emissions target for India is 2070.\n4. India's carbon sink target is to create additional carbon sink of 2.5 to 3 billion tonnes of CO2 equivalent.",
    options: ["1 and 3 only", "2 and 4 only", "1, 2 and 3 only", "1, 2, 3 and 4"],
    correct: 3,
    explanation: "All four statements are correct as per India's updated NDC (2022) and long-term strategy. 500 GW non-fossil capacity by 2030, 45% emission intensity reduction vs 2005, net-zero by 2070, and 2.5-3 billion tonne carbon sink — all are official targets submitted to UNFCCC.",
    syllabus: "GS III → Environment → Climate Change"
  },
  {
    id: 13, subject: "Environment", topic: "Protected Areas", difficulty: "Easy", year: "PYQ 2019", paper: "Prelims",
    question: "Which of the following is/are UNESCO World Heritage Sites in India that are also Tiger Reserves?\n1. Kaziranga\n2. Sundarbans\n3. Manas\n4. Nagarhole",
    options: ["1 and 2 only", "1, 2 and 3 only", "2 and 3 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Kaziranga (Assam), Sundarbans (West Bengal), and Manas (Assam) are all both UNESCO World Heritage Sites AND Tiger Reserves. Nagarhole (Karnataka) is a Tiger Reserve but NOT a UNESCO World Heritage Site. Hence 1, 2 and 3 only.",
    syllabus: "GS III → Environment → Protected Areas"
  },
  {
    id: 14, subject: "Environment", topic: "Pollution", difficulty: "Medium", year: "2023", paper: "Prelims",
    question: "With reference to 'PM2.5' particles, which of the following is correct?",
    options: [
      "They have diameter less than 2.5 micrometres and can penetrate deep into lungs",
      "They are only produced by vehicular emissions",
      "PM2.5 level above 50 µg/m³ is considered 'Good' air quality",
      "They cannot cross the blood-brain barrier"
    ],
    correct: 0,
    explanation: "PM2.5 particles (diameter < 2.5 micrometres) are fine particulate matter that can penetrate deep into the lungs and even enter the bloodstream. Sources include vehicles, industries, crop burning, and construction. WHO guideline is 5 µg/m³ annual mean. Studies show PM2.5 can cross the blood-brain barrier.",
    syllabus: "GS III → Environment → Air Pollution"
  },
  {
    id: 15, subject: "Environment", topic: "International Conventions", difficulty: "Hard", year: "PYQ 2018", paper: "Prelims",
    question: "Which of the following pairs is/are correctly matched? (Convention — What it deals with)\n1. Ramsar Convention — Wetland conservation\n2. CITES — Trade in endangered species\n3. Basel Convention — Ozone layer protection\n4. Minamata Convention — Mercury pollution",
    options: ["1 and 2 only", "1, 2 and 4 only", "3 and 4 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Pairs 1, 2, and 4 are correctly matched. Pair 3 is INCORRECT — Basel Convention deals with hazardous waste management and trans-boundary movement. Ozone layer protection is governed by the Vienna Convention and Montreal Protocol. Hence 1, 2 and 4 only.",
    syllabus: "GS III → Environment → International Conventions"
  },

  // ── HISTORY ──
  {
    id: 16, subject: "History", topic: "Ancient India", difficulty: "Medium", year: "PYQ 2019", paper: "Prelims",
    question: "With reference to the Indus Valley Civilisation, which of the following statements is/are correct?\n1. The Great Bath was discovered at Mohenjo-daro.\n2. The 'Dancing Girl' bronze statue was found at Harappa.\n3. Lothal had a dockyard for maritime trade.\n4. The script of IVC has been fully deciphered.",
    options: ["1 and 3 only", "1, 2 and 3 only", "2 and 4 only", "1, 2, 3 and 4"],
    correct: 0,
    explanation: "Statement 1 correct — Great Bath at Mohenjo-daro. Statement 2 INCORRECT — Dancing Girl was found at Mohenjo-daro, not Harappa. Statement 3 correct — Lothal had a dockyard. Statement 4 INCORRECT — IVC script has NOT been deciphered yet. Hence 1 and 3 only.",
    syllabus: "GS I → History → Ancient India"
  },
  {
    id: 17, subject: "History", topic: "Medieval India", difficulty: "Hard", year: "PYQ 2021", paper: "Prelims",
    question: "Consider the following statements about the Bhakti Movement:\n1. Kabir was a disciple of Ramananda.\n2. Mirabai was associated with the Krishna bhakti tradition.\n3. Tukaram was a saint from Maharashtra.\n4. Chaitanya Mahaprabhu propagated Vaishnavism in South India.",
    options: ["1 and 2 only", "1, 2 and 3 only", "2, 3 and 4 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Statements 1, 2, and 3 are correct. Statement 4 is INCORRECT — Chaitanya Mahaprabhu (1486–1534) propagated Vaishnavism in Bengal and Odisha, not South India. South India's bhakti was propagated by Alvars (Vaishnavism) and Nayanmars (Shaivism) much earlier.",
    syllabus: "GS I → History → Medieval India"
  },
  {
    id: 18, subject: "History", topic: "Modern India", difficulty: "Easy", year: "PYQ 2020", paper: "Prelims",
    question: "The 'Poona Pact' of 1932 was signed between which of the following?",
    options: [
      "Mahatma Gandhi and Muhammad Ali Jinnah",
      "Mahatma Gandhi and B.R. Ambedkar",
      "Jawaharlal Nehru and B.R. Ambedkar",
      "B.R. Ambedkar and Sardar Patel"
    ],
    correct: 1,
    explanation: "The Poona Pact (September 1932) was signed between Mahatma Gandhi and B.R. Ambedkar. Gandhi was on a fast unto death opposing separate electorates for Depressed Classes in the Communal Award. The Pact replaced separate electorates with reserved seats in joint electorates.",
    syllabus: "GS I → History → Freedom Struggle"
  },
  {
    id: 19, subject: "History", topic: "Modern India", difficulty: "Medium", year: "PYQ 2022", paper: "Prelims",
    question: "With reference to the 'Non-Cooperation Movement' (1920–22), consider these statements:\n1. It was the first mass movement launched by Gandhi.\n2. The movement was withdrawn after the Chauri Chaura incident.\n3. Tilak's death in 1920 coincided with the launch of the movement.\n4. Khilafat movement merged with Non-Cooperation Movement.",
    options: ["1 and 2 only", "2 and 3 only", "2, 3 and 4 only", "1, 2, 3 and 4"],
    correct: 2,
    explanation: "Statements 2, 3 and 4 are correct. Statement 1 is INCORRECT — the Rowlatt Satyagraha (1919) and Champaran (1917) preceded the NCM. Bal Gangadhar Tilak died on August 1, 1920, same day Gandhi launched NCM. Chauri Chaura (February 1922) led Gandhi to suspend the movement.",
    syllabus: "GS I → History → Freedom Struggle"
  },
  {
    id: 20, subject: "History", topic: "World History", difficulty: "Medium", year: "PYQ 2018", paper: "Prelims",
    question: "Which of the following were causes of the French Revolution (1789)?\n1. Financial bankruptcy of the French state\n2. Social inequality under the Estates system\n3. Influence of Enlightenment ideas\n4. Defeat of France in the Seven Years' War",
    options: ["1 and 2 only", "1, 2 and 3 only", "2 and 4 only", "1, 2, 3 and 4"],
    correct: 3,
    explanation: "All four were causes. Financial bankruptcy (expensive wars, debt), social inequality (clergy/nobility vs commoners in three Estates), Enlightenment ideas (Voltaire, Rousseau on liberty and equality), and defeat in Seven Years' War (1756–63) which drained treasury — all contributed to the Revolution.",
    syllabus: "GS I → World History → Revolutions"
  },

  // ── GEOGRAPHY ──
  {
    id: 21, subject: "Geography", topic: "Physical Geography", difficulty: "Medium", year: "PYQ 2020", paper: "Prelims",
    question: "With reference to 'Western Disturbances', which of the following is correct?\n1. They originate over the Mediterranean Sea.\n2. They bring winter rainfall to northwestern India.\n3. They are extratropical cyclones.\n4. They are responsible for snowfall in the Himalayas.",
    options: ["1 and 2 only", "2 and 3 only", "1, 2 and 4 only", "1, 2, 3 and 4"],
    correct: 3,
    explanation: "All four statements are correct. Western Disturbances are extratropical cyclonic storms originating in the Mediterranean Sea. They travel eastward, picking up moisture from the Persian Gulf and Caspian Sea, bringing winter rain to northwest India (Punjab, Haryana, Delhi) and snowfall to the western Himalayas.",
    syllabus: "GS I → Geography → Indian Climate"
  },
  {
    id: 22, subject: "Geography", topic: "Economic Geography", difficulty: "Easy", year: "PYQ 2021", paper: "Prelims",
    question: "Which of the following Indian states share a border with Bangladesh?",
    options: [
      "West Bengal, Assam, Meghalaya, Tripura",
      "West Bengal, Assam, Meghalaya, Tripura, Mizoram",
      "West Bengal, Sikkim, Assam, Tripura",
      "West Bengal, Assam, Nagaland, Tripura, Mizoram"
    ],
    correct: 1,
    explanation: "Five Indian states share borders with Bangladesh: West Bengal, Assam, Meghalaya, Tripura, and Mizoram. Sikkim does NOT border Bangladesh. The 4,156 km Indo-Bangladesh border is the 5th longest land border in the world.",
    syllabus: "GS I → Geography → Political Geography"
  },
  {
    id: 23, subject: "Geography", topic: "Physical Geography", difficulty: "Hard", year: "PYQ 2019", paper: "Prelims",
    question: "Consider the following pairs: (Straits — Connects)\n1. Strait of Hormuz — Persian Gulf and Arabian Sea\n2. Strait of Malacca — Indian Ocean and South China Sea\n3. Bab-el-Mandeb — Red Sea and Gulf of Aden\n4. Strait of Gibraltar — Atlantic Ocean and Black Sea",
    options: ["1 and 3 only", "1, 2 and 3 only", "2 and 4 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Pairs 1, 2, and 3 are correctly matched. Pair 4 is INCORRECT — Strait of Gibraltar connects the Atlantic Ocean and the MEDITERRANEAN Sea, not the Black Sea. The Black Sea connects to the Mediterranean via the Bosphorus and Dardanelles straits.",
    syllabus: "GS I → Geography → World Geography"
  },

  // ── SCIENCE & TECHNOLOGY ──
  {
    id: 24, subject: "Science & Tech", topic: "Space", difficulty: "Medium", year: "2023", paper: "Prelims",
    question: "With reference to ISRO's missions, which of the following is correctly matched?\n1. Chandrayaan-3 — Soft landing near Moon's South Pole\n2. Aditya-L1 — Study of the Sun from L1 Lagrange point\n3. PSLV — Heavy lift rocket for geostationary satellites\n4. Gaganyaan — India's first crewed spaceflight mission",
    options: ["1 and 2 only", "1, 2 and 4 only", "2 and 3 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Statements 1, 2 and 4 are correct. Statement 3 is INCORRECT — PSLV (Polar Satellite Launch Vehicle) is a medium-lift rocket primarily for polar/sun-synchronous orbits. GSLV and LVM3 are used for geostationary satellites. Chandrayaan-3 (Aug 2023) made India the 4th country to land on Moon and 1st near South Pole.",
    syllabus: "GS III → Science & Technology → Space"
  },
  {
    id: 25, subject: "Science & Tech", topic: "Biotechnology", difficulty: "Hard", year: "PYQ 2021", paper: "Prelims",
    question: "With reference to 'mRNA vaccines', which of the following is/are correct?\n1. They introduce messenger RNA into the body to produce antigens.\n2. The mRNA integrates into the human genome.\n3. Covishield is an mRNA-based vaccine.\n4. mRNA vaccines can be designed faster than traditional vaccines.",
    options: ["1 and 4 only", "1, 3 and 4 only", "2 and 3 only", "1, 2, 3 and 4"],
    correct: 0,
    explanation: "Statements 1 and 4 are correct. Statement 2 is INCORRECT — mRNA does NOT integrate into the genome; it stays in cytoplasm and degrades. Statement 3 is INCORRECT — Covishield is an adenovirus-vector vaccine (by AstraZeneca/SII). Pfizer-BioNTech and Moderna are mRNA vaccines. mRNA vaccines can be designed very rapidly.",
    syllabus: "GS III → Science & Technology → Biotechnology"
  },
  {
    id: 26, subject: "Science & Tech", topic: "AI & Digital", difficulty: "Medium", year: "2024", paper: "Prelims",
    question: "With reference to 'Artificial Intelligence', consider these statements:\n1. Machine Learning is a subset of Artificial Intelligence.\n2. Deep Learning uses artificial neural networks with multiple layers.\n3. India's 'IndiaAI Mission' aims at building sovereign AI infrastructure.",
    options: ["1 only", "1 and 2 only", "2 and 3 only", "1, 2 and 3"],
    correct: 3,
    explanation: "All three statements are correct. ML is indeed a subset of AI (AI > ML > Deep Learning). Deep Learning uses multi-layer neural networks inspired by the human brain. IndiaAI Mission (approved 2024, ₹10,371 crore) aims to build compute infrastructure, data platforms, and AI applications for India.",
    syllabus: "GS III → Science & Technology → Emerging Technologies"
  },

  // ── GOVERNANCE ──
  {
    id: 27, subject: "Governance", topic: "RTI", difficulty: "Easy", year: "PYQ 2019", paper: "Prelims",
    question: "Which of the following information is EXEMPT under the Right to Information Act, 2005?",
    options: [
      "Information related to corruption and human rights violations",
      "Cabinet papers after decisions have been taken",
      "Information that would endanger life or physical safety of a person",
      "Information about public authority's budget allocation"
    ],
    correct: 2,
    explanation: "Under Section 8 of RTI Act, information that would endanger life or physical safety of any person is exempt. Cabinet papers ARE accessible after decisions are taken (Section 8(1)(i) provides partial protection). Corruption/human rights violations can be disclosed. Budget allocations of public authorities are accessible.",
    syllabus: "GS II → Governance → RTI"
  },
  {
    id: 28, subject: "Governance", topic: "Panchayati Raj", difficulty: "Medium", year: "PYQ 2020", paper: "Prelims",
    question: "The 73rd Constitutional Amendment (1992) made which of the following mandatory?\n1. Three-tier Panchayati Raj system\n2. Reservation for women (not less than 1/3rd of seats)\n3. State Finance Commission every 5 years\n4. Direct elections to all levels of Panchayats",
    options: ["1 and 2 only", "1, 2 and 3 only", "1, 3 and 4 only", "1, 2, 3 and 4"],
    correct: 3,
    explanation: "All four provisions are mandatory under the 73rd Amendment (11th Schedule, Articles 243–243O). Three-tier system (village, intermediate, district), women's reservation (min 1/3rd), State Finance Commission (every 5 years), and direct elections to all levels are all compulsory. 29 subjects were added to the 11th Schedule.",
    syllabus: "GS II → Governance → Panchayati Raj"
  },
  {
    id: 29, subject: "Governance", topic: "Constitutional Bodies", difficulty: "Hard", year: "PYQ 2022", paper: "Prelims",
    question: "Which of the following Constitutional Bodies can Parliament expand but NOT curtail?\n1. Election Commission of India\n2. Union Public Service Commission\n3. Comptroller and Auditor General\n4. National Commission for SC/ST",
    options: ["1 and 3 only", "2 and 4 only", "1, 2 and 3 only", "1, 2, 3 and 4"],
    correct: 0,
    explanation: "The ECI (Art. 324) and CAG (Art. 148) are fully constitutional bodies whose powers are defined by the Constitution — Parliament can expand their jurisdiction by law but cannot curtail their constitutional mandate. UPSC's independence is similarly protected. The National Commission for SC/ST is under Art. 338/338A — statutory body upgraded to constitutional.",
    syllabus: "GS II → Polity → Constitutional Bodies"
  },

  // ── INTERNATIONAL RELATIONS ──
  {
    id: 30, subject: "International Relations", topic: "India's Foreign Policy", difficulty: "Medium", year: "PYQ 2021", paper: "Prelims",
    question: "The 'Neighbourhood First Policy' of India includes which of the following countries?",
    options: [
      "Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Maldives, Myanmar",
      "Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Maldives, Myanmar, Afghanistan",
      "Bangladesh, Nepal, Bhutan, Sri Lanka, Maldives, Myanmar only",
      "SAARC members only"
    ],
    correct: 1,
    explanation: "India's Neighbourhood First Policy covers all immediate neighbours: Pakistan, Bangladesh, Nepal, Bhutan, Sri Lanka, Maldives, Myanmar, and Afghanistan. This policy, articulated since 2014, prioritises connectivity, trade, and people-to-people ties with all 8 neighbouring countries.",
    syllabus: "GS II → International Relations → India's Foreign Policy"
  },
  {
    id: 31, subject: "International Relations", topic: "International Organisations", difficulty: "Easy", year: "PYQ 2020", paper: "Prelims",
    question: "The headquarters of the International Court of Justice (ICJ) is located in:",
    options: ["Geneva, Switzerland", "New York, USA", "The Hague, Netherlands", "Vienna, Austria"],
    correct: 2,
    explanation: "The International Court of Justice (ICJ) is headquartered at the Peace Palace in The Hague, Netherlands. It is the principal judicial organ of the United Nations (Article 92 of UN Charter). It settles disputes between states and gives advisory opinions to UN organs.",
    syllabus: "GS II → International Relations → International Organisations"
  },

  // ── ETHICS ──
  {
    id: 32, subject: "Ethics", topic: "Ethical Theories", difficulty: "Medium", year: "PYQ 2021", paper: "Prelims",
    question: "Which ethical theory holds that the morality of an action is determined solely by its consequences?",
    options: ["Deontological Ethics", "Consequentialism / Utilitarianism", "Virtue Ethics", "Divine Command Theory"],
    correct: 1,
    explanation: "Consequentialism (including Utilitarianism proposed by Jeremy Bentham and John Stuart Mill) judges the morality of an action based on its outcomes. 'Greatest good for the greatest number' is the utilitarian maxim. Deontology (Kant) judges based on rules/duties. Virtue ethics focuses on character. This is directly relevant to GS IV Ethics paper.",
    syllabus: "GS IV → Ethics → Ethical Theories"
  },
  {
    id: 33, subject: "Ethics", topic: "Civil Services Values", difficulty: "Easy", year: "PYQ 2019", paper: "Prelims",
    question: "Which of the following are 'Foundational Values' for civil services in India as mentioned by the Second ARC?\n1. Integrity\n2. Impartiality\n3. Neutrality\n4. Commitment to Public Service",
    options: ["1 and 2 only", "1, 2 and 4 only", "2 and 3 only", "1, 2, 3 and 4"],
    correct: 3,
    explanation: "The Second Administrative Reforms Commission identified the following as foundational values for civil services: Integrity, Impartiality, Neutrality, Commitment to Public Service (including Constitutional Service), Accountability, Transparency, Compassion for the vulnerable, and National Interest. All four listed are correct.",
    syllabus: "GS IV → Ethics → Civil Services Values"
  },

  // ── MORE ECONOMY ──
  {
    id: 34, subject: "Economy", topic: "Agriculture", difficulty: "Medium", year: "2023", paper: "Prelims",
    question: "With reference to 'Minimum Support Price (MSP)', which of the following is/are correct?\n1. MSP is legally guaranteed to all farmers in India.\n2. CACP recommends MSP for 23 mandated crops.\n3. MSP covers both kharif and rabi crops.\n4. MSP calculation considers A2+FL cost (paid-out costs plus family labour).",
    options: ["2 and 3 only", "2, 3 and 4 only", "1 and 4 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Statement 1 is INCORRECT — MSP is NOT legally guaranteed; it's an advisory price. Statements 2, 3, and 4 are correct. CACP (Commission for Agricultural Costs and Prices) recommends MSP for 23 crops (14 kharif, 6 rabi, 2 commercial). MSP is set at 1.5x of A2+FL cost (paid-out + family labour costs).",
    syllabus: "GS III → Economy → Agriculture"
  },
  {
    id: 35, subject: "Economy", topic: "Infrastructure", difficulty: "Medium", year: "2024", paper: "Prelims",
    question: "Which of the following about the 'PM Gati Shakti National Master Plan' is/are correct?\n1. It is a digital platform integrating infrastructure planning of 16 ministries.\n2. It aims to eliminate silos in infrastructure development.\n3. It is based on GIS (Geographic Information System) technology.\n4. It was launched replacing the National Infrastructure Pipeline.",
    options: ["1 and 2 only", "1, 2 and 3 only", "3 and 4 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Statements 1, 2 and 3 are correct. Statement 4 is INCORRECT — PM Gati Shakti (launched Oct 2021) complements the National Infrastructure Pipeline (NIP) but does NOT replace it. NIP targets ₹111 lakh crore infrastructure investment by 2025. Gati Shakti is the planning/coordination tool built on GIS, integrating 16 ministries.",
    syllabus: "GS III → Economy → Infrastructure"
  },

  // ── MORE POLITY ──
  {
    id: 36, subject: "Polity", topic: "Judiciary", difficulty: "Hard", year: "PYQ 2022", paper: "Prelims",
    question: "Consider the following about the 'Collegium System' of judicial appointments:\n1. It is explicitly mentioned in Articles 124 and 217 of the Constitution.\n2. The National Judicial Appointments Commission (NJAC) was struck down in 2015.\n3. The Supreme Court Collegium comprises the CJI and 4 senior-most judges.\n4. High Court Collegium comprises the Chief Justice and 2 senior-most judges.",
    options: ["2 and 3 only", "1, 2 and 3 only", "2, 3 and 4 only", "1, 2, 3 and 4"],
    correct: 2,
    explanation: "Statements 2, 3 and 4 are correct. Statement 1 is INCORRECT — the Collegium System is NOT mentioned in the Constitution; it evolved through three Judges Cases (1981, 1993, 1998). NJAC (99th Amendment) was struck down in Supreme Court Advocates-on-Record Association v. Union of India (2015) as violating judicial independence.",
    syllabus: "GS II → Polity → Judiciary"
  },
  {
    id: 37, subject: "Polity", topic: "Elections", difficulty: "Medium", year: "PYQ 2020", paper: "Prelims",
    question: "The concept of 'None of the Above' (NOTA) option in Indian elections was introduced by which authority?",
    options: [
      "Parliament through an amendment to the Representation of People Act",
      "Supreme Court directive in 2013",
      "Election Commission of India on its own initiative",
      "Presidential ordinance"
    ],
    correct: 1,
    explanation: "The Supreme Court in PUCL v. Union of India (2013) directed the Election Commission to provide NOTA option on EVMs. The court held that the right to reject all candidates is a fundamental right under Article 19(1)(a). NOTA was first used in Assembly elections in November 2013.",
    syllabus: "GS II → Polity → Elections"
  },

  // ── SCHEMES ──
  {
    id: 38, subject: "Governance", topic: "Government Schemes", difficulty: "Easy", year: "2023", paper: "Prelims",
    question: "Which of the following schemes is correctly matched with its objective?\n1. PM-KISAN — Direct income support of ₹6,000/year to farmers\n2. MISHTI — Mangrove restoration along Indian coastline\n3. PM Vishwakarma — Skill development for gig workers\n4. PM Surya Ghar — Rooftop solar with free electricity",
    options: ["1 and 2 only", "1, 2 and 4 only", "2, 3 and 4 only", "1, 2, 3 and 4"],
    correct: 1,
    explanation: "Pairs 1, 2 and 4 are correctly matched. Pair 3 is INCORRECT — PM Vishwakarma is for traditional artisans and craftspeople working in 18 trades (blacksmiths, potters, weavers, etc.), NOT gig workers. It provides recognition, skill training, and credit at concessional rates.",
    syllabus: "GS II → Governance → Government Schemes"
  },
  {
    id: 39, subject: "Economy", topic: "Index & Reports", difficulty: "Medium", year: "PYQ 2021", paper: "Prelims",
    question: "Which of the following indices are published by the World Economic Forum (WEF)?\n1. Global Competitiveness Index\n2. Global Gender Gap Index\n3. Human Development Index\n4. Ease of Doing Business Index",
    options: ["1 and 2 only", "2 and 4 only", "1, 2 and 3 only", "1, 2, 3 and 4"],
    correct: 0,
    explanation: "WEF publishes: Global Competitiveness Index and Global Gender Gap Index. INCORRECT attributions: Human Development Index (HDI) is published by UNDP. Ease of Doing Business was published by World Bank (discontinued in 2021). So only 1 and 2 are WEF publications.",
    syllabus: "GS III → Economy → Reports & Indices"
  },
  {
    id: 40, subject: "Environment", topic: "Energy", difficulty: "Hard", year: "2024", paper: "Prelims",
    question: "With reference to 'Green Hydrogen', consider these statements:\n1. It is produced by electrolysis of water using renewable energy.\n2. India's National Green Hydrogen Mission aims for 5 MMT annual production by 2030.\n3. Green Hydrogen emits only water vapour when burned.\n4. Currently, grey hydrogen (from natural gas) constitutes over 90% of global hydrogen production.",
    options: ["1 and 3 only", "1, 2 and 3 only", "2, 3 and 4 only", "1, 2, 3 and 4"],
    correct: 3,
    explanation: "All four statements are correct. Green hydrogen: produced via electrolysis with renewables (statement 1). India's NGHM targets 5 MMT/year by 2030 (statement 2). Burning hydrogen produces only H₂O (statement 3). Globally, ~95% of hydrogen is grey/brown (from fossil fuels, emitting CO₂) — statement 4 is correct.",
    syllabus: "GS III → Environment → Energy"
  }
];

// Subject filter metadata
const SUBJECTS = ["All", "Polity", "Economy", "Environment", "History", "Geography", "Science & Tech", "Governance", "International Relations", "Ethics"];
