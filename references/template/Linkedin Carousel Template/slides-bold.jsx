// slides-bold.jsx — 10 bold-direction slides for the same carousel.
// Type-as-image. Massive single words, terracotta strikes, three-tier
// color blocks, mono framework grids. Built for thumbnail legibility
// — every slide is readable at 360px wide.

// ──────────────────────────────────────────────────────────────
// 01 · HOOK — massive struck-through word. Pure type.
// ──────────────────────────────────────────────────────────────
function Bo01Hook({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream" showMark={false}>
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>essay no. 01 · the leverage code™</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: '160px 64px 160px 64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block', alignSelf: 'flex-start' }}>
          <Editable
            as="div"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 232,
              letterSpacing: '-0.045em',
              lineHeight: 0.88,
              color: 'var(--fg-1)',
              textTransform: 'lowercase',
            }}
          >
            replaceable.
          </Editable>
          <span
            style={{
              position: 'absolute',
              left: -12,
              right: -12,
              top: '52%',
              height: 14,
              background: 'var(--accent)',
              transform: 'rotate(-2deg)',
              transformOrigin: 'left center',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div
          style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 32,
            alignItems: 'baseline',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 14,
              letterSpacing: '0.18em',
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
              paddingTop: 14,
            }}
          >
            or —
          </div>
          <Editable
            as="div"
            style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontStyle: 'italic',
              fontSize: 64,
              fontWeight: 500,
              lineHeight: 1.05,
              color: 'var(--accent)',
              letterSpacing: '-0.015em',
              textWrap: 'balance',
            }}
          >
            structurally irreplaceable.
          </Editable>
        </div>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 02 · TENSION — giant "01." mark, image right, statement below.
// ──────────────────────────────────────────────────────────────
function Bo02Tension({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="mist">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>why this matters</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 64,
          right: 64,
          bottom: 160,
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          gap: 48,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Editable
            as="div"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 320,
              fontWeight: 600,
              letterSpacing: '-0.05em',
              lineHeight: 0.85,
              color: 'var(--fg-1)',
            }}
          >
            01.
          </Editable>

          <div>
            <Editable
              as="h2"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 56,
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0,
                textWrap: 'balance',
              }}
            >
              Every layer above position commodifies on contact.
            </Editable>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <Img
            id="bo-02-img"
            shape="rect"
            radius={0}
            placeholder="industrial · stark"
            style={{ width: '100%', flex: 1, minHeight: 0 }}
          />
          <div
            style={{
              background: 'var(--fg-1)',
              color: 'var(--fg-inverse)',
              padding: '20px 24px',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>tool · skill · role</span>
            <span style={{ color: 'var(--accent)' }}>→ commodity</span>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 03 · VALUE 1 — DO vs SEE type-art split.
// ──────────────────────────────────────────────────────────────
function Bo03DoSee({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>02 · the layer beneath</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: '160px 64px 160px 64px',
          display: 'grid',
          gridTemplateRows: '1fr 1fr',
          gap: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingBottom: 12,
            borderBottom: '1px solid var(--border-strong)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                letterSpacing: '0.2em',
                color: 'var(--fg-3)',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              replaceable people sell what they
            </div>
            <Editable
              as="div"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 280,
                fontWeight: 700,
                letterSpacing: '-0.05em',
                lineHeight: 0.85,
                color: 'var(--fg-1)',
              }}
            >
              do.
            </Editable>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.18em',
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
              alignSelf: 'flex-start',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            output layer
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.18em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              alignSelf: 'flex-end',
              writingMode: 'vertical-rl',
              paddingBottom: 60,
            }}
          >
            position layer
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                letterSpacing: '0.2em',
                color: 'var(--fg-3)',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              irreplaceable people sell what they
            </div>
            <Editable
              as="div"
              style={{
                fontFamily: 'var(--font-serif-editorial)',
                fontStyle: 'italic',
                fontSize: 280,
                fontWeight: 600,
                letterSpacing: '-0.04em',
                lineHeight: 0.85,
                color: 'var(--accent)',
              }}
            >
              see.
            </Editable>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 04 · VALUE 2 — three-tier color-block framework with image.
// ──────────────────────────────────────────────────────────────
function Bo04Layers({ brand, n }) {
  const tiers = [
    { k: 'tool', sub: 'rented · replaced quarterly', bg: 'var(--bg-muted)', fg: 'var(--fg-3)' },
    { k: 'skill', sub: 'leased · replaced by a graduate', bg: 'var(--border)', fg: 'var(--fg-2)' },
    { k: 'position', sub: 'owned · compounds forever', bg: 'var(--accent)', fg: 'var(--fg-inverse)' },
  ];
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>03 · the three layers</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: '140px 64px 160px 64px',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 32,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {tiers.map((t, i) => (
            <div
              key={i}
              style={{
                background: t.bg,
                color: t.fg,
                padding: i === 2 ? '36px 32px' : '24px 32px',
                flex: i === 2 ? 1.4 : 1,
                display: 'flex',
                alignItems: 'baseline',
                gap: 28,
                borderRadius: 2,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  letterSpacing: '0.16em',
                  opacity: 0.65,
                  minWidth: 32,
                  textTransform: 'uppercase',
                }}
              >
                0{i + 1}
              </span>
              <div style={{ flex: 1 }}>
                <Editable
                  as="div"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: i === 2 ? 92 : 68,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.95,
                    textTransform: 'lowercase',
                  }}
                >
                  {t.k}
                </Editable>
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity: 0.7,
                  }}
                >
                  {t.sub}
                </div>
              </div>
              {i === 2 && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 28,
                    transform: 'translateY(-12px)',
                  }}
                >
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Img
            id="bo-04-img"
            shape="rect"
            radius={2}
            placeholder="stacked stones · weight"
            style={{ width: '100%', flex: 1, minHeight: 0 }}
          />
          <div
            style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontStyle: 'italic',
              fontSize: 26,
              lineHeight: 1.25,
              color: 'var(--fg-1)',
              padding: '20px 4px 4px',
            }}
          >
            <Editable as="span">Move down. Stay there. Build a moat out of how you see.</Editable>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 05 · VALUE 3 — Dark slide. Three statements, each a separate bar.
// ──────────────────────────────────────────────────────────────
function Bo05Owned({ brand, n }) {
  const rows = [
    { head: 'tool', tail: 'is rented.', accent: false },
    { head: 'skill', tail: 'is leased.', accent: false },
    { head: 'position', tail: 'is owned.', accent: true },
  ];
  return (
    <SlideFrame n={n} brand={brand} bg="navy">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow dot style={{ color: 'rgba(245,240,234,0.5)' }}>04 · what you actually own</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: '180px 64px 160px 64px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {rows.map((r, i) => (
          <div
            key={i}
            style={{
              flex: r.accent ? 1.3 : 1,
              borderTop: '1px solid rgba(245,240,234,0.18)',
              borderBottom: i === rows.length - 1 ? '1px solid rgba(245,240,234,0.18)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 32,
              padding: '12px 4px',
              background: r.accent ? 'rgba(198,90,46,0.06)' : 'transparent',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                letterSpacing: '0.18em',
                color: 'rgba(245,240,234,0.4)',
                width: 32,
              }}
            >
              0{i + 1}
            </span>
            <Editable
              as="span"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 108,
                fontWeight: 600,
                letterSpacing: '-0.035em',
                lineHeight: 1,
                color: r.accent ? 'var(--accent)' : 'var(--fg-inverse)',
                textTransform: 'lowercase',
              }}
            >
              {r.head}
            </Editable>
            <Editable
              as="em"
              style={{
                fontFamily: 'var(--font-serif-editorial)',
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: 76,
                letterSpacing: '-0.015em',
                color: r.accent ? 'var(--accent)' : 'rgba(245,240,234,0.7)',
                lineHeight: 1,
              }}
            >
              {r.tail}
            </Editable>
            {r.accent && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  letterSpacing: '0.18em',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                }}
              >
                ← compounds
              </span>
            )}
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 06 · VALUE 4 — image full-bleed left, big overlay statement right.
// ──────────────────────────────────────────────────────────────
function Bo06WrongLayer({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '50%' }}>
        <Img
          id="bo-06-img"
          shape="rect"
          radius={0}
          placeholder="a knife · sharpening"
          style={{ width: '100%', height: '100%' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: 32,
            right: 32,
            background: 'rgba(7,39,62,0.92)',
            color: 'var(--fg-inverse)',
            padding: '14px 18px',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>fig. 02</span>
          <span style={{ color: 'var(--accent)' }}>the sharper knife problem</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '52%',
          right: 64,
          top: 140,
          bottom: 160,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 32,
          paddingLeft: 32,
        }}
      >
        <Eyebrow>05 · misallocated effort</Eyebrow>
        <Editable
          as="div"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 80,
            fontWeight: 600,
            letterSpacing: '-0.025em',
            lineHeight: 0.95,
            textWrap: 'balance',
          }}
        >
          Most advice sharpens
        </Editable>
        <Editable
          as="div"
          style={{
            fontFamily: 'var(--font-serif-editorial)',
            fontStyle: 'italic',
            fontSize: 80,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'var(--accent)',
            lineHeight: 0.95,
            marginTop: -16,
          }}
        >
          the wrong layer.
        </Editable>
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 20,
            lineHeight: 1.5,
            color: 'var(--fg-2)',
            margin: 0,
            maxWidth: 420,
          }}
        >
          <Editable as="span">
            Faster work · better tools · cleaner output. All of it lives upstairs.
            Position lives in the basement — and the basement is where the
            compounding happens.
          </Editable>
        </p>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 07 · VALUE 5 — pull-quote with terracotta highlight + strikethrough.
// Centered, type-driven, no image.
// ──────────────────────────────────────────────────────────────
function Bo07Category({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>06 · the tell</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            letterSpacing: '0.2em',
            color: 'var(--fg-3)',
            textTransform: 'uppercase',
            marginBottom: 36,
          }}
        >
          you'll know you've moved layers when —
        </div>

        <Editable
          as="div"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 88,
            letterSpacing: '-0.025em',
            lineHeight: 1.04,
            textWrap: 'balance',
          }}
        >
          someone above you describes you as a{' '}
          <span
            style={{
              color: 'var(--fg-inverse)',
              background: 'var(--accent)',
              padding: '0 16px',
              borderRadius: 4,
              display: 'inline-block',
            }}
          >
            category
          </span>
          ,
          <br />
          not a{' '}
          <span
            style={{
              color: 'var(--fg-3)',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            function
            <span
              style={{
                position: 'absolute',
                left: -4,
                right: -4,
                top: '55%',
                height: 6,
                background: 'var(--fg-3)',
                pointerEvents: 'none',
              }}
            />
          </span>
          .
        </Editable>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 08 · INSIGHT UPGRADE — pro move. Image bottom band.
// ──────────────────────────────────────────────────────────────
function Bo08ProMove({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.22em',
            color: 'var(--fg-inverse)',
            textTransform: 'uppercase',
            padding: '8px 14px',
            background: 'var(--accent)',
            display: 'inline-block',
          }}
        >
          07 · the pro move
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: 180,
        }}
      >
        <Editable
          as="div"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 108,
            letterSpacing: '-0.035em',
            lineHeight: 0.92,
            color: 'var(--fg-3)',
            textTransform: 'lowercase',
          }}
        >
          don't get better at
        </Editable>
        <Editable
          as="div"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 168,
            letterSpacing: '-0.045em',
            lineHeight: 0.88,
            color: 'var(--fg-1)',
            textTransform: 'lowercase',
            marginTop: 8,
          }}
        >
          the work.
        </Editable>
        <Editable
          as="div"
          style={{
            fontFamily: 'var(--font-serif-editorial)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 88,
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            color: 'var(--accent)',
            marginTop: 24,
            textWrap: 'balance',
          }}
        >
          get better at framing it.
        </Editable>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          bottom: 130,
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: 32,
          alignItems: 'center',
        }}
      >
        <Img
          id="bo-08-img"
          shape="rect"
          radius={2}
          placeholder="a frame · empty"
          style={{ width: 300, height: 180 }}
        />
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 18,
            lineHeight: 1.5,
            color: 'var(--fg-2)',
            margin: 0,
          }}
        >
          <Editable as="span">
            The frame decides what work even counts. The person who sets the frame
            is the last one a market lets go.
          </Editable>
        </p>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 09 · CRYSTALLISED TAKEAWAY — three words at maximum scale.
// ──────────────────────────────────────────────────────────────
function Bo09Takeaway({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>08 · the screenshot</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          top: '46%',
          transform: 'translateY(-50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 24,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          <Editable
            as="span"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 168,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'var(--fg-3)',
              textTransform: 'lowercase',
            }}
          >
            tool
          </Editable>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 56,
              color: 'var(--fg-3)',
              transform: 'translateY(-12px)',
            }}
          >
            →
          </span>
          <Editable
            as="span"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 168,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'var(--fg-2)',
              textTransform: 'lowercase',
            }}
          >
            skill
          </Editable>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 56,
              color: 'var(--fg-3)',
              transform: 'translateY(-12px)',
            }}
          >
            →
          </span>
          <Editable
            as="span"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 168,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'var(--accent)',
              textTransform: 'lowercase',
              borderBottom: '8px solid var(--accent)',
              paddingBottom: 8,
            }}
          >
            position
          </Editable>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 64,
          right: 64,
          bottom: 150,
          paddingTop: 28,
          borderTop: '1px solid var(--border-strong)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Editable
          as="span"
          style={{
            fontFamily: 'var(--font-serif-editorial)',
            fontStyle: 'italic',
            fontSize: 38,
            color: 'var(--fg-1)',
            lineHeight: 1.2,
            maxWidth: 720,
          }}
        >
          compounding lives at the bottom layer.
        </Editable>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            letterSpacing: '0.18em',
            color: 'var(--fg-3)',
            textTransform: 'uppercase',
          }}
        >
          screenshot · save · revisit
        </span>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 10 · CTA — button-like, high contrast. Image left, CTA right.
// ──────────────────────────────────────────────────────────────
function Bo10CTA({ brand, n }) {
  const isSl = brand === 'sl';
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '44%' }}>
        <Img
          id="bo-10-img"
          shape="rect"
          radius={0}
          placeholder="portrait · direct gaze"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 56,
          left: 'calc(44% + 48px)',
        }}
      >
        <Eyebrow>09 · keep the thread</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 'calc(44% + 48px)',
          right: 64,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <Editable
          as="div"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 64,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            textWrap: 'balance',
          }}
        >
          want the full breakdown?
        </Editable>

        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            border: '2px solid var(--fg-1)',
            borderRadius: 4,
            overflow: 'hidden',
            alignSelf: 'flex-start',
          }}
        >
          <span
            style={{
              padding: '20px 22px',
              fontFamily: 'var(--font-sans)',
              fontSize: 18,
              color: 'var(--fg-1)',
              background: 'var(--bg-elevated)',
            }}
          >
            comment
          </span>
          <span
            style={{
              padding: '20px 28px',
              fontFamily: 'var(--font-mono)',
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: 'var(--fg-inverse)',
              background: 'var(--accent)',
            }}
          >
            LAYERS
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 19,
            lineHeight: 1.5,
            color: 'var(--fg-2)',
            margin: 0,
            maxWidth: 500,
          }}
        >
          <Editable as="span">
            I'll DM you the 7-question audit for finding your own irreplaceable
            layer.
          </Editable>
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            marginTop: 8,
          }}
        >
          <span
            style={{
              width: 36,
              height: 1,
              background: 'var(--fg-2)',
              transform: 'translateY(-6px)',
            }}
          />
          {isSl ? (
            <span
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: 44,
                color: 'var(--accent)',
                lineHeight: 1,
              }}
            >
              + follow for more →
            </span>
          ) : (
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--fg-1)',
              }}
            >
              + follow for the next essay
            </span>
          )}
        </div>
      </div>
    </SlideFrame>
  );
}

const BOLD_SLIDES = [
  Bo01Hook, Bo02Tension, Bo03DoSee, Bo04Layers, Bo05Owned,
  Bo06WrongLayer, Bo07Category, Bo08ProMove, Bo09Takeaway, Bo10CTA,
];

Object.assign(window, { BOLD_SLIDES });
