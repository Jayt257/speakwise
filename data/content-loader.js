/**
 * LearnWise Content Loader v2 — Fixed
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixes applied:
 *   - BUG #1: Now checks window.LW_CONTENT_BUNDLE first (works on file:// protocol)
 *   - BUG #2: autoInit() reads lw_lang_pair (not URL lang param) for ISO resolution
 *   - BUG #3: buildFileMap() supports meta.activities[], meta.activityMap, and weeks format
 *   - BUG #4: getContent() is now truly async-safe; activity pages should await it
 *
 * Priority order (highest → lowest):
 *   1. localStorage admin overrides (LWContent) — always takes precedence
 *   2. window.LW_CONTENT_BUNDLE (bundled JSON for file:// protocol)
 *   3. JSON files via fetch (works on HTTP server)
 *   4. Empty skeleton (graceful fallback)
 *
 * Usage:
 *   const content = await LWLoader.getContent(actId, 'en', 'hi');
 */

window.LWLoader = (function() {

  // ── In-memory JSON cache ────────────────────────────────────────────────
  const _cache = {};           // { "en-hi": { "1": {...}, "2": {...} } }
  const _metaCache = {};       // { "en-hi": metaObj }
  const _loadingPromises = {}; // prevent duplicate loads

  // ── Base path for JSON files ────────────────────────────────────────────
  const BASE_PATH = 'data/languages';

  // ── ISO mapping ──────────────────────────────────────────────────────────
  const LANG_TO_ISO = {
    gujarati: 'gu', hindi: 'hi', spanish: 'es', french: 'fr',
    german:   'de', arabic: 'ar', japanese: 'ja', mandarin: 'zh',
    portuguese: 'pt', korean: 'ko', english: 'en', russian: 'ru',
    italian: 'it', korean: 'ko'
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  function pairKey(src, tgt) { return `${src}-${tgt}`; }

  async function safeFetch(url) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) return null;
      return await res.json();
    } catch(e) {
      // Fails silently on file:// protocol — bundle fallback handles this
      return null;
    }
  }

  // ── FIX BUG #1: Load from bundle (works on file:// protocol) ────────────
  function loadFromBundle(src, tgt) {
    const key = pairKey(src, tgt);
    if (!window.LW_CONTENT_BUNDLE || !window.LW_CONTENT_BUNDLE[key]) return false;

    const bd = window.LW_CONTENT_BUNDLE[key];
    if (!_cache[key]) _cache[key] = {};

    Object.entries(bd).forEach(([actId, data]) => {
      // Don't overwrite admin-edited entries (those without _autoLoaded)
      if (LWContent) {
        const existing = LWContent.getContent(parseInt(actId));
        if (existing && !existing._autoLoaded) {
          _cache[key][actId] = existing;
          return;
        }
      }
      const entry = Object.assign({}, data, { _autoLoaded: true, _source: 'bundle' });
      _cache[key][actId] = entry;
      if (LWContent) LWContent.saveContent(parseInt(actId), entry);
    });

    console.log(`[LWLoader] Loaded ${Object.keys(bd).length} activities from bundle for ${key}`);
    return true;
  }

  // ── FIX BUG #3: Build file-path map supporting all meta.json formats ─────
  function buildFileMap(meta) {
    const map = {};
    if (!meta) return map;

    // Format A: flat activities[] array (en/hi meta.json)
    if (Array.isArray(meta.activities) && meta.activities.length > 0) {
      meta.activities.forEach(act => {
        if (act.id && act.file) {
          map[String(act.id)] = { file: act.file, type: act.type, xp: act.xp };
        }
      });
      if (Object.keys(map).length > 0) return map;
    }

    // Format B: activityMap object { "1": "month-1/week-1-lesson.json" }
    if (meta.activityMap && typeof meta.activityMap === 'object') {
      Object.entries(meta.activityMap).forEach(([id, file]) => {
        map[id] = { file };
      });
      if (Object.keys(map).length > 0) return map;
    }

    // Format C: months → weeks → activities[] with .file property
    if (Array.isArray(meta.months)) {
      meta.months.forEach(month => {
        (month.weeks || []).forEach(week => {
          (week.activities || []).forEach(act => {
            if (act.id && act.file) {
              map[String(act.id)] = { file: act.file, type: act.type, xp: act.xp };
            }
          });
        });
      });
    }

    return map;
  }

  // ── Load meta.json for a pair ────────────────────────────────────────────
  async function loadMeta(src, tgt) {
    const key = pairKey(src, tgt);
    if (_metaCache[key]) return _metaCache[key];
    const data = await safeFetch(`${BASE_PATH}/${src}/${tgt}/meta.json`);
    if (data) {
      _metaCache[key] = data;
      console.log(`[LWLoader] Loaded meta for ${key}`);
    }
    return data || null;
  }

  // ── Load a single activity JSON file ─────────────────────────────────────
  async function loadActivityFile(src, tgt, filePath) {
    return await safeFetch(`${BASE_PATH}/${src}/${tgt}/${filePath}`);
  }

  // ── Load ALL activities for a pair ───────────────────────────────────────
  async function loadPair(src, tgt) {
    const key = pairKey(src, tgt);
    if (_loadingPromises[key]) return _loadingPromises[key];

    _loadingPromises[key] = (async () => {
      if (!_cache[key]) _cache[key] = {};

      // FIX BUG #1: Try bundle first (works on file:// with no server)
      if (loadFromBundle(src, tgt)) {
        window.dispatchEvent(new CustomEvent('lw-content-ready', { detail: { src, tgt } }));
        return true;
      }

      // Fall back to fetch (works on HTTP server)
      const meta = await loadMeta(src, tgt);
      if (!meta) {
        console.warn(`[LWLoader] No meta.json and no bundle for ${key}`);
        return false;
      }

      const fileMap = buildFileMap(meta);
      if (Object.keys(fileMap).length === 0) {
        console.warn(`[LWLoader] buildFileMap returned empty for ${key} — check meta.json format`);
        return false;
      }

      const promises = Object.entries(fileMap).map(async ([actId, info]) => {
        // Skip if admin has manually edited this activity
        if (LWContent) {
          const existing = LWContent.getContent(parseInt(actId));
          if (existing && !existing._autoLoaded) {
            _cache[key][actId] = existing;
            return;
          }
        }
        const data = await loadActivityFile(src, tgt, info.file);
        if (data) {
          _cache[key][actId] = data;
          if (LWContent) {
            const existing = LWContent.getContent(parseInt(actId));
            if (!existing || existing._autoLoaded) {
              data._autoLoaded = true;
              data._source = 'json';
              data._jsonFile = info.file;
              LWContent.saveContent(parseInt(actId), data);
            }
          }
        }
      });

      await Promise.all(promises);
      console.log(`[LWLoader] Loaded ${Object.keys(_cache[key]).length} activities for ${key} via fetch`);
      window.dispatchEvent(new CustomEvent('lw-content-ready', { detail: { src, tgt } }));
      return true;
    })();

    return _loadingPromises[key];
  }

  // ── Get content for a specific activity (async-safe) ─────────────────────
  async function getContent(actId, src, tgt) {
    const s   = src || window.LW_ACTIVE_SRC || 'en';
    const t   = tgt || window.LW_ACTIVE_TGT || 'hi';
    const key = pairKey(s, t);
    const idStr = String(actId);

    // 1. Check localStorage admin overrides first
    if (LWContent) {
      const local = LWContent.getContent(actId);
      if (local && !local._autoLoaded) return local;
    }

    // 2. Check in-memory cache
    if (_cache[key] && _cache[key][idStr]) return _cache[key][idStr];

    // 3. Load the pair (bundle or fetch)
    await loadPair(s, t);

    if (_cache[key] && _cache[key][idStr]) return _cache[key][idStr];

    // 4. Fallback to any LWContent entry (legacy en-gu-month1.js may have set it)
    if (LWContent) {
      const fallback = LWContent.getContent(actId);
      if (fallback) return fallback;
    }

    return null;
  }

  // ── Force reload a specific activity from JSON ────────────────────────────
  async function reload(actId, src, tgt) {
    const s   = src || window.LW_ACTIVE_SRC || 'en';
    const t   = tgt || window.LW_ACTIVE_TGT || 'hi';
    const key = pairKey(s, t);

    // Try bundle first
    if (window.LW_CONTENT_BUNDLE && window.LW_CONTENT_BUNDLE[key]) {
      const data = window.LW_CONTENT_BUNDLE[key][String(actId)];
      if (data) {
        if (!_cache[key]) _cache[key] = {};
        const entry = Object.assign({}, data, { _autoLoaded: true, _source: 'bundle' });
        _cache[key][String(actId)] = entry;
        if (LWContent) LWContent.saveContent(actId, entry);
        return entry;
      }
    }

    // Fall back to fetch
    const meta = await loadMeta(s, t);
    if (!meta) return null;
    const fileMap = buildFileMap(meta);
    const info = fileMap[String(actId)];
    if (!info) return null;
    const data = await loadActivityFile(s, t, info.file);
    if (data) {
      if (!_cache[key]) _cache[key] = {};
      _cache[key][String(actId)] = data;
      data._autoLoaded = true;
      data._source = 'json';
      if (LWContent) LWContent.saveContent(actId, data);
    }
    return data;
  }

  // ── Export an activity as downloadable JSON ───────────────────────────────
  function exportActivityJSON(actId, src, tgt) {
    const s   = src || window.LW_ACTIVE_SRC || 'en';
    const t   = tgt || window.LW_ACTIVE_TGT || 'hi';
    const key = pairKey(s, t);

    let data = null;
    if (LWContent) data = LWContent.getContent(actId);
    if (!data && _cache[key]) data = _cache[key][String(actId)];
    if (!data && window.LW_CONTENT_BUNDLE && window.LW_CONTENT_BUNDLE[key])
      data = window.LW_CONTENT_BUNDLE[key][String(actId)];
    if (!data) return null;

    const clean = Object.assign({}, data);
    delete clean._autoLoaded; delete clean._source;
    delete clean.savedAt;    delete clean._file;
    return JSON.stringify(clean, null, 2);
  }

  // ── Export ALL activities as a bundle ─────────────────────────────────────
  function exportBundle(src, tgt) {
    const key = pairKey(src || 'en', tgt || 'hi');
    const all = _cache[key] || {};
    const out = {};
    Object.entries(all).forEach(([id, data]) => {
      const clean = Object.assign({}, data);
      delete clean._autoLoaded; delete clean._source;
      delete clean.savedAt;     delete clean._file;
      out[id] = clean;
    });
    return JSON.stringify(out, null, 2);
  }

  // ── FIX BUG #2: autoInit reads lw_lang_pair — not URL lang param ─────────
  function autoInit() {
    try {
      const lp = JSON.parse(localStorage.getItem('lw_lang_pair') || '{}');

      // Source = user's known language (fromId), Target = language being learned (toId)
      const srcISO = LANG_TO_ISO[lp.fromId || 'english'] || 'en';
      const tgtISO = LANG_TO_ISO[lp.toId   || 'hindi']   || 'hi';

      // Expose globally so activity pages and LWContent can read the active pair
      window.LW_ACTIVE_SRC  = srcISO;
      window.LW_ACTIVE_TGT  = tgtISO;
      window.LW_ACTIVE_PAIR = pairKey(srcISO, tgtISO);

      // FIX BUG #5: Tell LWContent which pair is active for storage isolation
      if (typeof LWContent !== 'undefined' && LWContent.setActivePair) {
        LWContent.setActivePair(window.LW_ACTIVE_PAIR);
      }

      loadPair(srcISO, tgtISO).then(ok => {
        if (ok) console.log(`[LWLoader] Auto-initialized ${srcISO}→${tgtISO}`);
      });
    } catch(e) {
      window.LW_ACTIVE_SRC  = 'en';
      window.LW_ACTIVE_TGT  = 'hi';
      window.LW_ACTIVE_PAIR = 'en-hi';
    }
  }

  // ── Misc helpers ──────────────────────────────────────────────────────────
  async function getActivePairs() {
    const idx = await safeFetch(`${BASE_PATH}/index.json`);
    return idx?.activePairs || ['en/hi'];
  }

  function clearCache(src, tgt) {
    if (src && tgt) {
      const key = pairKey(src, tgt);
      delete _cache[key]; delete _metaCache[key]; delete _loadingPromises[key];
    } else {
      [_cache, _metaCache, _loadingPromises].forEach(o => Object.keys(o).forEach(k => delete o[k]));
    }
  }

  // Run auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  // ── Public API ──────────────────────────────────────────────────────────
  return {
    loadPair,
    getContent,
    reload,
    exportActivityJSON,
    exportBundle,
    getActivePairs,
    clearCache,
    LANG_TO_ISO,
    get cache() { return _cache; },
  };

})();
