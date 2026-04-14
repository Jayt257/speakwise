# LearnWise — Complete AI Generation Guide

> **Give this file + the language pair README to any AI to generate a complete 6-month course**

---

## THE ONE-SHOT PROMPT

Copy this entire prompt, fill in the [BRACKETS], and give it to any capable AI (Claude, GPT-4, Gemini):

```
You are an expert language learning content creator for the LearnWise app.

CONTEXT FILES (read these fully before generating anything):
1. data/README.md — complete block schemas, ID table, curriculum structure
2. data/languages/{SRC_ISO}/{TGT_ISO}/README.md — language-specific context

YOUR TASK:
Generate ALL content for the {SRC_NAME} → {TGT_NAME} language pair.
- Source (teaching) language: {SRC_NAME} — all explanations IN THIS LANGUAGE
- Target (learning) language: {TGT_NAME} — all example text in TARGET SCRIPT + romanization + {SRC_NAME} translation

GENERATE IN THIS ORDER:
For EACH month (1 through 6), generate ALL 43 JSON files.
Month 1 files: IDs 1-43
Month 2 files: IDs 101-143
Month 3 files: IDs 201-243
Month 4 files: IDs 301-343
Month 5 files: IDs 401-443
Month 6 files: IDs 501-543 (+ ID 544 final_exam)

FOR EACH FILE, output VALID JSON matching this exact format:
{
  "id": [EXACT ID FROM TABLE BELOW],
  "type": "[activity type]",
  "title": "[descriptive title]",
  "description": "[one sentence for roadmap card]",
  "duration": "[X min]",
  "xp": [XP value],
  "week": [1-4],
  "month": [1-6],
  "langPair": "{SRC_ISO}-{TGT_ISO}",
  "tags": ["relevant", "tags"],
  "blocks": [ ...29 block type objects... ]
}

ACTIVITY ID TABLE:
Week 1: lesson=1, vocab=2, reading=3, pronunciation=4, writing=5, listening=6, test=7, speaking=8, vocab_review=9, pronunciation_2=10
Week 2: lesson=11, vocab=12, reading=13, pronunciation=14, writing=15, listening=16, test=17, speaking=18, reading_ext=19, pronunciation_2=20, MIDTEST=21
Week 3: lesson=22, vocab=23, reading=24, pronunciation=25, writing=26, listening=27, test=28, speaking=29, vocab_review=30, pronunciation_2=31, MIDTEST=32
Week 4: lesson=33, vocab=34, reading=35, pronunciation=36, writing=37, listening=38, test=39, speaking=40, reading_ext=41, pronunciation_2=42
Milestone: id=43
[For Month N: add (N-1)×100 to each ID]

FILE NAMING (save each JSON to this path):
month-{M}/week-{W}-lesson.json
month-{M}/week-{W}-vocab.json
month-{M}/week-{W}-reading.json
month-{M}/week-{W}-pronunciation.json
month-{M}/week-{W}-writing.json
month-{M}/week-{W}-listening.json
month-{M}/week-{W}-test.json
month-{M}/week-{W}-speaking.json
month-{M}/week-{W}-vocab-review.json   (weeks 1 & 3 only)
month-{M}/week-{W}-reading-ext.json    (weeks 2 & 4 only)
month-{M}/week-{W}-pronunciation-2.json
month-{M}/week-{W}-midtest.json        (weeks 2 & 3 only)
month-{M}/milestone.json

REQUIRED BLOCK COUNTS:
- lesson: 6-9 blocks (text/grammar_rule, keypoints, dialogue, comparison_table, fill_blank, tip, progress_checkpoint)
- vocab: 3-5 blocks (image_word, vocab_table, word_family OR vocabulary_spotlight, matching)
- reading: 3-4 blocks (reading, true_false, cultural_note)
- pronunciation: 4-6 blocks (keypoints, minimal_pairs, stress_pattern, tongue_twister, true_false)
- writing: 3-5 blocks (sentence_builder, translation_task, text, writing, tip)
- listening: 3-4 blocks (note_template, gap_fill, true_false, cultural_note)
- speaking: 2-4 blocks (roleplay_card, speaking × 2-3)
- test/weekly: 10-12 blocks (quiz × 10, true_false, matching)
- midtest: 20-22 blocks (quiz × 20, true_false, matching)
- milestone: 2-3 blocks (text/keypoints, progress_checkpoint)

VOCABULARY TARGET:
- 25 NEW words per vocab activity in Months 1-3
- 30 NEW words per vocab activity in Months 4-5
- 35 NEW words per vocab activity in Month 6

6-MONTH CURRICULUM:
Month 1 (A1): Script/sounds, greetings, vowels/consonants, numbers 1-100, family, basic sentences
Month 2 (A1+): Present tense verbs, shopping/money, food/restaurants, directions/transport
Month 3 (A2): Past tense, future tense, professions, travel/tourism
Month 4 (A2+): Social life/relationships, weather/nature, health/body, media/news
Month 5 (B1): Conditionals/hypotheticals, opinions/debate, idioms/proverbs, abstract concepts
Month 6 (B1+): Regional dialects, professional/formal language, literature, final exam prep

XP VALUES (use exactly):
lesson=30, vocab=20, reading=25, pronunciation=30, writing=35, listening=40
test=50, speaking=35, vocab_review=20, reading_ext=30, pronunciation_2=30
midtest=75, milestone=100, final_exam=500

START GENERATING NOW. Output one JSON file at a time. After each file, wait for confirmation before continuing (or if asked to generate all at once, output all 258 files in sequence).
```

---

## BATCH GENERATION PROMPT (for one source language, all 9 target languages)

Use this when you want to generate ALL content for one source language:

```
You are generating LearnWise language learning content.

SOURCE LANGUAGE: {SOURCE_LANGUAGE} (all teaching/explanations in this language)
TARGET LANGUAGES TO GENERATE: all 9 listed below

For each target language, generate the complete 6-month course (258 JSON files per language = 2,322 files total).

TARGET LANGUAGES:
1. {TGT_1} — ISO: {ISO_1}, script: {SCRIPT_1}, difficulty: {DIFF_1}
2. {TGT_2} — ISO: {ISO_2}, script: {SCRIPT_2}, difficulty: {DIFF_2}
3. {TGT_3} — ISO: {ISO_3}, script: {SCRIPT_3}, difficulty: {DIFF_3}
4. {TGT_4} — ISO: {ISO_4}, script: {SCRIPT_4}, difficulty: {DIFF_4}
5. {TGT_5} — ISO: {ISO_5}, script: {SCRIPT_5}, difficulty: {DIFF_5}
6. {TGT_6} — ISO: {ISO_6}, script: {SCRIPT_6}, difficulty: {DIFF_6}
7. {TGT_7} — ISO: {ISO_7}, script: {SCRIPT_7}, difficulty: {DIFF_7}
8. {TGT_8} — ISO: {ISO_8}, script: {SCRIPT_8}, difficulty: {DIFF_8}
9. {TGT_9} — ISO: {ISO_9}, script: {SCRIPT_9}, difficulty: {DIFF_9}

For each target language:
- Save files to: data/languages/{SRC_ISO}/{TGT_ISO}/
- File naming: month-{M}/week-{W}-{type}.json
- Activity IDs: see AI-GENERATION-GUIDE.md ID table

Generate one language pair at a time. Start with [LANGUAGE_NAME].
Read data/languages/{SRC_ISO}/{TGT_ISO}/README.md for language-specific context.
```

---

## READY-TO-USE: Generate Hindi as Source Language

Copy this exact prompt to generate all Hindi→X courses:

```
Generate all LearnWise content for Hindi as the SOURCE language.

CONTEXT:
- Source: Hindi (हिन्दी) — ALL explanations, instructions, hints in Hindi
- System context: data/README.md + data/languages/hi/[tgt]/README.md per language

Generate 9 language pairs in this order:
1. Hindi → English   (hi/en) — Easy, Latin script
2. Hindi → Gujarati  (hi/gu) — Moderate, Gujarati script (similar to Devanagari)
3. Hindi → Spanish   (hi/es) — Easy, Latin script
4. Hindi → French    (hi/fr) — Easy, Latin script  
5. Hindi → German    (hi/de) — Moderate, Latin script (grammar)
6. Hindi → Arabic    (hi/ar) — Hard, Arabic script (RTL)
7. Hindi → Japanese  (hi/ja) — Hard, 3 scripts
8. Hindi → Mandarin  (hi/zh) — Hard, Hanzi characters + tones
9. Hindi → Korean    (hi/ko) — Hard, Hangul script

For EACH pair, generate ALL 258 files (6 months × 43 files).

Start with Hindi → English (most accessible).
Use Hindi for ALL explanations. Use target script + romanization + Hindi translation for ALL target examples.

FILE STRUCTURE:
data/languages/hi/{tgt}/month-{1-6}/week-{1-4}-{type}.json

ID FORMULA: id = (monthIndex × 100) + positionInMonth
- Month 1: IDs 1–43
- Month 2: IDs 101–143  
... (see README.md Section 3 for full table)

Begin with: data/languages/hi/en/month-1/week-1-lesson.json (ID: 1)
```

---

## LANGUAGE-SPECIFIC GENERATION TEMPLATES

### Template: Generate English as Source Language

```
SOURCE: English → [TARGET]
Files go in: data/languages/en/{tgt_iso}/

English as source means:
- All explanations, grammar notes, cultural context → in English
- All target language text → in [TARGET] script + romanization + English translation
- Vocabulary: "word" field in target script, "meaning" field in English
- Tests: questions in English, options can mix English + target script

Cultural approach: Teach from a native English speaker's perspective.
Reference points: British/American culture for comparisons.
```

### Template: Generate Spanish as Source Language

```
SOURCE: Spanish → [TARGET]  
Files go in: data/languages/es/{tgt_iso}/

Spanish as source means:
- All explanations → in Spanish (Español)
- Grammar comparisons → "En español / En [idioma objetivo]:"
- Cultural notes → reference Hispanic/Spanish cultural context
- Vocabulary: word in target, meaning in Spanish

Key grammar crossovers to highlight:
- If target is French/Italian/Portuguese: note Romance language similarities
- If target is German/English: note Germanic vs Romance differences
- If target is Japanese/Mandarin: note the complete grammar shift
```

### Template: Generate Arabic as Source Language

```
SOURCE: Arabic → [TARGET]
Files go in: data/languages/ar/{tgt_iso}/

Arabic as source means:
- All explanations → in Arabic (العربية)
- Text direction: Arabic is RTL — note this in script introduction blocks
- Grammar comparisons reference Arabic patterns (VSO order, root system)
- Use Arabic script for explanations, include harakat (vowel marks) in examples

Special considerations:
- Arabic has many dialects — use Modern Standard Arabic (MSA/Fusha) for teaching
- Highlight differences: Arabic root system vs target language's word formation
```

---

## CONTENT QUALITY STANDARDS

### Every JSON file must:
1. Have `"id"` matching exactly the number in the ID table
2. Have `"type"` matching the file's activity type
3. Have `"langPair"` set to `"{src_iso}-{tgt_iso}"` (e.g. `"hi-ja"`)
4. Have `"week"` (1-4) and `"month"` (1-6) set correctly
5. Have all blocks with UNIQUE `"id"` strings within the file
6. Have at least the MINIMUM block count for that activity type

### Every block must:
1. Use a UNIQUE `"id"` string (e.g. `"b1"`, `"b2"` or descriptive like `"grammar_sov"`)
2. Have `"type"` matching one of the 29 valid block types
3. Have all required fields for that block type (see README.md Section 5)

### Every vocabulary entry must:
1. Have `"word"` in the TARGET language script
2. Have `"meaning"` in the SOURCE language
3. Have `"example"` showing the word in a real sentence (target + source translation)

### Every quiz question must:
1. Have exactly 4 `"options"`
2. Have `"correct"` as 0-indexed integer
3. Have `"explanation"` giving educational context (not just "because it's correct")

---

## VALIDATION CHECKLIST

Before submitting generated files, verify:

- [ ] `"id"` matches the correct ID from the table
- [ ] Month 1 IDs: 1-43 (no gaps, no duplicates)
- [ ] Month 2 IDs: 101-143 
- [ ] All vocab activities have 25+ words
- [ ] All test (weekly) activities have exactly 10 quiz blocks
- [ ] All midtest activities have exactly 20 quiz blocks
- [ ] `"langPair"` is set correctly (e.g. `"en-gu"`)
- [ ] All target language text has romanization AND source translation
- [ ] Cultural notes are culturally accurate for the target language region
- [ ] Week 2 and Week 3 have `midtest` files (others do not)
- [ ] Weeks 1 and 3 have `vocab-review` (weeks 2 and 4 have `reading-ext`)
- [ ] `milestone.json` exists at the end of each month folder
- [ ] `month-6/` folder has `final_exam.json` (ID: 544, XP: 500, 50 questions)

---

## FILE PLACEMENT

After generating, place files exactly here:
```
learnwise/data/languages/{src_iso}/{tgt_iso}/month-{N}/week-{W}-{type}.json
```

Then update `meta.json` to register each file:
```json
{
  "id": 1,
  "type": "lesson", 
  "file": "month-1/week-1-lesson.json",
  "xp": 30
}
```

The app (`content-loader.js`) fetches these files automatically on page load using `fetch()`. If running from `file://`, it falls back to localStorage content gracefully.

---

*AI Generation Guide v1.0 — LearnWise Content System*
