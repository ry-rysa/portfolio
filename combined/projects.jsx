const PROJECTS = [
	{ id: 'nubi',        title: 'Nubi',                 github: 'https://github.com/ry-rysa',           tags: ['Mobile App', 'Software Engineer', 'UI/UX'] },
	{ id: 'cupof',       title: 'Cupof',                github: 'https://github.com/ry-rysa',           tags: ['Web Development', 'Mobile App', 'Software Engineer', 'UI/UX'] },
	{ id: 'drowsiness',  title: 'Drowsiness Detection', github: 'https://github.com/ry-rysa',           tags: ['Machine Learning', 'Computer Vision'] },
	{ id: 'bahasabuddy', title: 'BahasaBuddy',          github: 'https://github.com/ry-rysa',           tags: ['Web Development', 'Software Engineer', 'UI/UX'] },
	{ id: 'cardetector', title: 'Car Detector',         github: 'https://github.com/ry-rysa',           tags: ['Machine Learning', 'Computer Vision'] },
	{ id: 'career',      title: 'Career Prediction',    github: 'https://github.com/ry-rysa',           tags: ['Data Mining'] },
	{ id: 'goose',       title: 'Goose Chatbot',        github: 'https://github.com/ry-rysa',           tags: ['Web Development', 'NLP'] },
	{ id: 'portfolio',   title: 'Portfolio',            github: 'https://github.com/ry-rysa/portfolio', tags: ['Web Development', 'UI/UX'] },
];

const ALL_TAGS = ['All', 'Mobile App', 'Web Development', 'Software Engineer', 'UI/UX', 'Machine Learning', 'Computer Vision', 'Data Mining', 'NLP'];

const ICON_SIZE   = 128;
const ICON_RADIUS = 28;
const ITEM_GAP    = 180;
const ITEM_W      = 210;

const Projects = () => {
	const [selected, setSelected] = React.useState('All');
	const [open, setOpen]         = React.useState(false);
	const dropRef                 = React.useRef(null);
	const { isMobile }            = useResponsive();
	const [headingRef, headingInView] = useInView(0.3);
	const [gridRef, gridInView]       = useInView(0.05);

	React.useEffect(() => {
		const handler = (e) => {
			if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	const filtered = selected === 'All' ? PROJECTS : PROJECTS.filter(p => p.tags.includes(selected));

	return (
		<section id="projects" style={{ padding: isMobile ? '60px 20px 80px' : '80px 54px 100px' }}>
			<div style={{ maxWidth: 1160, margin: '0 auto' }}>
				<h2 ref={headingRef} style={{
					textAlign: 'center', margin: '0 0 40px',
					fontSize: 'clamp(28px, 3.5vw, 48px)',
					fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.025em',
					fontFamily: 'var(--sans)', color: 'var(--ink)',
					opacity: headingInView ? 1 : 0,
					transform: headingInView ? 'none' : 'translateY(18px)',
					transition: 'opacity 0.55s ease, transform 0.55s ease',
				}}>
					Selected Work <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 400, letterSpacing: 0 }}>:)</span>
				</h2>

				{/* Dropdown */}
				<div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? 48 : 72 }}>
					<div ref={dropRef} style={{ position: 'relative' }}>
						<button
							onClick={() => setOpen(o => !o)}
							style={{
								display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
								fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 400,
								color: 'var(--ink)', background: 'var(--card)',
								border: '1px solid var(--rule)', borderRadius: 8,
								padding: '8px 14px', cursor: 'pointer', outline: 'none',
								minWidth: 160,
							}}
						>
							{selected}
							<svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
								<path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>

						{open && (
							<div style={{
								position: 'absolute', top: 'calc(100% + 6px)', left: 0,
								minWidth: '100%', background: 'var(--card)',
								border: '1px solid var(--rule)', borderRadius: 10,
								boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
								overflow: 'hidden', zIndex: 20,
							}}>
								{ALL_TAGS.map(tag => (
									<div
										key={tag}
										onClick={() => { setSelected(tag); setOpen(false); }}
										style={{
											padding: '9px 16px',
											fontFamily: 'var(--sans)', fontSize: 13,
											color: selected === tag ? 'var(--ink)' : 'var(--mute)',
											fontWeight: selected === tag ? 500 : 400,
											background: selected === tag ? 'var(--surface)' : 'var(--card)',
											cursor: 'pointer',
											whiteSpace: 'nowrap',
											transition: 'background .1s',
										}}
										onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
										onMouseLeave={e => e.currentTarget.style.background = selected === tag ? 'var(--surface)' : 'var(--card)'}
									>
										{tag}
									</div>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Project grid — fixed height so filtering never shifts the page */}
				<div ref={gridRef} style={{
					display: 'flex', flexWrap: 'wrap',
					gap: isMobile ? '60px 24px' : `96px ${ITEM_GAP}px`,
					justifyContent: 'center', alignItems: 'flex-start',
					minHeight: isMobile ? undefined : 600,
					alignContent: 'flex-start',
				}}>
					{filtered.map((item, i) => (
						<div key={item.id} style={{
							display: 'flex', flexDirection: 'column',
							alignItems: 'center', gap: 12,
							flexShrink: 0, width: ITEM_W,
							opacity: gridInView ? 1 : 0,
							transform: gridInView ? 'none' : 'translateY(20px)',
							transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`,
						}}>
							<div style={{
								width: ICON_SIZE, height: ICON_SIZE,
								borderRadius: ICON_RADIUS,
								background: 'var(--surface)',
								border: '1px solid var(--rule)',
							}} />
							<span style={{
								fontSize: 14, color: 'var(--mute)',
								fontFamily: 'var(--sans)', fontWeight: 400,
								background: 'var(--card)', border: '1px solid var(--rule)',
								borderRadius: 999, padding: '5px 14px',
								whiteSpace: 'nowrap',
							}}>
								{item.title}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

Object.assign(window, { Projects });
