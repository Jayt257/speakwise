/**
 * LearnWise Activity Content System
 * ═══════════════════════════════════
 * Provides structured content for each activity type.
 * Currently: English as base language ─ all 11 target languages.
 *
 * Content structure per language:
 *   Month 1–6, Week 1–4 per month = 24 weeks total.
 *   Each week maps activity types to real lesson content.
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
//  LANGUAGE CONTENT DATABASE  (English base → Target language)
// ─────────────────────────────────────────────────────────────────────────────

const CONTENT_DB = {

  // ═══════════════════════════════════════════════════════
  //  HINDI  (हिन्दी)
  // ═══════════════════════════════════════════════════════
  hindi: {
    meta: { script: 'Devanagari', wordOrder: 'SOV', greeting: 'Namaste (नमस्ते)' },
    months: [
      [ // Month 1
        { // Week 1
          lesson: {
            title: 'Hindi Sounds & Devanagari Script',
            subtitle: 'Learn the foundation of Hindi writing',
            sections: [
              { title: 'The Devanagari Script', icon: 'draw', content: 'Hindi is written in the Devanagari script, which has 13 vowels (स्वर) and 33 consonants (व्यंजन). Unlike English, Devanagari is phonetic — each letter always makes the same sound. Letters hang from a horizontal line called the "Shirorekha" (शिरोरेखा).', example: 'अ आ इ ई उ ऊ ए ऐ ओ औ अं अः — these are the Hindi vowels' },
              { title: 'Vowels (Swar)', icon: 'record_voice_over', content: 'Hindi vowels come in short and long pairs: अ (a) / आ (aa), इ (i) / ई (ee), उ (u) / ऊ (oo). The long vowels are held for twice as long. This distinction changes word meanings entirely.', example: 'दिन (din = day) vs दीन (deen = poor) — the vowel length changes the meaning!' },
              { title: 'Basic Consonants', icon: 'school', content: 'Hindi consonants are organized by where in your mouth you produce them: Throat (क ख ग घ), Palate (च छ ज झ), Roof (ट ठ ड ढ), Teeth (त थ द ध), Lips (प फ ब भ). Each group has aspirated and unaspirated pairs.', example: 'क (ka) is unaspirated, ख (kha) is aspirated — feel the puff of air in "kha"' },
              { title: 'Your First Words', icon: 'lightbulb', content: 'Now let\'s read some simple Hindi words using what you\'ve learned! Try sounding out each letter one by one and then blending them together.', example: 'कम (kam = less), नल (nal = tap), जल (jal = water), फल (phal = fruit)' },
            ],
            exercises: [
              { type: 'mcq', question: 'How many vowels does Hindi have?', options: ['10', '13', '26', '5'], correct: 1, explanation: 'Hindi has 13 vowels (स्वर) including अं and अः.' },
              { type: 'mcq', question: 'What is the horizontal line in Devanagari called?', options: ['Matra', 'Shirorekha', 'Halant', 'Bindu'], correct: 1, explanation: 'The Shirorekha (शिरोरेखा) is the horizontal line that connects letters.' },
              { type: 'mcq', question: 'Which pair shows short and long vowels?', options: ['क / ख', 'अ / आ', 'प / फ', 'म / न'], correct: 1, explanation: 'अ (a) is short and आ (aa) is long — they are a vowel pair.' },
              { type: 'fill', question: 'The Hindi word "जल" means _____ in English.', answer: 'water', explanation: 'जल (jal) means water in Hindi.' },
            ],
            keyPoints: ['Devanagari is a phonetic script — each letter = one sound', 'Vowels come in short/long pairs that change word meanings', 'Consonants are grouped by mouth position', 'The Shirorekha connects letters in a word'],
          },
          vocab: {
            title: 'Family & Greetings',
            words: [
              { word: 'नमस्ते', transliteration: 'Namaste', meaning: 'Hello / Greetings', example: 'नमस्ते, आप कैसे हैं? (Hello, how are you?)', category: 'Greetings' },
              { word: 'शुक्रिया', transliteration: 'Shukriya', meaning: 'Thank you', example: 'शुक्रिया, आपकी मदद के लिए (Thank you for your help)', category: 'Greetings' },
              { word: 'हाँ', transliteration: 'Haan', meaning: 'Yes', example: 'हाँ, मैं तैयार हूँ (Yes, I am ready)', category: 'Basics' },
              { word: 'नहीं', transliteration: 'Nahin', meaning: 'No', example: 'नहीं, मुझे नहीं चाहिए (No, I don\'t want it)', category: 'Basics' },
              { word: 'माँ', transliteration: 'Maa', meaning: 'Mother', example: 'मेरी माँ बहुत अच्छी हैं (My mother is very nice)', category: 'Family' },
              { word: 'पिता', transliteration: 'Pita', meaning: 'Father', example: 'मेरे पिता अध्यापक हैं (My father is a teacher)', category: 'Family' },
              { word: 'भाई', transliteration: 'Bhai', meaning: 'Brother', example: 'मेरा भाई छोटा है (My brother is younger)', category: 'Family' },
              { word: 'बहन', transliteration: 'Bahan', meaning: 'Sister', example: 'मेरी बहन डॉक्टर है (My sister is a doctor)', category: 'Family' },
              { word: 'दोस्त', transliteration: 'Dost', meaning: 'Friend', example: 'वह मेरा अच्छा दोस्त है (He is my good friend)', category: 'People' },
              { word: 'पानी', transliteration: 'Paani', meaning: 'Water', example: 'मुझे पानी चाहिए (I need water)', category: 'Essentials' },
            ],
          },
          reading: {
            title: 'First Hindi Signs',
            passage: 'नमस्ते! मेरा नाम राज है। मैं भारत से हूँ। मेरा परिवार बड़ा है। मेरी माँ, पिता, एक भाई और एक बहन है। हम दिल्ली में रहते हैं। मेरा भाई छोटा है। मेरी बहन बड़ी है। हम सब खुश हैं।',
            translation: 'Hello! My name is Raj. I am from India. My family is big. I have a mother, father, one brother and one sister. We live in Delhi. My brother is younger. My sister is older. We are all happy.',
            questions: [
              { question: 'What is the speaker\'s name?', options: ['Amit', 'Raj', 'Priya', 'Ravi'], correct: 1, explanation: 'The passage says "मेरा नाम राज है" (My name is Raj).' },
              { question: 'Where does the family live?', options: ['Mumbai', 'Kolkata', 'Delhi', 'Chennai'], correct: 2, explanation: 'The passage says "हम दिल्ली में रहते हैं" (We live in Delhi).' },
              { question: 'How many siblings does Raj have?', options: ['None', 'One', 'Two', 'Three'], correct: 2, explanation: 'Raj has one brother (भाई) and one sister (बहन) = two siblings.' },
            ],
          },
          writing: {
            title: 'Write Devanagari Letters',
            prompt: 'Practice writing the Hindi vowels. Write each vowel on its own line with its English transliteration next to it. Then write 3 simple Hindi words using letters you\'ve learned.',
            guidelines: ['Write all 5 main vowels: अ, आ, इ, ई, उ', 'Include transliteration for each', 'Write at least 3 Hindi words', 'Use correct Devanagari script'],
            tips: ['Start with the Shirorekha (top line) when writing each letter', 'अ is the most basic vowel — it sounds like "a" in "about"', 'Practice writing slowly and clearly before increasing speed'],
            wordTarget: 30,
          },
          speaking: {
            title: 'Introduce Yourself',
            scenario: 'Self-Introduction in Hindi',
            description: 'Practice introducing yourself using basic Hindi phrases. Focus on clear pronunciation of Devanagari sounds.',
            prompts: ['Say "Namaste, mera naam ___ hai" (Hello, my name is ___)', 'Say "Main ___ se hoon" (I am from ___)', 'Say "Mujhe Hindi seekhni hai" (I want to learn Hindi)', 'Say "Aap kaise hain?" (How are you?)'],
            tips: ['Hindi "r" is a soft tap of the tongue, not the English "r"', 'The "n" in Hindi can be nasal — let air pass through your nose', 'Aspirated sounds (kh, gh, ch) have a puff of air'],
          },
          pronunciation: {
            title: 'Retroflex & Aspirated Sounds',
            focusSound: 'Retroflex consonants',
            pairs: [['ट (ṭa)', 'त (ta)'], ['ड (ḍa)', 'द (da)'], ['ठ (ṭha)', 'थ (tha)']],
            steps: ['Listen to the retroflex sound — tongue curls back to touch the roof', 'Listen to the dental sound — tongue touches the back of teeth', 'Try saying the retroflex sound slowly', 'Now alternate between both sounds quickly'],
            tip: 'Retroflex sounds are unique to South Asian languages. Curl your tongue tip back to touch the hard palate (roof of mouth). Dental sounds use the tongue tip touching the back of your upper teeth.',
          },
          test: {
            title: 'Week 1 Quiz: Hindi Basics',
            timeLimit: 8,
            passingScore: 60,
            questions: [
              { type: 'mcq', question: 'What does "नमस्ते" mean?', options: ['Goodbye', 'Thank you', 'Hello', 'Sorry'], correct: 2, explanation: 'नमस्ते (Namaste) is the Hindi greeting meaning Hello.' },
              { type: 'mcq', question: 'Which is the Hindi word for "water"?', options: ['रोटी', 'पानी', 'दूध', 'चाय'], correct: 1, explanation: 'पानी (Paani) means water.' },
              { type: 'fill', question: '"शुक्रिया" means _____ in English.', answer: 'thank you', explanation: 'शुक्रिया (Shukriya) means "Thank you".' },
              { type: 'mcq', question: 'Hindi is written in which script?', options: ['Roman', 'Arabic', 'Devanagari', 'Cyrillic'], correct: 2, explanation: 'Hindi uses the Devanagari script.' },
              { type: 'mcq', question: 'What does "भाई" mean?', options: ['Sister', 'Father', 'Brother', 'Friend'], correct: 2, explanation: 'भाई (Bhai) means Brother.' },
            ],
          },
        },
        { // Week 2
          lesson: {
            title: 'Matras & Vowel Diacritics',
            subtitle: 'Master the vowel marks that attach to consonants',
            sections: [
              { title: 'What are Matras?', icon: 'edit', content: 'When vowels combine with consonants, they change form and become "matras" (मात्रा). Instead of writing the full vowel, a small mark is added to the consonant. This is one of the most important concepts in Hindi reading and writing.', example: 'क + ा = का (ka + aa = kaa), क + ि = कि (ka + i = ki), क + ु = कु (ka + u = ku)' },
              { title: 'Common Matras', icon: 'school', content: 'The most common matras are: ा (aa) — a vertical line after the consonant, ि (i) — a hook before the consonant, ी (ee) — a hook after, ु (u) — a mark below, ू (oo) — a longer mark below, े (e) — a line above, ै (ai) — two lines above, ो (o) — line above + line after, ौ (au) — two lines above + line after.', example: 'कि (ki) vs की (kee) — notice the hook direction changes the sound length!' },
              { title: 'Reading with Matras', icon: 'auto_stories', content: 'Now you can read many more Hindi words! Each consonant with a matra makes a complete syllable. Practice reading slowly, identifying each consonant and its matra.', example: 'नमी (nami = moisture), किला (kila = fort), पुल (pul = bridge), बेटा (beta = son)' },
            ],
            exercises: [
              { type: 'mcq', question: 'What is क + ी?', options: ['का', 'की', 'कु', 'के'], correct: 1, explanation: 'The ी matra (long ee) added to क gives की (kee).' },
              { type: 'mcq', question: 'Which matra represents the "oo" sound?', options: ['ि', 'ु', 'ू', 'े'], correct: 2, explanation: 'ू represents the long "oo" sound (as in "food").' },
              { type: 'fill', question: 'The Hindi word "बेटा" means _____ in English.', answer: 'son', explanation: 'बेटा (beta) means son in Hindi.' },
            ],
            keyPoints: ['Matras are vowel marks attached to consonants', 'Short/long matras change word meanings', 'Some matras go before, some after, some above/below the consonant'],
          },
          vocab: {
            title: 'Numbers & Colors',
            words: [
              { word: 'एक', transliteration: 'Ek', meaning: 'One', example: 'एक किताब दो (Give one book)', category: 'Numbers' },
              { word: 'दो', transliteration: 'Do', meaning: 'Two', example: 'दो चाय लाओ (Bring two teas)', category: 'Numbers' },
              { word: 'तीन', transliteration: 'Teen', meaning: 'Three', example: 'तीन लोग हैं (There are three people)', category: 'Numbers' },
              { word: 'लाल', transliteration: 'Laal', meaning: 'Red', example: 'यह फूल लाल है (This flower is red)', category: 'Colors' },
              { word: 'नीला', transliteration: 'Neela', meaning: 'Blue', example: 'आसमान नीला है (The sky is blue)', category: 'Colors' },
              { word: 'हरा', transliteration: 'Hara', meaning: 'Green', example: 'पेड़ हरा है (The tree is green)', category: 'Colors' },
              { word: 'पीला', transliteration: 'Peela', meaning: 'Yellow', example: 'सूरज पीला है (The sun is yellow)', category: 'Colors' },
              { word: 'सफ़ेद', transliteration: 'Safed', meaning: 'White', example: 'दूध सफ़ेद है (Milk is white)', category: 'Colors' },
              { word: 'काला', transliteration: 'Kala', meaning: 'Black', example: 'रात काली है (The night is black)', category: 'Colors' },
              { word: 'दस', transliteration: 'Das', meaning: 'Ten', example: 'दस रुपये दो (Give ten rupees)', category: 'Numbers' },
            ],
          },
          reading: {
            title: 'Counting & Shopping',
            passage: 'राज बाज़ार गया। उसने दुकानदार से कहा: "भैया, दो किलो सेब दो।" दुकानदार ने कहा: "एक किलो तीस रुपये का है।" राज ने कहा: "ठीक है, दो किलो दो।" राज ने साठ रुपये दिए। उसने तीन केले भी ख़रीदे। कुल मिलाकर राज ने पचहत्तर रुपये ख़र्च किए।',
            translation: 'Raj went to the market. He told the shopkeeper: "Brother, give me two kilos of apples." The shopkeeper said: "One kilo costs thirty rupees." Raj said: "Okay, give me two kilos." Raj paid sixty rupees. He also bought three bananas. In total, Raj spent seventy-five rupees.',
            questions: [
              { question: 'How many kilos of apples did Raj buy?', options: ['One', 'Two', 'Three', 'Five'], correct: 1, explanation: 'Raj asked for "दो किलो सेब" (two kilos of apples).' },
              { question: 'How much did one kilo of apples cost?', options: ['20 rupees', '30 rupees', '50 rupees', '60 rupees'], correct: 1, explanation: 'The shopkeeper said "एक किलो तीस रुपये का है" (one kilo costs thirty rupees).' },
              { question: 'How much did Raj spend in total?', options: ['60 rupees', '70 rupees', '75 rupees', '80 rupees'], correct: 2, explanation: 'The passage says "पचहत्तर रुपये ख़र्च किए" (spent seventy-five rupees).' },
            ],
          },
          writing: { title: 'Write Number Sentences', prompt: 'Write 5 sentences in Hindi using numbers and colors. Example: "मेरे पास दो लाल किताबें हैं" (I have two red books).', guidelines: ['Use at least 3 different numbers', 'Include at least 2 colors', 'Write full sentences, not just words'], tips: ['Use the pattern: Subject + Object + Verb', 'Hindi numbers 1-10: एक, दो, तीन, चार, पाँच, छह, सात, आठ, नौ, दस'], wordTarget: 40 },
          speaking: { title: 'Count & Describe', scenario: 'Shopping Conversation', description: 'Practice a market conversation using numbers and basic vocabulary.', prompts: ['Say "Ek kilo seb kitne ka hai?" (How much is one kilo of apples?)', 'Say "Mujhe do kilo chahiye" (I need two kilos)', 'Say "Yeh kitne ka hai?" (How much is this?)', 'Say "Shukriya, ye lo paisa" (Thank you, here is the money)'], tips: ['Practice the numbers 1-10 before starting', 'Hindi shopkeepers often say "bhai/behen" (brother/sister)'] },
          pronunciation: { title: 'Short vs Long Vowels', focusSound: 'Vowel length', pairs: [['इ (i, short)', 'ई (ee, long)'], ['उ (u, short)', 'ऊ (oo, long)'], ['अ (a, short)', 'आ (aa, long)']], steps: ['Listen to the short vowel', 'Listen to the long vowel — held twice as long', 'Practice minimal pairs: दिन (din) vs दीन (deen)', 'Record yourself and compare'], tip: 'In Hindi, vowel length distinguishes words. दिन (din, short i) means "day" but दीन (deen, long ee) means "poor". Always hold long vowels for about twice the duration.' },
          test: { title: 'Week 2 Quiz: Numbers & Matras', timeLimit: 8, passingScore: 60, questions: [
            { type: 'mcq', question: 'What is "तीन" in English?', options: ['Two', 'Three', 'Four', 'Five'], correct: 1, explanation: 'तीन (Teen) means "Three".' },
            { type: 'mcq', question: 'What color is "नीला"?', options: ['Red', 'Green', 'Blue', 'Yellow'], correct: 2, explanation: 'नीला (Neela) means "Blue".' },
            { type: 'fill', question: '"लाल" means _____ in English.', answer: 'red', explanation: 'लाल (Laal) means "red".' },
            { type: 'mcq', question: 'What is क + ु?', options: ['का', 'की', 'कु', 'को'], correct: 2, explanation: 'The ु matra gives the "u" sound: कु (ku).' },
            { type: 'mcq', question: '"दस" means what number?', options: ['5', '8', '10', '12'], correct: 2, explanation: 'दस (Das) means "Ten".' },
          ]},
        },
        { // Week 3
          lesson: { title: 'Greetings & Self-Introduction', subtitle: 'Have your first Hindi conversation', sections: [
            { title: 'Formal vs Informal', icon: 'groups', content: 'Hindi has three levels of formality based on pronouns: तू (tu, very informal/intimate), तुम (tum, informal/friendly), आप (aap, formal/respectful). Always use "आप" with strangers, elders, and in professional settings.', example: 'तू कहाँ है? (intimate) vs आप कहाँ हैं? (respectful) — both mean "Where are you?"' },
            { title: 'Essential Phrases', icon: 'chat', content: 'Key phrases for daily interactions: नमस्ते (hello), अलविदा (goodbye), कृपया (please), माफ़ कीजिए (excuse me), मुझे नहीं पता (I don\'t know), क्या आप अंग्रेज़ी बोलते हैं? (Do you speak English?)', example: 'कृपया धीरे बोलिए (Please speak slowly) — very useful as a beginner!' },
          ], exercises: [
            { type: 'mcq', question: 'Which pronoun is most respectful?', options: ['तू', 'तुम', 'आप', 'वह'], correct: 2, explanation: 'आप (aap) is the most formal and respectful pronoun.' },
            { type: 'fill', question: '"कृपया" means _____ in English.', answer: 'please', explanation: 'कृपया (kripya) means "please".' },
          ], keyPoints: ['Use आप with strangers and elders', 'तुम is friendly, तू is very intimate'] },
          vocab: { title: 'Daily Life Words', words: [
            { word: 'घर', transliteration: 'Ghar', meaning: 'House/Home', example: 'मेरा घर बड़ा है (My house is big)', category: 'Places' },
            { word: 'खाना', transliteration: 'Khaana', meaning: 'Food', example: 'खाना तैयार है (Food is ready)', category: 'Essentials' },
            { word: 'रोटी', transliteration: 'Roti', meaning: 'Bread/Flatbread', example: 'एक रोटी और दो (Give one more roti)', category: 'Food' },
            { word: 'चाय', transliteration: 'Chai', meaning: 'Tea', example: 'एक चाय दीजिए (Please give one tea)', category: 'Food' },
            { word: 'गाड़ी', transliteration: 'Gaadi', meaning: 'Car/Vehicle', example: 'गाड़ी कहाँ है? (Where is the car?)', category: 'Transport' },
            { word: 'बस', transliteration: 'Bus', meaning: 'Bus', example: 'बस कब आएगी? (When will the bus come?)', category: 'Transport' },
            { word: 'अच्छा', transliteration: 'Achchha', meaning: 'Good', example: 'बहुत अच्छा! (Very good!)', category: 'Adjectives' },
            { word: 'बड़ा', transliteration: 'Bada', meaning: 'Big', example: 'यह बड़ा है (This is big)', category: 'Adjectives' },
            { word: 'छोटा', transliteration: 'Chhota', meaning: 'Small', example: 'वह छोटा है (That is small)', category: 'Adjectives' },
            { word: 'सुंदर', transliteration: 'Sundar', meaning: 'Beautiful', example: 'यह बहुत सुंदर है (This is very beautiful)', category: 'Adjectives' },
          ]},
          reading: { title: 'A Day in Delhi', passage: 'सुबह छह बजे मैं उठता हूँ। मैं चाय पीता हूँ और नाश्ता करता हूँ। फिर मैं बस से दफ़्तर जाता हूँ। दोपहर को मैं खाना खाता हूँ। शाम को मैं घर आता हूँ। रात को मैं किताब पढ़ता हूँ और सो जाता हूँ।', translation: 'I wake up at six in the morning. I drink tea and have breakfast. Then I go to the office by bus. In the afternoon I eat food. In the evening I come home. At night I read a book and go to sleep.', questions: [
            { question: 'When does the speaker wake up?', options: ['5 AM', '6 AM', '7 AM', '8 AM'], correct: 1, explanation: '"सुबह छह बजे" means "at six in the morning".' },
            { question: 'How does he go to the office?', options: ['By car', 'By bus', 'Walking', 'By train'], correct: 1, explanation: '"बस से दफ़्तर जाता हूँ" = goes to office by bus.' },
          ]},
          writing: { title: 'My Daily Routine', prompt: 'Write about your daily routine in Hindi. Describe what you do in the morning (सुबह), afternoon (दोपहर), evening (शाम), and night (रात).', guidelines: ['Use at least 4 time words', 'Write at least 5 sentences', 'Use present tense verbs'], tips: ['Hindi present tense for males ends in -ता हूँ, for females -ती हूँ', 'Time pattern: [time] को मैं [verb] हूँ'], wordTarget: 50 },
          speaking: { title: 'Ask & Answer', scenario: 'Meeting Someone New', description: 'Practice asking and answering basic questions in Hindi.', prompts: ['Ask "Aapka naam kya hai?" (What is your name?)', 'Ask "Aap kahan se hain?" (Where are you from?)', 'Ask "Aap kya karte hain?" (What do you do?)', 'Say "Mujhe aapse milkar khushi hui" (Nice to meet you)'], tips: ['End questions with rising intonation', 'Use "ji" after yes/no for politeness: "Haan ji" / "Nahin ji"'] },
          pronunciation: { title: 'Nasal Sounds', focusSound: 'Anusvara & Chandrabindu', pairs: [['अन (an)', 'अं (ãn, nasal)'], ['हा (ha)', 'हाँ (hã, nasal)'], ['मा (ma)', 'माँ (mã, nasal)']], steps: ['Say "ma" normally', 'Now say "mã" with air through your nose', 'Practice: माँ (mãã = mother) vs मान (maan = respect)', 'The dot (anusvara ं) indicates nasalization'], tip: 'Nasal sounds are crucial in Hindi. माँ (mother) and मान (respect) differ only in nasalization. Let air flow through your nose for the nasal sound.' },
          test: { title: 'Week 3 Quiz: Daily Life', timeLimit: 8, passingScore: 60, questions: [
            { type: 'mcq', question: '"घर" means what?', options: ['Car', 'House', 'Food', 'Water'], correct: 1, explanation: 'घर (Ghar) means House/Home.' },
            { type: 'mcq', question: 'Which pronoun is formal/respectful?', options: ['तू', 'तुम', 'आप', 'मैं'], correct: 2, explanation: 'आप (aap) is the formal/respectful pronoun.' },
            { type: 'fill', question: '"चाय" means _____.', answer: 'tea', explanation: 'चाय (Chai) means tea.' },
            { type: 'mcq', question: '"अच्छा" means:', options: ['Bad', 'Big', 'Good', 'Small'], correct: 2, explanation: 'अच्छा (Achchha) means Good.' },
          ]},
        },
        { // Week 4
          lesson: { title: 'Numbers, Time & Days', subtitle: 'Tell time and talk about your schedule', sections: [
            { title: 'Hindi Number System', icon: 'pin', content: 'Hindi numbers have their own unique words that don\'t follow simple patterns like English. You need to memorize them: एक (1), दो (2), तीन (3), चार (4), पाँच (5), छह (6), सात (7), आठ (8), नौ (9), दस (10). Numbers 11-99 have irregular forms too!', example: 'ग्यारह (11), बारह (12), तेरह (13)... not "दस-एक" like "ten-one"!' },
            { title: 'Telling Time', icon: 'schedule', content: 'To tell time: "[number] बज रहे हैं" (It is [number] o\'clock). For example: तीन बज रहे हैं (It is 3 o\'clock). For half past: साढ़े तीन (3:30). For quarter: सवा तीन (3:15), पौने चार (3:45).', example: 'अभी कितने बज रहे हैं? — What time is it now?' },
            { title: 'Days of the Week', icon: 'calendar_today', content: 'Hindi days come from Sanskrit planet names: सोमवार (Monday-Moon), मंगलवार (Tuesday-Mars), बुधवार (Wednesday-Mercury), गुरुवार (Thursday-Jupiter), शुक्रवार (Friday-Venus), शनिवार (Saturday-Saturn), रविवार (Sunday-Sun).', example: 'आज कौन-सा दिन है? आज सोमवार है। (What day is today? Today is Monday.)' },
          ], exercises: [
            { type: 'fill', question: 'The Hindi day for Monday is _____.', answer: 'सोमवार', hint: 'Starts with "Som"', explanation: 'सोमवार (Somvaar) = Monday, named after the Moon (Som/Chandra).' },
            { type: 'mcq', question: '"पाँच बज रहे हैं" means:', options: ['It is 3 o\'clock', 'It is 4 o\'clock', 'It is 5 o\'clock', 'It is 6 o\'clock'], correct: 2, explanation: 'पाँच (panch) = 5, so "पाँच बज रहे हैं" = It is 5 o\'clock.' },
          ], keyPoints: ['Hindi numbers are unique words, not built from patterns', 'Time uses "बज रहे हैं" (o\'clock)', 'Days are named after planets'] },
          vocab: { title: 'Time & Schedule', words: [
            { word: 'सुबह', transliteration: 'Subah', meaning: 'Morning', example: 'सुबह जल्दी उठो (Wake up early in the morning)', category: 'Time' },
            { word: 'दोपहर', transliteration: 'Dopahar', meaning: 'Afternoon', example: 'दोपहर को खाना खाओ (Eat food at noon)', category: 'Time' },
            { word: 'शाम', transliteration: 'Shaam', meaning: 'Evening', example: 'शाम को चाय पीते हैं (We drink tea in the evening)', category: 'Time' },
            { word: 'रात', transliteration: 'Raat', meaning: 'Night', example: 'रात को सो जाओ (Go to sleep at night)', category: 'Time' },
            { word: 'आज', transliteration: 'Aaj', meaning: 'Today', example: 'आज मौसम अच्छा है (Today the weather is good)', category: 'Time' },
            { word: 'कल', transliteration: 'Kal', meaning: 'Yesterday / Tomorrow', example: 'कल हम बाज़ार जाएँगे (Tomorrow we will go to market)', category: 'Time' },
            { word: 'अभी', transliteration: 'Abhi', meaning: 'Now / Right now', example: 'अभी चलो (Let\'s go now)', category: 'Time' },
            { word: 'जल्दी', transliteration: 'Jaldi', meaning: 'Quickly / Soon', example: 'जल्दी आओ (Come quickly)', category: 'Time' },
            { word: 'देर', transliteration: 'Der', meaning: 'Late / Delay', example: 'देर हो गई (It got late)', category: 'Time' },
            { word: 'हमेशा', transliteration: 'Hamesha', meaning: 'Always', example: 'मैं हमेशा समय पर आता हूँ (I always come on time)', category: 'Time' },
          ]},
          reading: { title: 'School Schedule', passage: 'आज सोमवार है। सुबह आठ बजे स्कूल शुरू होता है। पहला पीरियड गणित का है। दस बजे हिंदी की क्लास है। दोपहर बारह बजे खाने का समय है। दो बजे अंग्रेज़ी की क्लास है। तीन बजे स्कूल ख़त्म होता है।', translation: 'Today is Monday. School starts at eight in the morning. The first period is math. At ten there is Hindi class. At twelve noon it is lunchtime. At two there is English class. At three school ends.', questions: [
            { question: 'What day is it?', options: ['Sunday', 'Monday', 'Tuesday', 'Friday'], correct: 1, explanation: '"आज सोमवार है" = Today is Monday.' },
            { question: 'What time does school start?', options: ['7 AM', '8 AM', '9 AM', '10 AM'], correct: 1, explanation: '"सुबह आठ बजे" = At eight in the morning.' },
            { question: 'When is lunchtime?', options: ['11 AM', '12 PM', '1 PM', '2 PM'], correct: 1, explanation: '"दोपहर बारह बजे" = At twelve noon.' },
          ]},
          writing: { title: 'My Weekly Schedule', prompt: 'Write a weekly schedule in Hindi. For each day, write what time you do each activity using Hindi numbers and day names.', guidelines: ['Include all 7 days of the week in Hindi', 'Use time expressions (सुबह, दोपहर, शाम)', 'Write at least 2 activities per day'], tips: ['Day format: [दिन] को मैं [time] बजे [activity] करता/करती हूँ', 'Hindi time: [number] बजे = at [number] o\'clock'], wordTarget: 60 },
          speaking: { title: 'Time Conversations', scenario: 'Asking About Time', description: 'Practice asking and telling time in Hindi.', prompts: ['Ask "Abhi kitne baj rahe hain?" (What time is it now?)', 'Say "Teen baj rahe hain" (It is 3 o\'clock)', 'Ask "Aapki class kab hai?" (When is your class?)', 'Say "Meri class das baje hai" (My class is at 10)'], tips: ['Use "बज रहे हैं" for telling time', 'Use "बजे" when saying "at [time]"'] },
          pronunciation: { title: 'Aspiration Practice', focusSound: 'Aspirated vs Unaspirated', pairs: [['क (ka)', 'ख (kha)'], ['प (pa)', 'फ (pha)'], ['च (cha)', 'छ (chha)']], steps: ['Say "ka" without a puff of air', 'Now say "kha" with a strong puff of air', 'Hold your hand in front of your mouth — feel the difference', 'Practice: कल (kal=tomorrow) vs खल (khal=skin)'], tip: 'Hold a tissue in front of your mouth. Aspirated sounds (ख, घ, छ, झ, ठ, ढ, थ, ध, फ, भ) should make the tissue flutter. Unaspirated sounds should not.' },
          test: { title: 'Week 4 Quiz: Time & Days', timeLimit: 8, passingScore: 60, questions: [
            { type: 'mcq', question: '"शाम" means:', options: ['Morning', 'Afternoon', 'Evening', 'Night'], correct: 2, explanation: 'शाम (Shaam) means Evening.' },
            { type: 'fill', question: 'The Hindi word for "today" is _____.', answer: 'आज', hint: 'Starts with Aa', explanation: 'आज (Aaj) means Today.' },
            { type: 'mcq', question: 'Which day is "गुरुवार"?', options: ['Monday', 'Wednesday', 'Thursday', 'Friday'], correct: 2, explanation: 'गुरुवार = Thursday (named after Jupiter/Guru).' },
            { type: 'mcq', question: '"कल" can mean:', options: ['Only yesterday', 'Only tomorrow', 'Both yesterday and tomorrow', 'Today'], correct: 2, explanation: 'कल means both "yesterday" and "tomorrow" — context tells which.' },
          ]},
        },
      ],
      // Months 2-6 follow similar patterns — using default generator for now
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  SPANISH  (Español)
  // ═══════════════════════════════════════════════════════
  spanish: {
    meta: { script: 'Latin', wordOrder: 'SVO', greeting: '¡Hola!' },
    months: [
      [ // Month 1
        { // Week 1
          lesson: { title: 'Spanish Alphabet & Pronunciation', subtitle: 'Master the sounds of Spanish', sections: [
            { title: 'The Spanish Alphabet', icon: 'abc', content: 'Spanish uses the Latin alphabet with 27 letters — the 26 English letters plus Ñ (eñe). Good news: Spanish is one of the most phonetic languages! Each letter almost always makes the same sound, making reading much easier than English.', example: 'A (ah), B (beh), C (seh/theh), D (deh), E (eh), F (efeh)...' },
            { title: 'Key Sound Differences', icon: 'record_voice_over', content: 'Some Spanish sounds differ from English: J sounds like English "h" (jardín = har-DEEN), LL sounds like "y" (llamar = ya-MAR), Ñ sounds like "ny" (España = es-PAN-ya), RR is a rolled/trilled "r", H is always silent (hola = O-la).', example: '¡Hola! = O-la (the H is silent!) — this surprises many English speakers' },
            { title: 'Vowels Are Simple', icon: 'lightbulb', content: 'Spanish has only 5 vowel sounds (compared to 15+ in English): A = "ah", E = "eh", I = "ee", O = "oh", U = "oo". They NEVER change sound regardless of position. This is the #1 rule for good Spanish pronunciation.', example: 'casa (KAH-sah), mesa (MEH-sah), libro (LEE-broh) — pure vowel sounds!' },
          ], exercises: [
            { type: 'mcq', question: 'How many letters does the Spanish alphabet have?', options: ['24', '26', '27', '30'], correct: 2, explanation: 'Spanish has 27 letters — 26 + Ñ.' },
            { type: 'mcq', question: 'How is "H" pronounced in Spanish?', options: ['Like English H', 'Like J', 'It is silent', 'Like CH'], correct: 2, explanation: 'H is always silent in Spanish: hola = "ola".' },
            { type: 'fill', question: 'The Spanish letter Ñ sounds like "____" in English.', answer: 'ny', explanation: 'Ñ sounds like "ny" as in "canyon" (cañón).' },
          ], keyPoints: ['Spanish is highly phonetic — letters always sound the same', '5 pure vowels: A=ah, E=eh, I=ee, O=oh, U=oo', 'H is always silent', 'J sounds like English H'] },
          vocab: { title: 'Greetings & Basics', words: [
            { word: 'Hola', transliteration: 'OH-lah', meaning: 'Hello', example: '¡Hola! ¿Cómo estás? (Hello! How are you?)', category: 'Greetings' },
            { word: 'Adiós', transliteration: 'ah-DYOHS', meaning: 'Goodbye', example: '¡Adiós, hasta mañana! (Goodbye, see you tomorrow!)', category: 'Greetings' },
            { word: 'Por favor', transliteration: 'por fah-VOR', meaning: 'Please', example: 'Un café, por favor. (A coffee, please.)', category: 'Basics' },
            { word: 'Gracias', transliteration: 'GRAH-syahs', meaning: 'Thank you', example: '¡Muchas gracias! (Thank you very much!)', category: 'Basics' },
            { word: 'Sí', transliteration: 'see', meaning: 'Yes', example: 'Sí, me gusta. (Yes, I like it.)', category: 'Basics' },
            { word: 'No', transliteration: 'noh', meaning: 'No', example: 'No, gracias. (No, thank you.)', category: 'Basics' },
            { word: 'Buenos días', transliteration: 'BWEH-nohs DEE-ahs', meaning: 'Good morning', example: '¡Buenos días, señor! (Good morning, sir!)', category: 'Greetings' },
            { word: 'Buenas noches', transliteration: 'BWEH-nahs NOH-chehs', meaning: 'Good night', example: '¡Buenas noches! ¡Hasta mañana! (Good night! See you tomorrow!)', category: 'Greetings' },
            { word: 'Perdón', transliteration: 'pehr-DOHN', meaning: 'Excuse me / Sorry', example: 'Perdón, ¿dónde está el baño? (Excuse me, where is the bathroom?)', category: 'Basics' },
            { word: 'Agua', transliteration: 'AH-gwah', meaning: 'Water', example: 'Un vaso de agua, por favor. (A glass of water, please.)', category: 'Essentials' },
          ]},
          reading: { title: 'Meeting Someone', passage: '¡Hola! Me llamo María. Soy de España. Tengo veinticinco años. Vivo en Madrid con mi familia. Mi padre se llama Carlos y mi madre se llama Ana. Tengo un hermano que se llama Pedro. Él tiene veinte años. Somos una familia feliz.', translation: 'Hello! My name is María. I am from Spain. I am twenty-five years old. I live in Madrid with my family. My father is named Carlos and my mother is named Ana. I have a brother named Pedro. He is twenty years old. We are a happy family.', questions: [
            { question: 'Where is María from?', options: ['Mexico', 'Spain', 'Argentina', 'Colombia'], correct: 1, explanation: '"Soy de España" = I am from Spain.' },
            { question: 'How old is María?', options: ['20', '22', '25', '30'], correct: 2, explanation: '"Tengo veinticinco años" = I am 25 years old.' },
            { question: 'What is her brother\'s name?', options: ['Carlos', 'Pedro', 'Juan', 'Miguel'], correct: 1, explanation: '"un hermano que se llama Pedro" = a brother named Pedro.' },
          ]},
          writing: { title: 'Introduce Yourself', prompt: 'Write a self-introduction in Spanish. Include your name, where you are from, your age, and one thing about your family.', guidelines: ['Use "Me llamo..." for your name', 'Use "Soy de..." for your origin', 'Use "Tengo...años" for your age', 'Write at least 5 sentences'], tips: ['Keep sentences simple: Subject + Verb + Object', 'Spanish doesn\'t capitalize nationalities: soy americano'], wordTarget: 40 },
          speaking: { title: 'First Spanish Conversation', scenario: 'Meeting a Spanish Speaker', description: 'Practice basic greetings and introductions in Spanish.', prompts: ['Say "¡Hola! ¿Cómo estás?" (Hello! How are you?)', 'Say "Me llamo ___, mucho gusto" (My name is ___, nice to meet you)', 'Say "Soy de ___" (I am from ___)', 'Say "¡Adiós, hasta luego!" (Goodbye, see you later!)'], tips: ['Roll the R slightly in "gracias"', 'Spanish stress usually falls on the second-to-last syllable'] },
          pronunciation: { title: 'Spanish R & RR', focusSound: 'Single R vs Rolled RR', pairs: [['pero (but)', 'perro (dog)'], ['caro (expensive)', 'carro (car)'], ['cero (zero)', 'cerro (hill)']], steps: ['Say single R — a quick tap of tongue behind upper teeth', 'Say RR — a longer trill/roll of the tongue', 'Practice: pero (but) vs perro (dog)', 'Place tongue behind upper teeth and blow air'], tip: 'Single R is a quick tap (like the "tt" in American English "butter"). RR is a trill — place your tongue tip behind your upper teeth and let air vibrate it. "pero" (but) vs "perro" (dog) — the double R changes the meaning!' },
          test: { title: 'Week 1 Quiz: Spanish Basics', timeLimit: 8, passingScore: 60, questions: [
            { type: 'mcq', question: 'What does "Hola" mean?', options: ['Goodbye', 'Thank you', 'Hello', 'Please'], correct: 2, explanation: '¡Hola! means Hello in Spanish.' },
            { type: 'fill', question: '"Gracias" means _____.', answer: 'thank you', explanation: 'Gracias = Thank you.' },
            { type: 'mcq', question: 'How is "H" pronounced in Spanish?', options: ['Like English H', 'Silent', 'Like J', 'Like G'], correct: 1, explanation: 'H is always silent in Spanish.' },
            { type: 'mcq', question: '"Agua" means:', options: ['Food', 'Water', 'Milk', 'Juice'], correct: 1, explanation: 'Agua means Water.' },
            { type: 'mcq', question: 'How many vowel sounds does Spanish have?', options: ['3', '5', '7', '12'], correct: 1, explanation: 'Spanish has exactly 5 vowel sounds: a, e, i, o, u.' },
          ]},
        },
      ],
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  JAPANESE (日本語)
  // ═══════════════════════════════════════════════════════
  japanese: {
    meta: { script: 'Hiragana/Katakana/Kanji', wordOrder: 'SOV', greeting: 'こんにちは (Konnichiwa)' },
    months: [[ // Month 1
      { // Week 1
        lesson: { title: 'Hiragana: The First Script', subtitle: 'Learn the basic Japanese writing system', sections: [
          { title: 'Three Scripts', icon: 'translate', content: 'Japanese uses three scripts simultaneously: Hiragana (ひらがな) for native Japanese words, Katakana (カタカナ) for foreign words, and Kanji (漢字) — Chinese characters for content words. We start with Hiragana — the foundation of Japanese.', example: 'すし = sushi (Hiragana), コーヒー = coffee (Katakana), 山 = mountain (Kanji)' },
          { title: 'Vowels: あ い う え お', icon: 'record_voice_over', content: 'Japanese has 5 vowels, identical placement to Spanish: あ (a), い (i), う (u), え (e), お (o). These are pure sounds — "a" as in "father", "i" as in "ski", "u" as in "flute", "e" as in "pet", "o" as in "go".', example: 'あい (ai = love), うえ (ue = above), おい (oi = hey!)' },
          { title: 'First Consonant Row: か き く け こ', icon: 'school', content: 'Hiragana is organized in rows. The K-row: か(ka) き(ki) く(ku) け(ke) こ(ko). Each character = one syllable (not one letter). Japanese is a syllabic language!', example: 'かき (kaki = persimmon), くき (kuki = stem), ここ (koko = here)' },
        ], exercises: [
          { type: 'mcq', question: 'How many scripts does Japanese use?', options: ['1', '2', '3', '4'], correct: 2, explanation: 'Japanese uses three scripts: Hiragana, Katakana, and Kanji.' },
          { type: 'fill', question: 'The Hiragana character あ sounds like "____".', answer: 'a', explanation: 'あ = "a" as in "father".' },
          { type: 'mcq', question: 'Which script is used for foreign words?', options: ['Hiragana', 'Katakana', 'Kanji', 'Romaji'], correct: 1, explanation: 'Katakana (カタカナ) is used for foreign/borrowed words.' },
        ], keyPoints: ['Japanese uses 3 scripts: Hiragana, Katakana, Kanji', 'Hiragana is syllabic — each character = one syllable', '5 vowels: あ い う え お'] },
        vocab: { title: 'Essential Phrases', words: [
          { word: 'こんにちは', transliteration: 'Konnichiwa', meaning: 'Hello (daytime)', example: 'こんにちは、お元気ですか？ (Hello, how are you?)', category: 'Greetings' },
          { word: 'ありがとう', transliteration: 'Arigatou', meaning: 'Thank you', example: 'ありがとうございます (Thank you very much - polite)', category: 'Greetings' },
          { word: 'すみません', transliteration: 'Sumimasen', meaning: 'Excuse me / Sorry', example: 'すみません、トイレはどこですか？ (Excuse me, where is the toilet?)', category: 'Basics' },
          { word: 'はい', transliteration: 'Hai', meaning: 'Yes', example: 'はい、そうです (Yes, that\'s right)', category: 'Basics' },
          { word: 'いいえ', transliteration: 'Iie', meaning: 'No', example: 'いいえ、違います (No, that\'s wrong)', category: 'Basics' },
          { word: 'お水', transliteration: 'O-mizu', meaning: 'Water (polite)', example: 'お水をください (Water, please)', category: 'Essentials' },
          { word: '名前', transliteration: 'Namae', meaning: 'Name', example: '名前は何ですか？ (What is your name?)', category: 'Basics' },
          { word: 'さようなら', transliteration: 'Sayounara', meaning: 'Goodbye', example: 'さようなら、また明日 (Goodbye, see you tomorrow)', category: 'Greetings' },
          { word: 'おはよう', transliteration: 'Ohayou', meaning: 'Good morning', example: 'おはようございます (Good morning - polite)', category: 'Greetings' },
          { word: 'お願いします', transliteration: 'Onegaishimasu', meaning: 'Please', example: 'これ、お願いします (This one, please)', category: 'Basics' },
        ]},
        reading: { title: 'Self Introduction', passage: 'はじめまして。わたしのなまえはユキです。にほんじんです。とうきょうにすんでいます。だいがくせいです。にほんごとえいごをはなします。よろしくおねがいします。', translation: 'Nice to meet you. My name is Yuki. I am Japanese. I live in Tokyo. I am a university student. I speak Japanese and English. Please take care of me.', questions: [
          { question: 'Where does Yuki live?', options: ['Osaka', 'Tokyo', 'Kyoto', 'Hokkaido'], correct: 1, explanation: '"とうきょうにすんでいます" = lives in Tokyo.' },
          { question: 'What languages does Yuki speak?', options: ['Japanese only', 'Japanese and English', 'Japanese and Chinese', 'English only'], correct: 1, explanation: '"にほんごとえいごをはなします" = speaks Japanese and English.' },
        ]},
        writing: { title: 'Write Hiragana Vowels', prompt: 'Practice writing the 5 Hiragana vowels: あ い う え お. Write each one 3 times, then write 3 simple words using these vowels.', guidelines: ['Write each vowel: あ, い, う, え, お', 'Include the romanization next to each', 'Write 3 Japanese words you learned'], tips: ['Follow the correct stroke order', 'あ has 3 strokes, い has 2, う has 2, え has 2, お has 3'], wordTarget: 25 },
        speaking: { title: 'Japanese Greetings', scenario: 'First Meeting', description: 'Practice Japanese greetings with proper politeness levels.', prompts: ['Say "Konnichiwa" (Hello)', 'Say "Watashi no namae wa ___ desu" (My name is ___)', 'Say "Hajimemashite" (Nice to meet you)', 'Say "Yoroshiku onegaishimasu" (Please take care of me)'], tips: ['Bow slightly when greeting', 'Keep vowels short and crisp', 'Japanese has pitch accent, not stress accent'] },
        pronunciation: { title: 'Japanese Vowels', focusSound: 'Pure vowel sounds', pairs: [['あ (a) short', 'ああ (aa) long'], ['い (i) short', 'いい (ii) long'], ['う (u) short', 'うう (uu) long']], steps: ['Say each vowel clearly and crisply', 'Japanese vowels are "pure" — no diphthongs', 'Practice: おばさん (aunt) vs おばあさん (grandmother)', 'Long vowels double the length but not the sound'], tip: 'Japanese vowels are pure — don\'t add glides like English. "o" is just "oh", never "ow". Length matters: おばさん (obasan=aunt) vs おばあさん (obaasan=grandmother).' },
        test: { title: 'Week 1 Quiz: Hiragana Basics', timeLimit: 8, passingScore: 60, questions: [
          { type: 'mcq', question: '"ありがとう" means:', options: ['Hello', 'Goodbye', 'Thank you', 'Sorry'], correct: 2, explanation: 'ありがとう (Arigatou) = Thank you.' },
          { type: 'mcq', question: 'Which script is for foreign words?', options: ['Hiragana', 'Katakana', 'Kanji', 'Romaji'], correct: 1, explanation: 'Katakana is used for foreign/borrowed words.' },
          { type: 'fill', question: '"こんにちは" means _____ in English.', answer: 'hello', explanation: 'こんにちは (Konnichiwa) = Hello (daytime greeting).' },
          { type: 'mcq', question: 'How many vowels does Japanese have?', options: ['3', '5', '7', '10'], correct: 1, explanation: 'Japanese has 5 vowels: あ い う え お.' },
        ]},
      },
    ]],
  },

  // ═══════════════════════════════════════════════════════
  //  FRENCH (Français)
  // ═══════════════════════════════════════════════════════
  french: {
    meta: { script: 'Latin', wordOrder: 'SVO', greeting: 'Bonjour!' },
    months: [[ // Month 1
      { // Week 1
        lesson: { title: 'French Sounds & Pronunciation', subtitle: 'The music of the French language', sections: [
          { title: 'French Pronunciation Rules', icon: 'music_note', content: 'French is famous for its nasal vowels, silent letters, and smooth flowing sound called "liaison". Unlike English, French has consistent pronunciation rules — once you learn them, you can read any word! The final consonant of a word is usually silent: "Paris" = pa-REE, not "PA-ris".', example: 'chat (shah) = cat — the final "t" is silent!' },
          { title: 'Nasal Vowels', icon: 'record_voice_over', content: 'French has 4 nasal vowels that don\'t exist in English. They\'re made by letting air flow through your nose: AN/EN (ɑ̃), IN/AIN (ɛ̃), ON (ɔ̃), UN (œ̃). Examples: dans (in), vin (wine), bon (good), un (one).', example: 'bon-jour = bõ-ZHOOR — the "on" is nasal, don\'t pronounce the "n"!' },
          { title: 'Key Sound Differences', icon: 'lightbulb', content: 'R is guttural (back of throat, like gargling), U (as in "tu") is a sound between "oo" and "ee" — round your lips for "oo" but try to say "ee". The combination "oi" is pronounced "wa": moi = mwa.', example: 'R practice: rouge (roozh = red), rue (rü = street), rire (reer = laugh)' },
        ], exercises: [
          { type: 'mcq', question: 'How is the final "s" in "Paris" pronounced?', options: ['Like English S', 'Like Z', 'It is silent', 'Like SH'], correct: 2, explanation: 'Final consonants in French are usually silent: Paris = pa-REE.' },
          { type: 'fill', question: 'The French word "chat" means _____ in English.', answer: 'cat', explanation: 'Chat (shah) = cat. The final T is silent.' },
        ], keyPoints: ['Final consonants are usually silent', 'French has 4 nasal vowels', 'R is guttural (throat), not tongue-tapped', '"oi" = "wa" sound'] },
        vocab: { title: 'Essential French', words: [
          { word: 'Bonjour', transliteration: 'bõ-ZHOOR', meaning: 'Hello / Good day', example: 'Bonjour, comment allez-vous? (Hello, how are you?)', category: 'Greetings' },
          { word: 'Merci', transliteration: 'mehr-SEE', meaning: 'Thank you', example: 'Merci beaucoup! (Thank you very much!)', category: 'Basics' },
          { word: 'S\'il vous plaît', transliteration: 'seel voo PLEH', meaning: 'Please (formal)', example: 'Un café, s\'il vous plaît. (A coffee, please.)', category: 'Basics' },
          { word: 'Oui', transliteration: 'wee', meaning: 'Yes', example: 'Oui, je comprends. (Yes, I understand.)', category: 'Basics' },
          { word: 'Non', transliteration: 'nõ', meaning: 'No', example: 'Non, merci. (No, thank you.)', category: 'Basics' },
          { word: 'Au revoir', transliteration: 'oh ruh-VWAR', meaning: 'Goodbye', example: 'Au revoir, à demain! (Goodbye, see you tomorrow!)', category: 'Greetings' },
          { word: 'Excusez-moi', transliteration: 'ex-kü-ZAY mwa', meaning: 'Excuse me', example: 'Excusez-moi, où est la gare? (Excuse me, where is the station?)', category: 'Basics' },
          { word: 'Eau', transliteration: 'oh', meaning: 'Water', example: 'De l\'eau, s\'il vous plaît. (Some water, please.)', category: 'Essentials' },
          { word: 'Bonsoir', transliteration: 'bõ-SWAR', meaning: 'Good evening', example: 'Bonsoir, madame! (Good evening, ma\'am!)', category: 'Greetings' },
          { word: 'Je ne sais pas', transliteration: 'zhuh nuh SEH pah', meaning: 'I don\'t know', example: 'Je ne sais pas où c\'est. (I don\'t know where it is.)', category: 'Basics' },
        ]},
        reading: { title: 'Meeting in Paris', passage: 'Bonjour! Je m\'appelle Sophie. Je suis française. J\'habite à Paris. J\'ai vingt-trois ans. Je suis étudiante à l\'université. J\'aime la musique et les livres. Mon frère s\'appelle Thomas. Il a dix-huit ans.', translation: 'Hello! My name is Sophie. I am French. I live in Paris. I am twenty-three years old. I am a student at the university. I like music and books. My brother\'s name is Thomas. He is eighteen years old.', questions: [
          { question: 'Where does Sophie live?', options: ['Lyon', 'Paris', 'Marseille', 'Nice'], correct: 1, explanation: '"J\'habite à Paris" = I live in Paris.' },
          { question: 'What does Sophie like?', options: ['Sports and cooking', 'Music and books', 'Travel and food', 'Film and art'], correct: 1, explanation: '"J\'aime la musique et les livres" = I like music and books.' },
        ]},
        writing: { title: 'Introduce Yourself in French', prompt: 'Write a short self-introduction in French. Use "Je m\'appelle..." (My name is), "J\'habite à..." (I live in), and "J\'aime..." (I like).', guidelines: ['Include your name, age, and city', 'Mention at least 2 things you like', 'Write at least 5 sentences'], tips: ['French adjectives usually go after the noun: une maison grande', 'Use "J\'ai [number] ans" for age (literally "I have X years")'], wordTarget: 40 },
        speaking: { title: 'French Greetings', scenario: 'Café Conversation', description: 'Practice ordering and greeting in a French café.', prompts: ['Say "Bonjour, comment allez-vous?" (Hello, how are you?)', 'Say "Un café, s\'il vous plaît" (A coffee, please)', 'Say "Je m\'appelle ___" (My name is ___)', 'Say "Merci, au revoir!" (Thanks, goodbye!)'], tips: ['The French R is made in the throat, not with the tongue tip', 'Don\'t pronounce final consonants: "beaucoup" = boh-KOO'] },
        pronunciation: { title: 'French R & Nasal Vowels', focusSound: 'Guttural R', pairs: [['rue (street)', 'lu (read)'], ['bon (good, nasal)', 'beau (beautiful)'], ['vin (wine, nasal)', 'vie (life)']], steps: ['Gargle water — feel where the French R comes from', 'Now say "rouge" with that gargling feeling', 'For nasals: say "on" but don\'t let your tongue touch', 'Practice: bon (bõ, nasal) vs beau (boh, not nasal)'], tip: 'The French R comes from the back of your throat (uvula). Think of gargling! For nasal vowels, the air goes through your nose: "bon" — don\'t actually say the N, just nasalize the vowel.' },
        test: { title: 'Week 1 Quiz: French Basics', timeLimit: 8, passingScore: 60, questions: [
          { type: 'mcq', question: '"Bonjour" means:', options: ['Goodbye', 'Hello', 'Thank you', 'Please'], correct: 1, explanation: 'Bonjour = Hello / Good day.' },
          { type: 'fill', question: '"Merci" means _____.', answer: 'thank you', explanation: 'Merci = Thank you.' },
          { type: 'mcq', question: 'In French, final consonants are usually:', options: ['Emphasized', 'Silent', 'Doubled', 'Aspirated'], correct: 1, explanation: 'Final consonants in French are generally silent.' },
          { type: 'mcq', question: '"Eau" means:', options: ['Oil', 'Egg', 'Water', 'Air'], correct: 2, explanation: 'Eau (oh) = Water.' },
        ]},
      },
    ]],
  },
};

// Add stub entries for remaining languages — these use the generator below
['german', 'mandarin', 'korean', 'portuguese', 'italian', 'arabic', 'russian'].forEach(lang => {
  if (!CONTENT_DB[lang]) CONTENT_DB[lang] = { meta: {}, months: [] };
});


// ─────────────────────────────────────────────────────────────────────────────
//  DEFAULT CONTENT GENERATORS (for weeks/languages not yet hand-written)
// ─────────────────────────────────────────────────────────────────────────────

function getLanguageMeta(langId) {
  const meta = {
    hindi:      { script: 'Devanagari', greeting: 'Namaste', sample: ['नमस्ते','धन्यवाद','हाँ','नहीं'], wordOrder: 'SOV' },
    spanish:    { script: 'Latin', greeting: 'Hola', sample: ['Hola','Gracias','Sí','No'], wordOrder: 'SVO' },
    french:     { script: 'Latin', greeting: 'Bonjour', sample: ['Bonjour','Merci','Oui','Non'], wordOrder: 'SVO' },
    german:     { script: 'Latin', greeting: 'Hallo', sample: ['Hallo','Danke','Ja','Nein'], wordOrder: 'SVO/SOV' },
    japanese:   { script: 'Hiragana/Katakana/Kanji', greeting: 'Konnichiwa', sample: ['こんにちは','ありがとう','はい','いいえ'], wordOrder: 'SOV' },
    mandarin:   { script: 'Hanzi', greeting: 'Nǐ hǎo', sample: ['你好','谢谢','是','不'], wordOrder: 'SVO' },
    korean:     { script: 'Hangul', greeting: 'Annyeonghaseyo', sample: ['안녕하세요','감사합니다','네','아니요'], wordOrder: 'SOV' },
    portuguese: { script: 'Latin', greeting: 'Olá', sample: ['Olá','Obrigado','Sim','Não'], wordOrder: 'SVO' },
    italian:    { script: 'Latin', greeting: 'Ciao', sample: ['Ciao','Grazie','Sì','No'], wordOrder: 'SVO' },
    arabic:     { script: 'Arabic', greeting: 'Marhaba', sample: ['مرحبا','شكراً','نعم','لا'], wordOrder: 'VSO' },
    russian:    { script: 'Cyrillic', greeting: 'Privet', sample: ['Привет','Спасибо','Да','Нет'], wordOrder: 'SVO' },
  };
  return meta[langId] || meta.spanish;
}

function generateDefaultContent(langId, monthIdx, weekIdx) {
  const lang = LWData.getLanguage(langId);
  const langName = lang ? lang.name : 'Language';
  const meta = getLanguageMeta(langId);
  const weekNum = monthIdx * 4 + weekIdx + 1;
  const topics = [
    ['Script & Sounds','Basic Greetings','Numbers & Colors','Self-Introduction'],
    ['Present Tense','Common Verbs','Food & Dining','Directions & Places'],
    ['Past Tense','Shopping & Money','Weather & Seasons','Phone & Internet'],
    ['Future Tense','Health & Body','Travel & Transport','Hobbies & Sports'],
    ['Conditionals','Workplace','Culture & Customs','News & Media'],
    ['Advanced Grammar','Literature','Formal Writing','Review & Mastery'],
  ];
  const topic = (topics[monthIdx] && topics[monthIdx][weekIdx]) || `Week ${weekNum} Review`;

  return {
    lesson: {
      title: `${langName}: ${topic}`,
      subtitle: `Week ${weekNum} – ${topic} in ${langName}`,
      sections: [
        { title: 'Introduction', icon: 'school', content: `This week we study "${topic}" in ${langName}. ${langName} uses the ${meta.script} script and follows ${meta.wordOrder} word order. By the end of this lesson, you will be able to use these concepts in basic conversations.`, example: `The ${langName} greeting "${meta.greeting}" is one of the first things you\'ll learn.` },
        { title: 'Key Concepts', icon: 'lightbulb', content: `Let's explore the key concepts of ${topic}. Pay attention to patterns and practice each example aloud. Repetition is the key to fluency.`, example: `Practice: ${meta.sample.join(', ')}` },
        { title: 'Practice', icon: 'edit', content: `Now apply what you've learned. Try to use ${topic} in complete sentences. Don't worry about making mistakes — that's how we learn!`, example: `Try forming your own sentences using the vocabulary and grammar from this lesson.` },
      ],
      exercises: [
        { type: 'mcq', question: `What script does ${langName} use?`, options: ['Latin', meta.script, 'Cyrillic', 'Arabic'], correct: 1, explanation: `${langName} uses the ${meta.script} script.` },
        { type: 'mcq', question: `What is the ${langName} word order?`, options: ['SVO', 'SOV', 'VSO', meta.wordOrder], correct: 3, explanation: `${langName} follows ${meta.wordOrder} word order.` },
        { type: 'fill', question: `The ${langName} greeting is _____.`, answer: meta.greeting, explanation: `"${meta.greeting}" is how you say hello in ${langName}.` },
      ],
      keyPoints: [`${langName} uses ${meta.script} script`, `Word order: ${meta.wordOrder}`, `Greeting: ${meta.greeting}`],
    },
    vocab: {
      title: `${topic} Vocabulary`,
      words: meta.sample.map((w, i) => ({
        word: w, transliteration: '-', meaning: ['Hello/Greeting', 'Thank you', 'Yes', 'No'][i] || `Word ${i+1}`,
        example: `Usage of "${w}" in ${langName}.`, category: ['Greetings','Basics','Basics','Basics'][i] || 'General',
      })),
    },
    reading: {
      title: `${topic} – Reading`,
      passage: `This is a reading passage about ${topic} in ${langName}. Practice reading carefully and try to understand the main idea before checking the translation.`,
      translation: `(Translation will appear here)`,
      questions: [
        { question: `What is this passage about?`, options: [topic, 'Cooking', 'Sports', 'History'], correct: 0, explanation: `This passage is about ${topic}.` },
      ],
    },
    writing: {
      title: `${topic} – Writing`, prompt: `Write 3-5 sentences about ${topic} using vocabulary and grammar you have learned so far.`,
      guidelines: ['Use vocabulary from this week', 'Write at least 3 sentences', 'Try to use correct grammar'], tips: ['Start with simple sentences', `Review this week's vocabulary before writing`], wordTarget: 30,
    },
    speaking: {
      title: `${topic} – Speaking`, scenario: `Discussing ${topic}`, description: `Practice speaking about ${topic} in ${langName}.`,
      prompts: [`Say the greeting: "${meta.greeting}"`, `Introduce yourself in ${langName}`, `Ask a question related to ${topic}`, `Thank someone: "${meta.sample[1]}"`],
      tips: ['Speak slowly and clearly', 'Focus on pronunciation of new sounds'],
    },
    pronunciation: {
      title: `${langName} Sound Practice`, focusSound: `Key ${langName} sounds`,
      pairs: [[meta.sample[0], meta.sample[1]], [meta.sample[2], meta.sample[3]]],
      steps: ['Listen to each sound carefully', 'Repeat after the model', 'Record yourself and compare', 'Practice in pairs'],
      tip: `Focus on sounds that are unique to ${langName} and don't exist in English. Practice daily for best results.`,
    },
    test: {
      title: `Week ${weekNum} Quiz`, timeLimit: 8, passingScore: 60,
      questions: [
        { type: 'mcq', question: `What does "${meta.greeting}" mean?`, options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'], correct: 1, explanation: `"${meta.greeting}" is the ${langName} greeting.` },
        { type: 'mcq', question: `${langName} uses which script?`, options: ['Latin', 'Cyrillic', meta.script, 'Arabic'], correct: 2, explanation: `${langName} uses ${meta.script}.` },
        { type: 'fill', question: `"${meta.sample[1]}" means _____ in English.`, answer: 'thank you', explanation: `"${meta.sample[1]}" = Thank you in ${langName}.` },
      ],
    },
  };
}


// ─────────────────────────────────────────────────────────────────────────────
//  CONTENT LOOKUP ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function findActivityInfo(langId, activityId) {
  const monthData = LWData.getActivities(langId);
  if (!monthData) return null;
  for (let m = 0; m < monthData.length; m++) {
    const month = monthData[m];
    for (let a = 0; a < month.activities.length; a++) {
      if (month.activities[a].id === activityId) {
        const act = month.activities[a];
        const weekIdx = typeof act.week === 'number' ? act.week - 1 : 0;
        return { monthIdx: m, weekIdx, activity: act };
      }
    }
  }
  return null;
}

function getContentForWeek(langId, monthIdx, weekIdx) {
  const db = CONTENT_DB[langId];
  if (db && db.months[monthIdx] && db.months[monthIdx][weekIdx]) {
    return db.months[monthIdx][weekIdx];
  }
  return generateDefaultContent(langId, monthIdx, weekIdx);
}


// ─────────────────────────────────────────────────────────────────────────────
//  PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

window.LWContent = {

  getActivityContent(langId, activityId) {
    const info = findActivityInfo(langId, activityId);
    if (!info) return null;

    const { monthIdx, weekIdx, activity } = info;
    const weekContent = getContentForWeek(langId, monthIdx, weekIdx);
    const actType = activity.type;

    // Map activity type to content
    const typeMap = { lesson:'lesson', vocab:'vocab', reading:'reading', writing:'writing',
      speaking:'speaking', pronunciation:'pronunciation', test:'test', listening:'speaking' };

    const contentKey = typeMap[actType];
    if (!contentKey || !weekContent[contentKey]) return null;

    const data = { ...weekContent[contentKey] };

    // Inject XP and duration from roadmap data
    data.xp = data.xp || activity.xp || 30;
    data.duration = data.duration || activity.duration || '10 min';
    data.color = data.color || (LWData.ACTIVITY_TYPES[actType]?.color) || '#5b4fcf';
    if (!data.summary) data.summary = `Great job completing this ${actType} activity!`;

    return { type: actType, data };
  },

  getPageForType(type) {
    const pages = {
      lesson: 'activity-lesson.html', vocab: 'activity-vocab.html',
      reading: 'activity-reading.html', writing: 'activity-writing.html',
      speaking: 'activity-speaking.html', pronunciation: 'activity-pronunciation.html',
      test: 'activity-test.html', listening: 'activity-speaking.html',
    };
    return pages[type] || 'activity-lesson.html';
  },
};
