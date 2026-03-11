import React from "react";

function CodeBlock({ children }) {
	return (
		<pre className="doc-code">
			<code>{children}</code>
		</pre>
	);
}

function PropsTable({ rows }) {
	return (
		<div className="props-table-wrap">
			<table className="props-table">
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{rows.map(([prop, type, desc], i) => (
						<tr key={i}>
							<td><code>{prop}</code></td>
							<td><code className="type">{type}</code></td>
							<td>{desc}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default function DocSection() {
	return (
		<section className="doc-section-outer" id="docs">
			<div className="doc-inner">
				<div className="section-label">API Reference</div>
				<h2 className="section-title">Documentation</h2>

				<div className="doc-grid">
					<nav className="doc-nav">
						<a href="#doc-install">Install</a>
						<a href="#doc-quickstart">Quick Start</a>
						<a href="#doc-hook">hook()</a>
						<a href="#doc-axis">Axis</a>
						<a href="#doc-node">Node</a>
						<a href="#doc-draggable">Draggable</a>
						<a href="#doc-tween">Tween Descriptor</a>
						<a href="#doc-multiunit">Multi-unit Values</a>
						<a href="#doc-inertia">Inertia Config</a>
						<a href="#doc-imperative">Imperative API</a>
					</nav>

					<div className="doc-content">

						<section className="doc-block" id="doc-install">
							<h3>Install</h3>
							<CodeBlock>npm install react-voodoo</CodeBlock>
							<CodeBlock>yarn add react-voodoo</CodeBlock>
						</section>

						<section className="doc-block" id="doc-quickstart">
							<h3>Quick Start</h3>
							<CodeBlock>{`import Voodoo from 'react-voodoo';

export default function MyComponent() {
  const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true });

  return (
    <ViewBox>
      <Voodoo.Axis axe="scroll" size={200} scrollableWindow={200} />
      <Voodoo.Draggable yAxis="scroll">
        <Voodoo.Node
          id="box"
          style={{ opacity: 0, transform: [{ translateY: "30px" }] }}
          axes={{ scroll: [{
            from: 0, duration: 200, easeFn: "easeCubicOut",
            apply: { opacity: 1, transform: [{ translateY: "-30px" }] }
          }] }}
        >
          <div>Animated!</div>
        </Voodoo.Node>
      </Voodoo.Draggable>
    </ViewBox>
  );
}`}</CodeBlock>
						</section>

						<section className="doc-block" id="doc-hook">
							<h3>Voodoo.hook(options)</h3>
							<p>Primary hook. Creates a tweener root and returns <code>[tweener, ViewBox]</code>.</p>
							<PropsTable rows={[
								["enableMouseDrag", "boolean", "Enable mouse drag in addition to touch. Default: false."],
								["dragDirectionLock", "boolean", "Lock drag to one axis when dragging begins. Default: false."],
							]}/>
							<CodeBlock>{`const [tweener, ViewBox] = Voodoo.hook({
  enableMouseDrag:    true,
  dragDirectionLock:  true,
});
// ViewBox is a React component — wrap your animated tree with it
<ViewBox style={{ width: "100%", height: "100%" }}>
  ...
</ViewBox>`}</CodeBlock>
						</section>

						<section className="doc-block" id="doc-axis">
							<h3>Voodoo.Axis</h3>
							<p>Declares an animation timeline axis. Must be inside a ViewBox.</p>
							<PropsTable rows={[
								["axe / id",  "string",  "Axis identifier used by Node axes and Draggable."],
								["size",      "number",  "Total length of the axis timeline."],
								["defaultPosition", "number", "Starting position. Default: 0."],
								["scrollableWindow", "number", "Axis units per full ViewBox drag dimension."],
								["items",     "array",   "Axis-level tween descriptors (no target needed)."],
								["inertia",   "object",  "Inertia/snap config. See Inertia Config below."],
							]}/>
						</section>

						<section className="doc-block" id="doc-node">
							<h3>Voodoo.Node</h3>
							<p>Animatable wrapper element. Registers CSS tween descriptors with the parent tweener.</p>
							<PropsTable rows={[
								["id",    "string", "Node identifier for pushAnim targets."],
								["style", "object", "Initial CSS style. Supports transform layers and multi-unit arrays."],
								["axes",  "object", "Map of axisId → tween descriptor array."],
							]}/>
							<CodeBlock>{`<Voodoo.Node
  id="myNode"
  style={{
    opacity:   0,
    transform: [{ translateY: "30px" }],
  }}
  axes={{
    scroll: [{
      from: 0, duration: 100, easeFn: "easeCubicOut",
      apply: { opacity: 1, transform: [{ translateY: "-30px" }] }
    }]
  }}
>
  <div>...</div>
</Voodoo.Node>`}</CodeBlock>
						</section>

						<section className="doc-block" id="doc-draggable">
							<h3>Voodoo.Draggable</h3>
							<p>Maps drag gestures to axis positions.</p>
							<PropsTable rows={[
								["xAxis", "string",   "Axis driven by horizontal drag."],
								["yAxis", "string",   "Axis driven by vertical drag."],
								["xHook", "function", "Transform function for x delta before applying. e.g. d => -d"],
								["yHook", "function", "Transform function for y delta before applying."],
							]}/>
						</section>

						<section className="doc-block" id="doc-tween">
							<h3>Tween Descriptor</h3>
							<p>Each entry in a node's axis array describes one animated range.</p>
							<CodeBlock>{`{
  from:     0,          // start position on the axis
  duration: 200,        // length of the animated range
  apply: {
    opacity:   1,       // delta added to initial value
    transform: [{ translateX: "100px" }],
    filter:    { blur: "5px" }
  },
  easeFn:   "easeCubicOut",  // easing function name
  entering: (delta) => {},   // called when entering range
  moving:   (pos, prev, delta) => {},
  leaving:  (delta) => {}    // called when leaving range
}`}</CodeBlock>
							<p>The <code>apply</code> values are <strong>deltas</strong> added to the initial style. If initial opacity is 0 and apply is 1, the node fades from 0→1 as the axis moves from <code>from</code> to <code>from+duration</code>.</p>
						</section>

						<section className="doc-block" id="doc-multiunit">
							<h3>Multi-unit Values</h3>
							<p>Arrays of string values become CSS <code>calc()</code> sums. Each unit is interpolated independently.</p>
							<CodeBlock>{`// Initial style
style={{ width: ["50%", "10vw", "-50px"] }}
// → CSS: width: calc(50% + 10vw - 50px)

// Apply delta
apply: { width: ["-20%", "20px"] }
// Adds -20% to the % part and +20px to the px part independently`}</CodeBlock>
						</section>

						<section className="doc-block" id="doc-inertia">
							<h3>Inertia Config</h3>
							<CodeBlock>{`inertia={{
  snapToBounds: true,               // snap to min/max at edges
  wayPoints: [{ at: 0 }, { at: 500 }, { at: 1000 }],
  willSnap: (index, waypoint) => {},  // called before snap
  onSnap:   (index, waypoint) => {},  // called after snap
  shouldLoop: (pos, delta) => jumpValue | null,
}}`}</CodeBlock>
						</section>

						<section className="doc-block" id="doc-imperative">
							<h3>Imperative API</h3>
							<CodeBlock>{`const [tweener] = Voodoo.hook();

// Animate an axis to a position
tweener.axes.axisId.scrollTo(position, durationMs, easeFn);

// Jump instantly
tweener.axes.axisId.scrollTo(0, 0);

// One-shot animation (pushes on top of running axes)
tweener.pushAnim([
  { target: "nodeId", from: 0, duration: 60, easeFn: "easeCubicOut",
    apply: { opacity: 1, transform: [{ translateY: "-30px" }] } }
]);

// Watch axis position changes
const unsub = tweener.watchAxis("axisId", (pos) => console.log(pos));
unsub(); // unsubscribe`}</CodeBlock>
						</section>

					</div>
				</div>
			</div>
		</section>
	);
}
