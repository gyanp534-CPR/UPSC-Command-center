// UPSC COSMOS v6 — GS1 QUESTION BANK
// Art & Culture (40) + World History (40) = 80 questions

const QUESTION_BANK_GS1 = [

// ══════════════════════════════════════
// ART & CULTURE — 40 questions
// ══════════════════════════════════════

// ── Temple Architecture ──
{id:'gc_ac_001',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'Temple Architecture',
q:'The Nagara style of temple architecture is primarily associated with:',
opts:['South India (Tamil Nadu, Karnataka)','North India — characterized by a curvilinear shikhara (tower) over the garbhagriha','Eastern India only','Deccan plateau temples'],
ans:1,
explain:'Nagara style (North Indian): Curvilinear shikhara, no boundary wall, built on raised platform (jagati). Key features: amalaka (ribbed disc at top), kalasha (pot finial). Examples: Khajuraho, Konark, Lingaraja (Bhubaneswar).',
wrongExplain:'Dravidian style (South India): Pyramidal vimana, large gopuram (gateway tower), enclosed courtyard. Vesara = hybrid of Nagara and Dravidian (Deccan). Knowing this distinction is essential for UPSC.'},

{id:'gc_ac_002',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2022,topic:'Temple Architecture',
q:'The Kandariya Mahadeva temple at Khajuraho belongs to which architectural style?',
opts:['Dravidian style','Vesara style','Nagara style — specifically the Chandela sub-school','Indo-Islamic style'],
ans:2,
explain:'Kandariya Mahadeva (Khajuraho, MP): Nagara style. Built by Chandela rulers (950-1050 CE). Tallest shikhara at Khajuraho (31m). Famous for erotic sculptures on outer walls — part of tantric tradition and represent Kama (one of four purusharthas).',
wrongExplain:'Khajuraho temples are Nagara style — curvilinear shikharas. The erotic sculptures are on outer walls only (not inside garbhagriha). UNESCO WHS. 85 out of original 85+ temples survive today.'},

{id:'gc_ac_003',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2019,topic:'Temple Architecture',
q:'The Brihadeeswarar Temple at Thanjavur was built by:',
opts:['Pallava dynasty','Rashtrakuta dynasty','Raja Raja Chola I — exemplar of Dravidian architecture','Hoysala dynasty'],
ans:2,
explain:'Brihadeeswarar Temple (Thanjavur, Tamil Nadu): Built by Raja Raja Chola I (1003-1010 CE). UNESCO WHS. Dravidian style — 216-foot vimana tower, large Nandi (bull) monolith, first Indian temple built entirely of granite.',
wrongExplain:'Brihadeeswarar = "Big Temple." The main tower (vimana) has a shadow that does not fall on the ground at noon (engineering marvel). Also called "Periya Kovil." Chola bronze sculptures at their finest here.'},

{id:'gc_ac_004',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2020,topic:'Temple Architecture',
q:'Hoysala temples are distinctive because of:',
opts:['Very tall shikharas','Star-shaped plan (stellate form), soapstone construction, intricate sculptures — examples: Belur, Halebidu','Large gopurams','Islamic influence in design'],
ans:1,
explain:'Hoysala temples (Karnataka, 11th-14th century CE): Star-shaped base plan, built of soft chloritic schist (soapstone) allowing extremely intricate carvings, no tall tower — platform-dominated. Belur (Chennakesava) + Halebidu = finest examples.',
wrongExplain:'Hoysala = distinctive "Vesara" sub-style. The star-shaped plan creates multiple projections and recesses for sculpture. The soft soapstone allowed sculptors to create extraordinarily detailed work — like stone lace.'},

{id:'gc_ac_005',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2023,topic:'Temple Architecture',
q:'The Shore Temple at Mahabalipuram was built during which dynasty?',
opts:['Chola dynasty','Pallava dynasty — specifically under Narasimhavarman II (Rajasimha)','Pandya dynasty','Vijayanagara Empire'],
ans:1,
explain:'Shore Temple (Mahabalipuram, Tamil Nadu): Pallava dynasty, built by Narasimhavarman II "Rajasimha" (700-728 CE). UNESCO WHS. One of oldest structural stone temples in South India. Dedicated to Shiva.',
wrongExplain:'Pallavas pioneered both rock-cut (Mahabalipuram cave temples, Rathas) and structural stone temples. Mahabalipuram also has famous Descent of Ganga (Arjuna\'s Penance) bas-relief — world\'s largest.'},

// ── Sculpture & Art Schools ──
{id:'gc_ac_006',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2020,topic:'Sculpture',
q:'The Gandhara School of Art was characterized by:',
opts:['Pure Indian artistic tradition','Greco-Roman influence — depicted Buddha with Hellenistic features, draped robes like Apollo statues','South Indian artistic tradition','Islamic influence on Buddhist art'],
ans:1,
explain:'Gandhara School (1st-5th century CE, present-day Pakistan/Afghanistan): Greco-Buddhist art. Used grey schist stone. Buddha depicted with wavy hair, toga-like robes, halo — fusion of Greek Apollo and Indian Buddha iconography.',
wrongExplain:'Contrast: Mathura School = indigenous Indian tradition. Spotted red sandstone. Early Mathura Buddhas had no halo. Amaravati School = South Indian (Andhra Pradesh), white limestone, dynamic sculptures.'},

{id:'gc_ac_007',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2019,topic:'Sculpture',
q:'The Mathura School of Art during Kushana period used:',
opts:['White marble from Rajasthan','Spotted red sandstone — depicted Buddha in Indian style','Grey schist stone in Hellenistic style','Black stone from Deccan'],
ans:1,
explain:'Mathura School (1st-4th century CE): Indigenous Indian tradition. Spotted red sandstone. Depicted Buddha with Indian features — thin muslin robe (translucent), shaved head initially, no foreign influence.',
wrongExplain:'Mathura was a major art center producing both Buddhist and Hindu/Jain images. The tradition began pre-Kushana. Contrast with Gandhara\'s Greek-influenced style. Both schools produced Buddha images simultaneously.'},

{id:'gc_ac_008',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2022,topic:'Sculpture',
q:'Chola bronzes are famous for their use of which technique?',
opts:['Stone carving','Lost-wax (cire perdue / Madhuchishta Vidhana) casting technique','Clay modeling','Wood carving inlaid with metal'],
ans:1,
explain:'Chola bronzes (9th-13th century CE): Lost-wax technique. Wax model made, coated in clay, wax melted out, molten bronze poured in. Result: hollow bronze sculpture of extraordinary detail. Nataraja (Dancing Shiva) = most famous.',
wrongExplain:'Lost-wax technique allows complex poses impossible in stone. Chola Nataraja = cosmic dancer destroying and recreating universe. Panchaloha (5 metals): gold, silver, copper, zinc, iron used. Now UNESCO Intangible Heritage.'},

{id:'gc_ac_009',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'Paintings',
q:'The Ajanta cave paintings primarily depict:',
opts:['Hindu mythological scenes','Jataka tales (stories of Buddha\'s previous lives) and Buddhist themes — executed in tempera technique','Mughal court scenes','Scenes from Ramayana and Mahabharata'],
ans:1,
explain:'Ajanta (Maharashtra, 2nd century BCE – 6th century CE): 30 rock-cut caves. Paintings show Jataka tales, life of Buddha, Bodhisattvas. Technique: dry fresco/tempera on lime-plastered walls. UNESCO WHS.',
wrongExplain:'Ajanta uses organic pigments: lapis lazuli (blue), yellow ochre, cinnabar (red), lamp black, white. Cave 1 has famous "Padmapani Bodhisattva" — considered masterpiece of Indian painting.'},

{id:'gc_ac_010',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2020,topic:'Paintings',
q:'Miniature painting tradition flourished most under which rulers?',
opts:['Maurya emperors','Mughal emperors (especially Akbar, Jahangir, Shah Jahan) + Rajput courts','British East India Company','Maratha rulers'],
ans:1,
explain:'Miniature paintings: Mughal school (court scenes, portraits, nature study) and Rajput school (religious themes, Ramayana, Krishna legends). Akbar established royal atelier. Jahangir = greatest connoisseur of painting.',
wrongExplain:'Regional styles: Pahari (hills of HP/J&K), Deccan (Bijapur, Golconda courts), Malwa. Company School = Indian artists adapting to European tastes under British rule. Each has distinctive style.'},

// ── Classical Dance ──
{id:'gc_ac_011',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'Classical Dance',
q:'Bharatanatyam dance form originated in:',
opts:['Kerala','Tamil Nadu — performed by Devadasis in South Indian temples, revived in 20th century by Rukmini Devi Arundale','Andhra Pradesh','Karnataka'],
ans:1,
explain:'Bharatanatyam: Oldest classical dance of India. Tamil Nadu origin. Previously called Sadir or Dasiattam (performed by Devadasis in temples). Codified in Natya Shastra. Revived by Rukmini Devi Arundale (Kalakshetra, 1936). Triangular posture, intricate footwork, abhinaya (expression).',
wrongExplain:'8 Sangeet Natak Akademi recognized classical dances: Bharatanatyam, Kathak, Kathakali, Kuchipudi, Manipuri, Mohiniyattam, Odissi, Sattriya. Chhau added later. Know state + characteristic of each.'},

{id:'gc_ac_012',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2022,topic:'Classical Dance',
q:'Kathakali dance drama from Kerala is primarily based on:',
opts:['Urdu poetry and ghazals','Stories from Ramayana, Mahabharata, and Puranas — performed with elaborate makeup and costumes (Vesham)','Sufi themes','Buddhist Jataka tales'],
ans:1,
explain:'Kathakali (Kerala): Dance drama. Elaborate costumes and makeup (Vesham = character type identified by color: green/Pacha for heroes, red/Kathi for villains). Themes: Ramayana, Mahabharata, Bhagavata. Uses mudras (hand gestures) + navarasas (9 emotions).',
wrongExplain:'Kathakali uses Ashtakalasham — 8 preparations for makeup. The performance traditionally lasts all night. Mohiniyattam is Kerala\'s other classical dance — feminine, graceful, solo performance.'},

{id:'gc_ac_013',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2019,topic:'Classical Dance',
q:'Odissi dance originated in the temples of:',
opts:['Tamil Nadu','Kerala','Odisha — performed by Maharis (temple dancers) in temples like Jagannath Puri','Andhra Pradesh'],
ans:2,
explain:'Odissi (Odisha): Temple dance, performed by Maharis (female temple servants). Distinctive: tribhangi posture (three-bend: head, torso, knee deflected in opposite directions). Sculptural poses derived from Konark temple carvings. Revived in 20th century.',
wrongExplain:'Odissi uses mudras from Abhinaya Chandrika (Odishan dance treatise). Guru Kelucharan Mohapatra = father of modern Odissi revival. The dance mimics temple sculptures — called "moving sculpture."'},

{id:'gc_ac_014',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2023,topic:'Classical Dance',
q:'Sattriya dance was included in the list of classical dances by Sangeet Natak Akademi in:',
opts:['1956','1975','2000','2010'],
ans:2,
explain:'Sattriya: Youngest recognized classical dance (2000). Originated in Vaishnavite monasteries (Sattras) of Assam by saint Srimanta Shankardev (15th-16th century). Previously only performed by male monks. Now performed by women too.',
wrongExplain:'Sattriya = 8th classical dance when added. Previously 7: Bharatanatyam, Kathak, Kathakali, Manipuri, Kuchipudi, Odissi, Mohiniyattam. Chhau was added later. UPSC frequently tests the list.'},

// ── Classical Music ──
{id:'gc_ac_015',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2020,topic:'Classical Music',
q:'Hindustani classical music differs from Carnatic classical music primarily in:',
opts:['Both are identical, just different names','Hindustani (North India): Persian-Islamic influence, improvisation-heavy, ragas have morning/evening categories. Carnatic (South India): more compositions, devotional, stricter form','Carnatic uses instruments, Hindustani uses only vocals','Hindustani is only for film music'],
ans:1,
explain:'Hindustani: North India, influenced by Persian music under Mughals, more improvisation (alaap, jod, jhala), ragas classified by time of day/season, instruments: sitar, sarod, tabla, sarangi. Carnatic: South India, composition-dominant (kritis), more structured, instruments: veena, mridangam, violin.',
wrongExplain:'Both systems are rooted in Natya Shastra and Sangeet Ratnakara. The split deepened during Delhi Sultanate when Persian influence entered North Indian music. Dhrupad = oldest surviving Hindustani form. Khyal = most popular today.'},

{id:'gc_ac_016',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'Classical Music',
q:'The "Sangeet Ratnakar" by Sarngadeva is significant because:',
opts:['It is the first book on Indian cooking','It is a 13th century treatise that bridges ancient and medieval music traditions — describes both Hindustani and Carnatic styles before they diverged','It describes military strategies of Marathas','It is a collection of Sufi poetry'],
ans:1,
explain:'Sangeet Ratnakar (13th century CE, Sarngadeva): Most comprehensive medieval music treatise. Written before the Hindustani-Carnatic split became definitive. Covers: svaras, ragas, talas, instruments, dance. Both traditions claim it as their foundation.',
wrongExplain:'Earlier treatise: Natya Shastra (Bharata Muni, 2nd century BCE-2nd century CE) = foundational text on music, dance, drama. Sangeet Ratnakar builds on Natya Shastra and is more detailed on musical theory.'},

{id:'gc_ac_017',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2022,topic:'Classical Music',
q:'Tansen, considered the greatest musician in Akbar\'s court, belonged to which musical tradition?',
opts:['Carnatic music tradition from South India','Dhrupad tradition — one of the most ancient forms of Hindustani classical music','Sufi Qawwali tradition','Folk music tradition of Rajasthan'],
ans:1,
explain:'Tansen: Greatest Hindustani musician in Akbar\'s Navaratna (Nine Gems). Dhrupad tradition — slowest, most austere Hindustani form. Known for composition of ragas (Miyan ki Todi, Miyan ki Malhar, Darbari Kanada).',
wrongExplain:'Dhrupad = oldest surviving Hindustani vocal form. Four sections: Sthayi, Antara, Sanchari, Abhog. Tansen\'s tomb at Gwalior — musicians rub leaves of tamarind tree there believing it gives power to voice. His descendants = Senia gharana.'},

// ── Literature & Languages ──
{id:'gc_ac_018',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'Literature',
q:'The Sangam literature of Tamil was composed between approximately:',
opts:['500 CE to 1000 CE','300 BCE to 300 CE — earliest Tamil literary corpus','1000 CE to 1400 CE','15th-17th century CE'],
ans:1,
explain:'Sangam literature (300 BCE – 300 CE): Earliest Tamil literary corpus. Named after Sangam (literary academies). Two major collections: Ettutogai (Eight Anthologies) and Pattuppattu (Ten Idylls). Themes: love (Akam) and war/heroism (Puram).',
wrongExplain:'Sangam literature gives us earliest picture of South Indian society — three Tamil kingdoms (Chera, Chola, Pandya), trade with Rome, social customs. Tolkappiyam = oldest Tamil grammar (also Sangam era).'},

{id:'gc_ac_019',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2019,topic:'Literature',
q:'Ashtadhyayi, the foundational text of Sanskrit grammar, was written by:',
opts:['Kalidasa','Panini — in the 4th century BCE, describes Classical Sanskrit comprehensively','Valmiki','Kautilya'],
ans:1,
explain:'Ashtadhyayi (Panini, 4th century BCE): 4,000 sutras (rules) describing Sanskrit grammar with remarkable precision and economy. Considered one of the greatest intellectual achievements in human history. Defines Classical Sanskrit.',
wrongExplain:'Kalidasa = playwright/poet (Shakuntalam, Meghaduta). Valmiki = Ramayana. Kautilya = Arthashastra. Panini\'s grammar is so precise that it can generate all valid Sanskrit sentences. Modern linguists consider it a forerunner of formal language theory.'},

{id:'gc_ac_020',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2023,topic:'Literature',
q:'Ramcharitmanas, written by Tulsidas, is significant because:',
opts:['It is Sanskrit version of Ramayana for scholars','It retold the Ramayana in Awadhi (vernacular language) — making it accessible to common people and becoming the most read Hindu text after the Vedas','It is a Sufi poem about divine love','It describes Mughal court life'],
ans:1,
explain:'Ramcharitmanas (1574-1577 CE): Tulsidas wrote in Awadhi (eastern Hindi). Made Ramayana accessible beyond Sanskrit-educated elite. Ram Bhakti tradition. Called "Bible of North India." Most recited Hindu text in villages.',
wrongExplain:'Valmiki Ramayana = Sanskrit (original). Tulsidas = Awadhi (vernacular). Kamban = Tamil Ramayana (11th century). Ezhuthachan = Malayalam. Each regional tradition has its own Ramayana — this shows India\'s rich literary diversity.'},

// ── Philosophy & Religion ──
{id:'gc_ac_021',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2020,topic:'Philosophy',
q:'Advaita Vedanta philosophy was propounded by:',
opts:['Ramanuja','Madhva','Adi Shankaracharya — 8th century CE philosopher who unified Hindu thought','Vallabhacharya'],
ans:2,
explain:'Advaita Vedanta (Adi Shankaracharya, 788-820 CE): Non-dualism. Brahman (ultimate reality) and Atman (individual soul) are identical. Maya (illusion) creates the appearance of multiplicity. Shankaracharya established 4 Mathas (monasteries) at four corners of India.',
wrongExplain:'Ramanuja = Vishishtadvaita (qualified non-dualism). Madhva = Dvaita (dualism — Brahman and individual souls are eternally distinct). Vallabha = Shuddhadvaita. These philosophical debates are called Vedanta schools and are frequently tested.'},

{id:'gc_ac_022',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2022,topic:'Philosophy',
q:'The Bhakti movement\'s most significant social contribution was:',
opts:['Establishing temples across India','Challenging caste hierarchy and untouchability — saints from lower castes (Kabir — weaver, Ravidas — cobbler) became revered teachers','Promoting Sanskrit learning','Opposing Islam politically'],
ans:1,
explain:'Bhakti Movement\'s social dimension: Saints from all castes — Kabir (weaver), Ravidas/Raidas (cobbler), Namdev (tailor), Chokhamela (Mahar, untouchable). They argued direct devotion to God transcended caste. This challenged Brahminic orthodoxy.',
wrongExplain:'Bhakti saints wrote in vernacular languages (not Sanskrit) making religious ideas accessible. The movement inspired later social reform movements and Gandhi\'s philosophy. Ambedkar acknowledged Chokhamela as an early anti-caste voice.'},

{id:'gc_ac_023',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2021,topic:'Philosophy',
q:'The "Navarasa" (nine emotions) concept comes from:',
opts:['Arthashastra','Natya Shastra by Bharata Muni — foundational text on performing arts','Ashtadhyayi','Sangeet Ratnakar'],
ans:1,
explain:'Natya Shastra (Bharata Muni, 2nd century BCE – 2nd century CE): Nine rasas — Shringara (love), Hasya (comedy), Karuna (compassion), Raudra (fury), Vira (heroism), Bhayanaka (terror), Bibhatsa (disgust), Adbhuta (wonder), Shanta (peace, added later).',
wrongExplain:'Rasa theory: Rasa = aesthetic emotion experienced by audience. Different from bhava (emotion expressed by performer). Natya Shastra covers: drama, music, dance, stagecraft. It is the basis of ALL Indian performing arts traditions.'},

// ── UNESCO Heritage ──
{id:'gc_ac_024',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'UNESCO Heritage',
q:'India\'s oldest UNESCO World Heritage Site is:',
opts:['Taj Mahal','Ajanta Caves','Agra Fort','The collective designation: Ajanta Caves, Ellora Caves, Agra Fort, Taj Mahal — all inscribed in 1983 (first year India was inscribed)'],
ans:3,
explain:'UNESCO WHS in India: First four inscribed in 1983: Ajanta Caves, Ellora Caves, Agra Fort, Taj Mahal. India currently has 42 UNESCO World Heritage Sites (2024). Most in Asia after China.',
wrongExplain:'UNESCO WHS criteria: Cultural or Natural. India has sites in both. Latest additions: Hoysala temples (2023), Sacred Ensembles of Hoysalas. Important cultural sites: Fatehpur Sikri, Humayun\'s Tomb, Qutb Minar, Mahabodhi Temple.'},

{id:'gc_ac_025',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2022,topic:'UNESCO Heritage',
q:'The Mahabodhi Temple Complex at Bodh Gaya is significant because:',
opts:['It is the largest temple in India','It is UNESCO WHS marking the place where Siddhartha Gautama attained enlightenment under the Bodhi Tree','It is the birthplace of Guru Nanak','It contains the largest Buddhist monastery'],
ans:1,
explain:'Mahabodhi Temple (Bodh Gaya, Bihar): UNESCO WHS (2002). Where Siddhartha Gautama attained Bodhi (enlightenment) under the Peepal tree (Bodhi Tree). Temple built by Ashoka, expanded later. The Vajrasana (diamond throne) marks the exact spot.',
wrongExplain:'Buddhist sacred sites: Bodh Gaya (enlightenment), Sarnath (first sermon), Kushinagar (death/parinirvana), Lumbini (Nepal, birthplace). These four are pilgrimage sites for Buddhists worldwide.'},

{id:'gc_ac_026',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2020,topic:'UNESCO Heritage',
q:'India\'s UNESCO Intangible Cultural Heritage (ICH) list does NOT include:',
opts:['Vedic chanting','Chhau dance','Taj Mahal architecture','Yoga — inscribed in 2016'],
ans:2,
explain:'Taj Mahal is UNESCO World Heritage Site (tangible, physical monument). UNESCO Intangible Cultural Heritage covers: practices, traditions, expressions. India\'s ICH includes: Vedic Chanting (2008), Ramlila (2008), Chhau (2010), Yoga (2016), Kumbh Mela (2017), Kolkata\'s Durga Puja (2021), Garba (2023).',
wrongExplain:'UNESCO has two separate lists: World Heritage Sites (physical places) and Intangible Cultural Heritage (living traditions). India has 14 inscriptions on ICH list. Garba (Gujarat) was the latest addition (2023).'},

// ── Crafts & Textiles ──
{id:'gc_ac_027',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2019,topic:'Crafts',
q:'Madhubani (Mithila) painting from Bihar is characterized by:',
opts:['Use of oil paints on canvas','Natural pigments, geometric patterns, themes from Hindu mythology — traditionally painted on mud-plastered walls and floors by women','Miniature size and Mughal style','Abstract modern art style'],
ans:1,
explain:'Madhubani painting: Bihar (Mithila region). Natural pigments from plants, minerals. Bold lines, geometric patterns, no empty space (filled with patterns). Themes: Hindu epics, nature, rituals. Traditionally by women on walls at birth, marriage.',
wrongExplain:'Madhubani gained international recognition when it was painted on a train coach (2018, Indian Railways). GI tag (Geographical Indication). Other folk painting traditions: Warli (Maharashtra), Pattachitra (Odisha), Gond (MP), Phad (Rajasthan).'},

{id:'gc_ac_028',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'Textiles',
q:'The Banarasi silk saree is known for:',
opts:['Use of synthetic fibers','Zari (gold/silver thread) weaving, intricate brocade patterns, motifs from Mughal art — made in Varanasi (Kashi)','Only cotton material with natural dyes','Digital printing technique on silk'],
ans:1,
explain:'Banarasi silk: Made in Varanasi. UNESCO creative city. Zari (real gold/silver thread) woven into patterns. Mughal-influenced motifs: kalga, buta, jala. GI-tagged product. Takes weeks to months to weave one sari.',
wrongExplain:'GI (Geographical Indication) tagged Indian textiles: Banarasi silk, Kanchipuram silk, Pochampally ikat, Chanderi silk, Phulkari (Punjab), Kashmiri Pashmina. GI tags protect traditional crafts from imitation.'},

{id:'gc_ac_029',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2022,topic:'Crafts',
q:'The Dokra metal craft technique uses:',
opts:['Modern die-casting','Lost-wax (cire perdue) casting — same ancient technique used by Harappan civilization 4,500 years ago, still practiced by Dhokra craftspeople in Chhattisgarh/Jharkhand/West Bengal','Machine pressing','Electroplating'],
ans:1,
explain:'Dokra: Non-ferrous metal casting using lost-wax technique. Identical to technique used for the famous "Dancing Girl" bronze from Harappa (2500 BCE). Practiced by Dhokra tribe in tribal belt. UNESCO recognized as intangible heritage.',
wrongExplain:'Dokra craft demonstrates India\'s unbroken craft tradition. The "Dancing Girl" from Mohenjo-daro = one of world\'s oldest known bronze castings using this technique. Dokra figures are recognizable by their rustic, textured appearance.'},

// ── Fairs & Festivals ──
{id:'gc_ac_030',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2020,topic:'Festivals',
q:'Kumbh Mela, inscribed as UNESCO Intangible Cultural Heritage in 2017, is held at:',
opts:['Only Varanasi','Four cities in rotation: Prayagraj (Allahabad), Haridwar, Nashik, Ujjain — based on planetary positions of Jupiter, Sun, Moon','Only Haridwar','Mathura exclusively'],
ans:1,
explain:'Kumbh Mela: World\'s largest religious gathering. Four cities (12-year cycle each). Prayagraj (Sangam of Ganga-Yamuna-Saraswati). 2019 Kumbh Mela = largest human gathering in history (~240 million people over 50 days).',
wrongExplain:'Maha Kumbh = every 12 years at Prayagraj. Ardh Kumbh = every 6 years. Kumbh Mela at each city = every 12 years. The myth: gods and demons churned ocean (Samudra Manthan), drops of amrit (nectar) fell at these four locations.'},

{id:'gc_ac_031',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'Festivals',
q:'The Pongal festival, primarily celebrated in Tamil Nadu, marks:',
opts:['The New Year as per Muslim calendar','Harvest festival — giving thanks to Sun god (Surya) for a good harvest, celebrated in mid-January','The festival of lights (Diwali in South India)','Celebration of Durga Puja'],
ans:1,
explain:'Pongal: 4-day harvest festival in Tamil Nadu. Thai (Tamil month, mid-January). First day: Bhogi (clear old things). Second day: Pongal (main day, cooking new rice in new pot, thanks to Sun). Third: Mattu Pongal (cattle worship). Fourth: Kaanum Pongal (family outing).',
wrongExplain:'Regional harvest festivals: Pongal (Tamil Nadu), Bihu (Assam), Makar Sankranti (North India), Lohri (Punjab), Uttarayan (Gujarat), Onam (Kerala). All celebrate harvest, occur around mid-January solar transition.'},

{id:'gc_ac_032',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2023,topic:'Festivals',
q:'The Hornbill Festival is associated with which state?',
opts:['Meghalaya','Nagaland — showcases Naga tribal culture, named after the revered Hornbill bird featured in most Naga warrior tribes\' headgear','Mizoram','Manipur'],
ans:1,
explain:'Hornbill Festival (Nagaland): Annual festival (December 1-10, Nagaland Statehood Day). All Naga tribes come together. Named after the Great Indian Hornbill bird — featured in traditional warrior headgear. Shows Naga crafts, music, dance, food, sports.',
wrongExplain:'Nagaland\'s 16 major Naga tribes each have their own festivals. Hornbill Festival = celebration of collective Naga identity. Other NE festivals: Bihu (Assam), Cheraw (Mizoram bamboo dance), Sangai (Manipur).'},

// ── Rock-Cut Architecture ──
{id:'gc_ac_033',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2019,topic:'Rock-Cut Architecture',
q:'The Ellora caves include religious monuments of which traditions?',
opts:['Only Buddhist caves','Only Hindu caves','Buddhist, Hindu, AND Jain caves — unique example of religious coexistence over 5-6 centuries of carving','Buddhist and Islamic caves'],
ans:2,
explain:'Ellora (Maharashtra, 5th-11th century CE): 34 caves — 12 Buddhist (caves 1-12), 17 Hindu (caves 13-29), 5 Jain (caves 30-34). UNESCO WHS. Kailasa temple (Cave 16) = largest single rock-cut structure in world, carved from a single rock.',
wrongExplain:'Ajanta (34 km away) = only Buddhist. Ellora = all three religions. Kailasa Temple at Ellora: Rashtrakuta dynasty (8th century). Three million cubic feet of rock removed to create it. Represents Mount Kailash — Shiva\'s home.'},

{id:'gc_ac_034',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2022,topic:'Rock-Cut Architecture',
q:'The Rathas at Mahabalipuram are significant because they are:',
opts:['Mobile chariots used in temple processions','Monolithic rock-cut temples (each carved from single granite boulder) by Pallava dynasty — each Ratha named after Pandava brothers','Ancient Hindu astronomical observatories','Temples built of bricks, not stone'],
ans:1,
explain:'Pancha Rathas (Mahabalipuram, Tamil Nadu): 5 monolithic rock-cut temples by Pallava dynasty (7th century CE). Named after 5 Pandava brothers + Draupadi. Each represents different architectural style. UNESCO WHS.',
wrongExplain:'Pancha Rathas show evolution of Dravidian architectural styles — Draupadi Ratha = simplest (hut-shaped), Dharmaraja Ratha = tallest (multi-story). These were "models" that architects used as prototypes for later temples.'},

// ── Indian Manuscripts & Knowledge ──
{id:'gc_ac_035',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2020,topic:'Ancient Knowledge',
q:'Charaka Samhita and Sushruta Samhita are associated with:',
opts:['Astronomy and mathematics','Ayurveda — Charaka = internal medicine, Sushruta = surgery (he described over 300 surgical procedures and 120 surgical instruments)','Music and dance','Agricultural practices'],
ans:1,
explain:'Charaka Samhita (2nd century CE): Foundation of Ayurvedic internal medicine. Sushruta Samhita (600 BCE): Foundation of surgery. Sushruta described: plastic surgery (rhinoplasty), cataract surgery, bone surgery. Considered "Father of Surgery" globally.',
wrongExplain:'Sushruta\'s rhinoplasty (nose reconstruction) was so advanced that British surgeons in 18th century learned from Indian practitioners. This is 2,500 years old. Aryabhata (astronomy), Brahmagupta (mathematics) are separate.'},

{id:'gc_ac_036',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'Ancient Knowledge',
q:'The concept of "Zero" as a numeral (not just a placeholder) was first clearly articulated by:',
opts:['Aryabhata','Brahmagupta (7th century CE) — who gave rules for arithmetic operations with zero','Varahamihira','Bhaskara II'],
ans:1,
explain:'Brahmagupta (628 CE): First to give formal rules for arithmetic with zero as a number. "When zero is added to a number, the number is unchanged. When zero is subtracted from zero, zero." Also: rules for negative numbers.',
wrongExplain:'Aryabhata (5th century CE): Used zero as a placeholder (positional notation), calculated pi to 4 decimal places, Earth\'s rotation, solar year = 365.25 days. But Brahmagupta formalized zero as a number in its own right.'},

{id:'gc_ac_037',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2022,topic:'Crafts',
q:'The Pashmina shawl is associated with which region and what makes it special?',
opts:['Rajasthan — dyed with natural colors','Kashmir — made from the fine undercoat (pashm) of the Changthangi goat from Ladakh\'s cold highlands. GI-tagged product','Punjab — Phulkari embroidery work','Maharashtra — silk weaving tradition'],
ans:1,
explain:'Pashmina: Fibers from undercoat of Changthangi (Pashmina) goat found in Ladakh at 14,000+ feet altitude. Extreme cold creates ultra-fine fibers (12-16 microns vs human hair 75 microns). Hand-spun, hand-woven in Kashmir. GI-tagged.',
wrongExplain:'Pashmina = Persian for "soft gold." Kashmiri Pashmina is GI-tagged. A ring test: genuine Pashmina shawl passes through a ring. Takes months to weave one shawl. Must be distinguished from Shahtoosh (illegal — from Tibetan antelope).'},

{id:'gc_ac_038',subject:'Art & Culture',node:'h1',difficulty:'hard',year:2023,topic:'Art Schools',
q:'The Bengal School of Art was founded by:',
opts:['Raja Ravi Varma','Abanindranath Tagore (Rabindranath Tagore\'s nephew) — rejected colonial European realism, revived Indian painting traditions using Mughal and Ajanta influences','Nandalal Bose','Jamini Roy'],
ans:1,
explain:'Bengal School (early 20th century): Founded by Abanindranath Tagore. Rejected European academic realism (as practiced by Raja Ravi Varma). Revived Indian swadeshi aesthetic — used wash technique, Mughal miniature influences, Japanese painting elements.',
wrongExplain:'E.B. Havell (Superintendent, Calcutta School of Art) supported the movement. Nandalal Bose (Abanindranath\'s student) painted the original Haripura Congress posters (1938) for Gandhi. Bengal School = nationalist art movement.'},

{id:'gc_ac_039',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2020,topic:'Performing Arts',
q:'Yakshagana is a traditional theatre form of:',
opts:['Tamil Nadu','Kerala','Karnataka — combines dance, music, dialogue, costume in all-night performances based on Puranic stories','Andhra Pradesh'],
ans:2,
explain:'Yakshagana: Karnataka\'s traditional theatre. All-night performances. Elaborate makeup, tall headgear (mundasu), costume. Based on Mahabharata, Ramayana, Bhagavata stories. Two styles: Tulu Nadu (coastal) and Malnad (hill).',
wrongExplain:'Regional theatre traditions: Yakshagana (Karnataka), Koodiyattam (Kerala, UNESCO ICH), Tamasha (Maharashtra), Jatra (West Bengal), Ramlila (North India, UNESCO ICH), Therukoothu (Tamil Nadu).'},

{id:'gc_ac_040',subject:'Art & Culture',node:'h1',difficulty:'medium',year:2021,topic:'Art & Architecture',
q:'The Qutb Minar complex is significant because it contains:',
opts:['Only Islamic architecture','India\'s earliest mosque (Quwwat-ul-Islam = "Might of Islam") + Iron Pillar (4th-5th century, non-rusting) + Iltutmish\'s tomb — shows fusion of Indian craftsmen building Islamic structures','Only Mughal-era architecture','A Buddhist stupa converted to mosque'],
ans:1,
explain:'Qutb Minar complex (Delhi): UNESCO WHS. Qutb Minar = 73m minaret (1193-1220 CE). Quwwat-ul-Islam mosque (1193) = India\'s first mosque, built using materials from 27 demolished Hindu/Jain temples. Iron Pillar of Chandragupta II (4th-5th c, does not rust — chromium passivation).',
wrongExplain:'The Iron Pillar in Qutb complex is a metallurgical marvel — 1,600 years without significant rust. Modern analysis: high phosphorus content created a protective passivation layer. Ancient Indian metallurgy was extraordinarily advanced.'},

// ══════════════════════════════════════
// WORLD HISTORY — 40 questions
// ══════════════════════════════════════

// ── Colonialism & Imperialism ──
{id:'gc_wh_001',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Colonialism',
q:'The Berlin Conference (1884-85) is associated with:',
opts:['End of World War I','Partition of Africa among European powers — "Scramble for Africa" formalized with 14 European nations dividing Africa without African representation','Establishment of League of Nations','Cold War nuclear negotiations'],
ans:1,
explain:'Berlin Conference 1884-85: 14 European powers (no African representatives) divided Africa. "Scramble for Africa." Belgium got Congo (Leopold II\'s personal colony). Britain got Egypt, South Africa. France got West Africa. By 1914: 90% of Africa was colonized.',
wrongExplain:'Pre-1880: Only coastal Africa was colonized. Rapid colonization followed technological advances (quinine for malaria, machine gun, steamships). Africa\'s partition = most rapid colonization in history. Its artificial borders persist today.'},

{id:'gc_wh_002',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'Colonialism',
q:'The Opium Wars (1839-42, 1856-60) between Britain and China resulted in:',
opts:['Chinese victory and expulsion of British traders','"Unequal treaties" — China forced to open ports, cede Hong Kong to Britain, grant extraterritoriality to Western powers — humiliation that shaped modern China\'s identity','Mutual free trade agreement','China joining the British Empire voluntarily'],
ans:1,
explain:'Opium Wars: Britain forced opium (grown in India) into China despite Chinese ban. China lost both wars. Treaty of Nanjing (1842): ceded Hong Kong, opened 5 ports, paid indemnity. Called "Century of Humiliation" by China (1839-1949).',
wrongExplain:'Significance: The "Century of Humiliation" deeply shapes China\'s foreign policy today. Xi Jinping\'s "China Dream" = restoring China\'s great power status. Hong Kong was returned only in 1997. Taiwan issue also traces to this period.'},

{id:'gc_wh_003',subject:'World History',node:'h4',difficulty:'hard',year:2020,topic:'Colonialism',
q:'The "Doctrine of Lapse" was used by British India under:',
opts:['Lord Cornwallis','Lord Dalhousie (1848-1856) — annexed princely states if ruler died without natural heir, denying right of adoption','Lord Curzon','Lord Wellesley'],
ans:1,
explain:'Doctrine of Lapse (Lord Dalhousie): If ruler of princely state died without male biological heir, state "lapsed" to the British. Used to annex: Satara (1848), Jhansi (1853), Nagpur (1854), Awadh (1856). Major grievance → 1857 revolt.',
wrongExplain:'Subsidiary Alliance (Lord Wellesley): States must maintain British troops at their expense + British resident at court. Doctrine of Lapse was more aggressive. Both were tools of British expansion in India.'},

{id:'gc_wh_004',subject:'World History',node:'h4',difficulty:'medium',year:2019,topic:'Industrial Revolution',
q:'The Industrial Revolution began in Britain primarily because of:',
opts:['British military conquest of other nations','Combination of: coal and iron deposits, textile innovation (spinning jenny, steam loom), agricultural surplus enabling urban labor force, colonial markets and raw materials','Scientific discoveries of Newton','French Revolution influencing British politics'],
ans:1,
explain:'Industrial Revolution (Britain, 1760-1840): Steam engine (Watt, 1769), spinning jenny (Hargreaves, 1764), power loom. Britain had: coal+iron deposits, rivers for water power, agricultural revolution creating surplus labor, colonial markets (India).',
wrongExplain:'India\'s role: Raw cotton from India → Lancashire mills → finished cloth sold back to India. This de-industrialized India\'s textile sector. Dadabhai Naoroji called it "drain of wealth." India went from textile exporter to importer.'},

{id:'gc_wh_005',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'Industrial Revolution',
q:'The term "Luddites" refers to:',
opts:['Supporters of the industrial revolution','19th century British artisans and textile workers who destroyed machinery fearing it would replace their jobs — now broadly means anti-technology resistance','A British political party opposing imperialism','Workers who supported factory owners'],
ans:1,
explain:'Luddites (1811-1816): British textile workers who destroyed machinery in protest against mechanization threatening their livelihoods. Named after mythical Ned Ludd. Machine-breaking was a capital offense. The movement was violently suppressed.',
wrongExplain:'Luddism = rational response to technological unemployment, not irrationality. Contemporary "Luddite" debate: AI replacing jobs. The original Luddites had legitimate grievances — they lost skilled livelihoods to machines overnight.'},

// ── American & French Revolutions ──
{id:'gc_wh_006',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Revolutions',
q:'The French Revolution\'s "Liberty, Equality, Fraternity" slogan influenced:',
opts:['Only France\'s internal politics','Universal democratic ideals — the Declaration of the Rights of Man (1789) inspired independence movements worldwide, including India\'s freedom struggle','Only European monarchies','The American Civil War'],
ans:1,
explain:'French Revolution (1789): Declaration of Rights of Man and of the Citizen = first document declaring universal human rights. Influenced: Latin American independence movements, Haitian Revolution (1791, first successful slave revolt), Indian nationalism, anti-colonial movements globally.',
wrongExplain:'The Haitian Revolution (1791-1804) was directly inspired by French Revolution ideals — enslaved people applied "liberty and equality" to themselves. Haiti = first Black republic and second independent nation in Western Hemisphere.'},

{id:'gc_wh_007',subject:'World History',node:'h4',difficulty:'medium',year:2020,topic:'Revolutions',
q:'The American Declaration of Independence (1776) was primarily directed against:',
opts:['French colonial rule','British colonial rule — "No taxation without representation" — listing specific grievances against King George III, articulating Enlightenment philosophy (natural rights, social contract)','Spanish colonial presence','Self-governance within British Empire'],
ans:1,
explain:'American Declaration of Independence (July 4, 1776): Thomas Jefferson drafted it. Key idea: "All men are created equal, endowed with unalienable rights: Life, Liberty, Pursuit of Happiness." Influenced by Locke\'s social contract theory. First successful anti-colonial revolution.',
wrongExplain:'American Revolution influenced French Revolution (Lafayette fought in American Revolution, then led French one). Also influenced: Latin American independence, Indian freedom struggle (Bal Gangadhar Tilak cited American example).'},

{id:'gc_wh_008',subject:'World History',node:'h4',difficulty:'hard',year:2023,topic:'Revolutions',
q:'The Reign of Terror (1793-94) during French Revolution refers to:',
opts:['Napoleon\'s conquest of Europe','Period when the Committee of Public Safety under Robespierre executed 17,000+ people (including moderates) in the name of revolution\'s protection','The period before the Revolution','British response to the French Revolution'],
ans:1,
explain:'Reign of Terror (1793-94): Robespierre\'s Committee of Public Safety. Guillotine became symbol. 17,000 officially executed, 40,000 died in prisons. Ended when Robespierre himself was guillotined (Thermidorian Reaction, July 1794).',
wrongExplain:'The Terror shows how revolutions can consume themselves. Robespierre = "Incorruptible" executed moderate revolutionaries including Danton. His own execution ended the Terror. Napoleon emerged from this chaos.'},

// ── World Wars ──
{id:'gc_wh_009',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'World Wars',
q:'The immediate trigger of World War I was:',
opts:['Germany\'s invasion of Poland','Assassination of Archduke Franz Ferdinand (heir to Austria-Hungary throne) in Sarajevo, June 28, 1914 — by Gavrilo Princip, Serbian nationalist (Black Hand connection)','Japan\'s attack on Pearl Harbor','German sinking of the Lusitania'],
ans:1,
explain:'WWI trigger: Assassination of Franz Ferdinand in Sarajevo → Austria-Hungary ultimatum to Serbia → Russia mobilized to support Serbia → Germany declared war on Russia → France entered → Germany invaded Belgium → Britain entered. The alliance system turned a regional crisis into world war.',
wrongExplain:'MAIN causes of WWI (MAIN): Militarism, Alliance system (Triple Entente vs Triple Alliance), Imperialism, Nationalism. The assassination was just the spark in a powder keg. Any of a dozen crises could have started the war.'},

{id:'gc_wh_010',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'World Wars',
q:'The Treaty of Versailles (1919) is blamed for causing World War II because:',
opts:['It was too lenient on Germany','It imposed harsh terms on Germany — war guilt clause (Article 231), massive reparations ($33 billion), territorial losses, military restrictions — humiliating Germany and fueling nationalism that Hitler exploited','It created the United Nations','It divided Europe into communist and capitalist blocs'],
ans:1,
explain:'Treaty of Versailles: War Guilt Clause blamed Germany entirely. Reparations caused economic collapse. Loss of Alsace-Lorraine, Rhineland demilitarization, limits on army to 100,000. John Maynard Keynes warned it would lead to another war.',
wrongExplain:'Keynes\'s "The Economic Consequences of the Peace" (1919) predicted the treaty would cause another war. He was right. The Great Depression (1929) worsened Germany\'s situation — creating conditions for Hitler\'s rise (1933).'},

{id:'gc_wh_011',subject:'World History',node:'h4',difficulty:'hard',year:2020,topic:'World Wars',
q:'The Holocaust refers to:',
opts:['Allied bombing of German cities','Nazi Germany\'s systematic state-sponsored genocide of 6 million Jews (plus 5-6 million others: Roma, disabled, homosexuals, political opponents) between 1941-45','Japanese atrocities in China','Stalin\'s purges in Soviet Union'],
ans:1,
explain:'Holocaust: Nazi systematic genocide. 6 million Jews (2/3 of European Jewish population). Gas chambers at Auschwitz, Treblinka, Sobibor. Preceded by: Nuremberg Laws (1935, stripped citizenship), Kristallnacht (1938, pogrom), then "Final Solution" (1942).',
wrongExplain:'Holocaust established the concept of "genocide" in international law. Led to Genocide Convention (1948) and Universal Declaration of Human Rights (1948). Nuremberg Trials = first international criminal tribunal — established individual criminal responsibility for war crimes.'},

{id:'gc_wh_012',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'World Wars',
q:'The atomic bombings of Hiroshima (August 6) and Nagasaki (August 9), 1945:',
opts:['Were conducted by the Soviet Union','Were the first and only use of nuclear weapons in warfare by USA — killed 130,000-226,000 people, forced Japan\'s surrender, ended WWII, and began the nuclear age','Caused Japan to continue fighting for 2 more years','Were a joint USA-Soviet operation'],
ans:1,
explain:'Hiroshima (Little Boy, uranium bomb) and Nagasaki (Fat Man, plutonium bomb): August 6-9, 1945. Japan surrendered August 15, 1945. The bombings remain the only wartime use of nuclear weapons. They fundamentally changed international relations and warfare.',
wrongExplain:'The decision to bomb is still debated: Did it save lives by avoiding invasion? Or was Japan already defeated? The Cold War nuclear arms race followed. NPT (1968) emerged from fear of nuclear proliferation. India testing (1974, 1998) used this context.'},

// ── Cold War ──
{id:'gc_wh_013',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'Cold War',
q:'The Truman Doctrine (1947) committed the USA to:',
opts:['Nuclear disarmament','Containing Soviet expansion — "support free peoples who are resisting attempted subjugation" — specifically initially for Greece and Turkey, became global anti-communist policy','Marshall Plan for European reconstruction','Formation of NATO military alliance'],
ans:1,
explain:'Truman Doctrine (March 1947): USA would support any nation threatened by Soviet expansion. Response to British withdrawal from supporting Greece and Turkey. Marked beginning of USA\'s active Cold War containment policy.',
wrongExplain:'Marshall Plan (1948) = economic dimension of containment ($13 billion to rebuild Western Europe — Soviet refusal created two economic blocs). NATO (1949) = military dimension. Truman Doctrine = political/ideological dimension. All three = containment strategy.'},

{id:'gc_wh_014',subject:'World History',node:'h4',difficulty:'medium',year:2019,topic:'Cold War',
q:'The Cuban Missile Crisis (1962) was resolved when:',
opts:['USA invaded Cuba','Soviet Union agreed to remove missiles from Cuba; USA pledged not to invade Cuba + secretly agreed to remove Jupiter missiles from Turkey — closest the Cold War came to nuclear war','Cuba joined NATO','USA removed missiles from Europe first'],
ans:1,
explain:'Cuban Missile Crisis (October 1962): Soviets placed nuclear missiles in Cuba (90 miles from USA). 13-day standoff. Kennedy (USA) vs Khrushchev (USSR). Resolution: Soviets removed missiles, USA pledged no Cuba invasion + secretly removed Jupiter missiles from Turkey.',
wrongExplain:'Key lesson: Miscalculation nearly caused nuclear war. Led to: Moscow-Washington Hotline (red phone), Limited Test Ban Treaty (1963), beginning of détente. Shows how accidental nuclear war is possible without direct conflict intent.'},

{id:'gc_wh_015',subject:'World History',node:'h4',difficulty:'hard',year:2023,topic:'Cold War',
q:'The Non-Aligned Movement (NAM) was created as:',
opts:['A military alliance opposing both USA and USSR','A grouping of newly independent nations refusing to align with either Cold War bloc — asserting right to pursue independent foreign policy','An economic organization replacing the IMF','A United Nations committee'],
ans:1,
explain:'NAM founded 1961 (Belgrade): India (Nehru), Yugoslavia (Tito), Egypt (Nasser), Ghana (Nkrumah), Indonesia (Sukarno). "Third option" for newly independent nations. Bandung Conference 1955 = spirit. At peak: 120 member nations.',
wrongExplain:'NAM relevance debated: Did non-alignment prevent colonialism from returning? Or did it just allow nations to play both sides for aid? India got weapons from both USSR and USA during Cold War while claiming non-alignment.'},

// ── Decolonization ──
{id:'gc_wh_016',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Decolonization',
q:'The partition of Africa\'s post-colonial borders caused lasting conflicts because:',
opts:['African nations chose these borders themselves','Colonial powers drew arbitrary straight-line borders ignoring ethnic, linguistic, cultural, and tribal territories — creating states where different groups were forced together or tribes split across borders','The borders were based on natural geographic features like rivers','African unions accepted colonial borders voluntarily'],
ans:1,
explain:'African borders: 44% of Africa\'s borders are straight lines — drawn by European powers at Berlin Conference (1884-85) without knowledge of or regard for African ethnic realities. Same tribe on two sides of a border, historic enemies in one state = source of conflicts.',
wrongExplain:'OAU (now AU) accepted colonial borders in 1963 — feared border disputes would destabilize new nations. The alternative (redrawing borders by ethnicity) seemed even more dangerous. But arbitrary borders fuel: Civil wars (DRC, Nigeria-Biafra, Sudan/South Sudan, Somalia).'},

{id:'gc_wh_017',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'Decolonization',
q:'The partition of British India in 1947 was primarily along:',
opts:['Linguistic lines','Religious lines — predominantly Muslim areas → Pakistan; predominantly Hindu areas → India (Mountbatten Plan, Radcliffe Award)','Economic development lines','Military strategic lines'],
ans:1,
explain:'Partition 1947: Two-Nation Theory (Jinnah): Hindus and Muslims are separate nations. Radcliffe Commission divided Punjab and Bengal. 14-18 million displaced in largest mass migration in history. 200,000-2 million killed in violence.',
wrongExplain:'The partition\'s long-term consequences: Three India-Pakistan wars (1947, 1965, 1971), Kashmir dispute, nuclear standoff. Bangladesh (East Pakistan) broke away in 1971. Partition remains the defining trauma of South Asian history.'},

{id:'gc_wh_018',subject:'World History',node:'h4',difficulty:'hard',year:2020,topic:'Decolonization',
q:'The "Winds of Change" speech (1960) by British PM Harold Macmillan addressed:',
opts:['NATO members about nuclear sharing','African parliament in Cape Town, South Africa — acknowledged that African nationalism was an unstoppable force and Britain would decolonize, implicitly criticizing apartheid','Indian independence celebrations','End of British Empire in Asia'],
ans:1,
explain:'"Winds of Change" (February 1960, Cape Town): Macmillan told South African Parliament that African nationalism was inevitable and Britain would not maintain colonialism. Marked Britain\'s acceptance of decolonization. 1960 = "Year of Africa" — 17 African nations became independent.',
wrongExplain:'17 African nations became independent in 1960. Macmillan\'s speech was striking because he delivered it in apartheid South Africa, implicitly comparing African nationalism to South African Black aspirations. This hastened eventual end of apartheid.'},

// ── Russian Revolution ──
{id:'gc_wh_019',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Russian Revolution',
q:'The Bolshevik Revolution (October 1917) was led by:',
opts:['Alexander Kerensky','Vladimir Lenin and the Bolshevik Party — seized power from the Provisional Government in Petrograd, Russia exited WWI (Treaty of Brest-Litovsk 1918)','Leon Trotsky alone','The Russian aristocracy rebelling against the Tsar'],
ans:1,
explain:'October Revolution 1917: Lenin\'s Bolsheviks overthrew Kerensky\'s Provisional Government (which had replaced the Tsar in February 1917). Key slogan: "Peace, Land, Bread." Russia exited WWI via Treaty of Brest-Litovsk (gave up huge territory).',
wrongExplain:'Two 1917 revolutions: February Revolution (mass protest → Tsar abdicated → Provisional Government). October Revolution (Bolsheviks overthrew Provisional Government). Civil War (1917-22) followed — Red (Bolsheviks) vs White (anti-Bolshevik). USSR formed 1922.'},

{id:'gc_wh_020',subject:'World History',node:'h4',difficulty:'hard',year:2022,topic:'Russian Revolution',
q:'Stalin\'s collectivization of agriculture (1929-1933) in Soviet Union caused:',
opts:['Massive increase in agricultural productivity','Ukrainian Holodomor — forced collectivization destroyed kulak (prosperous peasant) class, disrupted agriculture, caused famine killing 3-5 million Ukrainians (deliberately worsened by grain export quotas)','Voluntary movement of farmers to collectives','Prosperity for Soviet farmers'],
ans:1,
explain:'Collectivization: Forced peasants into collective farms (kolkhozy). Kulaks (prosperous peasants) "liquidated as a class" — killed, deported. Holodomor (1932-33): Ukrainian famine. 3-5 million dead. Stalin continued exporting grain even as Ukrainians starved.',
wrongExplain:'Ukraine recognizes Holodomor as genocide. Russia disputes this. The Holodomor feeds Ukrainian identity and hostility to Russia — directly relevant to understanding the 2022 Russia-Ukraine war context.'},

// ── Rise of Fascism ──
{id:'gc_wh_021',subject:'World History',node:'h4',difficulty:'medium',year:2020,topic:'Fascism',
q:'Hitler\'s rise to power in Germany (1933) was enabled by:',
opts:['Military coup overthrowing democracy','Constitutional appointment as Chancellor — Hitler exploited: Great Depression humiliation, Weimar Republic\'s weakness, Nazi propaganda, and legal methods before establishing dictatorship','Foreign invasion installing Hitler','German monarchy restoring',''],
ans:1,
explain:'Hitler\'s rise: NSDAP (Nazis) won largest seats in 1932 elections → Hindenburg appointed Hitler Chancellor January 30, 1933 → Reichstag Fire (February) used to suspend civil liberties → Enabling Act (March) gave Hitler dictatorial powers legally.',
wrongExplain:'Key lesson: Democracies can be subverted from within using democratic processes. Hitler never won a majority in a free election (highest was 37% in 1932). He used constitutional means to then destroy the constitution. Warning for all democracies.'},

{id:'gc_wh_022',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Fascism',
q:'Mussolini\'s Fascism in Italy (1922-1943) introduced the term "fascism" to mean:',
opts:['Democratic socialism','Authoritarian ultranationalism — one-party state, cult of leader, violence against opposition, corporate state merging business and government, aggressive imperialism','Liberal democracy','Communism adapted for Italy'],
ans:1,
explain:'Fascism (Mussolini, 1919): From "fasces" (Roman bundle of sticks = strength in unity). Key features: authoritarian one-party state, charismatic leader, extreme nationalism, violence, anti-Marxism, corporate state (neither capitalism nor communism). Invaded Ethiopia (1935), Albania (1939).',
wrongExplain:'Fascism vs Nazism: Both are authoritarian ultranationalist, but Nazism adds racial theory (Aryan supremacy, antisemitism). Mussolini had no racial ideology initially — adopted antisemitic laws in 1938 after aligning with Hitler.'},

// ── Post-WWII World Order ──
{id:'gc_wh_023',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'Post-WWII',
q:'The United Nations was founded in:',
opts:['1919 (with League of Nations)','1945 — San Francisco Conference. Founded with 51 member nations. Replaced the failed League of Nations. Five permanent UNSC members reflect WWII victors.','1948 (after Universal Declaration of Human Rights)','1955 (after Korean War)'],
ans:1,
explain:'UN founded October 1945 (San Francisco Charter signed June 1945). Replaced League of Nations (founded 1919, failed — USA never joined, USSR expelled, couldn\'t prevent WWII). P5 (USA, USSR, UK, France, China) = UNSC permanent members with veto.',
wrongExplain:'League of Nations\' failure: USA Senate refused to ratify (Wilson\'s own country rejected it). USSR expelled (1939 after attacking Finland). Japan, Germany, Italy all left. Without great powers, it was toothless.'},

{id:'gc_wh_024',subject:'World History',node:'h4',difficulty:'hard',year:2023,topic:'Post-WWII',
q:'The Marshall Plan (1948-1952) was significant because:',
opts:['It established NATO military alliance','USA provided $13 billion to rebuild Western Europe — preventing communist parties from gaining power in economically devastated nations + creating new markets for US goods','It created the World Bank and IMF','It was economic aid to Japan only'],
ans:1,
explain:'Marshall Plan (European Recovery Program): $13 billion (1948-52) to rebuild Western European economies. Strategic: Communist parties were gaining in France and Italy due to post-war poverty. Recovery prevented their electoral success. Also rebuilt Germany as partner.',
wrongExplain:'Soviet Union refused Marshall Plan (and forced Eastern Bloc to refuse). Created two economic spheres. Germany: West Germany (US/UK/France zone) became democratic, East Germany (Soviet zone) became communist. Division lasted until 1990.'},

{id:'gc_wh_025',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Bretton Woods',
q:'The Bretton Woods Conference (1944) established:',
opts:['The United Nations','IMF and World Bank — with US dollar as global reserve currency (pegged to gold at $35/ounce) — created the post-WWII international economic order','NATO military alliance','The European Union'],
ans:1,
explain:'Bretton Woods (July 1944, New Hampshire, USA): 44 Allied nations. Created IMF (international monetary stability), World Bank (IBRD = reconstruction loans), and dollar-gold standard. Keynes represented UK, Harry Dexter White represented USA.',
wrongExplain:'Bretton Woods system collapsed in 1971 when Nixon took USA off gold standard (Nixon Shock). Today: floating exchange rates. IMF and World Bank continue but in modified form. Dollar remains dominant global reserve currency even without gold peg.'},

// ── Asian Decolonization ──
{id:'gc_wh_026',subject:'World History',node:'h4',difficulty:'medium',year:2020,topic:'Asian History',
q:'The Long March (1934-35) in China refers to:',
opts:['Ancient Silk Road trade route','Strategic retreat of Communist Party of China led by Mao Zedong — 9,000 km march from Jiangxi to Shaanxi to escape Nationalist (Kuomintang) encirclement — cemented Mao\'s leadership','Japanese invasion of China','Cultural Revolution movement'],
ans:1,
explain:'Long March (October 1934 – October 1935): 100,000 soldiers began, 7,000-8,000 survived. 9,000 km through mountain and swamp. Established Mao Zedong\'s leadership of CCP. Became founding myth of People\'s Republic of China (1949).',
wrongExplain:'After Long March: CCP survived in Yan\'an (Shaanxi). Japanese invasion (1937) forced Nationalist-Communist truce. After WWII, civil war resumed → CCP won → PRC established October 1, 1949. Chiang Kai-shek fled to Taiwan.'},

{id:'gc_wh_027',subject:'World History',node:'h4',difficulty:'hard',year:2022,topic:'Asian History',
q:'The Meiji Restoration (1868) in Japan led to:',
opts:['Japan becoming a European colony','Japan\'s rapid modernization — ended feudal shogunate, restored Emperor Meiji, adopted Western technology/institutions while retaining Japanese culture — within 40 years Japan defeated Russia (1905) and colonized Korea','Japan joining British Empire voluntarily','A communist revolution in Japan'],
ans:1,
explain:'Meiji Restoration (1868): Overthrew Tokugawa shogunate. "Fukoku Kyohei" (Rich Country, Strong Army). Adopted: Western constitutional government, railways, universal education, modern army/navy. 1905: Japan defeated Russia (first Asian nation to defeat European power in modern era).',
wrongExplain:'Meiji Japan = template for "catching up" with the West through selective modernization while preserving national identity. Influenced later Asian modernizations (South Korea, Taiwan, Singapore). But also led to militarism and WWII.'},

{id:'gc_wh_028',subject:'World History',node:'h4',difficulty:'medium',year:2019,topic:'Asian History',
q:'The Korean War (1950-53) ended with:',
opts:['USA winning decisively and unifying Korea','Armistice (July 1953) at approximately 38th parallel — Korea remains divided today (North Korea: Kim dynasty communist state; South Korea: democratic)','China winning and absorbing Korea','Complete US withdrawal from Asia'],
ans:1,
explain:'Korean War: North Korea (Soviet/Chinese backed) invaded South Korea → USA (UN mandate) intervened → China entered when USA approached Chinese border → stalemate near 38th parallel → Armistice 1953. 36,000 US deaths, 3+ million total.',
wrongExplain:'Korea = "Forgotten War" between WWII (celebrated) and Vietnam (debated). North Korea today: nuclear weapons, Kim Jong-un. South Korea: vibrant democracy, major economy (Samsung, Hyundai). The armistice has no peace treaty — technically still at war.'},

{id:'gc_wh_029',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Vietnam War',
q:'The Vietnam War ended in 1975 with:',
opts:['USA military victory and South Vietnam preserved','North Vietnam\'s communist forces capturing Saigon (April 30, 1975) — unifying Vietnam under communist rule, disproving US "domino theory" effectiveness through military intervention','Negotiated partition of Vietnam','UN peacekeeping ending the war'],
ans:1,
explain:'Vietnam War (US involvement 1965-1973, final fall of Saigon 1975): Ho Chi Minh\'s North Vietnam + Viet Cong defeated USA-backed South Vietnam. 58,000 US deaths, 3 million Vietnamese. First war USA lost. Led to "Vietnam Syndrome" (reluctance to commit troops abroad).',
wrongExplain:'Lessons: Guerrilla warfare defeats conventional armies with superior technology if local population supports insurgents. "Hearts and minds" matter. Napalm, Agent Orange, My Lai massacre = moral questions. Pentagon Papers revealed systematic US government deception.'},

// ── International Institutions ──
{id:'gc_wh_030',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'International Law',
q:'The Universal Declaration of Human Rights (1948) was significant because:',
opts:['It was a binding international treaty','First global articulation of rights all humans have regardless of nationality — 30 articles covering civil, political, economic, social, and cultural rights. Non-binding but foundational for all subsequent human rights law.','It only applied to post-WWII refugees','It replaced national constitutions globally'],
ans:1,
explain:'UDHR (December 10, 1948 — now Human Rights Day): 48 states voted in favour, 8 abstained (Soviet bloc, South Africa, Saudi Arabia). Eleanor Roosevelt chaired drafting committee. Non-binding declaration but inspired 70+ years of human rights treaties.',
wrongExplain:'UDHR → ICCPR (civil/political rights, 1966) + ICESCR (economic/social/cultural rights, 1966) = binding treaties. These form International Bill of Human Rights. India ratified both (with reservations on some articles).'},

{id:'gc_wh_031',subject:'World History',node:'h4',difficulty:'hard',year:2023,topic:'Post-Cold War',
q:'The dissolution of the Soviet Union in 1991 occurred because of:',
opts:['US military invasion','Internal factors: economic stagnation, nationalism in Soviet republics, Gorbachev\'s reforms (Glasnost + Perestroika) opening political space that unraveled centralized control, Chernobyl exposing system failures','Nuclear accident alone causing collapse','German reunification causing Soviet withdrawal'],
ans:1,
explain:'Soviet collapse: Economic stagnation (oil price fall), failed Afghanistan war, Chernobyl (1986) exposed systemic incompetence, Glasnost (political openness) allowed criticism of system, Perestroika (economic restructuring) failed, Baltic states declared independence, August 1991 coup failed → USSR formally dissolved December 25, 1991.',
wrongExplain:'15 new nations emerged from USSR: Russia, Ukraine, Belarus, 3 Baltic states, 5 Central Asian states, 3 Caucasus states, Moldova. Many became independent for first time. Cold War ended but created new geopolitical challenges (NATO expansion, Russian resentment).'},

{id:'gc_wh_032',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Globalization',
q:'The World Trade Organization (WTO) was established in:',
opts:['1947 (GATT year)','1995 — replacing GATT (General Agreement on Tariffs and Trade, 1947). WTO has binding dispute settlement mechanism, unlike GATT.','1991 after Soviet collapse','2001 after China\'s WTO accession'],
ans:1,
explain:'WTO (January 1, 1995): Replaced GATT (1947). Key difference: GATT = contract among nations, no formal dispute settlement. WTO = permanent institution with binding dispute settlement mechanism (DSM). 164 member nations (as of 2024).',
wrongExplain:'Uruguay Round (1986-1994) = negotiations that created WTO. Added: services (GATS), intellectual property (TRIPS), agriculture. India is a founding member. WTO\'s DSM crisis: USA blocked Appellate Body appointments since 2017.'},

{id:'gc_wh_033',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'Africa',
q:'The apartheid system in South Africa officially ended in:',
opts:['1976 (after Soweto uprising)','1990-1994 — Nelson Mandela released February 1990, first non-racial elections April 1994, Mandela became President. Apartheid laws repealed gradually 1990-1993.','1948 (when it began)','1980 (after Rhodesia became Zimbabwe)'],
ans:1,
explain:'Apartheid (1948-1994): System of racial segregation in South Africa. De Klerk (President) released Mandela (February 1990), unbanned ANC. Negotiations → democratic elections April 26-29, 1994. Mandela won → Truth and Reconciliation Commission (Archbishop Tutu).',
wrongExplain:'ANC (African National Congress, founded 1912) = liberation movement. Sharpeville Massacre (1960): police killed 69 protesters → ANC banned. Soweto Uprising (1976): student protests against Afrikaans as medium of instruction. International sanctions (1985) accelerated end.'},

{id:'gc_wh_034',subject:'World History',node:'h4',difficulty:'hard',year:2020,topic:'Latin America',
q:'The Cuban Revolution (1959) was led by:',
opts:['USA-backed forces overthrew Batista','Fidel Castro and Che Guevara overthrew US-backed dictator Batista — established communist state 90 miles from USA — led to Bay of Pigs, Cuban Missile Crisis, and decades of US embargo','Soviet Union military intervention','CIA operation installing Castro'],
ans:1,
explain:'Cuban Revolution (January 1, 1959): Castro\'s guerrillas defeated Batista regime. Cuba became communist state. USA: Bay of Pigs invasion (1961, failed) → Cuban Missile Crisis (1962) → economic embargo (still partially in place). Che Guevara = global revolutionary icon.',
wrongExplain:'Cuba\'s revolution influenced Latin American leftist movements for decades. Che Guevara tried (and died) trying to replicate it in Congo and Bolivia. The US embargo (since 1962) = world\'s longest economic blockade.'},

{id:'gc_wh_035',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Middle East',
q:'The creation of Israel (1948) and the Palestinian issue originated with:',
opts:['A UN-mandated peaceful partition accepted by all parties','British Mandate over Palestine ending → Israel declared independence (May 14, 1948) → Arab-Israeli War (5 Arab states attacked) → 700,000+ Palestinians displaced (Nakba = "Catastrophe")','A peaceful population exchange agreed upon by all sides','Ottoman Empire directly creating Israel'],
ans:1,
explain:'1947: UN Resolution 181 proposed partition of Palestine into Jewish and Arab states. Jews accepted. Arabs rejected. Israel declared independence 1948 → attacked by Egypt, Jordan, Syria, Iraq, Lebanon → Israel won + expanded territory. Palestinian Nakba = 700,000+ refugees.',
wrongExplain:'The Palestinian issue has roots in: Balfour Declaration (1917, British promised Jewish homeland in Palestine), British Mandate (1920-1948), Holocaust (intensified Jewish immigration), partition rejection by Arabs. Unresolved since 1948.'},

{id:'gc_wh_036',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'Post-Cold War',
q:'The Rwandan Genocide (1994) resulted in:',
opts:['A successful UN intervention that stopped the killing','800,000-1 million Tutsi and moderate Hutu killed in 100 days by Hutu extremists while international community failed to intervene — "never again" pledge after Holocaust was broken','Civil war with no ethnic dimension','French military intervention that stopped the genocide'],
ans:1,
explain:'Rwandan Genocide (April-July 1994): Hutu extremists systematically killed 800,000-1 million Tutsi and moderate Hutu in 100 days. UN (General Dallaire) had troops there — asked for permission to intervene, was refused. USA, France avoided calling it "genocide" to avoid legal obligation to act.',
wrongExplain:'Rwanda forced reform of "Responsibility to Protect" (R2P) doctrine — eventually codified at 2005 UN World Summit. But R2P has been selectively applied. Rwanda today: fastest-growing African economy, near-gender-equal parliament. Justice through Gacaca courts.'},

{id:'gc_wh_037',subject:'World History',node:'h4',difficulty:'hard',year:2023,topic:'Modern History',
q:'The September 11, 2001 attacks led directly to:',
opts:['Only the Afghanistan War','USA\'s "War on Terror" — Afghanistan invasion 2001 (removing Taliban/Al-Qaeda) + Iraq War 2003 (false WMD claims) — reshaped global security architecture, PATRIOT Act, mass surveillance, drone warfare, Guantanamo Bay','Only economic consequences','A UN multilateral response accepted by all nations'],
ans:1,
explain:'9/11 (September 11, 2001): Al-Qaeda (Osama bin Laden) flew planes into Twin Towers + Pentagon. ~3,000 killed. USA invoked NATO Article 5 (collective defence) for first time. Afghan War (2001-2021) → Iraq War (2003-2011, based on false WMD intelligence).',
wrongExplain:'9/11 consequences: 20-year Afghan War (ended with Taliban retaking power 2021), 1 million+ deaths in Iraq/Afghan wars, rise of surveillance state, Islamophobia, ISIS emergence from power vacuum. US national security apparatus fundamentally transformed.'},

{id:'gc_wh_038',subject:'World History',node:'h4',difficulty:'medium',year:2021,topic:'Economic History',
q:'The Great Depression (1929-1939) was triggered by:',
opts:['World War I ending','Wall Street Crash (October 1929) → banking collapse → global trade collapse. Smoot-Hawley tariffs worsened it by triggering trade wars. 25% US unemployment. Fascism rose in response.','Second World War starting','Soviet collectivization crisis spreading'],
ans:1,
explain:'Great Depression: Black Thursday (October 24, 1929) stock market crash. US banks collapsed → credit froze → world trade collapsed 65%. Smoot-Hawley Tariff Act (1930) → trade wars → deeper depression. Keynes: government must stimulate aggregate demand (New Deal, FDR).',
wrongExplain:'Great Depression\'s political consequences: Hitler rose to power in Germany (1933) exploiting economic despair. FDR\'s New Deal = Keynesian response. Bretton Woods (1944) designed to prevent recurrence. The Depression ended only with WWII military spending.'},

{id:'gc_wh_039',subject:'World History',node:'h4',difficulty:'medium',year:2022,topic:'Modern World',
q:'The Arab Spring (2010-2012) refers to:',
opts:['An agricultural initiative in the Middle East','Wave of pro-democracy protests across Arab world beginning in Tunisia (December 2010) — toppled leaders in Tunisia, Egypt, Libya, Yemen; led to civil war in Syria; exposed tensions between democracy and stability','A military alliance of Arab nations','Israeli-Palestinian peace negotiations'],
ans:1,
explain:'Arab Spring: Mohamed Bouazizi\'s self-immolation (Tunisia, December 2010) sparked protests. Regimes fell: Ben Ali (Tunisia), Mubarak (Egypt), Gaddafi (Libya, NATO intervention), Saleh (Yemen). Syria → civil war (500,000+ dead, 6+ million refugees). Mixed outcomes.',
wrongExplain:'Arab Spring aftermath: Tunisia (only democratic success, then backslid 2021). Egypt: military coup (Al-Sisi). Libya: failed state. Yemen: ongoing civil war. Syria: Assad survived with Russian/Iranian support. Shows difficulty of democratic transitions.'},

{id:'gc_wh_040',subject:'World History',node:'h4',difficulty:'hard',year:2023,topic:'Contemporary',
q:'The Russia-Ukraine War (2022-present) has its roots in:',
opts:['A trade dispute between Russia and Ukraine','Multiple factors: NATO expansion eastward (Russia\'s red line), Crimea annexation (2014), Donbas conflict (2014), Ukraine\'s desire for EU/NATO membership, Minsk agreements failing, February 24, 2022 — Russia\'s full-scale invasion'],
ans:1,
explain:'Russia-Ukraine conflict: USSR dissolution (1991) → Ukraine independent. NATO expanded to former Warsaw Pact nations (Poland, Czech Republic, Baltic states). Russia saw this as existential threat. 2014: Maidan protests → Yanukovych fled → Russia annexed Crimea → Donbas war began → Minsk I, II agreements → failed → 2022 full invasion.',
wrongExplain:'Consequences: European energy crisis, global food price surge (Ukraine = "breadbasket of Europe"), NATO revitalization, Finland/Sweden joining NATO, global arms rethinking, India\'s neutral stance, UNSC paralysis (Russia has veto). Fundamental challenge to post-1945 rules-based order.'},
];

// Auto-merge when loaded
if (typeof QUESTION_BANK !== 'undefined') {
  QUESTION_BANK.push(...QUESTION_BANK_GS1);
}
