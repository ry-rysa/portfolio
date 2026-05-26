// Nav + Hero (cycling greeting) + Passion Grid + Skills

const NAV = [
	{ id: 'personal', label: 'Personal' },
	{ id: 'work',     label: 'Work' },
	{ id: 'contact',  label: 'Contact' },
];


// ── NAV ──────────────────────────────────────────────────────
const Nav = () => {
	const [scrolled, setScrolled] = React.useState(false);
	const [active, setActive] = React.useState('personal');

	React.useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 24);
			const sections = NAV.map(n => document.getElementById(n.id));
			for (let i = sections.length - 1; i >= 0; i--) {
				const el = sections[i];
				if (el && el.getBoundingClientRect().top <= 100) {
					setActive(NAV[i].id); break;
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
			padding: '18px 48px',
			background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
			backdropFilter: scrolled ? 'blur(12px)' : 'none',
			WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
			borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
			transition: 'background .2s, border-color .2s',
		}}>
			<a href="#personal" style={{ textDecoration: 'none' }}>
				<span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
					Ersya Najwa Saskia
				</span>
			</a>

			<nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
				{NAV.map((n) => (
					<a key={n.id} href={`#${n.id}`} style={{
						textDecoration: 'none', fontSize: 14,
						color: active === n.id ? 'var(--ink)' : 'var(--mute)',
						fontWeight: active === n.id ? 500 : 400,
						transition: 'color .15s',
						position: 'relative',
					}}>
						{n.label}
						{active === n.id && (
							<span style={{
								position: 'absolute', left: 0, right: 0, bottom: -4,
								height: 1.5, background: 'var(--ink)',
							}} />
						)}
					</a>
				))}
			</nav>
		</header>
	);
};

// ── HERO ─────────────────────────────────────────────────────
const Hero = () => (
	<section style={{
		padding: '100px 48px 90px',
		textAlign: 'center',
		display: 'flex', flexDirection: 'column', alignItems: 'center',
	}}>
		{/* photo placeholder — replace inner <span> with <img> when ready */}
		<div style={{
			width: 110, height: 110, borderRadius: '50%',
			background: '#f3f4f6',
			border: '1px solid var(--rule)',
			marginBottom: 36,
			display: 'flex', alignItems: 'center', justifyContent: 'center',
			overflow: 'hidden',
		}}>
			<span style={{
				fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--faint)',
				letterSpacing: '0.1em', textTransform: 'uppercase',
			}}>photo</span>
		</div>

		<p style={{
			margin: 0,
			fontSize: 'clamp(16px, 1.9vw, 22px)',
			lineHeight: 1.5,
			letterSpacing: '-0.015em',
			color: 'var(--ink)',
			maxWidth: '32ch',
		}}>
			<span style={{ fontWeight: 600 }}>Hi!</span>
			{' '}I'm Saskia, a computer science student
			who loves to{' '}
			<SerifItalic word="research" />,{' '}
			<SerifItalic word="design" />, and{' '}
			<SerifItalic word="build" />.
		</p>

		<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 24 }}>
			<span style={{
				width: 7, height: 7, borderRadius: '50%', background: '#16a34a',
				boxShadow: '0 0 0 3px rgba(22,163,74,0.2)', display: 'inline-block', flexShrink: 0,
			}} />
			<span style={{ fontSize: 13, color: 'var(--mute)' }}>
				Available for projects — Jakarta
			</span>
		</div>
	</section>
);

const SerifItalic = ({ word }) => {
	const [hov, setHov] = React.useState(false);
	return (
		<span
			onMouseEnter={() => setHov(true)}
			onMouseLeave={() => setHov(false)}
			style={{
				fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
				display: 'inline-block',
				transform: hov ? 'translateY(-5px) rotate(-1deg)' : 'none',
				transition: 'transform .4s cubic-bezier(.34,1.56,.64,1)',
				cursor: 'default',
			}}
		>{word}</span>
	);
};

// ── PASSION GRID (3×3) ────────────────────────────────────────
const PASSION_ITEMS = [
	// ordered left-to-right so columns = Research | Design | Build
	{ cat: 'Research', title: 'AI & Machine Learning',       note: 'LLMs · embeddings · RAG'         },
	{ cat: 'Design',   title: 'UI & Product Design',         note: 'Figma · components · systems'    },
	{ cat: 'Build',    title: 'Web Development',              note: 'React · Next.js · TypeScript'    },

	{ cat: 'Research', title: 'Human–Computer Interaction',  note: 'How people actually use things'  },
	{ cat: 'Design',   title: 'Typography',                  note: 'Type as an interface element'    },
	{ cat: 'Build',    title: 'Native Apps',                 note: 'Swift · SwiftUI · macOS & iOS'   },

	{ cat: 'Research', title: 'Design Research',             note: 'Methods · user interviews'       },
	{ cat: 'Design',   title: 'Motion & Interaction',        note: 'Animation · micro-interactions'  },
	{ cat: 'Build',    title: 'Open Source',                 note: 'Tools people actually use'       },
];

const Focus = () => (
	<section style={{ padding: '0 48px 100px', borderTop: '1px solid var(--rule)' }}>
		<div style={{ paddingTop: 56, marginBottom: 32 }}>
			<SectionHeader eyebrow="What I care about" title="Research, design, build." />
		</div>
		<div style={{
			display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
			gap: 1,
			border: '1px solid var(--rule)', borderRadius: 16,
			overflow: 'hidden',
			background: 'var(--rule)',
		}}>
			{PASSION_ITEMS.map((item, i) => <PassionTile key={i} {...item} />)}
		</div>
	</section>
);

const PassionTile = ({ cat, title, note }) => {
	const [hov, setHov] = React.useState(false);
	return (
		<div
			onMouseEnter={() => setHov(true)}
			onMouseLeave={() => setHov(false)}
			style={{
				background: hov ? '#f9fafb' : '#fff',
				padding: '28px 24px',
				minHeight: 130,
				display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
				transition: 'background .15s',
				cursor: 'default',
			}}
		>
			<div style={{
				fontFamily: 'var(--mono)', fontSize: 10,
				color: hov ? 'var(--mute)' : 'var(--faint)',
				letterSpacing: '0.12em', textTransform: 'uppercase',
				transition: 'color .15s',
			}}>{cat}</div>
			<div>
				<div style={{
					fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3,
				}}>{title}</div>
				<div style={{
					marginTop: 5, fontFamily: 'var(--mono)', fontSize: 10,
					color: 'var(--faint)', letterSpacing: '0.05em',
				}}>{note}</div>
			</div>
		</div>
	);
};

// ── SKILLS ───────────────────────────────────────────────────
const SKILLS = [
	{ name: 'HTML & CSS',     role: 'Structure · Style',     years: '6 yrs' },
	{ name: 'JavaScript',     role: 'JS · TypeScript',        years: '5 yrs' },
	{ name: 'React / Next',   role: 'Frontend framework',     years: '4 yrs' },
	{ name: 'Swift',          role: 'macOS · iOS apps',       years: '3 yrs' },
	{ name: 'Python',         role: 'AI · scripting',         years: '4 yrs' },
	{ name: 'Figma',          role: 'Design · prototyping',   years: '5 yrs' },
];

const Skills = () => (
	<section style={{ padding: '0 48px 120px', borderTop: '1px solid var(--rule)' }}>
		<div style={{ paddingTop: 64, marginBottom: 40 }}>
			<SectionHeader eyebrow="Languages & tools" title="The toolkit." right="Daily drivers." />
		</div>
		<div style={{
			display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
			gap: 1, border: '1px solid var(--rule)', borderRadius: 16,
			overflow: 'hidden', background: 'var(--rule)',
		}}>
			{SKILLS.map((s, i) => (
				<SkillRow key={s.name} i={i} {...s} />
			))}
		</div>
	</section>
);

const SkillRow = ({ name, role, years }) => {
	const [hov, setHov] = React.useState(false);
	return (
		<div
			onMouseEnter={() => setHov(true)}
			onMouseLeave={() => setHov(false)}
			style={{
				background: hov ? '#f9fafb' : '#fff',
				padding: '24px 28px',
				display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
				transition: 'background .15s',
				cursor: 'default',
			}}
		>
			<div>
				<div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em' }}>{name}</div>
				<div style={{
					marginTop: 3, fontFamily: 'var(--serif)', fontStyle: 'italic',
					fontSize: 14, color: 'var(--mute)',
				}}>{role}</div>
			</div>
			<span style={{
				fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--faint)',
				letterSpacing: '0.08em', flexShrink: 0,
			}}>{years}</span>
		</div>
	);
};

// ── SECTION HEADER ───────────────────────────────────────────
const SectionHeader = ({ eyebrow, title, right }) => (
	<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
		<div>
			<div style={{
				fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)',
				letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12,
			}}>{eyebrow}</div>
			<h2 style={{
				margin: 0, fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.05,
				letterSpacing: '-0.03em', fontWeight: 500,
				fontFamily: 'var(--serif)', fontStyle: 'italic',
			}}>{title}</h2>
		</div>
		{right && (
			<div style={{
				fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--mute)',
				letterSpacing: '0.12em', textTransform: 'uppercase',
			}}>{right}</div>
		)}
	</div>
);

Object.assign(window, { Nav, Hero, Focus, Skills, SectionHeader });
