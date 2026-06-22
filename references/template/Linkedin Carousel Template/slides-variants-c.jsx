// slides-variants-c.jsx — V9: SWISS GRID · V10: DIAGONAL · V11: OVERPRINT

const _EYE_C = [
  'essay 01 · hook','02 · tension','03 · the layer beneath',
  '04 · three layers','05 · what you own','06 · misallocated effort',
  '07 · the tell','08 · the pro move','09 · screenshot','10 · keep the thread'
];
const _BGC = ['cream','paper','cream','mist','navy','cream','mist','cream','paper','cream'];

// ══════════════════════════════════════════════════════════════
// V9 · SWISS GRID
// 3 explicit columns with visible 1px vertical rules.
// Col 1 (narrow, 200px): index number + eyebrow label.
// Col 2 (wide): main content.
// Col 3 (medium, 280px): caption / aside.
// ══════════════════════════════════════════════════════════════

function V9Grid({ onDark }) {
  const c = onDark ? 'rgba(245,240,234,0.12)' : 'rgba(31,31,29,0.1)';
  return (
    <>
      <div style={{ position:'absolute', left:200, top:0, bottom:0, width:1, background:c, zIndex:0 }} />
      <div style={{ position:'absolute', right:280, top:0, bottom:0, width:1, background:c, zIndex:0 }} />
    </>
  );
}

function V9W({ n, brand, img, children }) {
  const onDark = _BGC[n-1] === 'navy';
  const fc3 = onDark ? 'rgba(245,240,234,0.45)' : 'var(--fg-3)';
  return (
    <SlideFrame n={n} brand={brand} bg={_BGC[n-1]} showMark={false} showSwipe={false} showCounter={false}>
      <V9Grid onDark={onDark} />
      {/* Col 1 — index + label */}
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:200, display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'56px 28px 56px 40px' }}>
        <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:80, letterSpacing:'-0.04em', lineHeight:1, color: onDark?'rgba(245,240,234,0.25)':'rgba(31,31,29,0.12)' }}>
          {String(n).padStart(2,'0')}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase', color:fc3, writingMode:'vertical-rl', transform:'rotate(180deg)', alignSelf:'flex-start' }}>
            {_EYE_C[n-1]}
          </div>
        </div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:fc3 }}>
          {`${String(n).padStart(2,'0')} / 10`}
        </div>
      </div>
      {/* Col 2 — main */}
      <div style={{ position:'absolute', left:200, right:280, top:0, bottom:0, padding:'80px 56px', display:'flex', flexDirection:'column', justifyContent:'center', zIndex:1 }}>
        {children}
      </div>
      {/* Col 3 — aside / swipe */}
      {img && <div style={{ position:'absolute', right:0, top:0, width:280, height:460, zIndex:2, overflow:'hidden' }}>{img}</div>}
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:280, padding:'80px 40px', display:'flex', flexDirection:'column', justifyContent:'flex-end', gap:12 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:fc3, lineHeight:1.5 }}>
          structural irreplaceability
        </div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:fc3 }}>
          essay no. 01
        </div>
        <div style={{ width:24, height:1, background:'var(--accent)' }} />
        <div style={{ fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)' }}>
          {n < 10 ? 'swipe →' : 'comment LAYERS ↓'}
        </div>
      </div>
    </SlideFrame>
  );
}

function V9_01({ n, brand }) {
  return (
    <V9W n={n} brand={brand}>
      <div style={{ position:'relative', display:'inline-block', marginBottom:24 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:200, letterSpacing:'-0.055em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
          replaceable.
        </Editable>
      </div>
      <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:80, letterSpacing:'-0.015em', lineHeight:1, color:'var(--accent)', textWrap:'balance' }}>
        structurally irreplaceable.
      </Editable>
    </V9W>
  );
}

function V9_02({ n, brand }) {
  return (
    <V9W n={n} brand={brand} img={<Img id="v9-02-img" shape="rect" radius={0} placeholder="industrial · stark" style={{ width:'100%', height:'100%' }} />}>
      <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:68, letterSpacing:'-0.025em', lineHeight:1.05, color:'var(--fg-1)', textWrap:'balance', marginBottom:32 }}>
        Three things commodify on contact.
      </Editable>
      {[['tool','rented the moment it ships'],['skill','leased — teachable = tradeable'],['position','owned · the single exception']].map(([k,v],i)=>(
        <div key={i} style={{ display:'grid', gridTemplateColumns:'28px 1fr', gap:16, borderTop:'1px solid var(--border)', paddingTop:16, paddingBottom:16, alignItems:'baseline' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.14em', color:'var(--fg-3)' }}>0{i+1}</span>
          <div>
            <Editable as="span" style={{ fontFamily:'var(--font-display)', fontSize:44, fontWeight:600, letterSpacing:'-0.02em', lineHeight:1, color: i===2?'var(--accent)':'var(--fg-1)', display:'block' }}>{k}</Editable>
            <Editable as="span" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:22, color:'var(--fg-2)' }}>{v}</Editable>
          </div>
        </div>
      ))}
    </V9W>
  );
}

function V9_03({ n, brand }) {
  return (
    <V9W n={n} brand={brand}>
      <div style={{ borderBottom:'1px solid var(--border)', paddingBottom:32, marginBottom:32 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>replaceable</div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:168, letterSpacing:'-0.05em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
          do.
        </Editable>
      </div>
      <div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>irreplaceable</div>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:168, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>
          see.
        </Editable>
      </div>
    </V9W>
  );
}

function V9_04({ n, brand }) {
  return (
    <V9W n={n} brand={brand} img={<Img id="v9-04-img" shape="rect" radius={0} placeholder="layers · depth" style={{ width:'100%', height:'100%' }} />}>
      {[['01','tool','rented'],['02','skill','leased'],['03','position','owned · compounds']].map(([num,k,sub],i)=>(
        <div key={i} style={{ display:'grid', gridTemplateColumns:'32px 1fr', gap:16, borderTop:'1px solid var(--border)', paddingTop:18, paddingBottom:18, alignItems:'baseline' }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.14em', color:'var(--fg-3)' }}>{num}</span>
          <div>
            <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize: i===2?112:80, letterSpacing:'-0.04em', lineHeight:1, color: i===2?'var(--accent)':'var(--fg-1)' }}>{k}</Editable>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.12em', textTransform:'uppercase', color: i===2?'var(--accent)':'var(--fg-3)', marginTop:6 }}>{sub}</div>
          </div>
        </div>
      ))}
    </V9W>
  );
}

function V9_05({ n, brand }) {
  return (
    <V9W n={n} brand={brand}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(245,240,234,0.45)', marginBottom:32 }}>03 of 03 · the bottom layer</div>
      <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:224, letterSpacing:'-0.055em', lineHeight:0.87, color:'var(--accent)' }}>
        OWNED.
      </Editable>
      <div style={{ marginTop:32, display:'flex', flexDirection:'column', gap:12 }}>
        {['tool is rented.','skill is leased.','position is owned.'].map((t,i)=>(
          <Editable key={i} as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:28, color: i===2?'var(--accent)':'rgba(245,240,234,0.55)', lineHeight:1.2 }}>{t}</Editable>
        ))}
      </div>
    </V9W>
  );
}

function V9_06({ n, brand }) {
  return (
    <V9W n={n} brand={brand} img={<Img id="v9-06-img" shape="rect" radius={0} placeholder="knife · craft" style={{ width:'100%', height:'100%' }} />}>
      <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:80, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-1)', textWrap:'balance', marginBottom:32 }}>
        Most advice optimises the{' '}
        <em style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', color:'var(--accent)' }}>wrong layer.</em>
      </Editable>
      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:0 }}>
        {['Faster output.','Sharper skills.','Cleaner delivery.','All upstairs.'].map((t,i)=>(
          <div key={i} style={{ borderTop:'1px solid var(--border)', padding:'12px 0' }}>
            <Editable as="span" style={{ fontFamily:'var(--font-sans)', fontSize:22, color: i===3?'var(--accent)':'var(--fg-2)' }}>{t}</Editable>
          </div>
        ))}
      </div>
    </V9W>
  );
}

function V9_07({ n, brand }) {
  return (
    <V9W n={n} brand={brand}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.24em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:28 }}>
        you'll know when someone says —
      </div>
      <div style={{ marginBottom:24 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:112, letterSpacing:'-0.04em', lineHeight:0.9, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
          function
        </Editable>
      </div>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>→ not that, but</div>
      <div style={{ display:'inline-flex', padding:'16px 28px', background:'var(--accent)', borderRadius:4 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:112, letterSpacing:'-0.04em', lineHeight:0.9, color:'var(--fg-inverse)' }}>
          category.
        </Editable>
      </div>
    </V9W>
  );
}

function V9_08({ n, brand }) {
  return (
    <V9W n={n} brand={brand} img={<Img id="v9-08-img" shape="rect" radius={0} placeholder="empty frame · window" style={{ width:'100%', height:'100%' }} />}>
      <div style={{ marginBottom:8 }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--accent)', padding:'7px 12px', border:'1px solid var(--accent)', borderRadius:999 }}>
          the pro move
        </span>
      </div>
      <div style={{ height:32 }} />
      <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:72, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)', textWrap:'balance' }}>
        don't get better at the work.
      </Editable>
      <div style={{ height:24 }} />
      <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:88, letterSpacing:'-0.02em', lineHeight:1, color:'var(--accent)', textWrap:'balance' }}>
        get better at framing it.
      </Editable>
    </V9W>
  );
}

function V9_09({ n, brand }) {
  return (
    <V9W n={n} brand={brand}>
      {[['tool','rented','var(--fg-3)'],['skill','leased','var(--fg-2)'],['position','owned','var(--accent)']].map(([w,sub,c],i)=>(
        <div key={i} style={{ borderTop:'1px solid var(--border)', paddingTop:20, paddingBottom:20 }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize: i===2?136:100, letterSpacing:'-0.045em', lineHeight:0.9, color:c }}>{w}</Editable>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.14em', textTransform:'uppercase', color: i===2?'var(--accent)':'var(--fg-3)', marginTop:8 }}>{sub}{i===2?' ← own this':''}</div>
        </div>
      ))}
      <div style={{ borderTop:'1px solid var(--accent)', paddingTop:16, marginTop:8 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:28, color:'var(--fg-1)', lineHeight:1.3 }}>
          compounding lives at the bottom layer.
        </Editable>
      </div>
    </V9W>
  );
}

function V9_10({ n, brand }) {
  return (
    <V9W n={n} brand={brand} img={<Img id="v9-10-img" shape="rect" radius={0} placeholder="portrait · direct" style={{ width:'100%', height:'100%' }} />}>
      <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:68, letterSpacing:'-0.025em', lineHeight:1.05, color:'var(--fg-1)', textWrap:'balance', marginBottom:28 }}>
        If this rewired something —
      </Editable>
      <div style={{ display:'flex', alignItems:'stretch', alignSelf:'flex-start', border:'2px solid var(--fg-1)', borderRadius:4, overflow:'hidden', marginBottom:28 }}>
        <span style={{ padding:'16px 22px', fontFamily:'var(--font-sans)', fontSize:20, color:'var(--fg-1)' }}>comment</span>
        <span style={{ padding:'16px 24px', fontFamily:'var(--font-mono)', fontSize:28, fontWeight:600, letterSpacing:'0.16em', color:'var(--fg-inverse)', background:'var(--accent)' }}>LAYERS</span>
      </div>
      <Editable as="p" style={{ fontFamily:'var(--font-sans)', fontSize:21, lineHeight:1.5, color:'var(--fg-2)', margin:0, marginBottom:20 }}>
        I'll DM you the 7-question audit for finding your irreplaceable layer.
      </Editable>
      <div style={{ fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', fontWeight:500 }}>+ follow for the next essay →</div>
    </V9W>
  );
}

const BOLD_V9 = [V9_01,V9_02,V9_03,V9_04,V9_05,V9_06,V9_07,V9_08,V9_09,V9_10];

// ══════════════════════════════════════════════════════════════
// V10 · DIAGONAL
// A diagonal rule runs across each slide. Type and content
// elements sit above and below the axis at slight angles.
// The angle creates forward momentum; each slide feels kinetic.
// ══════════════════════════════════════════════════════════════

function V10Diag({ onDark, flip }) {
  const c = onDark ? 'rgba(245,240,234,0.12)' : 'var(--border)';
  return (
    <div style={{
      position: 'absolute', left: -200, right: -200,
      top: flip ? '62%' : '38%',
      height: 1, background: c,
      transform: `rotate(${flip ? -22 : 22}deg)`,
      transformOrigin: 'center center',
      zIndex: 0
    }} />
  );
}

function V10Accent({ flip }) {
  return (
    <div style={{
      position: 'absolute', left: -200, right: -200,
      top: flip ? '64%' : '40%',
      height: 3, background: 'var(--accent)',
      transform: `rotate(${flip ? -22 : 22}deg)`,
      transformOrigin: 'center center',
      zIndex: 0, opacity: 0.7
    }} />
  );
}

function V10W({ n, brand, flip, img, children }) {
  const onDark = _BGC[n-1] === 'navy';
  return (
    <SlideFrame n={n} brand={brand} bg={_BGC[n-1]} showMark={n>1}>
      <V10Diag onDark={onDark} flip={flip} />
      <V10Accent flip={flip} />
      {img && <div style={{ position:'absolute', top:80, right:80, zIndex:0, borderRadius:4, overflow:'hidden' }}>{img}</div>}
      <div style={{ position:'absolute', top:56, left:64, zIndex:1 }}>
        <Eyebrow dot={false} style={onDark?{color:'rgba(245,240,234,0.5)'}:{}}>{_EYE_C[n-1]}</Eyebrow>
      </div>
      {children}
    </SlideFrame>
  );
}

function V10_01({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={false}>
      <div style={{ position:'absolute', left:80, top:'15%', zIndex:1 }}>
        <div style={{ transform:'rotate(-2deg)', transformOrigin:'left top' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:320, letterSpacing:'-0.055em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
            replaceable.
          </Editable>
        </div>
      </div>
      <div style={{ position:'absolute', right:80, bottom:'18%', zIndex:1, textAlign:'right' }}>
        <div style={{ transform:'rotate(-2deg)', transformOrigin:'right bottom' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:96, letterSpacing:'-0.02em', lineHeight:0.95, color:'var(--accent)' }}>
            structurally irreplaceable.
          </Editable>
        </div>
      </div>
    </V10W>
  );
}

function V10_02({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={true} img={<Img id="v10-02-img" shape="rect" radius={0} placeholder="industrial · tension" style={{ width:280, height:320 }} />}>
      <div style={{ position:'absolute', left:80, bottom:'44%', zIndex:1 }}>
        <div style={{ transform:'rotate(2deg)', transformOrigin:'left bottom' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:108, letterSpacing:'-0.035em', lineHeight:1, color:'var(--fg-1)', textWrap:'balance', maxWidth:600 }}>
            Every layer above position commodifies on contact.
          </Editable>
        </div>
      </div>
      <div style={{ position:'absolute', right:80, top:'20%', zIndex:1, textAlign:'right' }}>
        <div style={{ transform:'rotate(2deg)', transformOrigin:'right top' }}>
          {['tool → rented.','skill → leased.','position → owned.'].map((t,i)=>(
            <Editable key={i} as="div" style={{ fontFamily:'var(--font-mono)', fontSize:22, letterSpacing:'0.12em', textTransform:'uppercase', color: i===2?'var(--accent)':'var(--fg-3)', lineHeight:1.5 }}>{t}</Editable>
          ))}
        </div>
      </div>
    </V10W>
  );
}

function V10_03({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={false}>
      <div style={{ position:'absolute', left:80, top:'12%', zIndex:1 }}>
        <div style={{ transform:'rotate(-3deg)' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>output layer · replaceable</div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:260, letterSpacing:'-0.055em', lineHeight:0.87, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
            do.
          </Editable>
        </div>
      </div>
      <div style={{ position:'absolute', right:80, bottom:'12%', zIndex:1, textAlign:'right' }}>
        <div style={{ transform:'rotate(-3deg)', transformOrigin:'right bottom' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:12 }}>position layer · irreplaceable</div>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:260, letterSpacing:'-0.04em', lineHeight:0.87, color:'var(--accent)' }}>
            see.
          </Editable>
        </div>
      </div>
    </V10W>
  );
}

function V10_04({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={true} img={<Img id="v10-04-img" shape="rect" radius={0} placeholder="layers · structure" style={{ width:280, height:320 }} />}>
      <div style={{ position:'absolute', left:80, bottom:'44%', zIndex:1 }}>
        <div style={{ transform:'rotate(2deg)' }}>
          {[['tool','var(--fg-3)','rented'],['skill','var(--fg-2)','leased'],['position','var(--accent)','owned']].map(([w,c,s],i)=>(
            <div key={i} style={{ display:'flex', alignItems:'baseline', gap:20 }}>
              <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:120, letterSpacing:'-0.04em', lineHeight:0.9, color:c }}>{w}</Editable>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.14em', textTransform:'uppercase', color:c, opacity:0.7 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </V10W>
  );
}

function V10_05({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={false}>
      <div style={{ position:'absolute', left:80, top:'15%', zIndex:1 }}>
        <div style={{ transform:'rotate(-2deg)' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,240,234,0.45)', marginBottom:16 }}>03 of 03 · the only layer that compounds</div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:340, letterSpacing:'-0.055em', lineHeight:0.87, color:'var(--accent)' }}>
            OWNED.
          </Editable>
        </div>
      </div>
      <div style={{ position:'absolute', right:80, bottom:'18%', zIndex:1, textAlign:'right' }}>
        <div style={{ transform:'rotate(-2deg)', transformOrigin:'right bottom' }}>
          {['tool is rented.','skill is leased.','position is owned.'].map((t,i)=>(
            <Editable key={i} as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:28, color: i===2?'var(--accent)':'rgba(245,240,234,0.55)', lineHeight:1.4 }}>{t}</Editable>
          ))}
        </div>
      </div>
    </V10W>
  );
}

function V10_06({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={true} img={<Img id="v10-06-img" shape="rect" radius={0} placeholder="knife · sharpening" style={{ width:280, height:320 }} />}>
      <div style={{ position:'absolute', left:80, bottom:'44%', zIndex:1 }}>
        <div style={{ transform:'rotate(2deg)' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:108, letterSpacing:'-0.03em', lineHeight:1, color:'var(--fg-1)', textWrap:'balance', maxWidth:680 }}>
            Most advice sharpens the
          </Editable>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:108, letterSpacing:'-0.025em', lineHeight:1, color:'var(--accent)' }}>
            wrong layer.
          </Editable>
        </div>
      </div>
      <div style={{ position:'absolute', right:80, top:'20%', zIndex:1 }}>
        <div style={{ transform:'rotate(2deg)', transformOrigin:'right top', textAlign:'right', maxWidth:480 }}>
          <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize:22, lineHeight:1.5, color:'var(--fg-2)' }}>
            Faster at work that is, net net, more replaceable each year.
          </Editable>
        </div>
      </div>
    </V10W>
  );
}

function V10_07({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={false}>
      <div style={{ position:'absolute', left:80, top:'14%', zIndex:1 }}>
        <div style={{ transform:'rotate(-2deg)' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:16 }}>they'll describe you as a</div>
          <div style={{ display:'inline-block', background:'var(--accent)', padding:'12px 24px', borderRadius:4 }}>
            <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:200, letterSpacing:'-0.05em', lineHeight:0.9, color:'var(--fg-inverse)' }}>
              category.
            </Editable>
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', right:80, bottom:'18%', zIndex:1, textAlign:'right' }}>
        <div style={{ transform:'rotate(-2deg)', transformOrigin:'right bottom' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:10 }}>not a</div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:120, letterSpacing:'-0.04em', lineHeight:0.9, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
            function.
          </Editable>
        </div>
      </div>
    </V10W>
  );
}

function V10_08({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={true} img={<Img id="v10-08-img" shape="rect" radius={0} placeholder="empty frame · framing" style={{ width:280, height:320 }} />}>
      <div style={{ position:'absolute', left:80, bottom:'42%', zIndex:1 }}>
        <div style={{ transform:'rotate(3deg)' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-inverse)', background:'var(--accent)', padding:'8px 14px', display:'inline-block', marginBottom:20 }}>the pro move</div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:108, letterSpacing:'-0.035em', lineHeight:1, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)', textWrap:'balance', maxWidth:600 }}>
            get better at the work.
          </Editable>
        </div>
      </div>
      <div style={{ position:'absolute', right:80, top:'18%', zIndex:1, textAlign:'right' }}>
        <div style={{ transform:'rotate(3deg)', transformOrigin:'right top' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:96, letterSpacing:'-0.02em', lineHeight:1, color:'var(--accent)', textWrap:'balance', maxWidth:540 }}>
            get better at framing it.
          </Editable>
        </div>
      </div>
    </V10W>
  );
}

function V10_09({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={false}>
      <div style={{ position:'absolute', left:80, top:'12%', zIndex:1 }}>
        <div style={{ transform:'rotate(-2deg)' }}>
          <div style={{ display:'flex', gap:20, alignItems:'baseline' }}>
            {[['tool','var(--fg-3)'],['→','var(--fg-3)'],['skill','var(--fg-2)'],['→','var(--fg-2)'],['position','var(--accent)']].map(([w,c],i)=>(
              <Editable key={i} as="div" style={{ fontFamily: w==='→'?'var(--font-mono)':'var(--font-display)', fontWeight:700, fontSize: w==='→'?48:168, letterSpacing:'-0.05em', lineHeight:0.87, color:c }}>{w}</Editable>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', right:80, bottom:'18%', zIndex:1, textAlign:'right' }}>
        <div style={{ transform:'rotate(-2deg)', transformOrigin:'right bottom' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:44, color:'var(--fg-1)', lineHeight:1.3 }}>
            compounding lives at the bottom layer.
          </Editable>
        </div>
      </div>
    </V10W>
  );
}

function V10_10({ n, brand }) {
  return (
    <V10W n={n} brand={brand} flip={true}>
      <div style={{ position:'absolute', left:80, bottom:'44%', zIndex:1 }}>
        <div style={{ transform:'rotate(2deg)' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:88, letterSpacing:'-0.025em', lineHeight:1, color:'var(--fg-1)', textWrap:'balance', maxWidth:640, marginBottom:28 }}>
            If this rewired something —
          </Editable>
          <div style={{ display:'flex', alignItems:'stretch', alignSelf:'flex-start', border:'2px solid var(--fg-1)', borderRadius:4, overflow:'hidden' }}>
            <span style={{ padding:'16px 22px', fontFamily:'var(--font-sans)', fontSize:22, color:'var(--fg-1)' }}>comment</span>
            <span style={{ padding:'16px 26px', fontFamily:'var(--font-mono)', fontSize:28, fontWeight:600, letterSpacing:'0.16em', color:'var(--fg-inverse)', background:'var(--accent)' }}>LAYERS</span>
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', right:80, top:'20%', zIndex:1, textAlign:'right', maxWidth:440 }}>
        <div style={{ transform:'rotate(2deg)', transformOrigin:'right top' }}>
          <Editable as="p" style={{ fontFamily:'var(--font-sans)', fontSize:21, lineHeight:1.5, color:'var(--fg-2)', margin:0, marginBottom:16 }}>
            I'll DM you the 7-question audit for finding your irreplaceable layer.
          </Editable>
          <div style={{ fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', fontWeight:500 }}>+ follow for the next essay →</div>
        </div>
      </div>
    </V10W>
  );
}

const BOLD_V10 = [V10_01,V10_02,V10_03,V10_04,V10_05,V10_06,V10_07,V10_08,V10_09,V10_10];

// ══════════════════════════════════════════════════════════════
// V11 · OVERPRINT
// Two layers of the same key word: back layer = stroke-only
// (outline), front layer = solid fill. Creates depth/layering
// without any actual transparency — a print-inspired effect.
// ══════════════════════════════════════════════════════════════

function V11Over({ word, size, xBack, yBack, xFront, yFront, outlineColor, fillColor, italic }) {
  const fontBase = {
    fontFamily: italic ? 'var(--font-serif-editorial)' : 'var(--font-display)',
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: 700, fontSize: size, letterSpacing: '-0.05em', lineHeight: 0.87,
    whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none'
  };
  return (
    <div style={{ position:'relative', display:'inline-block' }}>
      {/* Stroke outline layer — behind */}
      <div style={{ ...fontBase, position:'absolute', left: xBack||0, top: yBack||0, color:'transparent', WebkitTextStroke:`2px ${outlineColor||'var(--accent)'}`, zIndex:0 }}>
        {word}
      </div>
      {/* Solid fill layer — in front */}
      <div style={{ ...fontBase, position:'relative', left: xFront||16, top: yFront||16, color: fillColor||'var(--fg-1)', zIndex:1 }}>
        {word}
      </div>
    </div>
  );
}

function V11W({ n, brand, img, children }) {
  const onDark = _BGC[n-1] === 'navy';
  return (
    <SlideFrame n={n} brand={brand} bg={_BGC[n-1]} showMark={n>1}>
      {img && <div style={{ position:'absolute', right:80, top:'50%', transform:'translateY(-50%)', zIndex:0 }}>{img}</div>}
      <div style={{ position:'absolute', top:56, left:64, zIndex:2 }}>
        <Eyebrow dot={false} style={onDark?{color:'rgba(245,240,234,0.5)'}:{}}>{_EYE_C[n-1]}</Eyebrow>
      </div>
      {children}
    </SlideFrame>
  );
}

function V11_01({ n, brand }) {
  return (
    <V11W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'16%', left:80 }}>
        <V11Over word="replaceable." size={220} xBack={0} yBack={0} xFront={18} yFront={18} outlineColor="var(--fg-3)" fillColor="var(--fg-1)" />
      </div>
      <div style={{ position:'absolute', bottom:'22%', left:80, right:80, zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'baseline', gap:20 }}>
          <span style={{ width:36, height:2, background:'var(--accent)', display:'inline-block', transform:'translateY(-7px)' }} />
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:64, letterSpacing:'-0.015em', lineHeight:1, color:'var(--accent)' }}>
            structurally irreplaceable.
          </Editable>
        </div>
      </div>
    </V11W>
  );
}

function V11_02({ n, brand }) {
  return (
    <V11W n={n} brand={brand} img={<Img id="v11-02-img" shape="rect" radius={2} placeholder="layers · tension" style={{ width:260, height:380 }} />}>
      <div style={{ position:'absolute', top:'18%', left:80, zIndex:1 }}>
        <V11Over word="tool" size={200} xBack={0} yBack={0} xFront={16} yFront={16} outlineColor="var(--fg-3)" fillColor="var(--fg-3)" />
        <V11Over word="skill" size={200} xBack={0} yBack={0} xFront={16} yFront={16} outlineColor="var(--fg-2)" fillColor="var(--fg-2)" />
        <V11Over word="position" size={200} xBack={0} yBack={0} xFront={16} yFront={16} outlineColor="var(--accent)" fillColor="var(--accent)" italic={false} />
      </div>
      <div style={{ position:'absolute', bottom:160, right:80, textAlign:'right', maxWidth:400, zIndex:2 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>only one compounds</Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:36, color:'var(--fg-1)', lineHeight:1.3 }}>
          position is the asset. everything else is overhead.
        </Editable>
      </div>
    </V11W>
  );
}

function V11_03({ n, brand }) {
  return (
    <V11W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'24%', left:80, zIndex:1 }}>
        <V11Over word="do." size={280} outlineColor="var(--fg-3)" fillColor="var(--fg-3)" />
      </div>
      <div style={{ position:'absolute', bottom:'24%', right:80, zIndex:1, textAlign:'right' }}>
        <V11Over word="see." size={280} outlineColor="var(--accent)" fillColor="var(--accent)" italic={true} />
      </div>
      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:2 }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:48, color:'var(--fg-3)' }}>→</span>
      </div>
    </V11W>
  );
}

function V11_04({ n, brand }) {
  return (
    <V11W n={n} brand={brand} img={<Img id="v11-04-img" shape="rect" radius={2} placeholder="foundations · structure" style={{ width:260, height:380 }} />}>
      <div style={{ position:'absolute', top:'15%', left:80, zIndex:1 }}>
        <V11Over word="tool" size={168} outlineColor="var(--fg-3)" fillColor="var(--fg-3)" />
        <div style={{ height:12 }} />
        <V11Over word="skill" size={168} outlineColor="var(--fg-2)" fillColor="var(--fg-2)" />
        <div style={{ height:12 }} />
        <V11Over word="position" size={168} outlineColor="var(--accent)" fillColor="var(--accent)" />
      </div>
      <div style={{ position:'absolute', right:80, bottom:200, textAlign:'right', maxWidth:380, zIndex:2 }}>
        {['rented · replaced quarterly','leased · replaced by a graduate','owned · the compounding asset'].map((t,i)=>(
          <div key={i} style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.12em', textTransform:'uppercase', color: i===2?'var(--accent)':'var(--fg-3)', marginBottom:16 }}>{t}</div>
        ))}
      </div>
    </V11W>
  );
}

function V11_05({ n, brand }) {
  return (
    <V11W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'20%', left:64, zIndex:1 }}>
        <V11Over word="OWNED." size={250} xBack={0} yBack={0} xFront={22} yFront={22} outlineColor="rgba(198,90,46,0.4)" fillColor="var(--accent)" />
      </div>
      <div style={{ position:'absolute', bottom:200, left:80, right:80, zIndex:2 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:24, borderTop:'1px solid rgba(245,240,234,0.2)', paddingTop:20 }}>
          {['tool is rented.','skill is leased.','position is owned.'].map((t,i)=>(
            <Editable key={i} as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:26, color: i===2?'var(--accent)':'rgba(245,240,234,0.55)', lineHeight:1.3 }}>{t}</Editable>
          ))}
        </div>
      </div>
    </V11W>
  );
}

function V11_06({ n, brand }) {
  return (
    <V11W n={n} brand={brand} img={<Img id="v11-06-img" shape="rect" radius={2} placeholder="knife · craft · wrong" style={{ width:260, height:380 }} />}>
      <div style={{ position:'absolute', top:'20%', left:80, zIndex:1 }}>
        <V11Over word="wrong." size={220} outlineColor="var(--fg-3)" fillColor="var(--fg-1)" />
      </div>
      <div style={{ position:'absolute', bottom:'22%', left:80, right:80, zIndex:2 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:52, color:'var(--accent)', lineHeight:1.1, textWrap:'balance', maxWidth:640 }}>
          Most advice sharpens the knife. Position is the moat.
        </Editable>
      </div>
    </V11W>
  );
}

function V11_07({ n, brand }) {
  return (
    <V11W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'15%', left:80, right:80, zIndex:1 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:20 }}>you'll know when someone says</div>
        <V11Over word="category." size={188} outlineColor="var(--accent)" fillColor="var(--accent)" italic={true} />
      </div>
      <div style={{ position:'absolute', bottom:'22%', left:80, right:80, zIndex:2 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:12 }}>not a</div>
        <V11Over word="function." size={128} outlineColor="var(--fg-3)" fillColor="var(--fg-3)" />
      </div>
    </V11W>
  );
}

function V11_08({ n, brand }) {
  return (
    <V11W n={n} brand={brand} img={<Img id="v11-08-img" shape="rect" radius={2} placeholder="frame · framing · vision" style={{ width:260, height:380 }} />}>
      <div style={{ position:'absolute', top:'16%', left:80, zIndex:1 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-inverse)', background:'var(--accent)', padding:'8px 14px', display:'inline-block', marginBottom:20 }}>the pro move</div>
        <V11Over word="frame it." size={200} outlineColor="var(--accent)" fillColor="var(--accent)" italic={true} />
      </div>
      <div style={{ position:'absolute', bottom:'20%', left:80, right:80, zIndex:2 }}>
        <V11Over word="the work." size={128} outlineColor="var(--fg-3)" fillColor="var(--fg-3)" />
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-3)', marginTop:12 }}>
          ↑ don't get better at this · get better at framing it
        </div>
      </div>
    </V11W>
  );
}

function V11_09({ n, brand }) {
  return (
    <V11W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'14%', left:80, zIndex:1 }}>
        <V11Over word="tool" size={188} outlineColor="var(--fg-3)" fillColor="var(--fg-3)" />
      </div>
      <div style={{ position:'absolute', top:'38%', left:80, zIndex:1 }}>
        <V11Over word="skill" size={188} outlineColor="var(--fg-2)" fillColor="var(--fg-2)" />
      </div>
      <div style={{ position:'absolute', bottom:'14%', left:80, right:80, zIndex:1 }}>
        <V11Over word="position" size={188} outlineColor="var(--accent)" fillColor="var(--accent)" />
        <div style={{ zIndex:2, marginTop:8, borderTop:'2px solid var(--accent)', paddingTop:14 }}>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:30, color:'var(--fg-1)', lineHeight:1.3 }}>
            compounding lives at the bottom layer.
          </Editable>
        </div>
      </div>
    </V11W>
  );
}

function V11_10({ n, brand }) {
  return (
    <V11W n={n} brand={brand}>
      <div style={{ position:'absolute', top:'18%', left:80, zIndex:1 }}>
        <V11Over word="LAYERS" size={200} xBack={0} yBack={0} xFront={18} yFront={18} outlineColor="var(--accent)" fillColor="var(--accent)" />
      </div>
      <div style={{ position:'absolute', bottom:'20%', left:80, right:80, zIndex:2, display:'flex', flexDirection:'column', gap:20 }}>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:52, letterSpacing:'-0.02em', lineHeight:1.05, color:'var(--fg-1)', textWrap:'balance', maxWidth:640 }}>
          Comment LAYERS — I'll DM you the 7-question audit.
        </Editable>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:14, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-3)', fontWeight:500 }}>
          + follow for the next essay →
        </div>
      </div>
    </V11W>
  );
}

const BOLD_V11 = [V11_01,V11_02,V11_03,V11_04,V11_05,V11_06,V11_07,V11_08,V11_09,V11_10];

Object.assign(window, { BOLD_V9, BOLD_V10, BOLD_V11 });
