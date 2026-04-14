/**
 * LearnWise Roadmap Data
 * Comprehensive language learning roadmap.
 * Each month has 20-24 activities: lessons, vocab, reading, writing, listening, pronunciation, tests.
 * Final month exam worth 500 XP / 100 marks.
 */

const LW_MONTHS_META = [
  { id:1, title:"Sound Foundation & Survival Basics",      color:"#5b4fcf", bgColor:"#f5f3ff", icon:"volume_up",       emoji:"🔤" },
  { id:2, title:"Sentence Building & Core Grammar",        color:"#0ea5e9", bgColor:"#e0f2fe", icon:"account_tree",    emoji:"🏗️" },
  { id:3, title:"Functional Communication",                color:"#10b981", bgColor:"#d1fae5", icon:"chat",            emoji:"💬" },
  { id:4, title:"Intermediate Fluency & Culture",          color:"#f59e0b", bgColor:"#fef3c7", icon:"groups",          emoji:"🌟" },
  { id:5, title:"Advanced Expression & Immersion",         color:"#ef4444", bgColor:"#fee2e2", icon:"auto_stories",    emoji:"📖" },
  { id:6, title:"Mastery & Certification",                 color:"#8b5cf6", bgColor:"#ede9fe", icon:"military_tech",   emoji:"🏆" },
];

const ACTIVITY_TYPES = {
  lesson:      { icon:"school",         label:"Lesson",        color:"#5b4fcf", xp:30  },
  vocab:       { icon:"abc",            label:"Vocabulary",    color:"#0ea5e9", xp:20  },
  reading:     { icon:"menu_book",      label:"Reading",       color:"#10b981", xp:25  },
  writing:     { icon:"edit_note",      label:"Writing",       color:"#f59e0b", xp:35  },
  listening:   { icon:"hearing",        label:"Listening",     color:"#06b6d4", xp:25  },
  pronunciation:{ icon:"record_voice_over", label:"Pronunciation", color:"#ec4899", xp:30 },
  test:        { icon:"quiz",           label:"Quick Test",    color:"#ef4444", xp:50  },
  speaking:    { icon:"mic",            label:"Speaking",      color:"#8b5cf6", xp:35  },
  milestone:   { icon:"workspace_premium", label:"Milestone",  color:"#f59e0b", xp:100 },
  final_exam:  { icon:"military_tech",  label:"Final Exam",    color:"#dc2626", xp:500 },
};

/**
 * Generate a full month of activities (20-24 per month).
 * Pattern per week (6 weeks per month):
 *   Mon: lesson | Tue: vocab | Wed: reading/writing | Thu: pronunciation | Fri: listening | Sat: test | milestone at week end
 */
function generateMonthActivities(monthIdx, langContent) {
  const activities = [];
  const weeksInMonth = 4;
  let id = monthIdx * 100 + 1;

  for (let w = 0; w < weeksInMonth; w++) {
    const weekLabel = `Week ${monthIdx * 4 + w + 1}`;
    const lc = langContent[w] || langContent[0];

    // Day 1: Core Lesson
    activities.push({ id: id++, type:'lesson', week:w+1, day:1, weekLabel,
      title: lc.lessonTitle || `Core Lesson ${w+1}`,
      description: lc.lessonDesc || `Master core concepts for week ${w+1}.`,
      duration:'15 min', xp:30, completed:false, locked: id > monthIdx*100+2 });

    // Day 2: Vocabulary
    activities.push({ id: id++, type:'vocab', week:w+1, day:2, weekLabel,
      title: lc.vocabTitle || `Vocabulary Set ${w+1}`,
      description: lc.vocabDesc || `Learn 25 new words with spaced repetition and flashcards.`,
      duration:'10 min', xp:20, wordCount:25, completed:false, locked:true });

    // Day 3: Reading
    activities.push({ id: id++, type:'reading', week:w+1, day:3, weekLabel,
      title: lc.readingTitle || `Reading Practice ${w+1}`,
      description: lc.readingDesc || `Read a passage and answer comprehension questions.`,
      duration:'12 min', xp:25, completed:false, locked:true });

    // Day 4: Pronunciation
    activities.push({ id: id++, type:'pronunciation', week:w+1, day:4, weekLabel,
      title: lc.pronTitle || `Pronunciation Drill ${w+1}`,
      description: lc.pronDesc || `Practice difficult sounds with AI speech recognition feedback.`,
      duration:'10 min', xp:30, completed:false, locked:true });

    // Day 5: Writing
    activities.push({ id: id++, type:'writing', week:w+1, day:5, weekLabel,
      title: lc.writingTitle || `Writing Exercise ${w+1}`,
      description: lc.writingDesc || `Write a short paragraph using this week's vocabulary and grammar.`,
      duration:'15 min', xp:35, completed:false, locked:true });

    // Day 6: Listening
    activities.push({ id: id++, type:'listening', week:w+1, day:6, weekLabel,
      title: lc.listenTitle || `Listening Drill ${w+1}`,
      description: lc.listenDesc || `Listen to native speaker audio and answer comprehension questions.`,
      duration:'10 min', xp:25, completed:false, locked:true });

    // Day 7: Quick Test (twice per week effectively - also midweek for month 2+)
    activities.push({ id: id++, type:'test', week:w+1, day:7, weekLabel,
      title: `Week ${monthIdx * 4 + w + 1} Quiz`,
      description: `Test your knowledge from this week: vocab, grammar, and listening. 10 questions.`,
      duration:'8 min', xp:50, questions:10, completed:false, locked:true });

    // Extra activities for fuller months
    // Midweek speaking
    activities.push({ id: id++, type:'speaking', week:w+1, day:3.5, weekLabel,
      title: lc.speakingTitle || `Speaking Practice ${w+1}`,
      description: lc.speakingDesc || `Role-play a conversation with our AI language partner.`,
      duration:'12 min', xp:35, completed:false, locked:true });

    // Extra vocab or reading at week-end
    if (w % 2 === 0) {
      activities.push({ id: id++, type:'vocab', week:w+1, day:4.5, weekLabel,
        title: `Vocabulary Review ${w+1}`,
        description:`Review and reinforce all words from the week using smart flashcards.`,
        duration:'8 min', xp:20, completed:false, locked:true });
    } else {
      activities.push({ id: id++, type:'reading', week:w+1, day:4.5, weekLabel,
        title: `Extended Reading ${w+1}`,
        description:`Read a longer cultural article and identify key vocabulary in context.`,
        duration:'15 min', xp:30, completed:false, locked:true });
    }

    // Extra pronunciation check
    activities.push({ id: id++, type:'pronunciation', week:w+1, day:5.5, weekLabel,
      title: `Tone & Accent Practice ${w+1}`,
      description:`Focus on intonation, rhythm and accent patterns with shadowing exercises.`,
      duration:'10 min', xp:30, completed:false, locked:true });

    // Mid-month test (at week 2 and 3)
    if (w === 1 || w === 2) {
      activities.push({ id: id++, type:'test', week:w+1, day:6.5, weekLabel:`Mini-Exam`,
        title: `Month ${monthIdx + 1} Mid-Check (${w === 1 ? 'Part 1' : 'Part 2'})`,
        description:`Comprehensive review of all skills so far this month: reading, writing, vocab and listening. 20 questions.`,
        duration:'15 min', xp:75, questions:20, isMidTest:true, completed:false, locked:true });
    }
  }

  // Monthly Milestone
  activities.push({ id: id++, type:'milestone', week:'milestone', day:0, weekLabel:'Milestone',
    title: `Month ${monthIdx + 1} Milestone`,
    description:`You've completed all ${monthIdx===5?'6 months':'this month\'s'} activities! Claim your badge and unlock the next level.`,
    duration:'—', xp:100, completed:false, locked:true, isMilestone:true });

  // Final Exam (last month only)
  if (monthIdx === 5) {
    activities.push({ id: id++, type:'final_exam', week:'final', day:0, weekLabel:'FINAL',
      title: `🏆 Final Certification Exam`,
      description:`Comprehensive examination covering all 6 months: writing (25 marks), pronunciation (20 marks), vocabulary (20 marks), listening (15 marks), Q&A (20 marks). Total: 100 marks.`,
      duration:'45 min', xp:500, totalMarks:100, completed:false, locked:true, isFinalExam:true });
  }

  return activities;
}

// ─────────────────────────────────────────────────────────────────────────────
// LANGUAGE CONTENT TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

const LANG_CONTENT = {

  hindi: {
    months: [
      // Month 1
      [
        { lessonTitle:"Hindi Sounds & Devanagari Script", lessonDesc:"Learn the 46 Devanagari letters (vowels + consonants). Practice each letter's shape and sound. Understand aspirated vs unaspirated stops.",
          vocabTitle:"Family & Greetings Vocabulary", vocabDesc:"Learn: Namaste, Shukriya, Haan/Nahin, main, tum, aap, woh. 25 essential greetings and pronouns.",
          readingTitle:"Simple Hindi Signs & Labels", readingDesc:"Read common shop signs, labels, and basic sentences in Devanagari. Identify letters you've learned.",
          writingTitle:"Writing Devanagari Letters", writingDesc:"Practice writing all vowels (swar) and 15 consonants (vyanjan) in correct stroke order.",
          listenTitle:"Native Speaker Greetings", listenDesc:"Listen to 5 native speakers greeting each other in various formal and informal contexts.",
          pronTitle:"Retroflex & Aspirated Sounds", pronDesc:"Practice the uniquely Indian retroflex sounds: ट,ठ,ड,ढ and the aspirated pairs: ख,घ,छ,झ.",
          speakingTitle:"Introduce Yourself", speakingDesc:"Practice: 'Mera naam ___ hai. Main ___ se hoon.' with AI feedback on pronunciation." },
        { lessonTitle:"Matras & Vowel Diacritics", lessonDesc:"Master all 11 vowel diacritics (matras) that attach to consonants. Write your first 50 Hindi words correctly.",
          vocabTitle:"Numbers 1-50 & Colors", vocabDesc:"ek se pachaas tak. Rango ke naam: laal, neela, hara, peela, safed, kala. 25 number-related words.",
          readingTitle:"Simple Number Stories", readingDesc:"Read a short story using numbers: ages, prices, phone numbers written in Devanagari.",
          writingTitle:"Write Number Sentences", writingDesc:"Write 10 sentences using numbers, ages, and descriptions in Devanagari script.",
          listenTitle:"Counting & Shopping Dialogues", listenDesc:"Listen to market conversations involving numbers and prices.",
          pronTitle:"Hindi Vowel Sounds", pronDesc:"Practice the difference between short and long vowel sounds: अ/आ, इ/ई, उ/ऊ.",
          speakingTitle:"Count & Describe", speakingDesc:"Practice counting objects and describing their colors in Hindi with AI partner." },
        { lessonTitle:"Greetings & Self-Introduction", lessonDesc:"Master namaste, namaskar, salaam. Learn pronouns: main, tum, aap, yeh, woh. Formal vs informal speech register.",
          vocabTitle:"Daily Life Vocabulary", vocabDesc:"Food, home items, transport, weather: 25 everyday words. Ghar, roti, pani, gaadi, mausam...",
          readingTitle:"A Day in Delhi", readingDesc:"Read a short bilingual story about a day in Delhi with Devanagari and transliteration.",
          writingTitle:"My Daily Routine", writingDesc:"Write 5-8 sentences about your daily routine using present tense verbs.",
          listenTitle:"Street Conversations", listenDesc:"Listen to short conversations asking for directions and buying chai.",
          pronTitle:"Retroflex Drill - 3", pronDesc:"Deep practice of ट,ठ,ड,ढ,ण with minimal pair comparisons to dental sounds.",
          speakingTitle:"Ask & Answer Questions", speakingDesc:"Practice question-answer pairs: 'Aap kahan se hain? Aapka naam kya hai?'" },
        { lessonTitle:"Numbers, Time & Days", lessonDesc:"Numbers 1-1000, telling time in Hindi, days of week (Somvaar to Ravivaar), months.",
          vocabTitle:"Time & Schedule Words", vocabDesc:"Subah, dophar, shaam, raat, kal, aaj, parso. 25 time-related vocabulary items.",
          readingTitle:"Daily Schedule Reading", readingDesc:"Read a school/work timetable written in Hindi. Identify times and activities.",
          writingTitle:"My Weekly Schedule", writingDesc:"Write a schedule for a week: when you wake up, eat, work, sleep.",
          listenTitle:"Telling Time - Audio Drills", listenDesc:"Listen to announcements with times (train times, appointments) and note them down.",
          pronTitle:"Nasal Sounds & Anusvara", pronDesc:"Practice nasal sounds: अनुस्वार (ं) and anunasika (ँ) with proper nasalization.",
          speakingTitle:"Time Conversations", speakingDesc:"Role-play: 'Abhi kitne baje hain? Aapki class kab hai?' with AI partner." },
      ],
      // Month 2
      [
        { lessonTitle:"Present Tense & SOV Word Order", lessonDesc:"Master Subject-Object-Verb order unique to Hindi. Conjugate 'hona' (to be) and 'karna' (to do) in present tense.",
          vocabTitle:"Action Verbs - Set 1", vocabDesc:"25 common verbs: khaana, peena, jaana, aana, dekhna, sunna, bolna, likhna, padhna, sona...",
          readingTitle:"Simple Present Tense Paragraphs", readingDesc:"Read a diary entry written in simple present tense. Identify all verbs.",
          writingTitle:"Describe Your Day", writingDesc:"Write 8-10 sentences describing what you do every day using present tense.",
          listenTitle:"Present Tense Conversations", listenDesc:"Listen to two friends discussing their daily habits and activities.",
          pronTitle:"Syllable Stress in Hindi", pronDesc:"Practice correct syllable stress patterns. Hindi stress differs from English significantly.",
          speakingTitle:"Talk About Habits", speakingDesc:"Describe your daily habits: what you eat, where you go, what you like." },
        { lessonTitle:"Gender & Noun Agreement", lessonDesc:"Every Hindi noun has gender. Learn masculine/feminine patterns (-aa vs -ii endings). Adjective agreement with noun gender.",
          vocabTitle:"Adjectives & Descriptions", vocabDesc:"25 adjectives that change with gender: bada/badi, accha/acchi, lamba/lambi, sundar...",
          readingTitle:"Describing People & Places", readingDesc:"Read descriptive passages about people and places. Identify gender agreement patterns.",
          writingTitle:"Describe a Person", writingDesc:"Write a description of a family member using correct gender agreement for all adjectives.",
          listenTitle:"Description Dialogues", listenDesc:"Listen to someone describing their house, their family members with adjectives.",
          pronTitle:"Gender-Based Pronunciation Changes", pronDesc:"Practice how word endings change sound with gender: chota→choti, kala→kali.",
          speakingTitle:"Describe Your Family", speakingDesc:"Describe 3 family members using correct adjective agreement with AI corrections." },
        { lessonTitle:"Postpositions & Pronouns", lessonDesc:"Hindi uses postpositions (ne, ko, se, mein, par, ka/ke/ki) instead of prepositions. Oblique case.",
          vocabTitle:"Location & Direction Words", vocabDesc:"25 direction/location words: upar, neeche, andar, bahar, paas, door, seedha, left, right...",
          readingTitle:"Directions Story", readingDesc:"Read a short story about someone navigating a city using postpositions.",
          writingTitle:"Write Directions", writingDesc:"Write step-by-step directions from your home to a nearby place using postpositions.",
          listenTitle:"Asking for Directions", listenDesc:"Listen to 4 conversations: someone asking for directions in different areas.",
          pronTitle:"Schwa Deletion Rule", pronDesc:"Learn the crucial schwa deletion rule: when the 'a' sound disappears in Hindi words.",
          speakingTitle:"Give Directions", speakingDesc:"Role-play giving directions to your AI partner who is lost in your city." },
        { lessonTitle:"Questions & Negations", lessonDesc:"Form questions with kya, kahan, kab, kyun, kaun, kaise, kitna. Negate with nahin/mat. Indirect questions.",
          vocabTitle:"Question Words & Negation", vocabDesc:"25 question and negation words with example sentences for each.",
          readingTitle:"Interview & Q&A Text", readingDesc:"Read an interview format text. Practice understanding question-answer patterns.",
          writingTitle:"Write an Interview", writingDesc:"Write a 10-question interview with answers about a fictional person's life.",
          listenTitle:"Question Intonation Drills", listenDesc:"Listen to questions with different intonation patterns: yes/no vs wh-questions.",
          pronTitle:"Question Intonation", pronDesc:"Practice rising intonation for yes/no questions vs falling for wh-questions in Hindi.",
          speakingTitle:"20 Questions Game", speakingDesc:"Play 20 questions in Hindi with AI. Practice forming varied questions." },
      ],
      // Month 3
      [
        { lessonTitle:"Past & Future Tenses", lessonDesc:"Past simple: -a/-i/-e verb endings. Habitual past vs completed past. Future tense with -ga/-gi/-ge endings.",
          vocabTitle:"Time Expression Vocabulary", vocabDesc:"25 time expressions: kal, parso, pichle hafte, agli baar, kabhi, hamesha, aksar...",
          readingTitle:"A Short Story in Past Tense", readingDesc:"Read a traditional Hindi folk tale written in simple past tense.",
          writingTitle:"Write About Yesterday", writingDesc:"Write 10 sentences about what you did yesterday using past tense forms.",
          listenTitle:"Story Narration", listenDesc:"Listen to someone narrating their journey or childhood memory in past tense.",
          pronTitle:"Verb Ending Pronunciation", pronDesc:"Practice the subtle pronunciation difference between -a (masc), -i (fem), -e (plural) endings.",
          speakingTitle:"Tell Your Story", speakingDesc:"Tell AI about your weekend in past tense. Practice fluent narration." },
        { lessonTitle:"Travel & Transport Vocabulary", lessonDesc:"Book train tickets (railgaadi), navigate airports, public transport. Conditional sentences for travel.",
          vocabTitle:"Travel & Transport Words", vocabDesc:"25 essential travel words: ticket, platform, station, bus, auto-rickshaw, driver, fare...",
          readingTitle:"A Railway Timetable", readingDesc:"Read an Indian railway timetable and answer questions about departure times and platforms.",
          writingTitle:"Write a Travel Plan", writingDesc:"Plan a 3-day trip to a Hindi-speaking city. Write the itinerary in Hindi.",
          listenTitle:"Airport & Station Announcements", listenDesc:"Listen to Hindi public announcement audio from airports and train stations.",
          pronTitle:"Long vs Short Vowels in Context", pronDesc:"Practice minimal pairs in travel vocabulary: gali/gaali, pal/paal with native speaker models.",
          speakingTitle:"Book a Train Ticket", speakingDesc:"Role-play booking a train ticket from Delhi to Mumbai with AI as the booking agent." },
        { lessonTitle:"Food, Shopping & Bargaining", lessonDesc:"Order at a dhaba, shop at a bazaar, negotiate prices. Imperative mood for requests.",
          vocabTitle:"Food & Market Vocabulary", vocabDesc:"25 food and shopping words: sabzi, dal, roti, chai, tarkari, bhav, sasta, mahanga, lena/dena...",
          readingTitle:"A Restaurant Menu", readingDesc:"Read an authentic Hindi restaurant menu. Practice understanding dish names and prices.",
          writingTitle:"Write a Shopping List", writingDesc:"Write a detailed shopping list with quantities, items, and price estimates in Hindi.",
          listenTitle:"Bazaar Bargaining", listenDesc:"Listen to 3 authentic bargaining conversations at a vegetable market and cloth store.",
          pronTitle:"Retroflex in Daily Speech", pronDesc:"Focus on retroflex sounds as they appear naturally in food and market vocabulary.",
          speakingTitle:"At the Market", speakingDesc:"Role-play buying vegetables and bargaining for a good price with AI shopkeeper." },
        { lessonTitle:"Family, Relationships & Emotions", lessonDesc:"India's extensive kinship vocabulary: daada, naana, chacha, maama, bhabhi. Express emotions.",
          vocabTitle:"Family & Emotion Words", vocabDesc:"25 kinship terms and emotion words: khushi, dukh, gussa, darr, pyaar, nafrat...",
          readingTitle:"A Family Letter", readingDesc:"Read a heartfelt letter from a grandmother to her grandchildren in simple Hindi.",
          writingTitle:"Write About Your Family", writingDesc:"Write a 1-page description of your family, relationships, and what they mean to you.",
          listenTitle:"Family Conversations", listenDesc:"Listen to a family gathering conversation with multiple speakers and various relationships.",
          pronTitle:"Emotional Intonation", pronDesc:"Learn how emotions change intonation patterns in Hindi speech. Practice joyful vs sad delivery.",
          speakingTitle:"My Family Portrait", speakingDesc:"Describe your family to AI, discussing relationships and fond memories." },
      ],
      // Month 4
      [
        { lessonTitle:"Compound Verbs & Aspect", lessonDesc:"Hindi's rich system of compound verbs: chalte rehna, kha lena, bol dena. Progressive aspect (raha/rahi).",
          vocabTitle:"Advanced Verb Phrases", vocabDesc:"25 compound verb phrases used in everyday speech.",
          readingTitle:"Newspaper Article", readingDesc:"Read a simplified Hindi newspaper article on a current topic. Identify complex verb forms.",
          writingTitle:"Essay: My Goals", writingDesc:"Write a 200-word essay about your goals using compound verbs and future tense.",
          listenTitle:"News Broadcast Excerpt", listenDesc:"Listen to a 2-minute Hindi news broadcast and summarize key points.",
          pronTitle:"Connected Speech Patterns", pronDesc:"Practice how sounds change when words run together in natural conversational Hindi.",
          speakingTitle:"Debate Your Opinion", speakingDesc:"Discuss a social topic with AI, defending your position using advanced phrases." },
        { lessonTitle:"Hindi Culture & Festivals", lessonDesc:"Language of Diwali, Holi, Eid, Navratri. Honorifics (-ji), code-switching, Bollywood expressions.",
          vocabTitle:"Festival & Culture Vocabulary", vocabDesc:"25 cultural terms: tyohaar, prasad, aarti, mehendi, baraat, tilak, rangoli...",
          readingTitle:"A Festival Description", readingDesc:"Read a detailed description of Diwali celebrations and their cultural significance.",
          writingTitle:"Describe a Festival", writingDesc:"Write about a festival you love or find interesting, using rich cultural vocabulary.",
          listenTitle:"Bollywood Song Analysis", listenDesc:"Listen to a classic Bollywood song. Identify vocabulary, idioms and cultural references.",
          pronTitle:"Poetic Hindi Pronunciation", pronDesc:"Practice the elevated, formal pronunciation used in poetry and formal speeches.",
          speakingTitle:"Tell Me About Your Culture", speakingDesc:"Discuss your own culture's festivals and compare with Indian traditions in Hindi." },
        { lessonTitle:"Subjunctive & Conditional Mood", lessonDesc:"Express doubt, wishes, conditions: agar...to. Subjunctive for polite requests. Complex sentences.",
          vocabTitle:"Conditional & Subjunctive Phrases", vocabDesc:"25 expressions using subjunctive/conditional: agar, shayad, chahiye, hota to...",
          readingTitle:"Hypothetical Scenarios", readingDesc:"Read dialogues discussing hypothetical situations using conditional sentences.",
          writingTitle:"Write Conditional Scenarios", writingDesc:"Write 5 conditional sentences about different life scenarios: 'If I were rich...'",
          listenTitle:"Complex Dialogues", listenDesc:"Listen to native speakers having nuanced conversations using conditional and subjunctive forms.",
          pronTitle:"Formal vs Informal Register", pronDesc:"Practice speaking in formal register (aap) vs informal (tum/tu) with appropriate pronunciation.",
          speakingTitle:"What Would You Do?", speakingDesc:"Discuss hypothetical scenarios with AI using conditional forms naturally." },
        { lessonTitle:"Professional Hindi & Presentations", lessonDesc:"Business Hindi, office vocabulary, making presentations, professional communication.",
          vocabTitle:"Professional Vocabulary", vocabDesc:"25 professional Hindi terms: kaaryalay, prastuti, niti, anubandh, vetan...",
          readingTitle:"Business Email", readingDesc:"Read a formal business email in Hindi. Understand professional courtesy expressions.",
          writingTitle:"Write a Formal Email", writingDesc:"Write a formal professional email in Hindi using appropriate honorifics and language.",
          listenTitle:"Office Conversations", listenDesc:"Listen to professional discussions about projects, deadlines and presentations.",
          pronTitle:"Presentation Delivery", pronDesc:"Practice clear, authoritative delivery for presentations with proper pacing and emphasis.",
          speakingTitle:"Give a Mini-Presentation", speakingDesc:"Present a 2-minute topic in Hindi to your AI audience on any subject." },
      ],
      // Month 5
      [
        { lessonTitle:"Advanced Reading: Literature", lessonDesc:"Engage with simplified Hindi literature: stories by Premchand, poetry by Kabir. Literary devices.",
          vocabTitle:"Literary & Expressive Vocabulary", vocabDesc:"25 literary terms and expressive words from classic Hindi literature.",
          readingTitle:"Premchand Short Story", readingDesc:"Read an adapted Premchand story (Bade Ghar Ki Beti or similar) with comprehension questions.",
          writingTitle:"Literary Analysis", writingDesc:"Write a short analysis of a Hindi poem, discussing themes and use of language.",
          listenTitle:"Poetry Recitation", listenDesc:"Listen to professional recitation of Kabir ke Dohe and Mirabai's bhajans.",
          pronTitle:"Poetic Rhythm & Meter", pronDesc:"Learn the rhythmic patterns in Hindi poetry (avanaddhaa chhanda) and practice recitation.",
          speakingTitle:"Discuss Literature", speakingDesc:"Discuss the themes and meaning of a Hindi poem or story with your AI partner." },
        { lessonTitle:"Hindi Media: Film, Music & News", lessonDesc:"Advanced comprehension through media immersion. Film dialogue analysis, song lyrics, news.",
          vocabTitle:"Media & Entertainment Vocabulary", vocabDesc:"25 words related to cinema, music, journalism and social media.",
          readingTitle:"Film Review", readingDesc:"Read a Hindi film review. Identify critical vocabulary and the reviewer's opinion.",
          writingTitle:"Write a Review", writingDesc:"Write your own review of a film or book in Hindi using critical language.",
          listenTitle:"Full Song Comprehension", listenDesc:"Listen to a Hindi film song 3 times. Transcribe lyrics and explain meaning.",
          pronTitle:"Acting & Expression", pronDesc:"Practice dramatic delivery with emphasis and emotion as seen in Bollywood films.",
          speakingTitle:"Film Discussion", speakingDesc:"Discuss your favorite Hindi film with AI: plot, characters, themes and acting." },
        { lessonTitle:"Idiomatic Expressions & Proverbs", lessonDesc:"Learn common Hindi idioms (muhavare) and proverbs (kahavat). Use them naturally in speech.",
          vocabTitle:"Idioms & Proverbs Collection", vocabDesc:"25 common Hindi muhavare: 'aankhon ki puttli', 'naak mein dum', 'chand se chehra'...",
          readingTitle:"Story Using Idioms", readingDesc:"Read a conversation-heavy story that uses 10+ idioms. Infer meaning from context.",
          writingTitle:"Write Using Idioms", writingDesc:"Write a short story or dialogue naturally incorporating at least 5 Hindi idioms.",
          listenTitle:"Conversational Idiom Usage", listenDesc:"Listen to natural conversations where idioms are used. Identify and note them.",
          pronTitle:"Emotional Color in Speech", pronDesc:"Advanced practice of using voice tone, pace and pitch for emotional expression in Hindi.",
          speakingTitle:"Use Idioms Naturally", speakingDesc:"Have a free conversation with AI where you naturally incorporate Hindi idioms." },
        { lessonTitle:"CEFR B2 Mastery Review", lessonDesc:"Comprehensive review of all grammar structures from Months 1-5. Targeting B2 proficiency level.",
          vocabTitle:"High-Frequency Word Review", vocabDesc:"Review the 200 most important Hindi words. Fill any vocabulary gaps.",
          readingTitle:"B2 Level Reading Passage", readingDesc:"Read an authentic, unmodified Hindi text (news article or story) at B2 difficulty.",
          writingTitle:"B2 Writing Task", writingDesc:"Write a 300-word argumentative essay on a social topic in Hindi.",
          listenTitle:"Authentic Audio Comprehension", listenDesc:"Listen to an unscripted conversation between native speakers for 5 minutes and summarize.",
          pronTitle:"Accent Neutralization", pronDesc:"Final pronunciation polish: work on any remaining accent interference from your native language.",
          speakingTitle:"Free Conversation B2", speakingDesc:"30-minute free conversation with AI on any topic. AI rates fluency at B2 standard." },
      ],
      // Month 6
      [
        { lessonTitle:"Advanced Grammar Mastery", lessonDesc:"Causatives, passive voice, reported speech, complex subordinate clauses in Hindi.",
          vocabTitle:"Advanced Vocabulary Set", vocabDesc:"25 sophisticated vocabulary items: abstractions, technical terms, formal alternatives.",
          readingTitle:"Academic Text", readingDesc:"Read a passage from a Hindi textbook or academic article. Practice dense reading.",
          writingTitle:"Formal Essay", writingDesc:"Write a formal 400-word essay with thesis, arguments, and conclusion in Hindi.",
          listenTitle:"Lecture Comprehension", listenDesc:"Listen to a 5-minute Hindi lecture or TED-style talk and take detailed notes.",
          pronTitle:"Precision Pronunciation", pronDesc:"Fine-tune all remaining pronunciation issues. Record yourself and compare with native speakers.",
          speakingTitle:"Academic Presentation", speakingDesc:"Present a 5-minute prepared talk to AI on an academic or professional topic." },
        { lessonTitle:"Cultural Deep Dive: Dialects", lessonDesc:"Explore Hindi dialects: Braj, Avadhi, Maithili. Understand regional variations.",
          vocabTitle:"Dialect & Regional Words", vocabDesc:"25 regional expressions and how standard Hindi differs from local variants.",
          readingTitle:"Regional Literature", readingDesc:"Read excerpts in two different Hindi dialects. Identify similarities and differences.",
          writingTitle:"Write in Your Style", writingDesc:"Write a personal essay showing your own voice and style in Hindi.",
          listenTitle:"Dialect Audio Samples", listenDesc:"Listen to speakers from UP, Bihar, Rajasthan and Delhi. Note vocabulary differences.",
          pronTitle:"Dialect Pronunciation", pronDesc:"Sample pronunciation patterns from major Hindi dialects without losing standard form.",
          speakingTitle:"Be a Tour Guide", speakingDesc:"Role-play giving a cultural tour of a Hindi-speaking region to foreign visitors." },
        { lessonTitle:"Professional & Academic Writing", lessonDesc:"Applications, reports, formal letters, academic papers in Hindi. Style and register mastery.",
          vocabTitle:"Formal Writing Vocabulary", vocabDesc:"25 formal written Hindi expressions used in official documents and letters.",
          readingTitle:"Government Document", readingDesc:"Read an official government notice or policy document in Hindi. Extract key information.",
          writingTitle:"Application Letter", writingDesc:"Write a formal job application or scholarship application letter in professional Hindi.",
          listenTitle:"Formal Speech", listenDesc:"Listen to a formal political or academic speech in Hindi. Analyze vocabulary and style.",
          pronTitle:"Formal Register Delivery", pronDesc:"Practice delivering prepared speeches with formal pronunciation and clear articulation.",
          speakingTitle:"Mock Interview", speakingDesc:"Complete a professional interview in Hindi with AI as the interviewer." },
        { lessonTitle:"Final Revision & Exam Preparation", lessonDesc:"Comprehensive review of all 6 months. Practice exam strategies. Timed drills.",
          vocabTitle:"Master Vocabulary List", vocabDesc:"Review the complete 600-word core vocabulary. Identify and fill any remaining gaps.",
          readingTitle:"Exam Practice Reading", readingDesc:"Complete a full mock reading comprehension section at certification level.",
          writingTitle:"Exam Practice Writing", writingDesc:"Write two timed writing tasks: short formal letter (15 min) + essay (25 min).",
          listenTitle:"Exam Practice Listening", listenDesc:"Complete a full mock listening section with multiple audio formats.",
          pronTitle:"Final Pronunciation Check", pronDesc:"Record a 3-minute self-introduction and assess against native speaker benchmark.",
          speakingTitle:"Mock Oral Exam", speakingDesc:"Complete a full mock oral examination with AI: presentation + Q&A + discussion." },
      ],
    ]
  },

  english: {
    months: [
      [
        { lessonTitle:"English Sounds & The 44 Phonemes", lessonDesc:"Learn all vowel and consonant sounds. IPA chart. Minimal pairs: ship/sheep, bit/beat.",
          vocabTitle:"500 Most Common Words - Set 1", vocabDesc:"The 25 most frequent English words with example sentences and collocations.",
          readingTitle:"Simple Everyday Texts", readingDesc:"Read signs, labels, and short notices. Extract key information.",
          writingTitle:"Alphabet & Spelling Practice", writingDesc:"Common spelling patterns: -tion, -ough, silent letters. Write 20 sentences.",
          listenTitle:"Native Speaker Greetings", listenDesc:"Listen to formal and informal greetings from British and American speakers.",
          pronTitle:"Vowel Sound Distinction", pronDesc:"Distinguish and produce the 12 pure English vowel sounds correctly.",
          speakingTitle:"Meet & Greet Practice", speakingDesc:"Practice introducing yourself in British and American English styles." },
        { lessonTitle:"Verb Tenses: Present Simple & Continuous", lessonDesc:"When to use present simple vs present continuous. Stative verbs that don't take -ing.",
          vocabTitle:"Action & Stative Verbs", vocabDesc:"25 common verbs with examples showing simple vs continuous usage.",
          readingTitle:"A Typical Day Reading", readingDesc:"Read a diary entry using both present simple and continuous. Identify each.",
          writingTitle:"Describe Your Routine", writingDesc:"Write about your daily routine (simple) and what you're currently doing (continuous).",
          listenTitle:"Daily Routine Conversations", listenDesc:"Listen to two people describing their daily lives in different tenses.",
          pronTitle:"Weak Forms & Contractions", pronDesc:"Practice reduced forms: I'm, don't, doesn't, isn't as native speakers say them.",
          speakingTitle:"Your Daily Life", speakingDesc:"Describe your routine to AI using correct tense choice throughout." },
        { lessonTitle:"Questions & Auxiliaries", lessonDesc:"Do/does/did questions, question tags, indirect questions. Who/what/when/where/why/how.",
          vocabTitle:"Question Words & Phrases", vocabDesc:"25 question structures from simple to complex.",
          readingTitle:"Interview Format Text", readingDesc:"Read a Q&A interview article. Notice question forms and answer strategies.",
          writingTitle:"Write Interview Questions", writingDesc:"Write 15 questions for an imaginary interview with a celebrity.",
          listenTitle:"Question Intonation", listenDesc:"Listen to various question types. Notice rising vs falling intonation.",
          pronTitle:"Question Intonation Patterns", pronDesc:"Practice correct rising intonation for yes/no, falling for wh-questions.",
          speakingTitle:"Play 20 Questions", speakingDesc:"Play 20 questions with AI. Practice forming varied and natural questions." },
        { lessonTitle:"Articles, Nouns & Countability", lessonDesc:"A/an/the vs no article. Countable vs uncountable nouns. Plural forms and exceptions.",
          vocabTitle:"Nouns: Countable & Uncountable", vocabDesc:"25 tricky nouns with article rules: advice, information, luggage, news...",
          readingTitle:"News Article", readingDesc:"Read a simple news article. Identify and analyze article usage throughout.",
          writingTitle:"Describe a Place", writingDesc:"Write a 150-word description of a city using articles correctly.",
          listenTitle:"BBC News Excerpt", listenDesc:"Listen to a BBC news excerpt. Notice article pronunciation: 'thee' vs 'thuh'.",
          pronTitle:"The /θ/ and /ð/ Sounds", pronDesc:"Master the English 'th' sounds - both voiceless (thing) and voiced (this).",
          speakingTitle:"Describe a Photo", speakingDesc:"Describe an imaginary photo scene to AI using correct articles and nouns." },
      ],
      // ... months 2-6 follow similar patterns for English
    ],
  },

};

// Fill in default content for any language/month not explicitly defined
function getDefaultMonthContent(monthIdx) {
  const themes = [
    ['Foundations','Core Concepts','Basics','Essentials'],
    ['Building Skills','Intermediate','Practice','Application'],
    ['Communication','Expression','Fluency','Conversation'],
    ['Advanced Topics','Culture','Mastery','Professional'],
    ['Immersion','Native Level','Literature','Media'],
    ['Certification','Mastery Review','Final Polish','Exam Prep'],
  ];
  const t = themes[monthIdx] || themes[0];
  return Array(4).fill(null).map((_, w) => ({
    lessonTitle: `${t[w % 4]} - Lesson ${w+1}`,
    lessonDesc: `Master ${t[w%4].toLowerCase()} concepts through structured learning and practice.`,
    vocabTitle: `Vocabulary Set ${monthIdx*4 + w + 1}`,
    vocabDesc: `Learn 25 new words with native pronunciation, example sentences and contextual usage.`,
    readingTitle: `Reading Practice ${w+1}`,
    readingDesc: `Read an authentic-style passage and answer comprehension questions to build reading fluency.`,
    writingTitle: `Writing Task ${w+1}`,
    writingDesc: `Practice writing skills with a structured task: paragraph, email, or short essay.`,
    listenTitle: `Listening Exercise ${w+1}`,
    listenDesc: `Listen to native speaker audio and complete comprehension tasks at your level.`,
    pronTitle: `Pronunciation Focus ${w+1}`,
    pronDesc: `Target specific sounds and patterns with AI speech recognition feedback and correction.`,
    speakingTitle: `Speaking Practice ${w+1}`,
    speakingDesc: `Engage in structured conversation practice with your AI language partner.`,
  }));
}

// Build activities for all languages
const LW_LANG_ACTIVITIES = {};

const ALL_LANGUAGE_IDS = ['hindi','english','spanish','french','german','japanese','mandarin','korean','portuguese','italian','arabic','russian'];

ALL_LANGUAGE_IDS.forEach(langId => {
  LW_LANG_ACTIVITIES[langId] = [];
  for (let m = 0; m < 6; m++) {
    const content = (LANG_CONTENT[langId] && LANG_CONTENT[langId].months[m])
      ? LANG_CONTENT[langId].months[m]
      : getDefaultMonthContent(m);
    const activities = generateMonthActivities(m, content);
    // Set first activity of month 1 unlocked
    if (m === 0 && activities.length > 0) {
      activities[0].locked = false;
    }
    LW_LANG_ACTIVITIES[langId].push({ monthMeta: LW_MONTHS_META[m], activities });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

window.LWData = {
  MONTHS_META: LW_MONTHS_META,
  ACTIVITY_TYPES,
  ALL_LANGUAGE_IDS,

  getLanguages() {
    return ALL_LANGUAGE_IDS.map(id => {
      const info = {
        hindi:      { name:'Hindi',      native:'हिन्दी',  flag:'🇮🇳', color:'#FF6B35', speakers:'600M+' },
        english:    { name:'English',    native:'English', flag:'🇬🇧', color:'#003087', speakers:'1.5B+' },
        spanish:    { name:'Spanish',    native:'Español', flag:'🇪🇸', color:'#AA151B', speakers:'500M+' },
        french:     { name:'French',     native:'Français',flag:'🇫🇷', color:'#002395', speakers:'280M+' },
        german:     { name:'German',     native:'Deutsch', flag:'🇩🇪', color:'#5b4fcf', speakers:'130M+' },
        japanese:   { name:'Japanese',   native:'日本語',   flag:'🇯🇵', color:'#BC002D', speakers:'125M+' },
        mandarin:   { name:'Mandarin',   native:'普通话',   flag:'🇨🇳', color:'#DE2910', speakers:'1B+'   },
        korean:     { name:'Korean',     native:'한국어',   flag:'🇰🇷', color:'#003478', speakers:'77M+'  },
        portuguese: { name:'Portuguese', native:'Português',flag:'🇧🇷',color:'#009C3B', speakers:'260M+' },
        italian:    { name:'Italian',    native:'Italiano',flag:'🇮🇹', color:'#009246', speakers:'65M+'  },
        arabic:     { name:'Arabic',     native:'العربية', flag:'🇸🇦', color:'#006C35', speakers:'420M+' },
        russian:    { name:'Russian',    native:'Русский', flag:'🇷🇺', color:'#003153', speakers:'260M+' },
      }[id];
      return { id, ...info };
    });
  },

  getLanguage(id) {
    const langs = this.getLanguages();
    return langs.find(l => l.id === id);
  },

  getActivities(langId) {
    return LW_LANG_ACTIVITIES[langId] || LW_LANG_ACTIVITIES['english'];
  },

  getProgress(langId) {
    const key = `lw_progress_${langId}`;
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
    return { completedIds: [], totalXP: 0 };
  },

  saveProgress(langId, completedIds, totalXP) {
    const key = `lw_progress_${langId}`;
    localStorage.setItem(key, JSON.stringify({ completedIds, totalXP }));
  },

  getSelectedLanguage() {
    return localStorage.getItem('lw_selected_lang') || 'english';
  },

  getBaseLanguage() {
    return localStorage.getItem('lw_base_lang') || 'english';
  },

  getLearningLanguages() {
    return JSON.parse(localStorage.getItem('lw_languages') || '["english"]');
  },
};
