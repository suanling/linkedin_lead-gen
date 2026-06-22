// slide-frame.jsx — shared chrome for every LinkedIn carousel slide.
// Slide is a 1080×1080 square. SlideFrame supplies: counter (01/10),
// swipe hint, optional logo mark, and the brand wrapper.
// All headline + body copy uses an Editable shim so the user can retype
// in place. Edits are session-only (the file is the source of truth).

const SLIDE_W = 1080;
const SLIDE_H = 1080;

// Inline-editable text. Click to type. White-space preserved.
function Editable({ as: Tag = 'span', children, className, style, multiline = false, ...rest }) {
  return (
    <Tag
      className={className}
      style={{ ...style, outline: 'none' }}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Slide counter (01 / 10). Mono, tracked.
function SlideCounter({ n, total = 10, tone = 'auto', style }) {
  const pad = (x) => String(x).padStart(2, '0');
  const color =
    tone === 'dark'
      ? 'rgba(245,240,234,0.7)'
      : tone === 'accent'
      ? 'var(--accent)'
      : 'var(--fg-3)';
  return (
    <div
      style={{
        position: 'absolute',
        top: 56,
        right: 64,
        fontFamily: 'var(--font-mono)',
        fontSize: 16,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color,
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        ...style,
      }}
    >
      <span style={{ color: tone === 'dark' ? 'var(--fg-inverse)' : 'var(--fg-1)' }}>
        {pad(n)}
      </span>
      <span style={{ width: 24, height: 1, background: 'currentColor', opacity: 0.4 }} />
      <span>{pad(total)}</span>
    </div>
  );
}

// Swipe hint bottom-right. Slide 10 swaps to CTA prompt.
function SwipeHint({ n, total = 10, tone = 'auto' }) {
  const isLast = n === total;
  const color =
    tone === 'dark' ? 'rgba(245,240,234,0.7)' : 'var(--fg-2)';
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 56,
        right: 64,
        display: 'flex',
        alignItems: 'baseline',
        gap: 10,
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
        fontWeight: 500,
      }}
    >
      {isLast ? (
        <React.Fragment>
          <span>comment</span>
          <strong style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.16em' }}>
            LAYERS
          </strong>
          <span style={{ fontSize: 20, lineHeight: 1, transform: 'translateY(2px)' }}>↓</span>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span>swipe</span>
          <span style={{ fontSize: 22, lineHeight: 1, transform: 'translateY(2px)' }}>→</span>
        </React.Fragment>
      )}
    </div>
  );
}

// Brand mark bottom-left (omitted on slide 1). Uses Lumina mark + small text;
// in Suan Ling mode swaps to a quiet "suan ling" wordmark in Caveat.
function BrandMark({ brand, tone = 'auto' }) {
  const onDark = tone === 'dark';
  if (brand === 'sl') {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          left: 64,
          fontFamily: 'var(--font-hand)',
          fontSize: 32,
          fontWeight: 600,
          color: onDark ? 'var(--fg-inverse)' : 'var(--accent)',
          letterSpacing: '0.01em',
          lineHeight: 1,
        }}
      >
        suan ling
      </div>
    );
  }
  // Lumina: mark + tiny wordmark
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 56,
        left: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        color: onDark ? 'var(--fg-inverse)' : 'var(--fg-1)',
      }}
    >
      <img
        src={
          onDark
            ? 'design-system/assets/lumina-clarity-logo-mark-white.svg'
            : 'design-system/assets/lumina-clarity-logo-mark.svg'
        }
        alt=""
        style={{ width: 22, height: 22, display: 'block' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 15,
            letterSpacing: '0.02em',
          }}
        >
          lumina
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 9,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: onDark ? 'rgba(245,240,234,0.55)' : 'var(--fg-3)',
          }}
        >
          clarity
        </span>
      </div>
    </div>
  );
}

// The frame itself. tone controls counter/swipe/mark color against bg.
// bg: 'cream' | 'mist' | 'navy' | 'paper' (paper = sl ivory elevated)
function SlideFrame({
  n,
  total = 10,
  brand = 'lc',
  bg = 'cream',
  showMark = true,
  showSwipe = true,
  showCounter = true,
  children,
  style = {},
}) {
  const bgMap = {
    cream: brand === 'sl' ? 'var(--sl-ivory)' : 'var(--lc-warm-cream)',
    mist: brand === 'sl' ? 'var(--sl-mist)' : 'var(--lc-mist)',
    navy: brand === 'sl' ? 'var(--sl-ink)' : 'var(--lc-ink-navy)',
    paper: brand === 'sl' ? 'var(--sl-paper)' : 'var(--lc-soft-white)',
  };
  const tone = bg === 'navy' ? 'dark' : 'auto';
  return (
    <div
      data-brand={brand === 'sl' ? 'suan-ling' : undefined}
      style={{
        position: 'relative',
        width: SLIDE_W,
        height: SLIDE_H,
        background: bgMap[bg],
        color: bg === 'navy' ? 'var(--fg-inverse)' : 'var(--fg-1)',
        fontFamily: 'var(--font-sans)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <PlayfulBg n={n} bg={bg} />
      <PlayfulMark n={n} onDark={tone === 'dark'} />
      {children}
      {showCounter && <SlideCounter n={n} total={total} tone={tone} />}}
      {showMark && <BrandMark brand={brand} tone={tone} />}
      {showSwipe && <SwipeHint n={n} total={total} tone={tone} />}
    </div>
  );
}

// Eyebrow — small uppercase label with optional terracotta dot
function Eyebrow({ children, dot = true, style }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--fg-2)',
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
          }}
        />
      )}
      <span>{children}</span>
    </div>
  );
}

// Editorial pull-quote — Bodoni italic, large
function PullQuote({ children, size = 88, style }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-serif-editorial)',
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: size,
        lineHeight: 1.05,
        letterSpacing: '-0.015em',
        textWrap: 'balance',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Playful decoration system ───────────────────────────────
// Each of the 10 beats gets a distinct graphic mark layered behind
// content. Dark slides get softened opacity versions.

function PlayfulMark({ n, onDark }) {
  const TC = '#C65A2E'; // terracotta
  const LI = onDark ? 'rgba(245,240,234,0.16)' : 'rgba(7,39,62,0.09)';
  const ps = { position:'absolute', pointerEvents:'none', zIndex:0, userSelect:'none', display:'block' };

  if (n === 1) return (
    <svg style={{ ...ps, top:-40, left:24, width:240, height:240 }} viewBox="0 0 240 240">
      <circle cx="120" cy="120" r="108" fill="none" stroke={TC} strokeWidth="3" opacity="0.18"/>
      <circle cx="120" cy="120" r="76" fill="none" stroke={TC} strokeWidth="1.5" opacity="0.12"/>
      <circle cx="196" cy="44" r="16" fill={TC} opacity="0.38"/>
    </svg>
  );
  if (n === 2) return (
    <svg style={{ ...ps, bottom:72, right:48, width:52, height:116 }} viewBox="0 0 52 116">
      <circle cx="26" cy="96" r="7" fill={LI}/>
      <circle cx="26" cy="60" r="10" fill={LI}/>
      <circle cx="26" cy="18" r="15" fill={TC} opacity="0.45"/>
    </svg>
  );
  if (n === 3) return (
    <svg style={{ ...ps, top:170, right:36, width:96, height:96 }} viewBox="0 0 96 96">
      <line x1="8" y1="80" x2="80" y2="8" stroke={LI} strokeWidth="1" strokeLinecap="round"/>
      <line x1="28" y1="88" x2="96" y2="16" stroke={LI} strokeWidth="1" strokeLinecap="round"/>
      <line x1="52" y1="96" x2="96" y2="52" stroke={TC} strokeWidth="2.5" opacity="0.4" strokeLinecap="round"/>
    </svg>
  );
  if (n === 4) return (
    <svg style={{ ...ps, bottom:100, right:52, width:84, height:60 }} viewBox="0 0 84 60">
      <rect x="0" y="0" width="60" height="10" rx="3" fill={LI} opacity="0.6"/>
      <rect x="0" y="22" width="42" height="10" rx="3" fill={LI} opacity="0.75"/>
      <rect x="0" y="44" width="84" height="14" rx="3" fill={TC} opacity="0.45"/>
    </svg>
  );
  if (n === 5) return (
    <svg style={{ ...ps, top:44, left:44, width:88, height:88 }} viewBox="0 0 88 88">
      {[0,30,60,90,120,150].map((a, i) => {
        const rad = a * Math.PI / 180;
        return <line key={i} x1={44+Math.cos(rad)*8} y1={44+Math.sin(rad)*8} x2={44+Math.cos(rad)*38} y2={44+Math.sin(rad)*38} stroke={TC} strokeWidth="3" opacity="0.45" strokeLinecap="round"/>;
      })}
      <circle cx="44" cy="44" r="7" fill={TC} opacity="0.55"/>
    </svg>
  );
  if (n === 6) return (
    <svg style={{ ...ps, bottom:148, right:56, width:112, height:36 }} viewBox="0 0 112 36">
      <path d="M4,18 Q14,4 24,18 Q34,32 44,18 Q54,4 64,18 Q74,32 84,18 Q94,4 108,14" fill="none" stroke={TC} strokeWidth="2.5" opacity="0.42" strokeLinecap="round"/>
    </svg>
  );
  if (n === 7) return (
    <svg style={{ ...ps, top:'calc(50% - 24px)', right:52, width:48, height:48 }} viewBox="0 0 48 48">
      <path d="M6,24 L38,24 M28,12 L38,24 L28,36" fill="none" stroke={TC} strokeWidth="3" opacity="0.45" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (n === 8) return (
    <svg style={{ ...ps, bottom:80, right:52, width:100, height:100 }} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="44" fill="none" stroke={LI} strokeWidth="1.5"/>
      <circle cx="50" cy="50" r="30" fill="none" stroke={LI} strokeWidth="1.5"/>
      <circle cx="50" cy="50" r="16" fill="none" stroke={TC} strokeWidth="2.5" opacity="0.4"/>
      <circle cx="50" cy="50" r="5" fill={TC} opacity="0.6"/>
    </svg>
  );
  if (n === 9) return (
    <svg style={{ ...ps, top:44, right:52, width:56, height:56 }} viewBox="0 0 56 56">
      <path d="M0,22 L0,0 L22,0" fill="none" stroke={TC} strokeWidth="2.5" opacity="0.42" strokeLinecap="round"/>
      <path d="M34,0 L56,0 L56,22" fill="none" stroke={TC} strokeWidth="2.5" opacity="0.42" strokeLinecap="round"/>
      <path d="M56,34 L56,56 L34,56" fill="none" stroke={LI} strokeWidth="2" strokeLinecap="round"/>
      <path d="M22,56 L0,56 L0,34" fill="none" stroke={LI} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  if (n === 10) return (
    <svg style={{ ...ps, bottom:64, left:56, width:88, height:88 }} viewBox="0 0 88 88">
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const rad = a * Math.PI / 180;
        const dist = i % 2 === 0 ? 32 : 22;
        return <circle key={i} cx={44+Math.cos(rad)*dist} cy={44+Math.sin(rad)*dist} r={i%2===0?4:3} fill={TC} opacity={0.3+(i%3)*0.12}/>;
      })}
      <circle cx="44" cy="44" r="8" fill={TC} opacity="0.65"/>
    </svg>
  );
  return null;
}

// Terracotta corner splash — hook, mid-point, CTA
function PlayfulBg({ n, bg }) {
  if (bg === 'navy') return null;
  const s = { position:'absolute', background:'#C65A2E', zIndex:0, pointerEvents:'none' };
  if (n === 1)  return <div style={{ ...s, top:0, right:0, width:400, height:400, borderRadius:'0 0 0 100%', opacity:0.055 }}/>;
  if (n === 5)  return <div style={{ ...s, bottom:0, left:0, width:320, height:320, borderRadius:'0 100% 0 0', opacity:0.055 }}/>;
  if (n === 10) return <div style={{ ...s, bottom:0, right:0, width:280, height:280, borderRadius:'100% 0 0 0', opacity:0.07 }}/>;
  return null;
}

// Handwritten Caveat annotation
function HandNote({ children, color = '#C65A2E', size = 36, style }) {
  return (
    <div style={{ fontFamily:'var(--font-hand)', fontSize:size, fontWeight:600, color, lineHeight:1.1, letterSpacing:'0.01em', ...style }}>
      {children}
    </div>
  );
}

// Inline colour-highlight chip — a word on a coloured background
function ColorPop({ children, bg = '#C65A2E', fg = '#FAF8F5', px = 16, py = 4, radius = 4, style }) {
  return (
    <span style={{ background:bg, color:fg, padding:`${py}px ${px}px`, borderRadius:radius, display:'inline-block', ...style }}>
      {children}
    </span>
  );
}

// Drop-in image slot via the <image-slot> web component
function Img({ id, placeholder, shape = 'rect', radius, style }) {
  return (
    <image-slot
      id={id}
      placeholder={placeholder}
      shape={shape}
      radius={radius}
      style={{ display: 'block', ...style }}
    />
  );
}

Object.assign(window, {
  SLIDE_W,
  SLIDE_H,
  Editable,
  SlideCounter,
  SwipeHint,
  BrandMark,
  SlideFrame,
  Eyebrow,
  PullQuote,
  Img,
  PlayfulMark,
  PlayfulBg,
  HandNote,
  ColorPop,
});
