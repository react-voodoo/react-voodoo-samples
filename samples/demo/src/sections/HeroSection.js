import React  from "react";
import Voodoo from "react-voodoo";

const PILLS = [
	"Delta-based additive",
	"WASM hot path",
	"Bypasses React render loop",
	"Drag + inertia + snap",
	"SSR-ready",
	"Multi-unit CSS calc()",
];

export default function HeroSection() {
	const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: false });

	React.useEffect(
		() => {
			const entranceAnim = [
				{ target: "logo",    from: 0,  duration: 60, easeFn: "easeCubicOut", apply: { opacity: 1, transform: [{ translateY: "-30px" }] } },
				{ target: "tagline", from: 30, duration: 60, easeFn: "easeCubicOut", apply: { opacity: 1, transform: [{ translateY: "-30px" }] } },
				{ target: "pills",   from: 60, duration: 50, easeFn: "easeCubicOut", apply: { opacity: 1, transform: [{ translateY: "-20px" }] } },
				{ target: "cta",     from: 80, duration: 50, easeFn: "easeCubicOut", apply: { opacity: 1, transform: [{ translateY: "-20px" }] } },
			];
			tweener.pushAnim(entranceAnim);
		},
		[tweener]
	);

	React.useEffect(
		() => {
			const onScroll = () => {
				const pos = Math.min(100, (window.scrollY / window.innerHeight) * 130);
				if ( tweener.axes && tweener.axes.scrollOut ) {
					tweener.axes.scrollOut.scrollTo(pos, 0);
				}
			};
			window.addEventListener("scroll", onScroll, { passive: true });
			return () => window.removeEventListener("scroll", onScroll);
		},
		[tweener]
	);

	return (
		<section className="hero" id="hero">
			<div className="hero-bg">
				<div className="hero-glow hero-glow-1"/>
				<div className="hero-glow hero-glow-2"/>
				<div className="hero-grid"/>
			</div>
			<ViewBox className="hero-viewbox">
				<Voodoo.Axis
					axe="scrollOut"
					size={100}
					defaultPosition={0}
				/>

				<div className="hero-content">
					<Voodoo.Node
						id="logo"
						style={{ opacity: 0, transform: [{ translateY: "30px" }] }}
						axes={{
							scrollOut: [{ from: 0, duration: 100, apply: { opacity: -1, transform: [{ translateY: "-50px" }] } }]
						}}
					>
						<div className="hero-logo-wrap">
							<img
								className="hero-logo-img"
								src={require("App/assets/logo-v0.png").default}
								alt="react-voodoo logo"
								draggable="false"
							/>
							<h1>react-voodoo</h1>
						</div>
					</Voodoo.Node>

					<Voodoo.Node
						id="tagline"
						style={{ opacity: 0, transform: [{ translateY: "30px" }] }}
						axes={{
							scrollOut: [{ from: 0, duration: 100, apply: { opacity: -1, transform: [{ translateY: "-50px" }] } }]
						}}
					>
						<p className="hero-tagline">
							A fast, additive &amp; swipeable tween engine for React.<br/>
							Delta-based composition. Direct DOM. 60 fps.<br/>
							( This is actually claude who made the new demos, there still some work to do ;) )
						</p>
					</Voodoo.Node>

					<Voodoo.Node
						id="pills"
						style={{ opacity: 0, transform: [{ translateY: "20px" }] }}
						axes={{
							scrollOut: [{ from: 0, duration: 100, apply: { opacity: -1, transform: [{ translateY: "-50px" }] } }]
						}}
					>
						<div className="hero-pills">
							{PILLS.map((p, i) => (
								<span key={i} className="hero-pill">{p}</span>
							))}
						</div>
					</Voodoo.Node>

					<Voodoo.Node
						id="cta"
						style={{ opacity: 0, transform: [{ translateY: "20px" }] }}
						axes={{
							scrollOut: [{ from: 0, duration: 100, apply: { opacity: -1, transform: [{ translateY: "-50px" }] } }]
						}}
					>
						<div className="hero-cta">
							<a
								className="btn-primary"
								href="https://github.com/react-voodoo/react-voodoo"
								target="_blank"
								rel="noopener"
							>
								GitHub
							</a>
							<a
								className="btn-secondary"
								href="https://www.npmjs.com/package/react-voodoo"
								target="_blank"
								rel="noopener"
							>
								npm install react-voodoo
							</a>
							<a className="btn-text" href="#docs">
								API Docs ↓
							</a>
						</div>
					</Voodoo.Node>
				</div>
			</ViewBox>
		</section>
	);
}
