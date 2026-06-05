const SOCIAL_LINKS = [
	{ label: 'GitHub',   icon: 'assets/github.png',   href: 'https://github.com/ry-rysa' },
	{ label: 'LinkedIn', icon: 'assets/linkedin.png', href: 'https://www.linkedin.com/in/ersya-saskia' },
	{ label: 'Email',    icon: 'assets/email.png',    href: 'mailto:saskiarysa@gmail.com' },
];

const Contact = () => {
	const [subject, setSubject] = React.useState('');
	const [message, setMessage] = React.useState('');
	const [focusedField, setFocusedField] = React.useState(null);
	const { isMobile } = useResponsive();
	const [leftRef,  leftInView]  = useInView(0.2);
	const [rightRef, rightInView] = useInView(0.2);

	const handleSend = () => {
		const href = `mailto:saskiarysa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
		window.location.href = href;
	};

	const fieldStyle = (name) => ({
		width: '100%', padding: isMobile ? '9px 11px' : '11px 14px',
		border: `1px solid ${focusedField === name ? 'var(--ink)' : 'var(--rule)'}`,
		borderRadius: 10, fontSize: isMobile ? 14 : 17,
		fontFamily: 'var(--sans)', color: 'var(--ink)',
		background: 'var(--card)', outline: 'none',
		boxSizing: 'border-box', transition: 'border-color .15s',
	});

	return (
		<div id="contact" style={{
			minHeight: '100vh',
			display: 'flex', alignItems: 'center',
			paddingTop: isMobile ? '60px' : 0,
			paddingBottom: isMobile ? '60px' : 0,
		}}>
		<section
			style={{
				padding: isMobile ? '16px 20px' : '16px 54px',
				display: 'grid',
				gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
				gap: isMobile ? '48px' : '80px',
				alignItems: 'start',
				maxWidth: 1100,
				margin: '0 auto',
				width: '100%',
			}}
		>
			{/* ── Left col ── */}
			<div ref={leftRef} style={{
				opacity: leftInView ? 1 : 0,
				transform: leftInView ? 'none' : 'translateY(24px)',
				transition: 'opacity 0.6s ease, transform 0.6s ease',
			}}>
				<div style={{
					fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--mute)',
					letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20,
				}}></div>

				<h2 style={{
					margin: '0 0 18px',
					fontSize: isMobile ? 'clamp(28px, 8vw, 42px)' : 'clamp(36px, 4vw, 58px)',
					lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 700,
					fontFamily: 'var(--sans)',
				}}>
					Say hi & let's work together!
				</h2>

				<p style={{
					margin: '0 0 36px', fontSize: 17,
					color: 'var(--mute)', lineHeight: 1.65,
				}}>
					Reach out for collabs and work
				</p>

				<div style={{ display: 'flex', gap: 10 }}>
					{SOCIAL_LINKS.map((s) => (
						<SocialChip key={s.label} {...s} />
					))}
				</div>
			</div>

			{/* ── Right col — form card ── */}
			<div ref={rightRef} style={{
				background: 'var(--surface)',
				border: '1px solid var(--rule)',
				borderRadius: 16, padding: isMobile ? '18px 16px 16px' : '28px 28px 24px',
				opacity: rightInView ? 1 : 0,
				transform: rightInView ? 'none' : 'translateY(24px)',
				transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
			}}>
				<div style={{ marginBottom: 22 }}>
					<div style={{
						fontFamily: 'var(--sans)', fontSize: 13,
						letterSpacing: '0.12em', textTransform: 'uppercase',
						fontWeight: 500,
					}}>Send a message</div>
				</div>

				<label style={{ display: 'block', marginBottom: 14 }}>
					<div style={{
						fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--mute)',
						letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 7,
					}}>Subject</div>
					<input
						value={subject}
						onChange={e => setSubject(e.target.value)}
						onFocus={() => setFocusedField('subject')}
						onBlur={() => setFocusedField(null)}
						placeholder="Let's build something together"
						style={fieldStyle('subject')}
					/>
				</label>

				<label style={{ display: 'block', marginBottom: 20 }}>
					<div style={{
						fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--mute)',
						letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 7,
					}}>Message</div>
					<textarea
						value={message}
						onChange={e => setMessage(e.target.value)}
						onFocus={() => setFocusedField('message')}
						onBlur={() => setFocusedField(null)}
						placeholder="Tell me a bit about your idea..."
						rows={5}
						style={{ ...fieldStyle('message'), resize: 'vertical' }}
					/>
				</label>

				<button
					onClick={handleSend}
					style={{
						background: 'var(--ink)', color: 'var(--paper)',
						border: 'none', borderRadius: 10,
						padding: isMobile ? '9px 18px' : '12px 24px', fontSize: isMobile ? 13 : 17, fontWeight: 500,
						fontFamily: 'var(--sans)', cursor: 'pointer',
						transition: 'opacity .15s',
					}}
					onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
					onMouseLeave={e => e.currentTarget.style.opacity = '1'}
				>
					Send Email
				</button>
			</div>
		</section>
		</div>
	);
};

const SocialChip = ({ label, icon, href }) => {
	const [hov, setHov] = React.useState(false);
	return (
		<a
			href={href}
			title={label}
			onMouseEnter={() => setHov(true)}
			onMouseLeave={() => setHov(false)}
			style={{
				width: 42, height: 42, borderRadius: '50%',
				border: `1px solid ${hov ? 'var(--ink)' : 'var(--rule)'}`,
				display: 'flex', alignItems: 'center', justifyContent: 'center',
				textDecoration: 'none',
				transition: 'border-color .15s, opacity .15s',
				background: hov ? 'var(--surface)' : 'transparent',
				opacity: hov ? 1 : 0.7,
			}}
		>
			<img src={icon} alt={label} className="icon-adaptive" style={{ width: 20, height: 20, objectFit: 'contain' }} />
		</a>
	);
};

const Footer = () => {
	const { isMobile } = useResponsive();
	return (
		<footer style={{
			padding: isMobile ? '16px 20px' : '30px 54px',
			display: 'flex',
			flexDirection: isMobile ? 'row' : 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 0,
		}}>
			<span style={{ fontSize: isMobile ? 12 : 17, color: 'var(--mute)' }}>
				Ersya Najwa Saskia
			</span>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? 10 : 28, alignItems: 'center' }}>
				{[
					{ label: 'GitHub',   href: 'https://github.com/ry-rysa' },
					{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ersya-saskia' },
					{ label: 'Email',    href: 'mailto:saskiarysa@gmail.com' },
				].map(({ label, href }) => (
					<a key={label} href={href} style={{
						color: 'var(--mute)', textDecoration: 'none', fontSize: isMobile ? 12 : 17,
						transition: 'color .15s',
					}}
						onMouseEnter={e => e.currentTarget.style.color = 'var(--ink)'}
						onMouseLeave={e => e.currentTarget.style.color = 'var(--mute)'}
					>{label}</a>
				))}
				<span style={{ color: 'var(--mute)', fontSize: isMobile ? 12 : 17 }}>© 2026</span>
			</div>
		</footer>
	);
};

Object.assign(window, { Contact, Footer });
