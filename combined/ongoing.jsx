const ONGOING_WORK = [
	{
		id: 'a',
		title: 'Mood Journal',
		role: 'Personal · Mobile App',
		desc: 'A journaling and mood-tracking app that helps users reflect on daily experiences and monitor emotional well-being.',
		image: 'assets/Ongoing work/Mood Journal.png',
		gradient: 'radial-gradient(ellipse at 35% 30%, #e8e9ec 0%, #d1d5db 60%, #c4c7cc 100%)',
	},
	{
		id: 'b',
		title: 'Insurance RAG Assistant',
		role: 'RAG · Chatbot · Docker',
		desc: 'A RAG-based chatbot that provides accurate policy information from internal insurance documents.',
		image: 'assets/Ongoing work/InsuranceRAG.png',
		gradient: 'radial-gradient(ellipse at 60% 40%, #dfe1e5 0%, #c8ccd2 60%, #b8bcc4 100%)',
	},
	{
		id: 'c',
		title: 'Debate Coach Agent',
		role: 'Agent · RAG',
		desc: 'A document-grounded AI debate coach that engages users in real-time debates and provides personalized feedback.',
		image: 'assets/Ongoing work/AgentDebate.png',
		gradient: 'radial-gradient(ellipse at 45% 55%, #e8e9ec 0%, #d4d6da 60%, #c0c3c8 100%)',
	},
];

const OngoingCard = ({ item, index }) => {
	const [hov,  setHov]  = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [text, setText] = React.useState('');
	const [sent, setSent] = React.useState(false);
	const [peek, setPeek] = React.useState(false);
	const [cardRef, cardInView] = useInView(0.3);
	const { isMobile, isTablet } = useResponsive();
	const ease      = '.85s cubic-bezier(.34,1.1,.64,1)';
	const cardH     = isMobile ? 260 : 490;
	const layerH    = isMobile ? 205 : 390;
	const shiftX    = isMobile ? '30px' : '45px';
	const shiftY    = isMobile ? '55px' : '80px';

	React.useEffect(() => {
		if (!cardInView) return;
		const delay = index * 300;
		const t1 = setTimeout(() => setPeek(true),  delay);
		const t2 = setTimeout(() => setPeek(false), delay + 2000);
		return () => { clearTimeout(t1); clearTimeout(t2); };
	}, [cardInView]);

	const handleSend = () => {
		if (!text.trim()) return;
		const href = `mailto:saskiarysa@gmail.com?subject=Thoughts on ${encodeURIComponent(item.title)}&body=${encodeURIComponent(text)}`;
		window.location.href = href;
		setSent(true);
		setTimeout(() => { setSent(false); setOpen(false); setText(''); }, 2000);
	};

	const active = (hov || peek) && !open;

	return (
		<div
			ref={cardRef}
			onMouseEnter={() => setHov(true)}
			onMouseLeave={() => setHov(false)}
			style={{ position: 'relative', height: cardH, cursor: 'default' }}
		>
			{/* Back layer */}
			<div style={{
				position: 'absolute', top: 0, left: 0, right: 0, height: layerH,
				borderRadius: 20, overflow: 'hidden', zIndex: 1, border: '1px solid var(--rule)',
				transform: active && item.image ? 'rotate(-5deg) translate(4%, -4%)' : 'rotate(0deg)',
				transformOrigin: 'center 60%',
				boxShadow: 'none',
				transition: `transform ${ease}, box-shadow .3s`,
			}}>
				{item.image
					? <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
					: <div style={{ width: '100%', height: '100%', background: item.gradient }} />
				}
			</div>

			{/* Front layer */}
			<div style={{
				position: 'absolute',
				top: 0, left: 0, right: 0, height: layerH,
				borderRadius: 20,
				background: 'var(--card)',
				border: '1px solid var(--rule)',
				padding: isMobile ? '16px 14px' : '22px 20px',
				zIndex: 2,
				transform: active && item.image ? `rotate(5deg) translate(${shiftX}, ${shiftY})` : 'rotate(0deg) translate(0,0)',
				transformOrigin: 'top center',
				boxShadow: 'none',
				transition: `transform ${ease}, box-shadow .3s`,
				display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
				overflow: 'hidden',
			}}>
				{/* Normal view */}
				<div style={{ opacity: open ? 0 : 1, pointerEvents: open ? 'none' : 'all', transition: 'opacity .2s', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
					<div>
						<div style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em', fontFamily: 'var(--sans)' }}>{item.title}</div>
						<div style={{ fontSize: 13, color: 'var(--mute)', marginTop: 5, fontFamily: 'var(--sans)' }}>{item.role}</div>
					</div>
					<div>
						<p style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 500, lineHeight: 1.75, color: 'var(--mute)', fontFamily: 'var(--sans)' }}>{item.desc || 'AAAAA'}</p>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
						<button onClick={() => setOpen(true)} style={{
							opacity: hov || isMobile ? 1 : 0,
							transition: 'opacity .2s',
							fontSize: 12, fontWeight: 500, fontFamily: 'var(--sans)',
							color: 'var(--card)', background: '#4b4b4b',
							border: 'none', borderRadius: 999, padding: '7px 16px',
							cursor: 'pointer', letterSpacing: '-0.01em',
						}}>Share your thoughts →</button>
					</div>
					</div>
				</div>

				{/* Input overlay */}
				<div style={{
					position: 'absolute', inset: 0, padding: '16px',
					display: 'flex', flexDirection: 'column', gap: 10,
					opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none',
					transition: 'opacity .2s',
				}}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<span style={{ fontSize: 11, fontWeight: 600, fontFamily: 'var(--sans)' }}>Your thoughts on {item.title}</span>
						<button onClick={() => { setOpen(false); setText(''); }} style={{
							background: 'none', border: 'none', cursor: 'pointer',
							color: 'var(--mute)', fontSize: 16, lineHeight: 1, padding: 2,
						}}>×</button>
					</div>
					{sent ? (
						<div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--mute)', fontFamily: 'var(--sans)' }}>
							Sent! Thanks ✦
						</div>
					) : (
						<>
							<textarea autoFocus value={text} onChange={e => setText(e.target.value)}
								placeholder="Share your idea or feedback..."
								style={{
									flex: 1, resize: 'none', border: '1px solid var(--rule)',
									borderRadius: 10, padding: '10px 12px', fontSize: 11,
									fontFamily: 'var(--sans)', color: 'var(--ink)',
									background: 'var(--card)', outline: 'none', lineHeight: 1.5,
								}}
							/>
							<button onClick={handleSend} style={{
								background: 'var(--ink)', color: 'var(--paper)',
								border: 'none', borderRadius: 999, padding: '7px 16px',
								fontSize: 11, fontWeight: 500, fontFamily: 'var(--sans)',
								cursor: 'pointer', alignSelf: 'flex-end',
							}}>Send →</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const OngoingWork = () => {
	const { isMobile, isTablet } = useResponsive();
	const [headingRef, headingInView] = useInView(0.3);
	const [cardsRef,   cardsInView]   = useInView(0.05);
	const gridCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 380px)';
	const topPad   = isMobile ? '60px' : isTablet ? '80px' : '100px';
	const sidePad  = isMobile ? '20px' : isTablet ? '32px' : '54px';

	return (
	<section id="work" style={{ padding: `${topPad} ${sidePad} 0` }}>
		<div style={{ maxWidth: isMobile ? 420 : isTablet ? 680 : 1900, margin: '0 auto' }}>

			{/* Heading */}
			<h2 ref={headingRef} style={{
				textAlign: 'center', margin: isMobile ? '0 0 56px' : '0 0 100px',
				fontSize: 'clamp(24px, 3.5vw, 38px)',
				fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.025em',
				fontFamily: 'var(--sans)', color: 'var(--ink)',
				opacity: headingInView ? 1 : 0,
				transform: headingInView ? 'none' : 'translateY(18px)',
				transition: 'opacity 0.55s ease, transform 0.55s ease',
			}}>
				Ongoing Work.<br />Share your Thoughts.
			</h2>

			{/* Cards */}
			<div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: gridCols, gap: isMobile ? 32 : 56, justifyContent: 'center' }}>
				{ONGOING_WORK.map((item, i) => (
					<div key={item.id} style={{
						opacity: cardsInView ? 1 : 0,
						transform: cardsInView ? 'none' : 'translateY(28px)',
						transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
					}}>
						<OngoingCard item={item} index={i} />
					</div>
				))}
			</div>
		</div>
	</section>
	);
};


// ── VINYL PLAYER ─────────────────────────────────────────────

const _BTN = (large) => ({
	width: large ? 50 : 40, height: large ? 50 : 40, borderRadius: '50%',
	border: '1px solid var(--rule)', background: 'var(--card)', cursor: 'pointer',
	display: 'flex', alignItems: 'center', justifyContent: 'center',
	color: 'var(--ink)', outline: 'none', flexShrink: 0,
	transition: 'border-color .15s',
});

const TRACKS = [
	{ title: 'Song Title',   artist: 'Artist Name', album: 'Album', src: 'assets/music/song1.mp3' },
	{ title: 'Song Title 2', artist: 'Artist Name', album: 'Album', src: 'assets/music/song2.mp3' },
];

const VinylPlayer = () => {
	const [playing, setPlaying] = React.useState(false);
	const [idx,     setIdx]     = React.useState(0);
	const [time,    setTime]    = React.useState(0);
	const [vol,     setVol]     = React.useState(0.8);
	const audioRef = React.useRef(null);
	const track = TRACKS[idx];

	React.useEffect(() => {
		if (document.getElementById('vp-css')) return;
		const s = document.createElement('style');
		s.id = 'vp-css';
		s.textContent = `
			@keyframes vp-spin { to { transform: rotate(360deg) } }
			.vp-vol { -webkit-appearance: none; appearance: none; width: 90px; height: 3px; background: #e5e7eb; border-radius: 2px; outline: none; cursor: pointer; transform: rotate(-90deg); }
			.vp-vol::-webkit-slider-thumb { -webkit-appearance: none; width: 13px; height: 13px; border-radius: 50%; background: #fff; border: 1.5px solid #d1d5db; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
		`;
		document.head.appendChild(s);
	}, []);

	React.useEffect(() => {
		const a = audioRef.current;
		if (!a) return;
		a.load(); a.volume = vol;
		if (playing) a.play().catch(() => {});
	}, [idx]);

	const toggle = () => {
		const a = audioRef.current; if (!a) return;
		if (playing) { a.pause(); setPlaying(false); }
		else { a.play().catch(() => {}); setPlaying(true); }
	};
	const go = (n) => { setIdx(n); setTime(0); setPlaying(true); };
	const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.floor(s%60)).padStart(2,'0')}`;

	return (
		<div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
			<div style={{ flex: 1 }}>
				{/* Vinyl */}
				<div style={{ width: '100%', aspectRatio: '1', position: 'relative' }}>
					<div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
						<img src="assets/music/vinyl.png" alt="" style={{
							width: '112%', height: '112%',
							marginLeft: '-6%', marginTop: '-6%',
							objectFit: 'cover',
							animation: 'vp-spin 4s linear infinite',
							animationPlayState: playing ? 'running' : 'paused',
						}} />
					</div>
					<img src="assets/music/player.png" alt="" style={{
						position: 'absolute', width: '46%',
						left: '-12%', top: '-5%',
						pointerEvents: 'none',
					}} />
				</div>

				{/* Info */}
				<div style={{ textAlign: 'center', marginTop: 18 }}>
					<div style={{ fontSize: 11, color: 'var(--mute)', marginBottom: 5, fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>{fmt(time)}</div>
					<div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
						{track.title} <span style={{ fontWeight: 400, color: 'var(--mute)' }}>- {track.artist}</span>
					</div>
					<div style={{ fontSize: 12, color: 'var(--mute)', marginTop: 3 }}>{track.album}</div>
				</div>

				{/* Controls */}
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginTop: 22 }}>
					<button onClick={() => go((idx - 1 + TRACKS.length) % TRACKS.length)} style={_BTN(false)}>
						<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
					</button>
					<button onClick={toggle} style={_BTN(true)}>
						{playing
							? <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
							: <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft:2}}><path d="M8 5v14l11-7z"/></svg>
						}
					</button>
					<button onClick={() => go((idx + 1) % TRACKS.length)} style={_BTN(false)}>
						<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18 14.5 12 6 6v12zm2.5-6 8.5 6V6z"/></svg>
					</button>
				</div>
			</div>

			{/* Volume */}
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, paddingTop: 16 }}>
				<span style={{ fontSize: 13, color: 'var(--mute)' }}>+</span>
				<div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<input type="range" min="0" max="1" step="0.01" value={vol} className="vp-vol"
						onChange={e => { const v = +e.target.value; setVol(v); if (audioRef.current) audioRef.current.volume = v; }}
					/>
				</div>
				<span style={{ fontSize: 13, color: 'var(--mute)' }}>−</span>
			</div>

			<audio ref={audioRef} src={track.src}
				onTimeUpdate={e => setTime(e.target.currentTime)}
				onEnded={() => go((idx + 1) % TRACKS.length)}
			/>
		</div>
	);
};

Object.assign(window, { OngoingWork, ScrollFeatures, VinylPlayer });
