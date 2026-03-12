import React  from "react";
import Voodoo from "react-voodoo";

const TILE_COLORS = [
	"#3b82f6", "#8b5cf6", "#ec4899",
	"#10b981", "#f59e0b", "#06b6d4",
	"#ef4444", "#84cc16", "#f97316",
];

export default function StaggerDemo() {
	const [tweener, ViewBox] = Voodoo.hook();
	const [playing, setPlaying] = React.useState(false);

	const play = () => {
		setPlaying(true);
		tweener.axes?.stagger?.scrollTo(200, 800, "easeCubicOut");
	};
	const reset = () => {
		setPlaying(false);
		tweener.axes?.stagger?.scrollTo(0, 400, "easeCubicIn");
	};

	return (
		<ViewBox style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
			<Voodoo.Axis
				id="stagger"
				size={200}
				defaultPosition={0}
			/>
			<div style={{
				position      : "absolute",
				inset         : 0,
				display       : "flex",
				flexDirection : "column",
				alignItems    : "center",
				justifyContent: "center",
				gap           : "20px",
				padding       : "20px",
			}}>
				<div style={{
					display              : "grid",
					gridTemplateColumns  : "repeat(3, 72px)",
					gridTemplateRows     : "repeat(3, 72px)",
					gap                  : "10px",
				}}>
					{TILE_COLORS.map((color, i) => (
						<Voodoo.Node
							key={i}
							style={{
								opacity  : 0,
								transform: [{ translateY: "30px" }],
							}}
							axes={{
								stagger: [{
									from    : i * 15,
									duration: 50,
									apply   : {
										opacity  : 1,
										transform: [{ translateY: "-30px" }],
									},
									easeFn: "easeCubicOut",
								}]
							}}
						>
							<div style={{
								width       : "72px",
								height      : "72px",
								borderRadius: "12px",
								background  : `linear-gradient(135deg, ${color}cc 0%, ${color} 100%)`,
								display     : "flex",
								alignItems  : "center",
								justifyContent: "center",
								fontSize    : "1.4rem",
							}}>
								{["⚡","🌊","🎯","🚀","✨","💎","🔮","🌈","⚙️"][i]}
							</div>
						</Voodoo.Node>
					))}
				</div>

				<div style={{ display: "flex", gap: "10px" }}>
					<button
						onClick={play}
						style={{
							padding     : "8px 20px",
							background  : "var(--accent)",
							color       : "#fff",
							border      : "none",
							borderRadius: "6px",
							cursor      : "pointer",
							fontFamily  : "inherit",
							fontSize    : "0.85rem",
							fontWeight  : "600",
						}}
					>
						▶ Play
					</button>
					<button
						onClick={reset}
						style={{
							padding     : "8px 20px",
							background  : "transparent",
							color       : "var(--textSub)",
							border      : "1px solid var(--border)",
							borderRadius: "6px",
							cursor      : "pointer",
							fontFamily  : "inherit",
							fontSize    : "0.85rem",
						}}
					>
						↺ Reset
					</button>
				</div>

				<div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
					pure axis scrubbing — no setTimeout
				</div>
			</div>
		</ViewBox>
	);
}
