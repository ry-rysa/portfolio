const PROJECTS = [
	{ id: 'nubi',        title: 'Nubi',                 desc: 'A mobile journaling & mood-tracking app to reflect on daily experiences.',      color1: '#dbeafe', color2: '#bfdbfe', url: '', github: 'https://github.com/ry-rysa',           tags: ['Mobile App', 'Software Engineer', 'UI/UX'] },
	{ id: 'cupof',       title: 'Cupof',                desc: 'A web & mobile platform connecting users over shared coffee experiences.',        color1: '#fce7f3', color2: '#fbcfe8', url: '', github: 'https://github.com/ry-rysa',           tags: ['Web Development', 'Mobile App', 'Software Engineer', 'UI/UX'] },
	{ id: 'drowsiness',  title: 'Drowsiness Detection', desc: 'Real-time driver drowsiness detection using computer vision and ML models.',      color1: '#fef9c3', color2: '#fde68a', url: '', github: 'https://github.com/ry-rysa',           tags: ['Machine Learning', 'Computer Vision'] },
	{ id: 'bahasabuddy', title: 'BahasaBuddy',          desc: 'A web app for learning Bahasa Indonesia through interactive exercises.',          color1: '#d1fae5', color2: '#a7f3d0', url: '', github: 'https://github.com/ry-rysa',           tags: ['Web Development', 'Software Engineer', 'UI/UX'] },
	{ id: 'cardetector', title: 'Car Detector',         desc: 'Detects and classifies car models from images using deep learning.',              color1: '#e0e7ff', color2: '#c7d2fe', url: '', github: 'https://github.com/ry-rysa',           tags: ['Machine Learning', 'Computer Vision'] },
	{ id: 'career',      title: 'Career Prediction',    desc: 'Predicts suitable career paths based on skills and personality via data mining.',  color1: '#fef3c7', color2: '#fde68a', url: '', github: 'https://github.com/ry-rysa',           tags: ['Data Mining'] },
	{ id: 'goose',       title: 'Goose Chatbot',        desc: 'An NLP-powered chatbot for document-grounded Q&A on the web.',                   color1: '#ecfdf5', color2: '#d1fae5', url: '', github: 'https://github.com/ry-rysa',           tags: ['Web Development', 'NLP'] },
	{ id: 'portfolio',   title: 'Portfolio',            desc: 'This portfolio — built with React, Three.js, and a 3D cat character.',            color1: '#f3f4f6', color2: '#e5e7eb', url: 'https://rysa-portfolio.vercel.app', github: 'https://github.com/ry-rysa/portfolio', tags: ['Web Development', 'UI/UX'] },
];

const ALL_TAGS = ['All', 'Mobile App', 'Web Development', 'Software Engineer', 'UI/UX', 'Machine Learning', 'Computer Vision', 'Data Mining', 'NLP'];

const ICON_SIZE   = 128;
const ICON_RADIUS = 28;
const ITEM_GAP    = 180;
const ITEM_W      = 210;

const ProjectCard = ({ item, isBlurred, isHovered, onEnter, onLeave, inView, index }) => {
	const { isTablet } = useResponsive();
	const iconW = isTablet ? '72%' : ICON_SIZE;

	return (
		<div
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			style={{
				position: 'relative',
				display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
				opacity: inView ? 1 : 0,
				transform: inView ? 'none' : 'translateY(20px)',
				transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
				zIndex: isHovered ? 40 : 1,
			}}
		>
			{/* Icon + pill — blurred when another card is hovered */}
			<div style={{
				display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
				filter: isBlurred ? 'blur(3px)' : 'none',
				opacity: isBlurred ? 0.3 : 1,
				transition: 'filter 0.3s, opacity 0.3s',
			}}>
				<div style={{
					width: iconW, aspectRatio: '1',
					borderRadius: ICON_RADIUS,
					background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`,
					border: '1px solid var(--rule)',
				}} />
				<span style={{
					fontSize: isTablet ? 12 : 14, color: 'var(--mute)',
					fontFamily: 'var(--sans)', fontWeight: 400,
					background: 'var(--card)', border: '1px solid var(--rule)',
					borderRadius: 999, padding: isTablet ? '4px 10px' : '5px 14px',
					whiteSpace: 'nowrap',
				}}>
					{item.title}
				</span>
			</div>

			{/* Hover overlay */}
			{isHovered && (
				<div style={{
					position: 'absolute',
					top: '-80px', left: '50%',
					transform: 'translateX(-50%)',
					width: 300,
					padding: '0 4px',
					zIndex: 40,
					animation: 'card-pop 0.2s cubic-bezier(.34,1.4,.64,1)',
				}}>
					{/* 2 stacked screenshots */}
					<div style={{ position: 'relative', height: 170, marginBottom: 18, display: 'flex', justifyContent: 'center' }}>
						{/* Back card */}
						<div style={{
							position: 'absolute',
							width: 130, height: 158,
							borderRadius: 18,
							background: `linear-gradient(150deg, ${item.color2}, ${item.color1})`,
							boxShadow: '0 8px 28px rgba(0,0,0,0.13)',
							transform: 'rotate(-10deg) translateX(-34px) translateY(8px)',
							overflow: 'hidden',
						}}>
							<div style={{ width: '100%', height: '28%', background: 'rgba(255,255,255,0.25)', borderBottom: '1px solid rgba(255,255,255,0.2)' }} />
						</div>
						{/* Front card */}
						<div style={{
							position: 'absolute',
							width: 130, height: 158,
							borderRadius: 18,
							background: `linear-gradient(150deg, ${item.color1}, #fff)`,
							boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
							transform: 'rotate(6deg) translateX(34px)',
							overflow: 'hidden',
						}}>
							<div style={{ width: '100%', height: '28%', background: 'rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(0,0,0,0.05)' }} />
							<div style={{ margin: '10px 14px 0', display: 'flex', flexDirection: 'column', gap: 7 }}>
								{[70, 50, 60].map((w, i) => <div key={i} style={{ height: 6, width: `${w}%`, borderRadius: 4, background: 'rgba(0,0,0,0.08)' }} />)}
							</div>
						</div>
					</div>

					{/* Icon */}
					<div style={{
						width: 52, height: 52,
						borderRadius: 14,
						background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`,
						border: '1px solid var(--rule)',
						margin: '0 auto 10px',
					}} />

					{/* Title */}
					<div style={{
						fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 17,
						color: 'var(--ink)', textAlign: 'center',
						letterSpacing: '-0.01em', marginBottom: 7,
					}}>{item.title}</div>

					{/* Description */}
					<div style={{
						fontFamily: 'var(--sans)', fontSize: 13,
						color: 'var(--mute)', textAlign: 'center',
						lineHeight: 1.6, marginBottom: 16,
					}}>{item.desc}</div>

					{/* View button */}
					<div style={{ textAlign: 'center' }}>
						<a
							href={item.url || item.github}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: 'inline-block',
								fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
								color: 'var(--ink)',
								border: '1px solid var(--rule)', borderRadius: 999,
								padding: '8px 20px', textDecoration: 'none',
								transition: 'background .15s',
							}}
							onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
							onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
						>View →</a>
					</div>
				</div>
			)}
		</div>
	);
};

const Projects = () => {
	const [selected,  setSelected]  = React.useState('All');
	const [open,      setOpen]      = React.useState(false);
	const [hoveredId, setHoveredId] = React.useState(null);
	const dropRef = React.useRef(null);
	const { isMobile, isTablet } = useResponsive();
	const [headingRef, headingInView] = useInView(0.3);
	const [gridRef,    gridInView]    = useInView(0.05);

	React.useEffect(() => {
		const handler = (e) => {
			if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	const filtered = selected === 'All' ? PROJECTS : PROJECTS.filter(p => p.tags.includes(selected));

	return (
		<section id="projects" style={{ padding: isMobile ? '60px 20px 120px' : '80px 54px 160px' }}>
			<style>{`
				@keyframes card-pop {
					from { opacity: 0; transform: translateX(-50%) scale(0.92); }
					to   { opacity: 1; transform: translateX(-50%) scale(1); }
				}
			`}</style>
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
					Projects <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 400, letterSpacing: 0 }}>:)</span>
				</h2>

				{/* Dropdown */}
				<div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? 64 : 100 }}>
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
											cursor: 'pointer', whiteSpace: 'nowrap',
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

				{/* Grid */}
				<div ref={gridRef} style={{
					display: 'grid',
					gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : `repeat(3, ${ITEM_W}px)`,
					gap: isTablet ? '40px 20px' : `96px ${ITEM_GAP}px`,
					justifyContent: 'center',
					minHeight: isTablet ? undefined : 600,
					alignContent: 'flex-start',
					position: 'relative',
				}}>
					{filtered.map((item, i) => (
						<ProjectCard
							key={item.id}
							item={item}
							index={i}
							inView={gridInView}
							isHovered={!isMobile && hoveredId === item.id}
							isBlurred={!isMobile && hoveredId !== null}
							onEnter={() => !isMobile && setHoveredId(item.id)}
							onLeave={() => !isMobile && setHoveredId(null)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

Object.assign(window, { Projects });
