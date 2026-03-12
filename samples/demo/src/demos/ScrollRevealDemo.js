import React  from "react";
import Voodoo from "react-voodoo";

const BLOCKS = [
	{ icon: "⚡", title: "Delta-based",    text: "Each frame computes the change from the previous position, enabling additive composition." },
	{ icon: "🎯", title: "Direct DOM",     text: "Bypasses React's render loop entirely. Transforms go straight to the DOM at 60 fps." },
	{ icon: "🌊", title: "Inertia & Snap", text: "Predictive physics with configurable snap points and spring-like release behavior." },
	{ icon: "🔮", title: "Multi-unit CSS", text: "Mix %, px, vw in a single value via CSS calc(). No JavaScript unit math required." },
];

export default function ScrollRevealDemo() {
	const [tweener, ViewBox] = Voodoo.hook({ enableMouseDrag: true, dragDirectionLock: true });

	return (
		<ViewBox style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
			<Voodoo.Axis
				id="scroll"
				size={300}
				defaultPosition={0}
				scrollableWindow={300}
			/>
			<Voodoo.Draggable yAxis="scroll">
				<div style={{ position: "absolute", inset: 0, overflowY: "hidden" }}>
					<div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
						{BLOCKS.map((block, i) => (
							<Voodoo.Node
								key={i}
								style={{
									opacity  : 0,
									transform: [{ translateY: "30px" }],
								}}
								axes={{
									scroll: [{
										from    : i * 60,
										duration: 60,
										apply   : {
											opacity  : 1,
											transform: [{ translateY: "-30px" }],
										},
										easeFn: "easeCubicOut",
									}]
								}}
							>
								<div style={{
									background  : "var(--surface2)",
									border      : "1px solid var(--border)",
									borderRadius: "12px",
									padding     : "16px",
									display     : "flex",
									gap         : "14px",
									alignItems  : "flex-start",
								}}>
									<span style={{
										fontSize    : "1.6rem",
										lineHeight  : "1",
										marginTop   : "2px",
										flexShrink  : 0,
									}}>
										{block.icon}
									</span>
									<div>
										<div style={{
											fontWeight : "600",
											fontSize   : "0.9rem",
											color      : "var(--text)",
											marginBottom: "4px",
										}}>
											{block.title}
										</div>
										<div style={{
											fontSize   : "0.78rem",
											color      : "var(--textSub)",
											lineHeight : "1.5",
										}}>
											{block.text}
										</div>
									</div>
								</div>
							</Voodoo.Node>
						))}
						<div style={{
							textAlign : "center",
							fontSize  : "0.7rem",
							color     : "rgba(255,255,255,0.25)",
							paddingTop: "8px",
						}}>
							drag up to reveal
						</div>
					</div>
				</div>
			</Voodoo.Draggable>
		</ViewBox>
	);
}
