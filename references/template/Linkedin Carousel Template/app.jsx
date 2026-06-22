// app.jsx — Bold × Lumina Clarity: original (V1) + 10 layout variants (V2–V11)

const VARIANT_META = [
  { id:'v1',  label:'V1 · Original',       sub:'Type-as-image. Strikethrough hook, 3-tier color-block framework. The reference.', slides: () => BOLD_SLIDES },
  { id:'v2',  label:'V2 · Bleed',          sub:'Type at 300–480px, cropped at slide boundaries. The cut is the composition.',       slides: () => BOLD_V2 },
  { id:'v5',  label:'V5 · Ruled',          sub:'7 horizontal rules at 132px intervals. Ledger/stave structure. Type interrupts.',     slides: () => BOLD_V5 },
  { id:'v6',  label:'V6 · Numeral',        sub:'Slide counter at 660px / 7% opacity as background texture. Depth without imagery.',  slides: () => BOLD_V6 },
  { id:'v7',  label:'V7 · Max Reduce',     sub:'1–3 words at absolute maximum scale. Space is the statement.',                       slides: () => BOLD_V7 },
  { id:'v8',  label:'V8 · Poster',         sub:'Centered vertical stack: category → big → medium → detail. Fight-card hierarchy.',   slides: () => BOLD_V8 },
  { id:'v9',  label:'V9 · Swiss Grid',     sub:'3-column grid with visible vertical rules. Col 1: index. Col 2: content. Col 3: aside.', slides: () => BOLD_V9 },
  { id:'v10', label:'V10 · Diagonal',      sub:'A 22° rule crosses each slide. Content above + below at ±2–3° — kinetic energy.',   slides: () => BOLD_V10 },
  { id:'v11', label:'V11 · Overprint',     sub:'Stroke-only outline layer behind solid fill. Print-inspired depth, no transparency.', slides: () => BOLD_V11 },
  { id:'v12', label:'V12 · Playful',        sub:'Grid bg · number badges · ALL CAPS + highlight chips · bold labels · arrow nav. Reference: Francis Wolff / Miro Rada.', slides: () => BOLD_V12 },
];

const SLIDE_LABELS = [
  'hook','tension','do→see','three layers','owned',
  'wrong layer','the tell','pro move','screenshot','cta'
];

function CarouselSection({ meta }) {
  const slides = meta.slides();
  return (
    <DCSection id={meta.id} title={meta.label} subtitle={meta.sub}>
      {slides.map((Comp, i) => (
        <DCArtboard
          key={`${meta.id}-${i+1}`}
          id={`${meta.id}-${i+1}`}
          label={`${String(i+1).padStart(2,'0')} · ${SLIDE_LABELS[i]}`}
          width={1080}
          height={1080}
        >
          <Comp n={i+1} brand="lc" />
        </DCArtboard>
      ))}
    </DCSection>
  );
}

function App() {
  return (
    <DesignCanvas>
      {VARIANT_META.map(meta => (
        <CarouselSection key={meta.id} meta={meta} />
      ))}
    </DesignCanvas>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
