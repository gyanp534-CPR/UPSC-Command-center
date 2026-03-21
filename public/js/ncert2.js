// UPSC COSMOS v6 — NCERT MODULES EXPANSION
// 6 new complete modules: Geography, Governance, Sci&Tech, Economy-2, Environment-2, IR

const NCERT_MODULES_2 = [

  // ══════════════════════════════════════════════════════
  // MODULE 1: GEOGRAPHY — Physical Geography of India
  // ══════════════════════════════════════════════════════
  {
    id: 'ncert_geo_1',
    subject: 'Geography',
    title: 'Physical Geography of India — The Big Picture',
    class: 'Class XI Geography',
    chapter: 'India: Physical Environment',
    nodeId: 'g1',
    duration: 18,
    lessons: [
      {
        step: 1,
        type: 'concept',
        title: 'India\'s Location and Geological History',
        body: `India occupies a unique position — straddling the tropics and subtropics, surrounded by the Indian Ocean on three sides, and shielded by the Himalayas in the north.

KEY GEOGRAPHICAL FACTS:
→ Latitudinal extent: 8°4'N to 37°6'N
→ Longitudinal extent: 68°7'E to 97°25'E
→ Standard Meridian: 82°30'E (passing through Mirzapur, UP)
→ Indian Standard Time: UTC +5:30
→ Total area: 3.28 million sq km (7th largest country)
→ Coastline: 7,516 km (mainland + island territories)

GEOLOGICAL STORY:
India was once part of Gondwana — a supercontinent that included Antarctica, Australia, Africa, and South America. When Gondwana broke up ~200 million years ago, the Indian plate drifted northward across the ancient Tethys Sea.

About 50 million years ago, the Indian plate collided with the Eurasian plate. This:
→ Folded the Tethys Sea sediments into the Himalayan ranges
→ Created the Indus-Ganga-Brahmaputra plains from Tethys seabed sediment
→ Left the ancient Deccan Plateau (part of original Gondwana) to the south

The Himalayas are still rising at ~1-2 cm per year.`,
        keyFact: 'The Tropic of Cancer (23.5°N) passes through 8 Indian states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.'
      },
      {
        step: 2,
        type: 'concept',
        title: 'India\'s Physiographic Divisions — 6 Major Regions',
        body: `India can be divided into 6 major physiographic divisions, each with distinct geology, soil, climate, and economic significance.

1. THE HIMALAYAS (Young fold mountains)
→ Three parallel ranges: Trans-Himalaya (Karakoram, Ladakh), Greater Himalaya (Himadri), Lesser Himalaya (Himachal), Outer Himalaya (Shivalik)
→ Perennial rivers, glaciers, biodiversity hotspot
→ Acts as climate barrier — blocks cold Central Asian winds

2. THE NORTHERN PLAINS (Alluvial)
→ Formed by sediment from Indus, Ganga, Brahmaputra rivers
→ World's most extensive and fertile alluvial plains
→ 4 sections: Punjab Plain, Ganga Plain, Brahmaputra Plain
→ Bhangar (old alluvium, coarser) and Khadar (new alluvium, fertile)

3. PENINSULAR PLATEAU (Ancient crystalline rocks)
→ Oldest landmass in India — part of original Gondwana
→ Deccan Plateau in south, Central Highlands in north
→ Deccan Traps: basaltic rock from massive volcanic eruption 65 million years ago
→ Produces black regur (cotton) soil

4. COASTAL PLAINS
→ Western Ghats: narrow strip, steep, lagoons (Vembanad, Chilika)
→ Eastern Ghats: wider, delta-forming rivers (Mahanadi, Krishna, Godavari)

5. ISLANDS
→ Andaman & Nicobar: Bay of Bengal (coral + volcanic islands, Ring of Fire)
→ Lakshadweep: Arabian Sea (coral atolls)

6. THAR DESERT (Arid)
→ North-western India (Rajasthan + parts of Gujarat, Haryana, Punjab)
→ Created by rain-shadow effect of Aravallis + distance from ocean`,
        keyFact: 'The Deccan Plateau tilts westward — that is why most peninsular rivers (Godavari, Krishna, Cauvery) flow eastward into Bay of Bengal. The Narmada and Tapi are exceptions — they flow west through rift valleys.'
      },
      {
        step: 3,
        type: 'example',
        title: 'How Plate Tectonics Explains Everything',
        body: `The Indian plate's journey explains almost every physical geography question about India:

QUESTION: Why are Himalayas fold mountains?
ANSWER: Tethys Sea sediments got folded when Indian plate collided with Eurasian plate.

QUESTION: Why is the Deccan Plateau so old and stable?
ANSWER: It is part of original Gondwana — billions of years old, not deformed by recent tectonics.

QUESTION: Why does Narmada flow west but Godavari east?
ANSWER: Narmada flows through the Narmada-Son tectonic rift valley (a fault/rift formed during Gondwana breakup). Gravity pulls it west through this rift. Godavari follows normal westward-tilted Deccan drainage to Bay of Bengal.

QUESTION: Why are Andaman-Nicobar islands volcanically active?
ANSWER: They are part of the Ring of Fire — the subduction zone where the Indian Plate goes under the Burmese plate. Barren Island (Andaman) = only active volcano in India.

QUESTION: Why are Himalayas earthquake-prone?
ANSWER: The Indian plate is still actively pushing north → building pressure → earthquakes. Indian plate moves 5 cm northward each year.`,
        keyFact: 'Barren Island in Andaman & Nicobar = India\'s only active volcano. Last erupted 2017. It sits on the subduction zone of the Indian and Burmese plates — part of the Ring of Fire.'
      },
      {
        step: 4,
        type: 'concept',
        title: 'Indian Drainage System — Rivers and Their Patterns',
        body: `India's rivers are classified by origin and drainage pattern:

HIMALAYAN RIVERS (Perennial — snow + rain fed)
→ Indus System: Indus, Jhelum, Chenab, Ravi, Beas, Sutlej
→ Ganga System: Ganga, Yamuna, Ghaghra, Gandak, Kosi, Son, Chambal
→ Brahmaputra: Yarlung Tsangpo (Tibet) → Brahmaputra → Jamuna (Bangladesh)

PENINSULAR RIVERS (Seasonal — rain fed only)
→ West-flowing (Arabian Sea): Narmada, Tapi, Mahi, Sabarmati (flow through rift valleys)
→ East-flowing (Bay of Bengal): Mahanadi, Godavari, Krishna, Cauvery, Pennar

KEY DISTINCTIONS:

Himalayan rivers:
• Perennial (snow-fed in summer, rain-fed in monsoon)
• Young rivers — still actively eroding
• High sediment load
• Form large deltas (Sundarbans = world's largest mangrove delta)

Peninsular rivers:
• Seasonal (depend only on monsoon)
• Old, mature rivers with hard rock beds
• Low sediment load (hard rock, less erosion)
• Form estuaries (Narmada, Tapi) or deltas (Godavari, Krishna)

INDIA'S LONGEST RIVER: Ganga (2,525 km within India)
LARGEST DISCHARGE: Brahmaputra
HIGHEST SEDIMENT LOAD: Brahmaputra`,
        keyFact: 'The Brahmaputra carries one of the world\'s highest sediment loads — it crosses the geologically young, tectonically active, soft Himalayan rocks where rapid erosion occurs. It creates Majuli, the world\'s largest river island, in Assam.'
      },
      {
        step: 5,
        type: 'quiz',
        questions: [
          {
            q: 'India\'s Standard Meridian (82°30\'E) passes through which city?',
            opts: ['Allahabad', 'Mirzapur', 'Varanasi', 'Lucknow'],
            ans: 1
          },
          {
            q: 'Which ancient supercontinent was India part of before drifting northward?',
            opts: ['Laurasia', 'Pangaea', 'Gondwana', 'Rodinia'],
            ans: 2
          },
          {
            q: 'The Deccan Traps were formed by:',
            opts: ['Himalayan folding', 'Massive volcanic eruptions ~65 million years ago', 'Glacial deposits', 'River delta formation'],
            ans: 1
          },
          {
            q: 'Which of these rivers flows WESTWARD into the Arabian Sea?',
            opts: ['Godavari', 'Krishna', 'Narmada', 'Cauvery'],
            ans: 2
          },
          {
            q: 'India\'s only active volcano is located in:',
            opts: ['Lakshadweep Islands', 'Barren Island, Andaman & Nicobar', 'Andaman Island', 'Gulf of Kutch'],
            ans: 1
          }
        ]
      },
      {
        step: 6,
        type: 'summary',
        title: 'Revision Card — Physical Geography of India',
        points: [
          'India = 3.28 million sq km, 7th largest country, Tropic of Cancer passes through 8 states',
          'Originally part of Gondwana — Indian plate drifted north ~200 MYA, collided with Eurasian plate ~50 MYA → formed Himalayas',
          '6 physiographic divisions: Himalayas, Northern Plains, Peninsular Plateau, Coastal Plains, Islands, Thar Desert',
          'Deccan Plateau = oldest landmass (Gondwana origin). Deccan Traps = volcanic basalt 65 MYA → black regur soil',
          'Himalayan rivers = perennial (snow+rain). Peninsular rivers = seasonal (monsoon only)',
          'Narmada/Tapi flow WEST through rift valleys. All other major peninsular rivers flow east',
          'Brahmaputra = highest discharge + highest sediment load in India. Creates Majuli (world\'s largest river island)',
          'Barren Island (Andaman) = India\'s only active volcano — part of Ring of Fire'
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODULE 2: GOVERNANCE — Accountability & Transparency
  // ══════════════════════════════════════════════════════
  {
    id: 'ncert_gov_1',
    subject: 'Governance',
    title: 'Accountability Institutions — RTI, CAG, Lokpal',
    class: 'Class XI Political Science',
    chapter: 'Local Governments and Accountability',
    nodeId: 'go3',
    duration: 15,
    lessons: [
      {
        step: 1,
        type: 'concept',
        title: 'Why Accountability Institutions Matter',
        body: `Democracy doesn't end at voting. After an election, citizens need mechanisms to ensure that elected governments and bureaucrats use power responsibly. India has built a layered system of accountability institutions.

THE ACCOUNTABILITY ARCHITECTURE:

EXTERNAL AUDIT — The CAG (Comptroller and Auditor General)
→ Constitutional body (Article 148)
→ Audits all expenditure from Consolidated Fund of India
→ Also audits all 28 State Consolidated Funds
→ Reports to Parliament → PAC (Public Accounts Committee) scrutinises
→ Independent — removable only like Supreme Court judge

TRANSPARENCY — RTI Act 2005
→ Citizens can demand information from any public authority
→ Response within 30 days (48 hours if life/liberty involved)
→ Central Information Commission (CIC) = apex body
→ India processes 5–7 crore RTI applications per year

ANTI-CORRUPTION — Lokpal
→ Lokpal and Lokayuktas Act 2013
→ Covers PM (with restrictions), Ministers, MPs, Group A-D officials
→ First Lokpal appointed 2019 — after decades of demand
→ States mandated to have Lokayuktas

FINANCIAL OVERSIGHT — Comptroller + Parliament
→ PAC (Public Accounts Committee): Examines CAG reports post-expenditure
→ Estimates Committee: Examines budget estimates before spending
→ Committee on Public Undertakings: Oversees PSUs`,
        keyFact: 'CAG is called the "guardian of public purse." The CAG\'s report is tabled in Parliament where the Public Accounts Committee (PAC) examines it. The government must then respond — this three-step process is India\'s post-expenditure accountability mechanism.'
      },
      {
        step: 2,
        type: 'concept',
        title: 'Right to Information — How It Works',
        body: `The RTI Act 2005 transformed India's governance by giving citizens legal teeth to demand accountability.

HOW TO USE RTI:
1. File application with PIO (Public Information Officer) of the government body
2. Attach Rs 10 application fee
3. Response must come within 30 DAYS (48 hours if life/liberty involved)
4. If unsatisfied → First Appellate Authority (senior officer in same department)
5. If still unsatisfied → Central/State Information Commission

WHAT IS EXEMPT FROM RTI:
• National security, defence, Cabinet papers
• Personal information that has no public interest
• Third-party commercial information
• Intelligence agencies (but can file for corruption/HR violations even here)
• Ongoing investigations

KEY PROVISIONS:
→ Any citizen can file — no reason needed
→ Public authorities must proactively disclose (Section 4 disclosures)
→ Information must be given in format requested (certified copies, etc.)
→ PIO can be penalised Rs 250/day (up to Rs 25,000) for delay

LANDMARK RTI CASES:
→ Commonwealth Games scam exposed through RTI
→ RTI was used to expose PDS (ration shop) corruption
→ Jana Andolan (social audit) movements use RTI systematically`,
        keyFact: 'The CIC (Central Information Commission) is a STATUTORY body under RTI Act — NOT a constitutional body. Chief Information Commissioner + up to 10 Information Commissioners. Their decisions are binding but can be appealed to High Court.'
      },
      {
        step: 3,
        type: 'example',
        title: 'CAG\'s Role — A Real Case',
        body: `The Comptroller and Auditor General (CAG) is often called India's "watchdog of public money." Here's how it works in practice:

THE 2G SPECTRUM CASE:
In 2010, CAG released a report on 2G spectrum allocation. CAG estimated a "presumptive loss" of Rs 1.76 lakh crore to the exchequer from allocating spectrum at 2001 prices (below market rates) in 2008.

This single CAG report:
1. Triggered Parliamentary debate
2. Led to Supreme Court suo motu intervention
3. Resulted in cancellation of 122 licenses (SC 2012)
4. Led to arrests and trials of senior government officials
5. Changed how spectrum was allocated — moved to auction model

This is accountability in action: an independent constitutional auditor → Parliament scrutiny → judicial intervention → policy reform.

COAL SCAM (2012): CAG estimated Rs 1.86 lakh crore presumptive loss from coal block allocations without auction. Led to Supreme Court cancellation of 214 coal blocks.

Important: CAG does three types of audits:
1. Compliance Audit: Was the money spent as sanctioned?
2. Performance Audit: Was the money spent efficiently and effectively?
3. Propriety Audit: Was spending appropriate given public interest?`,
        keyFact: 'CAG reports go to Parliament → PAC (chaired by Leader of Opposition by convention) scrutinises → Government submits "Action Taken Report." This chain of accountability is crucial for democratic governance.'
      },
      {
        step: 4,
        type: 'quiz',
        questions: [
          {
            q: 'CAG of India is established under which Article of the Constitution?',
            opts: ['Article 76', 'Article 148', 'Article 280', 'Article 315'],
            ans: 1
          },
          {
            q: 'Under RTI Act, the normal time limit for providing information is:',
            opts: ['7 days', '15 days', '30 days', '60 days'],
            ans: 2
          },
          {
            q: 'The Central Information Commission (CIC) is a:',
            opts: ['Constitutional body', 'Statutory body under RTI Act 2005', 'Executive body', 'Advisory body'],
            ans: 1
          },
          {
            q: 'First Lokpal of India was appointed in:',
            opts: ['2014', '2016', '2019', '2022'],
            ans: 2
          },
          {
            q: 'The Public Accounts Committee (PAC) of Parliament examines:',
            opts: ['Budget estimates before spending', 'CAG audit reports after spending', 'Policy decisions of Cabinet', 'Only defence expenditure'],
            ans: 1
          }
        ]
      },
      {
        step: 5,
        type: 'summary',
        title: 'Revision Card — Accountability Institutions',
        points: [
          'CAG = Constitutional body (Art 148). Audits all Union + State CFs. Reports to Parliament. Removed like SC judge.',
          'PAC (Public Accounts Committee) = examines CAG reports post-expenditure. Chaired by Leader of Opposition (by convention).',
          'RTI Act 2005: Any citizen can demand info from public authority. Response within 30 days. Rs 10 fee. Exemptions include national security, personal info.',
          'CIC = Statutory body under RTI Act. Hears second appeals. Binding decisions. State ICs for state government RTIs.',
          'Lokpal Act 2013: Covers PM (with restrictions), ministers, MPs, Group A-D officials. First Lokpal appointed 2019.',
          'Three-tier RTI: PIO (30 days) → First Appellate Authority → Information Commission',
          'CAG three audit types: Compliance (was it spent as sanctioned?), Performance (efficiently?), Propriety (appropriately?)'
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODULE 3: SCI & TECH — Space Technology & ISRO
  // ══════════════════════════════════════════════════════
  {
    id: 'ncert_sci_1',
    subject: 'Sci & Tech',
    title: 'India\'s Space Programme — From Aryabhata to Chandrayaan-3',
    class: 'Class XII Physics / Science & Technology',
    chapter: 'India in Space',
    nodeId: 's1',
    duration: 16,
    lessons: [
      {
        step: 1,
        type: 'concept',
        title: 'ISRO\'s Journey — Key Milestones',
        body: `The Indian Space Research Organisation (ISRO) was established in 1969 under Dr. Vikram Sarabhai. From a humble beginning of assembling rocket parts in a church, India is now a global space power.

THE MILESTONES:

1975 — Aryabhata: India's first satellite (Soviet launch)
1980 — Rohini RS-1: First indigenous satellite launched by SLV-3 (Dr. APJ Abdul Kalam's project)
→ India became the 6th country to independently launch a satellite

1988 — PSLV (Polar Satellite Launch Vehicle) introduced
→ PSLV became ISRO's most reliable "workhorse"
→ 54 consecutive successes

1999 — First commercial launch: Korean satellite on PSLV-C2

2008 — Chandrayaan-1: India's first Moon mission
→ Discovery: confirmed presence of water molecules on the Moon
→ Used miniature Synthetic Aperture Radar (India-US collaboration)

2013 — Mangalyaan (MOM): India's first Mars mission
→ First attempt success — no other nation achieved this
→ Cost: $74 million (cheapest Mars mission ever)

2017 — PSLV-C37: Launched 104 satellites in single mission — world record

2019 — Chandrayaan-2: Orbiter success, lander crashed in final moments

2023 — Chandrayaan-3: SOFT LANDING on Moon's south pole (August 23, 2023)
→ India = 4th nation to soft-land on Moon (after USSR, USA, China)
→ FIRST nation to land at lunar south pole

2023 — Aditya-L1: India's first solar observation mission at Lagrange Point L1`,
        keyFact: 'Chandrayaan-3\'s Vikram lander soft-landed at 69°S latitude near the lunar south pole on August 23, 2023 — now celebrated as "National Space Day." Pragyan rover confirmed: sulphur, oxygen, iron, silicon near south pole.'
      },
      {
        step: 2,
        type: 'concept',
        title: 'ISRO\'s Launch Vehicles — PSLV, GSLV, LVM3',
        body: `Different missions need different rockets. ISRO has developed a family of launch vehicles:

PSLV (Polar Satellite Launch Vehicle):
→ India's most reliable rocket — 54+ consecutive successes
→ 4 stages: solid-liquid-solid-liquid alternating propulsion
→ Can carry 1.75 tonnes to Sun-synchronous orbit (600 km)
→ Used for: Chandrayaan-1, Mangalyaan, Earth observation satellites, commercial launches
→ PSLV-C37: 104 satellites in one launch (2017 world record)

GSLV (Geosynchronous Satellite Launch Vehicle):
→ Can carry heavier communication satellites to GTO (Geostationary Transfer Orbit)
→ Challenge: Cryogenic engine development took years (USA refused to transfer technology in 1990s — ISRO developed it indigenously)
→ GSLV Mk II: Carries 2.5 tonnes to GTO

LVM3 (Launch Vehicle Mark 3, formerly GSLV Mk III):
→ India's HEAVIEST rocket
→ Carries 4 tonnes to GTO or 10 tonnes to LEO
→ Fully indigenous cryogenic upper stage (C25)
→ Used for: Chandrayaan-2, Chandrayaan-3
→ Used commercially for OneWeb constellation launch (2022-23)
→ Will carry Gaganyaan (India's first crewed mission)

SSLV (Small Satellite Launch Vehicle):
→ New low-cost rocket for small satellites
→ Can be assembled in days instead of months
→ For the booming commercial small satellite market

IN-SPACe (Indian National Space Promotion and Authorisation Centre):
→ Created in 2020 to allow PRIVATE SECTOR into space
→ Agnikul Cosmos, Skyroot Aerospace = first private Indian rocket companies`,
        keyFact: 'The cryogenic engine story is an example of India\'s strategic patience. In 1991, the USA prevented Russia from transferring cryogenic engine technology to India (MTCR reason). ISRO spent 15 years developing it indigenously — and succeeded. Today\'s LVM3 uses India\'s own CE-20 cryogenic engine.'
      },
      {
        step: 3,
        type: 'concept',
        title: 'Applications — What Satellites Actually Do for India',
        body: `Space technology isn't just about exploration. ISRO's applications directly impact 1.4 billion lives:

COMMUNICATION (INSAT/GSAT series):
→ TV broadcasting to remote villages
→ Telemedicine (connecting rural doctors to city specialists)
→ Tele-education (Doordarshan, Swayam, NPTEL)
→ DTH (Direct-to-Home) TV
→ Disaster warning broadcasts

EARTH OBSERVATION (Cartosat, Resourcesat, Risat series):
→ Cartosat: Maps, urban planning, border monitoring
→ Resourcesat: Crop acreage estimation, drought monitoring, forest cover assessment
→ RISAT (Radar Imaging): Works through clouds, day and night. Used for border surveillance (China LAC monitoring), flood damage assessment
→ PM Fasal Bima Yojana: Satellite data used for crop damage assessment instead of manual inspection

NAVIGATION — NavIC:
→ India's own GPS
→ 7 satellites, coverage: India + 1,500 km around
→ Accuracy: <20 metres (civil), <10 metres (restricted)
→ Purpose: Kargil War (1999) — USA denied precision GPS. India decided to build own
→ Uses: Fishing boat navigation + safety alerts, vehicle tracking, defence

WEATHER FORECASTING (INSAT-3D):
→ Cyclone tracking and prediction (saved thousands of lives in Odisha cyclones)
→ Monsoon prediction
→ Agricultural advisory

SPACE SCIENCE:
→ AstroSat (2015): India's first space observatory — studying X-ray sources, black holes
→ Aditya-L1 (2023): Studying Sun's corona and solar winds from L1 Lagrange point`,
        keyFact: 'ISRO saves lives. Odisha was once called the "graveyard of cyclones." Using INSAT satellite data for cyclone prediction + timely evacuation, the 2013 Phailin cyclone (stronger than 1999\'s which killed 10,000) killed only 45 people due to accurate 7-day advance warning.'
      },
      {
        step: 4,
        type: 'example',
        title: 'Chandrayaan-3 — Why the South Pole Matters',
        body: `When Vikram lander touched down on August 23, 2023, it was not just a technical achievement. Here's why the south pole specifically matters:

THE SCIENTIFIC REASON:
→ The Moon's south pole has permanently shadowed craters — regions that have not seen sunlight for billions of years
→ Inside these craters: water ice has accumulated over billions of years (comets and asteroids brought water)
→ Chandrayaan-3's Pragyan rover confirmed: sulphur, oxygen, iron, aluminium, silicon, calcium near the south pole
→ Chandrayaan-1 (2008) first confirmed lunar water — Chandrayaan-3 found sulphur (new finding, not detected before)

THE STRATEGIC REASON:
→ If water ice exists in accessible quantities, it could:
   • Support human habitation on Moon (drinking water)
   • Electrolysis → hydrogen and oxygen for rocket fuel
   • Make Moon a refueling station for deeper space missions

→ This is why USA (Artemis programme), China (CLEP), and India all target the south pole. It's the future base camp for the Solar System.

THE GEOPOLITICAL REASON:
→ India demonstrated capability to land precisely at a technically challenging location
→ No other nation (not even USA or China) had landed at lunar south pole
→ India became the 4th nation to soft-land on the Moon overall

Chandrayaan-3's success with a budget of ~Rs 600 crore ($72 million — cheaper than many Hollywood blockbusters) established India's cost-effective, frugal engineering model as a global example.`,
        keyFact: 'August 23 is now celebrated as National Space Day in India. The landing site is officially named "Shiv Shakti Point" and the site where Chandrayaan-2\'s lander crashed (2019) is named "Tiranga Point."'
      },
      {
        step: 5,
        type: 'quiz',
        questions: [
          {
            q: 'India\'s first satellite Aryabhata was launched in:',
            opts: ['1969', '1975', '1980', '1988'],
            ans: 1
          },
          {
            q: 'Mangalyaan (Mars Orbiter Mission) was significant because:',
            opts: ['First Mars landing', 'First attempt success — no nation had achieved this before', 'Cheapest space mission overall', 'First international collaboration mission'],
            ans: 1
          },
          {
            q: 'NavIC navigation system was motivated primarily by:',
            opts: ['Desire to compete with China', 'USA denying precision GPS data during Kargil War 1999', 'ISRO\'s commercial revenue target', 'European pressure'],
            ans: 1
          },
          {
            q: 'Chandrayaan-3\'s Vikram lander soft-landed on:',
            opts: ['Moon\'s equatorial region', 'Moon\'s north pole', 'Moon\'s south pole — first nation to achieve this', 'Moon\'s far side'],
            ans: 2
          },
          {
            q: 'LVM3 (formerly GSLV Mk III) is India\'s:',
            opts: ['Smallest rocket', 'Most reliable older rocket (PSLV)', 'Heaviest rocket with indigenous cryogenic engine (C25)', 'Military satellite launcher only'],
            ans: 2
          }
        ]
      },
      {
        step: 6,
        type: 'summary',
        title: 'Revision Card — India\'s Space Programme',
        points: [
          'ISRO established 1969 (Dr. Vikram Sarabhai). First satellite: Aryabhata (1975). First indigenous launch: Rohini 1980.',
          'PSLV = workhorse (54+ successes, 4-stage). GSLV = medium-heavy (cryogenic). LVM3 = heaviest (4T to GTO, C25 engine).',
          'Chandrayaan-1 (2008): Confirmed lunar water. Mangalyaan (2013): First attempt Mars success, $74M cheapest. Chandrayaan-3 (2023): First at lunar south pole.',
          'NavIC = India\'s own GPS, 7 satellites, 1500 km coverage. Motivated by Kargil War when USA denied GPS.',
          'RISAT series = all-weather radar imaging (clouds no problem, day/night). Used for LAC border monitoring.',
          'Aditya-L1 (2023) = India\'s first solar mission at Lagrange Point L1 (1.5 million km from Earth).',
          'IN-SPACe (2020) opened space to private sector. Agnikul, Skyroot = first private Indian rocket companies.',
          'Gaganyaan = India\'s first crewed mission (upcoming, LVM3 launch). Will make India 4th nation to send humans to space.'
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODULE 4: ECONOMY — Monetary Policy & RBI Deep Dive
  // ══════════════════════════════════════════════════════
  {
    id: 'ncert_eco_2',
    subject: 'Economy',
    title: 'Monetary Policy & Banking — RBI\'s Toolkit',
    class: 'Class XII Economics',
    chapter: 'Money and Banking',
    nodeId: 'e2',
    duration: 16,
    lessons: [
      {
        step: 1,
        type: 'concept',
        title: 'RBI — India\'s Central Bank and Its Mandate',
        body: `The Reserve Bank of India (RBI) was established in 1935 and nationalized in 1949. It is the central bank of India — the "banker's bank" and the "banker to the government."

RBI'S FOUR CORE FUNCTIONS:

1. MONETARY AUTHORITY
→ Controls money supply and credit in the economy
→ Sets policy rates (Repo, Reverse Repo, MSF, SDF)
→ Manages inflation through the Monetary Policy Committee (MPC)
→ Target: 4% CPI inflation ±2% (established under FRBM Amendment 2016)

2. REGULATOR OF BANKS
→ Licenses banks, NBFCs, payment companies
→ Sets Prudential Norms (CRR, SLR, Capital Adequacy)
→ Prompt Corrective Action (PCA): Restricts weak banks
→ Conducts on-site and off-site supervision

3. ISSUER OF CURRENCY
→ Issues all currency notes (except Re 1 coin/note — Ministry of Finance)
→ Manages currency chest and distribution
→ Demonetisation: RBI must recommend, Government decides

4. MANAGER OF FOREIGN EXCHANGE
→ Manages India's forex reserves (~$600 billion)
→ Intervenes in foreign exchange market (buys/sells USD) to stabilize rupee
→ Administers FEMA (Foreign Exchange Management Act) 1999

KEY COMMITTEES:
→ MPC (Monetary Policy Committee): 6 members, 3 from RBI (CG chairs) + 3 government appointees
→ Sets Repo Rate every 2 months (bi-monthly)
→ Established under RBI Act 1934 (amended 2016)`,
        keyFact: 'RBI\'s inflation target of 4% (±2%) was set under the Flexible Inflation Targeting framework (FRBM Amendment 2016). RBI uses CPI-Combined (Consumer Price Index) — NOT WPI — for this target. If inflation exceeds the band for 3 consecutive quarters, RBI must explain to Government.'
      },
      {
        step: 2,
        type: 'concept',
        title: 'RBI\'s Policy Toolkit — Understanding Rates',
        body: `RBI uses multiple instruments to control money supply and credit in the economy. Understanding these is essential for UPSC.

PRICE-BASED TOOLS (Interest Rates):

REPO RATE (currently ~6.5%):
→ Rate at which commercial banks borrow overnight from RBI (using govt securities as collateral)
→ Increase Repo → borrowing costly → banks raise lending rates → credit shrinks → inflation falls
→ Decrease Repo → borrowing cheap → banks lower lending rates → credit expands → growth

REVERSE REPO RATE (Repo - 0.25%):
→ Rate at which RBI borrows from commercial banks (or banks park excess money with RBI)
→ Higher reverse repo → banks prefer to park with RBI rather than lend → liquidity absorbed

MSF (Marginal Standing Facility):
→ Emergency overnight borrowing by banks from RBI at higher rate (Repo + 0.25%)
→ Banks can pledge more securities (even SLR securities) here

SDF (Standing Deposit Facility, from 2022):
→ Banks park surplus funds with RBI at Repo - 0.25%
→ No collateral required (unlike reverse repo under LAF)

QUANTITY-BASED TOOLS:

CRR (Cash Reserve Ratio):
→ % of NDTL banks must keep as cash with RBI (earns NO interest)
→ Currently ~4.5%. Increase CRR → banks have less money to lend

SLR (Statutory Liquidity Ratio):
→ % of NDTL banks must keep in liquid assets (cash, gold, approved govt securities) — earns interest
→ Currently ~18%

OMO (Open Market Operations):
→ RBI buys govt securities from banks → injects money into economy
→ RBI sells govt securities to banks → absorbs money from economy`,
        keyFact: 'The MCLR (Marginal Cost of Funds based Lending Rate) is the minimum rate banks must lend at (except certain categories). This replaced base rate system in 2016. When RBI changes repo rate, banks are expected to transmit this through MCLR to their lending rates — but transmission is often slow and incomplete.'
      },
      {
        step: 3,
        type: 'example',
        title: 'Inflation vs Growth — The RBI Dilemma',
        body: `The biggest challenge for any central bank is balancing inflation control with economic growth. Here's how this played out in India:

2021-22: COVID RECOVERY
→ Economy needed support → RBI kept repo rate low (4%)
→ Flooded system with liquidity (GSAP — G-Sec Acquisition Programme)
→ Helped growth recover to 8.7% in FY22

2022: GLOBAL INFLATION SHOCK
→ Russia-Ukraine war → oil prices surged → global supply disruption
→ India's CPI inflation hit 7.8% (May 2022) — above RBI's 6% upper tolerance
→ RBI had to rapidly raise rates from 4% to 6.5% (fastest rate hike cycle)

DILEMMA:
→ Raising rates controls inflation but slows growth
→ Keeping rates low supports growth but risks inflation
→ MPC must balance — this is the art of monetary policy

2023-24: CALIBRATED PAUSE
→ RBI kept rates unchanged at 6.5% — waiting to see if inflation fell
→ Inflation did moderate but food inflation remained high (erratic monsoon)
→ Debate: Should RBI cut rates to support growth? Or wait till inflation firmly under control?

THE KEY LESSON:
Central banking is not mechanical. The MPC must judge:
→ Current inflation vs expected future inflation
→ Domestic vs global factors
→ Growth vs price stability trade-off
→ Exchange rate implications of rate changes`,
        keyFact: 'India\'s MPC missed its inflation target (above 6%) for 3 consecutive quarters in 2022 due to the global commodity price shock. Under the law, RBI had to write a formal letter to the government explaining why it failed to maintain the 4±2% target — the first time this happened since the framework was established.'
      },
      {
        step: 4,
        type: 'quiz',
        questions: [
          {
            q: 'The Monetary Policy Committee (MPC) was constituted under:',
            opts: ['Banking Regulation Act 1949', 'RBI Act 1934 (amended 2016)', 'FRBM Act 2003', 'Finance Act 2015'],
            ans: 1
          },
          {
            q: 'CRR (Cash Reserve Ratio) is maintained by banks:',
            opts: ['As liquid assets earning interest', 'As cash with RBI earning NO interest', 'As gold in bank vaults', 'As government securities'],
            ans: 1
          },
          {
            q: 'When RBI buys government securities in Open Market Operations (OMO), it:',
            opts: ['Absorbs liquidity from the system', 'Injects liquidity into the system', 'Raises interest rates automatically', 'Increases CRR'],
            ans: 1
          },
          {
            q: 'India\'s inflation target under Flexible Inflation Targeting is:',
            opts: ['2% WPI', '4% CPI ±2%', '6% CPI exactly', '3.5% CPI ±1.5%'],
            ans: 1
          },
          {
            q: 'Which rate represents the FLOOR of RBI\'s interest rate corridor?',
            opts: ['Repo Rate', 'MSF Rate', 'SDF (Standing Deposit Facility) Rate', 'Bank Rate'],
            ans: 2
          }
        ]
      },
      {
        step: 5,
        type: 'summary',
        title: 'Revision Card — RBI & Monetary Policy',
        points: [
          'RBI established 1935, nationalized 1949. 4 functions: Monetary Authority, Bank Regulator, Currency Issuer, Forex Manager.',
          'MPC = 6 members (3 RBI + 3 govt). Sets repo rate bi-monthly. Target: 4% CPI ±2% under Flexible Inflation Targeting.',
          'Rate corridor: MSF (Repo+0.25%) → Repo → SDF (Repo-0.25%). Repo = key policy rate.',
          'CRR = cash with RBI (no interest, currently ~4.5%). SLR = liquid assets with bank (earns interest, ~18%). Both on NDTL.',
          'OMO: RBI buys securities = injects liquidity. RBI sells = absorbs liquidity. Quantity tool vs price tool (rates).',
          'Transmission: Repo change → MCLR change → loan rates change → economy. But transmission is often slow.',
          'SARFAESI Act: Banks take collateral without court if NPA >90 days. Dramatically reduced NPA recovery time.',
          'PCA (Prompt Corrective Action): Weak banks (high NPA, low capital) face restrictions on business activities.'
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODULE 5: ENVIRONMENT — Biodiversity & Conservation
  // ══════════════════════════════════════════════════════
  {
    id: 'ncert_env_2',
    subject: 'Environment',
    title: 'Biodiversity — India\'s Natural Wealth & Its Protection',
    class: 'Class XII Biology',
    chapter: 'Biodiversity and Conservation',
    nodeId: 'ev3',
    duration: 16,
    lessons: [
      {
        step: 1,
        type: 'concept',
        title: 'What is Biodiversity and Why Does India Have So Much?',
        body: `Biodiversity = the variety of life on Earth at all its levels — genes, species, ecosystems.

India's biodiversity numbers are staggering:
→ 2nd most biodiverse country per unit area in the world
→ Home to 7-8% of world's species in only 2.4% of Earth's land area
→ 45,000 plant species (15,000 flowering plants — 33% endemic)
→ 89,451 animal species (13% of world's total)
→ 1,300+ bird species (13% of world's birds)
→ 350+ mammal species

WHY IS INDIA SO BIODIVERSE?

1. GEOGRAPHY: Variety of habitats — Himalayan alpine, tropical rainforest, desert, wetland, marine, coastal, mangrove. Each supports different species.

2. CLIMATE VARIATION: From the snow-covered Himalayas to the tropical coasts — enormous climate range = enormous species range.

3. EVOLUTIONARY HISTORY: India was an island continent (like Australia) for millions of years after Gondwana breakup → evolved many unique species in isolation.

4. RIVERS AND WETLANDS: 14 major river systems support distinct freshwater biodiversity.

5. MARINE: 7,500+ km coastline with coral reefs, mangroves, seagrasses — extremely rich marine biodiversity.

THREE BIODIVERSITY HOTSPOTS IN INDIA:
→ Western Ghats: 5,000+ flowering plants, 1,700+ endemic plants, 450+ endemic fish species
→ Eastern Himalayas: Highest bird diversity in India
→ Indo-Burma (includes NE India): Rich freshwater biodiversity`,
        keyFact: 'A "biodiversity hotspot" has two criteria: (1) contains at least 1,500 endemic vascular plant species and (2) has lost at least 70% of its original habitat. India has 3 of the 36 global hotspots. Western Ghats is the most biodiverse — it is also the most threatened.'
      },
      {
        step: 2,
        type: 'concept',
        title: 'Protected Area Network — How India Protects Wildlife',
        body: `India has a layered system of protected areas under the Wildlife Protection Act 1972.

CATEGORIES (from strictest to most flexible):

1. NATIONAL PARKS (106 in India):
→ Strictest protection — NO human activity allowed
→ No grazing, no collection of forest produce
→ Boundary clearly demarcated
→ Examples: Jim Corbett (first NP, 1936), Kaziranga, Ranthambore

2. WILDLIFE SANCTUARIES (565 in India):
→ Slightly less strict — some limited human activity allowed
→ People cannot be evicted from their homes within
→ Examples: Chilika WLS (Odisha), Bharatpur (Keoladeo)

3. CONSERVATION RESERVES:
→ Declared by state government on government/community/private land
→ No relocation of people needed
→ Act as buffer/corridor between protected areas

4. COMMUNITY RESERVES:
→ Declared by state government on community/private land
→ Local community manages it
→ Maximum local participation, minimum restriction

5. BIOSPHERE RESERVES (not under WPA, UNESCO designation):
→ Three-zone model: Core (strictly protected) + Buffer (limited activity) + Transition (human activity)
→ India has 18 BRs, 12 recognized by UNESCO (Nilgiri, Gulf of Mannar, Sundarbans, etc.)

TIGER RESERVES (54 in India):
→ Designated under Project Tiger / NTCA (National Tiger Conservation Authority)
→ Core zone + Buffer zone
→ NOT a separate category under WPA — it is a management designation overlaid on NP/WLS`,
        keyFact: 'India\'s tiger population: 1,827 (1972) → 3,167 (2022 census). India has ~70% of world\'s wild tigers. Project Tiger (1973) is considered one of the world\'s most successful wildlife conservation programmes. Tiger = "umbrella species" — protecting tigers protects entire ecosystems.'
      },
      {
        step: 3,
        type: 'concept',
        title: 'Threats to Biodiversity & International Conventions',
        body: `India's biodiversity faces serious threats, and a global framework has been built to address them.

THREATS (remember HIPPC):
H — Habitat Loss (most serious): Deforestation, agriculture expansion, urbanization
I — Invasive Species: Non-native species that displace native ones (Water Hyacinth, Lantana)
P — Pollution: Air, water, soil, light, noise
P — Population growth: More people → more land use → more habitat loss
C — Climate Change: Shifting habitats, coral bleaching, altered rainfall → species mismatch

INTERNATIONAL CONVENTIONS:

CBD (Convention on Biological Diversity, 1992):
→ Three objectives: Conservation + Sustainable use + Access and Benefit Sharing (ABS)
→ Nagoya Protocol (2010) = ABS framework (Prior Informed Consent before using traditional knowledge)
→ Kunming-Montreal GBF (2022, COP15): 30x30 target — protect 30% of land and oceans by 2030

CITES (Convention on International Trade in Endangered Species):
→ Controls international trade in wild plants and animals
→ Three appendices: I (no trade), II (regulated trade), III (country-specific)
→ Tiger, rhino, elephant = Appendix I (no commercial trade)

RAMSAR CONVENTION (1971):
→ Specifically for wetlands
→ India has 80 Ramsar sites (highest in Asia, 2024)
→ "Wise use" of wetlands = sustainable use

CMS (Convention on Migratory Species):
→ Protects migratory animals across national boundaries
→ Important for India's migratory birds (Siberian Crane, Bar-headed Goose)`,
        keyFact: 'The Kunming-Montreal Global Biodiversity Framework (COP15, December 2022) is called the most ambitious biodiversity deal ever. The "30x30" target: protect at least 30% of the planet\'s land, inland waters, coastal areas, and oceans by 2030. India is a party to CBD and must implement this.'
      },
      {
        step: 4,
        type: 'quiz',
        questions: [
          {
            q: 'India has how many biodiversity hotspots (out of 36 globally)?',
            opts: ['1', '2', '3', '5'],
            ans: 2
          },
          {
            q: 'Which protected area category has the STRICTEST protection (no human activity at all)?',
            opts: ['Wildlife Sanctuary', 'National Park', 'Biosphere Reserve Core', 'Conservation Reserve'],
            ans: 1
          },
          {
            q: 'The Nagoya Protocol (under CBD) deals with:',
            opts: ['Climate finance', 'Access and Benefit Sharing of genetic resources and traditional knowledge', 'Carbon markets', 'Endangered species trade'],
            ans: 1
          },
          {
            q: 'CITES regulates:',
            opts: ['Pollution across borders', 'International trade in wild plants and animals', 'Wetland conservation', 'Migratory species protection'],
            ans: 1
          },
          {
            q: 'India\'s tiger population as per 2022 census is approximately:',
            opts:['1,200', '1,827', '3,167', '5,000'],
            ans: 2
          }
        ]
      },
      {
        step: 5,
        type: 'summary',
        title: 'Revision Card — Biodiversity & Conservation',
        points: [
          'India = 7-8% of world\'s species in 2.4% land area. 3 hotspots: Western Ghats, Eastern Himalayas, Indo-Burma.',
          'Protected Area hierarchy: National Park (strictest) > Wildlife Sanctuary > Conservation Reserve > Community Reserve.',
          'Tiger Reserves = management designation (Core + Buffer), not separate WPA category. 54 TRs in India.',
          'Biosphere Reserves = UNESCO designation. Three zones: Core + Buffer + Transition. India: 18 BRs, 12 UNESCO-recognized.',
          'Threats (HIPPC): Habitat Loss > Invasive Species > Pollution > Population > Climate Change. Habitat loss is #1.',
          'CBD (1992): Conservation + Sustainable use + ABS. Nagoya Protocol = ABS. COP15 GBF = 30x30 by 2030.',
          'CITES: Trade in endangered species. RAMSAR: Wetlands. CMS: Migratory species. Know which convention covers what.',
          'India: 80 Ramsar sites (highest in Asia). Project Tiger (1973): tigers 1,827 → 3,167 (2022). India has 70% of world\'s tigers.'
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════
  // MODULE 6: INT. RELATIONS — India's Foreign Policy
  // ══════════════════════════════════════════════════════
  {
    id: 'ncert_ir_1',
    subject: 'Int. Relations',
    title: 'India\'s Foreign Policy — Principles, Pillars & Practice',
    class: 'Class XII Political Science',
    chapter: 'India\'s External Relations',
    nodeId: 'ir1',
    duration: 14,
    lessons: [
      {
        step: 1,
        type: 'concept',
        title: 'Foundations of India\'s Foreign Policy',
        body: `India's foreign policy has evolved over 75 years but rests on some enduring principles first articulated by Jawaharlal Nehru.

PANCHSHEEL (1954):
Five Principles of Peaceful Coexistence:
1. Mutual respect for sovereignty and territorial integrity
2. Mutual non-aggression
3. Mutual non-interference in internal affairs
4. Equality and mutual benefit
5. Peaceful coexistence

Signed between India and China (1954) regarding Tibet. Later adopted by the Non-Aligned Movement.

NON-ALIGNED MOVEMENT (NAM):
→ Founded at Belgrade Conference 1961 (Nehru + Tito + Nasser + Sukarno + Nkrumah)
→ Bandung Conference 1955 = spirit of NAM (29 Asian-African nations)
→ India refused to join either US or Soviet bloc during Cold War
→ NAM = "third option" for newly independent nations

STRATEGIC AUTONOMY:
→ India's core foreign policy principle
→ Does not join exclusive alliances
→ Maintains freedom to align differently on different issues
→ Example: In Quad (security) AND SCO (Eurasian connectivity)

GUJRAL DOCTRINE (I.K. Gujral, 1996):
→ India should give without expecting reciprocity from smaller neighbours
→ India should be generous unilaterally with South Asia
→ Basis for "Neighbourhood First" policy of PM Modi (2014)`,
        keyFact: 'India is the world\'s largest democracy and a founder of the Non-Aligned Movement. India\'s current foreign policy is described as "multi-alignment" — engaging multiple groupings simultaneously without exclusive commitments. This is an evolution from NAM\'s "non-alignment."'
      },
      {
        step: 2,
        type: 'concept',
        title: 'India\'s Key Multilateral Engagements',
        body: `India is part of multiple overlapping multilateral groupings — understanding each one's purpose is key for UPSC.

QUAD (Quadrilateral Security Dialogue):
Members: India, USA, Japan, Australia
→ Originally 2007 (PM Abe's initiative). Dormant then revived 2017.
→ First Leader Summit 2021. Focus: Free and Open Indo-Pacific
→ Four pillars: COVID vaccines, Climate, Critical Technologies, Infrastructure
→ NOT a formal military alliance — no treaty, no mutual defence clause
→ India's logic: Strategic partnership without exclusive commitment

SCO (Shanghai Cooperation Organisation):
Members: India, China, Russia, Pakistan, Kazakhstan, Kyrgyzstan, Tajikistan, Uzbekistan, Belarus, Iran
→ India full member since 2017 (Astana Summit)
→ Focus: Eurasian security, counterterrorism, connectivity
→ India chairs SCO in 2023
→ India's logic: Engage Eurasia, maintain connectivity to Central Asia, keep dialogue with China/Pakistan

BRICS:
Members: Brazil, Russia, India, China, South Africa (+ BRICS+ new members: UAE, Iran, Ethiopia, Egypt, Argentina)
→ Focus: Alternative to Western-dominated global order
→ New Development Bank (NDB) = BRICS development bank (HQ Shanghai)
→ India's logic: Champion of Global South, alternative multilateral voice

G20:
→ India held presidency 2023: Theme = Vasudhaiva Kutumbakam
→ Achievement: African Union admitted as G20 member
→ India bridges Global South and G7 in G20 forums

APPARENT CONTRADICTION (Quad vs SCO):
→ India in Quad (which implicitly balances China) AND in SCO (which includes China)
→ India's answer: "Multi-alignment" — different groupings serve different purposes. Strategic ambiguity is a tool, not a weakness.`,
        keyFact: 'India\'s G20 Presidency 2023 is considered a diplomatic success. Key achievements: African Union made permanent G20 member (India championed this), Global Biofuels Alliance launched, Digital Public Infrastructure (India Stack model) adopted as G20 standard, Delhi Declaration achieved consensus despite Russia-Ukraine war disagreements.'
      },
      {
        step: 3,
        type: 'example',
        title: 'India-China Relations — Complexity in Practice',
        body: `The India-China relationship illustrates how modern foreign policy deals with complex interdependence:

THE RELATIONSHIP IS:
→ BORDER DISPUTE: 3,488 km undemarcated LAC with competing perceptions in 3 sectors
→ ECONOMIC PARTNER: Bilateral trade ~$130 billion (2023) — China = India's largest trading partner
→ STRATEGIC COMPETITOR: Both seek influence in South Asia, Indian Ocean, and globally
→ IDEOLOGICAL DIFFERENCE: World's largest democracy vs one-party state

GALWAN VALLEY CLASH (June 2020):
→ 20 Indian soldiers killed (worst violence at LAC since 1975)
→ India banned 200+ Chinese apps (TikTok, etc.)
→ Disengagement process began: multiple rounds of Corps Commander talks

OCTOBER 2024 DISENGAGEMENT:
→ Patrolling agreement reached at Depsang and Demchok friction points
→ Special Representatives' meeting after 5 years
→ First Indian PM visit to China since Galwan (PM Modi at Kazan BRICS, 2024)

KEY TENSIONS:
→ China's "String of Pearls" (ports in Bangladesh, Sri Lanka, Myanmar, Pakistan) = India encirclement concern
→ CPEC (China-Pakistan Economic Corridor) passes through PoK = India's objection to BRI
→ China blocking India's NSG membership (for nuclear trade) and UNSC permanent seat

WHY INDIA DOESN'T SIMPLY CONFRONT CHINA:
→ Economic interdependence: India cannot afford to fully decouple
→ Military asymmetry: China's defence budget is ~3x India's
→ Multiple fronts: If India confronts China, Pakistan creates a second front
→ Strategic patience: India builds own strength while managing relations`,
        keyFact: 'India follows a strategy of "competitive coexistence" with China. Simultaneously: deepening economic ties (imports from China), strategic competition (LAC deployment), diplomatic engagement (BRICS, SCO), and building alternative partnerships (Quad, supply chain diversification). This is the complexity of modern geopolitics.'
      },
      {
        step: 4,
        type: 'quiz',
        questions: [
          {
            q: 'The Non-Aligned Movement (NAM) was formally founded at:',
            opts: ['Bandung Conference 1955', 'Belgrade Conference 1961', 'Cairo Conference 1964', 'New Delhi Conference 1970'],
            ans: 1
          },
          {
            q: 'India became a full member of SCO (Shanghai Cooperation Organisation) in:',
            opts: ['2007', '2012', '2017', '2020'],
            ans: 2
          },
          {
            q: 'India\'s G20 Presidency 2023 key diplomatic achievement was:',
            opts: ['Resolved India-China border dispute', 'African Union admitted as permanent G20 member', 'Quad upgraded to military alliance', 'India joined NATO as partner'],
            ans: 1
          },
          {
            q: 'The Galwan Valley clash (June 2020) resulted in:',
            opts: ['20 Indian soldiers killed — worst LAC violence since 1975', '5 Indian soldiers killed', 'No Indian casualties', '50 soldiers killed on both sides'],
            ans: 0
          },
          {
            q: 'Panchsheel (Five Principles of Peaceful Coexistence) was signed between:',
            opts: ['India and USA', 'India and China (regarding Tibet, 1954)', 'India and Soviet Union', 'India and Pakistan'],
            ans: 1
          }
        ]
      },
      {
        step: 5,
        type: 'summary',
        title: 'Revision Card — India\'s Foreign Policy',
        points: [
          'Panchsheel (1954): 5 principles — Sovereignty, Non-aggression, Non-interference, Equality, Peaceful coexistence. India-China, basis of NAM.',
          'NAM: Founded Belgrade 1961 (Nehru + Tito + Nasser). Bandung 1955 = spirit. Cold War "third option."',
          'Strategic Autonomy = India\'s core principle. Current form = "Multi-alignment" (not non-alignment).',
          'Quad (India-USA-Japan-Australia): Free & Open Indo-Pacific. Not a treaty alliance. Revived 2017, Leader Summit 2021.',
          'SCO (India + China + Russia + others): India member since 2017. Eurasian connectivity + security.',
          'BRICS: Alternative global order. New Development Bank. BRICS+ expanded 2024 (UAE, Iran, Egypt, Ethiopia).',
          'G20 Presidency 2023: African Union admitted, Biofuels Alliance, DPI as global standard, Delhi Declaration.',
          'India-China: $130B trade + LAC dispute + strategic competition. Galwan 2020 → 2024 disengagement. "Competitive coexistence."'
        ]
      }
    ]
  }
];

// Auto-merge when loaded
if (typeof NCERT_MODULES !== 'undefined') {
  NCERT_MODULES.push(...NCERT_MODULES_2);
}
