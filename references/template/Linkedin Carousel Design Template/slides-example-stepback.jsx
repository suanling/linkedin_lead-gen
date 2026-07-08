// slides-example-stepback.jsx — Step Back copy in V12 Playful
// Grid bg · number badge · arrow nav · highlight chips
// NO labelled callout boxes — copy carries the weight

function Ex01Hook({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="cream">
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', padding:'64px 72px 32px', gap:28 }}>
        <P12Badge label="01" size={80} />
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:72, letterSpacing:'-0.03em', lineHeight:1.05, textWrap:'balance', maxWidth:820 }}>
          Stepping back was the{' '}
          <P12Hi px={18} py={5} radius={10}>hardest thing</P12Hi>{' '}
          I ever did in my business.
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:40, lineHeight:1.4, color:'var(--fg-2)', textWrap:'balance', maxWidth:700 }}>
          And I made it harder by trying to add my way out.
        </Editable>
      </div>
    </P12>
  );
}

function Ex02Tension({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="paper">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', height:'100%' }}>
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'64px 40px 40px 64px', gap:20 }}>
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <P12Badge label="02" size={72} fontSize={28} />
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:24, letterSpacing:'-0.01em', lineHeight:1.1, color:'var(--fg-1)' }}>why it got harder</div>
          </div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:48, letterSpacing:'-0.02em', lineHeight:1.1, textWrap:'balance' }}>
            I thought stepping back meant building <P12Hi>more.</P12Hi>
          </Editable>
          <div style={{ display:'flex', flexDirection:'column', gap:10, paddingLeft:4 }}>
            {['More systems.','More checks.','More handover docs — so it could finally run without me.'].map((t, i) => (
              <Editable key={i} as="div" style={{ fontFamily:'var(--font-sans)', fontSize:34, lineHeight:1.5, color: i === 2 ? 'var(--fg-1)' : 'var(--fg-3)' }}>{t}</Editable>
            ))}
          </div>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:36, lineHeight:1.45, color:'var(--fg-2)', borderTop:'1px solid var(--border)', paddingTop:16, textWrap:'balance' }}>
            It just gave me a bigger machine to stand in the middle of. Heavier, not freer.
          </Editable>
        </div>
        <div style={{ position:'relative', overflow:'hidden' }}>
          <Img id="ex-02-img" shape="rect" radius={0} placeholder="heavy machinery · still" style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, var(--lc-soft-white) 0%, transparent 30%)' }} />
        </div>
      </div>
    </P12>
  );
}

function Ex03Cut({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="navy">
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', padding:'64px 80px 40px', gap:24 }}>
        <P12Badge label="03" size={80} bg="rgba(198,90,46,0.9)" />
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:80, letterSpacing:'-0.03em', lineHeight:1.0, color:'rgba(245,240,234,0.95)', textWrap:'balance', maxWidth:820 }}>
          What actually let me step back was{' '}
          <span style={{ color:'var(--accent)' }}>cutting.</span>
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:34, lineHeight:1.5, color:'rgba(245,240,234,0.65)', textWrap:'balance', maxWidth:700 }}>
          So before you build anything, look for what to remove.
        </Editable>
      </div>
    </P12>
  );
}

function Ex04ThreeThings({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="cream">
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', padding:'64px 72px 40px', gap:24 }}>
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          <P12Badge label="04" size={72} fontSize={28} />
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:26, letterSpacing:'-0.01em', lineHeight:1.1, color:'var(--fg-1)' }}>
            three things tell you what to cut
          </Editable>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {[
            ["1", "The step you keep but can't explain why."],
            ["2", "The task that only moves when you touch it."],
            ["3", "The one you'd quietly drop if no one was watching."],
          ].map(([num, t], i) => (
            <div key={i} style={{ display:'flex', gap:20, alignItems:'baseline', borderBottom: i < 2 ? '1px solid var(--border)' : `2px solid var(--accent)`, padding:'20px 0' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color: i === 2 ? 'var(--accent)' : 'var(--fg-3)', letterSpacing:'0.1em', flexShrink:0, width:20 }}>{num}</span>
              <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize: i === 2 ? 24 : 22, fontWeight: i === 2 ? 600 : 400, lineHeight:1.45, color: i === 2 ? 'var(--fg-1)' : 'var(--fg-2)', textWrap:'balance' }}>{t}</Editable>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'flex-end' }}>
          <HandNote size={28} color="var(--accent)" style={{ transform:'rotate(-1.5deg)' }}>that's your list ↑</HandNote>
        </div>
      </div>
    </P12>
  );
}

function Ex05NothingBroke({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="mist">
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', padding:'64px 72px 40px', gap:24 }}>
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          <P12Badge label="05" size={72} fontSize={28} />
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:60, letterSpacing:'-0.025em', lineHeight:1.05, textWrap:'balance' }}>
          The first one I cut I'd defended for months.
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:60, letterSpacing:'-0.025em', lineHeight:1.05, color:'var(--accent)', textWrap:'balance' }}>
          I removed it, and nothing broke.
        </Editable>
        <div style={{ height:1, background:'var(--border)' }} />
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:40, lineHeight:1.4, color:'var(--fg-2)', textWrap:'balance', maxWidth:680 }}>
          The week got lighter. It needed less of me.
        </Editable>
        <HandNote size={26} color="var(--fg-3)" style={{ transform:'rotate(-0.8deg)' }}>
          nothing broke ✓
        </HandNote>
      </div>
    </P12>
  );
}

function Ex06Lighter({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="paper">
      <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', height:'100%' }}>
        <div style={{ position:'relative', overflow:'hidden' }}>
          <Img id="ex-06-img" shape="rect" radius={0} placeholder="open space · light" style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to left, var(--lc-soft-white) 0%, transparent 30%)' }} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'64px 64px 40px 40px', gap:24 }}>
          <div style={{ display:'flex', gap:16, alignItems:'center' }}>
            <P12Badge label="06" size={72} fontSize={28} />
          </div>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:52, letterSpacing:'-0.025em', lineHeight:1.1, textWrap:'balance' }}>
            The week got lighter, and it needed{' '}
            <P12Hi px={14} py={3} radius={8}>less of me.</P12Hi>
          </Editable>
          <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize:34, lineHeight:1.55, color:'var(--fg-2)', textWrap:'balance' }}>
            Not because I added a better system. Because I removed the step that only worked because I was there.
          </Editable>
          <HandNote size={26} color="var(--accent)" style={{ transform:'rotate(-1deg)' }}>
            that's the real unlock
          </HandNote>
        </div>
      </div>
    </P12>
  );
}

function Ex07WhatItIsnt({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="cream">
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', padding:'64px 72px 40px', gap:20 }}>
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          <P12Badge label="07" size={72} fontSize={28} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ padding:'24px 28px', background:'var(--bg-muted)', borderRadius:12 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-3)', marginBottom:10 }}>people think it is</div>
            <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:44, letterSpacing:'-0.02em', lineHeight:1.05, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)', textWrap:'balance' }}>
              Adding a better system.
            </Editable>
          </div>
          <div style={{ padding:'24px 28px', background:'rgba(198,90,46,0.07)', borderRadius:12, border:'2px solid var(--accent)' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:10 }}>what it actually is</div>
            <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:44, letterSpacing:'-0.018em', lineHeight:1.1, color:'var(--accent)', textWrap:'balance' }}>
              Deleting the step only you ever held up.
            </Editable>
          </div>
        </div>
      </div>
    </P12>
  );
}

function Ex08ProMove({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="paper">
      <div style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', height:'100%' }}>
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'64px 40px 40px 64px', gap:22 }}>
          <P12Pill style={{ alignSelf:'flex-start' }}>08 · the pro move</P12Pill>
          <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:48, letterSpacing:'-0.025em', lineHeight:1.1, color:'var(--fg-3)', textDecoration:'line-through', textDecorationColor:'var(--fg-3)', textWrap:'balance' }}>
            Get better at doing more.
          </Editable>
          <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontWeight:500, fontSize:52, letterSpacing:'-0.018em', lineHeight:1.1, color:'var(--accent)', textWrap:'balance' }}>
            Get better at removing what only you were holding up.
          </Editable>
          <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize:34, lineHeight:1.55, color:'var(--fg-2)', textWrap:'balance' }}>
            Take 20 minutes. Write every recurring task. Find the three. Remove one this week. Just one.
          </Editable>
        </div>
        <div style={{ position:'relative', overflow:'hidden' }}>
          <Img id="ex-08-img" shape="rect" radius={0} placeholder="open space · clearing" style={{ width:'100%', height:'100%', position:'absolute', inset:0 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, var(--lc-soft-white) 0%, transparent 30%)' }} />
        </div>
      </div>
    </P12>
  );
}

function Ex09Takeaway({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="cream">
      <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', height:'100%', padding:'64px 72px 40px', gap:20 }}>
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          <P12Badge label="↓" size={72} fontSize={34} />
          <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:24, color:'var(--fg-1)', lineHeight:1.2 }}>screenshot this</div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {[
            ["01", "Cut the step you keep but can't explain."],
            ["02", "Cut the task that only moves when you touch it."],
            ["03", "Start with the one you'd quietly drop."],
          ].map(([num, t], i) => (
            <div key={i} style={{ display:'flex', gap:20, alignItems:'baseline', borderBottom:`${i===2?2:1}px solid ${i===2?'var(--accent)':'var(--border)'}`, padding:'18px 0' }}>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:13, color: i===2?'var(--accent)':'var(--fg-3)', letterSpacing:'0.12em', width:28, flexShrink:0 }}>{num}</span>
              <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize: i===2?24:22, fontWeight: i===2?600:400, lineHeight:1.4, color: i===2?'var(--fg-1)':'var(--fg-2)', flex:1, textWrap:'balance' }}>{t}</Editable>
            </div>
          ))}
        </div>
        <Editable as="div" style={{ fontFamily:'var(--font-serif-editorial)', fontStyle:'italic', fontSize:38, color:'var(--fg-1)', lineHeight:1.35, textWrap:'balance', borderTop:'1px solid var(--border)', paddingTop:20 }}>
          Stepping back isn't about what you add. It's about what only you were holding up.
        </Editable>
      </div>
    </P12>
  );
}

function Ex10CTA({ n, brand }) {
  return (
    <P12 n={n} brand={brand} bg="paper">
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', padding:'64px 80px 40px', gap:24, textAlign:'center' }}>
        <P12Badge label="10" size={88} />
        <Editable as="div" style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:52, letterSpacing:'-0.025em', lineHeight:1.1, textWrap:'balance', maxWidth:720 }}>
          Comment below — one thing you would stop doing today.
        </Editable>
        <Editable as="div" style={{ fontFamily:'var(--font-sans)', fontSize:34, lineHeight:1.55, color:'var(--fg-2)', maxWidth:640, textWrap:'balance' }}>
          Not tomorrow. Not once the quarter is clearer. This week. One thing.
        </Editable>
        <div style={{ display:'flex', alignItems:'stretch', border:'2.5px solid var(--fg-1)', borderRadius:12, overflow:'hidden' }}>
          <span style={{ padding:'18px 24px', fontFamily:'var(--font-sans)', fontSize:22, color:'var(--fg-1)' }}>comment</span>
          <span style={{ padding:'18px 28px', fontFamily:'var(--font-mono)', fontSize:28, fontWeight:700, letterSpacing:'0.14em', color:'var(--fg-inverse)', background:'var(--accent)' }}>ONE THING</span>
        </div>
        <HandNote size={28} color="var(--accent)" style={{ transform:'rotate(-1.5deg)' }}>
          see you in the comments ↓
        </HandNote>
      </div>
    </P12>
  );
}

const EXAMPLE_STEPBACK = [
  Ex01Hook, Ex02Tension, Ex03Cut, Ex04ThreeThings, Ex05NothingBroke,
  Ex06Lighter, Ex07WhatItIsnt, Ex08ProMove, Ex09Takeaway, Ex10CTA,
];

Object.assign(window, { EXAMPLE_STEPBACK });
