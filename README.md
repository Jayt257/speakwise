# LinguaLeap — Speech Recognition & Pronunciation App
### Production-Ready Multi-Page Website

---

## Project Structure

```
lingualeap/
├── index.html          → Login / Welcome screen
├── onboarding.html     → Language & goal selection
├── dashboard.html      → Home dashboard
├── roadmap.html        → Learning roadmap
├── vocabulary.html     → Domain-specific vocabulary
├── lesson.html         → Medical / domain lesson
├── active-lesson.html  → Active lesson exercise
├── speech.html         → Speech recognition & pronunciation
├── scenarios.html      → AI conversation scenarios
├── conversation.html   → AI conversation chat
├── leaderboard.html    → Global leaderboard
├── achievements.html   → Achievements & friends
├── heatmap.html        → Study activity heatmap
└── README.md           → This file
```

---

## Page Flow / User Journey

```
index.html  (Login)
    ↓
onboarding.html  (Language Selection)
    ↓
dashboard.html  (Home)
   ├──→ roadmap.html       (Learn tab)
   ├──→ vocabulary.html    (Vocabulary)
   ├──→ scenarios.html     (AI Scenarios)
   └──→ active-lesson.html (Continue Lesson)
         ↓
       speech.html         (Speech Recognition)
         ↓
       conversation.html   (AI Conversation)

dashboard.html
   └──→ leaderboard.html
   └──→ achievements.html
   └──→ heatmap.html
```

---

## Tech Stack

- **Pure HTML5 + CSS3** — No build tools required
- **Tailwind CSS** (CDN) — Utility-first styling
- **Material Symbols** — Icon system
- **Google Fonts** — Plus Jakarta Sans + Be Vietnam Pro
- **Vanilla JS** — Smooth page transitions, nav highlights, speech API

---

## Design System (Emerald Echo)

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#006d4a` | Buttons, active states |
| `primary-container` | `#69f6b8` | Progress fills, gradients |
| `secondary-container` | `#c8f17a` | CTA buttons, highlights |
| `surface` | `#f4faff` | Page background |
| `surface-container-low` | `#e7f6ff` | Section backgrounds |
| `on-surface` | `#1d3540` | All body text |

**No 1px borders** — Depth via background color shifts  
**Rounded-xl (1.5rem)** — Primary containers  
**Rounded-md (0.75rem)** — Nested elements

---

## How to Run

Simply open `index.html` in any modern browser — no server required.

For a local dev server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Screen ID Reference (from Stitch export)

| Screen ID | Maps to | Page |
|-----------|---------|------|
| SCREEN_2  | vocabulary.html | Domain Vocabulary |
| SCREEN_5  | dashboard.html | Home Dashboard |
| SCREEN_6  | conversation.html | AI Conversation |
| SCREEN_7  | scenarios.html | AI Scenarios |
| SCREEN_11 | leaderboard.html | Leaderboard |
| SCREEN_12 | heatmap.html | Study Heatmap |
| SCREEN_14 | active-lesson.html | Active Lesson |
| SCREEN_18 | dashboard.html | Home Dashboard |
| SCREEN_21 | lesson.html | Domain Lesson |
| SCREEN_23 | conversation.html | AI Conversation |
| SCREEN_30 | roadmap.html | Learning Roadmap |
| SCREEN_45 | speech.html | Speech Recognition |
| SCREEN_48 | onboarding.html | Onboarding |
