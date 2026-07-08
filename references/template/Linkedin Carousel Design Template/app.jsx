// app.jsx — Bold × Lumina Clarity: original (V1) + 10 layout variants (V2–V11)

const VARIANT_META = [
  { id:'v1',  label:'V1 · Original',       sub:'Type-as-image. Strikethrough hook, 3-tier color-block framework. The reference.', slides: () => BOLD_SLIDES },
  { id:'v2',  label:'V2 · Bleed',          sub:'Type at 300–480px, cropped at slide boundaries. The cut is the composition.',       slides: () => BOLD_V2 },
  { id:'v5',  label:'V5 · Ruled',          sub:'7 horizontal rules at 132px intervals. Ledger/stave structure. Type interrupts.',     slides: () => BOLD_V5 },
  { id:'v6',  label:'V6 · Numeral',        sub:'Slide counter at 660px / 7% opacity as background texture. Depth without imagery.',  slides: () => BOLD_V6 },
  { id:'v8',  label:'V8 · Poster',         sub:'Centered vertical stack: category → big → medium → detail. Fight-card hierarchy.',   slides: () => BOLD_V8 },
  { id:'v9',  label:'V9 · Swiss Grid',     sub:'3-column grid with visible vertical rules. Col 1: index. Col 2: content. Col 3: aside.', slides: () => BOLD_V9 },
  { id:'v10', label:'V10 · Diagonal',      sub:'A 22° rule crosses each slide. Content above + below at ±2–3° — kinetic energy.',   slides: () => BOLD_V10 },
  { id:'v11', label:'V11 · Overprint',     sub:'Stroke-only outline layer behind solid fill. Print-inspired depth, no transparency.', slides: () => BOLD_V11 },
  { id:'ex',    label:'★ Example: Step Back (V12)',  sub:'Real copy in V12 · Playful layout. The reference example.',                            slides: () => EXAMPLE_STEPBACK },
  { id:'sb-v1',  label:'★ Step Back · V1 Original',   sub:'Key word as hero type. Supporting copy in serif italic.',                              slides: () => SB_V1 },
  { id:'sb-v2',  label:'★ Step Back · V2 Bleed',      sub:'Word bleeds off edge. Copy anchors bottom.',                                          slides: () => SB_V2 },
  { id:'sb-v5',  label:'★ Step Back · V5 Ruled',      sub:'7 stave rules. Full headline + body copy.',                                           slides: () => SB_V5 },
  { id:'sb-v6',  label:'★ Step Back · V6 Numeral',    sub:'Watermark slide number. Big headline + body.',                                        slides: () => SB_V6 },
  { id:'sb-v8',  label:'★ Step Back · V8 Poster',     sub:'Centered stack: eyebrow → word → rule → headline → body.',                                   slides: () => SB_V8 },
  { id:'sb-v9',  label:'★ Step Back · V9 Grid',       sub:'3-column Swiss grid. Word + headline + body in col 2.',                               slides: () => SB_V9 },
  { id:'sb-v10', label:'★ Step Back · V10 Diagonal',  sub:'22° crossing rule. Word above, copy below at angle.',                                   slides: () => SB_V10 },
  { id:'sb-v11', label:'★ Step Back · V11 Overprint',  sub:'Stroke + fill layered word. Copy anchors bottom.',                                    slides: () => SB_V11 },
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
