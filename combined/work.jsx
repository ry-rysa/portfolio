// Selected Work — clean 2×2 grid of 4 professional project cards.
// No drag, no shuffle. Subtle hover lift, large cover area, restrained
// type. Closer to the Crystal Wang / Framewell references.

// Trimmed to four headline works.
const WORK = [
  {
    n: '01',
    name: 'Lumen',
    blurb: 'An AI reading companion that turns PDFs into living documents — your highlights become searchable, your questions get answered.',
    tag: 'Personal',
    role: 'Design & engineering',
    year: '2026',
    stack: 'Next.js · Postgres · gpt-4o',
    cover: 'stripes',
  },
  {
    n: '02',
    name: 'Foldspace',
    blurb: 'Embedding-space visualiser for ML teams. Drop a CSV of vectors, get a draggable 3D map with semantic clustering and labels.',
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
    blurb: 'Brand and product redesign for a fintech startup. Took the dashboard from a Bootstrap mess to something the team is proud to demo.',
    tag: 'Client',
    role: 'Design & frontend',
    year: '2024',
    stack: 'Figma · React · Tailwind',
    cover: 'stripes',
  },
];

const SelectedWork = () => (
  <section id="work" style={{
    padding: '60px 64px 110px',
    borderTop: '1px solid var(--rule)',
  }}>
    <SectionHeader
      eyebrow="Selected work · 2024 — 2026"
      title="A few things I've shipped."
      right="04 projects"
    />

    <div style={{
      marginTop: 48,
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28,
    }}>
      {WORK.map((p) => (
        <WorkCard key={p.n} p={p} />
      ))}
    </div>
  </section>
);

const WorkCard = ({ p }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'block', textDecoration: 'none', color: 'inherit',
        background: '#fcfbf7',
        border: '1px solid var(--rule)',
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'transform .35s cubic-bezier(.2,.7,.3,1), box-shadow .35s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 30px 60px -28px rgba(0,0,0,0.25)'
          : '0 1px 0 rgba(0,0,0,0.02)',
      }}
    >
      {/* cover */}
      <div style={{
        aspectRatio: '16 / 9',
        position: 'relative',
        background: '#000', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform .7s cubic-bezier(.2,.7,.3,1)',
        }}>
          <PlaceholderArt seed={p.name} variant={p.cover} />
        </div>

        {/* top-left meta strip */}
        <div style={{
          position: 'absolute', top: 16, left: 16, right: 16,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--mono)', fontSize: 11,
          color: 'rgba(255,255,255,0.78)', letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          <span>{p.n} · {p.tag}</span>
          <span>{p.year}</span>
        </div>

        {/* hover arrow */}
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          width: 40, height: 40, borderRadius: '50%',
          background: '#fff', color: 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
          transform: hovered ? 'translate(-2px, -2px) rotate(-8deg)' : 'translate(0,0) rotate(0)',
          transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
        }}>↗</div>
      </div>

      {/* body */}
      <div style={{ padding: 28 }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16,
        }}>
          <h3 style={{
            margin: 0, fontSize: 32, fontWeight: 500, letterSpacing: '-0.022em',
            lineHeight: 1.05,
          }}>
            {p.name}
          </h3>
          <span style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 16, color: 'var(--mute)',
          }}>
            — {p.role}
          </span>
        </div>

        <p style={{
          margin: '12px 0 0', fontSize: 14.5, lineHeight: 1.55, color: '#3a3a35',
          maxWidth: '52ch',
        }}>
          {p.blurb}
        </p>

        <div style={{
          marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--rule)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)',
          letterSpacing: '0.06em',
        }}>
          <span>{p.stack}</span>
          <span>view case study →</span>
        </div>
      </div>
    </a>
  );
};

Object.assign(window, { SelectedWork });
