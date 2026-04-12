/**
 * LearnWise Content Loader v1
 * ─────────────────────────────────────────────────────────────────────────────
 * Bridges the JSON file-based content directory → LWContent (localStorage layer)
 *
 * Priority order (highest → lowest):
 *   1. localStorage admin overrides (LWContent) — always takes precedence
 *   2. JSON files in data/languages/{src}/{tgt}/month-{n}/
 *   3. Legacy en-gu-month1.js (backward compat)
 *   4. Empty skeleton (graceful fallback)
 *
 * Usage:
 *   // Load all content for a language pair
 *   await LWLoader.loadPair('en', 'gu');
 *
 *   // Get content for a specific activity (checks cache + localStorage)
 *   const content = await LWLoader.getContent(actId, 'en', 'gu');
 *
 *   // Force reload from JSON (bypasses cache but NOT localStorage override)
 *   await LWLoader.reload(actId, 'en', 'gu');
 *
 *   // Export current state to JSON (for admin)
 *   const json = LWLoader.exportActivityJSON(actId);
 */

window.LWLoader = (function() {

  // ── In-memory JSON cache ────────────────────────────────────────────────
  const _cache = {};          // { "en-gu": { "1": {...}, "2": {...} } }
  const _metaCache = {};      // { "en-gu": { months: [...] } }
  const _loadingPromises = {};// prevent duplicate fetches

  // ── Base path for JSON files ────────────────────────────────────────────
  const BASE_PATH = 'data/languages';

  // ── Language pair meta (activity list by ID → file path) ────────────────
  let _pairMeta = null;  // loaded from meta.json

  // ── Helpers ──────────────────────────────────────────────────────────────
  function pairKey(src, tgt) { return `${src}-${tgt}`; }

  async function safeFetch(url) {
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) return null;
      return await res.json();
    } catch(e) {
      // Fail silently — running from file:// or file missing
      return null;
    }
  }

  // ── Load the meta.json for a language pair ───────────────────────────────
  async function loadMeta(src, tgt) {
    const key = pairKey(src, tgt);
    if (_metaCache[key]) return _metaCache[key];

    const data = await safeFetch(`${BASE_PATH}/${src}/${tgt}/meta.json`);
    if (data) {
      _metaCache[key] = data;
      console.log(`[LWLoader] Loaded meta for ${key}`);
      return data;
    }
    return null;
  }

  // ── Build activity-ID → file-path map from meta.json ─────────────────────
  function buildFileMap(meta) {
    const map = {};
    if (!meta || !meta.months) return map;
    meta.months.forEach(month => {
      (month.weeks || []).forEach(week => {
        (week.activities || []).forEach(act => {
          map[String(act.id)] = {
            file: act.file,
            type: act.type,
            xp:   act.xp,
          };
        });
      });
    });
    return map;
  }

  // ── Load a single activity JSON file ─────────────────────────────────────
  async function loadActivityFile(src, tgt, filePath) {
    const url = `${BASE_PATH}/${src}/${tgt}/${filePath}`;
    return await safeFetch(url);
  }

  // ── Load ALL activities for a pair (eager load) ──────────────────────────
  async function loadPair(src, tgt) {
    const key = pairKey(src, tgt);
    if (_loadingPromises[key]) return _loadingPromises[key];

    _loadingPromises[key] = (async () => {
      if (!_cache[key]) _cache[key] = {};

      const meta = await loadMeta(src, tgt);
      if (!meta) {
        console.warn(`[LWLoader] No meta.json found for ${key}`);
        return false;
      }

      const fileMap = buildFileMap(meta);
      const promises = Object.entries(fileMap).map(async ([actId, info]) => {
        // Skip if localStorage admin override exists
        if (LWContent && LWContent.getContent(parseInt(actId))) {
          const existing = LWContent.getContent(parseInt(actId));
          if (existing && !existing._autoLoaded) {
            // Admin has manually edited this — don't overwrite
            _cache[key][actId] = existing;
            return;
          }
        }

        const data = await loadActivityFile(src, tgt, info.file);
        if (data) {
          _cache[key][actId] = data;
          // Also populate LWContent cache (as auto-loaded, can be overridden)
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
      console.log(`[LWLoader] Loaded ${Object.keys(_cache[key]).length} activities for ${key}`);
      return true;
    })();

    return _loadingPromises[key];
  }

  // ── Get content for a specific activity ──────────────────────────────────
  async function getContent(actId, src, tgt) {
    const key = pairKey(src || 'en', tgt || 'gu');
    const idStr = String(actId);

    // 1. Check localStorage first (admin overrides always win)
    if (LWContent) {
      const local = LWContent.getContent(actId);
      if (local && !local._autoLoaded) return local;
    }

    // 2. Check in-memory cache
    if (_cache[key] && _cache[key][idStr]) {
      return _cache[key][idStr];
    }

    // 3. Try to load the pair if not loaded yet
    await loadPair(src || 'en', tgt || 'gu');

    if (_cache[key] && _cache[key][idStr]) {
      return _cache[key][idStr];
    }

    // 4. Fall back to LWContent (may have been set by en-gu-month1.js)
    if (LWContent) {
      const fallback = LWContent.getContent(actId);
      if (fallback) return fallback;
    }

    return null;
  }

  // ── Force reload a specific activity from JSON ────────────────────────────
  async function reload(actId, src, tgt) {
    const key = pairKey(src || 'en', tgt || 'gu');
    const meta = await loadMeta(src || 'en', tgt || 'gu');
    if (!meta) return null;

    const fileMap = buildFileMap(meta);
    const info = fileMap[String(actId)];
    if (!info) return null;

    const data = await loadActivityFile(src || 'en', tgt || 'gu', info.file);
    if (data) {
      if (!_cache[key]) _cache[key] = {};
      _cache[key][String(actId)] = data;
      data._autoLoaded = true;
      data._source = 'json';
      if (LWContent) LWContent.saveContent(actId, data);
    }
    return data;
  }

  // ── Get the file path for an activity ────────────────────────────────────
  async function getFilePath(actId, src, tgt) {
    const meta = await loadMeta(src || 'en', tgt || 'gu');
    if (!meta) return null;
    const fileMap = buildFileMap(meta);
    return fileMap[String(actId)]?.file || null;
  }

  // ── Export an activity as downloadable JSON ───────────────────────────────
  function exportActivityJSON(actId, src, tgt) {
    let data = null;
    if (LWContent) data = LWContent.getContent(actId);
    const key = pairKey(src || 'en', tgt || 'gu');
    if (!data && _cache[key]) data = _cache[key][String(actId)];
    if (!data) return null;

    // Strip internal flags before export
    const clean = Object.assign({}, data);
    delete clean._autoLoaded;
    delete clean._source;
    delete clean.savedAt;

    return JSON.stringify(clean, null, 2);
  }

  // ── Export ALL activities as a bundle ─────────────────────────────────────
  function exportBundle(src, tgt) {
    const key = pairKey(src || 'en', tgt || 'gu');
    const all = _cache[key] || {};
    const out = {};
    Object.entries(all).forEach(([id, data]) => {
      const clean = Object.assign({}, data);
      delete clean._autoLoaded; delete clean._source; delete clean.savedAt;
      out[id] = clean;
    });
    return JSON.stringify(out, null, 2);
  }

  // ── Get available pairs from index.json ───────────────────────────────────
  let _indexCache = null;
  async function getIndex() {
    if (_indexCache) return _indexCache;
    _indexCache = await safeFetch(`${BASE_PATH}/index.json`);
    return _indexCache;
  }

  async function getActivePairs() {
    const idx = await getIndex();
    return idx?.activePairs || ['en/gu'];
  }

  // ── Get meta for display ───────────────────────────────────────────────────
  async function getPairMeta(src, tgt) {
    return await loadMeta(src, tgt);
  }

  // ── Clear cache (useful for development) ──────────────────────────────────
  function clearCache(src, tgt) {
    if (src && tgt) {
      const key = pairKey(src, tgt);
      delete _cache[key];
      delete _metaCache[key];
      delete _loadingPromises[key];
    } else {
      Object.keys(_cache).forEach(k => delete _cache[k]);
      Object.keys(_metaCache).forEach(k => delete _metaCache[k]);
      Object.keys(_loadingPromises).forEach(k => delete _loadingPromises[k]);
    }
  }

  // ── Auto-initialize on load ────────────────────────────────────────────────
  function autoInit() {
    // Detect current language pair from URL params or localStorage
    try {
      const P = new URLSearchParams(window.location.search);
      const lang = P.get('lang') || localStorage.getItem('lw_selected_lang') || 'gujarati';

      // Map roadmap language IDs to ISO codes
      const LANG_TO_ISO = {
        gujarati: 'gu', hindi: 'hi', spanish: 'es', french: 'fr',
        german: 'de', arabic: 'ar', japanese: 'ja', mandarin: 'zh',
        portuguese: 'pt', korean: 'ko', english: 'en'
      };

      const lp = JSON.parse(localStorage.getItem('lw_lang_pair') || '{}');
      const srcISO = LANG_TO_ISO[lp.fromId || 'english'] || 'en';
      const tgtISO = LANG_TO_ISO[lang] || LANG_TO_ISO[lp.toId] || 'gu';

      // Load pair asynchronously (non-blocking)
      loadPair(srcISO, tgtISO).then(ok => {
        if (ok) {
          console.log(`[LWLoader] Auto-initialized ${srcISO}→${tgtISO}`);
          // Dispatch event for pages that want to know when content is ready
          window.dispatchEvent(new CustomEvent('lw-content-ready', {
            detail: { src: srcISO, tgt: tgtISO }
          }));
        }
      });
    } catch(e) {
      // Silent fail — content will load on demand
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
    getFilePath,
    exportActivityJSON,
    exportBundle,
    getIndex,
    getActivePairs,
    getPairMeta,
    clearCache,
    get cache() { return _cache; },
  };

})();
