/**
 * LearnWise Shared Init Utilities — lw-init.js
 * ─────────────────────────────────────────────
 * Provides a single async loadActivityContent() helper for all activity pages.
 * Replaces the broken 150ms setTimeout pattern (BUG #4).
 *
 * Usage in activity pages:
 *   const cnt = await LWInit.loadActivityContent(AID, LANG);
 */
window.LWInit = {

  LANG_TO_ISO: {
    gujarati: 'gu', hindi:    'hi', spanish:    'es', french:     'fr',
    german:   'de', arabic:   'ar', japanese:   'ja', mandarin:   'zh',
    portuguese:'pt', korean:  'ko', english:    'en', russian:    'ru',
    italian:  'it'
  },

  ISO_NAMES: {
    gu:'Gujarati', hi:'Hindi', es:'Spanish', fr:'French',
    de:'German',  ar:'Arabic', ja:'Japanese', zh:'Mandarin',
    pt:'Portuguese', ko:'Korean', en:'English', ru:'Russian', it:'Italian'
  },

  /** Returns the active {src, tgt, pair} from localStorage lw_lang_pair */
  getLangPair() {
    try {
      const lp  = JSON.parse(localStorage.getItem('lw_lang_pair') || '{}');
      const src = this.LANG_TO_ISO[lp.fromId || 'english'] || 'en';
      const tgt = this.LANG_TO_ISO[lp.toId   || 'hindi']   || 'hi';
      return { src, tgt, pair: `${src}-${tgt}`, lp };
    } catch(e) {
      return { src: 'en', tgt: 'hi', pair: 'en-hi', lp: {} };
    }
  },

  /**
   * BUG #4 FIX: Load activity content correctly — no more 150ms timeout race.
   * Tries LWLoader (bundle/fetch), then falls back to LWContent (localStorage).
   */
  async loadActivityContent(actId, urlLang) {
    // Resolve the active pair (ignore URL lang param — use lw_lang_pair)
    const { src, tgt, pair } = this.getLangPair();

    // Set active pair for language-isolated storage (BUG #5 fix)
    if (typeof LWContent !== 'undefined' && LWContent.setActivePair) {
      LWContent.setActivePair(pair);
    }
    window.LW_ACTIVE_SRC  = src;
    window.LW_ACTIVE_TGT  = tgt;
    window.LW_ACTIVE_PAIR = pair;

    // Try LWLoader first (async, supports bundle + fetch)
    if (typeof LWLoader !== 'undefined') {
      const content = await LWLoader.getContent(actId, src, tgt);
      if (content) return content;
    }

    // Fallback: LWContent localStorage (legacy / admin-saved)
    if (typeof LWContent !== 'undefined') {
      return LWContent.getContent(actId);
    }

    return null;
  },

  /**
   * BUG #9 FIX: Returns a RegExp matching the target language's script.
   * Works for Hindi (Devanagari), Gujarati, Arabic, etc.
   */
  getScriptRegex(tgtISO) {
    const ranges = {
      hi: '\u0900-\u097F',             // Devanagari (Hindi, Marathi, Nepali)
      gu: '\u0A80-\u0AFF',             // Gujarati
      ar: '\u0600-\u06FF',             // Arabic
      ja: '\u3040-\u30FF\u4E00-\u9FAF',// Hiragana + Katakana + CJK
      zh: '\u4E00-\u9FAF',             // CJK (Chinese)
      ko: '\uAC00-\uD7AF',             // Hangul (Korean)
      ru: '\u0400-\u04FF',             // Cyrillic (Russian)
    };
    const r = ranges[tgtISO] || '\u0900-\u097F\u0A80-\u0AFF'; // Default: Hindi+Gujarati
    return new RegExp(`([${r}]+)`, 'g');
  },

  /** BUG #10 FIX: Returns the target language's display name dynamically */
  getTargetLangName() {
    return this.ISO_NAMES[window.LW_ACTIVE_TGT || 'hi'] || 'Target';
  },
};
