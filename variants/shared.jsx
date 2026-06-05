// Shared data + tiny utilities across the three portfolio directions.
// Exposed on window so other Babel files can read them.

const PROJECTS = [
	{
		n: "01",
		name: "Lumen",
		blurb: "An AI reading companion that annotates PDFs as you scroll — pulls definitions, related papers, and your past highlights inline.",
		tag: "Personal · AI",
		role: "Design + build",
		year: "2026",
		stack: "Next.js · Postgres · GPT-4o",
		color: "#111",
	},
	{
		n: "02",
		name: "Kettle",
		blurb: "A tiny native macOS app that watches your terminal and warns you before you rm -rf the wrong directory. Currently 4,200 users.",
		tag: "Personal · Tooling",
		role: "Sole maker",
		year: "2025",
		stack: "Swift · Rust",
		color: "#222",
	},
	{
		n: "03",
		name: "Foldspace",
		blurb: "Embedding-space visualizer for ML teams — drop a CSV of vectors, get a draggable 3D map with semantic clustering and labels.",
		tag: "Work · Internal",
		role: "Frontend lead",
		year: "2025",
		stack: "Three.js · WebGL · DuckDB-WASM",
		color: "#111",
	},
	{
		n: "04",
		name: "Margin",
		blurb: "Brand + product redesign for a Y Combinator fintech. Took the dashboard from a Bootstrap mess to something the team's proud to demo.",
		tag: "Client",
		role: "Design · Frontend",
		year: "2024",
		stack: "Figma · React · Tailwind",
		color: "#111",
	},
	{
		n: "05",
		name: "Halfwidth",
		blurb: "Open-source variable font built from my own handwriting. ~12k downloads, used in a Vercel docs page once, which made my year.",
		tag: "Side · Type",
		role: "Everything",
		year: "2024",
		stack: "Glyphs · FontTools",
		color: "#111",
	},
	{
		n: "06",
		name: "Quiet Hours",
		blurb: "Research prototype: an LLM agent that schedules your week around your energy levels, not just your calendar. Wrote it up for an internal lab.",
		tag: "Research",
		role: "Solo",
		year: "2024",
		stack: "Python · LangGraph",
		color: "#111",
	},
];

const NOW_ITEMS = [
	{ when: "this week", what: "Shipping a draggable canvas for an AI design tool." },
	{ when: "reading",   what: "Bret Victor — Magic Ink. Again." },
	{ when: "learning",  what: "Metal shaders, slowly." },
	{ when: "listening", what: "Caribou — Honey." },
	{ when: "based in",  what: "Jakarta → Singapore (Sept)." },
];

const SOCIALS = [
	{ label: "Email",    handle: "hi@ersya.co",       href: "mailto:hi@ersya.co" },
	{ label: "GitHub",   handle: "@ersya",            href: "#" },
	{ label: "Read.cv",  handle: "ersya",             href: "#" },
	{ label: "Twitter",  handle: "@ersyasaskia",      href: "#" },
];

// Tiny hook: useState that survives strict-mode double-invoke fine.
const useLocalClock = (tz = "Asia/Jakarta") => {
	const [t, setT] = React.useState(() => new Date());
	React.useEffect(() => {
		const id = setInterval(() => setT(new Date()), 1000);
		return () => clearInterval(id);
	}, []);
	const fmt = new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit", minute: "2-digit", second: "2-digit",
		hour12: false, timeZone: tz,
	});
	return fmt.format(t);
};

// Procedurally-drawn placeholder thumbnails so each project card has a
// distinct visual without depending on raster assets. Deterministic from
// the seed string so they're stable across renders.
const PlaceholderArt = ({ seed = "x", variant = "stripes" }) => {
	const hash = [...seed].reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 5381);
	const rand = (n) => {
		let h = hash + n * 2654435761;
		h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b);
		h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35);
		h ^= h >>> 16;
		return (h >>> 0) / 0xffffffff;
	};

	if (variant === "stripes") {
		const rows = 8;
		return (
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:'100%',height:'100%',display:'block'}}>
				<rect width="100" height="100" fill="#0a0a0a" />
				{Array.from({ length: rows }).map((_, i) => {
					const y = (i / rows) * 100;
					const h = 100 / rows;
					const w = 20 + rand(i) * 80;
					const x = rand(i + 50) * (100 - w);
					return <rect key={i} x={x} y={y} width={w} height={h} fill="#fff" opacity={0.06 + rand(i+9)*0.2} />;
				})}
				<circle cx={50 + (rand(99)-.5)*40} cy={50 + (rand(98)-.5)*40} r={10 + rand(97)*15} fill="#fff" opacity="0.9" />
			</svg>
		);
	}
	if (variant === "grid") {
		const N = 6;
		return (
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:'100%',height:'100%',display:'block'}}>
				<rect width="100" height="100" fill="#f4f3ef" />
				{Array.from({ length: N*N }).map((_, i) => {
					const r = Math.floor(i/N), c = i%N;
					const fill = rand(i) > 0.65 ? "#111" : rand(i+5) > 0.5 ? "#e6e3dd" : "transparent";
					return <rect key={i} x={c*100/N} y={r*100/N} width={100/N} height={100/N} fill={fill} />;
				})}
			</svg>
		);
	}
	// dots
	return (
		<svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:'100%',height:'100%',display:'block'}}>
			<rect width="100" height="100" fill="#fff" />
			{Array.from({ length: 40 }).map((_, i) => (
				<circle
					key={i}
					cx={rand(i)*100}
					cy={rand(i+30)*100}
					r={1 + rand(i+9)*4}
					fill="#111"
					opacity={0.4 + rand(i+12)*0.6}
				/>
			))}
		</svg>
	);
};

const useInView = (threshold = 0.12) => {
	const ref = React.useRef(null);
	const [inView, setInView] = React.useState(false);
	React.useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
			{ threshold }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);
	return [ref, inView];
};

const useResponsive = () => {
	const [width, setWidth] = React.useState(window.innerWidth);
	React.useEffect(() => {
		const handler = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handler, { passive: true });
		return () => window.removeEventListener('resize', handler);
	}, []);
	return { isMobile: width < 640, isTablet: width < 1024, width };
};

Object.assign(window, { PROJECTS, NOW_ITEMS, SOCIALS, useLocalClock, PlaceholderArt, useResponsive, useInView });
