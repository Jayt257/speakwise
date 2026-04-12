/**
 * LearnWise Blocks Renderer v2
 * Shared renderer used by all activity pages AND the admin preview.
 * Returns HTML strings for all 29 block types.
 */

window.LWRenderer = (function() {

  // ── Helpers ──────────────────────────────────────────────────────────────
  function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function guHl(s) {
    return esc(s).replace(/([\u0A80-\u0AFF][\u0A80-\u0AFF\u0ABE-\u0ACD\u0ABC\u0ABD]*)/g,
      '<span class="lw-gu">$1</span>');
  }

  function uid() { return 'lw_' + Math.random().toString(36).slice(2,8); }

  // ── CSS (injected once) ───────────────────────────────────────────────────
  function injectCSS() {
    if (document.getElementById('lw-renderer-css')) return;
    const style = document.createElement('style');
    style.id = 'lw-renderer-css';
    style.textContent = `
      .lw-gu { font-family:'Noto Sans Gujarati','Shruti',sans-serif; color:#a5a0df; font-size:1.08em; font-weight:600; }
      .lw-block { background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); border-radius:16px; padding:20px; margin-bottom:14px; animation:lw-fadeup .4s ease both; }
      @keyframes lw-fadeup { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      .lw-bh { display:flex;align-items:center;gap:10px;margin-bottom:14px; }
      .lw-bicon { width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
      .lw-btitle { font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:800;color:rgba(255,255,255,.9); }
      .lw-body { font-size:14px;color:rgba(255,255,255,.62);line-height:1.9; }
      
      /* grammar_rule */
      .lw-gr-pattern { background:rgba(91,79,207,.15);border:1.5px dashed rgba(91,79,207,.4);border-radius:12px;padding:14px 18px;font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;font-weight:800;color:#a5a0df;text-align:center;margin-bottom:14px; letter-spacing:.02em; }
      .lw-gr-row { display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:6px; }
      .lw-gr-cell { padding:10px 13px;border-radius:10px;font-size:13px;line-height:1.6; }
      .lw-gr-src { background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5); }
      .lw-gr-tgt { background:rgba(91,79,207,.1);border:1px solid rgba(91,79,207,.25);color:rgba(165,160,223,.9); }
      .lw-gr-note { font-size:12px;color:rgba(255,255,255,.35);font-style:italic;margin-top:10px;padding:8px 12px;background:rgba(255,255,255,.03);border-radius:8px; }

      /* dialogue */
      .lw-dlg-line { display:flex;gap:10px;margin-bottom:10px;align-items:flex-start; }
      .lw-dlg-line.right { flex-direction:row-reverse; }
      .lw-dlg-avatar { width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:13px; }
      .lw-dlg-bubble { max-width:72%;padding:10px 14px;border-radius:14px;font-size:13px;line-height:1.7; }
      .lw-dlg-line:not(.right) .lw-dlg-bubble { background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:4px 14px 14px 14px; }
      .lw-dlg-line.right .lw-dlg-bubble { background:rgba(91,79,207,.18);border:1px solid rgba(91,79,207,.3);border-radius:14px 4px 14px 14px; }
      .lw-dlg-rom { font-size:11px;color:rgba(255,255,255,.3);margin-top:3px;font-style:italic; }
      .lw-dlg-tr { font-size:11px;color:rgba(165,160,223,.5);margin-top:2px; }

      /* comparison_table */
      .lw-cmp-table { width:100%;border-collapse:collapse;border-radius:12px;overflow:hidden; }
      .lw-cmp-table th { background:rgba(91,79,207,.2);padding:10px 14px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#a5a0df;text-align:left; }
      .lw-cmp-table td { padding:10px 14px;font-size:13px;border-bottom:1px solid rgba(255,255,255,.05);color:rgba(255,255,255,.7); }
      .lw-cmp-table tr:last-child td { border-bottom:none; }
      .lw-cmp-table tr:hover td { background:rgba(255,255,255,.03); }
      .lw-cmp-table td:first-child { color:rgba(255,255,255,.45); }
      .lw-cmp-table td:nth-child(2) { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:16px;font-weight:700;color:#a5a0df; }

      /* fill_blank */
      .lw-fb-item { display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:11px;margin-bottom:8px;transition:border-color .2s; }
      .lw-fb-item:focus-within { border-color:rgba(91,79,207,.45); }
      .lw-fb-input { background:rgba(91,79,207,.15);border:1.5px solid rgba(91,79,207,.3);border-radius:8px;padding:6px 12px;font-size:14px;color:#a5a0df;font-family:'Noto Sans Gujarati','Shruti',sans-serif;width:130px;outline:none;transition:all .2s; }
      .lw-fb-input:focus { border-color:#a5a0df;background:rgba(91,79,207,.22); }
      .lw-fb-input.correct { border-color:#10b981;background:rgba(16,185,129,.15);color:#34d399; }
      .lw-fb-input.wrong { border-color:#ef4444;background:rgba(239,68,68,.1);color:#f87171; }
      .lw-fb-check { padding:6px 12px;border-radius:8px;background:rgba(91,79,207,.2);border:1px solid rgba(91,79,207,.35);color:#a5a0df;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s;white-space:nowrap; }
      .lw-fb-check:hover { background:rgba(91,79,207,.35); }
      .lw-fb-hint { font-size:11px;color:rgba(255,255,255,.3);margin-left:auto; }

      /* word_family */
      .lw-wf-root { text-align:center;padding:16px;background:radial-gradient(circle at center,rgba(91,79,207,.2),rgba(91,79,207,.05));border:1.5px solid rgba(91,79,207,.35);border-radius:50%;width:90px;height:90px;display:flex;flex-direction:column;align-items:center;justify-content:center;margin:0 auto 16px; }
      .lw-wf-root-word { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:22px;font-weight:900;color:#fff; }
      .lw-wf-root-en { font-size:10px;color:rgba(165,160,223,.6);font-weight:700;text-transform:uppercase; }
      .lw-wf-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px; }
      .lw-wf-card { background:rgba(91,79,207,.08);border:1px solid rgba(91,79,207,.18);border-radius:11px;padding:11px 13px;transition:all .2s;cursor:pointer; }
      .lw-wf-card:hover { background:rgba(91,79,207,.18);border-color:rgba(91,79,207,.35);transform:translateY(-2px); }
      .lw-wf-word { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:17px;font-weight:700;color:#a5a0df; }
      .lw-wf-meaning { font-size:11px;color:rgba(255,255,255,.4);margin-top:3px; }

      /* image_word */
      .lw-iw-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px; }
      .lw-iw-card { background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px 10px;text-align:center;cursor:pointer;transition:all .2s;position:relative;overflow:hidden; }
      .lw-iw-card:hover { background:rgba(255,255,255,.08);border-color:rgba(91,79,207,.3);transform:translateY(-3px); }
      .lw-iw-emoji { font-size:32px;display:block;margin-bottom:8px;line-height:1; }
      .lw-iw-word { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:18px;font-weight:700;color:#fff;display:block; }
      .lw-iw-en { font-size:11px;color:rgba(255,255,255,.4);margin-top:3px;display:block; }

      /* minimal_pairs */
      .lw-mp-pair { display:grid;grid-template-columns:1fr auto 1fr;gap:0;margin-bottom:10px;align-items:center; }
      .lw-mp-card { padding:14px;border-radius:12px;text-align:center; }
      .lw-mp-left { background:rgba(14,165,233,.1);border:1px solid rgba(14,165,233,.25); }
      .lw-mp-right { background:rgba(236,72,153,.1);border:1px solid rgba(236,72,153,.25); }
      .lw-mp-char { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:38px;font-weight:900;color:#fff;line-height:1; }
      .lw-mp-rom { font-size:14px;font-weight:700;color:rgba(255,255,255,.5);margin-top:4px; }
      .lw-mp-vs { width:40px;text-align:center;font-size:12px;font-weight:800;color:rgba(255,255,255,.2);flex-shrink:0; }
      .lw-mp-diff { text-align:center;font-size:11px;color:rgba(255,255,255,.25);margin-top:4px;grid-column:1/-1; }

      /* stress_pattern */
      .lw-sp-word { display:flex;gap:4px;justify-content:center;align-items:flex-end;margin-bottom:12px; }
      .lw-sp-syl { padding:10px 14px;border-radius:10px;font-size:16px;font-weight:700;color:rgba(255,255,255,.6);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);transition:all .2s; }
      .lw-sp-syl.stressed { background:rgba(91,79,207,.25);border-color:rgba(91,79,207,.5);color:#fff;font-size:20px;padding:13px 18px;box-shadow:0 4px 16px rgba(91,79,207,.3); }
      .lw-sp-label { text-align:center;font-size:11px;color:rgba(255,255,255,.25); }
      .lw-sp-gu { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:24px;color:#a5a0df;font-weight:700;text-align:center;margin-bottom:10px; }

      /* tongue_twister */
      .lw-tt-text { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:20px;font-weight:700;color:#fff;line-height:1.6;margin-bottom:10px;padding:16px;background:rgba(236,72,153,.08);border:1px solid rgba(236,72,153,.2);border-radius:12px;text-align:center; }
      .lw-tt-rom { font-size:14px;color:rgba(255,255,255,.45);text-align:center;margin-bottom:8px;font-style:italic; }
      .lw-tt-tr { font-size:13px;color:rgba(255,255,255,.3);text-align:center;margin-bottom:14px; }
      .lw-tt-speeds { display:flex;gap:8px;justify-content:center; }
      .lw-tt-spd { padding:7px 16px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;border:none;transition:all .2s; }
      .lw-tt-spd.slow { background:rgba(16,185,129,.15);color:#34d399;border:1px solid rgba(16,185,129,.3); }
      .lw-tt-spd.med { background:rgba(245,158,11,.15);color:#fbbf24;border:1px solid rgba(245,158,11,.3); }
      .lw-tt-spd.fast { background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.25); }

      /* roleplay_card */
      .lw-rp-badge { display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:999px;font-size:11px;font-weight:700;margin-bottom:12px; }
      .lw-rp-roles { display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px; }
      .lw-rp-role { padding:12px 14px;border-radius:11px;text-align:center; }
      .lw-rp-you { background:rgba(91,79,207,.15);border:1px solid rgba(91,79,207,.3); }
      .lw-rp-partner { background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1); }
      .lw-rp-role-label { font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px; }
      .lw-rp-role-name { font-size:14px;font-weight:800;color:#fff; }
      .lw-rp-goal { background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.2);border-left:3px solid #10b981;border-radius:0 10px 10px 0;padding:10px 14px;font-size:13px;color:rgba(255,255,255,.65);margin-bottom:12px; }
      .lw-rp-phrase { display:inline-flex;align-items:center;gap:5px;padding:5px 11px;border-radius:999px;background:rgba(91,79,207,.1);border:1px solid rgba(91,79,207,.2);font-size:12px;cursor:pointer;color:rgba(165,160,223,.8);margin:3px;transition:all .18s; }
      .lw-rp-phrase:hover { background:rgba(91,79,207,.22); }

      /* sentence_builder */
      .lw-sb-target { font-size:14px;color:rgba(255,255,255,.45);margin-bottom:14px;padding:10px 14px;background:rgba(255,255,255,.04);border-radius:9px;border:1px dashed rgba(255,255,255,.1); }
      .lw-sb-drop { min-height:48px;border:2px dashed rgba(91,79,207,.3);border-radius:11px;padding:8px 12px;display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;background:rgba(91,79,207,.05);transition:border-color .2s; }
      .lw-sb-drop.over { border-color:rgba(91,79,207,.6);background:rgba(91,79,207,.12); }
      .lw-sb-words { display:flex;flex-wrap:wrap;gap:7px;margin-bottom:12px; }
      .lw-sb-word { padding:7px 13px;border-radius:9px;background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.12);font-size:13px;font-weight:700;cursor:pointer;color:rgba(255,255,255,.8);transition:all .2s;font-family:'Noto Sans Gujarati','Shruti','Plus Jakarta Sans',sans-serif;user-select:none; }
      .lw-sb-word:hover { background:rgba(91,79,207,.2);border-color:rgba(91,79,207,.4);color:#fff; }
      .lw-sb-word.placed { opacity:.3;cursor:default; }
      .lw-sb-placed-word { padding:7px 13px;border-radius:9px;background:rgba(91,79,207,.2);border:1.5px solid rgba(91,79,207,.4);font-size:13px;font-weight:700;cursor:pointer;color:#a5a0df;font-family:'Noto Sans Gujarati','Shruti','Plus Jakarta Sans',sans-serif;transition:all .2s; }
      .lw-sb-placed-word:hover { background:rgba(239,68,68,.15);border-color:rgba(239,68,68,.3);color:#f87171; }
      .lw-sb-btn { padding:8px 16px;border-radius:9px;background:rgba(91,79,207,.2);border:1px solid rgba(91,79,207,.35);color:#a5a0df;font-size:13px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;transition:all .2s; }
      .lw-sb-btn:hover { background:rgba(91,79,207,.35); }

      /* translation_task */
      .lw-tr-item { padding:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:12px;margin-bottom:10px; }
      .lw-tr-src { font-size:15px;font-weight:700;color:#fff;margin-bottom:10px; }
      .lw-tr-input { width:100%;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.1);border-radius:9px;padding:10px 13px;font-size:14px;color:#fff;font-family:'Noto Sans Gujarati','Shruti','Inter',sans-serif;outline:none;resize:none;transition:all .2s; }
      .lw-tr-input:focus { border-color:rgba(91,79,207,.5);background:rgba(91,79,207,.08); }
      .lw-tr-ans { margin-top:8px;padding:10px 13px;background:rgba(16,185,129,.08);border:1px solid rgba(16,185,129,.2);border-radius:9px;font-size:13px;color:#34d399;display:none; }
      .lw-tr-show { padding:5px 11px;border-radius:7px;background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.25);color:#34d399;font-size:12px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;margin-top:8px;transition:all .2s; }
      .lw-tr-show:hover { background:rgba(16,185,129,.22); }

      /* matching */
      .lw-mt-grid { display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px; }
      .lw-mt-item { padding:11px 14px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:rgba(255,255,255,.75);transition:all .2s;text-align:center;user-select:none; }
      .lw-mt-item:hover { border-color:rgba(91,79,207,.4);background:rgba(91,79,207,.1); }
      .lw-mt-item.selected { border-color:#a5a0df;background:rgba(91,79,207,.22);color:#fff; }
      .lw-mt-item.matched { border-color:#10b981;background:rgba(16,185,129,.12);color:#34d399;cursor:default; }
      .lw-mt-item.wrong { border-color:#ef4444;background:rgba(239,68,68,.1);color:#f87171;animation:lw-shake .3s ease; }
      .lw-mt-left { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:18px; }
      @keyframes lw-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }

      /* ordering */
      .lw-or-sentence { font-size:15px;color:rgba(255,255,255,.4);margin-bottom:14px;text-align:center;font-style:italic; }
      .lw-or-drop { min-height:52px;border:2px dashed rgba(16,185,129,.3);border-radius:11px;padding:8px 12px;display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;background:rgba(16,185,129,.04); }
      .lw-or-words { display:flex;flex-wrap:wrap;gap:7px; }
      .lw-or-chip { padding:8px 14px;border-radius:9px;background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.12);font-size:13px;font-weight:700;cursor:pointer;color:rgba(255,255,255,.85);font-family:'Noto Sans Gujarati','Shruti','Plus Jakarta Sans',sans-serif;transition:all .2s; }
      .lw-or-chip:hover { background:rgba(16,185,129,.15);border-color:rgba(16,185,129,.35); }
      .lw-or-chip.placed { opacity:.3;cursor:default; }

      /* true_false */
      .lw-tf-item { padding:14px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;margin-bottom:9px; }
      .lw-tf-stmt { font-size:14px;color:rgba(255,255,255,.8);margin-bottom:12px;line-height:1.6; }
      .lw-tf-btns { display:flex;gap:8px; }
      .lw-tf-btn { flex:1;padding:9px;border-radius:9px;font-size:13px;font-weight:800;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;border:1.5px solid;transition:all .2s; }
      .lw-tf-t { background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.3);color:#34d399; }
      .lw-tf-t:hover { background:rgba(16,185,129,.22); }
      .lw-tf-f { background:rgba(239,68,68,.08);border-color:rgba(239,68,68,.25);color:#f87171; }
      .lw-tf-f:hover { background:rgba(239,68,68,.18); }
      .lw-tf-btn.correct { background:rgba(16,185,129,.3);border-color:#10b981; }
      .lw-tf-btn.wrong { background:rgba(239,68,68,.2);border-color:#ef4444; }
      .lw-tf-expl { margin-top:10px;padding:9px 12px;background:rgba(255,255,255,.04);border-radius:8px;font-size:12px;color:rgba(255,255,255,.5);display:none;line-height:1.6; }
      .lw-tf-expl.show { display:block; }

      /* note_template */
      .lw-nt-section { margin-bottom:14px; }
      .lw-nt-label { font-size:12px;font-weight:700;color:rgba(255,255,255,.45);margin-bottom:6px;display:flex;align-items:center;gap:6px; }
      .lw-nt-input { width:100%;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.09);border-radius:9px;padding:10px 13px;font-size:13px;color:rgba(255,255,255,.8);font-family:'Inter',sans-serif;outline:none;resize:none;min-height:48px;transition:all .2s; }
      .lw-nt-input:focus { border-color:rgba(6,182,212,.4);background:rgba(6,182,212,.05); }

      /* gap_fill */
      .lw-gf-text { font-size:16px;line-height:2.4;color:rgba(255,255,255,.8);margin-bottom:14px; }
      .lw-gf-inp { background:rgba(91,79,207,.12);border:1.5px solid rgba(91,79,207,.3);border-radius:6px;padding:2px 10px;font-size:14px;color:#a5a0df;font-family:'Noto Sans Gujarati','Shruti',sans-serif;width:130px;outline:none;transition:all .2s;display:inline-block;vertical-align:middle; }
      .lw-gf-inp:focus { border-color:#a5a0df;background:rgba(91,79,207,.22); }
      .lw-gf-inp.correct { border-color:#10b981;background:rgba(16,185,129,.12);color:#34d399; }
      .lw-gf-inp.wrong { border-color:#ef4444;background:rgba(239,68,68,.1);color:#f87171; }
      .lw-gf-hint { font-size:11px;color:rgba(255,255,255,.25);display:block;margin-top:4px; }

      /* vocabulary_spotlight */
      .lw-vs-hero { text-align:center;padding:20px;background:radial-gradient(ellipse at top,rgba(91,79,207,.2),rgba(91,79,207,.04));border:1px solid rgba(91,79,207,.25);border-radius:16px;margin-bottom:14px; }
      .lw-vs-word { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:52px;font-weight:900;color:#fff;line-height:1.1;text-shadow:0 4px 30px rgba(91,79,207,.5); }
      .lw-vs-rom { font-size:18px;font-weight:700;color:rgba(165,160,223,.7);margin-top:4px; }
      .lw-vs-pos { display:inline-block;padding:3px 10px;border-radius:999px;background:rgba(91,79,207,.2);border:1px solid rgba(91,79,207,.3);font-size:11px;font-weight:700;color:#a5a0df;text-transform:uppercase;letter-spacing:.08em;margin-top:8px; }
      .lw-vs-meaning { font-size:22px;font-weight:800;color:#fff;margin-top:10px; }
      .lw-vs-row { display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px; }
      .lw-vs-box { padding:12px 14px;border-radius:11px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07); }
      .lw-vs-box-label { font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.3);margin-bottom:5px; }
      .lw-vs-box-val { font-size:13px;color:rgba(255,255,255,.65);line-height:1.6; }
      .lw-vs-ex { font-family:'Noto Sans Gujarati','Shruti',sans-serif;font-size:15px;color:#a5a0df;margin-bottom:4px; }
      .lw-vs-ex-en { font-size:12px;color:rgba(255,255,255,.35);margin-bottom:10px; }

      /* cultural_note */
      .lw-cn-block { background:linear-gradient(135deg,rgba(245,158,11,.1),rgba(245,158,11,.03));border:1px solid rgba(245,158,11,.25);border-radius:16px;padding:18px 20px;display:flex;gap:14px;align-items:flex-start; }
      .lw-cn-icon { font-size:32px;flex-shrink:0;line-height:1; }
      .lw-cn-body { flex:1; }
      .lw-cn-title { font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:800;color:rgba(251,191,36,.9);margin-bottom:7px; }
      .lw-cn-text { font-size:14px;color:rgba(255,255,255,.65);line-height:1.8; }
      .lw-cn-tags { display:flex;gap:6px;flex-wrap:wrap;margin-top:10px; }
      .lw-cn-tag { padding:3px 9px;border-radius:999px;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.2);font-size:11px;font-weight:700;color:rgba(251,191,36,.7); }

      /* progress_checkpoint */
      .lw-pc-block { background:linear-gradient(135deg,rgba(16,185,129,.12),rgba(16,185,129,.03));border:1.5px solid rgba(16,185,129,.3);border-radius:16px;padding:20px; }
      .lw-pc-header { display:flex;align-items:center;gap:12px;margin-bottom:14px; }
      .lw-pc-badge { width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
      .lw-pc-title { font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:800;color:#fff; }
      .lw-pc-item { display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05); }
      .lw-pc-item:last-child { border:none; }
      .lw-pc-check { width:22px;height:22px;border-radius:6px;border:1.5px solid rgba(16,185,129,.4);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;flex-shrink:0; }
      .lw-pc-check.on { background:rgba(16,185,129,.25);border-color:#10b981; }
      .lw-pc-text { font-size:13px;color:rgba(255,255,255,.65);line-height:1.5;flex:1; }
      .lw-pc-xp { text-align:right;font-size:12px;font-weight:800;color:rgba(16,185,129,.6);margin-top:10px; }
    `;
    document.head.appendChild(style);
  }

  // ── Core render dispatch ──────────────────────────────────────────────────
  function render(block, opts) {
    opts = opts || {};
    injectCSS();
    try {
      switch (block.type) {
        case 'text':                return renderText(block);
        case 'keypoints':          return renderKeypoints(block);
        case 'vocab_table':        return renderVocabTable(block);
        case 'quiz':               return renderQuiz(block);
        case 'speaking':           return renderSpeaking(block);
        case 'reading':            return renderReading(block);
        case 'writing':            return renderWriting(block);
        case 'audio':              return renderAudio(block);
        case 'tip':                return renderTip(block);
        case 'grammar_rule':       return renderGrammarRule(block);
        case 'dialogue':           return renderDialogue(block);
        case 'comparison_table':   return renderComparisonTable(block);
        case 'fill_blank':         return renderFillBlank(block);
        case 'word_family':        return renderWordFamily(block);
        case 'image_word':         return renderImageWord(block);
        case 'minimal_pairs':      return renderMinimalPairs(block);
        case 'stress_pattern':     return renderStressPattern(block);
        case 'tongue_twister':     return renderTongueTwister(block);
        case 'roleplay_card':      return renderRoleplayCard(block);
        case 'sentence_builder':   return renderSentenceBuilder(block);
        case 'translation_task':   return renderTranslationTask(block);
        case 'matching':           return renderMatching(block);
        case 'ordering':           return renderOrdering(block);
        case 'true_false':         return renderTrueFalse(block);
        case 'note_template':      return renderNoteTemplate(block);
        case 'gap_fill':           return renderGapFill(block);
        case 'vocabulary_spotlight': return renderVocabularySpotlight(block);
        case 'cultural_note':      return renderCulturalNote(block);
        case 'progress_checkpoint': return renderProgressCheckpoint(block);
        default: return `<div class="lw-block"><div class="lw-body" style="color:rgba(255,255,255,.35);">Unknown block type: ${esc(block.type)}</div></div>`;
      }
    } catch(e) {
      return `<div class="lw-block"><div class="lw-body" style="color:#f87171;">Error rendering block: ${esc(e.message)}</div></div>`;
    }
  }

  // ── Existing 9 block types (enhanced) ────────────────────────────────────

  function renderText(b) {
    const body = guHl(b.body||'').replace(/\n/g,'<br>');
    return `<div class="lw-block">
      ${b.title?`<div class="lw-bh"><div class="lw-bicon" style="background:rgba(91,79,207,.2)"><span style="font-size:14px;color:#7c6fd4;" class="material-symbols-outlined">auto_stories</span></div><span class="lw-btitle">${esc(b.title)}</span></div>`:''}
      <div class="lw-body">${body}</div>
    </div>`;
  }

  function renderKeypoints(b) {
    const pts = (b.points||[]).map((p,i)=>`<div class="lw-pc-item" style="animation-delay:${i*.06}s;border-bottom:1px solid rgba(255,255,255,.05)">
      <div style="width:7px;height:7px;border-radius:50%;background:#5b4fcf;flex-shrink:0"></div>
      <span style="font-size:13px;color:rgba(255,255,255,.72);line-height:1.6;">${guHl(p)}</span>
    </div>`).join('');
    return `<div class="lw-block">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(16,185,129,.2)"><span style="font-size:14px;color:#34d399;" class="material-symbols-outlined">checklist</span></div><span class="lw-btitle">${esc(b.title||'Key Points')}</span></div>
      ${pts}
    </div>`;
  }

  function renderVocabTable(b) {
    const words = (b.words||[]).slice(0,8);
    const rows = words.map(w=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 13px;background:rgba(14,165,233,.07);border:1px solid rgba(14,165,233,.15);border-radius:11px;margin-bottom:7px;cursor:pointer;transition:all .18s;" onmouseover="this.style.background='rgba(14,165,233,.14)';this.style.transform='translateX(4px)'" onmouseout="this.style.background='rgba(14,165,233,.07)';this.style.transform='translateX(0)'">
      <span class="lw-gu" style="font-size:18px;font-weight:700;color:#38bdf8;min-width:90px;">${esc(w.word||'')}</span>
      <div style="flex:1"><div style="font-size:13px;color:rgba(255,255,255,.7);">${esc(w.meaning||'')}</div>${w.example?`<div style="font-size:11px;color:rgba(255,255,255,.3);margin-top:2px;">${esc(w.example)}</div>`:''}
      </div>
    </div>`).join('');
    const extra = (b.words||[]).length > 8 ? `<div style="font-size:12px;color:rgba(14,165,233,.5);text-align:center;margin-top:6px;font-weight:700;">+${(b.words||[]).length-8} more words</div>` : '';
    return `<div class="lw-block">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(14,165,233,.2)"><span style="font-size:14px;color:#38bdf8;" class="material-symbols-outlined">abc</span></div><span class="lw-btitle">${esc(b.title||'Vocabulary')}</span></div>
      ${rows}${extra}
    </div>`;
  }

  function renderQuiz(b) {
    const id = uid();
    const opts = (b.options||[]).map((o,i)=>`<div id="${id}o${i}" onclick="lwQuizPick('${id}',${i},${b.correct},'${esc(b.explanation||'')}')" style="padding:12px 16px;border-radius:11px;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);cursor:pointer;margin-bottom:8px;font-size:14px;font-weight:700;color:rgba(255,255,255,.75);display:flex;align-items:center;gap:10px;transition:all .18s;" onmouseover="this.style.background='rgba(239,68,68,.08)';this.style.borderColor='rgba(239,68,68,.25)'" onmouseout="if(!this.dataset.answered)this.style.background='rgba(255,255,255,.04)',this.style.borderColor='rgba(255,255,255,.1)'">
      <span style="width:26px;height:26px;border-radius:7px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">${'ABCD'[i]}</span>
      <span>${guHl(o)}</span>
    </div>`).join('');
    return `<div class="lw-block" style="border-color:rgba(239,68,68,.15);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(239,68,68,.18)"><span style="font-size:14px;color:#f87171;" class="material-symbols-outlined">quiz</span></div><span class="lw-btitle">Quiz Question</span></div>
      <div style="font-size:16px;font-weight:800;color:#fff;line-height:1.5;margin-bottom:16px;">${guHl(b.question||'')}</div>
      <div id="${id}opts">${opts}</div>
      <div id="${id}expl" style="display:none;margin-top:10px;padding:11px 14px;border-radius:9px;border-left:3px solid #10b981;background:rgba(16,185,129,.08);font-size:13px;color:rgba(255,255,255,.65);line-height:1.7;"></div>
    </div>`;
  }

  function renderTip(b) {
    const body = guHl(b.body||'').replace(/\n/g,'<br>');
    return `<div style="background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.2);border-left:3px solid #f59e0b;border-radius:0 14px 14px 0;padding:14px 18px;margin-bottom:14px;display:flex;gap:12px;align-items:flex-start;animation:lw-fadeup .4s ease both;">
      <span style="font-size:20px;flex-shrink:0;margin-top:1px;">💡</span>
      <div style="font-size:13px;color:rgba(245,158,11,.9);line-height:1.75;">${body}</div>
    </div>`;
  }

  function renderAudio(b) {
    return `<div class="lw-block" style="background:rgba(6,182,212,.06);border-color:rgba(6,182,212,.2);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(6,182,212,.2)"><span style="font-size:14px;color:#22d3ee;" class="material-symbols-outlined">volume_up</span></div><span class="lw-btitle">${esc(b.label||'Audio')}</span></div>
      <div style="display:flex;align-items:center;gap:12px;">
        <button onclick="lwPlayAudio('${esc(b.url||'')}',this)" style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#06b6d4,#0891b2);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s;box-shadow:0 4px 16px rgba(6,182,212,.35);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
          <span class="material-symbols-outlined" style="color:#fff;font-size:24px;font-variation-settings:'FILL' 1">play_arrow</span>
        </button>
        ${b.transcript?`<span style="font-size:13px;color:rgba(255,255,255,.5);line-height:1.6;">${esc(b.transcript)}</span>`:''}
      </div>
    </div>`;
  }

  function renderSpeaking(b) {
    const hints = (b.hints||[]).map(h=>`<span class="lw-rp-phrase">${guHl(h)}</span>`).join('');
    return `<div class="lw-block" style="background:rgba(139,92,246,.07);border-color:rgba(139,92,246,.2);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(139,92,246,.2)"><span style="font-size:14px;color:#a78bfa;" class="material-symbols-outlined">record_voice_over</span></div><span class="lw-btitle">Speaking Prompt</span></div>
      <div style="font-size:14px;color:rgba(255,255,255,.7);line-height:1.75;margin-bottom:12px;">${guHl(b.prompt||'')}</div>
      ${hints?`<div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.25);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;">Useful phrases</div><div style="display:flex;flex-wrap:wrap;gap:5px;">${hints}</div>`:''}
    </div>`;
  }

  function renderReading(b) {
    const passage = guHl(esc(b.passage||'').replace(/\n/g,'<br>'));
    const qs = (b.questions||[]).slice(0,3).map((q,i)=>`<div style="padding:11px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:10px;margin-bottom:7px;cursor:pointer;" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display?'':'block'">
      <div style="font-size:13px;color:rgba(255,255,255,.7);font-weight:600;">Q${i+1}: ${esc(q.q||'')}</div>
    </div><div style="display:none;padding:9px 13px;background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.2);border-radius:9px;margin-bottom:7px;font-size:12px;color:rgba(255,255,255,.55);">${esc(q.a||'')}</div>`).join('');
    return `<div class="lw-block" style="background:rgba(16,185,129,.05);border-color:rgba(16,185,129,.18);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(16,185,129,.2)"><span style="font-size:14px;color:#34d399;" class="material-symbols-outlined">menu_book</span></div><span class="lw-btitle">Reading Passage</span></div>
      <div style="font-size:14px;color:rgba(255,255,255,.68);line-height:2.1;margin-bottom:14px;padding:14px;background:rgba(255,255,255,.03);border-radius:10px;">${passage}</div>
      ${qs?`<div style="font-size:11px;font-weight:800;color:rgba(255,255,255,.25);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;">Comprehension Questions</div>${qs}`:''}
    </div>`;
  }

  function renderWriting(b) {
    const id = uid();
    return `<div class="lw-block" style="background:rgba(245,158,11,.06);border-color:rgba(245,158,11,.2);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(245,158,11,.2)"><span style="font-size:14px;color:#fbbf24;" class="material-symbols-outlined">edit_note</span></div><span class="lw-btitle">Writing Task</span></div>
      <div style="font-size:14px;color:rgba(255,255,255,.7);line-height:1.75;margin-bottom:12px;">${guHl(b.prompt||'')}</div>
      <textarea id="${id}" placeholder="Write your response here..." style="width:100%;min-height:100px;background:rgba(255,255,255,.05);border:1.5px solid rgba(245,158,11,.2);border-radius:10px;padding:12px;font-size:14px;color:#fff;font-family:Inter,sans-serif;outline:none;resize:vertical;" oninput="document.getElementById('${id}wc').textContent=this.value.trim().split(/\\s+/).filter(w=>w).length"></textarea>
      <div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px;color:rgba(255,255,255,.3);"><span id="${id}wc">0</span>/<span>${b.minWords||50} words min</span></div>
    </div>`;
  }

  // ── NEW BLOCK TYPES ───────────────────────────────────────────────────────

  function renderGrammarRule(b) {
    const examples = (b.examples||[]).map(ex=>`<div class="lw-gr-row">
      <div class="lw-gr-cell lw-gr-src">${guHl(ex.native||'')}</div>
      <div class="lw-gr-cell lw-gr-tgt">${guHl(ex.target||'')}</div>
    </div>${ex.translation?`<div style="font-size:12px;color:rgba(255,255,255,.3);text-align:center;margin-bottom:4px;">"${esc(ex.translation)}"</div>`:''}`).join('');
    return `<div class="lw-block" style="border-color:rgba(91,79,207,.22);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(91,79,207,.25)"><span style="font-size:14px;color:#a5a0df;" class="material-symbols-outlined">schema</span></div><span class="lw-btitle">${esc(b.title||'Grammar Rule')}</span></div>
      ${b.pattern?`<div class="lw-gr-pattern">${guHl(b.pattern)}</div>`:''}
      ${examples?`<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:8px;"><div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:rgba(255,255,255,.25);padding:0 4px;">SOURCE LANGUAGE</div><div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:rgba(165,160,223,.4);padding:0 4px;">TARGET LANGUAGE</div></div>${examples}`:''}
      ${b.note?`<div class="lw-gr-note">💡 ${guHl(b.note)}</div>`:''}
    </div>`;
  }

  function renderDialogue(b) {
    const speakers = b.speakers || ['Speaker 1', 'Speaker 2'];
    const colors = ['#5b4fcf','#ec4899','#10b981','#f59e0b'];
    const lines = (b.lines||[]).map(line=>{
      const spkIdx = line.speaker || 0;
      const isRight = spkIdx % 2 === 1;
      const color = colors[spkIdx % colors.length];
      return `<div class="lw-dlg-line${isRight?' right':''}">
        <div class="lw-dlg-avatar" style="background:${color}22;border:1.5px solid ${color}55;color:${color}">${(speakers[spkIdx]||'?')[0]}</div>
        <div>
          <div style="font-size:10px;font-weight:700;color:${color};margin-bottom:4px;${isRight?'text-align:right':''};">${esc(speakers[spkIdx]||'')}</div>
          <div class="lw-dlg-bubble">
            <div style="font-size:14px;color:#fff;font-family:'Noto Sans Gujarati','Shruti','Plus Jakarta Sans',sans-serif;">${guHl(line.text||'')}</div>
            ${line.romanization?`<div class="lw-dlg-rom">${esc(line.romanization)}</div>`:''}
            ${line.translation?`<div class="lw-dlg-tr">${esc(line.translation)}</div>`:''}
          </div>
        </div>
      </div>`;
    }).join('');
    return `<div class="lw-block" style="background:rgba(91,79,207,.05);border-color:rgba(91,79,207,.18);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(91,79,207,.2)"><span style="font-size:14px;color:#a5a0df;" class="material-symbols-outlined">chat</span></div><span class="lw-btitle">${esc(b.title||'Dialogue')}</span></div>
      ${lines}
    </div>`;
  }

  function renderComparisonTable(b) {
    const headers = b.headers || ['English', 'Gujarati', 'Pronunciation'];
    const rows = (b.rows||[]).map(row=>`<tr>${row.map((cell,ci)=>`<td>${ci===1?`<span class="lw-gu">${esc(cell)}</span>`:esc(cell)}</td>`).join('')}</tr>`).join('');
    return `<div class="lw-block">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(14,165,233,.2)"><span style="font-size:14px;color:#38bdf8;" class="material-symbols-outlined">compare_arrows</span></div><span class="lw-btitle">${esc(b.title||'Comparison')}</span></div>
      <div style="overflow-x:auto;border-radius:12px;border:1px solid rgba(255,255,255,.08);">
        <table class="lw-cmp-table">
          <thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>`;
  }

  function renderFillBlank(b) {
    const id = uid();
    const items = (b.items||[]).map((item,i)=>{
      const parts = (item.sentence||'').split('___');
      const before = guHl(parts[0]||'');
      const after  = guHl(parts[1]||'');
      return `<div class="lw-fb-item">
        <span class="lw-body" style="font-size:15px;">${before}<input class="lw-fb-input" id="${id}i${i}" placeholder="?" data-answer="${esc(item.answer||'')}" oninput="lwFBInput(this)">&nbsp;${after}</span>
        <button class="lw-fb-check" onclick="lwFBCheck('${id}i${i}')">Check</button>
        ${item.hint?`<span class="lw-fb-hint">💡 ${esc(item.hint)}</span>`:''}
      </div>`;
    }).join('');
    return `<div class="lw-block" style="border-color:rgba(91,79,207,.2);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(91,79,207,.22)"><span style="font-size:14px;color:#a5a0df;" class="material-symbols-outlined">edit</span></div><span class="lw-btitle">${esc(b.title||'Fill in the Blank')}</span></div>
      ${b.instructions?`<div style="font-size:13px;color:rgba(255,255,255,.45);margin-bottom:12px;">${esc(b.instructions)}</div>`:''}
      ${items}
    </div>`;
  }

  function renderWordFamily(b) {
    const members = (b.members||[]).map(m=>`<div class="lw-wf-card">
      <div class="lw-wf-word">${guHl(m.word||'')}</div>
      <div class="lw-wf-meaning">${esc(m.meaning||'')}</div>
    </div>`).join('');
    return `<div class="lw-block">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(16,185,129,.2)"><span style="font-size:14px;color:#34d399;" class="material-symbols-outlined">account_tree</span></div><span class="lw-btitle">${esc(b.title||'Word Family')}</span></div>
      <div class="lw-wf-root">
        <span class="lw-wf-root-word lw-gu">${esc(b.root||'')}</span>
        <span class="lw-wf-root-en">${esc(b.rootMeaning||'root')}</span>
      </div>
      <div class="lw-wf-grid">${members}</div>
    </div>`;
  }

  function renderImageWord(b) {
    const items = (b.items||[]).map(item=>`<div class="lw-iw-card" onclick="this.style.background='rgba(91,79,207,.2)';setTimeout(()=>this.style.background='',600)">
      <span class="lw-iw-emoji">${esc(item.emoji||'🔤')}</span>
      <span class="lw-iw-word lw-gu">${esc(item.word||'')}</span>
      <span class="lw-iw-en">${esc(item.meaning||'')}</span>
      ${item.example?`<div style="font-size:10px;color:rgba(255,255,255,.25);margin-top:4px;line-height:1.4;">${esc(item.example)}</div>`:''}
    </div>`).join('');
    return `<div class="lw-block">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(236,72,153,.18)"><span style="font-size:14px;color:#f472b6;" class="material-symbols-outlined">emoji_objects</span></div><span class="lw-btitle">${esc(b.title||'Visual Vocabulary')}</span></div>
      <div class="lw-iw-grid">${items}</div>
    </div>`;
  }

  function renderMinimalPairs(b) {
    const pairs = (b.pairs||[]).map(pair=>`
      <div class="lw-mp-pair">
        <div class="lw-mp-card lw-mp-left">
          <div class="lw-mp-char lw-gu">${esc(pair.word1||'')}</div>
          <div class="lw-mp-rom">/${esc(pair.sound1||'')}/</div>
        </div>
        <div class="lw-mp-vs">vs</div>
        <div class="lw-mp-card lw-mp-right">
          <div class="lw-mp-char lw-gu">${esc(pair.word2||'')}</div>
          <div class="lw-mp-rom">/${esc(pair.sound2||'')}/</div>
        </div>
        ${pair.diff?`<div class="lw-mp-diff">difference: ${esc(pair.diff)}</div>`:''}
      </div>`).join('');
    return `<div class="lw-block" style="border-color:rgba(14,165,233,.18);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(14,165,233,.2)"><span style="font-size:14px;color:#38bdf8;" class="material-symbols-outlined">compare</span></div><span class="lw-btitle">${esc(b.title||'Minimal Pairs')}</span></div>
      ${b.instruction?`<div style="font-size:13px;color:rgba(255,255,255,.4);margin-bottom:12px;">${esc(b.instruction)}</div>`:''}
      ${pairs}
    </div>`;
  }

  function renderStressPattern(b) {
    const words = (b.words||[]).map(w=>{
      const sylls = (w.syllables||[]).map((s,i)=>`<div class="lw-sp-syl${i===w.stressed?' stressed':''}">${esc(s)}</div>`).join('');
      return `<div style="margin-bottom:18px;">
        ${w.word?`<div class="lw-sp-gu">${guHl(w.word)}</div>`:''}
        <div class="lw-sp-word">${sylls}</div>
        <div class="lw-sp-label">stressed syllable = ${(w.syllables||[])[w.stressed]||''}</div>
        ${w.note?`<div style="font-size:12px;color:rgba(255,255,255,.3);text-align:center;margin-top:5px;">${esc(w.note)}</div>`:''}
      </div>`;
    }).join('');
    return `<div class="lw-block" style="border-color:rgba(236,72,153,.18);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(236,72,153,.18)"><span style="font-size:14px;color:#f472b6;" class="material-symbols-outlined">graphic_eq</span></div><span class="lw-btitle">${esc(b.title||'Stress Pattern')}</span></div>
      ${words}
      <div style="font-size:12px;color:rgba(255,255,255,.25);text-align:center;border-top:1px solid rgba(255,255,255,.05);padding-top:10px;">Larger = stressed syllable</div>
    </div>`;
  }

  function renderTongueTwister(b) {
    return `<div class="lw-block" style="background:rgba(236,72,153,.05);border-color:rgba(236,72,153,.2);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(236,72,153,.2)"><span style="font-size:14px;color:#f472b6;" class="material-symbols-outlined">record_voice_over</span></div><span class="lw-btitle">${esc(b.title||'Tongue Twister')}</span></div>
      <div class="lw-tt-text">${guHl(b.text||'')}</div>
      ${b.romanization?`<div class="lw-tt-rom">${esc(b.romanization)}</div>`:''}
      ${b.translation?`<div class="lw-tt-tr">"${esc(b.translation)}"</div>`:''}
      <div class="lw-tt-speeds">
        <button class="lw-tt-spd slow">🐢 Slow</button>
        <button class="lw-tt-spd med">🚶 Medium</button>
        <button class="lw-tt-spd fast">⚡ Fast</button>
      </div>
      ${b.tip?`<div style="font-size:12px;color:rgba(255,255,255,.3);text-align:center;margin-top:10px;">💡 ${esc(b.tip)}</div>`:''}
    </div>`;
  }

  function renderRoleplayCard(b) {
    const phrases = (b.usefulPhrases||[]).map(p=>`<span class="lw-rp-phrase">${guHl(p)}</span>`).join('');
    return `<div class="lw-block" style="border-color:rgba(139,92,246,.22);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(139,92,246,.2)"><span style="font-size:14px;color:#a78bfa;" class="material-symbols-outlined">theater_comedy</span></div><span class="lw-btitle">${esc(b.title||'Role-Play')}</span></div>
      <div class="lw-rp-badge" style="background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.25);color:#a78bfa;">🎭 ${esc(b.scenario||'Scenario')}</div>
      <div class="lw-rp-roles">
        <div class="lw-rp-role lw-rp-you">
          <div class="lw-rp-role-label" style="color:rgba(165,160,223,.5)">Your Role</div>
          <div class="lw-rp-role-name">${esc(b.yourRole||'You')}</div>
        </div>
        <div class="lw-rp-role lw-rp-partner">
          <div class="lw-rp-role-label" style="color:rgba(255,255,255,.2)">Partner Role</div>
          <div class="lw-rp-role-name">${esc(b.partnerRole||'Partner')}</div>
        </div>
      </div>
      ${b.context?`<div style="font-size:13px;color:rgba(255,255,255,.5);margin-bottom:10px;padding:10px 13px;background:rgba(255,255,255,.04);border-radius:9px;">${esc(b.context)}</div>`:''}
      ${b.goal?`<div class="lw-rp-goal">🎯 <strong style="color:#34d399;">Goal:</strong> ${guHl(b.goal)}</div>`:''}
      ${phrases?`<div style="font-size:11px;font-weight:700;color:rgba(255,255,255,.25);text-transform:uppercase;letter-spacing:.08em;margin-bottom:7px;">Useful phrases</div><div>${phrases}</div>`:''}
    </div>`;
  }

  function renderSentenceBuilder(b) {
    const id = uid();
    const wordList = (b.words||[]).map((w,i)=>`<span class="lw-sb-word" id="${id}w${i}" onclick="lwSBClick('${id}',${i},'${esc(w)}')">${guHl(w)}</span>`).join('');
    return `<div class="lw-block" style="border-color:rgba(16,185,129,.18);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(16,185,129,.2)"><span style="font-size:14px;color:#34d399;" class="material-symbols-outlined">reorder</span></div><span class="lw-btitle">${esc(b.title||'Sentence Builder')}</span></div>
      <div class="lw-sb-target">Translate: <strong style="color:rgba(255,255,255,.75);">${esc(b.translation||b.target||'')}</strong></div>
      <div class="lw-sb-drop" id="${id}drop" onclick="lwSBDropClick('${id}')">
        <span style="color:rgba(255,255,255,.15);font-size:13px;pointer-events:none;" id="${id}ph">Tap words to build the sentence...</span>
      </div>
      <div class="lw-sb-words">${wordList}</div>
      <div style="display:flex;gap:8px;">
        <button class="lw-sb-btn" onclick="lwSBCheck('${id}','${(b.correctOrder||[]).join(',')}','${(b.words||[]).map(esc).join('|')}')">✓ Check</button>
        <button class="lw-sb-btn" onclick="lwSBReset('${id}',${(b.words||[]).length})">↺ Reset</button>
      </div>
      <div id="${id}result" style="display:none;margin-top:10px;padding:10px 13px;border-radius:9px;font-size:13px;line-height:1.6;"></div>
    </div>`;
  }

  function renderTranslationTask(b) {
    const items = (b.items||[]).map((item,i)=>{
      const id = uid();
      return `<div class="lw-tr-item">
        <div class="lw-tr-src">${guHl(item.source||'')}</div>
        <textarea class="lw-tr-input" rows="2" placeholder="Type your translation...">${''}</textarea>
        <button class="lw-tr-show" onclick="document.getElementById('${id}').style.display='block';this.style.display='none'">Show answer</button>
        <div class="lw-tr-ans" id="${id}">${guHl(item.answer||'')}</div>
      </div>`;
    }).join('');
    return `<div class="lw-block" style="border-color:rgba(245,158,11,.18);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(245,158,11,.2)"><span style="font-size:14px;color:#fbbf24;" class="material-symbols-outlined">translate</span></div><span class="lw-btitle">${esc(b.title||'Translation Task')}</span></div>
      ${b.instruction?`<div style="font-size:13px;color:rgba(255,255,255,.4);margin-bottom:12px;">${esc(b.instruction)}</div>`:''}
      ${items}
    </div>`;
  }

  function renderMatching(b) {
    const id = uid();
    const left  = (b.leftItems||[]).map((item,i)=>`<div class="lw-mt-item lw-mt-left" id="${id}L${i}" onclick="lwMTSelect('${id}','L',${i})">${guHl(item)}</div>`).join('');
    const right = (b.rightItems||[]).map((item,i)=>`<div class="lw-mt-item" id="${id}R${i}" onclick="lwMTSelect('${id}','R',${i})">${guHl(item)}</div>`).join('');
    return `<div class="lw-block">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(14,165,233,.2)"><span style="font-size:14px;color:#38bdf8;" class="material-symbols-outlined">link</span></div><span class="lw-btitle">${esc(b.title||'Matching')}</span></div>
      ${b.instruction?`<div style="font-size:13px;color:rgba(255,255,255,.4);margin-bottom:12px;">${esc(b.instruction)}</div>`:''}
      <div class="lw-mt-grid">
        <div>${left}</div>
        <div>${right}</div>
      </div>
      <div id="${id}msg" style="text-align:center;font-size:13px;color:rgba(255,255,255,.3);"></div>
    </div>`;
  }

  function renderOrdering(b) {
    const id = uid();
    const words = (b.words||[]).map((w,i)=>`<span class="lw-or-chip" id="${id}c${i}" onclick="lwORClick('${id}',${i},'${esc(w)}')">${guHl(w)}</span>`).join('');
    return `<div class="lw-block" style="border-color:rgba(16,185,129,.18);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(16,185,129,.2)"><span style="font-size:14px;color:#34d399;" class="material-symbols-outlined">sort</span></div><span class="lw-btitle">${esc(b.title||'Put in Order')}</span></div>
      <div class="lw-or-sentence">${esc(b.instruction||'Arrange to form a correct sentence')}</div>
      <div class="lw-or-drop" id="${id}drop"></div>
      <div class="lw-or-words">${words}</div>
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button class="lw-sb-btn" onclick="lwORCheck('${id}','${(b.correctOrder||[]).join(',')}','${(b.words||[]).map(esc).join('|')}')">✓ Check</button>
        <button class="lw-sb-btn" onclick="lwORReset('${id}',${(b.words||[]).length})">↺ Reset</button>
      </div>
      <div id="${id}result" style="display:none;margin-top:10px;padding:10px 13px;border-radius:9px;font-size:13px;"></div>
    </div>`;
  }

  function renderTrueFalse(b) {
    const items = (b.items||[]).map((item,i)=>{
      const id = uid();
      return `<div class="lw-tf-item">
        <div class="lw-tf-stmt">${guHl(item.statement||'')}</div>
        <div class="lw-tf-btns">
          <button class="lw-tf-btn lw-tf-t" onclick="lwTFPick('${id}',true,${item.answer},'${esc(item.explanation||'')}')">✓ True</button>
          <button class="lw-tf-btn lw-tf-f" onclick="lwTFPick('${id}',false,${item.answer},'${esc(item.explanation||'')}')">✗ False</button>
        </div>
        <div class="lw-tf-expl" id="${id}expl"></div>
      </div>`;
    }).join('');
    return `<div class="lw-block">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(14,165,233,.2)"><span style="font-size:14px;color:#38bdf8;" class="material-symbols-outlined">rule</span></div><span class="lw-btitle">${esc(b.title||'True or False?')}</span></div>
      ${items}
    </div>`;
  }

  function renderNoteTemplate(b) {
    const sections = (b.sections||[]).map(s=>`<div class="lw-nt-section">
      <div class="lw-nt-label">📝 ${esc(s.label||'')}</div>
      <textarea class="lw-nt-input" rows="2" placeholder="${esc(s.placeholder||'Your notes here...')}"></textarea>
    </div>`).join('');
    return `<div class="lw-block" style="border-color:rgba(6,182,212,.18);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(6,182,212,.2)"><span style="font-size:14px;color:#22d3ee;" class="material-symbols-outlined">note_alt</span></div><span class="lw-btitle">${esc(b.title||'Listening Notes')}</span></div>
      ${b.instruction?`<div style="font-size:13px;color:rgba(255,255,255,.45);margin-bottom:12px;">${esc(b.instruction)}</div>`:''}
      ${sections}
    </div>`;
  }

  function renderGapFill(b) {
    const id = uid();
    let gapIdx = 0;
    const gaps = b.gaps||[];
    const textWithInputs = (b.text||'').replace(/___/g, ()=>{
      const gi = gapIdx++;
      return `<input class="lw-gf-inp" id="${id}g${gi}" data-answer="${esc(gaps[gi]||'')}" placeholder="?" oninput="lwGFInput(this)">`;
    });
    return `<div class="lw-block" style="border-color:rgba(6,182,212,.18);">
      <div class="lw-bh"><div class="lw-bicon" style="background:rgba(6,182,212,.2)"><span style="font-size:14px;color:#22d3ee;" class="material-symbols-outlined">text_fields</span></div><span class="lw-btitle">${esc(b.title||'Gap Fill')}</span></div>
      <div class="lw-gf-text">${guHl(textWithInputs)}</div>
      ${(b.hints||[]).length?`<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">${(b.hints||[]).map(h=>`<span style="padding:4px 10px;border-radius:999px;background:rgba(6,182,212,.1);border:1px solid rgba(6,182,212,.2);font-size:12px;color:rgba(34,211,238,.7);font-weight:600;">💡 ${esc(h)}</span>`).join('')}</div>`:'' }
      <button class="lw-sb-btn" onclick="lwGFCheckAll('${id}',${gapIdx})">Check All Answers</button>
      <div id="${id}result" style="display:none;margin-top:8px;font-size:13px;padding:9px 13px;border-radius:9px;"></div>
    </div>`;
  }

  function renderVocabularySpotlight(b) {
    const examples = (b.examples||[]).map(ex=>`<div class="lw-vs-ex">${guHl(ex.gu||ex)}</div>${ex.en?`<div class="lw-vs-ex-en">"${esc(ex.en)}"</div>`:''}`).join('');
    const related = (b.relatedWords||[]).map(w=>`<span class="lw-rp-phrase">${guHl(w)}</span>`).join('');
    return `<div class="lw-block" style="border-color:rgba(91,79,207,.25);padding:0;overflow:hidden;">
      <div class="lw-vs-hero">
        <div class="lw-vs-word lw-gu">${esc(b.word||'')}</div>
        ${b.pronunciation?`<div class="lw-vs-rom">/${esc(b.pronunciation)}/</div>`:''}
        ${b.partOfSpeech?`<div class="lw-vs-pos">${esc(b.partOfSpeech)}</div>`:''}
        <div class="lw-vs-meaning">${esc(b.meaning||'')}</div>
      </div>
      <div style="padding:16px 20px;">
        ${(b.examples||[]).length?`<div class="lw-vs-box-label" style="margin-bottom:8px;">Examples</div>${examples}`:''}
        ${b.culturalNote?`<div style="background:rgba(245,158,11,.07);border:1px solid rgba(245,158,11,.18);border-radius:10px;padding:11px 14px;margin-bottom:12px;font-size:13px;color:rgba(251,191,36,.8);">🏺 ${guHl(b.culturalNote)}</div>`:''}
        ${related?`<div class="lw-vs-box-label" style="margin-bottom:7px;">Related Words</div><div>${related}</div>`:''}
      </div>
    </div>`;
  }

  function renderCulturalNote(b) {
    const tags = (b.tags||[]).map(t=>`<span class="lw-cn-tag">${esc(t)}</span>`).join('');
    return `<div class="lw-cn-block" style="animation:lw-fadeup .4s ease both;">
      <div class="lw-cn-icon">${esc(b.icon||'🌍')}</div>
      <div class="lw-cn-body">
        <div class="lw-cn-title">${esc(b.title||'Cultural Note')}</div>
        <div class="lw-cn-text">${guHl(b.content||'')}</div>
        ${tags?`<div class="lw-cn-tags">${tags}</div>`:''}
      </div>
    </div>`;
  }

  function renderProgressCheckpoint(b) {
    const id = uid();
    const items = (b.items||[]).map((item,i)=>`<div class="lw-pc-item" id="${id}i${i}" onclick="lwPCToggle('${id}i${i}')">
      <div class="lw-pc-check" id="${id}c${i}"><span class="material-symbols-outlined" style="font-size:13px;color:rgba(16,185,129,.5);display:none;font-variation-settings:'FILL' 1">check</span></div>
      <div class="lw-pc-text">${guHl(item)}</div>
    </div>`).join('');
    return `<div class="lw-pc-block" style="animation:lw-fadeup .4s ease both;">
      <div class="lw-pc-header">
        <div class="lw-pc-badge"><span class="material-symbols-outlined" style="font-size:22px;color:#fff;font-variation-settings:'FILL' 1">check_circle</span></div>
        <div>
          <div class="lw-pc-title">${esc(b.title||'Progress Checkpoint')}</div>
          <div style="font-size:12px;color:rgba(255,255,255,.3);">Tick each item as you master it</div>
        </div>
      </div>
      ${items}
      ${b.xpBonus?`<div class="lw-pc-xp">Bonus: +${b.xpBonus} XP when all checked!</div>`:''}
    </div>`;
  }

  // ── Interactive JS helpers (injected as global functions) ─────────────────
  function injectHelpers() {
    if (window._lwHelpersInjected) return;
    window._lwHelpersInjected = true;

    // Quiz
    window.lwQuizPick = function(id, picked, correct, expl) {
      const opts = document.getElementById(id+'opts');
      if (!opts || opts.dataset.answered) return;
      opts.dataset.answered = '1';
      opts.querySelectorAll('[id^="'+id+'o"]').forEach((el,i) => {
        el.onclick = null; el.style.cursor = 'default';
        if (i === correct) { el.style.background='rgba(16,185,129,.2)'; el.style.borderColor='#10b981'; el.style.color='#34d399'; }
        else if (i === picked && picked !== correct) { el.style.background='rgba(239,68,68,.12)'; el.style.borderColor='#ef4444'; el.style.color='#f87171'; }
      });
      const el = document.getElementById(id+'expl');
      if (el && expl) { el.style.display='block'; el.innerHTML = (picked===correct?'<strong style="color:#34d399;">✓ Correct!</strong> ':'<strong style="color:#f87171;">✗ Incorrect!</strong> ') + expl; }
    };

    // Fill blank
    window.lwFBCheck = function(inputId) {
      const el = document.getElementById(inputId);
      if (!el) return;
      const correct = el.dataset.answer || '';
      const val = el.value.trim();
      const ok = val.toLowerCase() === correct.toLowerCase() || val === correct;
      el.className = 'lw-fb-input ' + (ok ? 'correct' : 'wrong');
    };
    window.lwFBInput = function(el) { el.className = 'lw-fb-input'; };

    // Sentence builder
    window._lwSBState = {};
    window.lwSBClick = function(id, idx, word) {
      const w = document.getElementById(id+'w'+idx);
      if (!w || w.classList.contains('placed')) return;
      w.classList.add('placed');
      const drop = document.getElementById(id+'drop');
      const ph = document.getElementById(id+'ph');
      if (ph) ph.style.display = 'none';
      if (!window._lwSBState[id]) window._lwSBState[id] = [];
      window._lwSBState[id].push(idx);
      const placed = document.createElement('span');
      placed.className = 'lw-sb-placed-word';
      placed.innerHTML = word.replace(/([\u0A80-\u0AFF]+)/g,'<span class="lw-gu">$1</span>');
      placed.onclick = function() {
        const posInArr = window._lwSBState[id].indexOf(idx);
        if (posInArr !== -1) window._lwSBState[id].splice(posInArr,1);
        const origW = document.getElementById(id+'w'+idx);
        if (origW) origW.classList.remove('placed');
        placed.remove();
        if (!window._lwSBState[id].length && document.getElementById(id+'ph')) document.getElementById(id+'ph').style.display='';
      };
      drop.appendChild(placed);
    };
    window.lwSBCheck = function(id, orderStr, wordsStr) {
      const correct = orderStr.split(',').map(Number);
      const state = window._lwSBState[id] || [];
      const words = wordsStr.split('|');
      const res = document.getElementById(id+'result');
      if (!res) return;
      const ok = correct.length === state.length && correct.every((v,i) => v === state[i]);
      res.style.display = 'block';
      res.style.background = ok ? 'rgba(16,185,129,.12)' : 'rgba(239,68,68,.1)';
      res.style.border = '1px solid ' + (ok ? 'rgba(16,185,129,.3)' : 'rgba(239,68,68,.2)');
      res.style.color = ok ? '#34d399' : '#f87171';
      res.innerHTML = ok ? '✓ Correct! Great job!' : '✗ Not quite. Correct order: ' + correct.map(i=>words[i]).join(' → ');
    };
    window.lwSBReset = function(id, count) {
      window._lwSBState[id] = [];
      const drop = document.getElementById(id+'drop');
      if (drop) { Array.from(drop.querySelectorAll('.lw-sb-placed-word')).forEach(el=>el.remove()); }
      for(let i=0;i<count;i++) { const w=document.getElementById(id+'w'+i); if(w) w.classList.remove('placed'); }
      const ph = document.getElementById(id+'ph'); if(ph) ph.style.display='';
      const res = document.getElementById(id+'result'); if(res) res.style.display='none';
    };

    // Ordering
    window._lwORState = {};
    window.lwORClick = function(id, idx, word) {
      const chip = document.getElementById(id+'c'+idx);
      if (!chip || chip.classList.contains('placed')) return;
      chip.classList.add('placed');
      if (!window._lwORState[id]) window._lwORState[id] = [];
      window._lwORState[id].push(idx);
      const drop = document.getElementById(id+'drop');
      const placed = document.createElement('span');
      placed.className = 'lw-or-chip';
      placed.style.background = 'rgba(16,185,129,.15)';
      placed.style.borderColor = 'rgba(16,185,129,.3)';
      placed.innerHTML = word.replace(/([\u0A80-\u0AFF]+)/g,'<span class="lw-gu">$1</span>');
      placed.onclick = function() {
        const pos = window._lwORState[id].indexOf(idx); if(pos!==-1) window._lwORState[id].splice(pos,1);
        const origChip = document.getElementById(id+'c'+idx); if(origChip) origChip.classList.remove('placed');
        placed.remove();
      };
      drop.appendChild(placed);
    };
    window.lwORCheck = function(id, orderStr, wordsStr) {
      const correct = orderStr.split(',').map(Number);
      const state = window._lwORState[id] || [];
      const words = wordsStr.split('|');
      const res = document.getElementById(id+'result');
      if (!res) return;
      const ok = correct.length === state.length && correct.every((v,i) => v === state[i]);
      res.style.display='block'; res.style.background=ok?'rgba(16,185,129,.12)':'rgba(239,68,68,.1)';
      res.style.border='1px solid '+(ok?'rgba(16,185,129,.3)':'rgba(239,68,68,.2)'); res.style.color=ok?'#34d399':'#f87171';
      res.innerHTML = ok ? '✓ Correct order!' : '✗ Correct order: ' + correct.map(i=>words[i]).join(' → ');
    };
    window.lwORReset = function(id, count) {
      window._lwORState[id]=[];
      const drop=document.getElementById(id+'drop'); if(drop) Array.from(drop.children).forEach(el=>el.remove());
      for(let i=0;i<count;i++){const c=document.getElementById(id+'c'+i);if(c)c.classList.remove('placed');}
      const res=document.getElementById(id+'result');if(res)res.style.display='none';
    };

    // True/False
    window.lwTFPick = function(id, picked, answer, expl) {
      const tBtn=document.querySelector(`[onclick*="lwTFPick('${id}',true"`);
      const fBtn=document.querySelector(`[onclick*="lwTFPick('${id}',false"`);
      if(tBtn){tBtn.onclick=null;tBtn.style.cursor='default';}
      if(fBtn){fBtn.onclick=null;fBtn.style.cursor='default';}
      const ok = (picked === answer);
      const activeBtn = picked ? tBtn : fBtn;
      if(activeBtn){activeBtn.style.background=ok?'rgba(16,185,129,.3)':'rgba(239,68,68,.2)';activeBtn.style.borderColor=ok?'#10b981':'#ef4444';}
      const exEl=document.getElementById(id+'expl');
      if(exEl&&expl){exEl.classList.add('show');exEl.innerHTML=(ok?'<strong style="color:#34d399">✓ Correct!</strong> ':'<strong style="color:#f87171">✗ Incorrect!</strong> ')+expl;}
    };

    // Matching
    window._lwMTState = {};
    window.lwMTSelect = function(id, side, idx) {
      if(!window._lwMTState[id]) window._lwMTState[id]={sel:null,matched:[]};
      const state = window._lwMTState[id];
      const elId = id+side+idx;
      const el = document.getElementById(elId);
      if(!el || el.classList.contains('matched')) return;
      if(state.sel && state.sel.side === side) { document.getElementById(id+state.sel.side+state.sel.idx).classList.remove('selected'); }
      if(state.sel && state.sel.side !== side) {
        const prevEl = document.getElementById(id+state.sel.side+state.sel.idx);
        // Check if pair
        const isMatch = (side==='R' && state.sel.side==='L' && state.sel.idx===idx) ||
                        (side==='L' && state.sel.side==='R' && state.sel.idx===idx);
        if(isMatch) {
          el.classList.add('matched'); prevEl.classList.add('matched');
          prevEl.classList.remove('selected');
          state.matched.push(idx); state.sel=null;
        } else {
          el.classList.add('wrong'); prevEl.classList.add('wrong');
          setTimeout(()=>{el.classList.remove('wrong','selected');prevEl.classList.remove('wrong','selected');},800);
          state.sel=null;
        }
      } else {
        el.classList.add('selected'); state.sel={side,idx};
      }
    };

    // Progress checkpoint
    window.lwPCToggle = function(itemId) {
      const item = document.getElementById(itemId);
      if(!item) return;
      const check = item.querySelector('.lw-pc-check');
      const icon = check ? check.querySelector('.material-symbols-outlined') : null;
      const on = check && check.classList.toggle('on');
      if(icon) icon.style.display = on ? '' : 'none';
    };

    // Gap fill
    window.lwGFInput = function(el) { el.className='lw-gf-inp'; };
    window.lwGFCheckAll = function(id, count) {
      let correct=0;
      for(let i=0;i<count;i++) {
        const el=document.getElementById(id+'g'+i);
        if(!el) continue;
        const ok=el.value.trim().toLowerCase()===(el.dataset.answer||'').toLowerCase()||el.value.trim()===(el.dataset.answer||'');
        el.className='lw-gf-inp '+(ok?'correct':'wrong');
        if(ok) correct++;
      }
      const res=document.getElementById(id+'result');
      if(res){res.style.display='block';res.style.background=correct===count?'rgba(16,185,129,.1)':'rgba(245,158,11,.08)';res.style.border='1px solid '+(correct===count?'rgba(16,185,129,.25)':'rgba(245,158,11,.2)');res.style.color=correct===count?'#34d399':'#fbbf24';res.innerHTML=`${correct}/${count} correct`;}
    };

    // Audio
    window.lwPlayAudio = function(url, btn) {
      if(!url){btn.innerHTML='<span class="material-symbols-outlined" style="color:#fff;font-size:24px;font-variation-settings:\'FILL\' 1">music_off</span>';return;}
      try { new Audio(url).play(); } catch(e){}
    };
  }

  // ── Public API ────────────────────────────────────────────────────────────
  return {
    render: function(block, opts) {
      injectCSS();
      injectHelpers();
      return render(block, opts);
    },
    renderAll: function(blocks, opts) {
      injectCSS();
      injectHelpers();
      return (blocks||[]).map(b => render(b, opts)).join('');
    },
    esc: esc,
    guHl: guHl
  };
})();
