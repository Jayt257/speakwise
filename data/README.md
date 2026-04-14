# LearnWise Content System — Master Admin & AI Reference Guide

> **Version 3.0** | Complete reference for human admins and AI agents generating language learning content.

---

## QUICK START FOR AI AGENTS

If you are an AI assistant asked to generate content for LearnWise:

1. **Read this file completely** before generating anything
2. **Find the language-pair README** in `data/languages/{src}/{tgt}/README.md` — it has target-language context and your exact file manifest
3. **Generate JSON files** following the schemas in Section 5
4. **Name files exactly** as shown in Section 4 — the content-loader auto-detects by filename
5. **Reference the ID table** in Section 3 — every JSON file has a fixed activity ID

---

## Table of Contents

1. [System Architecture](#1-system-architecture)
2. [Directory Structure](#2-directory-structure)
3. [Complete Activity ID Reference](#3-complete-activity-id-reference)
4. [File Naming Conventions](#4-file-naming-conventions)
5. [JSON Schema — All 29 Block Types](#5-json-schema--all-29-block-types)
6. [6-Month Curriculum Map](#6-6-month-curriculum-map)
7. [Month-by-Month Content Guide](#7-month-by-month-content-guide)
8. [Activity Content Requirements](#8-activity-content-requirements)
9. [AI Generation Instructions](#9-ai-generation-instructions)
10. [Admin Panel Guide](#10-admin-panel-guide)
11. [Content Loader API](#11-content-loader-api)

---

## 1. System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     CONTENT PRIORITY CHAIN                        │
│                                                                    │
│  1. Admin localStorage override  (highest priority)               │
│     └─ Set via admin.html panel → saved to localStorage           │
│                                                                    │
│  2. JSON files in data/languages/{src}/{tgt}/                     │
│     └─ Loaded by content-loader.js via fetch()                    │
│     └─ AUTO-DETECTED by filename (see Section 4)                  │
│                                                                    │
│  3. Legacy en-gu-month1.js auto-loader                            │
│     └─ Backward compatibility only                                 │
│                                                                    │
│  4. Empty skeleton (graceful fallback)                             │
│     └─ Shows "Content coming soon" UI                              │
└──────────────────────────────────────────────────────────────────┘
```

When the app loads an activity page (`activity-lesson.html?id=1&lang=gujarati`):
1. `content-loader.js` reads the language pair from URL/localStorage
2. Fetches `data/languages/{src}/{tgt}/meta.json` to find the file path for activity ID `1`
3. Fetches the JSON file (e.g., `month-1/week-1-lesson.json`)
4. Checks localStorage for admin overrides (localStorage wins if present and not `_autoLoaded`)
5. Renders blocks using `blocks-renderer.js`

---

## 2. Directory Structure

```
data/
├── README.md                          ← THIS FILE
├── activities-content.js              ← localStorage layer (admin overrides)
├── blocks-renderer.js                 ← Shared renderer for all 29 block types
├── content-loader.js                  ← JSON file fetcher & bridge to LWContent
├── roadmap-data.js                    ← Roadmap structure, activity IDs, month meta
├── en-gu-month1.js                    ← Legacy auto-loader (kept for compat)
│
└── languages/
    ├── index.json                     ← All language metadata (source + target)
    ├── _activity-stub.json            ← Empty template for new activities
    │
    ├── en/                            ← Source language: English
    │   ├── gu/                        ← Target: Gujarati — ACTIVE CONTENT
    │   │   ├── README.md              ← AI generation guide for en→gu
    │   │   ├── meta.json              ← Complete activity-ID → file map
    │   │   ├── month-1/               ← 43 JSON files (all activities)
    │   │   │   ├── week-1-lesson.json           (ID: 1)
    │   │   │   ├── week-1-vocab.json            (ID: 2)
    │   │   │   ├── week-1-reading.json          (ID: 3)
    │   │   │   ├── week-1-pronunciation.json    (ID: 4)
    │   │   │   ├── week-1-writing.json          (ID: 5)
    │   │   │   ├── week-1-listening.json        (ID: 6)
    │   │   │   ├── week-1-test.json             (ID: 7)
    │   │   │   ├── week-1-speaking.json         (ID: 8)
    │   │   │   ├── week-1-vocab-review.json     (ID: 9)
    │   │   │   ├── week-1-pronunciation-2.json  (ID: 10)
    │   │   │   ├── week-2-lesson.json           (ID: 11)
    │   │   │   ├── ... (11 files per week-2)
    │   │   │   ├── week-2-midtest.json          (ID: 21)
    │   │   │   ├── week-3-lesson.json           (ID: 22)
    │   │   │   ├── ... (11 files per week-3)
    │   │   │   ├── week-3-midtest.json          (ID: 32)
    │   │   │   ├── week-4-lesson.json           (ID: 33)
    │   │   │   ├── ... (10 files per week-4)
    │   │   │   └── milestone.json               (ID: 43)
    │   │   └── month-2/               ← 43 more JSON files (IDs 101-143)
    │   ├── hi/  es/  fr/  de/  ar/  ja/  zh/  pt/  ko/   ← stub dirs
    ├── hi/  es/  fr/  de/  ar/  ja/  zh/  pt/  ko/       ← other sources
    └── index.json
```

**Available source languages (10):** `en` `hi` `es` `fr` `de` `ar` `ja` `zh` `pt` `ko`

**Available target languages (11):** `en` `hi` `gu` `es` `fr` `de` `ar` `ja` `zh` `pt` `ko`

---

## 3. Complete Activity ID Reference

**CRITICAL: Every JSON file has a fixed, hard-coded activity ID. The `"id"` field in your JSON must exactly match this table.**

The ID formula: `id = (monthIndex × 100) + positionWithinMonth`

### Month 1 — IDs 1–43

| ID | Type | File | Week |
|----|------|------|------|
| **1**  | lesson        | `month-1/week-1-lesson.json`          | Week 1 |
| **2**  | vocab         | `month-1/week-1-vocab.json`           | Week 1 |
| **3**  | reading       | `month-1/week-1-reading.json`         | Week 1 |
| **4**  | pronunciation | `month-1/week-1-pronunciation.json`   | Week 1 |
| **5**  | writing       | `month-1/week-1-writing.json`         | Week 1 |
| **6**  | listening     | `month-1/week-1-listening.json`       | Week 1 |
| **7**  | test          | `month-1/week-1-test.json`            | Week 1 |
| **8**  | speaking      | `month-1/week-1-speaking.json`        | Week 1 |
| **9**  | vocab_review  | `month-1/week-1-vocab-review.json`    | Week 1 |
| **10** | pronunciation | `month-1/week-1-pronunciation-2.json` | Week 1 |
| **11** | lesson        | `month-1/week-2-lesson.json`          | Week 2 |
| **12** | vocab         | `month-1/week-2-vocab.json`           | Week 2 |
| **13** | reading       | `month-1/week-2-reading.json`         | Week 2 |
| **14** | pronunciation | `month-1/week-2-pronunciation.json`   | Week 2 |
| **15** | writing       | `month-1/week-2-writing.json`         | Week 2 |
| **16** | listening     | `month-1/week-2-listening.json`       | Week 2 |
| **17** | test          | `month-1/week-2-test.json`            | Week 2 |
| **18** | speaking      | `month-1/week-2-speaking.json`        | Week 2 |
| **19** | reading_ext   | `month-1/week-2-reading-ext.json`     | Week 2 |
| **20** | pronunciation | `month-1/week-2-pronunciation-2.json` | Week 2 |
| **21** | midtest       | `month-1/week-2-midtest.json`         | Week 2 |
| **22** | lesson        | `month-1/week-3-lesson.json`          | Week 3 |
| **23** | vocab         | `month-1/week-3-vocab.json`           | Week 3 |
| **24** | reading       | `month-1/week-3-reading.json`         | Week 3 |
| **25** | pronunciation | `month-1/week-3-pronunciation.json`   | Week 3 |
| **26** | writing       | `month-1/week-3-writing.json`         | Week 3 |
| **27** | listening     | `month-1/week-3-listening.json`       | Week 3 |
| **28** | test          | `month-1/week-3-test.json`            | Week 3 |
| **29** | speaking      | `month-1/week-3-speaking.json`        | Week 3 |
| **30** | vocab_review  | `month-1/week-3-vocab-review.json`    | Week 3 |
| **31** | pronunciation | `month-1/week-3-pronunciation-2.json` | Week 3 |
| **32** | midtest       | `month-1/week-3-midtest.json`         | Week 3 |
| **33** | lesson        | `month-1/week-4-lesson.json`          | Week 4 |
| **34** | vocab         | `month-1/week-4-vocab.json`           | Week 4 |
| **35** | reading       | `month-1/week-4-reading.json`         | Week 4 |
| **36** | pronunciation | `month-1/week-4-pronunciation.json`   | Week 4 |
| **37** | writing       | `month-1/week-4-writing.json`         | Week 4 |
| **38** | listening     | `month-1/week-4-listening.json`       | Week 4 |
| **39** | test          | `month-1/week-4-test.json`            | Week 4 |
| **40** | speaking      | `month-1/week-4-speaking.json`        | Week 4 |
| **41** | reading_ext   | `month-1/week-4-reading-ext.json`     | Week 4 |
| **42** | pronunciation | `month-1/week-4-pronunciation-2.json` | Week 4 |
| **43** | milestone     | `month-1/milestone.json`              | End    |

### Month 2–6 ID Pattern

```
Month N: IDs (N-1)×100 + 1  →  (N-1)×100 + 43
Month 2: 101–143
Month 3: 201–243
Month 4: 301–343
Month 5: 401–443
Month 6: 501–543 (+ final_exam: 544)
```

The internal week pattern is identical in every month — just add the month offset:
- `month-2/week-1-lesson.json` → ID **101**
- `month-2/week-2-midtest.json` → ID **121**
- `month-3/milestone.json` → ID **243**

---

## 4. File Naming Conventions

### RULE: The content-loader resolves files ONLY via `meta.json`

The `meta.json` in each language pair directory maps every activity ID to its file path. The app **does not** auto-detect files by name — the name must be registered in `meta.json`.

### Standard file names (use these exactly)

```
month-{M}/
  week-1-lesson.json            week-2-lesson.json
  week-1-vocab.json             week-2-vocab.json
  week-1-reading.json           week-2-reading.json
  week-1-pronunciation.json     week-2-pronunciation.json
  week-1-writing.json           week-2-writing.json
  week-1-listening.json         week-2-listening.json
  week-1-test.json              week-2-test.json
  week-1-speaking.json          week-2-speaking.json
  week-1-vocab-review.json      week-2-reading-ext.json
  week-1-pronunciation-2.json   week-2-pronunciation-2.json
                                week-2-midtest.json     ← ONLY weeks 2 & 3 get this
  week-3-...                    week-4-...
  week-3-midtest.json           (week-4 has no midtest)
  milestone.json
```

### Registering a file in meta.json

Every file must have an entry in `meta.json` under the correct week:
```json
{
  "id": 1,
  "type": "lesson",
  "file": "month-1/week-1-lesson.json",
  "xp": 30
}
```

### Activity `"type"` field values (must match exactly)
```
lesson | vocab | reading | pronunciation | writing | listening | test | speaking | milestone | final_exam
```

---

## 5. JSON Schema — All 29 Block Types

### Base Activity Schema

```json
{
  "id": 1,
  "type": "lesson",
  "title": "Activity Title Here",
  "description": "One-sentence description shown on the roadmap card.",
  "duration": "15 min",
  "xp": 30,
  "week": 1,
  "month": 1,
  "langPair": "en-gu",
  "tags": ["tag1", "tag2"],
  "blocks": [ ...block objects... ]
}
```

---

### BLOCK TYPE 1: `text` — Explanation / Narrative Section
```json
{
  "id": "b1", "type": "text",
  "title": "Section Title",
  "body": "Paragraph text. Use \\n for new lines.\nTarget language characters ગ will auto-highlight in the UI.\nTip: write in the SOURCE language (the teaching language)."
}
```

---

### BLOCK TYPE 2: `keypoints` — Bulleted List
```json
{
  "id": "b2", "type": "keypoints",
  "title": "Key Points",
  "points": [
    "First point — can include target language characters",
    "ગ (ga) — like 'g' in 'go'",
    "Third point with explanation"
  ]
}
```

---

### BLOCK TYPE 3: `tip` — Highlighted Note
```json
{
  "id": "b3", "type": "tip",
  "body": "💡 Use emojis for visual impact. This block renders with a yellow left border."
}
```

---

### BLOCK TYPE 4: `audio` — Audio Clip
```json
{
  "id": "b4", "type": "audio",
  "label": "Native Speaker Audio",
  "url": "https://cdn.example.com/audio/file.mp3",
  "transcript": "ગ-જ-ર-ત- (Gujarati) — the transcript shown below the player"
}
```
> Set `"url": null` for placeholder until real audio is available.

---

### BLOCK TYPE 5: `grammar_rule` — Grammar Pattern with Examples
```json
{
  "id": "b5", "type": "grammar_rule",
  "title": "Verb Conjugation Pattern",
  "pattern": "Subject + Object + Verb + છ-",
  "examples": [
    { "native": "I food eat am",   "target": "હ-ં ખ-ર-ક ખ-ઉ છ-ં", "translation": "I eat food" },
    { "native": "She book reads", "target": "ત- પ-સ-તક વ-ંચ- છ-",  "translation": "She reads a book" }
  ],
  "note": "Optional: exception or extra tip about this rule."
}
```

---

### BLOCK TYPE 6: `dialogue` — Chat Bubble Conversation
```json
{
  "id": "b6", "type": "dialogue",
  "title": "Sample Dialogue",
  "speakers": ["Person A", "Person B"],
  "lines": [
    { "speaker": 0, "text": "ન-મ-સ-ત-!",  "romanization": "Namaste!", "translation": "Hello!" },
    { "speaker": 1, "text": "ક-મ છ-?",   "romanization": "Kem chho?", "translation": "How are you?" },
    { "speaker": 0, "text": "સ-ર-ં છ-ં!", "romanization": "Saarun chhun!", "translation": "I'm fine!" }
  ]
}
```
> `speaker` is 0-indexed. Alternating 0/1 creates left/right chat bubbles. Max 4 unique speakers.

---

### BLOCK TYPE 7: `comparison_table` — Side-by-Side Comparison
```json
{
  "id": "b7", "type": "comparison_table",
  "title": "English vs Target Language",
  "headers": ["English", "Target Language", "Pronunciation"],
  "rows": [
    ["Hello",     "ન-મ-સ-ત-", "Namaste"],
    ["Thank you", "આ-ભ-ર",   "Aabhaar"],
    ["Yes",       "હ-",        "Haa"],
    ["No",        "ન-",        "Naa"]
  ]
}
```
> Column 2 (index 1) auto-renders in the target script font.

---

### BLOCK TYPE 8: `vocab_table` — Word List with Meanings
```json
{
  "id": "b8", "type": "vocab_table",
  "title": "Vocabulary List",
  "words": [
    { "word": "ન-મ-સ-ત-", "meaning": "Hello / Goodbye", "example": "ન-મ-સ-ત-, ક-મ છ-? — Hello, how are you?" },
    { "word": "આ-ભ-ર",   "meaning": "Thank you",         "example": "ખ-બ ખ-બ આ-ભ-ર — Thank you very much" }
  ]
}
```
> Each week's vocab activity should contain **25 words** minimum.

---

### BLOCK TYPE 9: `image_word` — Emoji + Word Visual Cards
```json
{
  "id": "b9", "type": "image_word",
  "title": "Visual Vocabulary",
  "items": [
    { "emoji": "🏠", "word": "ઘ-ર", "meaning": "House",  "example": "My home is in Gujarat" },
    { "emoji": "💧", "word": "પ-ણ-", "meaning": "Water", "example": "Please give water" }
  ]
}
```

---

### BLOCK TYPE 10: `word_family` — Root Word Cluster
```json
{
  "id": "b10", "type": "word_family",
  "title": "Word Family",
  "root": "ROOT WORD IN TARGET SCRIPT",
  "rootMeaning": "Root meaning in source language",
  "members": [
    { "word": "derived word 1", "meaning": "meaning 1" },
    { "word": "derived word 2", "meaning": "meaning 2" }
  ]
}
```

---

### BLOCK TYPE 11: `vocabulary_spotlight` — Deep-Dive Word Feature
```json
{
  "id": "b11", "type": "vocabulary_spotlight",
  "word": "TARGET WORD",
  "meaning": "English meaning",
  "pronunciation": "how-to-say-it",
  "partOfSpeech": "noun",
  "examples": [
    { "gu": "Target language sentence.", "en": "English translation." }
  ],
  "relatedWords": ["related 1 (meaning)", "related 2 (meaning)"],
  "culturalNote": "Optional cultural context about this word."
}
```

---

### BLOCK TYPE 12: `minimal_pairs` — Sound Contrast
```json
{
  "id": "b12", "type": "minimal_pairs",
  "title": "Sound Contrast Pairs",
  "instruction": "Can you hear the difference?",
  "pairs": [
    { "word1": "CHAR1", "word2": "CHAR2", "sound1": "sound1 desc", "sound2": "sound2 desc", "diff": "what differs" }
  ]
}
```

---

### BLOCK TYPE 13: `stress_pattern` — Syllable Stress Visualizer
```json
{
  "id": "b13", "type": "stress_pattern",
  "title": "Where Is the Stress?",
  "words": [
    { "word": "full-word-in-script", "syllables": ["syl","la","ble"], "stressed": 0, "note": "first syllable stressed" }
  ]
}
```
> `stressed` = 0-indexed position of the stressed syllable.

---

### BLOCK TYPE 14: `tongue_twister` — Speed Practice
```json
{
  "id": "b14", "type": "tongue_twister",
  "title": "Tongue Twister",
  "text": "TARGET LANGUAGE TONGUE TWISTER TEXT",
  "romanization": "Romanized pronunciation",
  "translation": "What it means in source language",
  "tip": "Tip for practicing this specific sound pattern"
}
```

---

### BLOCK TYPE 15: `roleplay_card` — Role-Play Setup
```json
{
  "id": "b15", "type": "roleplay_card",
  "title": "Scene Title",
  "scenario": "Short scenario name (e.g. At the market)",
  "yourRole": "Your role (e.g. Customer)",
  "partnerRole": "Partner's role (e.g. Shopkeeper)",
  "context": "Full scenario description — where you are and what's happening.",
  "goal": "What you need to accomplish in this conversation.",
  "usefulPhrases": [
    "TARGET PHRASE (Source language meaning)",
    "Another phrase (meaning)"
  ]
}
```

---

### BLOCK TYPE 16: `speaking` — Free Speaking Prompt
```json
{
  "id": "b16", "type": "speaking",
  "prompt": "Description of what the learner should say/practice.",
  "hints": [
    "TARGET PHRASE (translation)",
    "Another hint (translation)"
  ]
}
```

---

### BLOCK TYPE 17: `fill_blank` — Fill in the Blank
```json
{
  "id": "b17", "type": "fill_blank",
  "title": "Complete the Sentences",
  "instructions": "Optional instruction text",
  "items": [
    { "sentence": "The word ___ means Hello.", "answer": "CORRECT ANSWER", "hint": "optional hint" }
  ]
}
```
> Use `___` (triple underscore) for each blank. Answer is case-insensitive matched.

---

### BLOCK TYPE 18: `sentence_builder` — Click-to-Order Words
```json
{
  "id": "b18", "type": "sentence_builder",
  "title": "Build the Sentence",
  "translation": "What the sentence means (source language)",
  "words": ["word1", "word2", "word3", "distractor"],
  "correctOrder": [2, 0, 1]
}
```
> `correctOrder` = 0-indexed positions of correct words. The rest are distractors.

---

### BLOCK TYPE 19: `translation_task` — Translation Exercise
```json
{
  "id": "b19", "type": "translation_task",
  "title": "Translation Practice",
  "instruction": "Translate to [target language]",
  "items": [
    { "source": "Source language phrase", "answer": "Target language answer (romanization OK)" }
  ]
}
```

---

### BLOCK TYPE 20: `matching` — Match Two Columns
```json
{
  "id": "b20", "type": "matching",
  "title": "Match the Pairs",
  "instruction": "Tap a word on left, then its match on right",
  "leftItems":  ["TARGET WORD 1", "TARGET WORD 2", "TARGET WORD 3"],
  "rightItems": ["Source meaning 3", "Source meaning 1", "Source meaning 2"],
  "pairs": [[0,1],[1,2],[2,0]]
}
```
> `pairs` = array of `[leftIndex, rightIndex]` — showing correct connections.

---

### BLOCK TYPE 21: `ordering` — Arrange in Correct Order
```json
{
  "id": "b21", "type": "ordering",
  "title": "Put in Order",
  "instruction": "Arrange to form a correct sentence",
  "words": ["word3", "word1", "word4", "word2"],
  "correctOrder": [1, 3, 0, 2]
}
```

---

### BLOCK TYPE 22: `quiz` — Multiple Choice Question
```json
{
  "id": "b22", "type": "quiz",
  "question": "Quiz question text? Can include target language characters.",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 1,
  "explanation": "Why option B (index 1) is correct. Give educational context."
}
```
> `correct` = 0-indexed. Always 4 options. Include explanation for learning value.

---

### BLOCK TYPE 23: `true_false` — True or False Questions
```json
{
  "id": "b23", "type": "true_false",
  "title": "True or False?",
  "items": [
    { "statement": "Statement to evaluate.", "answer": true,  "explanation": "Why true." },
    { "statement": "Another statement.",     "answer": false, "explanation": "Why false." }
  ]
}
```

---

### BLOCK TYPE 24: `reading` — Passage + Comprehension
```json
{
  "id": "b24", "type": "reading",
  "passage": "📖 TITLE\n\nParagraph with TARGET LANG text inline.\nTarget characters auto-highlight.\n\nSecond paragraph...",
  "questions": [
    { "q": "Comprehension question?", "a": "Answer to the question." }
  ]
}
```
> Use `\n` for line breaks. Start with `📖 TITLE` pattern for best rendering.

---

### BLOCK TYPE 25: `writing` — Open Writing Task
```json
{
  "id": "b25", "type": "writing",
  "prompt": "Write a short paragraph about [topic]. Include [specific requirements].",
  "minWords": 40,
  "sampleAnswer": "Example answer showing what a good response looks like.\nMulti-line is fine."
}
```

---

### BLOCK TYPE 26: `note_template` — Structured Note-Taking
```json
{
  "id": "b26", "type": "note_template",
  "title": "Listening Notes",
  "instruction": "Listen and fill in your notes:",
  "sections": [
    { "label": "Question or prompt label:", "placeholder": "What to type here..." }
  ]
}
```

---

### BLOCK TYPE 27: `gap_fill` — Fill Transcript Gaps
```json
{
  "id": "b27", "type": "gap_fill",
  "title": "Complete the Transcript",
  "text": "First word is ___ and second is ___ in this sentence.",
  "gaps": ["answer1", "answer2"],
  "hints": ["hint for gap 1", "hint for gap 2"]
}
```
> Count `___` occurrences must match `gaps` array length exactly.

---

### BLOCK TYPE 28: `cultural_note` — Cultural Context
```json
{
  "id": "b28", "type": "cultural_note",
  "title": "Cultural Note Title",
  "icon": "🌍",
  "content": "Cultural context paragraph. Can mention target language words inline.",
  "tags": ["culture", "topic-tag"]
}
```

---

### BLOCK TYPE 29: `progress_checkpoint` — Checklist
```json
{
  "id": "b29", "type": "progress_checkpoint",
  "title": "Can You Do This?",
  "items": [
    "Skill or knowledge to check",
    "Another skill to verify"
  ],
  "xpBonus": 15
}
```

---

## 6. 6-Month Curriculum Map

```
Month 1: A1  — Sound Foundation & Survival Basics
Month 2: A1+ — Sentence Building & Core Grammar
Month 3: A2  — Functional Communication
Month 4: A2+ — Intermediate Fluency & Culture
Month 5: B1  — Advanced Expression & Immersion
Month 6: B1+ — Mastery & Certification
```

Each month = **43 activities** = 4 weeks × (8 core + 2 extra) + 2 mid-tests + 1 milestone

Total: **258 activities** per language pair (6 months × 43)

---

## 7. Month-by-Month Content Guide

### MONTH 1 — Sound Foundation & Survival Basics (A1)
**Goal:** Learner can introduce themselves, handle basic greetings, read the script, count to 100, and form simple sentences.

| Week | Theme | Vocabulary Focus | Grammar Focus |
|------|-------|-----------------|---------------|
| 1 | Script, Vowels & Greetings | 25 greeting/essential words | Alphabet, vowels |
| 2 | Consonants & Daily Objects | 25 daily objects & places | Basic consonants, syllables |
| 3 | Numbers, Time & Questions | 25 numbers/time/questions | Numbers 1-100, days of week |
| 4 | Basic Sentences & Family | 25 family/emotions/adjectives | SOV sentence order, basic verbs |

**Month 1 Content Requirements:**
- Every lesson must introduce the script/romanization side-by-side
- Include IPA or mouth-position guides for pronunciation blocks
- Every vocab block = exactly 25 words minimum
- Test blocks = exactly 10 quiz questions per weekly test
- Mid-tests = 20 questions covering 2 weeks of material
- Cultural notes: 1 per week minimum about the target language's culture

---

### MONTH 2 — Sentence Building & Core Grammar (A1+)
**Goal:** Present tense verbs, shopping, food, directions, time expressions.

| Week | Theme | Vocabulary Focus | Grammar Focus |
|------|-------|-----------------|---------------|
| 5  | Daily Routines & Present Tense | 25 action verbs | Present tense conjugation |
| 6  | Shopping, Money & Transactions | 25 shopping/money words | Numbers in context, prices |
| 7  | Food, Restaurants & Cooking | 25 food/restaurant words | Adjectives, descriptions |
| 8  | Directions, Transport & Places | 25 location/transport words | Prepositions, imperatives |

**Month 2 Content Requirements:**
- Lesson blocks must show verb conjugation tables
- Reading passages should be 150-200 words (longer than Month 1)
- Include real-world scenarios (shopping dialogues, restaurant orders)
- Writing tasks: 50 words minimum
- Pronunciation focus: connected speech, natural rhythm

---

### MONTH 3 — Functional Communication (A2)
**Goal:** Talk about past and future events, professions, travel.

| Week | Theme | Vocabulary Focus | Grammar Focus |
|------|-------|-----------------|---------------|
| 9  | Past Tense & Memories | 25 past-time expressions | Past tense verbs |
| 10 | Future Plans & Intentions | 25 future-time expressions | Future tense / will/going to |
| 11 | Professions & Work Life | 25 profession/workplace words | Describing jobs, routines |
| 12 | Travel, Hotels & Tourism | 25 travel/tourism words | Travel language, formal requests |

**Month 3 Content Requirements:**
- Lessons must contrast past/present/future clearly
- Include timeline diagrams where helpful
- Speaking scenarios: airport, hotel, workplace conversations
- Reading passages: 200-250 words
- Writing: 60 words minimum, paragraph structure

---

### MONTH 4 — Intermediate Fluency & Culture (A2+)
**Goal:** Social conversations, emotions, weather, health, media.

| Week | Theme | Vocabulary Focus | Grammar Focus |
|------|-------|-----------------|---------------|
| 13 | Social Life, Relationships & Parties | 25 social/relationship words | Expressing likes/dislikes |
| 14 | Weather, Seasons & Nature | 25 weather/nature words | Descriptions, comparisons |
| 15 | Health, Body & Medical | 25 health/body words | Expressing problems, symptoms |
| 16 | Media, News & Entertainment | 25 media/entertainment words | Reported speech, opinions |

**Month 4 Content Requirements:**
- Increase cultural notes to 2+ per week
- Introduce idiomatic expressions
- Conversations should feel natural (not textbook)
- Writing tasks: journal-style, 75 words minimum
- Listening transcripts: 200+ words

---

### MONTH 5 — Advanced Expression & Immersion (B1)
**Goal:** Express complex ideas, opinions, hypotheticals, cultural immersion.

| Week | Theme | Vocabulary Focus | Grammar Focus |
|------|-------|-----------------|---------------|
| 17 | Conditional & Hypothetical | 25 conditional expressions | If-then clauses, subjunctive |
| 18 | Opinions, Arguments & Debate | 25 debate/opinion words | Agreeing, disagreeing, nuance |
| 19 | Culture, Literature & Idioms | 25 cultural/literary words | Idioms, proverbs, metaphors |
| 20 | Abstract Concepts | 25 abstract/philosophical words | Complex subordination |

**Month 5 Content Requirements:**
- Authentic texts from literature (simplified)
- Proverbs/idioms with cultural context
- Debate-style speaking exercises
- Writing: 100 words minimum, argumentative style
- Introduce regional dialect variations

---

### MONTH 6 — Mastery & Certification (B1+)
**Goal:** Professional communication, formal writing, final exam preparation.

| Week | Theme | Vocabulary Focus | Grammar Focus |
|------|-------|-----------------|---------------|
| 21 | Regional Dialects & Slang | 25 slang/dialect words | Regional variations |
| 22 | Professional & Formal Communication | 25 business/formal words | Formal register, polite forms |
| 23 | Advanced Reading & Writing | 25 academic/literary words | Essay structure, complex sentences |
| 24 | Comprehensive Review & Exam Prep | Review all 6 months | All grammar points |

**Month 6 Content Requirements:**
- All test blocks: 20 questions (comprehensive)
- Reading passages: 300+ words
- Writing: 120 words minimum, formal essay
- Final exam (ID 544): 50 questions covering all 6 months
- Milestone block: achievement summary with skills gained

---

## 8. Activity Content Requirements

### Per Activity Type — Minimum Content Rules

| Activity | Min Blocks | Required Block Types | Target Words/Questions |
|----------|-----------|---------------------|----------------------|
| `lesson` | 6 | text OR grammar_rule, keypoints, tip, comparison_table OR dialogue, fill_blank, progress_checkpoint | — |
| `vocab` | 3 | image_word, vocab_table, matching | 25 vocabulary words |
| `reading` | 3 | reading, true_false, cultural_note | 150–300 word passage, 4 questions |
| `pronunciation` | 4 | keypoints, minimal_pairs, stress_pattern, tongue_twister | 13+ phonemes covered |
| `writing` | 3 | sentence_builder, translation_task, writing | 30–120 word prompt |
| `listening` | 3 | note_template, gap_fill, true_false | 3–4 note sections, 3 gaps |
| `speaking` | 2 | roleplay_card, speaking | 2+ speaking scenarios |
| `test` | 2 | quiz × 10 (weekly) or quiz × 20 (midtest) | 10 or 20 questions |
| `vocab_review` | 2 | vocab_table, matching OR true_false | 15–20 review words |
| `pronunciation_2` | 3 | keypoints, stress_pattern OR tongue_twister, true_false | 5+ sounds |
| `milestone` | 2 | text OR keypoints, progress_checkpoint | 5+ achievement points |

### Vocabulary Counts Per Month

| Month | Words per vocab activity | Total new words per month |
|-------|------------------------|--------------------------|
| 1 | 25 | ~175 (25 × 7 vocab/vocab_review blocks) |
| 2 | 25 | ~175 |
| 3 | 25 | ~175 |
| 4 | 30 | ~210 |
| 5 | 30 | ~210 |
| 6 | 35 | ~245 |
| **Total** | | **~1,190 unique words** |

### XP Values (follow these exactly)

| Activity Type | XP |
|--------------|-----|
| lesson | 30 |
| vocab | 20 |
| reading | 25 |
| pronunciation | 30 |
| writing | 35 |
| listening | 40 |
| test (weekly, 10 Q) | 50 |
| speaking | 35 |
| vocab_review | 20 |
| pronunciation_2 | 30 |
| midtest (20 Q) | 75 |
| milestone | 100 |
| final_exam | 500 |

---

## 9. AI Generation Instructions

### For AI Agents: How to Generate a Complete Language Pair

**Prerequisites:** Read this README + the language pair's `README.md` before starting.

#### Step 1: Understand Your Language Pair
```
From the language pair README, note:
- Source language (teaching language): All explanations in THIS language
- Target language (learning language): All target script text in THIS language
- Script system: What alphabet/script the target uses
- Difficulty: A (easy), B (moderate), C (hard)
- Cultural context: Key cultural notes to weave in
```

#### Step 2: Plan Your File List
For each month, you will create exactly **43 JSON files**:
```
week-1-lesson.json, week-1-vocab.json, week-1-reading.json,
week-1-pronunciation.json, week-1-writing.json, week-1-listening.json,
week-1-test.json, week-1-speaking.json, week-1-vocab-review.json,
week-1-pronunciation-2.json,
week-2-lesson.json, ..., week-2-midtest.json,
week-3-lesson.json, ..., week-3-midtest.json,
week-4-lesson.json, ...,
milestone.json
```

#### Step 3: Set the Correct Activity ID
**This is critical.** The `"id"` field in every JSON must match the table in Section 3:
- Month 1, Week 1 Lesson = `"id": 1`
- Month 1, Week 2 Lesson = `"id": 11`
- Month 2, Week 1 Lesson = `"id": 101`

#### Step 4: Write Content in the Correct Language Mix
```
- All explanations, instructions, hints → SOURCE language
- All target language examples → TARGET script + romanization + source translation
- Cultural notes → SOURCE language (discuss TARGET culture)
- Vocabulary "word" field → TARGET script
- Vocabulary "meaning" field → SOURCE language
- Grammar patterns → Mix (show structure clearly)
```

#### Step 5: Use Appropriate Block Types Per Activity
Follow the Activity Content Requirements table in Section 8.

#### Step 6: Validate Before Submitting
- [ ] Every `"id"` matches the ID table in Section 3
- [ ] `"type"` field matches the activity file type
- [ ] `"week"` and `"month"` fields are correct
- [ ] All vocab activities have 25+ words
- [ ] All test activities have exactly 10 or 20 quiz blocks
- [ ] `"langPair"` is set (e.g. `"en-gu"`)
- [ ] All blocks have unique `"id"` strings within the file
- [ ] File path matches what's registered in `meta.json`

#### Step 7: Update meta.json
After generating files, add each activity to the correct week in `meta.json`:
```json
{ "id": 1, "type": "lesson", "file": "month-1/week-1-lesson.json", "xp": 30 }
```

### AI Prompt Template

When asking an AI to generate content, use this prompt structure:

```
I need you to generate LearnWise content for the [SOURCE]→[TARGET] language pair.

Context files to read:
1. data/README.md (this file — schema + structure)
2. data/languages/[src]/[tgt]/README.md (language pair context)

Generate the following file:
- File: data/languages/[src]/[tgt]/month-1/week-1-lesson.json
- Activity ID: 1
- Type: lesson
- Week: 1 (Theme: [theme from curriculum map])

Requirements:
- All explanations in [SOURCE language]
- All target language examples with romanization and [SOURCE] translation
- Include blocks: text, grammar_rule, dialogue, comparison_table, fill_blank, tip, progress_checkpoint
- 6-8 blocks total
- Follow the JSON schema exactly as defined in README.md Section 5

Cultural context: [paste relevant section from language pair README]
```

---

## 10. Admin Panel Guide

### Opening Admin
Navigate to `admin.html` from any page via the **Admin** link in the top nav.

### Editing Activities
1. Select language in the left sidebar
2. Filter by activity type (top of sidebar)
3. Click an activity in the center list
4. Edit blocks in the right panel (4 tabs: Info | Blocks | Settings | Preview)
5. Click **Save Activity** — saves to localStorage (overrides JSON)
6. Click **JSON ↓** — downloads current state as a JSON file to use in production

### 3-Device Preview
In the **Preview** tab:
- 📱 Phone (375px) | 📱 Tablet (768px) | 💻 Desktop (1200px)
- Click **Refresh** after editing to see changes

### Syncing Admin Edits Back to JSON Files
1. Edit in admin → click **JSON ↓** to download
2. Rename file to match the standard naming convention (Section 4)
3. Move to `data/languages/{src}/{tgt}/month-N/` directory
4. Register in `meta.json` if not already there
5. Admin localStorage override will be cleared on next `↺ Reload` from JSON

### Import / Export Bundles
- **Export All**: Use `LWLoader.exportBundle('en','gu')` in browser console
- **Import**: Use the **Import JSON** button in admin toolbar

---

## 11. Content Loader API

```javascript
// Load all content for a language pair
await LWLoader.loadPair('en', 'gu');

// Get content for a specific activity (priority: localStorage > JSON)
const content = await LWLoader.getContent(1, 'en', 'gu');

// Force reload from JSON file (overwrites localStorage for this activity)
const data = await LWLoader.reload(1, 'en', 'gu');

// Get language pair metadata + file map
const meta = await LWLoader.getPairMeta('en', 'gu');

// Export one activity as JSON string
const json = LWLoader.exportActivityJSON(1, 'en', 'gu');

// Export all loaded activities as a bundle
const bundle = LWLoader.exportBundle('en', 'gu');

// Clear in-memory cache (force re-fetch)
LWLoader.clearCache('en', 'gu');

// Listen for content-ready event
window.addEventListener('lw-content-ready', e => {
  console.log('Content loaded for:', e.detail.src, '→', e.detail.tgt);
});
```

---

## Quick Reference

| Task | Action |
|------|--------|
| Add new language pair | Create `meta.json` + JSON files + register in `index.json` |
| Generate with AI | Give AI this README + the language pair's README |
| Edit existing content | Edit `.json` file OR use admin panel |
| Sync admin edits to JSON | Click "JSON ↓" in admin → copy to languages dir |
| Preview on device sizes | Admin → Preview tab |
| Find activity ID for a file | See Section 3 ID table |
| Know correct file name | See Section 4 naming rules |
| See block type schema | See Section 5 |
| Know month content | See Section 7 |

---

*LearnWise Master Reference v3.0*
