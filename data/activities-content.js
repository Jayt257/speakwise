/**
 * LearnWise Activities Content Layer
 * Admin-editable content stored in localStorage as JSON.
 */

window.LWContent = {
  STORAGE_KEY: 'lw_activities_content',
  _cache: null,

  _load() {
    if (this._cache) return this._cache;
    try { const raw = localStorage.getItem(this.STORAGE_KEY); this._cache = raw ? JSON.parse(raw) : {}; }
    catch(e) { this._cache = {}; }
    return this._cache;
  },
  _save() { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._cache)); },
  getContent(actId) { return this._load()[String(actId)] || null; },
  saveContent(actId, content) { const all = this._load(); all[String(actId)] = content; this._save(); },
  deleteContent(actId) { const all = this._load(); delete all[String(actId)]; this._save(); },
  getAllContent() { return this._load(); },
  exportJSON() { return JSON.stringify(this._load(), null, 2); },
  importJSON(jsonStr) {
    try { const obj = JSON.parse(jsonStr); this._cache = { ...this._load(), ...obj }; this._save(); return { success: true, count: Object.keys(obj).length }; }
    catch(e) { return { success: false, error: e.message }; }
  },
  clearAll() { this._cache = {}; localStorage.removeItem(this.STORAGE_KEY); },
  getStats() {
    const all = this._load(); const ids = Object.keys(all);
    const withContent = ids.filter(id => { const c = all[id]; return c && c.blocks && c.blocks.length > 0; });
    return { totalWithContent: withContent.length, totalStored: ids.length };
  },

  createBlock(type) {
    const id = 'blk_' + Date.now() + '_' + Math.random().toString(36).substr(2,5);
    const D = {
      text:               { id, type:'text',               title:'Explanation', body:'' },
      keypoints:          { id, type:'keypoints',          title:'Key Points', points:[''] },
      tip:                { id, type:'tip',                style:'tip', body:'' },
      audio:              { id, type:'audio',              label:'Audio Clip', url:'', transcript:'' },
      video_embed:        { id, type:'video_embed',        title:'', url:'', platform:'youtube', discussion_questions:[''] },
      vocab_table:        { id, type:'vocab_table',        title:'Vocabulary', words:[{word:'',meaning:'',example:'',pronunciation:''}] },
      flashcard_set:      { id, type:'flashcard_set',      title:'Flashcards', cards:[{front:'',back:'',example:'',notes:''}] },
      word_family:        { id, type:'word_family',        base_word:'', noun:'', verb:'', adjective:'', adverb:'', example_sentence:'' },
      idiom_card:         { id, type:'idiom_card',         idiom:'', meaning:'', example:'', context_tip:'' },
      fill_blank:         { id, type:'fill_blank',         instruction:'Fill in the blank with the correct word.', sentences:[{sentence:'He __ to school every day.',answer:'goes',hint:'present tense of go'}] },
      grammar_rule:       { id, type:'grammar_rule',       rule_name:'', formula:'Subject + Verb + Object', explanation:'', examples:[{sentence:'',translation:''}], exceptions:'' },
      dialogue:           { id, type:'dialogue',           title:'Dialogue', context:'', turns:[{speaker:'A',text:''},{speaker:'B',text:''}] },
      cultural_note:      { id, type:'cultural_note',      title:'Cultural Note', category:'custom', body:'', fun_fact:'' },
      sentence_starters:  { id, type:'sentence_starters',  title:'Sentence Starters', instruction:'Use these starters to begin your sentences.', starters:[{starter:'',translation:'',example:''}] },
      reading:            { id, type:'reading',            passage:'', questions:[{q:'',a:''}] },
      true_false:         { id, type:'true_false',         instruction:'Mark each statement True (T), False (F), or Not Given (NG).', statements:[{text:'',answer:'true',explanation:''}] },
      sequencing:         { id, type:'sequencing',         instruction:'Put these events in the correct order.', items:[{text:'',order:1}] },
      annotated_passage:  { id, type:'annotated_passage',  title:'', passage:'', annotations:[{word:'',meaning:'',note:''}] },
      writing:            { id, type:'writing',            prompt:'', minWords:50, sampleAnswer:'' },
      word_bank:          { id, type:'word_bank',          title:'Word Bank', instruction:'Use these words in your writing.', words:[{word:'',pos:'noun',meaning:''}] },
      error_correction:   { id, type:'error_correction',   instruction:'Find and correct the mistakes below.', original_text:'', corrected_text:'', errors:[{error:'',correction:'',explanation:''}] },
      guided_steps:       { id, type:'guided_steps',       title:'Writing Guide', steps:[{step_title:'',instruction:'',example:''}] },
      speaking:           { id, type:'speaking',           prompt:'', hints:[''] },
      role_play:          { id, type:'role_play',          scenario:'', roles:[{name:'Person A',description:''},{name:'Person B',description:''}], key_phrases:[''], duration_minutes:5 },
      debate_topic:       { id, type:'debate_topic',       topic:'', background:'', pro_points:[''], con_points:[''], discussion_questions:[''] },
      conversation_starters:{ id, type:'conversation_starters', title:'Conversation Starters', level:'beginner', starters:[{prompt:'',follow_up:''}] },
      minimal_pairs:      { id, type:'minimal_pairs',      instruction:'Listen and practice these similar sounds.', pairs:[{word1:'',word2:'',sound_difference:'',tip:''}] },
      stress_pattern:     { id, type:'stress_pattern',     instruction:'CAPITALS = stressed syllable.', words:[{word:'',pattern:'',ipa:'',example:''}] },
      tongue_twister:     { id, type:'tongue_twister',     text:'', translation:'', tip:'', difficulty:'medium' },
      pronunciation_guide:{ id, type:'pronunciation_guide',title:'Pronunciation Guide', words:[{word:'',phonetic:'',native_equivalent:'',tip:''}] },
      transcript_cloze:   { id, type:'transcript_cloze',   audio_label:'', audio_url:'', transcript_with_blanks:'Use [blank] to mark gaps.', answers:[{position:1,answer:''}] },
      listen_repeat:      { id, type:'listen_repeat',      audio_label:'', audio_url:'', segments:[{text:'',phonetic:'',meaning:'',repetitions:3}] },
      audio_questions:    { id, type:'audio_questions',    audio_label:'', audio_url:'', pre_questions:[{q:'',a:''}], post_questions:[{q:'',a:''}] },
      quiz:               { id, type:'quiz',               question:'', options:['','','',''], correct:0, explanation:'' },
      matching:           { id, type:'matching',           instruction:'Match each item on the left with the correct item on the right.', pairs:[{left:'',right:''}] },
      ordering:           { id, type:'ordering',           instruction:'Put the sentences in the correct order.', items:[{text:'',correct_position:1}] },
      short_answer:       { id, type:'short_answer',       question:'', word_limit:50, model_answer:'', key_points:[''] },
    };
    return D[type] || D.text;
  }
};
