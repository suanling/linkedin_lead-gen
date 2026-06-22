// slides-variants-a.jsx — V2: BLEED · V3: HALF · V4: DARK

const _EYE = [
  'essay 01 · hook','02 · tension','03 · the layer beneath',
  '04 · three layers','05 · what you own','06 · misallocated effort',
  '07 · the tell','08 · the pro move','09 · screenshot','10 · keep the thread'
];

// ══════════════════════════════════════════════════════════════
// V2 · BLEED
// Type at 300–480px, positioned off-center so it crops at the
// slide boundary. The cut IS the art direction.
// ══════════════════════════════════════════════════════════════
const V2BG = ['cream','paper','cream','mist','navy','cream','mist','cream','paper','cream'];

function V2W({ n, brand, img, children }) {
  const onDark = V2BG[n-1] === 'navy';
  return (
    <SlideFrame n={n} brand={brand} bg={V2BG[n-1]} showMark={n > 1}>
      {img && <div style={{ position:'absolute', top:96, right:80, zIndex:0 }}>{img}</div>}
      <div style={{ position:'absolute', top:56, left:64 }}>
        <Eyebrow dot={false} style={onDark ? { color:'rgba(245,240,234,0.5)' } : {}}>
          {_EYE[n-1]}
        </Eyebrow>
      </div>
      {children}
    </SlideFrame>
  );
}

function V2_01({ n, brand }) {
  return (
    <V2W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'18%', left:-56, whiteSpace:'nowrap' }}>
        <div style={{ position:'relative', display:'inline-block' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:430, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-1)' }}>
            replaceable.
          </Editable>
          <span style={{ position:'absolute', left:56, right:0, top:'52%', height:22, background:'var(--accent)', transform:'rotate(-1.8deg)', pointerEvents:'none' }} />
        </div>
      </div>
      <div style={{ position:'absolute', bottom:130, left:96, display:'flex', alignItems:'baseline', gap:20 }}>
        <span style={{ width:36, height:2, background:'var(--accent)', display:'inline-block', transform:'translateY(-7px)' }} />
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:56, letterSpacing:'-0.015em', color:'var(--accent)', lineHeight:1 }}>
          structurally irreplaceable.
        </Editable>
      </div>
    </V2W>
  );
}

function V2_02({ n, brand }) {
  return (
    <V2W n={n} brand={brand} img={<Img id="v2-02-img" shape="rect" radius={2} placeholder="industrial · still life" style={{ width:280, height:360 }} />}>
      <div style={{ position:'absolute', top:'8%', left:-48 }}>
        {[['01.','var(--fg-3)'],['02.','var(--fg-2)'],['03.','var(--fg-1)']].map(([t,c],i)=>(
          <Editable key={i} as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:308, letterSpacing:'-0.05em', lineHeight:0.88, color:c, marginTop: i===0?0:-20 }}>{t}</Editable>
        ))}
      </div>
      <div style={{ position:'absolute', bottom:160, right:80, maxWidth:420, textAlign:'right' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontSize:42, fontWeight:600, lineHeight:1.1, letterSpacing:'-0.02em', color:'var(--fg-1)' }}>
          Every layer above position commodifies on contact.
        </Editable>
        <div style={{ marginTop:12, fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)' }}>
          position compounds ↓
        </div>
      </div>
    </V2W>
  );
}

function V2_03({ n, brand }) {
  return (
    <V2W n={n} brand={brand}>
      <div style={{ position:'absolute', bottom:'48%', left:-32, whiteSpace:'nowrap' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:310, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
          do.
        </Editable>
        <div style={{ marginTop:16, fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)' }}>
          replaceable people sell what they do
        </div>
      </div>
      <div style={{ position:'absolute', top:'47%', right:-24, whiteSpace:'nowrap', textAlign:'right' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-2)', marginBottom:14, marginRight:24 }}>
          irreplaceable people sell what they see
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:310, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>
          see.
        </Editable>
      </div>
    </V2W>
  );
}

function V2_04({ n, brand }) {
  return (
    <V2W n={n} brand={brand} img={<Img id="v2-04-img" shape="rect" radius={2} placeholder="stacked layers · weight" style={{ width:280, height:520 }} />}>
      <div style={{ position:'absolute', left:-32, top:'18%', display:'flex', flexDirection:'column', gap:0 }}>
        {[['tool','var(--fg-3)','rented'],['skill','var(--fg-2)','leased'],['position','var(--accent)','owned ←']].map(([w,c,s],i)=>(
          <div key={i} style={{ display:'flex', alignItems:'baseline', gap:24 }}>
            <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:248, letterSpacing:'-0.05em', lineHeight:0.88, color:c }}>
              {w}
            </Editable>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.18em', textTransform:'uppercase', color:c, opacity:0.7 }}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </V2W>
  );
}

function V2_05({ n, brand }) {
  return (
    <V2W n={n} brand={brand}>
      <div style={{ position:'absolute', left:56, top:'28%', whiteSpace:'nowrap' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:480, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-inverse)' }}>
          OWNED.
        </Editable>
      </div>
      <div style={{ position:'absolute', bottom:160, left:80, right:80, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:0 }}>
        {['tool is rented.','skill is leased.','position is owned.'].map((t,i)=>(
          <div key={i} style={{ borderTop:`2px solid ${i===2?'var(--accent)':'rgba(245,240,234,0.2)'}`, paddingTop:16 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color: i===2?'var(--accent)':'rgba(245,240,234,0.6)' }}>
              {`0${i+1}`}
            </div>
            <Editable as="div" style={{ marginTop:8, fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:28, color:'var(--fg-inverse)', lineHeight:1.2 }}>
              {t}
            </Editable>
          </div>
        ))}
      </div>
    </V2W>
  );
}

function V2_06({ n, brand }) {
  return (
    <V2W n={n} brand={brand} img={<Img id="v2-06-img" shape="rect" radius={2} placeholder="quiet hands · tool at rest" style={{ width:280, height:360 }} />}>
      <div style={{ position:'absolute', top:'24%', left:-48, whiteSpace:'nowrap' }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:400, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-3)' }}>
          wrong.
        </Editable>
      </div>
      <div style={{ position:'absolute', bottom:160, left:96, maxWidth:640 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:16 }}>
          ↳ correction
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontSize:52, fontWeight:600, lineHeight:1.05, letterSpacing:'-0.02em', color:'var(--fg-1)' }}>
          Most advice sharpens the knife.
        </Editable>
        <Editable as="div" style={{ marginTop:12, fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:40, color:'var(--accent)', lineHeight:1.1 }}>
          Your position is the moat.
        </Editable>
      </div>
    </V2W>
  );
}

function V2_07({ n, brand }) {
  return (
    <V2W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:1400, textAlign:'center', marginLeft:-100 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:28 }}>
          you know you've moved layers when someone says —
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:300, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-1)' }}>
          category.
        </Editable>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:24, marginTop:24 }}>
          <span style={{ width:56, height:2, background:'var(--border)' }} />
          <Editable as="span" style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-3)' }}>
            not function
          </Editable>
          <span style={{ width:56, height:2, background:'var(--border)' }} />
        </div>
      </div>
    </V2W>
  );
}

function V2_08({ n, brand }) {
  return (
    <V2W n={n} brand={brand} img={<Img id="v2-08-img" shape="rect" radius={2} placeholder="empty frame · window" style={{ width:280, height:360 }} />}>
      <div style={{ position:'absolute', top:'15%', left:-32, whiteSpace:'nowrap' }}>
        <div style={{ position:'relative' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:220, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
            the work.
          </Editable>
          <div style={{ position:'absolute', top:8, left:0, fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', transform:'translateY(-100%)' }}>
            don't get better at
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', bottom:'15%', right:-40, whiteSpace:'nowrap', textAlign:'right' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-2)', marginBottom:16, marginRight:40 }}>
          get better at
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:310, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>
          framing it.
        </Editable>
      </div>
    </V2W>
  );
}

function V2_09({ n, brand }) {
  return (
    <V2W n={n} brand={brand}>
      <div style={{ position:'absolute', left:96, top:'38%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:24 }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:200, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-3)' }}>tool</Editable>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:48, color:'var(--fg-3)' }}>→</span>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:200, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-2)' }}>skill</Editable>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:48, color:'var(--fg-2)' }}>→</span>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:200, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--accent)' }}>position</Editable>
        </div>
        <div style={{ borderTop:'1px solid var(--border)', paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:36, color:'var(--fg-1)', lineHeight:1.2 }}>
            compounding lives at the bottom layer.
          </Editable>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--accent)' }}>
            screenshot this ↑
          </span>
        </div>
      </div>
    </V2W>
  );
}

function V2_10({ n, brand }) {
  return (
    <V2W n={n} brand={brand}>
      <div style={{ position:'absolute', inset:'160px 96px 200px 96px', display:'flex', flexDirection:'column', justifyContent:'center', gap:32 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:88, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-1)', textWrap:'balance' }}>
          If this rewired something —
        </Editable>
        <div style={{ display:'flex', alignItems:'stretch', alignSelf:'flex-start', border:'2px solid var(--fg-1)', borderRadius:4, overflow:'hidden' }}>
          <span style={{ padding:'18px 24px', fontFamily:'var(--font-sans)', fontSize:22, color:'var(--fg-1)' }}>comment</span>
          <span style={{ padding:'18px 28px', fontFamily:'var(--font-mono)', fontSize:32, fontWeight:600, letterSpacing:'0.16em', color:'var(--fg-inverse)', background:'var(--accent)' }}>LAYERS</span>
        </div>
        <Editable as="p" style={{ fontFamily:'var(--font-sans)', fontSize:22, lineHeight:1.55, color:'var(--fg-2)', margin:0, maxWidth:580 }}>
          I'll DM you the 7-question audit for finding your own irreplaceable layer.
        </Editable>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:15, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', fontWeight:500 }}>
          + follow for the next essay →
        </div>
      </div>
    </V2W>
  );
}

const BOLD_V2 = [V2_01,V2_02,V2_03,V2_04,V2_05,V2_06,V2_07,V2_08,V2_09,V2_10];

// ══════════════════════════════════════════════════════════════
// V3 · HALF SPLIT
// Every slide: 50 / 50 vertical grid divided by a 3px terracotta
// rule. Left = number / context. Right = statement / answer.
// Dark side alternates per slide.
// ══════════════════════════════════════════════════════════════

function V3H({ n, brand, leftBg, leftFg, left, right }) {
  const isDark = leftBg === 'navy';
  return (
    <SlideFrame n={n} brand={brand} bg="cream" showMark={false} showSwipe={false} showCounter={false}>
      <div style={{ position:'absolute', inset:0, display:'grid', gridTemplateColumns:'1fr 1fr', zIndex:0 }}>
        <div style={{ background: leftBg==='navy'?'var(--lc-ink-navy)': leftBg==='accent'?'var(--accent)': leftBg==='mist'?'var(--lc-mist)':'var(--lc-soft-white)', overflow:'hidden', position:'relative', display:'flex', flexDirection:'column', justifyContent:'center', padding:'88px 64px', gap:20 }}>
          {left}
        </div>
        <div style={{ background:'var(--lc-warm-cream)', position:'relative', display:'flex', flexDirection:'column', justifyContent:'center', padding:'88px 64px', gap:20 }}>
          {right}
          <div style={{ position:'absolute', bottom:56, right:64, display:'flex', alignItems:'baseline', gap:8, fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-3)' }}>
            {n < 10 ? <><span>swipe</span><span style={{fontSize:20}}>→</span></> : <><span>comment</span><span style={{color:'var(--accent)',fontWeight:600}}>LAYERS</span><span style={{fontSize:20}}>↓</span></>}
          </div>
          <div style={{ position:'absolute', top:56, right:64, fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.18em', color:'var(--fg-3)', display:'flex', gap:8, alignItems:'center' }}>
            <span style={{ color:'var(--fg-1)' }}>{String(n).padStart(2,'0')}</span>
            <span style={{ width:20, height:1, background:'currentColor', opacity:0.4 }} />
            <span>10</span>
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:3, background:'var(--accent)', transform:'translateX(-50%)', zIndex:1 }} />
    </SlideFrame>
  );
}

const V3N = (num,c='rgba(245,240,234,0.1)') => (
  <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:320, letterSpacing:'-0.05em', lineHeight:0.85, color:c, position:'absolute', left:-32, bottom:-40, userSelect:'none', pointerEvents:'none' }}>{String(num).padStart(2,'0')}</div>
);

function V3_01({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="navy"
      left={<>
        {V3N(1)}
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:48, color:'rgba(245,240,234,0.85)', lineHeight:1.1, position:'relative', zIndex:1 }}>essay one · the leverage code™</Editable>
        <div style={{ width:36, height:2, background:'var(--accent)', position:'relative', zIndex:1 }} />
      </>}
      right={<>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:68, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-1)', textWrap:'balance' }}>The tool isn't the moat.</Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:68, fontWeight:500, letterSpacing:'-0.02em', color:'var(--accent)', lineHeight:1 }}>You are.</Editable>
      </>}
    />
  );
}

function V3_02({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="mist"
      left={<>
        <Img id="v3-02-img" shape="rect" radius={0} placeholder="architectural shadow · tension" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
        <div style={{ position:'absolute', bottom:28, left:28, right:28, zIndex:1, background:'rgba(7,39,62,0.88)', padding:'14px 20px' }}>
          <Eyebrow style={{ color:'rgba(245,240,234,0.8)' }}>02 · tension</Eyebrow>
        </div>
      </>}
      right={<>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)' }}>the only exception —</div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:108, letterSpacing:'-0.035em', lineHeight:0.9, color:'var(--fg-1)', textWrap:'balance' }}>Position.</Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:36, color:'var(--fg-2)', lineHeight:1.3 }}>It compounds.</Editable>
        <div style={{ marginTop:16 }}><Img id="v3-02-right-img" shape="rect" radius={2} placeholder="compounding · depth" style={{ width:'100%', height:140 }} /></div>
      </>}
    />
  );
}

function V3_03({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="navy"
      left={<>
        {V3N(3)}
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,240,234,0.5)', marginBottom:12 }}>replaceable people sell what they</div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:180, letterSpacing:'-0.05em', lineHeight:0.87, color:'rgba(245,240,234,0.6)', textDecoration:'line-through', textDecorationColor:'rgba(245,240,234,0.4)' }}>do.</Editable>
        </div>
      </>}
      right={<>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)' }}>irreplaceable people sell what they</div>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:180, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>see.</Editable>
      </>}
    />
  );
}

function V3_04({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="mist"
      left={<>
        <Eyebrow>04 · three layers</Eyebrow>
        {[['01','tool','rented · replaced quarterly'],['02','skill','leased · replaced by a graduate'],['03','position','owned · compounds']].map(([num,k,sub],i)=>(
          <div key={i} style={{ borderTop:'1px solid var(--border)', paddingTop:14, display:'flex', gap:16, alignItems:'baseline' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'var(--fg-3)', letterSpacing:'0.1em', width:28 }}>{num}</span>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:44, fontWeight:600, letterSpacing:'-0.02em', lineHeight:1, color: i===2?'var(--accent)':'var(--fg-1)' }}>{k}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--fg-3)', marginTop:4 }}>{sub}</div>
            </div>
          </div>
        ))}
      </>}
      right={<>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:8 }}>go deeper</div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:128, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>position</Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:36, color:'var(--fg-1)', lineHeight:1.3, marginTop:16 }}>is the only layer that doesn't commodify.</Editable>
        <div style={{ marginTop:16 }}><Img id="v3-04-img" shape="rect" radius={2} placeholder="layers · depth" style={{ width:'100%', height:140 }} /></div>
      </>}
    />
  );
}

function V3_05({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="navy"
      left={<>
        {V3N(5)}
        <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:8 }}>
          {[['01','tool','rented'],['02','skill','leased']].map(([num,k,v],i)=>(
            <div key={i} style={{ display:'flex', alignItems:'baseline', gap:12 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'rgba(245,240,234,0.4)', letterSpacing:'0.1em', width:28 }}>{num}</span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:64, fontWeight:600, letterSpacing:'-0.025em', lineHeight:1, color:'rgba(245,240,234,0.7)' }}>{k}</span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color:'rgba(245,240,234,0.4)', textTransform:'uppercase', letterSpacing:'0.1em' }}>is {v}.</span>
            </div>
          ))}
        </div>
      </>}
      right={<>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)' }}>03 · position</div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:116, letterSpacing:'-0.04em', lineHeight:0.9, color:'var(--accent)' }}>is owned.</Editable>
        <div style={{ width:36, height:3, background:'var(--accent)', marginTop:24 }} />
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:28, color:'var(--fg-2)', lineHeight:1.3 }}>compounding starts here.</Editable>
      </>}
    />
  );
}

function V3_06({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="mist"
      left={<>
        <Eyebrow>06 · misallocated effort</Eyebrow>
        <Img id="v3-06-img" shape="rect" radius={2} placeholder="knife · sharpening" style={{ width:'100%', height:320 }} />
        <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--fg-3)' }}>fig. 01 · sharper knife, same layer</div>
      </>}
      right={<>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:68, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-1)', textWrap:'balance' }}>Most advice sharpens the wrong layer.</Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize:22, lineHeight:1.5, color:'var(--fg-2)' }}>
          Faster, better, cleaner — all live upstairs. Position lives in the basement, and the basement is where compounding happens.
        </Editable>
      </>}
    />
  );
}

function V3_07({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="navy"
      left={<>
        {V3N(7)}
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,240,234,0.5)', marginBottom:12 }}>they won't say</div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:88, letterSpacing:'-0.03em', lineHeight:1, color:'rgba(245,240,234,0.5)', textDecoration:'line-through', textDecorationColor:'rgba(245,240,234,0.4)' }}>function</Editable>
        </div>
      </>}
      right={<>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)' }}>they'll say</div>
        <div style={{ display:'inline-flex', alignItems:'center', padding:'12px 24px', background:'var(--accent)', borderRadius:4, alignSelf:'flex-start' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:88, letterSpacing:'-0.03em', lineHeight:1, color:'var(--fg-inverse)' }}>category.</Editable>
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize:22, lineHeight:1.45, color:'var(--fg-2)' }}>That is how you know you've moved layers.</Editable>
      </>}
    />
  );
}

function V3_08({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="mist"
      left={<>
        <Img id="v3-08-img" shape="rect" radius={0} placeholder="contemplative · window light" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
        <div style={{ position:'absolute', bottom:28, left:28, right:28, zIndex:1, background:'rgba(7,39,62,0.88)', padding:'14px 20px' }}>
          <Eyebrow style={{ color:'rgba(245,240,234,0.8)' }}>08 · the pro move</Eyebrow>
        </div>
      </>}
      right={<>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)' }}>instead —</div>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:64, letterSpacing:'-0.015em', lineHeight:1.1, color:'var(--accent)', textWrap:'balance' }}>
          get better at framing the work.
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize:20, lineHeight:1.5, color:'var(--fg-2)' }}>
          The frame decides what work counts. The framer is the last one a market lets go.
        </Editable>
      </>}
    />
  );
}

function V3_09({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="navy"
      left={<>
        {V3N(9)}
        <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:0 }}>
          {[['tool','var(--fg-3)'],['skill','rgba(245,240,234,0.7)']].map(([w,c],i)=>(
            <div key={i} style={{ display:'flex', alignItems:'baseline', gap:16 }}>
              <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:108, letterSpacing:'-0.04em', lineHeight:0.9, color:c }}>{w}</Editable>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:36, color:c, opacity:0.7 }}>→</span>
            </div>
          ))}
        </div>
      </>}
      right={<>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)' }}>own this layer</div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:130, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)', borderBottom:'6px solid var(--accent)', paddingBottom:8 }}>position.</Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:28, color:'var(--fg-1)', lineHeight:1.3 }}>compounding lives at the bottom layer.</Editable>
      </>}
    />
  );
}

function V3_10({ n, brand }) {
  return (
    <V3H n={n} brand={brand} leftBg="mist"
      left={<>
        <Img id="v3-10-img" shape="rect" radius={2} placeholder="portrait · direct gaze" style={{ width:'100%', flex:1, minHeight:0 }} />
      </>}
      right={<>
        <Eyebrow>10 · keep the thread</Eyebrow>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:56, letterSpacing:'-0.025em', lineHeight:1.05, color:'var(--fg-1)', textWrap:'balance' }}>
          Want the full breakdown?
        </Editable>
        <div style={{ display:'flex', alignItems:'stretch', alignSelf:'flex-start', border:'2px solid var(--fg-1)', borderRadius:4, overflow:'hidden' }}>
          <span style={{ padding:'16px 20px', fontFamily:'var(--font-sans)', fontSize:20, color:'var(--fg-1)' }}>comment</span>
          <span style={{ padding:'16px 24px', fontFamily:'var(--font-mono)', fontSize:28, fontWeight:600, letterSpacing:'0.16em', color:'var(--fg-inverse)', background:'var(--accent)' }}>LAYERS</span>
        </div>
        <Editable as="p" style={{ fontFamily:'var(--font-sans)', fontSize:19, lineHeight:1.5, color:'var(--fg-2)', margin:0 }}>
          I'll DM you the 7-question audit for finding your own irreplaceable layer.
        </Editable>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:14, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', fontWeight:500 }}>+ follow for the next essay →</div>
      </>}
    />
  );
}

const BOLD_V3 = [V3_01,V3_02,V3_03,V3_04,V3_05,V3_06,V3_07,V3_08,V3_09,V3_10];

// ══════════════════════════════════════════════════════════════
// V4 · ALL DARK
// Navy on every slide. Cream headlines. Terracotta = the ONE
// word that matters per slide. Dust blue for secondary.
// ══════════════════════════════════════════════════════════════

function V4W({ n, brand, img, children }) {
  return (
    <SlideFrame n={n} brand={brand} bg="navy" showMark={n>1}>
      {img && (
        <div style={{ position:'absolute', top:160, right:64, bottom:200, width:288, zIndex:0, overflow:'hidden', borderRadius:4 }}>
          {img}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to left, transparent 40%, var(--lc-ink-navy) 100%)', zIndex:1 }} />
        </div>
      )}
      <div style={{ position:'absolute', top:56, left:64 }}>
        <Eyebrow dot style={{ color:'rgba(245,240,234,0.45)' }}>{_EYE[n-1]}</Eyebrow>
      </div>
      {children}
    </SlideFrame>
  );
}

const V4C = 'var(--fg-inverse)';
const V4A = 'var(--accent)';
const V4M = 'rgba(245,240,234,0.5)';

function V4_01({ n, brand }) {
  return (
    <V4W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'22%', left:96, right:96 }}>
        <div style={{ position:'relative', display:'inline-block' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:360, letterSpacing:'-0.05em', lineHeight:0.87, color:'rgba(245,240,234,0.25)', textDecoration:'line-through', textDecorationColor:'rgba(245,240,234,0.2)' }}>
            replaceable.
          </Editable>
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:88, letterSpacing:'-0.015em', lineHeight:0.95, color:V4A, marginTop:24 }}>
          structurally irreplaceable.
        </Editable>
      </div>
    </V4W>
  );
}

function V4_02({ n, brand }) {
  return (
    <V4W n={n} brand={brand} img={<Img id="v4-02-img" shape="rect" radius={2} placeholder="structure · layers" style={{ width:'100%', height:'100%' }} />}>
      <div style={{ position:'absolute', inset:'160px 96px 200px 96px', display:'flex', flexDirection:'column', justifyContent:'center', gap:32 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:600, fontSize:58, letterSpacing:'-0.02em', lineHeight:1.05, color:V4C, maxWidth:680, textWrap:'balance' }}>
          Three things commodify the moment you touch them.
        </Editable>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {[['tool','rented on arrival'],['skill','leased by a graduate'],['position','compounding if you hold it']].map(([k,v],i)=>(
            <div key={i} style={{ display:'grid', gridTemplateColumns:'60px 160px 1fr', gap:16, alignItems:'baseline', borderTop:'1px solid rgba(245,240,234,0.12)', paddingTop:16 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', color:V4M }}>0{i+1}</span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:48, fontWeight:600, letterSpacing:'-0.02em', lineHeight:1, color: i===2?V4A:V4C }}>{k}</span>
              <span style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:24, color:V4M }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </V4W>
  );
}

function V4_03({ n, brand }) {
  return (
    <V4W n={n} brand={brand}>
      <div style={{ position:'absolute', inset:'180px 96px 180px 96px', display:'flex', flexDirection:'column', justifyContent:'center', gap:40 }}>
        <div style={{ borderBottom:'1px solid rgba(245,240,234,0.15)', paddingBottom:32 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:V4M, marginBottom:12 }}>replaceable people sell what they</div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:200, letterSpacing:'-0.05em', lineHeight:0.87, color:'rgba(245,240,234,0.3)', textDecoration:'line-through', textDecorationColor:'rgba(245,240,234,0.2)' }}>
            do.
          </Editable>
        </div>
        <div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:V4A, marginBottom:12 }}>irreplaceable people sell what they</div>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:200, letterSpacing:'-0.04em', lineHeight:0.87, color:V4A }}>
            see.
          </Editable>
        </div>
      </div>
    </V4W>
  );
}

function V4_04({ n, brand }) {
  return (
    <V4W n={n} brand={brand} img={<Img id="v4-04-img" shape="rect" radius={2} placeholder="depth · foundations" style={{ width:'100%', height:'100%' }} />}>
      <div style={{ position:'absolute', inset:'160px 64px 180px 64px', display:'flex', flexDirection:'column', gap:0 }}>
        {[['tool','01','rented · replaced quarterly','rgba(245,240,234,0.25)'],['skill','02','leased · replaced by a graduate','rgba(245,240,234,0.6)'],['position','03','owned · compounds','var(--accent)']].map(([k,num,sub,c],i)=>(
          <div key={i} style={{ flex: i===2?1.4:1, borderTop:'1px solid rgba(245,240,234,0.12)', paddingTop:20, display:'flex', alignItems:'center', gap:32 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', color:V4M, width:32 }}>{num}</span>
            <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize: i===2?120:80, letterSpacing:'-0.04em', lineHeight:1, color:c, flex:1 }}>{k}</Editable>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase', color: i===2?V4A:V4M, maxWidth:200, textAlign:'right', lineHeight:1.4 }}>{sub}</span>
          </div>
        ))}
      </div>
    </V4W>
  );
}

function V4_05({ n, brand }) {
  return (
    <V4W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center', width:900 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.28em', textTransform:'uppercase', color:V4M, marginBottom:36 }}>
          03 of 03 · the only layer that compounds
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:280, letterSpacing:'-0.05em', lineHeight:0.87, color:V4A }}>
          OWNED.
        </Editable>
        <div style={{ marginTop:40, display:'flex', justifyContent:'center', gap:56 }}>
          {[['tool','rented'],['skill','leased'],['position','→ owned']].map(([k,v],i)=>(
            <div key={i} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:600, color: i===2?V4A:V4M, letterSpacing:'-0.015em' }}>{k}</div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.14em', textTransform:'uppercase', color: i===2?V4A:V4M, opacity: i===2?1:0.6 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </V4W>
  );
}

function V4_06({ n, brand }) {
  return (
    <V4W n={n} brand={brand} img={<Img id="v4-06-img" shape="rect" radius={2} placeholder="knife · wrong layer" style={{ width:'100%', height:'100%' }} />}>
      <div style={{ position:'absolute', inset:'160px 96px 200px 96px', display:'flex', flexDirection:'column', justifyContent:'center', gap:32 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:92, letterSpacing:'-0.03em', lineHeight:0.95, color:V4C, textWrap:'balance' }}>
          Most career advice optimises the{' '}
          <span style={{ color:V4A }}>wrong layer.</span>
        </Editable>
        <div style={{ width:48, height:2, background:V4A }} />
        <Editable as="p" style={{ fontFamily:'var(--font-sans)', fontSize:24, lineHeight:1.55, color:V4M, margin:0, maxWidth:680 }}>
          It teaches you to sharpen the knife — not to be the only one holding it. So you get faster at work that is, on net, more replaceable each year.
        </Editable>
      </div>
    </V4W>
  );
}

function V4_07({ n, brand }) {
  return (
    <V4W n={n} brand={brand}>
      <div style={{ position:'absolute', inset:'160px 96px 200px 96px', display:'flex', flexDirection:'column', justifyContent:'center', gap:28 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.24em', textTransform:'uppercase', color:V4M }}>
          you know you've moved layers when —
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:76, letterSpacing:'-0.025em', lineHeight:1.05, color:V4C, textWrap:'balance' }}>
          someone above you describes you as a{' '}
          <span style={{ color:V4A, background:'rgba(198,90,46,0.15)', padding:'0 12px', display:'inline-block', borderRadius:4 }}>category</span>
          , not a{' '}
          <span style={{ color:'rgba(245,240,234,0.35)', textDecoration:'line-through' }}>function</span>
          .
        </Editable>
      </div>
    </V4W>
  );
}

function V4_08({ n, brand }) {
  return (
    <V4W n={n} brand={brand} img={<Img id="v4-08-img" shape="rect" radius={2} placeholder="frame · framing" style={{ width:'100%', height:'100%' }} />}>
      <div style={{ position:'absolute', inset:'160px 96px 200px 96px', display:'flex', flexDirection:'column', justifyContent:'center', gap:24 }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.22em', textTransform:'uppercase', color:V4A, padding:'8px 14px', border:'1px solid var(--accent)', alignSelf:'flex-start' }}>
          the pro move
        </span>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:76, letterSpacing:'-0.025em', lineHeight:1, color:'rgba(245,240,234,0.4)', textDecoration:'line-through', textDecorationColor:'rgba(245,240,234,0.25)' }}>
          don't get better at the work.
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:96, letterSpacing:'-0.02em', lineHeight:0.95, color:V4A, textWrap:'balance' }}>
          get better at framing it.
        </Editable>
      </div>
    </V4W>
  );
}

function V4_09({ n, brand }) {
  return (
    <V4W n={n} brand={brand}>
      <div style={{ position:'absolute', inset:'160px 96px 200px 96px', display:'flex', flexDirection:'column', justifyContent:'center', gap:0 }}>
        {[['tool','rgba(245,240,234,0.25)'],['skill','rgba(245,240,234,0.6)'],['position','var(--accent)']].map(([w,c],i)=>(
          <div key={i} style={{ display:'flex', alignItems:'baseline', gap:28, borderBottom:'1px solid rgba(245,240,234,0.1)', paddingBottom:16, paddingTop: i===0?0:20 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.18em', color:V4M, width:28 }}>0{i+1}</span>
            <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:148, letterSpacing:'-0.045em', lineHeight:0.9, color:c }}>{w}</Editable>
            {i===2 && <span style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.18em', textTransform:'uppercase', color:V4A, marginLeft:'auto' }}>← own this</span>}
          </div>
        ))}
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:32, color:V4M, marginTop:28, lineHeight:1.3 }}>
          compounding lives at the bottom layer.
        </Editable>
      </div>
    </V4W>
  );
}

function V4_10({ n, brand }) {
  return (
    <V4W n={n} brand={brand}>
      <div style={{ position:'absolute', inset:'160px 96px 200px 96px', display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:56, alignItems:'center' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:64, letterSpacing:'-0.025em', lineHeight:1, color:V4C, textWrap:'balance' }}>
            Want the full breakdown?
          </Editable>
          <div style={{ display:'flex', alignItems:'stretch', alignSelf:'flex-start', border:'2px solid var(--accent)', borderRadius:4, overflow:'hidden' }}>
            <span style={{ padding:'18px 22px', fontFamily:'var(--font-sans)', fontSize:20, color:V4C }}>comment</span>
            <span style={{ padding:'18px 28px', fontFamily:'var(--font-mono)', fontSize:28, fontWeight:600, letterSpacing:'0.16em', color:V4C, background:'var(--accent)' }}>LAYERS</span>
          </div>
          <Editable as="p" style={{ fontFamily:'var(--font-sans)', fontSize:20, lineHeight:1.55, color:V4M, margin:0 }}>
            I'll DM you the 7-question audit for finding your own irreplaceable layer.
          </Editable>
          <div style={{ fontFamily:'var(--font-sans)', fontSize:14, letterSpacing:'0.22em', textTransform:'uppercase', color:V4M, fontWeight:500 }}>
            + follow for the next essay →
          </div>
        </div>
        <Img id="v4-10-img" shape="rect" radius={2} placeholder="portrait · against dark" style={{ width:'100%', height:580 }} />
      </div>
    </V4W>
  );
}

const BOLD_V4 = [V4_01,V4_02,V4_03,V4_04,V4_05,V4_06,V4_07,V4_08,V4_09,V4_10];

Object.assign(window, { BOLD_V2, BOLD_V3, BOLD_V4 });
