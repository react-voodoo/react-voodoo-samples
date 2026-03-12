import React from "react";

const SAMPLES = [
	{
		title  : "TinderLike Swiper",
		desc   : "Tinder-style swipe cards with native-feel spring physics and gesture recognition.",
		path   : "./samples/TinderLike/dist/static/index.html",
		github : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/TinderLike",
		sandbox: "https://codesandbox.io/s/tinder-like-card-swiper-1735w",
		color  : "#3b82f6",
		emoji  : "🃏",
	},
	{
		title  : "Android Menu",
		desc   : "Android-style radial swipe menu with smooth transitions and snap-to-item inertia.",
		path   : "./samples/AndroidMenu/dist/static/index.html",
		github : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/AndroidMenu",
		sandbox: "https://codesandbox.io/s/android-style-menu-bhn1n",
		color  : "#10b981",
		emoji  : "☰",
	},
	{
		title  : "Swipeable Cards",
		desc   : "Card stack with additive animations composing position, rotation and scale transforms.",
		path   : "./samples/Cards/dist/static/index.html",
		github : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Cards",
		sandbox: "https://codesandbox.io/s/react-voodoo-demo-cards-fmpt2",
		color  : "#8b5cf6",
		emoji  : "🗂",
	},
	{
		title  : "3D Cubes",
		desc   : "CSS 3D cube faces driven by a single scroll axis — no canvas, pure DOM transforms.",
		path   : "./samples/Cubes/dist/static/index.html",
		github : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Cubes",
		sandbox: "https://codesandbox.io/s/react-voodoo-cube-demo-7d65t",
		color  : "#ec4899",
		emoji  : "🎲",
	},
	{
		title : "Goo",
		desc  : "Draggable goo balls with additive pushAnim lag — two axes drive a trailing blob effect via delta-based composition.",
		path  : "./samples/Goo/dist/static/index.html",
		github: "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Goo",
		color : "#f59e0b",
		emoji : "🫧",
	},
];

export default function SamplesSection() {
	return (
		<section className="samples-section" id="samples">
			<div className="section-inner">
				<div className="section-label">Live Samples</div>
				<h2 className="section-title">Full examples</h2>
				<p className="section-sub">
					Production-quality demos showing react-voodoo in complex interactive scenarios.
				</p>

				<div className="samples-grid">
					{SAMPLES.map((s, i) => (
						<div key={i} className="sample-card">
							<div className="sample-preview">
								<iframe
									src={s.path}
									title={s.title}
									loading="lazy"
									sandbox="allow-scripts allow-same-origin"
								/>
								<div className="sample-preview-overlay">
									<a
										href={s.path}
										target="_blank"
										rel="noopener"
										className="sample-open-btn"
									>
										Open full ↗
									</a>
								</div>
							</div>
							<div className="sample-info">
								<div className="sample-emoji" style={{ color: s.color }}>{s.emoji}</div>
								<div className="sample-text">
									<h3 className="sample-title">{s.title}</h3>
									<p className="sample-desc">{s.desc}</p>
								</div>
								<div className="sample-links">
									{s.github && (
										<a href={s.github} target="_blank" rel="noopener" className="sample-link">
											GitHub
										</a>
									)}
									{s.sandbox && (
										<a href={s.sandbox} target="_blank" rel="noopener" className="sample-link">
											CodeSandbox
										</a>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
