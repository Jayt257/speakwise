/**
 * LearnWise — English → Gujarati · Month 1
 * "Sound Foundation & Survival Basics"
 * Auto-populates LWContent on load (does NOT overwrite existing admin edits).
 *
 * Activity IDs (monthIdx=0, starts at 1):
 * Week 1 : lesson=1  vocab=2  reading=3  pron=4  writing=5  listening=6  test=7  speaking=8  vocab_review=9  pron2=10
 * Week 2 : lesson=11 vocab=12 reading=13 pron=14 writing=15 listening=16 test=17 speaking=18 reading_ext=19 pron2=20 mid_test=21
 * Week 3 : lesson=22 vocab=23 reading=24 pron=25 writing=26 listening=27 test=28 speaking=29 vocab_review=30 pron2=31
 * Week 4 : lesson=32 vocab=33 reading=34 pron=35 writing=36 listening=37 test=38 speaking=39 reading_ext=40 pron2=41 mid_test=42
 * Milestone : 43
 */

window.LW_LANG_PAIR = {
  fromId: 'english', fromName: 'English', fromFlag: '🇬🇧',
  toId: 'gujarati',  toName: 'Gujarati', toNative: 'ગુજરાતી', toFlag: '🇮🇳',
};

(function populateEngujMonth1() {
  const populate = () => {
    if (!window.LWContent) { setTimeout(populate, 60); return; }

    const ACTIVITIES = {

      /* ════════════════════════════════════════════════════════
         WEEK 1 — "Gujarati Script & Vowels"
      ════════════════════════════════════════════════════════ */

      // ── LESSON ──────────────────────────────────────────────
      1: {
        title: 'Gujarati Script & Vowels',
        description: 'Discover the beautiful Gujarati script and master all 13 vowels with sounds and examples.',
        duration: '20 min', xp: 30, langPair: 'en-gu', week: 1,
        blocks: [
          {
            id:'b1', type:'text', title:'Welcome to Gujarati! ગુજરાતીમાં સ્વાગત!',
            body:'Gujarati (ગુજરાતી) is an Indo-Aryan language spoken by over 60 million people, primarily in the state of Gujarat, India. It has its own unique script — a beautiful cursive writing system descended from the ancient Devanagari script.\n\nGood news: The script is very regular — once you learn the letters, you can read anything!'
          },
          {
            id:'b2', type:'keypoints', title:'What You\'ll Learn This Week',
            points:[
              'The 13 Gujarati vowels (સ્વર) and their sounds',
              'How vowels attach to consonants as diacritics',
              'Basic greeting words using only vowels',
              'Your first 25 essential Gujarati vocabulary words',
            ]
          },
          {
            id:'b3', type:'text', title:'The 13 Vowels — સ્વર (Svar)',
            body:'Gujarati has 13 independent vowels. Each vowel has a standalone form used at the start of words, and a diacritic form attached to consonants.\n\nઅ (a) — short "a" like in "about"\nઆ (aa) — long "aa" like in "father"\nઇ (i) — short "i" like in "bit"\nઈ (ee) — long "ee" like in "feet"\nઉ (u) — short "u" like in "put"\nઊ (oo) — long "oo" like in "food"\nઋ (ri) — trilled "r" + "i"\nએ (e) — "e" like in "café"\nઐ (ai) — like "ai" in "aisle"\nઓ (o) — "o" like in "go"\nઔ (au) — "ou" like in "out"\nઅં (am) — nasal "an" sound\nઅઃ (ah) — aspirated "ah" sound'
          },
          {
            id:'b4', type:'vocab_table', title:'Vowel Starter Words',
            words:[
              { word:'અ', meaning:'(vowel) short a-sound', example:'અ is the first letter of the Gujarati alphabet' },
              { word:'આ (Aa)', meaning:'This / Come', example:'આ ઘર છે  — "This is a house"' },
              { word:'ઓ (O)', meaning:'Oh! / Hey', example:'ઓ ભાઈ! — "Hey brother!"' },
              { word:'ઉ (u)', meaning:'Up, upward', example:'ઉ ઉઠો — "Get up"' },
            ]
          },
          {
            id:'b5', type:'text', title:'Vowel Marks — માત્રા (Maatra)',
            body:'When a vowel follows a consonant, it is written as a small mark (maatra) rather than the full letter.\n\nExample with the consonant ક (ka):\nક + આ = કા (kaa)\nક + ઇ = કિ (ki)\nક + ઈ = કી (kee)\nક + ઉ = કુ (ku)\nક + ઊ = કૂ (koo)\nક + એ = કે (ke)\nક + ઓ = કો (ko)\n\nThis is how most Gujarati words are built!'
          },
          {
            id:'b6', type:'tip',
            body:'💡 Pro Tip: Every consonant in Gujarati has an inherent "a" sound. So ક alone is "ka", not just "k". To remove the vowel, a special sign called viraam (્) is used at the end.'
          },
          {
            id:'b7', type:'keypoints', title:'Reading Practice — Try These Words!',
            points:[
              'આ (aa) — This',
              'ઉ (u) — Up',
              'એ (e) — That',
              'ઓ (o) — Hey! / Oh!',
              'આઉ (aa-u) — Come (informal)',
              'ઉઠ (uth) — Stand up',
              'આઈ (aa-ee) — Came (mother in some dialects)',
            ]
          },
        ]
      },

      // ── VOCABULARY ──────────────────────────────────────────
      2: {
        title: 'Essential Greetings & Basics',
        description: 'Your first 25 Gujarati words — greetings, basics, and must-know everyday expressions.',
        duration: '12 min', xp: 20, langPair: 'en-gu', week: 1,
        blocks: [{
          id:'v1', type:'vocab_table', title:'Week 1 Vocabulary — 25 Words',
          words:[
            { word:'નમસ્તે', meaning:'Hello / Goodbye', example:'નમસ્તે, કેમ છો? — Hello, how are you?' },
            { word:'આભાર', meaning:'Thank you', example:'ખૂબ ખૂબ આભાર — Thank you very much' },
            { word:'ક્ષમા', meaning:'Sorry / Excuse me', example:'ક્ષમા કરો — Please forgive me / Excuse me' },
            { word:'હા', meaning:'Yes', example:'હા, હું ગુજરાતી શીખું છું — Yes, I am learning Gujarati' },
            { word:'ના', meaning:'No', example:'ના, ધન્યવાદ — No, thank you' },
            { word:'ઠીક', meaning:'OK / Fine / Alright', example:'ઠીક છે — That\'s OK / It\'s fine' },
            { word:'સારું', meaning:'Good / Well', example:'સારું, ચાલો — Good, let\'s go' },
            { word:'કૃપા', meaning:'Please / Kindness', example:'કૃપા કરીને — Please (formal)' },
            { word:'હું', meaning:'I / Me', example:'હું ભારતીય છું — I am Indian' },
            { word:'તમે', meaning:'You (formal/plural)', example:'તમે ક્યાં છો? — Where are you?' },
            { word:'તે', meaning:'He / She / It / That', example:'તે મારો મિત્ર છે — He/She is my friend' },
            { word:'આ', meaning:'This / These', example:'આ શું છે? — What is this?' },
            { word:'ઘર', meaning:'Home / House', example:'મારું ઘર ગુજરાતમાં છે — My home is in Gujarat' },
            { word:'નામ', meaning:'Name', example:'તમારું નામ શું છે? — What is your name?' },
            { word:'ભાષા', meaning:'Language', example:'ગુજરાતી ભાષા સુંદર છે — Gujarati language is beautiful' },
            { word:'શીખવું', meaning:'To learn', example:'હું ગુજરાતી શીખું છું — I am learning Gujarati' },
            { word:'બોલવું', meaning:'To speak', example:'શું તમે ગુજરાતી બોલો? — Do you speak Gujarati?' },
            { word:'સમજવું', meaning:'To understand', example:'મને સમજ પડ્યું — I understood' },
            { word:'ફરી', meaning:'Again / Once more', example:'ફરી કહો — Say it again' },
            { word:'ધીમો', meaning:'Slowly', example:'ધીમો બોલો — Speak slowly' },
            { word:'ઝડપ', meaning:'Fast / Speed', example:'ઝડપથી ન બોલો — Don\'t speak fast' },
            { word:'મદદ', meaning:'Help', example:'મને મદદ કરો — Help me' },
            { word:'ખૂબ', meaning:'Very / A lot', example:'ખૂબ સારું — Very good' },
            { word:'થોડું', meaning:'A little', example:'થોડું ગુજરાતી — A little Gujarati' },
            { word:'કૃપા કરીને', meaning:'Please (polite)', example:'કૃપા કરીને ધીમો બોલો — Please speak slowly' },
          ]
        }]
      },

      // ── READING ─────────────────────────────────────────────
      3: {
        title: 'My First Gujarati Conversation',
        description: 'Read a simple dialogue between two people meeting for the first time in Gujarati.',
        duration: '12 min', xp: 25, langPair: 'en-gu', week: 1,
        blocks: [{
          id:'r1', type:'reading',
          passage: `📖 DIALOGUE — પ્રથમ મુલાકાત (First Meeting)

રાહુલ:  નમસ્તે! (Namaste!)
        Hello!

સ્નેહા:  નમસ્તે! કેમ છો? (Namaste! Kem chho?)
        Hello! How are you?

રાહુલ:  હું સારો છું, આભાર. તમે? (Hun saaro chhun, aabhaar. Tame?)
        I am fine, thank you. And you?

સ્નેહા:  હું પણ સારી છું. તમારું નામ શું છે? (Hun pan saari chhun. Tamaarun naam shun chhe?)
        I am also fine. What is your name?

રાહુલ:  મારું નામ રાહુલ છે. (Maarun naam Rahul chhe.)
        My name is Rahul.

સ્નેહા:  ખૂબ સારું! હું સ્નેહા છું. (Khoob saaru! Hun Sneha chhun.)
        Very nice! I am Sneha.

રાહુલ:  ક્યાંથી છો? (Kyaanthi chho?)
        Where are you from?

સ્નેહા:  હું અમદાવાદથી છું. (Hun Amdavaadthi chhun.)
        I am from Ahmedabad.

રાહુલ:  ઓહ! ગુજરાત ખૂબ સુંદર છે. (Oh! Gujarat khoob sundar chhe.)
        Oh! Gujarat is very beautiful.

સ્નેહા:  હા, ખૂબ! ફરી મળીશું. (Haa, khoob! Fari malishun.)
        Yes, very! See you again.`,
          questions: [
            { q: 'How did Sneha respond when asked how she was?', a: 'She said "I am also fine" (હું પણ સારી છું)' },
            { q: 'Where is Sneha from?', a: 'Ahmedabad (અમદાવાદ)' },
            { q: 'What does "ખૂબ સારું" mean?', a: 'Very nice / Very good' },
            { q: 'How do you say "What is your name?" in Gujarati?', a: 'તમારું નામ શું છે? (Tamaarun naam shun chhe?)' },
          ]
        }]
      },

      // ── PRONUNCIATION ───────────────────────────────────────
      4: {
        title: 'Gujarati Vowel Sounds',
        description: 'Practice all 13 Gujarati vowels with correct mouth positions, IPA notation, and sample words.',
        duration: '10 min', xp: 30, langPair: 'en-gu', week: 1,
        blocks: [
          { id:'p1', type:'keypoints', title:'Vowels to Practice (tap each to practice)',
            points:[
              'અ (a) — like "u" in "cup" · Example: અહીં (ahee) = Here',
              'આ (aa) — like "a" in "father" · Example: આવો (aavo) = Come',
              'ઇ (i) — like "i" in "bit" · Example: ઇચ્છા (ichchhaa) = Wish',
              'ઈ (ee) — like "ee" in "feet" · Example: ઈંટ (eent) = Brick',
              'ઉ (u) — like "u" in "put" · Example: ઉઠો (utho) = Get up',
              'ઊ (oo) — like "oo" in "food" · Example: ઊન (oon) = Wool',
              'એ (e) — like "e" in "café" · Example: એક (ek) = One',
              'ઐ (ai) — like "ai" in "aisle" · Example: ઐતિહ (aitih) = Historical',
              'ઓ (o) — like "o" in "note" · Example: ઓઢ (odh) = Cover',
              'ઔ (au) — like "ou" in "out" · Example: ઔષધ (aushadh) = Medicine',
              'અં (am) — nasal "an" · Example: અંગ (ang) = Body/limb',
              'અઃ (ah) — aspirated "ah" · Example: (used in Sanskrit loanwords)',
              'ઋ (ri) — "ri" with tongue-roll · Example: ઋષિ (rishi) = Sage',
            ]
          },
          { id:'p2', type:'tip', body:'🎯 Focus on the contrast between short and long vowels: અ vs આ, ઇ vs ઈ, ઉ vs ઊ. The length difference is meaningful in Gujarati — it can change the meaning of a word!' }
        ]
      },

      // ── WRITING ─────────────────────────────────────────────
      5: {
        title: 'Introduce Yourself in Gujarati',
        description: 'Write a short self-introduction using the greetings and phrases you have learned.',
        duration: '15 min', xp: 35, langPair: 'en-gu', week: 1,
        blocks: [
          { id:'w1', type:'text', title:'How to Introduce Yourself',
            body:'A basic Gujarati self-introduction follows this pattern:\n\n1. Greeting: નમસ્તે! (Namaste!)\n2. Name: મારું નામ ___ છે. (My name is ___)\n3. Origin: હું ___ થી છું. (I am from ___)\n4. Occupation: હું ___ છું. (I am a ___)\n5. Learning: હું ગુજરાતી શીખું છું. (I am learning Gujarati)\n6. Closing: ખૂબ ખૂબ આભાર! (Thank you very much!)'
          },
          { id:'w2', type:'tip', body:'💡 In Gujarati, adjectives change form based on gender. "Good" for a male speaker is "સારો" but for a female speaker it is "સારી". Don\'t worry too much about this now — just use "ઠીક" (theek) when unsure!' },
          { id:'w3', type:'writing', prompt:'Write a short introduction about yourself in Gujarati (or a mix of Gujarati and transliteration). Include: your name, where you are from, why you are learning Gujarati, and one thing you like about the language.', minWords: 30,
            sampleAnswer:'નમસ્તે! (Namaste!)\n\nMaaru naam Alex chhe. (My name is Alex.) I am from New York, USA.\n\nHun Gujarati shikh chhun because my friends are from Gujarat and I want to talk to them in their language.\n\nGujarat ni bhasha khub sundar lage chhe — the script looks beautiful and the people are very warm.\n\nKhub aabhaar! 🙏' }
        ]
      },

      // ── SPEAKING ────────────────────────────────────────────
      8: {
        title: 'Greetings & First Conversations',
        description: 'Practice real-world greetings with 3 speaking scenarios — meeting someone for the first time.',
        duration: '12 min', xp: 35, langPair: 'en-gu', week: 1,
        blocks: [
          { id:'sp1', type:'speaking', prompt:'You are at a Gujarati cultural event and meet someone new. Greet them, ask their name, and say where you are from.',
            hints:['નમસ્તે! (Hello!)', 'તમારું નામ શું છે? (What\'s your name?)', 'હું ___ થી છું (I am from ___)','મને ગુજરાત ગમે છે (I like Gujarat)'] },
          { id:'sp2', type:'speaking', prompt:'Your Gujarati friend asks how you are feeling today. Respond using what you know, and ask how they are too.',
            hints:['કેમ છો? (How are you?)', 'હું સારો/સારી છું (I am good)', 'આભાર, તમે? (Thank you, and you?)', 'ઠીક છે (I\'m OK)'] },
          { id:'sp3', type:'speaking', prompt:'You didn\'t understand something your Gujarati tutor said. Politely ask them to repeat it slowly.',
            hints:['ક્ષમા કરો (Excuse me)', 'ફરી કહો (Say again)', 'ધીમો બોલો (Speak slowly)', 'હું સમજ્યો/સમજી નહીં (I didn\'t understand)'] },
        ]
      },

      // ── QUICK TEST ──────────────────────────────────────────
      7: {
        title: 'Week 1 Quiz — Script & Greetings',
        description: 'Test your knowledge of Gujarati vowels, basic greetings and essential phrases.',
        duration: '8 min', xp: 50, langPair: 'en-gu', week: 1,
        blocks: [
          { id:'q1', type:'quiz', question:'What does "નમસ્તે" (Namaste) mean?',
            options:['Goodbye only','Thank you','Hello/Goodbye','Sorry'], correct:2, explanation:'"Namaste" (નમસ્તે) is used for both hello and goodbye in Gujarati, just like Namaste in Hindi.' },
          { id:'q2', type:'quiz', question:'Which Gujarati word means "Thank you"?',
            options:['ઠીક','આભાર','ક્ષમા','ફરી'], correct:1, explanation:'"આભાર" (Aabhaar) means Thank you. "ઠીક" means OK, "ક્ષમા" means Sorry, and "ફરી" means Again.' },
          { id:'q3', type:'quiz', question:'How many vowels (સ્વર) does Gujarati have?',
            options:['10','11','13','16'], correct:2, explanation:'Gujarati has 13 independent vowels: અ, આ, ઇ, ઈ, ઉ, ઊ, ઋ, એ, ઐ, ઓ, ઔ, અં, and અઃ.' },
          { id:'q4', type:'quiz', question:'What does "ધીમો" mean?',
            options:['Fast','Slowly','Again','Please'], correct:1, explanation:'"ધીમો" means slowly. You would say "ધીમો બોલો" (dhimo bolo) meaning "speak slowly".' },
          { id:'q5', type:'quiz', question:'"હું ગુજરાતી શીખું છું" means:',
            options:['I speak Gujarati','I like Gujarati','I am learning Gujarati','I understand Gujarati'], correct:2, explanation:'"શીખું છું" (shikhun chhun) means "am learning". "હું" means "I", so the sentence = "I am learning Gujarati".' },
          { id:'q6', type:'quiz', question:'Which vowel sounds like "aa" in "father"?',
            options:['અ (a)','ઇ (i)','આ (aa)','ઉ (u)'], correct:2, explanation:'"આ" (aa) is the long "a" sound, like the "a" in "father". "અ" is the shorter "a" sound like in "about".' },
          { id:'q7', type:'quiz', question:'How do you ask "What is your name?" in Gujarati?',
            options:['તમે ક્યાં છો?','તમારું નામ શું છે?','કેમ છો?','ક્યાંથી છો?'], correct:1, explanation:'"તમારું નામ શું છે?" (Tamaarun naam shun chhe?) directly translates to "Your name what is?" — standard word order in Gujarati.' },
          { id:'q8', type:'quiz', question:'What does the word "ઘર" mean?',
            options:['City','Language','House/Home','Friend'], correct:2, explanation:'"ઘર" (ghar) means house or home. Example: "મારું ઘર ગુજરાતમાં છે" — My home is in Gujarat.' },
          { id:'q9', type:'quiz', question:'"ખૂબ" most closely means:',
            options:['Little','Slowly','Very / A lot','OK'], correct:2, explanation:'"ખૂબ" (khoob) means "very" or "a lot". "ખૂબ સારું" = "Very good", "ખૂબ ખૂબ આભાર" = "Thank you very much".' },
          { id:'q10', type:'quiz', question:'In Gujarati vowel marks attached to consonants are called:',
            options:['Svar','Maatra','Viraam','Vyanjan'], correct:1, explanation:'Vowel marks (diacritics) attached to consonants in Gujarati are called "Maatra" (માત્રા). The standalone vowels are called "Svar" (સ્વર).' },
        ]
      },

      // ── VOCAB REVIEW ────────────────────────────────────────
      9: {
        title: 'Vocabulary Review + Tone & Politeness',
        description: 'Reinforce Week 1 words and learn the formal/informal distinction in Gujarati.',
        duration: '8 min', xp: 20, langPair: 'en-gu', week: 1,
        blocks: [
          { id:'vr1', type:'tip', body:'🌟 Gujarati has two forms of "you": તમે (tame) is formal/respectful, and તું (tun) is informal (for close friends, children). Always use "તમે" with strangers and elders!' },
          { id:'vr2', type:'vocab_table', title:'Formal vs Informal',
            words:[
              { word:'તમે (formal)', meaning:'You (respectful)', example:'તમે ક્યાં જાઓ છો? — Where are you going? (to a stranger/elder)' },
              { word:'તું (informal)', meaning:'You (casual)', example:'તું ક્યાં જાય છે? — Where are you going? (to a close friend)' },
              { word:'આપ (very formal)', meaning:'You (highly respectful)', example:'આપ કેમ છો? — How are you? (to an elderly person)' },
              { word:'ભાઈ', meaning:'Brother (also used as "buddy")', example:'ભાઈ, ક્ષમા! — Hey, sorry!' },
              { word:'બેન/બહેન', meaning:'Sister (used to address women)', example:'બેન, આ ક્યાં મળે? — Sister, where is this available?' },
              { word:'સાહેબ', meaning:'Sir / Mr.', example:'સાહેબ, મને મદદ કરો — Sir, please help me' },
            ]
          }
        ]
      },

      /* ════════════════════════════════════════════════════════
         WEEK 2 — "Consonants & Daily Essentials"
      ════════════════════════════════════════════════════════ */

      11: {
        title: 'Gujarati Consonants — First Set',
        description: 'Learn the first 16 Gujarati consonants (ક to ડ group) with pronunciation guides and example words.',
        duration: '20 min', xp: 30, langPair: 'en-gu', week: 2,
        blocks: [
          { id:'l2b1', type:'text', title:'The Gujarati Consonant System — વ્યંજન (Vyanjan)',
            body:'Gujarati has 33 consonants organized in groups by where in the mouth they are produced. This is a scientific system — once you understand it, pronunciation becomes logical!\n\nGroup 1 — Velar (throat sounds): ક ખ ગ ઘ\nGroup 2 — Palatal (mid-palate): ચ છ જ ઝ\nGroup 3 — Retroflex (tongue-curled): ટ ઠ ડ ઢ\nGroup 4 — Dental (teeth): ત થ દ ધ\nGroup 5 — Labial (lips): પ ફ બ ભ'
          },
          { id:'l2b2', type:'keypoints', title:'Velar Group: ક ખ ગ ઘ',
            points:[
              'ક (ka) — like "k" in "kite" · Example: કૂ-ક (kook) = cuckoo',
              'ખ (kha) — aspirated "kh" like "k" with breath · Example: ખાવું (khaavun) = to eat',
              'ગ (ga) — like "g" in "go" · Example: ગામ (gaam) = village',
              'ઘ (gha) — like "g" with breath · Example: ઘર (ghar) = home',
            ]
          },
          { id:'l2b3', type:'keypoints', title:'Palatal Group: ચ છ જ ઝ',
            points:[
              'ચ (cha) — like "ch" in "chair" · Example: ચા (chaa) = Tea',
              'છ (chha) — aspirated "ch" · Example: છે (chhe) = is/are',
              'જ (ja) — like "j" in "jump" · Example: જળ (jal) = water',
              'ઝ (zha) — like "z" sound · Example: ઝાડ (zhaad) = tree',
            ]
          },
          { id:'l2b4', type:'keypoints', title:'Dental Group: ત થ દ ધ',
            points:[
              'ત (ta) — soft "t" (tongue at upper teeth) · Example: તારા (taaraa) = stars',
              'થ (tha) — aspirated soft "th" · Example: થાક (thaak) = fatigue',
              'દ (da) — soft "d" (dental) · Example: દૂધ (doodh) = milk',
              'ધ (dha) — aspirated soft "d" · Example: ધ્યાન (dhyaan) = attention',
            ]
          },
          { id:'l2b5', type:'tip', body:'🔑 KEY PATTERN: Each consonant group has 4 letters: (1) unaspirated voiceless, (2) aspirated voiceless, (3) unaspirated voiced, (4) aspirated voiced. Aspirated = extra puff of breath. Once you see this pattern, you can predict how any new consonant sounds!' },
          { id:'l2b6', type:'text', title:'Building Your First Words',
            body:'Now combine what you know:\n\n"ક" + "આ" (aa maatra) = "કા" = syllable "kaa"\n\nReal words:\nકા-મ (kaam) = Work\nખા-ઓ (khaao) = Eat (command)\nગા-ઓ (gaao) = Sing (command)\nઘ-ર (ghar) = Home\nચ-ઢ (chadh) = Climb\nછ-ઠ (chhath) = Festival day\nજ-ળ (jal) = Water\nઝ-ડ (zhaad) = Tree' },
        ]
      },

      12: {
        title: 'Objects, Places & Daily Life',
        description: '25 essential Gujarati words for objects, places, food and daily life.',
        duration: '10 min', xp: 20, langPair: 'en-gu', week: 2,
        blocks: [{ id:'v2_1', type:'vocab_table', title:'Week 2 Vocabulary',
          words:[
            { word:'ખોરાક', meaning:'Food', example:'ખોરાક ખૂબ સ્વાદિષ્ટ છે — The food is very tasty' },
            { word:'પાણી', meaning:'Water', example:'એક ગ્લાસ પાણી આપો — Give me a glass of water' },
            { word:'ચા', meaning:'Tea', example:'ક્ષમા, ચા ક્યાં મળે? — Excuse me, where can I get tea?' },
            { word:'દૂધ', meaning:'Milk', example:'ઠંડું દૂધ ગમે — I like cold milk' },
            { word:'ભાત', meaning:'Rice', example:'ભાત અને દાળ — Rice and lentils' },
            { word:'રોટલી', meaning:'Flatbread (chapati)', example:'ગરમ રોટલી ખાઓ — Eat the hot flatbread' },
            { word:'દુકાન', meaning:'Shop / Store', example:'ઇ દુકાન ક્યારે ખુલે? — When does this shop open?' },
            { word:'બજાર', meaning:'Market / Bazaar', example:'બજારમાં ઘણું મળે — A lot is available at the market' },
            { word:'ઓફિસ', meaning:'Office', example:'હું ઓફિસ જઉ છું — I am going to office' },
            { word:'શાળા', meaning:'School', example:'શાળા ૮ વાગ્યે ખુલે — School opens at 8 o\'clock' },
            { word:'હોસ્પિટલ', meaning:'Hospital', example:'હોસ્પિટલ ક્યાં છે? — Where is the hospital?' },
            { word:'બસ', meaning:'Bus', example:'બસ ક્યારે આવશે? — When will the bus come?' },
            { word:'ટ્રેન', meaning:'Train', example:'ટ્રેન સ્ટેશન ક્યાં છે? — Where is the train station?' },
            { word:'ઘડિયાળ', meaning:'Clock / Watch', example:'ઘડિયાળ જોઓ — Look at the clock' },
            { word:'ચાવી', meaning:'Key', example:'ચાવી ક્યાં છે? — Where is the key?' },
            { word:'દરવાજો', meaning:'Door', example:'દરવાજો ખોલો — Open the door' },
            { word:'બારી', meaning:'Window', example:'બારી બંધ કરો — Close the window' },
            { word:'ખુરશી', meaning:'Chair', example:'ખુરશી પર બેસો — Sit on the chair' },
            { word:'ટેબલ', meaning:'Table', example:'ટેબલ પર મૂકો — Put it on the table' },
            { word:'પુસ્તક', meaning:'Book', example:'આ પુસ્તક સારું છે — This book is good' },
            { word:'ફોન', meaning:'Phone', example:'ફોન ક્યાં છે? — Where is the phone?' },
            { word:'પૈસા', meaning:'Money', example:'પૈસા ક્યાં છે? — Where is the money?' },
            { word:'સમય', meaning:'Time', example:'સમય ખૂબ જ કિંમતી છે — Time is very precious' },
            { word:'ઘ', meaning:'(letter) / Home (in compounds)', example:'ઘ is the 4th consonant of the Gujarati alphabet' },
            { word:'ભૂખ', meaning:'Hunger', example:'ભૂખ લાગી — I am hungry (lit. hunger applied)' },
          ]
        }]
      },

      13: {
        title: 'A Day in Ahmedabad',
        description: 'Read about Priya\'s typical morning in Ahmedabad and answer comprehension questions.',
        duration: '14 min', xp: 25, langPair: 'en-gu', week: 2,
        blocks: [{ id:'r2_1', type:'reading',
          passage:`📖 STORY — અહેમદાબાદ માં સવાર (Morning in Ahmedabad)

My name is Priya. (મારું નામ પ્રિયા છે.)

Every morning I wake up at 6 o'clock. (હું સવારે ૬ વાગ્યે ઊઠું છું.)

I drink tea and eat roti with vegetables. (હું ચા પીઉ છું અને શાક-રોટલી ખાઉ છું.)

Then I go to the market. (પછી હું બજારમાં જઉ છું.)

In the market, I buy fresh vegetables and fruits. (બજારમાં હું તાજા શાક અને ફળ ખરીદું છું.)

The market is very lively in the morning! (સવારે બજારમાં ખૂબ ચહલ-પહલ હોય!)

Then I go to work in the office. (પછી ઓફિસ જઉ છું.)

In the evening, I come home. My home is small but beautiful. (સાંજે ઘર આવું છું. મારું ઘર નાનું પણ સુંદર છે.)

I love Ahmedabad! (મને અહેમદાબાદ ખૂબ ગમે છે!)`,
          questions:[
            { q:'What time does Priya wake up?', a:'6 o\'clock in the morning (સવારે ૬ વાગ્યે)' },
            { q:'What does Priya eat for breakfast?', a:'Tea and roti with vegetables (ચા, શાક-રોટલી)' },
            { q:'Where does Priya go after breakfast?', a:'To the market (બજારમાં)' },
            { q:'How does Priya describe her home?', a:'Small but beautiful (નાનું પણ સુંદર)' },
          ]
        }]
      },

      15: {
        title: 'Describe Your Daily Routine',
        description: 'Practice writing about your daily schedule using Gujarati time expressions and action verbs.',
        duration: '15 min', xp: 35, langPair: 'en-gu', week: 2,
        blocks: [
          { id:'w2b1', type:'text', title:'Time Expressions in Gujarati',
            body:'સવારે (savaare) = In the morning\nબપોરે (bapore) = In the afternoon\nસાંજે (saanje) = In the evening\nરાત્રે (raatre) = At night\n___ વાગ્યે (___ vaagye) = At ___ o\'clock\n\nCommon verbs:\nઊઠવું (uthvun) = to wake up\nખાવું (khaavun) = to eat\nપીવું (peevun) = to drink\nજવું (javun) = to go\nઆવવું (aavvun) = to come\nકામ કરવું (kaam karvun) = to work\nઊંઘવું (oonghvun) = to sleep'
          },
          { id:'w2b2', type:'writing', prompt:'Describe your daily routine in Gujarati (use transliteration/Romanized Gujarati if needed). Include at least 5 activities with time expressions. For example: "Savare 7 vaagye hun uthun chhun..."', minWords: 40,
            sampleAnswer:'Savare 7 vaagye hun uthun chhun. (I wake up at 7 in the morning.)\n\nSavare hun chai peeun chhun ane toast khaun chhun. (In the morning I drink tea and eat toast.)\n\nBapore hun office maun kaam karun chhun. (In the afternoon I work in the office.)\n\nSaanje hun exercise karun chhun. (In the evening I exercise.)\n\nRaatre hun vaanche chhun ane 11 vaagye soo jaun chhun. (At night I read and sleep at 11 o\'clock.)\n\nMaari dincharya saari chhe! (My daily routine is good!)' }
        ]
      },

      17: {
        title: 'Week 2 Quiz — Consonants & Daily Life',
        description: 'Test your knowledge of Gujarati consonants, objects and daily life vocabulary.',
        duration: '8 min', xp: 50, langPair: 'en-gu', week: 2,
        blocks: [
          { id:'q2_1', type:'quiz', question:'Which letter group includes ક, ખ, ગ, ઘ?',
            options:['Palatal (palate)','Labial (lips)','Velar (throat)','Dental (teeth)'], correct:2, explanation:'ક, ખ, ગ, ઘ are the velar consonants — produced at the back of the throat. Velar = relating to the velum (soft palate at back of mouth).' },
          { id:'q2_2', type:'quiz', question:'What does "ભૂખ" mean?',
            options:['Thirst','Hunger','Sleep','Tiredness'], correct:1, explanation:'"ભૂખ" (bhookh) means hunger. "ભૂખ લાગી" (bhookh laagi) literally means "hunger has attached" which is how Gujarati expresses "I am hungry".' },
          { id:'q2_3', type:'quiz', question:'ચા means:',
            options:['Coffee','Milk','Water','Tea'], correct:3, explanation:'"ચા" (chaa) means tea. Gujarat is famous for its tea culture — masala chai is a staple!' },
          { id:'q2_4', type:'quiz', question:'"ધ" is the aspirated voiced version of which consonant?',
            options:['ત','ટ','દ','ઠ'], correct:2, explanation:'"ધ" (dha) is the aspirated version of "દ" (da). They are both dental consonants. Aspirated means extra puff of breath when pronouncing.' },
          { id:'q2_5', type:'quiz', question:'How do you say "Open the door" in Gujarati?',
            options:['દરવાજો બંધ કરો','ખુરશી પર બેસો','દરવાજો ખોલો','બારી ખોલો'], correct:2, explanation:'"દરવાજો ખોલો" = "Door open (command)". "દરવાજો" = door, "ખોલો" = open. Compare: "બારી ખોલો" would be "Open the window".' },
          { id:'q2_6', type:'quiz', question:'What is "સમય" in English?',
            options:['Money','Place','Time','Key'], correct:2, explanation:'"સમય" (samay) means time. "સમય ખૂબ જ કિંમતી છે" = "Time is very precious" — a common Gujarati saying.' },
          { id:'q2_7', type:'quiz', question:'"સવારે" refers to:',
            options:['Evening','Afternoon','Night','Morning'], correct:3, explanation:'"સવારે" (savaare) = in the morning. Remember: સ-વ-ર-ે. The time vocabulary: સવારે/morning, બપોરે/afternoon, સાંજે/evening, રાત્રે/night.' },
          { id:'q2_8', type:'quiz', question:'What does "ઊઠવું" mean?',
            options:['To eat','To sleep','To wake up','To go'], correct:2, explanation:'"ઊઠવું" (uthvun) = to wake up / to get up. "ઊઠો" is the command form — "Get up!"' },
          { id:'q2_9', type:'quiz', question:'Which word means "market"?',
            options:['ઓફિસ','બજાર','શાળા','દુકાન'], correct:1, explanation:'"બજાર" (bazaar) means market. This word is familiar — it came into English as "bazaar"! "દુકાน" means shop.' },
          { id:'q2_10', type:'quiz', question:'The aspirated version of ક (ka) is:',
            options:['ગ (ga)','ઘ (gha)','ખ (kha)','ચ (cha)'], correct:2, explanation:'"ખ" (kha) is the aspirated voiceless version of "ક" (ka). To make "ख", say "k" with a strong puff of air — like fogging up a mirror.' },
        ]
      },

      18: {
        title: 'Shopping & Asking for Help',
        description: 'Practice speaking scenarios: asking for directions, shopping at a market, and getting help.',
        duration: '12 min', xp: 35, langPair: 'en-gu', week: 2,
        blocks: [
          { id:'sp2_1', type:'speaking', prompt:'You\'re at a market (બજાર) in Ahmedabad. Ask the vendor about the price of vegetables and buy 1 kg of tomatoes.',
            hints:['આ ટામેટા ક્યારેય? (What is the price of these tomatoes?)','એક કિલો ટામેટા — 1 kg tomatoes','ઠીક, આપો (OK, give me)','આભાર (Thank you)'] },
          { id:'sp2_2', type:'speaking', prompt:'You\'re lost in a Gujarati city. Politely ask someone for directions to the nearest bus station.',
            hints:['ક્ષમા, બસ સ્ટૅશન ક્યાં છે? (Excuse me, where is the bus station?)','ડાબો/જમ્ણ (Left/Right)','સીધા જઓ (Go straight)','ઘણો આભાર! (Many thanks!)'] },
          { id:'sp2_3', type:'speaking', prompt:'You are at a restaurant. Order tea and a meal, and ask if they have vegetarian food.',
            hints:['ચા લાવો (Bring tea)','શાકાહારી ખોરાક છે? (Is there vegetarian food?)','બે ઘડી (Just a moment)','હિસાબ આપો (Bring the bill)'] },
        ]
      },

      /* ════════════════════════════════════════════════════════
         WEEK 3 — "Numbers, Time & Essential Questions"
      ════════════════════════════════════════════════════════ */

      22: {
        title: 'Numbers, Time & Dates',
        description: 'Count from 1–100, tell time, and talk about days of the week in Gujarati.',
        duration: '20 min', xp: 30, langPair: 'en-gu', week: 3,
        blocks: [
          { id:'l3b1', type:'text', title:'Numbers 1–20 — સંખ્યા (Sankhya)',
            body:'1 — એક (ek)\n2 — બે (be)\n3 — ત્રણ (tran)\n4 — ચાર (chaar)\n5 — પાંચ (paanch)\n6 — છ (chha)\n7 — સાત (saat)\n8 — આઠ (aath)\n9 — નવ (nav)\n10 — દસ (das)\n11 — અગ્યાર (agyaar)\n12 — બાર (baar)\n13 — તેર (ter)\n14 — ચૌદ (chaud)\n15 — પંદર (pandar)\n16 — સોળ (sol)\n17 — સત્તર (sattar)\n18 — અઢાર (adhaar)\n19 — ઓગણીસ (ognees)\n20 — વીસ (vees)'
          },
          { id:'l3b2', type:'keypoints', title:'Numbers 21–100 Pattern',
            points:[
              '21 = એકવીસ (ekvees)  — 22 = બાવીસ  — 30 = ત્રીસ (trees)',
              '40 = ચાળીસ (chaalees)  — 50 = પચાસ (pachaas)',
              '60 = સાઠ (saath)  — 70 = સિત્તેર (sitter)',
              '80 = એંસી (ensi)  — 90 = નેવું (nevun)  — 100 = સો (so)',
              'Pattern: numbers 21-99 often blend the units and tens together',
            ]
          },
          { id:'l3b3', type:'text', title:'Telling Time — સમય કહેવો',
            body:'___ વાગ્યા (vaagyaa) = ___ o\'clock\nઅઢી (adhi) = 2:30 (half-past-two — a special word!)\nસવારે (savaare) = a.m. / morning\nસાંજે (saanje) = p.m. / evening\nઅત્યારે (atyaare) = right now\nક્યારે? (kyaare?) = when?\n\nExamples:\n3 વાગ્યા = 3 o\'clock\nસવારે 9 વાગ્યે = at 9 in the morning\nસાંજે 6:30 = at 6:30 in the evening'
          },
          { id:'l3b4', type:'keypoints', title:'Days of the Week — અઠવાડિયાના દિવસ',
            points:[
              'સોમવાર (Somvaar) — Monday',
              'મંગળવાર (Mangalvaar) — Tuesday',
              'બુધવાર (Budhvaar) — Wednesday',
              'ગુરુવાર (Guruvaar) — Thursday',
              'શુક્રવાર (Shukravaar) — Friday',
              'શનિવાર (Shanivaar) — Saturday',
              'રવિવાર (Ravivaar) — Sunday',
            ]
          },
          { id:'l3b5', type:'tip', body:'🎵 Memory trick for days: sor-man-gal-bud-gu-shuk-sha-ra → Monday starts with "Soma" (Moon in Sanskrit). Tuesday is Mangal (Mars). Wednesday is Budh (Mercury). Thursday is Guru (Jupiter). Friday is Shukra (Venus). Saturday is Shani (Saturn). Sunday is Ravi (Sun). Same as Hindi days!' },
        ]
      },

      23: {
        title: 'Numbers, Time & Question Words',
        description: '25 vocabulary words for counting, time expressions, and essential question words.',
        duration: '10 min', xp: 20, langPair: 'en-gu', week: 3,
        blocks: [{ id:'v3_1', type:'vocab_table', title:'Week 3 Vocabulary',
          words:[
            { word:'એક', meaning:'One', example:'એક ચા — one tea' },
            { word:'પાંચ', meaning:'Five', example:'પાંચ રૂપિયા — five rupees' },
            { word:'દસ', meaning:'Ten', example:'દસ મિનિટ — ten minutes' },
            { word:'વીસ', meaning:'Twenty', example:'વીસ કિલો — twenty kilos' },
            { word:'સો', meaning:'Hundred', example:'સો રૂપિયા — one hundred rupees' },
            { word:'કેટલું?', meaning:'How much? How many?', example:'કેટલું? — How much does it cost?' },
            { word:'ક્યારે?', meaning:'When?', example:'ક્યારે આવો? — When will you come?' },
            { word:'ક્યાં?', meaning:'Where?', example:'ક્યાં જઓ? — Where are you going?' },
            { word:'કેમ?', meaning:'Why? / How?', example:'કેમ? — Why? / Kem chho? — How are you?' },
            { word:'કોણ?', meaning:'Who?', example:'આ કોણ છે? — Who is this?' },
            { word:'શું?', meaning:'What?', example:'શું? — What? / Shun chhe? — What is it?' },
            { word:'કઈ?', meaning:'Which?', example:'કઈ બસ? — Which bus?' },
            { word:'આજ', meaning:'Today', example:'આજ સોમવાર છે — Today is Monday' },
            { word:'કાલ', meaning:'Tomorrow / Yesterday', example:'કાલ હું આવીશ — I will come tomorrow' },
            { word:'પરમ', meaning:'Day after tomorrow', example:'પરમ આવો — Come the day after tomorrow' },
            { word:'અઠવાડિયું', meaning:'Week', example:'એક અઠવાડિયું — one week' },
            { word:'મહિનો', meaning:'Month', example:'ત્રણ મહિના — three months' },
            { word:'વર્ષ', meaning:'Year', example:'આ વર્ષ — this year' },
            { word:'ઝડપી', meaning:'Quick / Fast', example:'ઝડપી ચા — quick tea' },
            { word:'ઘણો', meaning:'Many / Much / A lot', example:'ઘણો સમય — a lot of time' },
            { word:'થોડો', meaning:'A little / Few', example:'થોડો સમય — a little time' },
            { word:'હજી', meaning:'Still / Yet', example:'હજી ભૂખ — still hungry' },
            { word:'પહેલો', meaning:'First', example:'પહેલો દિવસ — the first day' },
            { word:'છેલ્લો', meaning:'Last', example:'છેલ્લો ટ્રેન — the last train' },
            { word:'ઘડિ', meaning:'Moment / A little while', example:'ઘડી બેસો — sit for a moment' },
          ]
        }]
      },

      28: {
        title: 'Week 3 Quiz — Numbers & Questions',
        description: 'Test your knowledge of Gujarati numbers, time, days of the week, and question words.',
        duration: '8 min', xp: 50, langPair: 'en-gu', week: 3,
        blocks: [
          { id:'q3_1', type:'quiz', question:'How do you say "5" in Gujarati?',
            options:['ચાર','પાંચ','છ','સાત'], correct:1, explanation:'"પાંચ" (paanch) = 5. Remember: 1=એક, 2=બે, 3=ત્રણ, 4=ચાર, 5=પાંચ, 6=છ, 7=સાત, 8=આઠ, 9=નવ, 10=દસ.' },
          { id:'q3_2', type:'quiz', question:'"ક્યારે?" means:',
            options:['Where?','Who?','When?','Why?'], correct:2, explanation:'"ક્યારે?" (kyaare?) = When? Question words: ક્યાં? = where, ક્યારે? = when, કોણ? = who, કેમ? = why/how, શું? = what.' },
          { id:'q3_3', type:'quiz', question:'What is Wednesday in Gujarati?',
            options:['સોમવાર','ગુરુવાર','બુધવાર','શુક્રવાર'], correct:2, explanation:'"બુધવાર" (Budhvaar) = Wednesday. Budh = Mercury (planet). The days are named after celestial bodies just like in English!' },
          { id:'q3_4', type:'quiz', question:'"આ વર્ષ" means:',
            options:['This week','This month','This year','This day'], correct:2, explanation:'"વર્ષ" (varsh) = year. "આ" = this. So "આ વર્ષ" = this year. "અઠવાડિયું" = week, "મહિનો" = month, "આજ" = today.' },
          { id:'q3_5', type:'quiz', question:'How do you say "100" in Gujarati?',
            options:['ઘણો','વીસ','પચાસ','સો'], correct:3, explanation:'"સો" (so) = 100. "વીસ" = 20, "પચાસ" = 50, "ઘણો" = many/much (not a number).' },
          { id:'q3_6', type:'quiz', question:'"___ વાગ્યે" is used to express:',
            options:['A day of the week','A month','A time (o\'clock)','A number'], correct:2, explanation:'"___ વાગ્યે" is used to say "at ___ o\'clock". "ત્રણ વાગ્યે" = at 3 o\'clock. It literally means "struck ___ times" like a clock bell.' },
          { id:'q3_7', type:'quiz', question:'What does "ઘણો" mean?',
            options:['A little','None','Many/Much','Few'], correct:2, explanation:'"ઘણો" (ghano) means many, much, or a lot. "ઘણો સમય" = a lot of time, "ઘણો ઠંડો" = very cold.' },
          { id:'q3_8', type:'quiz', question:'Which question word means "Who?"',
            options:['ક્યાં?','ક્યારે?','કોણ?','કઈ?'], correct:2, explanation:'"કોણ?" (kon?) means "Who?". "આ કોણ છે?" = "Who is this?"' },
          { id:'q3_9', type:'quiz', question:'"કાલ" can mean:',
            options:['Today only','Tomorrow only','Both tomorrow AND yesterday','This week'], correct:2, explanation:'"કાલ" (kaal) interestingly means BOTH tomorrow AND yesterday in Gujarati! Context tells you which. "ગઈ કાલ" = yesterday, "આવતી કાલ" = tomorrow.' },
          { id:'q3_10', type:'quiz', question:'Sunday in Gujarati is:',
            options:['શનિવાર','સોમવાર','ગુરુવાર','રવિવાર'], correct:3, explanation:'"રવિવાર" (Ravivaar) = Sunday. "Ravi" = Sun in Sanskrit. Similarly, Monday is "Somvaar" from "Soma" = Moon.' },
        ]
      },

      /* ════════════════════════════════════════════════════════
         WEEK 4 — "Family, Emotions & Building Sentences"
      ════════════════════════════════════════════════════════ */

      32: {
        title: 'Family, Emotions & Complete Sentences',
        description: 'Learn family vocabulary, express feelings, and build proper Gujarati sentences with correct word order.',
        duration: '20 min', xp: 30, langPair: 'en-gu', week: 4,
        blocks: [
          { id:'l4b1', type:'text', title:'Gujarati Sentence Structure',
            body:'Gujarati uses Subject-Object-Verb (SOV) order — different from English!\n\nEnglish: "I eat food" (S-V-O)\nGujarati: "હું ખોરાક ખાઉ છું" (hun khoraak khaun chhun)\n          = "I food eat am" (S-O-V)\n\nMore examples:\n"She reads a book" → "તે પુસ્તક વાંચે છે" (te pustak vaanche chhe)\n"We go to school" → "અમે શાળાએ જઈએ છીએ" (ame shaalaye jaeye chheye)'
          },
          { id:'l4b2', type:'keypoints', title:'Family Members — કુટુંબ (Kutumb)',
            points:[
              'માતા / મા (maataa / maa) — Mother',
              'પિતા / બાપ (pitaa / baap) — Father',
              'ભાઈ (bhaai) — Brother',
              'બહેન (bahen) — Sister',
              'દાદા (daadaa) — Grandfather (paternal)',
              'દાદી (daadi) — Grandmother (paternal)',
              'નાના (naanaa) — Grandfather (maternal)',
              'નાની (naani) — Grandmother (maternal)',
              'ચાચા (chaachaa) — Father\'s younger brother',
              'કાકા (kaakaa) — Father\'s brother (honorific)',
            ]
          },
          { id:'l4b3', type:'vocab_table', title:'Emotions & Feelings',
            words:[
              { word:'ખુશ', meaning:'Happy', example:'હું ખૂબ ખુશ છું — I am very happy' },
              { word:'દુઃખ', meaning:'Sad / Sadness', example:'મને દુઃખ છે — I am sad' },
              { word:'ગુસ્સો', meaning:'Anger', example:'ગુસ્સો ન કરો — Don\'t be angry' },
              { word:'ડર', meaning:'Fear', example:'ડર ન રાખ — Don\'t be afraid' },
              { word:'પ્રેમ', meaning:'Love', example:'તમારા પ્રત્યે પ્રેમ — Love for you' },
              { word:'ઉત્સાહ', meaning:'Excitement / Enthusiasm', example:'ઉત્સાહ સારો — Enthusiasm is good' },
            ]
          },
          { id:'l4b4', type:'tip', body:'🌟 In Gujarati, "છે" (chhe) = is/are, "છું" (chhun) = am (first person), "છો" (chho) = are (second person). This little word is incredibly common — you\'ll hear it in almost every sentence!' },
          { id:'l4b5', type:'keypoints', title:'Essential Sentence Patterns',
            points:[
              'I am... : હું ___ છું (hun ___ chhun)',
              'This is... : આ ___ છે (aa ___ chhe)',
              'I like... : મને ___ ગમે છે (mane ___ game chhe)',
              'I want... : મને ___ જોઈએ (mane ___ joeye)',
              'I don\'t understand: મને સમજ ન પડ (mane samaj na pad)',
              'I understand: મને સમજ પડ્યું (mane samaj padyun)',
            ]
          },
        ]
      },

      33: {
        title: 'Family, Emotions & Descriptive Words',
        description: 'Master family terms, how you\'re feeling, and adjectives to describe people and things.',
        duration: '10 min', xp: 20, langPair: 'en-gu', week: 4,
        blocks: [{ id:'v4_1', type:'vocab_table', title:'Week 4 Vocabulary',
          words:[
            { word:'મા', meaning:'Mother', example:'મારી મા ખૂબ સારી છે — My mother is very good' },
            { word:'બાપ', meaning:'Father', example:'મારા બાપ ડૉક્ટર છે — My father is a doctor' },
            { word:'ભાઈ', meaning:'Brother', example:'ભાઈ ક્યાં છે? — Where is your brother?' },
            { word:'બહેન', meaning:'Sister', example:'બહેન ભણે છે — Sister is studying' },
            { word:'દોસ્ત', meaning:'Friend', example:'મારો દોસ્ત ખૂબ મળ — My friend is very funny' },
            { word:'ખુશ', meaning:'Happy', example:'હું ખૂબ ખુશ છું — I am very happy' },
            { word:'ઉદાસ', meaning:'Sad', example:'ઉદાસ ન થાઓ — Don\'t be sad' },
            { word:'ગુસ્સો', meaning:'Angry', example:'ગુસ્સો ન કરો — Don\'t be angry' },
            { word:'ભૂખ', meaning:'Hungry', example:'મને ભૂખ લાગી — I am hungry' },
            { word:'તરસ', meaning:'Thirsty', example:'મને તરસ લાગી — I am thirsty' },
            { word:'ઊંઘ', meaning:'Sleepy', example:'ઊંઘ આવે છે — I feel sleepy' },
            { word:'થાક', meaning:'Tired', example:'ઘણો થાક — Very tired' },
            { word:'સુંદર', meaning:'Beautiful', example:'ગુજરાત સુંદર — Gujarat is beautiful' },
            { word:'મોટો', meaning:'Big / Large', example:'ઘર મોટો — The house is big' },
            { word:'નાનો', meaning:'Small / Little', example:'નાનો ભાઈ — younger/small brother' },
            { word:'ગરમ', meaning:'Hot / Warm', example:'ગરમ ચા — hot tea' },
            { word:'ઠંડો', meaning:'Cold / Cool', example:'ઠંડો પાણી — cold water' },
            { word:'નવો', meaning:'New', example:'નવો ફોન — new phone' },
            { word:'જૂનો', meaning:'Old (things)', example:'જૂનો ઘર — old house' },
            { word:'સસ્તો', meaning:'Cheap', example:'સસ્તો — cheap' },
            { word:'મોંઘો', meaning:'Expensive', example:'ખૂબ મોંઘો — very expensive' },
            { word:'સ્વાદિષ્ટ', meaning:'Delicious / Tasty', example:'ખૂબ સ્વાદિષ્ટ! — Very tasty!' },
            { word:'સ્વચ્છ', meaning:'Clean', example:'સ્વચ્છ ઘર — clean house' },
            { word:'ગંદુ', meaning:'Dirty', example:'ગંદુ ન કરો — Don\'t make it dirty' },
            { word:'સ-હ', meaning:'Right/correct', example:'સહ — correct answer' },
          ]
        }]
      },

      38: {
        title: 'Week 4 Quiz — Family & Sentence Building',
        description: 'Test your knowledge of family vocabulary, emotions, and Gujarati sentence structure.',
        duration: '8 min', xp: 50, langPair: 'en-gu', week: 4,
        blocks: [
          { id:'q4_1', type:'quiz', question:'"Mane bhookh laagi" means:',
            options:['I am sleepy','I am thirsty','I am hungry','I am tired'], correct:2, explanation:'"ભૂખ" (bhookh) = hunger. "ભૂખ લાગી" = hunger has struck = I am hungry. Similarly "તરસ" = thirst, "ઊંઘ" = sleep.' },
          { id:'q4_2', type:'quiz', question:'Gujarati sentence order is:',
            options:['Subject-Verb-Object','Object-Subject-Verb','Verb-Subject-Object','Subject-Object-Verb'], correct:3, explanation:'Gujarati uses SOV (Subject-Object-Verb) order: "I food eat" instead of English\'s "I eat food".' },
          { id:'q4_3', type:'quiz', question:'What is the Gujarati word for "beautiful"?',
            options:['ગરમ','સસ્તો','સુંદર','નવો'], correct:2, explanation:'"સુંદર" (sundar) = beautiful. "ગરમ" = hot, "સસ્તો" = cheap, "નવો" = new.' },
          { id:'q4_4', type:'quiz', question:'How do you express "I like ___" in Gujarati?',
            options:['Mane ___ jaanun chhe','Mane ___ game chhe','Hun ___ chhun','Te ___ chhe'], correct:1, explanation:'"Mane ___ game chhe" (મને ___ ગમે છે) = I like ___. Literally: "to me ___ is pleasing/fitting".' },
          { id:'q4_5', type:'quiz', question:'What does "ઠંડો" mean?',
            options:['Hot','Cold/Cool','New','Old'], correct:1, explanation:'"ઠંડો" (thando) = cold/cool. "ઠંડો પાણી" = cold water. Opposite is "ગરમ" (garam) = hot.' },
          { id:'q4_6', type:'quiz', question:'"આ ___ છે" pattern is used to say:',
            options:['I am ___','You are ___','This is ___','They are ___'], correct:2, explanation:'"આ ___ છે" (aa ___ chhe) = "This is ___". "આ" = this, "છે" = is/are. Example: "આ મારો ભાઈ છે" = "This is my brother."' },
          { id:'q4_7', type:'quiz', question:'The Gujarati word for "friend" is:',
            options:['ભાઈ','બહેન','દોસ્ત','ઘ'], correct:2, explanation:'"દોસ્ત" (dost) = friend. This word is shared across many South Asian languages — Urdu, Hindi, Gujarati all use it!' },
          { id:'q4_8', type:'quiz', question:'"ઉદાસ" means:',
            options:['Happy','Angry','Excited','Sad'], correct:3, explanation:'"ઉદાસ" (udaas) = sad. "ઉદાસ ન થાઓ" = "Don\'t be sad". Opposite is "ખુશ" (khush) = happy.' },
          { id:'q4_9', type:'quiz', question:'"Garam chai" means:',
            options:['Cold coffee','Hot milk','Hot tea','Cold water'], correct:2, explanation:'"ગરમ" (garam) = hot/warm. "ચા" (chaa) = tea. "ગરમ ચા" = hot tea. Common phrase in Gujarat!' },
          { id:'q4_10', type:'quiz', question:'"ઘ" (gha) is the consonant for which sound?',
            options:['Like "g" in "go"','Like "g" with a puff of breath','Like "j" in "judge"','Like "k" in "kite"'], correct:1, explanation:'"ઘ" is an aspirated voiced velar — like "g" but with a strong breath of air. Contrast with "ગ" (ga) which is just like "g" in "go".' },
        ]
      },

      39: {
        title: 'Talking About Your Family',
        description: 'Practice describing your family, expressing emotions, and having natural conversations in Gujarati.',
        duration: '14 min', xp: 35, langPair: 'en-gu', week: 4,
        blocks: [
          { id:'sp4_1', type:'speaking', prompt:'Describe your family to a new Gujarati friend. Tell them about your family members, where they live, and one interesting thing about each person.',
            hints:['મારી family માં ___ જણ છે (My family has ___ people)','મારી maa ___ (My mother is a ___)','ભાઈ/બહેન ___ years old chhe','Amara ghar maun ___ rehiye chheye'] },
          { id:'sp4_2', type:'speaking', prompt:'Your friend asks you how you\'re feeling about your Gujarati learning progress. Express your emotions honestly — what\'s hard, what\'s fun, and what you want to learn next.',
            hints:['Mane Gujarati sheekhvaun game chhe (I enjoy learning Gujarati)','Aa shabd mushkel chhe (This word is difficult)','Script sikhamaun maja aavy (Learning the script was fun)','Haju vadhare practice joeye (I still need more practice)'] },
          { id:'sp4_3', type:'speaking', prompt:'Role-play: You\'re calling a Gujarati friend to wish them on their birthday. Greet them, wish them well, ask about their plans, and end the call warmly.',
            hints:['Janamdin mubarak! (Happy Birthday!)','Aaj shun karvaanaa? (What are you doing today?)','Khub khush rehejo! (Stay very happy!)','Phir vaato — Bye!'] },
        ]
      },

      // Month Milestone
      43: {
        title: 'Month 1 Complete! 🏅',
        description: 'You\'ve completed Month 1 of your English to Gujarati journey. Claim your badge and unlock Month 2!',
        duration: '—', xp: 100, langPair: 'en-gu',
        blocks: [
          { id:'m1', type:'tip', body:'🎉 Congratulations on completing Month 1! You\'ve learned the Gujarati script, over 100 essential words, can hold basic conversations, count to 100, and understand sentence structure. Month 2 will take you into functional communication and culture!' },
          { id:'m2', type:'keypoints', title:'What You Achieved This Month',
            points:[
              '✅ Learned all 13 Gujarati vowels and their sounds',
              '✅ Mastered the 5 consonant groups (33 consonants)',
              '✅ Built a vocabulary of 100+ Gujarati words',
              '✅ Can hold basic conversations and greetings',
              '✅ Understand numbers 1-100 and tell time',
              '✅ Know family vocabulary and can describe emotions',
              '✅ Can build simple Gujarati sentences (SOV structure)',
            ]
          }
        ]
      },

    }; // end ACTIVITIES

    // Populate LWContent with activities
    let loaded = 0;
    Object.entries(ACTIVITIES).forEach(([id, content]) => {
      const numId = parseInt(id);
      // Don't overwrite admin edits (check if admin has set non-default content)
      const existing = LWContent.getContent(numId);
      if (!existing || existing._autoLoaded) {
        content._autoLoaded = true;
        content._langPair = 'en-gu';
        LWContent.saveContent(numId, content);
        loaded++;
      }
    });
    if (loaded > 0) console.log(`[LearnWise] Loaded ${loaded} English→Gujarati Month 1 activities`);
  };

  if (typeof LWContent !== 'undefined') populate();
  else {
    const t = setInterval(() => { if (typeof LWContent !== 'undefined') { clearInterval(t); populate(); } }, 80);
  }
})();
