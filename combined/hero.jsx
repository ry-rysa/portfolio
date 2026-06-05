// Nav + Hero (cycling greeting) + Passion Grid + Skills

const SECTIONS = ['personal', 'about', 'work', 'contact'];
const NAV = [
	{ label: 'Home',     href: '#personal', activeId: 'personal' },
	{ label: 'About',    href: '#about',    activeId: 'about'    },
	{ label: 'Projects', href: '#work',     activeId: 'work'     },
	{ label: 'Contact',  href: '#contact',  activeId: 'contact'  },
];


// ── DARK MODE TOGGLE ─────────────────────────────────────────
const DarkModeToggle = () => {
	const [dark, setDark] = React.useState(
		() => document.documentElement.getAttribute('data-theme') === 'dark'
	);
	const { isMobile } = useResponsive();
	const toggle = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
		localStorage.setItem('theme', next ? 'dark' : 'light');
	};
	return (
		<button onClick={toggle} style={{
			position: 'absolute', right: isMobile ? 20 : 54,
			width: 34, height: 34, borderRadius: '50%',
			background: 'transparent', border: '1px solid var(--rule)',
			cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
			color: 'var(--mute)', outline: 'none', transition: 'border-color .2s, color .2s',
		}}>
			{dark
				? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
				: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
			}
		</button>
	);
};

// ── NAV ──────────────────────────────────────────────────────
const Nav = () => {
	const [scrolled, setScrolled] = React.useState(false);
	const [active, setActive] = React.useState('personal');
	const { isMobile } = useResponsive();

	React.useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 24);
			for (let i = SECTIONS.length - 1; i >= 0; i--) {
				const el = document.getElementById(SECTIONS[i]);
				if (el && el.getBoundingClientRect().top <= 100) {
					setActive(SECTIONS[i]); break;
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
			display: 'flex', alignItems: 'center', justifyContent: 'center',
			padding: isMobile ? '14px 20px' : '24px 54px',
			background: scrolled ? 'var(--nav-bg)' : 'transparent',
			backdropFilter: scrolled ? 'blur(12px)' : 'none',
			WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
			borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
			transition: 'background .2s, border-color .2s',
		}}>
			<nav style={{ display: 'flex', gap: isMobile ? 16 : 32, alignItems: 'center' }}>
				{NAV.map((n) => (
					<a key={n.label} href={n.href} style={{
						textDecoration: 'none',
						fontSize: isMobile ? 14 : 19,
						color: active === n.activeId ? 'var(--ink)' : 'var(--mute)',
						fontWeight: active === n.activeId ? 500 : 400,
						transition: 'color .15s',
						position: 'relative',
					}}>
						{n.label}
						{active === n.activeId && (
							<span style={{
								position: 'absolute', left: 0, right: 0, bottom: -4,
								height: 1.5, background: 'var(--ink)',
							}} />
						)}
					</a>
				))}
			</nav>
			<DarkModeToggle />
		</header>
	);
};

// ── THREE.JS CHARACTER ────────────────────────────────────────
const ThreeCharacter = ({ url }) => {
	const mountRef = React.useRef(null);

	React.useEffect(() => {
		const mount = mountRef.current;
		if (!mount || !window.THREE || !window.THREE.GLTFLoader) return;

		const THREE = window.THREE;
		const w = mount.clientWidth;
		const h = mount.clientHeight;

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setSize(w, h);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.outputEncoding = THREE.sRGBEncoding;
		mount.appendChild(renderer.domElement);

		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
		camera.position.set(0, 1.6, 5.5);
		camera.lookAt(0, 1.2, 0);

		scene.add(new THREE.AmbientLight(0x999999, 1.0));
		const sun = new THREE.DirectionalLight(0xaaaaaa, 1.0);
		sun.position.set(4, 8, 6);
		scene.add(sun);
		const fill = new THREE.DirectionalLight(0x888888, 0.4);
		fill.position.set(-4, 2, -4);
		scene.add(fill);

		let model = null;
		let headBone = null;
		let headInitRot = { x: 0, y: 0, z: 0 };
		let mixer = null;
		const clock = new THREE.Clock();

		// Mouse tracking — normalised -1..1
		const mouse = { x: 0, y: 0 };
		const current = { x: 0, y: 0, z: 0 };
		let lastMouseMove = 0;
		const onMouseMove = (e) => {
			mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1;
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
			lastMouseMove = performance.now();
		};
		const onTouchMove = (e) => {
			const t = e.touches[0];
			mouse.x =  (t.clientX / window.innerWidth)  * 2 - 1;
			mouse.y = -(t.clientY / window.innerHeight) * 2 + 1;
			lastMouseMove = performance.now();
		};
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('touchmove', onTouchMove, { passive: true });

		const loader = new THREE.GLTFLoader();
		loader.load(url, (gltf) => {
			model = gltf.scene;

			const box = new THREE.Box3().setFromObject(model);
			const size = box.getSize(new THREE.Vector3());
			const center = box.getCenter(new THREE.Vector3());
			const scale = 2.8 / Math.max(size.x, size.y, size.z);
			model.scale.setScalar(scale);
			model.position.set(
				-center.x * scale,
				-box.min.y * scale,
				-center.z * scale,
			);
			scene.add(model);

			// Find shallowest bone with "head" in name
			let bestDepth = Infinity;
			model.traverse((obj) => {
				if (obj.name && obj.name.toLowerCase().includes('head')) {
					let depth = 0, p = obj;
					while (p.parent) { depth++; p = p.parent; }
					if (depth < bestDepth) {
						bestDepth = depth;
						headBone = obj;
						headInitRot = { x: obj.rotation.x, y: obj.rotation.y, z: obj.rotation.z };
					}
				}
			});

			if (gltf.animations && gltf.animations.length > 0) {
				mixer = new THREE.AnimationMixer(model);
				mixer.clipAction(gltf.animations[0]).play();
			}
		});

		let elapsed = 0;
		let animId;
		let inView = true;

		const visObs = new IntersectionObserver(([e]) => { inView = e.isIntersecting; });
		visObs.observe(mount);

		const animate = () => {
			animId = requestAnimationFrame(animate);
			if (!inView || document.hidden) return;

			const delta = Math.min(clock.getDelta(), 0.05);
			elapsed += delta;
			if (mixer) mixer.update(delta);

			const cursorWeight = Math.max(0, 1 - (performance.now() - lastMouseMove) / 1500);
			const idleZ = Math.sin(elapsed * 3.0) * 0.04;
			const targetY = cursorWeight * mouse.x * 0.75;
			const targetX = cursorWeight * (-mouse.y * 0.2);
			const targetZ = (1 - cursorWeight) * idleZ;

			current.y += (targetY - current.y) * 0.07;
			current.x += (targetX - current.x) * 0.07;
			current.z += (targetZ - current.z) * 0.08;

			if (headBone) {
				headBone.rotation.y = headInitRot.y + current.y;
				headBone.rotation.x = headInitRot.x + current.x;
				headBone.rotation.z = headInitRot.z + current.z;
			} else if (model) {
				model.rotation.y = current.y;
				model.rotation.x = current.x;
				model.rotation.z = current.z;
			}
			renderer.render(scene, camera);
		};
		animate();

		const onResize = () => {
			const nw = mount.clientWidth;
			const nh = mount.clientHeight;
			camera.aspect = nw / nh;
			camera.updateProjectionMatrix();
			renderer.setSize(nw, nh);
		};
		window.addEventListener('resize', onResize);

		return () => {
			cancelAnimationFrame(animId);
			visObs.disconnect();
			window.removeEventListener('resize', onResize);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('touchmove', onTouchMove);
			if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
			renderer.dispose();
		};
	}, [url]);

	return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

// ── HERO ─────────────────────────────────────────────────────
const ALL_CARDS = [
	{ id: 'a', icon: 'assets/research.png', size: '16%', label: 'exploring',        items: ['Software Engineering', 'AI', 'ML']                     },
	{ id: 'b', icon: 'assets/figma.png',    size: '22%', label: 'designing',        items: ['UI / UX Design', 'Wireframing', 'Prototyping'],         noInvert: true },
	{ id: 'c', icon: 'assets/mobile.png',   size: '30%', label: 'building',        items: ['React Native', 'iOS', 'Android']                       },
	{ id: 'd', icon: 'assets/github.png',   size: '22%', label: 'contributing', github: 'https://github.com/ry-rysa'                                   },
	{ id: 'e', icon: 'assets/notion.webp',  size: '40%', noFlip: true                                                                               },
	{ id: 'f', icon: 'assets/cloud_10238085.png', size: '25%', label: 'infrastructure',   items: ['AWS', 'Docker', 'Databases'],                            noInvert: true },
	{ id: 'g', icon: 'assets/human-brain.png', size: '22%', label: 'learning',         items: ['Machine Learning', 'LLMs', 'Computer Vision']          },
	{ id: 'h', icon: 'assets/solving.png', size: '30%', label: 'thinking',         items: ['Algorithms', 'Data Structures', 'Optimization']        },
	{ id: 'i', icon: 'assets/database.png', size: '25%', label: 'storing',          items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase']            },
];

const FlipCard = ({ icon, size, label, items, noFlip, github, front, noInvert }) => {
	const [flipped, setFlipped] = React.useState(false);
	const { isMobile, isTablet } = useResponsive();

	// On mobile: simple crossfade (no 3D) to avoid 18 GPU compositing layers
	if (isMobile) return (
		<div
			onClick={() => { if (!noFlip) setFlipped(f => !f); }}
			style={{ aspectRatio: '1', position: 'relative', cursor: !noFlip ? 'pointer' : 'default', borderRadius: 12, overflow: 'hidden' }}
		>
			<div style={{
				position: 'absolute', inset: 0,
				background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 12,
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				opacity: flipped ? 0 : 1, transition: 'opacity 0.25s',
			}}>
				{icon
					? <img src={icon} alt="" className={noInvert ? '' : 'icon-adaptive'} style={{ maxWidth: size, maxHeight: size, objectFit: 'contain' }} />
					: <div style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 400, color: 'var(--mute)', textAlign: 'center', background: 'var(--card)', border: '1px solid var(--rule)', borderRadius: 999, padding: '10px 22px', whiteSpace: 'nowrap' }}>{front}</div>
				}
			</div>
			{!noFlip && (
				<div style={{
					position: 'absolute', inset: 0,
					background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 12,
					display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
					padding: '8px', overflow: 'hidden',
					opacity: flipped ? 1 : 0, transition: 'opacity 0.25s',
				}}>
					{github
						? <a href={github} target="_blank" rel="noopener noreferrer" style={{ margin: 'auto', fontFamily: 'var(--sans)', fontSize: 9, fontWeight: 400, color: 'var(--card)', background: '#4b4b4b', borderRadius: 999, padding: '4px 8px', whiteSpace: 'nowrap', textDecoration: 'none' }}>View Github →</a>
						: <>
							<div style={{ fontFamily: 'var(--sans)', fontWeight: 550, fontSize: 9, letterSpacing: '-0.015em', color: 'var(--ink)', marginBottom: 5, marginTop: 3, width: '100%', textAlign: 'center' }}>{label}</div>
							<div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, width: '100%' }}>
								{(items || []).map((item, i) => (
									<span key={i} style={{ fontFamily: 'var(--sans)', fontSize: 7, color: 'var(--mute)', fontWeight: 400, background: 'var(--card)', border: '1px solid var(--rule)', borderRadius: 8, padding: '2px 4px', whiteSpace: 'nowrap' }}>{item}</span>
								))}
							</div>
						</>
					}
				</div>
			)}
		</div>
	);

	return (
		<div
			onMouseEnter={() => { if (!noFlip) setFlipped(true); }}
			onMouseLeave={() => setFlipped(false)}
			style={{ aspectRatio: '1', perspective: '700px', cursor: 'default' }}
		>
			<div style={{
				position: 'relative', width: '100%', height: '100%',
				transformStyle: 'preserve-3d',
				transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
				transition: 'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
			}}>
				{/* Front */}
				<div style={{
					position: 'absolute', inset: 0,
					background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 12,
					display: 'flex', alignItems: 'center', justifyContent: 'center',
					backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
				}}>
					{icon
						? <img src={icon} alt="" className={noInvert ? '' : 'icon-adaptive'} style={{ maxWidth: size, maxHeight: size, objectFit: 'contain' }} />
						: <div style={{
							fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 400,
							color: 'var(--mute)', textAlign: 'center',
							background: 'var(--card)', border: '1px solid var(--rule)', borderRadius: 999,
							padding: '10px 22px', whiteSpace: 'nowrap',
						}}>{front}</div>
					}
				</div>
				{/* Back */}
				{!noFlip && (
					<div style={{
						position: 'absolute', inset: 0,
						background: 'var(--surface)', border: '1px solid var(--rule)', borderRadius: 12,
						display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
						padding: isTablet ? '12px 14px' : '22px 28px',
						backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
						transform: 'rotateY(180deg)',
						overflow: 'hidden',
					}}>
						{github ? (
							<a href={github} target="_blank" rel="noopener noreferrer" style={{ margin: 'auto',
								fontFamily: 'var(--sans)', fontSize: isTablet ? 10 : 12, fontWeight: 400,
								color: 'var(--card)', background: '#4b4b4b', borderRadius: 999,
								padding: '6px 14px', whiteSpace: 'nowrap', textDecoration: 'none',
							}}>View Github →</a>
						) : (
							<>
								<div style={{ fontFamily: 'var(--sans)', fontWeight: 550, fontSize: isTablet ? 11 : 15, letterSpacing: '-0.015em', color: 'var(--ink)', marginBottom: isTablet ? 7 : 14, marginTop: isTablet ? 6 : 14, width: '100%', textAlign: 'center' }}>{label}</div>
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: isTablet ? 4 : 6, width: '100%' }}>
									{(items || []).map((item, i) => (
										<span key={i} style={{
											fontFamily: 'var(--sans)',
											fontSize: isTablet ? (items.length >= 4 ? 9 : 10) : (items.length >= 4 ? 12 : 13),
											color: 'var(--mute)', fontWeight: 400,
											background: 'var(--card)', border: '1px solid var(--rule)', borderRadius: 8,
											padding: isTablet ? (items.length >= 4 ? '3px 6px' : '4px 8px') : (items.length >= 4 ? '5px 10px' : '6px 13px'),
											whiteSpace: 'nowrap',
										}}>{item}</span>
									))}
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

const Hero = () => {
	const [open, setOpen] = React.useState(true);
	const { isMobile, isTablet } = useResponsive();
	const [aboutRef, aboutInView] = useInView(0.08);
	return (
		<section style={{
			padding: isTablet ? '90px 20px 0' : '150px 54px 0',
			display: 'flex', flexDirection: 'column', alignItems: 'center',
			position: 'relative',
		}}>
			{/* Main row */}
			<div style={{
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				flexDirection: isTablet ? 'column' : 'row',
				gap: isTablet ? 12 : 8, width: '100%',
			}}>
				{/* Left text */}
				<div style={{ textAlign: isTablet ? 'center' : 'right' }}>
					<p style={{
						margin: 0,
						fontSize: 'clamp(19px, 2.2vw, 25px)',
						lineHeight: 1.5,
						letterSpacing: '-0.015em',
						color: 'var(--ink)',
					}}>
						Hi! I'm Saskia
						<br />a computer science
						<br />student
					</p>
				</div>

				{/* Center — character */}
				<div style={{
					width: isMobile ? 240 : isTablet ? 320 : 500,
					height: isMobile ? 264 : isTablet ? 352 : 550,
					flexShrink: 0,
					position: 'relative', zIndex: 0,
				}}>
					<div style={{
						position: 'absolute',
						inset: '-30%',
						background: 'radial-gradient(circle at 50% 52%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.01) 55%, rgba(0,0,0,0) 70%)',
						zIndex: 0,
						pointerEvents: 'none',
					}} />
					<div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
						<ThreeCharacter url="assets/cat_character.glb" />
					</div>
				</div>

				{/* Right text */}
				<div style={{ textAlign: isTablet ? 'center' : 'left' }}>
					<p style={{
						margin: 0,
						fontSize: 'clamp(20px, 2.2vw, 28px)',
						lineHeight: 1.5,
						letterSpacing: '-0.015em',
						color: 'var(--ink)',
					}}>
						who loves to <SerifItalic word="research," />
						<br />
						<SerifItalic word="design," />{' and '}<SerifItalic word="build" />
					</p>
				</div>
			</div>

			{/* Chevron + project cards */}
			<div id="about" ref={aboutRef} style={{ width: '100%', maxWidth: isMobile ? 320 : isTablet ? 440 : 760, padding: isMobile ? '50px 0' : isTablet ? '68px 0' : '155px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
				<button
					onClick={() => setOpen(o => !o)}
					style={{
						background: 'none', border: 'none', cursor: 'pointer',
						padding: 8, color: 'var(--mute)', lineHeight: 0,
						transition: 'color .15s',
					}}
					onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
					onMouseLeave={e => e.currentTarget.style.color = 'var(--mute)'}
				>
					<svg width="20" height="12" viewBox="0 0 20 12" fill="none"
						style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform .3s ease', display: 'block' }}>
						<path d="M1 1L10 10L19 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</button>

				{open && (
					<div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 8 : isTablet ? 12 : 28, width: '100%' }}>
						{[0, 1, 2].map(row => (
							<div key={row} style={{
								display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 8 : isTablet ? 12 : 28,
								opacity: aboutInView ? 1 : 0,
								transform: aboutInView ? 'none' : 'translateY(22px)',
								transition: `opacity 0.55s ease ${row * 0.1}s, transform 0.55s ease ${row * 0.1}s`,
							}}>
								{ALL_CARDS.slice(row * 3, row * 3 + 3).map(c => <FlipCard key={c.id} {...c} />)}
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

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
	<section style={{ padding: '0 48px 0' }}>
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
				background: hov ? 'var(--surface)' : 'var(--card)',
				padding: '30px 26px',
				minHeight: 142,
				display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
				transition: 'background .15s',
				cursor: 'default',
			}}
		>
			<div style={{
				fontFamily: 'var(--mono)', fontSize: 11,
				color: hov ? 'var(--mute)' : 'var(--faint)',
				letterSpacing: '0.12em', textTransform: 'uppercase',
				transition: 'color .15s',
			}}>{cat}</div>
			<div>
				<div style={{
					fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.3,
				}}>{title}</div>
				<div style={{
					marginTop: 5, fontFamily: 'var(--mono)', fontSize: 11,
					color: 'var(--faint)', letterSpacing: '0.05em',
				}}>{note}</div>
			</div>
		</div>
	);
};

// ── SECTION HEADER ───────────────────────────────────────────
const SectionHeader = ({ eyebrow, title, right }) => (
	<div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}>
		<div>
			<div style={{
				fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--mute)',
				letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12,
			}}>{eyebrow}</div>
			<h2 style={{
				margin: 0, fontSize: 'clamp(31px, 3.3vw, 46px)', lineHeight: 1.05,
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

Object.assign(window, { Nav, Hero, Focus, SectionHeader });
