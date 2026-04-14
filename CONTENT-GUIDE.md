# LearnWise — AI Content Generation Prompt & Usage Guide

---

## SECTION A: HOW TO USE THIS GUIDE

This document gives you two things:

1. **Section B** — A complete, copy-paste AI prompt to generate any language pair's Month 1 content
2. **Section C** — Step-by-step instructions for placing the JSON files and testing them in the app

The Hindi → English pair is already **fully generated and working** as a reference.
Use it to understand the expected output before generating new language pairs.

---

## SECTION B: THE AI PROMPT

### Prompt Template — Generate ONE Activity File

Copy and paste this prompt into Claude, ChatGPT, or any AI assistant. Fill in the `[VARIABLES]`.

---

```
You are a content generator for LearnWise, a language learning web application.

══════════════════════════════════════════════════════════════
 TASK
══════════════════════════════════════════════════════════════

Generate ONE complete activity JSON file for the LearnWise app.

══════════════════════════════════════════════════════════════
 LANGUAGE PAIR CONFIGURATION
══════════════════════════════════════════════════════════════

Teaching language (source):  [SOURCE LANGUAGE]
Learning language (target):  [TARGET LANGUAGE]
Pair ID:                      [src-tgt, e.g. hi-en]
Target script:                [SCRIPT NAME, e.g. Latin/Devanagari/Gujarati]

RULE: All explanations, instructions, and hints → write in [SOURCE LANGUAGE]
RULE: All target language text → write in [TARGET SCRIPT] with romanization + [SOURCE] translation
RULE: Cultural notes → [SOURCE LANGUAGE], about [TARGET LANGUAGE] culture

══════════════════════════════════════════════════════════════
 FILE TO GENERATE
══════════════════════════════════════════════════════════════

Filename:   [FILENAME, e.g. week-1-lesson.json]
Activity ID: [ID NUMBER from the table below]
Type:        [lesson / vocab / reading / pronunciation / writing / listening / test / speaking / milestone]
Week:        [1/2/3/4]
Month:       1
XP:          [see table below]
Theme:       [THEME, e.g. "Greetings, Alphabet & First Words"]

Activity ID → Filename Map (Month 1):
  ID 1  = week-1-lesson.json        (xp: 30)
  ID 2  = week-1-vocab.json         (xp: 20)
  ID 3  = week-1-reading.json       (xp: 25)
  ID 4  = week-1-pronunciation.json (xp: 30)
  ID 5  = week-1-writing.json       (xp: 35)
  ID 6  = week-1-listening.json     (xp: 40)
  ID 7  = week-1-test.json          (xp: 50)
  ID 8  = week-1-speaking.json      (xp: 35)
  ID 9  = week-1-vocab-review.json  (xp: 20)
  ID 10 = week-1-pronunciation-2.json (xp: 30)
  ID 11 = week-2-lesson.json        (xp: 30)
  ID 12 = week-2-vocab.json         (xp: 20)
  ID 13 = week-2-reading.json       (xp: 25)
  ID 14 = week-2-pronunciation.json (xp: 30)
  ID 15 = week-2-writing.json       (xp: 35)
  ID 16 = week-2-listening.json     (xp: 40)
  ID 17 = week-2-test.json          (xp: 50)
  ID 18 = week-2-speaking.json      (xp: 35)
  ID 19 = week-2-reading-ext.json   (xp: 30)
  ID 20 = week-2-pronunciation-2.json (xp: 30)
  ID 21 = week-2-midtest.json       (xp: 75)
  ID 22 = week-3-lesson.json        (xp: 30)
  ... (same pattern for weeks 3+4)
  ID 43 = milestone.json            (xp: 100)

══════════════════════════════════════════════════════════════
 REQUIRED BLOCKS BY ACTIVITY TYPE
══════════════════════════════════════════════════════════════

LESSON (7-9 blocks):
  Required: text, grammar_rule, comparison_table, fill_blank, tip, progress_checkpoint
  Optional: keypoints, dialogue, cultural_note

VOCAB (3-5 blocks):
  Required: image_word, vocab_table, matching
  Optional: vocabulary_spotlight, word_family

READING (3-4 blocks):
  Required: reading (150-200 word passage + 4 questions), true_false
  Optional: cultural_note, vocabulary_spotlight

PRONUNCIATION (4-5 blocks):
  Required: keypoints (all sounds), minimal_pairs, stress_pattern
  Optional: tongue_twister, true_false

WRITING (4-6 blocks):
  Required: sentence_builder, translation_task, writing (minWords: 30-50)
  Optional: text (grammar reminder), tip

LISTENING (3-4 blocks):
  Required: note_template (3-4 sections), gap_fill (3-4 gaps), true_false
  Optional: cultural_note

SPEAKING (3-4 blocks):
  Required: roleplay_card, speaking (2-3 scenarios)
  Optional: dialogue

TEST/weekly (10 quiz blocks + 1-2 bonus):
  Required: 10 × quiz blocks, true_false (3 items), matching
  Each quiz: 4 options, correct index, explanation

MIDTEST (20 quiz blocks + bonus):
  Required: 20 × quiz blocks covering weeks 1 and 2 material
  Plus: true_false, sentence_builder, fill_blank

MILESTONE (2-3 blocks):
  Required: text (celebration + summary), progress_checkpoint (5-8 items)
  Optional: cultural_note, keypoints (skills gained)

══════════════════════════════════════════════════════════════
 JSON SCHEMA (copy exactly)
══════════════════════════════════════════════════════════════

{
  "id": [ID NUMBER],
  "type": "[TYPE]",
  "title": "[Title in SOURCE LANGUAGE]",
  "description": "[One sentence in SOURCE LANGUAGE]",
  "duration": "[e.g. 15 min]",
  "xp": [XP VALUE],
  "week": [1/2/3/4],
  "month": 1,
  "langPair": "[src-tgt]",
  "tags": ["tag1", "tag2"],
  "blocks": [
    {
      "id": "b1",
      "type": "[BLOCK TYPE]",
      ... block-specific fields ...
    }
  ]
}

Block ID format: use "b1", "b2", "b3" etc. (must be unique within the file)

══════════════════════════════════════════════════════════════
 ALL 29 BLOCK TYPE SCHEMAS
══════════════════════════════════════════════════════════════

--- text ---
{ "id":"b1", "type":"text", "title":"Section Title", "body":"Paragraph text. Use \\n for line breaks." }

--- keypoints ---
{ "id":"b2", "type":"keypoints", "title":"Key Points", "points":["Point 1","Point 2","Point 3"] }

--- tip ---
{ "id":"b3", "type":"tip", "body":"💡 Tip text here." }

--- audio ---
{ "id":"b4", "type":"audio", "label":"Audio Label", "url":null, "transcript":"Transcript text" }

--- grammar_rule ---
{
  "id":"b5", "type":"grammar_rule",
  "title":"Rule Name",
  "pattern":"Subject + Object + Verb",
  "examples":[
    {"native":"source lang sentence", "target":"TARGET SCRIPT sentence", "translation":"meaning"}
  ],
  "note":"Exception or extra tip."
}

--- dialogue ---
{
  "id":"b6", "type":"dialogue",
  "title":"Dialogue Title",
  "speakers":["Person A","Person B"],
  "lines":[
    {"speaker":0, "text":"TARGET TEXT", "romanization":"how-to-read", "translation":"meaning"},
    {"speaker":1, "text":"TARGET TEXT", "romanization":"how-to-read", "translation":"meaning"}
  ]
}

--- comparison_table ---
{
  "id":"b7", "type":"comparison_table",
  "title":"Comparison Title",
  "headers":["Source Language","Target Language","Pronunciation"],
  "rows":[
    ["Source word","TARGET WORD","romanization"],
    ["Another word","TARGET WORD","romanization"]
  ]
}

--- fill_blank ---
{
  "id":"b8", "type":"fill_blank",
  "title":"Fill in the Blank",
  "instructions":"Complete the sentences:",
  "items":[
    {"sentence":"The word ___ means Hello.","answer":"CORRECT ANSWER","hint":"optional hint"},
    {"sentence":"___ is used to say Thank you.","answer":"ANSWER","hint":"hint"}
  ]
}

--- vocab_table ---
{
  "id":"b9", "type":"vocab_table",
  "title":"Vocabulary",
  "words":[
    {"word":"TARGET WORD","meaning":"Source meaning","example":"TARGET example sentence — translation"},
    {"word":"TARGET WORD 2","meaning":"Source meaning 2","example":"Another example"}
  ]
}

NOTE: vocab activities must have 25+ words total across all vocab_table blocks.

--- image_word ---
{
  "id":"b10", "type":"image_word",
  "title":"Visual Vocabulary",
  "items":[
    {"emoji":"🏠","word":"TARGET WORD","meaning":"Source meaning","example":"Context example"},
    {"emoji":"💧","word":"TARGET WORD","meaning":"Source meaning","example":"Context example"}
  ]
}

--- word_family ---
{
  "id":"b11", "type":"word_family",
  "title":"Word Family",
  "root":"ROOT WORD IN TARGET SCRIPT",
  "rootMeaning":"Root meaning in source",
  "members":[
    {"word":"derived word","meaning":"meaning"},
    {"word":"derived word 2","meaning":"meaning 2"}
  ]
}

--- vocabulary_spotlight ---
{
  "id":"b12", "type":"vocabulary_spotlight",
  "word":"FEATURED TARGET WORD",
  "meaning":"Source meaning",
  "pronunciation":"how-to-say",
  "partOfSpeech":"noun",
  "examples":[{"gu":"TARGET sentence","en":"Source translation"}],
  "relatedWords":["related1 (meaning)","related2 (meaning)"],
  "culturalNote":"Optional cultural context."
}

--- minimal_pairs ---
{
  "id":"b13", "type":"minimal_pairs",
  "title":"Sound Contrasts",
  "instruction":"Can you hear the difference?",
  "pairs":[
    {"word1":"SOUND1","word2":"SOUND2","sound1":"description1","sound2":"description2","diff":"what differs"}
  ]
}

--- stress_pattern ---
{
  "id":"b14", "type":"stress_pattern",
  "title":"Word Stress",
  "words":[
    {"word":"full-word","syllables":["syl","la","ble"],"stressed":0,"note":"note about stress"}
  ]
}

--- tongue_twister ---
{
  "id":"b15", "type":"tongue_twister",
  "title":"Tongue Twister",
  "text":"TARGET LANGUAGE TEXT",
  "romanization":"how to read it",
  "translation":"What it means",
  "tip":"Practice tip"
}

--- roleplay_card ---
{
  "id":"b16", "type":"roleplay_card",
  "title":"Scene Title",
  "scenario":"Short scenario name",
  "yourRole":"Your role",
  "partnerRole":"Partner role",
  "context":"Full scene description.",
  "goal":"What you need to accomplish.",
  "usefulPhrases":["TARGET PHRASE (meaning)","Another phrase (meaning)"]
}

--- speaking ---
{
  "id":"b17", "type":"speaking",
  "prompt":"What the learner should say or practice.",
  "hints":["TARGET PHRASE (meaning)","Another hint (meaning)"]
}

--- sentence_builder ---
{
  "id":"b18", "type":"sentence_builder",
  "title":"Build the Sentence",
  "translation":"What the sentence means (source language)",
  "words":["word1","word2","word3","distractor"],
  "correctOrder":[2,0,1]
}
NOTE: correctOrder is 0-indexed positions of the correct words in correct sequence.
The remaining words in the "words" array are distractors.

--- translation_task ---
{
  "id":"b19", "type":"translation_task",
  "title":"Translation Practice",
  "instruction":"Translate to [target language]:",
  "items":[
    {"source":"Source language phrase","answer":"TARGET ANSWER (romanization ok)"}
  ]
}

--- matching ---
{
  "id":"b20", "type":"matching",
  "title":"Match the Pairs",
  "instruction":"Tap to match each pair",
  "leftItems":["TARGET WORD 1","TARGET WORD 2","TARGET WORD 3"],
  "rightItems":["Source meaning 2","Source meaning 3","Source meaning 1"],
  "pairs":[[0,2],[1,0],[2,1]]
}
NOTE: pairs is array of [leftIndex, rightIndex] showing correct connections.

--- ordering ---
{
  "id":"b21", "type":"ordering",
  "title":"Put in Order",
  "instruction":"Arrange to form a correct sentence",
  "words":["word3","word1","word4","word2"],
  "correctOrder":[1,3,0,2]
}

--- quiz ---
{
  "id":"b22", "type":"quiz",
  "question":"Quiz question text?",
  "options":["Option A","Option B","Option C","Option D"],
  "correct":1,
  "explanation":"Why option B (index 1) is correct."
}
NOTE: correct is 0-indexed. Always 4 options. Always include explanation.

--- true_false ---
{
  "id":"b23", "type":"true_false",
  "title":"True or False?",
  "items":[
    {"statement":"Statement to evaluate.","answer":true,"explanation":"Why true."},
    {"statement":"Another statement.","answer":false,"explanation":"Why false."}
  ]
}

--- reading ---
{
  "id":"b24", "type":"reading",
  "passage":"📖 TITLE\n\nParagraph 1 text. TARGET SCRIPT auto-highlights.\n\nParagraph 2...",
  "questions":[
    {"q":"Comprehension question?","a":"Answer."}
  ]
}
NOTE: 150-200 words for Month 1. 4+ comprehension questions.

--- writing ---
{
  "id":"b25", "type":"writing",
  "prompt":"Write about [topic]. Include [specific requirements].",
  "minWords":40,
  "sampleAnswer":"Example answer showing structure and style."
}

--- note_template ---
{
  "id":"b26", "type":"note_template",
  "title":"Listening Notes",
  "instruction":"Listen and fill in your notes:",
  "sections":[
    {"label":"Question prompt:","placeholder":"What to write here..."}
  ]
}

--- gap_fill ---
{
  "id":"b27", "type":"gap_fill",
  "title":"Complete the Transcript",
  "text":"First word is ___ and second is ___.",
  "gaps":["answer1","answer2"],
  "hints":["hint1","hint2"]
}
NOTE: number of ___ must exactly match length of gaps array.

--- cultural_note ---
{
  "id":"b28", "type":"cultural_note",
  "title":"Cultural Note Title",
  "icon":"🌍",
  "content":"Cultural context in source language.",
  "tags":["tag1","tag2"]
}

--- progress_checkpoint ---
{
  "id":"b29", "type":"progress_checkpoint",
  "title":"Can You Do This?",
  "items":["Skill 1","Skill 2","Skill 3"],
  "xpBonus":15
}

══════════════════════════════════════════════════════════════
 QUALITY RULES — FOLLOW THESE STRICTLY
══════════════════════════════════════════════════════════════

1. OUTPUT ONLY VALID JSON — no markdown, no explanation text outside the JSON
2. All block "id" values must be unique within the file (b1, b2, b3...)
3. Target language text MUST include romanization AND source language translation
4. vocab activities must have 25+ words in total
5. test activities must have exactly 10 quiz blocks (weekly) or 20 (midtest)
6. quiz blocks must always have "correct" as 0-indexed integer (NOT a string)
7. sentence_builder "correctOrder" must be 0-indexed positions
8. gap_fill: count of ___ in "text" must equal count of items in "gaps" array
9. Do not use placeholder text like "Coming soon" or "TODO"
10. Every example sentence must be real and grammatically correct
11. Cultural notes must be accurate and respectful

══════════════════════════════════════════════════════════════
 NOW GENERATE
══════════════════════════════════════════════════════════════

Generate the complete JSON for:
  File:    [FILENAME]
  ID:      [ID]
  Type:    [TYPE]
  Week:    [WEEK]
  Theme:   [THEME]

Output ONLY the JSON object. Start with { and end with }
```

---

### Example: Generate Hindi → English Week 1 Lesson

Replace the variables like this:

```
Teaching language: Hindi
Learning language: English
Pair ID: hi-en
Target script: Latin (regular English alphabet)
File: week-1-lesson.json
Activity ID: 1
Type: lesson
Week: 1
Theme: "English Greetings, Alphabet & First Phrases for Hindi Speakers"
```

---

### Bulk Generation Prompt (Generate All 43 Files)

For generating all Month 1 files at once, use this structured batch prompt:

```
I need you to generate ALL 43 JSON files for LearnWise Month 1.
Language pair: [SRC] → [TGT]
Teaching language: [SRC NAME]
Learning language: [TGT NAME]
Pair ID: [src-tgt]

Generate them one by one. For each file, I will say "next" and you generate the next one.
Start with: week-1-lesson.json (ID: 1, type: lesson, theme: "Script, Sounds & Basic Greetings")

Use the full schema from the main prompt above.
When done with all 43, confirm the complete list.
```

---

## SECTION C: HOW TO USE THE GENERATED JSON DATA

### Step 1: Understand the Directory Structure

```
learnwise/
└── data/
    └── languages/
        └── hi/          ← source language code (2-letter ISO)
            └── en/      ← target language code (2-letter ISO)
                ├── README.md       ← AI context guide for this pair
                ├── meta.json       ← REQUIRED: activity ID → file mapping
                └── month-1/       ← put all 43 JSON files here
                    ├── week-1-lesson.json
                    ├── week-1-vocab.json
                    └── ... (43 total)
```

### Step 2: Place Generated JSON Files

After generating a JSON file with the AI prompt:

1. **Save it** with the exact filename specified (e.g. `week-1-lesson.json`)
2. **Place it** in `data/languages/hi/en/month-1/`
3. **No registration needed** — `meta.json` already maps all 43 filenames for `hi/en`

```
Generated file → Save as → Place in
"week-1-lesson.json" content → week-1-lesson.json → data/languages/hi/en/month-1/week-1-lesson.json
```

### Step 3: Set the Language Pair in the App

The app needs to know you want Hindi as the teaching language and English as the learning language.

**Option A: Use Onboarding**
1. Open `onboarding.html`
2. Under "I speak / teach me in:" → select **Hindi** 🇮🇳
3. Under "I want to learn:" → select **English** 🇬🇧
4. Complete onboarding → this sets `lw_lang_pair` in localStorage

**Option B: Set Directly in Browser Console**
Open DevTools → Console → paste:
```javascript
localStorage.setItem('lw_lang_pair', JSON.stringify({
  fromId: 'hindi',
  fromName: 'Hindi',
  fromFlag: '🇮🇳',
  toId: 'english',
  toName: 'English',
  toNative: 'English',
  toFlag: '🇬🇧'
}));
localStorage.setItem('lw_selected_lang', 'english');
location.reload();
```

**Option C: URL Parameter**
Open any activity directly:
```
activity-lesson.html?lang=english&id=1&xp=30
```

### Step 4: Test That Content Loads

**Method 1 — Direct URL (quickest test)**
```
Open: activity-lesson.html?lang=english&id=1&xp=30
```
If the lesson shows real content with blocks → it worked.  
If it shows "Content Coming Soon" → the JSON isn't loading (see troubleshooting below).

**Method 2 — Browser Console**
Open DevTools → Console → paste:
```javascript
// Check if content-loader found the JSON
LWLoader.loadPair('hi', 'en').then(ok => {
  console.log('Loaded:', ok);
  const content = LWLoader.cache['hi-en'];
  console.log('Activities loaded:', Object.keys(content || {}).length);
  console.log('Activity 1:', content?.['1']?.title);
});
```
Expected output:
```
[LWLoader] Loaded meta for hi-en
[LWLoader] Loaded 43 activities for hi-en
Loaded: true
Activities loaded: 43
Activity 1: अंग्रेज़ी की पहली पाठ: ...
```

**Method 3 — Check via Admin Panel**
1. Open `admin.html`
2. Select **English** in language list (left sidebar)
3. Click any activity in the center list
4. Click the **Preview** tab — if blocks show → content loaded

### Step 5: Navigate the Full Month

After confirming Week 1 loads, navigate to `roadmap.html` to see all 43 activities.

**Set the language on roadmap:**
```
roadmap.html?lang=english
```

You should see 4 weeks of activities arranged as a roadmap. Click any activity to launch it.

---

## Troubleshooting

### Problem: "Content Coming Soon" appears

**Cause 1: Running from `file://`**  
`fetch()` does not work from local file system. You need a web server.

**Fix (Python, 1 command):**
```bash
# In the learnwise/ directory:
python3 -m http.server 8080
# Then open: http://localhost:8080/activity-lesson.html?lang=english&id=1&xp=30
```

**Fix (Node.js):**
```bash
npx serve .
# Then open: http://localhost:3000/activity-lesson.html?lang=english&id=1&xp=30
```

**Fix (VS Code):**
Install "Live Server" extension → right-click `index.html` → "Open with Live Server"

---

**Cause 2: Wrong language pair in localStorage**

Check what's stored:
```javascript
console.log(JSON.parse(localStorage.getItem('lw_lang_pair')));
console.log(localStorage.getItem('lw_selected_lang'));
```

Expected for Hindi→English:
```json
{ "fromId": "hindi", "toId": "english", "toFlag": "🇬🇧" }
```

If wrong, set it (see Step 3 above).

---

**Cause 3: meta.json not found**

The content-loader reads `data/languages/hi/en/meta.json` first. Check it exists.

```javascript
fetch('data/languages/hi/en/meta.json')
  .then(r => r.json())
  .then(d => console.log('meta.json OK, months:', d.months?.length))
  .catch(e => console.log('meta.json FAILED:', e));
```

---

**Cause 4: Activity ID mismatch**

The `"id"` field in the JSON file MUST match what's in the URL `?id=` parameter AND what's in `meta.json`.

```javascript
// Check what activity-1 JSON has:
fetch('data/languages/hi/en/month-1/week-1-lesson.json')
  .then(r => r.json())
  .then(d => console.log('File ID:', d.id, 'Expected: 1'));
```

---

**Cause 5: Admin override in localStorage is blank**

If you previously opened the activity and it saved an empty override:
```javascript
// Clear localStorage content overrides (keeps language settings):
LWContent.deleteContent(1);  // clear activity 1
// Or clear ALL content overrides:
LWContent.clearAll();
location.reload();
```

---

## Quick Reference: Test All 43 Activities

After placing all 43 files, run this in the browser console to test all of them:

```javascript
(async () => {
  await LWLoader.loadPair('hi', 'en');
  const cache = LWLoader.cache['hi-en'];
  const total = Object.keys(cache || {}).length;
  console.log(`✅ Loaded: ${total}/43 activities`);
  
  // Check each one has real blocks
  let issues = 0;
  for (let id = 1; id <= 43; id++) {
    const c = cache?.[String(id)];
    if (!c) { console.log(`❌ ID ${id}: NOT FOUND`); issues++; continue; }
    if (!c.blocks?.length) { console.log(`⚠️ ID ${id}: NO BLOCKS`); issues++; continue; }
    const hasPlaceholder = c.blocks.some(b => (b.body||'').includes('being prepared'));
    if (hasPlaceholder) console.log(`⚠️ ID ${id}: placeholder content`);
  }
  console.log(issues === 0 ? '🎉 ALL 43 ACTIVITIES LOADED SUCCESSFULLY!' : `${issues} issues found`);
})();
```

---

## Full Activity URL Map — Hindi → English Month 1

Bookmark these to test any activity directly (serve from localhost first):

```
Week 1:
  Lesson:        http://localhost:8080/activity-lesson.html?lang=english&id=1&xp=30
  Vocabulary:    http://localhost:8080/activity-vocabulary.html?lang=english&id=2&xp=20
  Reading:       http://localhost:8080/activity-reading.html?lang=english&id=3&xp=25
  Pronunciation: http://localhost:8080/activity-pronunciation.html?lang=english&id=4&xp=30
  Writing:       http://localhost:8080/activity-writing.html?lang=english&id=5&xp=35
  Listening:     http://localhost:8080/activity-listening.html?lang=english&id=6&xp=40
  Test:          http://localhost:8080/activity-test.html?lang=english&id=7&xp=50
  Speaking:      http://localhost:8080/activity-speaking.html?lang=english&id=8&xp=35

Week 2:
  Lesson:        http://localhost:8080/activity-lesson.html?lang=english&id=11&xp=30
  Mid-Test:      http://localhost:8080/activity-test.html?lang=english&id=21&xp=75
  (replace id=11-21 for other Week 2 activities)

Week 3:
  Lesson:        http://localhost:8080/activity-lesson.html?lang=english&id=22&xp=30
  Mid-Test:      http://localhost:8080/activity-test.html?lang=english&id=32&xp=75

Week 4:
  Lesson:        http://localhost:8080/activity-lesson.html?lang=english&id=33&xp=30
  Test:          http://localhost:8080/activity-test.html?lang=english&id=39&xp=50

Full Roadmap:    http://localhost:8080/roadmap.html?lang=english
```

---

## Generating Other Language Pairs

The same process works for any of the 100 language pairs. Just change:
- The source/target language in the prompt
- The directory path (`data/languages/{src}/{tgt}/month-1/`)
- The `localStorage.setItem('lw_lang_pair', ...)` values

**Supported source languages:** en, hi, es, fr, de, ar, ja, zh, pt, ko  
**Supported target languages:** en, hi, gu, es, fr, de, ar, ja, zh, pt, ko

**Example for Spanish → French:**
```javascript
localStorage.setItem('lw_lang_pair', JSON.stringify({
  fromId: 'spanish', fromName: 'Spanish', fromFlag: '🇪🇸',
  toId: 'french', toName: 'French', toNative: 'Français', toFlag: '🇫🇷'
}));
localStorage.setItem('lw_selected_lang', 'french');
```
Files go in: `data/languages/es/fr/month-1/`

---

*LearnWise Content Generation & Usage Guide — keep this file alongside data/README.md when working with AI*
