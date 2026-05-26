// Technical Skills — Matter.js physics, cloud title frame

const SKILL_CATEGORIES = [
	{
		label: 'Languages',
		color: '#76DAB3',
		textColor: '#17181D',
		skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'SQL', 'HTML/CSS'],
	},
	{
		label: 'Frameworks',
		color: '#CAFB50',
		textColor: '#17181D',
		skills: ['React', 'React Native', 'Next.js', 'Node.js', 'Express.js', 'Flask', 'Tailwind CSS'],
	},
	{
		label: 'Databases & Tools',
		color: '#B187F7',
		textColor: '#17181D',
		skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'Prisma', 'Docker', 'Git', 'Figma', 'AWS'],
	},
	{
		label: 'AI / ML',
		color: '#E66FB1',
		textColor: '#17181D',
		skills: ['PyTorch', 'OpenCV', 'MediaPipe', 'NumPy', 'Pandas', 'scikit-learn', 'Hugging Face'],
	},
];

const BG = '#111111';

const _roundRect = (ctx, x, y, w, h, r) => {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + w - r, y);
	ctx.arcTo(x + w, y,     x + w, y + r,     r);
	ctx.lineTo(x + w, y + h - r);
	ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
	ctx.lineTo(x + r, y + h);
	ctx.arcTo(x,     y + h, x,     y + h - r, r);
	ctx.lineTo(x,     y + r);
	ctx.arcTo(x,     y,     x + r, y,         r);
	ctx.closePath();
};

// Build cloud circle definitions around a center point
// Returns array of { x, y, r } in world coords
const buildCloud = (cx, cy, textWidth) => {
	// Target how wide the cloud LOOKS (text + small margin on each side)
	const visualW = textWidth + 32;
	const midR    = Math.round(visualW * 0.055);
	const topR    = Math.round(midR * 0.72);
	const botR    = Math.round(midR * 0.58);
	const cw      = visualW - 2 * midR;
	const circles = [];

	// Middle row — fills the cloud body
	const midN = Math.round(cw / (midR * 1.35));
	for (let i = 0; i < midN; i++) {
		const t = midN === 1 ? 0.5 : i / (midN - 1);
		circles.push({ x: cx - cw / 2 + cw * t, y: cy, r: midR });
	}

	// Top bumps
	const topSpan = cw * 0.92;
	const topN    = Math.round(topSpan / (topR * 1.9));
	for (let i = 0; i < topN; i++) {
		const t = topN === 1 ? 0.5 : i / (topN - 1);
		circles.push({ x: cx - topSpan / 2 + topSpan * t, y: cy - midR * 0.68, r: topR });
	}

	// Bottom bumps
	const botSpan = cw * 0.75;
	const botN    = Math.round(botSpan / (botR * 1.95));
	for (let i = 0; i < botN; i++) {
		const t = botN === 1 ? 0.5 : i / (botN - 1);
		circles.push({ x: cx - botSpan / 2 + botSpan * t, y: cy + midR * 0.62, r: botR });
	}

	return circles;
};

const TechSkills = () => {
	const wrapRef   = React.useRef(null);
	const canvasRef = React.useRef(null);

	React.useEffect(() => {
		const wrap   = wrapRef.current;
		const canvas = canvasRef.current;
		if (!wrap || !canvas || !window.Matter) return;

		const { Engine, Runner, Bodies, Body, Composite, Mouse, MouseConstraint, Events } = window.Matter;

		let cleanup = () => {};
		let resizeTimer;

		const init = () => {
			cleanup(); // tear down previous simulation
			const W   = wrap.offsetWidth;
			const H   = 460;
			const DPR = Math.min(window.devicePixelRatio || 1, 2);

			// Scale pill size + font to canvas width so mobile looks right
			const PILL_H     = Math.min(Math.max(Math.round(W * 0.072), 40), 52);
			const PILL_R     = Math.round(PILL_H * 0.32);
			const pillFontSz = Math.min(Math.max(Math.round(W * 0.025), 13), 16);
			const PILL_FONT  = `800 ${pillFontSz}px "General Sans", Inter, ui-sans-serif, sans-serif`;

			canvas.width        = W * DPR;
			canvas.height       = H * DPR;
			canvas.style.width  = W + 'px';
			canvas.style.height = H + 'px';

			const ctx = canvas.getContext('2d');
			ctx.scale(DPR, DPR);

			// ── engine ────────────────────────────────────────────────
			const engine = Engine.create({ gravity: { x: 0, y: 0.65 } });
			const world  = engine.world;

			// Measure title to size the cloud correctly
			const titleSize = Math.min(Math.max(Math.round(W * 0.050), 20), 48);
			const titleFont = `800 ${titleSize}px "General Sans", Inter, ui-sans-serif, sans-serif`;
			ctx.font = titleFont;
			const titleW   = ctx.measureText('Technical skills').width;

			const CX = W / 2;
			const CY = H / 2;

			// Build cloud circles (visual + physics)
			const cloudCircles = buildCloud(CX, CY, titleW);

			// Static physics bodies matching the cloud shape
			// Pills physically collide with them → can't pass through
			const cloudBodies = cloudCircles.map(({ x, y, r }) =>
				Bodies.circle(x, y, r, { isStatic: true, restitution: 0.4, friction: 0.05 })
			);
			Composite.add(world, cloudBodies);

			// ── pill bodies ───────────────────────────────────────────
			// Left side  → categories 0 (Languages/teal) + 1 (Frameworks/lime)
			// Right side → categories 2 (Databases/purple) + 3 (AI/ML/pink)
			// Both sides fall straight down from above — never above the cloud
			ctx.font = PILL_FONT;

			const shuffle = arr => {
				for (let i = arr.length - 1; i > 0; i--) {
					const j = (Math.random() * (i + 1)) | 0;
					[arr[i], arr[j]] = [arr[j], arr[i]];
				}
				return arr;
			};

			const leftItems  = shuffle(
				SKILL_CATEGORIES.slice(0, 2).flatMap(cat =>
					cat.skills.map(skill => ({ skill, color: cat.color, textColor: cat.textColor }))
				)
			);
			const rightItems = shuffle(
				SKILL_CATEGORIES.slice(2).flatMap(cat =>
					cat.skills.map(skill => ({ skill, color: cat.color, textColor: cat.textColor }))
				)
			);

			const spawnSide = (items, xMin, xMax) =>
				items.map(({ skill, color, textColor }, idx) => {
					const pw = Math.max(ctx.measureText(skill).width + 40, PILL_H * 1.8);
					const x  = xMin + Math.random() * (xMax - xMin);
					const y  = -PILL_H - idx * (PILL_H + 8) - Math.random() * 14;

					const body = Bodies.rectangle(x, y, pw, PILL_H, {
						restitution:  0.3,
						friction:     0.05,
						frictionAir:  0.02,
						chamfer:      { radius: PILL_R },
					});
					Composite.add(world, body);
					return { body, skill, color, textColor, pw };
				});

			// Fall in left 32% and right 32% — cloud occupies the center
			const pills = [
				...spawnSide(leftItems,  8,        W * 0.32),
				...spawnSide(rightItems, W * 0.68, W - 8),
			];

			// ── boundary walls ────────────────────────────────────────
			const T = 200;
			Composite.add(world, [
				Bodies.rectangle(W / 2,     H + T / 2, W + T * 2, T, { isStatic: true, friction: 0.3 }),
				Bodies.rectangle(-T / 2,    H / 2,     T, H + T * 2, { isStatic: true, friction: 0.3 }),
				Bodies.rectangle(W + T / 2, H / 2,     T, H + T * 2, { isStatic: true, friction: 0.3 }),
			]);

			// Velocity cap — prevents tunnelling on fast throws
			Events.on(engine, 'afterUpdate', () => {
				const MAX_V = 22;
				pills.forEach(({ body }) => {
					const { x: vx, y: vy } = body.velocity;
					if (Math.abs(vx) > MAX_V || Math.abs(vy) > MAX_V) {
						Body.setVelocity(body, {
							x: Math.max(-MAX_V, Math.min(MAX_V, vx)),
							y: Math.max(-MAX_V, Math.min(MAX_V, vy)),
						});
					}
				});
			});

			// ── mouse + touch drag ────────────────────────────────────
			const mouse = Mouse.create(canvas);
			Mouse.setScale(mouse, { x: 1 / DPR, y: 1 / DPR });

			// Don't let canvas swallow scroll
			mouse.element.removeEventListener('mousewheel',     mouse.mousewheel);
			mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

			// Release on mouse leave
			canvas.addEventListener('mouseleave', () => { mouse.button = -1; });

			// Touch support — prevent page scroll while dragging pills
			canvas.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
			canvas.addEventListener('touchmove',  e => e.preventDefault(), { passive: false });

			const mc = MouseConstraint.create(engine, {
				mouse,
				constraint: { stiffness: 0.2, angularStiffness: 0, render: { visible: false } },
			});
			Composite.add(world, mc);

			Events.on(mc, 'startdrag', () => { canvas.style.cursor = 'grabbing'; });
			Events.on(mc, 'enddrag',   () => { canvas.style.cursor = 'grab';     });

			const runner = Runner.create();
			Runner.run(runner, engine);

			// ── render loop ───────────────────────────────────────────
			let raf;
			const render = () => {
				// Background
				ctx.fillStyle = BG;
				ctx.fillRect(0, 0, W, H);

				// 1 — Pills (behind cloud)
				pills.forEach(({ body, skill, color, textColor, pw }) => {
					const { x, y } = body.position;
					const angle     = body.angle;
					ctx.save();
					ctx.translate(x, y);
					ctx.rotate(angle);

					ctx.shadowColor   = 'rgba(0,0,0,0.25)';
					ctx.shadowBlur    = 10;
					ctx.shadowOffsetY = 3;
					_roundRect(ctx, -pw / 2, -PILL_H / 2, pw, PILL_H, PILL_R);
					ctx.fillStyle = color;
					ctx.fill();
					ctx.shadowColor = 'transparent';

					ctx.font         = PILL_FONT;
					ctx.fillStyle    = textColor;
					ctx.textAlign    = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText(skill, 0, 0);
					ctx.restore();
				});

				// 2 — Cloud shape drawn in background color — visually covers pills beneath it
				cloudCircles.forEach(({ x, y, r }) => {
					ctx.beginPath();
					ctx.arc(x, y, r, 0, Math.PI * 2);
					ctx.fillStyle = BG;
					ctx.fill();
				});

				// 3 — Title text on top of cloud
				ctx.font         = titleFont;
				ctx.fillStyle    = '#ffffff';
				ctx.textAlign    = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText('Technical skills', CX, CY);

				raf = requestAnimationFrame(render);
			};
			render();

			cleanup = () => {
				cancelAnimationFrame(raf);
				Runner.stop(runner);
				Composite.clear(world, false);
				Engine.clear(engine);
			};
		}; // end init()

		// Run once fonts are ready, then re-run on every resize
		document.fonts.ready.then(init);

		const ro = new ResizeObserver(() => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(init, 150);
		});
		ro.observe(wrap);

		return () => {
			cleanup();
			ro.disconnect();
			clearTimeout(resizeTimer);
		};
	}, []);

	return (
		<section style={{ padding: '0 48px 120px', borderTop: '1px solid var(--rule)' }}>
			<div style={{ paddingTop: 64 }} />

			{/* Centered frame */}
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div
					ref={wrapRef}
					style={{
						width: '100%', maxWidth: 760,
						borderRadius: 16, overflow: 'hidden',
						border: '1px solid #2a2a2e',
					}}
				>
					<canvas
						ref={canvasRef}
						style={{ display: 'block', cursor: 'grab', userSelect: 'none', touchAction: 'none' }}
					/>
				</div>
			</div>

			<p style={{
				marginTop: 10, textAlign: 'center',
				fontFamily: 'var(--mono)', fontSize: 10,
				color: 'var(--faint)', letterSpacing: '0.1em', textTransform: 'uppercase',
			}}>drag / tap to interact</p>
		</section>
	);
};

Object.assign(window, { TechSkills });
