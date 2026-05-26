// Contact + Footer — clean, white, minimal

const Contact = () => {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef(null);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setPos({ x: (e.clientX - cx) * 0.05, y: (e.clientY - cy) * 0.05 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <section
      id="contact"
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        padding: '120px 48px 100px',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <SectionHeader eyebrow="Contact" title="Let's work together." />

      <div style={{ marginTop: 72, display: 'flex', justifyContent: 'center' }}>
        <a
          ref={ref}
          href="mailto:hi@ersya.co"
          style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(38px, 6vw, 90px)',
            lineHeight: 1, letterSpacing: '-0.025em',
            color: 'var(--ink)', textDecoration: 'none',
            transform: `translate(${pos.x}px, ${pos.y}px)`,
            transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
            display: 'inline-flex', alignItems: 'baseline', gap: 14,
          }}
        >
          hi@ersya.co
          <span style={{
            fontFamily: 'var(--sans)', fontStyle: 'normal',
            fontSize: 'clamp(16px, 1.6vw, 24px)',
            color: 'var(--mute)', transform: 'translateY(-1em)', display: 'inline-block',
          }}>↗</span>
        </a>
      </div>

      <div style={{
        marginTop: 72,
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14,
        maxWidth: 680, margin: '72px auto 0',
      }}>
        <ContactCard label="Email"  handle="hi@ersya.co" hint="Best for project enquiries"      href="mailto:hi@ersya.co" />
        <ContactCard label="GitHub" handle="@ersya"      hint="Code, side-projects, open source" href="https://github.com/" />
      </div>
    </section>
  );
};

const ContactCard = ({ label, handle, hint, href }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        textDecoration: 'none', color: 'var(--ink)',
        padding: '22px 24px',
        border: `1px solid ${hov ? 'var(--ink)' : 'var(--rule)'}`,
        borderRadius: 14,
        background: hov ? '#fafafa' : '#fff',
        display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 16,
        transition: 'border-color .15s, background .15s, transform .2s',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}
    >
      <div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--mute)',
          letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6,
        }}>{label}</div>
        <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em' }}>{handle}</div>
        <div style={{
          marginTop: 4, fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 14, color: 'var(--mute)',
        }}>— {hint}</div>
      </div>
      <span style={{ color: 'var(--mute)', fontSize: 18 }}>→</span>
    </a>
  );
};

const Footer = () => (
  <footer style={{
    padding: '28px 48px',
    borderTop: '1px solid var(--rule)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  }}>
    <span style={{ fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em' }}>
      Ersya Saskia
    </span>
    <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
      {[
        { label: 'GitHub',  href: 'https://github.com/' },
        { label: 'Email',   href: 'mailto:hi@ersya.co' },
      ].map(({ label, href }) => (
        <a key={label} href={href} style={{
          color: 'var(--mute)', textDecoration: 'none', fontSize: 14,
          transition: 'color .15s',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--mute)'}
        >{label}</a>
      ))}
      <span style={{ color: 'var(--mute)', fontSize: 14 }}>© 2026</span>
    </div>
  </footer>
);

Object.assign(window, { Contact, Footer });
