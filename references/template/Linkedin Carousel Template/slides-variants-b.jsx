// slides-variants-b.jsx — V5: RULES · V6: NUMERAL · V7: REDUCE · V8: POSTER

const _EYE_B = [
  'essay 01 · hook','02 · tension','03 · the layer beneath',
  '04 · three layers','05 · what you own','06 · misallocated effort',
  '07 · the tell','08 · the pro move','09 · screenshot','10 · keep the thread'
];
const _BGB = ['cream','paper','cream','mist','navy','cream','mist','cream','paper','cream'];

// ══════════════════════════════════════════════════════════════
// V5 · HORIZONTAL RULES
// 7 horizontal rules at ~130px intervals create a ledger /
// musical-stave structure. Type aligns to rules, crosses them,
// or sits in the space between. One rule (the tension rule)
// is a 3px terracotta bar.
// ══════════════════════════════════════════════════════════════

function V5Rules({ accentRule = 3, onDark = false }) {
  const baseColor = onDark ? 'rgba(245,240,234,0.12)' : 'rgba(31,31,29,0.1)';
  const accentColor = 'var(--accent)';
  const rules = Array.from({ length: 8 }, (_, i) => (
    <div key={i} style={{
      position: 'absolute', left: 0, right: 0,
      top: 48 + i * 132,
      height: i === accentRule ? 3 : 1,
      background: i === accentRule ? accentColor : baseColor,
      zIndex: 0
    }} />
  ));
  return <>{rules}</>;
}

function V5W({ n, brand, img, children, accentRule }) {
  const onDark = _BGB[n-1] === 'navy';
  return (
    <SlideFrame n={n} brand={brand} bg={_BGB[n-1]} showMark={n>1}>
      <V5Rules accentRule={accentRule !== undefined ? accentRule : 3} onDark={onDark} />
      {img && <div style={{ position:'absolute', top:192, right:80, zIndex:1 }}>{img}</div>}
      <div style={{ position:'absolute', top:60, left:64, zIndex:1 }}>
        <Eyebrow dot={false} style={onDark?{color:'rgba(245,240,234,0.5)'}:{}}>{_EYE_B[n-1]}</Eyebrow>
      </div>
      {children}
    </SlideFrame>
  );
}

function V5_01({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={4}>
      <div style={{ position:'absolute', zIndex:1, left:96, top:240 }}>
        <div style={{ position:'relative', display:'inline-block' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:280, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
            replaceable.
          </Editable>
        </div>
      </div>
      <div style={{ position:'absolute', zIndex:1, left:96, bottom:160, right:96 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:72, letterSpacing:'-0.015em', lineHeight:1, color:'var(--accent)' }}>
          structurally irreplaceable.
        </Editable>
      </div>
    </V5W>
  );
}

function V5_02({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={5} img={<Img id="v5-02-img" shape="rect" radius={2} placeholder="still life · structure" style={{ width:300, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, left:96, top:160, right:96, display:'flex', flexDirection:'column', gap:0 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', paddingBottom:16 }}>
          three things commodify on contact
        </div>
        {[['tool','rented the moment it ships.'],['skill','teachable = tradeable.'],['position','the one exception.']].map(([k,v],i)=>(
          <div key={i} style={{ display:'grid', gridTemplateColumns:'60px 180px 1fr', gap:16, borderTop:'1px solid var(--border)', paddingTop:20, paddingBottom:20, alignItems:'baseline' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.14em', color:'var(--fg-3)' }}>0{i+1}</span>
            <Editable as="span" style={{ fontFamily:'var(--font-display)', fontSize:56, fontWeight:600, letterSpacing:'-0.02em', lineHeight:1, color: i===2?'var(--accent)':'var(--fg-1)' }}>{k}</Editable>
            <Editable as="span" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:28, color:'var(--fg-2)' }}>{v}</Editable>
          </div>
        ))}
      </div>
    </V5W>
  );
}

function V5_03({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={4}>
      <div style={{ position:'absolute', zIndex:1, left:96, top:'20%' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>replaceable people sell what they</div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:220, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
          do.
        </Editable>
      </div>
      <div style={{ position:'absolute', zIndex:1, right:96, bottom:'20%', textAlign:'right' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>irreplaceable people sell what they</div>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:220, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>
          see.
        </Editable>
      </div>
    </V5W>
  );
}

function V5_04({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={6} img={<Img id="v5-04-img" shape="rect" radius={2} placeholder="stacked layers · weight" style={{ width:300, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:160 }}>
        <div style={{ display:'grid', gridTemplateColumns:'40px 1fr auto', gap:'20px 32px', alignItems:'baseline' }}>
          {[['01','tool','rented'],['02','skill','leased'],['03','position','owned ← compounds']].map(([num,k,sub],i)=>(
            <React.Fragment key={i}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.14em', color:'var(--fg-3)', paddingTop: i===0?0:20, borderTop: i===0?'none':'1px solid var(--border)', alignSelf:'end' }}>{num}</span>
              <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize: i===2?128:88, letterSpacing:'-0.04em', lineHeight:1, color: i===2?'var(--accent)':'var(--fg-1)', paddingTop: i===0?0:20, borderTop: i===0?'none':'1px solid var(--border)' }}>
                {k}
              </Editable>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.12em', textTransform:'uppercase', color: i===2?'var(--accent)':'var(--fg-3)', paddingTop: i===0?0:20, borderTop: i===0?'none':'1px solid var(--border)', alignSelf:'end', textAlign:'right' }}>{sub}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </V5W>
  );
}

function V5_05({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={2}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:32 }}>
        {[['tool','is rented.','rgba(245,240,234,0.3)'],['skill','is leased.','rgba(245,240,234,0.6)'],['position','is owned.','var(--accent)']].map(([k,v,c],i)=>(
          <div key={i} style={{ display:'flex', alignItems:'baseline', gap:32 }}>
            <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:96, letterSpacing:'-0.04em', lineHeight:1, color:c }}>{k}</Editable>
            <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:72, fontWeight:500, letterSpacing:'-0.015em', lineHeight:1, color:c }}>{v}</Editable>
            {i===2 && <span style={{ marginLeft:'auto', fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--accent)' }}>← compounds</span>}
          </div>
        ))}
      </div>
    </V5W>
  );
}

function V5_06({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={5} img={<Img id="v5-06-img" shape="rect" radius={2} placeholder="knife · tool · craft" style={{ width:300, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:160 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:80, letterSpacing:'-0.025em', lineHeight:1.0, color:'var(--fg-1)', textWrap:'balance', maxWidth:800 }}>
          Most advice optimises the{' '}
          <em style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', color:'var(--accent)' }}>wrong layer.</em>
        </Editable>
      </div>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, bottom:200 }}>
        <Editable as="p" style={{ fontFamily:'var(--font-sans)', fontSize:24, lineHeight:1.5, color:'var(--fg-2)', margin:0, maxWidth:680 }}>
          It teaches you to sharpen the knife — not to be the only one holding it. Position lives in the basement, and the basement is where compounding happens.
        </Editable>
      </div>
    </V5W>
  );
}

function V5_07({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={4}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'50%', transform:'translateY(-50%)' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:28 }}>
          you'll know you've moved when someone says —
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:120, letterSpacing:'-0.035em', lineHeight:0.95, color:'var(--fg-1)', textWrap:'balance', maxWidth:780 }}>
          not{' '}
          <span style={{ color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>function</span>
          {' '}—{' '}
          <span style={{ color:'var(--accent)', background:'rgba(198,90,46,0.08)', padding:'0 12px', borderRadius:4 }}>category.</span>
        </Editable>
      </div>
    </V5W>
  );
}

function V5_08({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={3} img={<Img id="v5-08-img" shape="rect" radius={2} placeholder="empty frame · window" style={{ width:300, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:180 }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-inverse)', background:'var(--accent)', padding:'8px 14px', display:'inline-block', marginBottom:32 }}>
          08 · the pro move
        </span>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:80, letterSpacing:'-0.025em', lineHeight:0.95, color:'var(--fg-2)', textDecoration:'line-through', textDecorationColor:'var(--fg-2)' }}>
          get better at the work.
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:96, letterSpacing:'-0.02em', lineHeight:0.95, color:'var(--accent)', marginTop:28, textWrap:'balance' }}>
          get better at framing it.
        </Editable>
      </div>
    </V5W>
  );
}

function V5_09({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={6}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'50%', transform:'translateY(-50%)' }}>
        <div style={{ display:'flex', gap:24, alignItems:'baseline', flexWrap:'wrap' }}>
          {[['tool','var(--fg-3)'],['→','var(--fg-3)'],['skill','var(--fg-2)'],['→','var(--fg-2)'],['position','var(--accent)']].map(([w,c],i)=>(
            <Editable key={i} as="div" style={{ fontFamily: w==='→'?'var(--font-mono)':'var(--font-display)', fontWeight:700, fontSize: w==='→'?56:148, letterSpacing:'-0.04em', lineHeight:0.9, color:c }}>
              {w}
            </Editable>
          ))}
        </div>
        <div style={{ marginTop:32, borderTop:'1px solid var(--border)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
          <Editable as="span" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:32, color:'var(--fg-1)' }}>
            compounding lives at the bottom layer.
          </Editable>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--accent)' }}>screenshot</span>
        </div>
      </div>
    </V5W>
  );
}

function V5_10({ n, brand }) {
  return (
    <V5W n={n} brand={brand} accentRule={4} img={<Img id="v5-10-img" shape="rect" radius={2} placeholder="portrait · direct gaze" style={{ width:300, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, inset:'160px 96px 200px 96px', display:'flex', flexDirection:'column', justifyContent:'center', gap:28 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:80, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-1)' }}>
          If this rewired something —
        </Editable>
        <div style={{ display:'flex', alignItems:'stretch', alignSelf:'flex-start', border:'2px solid var(--fg-1)', borderRadius:4, overflow:'hidden' }}>
          <span style={{ padding:'18px 24px', fontFamily:'var(--font-sans)', fontSize:22, color:'var(--fg-1)' }}>comment</span>
          <span style={{ padding:'18px 28px', fontFamily:'var(--font-mono)', fontSize:32, fontWeight:600, letterSpacing:'0.16em', color:'var(--fg-inverse)', background:'var(--accent)' }}>LAYERS</span>
        </div>
        <Editable as="p" style={{ fontFamily:'var(--font-sans)', fontSize:22, lineHeight:1.55, color:'var(--fg-2)', margin:0, maxWidth:580 }}>
          I'll DM you the 7-question audit for finding your irreplaceable layer.
        </Editable>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:14, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', fontWeight:500 }}>+ follow for the next essay →</div>
      </div>
    </V5W>
  );
}

const BOLD_V5 = [V5_01,V5_02,V5_03,V5_04,V5_05,V5_06,V5_07,V5_08,V5_09,V5_10];

// ══════════════════════════════════════════════════════════════
// V6 · NUMERAL WATERMARK
// Slide number (01–10) rendered at 600px, 7% opacity, bottom-
// left. Creates texture + depth without imagery. Content sits
// in front at full contrast.
// ══════════════════════════════════════════════════════════════

function V6Num({ n, onDark }) {
  return (
    <div style={{
      position: 'absolute', left: -24, bottom: -64,
      fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize: 660, letterSpacing: '-0.06em', lineHeight: 0.85,
      color: onDark ? 'rgba(255,255,255,0.07)' : 'rgba(31,31,29,0.06)',
      userSelect: 'none', pointerEvents: 'none', zIndex: 0
    }}>
      {String(n).padStart(2, '0')}
    </div>
  );
}

function V6W({ n, brand, img, children }) {
  const onDark = _BGB[n-1] === 'navy';
  return (
    <SlideFrame n={n} brand={brand} bg={_BGB[n-1]} showMark={n>1}>
      <V6Num n={n} onDark={onDark} />
      {img && <div style={{ position:'absolute', top:120, right:64, zIndex:1 }}>{img}</div>}
      <div style={{ position:'absolute', top:56, left:64, zIndex:1 }}>
        <Eyebrow dot={false} style={onDark?{color:'rgba(245,240,234,0.5)'}:{}}>{_EYE_B[n-1]}</Eyebrow>
      </div>
      {children}
    </SlideFrame>
  );
}

function V6_01({ n, brand }) {
  return (
    <V6W n={n} brand={brand}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'28%' }}>
        <div style={{ position:'relative', display:'inline-block' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:200, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
            replaceable.
          </Editable>
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:96, letterSpacing:'-0.015em', lineHeight:1, color:'var(--accent)', marginTop:20 }}>
          structurally irreplaceable.
        </Editable>
      </div>
    </V6W>
  );
}

function V6_02({ n, brand }) {
  return (
    <V6W n={n} brand={brand} img={<Img id="v6-02-img" shape="rect" radius={2} placeholder="industrial texture · stark" style={{ width:272, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'30%' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:72, letterSpacing:'-0.025em', lineHeight:1.05, color:'var(--fg-1)', maxWidth:720, textWrap:'balance' }}>
          Three things commodify on contact.
        </Editable>
        <div style={{ marginTop:32, display:'flex', gap:40 }}>
          {['tool','skill','position'].map((w,i)=>(
            <div key={i} style={{ display:'flex', flexDirection:'column', gap:8 }}>
              <Editable as="div" style={{ fontFamily:'var(--font-display)', fontSize:52, fontWeight:600, letterSpacing:'-0.02em', color: i===2?'var(--accent)':'var(--fg-1)' }}>{w}</Editable>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.14em', textTransform:'uppercase', color: i===2?'var(--accent)':'var(--fg-3)' }}>
                {['rented','leased','owned →'][i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </V6W>
  );
}

function V6_03({ n, brand }) {
  return (
    <V6W n={n} brand={brand}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'30%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>they sell what they</div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:168, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
            do.
          </Editable>
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>they sell what they</div>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:168, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>
            see.
          </Editable>
        </div>
      </div>
    </V6W>
  );
}

function V6_04({ n, brand }) {
  return (
    <V6W n={n} brand={brand} img={<Img id="v6-04-img" shape="rect" radius={2} placeholder="layers · depth · foundation" style={{ width:272, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:160, display:'flex', flexDirection:'column', gap:20 }}>
        {[['tool','rented · replaced quarterly'],['skill','leased · replaced by a graduate'],['position','owned · the compounding asset']].map(([k,v],i)=>(
          <div key={i} style={{ display:'flex', gap:32, borderTop:'1px solid var(--border)', paddingTop:16, alignItems:'baseline' }}>
            <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize: i===2?120:80, letterSpacing:'-0.04em', lineHeight:1, color: i===2?'var(--accent)':'var(--fg-1)', minWidth:320 }}>{k}</Editable>
            <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:26, color:'var(--fg-2)', lineHeight:1.3 }}>{v}</Editable>
          </div>
        ))}
      </div>
    </V6W>
  );
}

function V6_05({ n, brand }) {
  return (
    <V6W n={n} brand={brand}>
      <div style={{ position:'absolute', zIndex:1, top:'50%', left:'50%', transform:'translate(-50%,-55%)', textAlign:'center', width:820 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:200, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--accent)' }}>
          OWNED.
        </Editable>
        <div style={{ marginTop:32, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24, borderTop:'1px solid rgba(245,240,234,0.2)', paddingTop:24 }}>
          {['tool is rented.','skill is leased.','position is owned.'].map((t,i)=>(
            <Editable key={i} as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:26, color: i===2?'var(--accent)':'rgba(245,240,234,0.6)', lineHeight:1.3 }}>{t}</Editable>
          ))}
        </div>
      </div>
    </V6W>
  );
}

function V6_06({ n, brand }) {
  return (
    <V6W n={n} brand={brand} img={<Img id="v6-06-img" shape="rect" radius={2} placeholder="a knife · sharpening" style={{ width:272, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'28%' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:88, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-1)', textWrap:'balance', maxWidth:820 }}>
          Most advice sharpens the{' '}
          <em style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', color:'var(--accent)' }}>wrong layer.</em>
        </Editable>
        <div style={{ marginTop:32, fontFamily:'var(--font-sans)', fontSize:24, lineHeight:1.5, color:'var(--fg-2)', maxWidth:640 }}>
          <Editable as="span">
            Faster work, better tools, cleaner output — all live upstairs. Position lives in the basement, and the basement is where compounding happens.
          </Editable>
        </div>
      </div>
    </V6W>
  );
}

function V6_07({ n, brand }) {
  return (
    <V6W n={n} brand={brand}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'50%', transform:'translateY(-55%)' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:28 }}>
          you'll know you've moved when —
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:100, letterSpacing:'-0.03em', lineHeight:1.0, color:'var(--fg-1)', textWrap:'balance' }}>
          someone calls you a{' '}
          <span style={{ color:'var(--accent)' }}>category</span>
          , not a{' '}
          <span style={{ textDecoration:'line-through', color:'var(--fg-3)' }}>function</span>
          .
        </Editable>
      </div>
    </V6W>
  );
}

function V6_08({ n, brand }) {
  return (
    <V6W n={n} brand={brand} img={<Img id="v6-08-img" shape="rect" radius={2} placeholder="empty frame · window light" style={{ width:272, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'25%' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:80, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
          don't get better at the work.
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:96, letterSpacing:'-0.02em', lineHeight:1.0, color:'var(--accent)', marginTop:24, textWrap:'balance' }}>
          get better at framing it.
        </Editable>
        <div style={{ marginTop:36, fontFamily:'var(--font-sans)', fontSize:22, lineHeight:1.5, color:'var(--fg-2)', maxWidth:640 }}>
          <Editable as="span">The frame decides what work even counts. The framer is the last one a market lets go.</Editable>
        </div>
      </div>
    </V6W>
  );
}

function V6_09({ n, brand }) {
  return (
    <V6W n={n} brand={brand}>
      <div style={{ position:'absolute', zIndex:1, left:96, right:96, top:'40%', transform:'translateY(-50%)' }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:16, flexWrap:'wrap' }}>
          {[['tool','var(--fg-3)'],['→','var(--fg-3)'],['skill','var(--fg-2)'],['→','var(--fg-2)'],['position','var(--accent)']].map(([w,c],i)=>(
            <Editable key={i} as="div" style={{ fontFamily: w==='→'?'var(--font-mono)':'var(--font-display)', fontWeight:700, fontSize: w==='→'?48:148, letterSpacing:'-0.04em', lineHeight:0.9, color:c }}>
              {w}
            </Editable>
          ))}
        </div>
        <div style={{ marginTop:36, borderTop:'2px solid var(--accent)', paddingTop:20 }}>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:36, color:'var(--fg-1)', lineHeight:1.3 }}>
            compounding lives at the bottom layer.
          </Editable>
        </div>
      </div>
    </V6W>
  );
}

function V6_10({ n, brand }) {
  return (
    <V6W n={n} brand={brand} img={<Img id="v6-10-img" shape="rect" radius={2} placeholder="portrait · contemplative" style={{ width:272, height:360 }} />}>
      <div style={{ position:'absolute', zIndex:1, inset:'160px 96px 200px 96px', display:'flex', flexDirection:'column', justifyContent:'center', gap:32 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:76, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-1)', textWrap:'balance' }}>
          If this rewired something —
        </Editable>
        <div style={{ display:'flex', alignItems:'stretch', alignSelf:'flex-start', border:'2px solid var(--fg-1)', borderRadius:4, overflow:'hidden' }}>
          <span style={{ padding:'18px 24px', fontFamily:'var(--font-sans)', fontSize:22, color:'var(--fg-1)' }}>comment</span>
          <span style={{ padding:'18px 28px', fontFamily:'var(--font-mono)', fontSize:32, fontWeight:600, letterSpacing:'0.16em', color:'var(--fg-inverse)', background:'var(--accent)' }}>LAYERS</span>
        </div>
        <Editable as="p" style={{ fontFamily:'var(--font-sans)', fontSize:22, lineHeight:1.55, color:'var(--fg-2)', margin:0, maxWidth:580 }}>
          I'll DM you the 7-question audit for finding your irreplaceable layer.
        </Editable>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:14, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', fontWeight:500 }}>+ follow for the next essay →</div>
      </div>
    </V6W>
  );
}

const BOLD_V6 = [V6_01,V6_02,V6_03,V6_04,V6_05,V6_06,V6_07,V6_08,V6_09,V6_10];

// ══════════════════════════════════════════════════════════════
// V7 · MAXIMUM REDUCE
// Each slide: 1–3 words at absolute maximum scale.
// Supporting detail sits in monospace at 12–14px, single line,
// in a corner. Negative space is the statement.
// ══════════════════════════════════════════════════════════════

function V7W({ n, brand, bg, img, children }) {
  const bgVal = bg || _BGB[n-1];
  const onDark = bgVal === 'navy';
  return (
    <SlideFrame n={n} brand={brand} bg={bgVal} showMark={n>1}>
      {img && <div style={{ position:'absolute', bottom:140, right:80, zIndex:2 }}>{img}</div>}
      <div style={{ position:'absolute', top:56, left:64 }}>
        <Eyebrow dot={false} style={onDark?{color:'rgba(245,240,234,0.4)'}:{}}>{_EYE_B[n-1]}</Eyebrow>
      </div>
      {children}
      <div style={{ position:'absolute', bottom:56, left:64, fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase', color: onDark?'rgba(245,240,234,0.4)':'var(--fg-3)' }}>
        structural irreplaceability · essay 01
      </div>
    </SlideFrame>
  );
}

function V7_01({ n, brand }) {
  return (
    <V7W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'50%', left:96, transform:'translateY(-50%)' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:480, letterSpacing:'-0.06em', lineHeight:0.82, color:'var(--fg-1)' }}>
          not
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:148, fontWeight:500, letterSpacing:'-0.03em', lineHeight:0.95, color:'var(--accent)', marginTop:16 }}>
          replaceable.
        </Editable>
      </div>
    </V7W>
  );
}

function V7_02({ n, brand }) {
  return (
    <V7W n={n} brand={brand} img={<Img id="v7-02-img" shape="rect" radius={2} placeholder="still life" style={{ width:200, height:200 }} />}>
      <div style={{ position:'absolute', top:'50%', left:96, right:96, transform:'translateY(-50%)' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:330, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-1)' }}>
          three layers.
        </Editable>
        <div style={{ marginTop:28, display:'flex', gap:32 }}>
          {['tool → rented','skill → leased','position → owned'].map((t,i)=>(
            <span key={i} style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.14em', color: i===2?'var(--accent)':'var(--fg-3)', textTransform:'uppercase' }}>{t}</span>
          ))}
        </div>
      </div>
    </V7W>
  );
}

function V7_03({ n, brand }) {
  return (
    <V7W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'50%', left:96, transform:'translateY(-50%)' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:368, letterSpacing:'-0.055em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
          do.
        </Editable>
        <div style={{ display:'flex', alignItems:'center', gap:24, marginTop:24 }}>
          <span style={{ width:40, height:2, background:'var(--accent)' }} />
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:200, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>
            see.
          </Editable>
        </div>
      </div>
    </V7W>
  );
}

function V7_04({ n, brand }) {
  return (
    <V7W n={n} brand={brand} img={<Img id="v7-04-img" shape="rect" radius={2} placeholder="layers · weight" style={{ width:200, height:200 }} />}>
      <div style={{ position:'absolute', left:96, top:'50%', transform:'translateY(-50%)' }}>
        {[['tool','var(--fg-3)',300],['skill','var(--fg-2)',300],['position','var(--accent)',360]].map(([w,c,sz],i)=>(
          <Editable key={i} as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:sz, letterSpacing:'-0.055em', lineHeight:0.85, color:c }}>
            {w}
          </Editable>
        ))}
      </div>
    </V7W>
  );
}

function V7_05({ n, brand }) {
  return (
    <V7W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:460, letterSpacing:'-0.06em', lineHeight:0.85, color:'var(--accent)' }}>
          OWNED.
        </Editable>
      </div>
    </V7W>
  );
}

function V7_06({ n, brand }) {
  return (
    <V7W n={n} brand={brand} img={<Img id="v7-06-img" shape="rect" radius={2} placeholder="knife · tool" style={{ width:200, height:200 }} />}>
      <div style={{ position:'absolute', top:'50%', left:96, transform:'translateY(-50%)' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:280, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-1)' }}>
          wrong
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:120, fontWeight:500, letterSpacing:'-0.02em', lineHeight:1, color:'var(--accent)', marginTop:8 }}>
          layer.
        </Editable>
        <div style={{ marginTop:24, fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-3)' }}>
          most advice lives here ↑
        </div>
      </div>
    </V7W>
  );
}

function V7_07({ n, brand }) {
  return (
    <V7W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'50%', left:96, right:96, transform:'translateY(-50%)' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:360, letterSpacing:'-0.055em', lineHeight:0.87, color:'var(--accent)' }}>
          category.
        </Editable>
        <div style={{ marginTop:24, display:'flex', alignItems:'center', gap:16 }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-3)', textDecoration:'line-through' }}>function</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'var(--fg-3)' }}>→</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--accent)' }}>category</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:14, color:'var(--fg-3)' }}>← own this</span>
        </div>
      </div>
    </V7W>
  );
}

function V7_08({ n, brand }) {
  return (
    <V7W n={n} brand={brand} img={<Img id="v7-08-img" shape="rect" radius={2} placeholder="empty frame" style={{ width:200, height:200 }} />}>
      <div style={{ position:'absolute', top:'50%', left:96, transform:'translateY(-50%)' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:280, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>
          frame it.
        </Editable>
        <div style={{ marginTop:20, fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-3)' }}>
          don't do the work · frame the work
        </div>
      </div>
    </V7W>
  );
}

function V7_09({ n, brand }) {
  return (
    <V7W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'50%', left:96, right:96, transform:'translateY(-50%)' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {[['tool','var(--fg-3)'],['skill','var(--fg-2)'],['position','var(--accent)']].map(([w,c],i)=>(
            <Editable key={i} as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:280, letterSpacing:'-0.055em', lineHeight:0.87, color:c }}>
              {w}
            </Editable>
          ))}
        </div>
      </div>
    </V7W>
  );
}

function V7_10({ n, brand }) {
  return (
    <V7W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'50%', left:96, transform:'translateY(-50%)' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:380, letterSpacing:'-0.06em', lineHeight:0.87, color:'var(--accent)' }}>
          LAYERS
        </Editable>
        <div style={{ marginTop:20, fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-3)' }}>
          comment the word above to get the 7-question audit
        </div>
      </div>
    </V7W>
  );
}

const BOLD_V7 = [V7_01,V7_02,V7_03,V7_04,V7_05,V7_06,V7_07,V7_08,V7_09,V7_10];

// ══════════════════════════════════════════════════════════════
// V8 · POSTER
// Centered vertical stack, descending type sizes — like a
// vintage fight-card or concert handbill. Each slide has a
// clear hierarchy: eyebrow → big → medium → detail.
// ══════════════════════════════════════════════════════════════

function V8P({ n, brand, bg, top, big, bigColor, bigFont, med, medColor, detail, detail2, imgSlot }) {
  const bgVal = bg || _BGB[n-1];
  const onDark = bgVal === 'navy';
  const fc = onDark ? 'var(--fg-inverse)' : 'var(--fg-1)';
  const mc = onDark ? 'rgba(245,240,234,0.7)' : 'var(--fg-2)';
  return (
    <SlideFrame n={n} brand={brand} bg={bgVal} showMark={n>1}>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 80px', gap:0 }}>
        {imgSlot && <div style={{ width:200, height:160, marginBottom:20, borderRadius:4, overflow:'hidden' }}>{imgSlot}</div>}
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.28em', textTransform:'uppercase', color: onDark?'rgba(245,240,234,0.5)':'var(--fg-3)', marginBottom:24 }}>{top}</div>
        <div style={{ width:80, height:2, background:'var(--accent)', marginBottom:28 }} />
        <Editable as="div" style={{ fontFamily: bigFont||'var(--font-display)', fontStyle: bigFont?'italic':'normal', fontWeight:700, fontSize:144, letterSpacing:'-0.04em', lineHeight:0.9, color: bigColor||fc, textWrap:'balance' }}>
          {big}
        </Editable>
        {med && (
          <React.Fragment>
            <div style={{ width:80, height:1, background: onDark?'rgba(245,240,234,0.2)':'var(--border)', margin:'24px 0' }} />
            <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:52, fontWeight:500, letterSpacing:'-0.015em', lineHeight:1.1, color: medColor||'var(--accent)', textWrap:'balance' }}>
              {med}
            </Editable>
          </React.Fragment>
        )}
        {detail && (
          <React.Fragment>
            <div style={{ width:56, height:1, background: onDark?'rgba(245,240,234,0.15)':'var(--border)', margin:'20px 0' }} />
            <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize:22, lineHeight:1.5, color: mc, maxWidth:640, textWrap:'balance' }}>
              {detail}
            </Editable>
          </React.Fragment>
        )}
        {detail2 && (
          <div style={{ marginTop:16, fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color: onDark?'rgba(245,240,234,0.4)':'var(--fg-3)' }}>
            {detail2}
          </div>
        )}
      </div>
    </SlideFrame>
  );
}

function V8_01({ n, brand }) { return <V8P n={n} brand={brand} top="essay 01 · the leverage code™" big="Not replaceable." bigColor="var(--fg-1)" med="structurally irreplaceable." detail2="stop the scroll · swipe →" />; }
function V8_02({ n, brand }) { return <V8P n={n} brand={brand} imgSlot={<Img id="v8-02-img" shape="rect" radius={2} placeholder="industrial · stark" style={{ width:'100%', height:'100%' }} />} top="02 · why this matters" big="Three layers." bigColor="var(--fg-1)" med="only one of them compounds." detail="tool → rented  ·  skill → leased  ·  position → owned" detail2="position is the only exception" />; }
function V8_03({ n, brand }) { return <V8P n={n} brand={brand} top="03 · the inflection point" big="do → see." bigColor="var(--fg-1)" med="the irreplaceable sell what they see." detail="Replaceable people sell what they do. Irreplaceable people sell how the work is framed." />; }
function V8_04({ n, brand }) { return <V8P n={n} brand={brand} imgSlot={<Img id="v8-04-img" shape="rect" radius={2} placeholder="layers · structure" style={{ width:'100%', height:'100%' }} />} top="04 · three layers" big="tool. skill. position." bigColor="var(--fg-1)" med="most people live on the top two." detail="The positioning layer — where you frame what work counts — is the only one that compounds." />; }
function V8_05({ n, brand }) { return <V8P n={n} brand={brand} bg="navy" top="05 · what you actually own" big="OWNED." bigColor="var(--accent)" med="Your position is the one asset a market can't replicate." detail="tool is rented · skill is leased · position is owned" />; }
function V8_06({ n, brand }) { return <V8P n={n} brand={brand} imgSlot={<Img id="v8-06-img" shape="rect" radius={2} placeholder="knife · wrong tool" style={{ width:'100%', height:'100%' }} />} top="06 · misallocated effort" big="Wrong layer." bigColor="var(--accent)" bigFont="var(--font-serif-editorial)" med="Most advice sharpens the knife." detail="Get faster at work that is, on net, more replaceable each year — or move down a layer." />; }
function V8_07({ n, brand }) { return <V8P n={n} brand={brand} top="07 · the tell" big="category." bigColor="var(--accent)" med="not function." detail="When someone above you describes you as a category, not a function — you've moved layers." detail2="you'll know when it happens" />; }
function V8_08({ n, brand }) { return <V8P n={n} brand={brand} imgSlot={<Img id="v8-08-img" shape="rect" radius={2} placeholder="empty frame · framing" style={{ width:'100%', height:'100%' }} />} top="08 · the pro move" big="frame the work." bigColor="var(--fg-1)" bigFont="var(--font-serif-editorial)" med="don't just do it. own the frame." detail="The frame decides what work counts. The person who sets the frame is the last one a market lets go." />; }
function V8_09({ n, brand }) { return <V8P n={n} brand={brand} top="09 · screenshot this" big="Tool. Skill. Position." bigColor="var(--fg-1)" med="compounding lives at the bottom layer." detail2="save this · share it · revisit it" />; }
function V8_10({ n, brand }) {
  return (
    <V8P n={n} brand={brand} top="10 · keep the thread"
      big="LAYERS" bigColor="var(--accent)"
      med="comment the word above."
      detail="I'll DM you the 7-question audit for finding your own irreplaceable layer. + follow for the next essay."
      detail2="comment LAYERS → get the audit"
    />
  );
}

const BOLD_V8 = [V8_01,V8_02,V8_03,V8_04,V8_05,V8_06,V8_07,V8_08,V8_09,V8_10];

Object.assign(window, { BOLD_V5, BOLD_V6, BOLD_V7, BOLD_V8 });
