// Nav + Hero + Focus (flip cards) + Skills (specimen tiles).
// Stripped to match Ersya's references — clean, white, restrained,
// professional, Instrument Serif italic for emphasis.

const NAV = [
  { id: 'personal', label: 'Personal' },
  { id: 'work',     label: 'Work' },
  { id: 'contact',  label: 'Contact' },
];

// ======================================================================
// NAV — three sections, centered, simple
// ======================================================================
const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState('personal');

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // figure out active section
      const sections = NAV.map(n => document.getElementById(n.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(NAV[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 48px', gap: 24, whiteSpace: 'nowrap',
      background: scrolled ? 'rgba(255,254,251,0.86)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(160%) blur(14px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
      transition: 'background .25s, border-color .25s',
    }}>
      <a href="#personal" style={{
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          display: 'inline-block', width: 22, height: 22, borderRadius: '50%',
          background: 'var(--ink)',
        }} />
        <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em' }}>
          Ersya Saskia
        </span>
      </a>

      <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {NAV.map((n, i) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            style={{
              textDecoration: 'none', fontSize: 14,
              color: active === n.id ? 'var(--ink)' : 'var(--mute)',
              fontWeight: active === n.id ? 500 : 400,
              position: 'relative',
              transition: 'color .15s',
              display: 'inline-flex', alignItems: 'baseline', gap: 6,
            }}
          >
            <span style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: 13, color: active === n.id ? 'var(--ink)' : 'var(--faint)',
            }}>
              {`0${i+1}.`}
            </span>
            {n.label}
            {active === n.id && (
              <span style={{
                position: 'absolute', left: 0, right: 0, bottom: -6, height: 1.5,
                background: 'var(--ink)',
              }} />
            )}
          </a>
        ))}
      </nav>
    </header>
  );
};

// ======================================================================
// HERO — name + tagline. Big, calm, white space.
// ======================================================================
const Hero = () => (
  <section style={{ padding: '90px 64px 130px', position: 'relative' }}>
    <div style={{
      fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)',
      letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 56,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ width: 28, height: 1, background: 'var(--ink)' }} />
      Portfolio, '26 · vol. 01
    </div>

    <div style={{
      fontFamily: 'var(--serif)', fontStyle: 'italic',
      fontSize: 'clamp(28px, 3vw, 36px)', color: 'var(--mute)',
      marginBottom: 14,
    }}>
      hello, my name is
    </div>

    <h1 style={{
      margin: 0,
      fontSize: 'clamp(80px, 12vw, 200px)',
      lineHeight: 1.0, letterSpacing: '-0.055em',
      fontWeight: 500, textWrap: 'balance',
    }}>
      Ersya Saskia<span style={{ color: 'var(--mute)' }}>.</span>
    </h1>

    <div style={{
      marginTop: 60,
      display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80,
      alignItems: 'baseline',
    }}>
      <h2 style={{
        margin: 0, fontWeight: 400,
        fontSize: 'clamp(40px, 5vw, 68px)',
        lineHeight: 1.1, letterSpacing: '-0.03em',
      }}>
        I&nbsp;<SerifItalic word="research" />,&nbsp;
        <SerifItalic word="design" />
        <br/>&amp;&nbsp;<SerifItalic word="build" />.
      </h2>

      <p style={{
        margin: 0, fontSize: 17, lineHeight: 1.6, color: '#2a2a26',
        maxWidth: '38ch', textWrap: 'pretty',
      }}>
        A software engineer with an eye for the interface. I work across
        <em style={{ fontFamily: 'var(--serif)', fontWeight: 400 }}>&nbsp;web</em>,
        <em style={{ fontFamily: 'var(--serif)', fontWeight: 400 }}>&nbsp;native applications</em>, and
        <em style={{ fontFamily: 'var(--serif)', fontWeight: 400 }}>&nbsp;AI</em> — building
        things that are quietly fast, quietly considered, and a pleasure to
        return to.
      </p>
    </div>
  </section>
);

const SerifItalic = ({ word }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
        display: 'inline-block',
        transform: hovered ? 'translateY(-5px) rotate(-1.5deg)' : 'translateY(0)',
        transition: 'transform .45s cubic-bezier(.34,1.56,.64,1)',
        cursor: 'default',
      }}
    >
      {word}
    </span>
  );
};

// ======================================================================
// FOCUS — 3 flippable cards, minimal copy
// ======================================================================
const FOCUS_ITEMS = [
  {
    n: '01',
    title: 'Web\nDevelopment',
    glyph: '◈',
    stack: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Three.js'],
    line: 'Front-end engineering for products people return to.',
  },
  {
    n: '02',
    title: 'Software\nApplications',
    glyph: '◉',
    stack: ['Swift', 'SwiftUI', 'Rust', 'Tauri', 'Node'],
    line: 'Native, fast desktop tools and developer utilities.',
  },
  {
    n: '03',
    title: 'AI &\nMachine Learning',
    glyph: '◎',
    stack: ['OpenAI · Anthropic', 'PyTorch', 'Embeddings · RAG', 'Python'],
    line: 'LLM applications and the human interfaces around them.',
  },
];

const Focus = () => (
  <section style={{ padding: '40px 64px 110px' }}>
    <SectionHeader
      eyebrow="What I work on"
      title="Three areas."
      right="Hover a card."
    />

    <div style={{
      marginTop: 44, display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20,
    }}>
      {FOCUS_ITEMS.map((it) => (
        <FlipCard key={it.n} {...it} />
      ))}
    </div>
  </section>
);

const FlipCard = ({ n, title, glyph, stack, line }) => {
  const [flipped, setFlipped] = React.useState(false);
  const faceStyle = {
    position: 'absolute', inset: 0, padding: 28,
    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
    borderRadius: 16,
    background: '#fcfbf7',
    border: '1px solid var(--rule)',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  };
  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{ perspective: 1200, height: 320, cursor: 'pointer' }}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform .7s cubic-bezier(.2,.7,.3,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
      }}>
        {/* front */}
        <div style={faceStyle}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)',
              letterSpacing: '0.14em',
            }}>
              {n}
            </span>
            <span style={{ fontSize: 22, color: 'var(--mute)' }}>{glyph}</span>
          </div>
          <h3 style={{
            margin: 0,
            fontSize: 'clamp(28px, 2.4vw, 38px)',
            lineHeight: 1.05, fontWeight: 500, letterSpacing: '-0.022em',
            whiteSpace: 'pre-line',
          }}>
            {title}
          </h3>
        </div>

        {/* back */}
        <div style={{
          ...faceStyle,
          transform: 'rotateY(180deg)',
          background: 'var(--ink)',
          color: '#fffefb',
          borderColor: 'var(--ink)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 11, color: 'rgba(255,255,255,.55)',
              letterSpacing: '0.14em',
            }}>
              {n} · stack
            </span>
            <span style={{ fontSize: 22, color: 'rgba(255,255,255,.55)' }}>{glyph}</span>
          </div>
          <div>
            <p style={{
              margin: 0, fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: 19, lineHeight: 1.4, color: 'rgba(255,255,255,.85)',
              marginBottom: 18,
            }}>
              — {line}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {stack.map(s => (
                <span key={s} style={{
                  padding: '5px 10px', borderRadius: 999,
                  border: '1px solid rgba(255,255,255,.22)',
                  fontFamily: 'var(--mono)', fontSize: 11, color: '#fffefb',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================================================================
// SKILLS — specimen-style tiles, each language in its own typographic voice
// ======================================================================
const SKILLS = [
  {
    name: 'HTML',
    full: 'HyperText Markup',
    role: 'Structure',
    specimen: '</>',
    specimenFont: 'mono',
  },
  {
    name: 'CSS',
    full: 'Cascading Stylesheets',
    role: 'Style & motion',
    specimen: '{ }',
    specimenFont: 'mono',
  },
  {
    name: 'JavaScript',
    full: 'JS · TypeScript',
    role: 'Behaviour',
    specimen: '( )',
    specimenFont: 'mono',
  },
  {
    name: 'Figma',
    full: 'Figma · Framer',
    role: 'Design',
    specimen: 'Aa',
    specimenFont: 'serif',
  },
];

const Skills = () => (
  <section style={{
    padding: '20px 64px 120px',
  }}>
    <SectionHeader
      eyebrow="Languages & tools"
      title="The toolkit."
      right="Daily drivers."
    />

    <div style={{
      marginTop: 44, display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 18,
    }}>
      {SKILLS.map((s, i) => (
        <SkillTile key={s.name} i={i} {...s} />
      ))}
    </div>
  </section>
);

const SkillTile = ({ i, name, full, role, specimen, specimenFont }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: 28,
        background: hovered ? 'var(--ink)' : '#fcfbf7',
        color: hovered ? '#fffefb' : 'var(--ink)',
        border: `1px solid ${hovered ? 'var(--ink)' : 'var(--rule)'}`,
        borderRadius: 16,
        transition: 'background .25s, color .25s, border-color .25s, transform .25s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        minHeight: 260,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        cursor: 'default', overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 11,
          color: hovered ? 'rgba(255,255,255,.55)' : 'var(--mute)',
          letterSpacing: '0.14em',
        }}>
          {String(i + 1).padStart(2, '0')}
        </span>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 11,
          color: hovered ? 'rgba(255,255,255,.55)' : 'var(--mute)',
          letterSpacing: '0.06em',
        }}>
          {role}
        </span>
      </div>

      <div style={{
        fontFamily: specimenFont === 'serif' ? 'var(--serif)' : 'var(--mono)',
        fontStyle: specimenFont === 'serif' ? 'italic' : 'normal',
        fontSize: 92, lineHeight: 1,
        textAlign: 'center', margin: '12px 0',
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
      }}>
        {specimen}
      </div>

      <div>
        <div style={{
          fontSize: 26, fontWeight: 500, letterSpacing: '-0.022em', lineHeight: 1.05,
        }}>
          {name}
        </div>
        <div style={{
          marginTop: 4, fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 15,
          color: hovered ? 'rgba(255,255,255,.7)' : 'var(--mute)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          — {full}
        </div>
      </div>
    </div>
  );
};

// ======================================================================
// SHARED — section header
// ======================================================================
const SectionHeader = ({ eyebrow, title, right }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
    <div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)',
        letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14,
      }}>
        {eyebrow}
      </div>
      <h2 style={{
        margin: 0, fontSize: 'clamp(42px, 5vw, 64px)', lineHeight: 1.02,
        letterSpacing: '-0.03em', fontWeight: 500,
        fontFamily: 'var(--serif)', fontStyle: 'italic',
      }}>
        {title}
      </h2>
    </div>
    {right && (
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)',
        letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        {right}
      </div>
    )}
  </div>
);

Object.assign(window, { Nav, Hero, Focus, Skills, SectionHeader });
