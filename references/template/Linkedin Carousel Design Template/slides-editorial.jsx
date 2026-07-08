// slides-editorial.jsx — 10 editorial-direction slides for the
// "Structural Irreplaceability" LinkedIn carousel. Magazine-style:
// off-grid composition, Bodoni italic moments, quiet whitespace,
// one navy slide (slide 5) for rhythm.

// ──────────────────────────────────────────────────────────────
// 01 · HOOK — pure type, no image, no chrome bottom-left so the
// statement carries the slide. Italic serif statement, terracotta
// closer on the second line.
// ──────────────────────────────────────────────────────────────
function Ed01Hook({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream" showMark={false}>
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>The Leverage Code™ · essay no. 01</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 160,
          top: '36%',
          transform: 'translateY(-36%)',
        }}
      >
        <PullQuote size={132} style={{ color: 'var(--fg-1)' }}>
          <Editable as="span">The tool isn't the moat.</Editable>
        </PullQuote>
        <PullQuote
          size={132}
          style={{ color: 'var(--accent)', marginTop: 8, textIndent: 96 }}
        >
          <Editable as="em" style={{ fontStyle: 'italic' }}>You</Editable>{' '}
          <Editable as="span">are.</Editable>
        </PullQuote>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 96,
          left: 96,
          right: 96,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ flex: 1, height: 1, background: 'var(--border-strong)' }} />
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--fg-3)',
          }}
        >
          structural irreplaceability · a 10-page read
        </span>
        <span style={{ flex: 1, height: 1, background: 'var(--border-strong)' }} />
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 02 · TENSION — image left, three stacked tension beats right.
// ──────────────────────────────────────────────────────────────
function Ed02Tension({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
        <div style={{ width: 460, padding: '56px 0 56px 64px', display: 'flex', alignItems: 'center' }}>
          <Img
            id="ed-02-img"
            shape="rect"
            radius={2}
            placeholder="architectural shadow · still life"
            style={{ width: 396, height: 720 }}
          />
        </div>
        <div
          style={{
            flex: 1,
            padding: '56px 96px 56px 80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          <Eyebrow>02 · why this matters</Eyebrow>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 56,
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              margin: 0,
              textWrap: 'balance',
            }}
          >
            <Editable as="span">Three things commodify on contact.</Editable>
          </h2>

          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              fontFamily: 'var(--font-sans)',
              fontSize: 22,
              lineHeight: 1.45,
              color: 'var(--fg-2)',
            }}
          >
            {[
              ['the tool', 'the moment it ships.'],
              ['the skill', 'the moment it becomes teachable.'],
              ['the role', 'the moment it has a job description.'],
            ].map(([k, v], i) => (
              <li key={i} style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--fg-3)',
                    letterSpacing: '0.1em',
                    minWidth: 28,
                  }}
                >
                  0{i + 1}
                </span>
                <span>
                  <Editable as="strong" style={{ color: 'var(--fg-1)', fontWeight: 600 }}>{k}</Editable>{' '}
                  <Editable as="span">{v}</Editable>
                </span>
              </li>
            ))}
          </ol>

          <div
            style={{
              marginTop: 12,
              paddingTop: 28,
              borderTop: '1px solid var(--border)',
              fontFamily: 'var(--font-serif-editorial)',
              fontStyle: 'italic',
              fontSize: 24,
              color: 'var(--fg-1)',
              lineHeight: 1.35,
              maxWidth: 460,
            }}
          >
            <Editable as="span">Position is the only thing that compounds.</Editable>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 03 · VALUE 1 — single editorial pull-quote. No image.
// ──────────────────────────────────────────────────────────────
function Ed03DoSee({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <Eyebrow dot={false}>chapter 03 · the layer beneath</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
        }}
      >
        <PullQuote size={86}>
          <Editable as="span">Replaceable people sell what they </Editable>
          <Editable as="em" style={{ color: 'var(--fg-2)' }}>do.</Editable>
        </PullQuote>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 48,
            alignItems: 'end',
          }}
        >
          <PullQuote size={86} style={{ color: 'var(--accent)' }}>
            <Editable as="span">Irreplaceable people sell what they </Editable>
            <Editable as="em" style={{ fontStyle: 'italic' }}>see.</Editable>
          </PullQuote>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              letterSpacing: '0.1em',
              color: 'var(--fg-3)',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              paddingBottom: 8,
            }}
          >
            do → see · the inflection
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 04 · VALUE 2 — three-layer framework. Image top-right, stacked
// bands left.
// ──────────────────────────────────────────────────────────────
function Ed04Layers({ brand, n }) {
  const tiers = [
    {
      k: 'tool',
      v: 'what you operate.',
      sub: 'rented · replaced quarterly',
      tone: 'var(--fg-3)',
    },
    {
      k: 'skill',
      v: 'what you can do.',
      sub: 'leased · replaced by a graduate',
      tone: 'var(--fg-2)',
    },
    {
      k: 'position',
      v: 'how the work is framed.',
      sub: 'owned · compounds',
      tone: 'var(--accent)',
    },
  ];
  return (
    <SlideFrame n={n} brand={brand} bg="paper">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>04 · the three layers</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 140,
          right: 64,
          width: 320,
          height: 320,
        }}
      >
        <Img
          id="ed-04-img"
          shape="rect"
          radius={2}
          placeholder="long shadow on a wall"
          style={{ width: 320, height: 320 }}
        />
        <div
          style={{
            marginTop: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.1em',
            color: 'var(--fg-3)',
            textTransform: 'uppercase',
          }}
        >
          fig. 01 · move down. stay there.
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 64,
          top: 220,
          width: 580,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        {tiers.map((t, i) => (
          <div
            key={i}
            style={{
              borderTop: '1px solid var(--border-strong)',
              paddingTop: 20,
              display: 'grid',
              gridTemplateColumns: '60px 1fr',
              gap: 24,
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                letterSpacing: '0.12em',
                color: 'var(--fg-3)',
              }}
            >
              0{i + 1}
            </span>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 52,
                  fontWeight: 500,
                  letterSpacing: '-0.015em',
                  lineHeight: 1,
                  color: t.tone,
                }}
              >
                <Editable as="span">{t.k}</Editable>
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: 'var(--font-serif-editorial)',
                  fontStyle: 'italic',
                  fontSize: 22,
                  color: 'var(--fg-1)',
                  lineHeight: 1.3,
                }}
              >
                <Editable as="span">{t.v}</Editable>
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.1em',
                  color: 'var(--fg-3)',
                  textTransform: 'uppercase',
                }}
              >
                {t.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 05 · VALUE 3 — DARK statement slide. No image. Cream type on navy.
// ──────────────────────────────────────────────────────────────
function Ed05Owned({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="navy">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow dot style={{ color: 'rgba(245,240,234,0.5)' }}>
          05 · what you actually own
        </Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--fg-inverse)',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        {[
          ['Your tool', 'is rented.', 'rgba(245,240,234,0.55)'],
          ['Your skill', 'is leased.', 'rgba(245,240,234,0.75)'],
          ['Your position', 'is owned.', 'var(--accent)'],
        ].map(([head, tail, tone], i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 28,
              borderTop: i === 0 ? 'none' : '1px solid rgba(245,240,234,0.12)',
              paddingTop: i === 0 ? 0 : 24,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.12em',
                color: 'rgba(245,240,234,0.4)',
                width: 24,
              }}
            >
              0{i + 1}
            </span>
            <Editable
              as="span"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 64,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              {head}
            </Editable>
            <Editable
              as="em"
              style={{
                fontFamily: 'var(--font-serif-editorial)',
                fontStyle: 'italic',
                fontWeight: 500,
                fontSize: 64,
                letterSpacing: '-0.015em',
                color: tone,
                lineHeight: 1.05,
              }}
            >
              {tail}
            </Editable>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 06 · VALUE 4 — image right, statement left. Lower-thirds caption.
// ──────────────────────────────────────────────────────────────
function Ed06WrongLayer({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>06 · the misallocated effort</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: '160px 64px 160px 64px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 60,
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
              margin: 0,
              textWrap: 'balance',
            }}
          >
            <Editable as="span">Most career advice</Editable>
            <br />
            <Editable as="span">optimises the </Editable>
            <Editable
              as="em"
              style={{
                fontFamily: 'var(--font-serif-editorial)',
                fontStyle: 'italic',
                color: 'var(--accent)',
              }}
            >
              wrong layer.
            </Editable>
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 22,
              lineHeight: 1.5,
              color: 'var(--fg-2)',
              margin: 0,
              maxWidth: 460,
            }}
          >
            <Editable as="span">
              It teaches you to sharpen the knife — not to be the only one holding
              it. So you get faster at work that is, on net, more replaceable each
              year.
            </Editable>
          </p>
        </div>

        <div>
          <Img
            id="ed-06-img"
            shape="rect"
            radius={2}
            placeholder="quiet hands · a tool at rest"
            style={{ width: '100%', height: 600 }}
          />
          <div
            style={{
              marginTop: 14,
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.1em',
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
            }}
          >
            <span>fig. 02</span>
            <span>the sharper knife problem</span>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 07 · VALUE 5 — single quiet line. Centered. Editorial italic.
// ──────────────────────────────────────────────────────────────
function Ed07Category({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="mist">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>07 · the tell</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 820,
          textAlign: 'left',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            letterSpacing: '0.18em',
            color: 'var(--fg-3)',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          you'll know you've moved layers when —
        </div>
        <PullQuote size={68}>
          <Editable as="span">someone above you describes you as a </Editable>
          <Editable
            as="strong"
            style={{
              fontStyle: 'normal',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              color: 'var(--accent)',
              borderBottom: '2px solid var(--accent)',
              paddingBottom: 4,
            }}
          >
            category
          </Editable>
          <Editable as="span">, not a </Editable>
          <Editable
            as="span"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'normal',
              fontWeight: 500,
              color: 'var(--fg-3)',
              textDecoration: 'line-through',
              textDecorationColor: 'var(--fg-3)',
              textDecorationThickness: '1px',
            }}
          >
            function
          </Editable>
          <Editable as="span">.</Editable>
        </PullQuote>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 08 · INSIGHT UPGRADE — "the pro move". Image bottom-right.
// ──────────────────────────────────────────────────────────────
function Ed08ProMove({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.2em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            padding: '6px 10px',
            border: '1px solid var(--accent)',
            borderRadius: 999,
          }}
        >
          08 · the pro move
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          top: 220,
          maxWidth: 880,
        }}
      >
        <PullQuote size={78}>
          <Editable as="span">Don't get better at </Editable>
          <Editable as="span" style={{ fontFamily: 'var(--font-display)', fontStyle: 'normal', fontWeight: 500 }}>
            the work.
          </Editable>
        </PullQuote>
        <PullQuote size={78} style={{ marginTop: 18, color: 'var(--accent)' }}>
          <Editable as="span">Get better at being </Editable>
          <Editable as="em">the only one </Editable>
          <Editable as="span">who </Editable>
          <Editable as="em">frames </Editable>
          <Editable as="span">the work.</Editable>
        </PullQuote>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 160,
          left: 96,
          right: 96,
          display: 'grid',
          gridTemplateColumns: '1fr 280px',
          gap: 40,
          alignItems: 'end',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 20,
            lineHeight: 1.55,
            color: 'var(--fg-2)',
            margin: 0,
            maxWidth: 540,
          }}
        >
          <Editable as="span">
            Framing is upstream of doing. The frame decides what work even counts
            — and the person who sets the frame is the last one a market lets go.
          </Editable>
        </p>
        <Img
          id="ed-08-img"
          shape="rect"
          radius={2}
          placeholder="window light · interior corner"
          style={{ width: 280, height: 220 }}
        />
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 09 · CRYSTALLISED TAKEAWAY — three stacked words. No image.
// ──────────────────────────────────────────────────────────────
function Ed09Takeaway({ brand, n }) {
  return (
    <SlideFrame n={n} brand={brand} bg="cream">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>09 · the screenshot</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          top: '46%',
          transform: 'translateY(-50%)',
        }}
      >
        {['Tool.', 'Skill.', 'Position.'].map((w, i) => {
          const accent = i === 2;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 32,
                borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                paddingBottom: 8,
                marginBottom: i < 2 ? 12 : 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 16,
                  letterSpacing: '0.18em',
                  color: 'var(--fg-3)',
                  minWidth: 56,
                }}
              >
                0{i + 1}
              </span>
              <Editable
                as="span"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 168,
                  fontWeight: 500,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: accent ? 'var(--accent)' : 'var(--fg-1)',
                }}
              >
                {w}
              </Editable>
              {accent && (
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    letterSpacing: '0.16em',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    marginLeft: 'auto',
                    paddingBottom: 32,
                  }}
                >
                  ← own this
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 96,
          right: 96,
          fontFamily: 'var(--font-serif-editorial)',
          fontStyle: 'italic',
          fontSize: 32,
          color: 'var(--fg-2)',
          textAlign: 'right',
          maxWidth: 720,
          marginLeft: 'auto',
        }}
      >
        <Editable as="span">compounding lives at the bottom layer.</Editable>
      </div>
    </SlideFrame>
  );
}

// ──────────────────────────────────────────────────────────────
// 10 · CTA — frictionless. Image + LAYERS comment + follow.
// ──────────────────────────────────────────────────────────────
function Ed10CTA({ brand, n }) {
  const isSl = brand === 'sl';
  return (
    <SlideFrame n={n} brand={brand} bg="paper">
      <div style={{ position: 'absolute', top: 56, left: 64 }}>
        <Eyebrow>10 · keep the thread</Eyebrow>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: '160px 64px 200px 64px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <PullQuote size={64}>
            <Editable as="span">If this rewired something —</Editable>
          </PullQuote>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 18,
              padding: '20px 28px',
              border: '1.5px solid var(--accent)',
              borderRadius: 8,
              background: 'var(--action-primary-soft)',
              alignSelf: 'flex-start',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 22,
                color: 'var(--fg-1)',
              }}
            >
              comment
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: '0.14em',
                color: 'var(--accent)',
              }}
            >
              LAYERS
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 20,
              lineHeight: 1.55,
              color: 'var(--fg-2)',
              margin: 0,
              maxWidth: 500,
            }}
          >
            <Editable as="span">
              I'll DM you the full breakdown — including the 7-question audit for
              finding your own irreplaceable layer.
            </Editable>
          </p>

          {isSl ? (
            <div
              style={{
                marginTop: 8,
                fontFamily: 'var(--font-hand)',
                fontSize: 44,
                color: 'var(--accent)',
                lineHeight: 1,
              }}
            >
              + follow for more →
            </div>
          ) : (
            <div
              style={{
                marginTop: 8,
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)',
                fontWeight: 500,
              }}
            >
              follow for the next essay →
            </div>
          )}
        </div>

        <Img
          id="ed-10-img"
          shape="rect"
          radius={2}
          placeholder="portrait · contemplative still"
          style={{ width: '100%', height: 620 }}
        />
      </div>
    </SlideFrame>
  );
}

const EDITORIAL_SLIDES = [
  Ed01Hook, Ed02Tension, Ed03DoSee, Ed04Layers, Ed05Owned,
  Ed06WrongLayer, Ed07Category, Ed08ProMove, Ed09Takeaway, Ed10CTA,
];

Object.assign(window, { EDITORIAL_SLIDES });
