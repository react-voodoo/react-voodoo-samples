import React from "react";

const MATRIX = [
	{
		feature : "Scroll-linked animation",
		voodoo  : { v: true },
		framer  : { v: true, note: "useScroll" },
		gsap    : { v: true },
		spring  : { v: "warn", note: "manual" },
		motion  : { v: true },
		anime   : { v: true, note: "ScrollObserver" },
	},
	{
		feature : "Drag-linked animation",
		voodoo  : { v: true, note: "native" },
		framer  : { v: true, note: "drag" },
		gsap    : { v: "warn", note: "manual" },
		spring  : { v: true, note: "@use-gesture" },
		motion  : { v: true, note: "gestures" },
		anime   : { v: true, note: "Draggable" },
	},
	{
		feature : "Additive multi-axis composition",
		voodoo  : { v: true },
		framer  : { v: false },
		gsap    : { v: false },
		spring  : { v: false },
		motion  : { v: false },
		anime   : { v: false },
		bold    : true,
	},
	{
		feature : "Physics / momentum inertia",
		voodoo  : { v: true, note: "predictive" },
		framer  : { v: true, note: "spring" },
		gsap    : { v: false },
		spring  : { v: true, note: "spring" },
		motion  : { v: "warn", note: "limited" },
		anime   : { v: true, note: "spring" },
	},
	{
		feature : "Predictive snap target",
		voodoo  : { v: true },
		framer  : { v: false },
		gsap    : { v: false },
		spring  : { v: false },
		motion  : { v: false },
		anime   : { v: false },
		bold    : true,
	},
	{
		feature : "SSR — correct initial styles",
		voodoo  : { v: true },
		framer  : { v: "warn", note: "flash" },
		gsap    : { v: "warn", note: "flash" },
		spring  : { v: "warn", note: "flash" },
		motion  : { v: "warn", note: "flash" },
		anime   : { v: false },
		bold    : true,
	},
	{
		feature : "Bypasses React render loop",
		voodoo  : { v: true },
		framer  : { v: true },
		gsap    : { v: true },
		spring  : { v: true },
		motion  : { v: true },
		anime   : { v: true },
	},
	{
		feature : "Transform layer composition",
		voodoo  : { v: true },
		framer  : { v: false },
		gsap    : { v: false },
		spring  : { v: false },
		motion  : { v: false },
		anime   : { v: false },
		bold    : true,
	},
	{
		feature : "Multitouch (drag multiple axes)",
		voodoo  : { v: true },
		framer  : { v: false },
		gsap    : { v: false },
		spring  : { v: false },
		motion  : { v: false },
		anime   : { v: false },
	},
	{
		feature : "Bundle size (approx. gzip)",
		voodoo  : { text: "~18 kB" },
		framer  : { text: "~32 kB" },
		gsap    : { text: "~35 kB" },
		spring  : { text: "~25 kB" },
		motion  : { text: "~4 kB" },
		anime   : { text: "~10 kB" },
	},
	{
		feature : "React dependency",
		voodoo  : { text: "≥ 16" },
		framer  : { text: "≥ 18" },
		gsap    : { text: "none" },
		spring  : { text: "≥ 16" },
		motion  : { text: "none" },
		anime   : { text: "none" },
	},
];

const BENCH_SCENARIOS = [
	{
		name: "sequential · 5 props",
		desc: "Frame-by-frame advance, 5 CSS properties — the baseline everyone tests.",
	},
	{
		name: "property scale · 20 props",
		desc: "Same advance with 20 properties — reveals engine scaling cost per property.",
	},
	{
		name: "additive ×3",
		desc: "Three independent animation axes all writing to the same 5 properties simultaneously. This is react-voodoo's native model. Competitors must run 3 separate timelines and manually sum results.",
	},
	{
		name: "spring layers",
		desc: "Same 3 axes at different speeds (×1, ×0.7, ×0.3) — the signature scroll + drag + push composition pattern react-voodoo is built for.",
	},
	{
		name: "long timeline · 20 segs",
		desc: "A timeline with 20 sequential animation segments — models a full-page scroll sequence or complex keyframe chain.",
	},
];

const WHEN_PICK = [
	{
		lib  : "react-voodoo",
		color: "#3b82f6",
		cases: [
			"Swipeable carousels, parallax scroll scenes, pinned sequences with drag control",
			"Multiple animation tracks compositing on the same element",
			"SSR-first projects where initial paint must match the animated state",
			"Drag + inertia + snap with predictive preloading",
		],
	},
	{
		lib  : "Framer Motion",
		color: "#8b5cf6",
		cases: [
			"Simple enter/exit transitions (AnimatePresence is excellent)",
			"Gesture-driven UI on React 18+",
		],
	},
	{
		lib  : "GSAP",
		color: "#10b981",
		cases: [
			"Complex timeline sequencing without scroll/drag",
			"Non-React or framework-agnostic projects",
		],
	},
	{
		lib  : "react-spring",
		color: "#f59e0b",
		cases: [
			"Spring-physics UI micro-interactions",
			"Value-based interpolation without timeline control",
		],
	},
];

function Cell({ data }) {
	if ( data.text ) return <td className="matrix-cell">{data.text}</td>;
	if ( data.v === true ) return (
		<td className="matrix-cell matrix-yes">
			✅{data.note && <span className="matrix-note">{data.note}</span>}
		</td>
	);
	if ( data.v === false ) return <td className="matrix-cell matrix-no">❌</td>;
	if ( data.v === "warn" ) return (
		<td className="matrix-cell matrix-warn">
			⚠️{data.note && <span className="matrix-note">{data.note}</span>}
		</td>
	);
	return <td className="matrix-cell">—</td>;
}

export default function WhySection() {
	const [showBenchDetails, setShowBenchDetails] = React.useState(false);

	return (
		<section className="why-section" id="why">
			<div className="section-inner">
				<div className="section-label">Motivation</div>
				<h2 className="section-title">Why react-voodoo?</h2>
				<p className="section-sub">
					Most animation libraries output <strong>absolute values</strong> — they own a CSS property
					and write a number to it each frame. That works for isolated transitions, but breaks the
					moment you need to combine sources: a scroll position driving <code>translateY</code>, a
					drag gesture adding to the same <code>translateY</code>, and a parallax offset stacking
					on top. The libraries fight each other and you end up writing glue code.
				</p>
				<p className="section-sub">
					React-voodoo takes a different approach: its engine computes <strong>deltas</strong> — the
					change from the previous frame — and accumulates them additively across any number of axes.
					Multiple animations on the same property simply add together. No ownership, no conflicts.
				</p>

				<div className="delta-diagram">
					<code>
						axis position ──▶ tween engine ──▶ Δ per property ──▶ node.style (direct DOM write)
						<br/>{"                                       ▲"}
						<br/>{"                            other axes add their Δ here"}
					</code>
				</div>

				{/* ── Feature comparison matrix ── */}
				<h3 className="why-subhead">Feature matrix</h3>
				<div className="matrix-wrap">
					<table className="matrix-table">
						<thead>
							<tr>
								<th className="matrix-feature-col">Feature</th>
								<th className="matrix-lib-col matrix-lib-highlight">react-voodoo</th>
								<th className="matrix-lib-col">Framer Motion</th>
								<th className="matrix-lib-col">GSAP</th>
								<th className="matrix-lib-col">react-spring</th>
								<th className="matrix-lib-col">Motion</th>
								<th className="matrix-lib-col">anime.js</th>
							</tr>
						</thead>
						<tbody>
							{MATRIX.map(( row, i ) => (
								<tr key={i} className={row.bold ? "matrix-row-bold" : ""}>
									<td className="matrix-feature">{row.feature}</td>
									<Cell data={row.voodoo}/>
									<Cell data={row.framer}/>
									<Cell data={row.gsap}/>
									<Cell data={row.spring}/>
									<Cell data={row.motion}/>
									<Cell data={row.anime}/>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* ── Performance ── */}
				<h3 className="why-subhead">Performance</h3>
				<p className="section-sub">
					The delta model isn't just an architectural choice — the numbers back it up. In scenarios
					that define react-voodoo's use-case — <strong>compositing multiple animation sources on the
					same element</strong> — the engine runs <strong>3–7× faster than GSAP</strong> and handles
					far more properties per frame without degrading.
				</p>
				<div className="perf-chart-wrap">
					<img
						src={require("App/assets/perf-chart.svg").default}
						alt="Performance comparison chart: react-voodoo vs GSAP, Framer Motion, react-spring"
						className="perf-chart-img"
					/>
				</div>

				<button
					className="bench-toggle"
					onClick={() => setShowBenchDetails(v => !v)}
				>
					{showBenchDetails ? "▲ Hide" : "▼ What each scenario measures"}
				</button>

				{showBenchDetails && (
					<div className="bench-details">
						<table className="bench-table">
							<thead>
								<tr>
									<th>Scenario</th>
									<th>Description</th>
								</tr>
							</thead>
							<tbody>
								{BENCH_SCENARIOS.map(( s, i ) => (
									<tr key={i}>
										<td><code>{s.name}</code></td>
										<td>{s.desc}</td>
									</tr>
								))}
							</tbody>
						</table>
						<p className="bench-note">
							The one scenario where a stateless interpolator (Framer Motion / Popmotion) wins is a
							<strong> single small axis with easing</strong>: pure math functions with no timeline
							state beat even WASM for trivially short timelines. That overhead is the fair cost of
							additive composability — and it disappears once you have more than one axis compositing
							on the same element.
						</p>
					</div>
				)}

				{/* ── When to pick ── */}
				<h3 className="why-subhead">When to pick what</h3>
				<div className="when-grid">
					{WHEN_PICK.map(( entry, i ) => (
						<div key={i} className="when-card" style={{ borderTopColor: entry.color }}>
							<div className="when-lib" style={{ color: entry.color }}>{entry.lib}</div>
							<ul className="when-list">
								{entry.cases.map(( c, j ) => (
									<li key={j}>{c}</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
