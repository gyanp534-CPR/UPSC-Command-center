// UPSC COSMOS v6 — QUESTION BANK + CURRENT AFFAIRS + TOPIC FREQUENCY
// PYQ LINEAGE · CONCEPT CLUSTERS · POLICY TIMELINE · MAINS THINKING

const QUESTION_BANK = [
  // ── POLITY ──────────────────────────────────────────────
  {id:'q_p_001',subject:'Polity',node:'p1',difficulty:'basic',year:2019,topic:'Preamble',q:'The word "SECULAR" was added to the Preamble by which Constitutional Amendment?',opts:['42nd Amendment','44th Amendment','52nd Amendment','61st Amendment'],ans:0,explain:'42nd Amendment Act 1976 (during Emergency) added SOCIALIST, SECULAR and INTEGRITY to the Preamble.',wrongExplain:'44th Amendment restored pre-Emergency provisions. 52nd = anti-defection law. 61st = voting age 21→18.'},
  {id:'q_p_002',subject:'Polity',node:'p1',difficulty:'medium',year:2022,topic:'Constitutional Sources',q:'The concept of "Judicial Review" in India is primarily borrowed from:',opts:['United Kingdom','United States of America','Canada','Australia'],ans:1,explain:'Judicial Review was borrowed from USA along with Fundamental Rights.',wrongExplain:'UK follows parliamentary sovereignty. Canada gave federal structure with strong centre. Australia gave Concurrent List.'},
  {id:'q_p_003',subject:'Polity',node:'p2',difficulty:'medium',year:2020,topic:'Fundamental Rights',q:'Right to Privacy was declared a Fundamental Right under Article 21 in which landmark case?',opts:['Kesavananda Bharati case','K.S. Puttaswamy case (2017)','Maneka Gandhi case','Minerva Mills case'],ans:1,explain:'In K.S. Puttaswamy v. Union of India (2017), a 9-judge bench unanimously held that Right to Privacy is a fundamental right under Article 21.',wrongExplain:'Kesavananda (1973) = Basic Structure. Maneka Gandhi (1978) = personal liberty expansion. Minerva Mills (1980) = balance FR and DPSP.'},
  {id:'q_p_004',subject:'Polity',node:'p2',difficulty:'hard',year:2021,topic:'Writs',q:'Which writ literally means "We Command"?',opts:['Habeas Corpus','Mandamus','Prohibition','Certiorari'],ans:1,explain:'Mandamus = "We Command" — issued to compel a public authority to perform a public or statutory duty.',wrongExplain:'Habeas Corpus = produce the body. Prohibition = stop lower court from exceeding jurisdiction. Certiorari = quash lower court order. Quo Warranto = by what authority.'},
  {id:'q_p_005',subject:'Polity',node:'p3',difficulty:'basic',year:2018,topic:'DPSP',q:'Which of the following is a Gandhian Principle under DPSP?',opts:['Equal pay for equal work (Art 39D)','Organization of village panchayats (Art 40)','Free legal aid (Art 39A)','Uniform Civil Code (Art 44)'],ans:1,explain:'Organization of village panchayats (Art 40) is a Gandhian DPSP. Gandhi believed in Gram Swaraj — village self-governance.',wrongExplain:'Art 39D = Socialist. Art 39A = Liberal-Intellectual. Art 44 (UCC) = Liberal-Intellectual. Know the 3 DPSP categories.'},
  {id:'q_p_006',subject:'Polity',node:'p4',difficulty:'medium',year:2023,topic:'Parliament',q:'Money Bill can be introduced only in:',opts:['Rajya Sabha','Lok Sabha','Either House','Joint Sitting'],ans:1,explain:'Money Bill (Art 110) can only be introduced in Lok Sabha with prior recommendation of the President. Rajya Sabha can only suggest amendments.',wrongExplain:'Rajya Sabha has NO power to reject Money Bills — can only send recommendations within 14 days. If no action, deemed passed.'},
  {id:'q_p_007',subject:'Polity',node:'p5',difficulty:'medium',year:2022,topic:'Judiciary',q:'The "Basic Structure Doctrine" was propounded in:',opts:['Golak Nath case 1967','Kesavananda Bharati case 1973','Indira Gandhi case 1975','Minerva Mills case 1980'],ans:1,explain:'Kesavananda Bharati v. State of Kerala (1973): 13-judge bench ruled Parliament cannot amend the Basic Structure of the Constitution.',wrongExplain:'Golak Nath (1967) held FRs cannot be amended at all. Indira Gandhi (1975) applied Basic Structure. Minerva Mills (1980) reinforced it with balance test.'},
  {id:'q_p_008',subject:'Polity',node:'p6',difficulty:'medium',year:2021,topic:'Federalism',q:'The Sarkaria Commission (1983) was constituted to examine:',opts:['Electoral reforms','Centre-State financial relations only','Federal relations and allocation of powers between Centre and States','Administrative reforms in IAS'],ans:2,explain:'Sarkaria Commission examined Centre-State relations — allocation of powers, role of Governor, Article 356 use.',wrongExplain:'Punchhi Commission (2007) revisited same issues. Finance Commission specifically handles Centre-State financial devolution.'},
  {id:'q_p_009',subject:'Polity',node:'p7',difficulty:'medium',year:2018,topic:'Local Governance',q:'The 73rd Constitutional Amendment inserted which Schedule related to Panchayat subjects?',opts:['10th Schedule','11th Schedule','12th Schedule','9th Schedule'],ans:1,explain:'11th Schedule (29 subjects for Panchayats) inserted by 73rd Amendment 1992. 12th Schedule (18 subjects for Municipalities) by 74th Amendment.',wrongExplain:'10th Schedule = anti-defection (52nd Amendment 1985). 9th Schedule = land reform laws. 12th Schedule = municipalities.'},
  {id:'q_p_010',subject:'Polity',node:'p8',difficulty:'hard',year:2023,topic:'Elections',q:'NOTA (None of the Above) in Indian elections was introduced by:',opts:['Parliament via an Act','Supreme Court in PUCL case 2013','Election Commission alone','Constitutional Amendment'],ans:1,explain:'SC in PUCL v. UoI (2013): Right to vote includes right to reject all candidates. ECI implemented NOTA option on EVMs.',wrongExplain:'NOTA votes are counted but do not affect results — candidate with most votes still wins. NOTA only expresses disapproval.'},
  {id:'q_p_011',subject:'Polity',node:'p4',difficulty:'hard',year:2020,topic:'Parliament',q:'Which Parliamentary Committee examines government expenditure BEFORE the budget is voted upon?',opts:['Public Accounts Committee','Estimates Committee','Committee on Subordinate Legislation','Standing Committee on Finance'],ans:1,explain:'Estimates Committee examines detailed estimates before Parliament votes. Suggests economies. Cannot examine defence estimates.',wrongExplain:'PAC examines AFTER spending (post-audit). EC examines BEFORE (pre-audit). Different functions — PAC is post-mortem, EC is pre-approval.'},
  {id:'q_p_012',subject:'Polity',node:'p5',difficulty:'hard',year:2019,topic:'Judiciary',q:'Original exclusive jurisdiction of Supreme Court under Article 131 covers:',opts:['All criminal cases in India','Centre-State and inter-state disputes only','Any matter of national importance','FR cases only'],ans:1,explain:'Art 131: SC has exclusive original jurisdiction in disputes between Centre and States, or between States inter se. No other court can hear these.',wrongExplain:'Advisory jurisdiction (Art 143): President refers questions for SC opinion (not binding). Original jurisdiction covers only federal disputes.'},

  // ── ECONOMY ──────────────────────────────────────────────
  {id:'q_e_001',subject:'Economy',node:'e1',difficulty:'basic',year:2019,topic:'GDP',q:'Which of the following is NOT included in GDP calculation?',opts:['Value of services produced','Transfer payments like pensions and scholarships','Government consumption expenditure','Gross private investment'],ans:1,explain:'GDP measures PRODUCTION. Transfer payments are money transfers without production — excluded. GDP = C + I + G + (X-M).',wrongExplain:'This is a very common UPSC trap. Government expenditure G includes consumption but NOT transfer payments.'},
  {id:'q_e_002',subject:'Economy',node:'e2',difficulty:'medium',year:2022,topic:'Monetary Policy',q:'The Monetary Policy Committee (MPC) was constituted under:',opts:['RBI Act 1934 (amended 2016)','FRBM Act 2003','Banking Regulation Act 1949','Finance Act 2015'],ans:0,explain:'MPC constituted under RBI Act 1934 as amended in 2016. 6 members: 3 from RBI (including Governor as chair) + 3 appointed by Government.',wrongExplain:'FRBM Act governs fiscal deficit. Banking Regulation Act governs commercial banks. Finance Act covers annual budget provisions.'},
  {id:'q_e_003',subject:'Economy',node:'e3',difficulty:'hard',year:2021,topic:'Fiscal Policy',q:'Primary Deficit equals Fiscal Deficit minus:',opts:['Revenue Deficit','Capital Expenditure','Interest payments on past debt','Subsidies'],ans:2,explain:'Primary Deficit = Fiscal Deficit − Interest Payments. Shows current borrowing need EXCLUDING legacy interest burden.',wrongExplain:'Fiscal Deficit = Total Expenditure − Revenue Receipts − Non-Debt Capital Receipts. Primary Deficit isolates "fresh borrowing need".'},
  {id:'q_e_004',subject:'Economy',node:'e4',difficulty:'medium',year:2020,topic:'Agriculture',q:'Minimum Support Price (MSP) is recommended by:',opts:['Cabinet Committee on Economic Affairs','Commission for Agricultural Costs and Prices (CACP)','NITI Aayog','Food Corporation of India'],ans:1,explain:'CACP recommends MSP for about 23 crops. Cabinet APPROVES it. FCI PROCURES at MSP.',wrongExplain:'CACP only RECOMMENDS — Cabinet approves. This distinction appears in UPSC options frequently.'},
  {id:'q_e_005',subject:'Economy',node:'e5',difficulty:'hard',year:2023,topic:'Digital Economy',q:'India Stack refers to:',opts:['Physical IT infrastructure of ISRO','Open API infrastructure: Aadhaar + eKYC + eSign + DigiLocker + UPI','Government cloud computing platform','MEITY digital literacy program'],ans:1,explain:'India Stack = layered public digital infrastructure enabling fintech companies to build services on top.',wrongExplain:'India Stack is PUBLIC GOODS infrastructure. UPI layer enables payments. Aadhaar layer enables identity. This model is being replicated globally (MOSIP, G20 DPI).'},
  {id:'q_e_006',subject:'Economy',node:'e3',difficulty:'medium',year:2020,topic:'Budget',q:'Which Constitutional Article requires Annual Financial Statement (Budget) to be presented?',opts:['Article 112','Article 116','Article 265','Article 301'],ans:0,explain:'Article 112: Annual Financial Statement showing estimated receipts and expenditure for each financial year must be laid before both Houses.',wrongExplain:'Art 116 = Vote on Account. Art 265 = no tax without law. Art 301 = freedom of trade throughout territory.'},
  {id:'q_e_007',subject:'Economy',node:'e2',difficulty:'hard',year:2019,topic:'Banking',q:'Open Market Operations (OMO) by RBI involve:',opts:['Lending to banks at repo rate','Buying/selling govt securities to manage liquidity','Setting CRR and SLR','Printing new currency'],ans:1,explain:'OMO: RBI buys govt securities = injects liquidity (expansionary). Sells = absorbs liquidity (contractionary). Quantitative tool.',wrongExplain:'OMO is a quantity tool. Repo rate is a price tool. Together they form RBI liquidity management framework.'},
  {id:'q_e_008',subject:'Economy',node:'e4',difficulty:'hard',year:2023,topic:'Agriculture',q:'Bihar was the first state to abolish APMC Act, allowing farmers to sell directly. This happened in:',opts:['2001','2006','2012','2018'],ans:1,explain:'Bihar abolished APMC Act in 2006 — first state to do so. Central farm laws (2020) tried to extend this nationally but were repealed in 2021.',wrongExplain:'Bihar abolishing APMC is cited in every agricultural reform discussion. Results were mixed: market freedom but loss of price support infrastructure.'},
  {id:'q_e_009',subject:'Economy',node:'e9',difficulty:'medium',year:2021,topic:'Welfare',q:'National Food Security Act 2013 covers approximately what percentage of India\'s population?',opts:['50%','67%','75%','100%'],ans:1,explain:'NFSA 2013 covers up to 75% rural + 50% urban = ~67% of total population with subsidized food grains.',wrongExplain:'AAY families get 35kg/month. Priority Households (PHH) get 5kg/month. Both covered under NFSA at subsidized prices.'},
  {id:'q_e_010',subject:'Economy',node:'e5',difficulty:'medium',year:2022,topic:'Digital',q:'CBDC (Central Bank Digital Currency) in India called Digital Rupee is issued by:',opts:['SBI as largest bank','RBI as central bank','NPCI','Ministry of Finance'],ans:1,explain:'Digital Rupee (e₹) issued by RBI. It is legal tender backed by government, unlike cryptocurrencies.',wrongExplain:'NPCI operates UPI/IMPS but cannot issue currency. Only central banks issue legal tender.'},
  {id:'q_e_011',subject:'Economy',node:'e1',difficulty:'basic',year:2018,topic:'Inflation',q:'Which type of inflation is caused by increase in production costs?',opts:['Demand-Pull Inflation','Cost-Push Inflation','Structural Inflation','Imported Inflation'],ans:1,explain:'Cost-Push Inflation: Rising production costs (wages, oil, raw materials) push up prices. Supply-side phenomenon.',wrongExplain:'Demand-pull = too much money chasing goods. Cost-push = production becomes costlier. Stagflation often combines both.'},
  {id:'q_e_012',subject:'Economy',node:'e6',difficulty:'hard',year:2020,topic:'External Sector',q:'Special Drawing Rights (SDR) is a reserve asset created by:',opts:['World Bank','IMF','WTO','Asian Development Bank'],ans:1,explain:'SDR created by IMF in 1969 to supplement official reserves. Not a currency — a claim on freely usable currencies of IMF members.',wrongExplain:'SDR value basket: USD, EUR, CNY, JPY, GBP. India\'s SDR allocation boosted forex reserves during COVID-19 emergency (2021).'},
  {id:'q_e_013',subject:'Economy',node:'e7',difficulty:'medium',year:2022,topic:'Infrastructure',q:'PM Gati Shakti National Master Plan uses which technology for integrated infrastructure planning?',opts:['Blockchain','GIS with satellite imagery integrating 1,500+ data layers','AI and ML only','Big Data analytics'],ans:1,explain:'PM Gati Shakti (2021) uses GIS-based platform integrating 1,500+ data layers to plan roads, railways, ports, telecom holistically.',wrongExplain:'GIS integration prevents duplication (roads dug twice). 16 ministries and states access for coordinated planning.'},
  {id:'q_e_014',subject:'Economy',node:'e6',difficulty:'medium',year:2021,topic:'Trade',q:'India signed CEPA (Comprehensive Economic Partnership Agreement) with UAE in:',opts:['2019','2020','2022','2024'],ans:2,explain:'India-UAE CEPA (2022): India\'s fastest-negotiated FTA covering goods, services, investments.',wrongExplain:'India-UK FTA and India-EU FTA were under negotiation. India has FTAs with ASEAN, Japan, South Korea.'},
  {id:'q_e_015',subject:'Economy',node:'e7',difficulty:'medium',year:2023,topic:'Infrastructure',q:'National Monetisation Pipeline (NMP) involves:',opts:['Selling government assets outright','Leasing brownfield infrastructure while retaining government ownership','Privatizing PSUs','Building new greenfield infrastructure'],ans:1,explain:'NMP (2021): Govt leases EXISTING (brownfield) infrastructure to private operators while RETAINING OWNERSHIP. Roads, railways, airports, power.',wrongExplain:'NMP is NOT asset sale — it is structured leasing. InvIT (Infrastructure Investment Trust) is main monetisation instrument.'},

  // ── ENVIRONMENT ──────────────────────────────────────────
  {id:'q_ev_001',subject:'Environment',node:'ev1',difficulty:'basic',year:2018,topic:'Ecosystems',q:'Biomagnification refers to:',opts:['Growth of organisms in favourable conditions','Increase of toxins at higher trophic levels in food chain','Photosynthesis in plants','Decomposition of organic matter'],ans:1,explain:'Biomagnification: Toxins (DDT, mercury) concentrate at each trophic level. Top predators have highest concentration.',wrongExplain:'DDT spraying → plankton → fish → eagles. Eagle eggshells thinned → population crash. Led to DDT ban in 1972.'},
  {id:'q_ev_002',subject:'Environment',node:'ev2',difficulty:'medium',year:2022,topic:'Climate',q:'India\'s Net Zero target committed at COP26 Glasgow is:',opts:['2040','2050','2070','2100'],ans:2,explain:'India\'s PANCHAMRIT at COP26 includes Net Zero by 2070. Also: 500GW non-fossil, 50% electricity from renewables by 2030.',wrongExplain:'China = 2060. USA, EU = 2050. India = 2070 citing CBDR and development needs.'},
  {id:'q_ev_003',subject:'Environment',node:'ev3',difficulty:'medium',year:2021,topic:'Biodiversity',q:'Kunming-Montreal Global Biodiversity Framework (COP15, 2022) set which key target?',opts:['Net zero biodiversity loss by 2025','30x30: protect 30% of land and oceans by 2030','No more extinctions after 2030','Double global forest cover by 2035'],ans:1,explain:'COP15 Montreal 2022: 30x30 target — protect at least 30% of land, inland waters, marine and coastal areas by 2030.',wrongExplain:'Post-2020 GBF replaced Aichi Targets. India is a party to CBD. 30x30 requires significant expansion of protected area coverage.'},
  {id:'q_ev_004',subject:'Environment',node:'ev3',difficulty:'hard',year:2020,topic:'Protected Areas',q:'Conservation Reserves under Wildlife Protection Act are declared by:',opts:['Central Government only','State Government; can be declared on government land adjacent to Protected Areas','Any district collector','Gram Sabha only'],ans:1,explain:'Conservation Reserve: State govt declares on government/community/private land near Protected Areas. Community Reserve: on community land with local management committee.',wrongExplain:'Both are IUCN Category V. Community Reserve gives MORE local management rights. Conservation Reserve is government-maintained buffer/corridor tool.'},
  {id:'q_ev_005',subject:'Environment',node:'ev2',difficulty:'hard',year:2021,topic:'Climate Finance',q:'Loss and Damage Fund in climate negotiations was formally established at:',opts:['COP21 Paris 2015','COP26 Glasgow 2021','COP27 Sharm el-Sheikh 2022','COP28 Dubai 2023'],ans:2,explain:'Loss and Damage Fund formally agreed at COP27 (2022). COP28 (2023) operationalized it with $700M pledges.',wrongExplain:'Paris Agreement only mentioned L&D in Art 8. Glasgow text acknowledged it but created no fund. Sharm el-Sheikh actually established the fund.'},
  {id:'q_ev_006',subject:'Environment',node:'ev5',difficulty:'medium',year:2022,topic:'Renewable Energy',q:'International Solar Alliance (ISA) was launched at:',opts:['COP21 Paris 2015 by India and France','G20 Brisbane 2014','COP26 Glasgow 2021','BRICS Summit 2016'],ans:0,explain:'ISA launched at COP21, Paris 2015 by PM Modi and President Hollande. Headquartered in Gurugram. 120+ member nations.',wrongExplain:'ISA focus: financing solar projects in developing nations. OSOWOG (One Sun One World One Grid) is India\'s complementary initiative.'},
  {id:'q_ev_007',subject:'Environment',node:'ev1',difficulty:'basic',year:2019,topic:'Ecology',q:'Sea otter is called a "keystone species" because:',opts:['It is the largest marine mammal','Its presence controls sea urchin populations protecting kelp forests — small population, huge ecosystem impact','It produces the most oxygen','It is at the base of the food chain'],ans:1,explain:'Keystone species: Sea otter controls sea urchins which would otherwise destroy kelp forests. Disproportionate ecosystem impact relative to population size.',wrongExplain:'Apex predator = highest trophic level (Bengal tiger). Keystone species = disproportionate ecosystem effect. Not the same.'},
  {id:'q_ev_008',subject:'Environment',node:'ev6',difficulty:'medium',year:2019,topic:'Environmental Law',q:'Environment Impact Assessment (EIA) in India is governed by:',opts:['Environment Protection Act 1986 and EIA Notification 2006','Wildlife Protection Act 1972','Biological Diversity Act 2002','Forest Conservation Act 1980'],ans:0,explain:'EIA Notification 2006 under EPA 1986 mandates prior environmental clearance for 39 categories of projects.',wrongExplain:'Forest clearance under Forest Conservation Act 1980. Biodiversity Act 2002 handles access and benefit sharing. EIA is separate from wildlife or forest clearance.'},
  {id:'q_ev_009',subject:'Environment',node:'ev5',difficulty:'medium',year:2023,topic:'Green Hydrogen',q:'Green Hydrogen is produced by:',opts:['Steam methane reforming of natural gas','Electrolysis of water using renewable electricity','Coal gasification','Biomass fermentation'],ans:1,explain:'Green Hydrogen: Water electrolysis using renewable electricity (solar/wind). Zero emission. Blue = natural gas + CCS. Grey = natural gas without CCS.',wrongExplain:'India\'s National Green Hydrogen Mission targets 5 MMT/year by 2030. Rajasthan and Gujarat identified as green hydrogen production hubs.'},
  {id:'q_ev_010',subject:'Environment',node:'ev3',difficulty:'medium',year:2022,topic:'Wildlife',q:'Loktak Lake, known for floating islands called Phumdis, is located in:',opts:['Assam','Meghalaya','Manipur','Nagaland'],ans:2,explain:'Loktak Lake (Manipur): Largest freshwater lake in Northeast India. Phumdis = floating islands of soil and vegetation. Keibul Lamjao NP floats on it.',wrongExplain:'Keibul Lamjao = world\'s only floating national park. Home to Sangai (brow-antlered deer). Loktak is a Ramsar site.'},
  {id:'q_ev_011',subject:'Environment',node:'ev4',difficulty:'medium',year:2021,topic:'Pollution',q:'PM2.5 particles are more dangerous than PM10 primarily because:',opts:['They are more acidic','Smaller size (< 2.5 microns) penetrates deep into lungs and bloodstream','They stay in air longer','They are more visible'],ans:1,explain:'PM2.5 penetrates into alveoli (deep lungs) and enters bloodstream — causes cardiovascular disease, lung cancer, strokes.',wrongExplain:'India has highest global PM2.5 burden. 13 of world\'s 20 most polluted cities are in India. Delhi AQI hits severe (>400) in winters.'},
  {id:'q_ev_012',subject:'Environment',node:'ev6',difficulty:'medium',year:2019,topic:'Rights',q:'Forest Rights Act 2006 recognizes:',opts:['Forest land belongs to Forest Department only','Rights of forest-dwelling Scheduled Tribes and OTFDs over forest land they have inhabited','Conversion of forests to agriculture is legal with permit','Any citizen can collect forest produce freely'],ans:1,explain:'FRA 2006: Recognizes individual + community rights of Scheduled Tribes and Other Traditional Forest Dwellers over forest land and forest produce.',wrongExplain:'FRA corrected historical injustice — forest communities had lived there for generations but had no legal land rights. Gram Sabha approves rights claims.'},

  // ── HISTORY ──────────────────────────────────────────────
  {id:'q_h_001',subject:'History',node:'h1',difficulty:'medium',year:2019,topic:'Maurya',q:'Which Ashokan Edict describes his grief after the Kalinga War?',opts:['Major Rock Edict XIII','Major Rock Edict X','Pillar Edict VII','Minor Rock Edict I'],ans:0,explain:'Major Rock Edict XIII (most personal): Describes mass death after Kalinga, Ashoka\'s remorse, and his shift to Dhamma.',wrongExplain:'14 Major Rock Edicts cover: morality, welfare, dhamma, tolerance. Minor Rock Edicts are shorter. Pillar Edicts found at Sarnath, Sanchi.'},
  {id:'q_h_002',subject:'History',node:'h2',difficulty:'medium',year:2021,topic:'Medieval',q:'The Bhakti movement in South India (6th-9th century) was led by:',opts:['Alvars (Vishnu) and Nayanars (Shiva) — Tamil devotional poets','Sufis and Qawwals','Kabir and Mirabai','Tukaram and Eknath'],ans:0,explain:'Alvars (12 Vaishnava saints) and Nayanars (63 Shaiva saints) composed Tamil devotional poetry. Works: Nalayira Divya Prabandham and Tevaram.',wrongExplain:'Kabir and Mirabai = North Indian Bhakti (15th-16th c). Tukaram = Maharashtra (17th c). Tamil Bhakti preceded North Indian movements.'},
  {id:'q_h_003',subject:'History',node:'h3',difficulty:'medium',year:2022,topic:'Freedom Struggle',q:'The Poona Pact (1932) was signed between:',opts:['Gandhi and Jinnah','B.R. Ambedkar and M.K. Gandhi','Congress and Muslim League','British Government and INC'],ans:1,explain:'Poona Pact (September 1932): Between Ambedkar and Gandhi. Replaced separate electorates for Dalits with reserved seats in joint electorate.',wrongExplain:'Communal Award (1932) by British gave separate electorates to Depressed Classes. Gandhi fasted against it. Ambedkar agreed to reserved seats as compromise.'},
  {id:'q_h_004',subject:'History',node:'h3',difficulty:'medium',year:2020,topic:'Freedom Struggle',q:'Bal Gangadhar Tilak edited which newspapers?',opts:['Kesari (Marathi) and Mahratta (English)','The Hindu and Indian Opinion','Amrit Bazar Patrika and Forward','Young India and Harijan'],ans:0,explain:'Tilak edited Kesari (Marathi, 1881) and Mahratta (English, 1881) to spread nationalist ideas and criticize British policies.',wrongExplain:'The Hindu = G. Subramania Iyer. Indian Opinion = Gandhi (South Africa). Young India and Harijan = Gandhi (India). Know journalist-newspaper links.'},
  {id:'q_h_005',subject:'History',node:'h4',difficulty:'medium',year:2018,topic:'Post-Independence',q:'Panchsheel Agreement (1954) was signed between:',opts:['India and USA','India and Pakistan','India and China','India and Soviet Union'],ans:2,explain:'Panchsheel (5 Principles of Peaceful Coexistence) signed between India and China regarding Tibet. Later adopted by NAM.',wrongExplain:'5 principles: mutual respect for sovereignty; non-aggression; non-interference; equality; peaceful coexistence. Hindi-Chini Bhai-Bhai era ended in 1962 war.'},
  {id:'q_h_006',subject:'History',node:'h2',difficulty:'hard',year:2023,topic:'Mughal',q:'Ain-i-Akbari, a statistical survey of the Mughal Empire, was written by:',opts:['Akbar himself','Abul Fazl','Birbal','Faizi'],ans:1,explain:'Ain-i-Akbari by Abul Fazl is volume 3 of Akbarnama. Provides revenue, military, geographic survey of the empire.',wrongExplain:'Akbar was illiterate — could not write it. Birbal = wit/humour. Faizi = Abul Fazl\'s brother, court poet. Abul Fazl was court historian.'},
  {id:'q_h_007',subject:'History',node:'h1',difficulty:'basic',year:2019,topic:'Ancient India',q:'Arthashastra, attributed to Kautilya/Chanakya, is primarily about:',opts:['Philosophy and ethics','Statecraft, administration, economics and military strategy','Grammar and linguistics','Mathematics and astronomy'],ans:1,explain:'Arthashastra (4th century BCE) = comprehensive treatise on state administration, fiscal policy, foreign policy, military, intelligence.',wrongExplain:'Panini = Grammar (Ashtadhyayi). Aryabhata = Mathematics/Astronomy. Arthashastra is considered the world\'s first manual on statecraft.'},
  {id:'q_h_008',subject:'History',node:'h3',difficulty:'medium',year:2021,topic:'Freedom Struggle',q:'The Dandi March (1930) was to protest against:',opts:['Rowlatt Act','British monopoly on salt production and salt tax','Simon Commission','Partition of Bengal'],ans:1,explain:'Salt March: Gandhi walked 241 miles from Sabarmati to Dandi (12 March - 6 April 1930) to make salt, launching Civil Disobedience Movement.',wrongExplain:'Rowlatt Act protest = 1919. Simon Commission boycott = 1927-28. Partition of Bengal = Swadeshi 1905. Dandi = CDM launch.'},
  {id:'q_h_009',subject:'History',node:'h4',difficulty:'hard',year:2022,topic:'Modern India',q:'The States Reorganisation Act 1956 was primarily based on recommendations of:',opts:['Dar Commission','JVP Committee','States Reorganisation Commission (Fazl Ali)','All India Congress Committee'],ans:2,explain:'States Reorganisation Commission (1953) chaired by Justice Fazl Ali recommended linguistic states. Act created 14 states + 6 UTs.',wrongExplain:'Dar Commission (1948) OPPOSED linguistic states. JVP Committee also cautious. Political pressure led to Fazl Ali Commission accepting language as the primary basis.'},
  {id:'q_h_010',subject:'History',node:'h3',difficulty:'medium',year:2020,topic:'Independence',q:'"Tryst with Destiny" speech by Nehru was delivered:',opts:['15 August 1947 morning at Red Fort','14-15 August midnight to Constituent Assembly','26 January 1950 at Republic Day','15 August 1947 afternoon at Parliament'],ans:1,explain:'"Tryst with Destiny" was delivered at midnight 14-15 August 1947 to the Constituent Assembly in Parliament — NOT at Red Fort.',wrongExplain:'15 August morning = flag hoisting at Red Fort with Jana Gana Mana. The Constituent Assembly midnight speech is "Tryst with Destiny". Distinction is UPSC-tested.'},

  // ── GEOGRAPHY ──────────────────────────────────────────
  {id:'q_g_001',subject:'Geography',node:'g1',difficulty:'medium',year:2022,topic:'Physical Geography',q:'The Deccan Traps (basaltic rocks of Deccan Plateau) were formed by:',opts:['Tectonic folding and mountain building','Massive volcanic eruptions about 65-66 million years ago','Marine sediment deposition','Glacial activity'],ans:1,explain:'Deccan Traps: Massive flood basalt province formed 65-66 MYA by volcanic eruptions (coinciding with Chicxulub asteroid impact). Covers 500,000 sq km. Produces fertile regur soil.',wrongExplain:'Regur (black cotton soil) = ideal for cotton growing in Maharashtra, MP. The Deccan Traps controversy: volcanic eruptions may have contributed to mass extinction.'},
  {id:'q_g_002',subject:'Geography',node:'g2',difficulty:'basic',year:2019,topic:'Indian Geography',q:'The Brahmaputra River is known by which name as it flows through Tibet?',opts:['Yangtze','Yarlung Tsangpo','Mekong','Salween'],ans:1,explain:'Brahmaputra originates in Tibet as Yarlung Tsangpo. Enters India through Arunachal Pradesh, flows through Assam, enters Bangladesh as Jamuna.',wrongExplain:'Yangtze is entirely in China. Mekong flows through SE Asia. Salween/Nu flows through Myanmar. Brahmaputra is one of Asia\'s largest rivers by discharge.'},
  {id:'q_g_003',subject:'Geography',node:'g3',difficulty:'basic',year:2019,topic:'Population',q:'As per Census 2011, which state has the highest literacy rate?',opts:['Tamil Nadu','Goa','Kerala','Mizoram'],ans:2,explain:'Kerala: 94% literacy (Census 2011). Female literacy 92%. Model of human development despite modest per capita income.',wrongExplain:'Mizoram = second highest (~91%). Kerala model: social investment in health and education produces HDI independent of income.'},
  {id:'q_g_004',subject:'Geography',node:'g4',difficulty:'hard',year:2023,topic:'Regional Geography',q:'"Golden Crescent" refers to:',opts:['Fertile agricultural Punjab-Haryana region','Opium-producing region of Afghanistan-Iran-Pakistan','Tea-growing belt of Assam-Darjeeling','Mineral-rich belt of Jharkhand-Odisha-Chhattisgarh'],ans:1,explain:'Golden Crescent = Afghanistan, Iran, Pakistan — world\'s largest opium/heroin production zone. Distinct from Golden Triangle (Myanmar, Laos, Thailand).',wrongExplain:'Both Golden Crescent and Golden Triangle are tested by UPSC. India\'s NCB works with INTERPOL on drug trafficking from both regions.'},
  {id:'q_g_005',subject:'Geography',node:'g2',difficulty:'medium',year:2021,topic:'Indian Rivers',q:'Which river forms the Sundarbans delta — world\'s largest mangrove forest?',opts:['Indus river system','Ganga-Brahmaputra-Meghna (GBM) system','Krishna-Godavari system','Mahanadi'],ans:1,explain:'Sundarbans = world\'s largest mangrove delta formed by GBM river system. Spans India + Bangladesh. UNESCO WHS. Bengal tiger habitat.',wrongExplain:'Sundarbans has 4 designations: UNESCO WHS + Ramsar Site + Biosphere Reserve + Tiger Reserve. Most multi-designated PA in India.'},
  {id:'q_g_006',subject:'Geography',node:'g1',difficulty:'hard',year:2021,topic:'Geomorphology',q:'Inselbergs are characteristic landforms associated with:',opts:['Glacial erosion','Hot arid desert erosion — isolated rocky hills rising from plains','Coastal erosion','River delta formation'],ans:1,explain:'Inselbergs = isolated rocky hills rising abruptly from plains in hot deserts. Formed by differential erosion. Example: Uluru (Australia).',wrongExplain:'Desert landforms UPSC tests: Barchans (crescent dunes), Seif dunes (longitudinal), Yardangs (wind erosion), Inselbergs, Pediplains.'},
  {id:'q_g_007',subject:'Geography',node:'g2',difficulty:'medium',year:2022,topic:'Indian Geography',q:'Western Ghats is a biodiversity hotspot because:',opts:['Highest rainfall in India','Over 5,000 flowering plants with 1,700+ endemic species; seriously threatened','Part of Himalayan ecosystem','Oldest mountain range in India'],ans:1,explain:'Western Ghats = one of 36 global biodiversity hotspots. >5,000 flowering species, 1,700+ endemic plants, major tiger corridor.',wrongExplain:'Biodiversity hotspot requires: high endemism + significant habitat loss threat. Western Ghats qualifies strongly on both counts.'},

  // ── SCI & TECH ──────────────────────────────────────────
  {id:'q_s_001',subject:'Sci & Tech',node:'s1',difficulty:'medium',year:2022,topic:'Space',q:'Chandrayaan-3\'s Vikram lander successfully soft-landed near the lunar south pole in:',opts:['August 2022','August 2023','July 2023','September 2023'],ans:1,explain:'Chandrayaan-3 launched July 2023. Vikram soft-landed August 23, 2023 — India became 4th nation to soft-land on moon and FIRST at south pole.',wrongExplain:'Chandrayaan-2 (2019) crashed at landing. Chandrayaan-3 = second attempt, success. Pragyan rover confirmed sulphur, oxygen, iron near south pole.'},
  {id:'q_s_002',subject:'Sci & Tech',node:'s2',difficulty:'hard',year:2021,topic:'AI',q:'Generative AI models like GPT are based on which neural network architecture?',opts:['Convolutional Neural Networks (CNN)','Transformer architecture with self-attention mechanism','Recurrent Neural Networks (RNN)','Decision Trees'],ans:1,explain:'Transformer architecture (2017): Uses self-attention to process all tokens simultaneously. Foundation for GPT, BERT, Claude, Gemini.',wrongExplain:'CNNs = image recognition. RNNs = sequential data (older NLP). Transformers replaced RNNs due to parallelization and long-range dependency capture.'},
  {id:'q_s_003',subject:'Sci & Tech',node:'s3',difficulty:'medium',year:2022,topic:'Biotech',q:'mRNA vaccines (like Pfizer-BioNTech) work by:',opts:['Injecting weakened virus','Providing mRNA instructions to cells to produce a protein that trains the immune system','Injecting antibodies directly','Modifying patient\'s DNA'],ans:1,explain:'mRNA vaccines: mRNA instructs cells to produce spike protein → immune system builds memory. mRNA degrades quickly — no DNA modification.',wrongExplain:'Covaxin = inactivated whole virus (conventional). Covishield = viral vector. mRNA = novel platform: faster manufacturing, no live virus needed.'},
  {id:'q_s_004',subject:'Sci & Tech',node:'s4',difficulty:'hard',year:2023,topic:'Cybersecurity',q:'Digital Personal Data Protection (DPDP) Act 2023 establishes:',opts:['National Cyber Security Agency','Data Protection Board of India + consent-based data processing framework','CERT-In as supreme data regulator','Ministry of IT as sole data authority'],ans:1,explain:'DPDP Act 2023: Data Protection Board adjudicates violations. Data Fiduciaries must obtain consent, give notice, ensure accuracy, implement security.',wrongExplain:'CERT-In handles cybersecurity incidents. DPDP governs personal data processing specifically. Significant Data Fiduciaries face enhanced obligations.'},
  {id:'q_s_005',subject:'Sci & Tech',node:'s1',difficulty:'medium',year:2021,topic:'Space',q:'ISRO\'s Gaganyaan mission is:',opts:['India\'s first satellite launch','India\'s first crewed human spaceflight program to Low Earth Orbit','India\'s first Mars mission','India\'s first solar observation mission'],ans:1,explain:'Gaganyaan: India\'s first human spaceflight program targeting LEO (400km). Will make India 4th country to independently send humans to space.',wrongExplain:'First satellite = Aryabhata (1975). Mars = Mangalyaan (2013). Solar = Aditya-L1 (2023). Gaganyaan = crewed spaceflight.'},
  {id:'q_s_006',subject:'Sci & Tech',node:'s1',difficulty:'medium',year:2023,topic:'Space',q:'Aditya-L1 mission studies the Sun from:',opts:['Earth\'s surface','Low Earth Orbit','Sun-Earth Lagrange Point L1 (1.5 million km from Earth)','Geostationary Orbit'],ans:2,explain:'Aditya-L1 (Sept 2023) placed at L1 point. Studies solar corona, CMEs (Coronal Mass Ejections), solar winds continuously without Earth\'s shadow.',wrongExplain:'L1 advantage: uninterrupted view of Sun, no eclipse. 7 payloads including VELC — largest payload. First Indian mission to study Sun.'},
  {id:'q_s_007',subject:'Sci & Tech',node:'s3',difficulty:'hard',year:2022,topic:'Biotech',q:'CRISPR-Cas9 technology is used for:',opts:['Cloning entire organisms','Precisely cutting and editing specific DNA sequences','Manufacturing vaccines','Protein synthesis only'],ans:1,explain:'CRISPR-Cas9 (2012): Cas9 enzyme acts as molecular scissors guided by RNA to cut specific DNA. Nobel Prize 2020 to Doudna and Charpentier.',wrongExplain:'India\'s CSIR and DBT working on CRISPR for sickle cell disease and TB-resistant crops. Not the same as cloning (which reproduces entire organism).'},
  {id:'q_s_008',subject:'Sci & Tech',node:'s2',difficulty:'medium',year:2020,topic:'Digital',q:'5G technology compared to 4G primarily offers:',opts:['Better voice call quality only','Ultra-low latency (1ms) + high speeds (1-10 Gbps) + connectivity for millions of devices','Longer battery life','FM radio improvement'],ans:1,explain:'5G: 10-100x faster than 4G, latency <1ms, connects 1 million devices/km². Enables IoT, autonomous vehicles, telemedicine, Industry 4.0.',wrongExplain:'India\'s 5G launched October 2022. 5G uses higher frequency bands. Huawei controversy = China security concerns in 5G network infrastructure.'},

  // ── GOVERNANCE ──────────────────────────────────────────
  {id:'q_go_001',subject:'Governance',node:'go1',difficulty:'medium',year:2021,topic:'E-Governance',q:'UMANG app integrates:',opts:['Only Central Government services','1200+ Central and State government services on one platform','Banking services only','Social media platforms for govt communication'],ans:1,explain:'UMANG: Single app integrating 1200+ government services from central and state governments including Aadhaar, DigiLocker, PAN, EPF.',wrongExplain:'UMANG launched 2017. Contrast with JAM Trinity (DBT) — UMANG is about service delivery. DigiLocker = document storage. Different purposes.'},
  {id:'q_go_002',subject:'Governance',node:'go3',difficulty:'medium',year:2022,topic:'Anti-Corruption',q:'The Central Vigilance Commission (CVC) is a:',opts:['Constitutional body under Part XIV','Statutory body under CVC Act 2003','Executive body under Ministry of Home Affairs','Advisory body with no legal backing'],ans:1,explain:'CVC = Statutory body under CVC Act 2003. Independent body advising Central Government on vigilance administration.',wrongExplain:'CAG = Constitutional body (Art 148). Lokpal = Statutory (Lokpal Act 2013). CBI under DSPE Act 1946. Know the legal basis for each.'},
  {id:'q_go_003',subject:'Governance',node:'go2',difficulty:'hard',year:2020,topic:'Social Policy',q:'Section 12(1)(c) of Right to Education Act 2009 mandates:',opts:['Free education up to class 10','Private unaided schools to admit 25% students from economically weaker sections','Government schools to have 25% reserved seats for minorities','All schools to follow common curriculum'],ans:1,explain:'RTE Section 12(1)(c): Private unaided schools must reserve 25% seats for children from EWS and disadvantaged groups.',wrongExplain:'Supreme Court upheld this provision in 2012 (Society for Unaided Schools case). Schools get reimbursement from government at government school rate.'},
  {id:'q_go_004',subject:'Governance',node:'go4',difficulty:'hard',year:2023,topic:'Civil Services',q:'Mission Karmayogi is about:',opts:['Physical training of IPS officers','Competency-based training of civil servants through iGOT-Karmayogi platform','IAS officer recruitment reform','Salary revision for government employees'],ans:1,explain:'Mission Karmayogi (2020): Capacity building through iGOT (Integrated Government Online Training) platform. Shifts from rules-based to roles-based approach for 46 lakh central employees.',wrongExplain:'SPF and domain training included. PM chairs PM\'s Human Resources Council — apex body. Largest government employee training program globally.'},

  // ── INT. RELATIONS ──────────────────────────────────────
  {id:'q_ir_001',subject:'Int. Relations',node:'ir1',difficulty:'medium',year:2021,topic:'South Asia',q:'SAARC was established in:',opts:['1981 Colombo','1985 Dhaka','1990 Islamabad','1995 New Delhi'],ans:1,explain:'SAARC established Dhaka, Bangladesh in December 1985. 8 members. Secretariat in Kathmandu. SAFTA in force since 2006.',wrongExplain:'SAARC remains largely dysfunctional due to India-Pakistan tensions. Last summit held 2014 (Kathmandu). India-Pakistan bilateralism blocks regional integration.'},
  {id:'q_ir_002',subject:'Int. Relations',node:'ir2',difficulty:'hard',year:2022,topic:'Multilateral',q:'Quad (Quadrilateral Security Dialogue) members are:',opts:['USA, UK, Australia, India','USA, Japan, Australia, India','USA, Japan, South Korea, India','USA, France, Japan, Australia'],ans:1,explain:'Quad = USA + Japan + Australia + India. Revived 2017, elevated to Leader-level 2021. Focus: Free and Open Indo-Pacific, vaccines, climate, tech.',wrongExplain:'AUKUS = USA + UK + Australia. Five Eyes = intelligence alliance. Quad has no formal treaty — remains a consultative security grouping.'},
  {id:'q_ir_003',subject:'Int. Relations',node:'ir3',difficulty:'medium',year:2020,topic:'Multilateral',q:'India became full member of SCO (Shanghai Cooperation Organisation) in:',opts:['2001','2005','2017','2022'],ans:2,explain:'India and Pakistan became full SCO members at Astana Summit 2017. India chairs SCO 2023.',wrongExplain:'SCO founded 2001. India had observer status before 2017. Strategic significance: Eurasian security, connectivity, counterterrorism cooperation.'},
  {id:'q_ir_004',subject:'Int. Relations',node:'ir4',difficulty:'hard',year:2023,topic:'Global Order',q:'India\'s "multi-alignment" foreign policy is best described as:',opts:['Joining all military alliances simultaneously','Engaging multiple groupings (Quad + SCO + BRICS + G20) without exclusive commitments','Non-alignment 1.0 — strict neutrality','Alignment with USA against China'],ans:1,explain:'Multi-alignment: India engages Quad (security), SCO (Eurasian), BRICS (Global South), G20 (economy) simultaneously. Strategic autonomy without exclusive allegiance.',wrongExplain:'NAM = Cold War non-alignment. Multi-alignment = post-Cold War proactive engagement. India can be in Quad AND SCO — different domains, different purposes.'},
];

// ─── CURRENT AFFAIRS ────────────────────────────────────
const CURRENT_AFFAIRS = [
  {id:'ca1',category:'ENVIRONMENT',title:'COP29 Baku — New Climate Finance Goal (NCQG) of $300 Billion Adopted',date:'November 2024',summary:'COP29 in Baku established the New Collective Quantified Goal (NCQG) of $300 billion/year by 2035. Developing nations demanded $1.3 trillion. India and others expressed dissatisfaction calling it inadequate.',syllabusNodes:['ev2'],syllabusTopics:['Climate Finance','UNFCCC','Green Climate Fund'],mcq:{q:'The NCQG (New Collective Quantified Goal) adopted at COP29 refers to:',opts:['Annual global emission reduction target','Climate finance target of $300B/year by 2035 for developing nations','Biodiversity protection fund','Carbon credit trading mechanism'],ans:1,explain:'NCQG replaces the $100B/year pledge from Copenhagen 2009. The $300B target was seen as insufficient — developing nations needed $1.3T for adaptation and mitigation.'}},
  {id:'ca2',category:'DEFENCE',title:'INS Arighaat — India\'s Second Nuclear Submarine Commissioned',date:'August 2024',summary:'INS Arighaat, India\'s second nuclear-powered ballistic missile submarine (SSBN), was commissioned. Completes India\'s nuclear triad. Part of Advanced Technology Vessel (ATV) project, indigenously designed.',syllabusNodes:['s1','ir3'],syllabusTopics:['Nuclear Deterrence','Defence Technology','Nuclear Triad'],mcq:{q:'India\'s nuclear triad requires capability to launch nuclear weapons from:',opts:['Land only','Land and Air only','Land, Air, and Sea (submarines)','Satellites and space'],ans:2,explain:'Nuclear Triad = Land (ballistic missiles) + Air (aircraft) + Sea (SSBNs). SSBNs are most survivable second-strike capability. INS Arihant + INS Arighaat = sea leg.'}},
  {id:'ca3',category:'ECONOMY',title:'Unified Pension Scheme (UPS) — Blending Guaranteed Pension with NPS',date:'August 2024',summary:'Cabinet approved UPS for 23 lakh central government employees from April 2025. Assures 50% of last 12-month average basic salary as pension after 25 years of service. Blends Old Pension Scheme guarantee with NPS corpus.',syllabusNodes:['e9','go4'],syllabusTopics:['Pension Reform','Social Security','Fiscal Policy'],mcq:{q:'The Unified Pension Scheme (UPS) assures pension of what percentage of average basic salary after 25 years?',opts:['25%','40%','50%','75%'],ans:2,explain:'UPS assures 50% of last 12-month average basic pay after 25 years. Proportional pension for 10-25 years. Family pension at 60% if employee dies in service.'}},
  {id:'ca4',category:'POLITY',title:'One Nation One Election — 129th Constitutional Amendment Bill Introduced',date:'December 2024',summary:'Government introduced the 129th Constitutional Amendment Bill for simultaneous elections to Lok Sabha and all State Assemblies. Bill referred to Joint Parliamentary Committee (JPC). Based on High-Level Committee (Kovind Committee) report.',syllabusNodes:['p8','p6'],syllabusTopics:['Electoral Reforms','Federalism','Constitutional Amendment'],mcq:{q:'One Nation One Election requires amending which constitutional provisions?',opts:['Art 83 and 172 among others (terms of Houses and legislatures)','Art 324 only (Election Commission)','Art 356 only','Only Art 368 (amendment procedure)'],ans:0,explain:'ONOE requires amending Art 83 (Parliament term), 85 (dissolution), 172 (State Legislature term), 174, 356. Multiple amendments + possible new article for hung house scenarios.'}},
  {id:'ca5',category:'INTERNATIONAL RELATIONS',title:'India-China LAC Patrolling Agreement — End of Galwan Standoff',date:'October 2024',summary:'India and China reached patrolling agreement ending the 4-year Eastern Ladakh standoff (since June 2020 Galwan Valley clash). Depsang Plains and Demchok friction points resolved. First meeting of Special Representatives on boundary question in 5 years.',syllabusNodes:['ir1','ir3'],syllabusTopics:['India-China Relations','LAC','Border Management'],mcq:{q:'The Galwan Valley clash (June 2020) between India and China occurred in:',opts:['Arunachal Pradesh','Uttarakhand','Ladakh','Himachal Pradesh'],ans:2,explain:'Galwan Valley is in Ladakh (Galwan River, tributary of Shyok). June 2020: 20 Indian soldiers killed. Worst violence at LAC since 1975.'}},
];

// ─── TOPIC FREQUENCY ────────────────────────────────────
const TOPIC_FREQUENCY = {
  data:{
    'Constitutional Amendments':{2014:3,2015:2,2016:4,2017:3,2018:4,2019:5,2020:3,2021:4,2022:5,2023:4,2024:6},
    'Climate Change & COP':{2014:4,2015:6,2016:5,2017:4,2018:5,2019:6,2020:5,2021:7,2022:8,2023:7,2024:9},
    'Banking & Monetary Policy':{2014:5,2015:4,2016:6,2017:5,2018:6,2019:5,2020:6,2021:5,2022:7,2023:6,2024:7},
    'Space Technology (ISRO)':{2014:2,2015:3,2016:2,2017:4,2018:3,2019:5,2020:4,2021:6,2022:5,2023:8,2024:7},
    'Government Schemes':{2014:6,2015:7,2016:8,2017:7,2018:9,2019:8,2020:9,2021:8,2022:10,2023:9,2024:11},
    'Biodiversity & Wildlife':{2014:4,2015:5,2016:4,2017:5,2018:6,2019:5,2020:6,2021:5,2022:7,2023:6,2024:8},
    'Digital Economy & Fintech':{2014:1,2015:2,2016:3,2017:4,2018:5,2019:6,2020:7,2021:8,2022:9,2023:10,2024:11},
    'India Foreign Policy':{2014:4,2015:5,2016:5,2017:6,2018:5,2019:7,2020:6,2021:8,2022:7,2023:9,2024:8},
  },
  trends:{
    'Constitutional Amendments':'stable_high','Climate Change & COP':'rising_fast',
    'Banking & Monetary Policy':'stable_high','Space Technology (ISRO)':'rising_fast',
    'Government Schemes':'consistently_high','Biodiversity & Wildlife':'stable',
    'Digital Economy & Fintech':'rising_fast','India Foreign Policy':'rising',
  },
  highProbability2025:[
    {topic:'Artificial Intelligence Governance',probability:92,subject:'Sci & Tech',why:'IndiaAI Mission + DPDP Act 2023 + global AI regulation race'},
    {topic:'Green Hydrogen & Energy Transition',probability:88,subject:'Environment',why:'National GH Mission + COP29 aftermath + NDC targets'},
    {topic:'Digital Personal Data Protection',probability:87,subject:'Polity',why:'DPDP Act 2023 recently notified, implementation rules pending'},
    {topic:'Climate Finance (NCQG/COP29)',probability:85,subject:'Environment',why:'Fresh COP29 $300B target — contested and newsworthy'},
    {topic:'One Nation One Election',probability:84,subject:'Polity',why:'Bill in Parliament, JPC referral, Constitutional debate ongoing'},
    {topic:'BRICS Expansion & Global South',probability:82,subject:'Int. Relations',why:'BRICS+ members active, India Voice of Global South summits'},
    {topic:'Semiconductor Manufacturing',probability:81,subject:'Economy',why:'India Semiconductor Mission + PLI + geopolitical chip wars'},
    {topic:'Gaganyaan & Space Economy',probability:79,subject:'Sci & Tech',why:'Gaganyaan test flights + IN-SPACe private sector + Aditya-L1 data'},
    {topic:'Federal Finance & 16th Finance Commission',probability:76,subject:'Economy',why:'16th FC recommendations + GST council dynamics + state fiscal autonomy'},
    {topic:'Biodiversity 30x30 Implementation',probability:74,subject:'Environment',why:'Kunming-Montreal framework implementation + India biodiversity law reforms'},
  ],
  decliningTopics:['Bretton Woods institutions (basic structure)','Non-Banking Finance Companies basics','Manual Canal Irrigation systems','Cold War era alliances (basic)'],
};

// ─── PYQ LINEAGE ─────────────────────────────────────────
const PYQ_LINEAGE = [
  {
    concept:'Right to Privacy',node:'p2',subject:'Polity',
    evolution:[
      {year:2000,q:'Article 19 freedoms and reasonable restrictions',angle:'Basic FR framework'},
      {year:2005,q:'Scope of Article 21 — personal liberty',angle:'Life and liberty expansion'},
      {year:2010,q:'Surveillance and interception under IT Act',angle:'Technology enters the picture'},
      {year:2015,q:'Aadhaar and biometric data — information vs privacy tension',angle:'Data privacy debate begins'},
      {year:2017,q:'Puttaswamy judgment — privacy as Fundamental Right',angle:'Landmark ruling'},
      {year:2020,q:'DPDP and right to be forgotten in digital age',angle:'Regulatory framework emerges'},
      {year:2023,q:'DPDP Act 2023 — Data Fiduciaries and consent',angle:'Implementation'},
    ],
    insight:'Privacy moved from implied right → contested right → declared FR → regulatory framework in 23 years. UPSC tracks this evolution carefully.',
    nextAngle:'AI-generated data, surveillance capitalism, cross-border data flows, state surveillance without law',
  },
  {
    concept:'Climate Finance',node:'ev2',subject:'Environment',
    evolution:[
      {year:2000,q:'Kyoto Protocol — Annex I country obligations',angle:'Historical commitment'},
      {year:2005,q:'UNFCCC and CBDR principle explained',angle:'Core principle'},
      {year:2010,q:'Copenhagen Accord — $100B annual pledge',angle:'Finance commitment born'},
      {year:2015,q:'Paris Agreement — NDCs, GCF, ratchet mechanism',angle:'NDC framework'},
      {year:2019,q:'Green Climate Fund governance and disbursement',angle:'Fund mechanics'},
      {year:2021,q:'COP26 — developed countries missed $100B target',angle:'Trust breakdown'},
      {year:2024,q:'COP29 — NCQG $300B vs demanded $1.3T',angle:'Scale dispute'},
    ],
    insight:'Questions evolved from WHAT (Kyoto rules) → HOW MUCH (Paris targets) → WHO DECIDES (fund governance) → IS IT ENOUGH (COP29). Each COP adds a new question angle.',
    nextAngle:'Loss and Damage disbursement mechanics, private finance mobilization, conditionalities on climate aid',
  },
  {
    concept:'GST & Federal Finance',node:'e3',subject:'Economy',
    evolution:[
      {year:2002,q:'Finance Commission — horizontal devolution formula',angle:'Fiscal federalism basics'},
      {year:2006,q:'VAT harmonization across states',angle:'Tax reform precursor'},
      {year:2012,q:'GST Constitutional Amendment — Art 246A, GST Council',angle:'Constitutional change proposed'},
      {year:2016,q:'101st Amendment — GST structure and implementation',angle:'Implementation'},
      {year:2019,q:'GST Council voting rights and dispute resolution',angle:'Governance mechanics'},
      {year:2022,q:'Supreme Court — GST Council advisory vs binding nature',angle:'Federalism tension'},
      {year:2024,q:'16th Finance Commission — new devolution norms post-GST',angle:'Post-GST fiscal reset'},
    ],
    insight:'GST appears as Constitutional amendment, cooperative federalism test, state autonomy debate, AND fiscal architecture question — one concept, multiple question angles.',
    nextAngle:'16th Finance Commission recommendations, GST 2.0 reforms, state compensation cess expiry',
  },
  {
    concept:'India\'s Space Programme',node:'s1',subject:'Sci & Tech',
    evolution:[
      {year:2005,q:'PSLV capabilities and commercial launches',angle:'Launch vehicle focus'},
      {year:2008,q:'Chandrayaan-1 water discovery significance',angle:'Scientific achievement'},
      {year:2013,q:'Mangalyaan — low-cost space innovation',angle:'Frugal engineering'},
      {year:2016,q:'NavIC vs GPS — strategic autonomy in navigation',angle:'Strategic capability'},
      {year:2019,q:'GSAT and communication satellite policy',angle:'Commercial use'},
      {year:2022,q:'IN-SPACe policy — private sector in space',angle:'Liberalization'},
      {year:2023,q:'Chandrayaan-3 south pole significance + Aditya-L1',angle:'Two missions same year'},
    ],
    insight:'Space questions moved from capability (can India launch?) → achievement (what did we discover?) → strategy (NavIC, deterrence) → policy (private sector, commercialization).',
    nextAngle:'Gaganyaan human spaceflight, commercial launch market, space debris, international space law',
  },
];

// ─── CONCEPT CLUSTERS ────────────────────────────────────
const CONCEPT_CLUSTERS = [
  {
    id:'cc1',name:'Climate Governance Cluster',icon:'🌍',color:'#22c55e',
    description:'UPSC tests climate as Environment + Economy (finance) + IR (geopolitics) + Polity (legislation) + Sci&Tech (technology) simultaneously.',
    nodes:['ev2','ev5','ir2','e7','e3'],
    concepts:[
      {name:'Paris Agreement & NDCs',subject:'Environment',link:'ev2'},
      {name:'UNFCCC and COP process',subject:'Environment',link:'ev2'},
      {name:'Loss and Damage Fund',subject:'Environment',link:'ev2'},
      {name:'Green Climate Fund (GCF)',subject:'Environment',link:'ev2'},
      {name:'CBDR principle',subject:'Environment',link:'ev2'},
      {name:'Green Hydrogen Mission',subject:'Environment',link:'ev5'},
      {name:'India\'s climate finance position',subject:'Int. Relations',link:'ir2'},
      {name:'Green Bonds & ESG Finance',subject:'Economy',link:'e3'},
      {name:'Renewable Energy targets',subject:'Economy',link:'e7'},
    ],
    pyqYears:[2015,2016,2018,2019,2021,2022,2023,2024],
    examAngle:'Questions often combine: COP outcome + India\'s NDC + financing mechanism in one MCQ. Know all three layers together.',
    crossLinks:['cc3','cc5'],
  },
  {
    id:'cc2',name:'Constitutional Democracy Cluster',icon:'⚖️',color:'#7c6af7',
    description:'Polity questions combine constitutional provisions + recent SC judgments + electoral reforms + federalism. One question, four concepts.',
    nodes:['p1','p2','p5','p6','p8'],
    concepts:[
      {name:'Basic Structure Doctrine',subject:'Polity',link:'p1'},
      {name:'Fundamental Rights (Art 12-35)',subject:'Polity',link:'p2'},
      {name:'Right to Privacy (Puttaswamy 2017)',subject:'Polity',link:'p2'},
      {name:'Judicial Review scope',subject:'Polity',link:'p5'},
      {name:'Anti-defection Law (10th Schedule)',subject:'Polity',link:'p8'},
      {name:'Electoral Bonds ruling (SC 2024)',subject:'Polity',link:'p8'},
      {name:'Article 356 and Governor role',subject:'Polity',link:'p6'},
      {name:'GST Council — federal tension',subject:'Polity',link:'p6'},
    ],
    pyqYears:[2014,2015,2017,2018,2020,2021,2022,2023],
    examAngle:'Know ARTICLE + landmark CASE + recent DEVELOPMENT for each constitutional concept. Three-layer mastery.',
    crossLinks:['cc4','cc6'],
  },
  {
    id:'cc3',name:'Digital India Stack',icon:'💻',color:'#06b6d4',
    description:'Digital economy tested from 5 angles: infrastructure, monetary policy, governance, privacy law, and geopolitics. Not a single-subject question.',
    nodes:['e5','s2','s4','go1','p2'],
    concepts:[
      {name:'UPI and NPCI architecture',subject:'Economy',link:'e5'},
      {name:'CBDC (Digital Rupee)',subject:'Economy',link:'e5'},
      {name:'ONDC — open commerce protocol',subject:'Economy',link:'e5'},
      {name:'India Stack (Aadhaar+eKYC+eSign)',subject:'Economy',link:'e5'},
      {name:'AI in governance (iGOT, DigiYatra)',subject:'Sci & Tech',link:'s2'},
      {name:'DPDP Act 2023 — consent framework',subject:'Sci & Tech',link:'s4'},
      {name:'DigiLocker + UMANG services',subject:'Governance',link:'go1'},
      {name:'Right to Privacy and Aadhaar',subject:'Polity',link:'p2'},
    ],
    pyqYears:[2016,2017,2018,2019,2020,2021,2022,2023,2024],
    examAngle:'Every new digital policy gets tested. Track each LAYER: identity → payment → commerce → credit → AI → privacy law.',
    crossLinks:['cc2','cc5'],
  },
  {
    id:'cc4',name:'India\'s Strategic Autonomy',icon:'🌐',color:'#a855f7',
    description:'IR tested beyond geography — India\'s multi-alignment: Quad vs SCO, BRICS vs G7, Non-Alignment vs Multi-Alignment.',
    nodes:['ir1','ir2','ir3','ir4','s1'],
    concepts:[
      {name:'Quad and Indo-Pacific strategy',subject:'Int. Relations',link:'ir2'},
      {name:'SCO — Eurasian connectivity',subject:'Int. Relations',link:'ir3'},
      {name:'BRICS+ and Global South leadership',subject:'Int. Relations',link:'ir2'},
      {name:'India-China LAC standoff and resolution',subject:'Int. Relations',link:'ir1'},
      {name:'India-Russia S-400 and CAATSA',subject:'Int. Relations',link:'ir3'},
      {name:'IPEF and trade strategy',subject:'Int. Relations',link:'ir3'},
      {name:'Space diplomacy — ISRO soft power',subject:'Sci & Tech',link:'s1'},
      {name:'Nuclear deterrence — NFU debate',subject:'Int. Relations',link:'ir4'},
    ],
    pyqYears:[2015,2016,2018,2019,2020,2021,2022,2023],
    examAngle:'India in BOTH Quad AND SCO — UPSC asks about contradictions. Know India\'s stated logic for each grouping.',
    crossLinks:['cc1','cc6'],
  },
  {
    id:'cc5',name:'Agrarian Economy & Rural India',icon:'🌾',color:'#f59e0b',
    description:'Agriculture = Economy + Polity (federal list) + Environment (soil/water) + Governance (schemes) + Social Justice (land rights). Never a single-subject question.',
    nodes:['e4','ev4','go2','p6','e9'],
    concepts:[
      {name:'MSP mechanism and CACP',subject:'Economy',link:'e4'},
      {name:'APMC Act reforms — Bihar model',subject:'Economy',link:'e4'},
      {name:'PM-KISAN and DBT in agriculture',subject:'Economy',link:'e4'},
      {name:'Farm laws repeal — policy lessons',subject:'Economy',link:'e4'},
      {name:'Soil Health Card and precision farming',subject:'Environment',link:'ev4'},
      {name:'MGNREGA — employment guarantee',subject:'Economy',link:'e9'},
      {name:'Forest Rights Act — tribal land',subject:'Governance',link:'go2'},
      {name:'Agriculture in Constitutional lists',subject:'Polity',link:'p6'},
    ],
    pyqYears:[2014,2015,2016,2017,2018,2019,2020,2021,2022,2023],
    examAngle:'Farm laws (2020-21) = federal jurisdiction + market reform + APMC + MSP + democratic accountability. One episode, five question angles.',
    crossLinks:['cc1','cc2'],
  },
  {
    id:'cc6',name:'Social Justice & Human Rights',icon:'✊',color:'#ef4444',
    description:'Social justice spans constitutional provisions + SC judgments + international conventions + government schemes. Know the full chain.',
    nodes:['p2','p3','go2','e9','h3'],
    concepts:[
      {name:'Reservation policy — Art 15, 16, 340',subject:'Polity',link:'p2'},
      {name:'EWS reservation — 103rd Amendment',subject:'Polity',link:'p2'},
      {name:'SC/ST Prevention of Atrocities Act',subject:'Governance',link:'go2'},
      {name:'Transgender Persons Act 2019',subject:'Governance',link:'go2'},
      {name:'DPSP — Article 46 (weaker sections)',subject:'Polity',link:'p3'},
      {name:'Ambedkar and constitutional morality',subject:'History',link:'h3'},
      {name:'Ayushman Bharat — health rights',subject:'Economy',link:'e9'},
      {name:'UPS — pension equity for government workers',subject:'Economy',link:'e9'},
    ],
    pyqYears:[2014,2016,2017,2019,2020,2021,2022,2023,2024],
    examAngle:'Link constitutional article + SC judgment + recent legislation for each social justice issue. Three-layer analysis always.',
    crossLinks:['cc2','cc5'],
  },
];

// ─── POLICY TIMELINES ────────────────────────────────────
const POLICY_TIMELINES = [
  {
    id:'pt1',title:'India\'s Digital Payments Evolution',icon:'💳',color:'#06b6d4',subject:'Economy',
    events:[
      {year:2010,event:'IMPS launched by NPCI',significance:'First 24×7 instant inter-bank transfer system',type:'launch'},
      {year:2014,event:'Jan Dhan Yojana — 23 crore accounts in 30 days',significance:'Financial inclusion base created for DBT',type:'policy'},
      {year:2016,event:'UPI 1.0 launched — interoperable instant payments',significance:'Broke walled-garden payment apps',type:'launch'},
      {year:2016,event:'Demonetisation shock',significance:'Forced rapid digital payment adoption',type:'event'},
      {year:2018,event:'India Stack API opened to fintech companies',significance:'Ecosystem explosion: Paytm, PhonePe, GPay build on it',type:'policy'},
      {year:2021,event:'ONDC launched — open commerce network',significance:'UPI model applied to e-commerce',type:'launch'},
      {year:2022,event:'Digital Rupee (CBDC) pilot by RBI',significance:'Central bank enters digital currency space',type:'launch'},
      {year:2023,event:'DPDP Act 2023 — personal data protection law',significance:'Privacy framework for the digital economy',type:'policy'},
      {year:2024,event:'India Stack replicated in 50+ countries via G20 DPI',significance:'India becomes global DPI leader',type:'milestone'},
    ],
  },
  {
    id:'pt2',title:'India\'s Climate Commitments Timeline',icon:'🌡️',color:'#22c55e',subject:'Environment',
    events:[
      {year:2002,event:'India ratifies Kyoto Protocol',significance:'Joins international climate regime — no binding cuts as developing nation',type:'policy'},
      {year:2008,event:'National Action Plan on Climate Change (NAPCC) — 8 missions',significance:'First domestic climate framework',type:'policy'},
      {year:2015,event:'Paris Agreement — India\'s first NDC submitted',significance:'33-35% emission intensity cut by 2030; 40% non-fossil energy',type:'policy'},
      {year:2015,event:'International Solar Alliance co-founded with France at COP21',significance:'Solar diplomacy + soft power',type:'launch'},
      {year:2021,event:'COP26 Glasgow — PANCHAMRIT announced',significance:'Net zero 2070; 500GW non-fossil; 50% renewable by 2030',type:'policy'},
      {year:2022,event:'Updated NDC submitted to UNFCCC',significance:'50% non-fossil electricity target formalized',type:'policy'},
      {year:2023,event:'India — 3rd largest solar capacity globally',significance:'Renewable energy targets on track',type:'milestone'},
      {year:2024,event:'COP29 — NCQG $300B: India dissatisfied',significance:'Finance gap creates developing nation frustration',type:'event'},
    ],
  },
  {
    id:'pt3',title:'Constitutional Amendments — Key Milestones',icon:'📜',color:'#7c6af7',subject:'Polity',
    events:[
      {year:1951,event:'1st Amendment — Land reform protection in 9th Schedule',significance:'Balancing property right with state reform power',type:'policy'},
      {year:1973,event:'Kesavananda Bharati — Basic Structure doctrine by SC',significance:'Courts can limit Parliament\'s amendment power',type:'event'},
      {year:1976,event:'42nd Amendment — Socialist, Secular, Integrity added; Emergency changes',significance:'Most controversial amendment — most later reversed',type:'policy'},
      {year:1978,event:'44th Amendment — reversed Emergency excesses',significance:'Right to property demoted to legal right (Art 300A)',type:'policy'},
      {year:1992,event:'73rd & 74th Amendments — local self-government',significance:'Constitutional status to Panchayats and municipalities',type:'policy'},
      {year:2002,event:'86th Amendment — Right to Education (Art 21A)',significance:'RTE Act followed in 2009',type:'policy'},
      {year:2016,event:'101st Amendment — GST (Art 246A, GST Council)',significance:'Biggest tax reform; cooperative federalism in action',type:'policy'},
      {year:2019,event:'103rd Amendment — EWS 10% reservation',significance:'Economic criteria for reservation for the first time',type:'policy'},
      {year:2024,event:'129th Amendment Bill — ONOE introduced in Parliament',significance:'Simultaneous elections debate begins',type:'event'},
    ],
  },
  {
    id:'pt4',title:'India\'s Space Programme Milestones',icon:'🚀',color:'#f59e0b',subject:'Sci & Tech',
    events:[
      {year:1975,event:'Aryabhata — India\'s first satellite (Soviet launch)',significance:'Start of India\'s space age',type:'launch'},
      {year:1980,event:'Rohini RS-1 — first indigenous SLV-3 launch',significance:'India becomes 6th country to independently launch a satellite',type:'launch'},
      {year:2008,event:'Chandrayaan-1 — confirms water ice on Moon',significance:'India joins lunar science club',type:'launch'},
      {year:2013,event:'Mangalyaan (MOM) — first-attempt Mars success for $74M',significance:'Cheapest Mars mission ever; frugal engineering model',type:'launch'},
      {year:2017,event:'PSLV-C37 launches 104 satellites in single mission (world record)',significance:'Commercial launch leadership demonstrated',type:'milestone'},
      {year:2019,event:'GSAT-31 + NavIC operational — indigenous GPS',significance:'Strategic independence in navigation',type:'launch'},
      {year:2023,event:'Chandrayaan-3 soft-lands at lunar south pole',significance:'India = 4th country to soft-land; first at south pole',type:'milestone'},
      {year:2023,event:'Aditya-L1 placed at Sun-Earth L1 Lagrange point',significance:'India\'s first solar observation mission',type:'launch'},
      {year:2024,event:'IN-SPACe: Agnikul and Skyroot private launches',significance:'India\'s private space era begins',type:'policy'},
    ],
  },
];

// ─── MAINS THINKING TRAINER ──────────────────────────────
const MAINS_THINKING = [
  {
    id:'mt1',question:'Critically examine the proposition that India\'s federal structure is more unitary in times of crisis.',
    subject:'Polity',paperType:'GS-II',difficulty:'hard',wordTarget:250,
    keyDimensions:[
      {dimension:'Constitutional Provisions',hint:'Art 356 (President\'s Rule), Art 352 (National Emergency), Art 360 (Financial Emergency), Parliament\'s override capacity during emergency'},
      {dimension:'Judicial Interpretation',hint:'Bommai case 1994 — floor test mandatory, judicial review of Art 356. Basic Structure includes federalism.'},
      {dimension:'Historical Evidence',hint:'1962 (war), 1971 (war + Bangladesh), COVID-19 (DMA 2005 used), floods and disasters — Centre-State coordination tested'},
      {dimension:'Counterargument',hint:'States resisted Central overreach — Kerala, Bengal in recent years. GST Council consensus model works.'},
      {dimension:'Way Forward',hint:'Strengthen cooperative federalism: GST Council voting reform, Inter-State Council activation, disaster management protocol clarity'},
    ],
    modelStructure:['Introduction: Federal design with unitary bias — explain tension (2 lines)','Constitutional provisions enabling unitary tilt','Evidence: Historical crisis instances','Judicial checks: Basic Structure limits','Counterargument: State resistance examples','Cooperative federalism successes','Conclusion: Structured flexibility, not weakness — suited for India\'s diversity'],
    keywords:['Art 356','Art 352','Cooperative federalism','Bommai case','GST Council','Basic Structure','DMA 2005'],
  },
  {
    id:'mt2',question:'The Paris Agreement is built on CBDR. How does the tension between equity and ambition manifest in climate negotiations?',
    subject:'Environment + IR',paperType:'GS-III/GS-II',difficulty:'hard',wordTarget:250,
    keyDimensions:[
      {dimension:'CBDR Principle',hint:'Historical emissions vs current emissions. Who created the problem? Per capita vs absolute emissions.'},
      {dimension:'Equity Argument',hint:'Right to development. Climate debt owed to Global South. Colonial legacy of industrialization.'},
      {dimension:'Ambition Gap',hint:'Current NDCs insufficient for 1.5°C. Ratchet mechanism too slow. $300B vs $1.3T finance gap.'},
      {dimension:'India\'s Position',hint:'PANCHAMRIT: Net Zero 2070 vs demanded 2050. Third largest emitter but lowest per capita. Coal phase-down vs phase-out.'},
      {dimension:'Way Forward',hint:'Technology transfer without IP barriers. CBDR needs updating for new realities. Just transition financing.'},
    ],
    modelStructure:['Introduction: CBDR — principle and paradox','Historical context: Kyoto to Paris evolution','Equity side: Per capita injustice, development rights','Ambition side: Physics indifferent to equity — 1.5°C deadline','India\'s balancing act — PANCHAMRIT','COP29: Finance failure as trust breakdown','Conclusion: CBDR needs evolution, not abandonment'],
    keywords:['CBDR','NDC','Paris Agreement','PANCHAMRIT','Net Zero 2070','COP29','Loss and Damage','Climate Finance','Just Transition'],
  },
  {
    id:'mt3',question:'Discuss how digitization of public service delivery has transformed governance while raising concerns about exclusion and surveillance.',
    subject:'Governance + Economy',paperType:'GS-II + GS-III',difficulty:'medium',wordTarget:250,
    keyDimensions:[
      {dimension:'Transformation Benefits',hint:'DBT savings ₹2.23 lakh crore; UPI financial inclusion; DigiLocker; UMANG 1200+ services; transparency'},
      {dimension:'Digital Exclusion Risk',hint:'Digital divide: rural-urban, gender, elderly, language barriers, internet connectivity gaps'},
      {dimension:'Surveillance Concern',hint:'Aadhaar challenges; Art 21 privacy; CCTV/facial recognition; Pegasus controversy; surveillance without legal framework'},
      {dimension:'Legal Framework',hint:'DPDP Act 2023; IT Act amendments; Puttaswamy judgment; right to offline alternatives; data localization'},
      {dimension:'Balance',hint:'Privacy-preserving technology; right to offline alternatives; inclusive design; civil society oversight'},
    ],
    modelStructure:['Introduction: Digital governance revolution — scale and speed','Transformation: Efficiency, inclusion, transparency wins','Exclusion: Who gets left behind in digital India','Surveillance: India\'s legal gaps vs EU GDPR','DPDP Act — solution or still incomplete?','Global comparison','Conclusion: Rights-based digital governance framework needed'],
    keywords:['DBT','JAM Trinity','Digital Divide','DPDP Act 2023','Right to Privacy','Aadhaar','Art 21','Surveillance','India Stack'],
  },
  {
    id:'mt4',question:'Examine the role of multilateral groupings in India\'s foreign policy. Is India\'s simultaneous participation in Quad and SCO contradictory?',
    subject:'Int. Relations',paperType:'GS-II',difficulty:'hard',wordTarget:250,
    keyDimensions:[
      {dimension:'Multi-Alignment Philosophy',hint:'Strategic autonomy tradition since NAM. Multi-alignment = engage everyone, commit exclusively to none.'},
      {dimension:'Quad Logic',hint:'Indo-Pacific security + technology + climate. Not a military alliance. Countering Chinese assertiveness without naming it.'},
      {dimension:'SCO Logic',hint:'Eurasian connectivity + counterterrorism. Access to Central Asia. Russia relationship maintained.'},
      {dimension:'Apparent Contradiction',hint:'Quad counters China; SCO includes China. How to navigate? Domain separation.'},
      {dimension:'India\'s Advantage',hint:'Being in both increases India\'s leverage. Can mediate. Reduces isolation risk.'},
    ],
    modelStructure:['Introduction: India\'s multi-alignment explained','Quad: Purpose, scope, non-alliance nature','SCO: Eurasian purpose, different domain','Apparent contradiction: China the common variable','Domain separation logic — security vs connectivity vs trade','Historical precedent: NAM + Soviet ties in Cold War','Conclusion: Contradiction is a feature, not a bug — strategic ambiguity is a tool'],
    keywords:['Multi-alignment','Strategic autonomy','Quad','SCO','Indo-Pacific','BRICS','NAM','Non-alignment','China'],
  },
  {
    id:'mt5',question:'"The real test of development is not GDP growth but the quality of life of the last person in the queue." Critically examine with reference to India\'s development model.',
    subject:'Economy + Social Justice',paperType:'GS-III / Essay',difficulty:'medium',wordTarget:300,
    keyDimensions:[
      {dimension:'GDP vs Human Development',hint:'Amartya Sen: Development as Freedom. HDI vs GDP. India\'s HDI rank vs GDP rank gap.'},
      {dimension:'India\'s Growth Story',hint:'7%+ GDP growth but inequality widening. Gini coefficient concerns. Urban-rural divide.'},
      {dimension:'Social Indicators',hint:'Maternal mortality, child stunting, NFHS data, multidimensional poverty. Progress but gaps.'},
      {dimension:'Inclusive Schemes',hint:'MGNREGA, Ayushman Bharat, PM-KISAN, JAM Trinity — reaching the last person?'},
      {dimension:'Structural Barriers',hint:'Caste, gender, geography still determine development outcomes. Last mile delivery failure.'},
    ],
    modelStructure:['Introduction: Quote interpretation + development philosophy','GDP growth — the numbers','What the numbers hide: inequality, HDI gap','India\'s last person: data on excluded groups','Schemes designed for last mile','Structural barriers that persist','Conclusion: GDP is necessary but not sufficient — Sen\'s Capability Approach needed'],
    keywords:['HDI','Multidimensional Poverty','MGNREGA','Ayushman Bharat','Amartya Sen','Gini coefficient','JAM Trinity','Inclusive growth','NFHS'],
  },
];

// ─── ADAPTIVE MOCK CONFIGURATIONS ────────────────────────
const MOCK_CONFIGS = [
  {id:'full_prelims',label:'Full Prelims Simulation',icon:'🏆',questions:100,timeMin:120,negMarking:true,negValue:0.33,subjectDist:{Polity:25,Economy:20,Environment:20,History:15,Geography:10,'Sci & Tech':5,Governance:3,'Int. Relations':2},desc:'Complete UPSC Prelims Paper 1 simulation with actual subject distribution'},
  {id:'adaptive_30',label:'Adaptive Weak-Zone Test',icon:'🎯',questions:30,timeMin:40,negMarking:false,negValue:0,desc:'Targets your weak nodes. AI-selected based on your mistake history.'},
  {id:'subject_deep',label:'Subject Deep Dive',icon:'📚',questions:40,timeMin:50,negMarking:true,negValue:0.33,desc:'40 questions from one subject — go deep on a single domain'},
  {id:'current_affairs',label:'Current Affairs Sprint',icon:'📡',questions:20,timeMin:20,negMarking:false,negValue:0,desc:'20 questions from recent current affairs linked to syllabus'},
  {id:'concept_cluster',label:'Cluster Connection Quiz',icon:'🔗',questions:25,timeMin:30,negMarking:false,negValue:0,desc:'Questions testing cross-topic connections — UPSC\'s favourite type'},
  {id:'speed_drill',label:'Speed Drill',icon:'⚡',questions:20,timeMin:10,negMarking:false,negValue:0,desc:'20 questions in 10 minutes — trains rapid recall under pressure'},
  {id:'weak_assault',label:'Weak Zone Assault',icon:'⚔️',questions:30,timeMin:35,negMarking:true,negValue:0.33,desc:'Exclusively attacks your bottom 5 performing nodes with negative marking'},
];

// Merge expansion packs when loaded
if (typeof QUESTION_BANK_2 !== 'undefined') QUESTION_BANK.push(...QUESTION_BANK_2);
if (typeof QUESTION_BANK_3 !== 'undefined') QUESTION_BANK.push(...QUESTION_BANK_3);
