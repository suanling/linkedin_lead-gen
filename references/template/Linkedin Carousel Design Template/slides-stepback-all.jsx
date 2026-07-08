// slides-stepback-all.jsx — GENERIC carousel content engine.
// ════════════════════════════════════════════════════════════════════════════
// SLIDES — THE SINGLE SOURCE OF TRUTH FOR EVERY VARIANT (sb-v1 … sb-v11).
// Edit this one array (10 entries) to regenerate the WHOLE carousel for ANY post.
// The skill fills it from the linkedin-carousel-creator agent's 10-beat spec.
// Each variant renders these fields in its own layout DNA; helper arrays
// (SB_BG/SB_EYE/SB_WORD/SB_ACCENT/SB_SHORT/SB_RICH) are DERIVED from SLIDES below
// so there is exactly one place to edit.
//
// PER-SLIDE SCHEMA (only `headline` is required; every other field is optional and
// each layout uses what's present, falling back gracefully). These fields map onto
// the recurring kk-carousel slide shapes, so any kk family can be expressed:
//   bg       : 'cream'|'paper'|'navy'|'mist'  — slide background tone (rhythm)
//   eyebrow  : string   — small top-left label ("04 · the gut check")
//   word     : string|null — ONE hero word for type-as-image variants ("more.")
//   accent   : bool     — render the hero word in terracotta
//   headline : string   — the main line (ALWAYS provide)
//   hi       : string   — (slide 1 only) trailing phrase of headline to highlight in a chip
//   body     : string   — supporting sentence(s)
//   extra    : string|null — optional third line (italic aside / detail)
//   short    : string   — one-line version for minimal variants (\n allowed)
//   list     : string[] — a short mini-list  ["8am.","to 10pm.","for a year."]   (Family A)
//   bars     : [{label,sub}] up to 3 — self-test / signs / audit  (C4, C18 save magnet)
//   compare  : {oldLabel,old,newLabel,new} — before/after, myth→truth  (Family F, C31)
//   tagged   : [{text,tag}] up to 3 — framework/cheat-sheet rows, the save line  (C41–C50)
//   strike   : string   — crossed-out half of a reframe  (Family D myth-bust)
//   alt      : string   — affirmative half of the strike/reframe pair
//   cta      : {pre,key} — CTA button: small prefix + accent keyword chip  (slide 10)
//   img      : string|null — art-direction tag for the image slot (kie.ai prompt seed)
//
// SAVE-WORTHINESS (required): include one `bars` self-test slide AND one `tagged`/
// quotable slide so the deck earns saves (a save ≈ 5x a like for reach).
// CURRENT CONTENT: 2026-06-23 "The founder identity shift".
// ════════════════════════════════════════════════════════════════════════════
const SLIDES = [
  { bg:'cream', eyebrow:'01 · the confession', word:null, accent:true,
    headline:"I help founders stop being the bottleneck.", hi:"the bottleneck.", body:"And I'm still untangling it in mine.", extra:"For the past year I've worked 8am to 10pm, running my own business.",
    short:"I help founders stop being the bottleneck. I'm still untangling it in mine." },
  { bg:'paper', eyebrow:"02 · what didn't drop", word:'hours.', accent:false,
    headline:"The hours didn't drop the day I left my job.", body:"My identity just had nowhere left to hide.", extra:null,
    short:"The hours didn't drop the day I left my job.\nMy identity just had nowhere left to hide.",
    list:['8am.','to 10pm.','for a year.'], img:'long hours · desk at night' },
  { bg:'navy', eyebrow:'03 · the old self', word:'needed.', accent:true,
    headline:"Being the one everything ran through was who I was.", body:"I caught every fire, made every call. Being needed felt like proof I mattered.", extra:null,
    short:"Being needed felt like proof I mattered." },
  { bg:'mist', eyebrow:'04 · the gut check', word:'panic.', accent:true,
    headline:"When you picture stepping back, what shows up first?", body:"A) relief.  B) guilt.  C) a quiet \"but who am I then.\"", extra:"Most founders sit in C and won't say it out loud.",
    short:"Relief, guilt, or a quiet \"but who am I then\"?",
    bars:[{label:'A) Relief.', sub:'the work finally runs without you'},
          {label:'B) Guilt.', sub:'you should have built this sooner'},
          {label:'C) "But who am I then."', sub:'the one nobody says out loud'}],
    img:'quiet · still · interior' },
  { bg:'navy', eyebrow:'05 · the gap', word:'who?', accent:false,
    headline:"You build the thing to run without you, and the first feeling isn't relief.", body:"It's quiet panic. If the work doesn't need me in every seat, who am I in my own company?", extra:null,
    short:"If the work doesn't need me in every seat,\nwho am I in my own company?" },
  { bg:'cream', eyebrow:'06 · the shift', word:'rest.', accent:true,
    headline:"What I'm learning: rest is a discipline, not a reward.", body:"A real lunch. The slow evening. A two-day break I don't earn, I just take.", extra:"Not because the work is done.",
    short:"Rest is a discipline, not a reward.",
    compare:{oldLabel:'the old rule', old:'Rest is the reward you earn after the work is finally done.',
             newLabel:'the real rule', new:"Rest is a discipline. A real lunch. A two-day break I don't earn, I just take."},
    img:'slow morning · light · calm' },
  { bg:'mist', eyebrow:'07 · in practice', word:'this week.', accent:false,
    headline:"Put rest and work in the same week, on purpose.", body:"Not once the quarter is clearer. Not after you collapse. The same week.", extra:null,
    short:"Put rest and work in the same week, on purpose.",
    strike:'rest once the work is done.', alt:'put rest and work in the same week.', img:'calendar · quiet block' },
  { bg:'paper', eyebrow:'08 · the reframe', word:'design.', accent:true,
    headline:"The goal isn't to matter less.", body:"It's to matter for the design instead of the firefighting.", extra:"Build the business that doesn't need you in every seat.",
    short:"Matter for the design, not the firefighting.",
    strike:'firefighting.', alt:'the design.' },
  { bg:'cream', eyebrow:'09 · screenshot', word:'valuable.', accent:true,
    headline:"Being needed for everything isn't the same as being valuable.", body:"So being needed stops being the only thing that tells you you matter.", extra:null,
    short:"Being needed for everything isn't the same as being valuable.",
    tagged:[{text:'Being needed felt like proof I mattered.', tag:'the old wiring'},
            {text:'So I caught every fire, made every call.', tag:'the cost'},
            {text:"Being needed isn't the same as being valuable.", tag:'the shift ←'}] },
  { bg:'paper', eyebrow:"10 · let's talk", word:'coffee?', accent:true,
    headline:"I'm not on the other side of this yet.", body:"If you're somewhere in this too, DM me for a coffee chat. I'd rather swap honest founder stories than hand out advice.", extra:"Follow for more on building a business that runs without you.",
    short:"DM me for a coffee chat to swap stories like this.",
    cta:{pre:'DM me for a', key:'COFFEE CHAT'}, img:'portrait · direct gaze' },
];

// Derived helper arrays — DO NOT EDIT, they read from SLIDES (single source).
const SB_RICH   = SLIDES;
const SB_BG     = SLIDES.map(s => s.bg || 'cream');
const SB_EYE    = SLIDES.map(s => s.eyebrow || '');
const SB_WORD   = SLIDES.map(s => s.word || null);
const SB_ACCENT = SLIDES.map(s => s.accent !== false);
const SB_SHORT  = SLIDES.map(s => s.short || s.headline || '');
const SB_HEAD   = SLIDES.map(s => s.headline || '');


const onDk = n => SB_BG[n-1] === 'navy';

// Shared hook hero — used by ALL variants on slide 1. DATA-DRIVEN from SLIDES[0].
// Slide 1's headline is the hook; optional `hi` field highlights a trailing phrase
// (the terracotta chip). If `hi` is the tail of the headline, it's split out and
// chipped; otherwise the whole headline shows plain. `body` is the italic sub-line.
function SbHookHero({ dark = false, large = false }) {
  const r = SLIDES[0] || {};
  const fg = dark ? 'rgba(245,240,234,0.92)' : 'var(--fg-1)';
  const sz = large ? 96 : 72;
  const subSz = large ? 36 : 28;
  const head = r.headline || '';
  const hi = r.hi && head.endsWith(r.hi) ? r.hi : null;
  const lead = hi ? head.slice(0, head.length - hi.length) : head;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:sz, letterSpacing:'-0.03em', lineHeight:1.05, textWrap:'balance', color:fg }}>
        <Editable as="span">{lead}</Editable>
        {hi && <span style={{ background:'var(--accent)', color:'#FAF8F5', padding:'2px 16px 6px', borderRadius:8, display:'inline-block', lineHeight:1.1 }}>{hi}</span>}
      </div>
      <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:subSz, lineHeight:1.45, color: dark?'rgba(245,240,234,0.65)':'var(--fg-2)', textWrap:'balance' }}>
        {r.body}
      </Editable>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// V1 · ORIGINAL BOLD
// Mirrors original V1 layout beats: strikethrough, stacked
// contrast, dark slide for slide 5.
// ══════════════════════════════════════════════════════════════
// V1 · ORIGINAL — bold type-as-image. Every slide is DATA-DRIVEN from SLIDES[n-1].
// Layout chosen by which structured field is present (bars→self-test, compare→
// before/after, strike+alt→reframe, tagged→save line, cta→CTA), else hero word +
// headline + body. This is what lets V1 render ANY post, not just this one.
const v1Dark = n => SB_BG[n-1] === 'navy';
const v1WordColor = (r,n) => r.accent !== false ? 'var(--accent)' : (v1Dark(n) ? 'var(--fg-inverse)' : 'var(--fg-2)');

function V1Slide({ n, brand }) {
  const r = SLIDES[n-1] || {};
  const dark = v1Dark(n);
  const tc = dark ? 'rgba(245,240,234,0.92)' : 'var(--fg-1)';
  const sc = dark ? 'rgba(245,240,234,0.7)' : 'var(--fg-2)';
  const eyeStyle = dark ? { color:'rgba(245,240,234,0.45)' } : {};
  const imgId = `sb-v1-${String(n).padStart(2,'0')}-img`;

  // Slide 1 = the shared hook hero.
  if (n === 1) return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[0]} showMark={false}>
      <div style={{position:'absolute',top:56,left:64}}><Eyebrow>{r.eyebrow}</Eyebrow></div>
      <div style={{position:'absolute',left:80,right:80,top:'50%',transform:'translateY(-50%)'}}><SbHookHero large={true} dark={dark}/></div>
    </SlideFrame>
  );

  // CTA slide (cta field) — button + portrait.
  if (r.cta) return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark>
      <div style={{position:'absolute',top:0,right:0,bottom:0,width:300,zIndex:0}}>
        <Img id={imgId} shape="rect" radius={0} placeholder={r.img||'portrait · direct gaze'} style={{width:'100%',height:'100%'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to left, transparent 20%, var(--lc-soft-white) 60%)',zIndex:1}}/>
      </div>
      <div style={{position:'absolute',top:56,left:64}}><Eyebrow style={eyeStyle}>{r.eyebrow}</Eyebrow></div>
      <div style={{position:'absolute',left:80,right:340,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:28}}>
        <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:72,letterSpacing:'-0.03em',lineHeight:1.05,textWrap:'balance',maxWidth:780,color:tc}}>{r.headline}</Editable>
        <div style={{display:'flex',alignItems:'stretch',alignSelf:'flex-start',border:'2px solid var(--fg-1)',borderRadius:8,overflow:'hidden'}}>
          <span style={{padding:'18px 24px',fontFamily:'var(--font-sans)',fontSize:22,color:'var(--fg-1)'}}>{r.cta.pre}</span>
          <span style={{padding:'18px 28px',fontFamily:'var(--font-mono)',fontSize:28,fontWeight:700,letterSpacing:'0.14em',color:'var(--fg-inverse)',background:'var(--accent)'}}>{r.cta.key}</span>
        </div>
        <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:22,color:sc,lineHeight:1.6,maxWidth:680}}>{r.body}</Editable>
        {r.extra && <div style={{fontFamily:'var(--font-sans)',fontSize:14,letterSpacing:'0.22em',textTransform:'uppercase',color:'var(--fg-3)',fontWeight:500}}>{r.extra}</div>}
      </div>
    </SlideFrame>
  );

  // Self-test / signs / audit (bars field) — the save magnet.
  if (r.bars) return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark>
      <div style={{position:'absolute',top:56,left:64}}><Eyebrow style={eyeStyle}>{r.eyebrow}</Eyebrow></div>
      {r.img && <div style={{position:'absolute',top:56,right:64,width:200,height:200,borderRadius:12,overflow:'hidden'}}>
        <Img id={imgId} shape="rect" radius={0} placeholder={r.img} style={{width:'100%',height:'100%'}}/></div>}
      <div style={{position:'absolute',left:80,right:80,top:160,bottom:160,display:'flex',flexDirection:'column',gap:0}}>
        {r.bars.slice(0,3).map((b,i)=>{
          const last = i === r.bars.length-1;
          const c = last ? 'var(--accent)' : (i===1 ? sc : (dark?'rgba(245,240,234,0.55)':'var(--fg-3)'));
          return (
            <div key={i} style={{flex:last?1.5:1,borderTop:`1px solid ${dark?'rgba(245,240,234,0.18)':'var(--border)'}`,paddingTop:20,paddingBottom:8,display:'flex',gap:24,alignItems:'flex-start'}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:14,letterSpacing:'0.14em',color:'var(--fg-3)',flexShrink:0,paddingTop:6}}>{`0${i+1}`}</span>
              <div>
                <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:last?52:44,letterSpacing:'-0.02em',lineHeight:1.1,color:c,textWrap:'balance'}}>{b.label}</Editable>
                {b.sub && <div style={{fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--fg-3)',marginTop:8}}>{b.sub}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </SlideFrame>
  );

  // Before/after contrast (compare field) — hero word + two columns.
  if (r.compare) return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark>
      <div style={{position:'absolute',top:56,left:64}}><Eyebrow style={eyeStyle}>{r.eyebrow}</Eyebrow></div>
      {r.img && <div style={{position:'absolute',top:0,right:0,width:320,height:480,zIndex:0}}>
        <Img id={imgId} shape="rect" radius={0} placeholder={r.img} style={{width:'100%',height:'100%'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to left, transparent 20%, var(--lc-warm-cream) 70%)',zIndex:1}}/></div>}
      {r.word && <div style={{position:'absolute',left:80,right:80,top:'24%'}}>
        <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:240,letterSpacing:'-0.05em',lineHeight:0.87,color:v1WordColor(r,n),textWrap:'balance'}}>{r.word}</Editable></div>}
      <div style={{position:'absolute',bottom:150,left:80,right:80,display:'flex',flexDirection:'column',gap:16}}>
        <div style={{height:1,background:dark?'rgba(245,240,234,0.18)':'var(--border)'}}/>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32}}>
          <div style={{borderLeft:`4px solid ${dark?'rgba(245,240,234,0.2)':'var(--border)'}`,paddingLeft:16}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--fg-3)',marginBottom:8}}>{r.compare.oldLabel}</div>
            <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:34,color:sc,lineHeight:1.55}}>{r.compare.old}</Editable>
          </div>
          <div style={{borderLeft:'4px solid var(--accent)',paddingLeft:16}}>
            <div style={{fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--accent)',marginBottom:8}}>{r.compare.newLabel}</div>
            <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:34,color:tc,lineHeight:1.55}}>{r.compare.new}</Editable>
          </div>
        </div>
      </div>
    </SlideFrame>
  );

  // Reframe (strike + alt) — crossed-out then affirmative + body.
  if (r.strike && r.alt) return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark>
      <div style={{position:'absolute',top:56,left:64}}><Eyebrow style={eyeStyle}>{r.eyebrow}</Eyebrow></div>
      {r.img && <div style={{position:'absolute',bottom:160,right:64,width:240,height:240,borderRadius:8,overflow:'hidden',zIndex:0}}>
        <Img id={imgId} shape="rect" radius={0} placeholder={r.img} style={{width:'100%',height:'100%'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to left, transparent 40%, var(--lc-soft-white) 100%)',zIndex:1}}/></div>}
      <div style={{position:'absolute',left:80,right:80,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:20}}>
        <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:150,letterSpacing:'-0.05em',lineHeight:0.9,color:'var(--fg-3)',textDecoration:'line-through',textDecorationColor:'var(--fg-3)',textWrap:'balance'}}>{r.strike}</Editable>
        <div style={{display:'flex',alignItems:'baseline',gap:24}}>
          <span style={{width:36,height:3,background:'var(--accent)',display:'inline-block',transform:'translateY(-8px)',flexShrink:0}}/>
          <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontWeight:500,fontSize:130,letterSpacing:'-0.02em',lineHeight:0.95,color:'var(--accent)',textWrap:'balance'}}>{r.alt}</Editable>
        </div>
        <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:34,color:sc,lineHeight:1.55,maxWidth:680}}>{r.body}</Editable>
      </div>
    </SlideFrame>
  );

  // Tagged lines (tagged field) — the descending save-line list.
  if (r.tagged) return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark>
      <div style={{position:'absolute',top:56,left:64}}><Eyebrow style={eyeStyle}>{r.eyebrow}</Eyebrow></div>
      <div style={{position:'absolute',left:80,right:80,top:'42%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:0}}>
        {r.tagged.slice(0,3).map((t,i)=>{
          const last = i === r.tagged.length-1;
          const c = last ? 'var(--accent)' : (i===1 ? sc : 'var(--fg-3)');
          return (
            <div key={i} style={{display:'flex',alignItems:'center',gap:24,borderBottom:`${last?2:1}px solid ${last?'var(--accent)':'var(--border)'}`,padding:'18px 0'}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:13,color:'var(--fg-3)',letterSpacing:'0.12em',width:28,flexShrink:0}}>{`0${i+1}`}</span>
              <Editable as="div" style={{fontFamily:'var(--font-sans)',fontWeight:last?600:400,fontSize:last?28:22,lineHeight:1.4,color:c,flex:1,textWrap:'balance'}}>{t.text}</Editable>
              {t.tag && <span style={{fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'0.12em',textTransform:'uppercase',color:c,flexShrink:0}}>{t.tag}</span>}
            </div>
          );
        })}
      </div>
      <div style={{position:'absolute',bottom:130,left:80,right:80,borderTop:'1px solid var(--border)',paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:40,color:tc,lineHeight:1.3,maxWidth:680}}>{r.extra || r.body}</Editable>
        <span style={{fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'0.18em',textTransform:'uppercase',color:'var(--accent)',flexShrink:0}}>save this</span>
      </div>
    </SlideFrame>
  );

  // List (list field) — hero word + a right-aligned mini-list + italic aside.
  if (r.list) return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark>
      <div style={{position:'absolute',top:56,left:64}}><Eyebrow style={eyeStyle}>{r.eyebrow}</Eyebrow></div>
      {r.img && <div style={{position:'absolute',top:120,right:64,width:260,height:340,borderRadius:8,overflow:'hidden',zIndex:0}}>
        <Img id={imgId} shape="rect" radius={0} placeholder={r.img} style={{width:'100%',height:'100%'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to left, transparent 40%, var(--lc-soft-white) 100%)',zIndex:1}}/></div>}
      {r.word && <div style={{position:'absolute',left:80,top:'18%'}}>
        <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:280,letterSpacing:'-0.05em',lineHeight:0.87,color:v1WordColor(r,n),textWrap:'balance'}}>{r.word}</Editable></div>}
      <div style={{position:'absolute',right:80,bottom:150,display:'flex',flexDirection:'column',gap:8,maxWidth:480,textAlign:'right'}}>
        {r.list.map((t,i)=>(
          <Editable key={i} as="div" style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:36,letterSpacing:'-0.015em',lineHeight:1.1,color:i===r.list.length-1?'var(--accent)':sc}}>{t}</Editable>
        ))}
        <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:40,color:tc,marginTop:12,lineHeight:1.35}}>{r.body}</Editable>
      </div>
    </SlideFrame>
  );

  // Default — hero word + headline + body (+ extra). Covers hook-ish / statement slides.
  return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark>
      <div style={{position:'absolute',top:56,left:64}}><Eyebrow dot style={eyeStyle}>{r.eyebrow}</Eyebrow></div>
      <div style={{position:'absolute',left:80,right:80,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:20}}>
        {r.word && <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:260,letterSpacing:'-0.055em',lineHeight:0.87,color:v1WordColor(r,n),textWrap:'balance'}}>{r.word}</Editable>}
        <div style={{width:40,height:3,background:dark?'rgba(245,240,234,0.3)':'var(--accent)',borderRadius:2}}/>
        <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:46,letterSpacing:'-0.02em',lineHeight:1.1,color:tc,textWrap:'balance',maxWidth:760}}>{r.headline}</Editable>
        <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:40,color:dark?'rgba(245,240,234,0.75)':sc,lineHeight:1.3,textWrap:'balance',maxWidth:720}}>{r.body}</Editable>
      </div>
    </SlideFrame>
  );
}

const V1_LAYOUT = Array.from({length:10}, () => V1Slide);

// ══════════════════════════════════════════════════════════════
// V5 · RULED — stave lines, full copy in the spaces
// ══════════════════════════════════════════════════════════════
function SbRules({ dark }) {
  const c = dark ? 'rgba(245,240,234,0.12)' : 'rgba(31,31,29,0.1)';
  return <>{Array.from({length:8},(_,i)=>(
    <div key={i} style={{position:'absolute',left:0,right:0,top:48+i*132,height:i===3?3:1,background:i===3?'var(--accent)':c,zIndex:0}}/>
  ))}</>;
}


function SbV5({ n, brand }) {
  const r = SB_RICH[n-1]; const dark = onDk(n);
  const tc = dark?'rgba(245,240,234,0.9)':'var(--fg-1)';
  const sc = dark?'rgba(245,240,234,0.6)':'var(--fg-2)';
  return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark={n>1}>
      <SbRules dark={dark}/>
      <div style={{position:'absolute',top:56,left:64,zIndex:1}}><Eyebrow dot={false} style={dark?{color:'rgba(245,240,234,0.45)'}:{}}>{SB_EYE[n-1]}</Eyebrow></div>
      {n%2===0 && <div style={{position:'absolute',top:120,right:64,width:240,height:300,borderRadius:8,overflow:'hidden',zIndex:1}}>
        <Img id={`sb-v5-${n}-img`} shape="rect" radius={0} placeholder="stepping back · still" style={{width:'100%',height:'100%'}}/>
        <div style={{position:'absolute',inset:0,background:`linear-gradient(to left, transparent 30%, ${dark?'var(--lc-ink-navy)':'var(--lc-warm-cream)'} 90%)`,zIndex:1}}/>
      </div>}
      <div style={{position:'absolute',zIndex:1,left:80,right:n%2===0?320:80,top:180,bottom:160,display:'flex',flexDirection:'column',justifyContent:'center',gap:18}}>
        {n===1
          ? <SbHookHero dark={dark} large={false}/>
          : <React.Fragment>
              {r.word && <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:80,letterSpacing:'-0.025em',lineHeight:0.95,color:SB_ACCENT[n-1]?'var(--accent)':tc,textWrap:'balance'}}>{r.word}</Editable>}
              <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:46,letterSpacing:'-0.015em',lineHeight:1.1,color:tc,textWrap:'balance'}}>{r.headline}</Editable>
              <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:36,color:sc,lineHeight:1.55,textWrap:'balance'}}>{r.body}</Editable>
              {r.extra && <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:38,color:sc,lineHeight:1.4,textWrap:'balance'}}>{r.extra}</Editable>}
            </React.Fragment>
        }
      </div>
    </SlideFrame>
  );
}


// ══════════════════════════════════════════════════════════════
// V6 · NUMERAL WATERMARK
// ══════════════════════════════════════════════════════════════
function SbV6({ n, brand }) {
  const r = SB_RICH[n-1]; const dark = onDk(n);
  const tc = dark?'rgba(245,240,234,0.9)':'var(--fg-1)';
  const sc = dark?'rgba(245,240,234,0.6)':'var(--fg-2)';
  return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark={n>1}>
      <div style={{position:'absolute',left:-24,bottom:-64,fontFamily:'var(--font-display)',fontWeight:700,fontSize:660,letterSpacing:'-0.06em',lineHeight:0.85,color:dark?'rgba(255,255,255,0.07)':'rgba(31,31,29,0.06)',userSelect:'none',pointerEvents:'none',zIndex:0}}>
        {String(n).padStart(2,'0')}
      </div>
      <div style={{position:'absolute',top:56,left:64,zIndex:1}}><Eyebrow dot={false} style={dark?{color:'rgba(245,240,234,0.45)'}:{}}>{SB_EYE[n-1]}</Eyebrow></div>
      {n%2===0 && <div style={{position:'absolute',top:120,right:64,width:260,height:300,borderRadius:8,overflow:'hidden',zIndex:1}}>
        <Img id={`sb-v6-${n}-img`} shape="rect" radius={0} placeholder="stepping back · still" style={{width:'100%',height:'100%'}}/>
        <div style={{position:'absolute',inset:0,background:`linear-gradient(to left, transparent 30%, ${dark?'var(--lc-ink-navy)':'var(--lc-soft-white)'} 90%)`,zIndex:1}}/>
      </div>}
      <div style={{position:'absolute',zIndex:1,left:80,right:n%2===0?340:80,top:160,bottom:160,display:'flex',flexDirection:'column',justifyContent:'center',gap:22}}>
        {n===1
          ? <SbHookHero dark={dark} large={false}/>
          : <React.Fragment>
              <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:72,letterSpacing:'-0.025em',lineHeight:1.0,color:SB_ACCENT[n-1]?'var(--accent)':tc,textWrap:'balance'}}>{r.headline}</Editable>
              <div style={{width:40,height:2,background:'var(--accent)',borderRadius:2}}/>
              <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:38,color:sc,lineHeight:1.55,textWrap:'balance'}}>{r.body}</Editable>
              {r.extra && <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:34,color:sc,lineHeight:1.4,textWrap:'balance'}}>{r.extra}</Editable>}
            </React.Fragment>
        }
      </div>
    </SlideFrame>
  );
}

// ══════════════════════════════════════════════════════════════
// V7 · MAX REDUCE — 1 word + 1 short line. Nothing else.
// ══════════════════════════════════════════════════════════════
function SbV7({ n, brand }) {
  const dark = onDk(n);
  const sc = dark?'rgba(245,240,234,0.55)':'var(--fg-2)';
  return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark={n>1}>
      <div style={{position:'absolute',top:56,left:64}}><Eyebrow dot={false} style={dark?{color:'rgba(245,240,234,0.4)'}:{}}>{SB_EYE[n-1]}</Eyebrow></div>
      {n%2===0 && <div style={{position:'absolute',bottom:140,right:80,width:220,height:220,borderRadius:8,overflow:'hidden',zIndex:1}}>
        <Img id={`sb-v7-${n}-img`} shape="rect" radius={0} placeholder="still · minimal" style={{width:'100%',height:'100%'}}/>
      </div>}
      <div style={{position:'absolute',left:80,right:80,top:'34%',transform:'translateY(-34%)'}}>
        {n===1 ? <SbHookHero dark={onDk(n)}/> : (SB_WORD[n-1] && <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:340,letterSpacing:'-0.055em',lineHeight:0.87,color:SB_ACCENT[n-1]?'var(--accent)':'var(--fg-1)',textWrap:'balance'}}>
          {SB_WORD[n-1]}
        </Editable>)}
      </div>
      <div style={{position:'absolute',left:80,right:80,bottom:150}}>
        <div style={{height:1,background:dark?'rgba(245,240,234,0.15)':'var(--border)',marginBottom:20}}/>
        <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:38,color:sc,lineHeight:1.4,textWrap:'balance',maxWidth:720}}>
          {SB_SHORT[n-1]}
        </Editable>
      </div>
      <div style={{position:'absolute',bottom:60,left:80,fontFamily:'var(--font-mono)',fontSize:12,letterSpacing:'0.18em',textTransform:'uppercase',color:dark?'rgba(245,240,234,0.35)':'var(--fg-3)'}}>
        stepping back by cutting · essay 02
      </div>
    </SlideFrame>
  );
}

// ══════════════════════════════════════════════════════════════
// V8 · POSTER — varied layouts per slide, not uniform stack
// Drama slides (1,5,10): big word + 1 line only
// Statement slides (3,7): word + italic sentence
// Content slides: word + headline + short body
// ══════════════════════════════════════════════════════════════
function SbV8({ n, brand }) {
  const r = SB_RICH[n-1]; const dark = onDk(n);
  const tc = dark?'var(--fg-inverse)':'var(--fg-1)';
  const sc = dark?'rgba(245,240,234,0.7)':'var(--fg-2)';
  const mc = dark?'rgba(245,240,234,0.45)':'var(--fg-3)';
  const hasExtra = !!r.extra;
  return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark={n>1}>
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'72px 80px',gap:16}}>
        <div style={{fontFamily:'var(--font-mono)',fontSize:13,letterSpacing:'0.28em',textTransform:'uppercase',color:mc}}>{SB_EYE[n-1]}</div>
        <div style={{width:40,height:2,background:'var(--accent)'}}/>
        {n===1
          ? <SbHookHero dark={dark}/>
          : <React.Fragment>
              {r.word && <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:hasExtra?100:120,letterSpacing:'-0.04em',lineHeight:0.92,color:SB_ACCENT[n-1]?'var(--accent)':tc,textWrap:'balance'}}>{r.word}</Editable>}
              <div style={{width:40,height:1,background:dark?'rgba(245,240,234,0.2)':'var(--border)'}}/>
              <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:40,fontWeight:500,color:tc,lineHeight:1.25,textWrap:'balance',maxWidth:780}}>{r.headline}</Editable>
              <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:34,color:sc,lineHeight:1.5,textWrap:'balance',maxWidth:720}}>{r.body}</Editable>
              {r.extra && <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:38,color:sc,lineHeight:1.35,textWrap:'balance',maxWidth:680}}>{r.extra}</Editable>}
            </React.Fragment>
        }
      </div>
    </SlideFrame>
  );
}

// ══════════════════════════════════════════════════════════════
// V9 · SWISS GRID — 3-column structure
// ══════════════════════════════════════════════════════════════
function SbV9({ n, brand }) {
  const r = SB_RICH[n-1]; const dark = onDk(n);
  const fc3 = dark?'rgba(245,240,234,0.45)':'var(--fg-3)';
  const tc  = dark?'rgba(245,240,234,0.9)':'var(--fg-1)';
  const sc  = dark?'rgba(245,240,234,0.6)':'var(--fg-2)';
  const lc  = dark?'rgba(245,240,234,0.12)':'rgba(31,31,29,0.1)';
  return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark={false} showSwipe={false} showCounter={false}>
      <div style={{position:'absolute',left:200,top:0,bottom:0,width:1,background:lc}}/>
      <div style={{position:'absolute',right:280,top:0,bottom:0,width:1,background:lc}}/>
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:200,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'56px 28px 56px 40px'}}>
        <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:51,letterSpacing:'-0.04em',lineHeight:1,color:dark?'rgba(245,240,234,0.18)':'rgba(31,31,29,0.12)'}}>{String(n).padStart(2,'0')}</div>
        <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.22em',textTransform:'uppercase',color:fc3,writingMode:'vertical-rl',transform:'rotate(180deg)',alignSelf:'flex-start'}}>{SB_EYE[n-1]}</div>
        <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:fc3}}>{String(n).padStart(2,'0')} / 10</div>
      </div>
      <div style={{position:'absolute',left:200,right:280,top:0,bottom:0,padding:'80px 56px',display:'flex',flexDirection:'column',justifyContent:'center',gap:16}}>
        {n===1
          ? <SbHookHero dark={dark}/>
          : <React.Fragment>
              {r.word && <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:72,letterSpacing:'-0.03em',lineHeight:0.95,color:SB_ACCENT[n-1]?'var(--accent)':tc,textWrap:'balance'}}>{r.word}</Editable>}
              <div style={{width:28,height:3,background:'var(--accent)',borderRadius:2}}/>
              <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:36,letterSpacing:'-0.01em',lineHeight:1.2,color:tc,textWrap:'balance'}}>{r.headline}</Editable>
              <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:38,color:sc,lineHeight:1.55,textWrap:'balance'}}>{r.body}</Editable>
              {r.extra && <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:36,color:sc,lineHeight:1.4,textWrap:'balance'}}>{r.extra}</Editable>}
            </React.Fragment>
        }
      </div>
      <div style={{position:'absolute',right:0,top:0,bottom:0,width:280,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'56px 40px'}}>
        {n%2===0
          ? <div style={{width:'100%',flex:1,borderRadius:4,overflow:'hidden',maxHeight:280}}>
              <Img id={`sb-v9-${n}-img`} shape="rect" radius={0} placeholder="still · structure" style={{width:'100%',height:'100%'}}/>
            </div>
          : <div/>}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:fc3,lineHeight:1.5}}>stepping back by cutting</div>
          <div style={{width:24,height:1,background:'var(--accent)'}}/>
          <div style={{fontFamily:'var(--font-mono)',fontSize:11,letterSpacing:'0.2em',textTransform:'uppercase',color:'var(--accent)'}}>{n<10?'swipe →':'comment ↓'}</div>
        </div>
      </div>
    </SlideFrame>
  );
}
function SbDiag({ flip, dark }) {
  const c = dark?'rgba(245,240,234,0.12)':'var(--border)';
  const rot = flip ? -22 : 22;
  return (
    <>
      <div style={{position:'absolute',left:-200,right:-200,top:flip?'62%':'38%',height:1,background:c,transform:`rotate(${rot}deg)`,transformOrigin:'center center',zIndex:0}}/>
      <div style={{position:'absolute',left:-200,right:-200,top:flip?'64%':'40%',height:3,background:'var(--accent)',transform:`rotate(${rot}deg)`,transformOrigin:'center center',zIndex:0,opacity:0.7}}/>
    </>
  );
}
function SbV10({ n, brand }) {
  const r = SB_RICH[n-1]; const dark = onDk(n); const flip = n%2===0;
  const tc = dark?'rgba(245,240,234,0.9)':'var(--fg-1)';
  const sc = dark?'rgba(245,240,234,0.65)':'var(--fg-2)';
  const rot = flip ? 1.5 : -1.5;
  return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark={n>1}>
      <SbDiag flip={flip} dark={dark}/>
      <div style={{position:'absolute',top:56,left:64,zIndex:1}}><Eyebrow dot={false} style={dark?{color:'rgba(245,240,234,0.45)'}:{}}>{SB_EYE[n-1]}</Eyebrow></div>
      {n%2===0 && <div style={{position:'absolute',top:72,right:72,width:200,height:200,borderRadius:8,overflow:'hidden',zIndex:0}}>
        <Img id={`sb-v10-${n}-img`} shape="rect" radius={0} placeholder="diagonal · tension" style={{width:'100%',height:'100%'}}/>
        <div style={{position:'absolute',inset:0,background:`linear-gradient(to bottom left, transparent 40%, ${dark?'var(--lc-ink-navy)':'var(--lc-warm-cream)'} 95%)`,zIndex:1}}/>
      </div>}
      <div style={{position:'absolute',left:80,right:80,top:'10%',zIndex:1}}>
        <div style={{transform:`rotate(${rot}deg)`,transformOrigin:'left top'}}>
          {n===1
            ? <SbHookHero dark={dark} large={false}/>
            : r.word && <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:250,letterSpacing:'-0.05em',lineHeight:0.9,color:SB_ACCENT[n-1]?'var(--accent)':tc}}>{r.word}</Editable>
          }
        </div>
      </div>
      {n>1 && <div style={{position:'absolute',left:80,right:80,bottom:'8%',zIndex:1}}>
        <div style={{transform:`rotate(${rot}deg)`,transformOrigin:'left bottom',display:'flex',flexDirection:'column',gap:14}}>
          <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:40,letterSpacing:'-0.015em',lineHeight:1.1,color:tc,textWrap:'balance',maxWidth:780}}>{r.headline}</Editable>
          <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:34,lineHeight:1.4,color:sc,textWrap:'balance',maxWidth:700}}>{r.body}</Editable>
          {r.extra && <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:36,lineHeight:1.5,color:sc,textWrap:'balance',maxWidth:700}}>{r.extra}</Editable>}
        </div>
      </div>}
    </SlideFrame>
  );
}

// ══════════════════════════════════════════════════════════════
// V11 · OVERPRINT — stroke + fill word, ONE clean line below
// ══════════════════════════════════════════════════════════════
function SbV11({ n, brand }) {
  const r = SB_RICH[n-1]; const dark = onDk(n);
  const TC = '#C65A2E';
  const tc = dark?'rgba(245,240,234,0.9)':'var(--fg-1)';
  const sc = dark?'rgba(245,240,234,0.65)':'var(--fg-2)';
  const outC = SB_ACCENT[n-1] ? TC : (dark?'rgba(245,240,234,0.2)':'rgba(31,31,29,0.18)');
  const filC = SB_ACCENT[n-1] ? TC : tc;
  const fb = {fontFamily:'var(--font-display)',fontStyle:'normal',fontWeight:700,fontSize:240,letterSpacing:'-0.05em',lineHeight:0.9,textWrap:'balance'};
  return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark={n>1}>
      <div style={{position:'absolute',top:56,left:64,zIndex:2}}><Eyebrow dot={false} style={dark?{color:'rgba(245,240,234,0.45)'}:{}}>{SB_EYE[n-1]}</Eyebrow></div>
      {n%2===0 && <div style={{position:'absolute',top:130,right:72,width:220,height:260,borderRadius:8,overflow:'hidden',zIndex:0}}>
        <Img id={`sb-v11-${n}-img`} shape="rect" radius={0} placeholder="overprint · texture" style={{width:'100%',height:'100%'}}/>
        <div style={{position:'absolute',inset:0,background:`linear-gradient(to left, transparent 20%, ${dark?'var(--lc-ink-navy)':'var(--lc-warm-cream)'} 75%)`,zIndex:1}}/>
      </div>}
      <div style={{position:'absolute',top:130,left:72,right:80,zIndex:1}}>
        {n===1
          ? <SbHookHero dark={dark} large={true}/>
          : r.word && <div style={{position:'relative',display:'inline-block'}}>
              <div style={{...fb,position:'absolute',left:0,top:0,color:'transparent',WebkitTextStroke:`2.5px ${outC}`,zIndex:0}}>{r.word}</div>
              <div style={{...fb,position:'relative',left:18,top:18,color:filC,zIndex:1}}>{r.word}</div>
            </div>
        }
      </div>
      {n>1 && <div style={{position:'absolute',bottom:110,left:72,right:80,zIndex:2}}>
        <div style={{height:2,background:SB_ACCENT[n-1]?'var(--accent)':dark?'rgba(245,240,234,0.18)':'var(--border)',marginBottom:22}}/>
        <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:600,fontSize:42,letterSpacing:'-0.015em',lineHeight:1.1,color:tc,textWrap:'balance',marginBottom:14}}>{r.headline}</Editable>
        <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:36,color:sc,lineHeight:1.4,textWrap:'balance',maxWidth:680}}>{r.body}</Editable>
        {r.extra && <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:30,color:sc,lineHeight:1.5,textWrap:'balance',maxWidth:680,marginTop:12}}>{r.extra}</Editable>}
      </div>}
    </SlideFrame>
  );
}

// ── Export arrays ─────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════
// V2 · BLEED — word at 300-400px cropped at slide boundary
// Each slide: word bleeds left or right, ONE line anchors below
// ══════════════════════════════════════════════════════════════

// Short anchor lines per slide (the ONE line that sits below/above the bleed)

// Alternate: even slides bleed from right, odd from left — creates rhythm
function V2Slide({ n, brand }) {
  const r = SB_RICH[n-1]; const dark = onDk(n);
  const bleedLeft = n % 2 !== 0;
  const tc = dark ? 'rgba(245,240,234,0.92)' : 'var(--fg-1)';
  const sc = dark ? 'rgba(245,240,234,0.65)' : 'var(--fg-2)';
  const accent = SB_ACCENT[n-1];
  const wordColor = accent ? 'var(--accent)' : tc;

  return (
    <SlideFrame n={n} brand={brand} bg={SB_BG[n-1]} showMark={n>1}>
      <div style={{position:'absolute',top:56,left:64,zIndex:2}}>
        <Eyebrow dot={false} style={dark?{color:'rgba(245,240,234,0.45)'}:{}}>{SB_EYE[n-1]}</Eyebrow>
      </div>
      {n%2===0 && (
        <div style={{position:'absolute',top:80,left:72,width:220,height:260,borderRadius:8,overflow:'hidden',zIndex:0}}>
          <Img id={`sb-v2-${n}-img`} shape="rect" radius={0} placeholder="bleed · still" style={{width:'100%',height:'100%'}}/>
          <div style={{position:'absolute',inset:0,background:`linear-gradient(to right, transparent 30%, ${dark?'var(--lc-ink-navy)':'var(--lc-warm-cream)'} 90%)`,zIndex:1}}/>
        </div>
      )}
      {n===1 ? (
        <div style={{position:'absolute',left:80,right:80,top:'50%',transform:'translateY(-50%)',zIndex:1}}>
          <SbHookHero dark={dark} large={true}/>
        </div>
      ) : (
        <React.Fragment>
          {r.word && (
            <div style={{position:'absolute',zIndex:1,top:'14%',left:bleedLeft?-40:undefined,right:bleedLeft?undefined:-40}}>
              <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:300,letterSpacing:'-0.05em',lineHeight:0.87,color:wordColor,whiteSpace:'nowrap'}}>{r.word}</div>
            </div>
          )}
          <div style={{position:'absolute',bottom:130,left:80,right:80,zIndex:2}}>
            <div style={{height:2,background:accent?'var(--accent)':dark?'rgba(245,240,234,0.18)':'var(--border)',marginBottom:20,width:40}}/>
            <Editable as="div" style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:44,letterSpacing:'-0.02em',lineHeight:1.1,color:tc,textWrap:'balance',marginBottom:16}}>{r.headline}</Editable>
            <Editable as="div" style={{fontFamily:'var(--font-serif-editorial)',fontStyle:'italic',fontSize:38,lineHeight:1.4,color:sc,textWrap:'balance',maxWidth:700}}>{r.body}</Editable>
            {r.extra && <Editable as="div" style={{fontFamily:'var(--font-sans)',fontSize:34,lineHeight:1.55,color:sc,textWrap:'balance',maxWidth:700,marginTop:12}}>{r.extra}</Editable>}
          </div>
        </React.Fragment>
      )}
    </SlideFrame>
  );
}

const mk = comps => comps.map((C,i) => (p) => <C {...p} n={i+1}/>);
const SB_V1  = V1_LAYOUT.map((C,i) => (p) => <C {...p} n={i+1}/>);
const SB_V2  = Array.from({length:10},(_,i)=>(p)=><V2Slide {...p} n={i+1}/> );
const SB_V5  = Array.from({length:10},(_,i)=>(p)=><SbV5  {...p} n={i+1}/>);
const SB_V6  = Array.from({length:10},(_,i)=>(p)=><SbV6  {...p} n={i+1}/>);
const SB_V7  = Array.from({length:10},(_,i)=>(p)=><SbV7  {...p} n={i+1}/>);
const SB_V8  = Array.from({length:10},(_,i)=>(p)=><SbV8  {...p} n={i+1}/>);
const SB_V9  = Array.from({length:10},(_,i)=>(p)=><SbV9  {...p} n={i+1}/>);
const SB_V10 = Array.from({length:10},(_,i)=>(p)=><SbV10 {...p} n={i+1}/>);
const SB_V11 = Array.from({length:10},(_,i)=>(p)=><SbV11 {...p} n={i+1}/>);

Object.assign(window, { SB_V1, SB_V2, SB_V5, SB_V6, SB_V7, SB_V8, SB_V9, SB_V10, SB_V11 });
