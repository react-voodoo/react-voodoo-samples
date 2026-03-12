import React            from "react";
import ParallaxDemo     from "App/demos/ParallaxDemo.js";
import SnapCarouselDemo from "App/demos/SnapCarouselDemo.js";
import StaggerDemo      from "App/demos/StaggerDemo.js";
import AdditiveDemo     from "App/demos/AdditiveDemo.js";
import ScrollRevealDemo from "App/demos/ScrollRevealDemo.js";

const SAMPLE_DEMOS = [
	//{
	//	id   : "slider",
	//	title: "Slider",
	//	tag  : "complete app",
	//	desc : "React-voodoo-slider: a full-featured carousel/slider built on react-voodoo axes with infinite loop,
	// entering/leaving animations and configurable snap.", iframe : "./samples/Slider/index.html", github :
	// "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples", },
	{
		id     : "tinder",
		title  : "TinderLike",
		tag    : "complete app",
		desc   : "Tinder-style swipe cards with native spring physics, gesture recognition and snap inertia.",
		iframe : "./samples/TinderLike/dist/static/index.html",
		github : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/TinderLike",
		sandbox: "https://codesandbox.io/s/tinder-like-card-swiper-1735w",
	},
	{
		id     : "cards",
		title  : "Cards",
		tag    : "complete app",
		desc   : "Swipeable card stack with additive animations composing position, rotation and scale transforms.",
		iframe : "./samples/Cards/dist/static/index.html",
		github : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Cards",
		sandbox: "https://codesandbox.io/s/react-voodoo-demo-cards-fmpt2",
	},
	{
		id     : "menu",
		title  : "Android Menu",
		tag    : "complete app",
		desc   : "Radial swipe menu with smooth transitions and snap-to-item inertia.",
		iframe : "./samples/AndroidMenu/dist/static/index.html",
		github : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/AndroidMenu",
		sandbox: "https://codesandbox.io/s/android-style-menu-bhn1n",
	},
	{
		id     : "cubes",
		title  : "3D Cubes",
		tag    : "complete app",
		desc   : "CSS 3D cube faces driven by a single scroll axis — no canvas, pure DOM transforms.",
		iframe : "./samples/Cubes/dist/static/index.html",
		github : "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Cubes",
		sandbox: "https://codesandbox.io/s/react-voodoo-cube-demo-7d65t",
	},
	{
		id    : "goo",
		title : "Goo",
		tag   : "complete app",
		desc  : "Draggable goo balls with additive pushAnim lag — two axes drive a trailing blob effect via delta-based composition.",
		iframe: "./samples/Goo/dist/static/index.html",
		github: "https://github.com/react-voodoo/react-voodoo-samples/tree/master/samples/Goo",
	},
];

const DEMOS = [
	
	...SAMPLE_DEMOS,
	{
		id       : "parallax",
		title    : "Scroll Parallax",
		tag      : "GSAP ScrollTrigger equivalent",
		desc     : "A single axis drives three layers at different speeds. Drag vertically to scrub the parallax effect.",
		component: ParallaxDemo,
		snippet  : `const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true });
// Three nodes, same axis, different apply deltas
<Voodoo.Axis axe="parallax" size={200} scrollableWindow={200} />
<Voodoo.Node axes={{ parallax: [{
  from: 0, duration: 200,
  apply: { transform: [{ translateY: "-20px" }] }  // slow
}] }} />
<Voodoo.Node axes={{ parallax: [{
  from: 0, duration: 200,
  apply: { transform: [{ translateY: "-140px" }] } // fast
}] }} />`,
	},
	{
		id       : "carousel",
		title    : "Inertia Snap",
		tag      : "react-spring equivalent",
		desc     : "Drag the carousel and release. Inertia carries it to the nearest snap point automatically.",
		component: SnapCarouselDemo,
		snippet  : `<Voodoo.Axis axe="snap" size={400} scrollableWindow={100}
  inertia={{ wayPoints: [{at:0},{at:100},{at:200},{at:300},{at:400}],
             willSnap: (i) => setActive(i) }} />
<Voodoo.Draggable xAxis="snap" xHook={d => -d}>
  <Voodoo.Node axes={{ snap: [{
    from: 0, duration: 400,
    apply: { transform: [{ translateX: "-1104px" }] }
  }] }}>
    {cards}
  </Voodoo.Node>
</Voodoo.Draggable>`,
	},
	{
		id       : "stagger",
		title    : "Stagger Entrance",
		tag      : "anime.js stagger equivalent",
		desc     : "Timeline positions define the stagger. No setTimeout, no delays — pure axis scrubbing drives the wave.",
		component: StaggerDemo,
		snippet  : `// Each tile starts at a different position on the axis
tiles.map((tile, i) => (
  <Voodoo.Node style={{ opacity: 0 }} axes={{ stagger: [{
    from: i * 15, duration: 50, easeFn: "easeCubicOut",
    apply: { opacity: 1, transform: [{ translateY: "-30px" }] }
  }] }} />
))
// Trigger with scrollTo
tweener.axes.stagger.scrollTo(200, 800, "easeCubicOut")`,
	},
//	{
//		id       : "additive",
//		title    : "Additive Axes",
//		tag      : "react-voodoo unique feature",
//		desc     : "Two independent axes both drive the same transform. They simply add. No ownership, no conflicts.",
//		component: AdditiveDemo,
//		snippet  : `<Voodoo.Axis axe="dragX" size={200} defaultPosition={100} scrollableWindow={200} />
//<Voodoo.Axis axe="dragY" size={200} defaultPosition={100} scrollableWindow={200} />
//<Voodoo.Draggable xAxis="dragX" yAxis="dragY">
//  <Voodoo.Node axes={{
//    dragX: [{ from:0, duration:200, apply:{ transform:[{translateX:"200px"},{}] }}],
//    dragY: [{ from:0, duration:200, apply:{ transform:[{},{translateY:"200px"}] }}],
//  }}>
//    <Ball />
//  </Voodoo.Node>
//</Voodoo.Draggable>`,
//	},
//	{
//		id       : "reveal",
//		title    : "Scroll Reveal",
//		tag      : "Framer Motion useScroll equivalent",
//		desc     : "Axis-driven scroll reveals with easing. Each content block reveals as you drag through its range on the timeline.",
//		component: ScrollRevealDemo,
//		snippet  : `// blocks staggered along the axis timeline
//blocks.map((block, i) => (
//  <Voodoo.Node style={{ opacity: 0 }} axes={{ scroll: [{
//    from: i * 60, duration: 60, easeFn: "easeCubicOut",
//    apply: { opacity: 1, transform: [{ translateY: "-30px" }] }
//  }] }} />
//))
//<Voodoo.Axis axe="scroll" size={300} scrollableWindow={300} />
//<Voodoo.Draggable yAxis="scroll">{blocks}</Voodoo.Draggable>`,
//	}
];

export default function DemosSection() {
	const [activeId, setActiveId] = React.useState("tinder");
	const active                  = DEMOS.find(d => d.id === activeId) || DEMOS[0];
	const ActiveComponent         = active.component;
	const isSample                = !!active.iframe;
	
	return (
		<section className="demos-section" id="demos">
			<div className="section-inner">
				<div className="section-label">Interactive Demos</div>
				<h2 className="section-title">See it in action</h2>
				<p className="section-sub">
					Every demo is a self-contained react-voodoo component. Drag, click, interact.
				</p>
				
				<div className="demos-tabs">
					{DEMOS.map(d => (
						<button
							key={d.id}
							className={"demo-tab" + (d.id === activeId ? " active" : "")}
							onClick={() => setActiveId(d.id)}
						>
							{d.title}
						</button>
					))}
				</div>
				
				<div className="demos-layout">
					<div className="phone-frame">
						<div className="phone-bar phone-bar--top">
							<div className="phone-notch">
								<span className="phone-camera"/>
								<span className="phone-speaker"/>
							</div>
						</div>
						<div className="demo-visual">
							{isSample
							 ? <iframe
								 key={activeId}
								 src={active.iframe}
								 title={active.title}
								 sandbox="allow-scripts allow-same-origin"
								 style={{ width: "100%", height: "100%", border: "none" }}
							 />
							 : <ActiveComponent key={activeId}/>
							}
						</div>
						<div className="phone-bar phone-bar--bottom">
							<div className="phone-home-bar"/>
						</div>
					</div>
					<div className="demo-info">
						<div className="demo-header">
							<h3 className="demo-title">{active.title}</h3>
							<span className={"demo-tag" + (isSample ? " demo-tag--sample" : "")}>{active.tag}</span>
						</div>
						<p className="demo-desc">{active.desc}</p>
						{active.snippet && <pre className="code-snippet"><code>{active.snippet}</code></pre>}
						{isSample && (
							<div className="demo-sample-links">
								{active.iframe && (
									<a href={active.iframe} target="_blank" rel="noopener" className="demo-link">
										Open full ↗
									</a>
								)}
								{active.github && (
									<a href={active.github} target="_blank" rel="noopener" className="demo-link">
										GitHub
									</a>
								)}
								{active.sandbox && (
									<a href={active.sandbox} target="_blank" rel="noopener" className="demo-link">
										CodeSandbox
									</a>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
