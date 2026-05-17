// Contact + Footer.
// Professional, recruitment-ready: big italic email as the moment,
// GitHub link beside it, simple two-line footer. No availability date,
// no "now" list, no decorative copy.

const Contact = () => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef(null);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setPos({
      x: (e.clientX - cx) * 0.05,
      y: (e.clientY - cy) * 0.05,
    });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <section
      id="contact"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        padding: '130px 64px 110px',
        borderTop: '1px solid var(--rule)',
        position: 'relative',
      }}
    >
      <SectionHeader
        eyebrow="Contact"
        title="Let's work together."
      />

      <div style={{ marginTop: 72, display: 'flex', justifyContent: 'center' }}>
        <a
          ref={ref}
          href="mailto:hi@ersya.co"
          style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(56px, 9vw, 140px)',
            lineHeight: 1, letterSpacing: '-0.025em',
            color: 'var(--ink)', textDecoration: 'none',
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
            display: 'inline-flex', alignItems: 'baseline', gap: 18,
            cursor: 'pointer',
          }}
        >
          hi@ersya.co
          <span style={{
            fontFamily: 'var(--sans)', fontStyle: 'normal',
            fontSize: 'clamp(18px, 1.8vw, 28px)',
            color: 'var(--mute)',
            transform: 'translateY(-1em)',
            display: 'inline-block',
          }}>
            ↗
          </span>
        </a>
      </div>

      <div style={{
        marginTop: 80,
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18,
        maxWidth: 760, margin: '80px auto 0',
      }}>
        <ContactCard
          label="Email"
          handle="hi@ersya.co"
          hint="Best for project enquiries"
          href="mailto:hi@ersya.co"
        />
        <ContactCard
          label="GitHub"
          handle="@ersya"
          hint="Code, side-projects, open source"
          href="https://github.com/"
        />
      </div>
    </section>
  );
};

const ContactCard = ({ label, handle, hint, href }) => (
  <a href={href} style={{
    textDecoration: 'none', color: 'var(--ink)',
    padding: '22px 24px', border: '1px solid var(--rule)', borderRadius: 14,
    background: '#fcfbf7',
    display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16,
    transition: 'background .15s, transform .15s, border-color .15s',
  }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#fff';
      e.currentTarget.style.borderColor = 'var(--ink)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#fcfbf7';
      e.currentTarget.style.borderColor = 'var(--rule)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    <div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)',
        letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6,
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 22, fontWeight: 500, letterSpacing: '-0.012em',
      }}>
        {handle}
      </div>
      <div style={{
        marginTop: 4, fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: 14, color: 'var(--mute)',
      }}>
        — {hint}
      </div>
    </div>
    <span style={{ color: 'var(--mute)', fontSize: 18 }}>→</span>
  </a>
);

const Footer = () => (
  <footer style={{
    padding: '32px 48px',
    borderTop: '1px solid var(--rule)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 24,
  }}>
    <span style={{
      fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em',
    }}>
      Ersya Saskia
    </span>
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <a href="https://github.com/" style={{
        color: 'var(--mute)', textDecoration: 'none', fontSize: 14,
      }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--mute)'}
      >
        GitHub
      </a>
      <a href="mailto:hi@ersya.co" style={{
        color: 'var(--mute)', textDecoration: 'none', fontSize: 14,
      }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--mute)'}
      >
        Email
      </a>
      <span style={{ color: 'var(--mute)', fontSize: 14, whiteSpace: 'nowrap' }}>
        © 2026
      </span>
    </div>
  </footer>
);

Object.assign(window, { Contact, Footer });
