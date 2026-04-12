/**
 * LearnWise Activities Content Layer v2
 * Supports 29 block types for rich language learning content.
 */
window.LWContent = {
  STORAGE_KEY: 'lw_activities_content',
  _cache: null,
  _load() {
    if (this._cache) return this._cache;
    try { const r = localStorage.getItem(this.STORAGE_KEY); this._cache = r ? JSON.parse(r) : {}; }
    catch(e) { this._cache = {}; }
    return this._cache;
  },
  _save() { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._cache)); },
  getContent(actId)      { return this._load()[String(actId)] || null; },
  saveContent(actId, c)  { const a=this._load(); a[String(actId)]=c; this._save(); },
  deleteContent(actId)   { const a=this._load(); delete a[String(actId)]; this._save(); },
  getAllContent()         { return this._load(); },
  exportJSON()            { return JSON.stringify(this._load(), null, 2); },
  clearAll()             { this._cache={}; localStorage.removeItem(this.STORAGE_KEY); },
  importJSON(jsonStr) {
    try { const o=JSON.parse(jsonStr); this._cache={...this._load(),...o}; this._save(); return {success:true,count:Object.keys(o).length}; }
    catch(e) { return {success:false,error:e.message}; }
  },
  getStats() {
    const a=this._load(),ids=Object.keys(a);
    return {totalWithContent:ids.filter(id=>a[id]&&a[id].blocks&&a[id].blocks.length>0).length,totalStored:ids.length};
  },
  createBlock(type) {
    const id='blk_'+Date.now()+'_'+Math.random().toString(36).substr(2,5);
    const m={
      text:{id,type:'text',title:'Explanation',body:''},
      keypoints:{id,type:'keypoints',title:'Key Points',points:['']},
      vocab_table:{id,type:'vocab_table',title:'Vocabulary',words:[{word:'',meaning:'',example:''}]},
      quiz:{id,type:'quiz',question:'',options:['','','',''],correct:0,explanation:''},
      speaking:{id,type:'speaking',prompt:'',hints:['']},
      reading:{id,type:'reading',passage:'',questions:[{q:'',a:''}]},
      writing:{id,type:'writing',prompt:'',minWords:50,sampleAnswer:''},
      audio:{id,type:'audio',label:'Audio Clip',url:'',transcript:''},
      tip:{id,type:'tip',body:''},
      grammar_rule:{id,type:'grammar_rule',title:'Grammar Rule',pattern:'Subject + Object + Verb',examples:[{native:'',target:'',translation:''}],note:''},
      dialogue:{id,type:'dialogue',title:'Dialogue',speakers:['Person A','Person B'],lines:[{speaker:0,text:'',romanization:'',translation:''},{speaker:1,text:'',romanization:'',translation:''}]},
      comparison_table:{id,type:'comparison_table',title:'Comparison',headers:['English','Target Language','Pronunciation'],rows:[['Hello','','']]},
      fill_blank:{id,type:'fill_blank',title:'Fill in the Blank',instructions:'Complete the sentence',items:[{sentence:'___ means hello.',answer:'',hint:''}]},
      word_family:{id,type:'word_family',title:'Word Family',root:'',rootMeaning:'',members:[{word:'',meaning:''},{word:'',meaning:''}]},
      image_word:{id,type:'image_word',title:'Visual Vocabulary',items:[{emoji:'🏠',word:'',meaning:'',example:''},{emoji:'💧',word:'',meaning:'',example:''}]},
      minimal_pairs:{id,type:'minimal_pairs',title:'Minimal Pairs',instruction:'Listen to the difference',pairs:[{word1:'',word2:'',sound1:'',sound2:'',diff:''}]},
      stress_pattern:{id,type:'stress_pattern',title:'Word Stress',words:[{word:'',syllables:['',''],stressed:0,note:''}]},
      tongue_twister:{id,type:'tongue_twister',title:'Tongue Twister',text:'',romanization:'',translation:'',tip:''},
      roleplay_card:{id,type:'roleplay_card',title:'Role-Play',scenario:'',yourRole:'Customer',partnerRole:'Shopkeeper',context:'',goal:'',usefulPhrases:['']},
      sentence_builder:{id,type:'sentence_builder',title:'Build the Sentence',translation:'',words:['','',''],correctOrder:[0,1,2]},
      translation_task:{id,type:'translation_task',title:'Translation Task',instruction:'Translate into the target language',items:[{source:'Hello',answer:''},{source:'Thank you',answer:''}]},
      matching:{id,type:'matching',title:'Match the Pairs',instruction:'Tap to match',leftItems:['',''],rightItems:['',''],pairs:[[0,0],[1,1]]},
      ordering:{id,type:'ordering',title:'Put in Order',instruction:'Arrange the words correctly',words:['','',''],correctOrder:[0,1,2]},
      true_false:{id,type:'true_false',title:'True or False?',items:[{statement:'',answer:true,explanation:''}]},
      note_template:{id,type:'note_template',title:'Listening Notes',instruction:'Take notes while listening',sections:[{label:'Speakers:',placeholder:'Who is speaking?'},{label:'Key words:',placeholder:'Words you heard'},{label:'Main topic:',placeholder:'What was discussed?'}]},
      gap_fill:{id,type:'gap_fill',title:'Gap Fill',text:'___ means hello.',gaps:[''],hints:['']},
      vocabulary_spotlight:{id,type:'vocabulary_spotlight',title:'Word Spotlight',word:'',meaning:'',pronunciation:'',partOfSpeech:'noun',examples:[{gu:'',en:''}],relatedWords:[''],culturalNote:''},
      cultural_note:{id,type:'cultural_note',title:'Cultural Note',icon:'🌍',content:'',tags:['culture']},
      progress_checkpoint:{id,type:'progress_checkpoint',title:'Progress Checkpoint',items:['I can say hello','I know 5 vocabulary words'],xpBonus:10},
    };
    return m[type]||m.text;
  },
  BLOCK_TYPES:[
    {type:'text',icon:'📝',label:'Text Block',group:'basic',color:'#5b4fcf'},
    {type:'keypoints',icon:'🎯',label:'Key Points',group:'basic',color:'#10b981'},
    {type:'tip',icon:'💡',label:'Tip / Note',group:'basic',color:'#f59e0b'},
    {type:'audio',icon:'🎵',label:'Audio Clip',group:'media',color:'#06b6d4'},
    {type:'grammar_rule',icon:'📐',label:'Grammar Rule',group:'lesson',color:'#5b4fcf'},
    {type:'dialogue',icon:'💬',label:'Dialogue',group:'lesson',color:'#8b5cf6'},
    {type:'comparison_table',icon:'⚖️',label:'Comparison Table',group:'lesson',color:'#0ea5e9'},
    {type:'fill_blank',icon:'✏️',label:'Fill in the Blank',group:'interactive',color:'#5b4fcf'},
    {type:'vocab_table',icon:'📊',label:'Vocabulary Table',group:'vocabulary',color:'#0ea5e9'},
    {type:'word_family',icon:'🌿',label:'Word Family',group:'vocabulary',color:'#10b981'},
    {type:'image_word',icon:'🖼️',label:'Image + Word',group:'vocabulary',color:'#ec4899'},
    {type:'vocabulary_spotlight',icon:'🔦',label:'Word Spotlight',group:'vocabulary',color:'#5b4fcf'},
    {type:'minimal_pairs',icon:'🔊',label:'Minimal Pairs',group:'pronunciation',color:'#0ea5e9'},
    {type:'stress_pattern',icon:'〽️',label:'Stress Pattern',group:'pronunciation',color:'#ec4899'},
    {type:'tongue_twister',icon:'👅',label:'Tongue Twister',group:'pronunciation',color:'#ec4899'},
    {type:'roleplay_card',icon:'🎭',label:'Role-Play Card',group:'speaking',color:'#8b5cf6'},
    {type:'speaking',icon:'🗣️',label:'Speaking Prompt',group:'speaking',color:'#8b5cf6'},
    {type:'sentence_builder',icon:'🧩',label:'Sentence Builder',group:'interactive',color:'#10b981'},
    {type:'translation_task',icon:'🔄',label:'Translation Task',group:'interactive',color:'#f59e0b'},
    {type:'matching',icon:'🔗',label:'Matching',group:'interactive',color:'#0ea5e9'},
    {type:'ordering',icon:'🔢',label:'Word Ordering',group:'interactive',color:'#10b981'},
    {type:'true_false',icon:'☑️',label:'True or False',group:'interactive',color:'#0ea5e9'},
    {type:'quiz',icon:'❓',label:'Quiz Question',group:'test',color:'#ef4444'},
    {type:'reading',icon:'📖',label:'Reading Passage',group:'reading',color:'#10b981'},
    {type:'writing',icon:'✍️',label:'Writing Task',group:'writing',color:'#f59e0b'},
    {type:'note_template',icon:'📋',label:'Listening Notes',group:'listening',color:'#06b6d4'},
    {type:'gap_fill',icon:'🔲',label:'Gap Fill',group:'listening',color:'#06b6d4'},
    {type:'cultural_note',icon:'🌍',label:'Cultural Note',group:'culture',color:'#f59e0b'},
    {type:'progress_checkpoint',icon:'✅',label:'Progress Checkpoint',group:'review',color:'#10b981'},
  ],
};
