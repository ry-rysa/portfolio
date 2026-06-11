const PROJECTS = [
	{ id: 'nubi',        title: 'Nubi Wallet',           desc: 'A mobile journaling & mood-tracking app to reflect on daily experiences.',      color1: '#dbeafe', color2: '#bfdbfe', icon: 'assets/icon-project/nubi/Logo - Light.png', screenshot1: 'assets/icon-project/nubi/Card 1 - Brand.png', screenshot2: 'assets/icon-project/nubi/Card 2 - Wallet.png', url: 'https://github.com/ry-rysa/nubi-wallet', github: 'https://github.com/ry-rysa/nubi-wallet', tags: ['Mobile App', 'Software Engineer', 'UI/UX'] },
	{ id: 'cupof',       title: 'Cupof',                desc: 'A web & mobile platform connecting users over shared coffee experiences.',        color1: '#fce7f3', color2: '#fbcfe8', url: '', github: 'https://github.com/ry-rysa',           tags: ['Web Development', 'Mobile App', 'Software Engineer', 'UI/UX'] },
	{ id: 'drowsiness',  title: 'Drowsiness Detection', desc: 'Real-time driver drowsiness detection using computer vision and ML models.',      color1: '#fef9c3', color2: '#fde68a', icon: 'assets/icon-project/drowsiness detection/Logo.png', screenshot1: 'assets/icon-project/drowsiness detection/Card 1 - Brand.png', screenshot2: 'assets/icon-project/drowsiness detection/Card 2 - Metrics.png', url: '', github: 'https://github.com/ry-rysa',           tags: ['Machine Learning', 'Computer Vision'] },
	{ id: 'bahasabuddy', title: 'BahasaBuddy',          desc: "A web app for learning Indonesian regional languages through placement tests, daily lessons, and self-paced practice.",          color1: '#d1fae5', color2: '#a7f3d0', icon: 'assets/icon-project/bahasabuddy/Bb Logo.png', screenshot1: 'assets/icon-project/bahasabuddy/Card 1 - Brand.png', screenshot2: 'assets/icon-project/bahasabuddy/Card 2 - Languages.png', url: 'https://github.com/robertlyon7/Bahasa-Buddy', github: 'https://github.com/robertlyon7/Bahasa-Buddy', tags: ['Web Development', 'Software Engineer', 'UI/UX'] },
	{ id: 'cardetector', title: 'Car Detector',         desc: 'Detects and classifies car models from images using deep learning.',              color1: '#e0e7ff', color2: '#c7d2fe', icon: 'assets/icon-project/car detector/Logo.png', screenshot1: 'assets/icon-project/car detector/Card 1 - Brand.png', screenshot2: 'assets/icon-project/car detector/Card 2 - Result.png', url: '', github: 'https://github.com/ry-rysa',           tags: ['Machine Learning', 'Computer Vision'] },
	{ id: 'career',      title: 'Career Prediction',    desc: "Multi-label resume classifier that\nrecommends CS job roles.\nTrained on ~4,000 resumes\nLightGBM hit 0.995 micro-F1", color1: '#f3f4f6', color2: '#e5e7eb', url: '', github: 'https://github.com/stefani-gifta/dm-CareerPrediction-2025', hideScreenshots: true, tags: ['Data Mining'] },
	{ id: 'goose',       title: 'Goose Chatbot',        desc: 'An AI-powered chatbot that explains any AI concept in simple, everyday terms with an optional summarize feature.', color1: '#c8e6d8', color2: '#a3ccba', icon: 'assets/icon-project/goose/Logo.png', screenshot1: 'assets/icon-project/goose/Card 1 - Brand.png', screenshot2: 'assets/icon-project/goose/Card 2 - Chat.png', url: '', github: 'https://github.com/stefani-gifta/laravel11-GooSe-2025', tags: ['Web Development', 'NLP'] },
	{ id: 'portfolio',   title: 'Portfolio',            desc: "You're already here :)\nPersonal portfolio built with react,\nThree.js, and 3D character", color1: '#f3f4f6', color2: '#e5e7eb', icon: 'assets/icon-project/icon-portfolio.png', url: 'https://github.com/ry-rysa/portfolio', github: 'https://github.com/ry-rysa/portfolio', hideScreenshots: true, tags: ['Web Development', 'UI/UX'] },
];

const ALL_TAGS = ['All', 'Mobile App', 'Web Development', 'Software Engineer', 'UI/UX', 'Machine Learning', 'Computer Vision', 'Data Mining', 'NLP'];

const ICON_SIZE   = 128;
const ICON_RADIUS = 28;
const ITEM_GAP    = 180;
const ITEM_W      = 210;

const ProjectCard = ({ item, isBlurred, isHovered, onEnter, onLeave, onTap, inView, index, isMobile }) => {
	const { isTablet } = useResponsive();
	const iconW = isMobile ? 100 : isTablet ? 120 : ICON_SIZE;
	const cardRef = React.useRef(null);
	const [mobilePos, setMobilePos] = React.useState(null);

	React.useEffect(() => {
		if (!isHovered || !isMobile) { setMobilePos(null); return; }
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const ow = Math.min(200, window.innerWidth - 20);
		let left = rect.left + rect.width / 2 - ow / 2;
		left = Math.max(8, Math.min(window.innerWidth - ow - 8, left));
		const overlayH = 295;
		let top = rect.top + rect.height / 2 - overlayH / 2;
		top = Math.max(8, Math.min(window.innerHeight - overlayH - 8, top));
		setMobilePos({ top, left, width: ow });
	}, [isHovered, isMobile]);

	return (
		<div
			ref={cardRef}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			onClick={isMobile ? onTap : undefined}
			style={{
				position: 'relative',
				display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
				opacity: inView ? 1 : 0,
				transform: inView ? 'none' : 'translateY(20px)',
				transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
				zIndex: isHovered ? 40 : 1,
				cursor: isMobile ? 'pointer' : 'default',
			}}
		>
			{/* Icon + pill — blurred when another card is hovered */}
			<div style={{
				display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
				filter: isBlurred ? 'blur(2.5px)' : 'none',
				opacity: isBlurred ? 0.5 : 1,
				transition: 'filter 0.45s ease, opacity 0.45s ease',
			}}>
				{item.icon
					? <img src={item.icon} alt={item.title} style={{ width: iconW, height: iconW, borderRadius: ICON_RADIUS, objectFit: 'cover', display: 'block', border: '1px solid var(--rule)' }} />
					: <div style={{ width: iconW, aspectRatio: '1', borderRadius: ICON_RADIUS, background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`, border: '1px solid var(--rule)' }} />
				}
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
			{isHovered && (!isMobile || mobilePos) && (
				<div style={{
					position: isMobile ? 'fixed' : 'absolute',
					...(isMobile
						? { top: mobilePos.top, left: mobilePos.left, transform: 'none', width: mobilePos.width }
						: { top: item.hideScreenshots ? '-30px' : '-110px', left: '50%', transform: 'translateX(-50%)', width: 300 }
					),
					padding: '0 4px',
					zIndex: 1000,
					animation: isMobile ? 'card-pop-mobile 0.22s cubic-bezier(.34,1.4,.64,1)' : 'card-pop 0.2s cubic-bezier(.34,1.4,.64,1)',
				}}>
					{/* 2 stacked screenshots — hidden if hideScreenshots */}
					{!item.hideScreenshots && (
						<div style={{ position: 'relative', height: isMobile ? 120 : 170, marginBottom: isMobile ? 6 : 8, display: 'flex', justifyContent: 'center' }}>
							{/* Back card */}
							<div style={{
								position: 'absolute',
								width: isMobile ? 88 : 130, height: isMobile ? 108 : 158,
								borderRadius: isMobile ? 13 : 18,
								background: item.screenshot1 ? undefined : `linear-gradient(150deg, ${item.color2}, ${item.color1})`,
								boxShadow: '0 8px 28px rgba(0,0,0,0.13)',
								transform: `rotate(-10deg) translateX(${isMobile ? '-22px' : '-34px'}) translateY(${isMobile ? '5px' : '8px'})`,
								overflow: 'hidden',
							}}>
								{item.screenshot1
									? <img src={item.screenshot1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
									: <div style={{ width: '100%', height: '28%', background: 'rgba(255,255,255,0.25)', borderBottom: '1px solid rgba(255,255,255,0.2)' }} />
								}
							</div>
							{/* Front card */}
							<div style={{
								position: 'absolute',
								width: isMobile ? 88 : 130, height: isMobile ? 108 : 158,
								borderRadius: isMobile ? 13 : 18,
								background: item.screenshot2 ? undefined : `linear-gradient(150deg, ${item.color1}, #fff)`,
								boxShadow: '0 10px 32px rgba(0,0,0,0.15)',
								transform: `rotate(6deg) translateX(${isMobile ? '22px' : '34px'})`,
								overflow: 'hidden',
							}}>
								{item.screenshot2
									? <img src={item.screenshot2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
									: <>
										<div style={{ width: '100%', height: '28%', background: 'rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(0,0,0,0.05)' }} />
										<div style={{ margin: isMobile ? '7px 10px 0' : '10px 14px 0', display: 'flex', flexDirection: 'column', gap: isMobile ? 5 : 7 }}>
											{[70, 50, 60].map((w, i) => <div key={i} style={{ height: isMobile ? 5 : 6, width: `${w}%`, borderRadius: 4, background: 'rgba(0,0,0,0.08)' }} />)}
										</div>
									</>
								}
							</div>
						</div>
					)}

					{/* Icon */}
					{item.icon
						? <img src={item.icon} alt={item.title} style={{ width: isMobile ? 36 : 52, height: isMobile ? 36 : 52, borderRadius: isMobile ? 10 : 14, objectFit: 'cover', display: 'block', margin: '0 auto 8px', border: '1px solid var(--rule)' }} />
						: <div style={{ width: isMobile ? 36 : 52, height: isMobile ? 36 : 52, borderRadius: isMobile ? 10 : 14, background: `linear-gradient(135deg, ${item.color1}, ${item.color2})`, border: '1px solid var(--rule)', margin: '0 auto 8px' }} />
					}

					{/* Title */}
					<div style={{
						fontFamily: 'var(--sans)', fontWeight: 600, fontSize: isMobile ? 14 : 17,
						color: 'var(--ink)', textAlign: 'center',
						letterSpacing: '-0.01em', marginBottom: isMobile ? 5 : 7,
					}}>{item.title}</div>

					{/* Description */}
					<div style={{
						fontFamily: 'var(--sans)', fontSize: isMobile ? 13 : 15,
						color: 'var(--ink)', textAlign: 'center',
						lineHeight: 1.5, marginBottom: isMobile ? 10 : 16,
						whiteSpace: 'pre-line', opacity: 0.7,
					}}>{item.desc}</div>

					{/* View button */}
					<div style={{ textAlign: 'center' }}>
						<a
							href={item.url || item.github}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: 'inline-block',
								fontFamily: 'var(--sans)', fontSize: isMobile ? 11 : 13, fontWeight: 500,
								color: 'var(--ink)',
								border: '1px solid var(--rule)', borderRadius: 999,
								padding: isMobile ? '6px 14px' : '8px 20px', textDecoration: 'none',
								background: 'var(--card)',
								transition: 'background .15s',
							}}
							onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
							onMouseLeave={e => e.currentTarget.style.background = 'var(--card)'}
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

	React.useEffect(() => {
		if (!hoveredId) return;
		const onScroll = () => setHoveredId(null);
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [hoveredId]);

	const filtered = selected === 'All' ? PROJECTS : PROJECTS.filter(p => p.tags.includes(selected));

	return (
		<section id="projects" style={{ padding: isMobile ? '60px 20px 120px' : '80px 54px 160px' }}>
			<style>{`
				@keyframes card-pop {
					from { opacity: 0; transform: translateX(-50%) scale(0.92); }
					to   { opacity: 1; transform: translateX(-50%) scale(1); }
				}
				@keyframes card-pop-mobile {
					from { opacity: 0; transform: scale(0.88) translateY(8px); }
					to   { opacity: 1; transform: scale(1) translateY(0); }
				}
			`}</style>
			{/* Mobile backdrop */}
			{isMobile && hoveredId && (
				<div
					onClick={() => setHoveredId(null)}
					style={{
						position: 'fixed', inset: 0, zIndex: 999,
					}}
				/>
			)}
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
							isMobile={isMobile}
							isHovered={hoveredId === item.id}
							isBlurred={hoveredId !== null}
							onEnter={() => !isMobile && setHoveredId(item.id)}
							onLeave={() => !isMobile && setHoveredId(null)}
							onTap={() => setHoveredId(hoveredId === item.id ? null : item.id)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

Object.assign(window, { Projects });
