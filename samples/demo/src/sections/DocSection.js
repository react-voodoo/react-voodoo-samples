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
      <Voodoo.Axis id="scroll" size={200} scrollableWindow={200} />
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
								["name",              "string",  "Name this tweener so descendants can reach it via Voodoo.hook(\"name\")."],
								["enableMouseDrag",   "boolean", "Enable mouse drag in addition to touch. Default: false."],
								["dragDirectionLock", "boolean", "Lock drag to one axis (X or Y) when the gesture begins. Default: false."],
								["maxClickTm",        "number",  "Milliseconds threshold below which a drag is treated as a click. Default: 200."],
								["maxClickOffset",    "number",  "Pixel threshold below which a drag is treated as a click. Default: 10."],
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
								["id",               "string",         "Axis identifier used by Node axes and Draggable. Also accepted as axe (deprecated alias)."],
								["size",             "number",         "Total length of the axis timeline."],
								["defaultPosition",  "number",         "Starting position. Default: 0."],
								["scrollableWindow", "number",         "Axis units per full ViewBox drag dimension. Controls drag sensitivity."],
								["items",            "array",          "Tween descriptors targeting specific node ids. Each item must include a target field."],
								["inertia",          "object|true|false", "Inertia/snap config. See Inertia Config below. Pass true for basic deceleration, false to disable."],
							]}/>
						</section>

						<section className="doc-block" id="doc-node">
							<h3>Voodoo.Node</h3>
							<p>Animatable wrapper element. Registers CSS tween descriptors with the parent tweener.</p>
							<PropsTable rows={[
								["id",    "string", "Node identifier. Referenced by tween target fields and pushAnim."],
								["style", "object", "Initial CSS style. Supports transform layers and multi-unit arrays."],
								["axes",  "object", "Map of axisId → tween descriptor array. No target field needed — tweens apply to this node."],
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
							<p>Maps drag gestures to axis positions. Walks the tweener tree so nested draggables each consume their own axis first and bubble up when out of bounds.</p>
							<PropsTable rows={[
								["xAxis", "string",   "Axis driven by horizontal drag."],
								["yAxis", "string",   "Axis driven by vertical drag."],
								["xHook", "function", "Transform the x delta before applying to the axis. e.g. d => -d to invert direction."],
								["yHook", "function", "Transform the y delta before applying to the axis."],
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
  easeFn:   "easeCubicOut",       // any d3-ease id or custom t => t fn
  entering: (delta) => {},        // called once when axis enters range
  moving:   (pos, prev, delta) => {},  // called every frame inside range
  leaving:  (delta) => {}         // called once when axis leaves range
}`}</CodeBlock>
							<p>The <code>apply</code> values are <strong>deltas</strong> added to the initial style. If initial opacity is 0 and apply is 1, the node fades from 0→1 as the axis moves from <code>from</code> to <code>from+duration</code>.</p>
							<p><code>pos</code> and <code>prev</code> in <code>moving</code> are normalized <strong>[0, 1]</strong> progress within the tween range, not raw axis positions.</p>
						</section>

						<section className="doc-block" id="doc-multiunit">
							<h3>Multi-unit Values</h3>
							<p>Arrays of string values become CSS <code>calc()</code> sums. Each unit is interpolated independently. All standard CSS length units are supported (<code>px</code>, <code>%</code>, <code>em</code>, <code>rem</code>, <code>vw</code>, <code>vh</code>, …) plus <code>bw</code>, <code>bh</code>, <code>box</code> (ViewBox-relative).</p>
							<CodeBlock>{`// Initial style
style={{ width: ["50%", "10vw", "-50px"] }}
// → CSS: width: calc(50% + 10vw - 50px)

// Mixing em and %
style={{ width: ["100%", "-3.6em"] }}

// Single-element array also works
style={{ height: ["3.6em"] }}

// Apply delta — each unit part is tweened independently
apply: { width: ["-20%", "20px"] }
// Adds -20% to the % part and +20px to the px part`}</CodeBlock>
						</section>

						<section className="doc-block" id="doc-inertia">
							<h3>Inertia Config</h3>
							<CodeBlock>{`inertia={{
  wayPoints: [{ at: 0 }, { at: 500 }, { at: 1000 }],
  // gravity > 1 makes a waypoint stickier:
  // { at: 500, gravity: 1.5 }

  // Clamp and snap back to axis bounds if momentum overshoots.
  // Requires bounds={{ min, max }} on the Axis.
  snapToBounds: true,

  // Predictive — fired at drag release, before animation completes:
  willEnd:  (targetPos, targetDelta, durationMs) => {},
  willSnap: (index, waypoint) => {},

  // Completion — fired once axis fully settles:
  onSnap:   (index, waypoint) => {},
  onStop:   (finalPos, waypoint) => {},

  // Return a position offset for infinite looping, or null.
  // delta: direction of movement (+forward, -backward)
  shouldLoop: (pos, delta) => (pos > 1000 ? -1000 : null),
}}`}</CodeBlock>
						</section>

						<section className="doc-block" id="doc-imperative">
							<h3>Imperative API</h3>
							<CodeBlock>{`const [tweener] = Voodoo.hook();

// Animate an axis to a position (per-axis shorthand)
tweener.axes.axisId.scrollTo(position, durationMs, easeFn);
// Or via tweener directly (axisId as third param):
tweener.scrollTo(position, durationMs, "axisId", easeFn);

// Jump instantly
tweener.axes.axisId.scrollTo(0, 0);

// One-shot animation (additive — composites on top of running axes)
tweener.pushAnim([
  { target: "nodeId", from: 0, duration: 60, easeFn: "easeCubicOut",
    apply: { opacity: 1, transform: [{ translateY: "-30px" }] } }
]);

// Watch axis position changes — returns unsubscribe fn
const unsub = tweener.watchAxis("axisId", (pos) => console.log(pos));
// Pass directly to useEffect for auto-cleanup:
React.useEffect(() => tweener.watchAxis("axisId", (pos) => {}), [tweener]);

// Imperatively override a Node's CSS baseline (persists, not a delta)
// Useful for non-animated changes like showing/hiding a drag placeholder
tweener.updateRefStyle("nodeId", { display: "none" });
tweener.updateRefStyle("nodeId", { display: "block", opacity: 1 });
// Batch form:
tweener.updateRefStyle(["node1", "node2"], { opacity: 0 });

// Get the raw DOM element for a registered Node
const domNode = tweener.getTweenableRef("nodeId");`}</CodeBlock>
						</section>

					</div>
				</div>
			</div>
		</section>
	);
}
