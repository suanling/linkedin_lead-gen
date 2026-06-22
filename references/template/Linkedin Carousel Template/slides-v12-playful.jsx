// slides-v12-playful.jsx — V12 · PLAYFUL
// Reference: bold editorial carousel (Francis Wolff / Miro Rada style)
// Grid bg · Number badge (top-left) · ALL CAPS + highlight chip · Bold labels · Arrow nav

// ── Shared primitives ─────────────────────────────────────────

function P12Grid({ dark }) {
  const c = dark ? 'rgba(245,240,234,0.08)' : 'rgba(7,39,62,0.065)';
  return (
    <div style={{
      position:'absolute', inset:0, zIndex:0, pointerEvents:'none',
      backgroundImage:`linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`,
      backgroundSize:'58px 58px',
    }} />
  );
}

// Dark rounded-square badge — number or label
function P12Badge({ label, bg='#07273E', fg='#FAF8F5', size=88, fontSize }) {
  return (
    <div style={{
      width:size, height:size, background:bg, flexShrink:0,
      borderRadius:Math.round(size * 0.22),
      display:'flex', alignItems:'center', justifyContent:'center',
      boxShadow:'0 6px 24px rgba(7,39,62,0.22)',
    }}>
      <span style={{
        fontFamily:'var(--font-display)', fontWeight:700,
        fontSize: fontSize || Math.round(size * 0.48),
        letterSpacing:'-0.03em', lineHeight:1, color:fg,
      }}>{label}</span>
    </div>
  );
}

// Pill tag — "Here's how:" / "The pro move" etc.
function P12Pill({ children, bg='var(--accent)', fg='var(--fg-inverse)', style }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', background:bg, color:fg, borderRadius:999, padding:'9px 20px', fontFamily:'var(--font-sans)', fontWeight:700, fontSize:16, letterSpacing:'0.04em', alignSelf:'flex-start', ...style }}>
      {children}
    </div>
  );
}

// Bold-label body item — "What it is:" + body
function P12Item({ label, children, accent, style }) {
  return (
    <div style={{ ...style }}>
      <span style={{ fontFamily:'var(--font-sans)', fontWeight:700, fontSize:22, color: accent ? 'var(--accent)' : 'var(--fg-1)' }}>
        {label}{' '}
      </span>
      <span style={{ fontFamily:'var(--font-sans)', fontSize:22, lineHeight:1.5, color:'var(--fg-2)' }}>
        {children}
      </span>
    </div>
  );
}

// Highlighted word inline
function P12Hi({ children, bg='var(--accent)', fg='var(--fg-inverse)', radius=8, px=14, py=2 }) {
  return (
    <span style={{ background:bg, color:fg, padding:`${py}px ${px}px`, borderRadius:radius, display:'inline-block', lineHeight:1.2 }}>
      {children}
    </span>
  );
}

// Callout box (like "Here's how:" or "Why it matters:")
function P12Box({ label, children, bg='rgba(198,90,46,0.09)', border='var(--accent)', dark=false }) {
  const tc = dark ? 'rgba(245,240,234,0.6)' : 'var(--fg-2)';
  return (
    <div style={{ background:bg, border:`1.5px solid ${border}`, borderRadius:12, padding:'18px 24px', display:'flex', flexDirection:'column', gap:8 }}>
      {label && (
        <P12Pill bg="var(--accent)" style={{ alignSelf:'flex-start', fontSize:14, padding:'5px 14px' }}>{label}</P12Pill>
      )}
      <div style={{ fontFamily:'var(--font-sans)', fontSize:21, lineHeight:1.5, color:tc }}>
        {children}
      </div>
    </div>
  );
}

// Bottom bar: author left · counter + arrow right
function P12Bar({ n, brand, dark }) {
  const bc  = dark ? 'rgba(245,240,234,0.1)'  : 'rgba(7,39,62,0.1)';
  const tc  = dark ? 'rgba(245,240,234,0.65)' : 'var(--fg-2)';
  const mc  = dark ? 'rgba(245,240,234,0.45)' : 'var(--fg-3)';
  const navBorder = dark ? 'rgba(245,240,234,0.3)' : 'var(--border-strong)';
  const navArrow  = dark ? 'rgba(245,240,234,0.7)' : 'var(--fg-2)';
  const isLast = n === 10;
  return (
    <div style={{ position:'absolute', bottom:0, left:0, right:0, height:88, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 56px', borderTop:`1px solid ${bc}`, zIndex:10 }}>
      {/* Author */}
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <img
          src={dark ? 'design-system/assets/lumina-clarity-logo-mark-white.svg' : 'design-system/assets/lumina-clarity-logo-mark.svg'}
          alt="" style={{ width:26, height:26 }} />
        <span style={{ fontFamily:'var(--font-display)', fontWeight:500, fontSize:15, letterSpacing:'0.08em', textTransform:'uppercase', color:tc }}>
          {brand === 'sl' ? 'Suan Ling' : 'Lumina Clarity'}
        </span>
      </div>
      {/* Counter + nav */}
      <div style={{ display:'flex', alignItems:'center', gap:18 }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:14, letterSpacing:'0.12em', color:mc }}>
          {String(n).padStart(2,'0')} / 10
        </span>
        {isLast ? (
          /* "+" button on last slide = comment prompt */
          <div style={{ width:56, height:56, borderRadius:'50%', background:'var(--accent)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(198,90,46,0.35)' }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M13 5V21M5 13H21" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
        ) : (
          <div style={{ width:56, height:56, borderRadius:'50%', border:`2px solid ${navBorder}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M13 6L19 12L13 18" stroke={navArrow} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrapper — grid + bottom bar + content slot
function P12({ n, brand, bg='cream', children }) {
  const dark = bg === 'navy';
  return (
    <SlideFrame n={n} brand={brand} bg={bg} showMark={false} showSwipe={false} showCounter={false}>
      <P12Grid dark={dark} />
      <div style={{ position:'absolute', top:0, left:0, right:0, bottom:88, zIndex:1, overflow:'hidden' }}>
        {children}
      </div>
      <P12Bar n={n} brand={brand} dark={dark} />
    </SlideFrame>
  );
}

// ── 10 Slides ─────────────────────────────────────────────────

// 01 · HOOK — centered, big count badge, ALL CAPS headline, portrait image
function V12_01({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="cream">
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', padding:'40px 80px 24px', gap:28, textAlign:'center' }}>
        <P12Badge label="01" size={96} />
        <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:96, letterSpacing:'-0.04em', lineHeight:0.95, textTransform:'uppercase', textWrap:'balance' }}>
          <div>
            <Editable as="span" style={{ color:'var(--fg-1)' }}>Not the </Editable>
            <span style={{ color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)', fontStyle:'normal' }}>
              <Editable as="span">tool.</Editable>
            </span>
          </div>
          <div>
            <Editable as="span" style={{ color:'var(--fg-1)' }}>Not the </Editable>
            <span style={{ color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)', fontStyle:'normal' }}>
              <Editable as="span">skill.</Editable>
            </span>
          </div>
          <div style={{ marginTop:12 }}>
            <P12Hi px={20} py={6} radius={12}>
              <Editable as="span">The Position.</Editable>
            </P12Hi>
          </div>
        </div>
        <div style={{ fontFamily:'var(--font-sans)', fontSize:22, color:'var(--fg-2)', lineHeight:1.5, maxWidth:600 }}>
          <Editable as="span">The only layer in your career that actually compounds.</Editable>
        </div>
        <Img id="v12-01-img" shape="rounded" radius={20} placeholder="portrait · confident · direct gaze" style={{ width:240, height:240 }} />
      </div>
    </P12>
  );
}

// 02 · TENSION — badge + heading, numbered list with bold labels, image right
function V12_02({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="paper">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', height:'100%' }}>
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'48px 40px 32px 64px', gap:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:18 }}>
            <P12Badge label="3" size={80} />
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:28, letterSpacing:'-0.01em', lineHeight:1.1, color:'var(--fg-1)' }}>
              things that<br/>commodify on contact
            </div>
          </div>
          <div style={{ width:48, height:3, background:'var(--accent)', borderRadius:2 }} />
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              ['01','The tool —','rented the moment it ships.', false],
              ['02','The skill —','leased when it becomes teachable.', false],
              ['03','The position —','the one exception. It compounds.', true],
            ].map(([num,k,v,ac],i)=>(
              <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', borderLeft:`4px solid ${ac?'var(--accent)':'var(--border)'}`, paddingLeft:16, paddingTop:4, paddingBottom:4 }}>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg-3)', letterSpacing:'0.1em', flexShrink:0, paddingTop:4 }}>{num}</span>
                <div style={{ fontFamily:'var(--font-sans)', fontSize:21, lineHeight:1.4 }}>
                  <Editable as="strong" style={{ fontWeight:700, color:ac?'var(--accent)':'var(--fg-1)' }}>{k}</Editable>{' '}
                  <Editable as="span" style={{ color:'var(--fg-2)' }}>{v}</Editable>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:'relative', overflow:'hidden' }}>
          <Img id="v12-02-img" shape="rect" radius={0} placeholder="industrial · structure · tension" style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, var(--lc-soft-white) 0%, transparent 30%)' }} />
        </div>
      </div>
    </P12>
  );
}

// 03 · DO → SEE — two contrast blocks, bold label style
function V12_03({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="cream">
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', padding:'48px 72px', gap:24 }}>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <P12Badge label="03" size={72} fontSize={28} />
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:28, letterSpacing:'-0.01em', color:'var(--fg-1)', lineHeight:1.1 }}>
            The layer beneath
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {/* DO row */}
          <div style={{ display:'flex', gap:20, alignItems:'center', padding:'24px 32px', background:'var(--bg-muted)', borderRadius:14, border:'1.5px solid var(--border)' }}>
            <div style={{ width:6, alignSelf:'stretch', background:'var(--fg-3)', borderRadius:3, flexShrink:0 }} />
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:8 }}>Replaceable people sell what they</div>
              <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:80, letterSpacing:'-0.04em', lineHeight:0.9, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>
                do.
              </Editable>
            </div>
          </div>
          {/* SEE row */}
          <div style={{ display:'flex', gap:20, alignItems:'center', padding:'24px 32px', background:'rgba(198,90,46,0.07)', borderRadius:14, border:'2px solid var(--accent)' }}>
            <div style={{ width:6, alignSelf:'stretch', background:'var(--accent)', borderRadius:3, flexShrink:0 }} />
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:8 }}>Irreplaceable people sell what they</div>
              <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:80, letterSpacing:'-0.03em', lineHeight:0.9, color:'var(--accent)' }}>
                see.
              </Editable>
            </div>
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <HandNote size={30} color="var(--accent)" style={{ transform:'rotate(-2deg)' }}>the inflection point ↑</HandNote>
        </div>
      </div>
    </P12>
  );
}

// 04 · THREE LAYERS — stacked blocks framework + image
function V12_04({ n, brand }) {
  const rows = [
    { num:'01', k:'tool',     sub:'rented · replaced quarterly',      bg:'var(--bg-muted)',             bdr:'var(--border)',  fc:'var(--fg-3)', ac:false, sz:52 },
    { num:'02', k:'skill',    sub:'leased · replaced by a graduate',  bg:'var(--bg-muted)',             bdr:'var(--border)',  fc:'var(--fg-2)', ac:false, sz:52 },
    { num:'03', k:'position', sub:'owned · the compounding asset',    bg:'rgba(198,90,46,0.08)',        bdr:'var(--accent)', fc:'var(--accent)', ac:true, sz:72 },
  ];
  return (
    <P12 n={n} brand={brand} bg="paper">
      <div style={{ display:'flex', flexDirection:'column', height:'100%', padding:'48px 64px 32px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <P12Badge label="04" size={72} fontSize={28} />
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:28, letterSpacing:'-0.01em', lineHeight:1.1, color:'var(--fg-1)' }}>Three layers.<br/>Most live in the top two.</div>
          </div>
          <Img id="v12-04-img" shape="rounded" radius={16} placeholder="layers · depth · structure" style={{ width:120, height:120 }} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10, flex:1, justifyContent:'flex-end' }}>
          {rows.map((r,i)=>(
            <div key={i} style={{ background:r.bg, border:`1.5px solid ${r.bdr}`, borderRadius:12, padding:'16px 24px', display:'flex', alignItems:'center', gap:20, flex: r.ac ? 1.4 : 1, minHeight:0 }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.12em', color:'var(--fg-3)', flexShrink:0, width:28 }}>{r.num}</span>
              <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:r.sz, letterSpacing:'-0.03em', lineHeight:1, color:r.fc, flex:1, textTransform:'lowercase' }}>{r.k}</Editable>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.1em', textTransform:'uppercase', color:r.ac?'var(--accent)':'var(--fg-3)', textAlign:'right', maxWidth:200, lineHeight:1.4 }}>{r.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </P12>
  );
}

// 05 · OWNED — dark slide, big type, three cards below
function V12_05({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="navy">
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', padding:'48px 80px 24px', gap:32, textAlign:'center' }}>
        <P12Pill bg="var(--accent)">05 · What you actually own</P12Pill>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:220, letterSpacing:'-0.05em', lineHeight:0.85, color:'var(--accent)', textTransform:'uppercase' }}>
          OWNED.
        </Editable>
        <div style={{ display:'flex', gap:16, width:'100%' }}>
          {[['01','tool','is rented.', 'rgba(245,240,234,0.1)', 'rgba(245,240,234,0.45)','rgba(245,240,234,0.12)'],
            ['02','skill','is leased.', 'rgba(245,240,234,0.1)', 'rgba(245,240,234,0.6)', 'rgba(245,240,234,0.12)'],
            ['03','position','is owned.', 'rgba(198,90,46,0.18)', 'var(--accent)','rgba(198,90,46,0.4)']].map(([num,k,v,bg,c,bdr],i)=>(
            <div key={i} style={{ flex:1, background:bg, borderRadius:12, padding:'18px 20px', textAlign:'left', border:`1.5px solid ${bdr}` }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.14em', color:i===2?'var(--accent)':'rgba(245,240,234,0.4)', marginBottom:8 }}>{num}</div>
              <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:40, letterSpacing:'-0.025em', lineHeight:1, color:c, textTransform:'lowercase' }}>{k}</Editable>
              <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:20, color:c, lineHeight:1.3, marginTop:6 }}>{v}</Editable>
            </div>
          ))}
        </div>
      </div>
    </P12>
  );
}

// 06 · WRONG LAYER — image left, bold-label body right
function V12_06({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="cream">
      <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', height:'100%' }}>
        <div style={{ position:'relative', overflow:'hidden' }}>
          <Img id="v12-06-img" shape="rect" radius={0} placeholder="knife · sharpening · wrong layer" style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to left, var(--lc-warm-cream) 0%, transparent 30%)' }} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'48px 64px 32px 40px', gap:22 }}>
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <P12Badge label="06" size={72} fontSize={28} />
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:26, letterSpacing:'-0.01em', lineHeight:1.1 }}>Misallocated effort</div>
          </div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:52, letterSpacing:'-0.02em', lineHeight:1.05, textWrap:'balance' }}>
            Most advice targets the <P12Hi>wrong layer.</P12Hi>
          </Editable>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ borderLeft:'4px solid var(--border)', paddingLeft:16 }}>
              <P12Item label="What it does:">Teaches you to sharpen the knife — not to be the only one holding it.</P12Item>
            </div>
            <div style={{ borderLeft:'4px solid var(--accent)', paddingLeft:16 }}>
              <P12Item label="The cost:" accent>You get faster at work that is, net, more replaceable each year.</P12Item>
            </div>
          </div>
        </div>
      </div>
    </P12>
  );
}

// 07 · THE TELL — badge, quote in card, HandNote
function V12_07({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="mist">
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', padding:'48px 72px', gap:28 }}>
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          <P12Badge label="07" size={72} fontSize={28} />
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:26, letterSpacing:'-0.01em', lineHeight:1.1, color:'var(--fg-1)' }}>The tell</div>
        </div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)' }}>
          You know you've moved layers when —
        </div>
        <div style={{ background:'var(--lc-soft-white)', border:'1.5px solid var(--border)', borderRadius:16, padding:'36px 44px' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:60, letterSpacing:'-0.025em', lineHeight:1.1, textWrap:'balance' }}>
            Someone calls you a <P12Hi px={16} py={4} radius={8}>category</P12Hi>, not a <span style={{ color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)' }}>function</span>.
          </Editable>
        </div>
        <div style={{ display:'flex', justifyContent:'flex-end', alignItems:'center', gap:20 }}>
          <HandNote size={30} color="var(--accent)" style={{ transform:'rotate(-2deg)' }}>That's the signal ✓</HandNote>
        </div>
      </div>
    </P12>
  );
}

// 08 · PRO MOVE — strikethrough + correction + callout, image right
function V12_08({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="paper">
      <div style={{ display:'grid', gridTemplateColumns:'1.15fr 1fr', height:'100%' }}>
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'48px 40px 32px 64px', gap:24 }}>
          <P12Pill>✦ 08 · The pro move</P12Pill>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:60, letterSpacing:'-0.025em', lineHeight:1.05, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)', textWrap:'balance' }}>
              Get better at the work.
            </Editable>
            <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:64, letterSpacing:'-0.02em', lineHeight:1.0, color:'var(--accent)', textWrap:'balance' }}>
              Get better at framing it.
            </Editable>
          </div>
          <P12Box label="Why it matters">
            <Editable as="span">The frame decides what work counts. The framer is the last one a market lets go.</Editable>
          </P12Box>
        </div>
        <div style={{ position:'relative', overflow:'hidden' }}>
          <Img id="v12-08-img" shape="rect" radius={0} placeholder="empty frame · window · light" style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, var(--lc-soft-white) 0%, transparent 30%)' }} />
        </div>
      </div>
    </P12>
  );
}

// 09 · SCREENSHOT — numbered list, big type, HandNote
function V12_09({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="cream">
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', padding:'48px 72px', gap:24 }}>
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          <P12Badge label="↓" size={72} fontSize={34} />
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:26, letterSpacing:'-0.01em', color:'var(--fg-1)' }}>Screenshot this</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {[
            ['01','tool',    'Rented. Replaced quarterly.',        'var(--fg-3)', 52],
            ['02','skill',   'Leased. Replaced by a graduate.',    'var(--fg-2)', 52],
            ['03','position','Owned. The one that compounds.',     'var(--accent)', 80],
          ].map(([num,k,sub,c,sz],i)=>(
            <div key={i} style={{ display:'flex', gap:20, alignItems:'center', borderBottom:`${i===2?2:1}px solid ${i===2?'var(--accent)':'var(--border)'}`, padding:'18px 0' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, letterSpacing:'0.12em', color:'var(--fg-3)', width:28, flexShrink:0 }}>{num}</span>
              <div style={{ flex:1 }}>
                <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:sz, letterSpacing:'-0.04em', lineHeight:0.92, color:c, textTransform:'lowercase' }}>{k}</Editable>
                <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize:18, color:i===2?'var(--accent)':'var(--fg-3)', marginTop:4 }}>{sub}</Editable>
              </div>
              {i===2 && <HandNote size={26} color="var(--accent)" style={{ transform:'rotate(2deg)', flexShrink:0 }}>own this ←</HandNote>}
            </div>
          ))}
        </div>
        <div style={{ paddingTop:16, borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:28, color:'var(--fg-1)', lineHeight:1.3 }}>
            Compounding lives at the bottom layer.
          </Editable>
          <HandNote size={24} color="var(--fg-3)" style={{ transform:'rotate(-1deg)' }}>save this!</HandNote>
        </div>
      </div>
    </P12>
  );
}

// 10 · CTA — centered, LAYERS box, Here's what you get, follow
function V12_10({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="paper">
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', padding:'48px 80px 24px', gap:28, textAlign:'center' }}>
        <P12Badge label="10" size={96} />
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:72, letterSpacing:'-0.03em', lineHeight:1.05, textWrap:'balance', maxWidth:680 }}>
          If this rewired something —
        </Editable>
        <div style={{ display:'flex', alignItems:'stretch', border:'2.5px solid var(--fg-1)', borderRadius:14, overflow:'hidden', alignSelf:'center' }}>
          <span style={{ padding:'20px 28px', fontFamily:'var(--font-sans)', fontSize:26, color:'var(--fg-1)', background:'var(--bg-elevated)' }}>comment</span>
          <span style={{ padding:'20px 32px', fontFamily:'var(--font-mono)', fontSize:36, fontWeight:700, letterSpacing:'0.14em', color:'var(--fg-inverse)', background:'var(--accent)' }}>LAYERS</span>
        </div>
        <P12Box label="Here's what you get:" style={{ alignSelf:'stretch', textAlign:'left' }}>
          <Editable as="span">The 7-question audit for finding your own irreplaceable layer — DMed straight to you.</Editable>
        </P12Box>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <span style={{ width:32, height:1, background:'var(--fg-3)', display:'inline-block' }} />
          <span style={{ fontFamily:'var(--font-sans)', fontSize:15, fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-1)' }}>
            + follow for the next essay →
          </span>
          <span style={{ width:32, height:1, background:'var(--fg-3)', display:'inline-block' }} />
        </div>
        <HandNote size={30} color="var(--accent)" style={{ transform:'rotate(-1.5deg)', marginTop:-8 }}>see you in the next one ✓</HandNote>
      </div>
    </P12>
  );
}

const BOLD_V12 = [V12_01,V12_02,V12_03,V12_04,V12_05,V12_06,V12_07,V12_08,V12_09,V12_10];

Object.assign(window, { BOLD_V12 });
