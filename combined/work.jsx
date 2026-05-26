// Selected Work — clean 2×2 grid, pure white cards

const WORK = [
  {
    n: '01',
    name: 'Lumen',
    blurb: 'An AI reading companion that turns PDFs into living documents — your highlights become searchable, questions answered.',
    tag: 'Personal',
    role: 'Design & engineering',
    year: '2026',
    stack: 'Next.js · Postgres · GPT-4o',
    cover: 'stripes',
  },
  {
    n: '02',
    name: 'Foldspace',
    blurb: 'Embedding-space visualiser for ML teams. Drop a CSV of vectors, get a draggable 3D map with semantic clustering.',
    tag: 'Work · Internal',
    role: 'Frontend lead',
    year: '2025',
    stack: 'Three.js · WebGL · DuckDB',
    cover: 'grid',
  },
  {
    n: '03',
    name: 'Kettle',
    blurb: 'A small native macOS app that watches your terminal and warns you before you rm -rf the wrong directory. ~4,200 weekly users.',
    tag: 'Personal · Open source',
    role: 'Sole maker',
    year: '2025',
    stack: 'Swift · Rust',
    cover: 'dots',
  },
  {
    n: '04',
    name: 'Margin',
    blurb: 'Brand and product redesign for a YC fintech. Took the dashboard from Bootstrap to something the team is proud to demo.',
    tag: 'Client',
    role: 'Design & frontend',
    year: '2024',
    stack: 'Figma · React · Tailwind',
    cover: 'stripes',
  },
];

const SelectedWork = () => (
  <section id="work" style={{
    padding: '80px 48px 120px',
    borderTop: '1px solid var(--rule)',
  }}>
    <SectionHeader
      eyebrow="Selected work · 2024 — 2026"
      title="A few things I've shipped."
      right="04 projects"
    />

    <div style={{
      marginTop: 48,
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20,
    }}>
      {WORK.map((p) => <WorkCard key={p.n} p={p} />)}
    </div>
  </section>
);

const WorkCard = ({ p }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        background: '#fff',
        border: '1px solid var(--rule)',
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s, border-color .3s',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? '0 24px 48px -20px rgba(0,0,0,0.15)' : 'none',
        borderColor: hov ? '#d1d5db' : 'var(--rule)',
      }}
    >
      {/* cover */}
      <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: '#f3f4f6' }}>
        <div style={{
          position: 'absolute', inset: 0,
          transform: hov ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform .6s cubic-bezier(.2,.7,.3,1)',
        }}>
          <PlaceholderArt seed={p.name} variant={p.cover} />
        </div>

        <div style={{
          position: 'absolute', top: 14, left: 16, right: 16,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--mono)', fontSize: 10,
          color: 'rgba(255,255,255,0.75)', letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          <span>{p.n} · {p.tag}</span>
          <span>{p.year}</span>
        </div>

        <div style={{
          position: 'absolute', bottom: 14, right: 16,
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)', color: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15,
          transform: hov ? 'translate(-2px, -2px) rotate(-10deg)' : 'none',
          transition: 'transform .3s cubic-bezier(.2,.7,.3,1)',
        }}>↗</div>
      </div>

      {/* body */}
      <div style={{ padding: '24px 28px 28px' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline',
          justifyContent: 'space-between', gap: 12, marginBottom: 10,
        }}>
          <h3 style={{
            margin: 0, fontSize: 22, fontWeight: 500,
            letterSpacing: '-0.02em', lineHeight: 1.05,
          }}>{p.name}</h3>
          <span style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 14, color: 'var(--mute)', whiteSpace: 'nowrap',
          }}>— {p.role}</span>
        </div>

        <p style={{
          margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--mute)',
          maxWidth: '52ch',
        }}>{p.blurb}</p>

        <div style={{
          marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--rule)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--faint)',
        }}>
          <span>{p.stack}</span>
          <span style={{ color: 'var(--mute)' }}>view case study →</span>
        </div>
      </div>
    </a>
  );
};

Object.assign(window, { SelectedWork });
