import React  from "react";
import Voodoo from "react-voodoo";

export default function ParallaxDemo() {
	const [, ViewBox] = Voodoo.hook({ enableMouseDrag: true, dragDirectionLock: true });

	return (
		<ViewBox style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
			<Voodoo.Axis
				id="parallax"
				size={400}
				defaultPosition={0}
				scrollableWindow={400}
				inertia={{ wayPoints: [{ at: 0 }, { at: 100 }, { at: 200 }, { at: 300 }, { at: 400 }] }}
			/>
			<Voodoo.Draggable yAxis="parallax">
				<div style={{ position: "absolute", inset: 0 }}>

					{/* Sky layer — slowest */}
					<Voodoo.Node
						id="sky"
						style={{
							position  : "absolute",
							inset     : 0,
							background: "radial-gradient(ellipse at 50% 30%, #1e3a5f 0%, #0a0f1e 70%)",
						}}
						axes={{
							parallax: [{ from: 0, duration: 400, apply: { transform: [{ translateY: "-40px" }] } }]
						}}
					>
						{/* Stars — visible always */}
						<div style={{ position: "absolute", inset: 0 }}>
							{[...Array(20)].map((_, i) => (
								<div key={i} style={{
									position     : "absolute",
									width        : i % 3 === 0 ? "3px" : "2px",
									height       : i % 3 === 0 ? "3px" : "2px",
									borderRadius : "50%",
									background   : "rgba(255,255,255,0.7)",
									top          : `${4 + (i * 7) % 50}%`,
									left         : `${3 + (i * 13) % 94}%`,
								}}/>
							))}
						</div>
					</Voodoo.Node>

					{/* Aurora layer — fades in around page 2 */}
					<Voodoo.Node
						id="aurora"
						style={{
							position: "absolute",
							inset    : 0,
							opacity  : 0,
						}}
						axes={{
							parallax: [
								{ from: 150, duration: 100, apply: { opacity: 0.7 } },
								{ from: 250, duration: 100, apply: { opacity: 0 } },
							]
						}}
					>
						<div style={{
							position  : "absolute",
							top       : "10%",
							left      : "0",
							right     : "0",
							height    : "35%",
							background: "linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.15) 40%, rgba(59,130,246,0.1) 70%, transparent 100%)",
							filter    : "blur(12px)",
						}}/>
					</Voodoo.Node>

					{/* Mountain layer — medium speed */}
					<Voodoo.Node
						id="mountain"
						style={{
							position: "absolute",
							bottom  : "0",
							left    : "0",
							right   : "0",
							height  : "55%",
						}}
						axes={{
							parallax: [{ from: 0, duration: 400, apply: { transform: [{ translateY: "-140px" }] } }]
						}}
					>
						<svg viewBox="0 0 480 240" style={{ width: "100%", height: "100%", display: "block" }} preserveAspectRatio="none">
							<polygon points="0,240 100,80 200,140 300,60 400,120 480,70 480,240" fill="#1a2235"/>
							<polygon points="0,240 60,140 160,100 260,150 360,90 480,130 480,240" fill="#0d1526"/>
						</svg>
					</Voodoo.Node>

					{/* City lights layer — fades in after page 2 */}
					<Voodoo.Node
						id="city"
						style={{
							position: "absolute",
							bottom  : "0",
							left    : "0",
							right   : "0",
							height  : "30%",
							opacity : 0,
						}}
						axes={{
							parallax: [
								{ from: 200, duration: 150, apply: { opacity: 1 } },
								{ from: 0,   duration: 400, apply: { transform: [{ translateY: "-140px" }] } },
							]
						}}
					>
						<div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "4px", padding: "0 20px" }}>
							{[...Array(18)].map((_, i) => (
								<div key={i} style={{
									width          : `${8 + (i * 7) % 12}px`,
									height         : `${20 + (i * 11) % 40}px`,
									background     : `rgba(${180 + (i*30)%75}, ${160 + (i*20)%95}, 80, 0.6)`,
									borderRadius   : "2px 2px 0 0",
									flexShrink     : 0,
								}}/>
							))}
						</div>
					</Voodoo.Node>

					{/* Foreground label — fastest */}
					<Voodoo.Node
						id="fglabel"
						style={{
							position : "absolute",
							bottom   : "20px",
							left     : "0",
							right    : "0",
							textAlign: "center",
						}}
						axes={{
							parallax: [{ from: 0, duration: 400, apply: { transform: [{ translateY: "-280px" }] } }]
						}}
					>
						<div style={{
							display       : "inline-block",
							fontFamily    : "'JetBrains Mono', monospace",
							fontSize      : "0.8rem",
							color         : "rgba(255,255,255,0.5)",
							letterSpacing : "0.15em",
							textTransform : "uppercase",
						}}>
							react-voodoo
						</div>
					</Voodoo.Node>

					<div style={{
						position  : "absolute",
						top       : "12px",
						left      : "0",
						right     : "28px",
						textAlign : "center",
						fontSize  : "0.7rem",
						color     : "rgba(255,255,255,0.35)",
						pointerEvents: "none",
					}}>
						drag to scrub parallax
					</div>
				</div>
			</Voodoo.Draggable>

			{/* Scrollbar */}
			<div style={{
				position     : "absolute",
				top          : "16px",
				right        : "8px",
				bottom       : "16px",
				width        : "3px",
				background   : "rgba(255,255,255,0.08)",
				borderRadius : "2px",
				pointerEvents: "none",
			}}>
				{/*
				  * Thumb travels from top:0 to top:(trackHeight - thumbHeight).
				  * Track height = bh - 32px (16px margins top+bottom).
				  * Thumb height = 28px → total travel = ["1bh", "-60px"].
				  * Layer 0: static horizontal centering. Layer 1: axis-driven vertical position.
				*/}
				<Voodoo.Node.div
					style={{
						position    : "absolute",
						left        : "50%",
						top         : "0px",
						width       : "7px",
						height      : "28px",
						background  : "#3b82f6",
						borderRadius: "4px",
						transform   : [{ translateX: "-50%" }, { translateY: "0px" }],
					}}
					axes={{
						parallax: [{
							from    : 0,
							duration: 400,
							apply   : { transform: [{}, { translateY: ["1bh", "-60px"] }] },
						}]
					}}
				/>
			</div>
		</ViewBox>
	);
}
